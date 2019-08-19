// @flow
import child_process from "child_process";
import fs from "fs";
import path from "path";
import glob from "glob";
import matchAll from "match-all";
import {parse} from "@babel/parser";
import traverse from "@babel/traverse";

const flowBin = "./node_modules/.bin/flow";

export default function(root: string) {
    const files = glob.sync(`${root}/**/*.@(js|jsx)`, {
        // TODO: make ignore configurable
        ignore: `${root}/*/@(lib|node_modules)/**`,
    });

    console.log("stopping flow...");
    child_process.execSync(`${flowBin} stop`);

    console.log("running batch-coverage...");
    const rawCoverage = child_process.execSync(
        `${flowBin} batch-coverage --strip-root --show-all ${root}`, 
        {encoding: "utf-8"},
    );

    const regex = /([^:\s\n]+): ([^%]+)% \(([0-9]+) of ([0-9]+) expressions\)/g;

    const results = {};

    let match;
    while (match = regex.exec(rawCoverage)) {
        const [_, file, percent, covered, total] = match;
        if (files.includes(file)) {
            results[file] = {
                covered: parseInt(covered),
                total: parseInt(total),
            };
        }
    }

    console.log("computing expression counts for @noflow files and rollups");
    const rollups = {};
    for (const file of files) {
        if (!results.hasOwnProperty(file)) {
            const code = fs.readFileSync(file, "utf-8");
            console.log(`parsing ${file}`);
            const ast = parse(code, {
                plugins: [
                    "jsx",
                    "flow",
                    "classProperties",
                    "dynamicImport",
                ],
                sourceType: "module",
            });

            let expressionCount = 0;
            traverse(ast, {
                enter(path) {
                    if (path.isExpression()) {
                        expressionCount++;
                    } else if (path.isImportSpecifier()) {
                        expressionCount++;
                    } else if (path.isClass()) {
                        expressionCount++;
                    } else if (path.isJSXAttribute()) {
                        expressionCount++;
                    } else if (path.isJSXSpreadAttribute()) {
                        expressionCount++;
                    }
                }
            });

            results[file] = {
                covered: 0,
                total: expressionCount,
            };
        }

        const dir = path.dirname(file);
        const parts = dir.split("/");
        const dirs = [];
        
        let prevDir = "";
        for (const part of parts) {
            const nextDir = prevDir + "/" + part;
            prevDir = nextDir;
            dirs.push(nextDir);
        }

        for (const dir of dirs) {
            if (!rollups.hasOwnProperty(dir)) {
                rollups[dir] = {
                    covered: 0,
                    total: 0,
                };
            }
            rollups[dir].covered += results[file].covered;
            rollups[dir].total += results[file].total;
        }
    }

    return {
        files: results,
        dirs: rollups,
    };
}
