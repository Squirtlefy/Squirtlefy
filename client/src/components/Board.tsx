import { useState } from 'react';

const team = [
  'Austin Cavanagh',
  'Jerry Trinh',
  'John Dunn',
  'Keidy Wuang',
  'Sean Kirkpatric',
];

const curBoard = {
  name: 'Board 1',
  cards: [
    {
      name: 'Card 1',
      tasks: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
        { name: 'Task 4', people: ['KW'] },
        { name: 'Task 5', people: ['SK'] },
      ],
    },
    {
      name: 'Card 2',
      tasks: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
        { name: 'Task 4', people: ['KW'] },
        { name: 'Task 5', people: ['SK'] },
      ],
    },
    {
      name: 'Card 3',
      tasks: [
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
  const [addList, setAddList] = useState(false);
  const [addCard, setAddCard] = useState(false);

  //   const addListHandleclick = () => {
  //     setAddList(true);
  //   };

  const addCardHandleclick = () => {
    setAddCard(true);
  };

  return (
    <>
      <h1>{curBoard.name}</h1>
      <div className="board">
        {curBoard.cards.map((card, index) => {
          return (
            <div className="list" key={index}>
              <div className="list-name">{card.name}</div>
              {card.tasks.map((card, index) => {
                return (
                  <div className="card" key={index}>
                    {card.name}
                  </div>
                );
              })}
              <button
                className="card add-card-button"
                onClick={() => console.log('added card')}
              >
                + Add Card
              </button>
            </div>
          );
        })}

        {!addList && (
          <button className="add-list-button" onClick={() => setAddList(true)}>
            + Add List
          </button>
        )}

        {addList && (
          <form className="list" onSubmit={addCardHandleclick}>
            <input className="add-list-input" type="text" />
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
