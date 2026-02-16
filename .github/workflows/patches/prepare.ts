#!/usr/bin/env bun
import { $ } from "bun"

import { Script } from "@opencode-ai/script"
import { copyBinaryToSidecarFolder, getCurrentSidecar, windowsify } from "./utils"

const pkg = await Bun.file("./package.json").json()
pkg.version = Script.version
await Bun.write("./package.json", JSON.stringify(pkg, null, 2) + "\n")
console.log(`Updated package.json version to ${Script.version}`)

const sidecarConfig = getCurrentSidecar()

const dir = "src-tauri/target/opencode-binaries"

await $`mkdir -p ${dir}`

// CLI artifact download from upstream is never allowed
// The CLI must be built locally in this workflow and placed in the target directory
console.log("Using locally built CLI artifact (upstream download disabled)")

await copyBinaryToSidecarFolder(windowsify(`${dir}/${sidecarConfig.ocBinary}/bin/opencode`))
