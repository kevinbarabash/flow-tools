// @flow
import * as React from "react";
import {useState} from "react";

type Props = {|
    columns: {
        name: string,
        align?: "left" | "right" | "center",
        format?: (value: any) => string,
    }[],
    data: {[string]: string}[],
|};

function Table({columns, data}: Props) {
    const [name, setName] = useState("path");
    const [order, setOrder] = useState<1 | -1>(1);

    const rows = data.sort((a, b) => {
        let result = 0;
        if (a[name] < b[name]) {
            result = -1;
        } else if (a[name] > b[name]) {
            result = 1;
        }
        return order * result;
    });

    return <grid style={{display: "grid", gridTemplateColumns: "5fr 1fr 1fr 1fr"}}>
        {columns.map(col => 
            <div 
                key={col.name}
                style={{textAlign: col.align || "left", cursor: "pointer"}}
                onClick={() => {
                    if (col.name === name) {
                        // $FlowFixMe: flow doesn't know basic math
                        setOrder(order * -1);
                    }
                    setName(col.name);
                }}
            >
                {col.name}
            </div>)}
        {rows.map((row, index) => <React.Fragment key={index}>
            {columns.map(col => {
                const format = col.format || (x => x);
                const value = format(row[col.name]);
                const align = col.align;
                return <div style={{textAlign: align}}>{value}</div>
            })}
        </React.Fragment>)}
    </grid>
}

export default Table;
