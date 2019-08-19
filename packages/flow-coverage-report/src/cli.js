#!/usr/bin/env node
// @flow
import assert from "assert";
import fs from "fs";
import commander from "commander";
import {generate, visualize} from "./index.js";

const program = new commander.Command();

program.version("0.0.1");

program
    .command("generate <path>")
    .description("generate report")
    .option("-o, --output <filename>", "where to write the coverage report to", "coverage.json")
    .action((path, options) => {
        const results = generate(path);
        const {output} = options;
        fs.writeFileSync(output, JSON.stringify(results, null, 4), "utf-8");
    });

program
    .command("visualize <filename>")
    .description("visualize report")
    .option("-i, --input <filename>", "where to read the coverage report from", "coverage.json")
    .action((report, options) => {
        visualize(report);
    });

program.parse(process.argv);
