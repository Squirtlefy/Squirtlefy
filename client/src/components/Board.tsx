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
        { name: 'Task 1', people: 'AC' },
        { name: 'Task 2', people: 'JT' },
        { name: 'Task 3', people: 'JD' },
        { name: 'Task 4', people: 'KW' },
        { name: 'Task 5', people: 'SK' },
      ],
    },
    {
      name: 'Card 2',
      tasks: [
        { name: 'Task 1', people: 'AC' },
        { name: 'Task 2', people: 'JT' },
        { name: 'Task 3', people: 'JD' },
        { name: 'Task 4', people: 'KW' },
        { name: 'Task 5', people: 'SK' },
      ],
    },
    {
      name: 'Card 3',
      tasks: [
        { name: 'Task 1', people: 'AC' },
        { name: 'Task 2', people: 'JT' },
        { name: 'Task 3', people: 'JD' },
        { name: 'Task 4', people: 'KW' },
        { name: 'Task 5', people: 'SK' },
      ],
    },
  ],
};

const Board = () => {
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
              <div className="card add-card">+ Add Card</div>
            </div>
          );
        })}
        <div className="add-list">+ Add List</div>
      </div>
    </>
  );
};

export default Board;
