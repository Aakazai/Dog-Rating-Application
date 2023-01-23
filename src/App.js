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
  "appenzeller",
  "australian-shepherd",
  "basenji",
  "beagle",
  "bluetick",
  "borzoi",
  "bouvier",
  "boxer",
  "brabancon",
  "briard",
  "buhund-norwegian",
  "bulldog-boston",
  "bulldog-english",
  "bulldog-french",
  "bullterrier-staffordshire",
  "cattledog-australian",
  "chihuahua",
  "chow",
  "clumber",
  "cockapoo",
  "collie-border",
  "coonhound",
  "corgi-cardigan",
  "cotondetulear",
  "dachshund",
  "dalmatian",
  "dane-great",
  "deerhound-scottish",
  "dhole",
  "dingo",
  "doberman",
  "elkhound-norwegian",
  "entlebucher",
  "eskimo",
  "finnish-lapphund",
  "frise-bichon",
  "germanshepherd",
  "greyhound-italian",
  "groenendael",
  "havanese",
  "hound-afghan",
  "hound-basset",
  "hound-blood",
  "hound-english",
  "hound-ibizan",
  "hound-plott",
  "hound-walker",
  "husky",
  "keeshond",
  "kelpie",
  "komondor",
  "kuvasz",
  "labradoodle",
  "labrador",
  "leonberg",
  "lhasa",
  "malamute",
  "malinois",
  "maltese",
  "mastiff-bull",
  "mastiff-english",
  "mastiff-tibetan",
  "mexicanhairless",
  "mix",
  "mountain-bernese",
  "mountain-swiss",
  "newfoundland",
  "otterhound",
  "ovcharka-caucasian",
  "papillon",
  "pekinese",
  "pembroke",
  "pinscher-miniature",
  "pitbull",
  "pointer-german",
  "pointer-germanlonghair",
  "pomeranian",
  "poodle-medium",
  "poodle-miniature",
  "poodle-standard",
  "poodle-toy",
  "pug",
  "puggle",
  "pyrenees",
  "redbone",
  "retriever-chesapeake",
  "retriever-curly",
  "retriever-flatcoated",
  "retriever-golden",
  "ridgeback-rhodesian",
  "rottweiler",
  "saluki",
  "samoyed",
  "schipperke",
  "schnauzer-giant",
  "schnauzer-miniature",
  "segugio-italian",
  "setter-english",
  "setter-gordon",
  "setter-irish",
  "sharpei",
  "sheepdog-english",
  "sheepdog-shetland",
  "shiba",
  "shihtzu",
  "spaniel-blenheim",
  "spaniel-brittany",
  "spaniel-cocker",
  "spaniel-irish",
  "spaniel-japanese",
  "spaniel-sussex",
  "spaniel-welsh",
  "spitz-japanese",
  "spaniel-sussex",
  "spaniel-welsh",
  "spitz-japanese",
  "springer-english",
  "stbernard",
  "terrier-american",
  "terrier-australian",
  "terrier-bedlington",
  "terrier-border",
  "terrier-cairn",
  "terrier-dandie",
  "terrier-fox",
  "terrier-irish",
  "terrier-kerryblue",
  "terrier-lakeland",
  "terrier-norfolk",
  "terrier-norwich",
  "terrier-patterdale",
  "terrier-russell",
  "terrier-scottish",
  "terrier-sealyham",
  "terrier-silky",
  "terrier-tibetan",
  "terrier-toy",
  "terrier-welsh",
  "terrier-westhighland",
  "terrier-wheaten",
  "terrier-yorkshire",
  "tervuren",
  "vizsla",
  "waterdog-spanish",
  "weimaraner",
  "whippet",
  "wolfhound-irish"
];




function App() {

  //state variables
  const [randomDogImage, setRandomDogImage] = useState("https://via.placeholder.com/150");
  const [ratedDogImage, setRatedDogImage] = useState();
  const [rating, setRating] = useState("");
  const [ratingsHistory, setRatingsHistory] = useState([]);
  const [breed, setBreed] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

// useEffect hook which runs at render and every refresh
  useEffect(() => {
    let fetchData;

    //if a breed is selected, fetchData set to async function which calls getBreed
    if (breed) {
      fetchData = async () => {
        const randomDog = await getBreed(breed)();
        setRandomDogImage(randomDog);
      }
    } 
    
    // Else, fetchData set to async function which calls getRandom function
    else {
      fetchData = async () => {
        const randomDog = await getRandom()();
        setRandomDogImage(randomDog);
      }
    }
    fetchData();
  }, [breed]);

  function handleSubmit(e) {

    // prevents page from being refreshed 
    e.preventDefault();
    // message displayed to user if rating is not selected
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    let dogUrl = randomDogImage;
    // add object to setRatingsHistory array with url of dog image, the rating and the breed. 
    setRatingsHistory([...ratingsHistory, { url: dogUrl, rating, breed }]);
    setRatedDogImage(dogUrl);
    //clear values
    setRating('');
    setSelectedRating(null);
    // update random dog image by fetching data with async function.
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

// Function which sorts the dogs rated by user
  function handleSort(sortType) {
    //copies ratingsHistory array to a new array
    const sortedRatings = [...ratingsHistory];

    //use built in sort function to sort the array accordingly
    if (sortType === 'lowest') {
      sortedRatings.sort((a, b) => a.rating - b.rating);
    } else if (sortType === 'highest') {
      sortedRatings.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'alphabetical') {
      sortedRatings.sort((a, b) => a.url.localeCompare(b.url));
    }
    setRatingsHistory(sortedRatings);
  }
  // callback for onChange event of Select "breed" element. Takes information from event Object.
  const handleChange = (event) => {
    setBreed(event.target.value);
  }
// / callback for onChange event of Select "sort by:" element. Takes information from event Object.
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    handleSort(event.target.value);
    
  }

// JSX
  return (
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
          {/* Create an unordered list for each item in ratingsHistory arry */}
          <ul>
            {/* use the .map() method to iterate through the array */}
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
  );
}

export default App;
