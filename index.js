console.log("what the fuck")
const apiKey = "c14ca80c"
let movie = document.getElementById("movie-search")
const addBtn = document.querySelector("add-btn")

document.getElementById("search").addEventListener("submit", function(e){
    e.preventDefault()
    let html = ""
    let movieArray = []
    fetch(`http://www.omdbapi.com/?s=${movie.value}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            for(let i = 0; i < data.Search.length; i++){
                movieArray.push(data.Search[i].imdbID)

            }
            // console.log(movieArray)

            
        
            
            Promise.all(
                movieArray.map(movie => 
                    fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
                    .then(res => res.json())
                    .catch(err => console.log(err)))   
                    ).then(movies => {
                        console.log(movies)
                        for(let movie of movies){
                            html += `
                            <div class="movie">
                            <img src=${movie.Poster} class="movie-poster"/>
                            <div>
                            <h2> ${movie.Title} </h2>
                            <p> </p>
                            <button id="add-btn"> Add movie </button>
                            </div>
                            </div>
                            `
                        }
                        
                document.getElementById("movie-list").innerHTML = html
            })
        })

        
        // console.log(promises)
})

