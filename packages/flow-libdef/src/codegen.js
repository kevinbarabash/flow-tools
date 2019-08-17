// @flow
import prettier from "prettier";
import type {Program} from "flow-ast";

export default function(program: Program) {
    return prettier.format("placeholder", {
        parser(text) {
            return program;
        },
    });
}
