---
title: The Setup Installer
navtitle: Setup Installer
navnum: 3
order: 3
---

# The Setup Installer

<!-- TODO: name TBD — release link goes here -->

One installer that detects your copy of the game and applies everything this guide recommends. It does **not** download or contain the game itself — you need The Sims 2 already installed ([Getting the Game](../getting-the-game/)).

::: note
**Download:** coming soon — the installer is in development. Until then, the [Graphics Setup](../graphics/) and [Launching & Extras](../launch-and-extras/) pages describe every fix so you can apply them manually.
:::

## What it does

- Detects your installed version automatically (Ultimate Collection/disc and Legacy Collection register differently in the Windows registry — if you somehow have both, you'll be asked which one to set up)
- Sets your game language, auto-detected from Windows but changeable from a dropdown at setup time

::: track UC
- Installs **Sims2RPC** by Lazy Duchess — launcher, no-CD handling, 4 GB patch, and `.asi` mod loading
- Installs the modern **Graphics Rules** configuration (see [Graphics Setup](../graphics/))
- Installs **SpockTheWok's pink flash fix** ([TS2MemCapRemover](https://github.com/spockthewok/TS2MemCapRemover))
- Installs essential fix packages: Sim Shadow Fix, Bright CAS Fix, Pie Menu Text Fix, CEP
- Fixes an issue where some CAS items from the Happy Holiday Stuff Pack are missing
- Optionally installs **DXVK** (recommended for AMD RX 400+ GPUs)
- Installs required dependencies (Visual C++ x86 runtime, .NET)
:::

::: track Legacy
- Installs **TS2 Extender** by Lazy Duchess ([GitHub](https://github.com/LazyDuchess/TS2-Extender)) — fixes and tweaks including its own **pink flashing fix**, plus `.asi`/Lua mod loading
- Installs the modern **Graphics Rules** configuration (see [Graphics Setup](../graphics/))
- Installs essential fix packages and the CEP
- Optionally installs **DXVK** (recommended for AMD RX 400+ GPUs)
- Installs required dependencies
:::

All components are downloaded at install time from their official sources — the installer bundles nothing.

<!-- TODO: finalize per-track component list once the installer is built -->

## After installing

::: track UC
Launch the game with **Sims2RPC** (desktop/Start Menu shortcut). Do not launch `Sims2EP9.exe` directly or you may get an Origin error.
:::

::: track Legacy
Launch normally through Steam or the EA App.
:::

Continue to [Launching & Extras](../launch-and-extras/) for launcher settings worth configuring.
