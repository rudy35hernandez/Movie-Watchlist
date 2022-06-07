import { addList } from './index.js'






const apiKey = "c14ca80c"
let movie = document.getElementById("movie-search")
let addList = []
let movieArray = []



document.getElementById("search").addEventListener("submit", async function(e){
    e.preventDefault()
    let html = ""
    const res = await fetch(`http://www.omdbapi.com/?s=${movie.value}&apikey=${apiKey}`)
    const data = await res.json()    

            for(let i = 0; i < data.Search.length; i++){
                movieArray.push(data.Search[i].imdbID)

            }
            console.log(movieArray)

         
        let movieId;
            
            Promise.all(
                movieArray.map(movie => 
                    fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
                    .then(res => res.json())
                    .catch(err => console.log(err)))   
                    ).then(movies => {
                        // console.log(movies)
                        for(let i = 0; i < movies.length; i++){
                            // console.log(movies[i]) 
                            if(movies[i].Ratings.length > 0){
                                
                                html += `
                                <div class="movie">
                                    <img src=${movies[i].Poster} class="movie-poster" alt="poster missing"/>
                                    <div class="movie-info">
                                        <div class="movie-header">
                                            <h2 class="movie-title"> ${movies[i].Title} </h2>
                                            <p class="movie-rating"> ⭐ ${movies[i].Ratings[0].Value} </p>
                                        </div>
                                        <div class="details-add">
                                            <p class="movie-details"> ${movies[i].Runtime} </p>
                                            <p class="movie-details"> ${movies[i].Genre} </p>
                                            <p class="movie-details"> <a href="#" class="add-movie" id=${movies[i].imdbID}> Add to list </a>
                                        </div>
                                        <p class="movie-plot"> ${movies[i].Plot} </p>
                                    </div>
                                </div>
                                <div class="separator"></div>
                                `
                            } else {
                                html += `
                                <div class="movie">
                                    <img src=${movies[i].Poster} class="movie-poster" alt="poster missing" />
                                    <div class="movie-info">
                                        <div class="movie-header">
                                            <h2 class="movie-title"> ${movies[i].Title} </h2>
                                            <p class="movie-rating"> no rating yet </p>
                                        </div>
                                        <div class="details-add">
                                            <p class="movie-details"> ${movies[i].Runtime} </p>
                                            <p class="movie-details"> ${movies[i].Genre} </p>
                                            <p class="movie-details"> <a href="#" class="add-movie" id=${movies[i].imdbID}> Add to list </a>
                                        </div>
                                        <p class="movie-plot"> ${movies[i].Plot} </p>
                                    </div>
                                </div>
                                <div class="separator"></div>
                                `
                            }
                        }
                        
                document.getElementById("movie-list").innerHTML = html
                let addMovieBtn = document.querySelectorAll(".add-movie")
            
                for(let i = 0; i < addMovieBtn.length; i++){
                    addMovieBtn[i].addEventListener("click", function(e){
                        e.preventDefault()
                        if(!addList.includes(addMovieBtn[i].id)){
                            addList.push(addMovieBtn[i].id)
                            localStorage.setItem("movieIds", JSON.stringify(addList))
                        }
                        console.log(addList)
                    })

                }
            })
                movieArray = []
    })


    
    addList = JSON.parse(localStorage.getItem("movieIds"))
    console.log(addList)

export {addList}