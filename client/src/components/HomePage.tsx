import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('data'));
  return (
    <h1>Home Page</h1>
    // component for all boards / teams
    // component for screen that pops up when we create the board
    // current selected board
  );
};

export default HomePage;
