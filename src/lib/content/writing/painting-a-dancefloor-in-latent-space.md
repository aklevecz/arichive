---
title: "Painting a Dancefloor in Latent Space"
date: "2026-05-20"
description: "Running live, audio-reactive StreamDiffusion visuals at 30fps with a Kinect and two networked machines — and what happened when the crowd found the curtain."
draft: true
---

## The setup

Two computers. One ingests the DJ's audio and does all the analysis; the other
receives that analysis over UDP and runs the visual pipeline. Why split it?

- Audio analysis and StreamDiffusion are both hungry; one machine couldn't hold 30fps.
- UDP keeps latency low and the two concerns decoupled.

## The pipeline

Kinect player-index → noise texture → StreamDiffusion → projection.

- How much denoising can you push before the dancer dissolves entirely?
- Live prompt manipulation as a performance instrument.

## The best part

People slowly realizing they could step *behind* the curtain and drive their own
trippy ideas. The installation became participatory by accident.

## Open threads

- Latency budget breakdown (see the research note).
- What I'd change for the next party.
