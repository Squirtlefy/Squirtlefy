import { useState, useEffect, useRef, FormEvent } from 'react';

const team = [
  'Austin Cavanagh',
  'Jerry Trinh',
  'John Dunn',
  'Keidy Wuang',
  'Sean Kirkpatric',
];

const curBoard = {
  name: 'Board 1',
  lists: [
    {
      name: 'Card 1',
      cards: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
        { name: 'Task 4', people: ['KW'] },
        { name: 'Task 5', people: ['SK'] },
      ],
    },
    {
      name: 'Card 2',
      cards: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
        { name: 'Task 4', people: ['KW'] },
        { name: 'Task 5', people: ['SK'] },
      ],
    },
    {
      name: 'Card 3',
      cards: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
        { name: 'Task 4', people: ['KW'] },
        { name: 'Task 5', people: ['SK'] },
      ],
    },
  ],
};

const Board = () => {
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

      // send name of new list to database for creation
      curBoard.lists.push(newList);
    }

    setAddList(false);
  };

  const handleNewCard = (event: FormEvent) => {
    event.preventDefault();

    if (cardInputRef.current && cardIndex !== null) {
      const newCardName = cardInputRef.current.value;

      console.log(newCardName);

      const newCard = {
        name: newCardName,
        people: [],
      };

      // send name of new card to database for creation
      curBoard.lists[cardIndex].cards.push(newCard);
    }

    if (cardInputRef.current) {
      cardInputRef.current.value = '';
    }

    setCardIndex(null);
  };

  return (
    <>
      <h1>{curBoard.name}</h1>
      <div className="board">
        {curBoard.lists.map((list, index) => {
          return (
            <div className="list" key={index}>
              <div className="list-name">{list.name}</div>
              {list.cards.map((card, index) => {
                return (
                  <div className="card" key={index}>
                    {card.name}
                  </div>
                );
              })}

              {cardIndex !== index ? (
                <button
                  className="card add-card-button"
                  onClick={() => setCardIndex(index)}
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
