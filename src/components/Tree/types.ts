import React from "react";

import {NodeType} from '../Node/types';

type OwnProps = {
    data: NodeType[],
    handleNodeClick: (id: string | null) => void,
    selectedNodeId: string | null,
    showInput: boolean,
    newName: string,
    handleInputChange: (value: string) => void
};

export type Props = React.FC<OwnProps>
