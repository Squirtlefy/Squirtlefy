import { BoardType } from '../types';
import Board from './Board';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// placeholder for initial board data from database
// should have GET request to get current board
const curBoard: BoardType = {
  name: 'Reinforcement Project',
  boardId: 1,
  lists: [
    {
      name: 'To Do',
      cards: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
      ],
    },
    {
      name: 'In Progress',
      cards: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
      ],
    },
    {
      name: 'Complete',
      cards: [
        { name: 'Task 1', people: ['AC'] },
        { name: 'Task 2', people: ['JT'] },
        { name: 'Task 3', people: ['JD'] },
      ],
    },
  ],
};

// placeholder for boards
const boards = [
  'Solo Project',
  'Scratch Project',
  'Iteration Project',
  'Open Source Project',
  'Reinforcement Project',
];

const fetchBoardData = async () => {
  const res = await fetch('http://localhost:3000/api/boardData/1')
  return res.json();
}

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data } = useQuery({
    queryKey: ['board1'],
    queryFn: fetchBoardData,
  })

  console.log(data);
  if (data) return (
    <>
      <div className="nav-bar">Squirtlefy</div>
      <div className={`main-container ${isMenuOpen ? 'shifted' : ''}`}>
        <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
          {/* <div>Boards</div> */}
          {boards.map(board => {
            if (board === 'Reinforcement Project') {
              return <div className="board-item picked">{board}</div>;
            } else {
              return <div className="board-item">{board}</div>;
            }
          })}
        </div>
        <div className="content">
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen === false ? '>' : '<'}
          </button>
          <div className="board-title">{curBoard.name}</div>
          <Board curBoard={data} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
