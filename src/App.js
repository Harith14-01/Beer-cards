import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./App.css";
import { useAsyncError } from 'react-router-dom';

const App = () => {
  const [beers,setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await axios.get("https://api.sampleapis.com/beers/ale");
        setBeers(response.data);
      } catch (error) {
        console.error("Error fetching beer data:", error);
      }
      
    };
    fetchBeers();
  }, []);

  const filteredBeers = beers.filter((beer) =>
  beer.name.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div className="App">
      <h1>Beer Cards</h1>
      <input
        type="text"
        placeholder="Search beers..."
        valuse={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="beer-container">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image} alt={beer.name} className="beer-image" />
            <h2>{beer.name}</h2>
            <p>{beer.description || "No description available."}</p>
        </div>
        ))}
      </div>
    </div>
)
};

export default App