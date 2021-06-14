import _uniqueId from 'lodash/uniqueId';
import { useEffect, useState } from 'react';

import { NodeType } from '../Node/types';
import { Props } from './types';

import './App.css';

import Tree from '../Tree';

const initialState: NodeType[] = [
    {
        id: _uniqueId(),
        name: 'Node 1',
        subNodes: [
            {
                id: _uniqueId(),
                name: 'Node 2',
                subNodes: [
                    {
                        id: _uniqueId(),
                        name: 'Node 3',
                        subNodes: [],
                    },
                    {
                        id: _uniqueId(),
                        name: 'Node 4',
                        subNodes: [
                            {
                                id: _uniqueId(),
                                name: 'Node 7',
                                subNodes: []
                            }
                        ]
                    }
                ]
            },
        ],
    },
    {
        id: _uniqueId(),
        name: 'Node 5',
        subNodes: [
            {
                id: _uniqueId(),
                name: 'Node 6',
                subNodes: []
            }
        ]
    },
]

const App: Props = () => {
    const [tree, setTree] = useState<NodeType[]>(initialState);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [newName, setNewName] = useState('');
    const [isInputRendered, setIsInputRendered] = useState(false);

    useEffect(() => {
        if (isInputRendered) {
            setIsInputRendered(!!selectedNodeId)
        }
    }, [selectedNodeId, isInputRendered]);

    const deepFilter = (arr: NodeType[], idToDelete: string) => {
        const indxToDelete = arr.findIndex(n => n.id === idToDelete);
        if (indxToDelete !== -1) {
            arr.splice(indxToDelete, 1);
            return
        } else {
            arr.forEach(node => {
                if (node.subNodes.length > 0) {
                    deepFilter(node.subNodes, idToDelete)
                }
            })
        }
    }

    const handleRemoveClick = () => {
        if (!selectedNodeId) return;
        const newTree = JSON.parse(JSON.stringify(tree));
        deepFilter(newTree, selectedNodeId);
        setTree(newTree);
        setSelectedNodeId(null);
    }

    const handleAddClick = () => {
        if (selectedNodeId) {
            let numberOfNodes = 0;
            let wasInserted = false;
            const newNode: NodeType = {
                id: _uniqueId(),
                name: `Node ${numberOfNodes}`,
                subNodes: [],
            };
            const newTree: NodeType[] = JSON.parse(JSON.stringify(tree));
            const traverser = (arr: NodeType[]) => {
                numberOfNodes += arr.length;
                if (!wasInserted) {
                    const nodeToUpdate = arr.find(node => node.id === selectedNodeId);
                    if (nodeToUpdate) {
                        nodeToUpdate.subNodes.push(newNode);
                        wasInserted = true;
                    }
                }
                arr.forEach(node => {
                    if (node.subNodes.length > 0) {
                        traverser(node.subNodes);
                    }
                })
            }
            traverser(newTree);
            newNode.name = `Node ${numberOfNodes}`;
            setTree(newTree);
            setSelectedNodeId(null)
        }
    }

    const handleEditClick = () => {
        if (!isInputRendered) {
            setIsInputRendered(!!selectedNodeId);
        } else {
            if (selectedNodeId) {
                const newTree = JSON.parse(JSON.stringify(tree));
                const traverser = (arr: NodeType[], idToChange: string) => {
                    const nodeToChange = arr.find(node => node.id === idToChange);
                    if (nodeToChange) {
                        console.log(newName)
                        nodeToChange.name = newName.trim() !== '' ? newName : nodeToChange.name;
                        return
                    } else {
                        arr.forEach(node => {
                            if (node.subNodes.length > 0) {
                                traverser(node.subNodes, idToChange)
                            }
                        })
                    }
                };
                traverser(newTree, selectedNodeId);
                setTree(newTree);
                setSelectedNodeId(null);
                setNewName('');
            }
        }
    }

    return (
        <div className="App">
            <div className="envelope">
                <div className="workWindow">
                    <Tree
                        handleNodeClick={id => setSelectedNodeId(id)}
                        data={tree}
                        selectedNodeId={selectedNodeId}
                        showInput={isInputRendered}
                        newName={newName}
                        handleInputChange={(value) => setNewName(value)}
                    />
                </div>
                <div className="btns">
                    <button
                        className="btns__element"
                        onClick={handleAddClick}
                        disabled={isInputRendered}
                    >
                        Add
                    </button>
                    <button
                        className="btns__element"
                        onClick={handleRemoveClick}
                        disabled={isInputRendered}
                    >
                        Remove
                    </button>
                    <button
                        className="btns__element"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                    <button
                        className="btns__element"
                        onClick={() => { setSelectedNodeId(null); setTree(initialState) }}
                        disabled={isInputRendered}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
