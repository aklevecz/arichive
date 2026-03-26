<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';

	let {
		mode = 'particles', // 'particles' | 'gradient' | 'displacement' | 'noise'
		enabled = $bindable(true)
	} = $props();

	let canvas = $state(null);
	let scene, camera, renderer;
	let animationFrameId;
	let particles, particleLines, gradientMesh, displacementMesh, noiseMesh;
	let mouse = { x: 0, y: 0 };
	let time = 0;

	// Performance monitoring
	let fps = 60;
	let lastFrameTime = browser ? performance.now() : 0;
	let frameCount = 0;

	// Webcam / face stuff
	let cameraEnabled = $state(false);
	let videoElement = $state(null);
	let stream = null;
	let analysisCanvas = null;
	let analysisCtx = null;
	let edgeTexture = null;
	let edgePlane = null;

	onMount(() => {
		if (!browser || !enabled) return;

		initScene();
		createEffects();
		animate();
		addEventListeners();
	});

	onDestroy(() => {
		if (browser) {
			cleanup();
		}
	});

	function initScene() {
		if (!browser) return;

		// Scene setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;

		// Renderer
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	function createEffects() {
		createParticleSystem();
		createGradientMesh();
		createDisplacementField();
		createNoisePattern();
		updateVisibility();
	}

	function createParticleSystem() {
		const particleCount = 150;
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);

		for (let i = 0; i < particleCount * 3; i += 3) {
			positions[i] = (Math.random() - 0.5) * 20;
			positions[i + 1] = (Math.random() - 0.5) * 20;
			positions[i + 2] = (Math.random() - 0.5) * 20;

			velocities[i] = (Math.random() - 0.5) * 0.02;
			velocities[i + 1] = (Math.random() - 0.5) * 0.02;
			velocities[i + 2] = (Math.random() - 0.5) * 0.02;

			// Varied sizes (in pixels)
			sizes[i / 3] = 4.0 + Math.random() * 12.0;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
		geometry.userData.velocities = velocities;
		geometry.userData.smoothVelocities = new Float32Array(particleCount * 3); // For wisp-like motion
		geometry.userData.connectionCounts = new Float32Array(particleCount);

		// Custom shader material for variable particle sizes
		const vertexShader = `
			attribute float size;
			varying vec3 vColor;

			void main() {
				vColor = vec3(0.0, 0.0, 0.0);
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				gl_PointSize = size;
				gl_Position = projectionMatrix * mvPosition;
			}
		`;

		const fragmentShader = `
			varying vec3 vColor;

			void main() {
				// Create outlined circle (ring)
				vec2 center = gl_PointCoord - vec2(0.5);
				float dist = length(center);

				// Discard outside and inside the ring
				if (dist > 0.5) discard;
				if (dist < 0.35) discard;

				// Smooth edges on both sides
				float outerAlpha = smoothstep(0.5, 0.45, dist);
				float innerAlpha = smoothstep(0.35, 0.4, dist);
				float alpha = outerAlpha * innerAlpha * 0.8;

				gl_FragColor = vec4(vColor, alpha);
			}
		`;

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			transparent: true,
			depthWrite: false
		});

		particles = new THREE.Points(geometry, material);
		scene.add(particles);

		// Create lines for connections
		const maxConnections = particleCount * 3;
		const linePositions = new Float32Array(maxConnections * 2 * 3);
		const lineGeometry = new THREE.BufferGeometry();
		lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
		lineGeometry.setDrawRange(0, 0);

		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0x000000,
			transparent: true,
			opacity: 0.15
		});

		particleLines = new THREE.LineSegments(lineGeometry, lineMaterial);
		scene.add(particleLines);
	}

	function createGradientMesh() {
		const geometry = new THREE.PlaneGeometry(20, 20, 32, 32);

		const vertexShader = `
			varying vec2 vUv;
			varying vec3 vPosition;
			uniform vec2 uMouse;
			uniform float uTime;

			void main() {
				vUv = uv;
				vPosition = position;

				vec3 pos = position;
				float dist = distance(uMouse, uv);
				pos.z += sin(dist * 10.0 - uTime * 2.0) * 0.3;

				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
			}
		`;

		const fragmentShader = `
			varying vec2 vUv;
			varying vec3 vPosition;
			uniform float uTime;

			void main() {
				vec3 color1 = vec3(0.95, 0.95, 0.95);
				vec3 color2 = vec3(0.85, 0.85, 0.85);

				float gradient = sin(vUv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
				gradient *= sin(vUv.y * 3.0 + uTime * 0.3) * 0.5 + 0.5;

				vec3 color = mix(color1, color2, gradient);
				gl_FragColor = vec4(color, 0.3);
			}
		`;

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uMouse: { value: new THREE.Vector2(0.5, 0.5) }
			},
			transparent: true
		});

		gradientMesh = new THREE.Mesh(geometry, material);
		scene.add(gradientMesh);
	}

	function createDisplacementField() {
		const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);

		const vertexShader = `
			varying vec2 vUv;
			uniform vec2 uMouse;
			uniform float uTime;

			void main() {
				vUv = uv;
				vec3 pos = position;

				vec2 toMouse = uv - uMouse;
				float dist = length(toMouse);
				float influence = smoothstep(0.5, 0.0, dist);

				pos.z += influence * sin(dist * 20.0 - uTime * 3.0) * 0.5;

				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
			}
		`;

		const fragmentShader = `
			varying vec2 vUv;

			void main() {
				float grid = step(0.95, fract(vUv.x * 20.0)) + step(0.95, fract(vUv.y * 20.0));
				vec3 color = vec3(grid * 0.2);
				gl_FragColor = vec4(color, 0.4);
			}
		`;

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uMouse: { value: new THREE.Vector2(0.5, 0.5) }
			},
			transparent: true,
			wireframe: false
		});

		displacementMesh = new THREE.Mesh(geometry, material);
		scene.add(displacementMesh);
	}

	async function enableCamera() {
		if (!browser) return;

		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 320 },
					height: { ideal: 240 },
					facingMode: 'user'
				}
			});

			if (videoElement) {
				videoElement.srcObject = stream;
				await videoElement.play();

				// Create analysis canvas for edge detection
				analysisCanvas = document.createElement('canvas');
				analysisCanvas.width = 512;
				analysisCanvas.height = 384;
				analysisCtx = analysisCanvas.getContext('2d', { willReadFrequently: true });

				// Create texture from canvas (smooth filtering)
				edgeTexture = new THREE.CanvasTexture(analysisCanvas);
				edgeTexture.minFilter = THREE.LinearFilter;
				edgeTexture.magFilter = THREE.LinearFilter;

				// Create plane to display edge detection in 3D scene (smaller)
				const planeGeom = new THREE.PlaneGeometry(8, 6); // Smaller face
				const planeMat = new THREE.MeshBasicMaterial({
					map: edgeTexture,
					transparent: true,
					opacity: 1.0
				});
				edgePlane = new THREE.Mesh(planeGeom, planeMat);
				edgePlane.position.z = 2; // In front of particles
				scene.add(edgePlane);

				cameraEnabled = true;
				updateVisibility();
			}
		} catch (err) {
			console.error('Camera access denied:', err);
		}
	}

	function disableCamera() {
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			stream = null;
		}
		if (edgePlane) {
			scene.remove(edgePlane);
			edgePlane.geometry.dispose();
			edgePlane.material.dispose();
			edgePlane = null;
		}
		if (edgeTexture) {
			edgeTexture.dispose();
			edgeTexture = null;
		}
		analysisCanvas = null;
		analysisCtx = null;
		cameraEnabled = false;
		updateVisibility();
	}

	function detectEdges() {
		if (!analysisCtx || !videoElement) return;

		const w = analysisCanvas.width;
		const h = analysisCanvas.height;

		// Draw video frame (mirrored)
		analysisCtx.save();
		analysisCtx.scale(-1, 1);
		analysisCtx.drawImage(videoElement, -w, 0, w, h);
		analysisCtx.restore();

		const imageData = analysisCtx.getImageData(0, 0, w, h);
		const data = imageData.data;

		// Create output image
		const edgeData = new Uint8ClampedArray(w * h * 4);

		// Edge detection using luminosity gradient
		for (let y = 1; y < h - 1; y++) {
			for (let x = 1; x < w - 1; x++) {
				const idx = (y * w + x) * 4;

				// Get luminosity of neighbors for gradient
				const idxLeft = (y * w + (x - 1)) * 4;
				const idxRight = (y * w + (x + 1)) * 4;
				const idxUp = ((y - 1) * w + x) * 4;
				const idxDown = ((y + 1) * w + x) * 4;

				const lumLeft = data[idxLeft] * 0.299 + data[idxLeft + 1] * 0.587 + data[idxLeft + 2] * 0.114;
				const lumRight = data[idxRight] * 0.299 + data[idxRight + 1] * 0.587 + data[idxRight + 2] * 0.114;
				const lumUp = data[idxUp] * 0.299 + data[idxUp + 1] * 0.587 + data[idxUp + 2] * 0.114;
				const lumDown = data[idxDown] * 0.299 + data[idxDown + 1] * 0.587 + data[idxDown + 2] * 0.114;

				// Sobel-like gradient magnitude
				const gx = lumRight - lumLeft;
				const gy = lumDown - lumUp;
				const gradient = Math.sqrt(gx * gx + gy * gy);

				// Store edge intensity - dark edges on transparent background
				const edgeStrength = Math.min(255, gradient * 4); // Stronger detection
				// Boost contrast
				const boosted = edgeStrength > 30 ? Math.min(255, edgeStrength * 1.5) : 0;
				// Invert: edges are dark (0), non-edges are white (255)
				edgeData[idx] = 255 - boosted;
				edgeData[idx + 1] = 255 - boosted;
				edgeData[idx + 2] = 255 - boosted;
				// Alpha based on edge strength - edges visible, non-edges transparent
				edgeData[idx + 3] = boosted;
			}
		}

		// Write back to canvas
		const edgeImageData = new ImageData(edgeData, w, h);
		analysisCtx.putImageData(edgeImageData, 0, 0);
	}

	function createFaceParticles() {
		const particleCount = 600;
		const positions = new Float32Array(particleCount * 3);
		const targetPositions = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);

		// Initialize with random positions
		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 12;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
			positions[i * 3 + 2] = 0; // Keep on same plane

			targetPositions[i * 3] = positions[i * 3];
			targetPositions[i * 3 + 1] = positions[i * 3 + 1];
			targetPositions[i * 3 + 2] = 0;

			sizes[i] = 6.0;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
		geometry.userData.targetPositions = targetPositions;

		const vertexShader = `
			attribute float size;

			void main() {
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				gl_PointSize = size;
				gl_Position = projectionMatrix * mvPosition;
			}
		`;

		const fragmentShader = `
			void main() {
				vec2 center = gl_PointCoord - vec2(0.5);
				float dist = length(center);
				if (dist > 0.5) discard;

				gl_FragColor = vec4(0.0, 0.0, 0.0, 0.8);
			}
		`;

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			transparent: true,
			depthWrite: false
		});

		faceParticles = new THREE.Points(geometry, material);
		scene.add(faceParticles);
	}

	function updateFaceParticles() {
		if (!faceParticles || !analysisCtx) return;

		// Detect edges every frame for responsiveness
		featurePoints = detectEdges();

		const positions = faceParticles.geometry.attributes.position.array;
		const sizes = faceParticles.geometry.attributes.size.array;
		const particleCount = positions.length / 3;

		// Directly place particles at feature points
		for (let i = 0; i < particleCount; i++) {
			if (i < featurePoints.length) {
				const point = featurePoints[i];
				// Snap directly to position (fast follow)
				positions[i * 3] += (point.x - positions[i * 3]) * 0.3;
				positions[i * 3 + 1] += (point.y - positions[i * 3 + 1]) * 0.3;
				positions[i * 3 + 2] = 0;
				sizes[i] = 5 + point.strength * 3;
			} else {
				// Hide unused particles by moving them far away
				positions[i * 3] = 100;
				positions[i * 3 + 1] = 100;
				positions[i * 3 + 2] = 0;
			}
		}

		faceParticles.geometry.attributes.position.needsUpdate = true;
		faceParticles.geometry.attributes.size.needsUpdate = true;
	}

	function createNoisePattern() {
		const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);

		const vertexShader = `
			varying vec2 vUv;
			varying float vNoise;
			uniform float uTime;
			uniform vec2 uMouse;

			// Simplex noise function
			vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
			vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
			vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

			float snoise(vec2 v) {
				const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
				vec2 i  = floor(v + dot(v, C.yy));
				vec2 x0 = v -   i + dot(i, C.xx);
				vec2 i1;
				i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
				vec4 x12 = x0.xyxy + C.xxzz;
				x12.xy -= i1;
				i = mod289(i);
				vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
				vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
				m = m*m;
				m = m*m;
				vec3 x = 2.0 * fract(p * C.www) - 1.0;
				vec3 h = abs(x) - 0.5;
				vec3 ox = floor(x + 0.5);
				vec3 a0 = x - ox;
				m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
				vec3 g;
				g.x  = a0.x  * x0.x  + h.x  * x0.y;
				g.yz = a0.yz * x12.xz + h.yz * x12.yw;
				return 130.0 * dot(m, g);
			}

			void main() {
				vUv = uv;
				vec3 pos = position;

				float noise = snoise(uv * 5.0 + uTime * 0.2);
				noise += snoise(uv * 10.0 + uTime * 0.3) * 0.5;

				vec2 toMouse = uv - uMouse;
				float dist = length(toMouse);
				float mouseInfluence = smoothstep(0.5, 0.0, dist);

				pos.z += noise * 0.3 + mouseInfluence * 0.5;
				vNoise = noise;

				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
			}
		`;

		const fragmentShader = `
			varying vec2 vUv;
			varying float vNoise;

			void main() {
				float pattern = vNoise * 0.5 + 0.5;
				vec3 color = vec3(pattern * 0.3);
				gl_FragColor = vec4(color, 0.3);
			}
		`;

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uMouse: { value: new THREE.Vector2(0.5, 0.5) }
			},
			transparent: true
		});

		noiseMesh = new THREE.Mesh(geometry, material);
		scene.add(noiseMesh);
	}

	function updateVisibility() {
		if (particles) particles.visible = mode === 'particles' && !cameraEnabled;
		if (particleLines) particleLines.visible = mode === 'particles' && !cameraEnabled;
		if (gradientMesh) gradientMesh.visible = mode === 'gradient';
		if (displacementMesh) displacementMesh.visible = mode === 'displacement';
		if (noiseMesh) noiseMesh.visible = mode === 'noise';
	}

	function animate() {
		if (!browser || !enabled) return;

		animationFrameId = requestAnimationFrame(animate);
		time += 0.01;

		// FPS monitoring
		const currentTime = performance.now();
		frameCount++;
		if (currentTime >= lastFrameTime + 1000) {
			fps = frameCount;
			frameCount = 0;
			lastFrameTime = currentTime;

			// Auto-disable if performance is poor
			if (fps < 30) {
				enabled = false;
				cleanup();
				return;
			}
		}

		// Get edge data for particle attraction (if camera enabled)
		let edgeData = null;
		if (cameraEnabled && analysisCtx && analysisCanvas) {
			edgeData = analysisCtx.getImageData(0, 0, analysisCanvas.width, analysisCanvas.height).data;
		}

		// Update particles (always update positions, even when hidden for canvas drawing)
		if (particles) {
			const positions = particles.geometry.attributes.position.array;
			const velocities = particles.geometry.userData.velocities;
			const sizes = particles.geometry.attributes.size.array;
			const connectionCounts = particles.geometry.userData.connectionCounts;

			// Reset connection counts
			connectionCounts.fill(0);

			// Update positions
			for (let i = 0; i < positions.length; i += 3) {
				// Mouse influence (repel)
				const dx = positions[i] - mouse.x * 10;
				const dy = positions[i + 1] - mouse.y * 10;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const force = Math.max(0, 1 - dist / 5);

				positions[i] += velocities[i] + (dx / dist) * force * 0.01;
				positions[i + 1] += velocities[i + 1] + (dy / dist) * force * 0.01;
				positions[i + 2] += velocities[i + 2];

				// Wisp-like edge attraction when camera is on
				if (edgeData) {
					const w = analysisCanvas.width;
					const h = analysisCanvas.height;
					const planeW = 8, planeH = 6;
					const smoothVel = particles.geometry.userData.smoothVelocities;
					const idx3 = i;

					// Find the nearest strong edge point
					let targetX = positions[i];
					let targetY = positions[i + 1];
					let bestDist = Infinity;

					const searchRadius = 50;
					const texX = Math.floor(((positions[i] + planeW/2) / planeW) * w);
					const texY = Math.floor(((-positions[i + 1] + planeH/2) / planeH) * h);

					for (let sy = -searchRadius; sy <= searchRadius; sy += 4) {
						for (let sx = -searchRadius; sx <= searchRadius; sx += 4) {
							const px = texX + sx;
							const py = texY + sy;

							if (px >= 0 && px < w && py >= 0 && py < h) {
								const idx = (py * w + px) * 4;
								const edgeStrength = edgeData[idx + 3] / 255;

								if (edgeStrength > 0.2) {
									const dist = sx * sx + sy * sy;
									const weightedDist = dist / (edgeStrength * edgeStrength);

									if (weightedDist < bestDist) {
										bestDist = weightedDist;
										targetX = (px / w) * planeW - planeW/2;
										targetY = -((py / h) * planeH - planeH/2);
									}
								}
							}
						}
					}

					// Calculate desired velocity toward target
					const desiredVelX = (targetX - positions[i]) * 0.08;
					const desiredVelY = (targetY - positions[i + 1]) * 0.08;

					// Smooth the velocity (wisp-like easing)
					smoothVel[idx3] += (desiredVelX - smoothVel[idx3]) * 0.03;
					smoothVel[idx3 + 1] += (desiredVelY - smoothVel[idx3 + 1]) * 0.03;

					// Apply smoothed velocity
					positions[i] += smoothVel[idx3];
					positions[i + 1] += smoothVel[idx3 + 1];
					positions[i + 2] *= 0.95;
				}

				// Wrap around
				if (Math.abs(positions[i]) > 10) positions[i] *= -0.5;
				if (Math.abs(positions[i + 1]) > 10) positions[i + 1] *= -0.5;
				if (Math.abs(positions[i + 2]) > 10) positions[i + 2] *= -0.5;
			}

			// Update particle connections and count them
			if (particleLines) {
				const linePositions = particleLines.geometry.attributes.position.array;
				let lineIndex = 0;
				const maxDistance = 3.0;

				for (let i = 0; i < positions.length; i += 3) {
					for (let j = i + 3; j < positions.length; j += 3) {
						const dx = positions[i] - positions[j];
						const dy = positions[i + 1] - positions[j + 1];
						const dz = positions[i + 2] - positions[j + 2];
						const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

						if (distance < maxDistance) {
							// Add line
							linePositions[lineIndex++] = positions[i];
							linePositions[lineIndex++] = positions[i + 1];
							linePositions[lineIndex++] = positions[i + 2];

							linePositions[lineIndex++] = positions[j];
							linePositions[lineIndex++] = positions[j + 1];
							linePositions[lineIndex++] = positions[j + 2];

							// Increment connection counts
							connectionCounts[i / 3]++;
							connectionCounts[j / 3]++;
						}
					}
				}

				particleLines.geometry.setDrawRange(0, lineIndex / 3);
				particleLines.geometry.attributes.position.needsUpdate = true;
			}

			// Update particle sizes based on position and connections
			for (let i = 0; i < positions.length; i += 3) {
				const particleIndex = i / 3;

				// Base size in pixels
				const baseSize = 6.0;

				// Size boost from connections (1.5 pixels per connection, max +12 pixels)
				const connectionBoost = Math.min(connectionCounts[particleIndex] * 1.5, 12.0);

				// Final size
				sizes[particleIndex] = baseSize + connectionBoost;
			}

			particles.geometry.attributes.position.needsUpdate = true;
			particles.geometry.attributes.size.needsUpdate = true;
		}

		// Update gradient mesh
		if (gradientMesh && gradientMesh.visible) {
			gradientMesh.material.uniforms.uTime.value = time;
			gradientMesh.material.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5);
		}

		// Update displacement field
		if (displacementMesh && displacementMesh.visible) {
			displacementMesh.material.uniforms.uTime.value = time;
			displacementMesh.material.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5);
		}

		// Update noise pattern
		if (noiseMesh && noiseMesh.visible) {
			noiseMesh.material.uniforms.uTime.value = time;
			noiseMesh.material.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5);
		}

		// Update edge detection texture with particle distortion
		if (cameraEnabled && analysisCtx && edgeTexture && particles) {
			detectEdges();

			const w = analysisCanvas.width;
			const h = analysisCanvas.height;
			const positions = particles.geometry.attributes.position.array;
			const sizes = particles.geometry.attributes.size.array;
			const planeW = 8, planeH = 6;

			// Draw clean outlined circles onto the canvas (so they get distorted too)
			analysisCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
			analysisCtx.lineWidth = 1.5;
			for (let i = 0; i < positions.length; i += 3) {
				const canvasX = ((positions[i] + planeW/2) / planeW) * w;
				const canvasY = ((-positions[i + 1] + planeH/2) / planeH) * h;

				if (canvasX > -20 && canvasX < w + 20 && canvasY > -20 && canvasY < h + 20) {
					const particleIndex = i / 3;
					const radius = (sizes[particleIndex] / 6) * 2.5; // Smaller circles

					analysisCtx.beginPath();
					analysisCtx.arc(canvasX, canvasY, radius, 0, Math.PI * 2);
					analysisCtx.stroke();
				}
			}

			// Get image data for pixel distortion
			const imageData = analysisCtx.getImageData(0, 0, w, h);
			const data = imageData.data;
			const output = new Uint8ClampedArray(data.length);
			output.set(data);

			// Distortion from all particles - smaller radius for speed
			for (let i = 0; i < positions.length; i += 3) {
				const canvasX = ((positions[i] + planeW/2) / planeW) * w;
				const canvasY = ((-positions[i + 1] + planeH/2) / planeH) * h;

				if (canvasX > 5 && canvasX < w - 5 && canvasY > 5 && canvasY < h - 5) {
					const particleIndex = i / 3;
					const radius = (sizes[particleIndex] / 6) * 6;

					const r2 = radius * radius;
					for (let dy = -radius; dy <= radius; dy += 1) {
						for (let dx = -radius; dx <= radius; dx += 1) {
							const dist2 = dx * dx + dy * dy;
							if (dist2 < r2 && dist2 > 0) {
								const px = Math.floor(canvasX + dx);
								const py = Math.floor(canvasY + dy);

								const dist = Math.sqrt(dist2);
								const strength = Math.pow(1 - dist / radius, 2) * 2;
								const srcX = Math.floor(canvasX + dx * (1 + strength));
								const srcY = Math.floor(canvasY + dy * (1 + strength));

								if (srcX >= 0 && srcX < w && srcY >= 0 && srcY < h) {
									const destIdx = (py * w + px) * 4;
									const srcIdx = (srcY * w + srcX) * 4;
									output[destIdx] = data[srcIdx];
									output[destIdx + 1] = data[srcIdx + 1];
									output[destIdx + 2] = data[srcIdx + 2];
									output[destIdx + 3] = data[srcIdx + 3];
								}
							}
						}
					}
				}
			}

			// Fast metaball effect - optimized box blur + threshold
			const blurred = new Uint8ClampedArray(output.length);
			const r = 3;
			const step = 2; // Skip pixels for speed

			for (let y = r; y < h - r; y++) {
				for (let x = r; x < w - r; x++) {
					// Fast 5-sample blur (center + 4 cardinal directions)
					const idx = (y * w + x) * 4;
					const sumA = output[idx + 3] +
						output[((y - r) * w + x) * 4 + 3] +
						output[((y + r) * w + x) * 4 + 3] +
						output[(y * w + x - r) * 4 + 3] +
						output[(y * w + x + r) * 4 + 3];
					const avgA = sumA / 5;

					// Sharp threshold for metaball effect
					const newAlpha = avgA > 45 ? Math.min(255, (avgA - 45) * 6) : 0;

					blurred[idx] = newAlpha > 70 ? 0 : 255;
					blurred[idx + 1] = newAlpha > 70 ? 0 : 255;
					blurred[idx + 2] = newAlpha > 70 ? 0 : 255;
					blurred[idx + 3] = newAlpha;
				}
			}

			const outputData = new ImageData(blurred, w, h);
			analysisCtx.putImageData(outputData, 0, 0);

			edgeTexture.needsUpdate = true;
		}

		renderer.render(scene, camera);
	}

	function addEventListeners() {
		if (!browser) return;
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('resize', onResize);
	}

	function onMouseMove(event) {
		if (!browser) return;
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	function onResize() {
		if (!browser) return;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function cleanup() {
		if (!browser) return;

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('resize', onResize);

		// Clean up camera
		disableCamera();

		if (renderer) {
			renderer.dispose();
		}

		if (scene) {
			scene.traverse((object) => {
				if (object.geometry) object.geometry.dispose();
				if (object.material) {
					if (Array.isArray(object.material)) {
						object.material.forEach(material => material.dispose());
					} else {
						object.material.dispose();
					}
				}
			});
		}
	}

	// Watch for effect changes
	$effect(() => {
		if (browser && enabled) {
			updateVisibility();
		}
	});

	// Watch for enabled changes
	$effect(() => {
		if (!browser) return;

		if (enabled && canvas && !animationFrameId) {
			if (!scene) {
				initScene();
				createEffects();
			}
			animate();
			addEventListeners();
		} else if (!enabled && animationFrameId) {
			cleanup();
		}
	});

</script>

{#if browser && enabled}
	<canvas bind:this={canvas} class="webgl-background"></canvas>

	<!-- Hidden video element for webcam -->
	<video
		bind:this={videoElement}
		class="hidden-video"
		playsinline
		muted
	></video>

	<!-- Camera toggle button -->
	<button
		class="camera-toggle"
		onclick={() => cameraEnabled ? disableCamera() : enableCamera()}
	>
		{cameraEnabled ? '👁️ OFF' : '👁️'}
	</button>
{/if}

<style>
	.webgl-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
	}

	.hidden-video {
		position: fixed;
		top: 0;
		left: 0;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.camera-toggle {
		position: fixed;
		bottom: 20px;
		left: 20px;
		z-index: 1000;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 2px solid #000;
		background: #fff;
		font-size: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		opacity: 0.6;
		pointer-events: auto;
	}

	.camera-toggle:hover {
		opacity: 1;
		transform: scale(1.1);
		background: #000;
		color: #fff;
	}

</style>
