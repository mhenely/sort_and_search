import { NavLink } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <NavLink to='/search' as='span'>Search</NavLink>
      <NavLink to='/sort' as='span'>Sort</NavLink>
      Home Page
    </div>
  )
}

export default Home;