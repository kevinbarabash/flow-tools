// @flow
import * as React from "react";

import HStack from "./components/hstack.js";
import VStack from "./components/vstack.js";
import Table from "./components/table.js";

import data from "../../../../coverage.json";

type Coverage = {
    covered: number,
    total: number,
};

type Report = {
    files: {[filename: string]: Coverage},
    dirs: {[dirname: string]: Coverage},
};

const report: Report = data;

const Spring = () => <div style={{flexGrow: 1, flexShrink: 1}}></div>;
const Strut = ({size}: {size: number}) => <div style={{flexGrow: 0, flexShrink: 0, flexBasis: size}}/> 

const root = /packages[\/]?/;

const App = () => {
    return <VStack>
        <h1>Flow Coverage Report</h1>
        <HStack>
            <VStack style={{flexGrow: 1}}>
                <h2>Directories</h2>
                <Table 
                    columns={[
                        {name: "path", align: "left"},
                        {name: "covered", align: "right"},
                        {name: "total", align: "right"},
                        {name: "percent", align: "right"},
                    ]} 
                    data={(Object.entries(report.dirs): any).map(([path, {covered, total}]) => {
                        const percent = (100 * covered / total).toFixed(0) + "%";
                        return {
                            path,
                            covered,
                            total,
                            percent,
                        };
                    })}
                />
            </VStack>
            <Strut size={16}/>
            <VStack style={{flexGrow: 1}}>
                <h2>Files</h2>
                <Table 
                    columns={[
                        {name: "path", align: "left"},
                        {name: "covered", align: "right"},
                        {name: "total", align: "right"},
                        {name: "percent", align: "right"},
                    ]} 
                    data={(Object.entries(report.files): any).map(([path, {covered, total}]) => {
                        const percent = (100 * covered / total).toFixed(0) + "%";
                        return {
                            path,
                            covered,
                            total,
                            percent,
                        };
                    })}
                />
            </VStack>
        </HStack>
    </VStack>
};

export default App;
