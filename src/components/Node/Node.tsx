import { useEffect, useState } from 'react';

import Tree from '../Tree';

import { Props } from './types';

import './Node.css'

const Node: Props = ({ node, handleNodeClick, selectedNodeId, showInput, newName, handleInputChange }) => {
    const [isSelected, setIsSelected] = useState(node.id === selectedNodeId);

    useEffect(() => {
        setIsSelected(selectedNodeId === node.id);
    }, [selectedNodeId, node.id])

    const nodeClickHandler = () => {
        if (isSelected) {
            handleNodeClick(null);
        } else {
            handleNodeClick(node.id);
        }
    }

    if (selectedNodeId === node.id && showInput) {
        return (
            <>
                <input
                    type="text"
                    value={newName}
                    onChange={e => handleInputChange(e.target.value)}
                    placeholder="Новое имя"
                />
                {
                    node.subNodes.length > 0 &&
                    <Tree
                        handleNodeClick={handleNodeClick}
                        data={node.subNodes}
                        selectedNodeId={selectedNodeId}
                        showInput={showInput}
                        newName={newName}
                        handleInputChange={handleInputChange}
                    />
                }
            </>
        )
    }

    if (node.subNodes.length > 0) {
        return (
            <>
                <li onClick={nodeClickHandler} className={`node__name ${isSelected && 'node__name_selected'}`}>{node.name}</li>
                <Tree
                    handleNodeClick={handleNodeClick}
                    data={node.subNodes}
                    selectedNodeId={selectedNodeId}
                    showInput={showInput}
                    newName={newName}
                    handleInputChange={handleInputChange}
                />
            </>
        )
    } else {
        return (
            <li className="node">
                <p onClick={nodeClickHandler} className={`node__name ${isSelected && 'node__name_selected'}`}>{node.name}</p>
            </li>
        )
    }
}

export default Node;
