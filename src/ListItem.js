import {Draggable} from "react-beautiful-dnd";
import {loremIpsum} from "react-lorem-ipsum";
import {generateFromString} from "generate-avatar";
import React, {useEffect, useMemo, useState} from "react";
import styled, {css} from "styled-components";

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border: 3px solid white;
  border-radius: 50%;
`;

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


const ListItem = ({item, index, numWords, editMode}) => {
    // const [randomHeader, setRandomHeader] = useState('');
    // const [randomContent, setRandomContent] = useState(item.content);
    // const randomHeader = useMemo(() => lorem.generateWords(2+Math.ceil(Math.random()*30)), []);
    const randomHeader = useMemo(() => loremIpsum({avgWordsPerSentence: 8, avgSentencesPerParagraph: 1, p: 1}), []);
    const randomContent = useMemo(() => loremIpsum({p: 1, avgSentencesPerParagraph: Math.round(numWords / 100), random: false}), []);

    // useMemo(()=>{
    //     setRandomHeader(loremIpsum({avgWordsPerSentence: 8, avgSentencesPerParagraph: 1, p: 1}));
    //     setRandomContent(loremIpsum({p: 1, avgSentencesPerParagraph: Math.round(numWords / 100), random: false}));
    // }, []);
/*
    useEffect(() => {
        setRandomHeader(loremIpsum({avgWordsPerSentence: 8, avgSentencesPerParagraph: 1, p: 1}));
        setRandomContent(loremIpsum({p: 1, avgSentencesPerParagraph: Math.round(numWords / 100), random: false}));
    }, [])
*/

    return (
        <Draggable draggableId={item.id} index={index} isDragDisabled={editMode}>
            {(provided, snapshot) => {
                return (
                    <DragItem
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <CardHeader>{randomHeader}</CardHeader>
                        <span>Content</span>
                        <CardFooter>
                            <span>{randomContent}</span>
                            <Author>
                                {item.id}
                                <Avatar
                                    src={`data:image/svg+xml;utf8,${generateFromString(item.id)}`}
                                />
                            </Author>
                        </CardFooter>
                        {!editMode && "Edit Mode Enabled"}
                    </DragItem>
                );
            }}
        </Draggable>
    );
};

export default ListItem;
