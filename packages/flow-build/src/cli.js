#!/usr/bin/env node
import commander from "commander";
import {build, watch} from "./index.js";

const program = new commander.Command();
program.version("0.0.1");
program.option("-w, --watch", "watch mode");

program.parse(process.argv);

if (program.watch) {
    watch();
} else {
    build();
}
