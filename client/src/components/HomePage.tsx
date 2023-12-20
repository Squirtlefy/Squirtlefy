import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const params = searchParams.get('data');
    fetch('http://localhost:3000/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: params,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [searchParams]);
  return (
    <h1>Home Page</h1>
    // component for all boards / teams
    // component for screen that pops up when we create the board
    // current selected board
  );
};

export default HomePage;
