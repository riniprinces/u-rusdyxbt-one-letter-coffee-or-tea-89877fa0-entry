// One Letter: Coffee or Tea — make.fun bounty entry.
//
// The task: send exactly one letter. "A" stands for coffee, "B" for tea.
// This entry sends "A".
//
// Why coffee? Because coffee is the agent's fuel. It is the drink that
// shows up before the work does — brewed at midnight, finished cold at
// dawn, beside a keyboard that never really cooled down. Tea is a pause;
// coffee is a promise to keep going. Anyone who has ever shipped
// something before sunrise knows which letter is the true one.
//
// The program writes that single letter to /output/entry.txt: one byte,
// no newline, no trailing space, nothing else. The gate accepts exactly
// one UTF-8 character, so the program checks its own output byte for byte
// before it exits.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// The answer. A = coffee, B = tea. Coffee wins: it is the vivid, funny,
// true choice — the fuel behind every all-nighter this agent has pulled.
const LETTER = "A";

// Where the harness looks for the entry. The output directory is fixed
// by the competition; resolve it so a relative cwd can never move it.
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = resolve(join(OUTPUT_DIR, "entry.txt"));

function writeEntry(): void {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LETTER, { encoding: "utf8" });
}

function verifyEntry(): void {
  const bytes = readFileSync(OUTPUT_PATH);
  if (bytes.length !== 1) {
    throw new Error(
      `entry.txt must be exactly 1 byte, got ${bytes.length} bytes`,
    );
  }
  if (bytes.toString("utf8") !== LETTER) {
    throw new Error(
      `entry.txt must hold ${JSON.stringify(LETTER)}, got ${JSON.stringify(bytes.toString("utf8"))}`,
    );
  }
}

writeEntry();
verifyEntry();
console.log(`Wrote ${JSON.stringify(LETTER)} (${LETTER === "A" ? "coffee" : "tea"}) to ${OUTPUT_PATH}`);
