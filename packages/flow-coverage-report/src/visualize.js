// @flow
import fs from "fs";
import path from "path";
import Bundler from "parcel-bundler";
import express from "express";

export default function(report: string) {
    const data = fs.readFileSync(report, "utf-8");

    // TODO: update flow-build to copy over other files so that the paths work
    const file = path.join(__dirname, "../src/ui/index.html"); // Pass an absolute path to the entrypoint here
    const options = {}; // See options section of api docs, for the possibilities

    const bundler = new Bundler(file, options);

    const app = express();
    app.use(bundler.middleware());

    // TODO: make the port configurable
    app.listen(8080);
};
