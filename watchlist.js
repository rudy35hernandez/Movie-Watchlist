import { addList, apiKey } from './index.js'

let removeBtn;


function render2(){

    let html = ""
    Promise.all(
                    addList.map(movie => 
                        fetch(`https://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
                        .then(res => res.json())
                        .catch(err => console.log(err)))   
                        ).then(movies => {
                            // console.log(movies)
                            for(let i = 0; i < movies.length; i++){
                                console.log(movies[i].Title) 
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
                                                <p class="movie-details"> <a href="#" class="remove-movie" id=${movies[i].imdbID}> Remove from list </a>
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
                                                <p class="movie-details"> <a href="#" class="remove-movie" id=${movies[i].imdbID}> Remove from list </a>
                                            </div>
                                            <p class="movie-plot"> ${movies[i].Plot} </p>
                                        </div>
                                    </div>
                                    <div class="separator"></div>
                                    `
                                }
                            }
                            document.getElementById("movie-watchlist").innerHTML = html
                            removeBtn = document.querySelectorAll(".remove-movie")
                            removeMovie()
                        })
}

            

function removeMovie(){
    for(let button of removeBtn){
        button.addEventListener("click", function(e){
            e.preventDefault()
            let index = addList.indexOf(button.id)
            console.log(index)
            if(index > -1){
                addList.splice(index, 1)
                localStorage.setItem("movieIds", JSON.stringify(addList))
                console.log(addList)
                render2()
            }
        })
    }
}

// addList = JSON.parse(localStorage.getItem("movieIds"))


render2()