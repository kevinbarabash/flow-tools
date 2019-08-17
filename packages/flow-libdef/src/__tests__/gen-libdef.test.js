// @flow
import genLibdef from "../gen-libdef";
import codegen from "../codegen";
import parse from "../parse";

describe("genLibdef", () => {
    // TODO: test declare function without the export
    it("should pass", () => {
        const ast = parse(
            "export function add(a: number, b: number): number { return a + b };",
        );

        const result = codegen(genLibdef(ast, "foo"));

        expect(result).toMatchInlineSnapshot(`
            "declare module \\"foo\\" {
              declare function add(a: number, b: number): number;
            }
            "
        `);
    });

    it("should pass 2", () => {
        const ast = parse(
            "export function add(a: number, b?: number): number { return a + b };",
        );

        const result = codegen(genLibdef(ast, "foo"));

        expect(result).toMatchInlineSnapshot(`
            "declare module \\"foo\\" {
              declare function add(a: number, b?: number): number;
            }
            "
        `);
    });
});
