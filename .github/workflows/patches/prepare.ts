#!/usr/bin/env bun
import { $ } from "bun"

import { Script } from "@opencode-ai/script"
import { copyBinaryToSidecarFolder, windowsify } from "./utils"

const pkg = await Bun.file("./package.json").json()
pkg.version = Script.version
await Bun.write("./package.json", JSON.stringify(pkg, null, 2) + "\n")
console.log(`Updated package.json version to ${Script.version}`)

const dir = "src-tauri/target/opencode-binaries"

await $`mkdir -p ${dir}`

// CLI artifact download from upstream is never allowed
// The CLI must be built locally in this workflow and placed in the target directory
console.log("Using locally built CLI artifact (upstream download disabled)")

// Hardcode the CLI binary path since our build produces opencode-linux-x64 (not -baseline)
// regardless of what the upstream utils.ts expects
const RUST_TARGET = process.env.RUST_TARGET || "x86_64-unknown-linux-gnu"
await copyBinaryToSidecarFolder(windowsify(`${dir}/opencode-linux-x64/bin/opencode`), RUST_TARGET)
