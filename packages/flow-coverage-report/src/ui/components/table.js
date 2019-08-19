// @flow
import * as React from "react";

type Props = {|
    columns: {
        name: string,
        align: "left" | "right" | "center",
    }[],
    data: {[string]: string}[],
|};

function Table({columns, data}: Props) {

    const rows = data.sort((a, b) => {
        if (a.path < b.path) {
            return -1;
        } else if (a.path > b.path) {
            return 1;
        } else {
            return 0;
        }
    });

    return <grid style={{display: "grid", gridTemplateColumns: "5fr 1fr 1fr 1fr"}}>
        {columns.map(col => <div style={{textAlign: col.align}}>{col.name}</div>)}
        {rows.map(row => <React.Fragment>
            <div style={{textAlign: columns[0].align}}>{row.path}</div>
            <div style={{textAlign: columns[1].align}}>{row.covered}</div>
            <div style={{textAlign: columns[2].align}}>{row.total}</div>
            <div style={{textAlign: columns[3].align}}>{row.percent}</div>
        </React.Fragment>)}
    </grid>
}

export default Table;
