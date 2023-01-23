import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getRandom, getBreed } from './DogAPI';
import { Select, InputLabel, Rating, MenuItem, ButtonGroup, Button, } from "@mui/material";
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';

const theme = createMuiTheme();
const breeds = [
  "affenpinscher",
  "african",
  "airedale",
  "akita",
];




function App() {

  const [randomDogImage, setRandomDogImage] = useState("https://via.placeholder.com/150");
  const [ratedDogImage, setRatedDogImage] = useState();
  const [rating, setRating] = useState("");
  const [ratingsHistory, setRatingsHistory] = useState([]);
  const [breed, setBreed] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);


  useEffect(() => {
    let fetchData;
    if (breed) {
      fetchData = async () => {
        const randomDog = await getBreed(breed)();
        setRandomDogImage(randomDog);
      }
    } else {
      fetchData = async () => {
        const randomDog = await getRandom()();
        setRandomDogImage(randomDog);
      }
    }
    fetchData();
  }, [breed]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    let dogUrl = randomDogImage;

    setRatingsHistory([...ratingsHistory, { url: dogUrl, rating, breed }]);
    setRatedDogImage(dogUrl);
    setRating('');
    setSelectedRating(null);
    // update random dog image
    const fetchData = async () => {
      let newRandomDog;
      if (breed) {
        newRandomDog = await getBreed(breed)();
      } else {
        newRandomDog = await getRandom()();
      }
      setRandomDogImage(newRandomDog);
    }
    fetchData();
  }


  function handleSort(sortType) {
    const sortedRatings = [...ratingsHistory];
    if (sortType === 'lowest') {
      sortedRatings.sort((a, b) => a.rating - b.rating);
    } else if (sortType === 'highest') {
      sortedRatings.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'alphabetical') {
      sortedRatings.sort((a, b) => a.url.localeCompare(b.url));
    }
    setRatingsHistory(sortedRatings);
  }

  const handleChange = (event) => {
    setBreed(event.target.value);
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  }


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1 className="title">Rate My Dog</h1>
        <form onSubmit={(e) => handleSubmit(e, rating)}>
          <label>
            <InputLabel>Breed</InputLabel>
            <Select
              className="wider-select"
              label="Breed"
              value={breed}
              onChange={handleChange}
            >
              <MenuItem value="">Any</MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </label>
          <br />
          <label className="rating-label">
            <ButtonGroup>
              <Button className="big-button" onClick={() => { setRating(10); setSelectedRating(10) }}>10</Button>
              <Button className="big-button" onClick={() => { setRating(11); setSelectedRating(11) }}>11</Button>
              <Button className="big-button" onClick={() => { setRating(12); setSelectedRating(12) }}>12</Button>
              <Button className="big-button" onClick={() => { setRating(13); setSelectedRating(13) }}>13</Button>
              <Button className="big-button" onClick={() => { setRating(14); setSelectedRating(14) }}>14</Button>
              <Button className="big-button" onClick={() => { setRating(15); setSelectedRating(15) }}>15</Button>
            </ButtonGroup>
            {selectedRating && <p>Selected Rating: {selectedRating}</p>}
          </label>

          <br />
          <Button type="submit">Submit</Button>
        </form>
        <div>
          <img src={randomDogImage} alt="Random Dog" className="dog-image" />
        </div>
        <div>
          <h2>Ratings History</h2>
          <label>
            <InputLabel>Sort By:</InputLabel>
            <Select
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="lowest">Lowest Rated</MenuItem>
              <MenuItem value="highest">Highest Rated</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
            </Select>
          </label>
          <ul>
            {ratingsHistory.map(function (item) {
              return (
                <li>
                  <img className="dog-history" src={item.url} alt="Rated Dog" />
                  <p>Rating: {item.rating}</p>
                  <p>Breed: {item.breed ? item.breed : "Random Dog"}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
