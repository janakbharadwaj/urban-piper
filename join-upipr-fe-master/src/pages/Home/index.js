import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import './index.css';
import logo from './star-wars-logo.png';
import { Link } from "react-router-dom";


export default function HomePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [data,setData] = useState([])
  //const [directUrl, setDirectUrl] = useState('')

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    } else {
      let val = getData(query);
      setSuggestions(val);
    }
    setLoading(false);
  }, [query]);

  const getData = (query) => {
    axios.get(`https://swapi.dev/api/people/?search=${query}`)
    .then((res) => {
      console.log(res.data.results)
      setData(res.data.results)
    });
  };
  
  const handleUrl=(url)=>{
    console.log(url)
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className='search_div'>
        <SearchBar
          loading={loading}
          setLoading={setLoading}
          value={query}
          onChange={(val) => setQuery(val)}
          suggestions={suggestions}
        />
        {
          data.length>0 && <div className='results_div'>
            {data.map((item)=>(
              <Link to='/person/:id' key={item.url} className="results_div__holder" onClick={()=>handleUrl(item.url)}>
                <div className='results_div__name__year__p'>
                  <p>{item.name}</p>
                  <p>{item.birth_year}</p>
                </div>
                <p className='results_div__gender__p'>
                  {item.gender}
                </p>
              </Link>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
