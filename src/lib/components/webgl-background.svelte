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

			// Initialize with base size (in pixels)
			sizes[i / 3] = 6.0;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
		geometry.userData.velocities = velocities;
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
				// Create circular particles
				vec2 center = gl_PointCoord - vec2(0.5);
				float dist = length(center);
				if (dist > 0.5) discard;

				// Smooth edges
				float alpha = smoothstep(0.5, 0.3, dist) * 0.6;
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
		if (particles) particles.visible = mode === 'particles';
		if (particleLines) particleLines.visible = mode === 'particles';
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

		// Update particles
		if (particles && particles.visible) {
			const positions = particles.geometry.attributes.position.array;
			const velocities = particles.geometry.userData.velocities;
			const sizes = particles.geometry.attributes.size.array;
			const connectionCounts = particles.geometry.userData.connectionCounts;

			// Reset connection counts
			connectionCounts.fill(0);

			// Update positions
			for (let i = 0; i < positions.length; i += 3) {
				// Mouse influence
				const dx = positions[i] - mouse.x * 10;
				const dy = positions[i + 1] - mouse.y * 10;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const force = Math.max(0, 1 - dist / 5);

				positions[i] += velocities[i] + (dx / dist) * force * 0.01;
				positions[i + 1] += velocities[i + 1] + (dy / dist) * force * 0.01;
				positions[i + 2] += velocities[i + 2];

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
</style>
