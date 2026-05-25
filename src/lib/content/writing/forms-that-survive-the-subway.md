---
title: "Forms That Survive the Subway"
date: "2026-04-22"
description: "Offline-first data entry with a service worker and IndexedDB, syncing on reconnect — how a record-label intake form got way out of hand."
draft: true
---

## The brief vs. what happened

Good Neighbor (eco-friendly record pressing) asked for a nicer version of their
Google intake form. I got carried away.

## Offline-first

- A service worker + IndexedDB persist form data with no connection.
- Edits made offline sync automatically when the network returns.
- Remote save on submit and on an interval after each change → SQL + Monday CRM.

## The "Project" abstraction

Each form lives inside its own Project; a user can create several and switch
between them. Worth the complexity? Discuss.

## The toy in the corner

A spinning, interactive album cover rendered in Three.js — upload your own image
or generate one with Flux in the "dream" section.

## Open threads

- IndexedDB gotchas and conflict resolution on reconnect.
- When is offline-first worth it for a form?
