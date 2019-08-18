#!/usr/bin/env node
// @flow
import assert from "assert";
import fs from "fs";
import commander from "commander";
import {generateReport} from "./index.js";

const program = new commander.Command();
program.version("0.0.1");
program.arguments("<path>");

program.parse(process.argv);

assert(program.args.length > 0);

const results = generateReport(program.args[0]);

fs.writeFileSync("coverage.json", JSON.stringify(results, null, 4), "utf-8");
console.log("wrote coverage.json");
