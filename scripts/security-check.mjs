// ─────────────────────────────────────────────
//  Security gate, run before every build (locally, in GitHub checks and
//  on Vercel). Stops the build — so the update can't go live — when a
//  library the website ships with has a known CRITICAL vulnerability.
//  High / moderate ones are listed as warnings (GitHub's Dependabot
//  opens update pull requests for those).
//
//  If the vulnerability database can't be reached (registry outage), the
//  build continues with a warning rather than blocking every deploy.
// ─────────────────────────────────────────────
import { execFileSync } from "node:child_process"

const npm = process.platform === "win32" ? "npm.cmd" : "npm"
let report
try {
  report = execFileSync(npm, ["audit", "--omit=dev", "--json"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
} catch (err) {
  // npm audit exits with code 1 when it finds anything; the report is still on stdout.
  report = err.stdout
}

let data
try {
  data = JSON.parse(report)
} catch {
  console.warn("⚠ Security check skipped: the vulnerability database could not be reached.")
  process.exit(0)
}
if (data.error) {
  console.warn(`⚠ Security check skipped: ${data.error.summary || "npm audit failed"}.`)
  process.exit(0)
}

const counts = data.metadata?.vulnerabilities || {}
const list = Object.entries(data.vulnerabilities || {})
const line = ([name, v]) => {
  const titles = (v.via || []).filter((x) => typeof x === "object").map((x) => x.title)
  return `  - ${name} (${v.severity})${titles.length ? `: ${titles[0]}` : ""}`
}

if (counts.critical) {
  console.error(`✖ Security check failed: ${counts.critical} critical vulnerability(ies) in the website's libraries.`)
  list.filter(([, v]) => v.severity === "critical").forEach((e) => console.error(line(e)))
  console.error("  Update the affected packages (npm audit fix, or merge the Dependabot pull request) and build again.")
  process.exit(1)
}

const others = list.filter(([, v]) => v.severity === "high" || v.severity === "moderate")
if (others.length) {
  console.warn(`⚠ Security check: no critical issues, ${others.length} lower-severity issue(s) to update soon:`)
  others.forEach((e) => console.warn(line(e)))
} else {
  console.log("✓ Security check: no known vulnerabilities in the website's libraries.")
}
