# don't read further - the original opencode-desktop works on Ubuntu 22.04 since its rewrite from Tauri to Electron, you don't need this anymore

# opencode-desktop for Ubuntu 22.04

Fork of [anomalyco/opencode](https://github.com/anomalyco/opencode) that builds the desktop app (`.deb`) targeting **Ubuntu 22.04 (x86_64)**.

## What it does

A GitHub Actions workflow runs daily (and on manual trigger), picks up the latest stable release from upstream, and builds a `.deb` package on `ubuntu-22.04` runners. Releases are tagged as `<upstream-tag>-ubuntu2204`.

## Important notes

- **Packages are unsigned.** You may need to install with `sudo dpkg -i <file>.deb` or pass `--force-bad-verify`.
- **Auto-update is disabled.** The Tauri updater is patched out during build. Update manually by downloading new releases from this repo.

## Install

```bash
# Download the .deb from the latest release, then:
sudo dpkg -i opencode-desktop_*_ubuntu2204_amd64.deb
sudo apt-get install -f  # fix any missing dependencies
```
