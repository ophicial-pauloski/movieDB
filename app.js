
const MovieUI = document.getElementById("MovieCard");

const poperCloseBtn = document.querySelector(".poperCloseBtn");
const poperImage = document.querySelector(".poperImage");
const poperTitle = document.querySelector(".poperTitle");
const poperReview = document.querySelector(".movieDescrt");
const poperReleasedDate = document.querySelector(".poperReleasedDate");
const userScore = document.querySelector(".userScore");
const moviesDetailspoper = document.querySelector(".movieDetailsPoperContainer"); 
const movieDetailsPoperContainer = document.querySelector(
  ".movieDetailsPoperContainer"
);

const searchbar = document.getElementById("searchbar");

searchbar.addEventListener('keyup', (e) => {
   const searchString = e.target.value.toLowerCase();
let p = movieDatas.results;
   let serdata = p.filter(items => {
     return items.original_title.toLowerCase().includes(searchString);
   });
   displayMovie(serdata);
})




let movieDatas = [];

 const app =  async () => {

   try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=2cda2302f40d21e8f5e4afc8db7519bb"
      );
        movieDatas = await response.json();
       displayMovie(movieDatas.results);
   } catch (error) {
     console.log(error);
   }
  };

const displayMovie = (movies) => {
    const dataFromMovieAPI = movies
.map(movie_item => {
        return ` <div class="col-sm-6 col-md-4 col-lg-3 mt-4 crd eachMovieCard">
                <div class="card" style="height: 25rem; box-shadow: 0px 0px 10px 5px rgba(83, 80, 80, 0.616);">
                    <img class="card-img-top movieImg" src="https://image.tmdb.org/t/p/w500/${movie_item.poster_path}" style="height: 160px;">
                    <div class="card-block">
                        <figure class="profile">
                            <img src="https://image.tmdb.org/t/p/w500/${movie_item.poster_path}" class="profile-avatar" alt="">
                        </figure>
                        <h4 class="card-title movieTitle mt-3">${movie_item.original_title}</h4>
                        <div class="meta">
                            <a class="text-capitalize userScore">Lang: ${movie_item.original_language} - Users score: ${movie_item.vote_average}(${movie_item.vote_count})</a>
                        </div>
                        <div class="card-text movieReview display-none">
                            ${movie_item.overview}
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="releaseDate">Released: ${movie_item.release_date}</small>
                        <button class="btn btn-secondary float-right btn-sm"><i class="fas fa-eye"></i> ${movie_item.popularity}</button>
                    </div>
                </div>
            </div>
            `;
      })
      .join("");
    MovieUI.innerHTML = dataFromMovieAPI; //Displaying API data to the DOM

    //An algorithm to listen for click event on each of the movie cards in the DOM and then display a popper(Modal)
    let eachMovies_item = document.querySelectorAll(".eachMovieCard");
          eachMovies_item.forEach((item , index) => {
            let movieTitle = item.querySelector(".movieTitle");
            let movieReview = item.querySelector(".movieReview");
            let movieImg = item.querySelector(".movieImg");
            let releaseDate = item.querySelector(".releaseDate");
            let user_Score = item.querySelector(".userScore");

            item.addEventListener("click", () => {
              moviesDetailspoper.classList.add("poperActive");
              poperTitle.innerHTML =   movieTitle.textContent;
              poperReview.innerHTML = movieReview.textContent;
              poperImage.src = movieImg.src;
              poperReleasedDate.innerHTML = releaseDate.textContent;
              userScore.innerHTML = user_Score.textContent;
              movieDetailsPoperContainer.style.backgroundImage = 'url(' + movieImg.src + ')';
            });
          });

          /* close poper btn */
         poperCloseBtn.addEventListener("click", () => {
           moviesDetailspoper.classList.remove("poperActive");
         });

};

 app();
 
