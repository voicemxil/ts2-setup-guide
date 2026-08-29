---
title: Graphics Setup
navtitle: Graphics Setup
navnum: 4
order: 4
---

# Graphics Setup

Out of the box, the original Sims 2 can't recognize modern graphics cards. Results range from crashes and DirectX errors to forced low settings, wrong texture memory, and the infamous **pink flashing**. The fixes on this page solve that.

::: tip
The [Setup Installer](../installer/) applies all of this automatically. This page explains what's being done and how to do it by hand.
:::

## The Graphics Rules file

The game reads its graphics configuration from a script: `Graphics Rules.sgr`. This guide uses a modernized Graphics Rules that:

- Enables the full **High** quality tier on any modern GPU — no per-card workarounds from 2004
- Removes the broken texture memory estimation
- Supports any screen resolution (up to 16000×16000)
- Disables "dirty rectangle" rendering, fixing transparent flickering graphics and enabling depth-buffer access for ReShade
- **Intel graphics:** automatically uses Medium shadows (Sim shadows off) — broken shadow rendering in Intel drivers (including Arc) otherwise crashes the game when visiting a lot with Sims

This replaces the old **Graphics Rules Maker** workflow. You do not need GRM, and this guide no longer recommends it.

<!-- TODO: download link for the Graphics Rules files + install path instructions for manual users -->

**Manual install:** copy `Graphics Rules.sgr` (and `Video Cards.sgr`) into the game's config folder:

::: track UC
`<game folder>\Fun with Pets\SP9\TSData\Res\Config\`

(Disc installs: your newest pack's folder instead, e.g. `The Sims 2 Mansion and Garden Stuff\TSData\Res\Config\`.)
:::

::: track Legacy
`<game folder>\EP9\TSData\Res\Config\`
:::

## Pink flashing / "pink soup"

Textures flashing pink is not a texture memory problem — it's a 32-bit-era failsafe that refuses to link shaders once memory addresses climb too high (which the 4 GB patch makes common). **[TS2MemCapRemover](https://github.com/spockthewok/TS2MemCapRemover)** by SpockTheWok patches the failsafe out.

::: track UC
Install it as an `.asi` mod — with Sims2RPC installed, drop it into the RPC `mods` folder. Requires the 4 GB patch (RPC's settings can apply it).
:::

::: track Legacy
**TS2 Extender includes its own pink flashing fix** — with Extender installed ([Launching & Extras](../launch-and-extras/)), there's nothing more to do.
:::

## Sim shadows

The classic "black box under every Sim" bug:

::: track UC
Fixed by **simNopke's Sim Shadow Fix** — a `.package` in your Downloads folder (the installer uses the *medium* darkness variant). On Intel graphics (including Arc), shadows are disabled by the Graphics Rules instead, because Intel drivers crash on them entirely.
:::

::: track Legacy
Already fixed by EA in the Legacy Collection. Nothing to do.
:::

## DXVK (optional — AMD GPUs)

[DXVK](https://github.com/doitsujin/dxvk) translates the game's Direct3D 9 to Vulkan. It's recommended **only** for modern AMD cards (RX 400 and later), where it fixes extremely long loading times. On other hardware, skip it unless you have a specific reason.

::: track Legacy
Same idea on Legacy — `d3d9.dll` goes in `EP9\TSBin`.
:::

- Requires a Vulkan 1.3-capable GPU
- Extract the 32-bit `d3d9.dll` into the folder next to the game executable (`TSBin`)
- Run the game in **Borderless** or **Windowed** mode with DXVK — not exclusive fullscreen
- To allocate more than the default 2 GB of texture memory, create `dxvk.conf` next to it: `d3d9.maxAvailableMemory=4096`

## Screen resolution & UI size

The original game renders its UI at fixed pixel sizes, so the higher your resolution, the smaller the interface.

::: track UC
Options, from simplest to most involved:

- Run a lower in-game resolution in windowed mode and upscale with [Magpie](https://github.com/Blinue/Magpie/blob/main/README_EN.md) or Lossless Scaling
- **Experimental:** the [4K UI patch](https://github.com/lah7/sims2-4k-ui-patch) by lah7 upscales the game's actual UI resources for HiDPI displays — native 4K interface with crisper fonts. Offers 200% (4K) and an experimental 150% (1440p) scale. It has some known imperfections (e.g. cramped pie menus with many options), so treat it as the enthusiast option.
:::

::: track Legacy
The Legacy Collection scales its UI automatically based on your resolution. There's no settings toggle, but you can override the scale yourself: press `Ctrl+Shift+C` and enter `uintProp uiScaleFactor 1` (values 1–3; the game defaults to 2, where 1 is the smallest/sharpest UI and 3 the largest). The game saves this setting itself; if it doesn't stick, add the same line to `userStartup.cheat` in your `Documents\EA Games\The Sims 2 Legacy\Config` folder.

The 4K UI patch above does **not** support Legacy — it doesn't need it.
:::

---

Next: [Launching & Extras](../launch-and-extras/)
