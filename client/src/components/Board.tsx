import { useState, useEffect, useRef, FormEvent } from 'react';
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
      setBoard(prevBoard => ({
        ...prevBoard,
        lists: [...prevBoard.lists, newList],
      }));
    }

    setAddList(false);

    // send POST to server about creating a new list
    // send team, new list name
  };

  const handleNewCard = (event: FormEvent) => {
    event.preventDefault();

    if (cardInputRef.current && cardIndex !== null) {
      const newCardName = cardInputRef.current.value;
      const newCard = {
        name: newCardName,
        people: [],
      };
      setBoard(prevBoard => {
        const updatedLists = [...prevBoard.lists];
        updatedLists[cardIndex].cards.push(newCard);
        return { ...prevBoard, lists: updatedLists };
      });
    }
    if (cardInputRef.current) {
      cardInputRef.current.value = '';
    }

    setCardIndex(null);

    // send POST to server about creating a new card
    // send team, list name, new card name
  };

  const handleDeleteList = (listIndex: number) => {
    const updatedLists = board.lists.filter((_, index) => index !== listIndex);
    setBoard(prevBoard => ({ ...prevBoard, lists: updatedLists }));

    // send DELETE to server about deleting a list
    // send team, deleted list name
  };

  const handleDeleteCard = (listIndex: number, cardIndex: number) => {
    const updatedCards = board.lists[listIndex].cards.filter(
      (_, index) => index !== cardIndex
    );
    setBoard(prevBoard => {
      const updatedLists = [...prevBoard.lists];
      updatedLists[listIndex].cards = updatedCards;
      return { ...prevBoard, lists: updatedLists };
    });

    // send DELETE to server about deleting a card
    // send team, list name, deleted card name
  };

  return (
    <>
      <div className="board">
        {board.lists.map((list, listIndex) => {
          return (
            <div className="list" key={listIndex}>
              <div className="list-header">
                <div className="list-name">{list.name}</div>
                <button
                  className="list-delete-button"
                  onClick={() => handleDeleteList(listIndex)}
                >
                  ...
                </button>
              </div>

              {list.cards.map((card, cardIndex) => {
                return (
                  <div className="card" key={cardIndex}>
                    <div className="card-title">{card.name}</div>
                    <button
                      className="list-delete-button edit-icon"
                      onClick={() => handleDeleteCard(listIndex, cardIndex)}
                    >
                      ...
                    </button>
                  </div>
                );
              })}

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
          );
        })}

        {!addList ? (
          <button className="add-list-button" onClick={() => setAddList(true)}>
            + Add List
          </button>
        ) : (
          <form className="list" onSubmit={handleNewList} ref={listFormRef}>
            <input
              className="add-list-input"
              ref={listInputRef}
              type="text"
              placeholder="Enter List Name..."
              autoFocus
            />
            <div className="add-list-bottom">
              <button className="submit-button">Add List</button>
              <button className="cancel-button">X</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Board;
