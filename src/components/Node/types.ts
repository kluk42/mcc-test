import React from "react";

type OwnProps = {
    node: NodeType,
    handleNodeClick: (id: string | null) => void,
    selectedNodeId: string | null,
    showInput: boolean,
    newName: string,
    handleInputChange: (value: string) => void
};

export type Props = React.FC<OwnProps>

export type NodeType = {
    id: string,
    name: string,
    subNodes: NodeType[],
}
