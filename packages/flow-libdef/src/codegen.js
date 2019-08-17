// @flow
import prettier from "prettier";
import type {Program} from "./ast";

export default function(program: Program) {
    return prettier.format("placeholder", {
        parser(text) {
            return program;
        },
    });
}
