// Variables
let title = document.querySelector('#title');
let director = document.querySelector('#director');


// Favorites
let movieData = null;
let favList = [];


// Spinner Loader
function loaderSpinner() {
    title.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    description.innerText = '';
    director.innerText = '';
    releaseDate.innerText = '';
}


// Get films from API
function getFilms() {
    let apiUrl = 'https://swapi.co/api/films/';
    axios.get(apiUrl).then(response => {
        updateData(response.data);
    })

}
getFilms();


// Display the films on container div
function updateData(data) {
    movieData = data.results
    for(i = 0;i < movieData.length;i++) {
        const obj = movieData[i]
    
        document.getElementById('container').innerHTML += 
        ` 
        <div id='insider'>
        <h1>Title: ${obj.title}</h1>
        <p>Director: ${obj.director}</p>
        <button data-movieID="${i}" onClick="addFavorite()">Add Favorite</button>
        </div>
        `
    }
}


// Add a Favorite
function addFavorite() {
    let selectedMovie = movieData[event.target.dataset.movieid];
    favList.push(selectedMovie)
    document.getElementById('favorites').innerHTML += 
    ` 
    <div id='insider'>
    <h1>Title: ${selectedMovie.title}</h1>
    <p>Director: ${selectedMovie.director}</p>
    <button data-movieID="${selectedMovie}" onclick="deleteFavorite()">Delete Favorite</button>
    </div>
    `
    localStorage.setItem("favListStorage", JSON.stringify(favList));
}


// Delete a Favorite
function deleteFavorite() {
    const element = event.target
    favList.splice(element.dataset.movieID, 1)
    localStorage.setItem("favListStorage", JSON.stringify(favList));
    event.target.parentElement.remove()
}


// Shows Favorites from localStorage
function getFavorites() {
    const storedList = JSON.parse(localStorage.getItem("favListStorage")) || [];
    for (i = 0; i < storedList.length; i++){
        obj = storedList[i]
        document.getElementById('favorites').innerHTML += 
        ` 
        <div id='insider'>
        <h1>Title: ${obj.title}</h1>
        <p>Director: ${obj.director}</p>
        <button data-movieID="${i}" onclick="deleteFavorite()">Delete Favorite</button>
        </div>
        `
    }
}
window.onload = getFavorites;