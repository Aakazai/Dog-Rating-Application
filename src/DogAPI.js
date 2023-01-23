import axios from 'axios'; 

const imageURL= 'https://dog.ceo/dog-api'; // variable to hold base URL of the API

export function getRandom() {
    return async function(){ 

 // make a GET request to the URL
    try {
        const {data} = await axios.get(`https://dog.ceo/api/breeds/image/random`);
        //returns URL of random dog image
        return data.message;
    }

    catch (err) {
        console.error(err);
    }
}
};

export function getBreed(breed) {
    return async function (){

        // Make a GET request to the URL
        try {

            const {data} = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
            // returns URL of dog from selected breed
            return data.message;
        }

        catch (err) {
            console.error(err);
        }
    }
};