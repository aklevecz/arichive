---
title: "A Bonding Curve for Party Tickets"
date: "2026-05-05"
description: "Quadratic pricing, a daily free-ticket lottery, and a custom Stripe checkout — designing ticket mechanics that reward showing up early."
draft: true
---

## The thesis

Ticket price should encode urgency. Mine rises on a quadratic curve in 1¢
increments, so prices climb gently at first and steeply as the event nears.

- Buy early, pay less — the curve does the nudging, not a banner.
- A sliding scale on top, discountable with a code.

## WIN TIX

Each day, one free ticket unlocks at a random time. First to press the button
at that moment wins. A tiny daily ritual that keeps people coming back.

## The build

- Custom checkout on the Stripe API (no off-the-shelf ticketing).
- Win or buy, and a silly generated image becomes your profile picture.
- Sign in by phone number to see your profile and ticket QR codes.

## Open threads

- Did the curve actually shift purchase timing? Pull the numbers.
- V1 vs V2 architecture — what the rewrite bought me.
