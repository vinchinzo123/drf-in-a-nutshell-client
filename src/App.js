import { useState, useEffect } from 'react'
import './App.css';
import ShoeCard from './ShoeCard';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shoes, setShoes] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/shoes/')
      .then(res => res.json())
      .then(result => {
        setIsLoaded(true)
        setShoes(result)
      },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="App">
        Shoe Store
        {shoes && shoes.map(shoe => (
          <ShoeCard shoe={shoe} />))}
      </div>
    );
  }
}

export default App;
