// @flow
declare module "sucrase" {
    declare export function transform(
        code: string,
        options: {
            transforms: Array<"flow" | "typescript" | "jsx" | "imports" | "react-hot-loader">,
        },
    ): {code: string, sourceMap: any};
}
