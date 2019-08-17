// @flow
import {parse} from "flow-parser";
import prettier from "prettier";
import fs from "fs";

const a: string = "hello";

type Point = {|
    x: number,
    y: number,
|};

const source = fs.readFileSync("./src/index.js", "utf-8");
const ast = parse(source);

const p: Point = {x: 5, y: 10};
const q: Point = {...p};

console.log(`q = (${q.x}, ${q.y})`);

// TODO: use prettier to output top-level statements one at a time
// TODO: attach comments to nodes using leadingComments and trailingComments
// for (const stmt of ast.body) {
//     // console.log(line);

//     const output = prettier.format("placeholder", {
//         parser(text) {
//             return {
//                 type: 'Program',
//                 body: [ stmt ],
//                 // TODO: figure out which comments go with which statements
//                 // comments: ast.comments.slice(1),
//             };
//         }
//     });

//     console.log(output);
// }

// const output = prettier.format("placeholder", {
//     parser(text) {
//         return ast;
//     }
// });
// console.log(output);

import {extractImports} from "./src/utils.js";

const entrySource = fs.readFileSync("./test/fixtures/entry.js", "utf-8");
extractImports(entrySource);
