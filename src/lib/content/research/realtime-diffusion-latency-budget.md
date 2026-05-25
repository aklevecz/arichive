---
title: "Notes: Real-Time Diffusion Latency Budgets"
date: "2026-05-18"
description: "Working notes on where the milliseconds go in a live StreamDiffusion pipeline, and how to claw back enough to hold 30fps."
draft: true
---

## Question

Where does the frame time actually go, end to end, in a live diffusion visual
pipeline — and what's the realistic floor on consumer/prosumer hardware?

## Stages to measure

- Capture (Kinect) → texture prep
- UDP transport between analysis and render machines
- StreamDiffusion inference (steps, denoise, resolution)
- Projection / display

## Hypotheses

- Resolution and step count dominate; transport is negligible.
- There's a denoise sweet spot that trades coherence for frame rate.

## To gather

- Per-stage timings at a few resolutions.
- Quality-vs-fps curve.
