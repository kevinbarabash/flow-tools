// @flow
import path from "path";
import fs from "fs";
import {promisify} from "util";
import {transform} from "sucrase";
import chokidar from "chokidar";
import glob from "glob";
import rimraf from "rimraf";
import mkdirp from "mkdirp";

const compilerOptions = {transforms: ["flow", "imports", "jsx"]};

export function build() {
    const packageRoots = glob.sync("packages/*");

    for (const root of packageRoots) {
        // clean the output directory
        rimraf.sync(path.join(root, "lib"));
        
        const inputPaths = glob.sync(path.join(root, "src", "**", "*.js"));

        for (const inputPath of inputPaths) {
            const inputCode = fs.readFileSync(inputPath, "utf-8");
            const outputCode = transform(inputCode, compilerOptions).code;
            const outputPath = inputPath.replace(path.join(root, "src"), path.join(root, "lib"));
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                mkdirp.sync(dir);
            }
            fs.writeFileSync(outputPath, outputCode, "utf-8");
            console.log(`wrote ${outputPath}`);
        }

        const pkgPath = `./${root}/package.json`;
        if (!fs.existsSync(pkgPath)) {
            console.log(`${pkgPath} doesn't exist.`);
            continue;
        }

        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
        const mainPath = path.join(root, pkg.main);

        // Make all bin paths executable
        if (pkg.bin) {
            for (const binPath of Object.values(pkg.bin)) {
                if (typeof binPath === "string") {
                    fs.chmodSync(path.join(root, binPath), "755");
                }
            }
        }

        const mainFlowPath = mainPath + ".flow";
        const mainSrcPath = mainPath.replace(path.join(root, "lib"), path.join(root, "src"));
        const mainSrcRelPath = path.relative(path.dirname(mainPath), mainSrcPath);
        const mainFlowCode = `// @flow\nexport * from "${mainSrcRelPath}"`;

        fs.writeFileSync(mainFlowPath, mainFlowCode);
    }
}

export function watch() {
    // TODO: watch .json files
    // - use .main to generate a .js.flow file and
    // - use .bin to chmod appropriate files
    const watcher = chokidar.watch("packages/*/src/**/*.js");

    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const exists = promisify(fs.exists);

    watcher.on("add", async inputPath => {
        try {
            const data = await readFile(inputPath, "utf-8");
            
            const {code} = transform(data, compilerOptions);
            // TODO: make sure this package/flow-*/src => package/flow-*/lib
            const outputPath = inputPath.replace("/src/", "/lib/");

            if (!await exists(path.dirname(outputPath))) {
                mkdirp.sync(path.dirname(outputPath));
            }

            await writeFile(outputPath, code, "utf-8");

            console.log(`added ${outputPath}`);
        } catch (e) {
            console.warn(e);
        }
    });
    watcher.on("change", async inputPath => {
        try {
            const data = await readFile(inputPath, "utf-8");
            
            const {code} = transform(data, compilerOptions);
            // TODO: make sure this package/flow-*/src => package/flow-*/lib
            const outputPath = inputPath.replace("/src/", "/lib/");

            await writeFile(outputPath, code, "utf-8");

            console.log(`changed ${outputPath}`);
        } catch (e) {
            console.warn(e);
        }
    });
    watcher.on("unlink", path => {
        // TODO: make sure this package/flow-*/src => package/flow-*/lib
        fs.unlink(path.replace("/src/", "/lib/"), (err) => {
            if (err) {
                console.warn(err);
            }
            console.log(`deleted: ${path}`);
        });
    });
}
