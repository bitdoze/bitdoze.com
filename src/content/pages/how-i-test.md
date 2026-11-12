---
title: "How I Test"
meta_title: "How I Test the Guides and Gear on Bitdoze"
description: "The lab, the process, and the rules behind every guide and product pick on bitdoze.com — what 'tested' actually means here."
draft: false
---

Every claim of "tested" on this site points back to a real machine and a real terminal. This page describes the lab, the process, and where the limits are — so you can judge the guides accordingly.

## The lab

- **Home lab:** a small rack of mini PCs (Intel N-series and Ryzen boxes) running Proxmox, used for Docker stacks, monitoring tools, and NAS/storage builds.
- **VPS fleet:** small instances at the providers I write about — Hetzner, DigitalOcean, Vultr and others — used for install guides and benchmarks. Most guides are written on a fresh VPS, not a lab box that already has the config.
- **Desktop:** a Mac for day-to-day work, plus Windows and Linux machines for Samba, desktop-app and driver guides.

## What "tested" means for guides

- Every command, config file, and compose stack in a guide is one I ran myself, start to finish, on the OS versions named in the article. If a step says "you should see X", I saw X.
- Guides are written while doing the install, not reconstructed from memory — that's why they include the small failure cases (busy ports, missing kernel modules, permission errors) that vendor docs skip.
- Copy-paste means it: commands are written to run verbatim. Where you must substitute a value, it's marked.
- Version-sensitive guides are updated when the software changes materially; the "Updated" date on a post reflects a real re-check, not a typo fix.

## What "tested" means for hardware and picks

- Buying guides are based on gear I bought or have direct hands-on time with, plus spec-sheet and firmware research where something wasn't in my lab.
- When a post says a product was *tested*, it was physically in the rack or on the desk — benchmarks, temps, noise and quirks are mine. Where numbers come from the vendor or other reviewers, the article says so, and the title says "Compared" rather than "Tested".
- Affiliate links never change the pick order. Recommendations follow the same rule as the guides: if I wouldn't run it myself, it isn't recommended. See the [affiliate disclosure policy](/privacy/) for the details.

## Feedback

If a guide didn't work for you — a broken command, a changed UI, an outdated step — tell me through the [contact page](/contact/) or the "Did this guide work?" widget at the end of every article. Failed-guide reports go to the top of the update queue; keeping the archive current is the whole point of the site.
