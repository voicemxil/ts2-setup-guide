---
title: Troubleshooting
navtitle: Troubleshooting
navnum: 7
order: 7
---

# Troubleshooting

## First steps for any problem

1. Check `Documents\EA Games\<your version>\Logs\` — the `(computer name)-config-log.txt` shows what the game detected on your system, and exception logs record crashes.
2. Remove recently added custom content and test again.
3. Make sure you followed [Preparing Your PC](../preparing/) — outdated drivers and OneDrive sync cause a huge share of issues.

## Common issues

**Game won't start / DirectX 9 error** — usually a graphics configuration problem. Confirm the Graphics Rules from this guide are installed ([Graphics Setup](../graphics/)), and avoid exclusive fullscreen mode. One specific cause: exclusive fullscreen doesn't recognize refresh rates above 100 Hz, so on a display that *only* offers modes above that (a 120/144 Hz laptop screen, for example) the game can't find a valid mode. Use borderless or windowed mode instead — or, if you insist on fullscreen, lower the refresh rate or add a custom resolution at 60 Hz in your GPU driver's control panel.

**Pink flashing textures** — see [the pink flash fix](../graphics/#pink-flashing-pink-soup).

**Crash when visiting a lot with Sims (Intel graphics)** — broken Sim shadows in Intel drivers. The Graphics Rules in this guide disable them automatically on Intel hardware.

**Black boxes under Sims** — see [Sim shadows](../graphics/#sim-shadows).

**Extremely long loading times on AMD** — see [DXVK](../graphics/#dxvk-optional-amd-gpus).

**Sims2RPC files disappeared** *(Ultimate Collection)* — your antivirus quarantined them. Add an exception for the game folder and reinstall RPC.

**Disk space error / missing neighborhoods** — OneDrive is syncing your Documents. See [Preparing Your PC](../preparing/).

<!-- TODO: expand FAQ from Discord #ts2-faq before launch -->

## Where to get help

- [TS2 Community Discord](https://discord.gg/ts2community) — post in the help channels with your logs
- [r/Sims2Help](https://www.reddit.com/r/sims2help/) and its [wiki](https://www.reddit.com/r/sims2help/wiki/index/)
- [SimsCord](https://discord.gg/QB7YCpMH62)

When asking for help, include: your game version (UC or Legacy), your GPU, what you already tried, and your `(computer name)-config-log.txt`.
