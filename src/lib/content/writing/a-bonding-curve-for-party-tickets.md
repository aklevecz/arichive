---
title: "A Bonding Curve for Party Tickets"
date: "2026-05-05"
description: "What happens when you let a curve, not a person, decide what a party ticket costs, and use a daily free-ticket lottery to turn pricing into a reason to keep showing up."
---

Most ticketing is a flat number with a deadline stapled to it: $30 until Friday,
$40 at the door. The deadline does the persuading. It's blunt, it's adversarial,
and everyone has learned to ignore it until the last possible second.

I wanted the *price itself* to carry the message, to say "you're early, here's a
reward" without a countdown banner yelling it. So instead of tiers, I priced
tickets on a bonding curve: the cost is a function of how many tickets have
already sold, rising in 1¢ increments along a gentle quadratic.

## Price as a sentence

A bonding curve is just a rule that maps supply to price. Borrowed from crypto,
but there's nothing crypto about the idea; it's a vending machine whose price
goes up every time someone buys.

Mine looks roughly like this:

```
price(n) = base + k * n²
```

where `n` is the number of tickets sold so far. With `base = $15` and a small
`k`, the first 50 tickets drift from $15 to about $20, almost flat. The next 50
climb from $20 to $35. The last stretch gets steep fast. Concretely:

- Ticket #10 → **$15.40**
- Ticket #100 → **$24.00**
- Ticket #200 → **$51.00**

The quadratic matters. A linear curve raises the price at a constant, predictable
clip, easy to game, easy to wait out. A quadratic stays nearly flat early
(so early birds feel almost no penalty for buying *now* versus an hour from now)
and then bends sharply once momentum builds. The cost of hesitation is small at
first and brutal later, which is exactly the shape of how scarcity actually feels
at a party that's filling up.

The price is doing the talking. There's no "EARLY BIRD ENDS SOON." The number
just quietly rewards conviction.

## The incentive it creates

The interesting thing about a continuous curve is that it removes the cliff.
Tiered pricing creates a stampede at each deadline and dead air in between, and you
watch the clock, not the event. A curve makes every moment the cheapest this
ticket will ever be again. The honest message to a buyer is: *it only goes up
from here.* That's true, and people can feel that it's true, which is why it
doesn't read as a gimmick.

It also aligns the buyer and the host. Early supporters, the people who commit
before there's social proof, who take the risk that the party might be empty,
pay the least. That's the right group to subsidize. They're the ones generating
the momentum that makes the later, pricier tickets sell at all.

## WIN TIX: turning price into a ritual

A curve that only goes up is a little grim if you can't afford to be early. So I
bolted on the opposite force: **WIN TIX**.

Every day, one free ticket unlocks at a random time. A button goes live, and the
first person to press it at that moment gets in for nothing. No leaderboard, no
points, no streak, just a small daily lottery with one winner.

This does something the curve can't. The curve rewards *money committed early*;
WIN TIX rewards *attention paid often*. Together they cover both kinds of fans:
the ones who'll pay to lock it in, and the ones who'll show up every day for a
shot at a freebie. The free drop also keeps the party in people's heads in the
weeks before; checking for the button becomes a tiny habit, and habits are worth
more than impressions.

There's a fairness logic to it too. A pure bonding curve quietly sorts people by
disposable income: get there first if you have the cash to commit blind. The
daily free ticket is the release valve: it's pure luck and pure attention, both
of which are evenly distributed. It keeps the thing from feeling like it's only
for people who can front the money.

## On top of the price: identity

A ticket is a transaction, but it doesn't have to *feel* like one. Whether you
win or buy, the moment you get a ticket the system generates a silly image and
hands it to you as a profile picture. Sign in with your phone number and you can
see your profile and your ticket QR codes.

That little generated avatar is doing quiet work. It converts a receipt into a
keepsake, something you half-want to show a friend, which means the ticket
markets the party for you. The incentive design doesn't stop at the price; it
runs all the way to the thing you're left holding.

## What I'd watch next

The open question with any incentive system is whether it *actually* changed
behavior or just feels clever. The thing I'd most want to know: did the curve
shift *when* people bought, or did everyone still wait? If the purchase
timestamps cluster early, the curve worked. If they pile up at the end anyway,
then the deadline instinct beat the math and I've just built a fancier flat price.

That's the real test of incentive design: not whether the mechanism is elegant,
but whether anyone moved because of it.
