// @flow
import {parse} from "flow-parser";
import type {Program} from "./ast";

export default function(src: string): Program {
    return parse(src);
}
