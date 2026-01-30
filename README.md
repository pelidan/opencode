# OpenCode Desktop Build Fork

> **This is a community fork** of [OpenCode](https://github.com/anomalyco/opencode) focused on providing Linux desktop builds for Ubuntu 22.04.

## About This Fork

This repository is maintained to build the **OpenCode Desktop application** specifically for **Ubuntu 22.04 (x86_64)**. The upstream OpenCode project is developed by [Anomaly Co](https://github.com/anomalyco) and provides a full-featured AI coding agent with CLI, desktop, and web interfaces.

### What This Fork Provides

- **Linux Desktop Builds**: Pre-built `.deb` packages for Ubuntu 22.04
- **Automated Releases**: GitHub Actions workflow that builds from upstream tags
- **Release Naming**: `v{VERSION}-ubuntu2204` (e.g., `v1.1.45-ubuntu2204`)

### Upstream Repository

**Official OpenCode Project**: [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)

For the full OpenCode experience including:

- CLI installation (npm, brew, scoop, etc.)
- Official desktop builds for all platforms
- Documentation and support
- Contributing guidelines
- Community and Discord

Please visit the [upstream repository](https://github.com/anomalyco/opencode) and [opencode.ai](https://opencode.ai).

---

## Installation (Ubuntu 22.04)

### Download from Releases

1. Go to the [Releases](../../releases) page
2. Download the latest `.deb` package: `opencode-desktop_{VERSION}_ubuntu2204_amd64.deb`
3. Install:

```bash
sudo dpkg -i opencode-desktop_*_ubuntu2204_amd64.deb
sudo apt-get install -f  # Fix any dependency issues
```

### System Requirements

- Ubuntu 22.04 (x86_64)
- ~200MB disk space
- Dependencies (auto-installed): webkit2gtk, libappindicator3

---

## About OpenCode

<p align="center">
  <a href="https://opencode.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo">
    </picture>
  </a>
</p>
<p align="center">The open source AI coding agent.</p>

[![OpenCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://opencode.ai)

---

### Official Installation Methods (Upstream)

```bash
# YOLO
curl -fsSL https://opencode.ai/install | bash

# Package managers
npm i -g opencode-ai@latest        # or bun/pnpm/yarn
scoop install opencode             # Windows
choco install opencode             # Windows
brew install anomalyco/tap/opencode # macOS and Linux (recommended, always up to date)
brew install opencode              # macOS and Linux (official brew formula, updated less)
paru -S opencode-bin               # Arch Linux
mise use -g opencode               # Any OS
nix run nixpkgs#opencode           # or github:anomalyco/opencode for latest dev branch
```

> [!TIP]
> Remove versions older than 0.1.x before installing.

### Official Desktop App (BETA) - Upstream

For official desktop builds for all platforms, visit the [upstream releases page](https://github.com/anomalyco/opencode/releases) or [opencode.ai/download](https://opencode.ai/download).

| Platform              | Download                              |
| --------------------- | ------------------------------------- |
| macOS (Apple Silicon) | `opencode-desktop-darwin-aarch64.dmg` |
| macOS (Intel)         | `opencode-desktop-darwin-x64.dmg`     |
| Windows               | `opencode-desktop-windows-x64.exe`    |
| Linux (official)      | `.deb`, `.rpm`, or AppImage           |
| **Linux (this fork)** | **Ubuntu 22.04 `.deb` only**          |

```bash
# macOS (Homebrew)
brew install --cask opencode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/opencode-desktop
```

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$OPENCODE_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if exists or can be created)
4. `$HOME/.opencode/bin` - Default fallback

```bash
# Examples
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://opencode.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash
```

---

## Upstream Documentation & Resources

### Agents

OpenCode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also, included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](https://opencode.ai/docs/agents).

### Documentation

For configuration, usage, and more: [**opencode.ai/docs**](https://opencode.ai/docs)

### Contributing

Contributions should be made to the upstream repository. See [contributing docs](https://github.com/anomalyco/opencode/blob/dev/CONTRIBUTING.md).

### Community

**Join the OpenCode community**:

- [Discord](https://discord.gg/opencode)
- [X.com](https://x.com/opencode)
- [GitHub Discussions](https://github.com/anomalyco/opencode/discussions)

---

## Fork Maintenance

### Build Workflow

This fork uses a GitHub Actions workflow to automatically build desktop releases from upstream tags:

- **Workflow**: `.github/workflows/build-linux-desktop.yml`
- **Trigger**: Manual (workflow_dispatch)
- **Source**: Latest upstream `v*.*.*` tag
- **Output**: `.deb` package for Ubuntu 22.04 x86_64
- **Release**: Tagged as `v{VERSION}-ubuntu2204`

### Building Locally

To build the desktop app locally:

```bash
# Prerequisites
sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clone and build
git clone https://github.com/YOUR-FORK/opencode.git
cd opencode
git checkout v1.1.45  # or latest tag
bun install
cd packages/desktop
bun ./scripts/prepare.ts
cargo tauri build --target x86_64-unknown-linux-gnu --bundles deb
```

The `.deb` package will be in:
`packages/desktop/src-tauri/target/x86_64-unknown-linux-gnu/release/bundle/deb/`

---

## Disclaimers

- **Not Affiliated**: This fork is not built by or affiliated with the OpenCode team or Anomaly Co
- **No Support**: For OpenCode support, please use the [official channels](https://github.com/anomalyco/opencode/discussions)
- **No Warranty**: Desktop builds are provided as-is without warranty
- **Ubuntu 22.04 Only**: These builds are specifically compiled for Ubuntu 22.04 and may not work on other distributions
- **No Auto-Updates**: Builds are unsigned and do not support Tauri's auto-update mechanism

---

## License

This fork maintains the same [MIT License](LICENSE) as the upstream OpenCode project.

Copyright (c) 2024 Anomaly Innovations LLC (upstream)

---

## FAQ (Upstream)

### Building on OpenCode

If you are working on a project that's related to OpenCode and is using "opencode" as a part of its name; for example, "opencode-dashboard" or "opencode-mobile", please add a note to your README to clarify that it is not built by the OpenCode team and is not affiliated with us in any way.

### FAQ

### How is this different from Claude Code?

It's very similar to Claude Code in terms of capability. Here are the key differences:

- 100% open source
- Not coupled to any provider. Although we recommend the models we provide through [OpenCode Zen](https://opencode.ai/zen); OpenCode can be used with Claude, OpenAI, Google or even local models. As models evolve the gaps between them will close and pricing will drop so being provider-agnostic is important.
- Out of the box LSP support
- A focus on TUI. OpenCode is built by neovim users and the creators of [terminal.shop](https://terminal.shop); we are going to push the limits of what's possible in the terminal.
- A client/server architecture. This for example can allow OpenCode to run on your computer, while you can drive it remotely from a mobile app. Meaning that the TUI frontend is just one of the possible clients.

For more FAQs, visit the [upstream documentation](https://opencode.ai/docs).

---

**Upstream Resources**: [OpenCode.ai](https://opencode.ai) | [GitHub](https://github.com/anomalyco/opencode) | [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
