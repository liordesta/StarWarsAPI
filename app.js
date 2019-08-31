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
        <div class="card">
            <div class="card-header">
                <h1>Title: ${obj.title}</h1>
            </div>
            <div class="card-body">
                <p class="card-text">Director: ${obj.director}</p>
                <button id="favBtn" data-movieID="${i}" onClick="addFavorite()"><i class="fa fa-star" aria-hidden="true"></i></button>
            </div>
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
    <div class="card">
        <div class="card-header">
            <h1>Title: ${selectedMovie.title}</h1>
        </div>
        <div class="card-body">
            <p>Director: ${selectedMovie.director}</p>
            <button id="delBtn" data-movieID="${selectedMovie}" onclick="deleteFavorite()"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    </div>
    `
    localStorage.setItem("favListStorage", JSON.stringify(favList));
}


// Delete a Favorite
function deleteFavorite() {
    const element = event.target
    favList.splice(element.dataset.movieID, 1)
    event.target.closest(".card").remove();
    localStorage.setItem("favListStorage", JSON.stringify(favList));
}


// Shows Favorites from localStorage
function getFavorites() {
    const storedList = JSON.parse(localStorage.getItem("favListStorage")) || [];
    for (i = 0; i < storedList.length; i++){
        obj = storedList[i]
        document.getElementById('favorites').innerHTML += 
        ` 
        <div class="card">
            <div class="card-header">
                <h1>Title: ${obj.title}</h1>
            </div>
            <div class="card-body">
                <p>Director: ${obj.director}</p>
                <button id="delBtn" data-movieID="${i}" onclick="deleteFavorite()"><i class="fa fa-times" aria-hidden="true"></i></button>
            </div>
        </div>
        `
    }
}
window.onload = getFavorites;
