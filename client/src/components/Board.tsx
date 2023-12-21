import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BoardType } from '../types';
const Board = ({ curBoard }: { curBoard: BoardType }) => {
  const [board, setBoard] = useState(curBoard);
  const [addList, setAddList] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<null | number>(null);
  const listFormRef = useRef<HTMLFormElement>(null);
  const cardFormRef = useRef<HTMLFormElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        listFormRef.current &&
        !listFormRef.current.contains(event.target as Node)
      ) {
        setAddList(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listFormRef]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cardFormRef.current &&
        !cardFormRef.current.contains(event.target as Node)
      ) {
        setCardIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardFormRef]);
  const handleNewList = (event: FormEvent) => {
    event.preventDefault();
    if (listInputRef.current) {
      const newListName = listInputRef.current.value;
      const newList = {
        name: newListName,
        cards: [],
      };
      setBoard((prevBoard) => ({
        ...prevBoard,
        lists: [...prevBoard.lists, newList],
      }));
    }
    setAddList(false);
  };
  const handleNewCard = (event: FormEvent) => {
    event.preventDefault();
    if (cardInputRef.current && cardIndex !== null) {
      const newCardName = cardInputRef.current.value;
      const newCard = {
        name: newCardName,
        people: [],
      };
      setBoard((prevBoard) => {
        const updatedLists = [...prevBoard.lists];
        updatedLists[cardIndex].cards.push(newCard);
        return { ...prevBoard, lists: updatedLists };
      });
    }
    if (cardInputRef.current) {
      cardInputRef.current.value = '';
    }
    setCardIndex(null);
  };
  const handleDeleteList = (listIndex: number) => {
    const updatedLists = board.lists.filter((_, index) => index !== listIndex);
    setBoard((prevBoard) => ({ ...prevBoard, lists: updatedLists }));
  };
  const handleDeleteCard = (listIndex: number, cardIndex: number) => {
    const updatedCards = board.lists[listIndex].cards.filter(
      (_, index) => index !== cardIndex
    );
    setBoard((prevBoard) => {
      const updatedLists = [...prevBoard.lists];
      updatedLists[listIndex].cards = updatedCards;
      return { ...prevBoard, lists: updatedLists };
    });
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const sourceCardIndex = result.source.droppableId.split('-')[1];
    const destinationCardIndex = result.destination.droppableId.split('-')[1];
    const sourceCard = board.lists[sourceCardIndex].cards;
    const destinationCard = board.lists[destinationCardIndex].cards;
    const [draggedCard] = sourceCard.splice(result.source.index, 1);
    destinationCard.splice(result.destination.index, 0, {
      ...draggedCard,
    });
    setBoard((prevBoard) => {
      const updatedLists = [...prevBoard.lists];
      updatedLists[sourceCardIndex].cards = sourceCard;
      updatedLists[destinationCardIndex].cards = destinationCard;
      return { ...prevBoard, lists: updatedLists };
    });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {board.lists.map((list, listIndex) => (
            <Droppable key={listIndex} droppableId={`list-${listIndex}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="list"
                >
                  <div className="list-header">
                    <div className="list-name">{list.name}</div>
                    <button
                      className="list-delete-button"
                      onClick={() => handleDeleteList(listIndex)}
                    >
                      ...
                    </button>
                  </div>
                  {list.cards.map((card, cardIndex) => (
                    <Draggable
                      key={cardIndex}
                      draggableId={`card-${listIndex}-${cardIndex}`}
                      index={cardIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          <div className="card-title">{card.name}</div>
                          <button
                            className="list-delete-button edit-icon"
                            onClick={() =>
                              handleDeleteCard(listIndex, cardIndex)
                            }
                          >
                            ...
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {cardIndex !== listIndex ? (
                    <button
                      className="card add-card-button"
                      onClick={() => setCardIndex(listIndex)}
                    >
                      + Add Card
                    </button>
                  ) : (
                    <form
                      className="new-card-form"
                      onSubmit={handleNewCard}
                      ref={cardFormRef}
                    >
                      <input
                        className="add-list-input"
                        ref={cardInputRef}
                        type="text"
                        placeholder="Enter Card Name..."
                        autoFocus
                      />
                      <div className="add-list-bottom">
                        <button className="submit-button">Add List</button>
                        <button className="cancel-button">X</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};
export default Board;
