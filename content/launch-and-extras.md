---
title: Launching & Extras
navtitle: Launching & Extras
navnum: 5
order: 5
---

# Launching & Extras

::: track UC
## Sims2RPC

The Ultimate Collection should be launched through **[Sims2RPC](https://lazyduchess.tumblr.com/post/631915230388158464/sims2rpc-mod-launcher-for-mansion-garden)** by Lazy Duchess. It provides:

- No-CD handling and the 4 GB patch
- `.asi` mod loading (used by the pink flash fix)
- Firstborn syndrome fix, automatic cache clearing
- Borderless window mode, camera & graphics tweaks
- Discord Rich Presence

**First launch:** run `Sims2RPC.exe` as administrator once so it can set itself up. Then open `Sims2RPCSettings.exe` and configure:

- **Window mode:** Borderless (recommended). Avoid exclusive Fullscreen on modern Windows — it causes DirectX errors and alt-tab issues, and doesn't work with DXVK.
- **Apply 4GB Patch:** on, if you have 8 GB+ of RAM (required for the pink flash fix)

::: warn
**Antivirus note:** some antivirus suites falsely flag Sims2RPC because it injects code into the game. If RPC files go missing or quarantine, add an exception for your Sims 2 folder and reinstall RPC.
:::

Don't launch `Sims2EP9.exe` directly — it's the original executable and will show an Origin error.
:::

::: track Legacy
## TS2 Extender

The Legacy Collection launches normally through Steam or the EA App, with **[TS2 Extender](https://github.com/LazyDuchess/TS2-Extender)** by Lazy Duchess installed alongside for:

- Intro video skip
- Fixed random number generation (solves Firstborn syndrome)
- `.asi` and Lua mod loading
- Expanded modding support (separate top/bottom clothing in all outfit categories, and more)
:::

## The Sims 2 Body Shop

Body Shop is the tool for creating custom Sims content (skins, hair recolors, makeup, and more).

::: track UC
Included with the game: `<game folder>\Fun with Pets\SP9\CSBin\TS2BodyShop.exe`
:::

::: track Legacy
**Not included** — EA left Body Shop out of the Legacy Collection. The community fixed this: use the [Body Shop Installer for Legacy Collection](https://modthesims.info/d/690428/body-shop-installer-for-legacy-collection.html) on ModTheSims, which installs Body Shop and recreates the registry entries it needs (Legacy changed the game's registry layout and Body Shop was never updated for it).
:::

## Audio quality fix (optional, recommended)

The game's Sim voices are heavily compressed — and the Legacy Collection made them sound even worse. Lazy Duchess's **[Audio Quality Fix](https://lazyduchess.tumblr.com/post/774717270102523904/audio-quality-fix-for-ts2-legacy-collection)** re-encodes all of the speech audio at higher quality.

- Extract the download into your `Downloads` folder ([Folders & Mods](../folders-and-mods/)) — it works like any other mod
- It's large (~2.5 GB) since it replaces every voice file
- Made for Legacy, where the compression is worst, but works on the Ultimate Collection too

## ReShade (optional)

[ReShade](https://reshade.me) adds post-processing shaders (color grading, ambient occlusion, etc.). The Graphics Rules in this guide already disable dirty rectangles, which ReShade's depth-buffer effects require. Use ReShade 6+.

::: track UC
Install ReShade (with full add-on support) targeting `Sims2EP9RPC.exe`, select the **DirectX 10/11/12** API, then rename the created `dxgi.dll` to `reshade.asi` and move it into RPC's `mods` folder. If you use DXVK, install the **Vulkan** version of ReShade instead.
:::

::: track Legacy
Same process, with TS2 Extender as the loader instead of RPC: install ReShade (with full add-on support) targeting the game executable in `EP9\TSBin`, select the **DirectX 10/11/12** API, then rename the created `dxgi.dll` to `reshade.asi` and move it into TS2 Extender's mods folder. <!-- TODO: verify exact Extender asi folder name/path -->
:::

---

Next: [Folders & Mods](../folders-and-mods/)
