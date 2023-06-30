import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";
import {StrictModeDroppable} from "./StrictModeDroppable";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

const DraggableElement = ({ prefix, elements, editMode }) => (
  <DroppableStyles>
    <ColumnHeader>{prefix} - {elements.length}</ColumnHeader>
    <StrictModeDroppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} numWords={item.numWords} editMode={elements.length>1?editMode:true} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  </DroppableStyles>
);

export default DraggableElement;
