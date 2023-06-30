import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import {Button} from "@mui/material";

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
const getItems = (count, prefix) =>
    Array.from({length: count}, (v, k) => k).map((k) => {
        const randomId = Math.floor(Math.random() * 1000);
        return {
            id: `item-${randomId}`,
            prefix,
            content: `item ${randomId}`,
            numWords: randomId
        };
    });

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = ["todo", "inProgress", "done"];

const generateLists = () =>
    lists.reduce(
        (acc, listKey) => ({...acc, [listKey]: getItems(2, listKey)}),
        {}
    );

function DragList() {
    const [elements, setElements] = React.useState(generateLists());
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setElements(generateLists());
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const listCopy = {...elements};

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );

        setElements(listCopy);
    };

    // console.log(elements)
    return (
        <div>
            <Button onClick={()=>setEditMode(!editMode)}>Toggle Edit Mode</Button>
            <DragDropContextContainer>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ListGrid>
                        {lists.map((listKey) => (
                            <DraggableElement
                                elements={elements[listKey]}
                                key={listKey}
                                prefix={listKey}
                                editMode={editMode}
                            />
                        ))}
                    </ListGrid>
                </DragDropContext>
            </DragDropContextContainer>
        </div>
    );
}

export default DragList;
