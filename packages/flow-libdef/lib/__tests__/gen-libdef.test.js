"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// 
var _genlibdef = require('../gen-libdef'); var _genlibdef2 = _interopRequireDefault(_genlibdef);
var _codegen = require('../codegen'); var _codegen2 = _interopRequireDefault(_codegen);
var _parse = require('../parse'); var _parse2 = _interopRequireDefault(_parse);

describe("genLibdef", () => {
    // TODO: test declare function without the export
    it("should pass", () => {
        const ast = _parse2.default.call(void 0, 
            "export function add(a: number, b: number): number { return a + b };",
        );

        const result = _codegen2.default.call(void 0, _genlibdef2.default.call(void 0, ast, "foo"));

        expect(result).toMatchInlineSnapshot(`
        "declare module \\"foo\\" {
          declare function add(a: number, b: number): number;
        }
        "
    `);
    });

    it("should pass 2", () => {
        const ast = _parse2.default.call(void 0, 
            "export function add(a: number, b?: number): number { return a + b };",
        );

        const result = _codegen2.default.call(void 0, _genlibdef2.default.call(void 0, ast, "foo"));

        expect(result).toMatchInlineSnapshot(`
      "declare module \\"foo\\" {
        declare function add(a: number, b?: number): number;
      }
      "
    `);
    });
});
