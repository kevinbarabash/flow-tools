// @flow
import * as React from "react";

const VStack = ({children, style}: {children?: React.Node, style: any}) =>
    <div style={{display: "flex", flexDirection: "column", ...style}}>
        {children}
    </div>;

VStack.defaultProps = {
    style: {},
};

export default VStack;
