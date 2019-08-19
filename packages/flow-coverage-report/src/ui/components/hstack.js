// @flow
import * as React from "react";

const HStack = ({children, style}: {children?: React.Node, style: any}) =>
    <div style={{display: "flex", flexDirection: "row", ...style}}>
        {children}
    </div>;

HStack.defaultProps = {
    style: {},
};

export default HStack;
