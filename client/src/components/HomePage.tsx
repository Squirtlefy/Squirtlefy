import { BoardType } from '../types';
import Board from './Board';
import { useQuery } from '@tanstack/react-query';

// placeholder for initial board data from database
// should have GET request to get current board
const curBoard: BoardType = {
  name: 'Board 1',
  boardId: 1,
  lists: [
    {
      name: 'List 1',
      cards: [
        { name: 'Card 1', people: ['AC'] },
        { name: 'Card 2', people: ['JT'] },
        { name: 'Card 3', people: ['JD'] },
        { name: 'Card 4', people: ['KW'] },
        { name: 'Card 5', people: ['SK'] },
      ],
    },
    {
      name: 'List 2',
      cards: [
        { name: 'Card 1', people: ['AC'] },
        { name: 'Card 2', people: ['JT'] },
        { name: 'Card 3', people: ['JD'] },
        { name: 'Card 4', people: ['KW'] },
        { name: 'Card 5', people: ['SK'] },
      ],
    },
    {
      name: 'List 3',
      cards: [
        { name: 'Card 1', people: ['AC'] },
        { name: 'Card 2', people: ['JT'] },
        { name: 'Card 3', people: ['JD'] },
        { name: 'Card 4', people: ['KW'] },
        { name: 'Card 5', people: ['SK'] },
      ],
    },
  ],
};

const fetchBoarData = async () => {
  const res = await fetch('http://localhost:3000/api/boardData/1')
  return res.json();
}

const HomePage = () => {
  const { data } = useQuery({
    queryKey: ['board1'],
    queryFn: fetchBoarData,
  })

  console.log(data);
  if (data) return (
    <>
      <h1>Home Page</h1>
      <Board curBoard={data} />
    </>
    // component for all boards / teams
    // component for screen that pops up when we create the board
    // current selected board
  );
};

export default HomePage;
