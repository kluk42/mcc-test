import Node from '../Node'
import { Props } from './types';

import './Tree.css'

const Tree: Props = ({ data, handleNodeClick, selectedNodeId, showInput, newName, handleInputChange }) => {
    return (
        <ul className="tree">
            {data.map(node => (
                <Node
                    key={node.id}
                    node={node}
                    handleNodeClick={handleNodeClick}
                    selectedNodeId={selectedNodeId}
                    showInput={showInput}
                    newName={newName}
                    handleInputChange={handleInputChange}
                />
            ))}
        </ul>
    )
}

export default Tree;
