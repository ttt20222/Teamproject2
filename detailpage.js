const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTAzOWQwOTUzYjRhZWQ5MjI3ZjI2NTk1OGYyNjY0YyIsInN1YiI6IjY2MjlmZDcxMjNkMjc4MDExZDMzM2QyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b4Cn-Vd8CJ6AMD6OpU5zoFauyOgCvLy5ufYQ5l2hCac'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)   //top_movie api
  .then(response => response.json())
  .then(data => {
    data.results.forEach(movie => {
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options)  //detail movie api
        .then(response => response.json())
        .then(movieDetails => {
          const body = document.querySelector('.detailCard');
          //id 체크해서 ~

          let id = movieDetails.id;
          let original_title = movieDetails.original_title;
          let overview = movieDetails.overview;
          let poster_path = movieDetails.poster_path;
          let vote_average = movieDetails.vote_average;
          let runtime = movieDetails.runtime;   //러닝타임
          let genres = movieDetails.genres;    //장르
          let release_date = movieDetails.release_date;   //개봉일
          let origin_country = movieDetails.origin_country;   //나라
          const clickedimg = localStorage.getItem('clickedimg');
          let display = id.toString() === clickedimg ? "block" : "none";
          console.log(id, clickedimg);
          let temp_html = `
            <div style="display:${display}" class="card" data-id="${id}">
              <div class="card-body">
                <h5 class="card-title">${original_title}</h5>
                <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top" alt="...">
                <p class="card-text">${overview}</p>
                <div class="rating">
                  <div class ="rate1">
                  ★★★★★
                  <span class="rating_star" style = "width: ${vote_average * 10}%;">★★★★★</span>
                  </div>
                  <p class="vote_average">${vote_average}/10</p>
                </div>
              </div>
            </div>`;

          body.insertAdjacentHTML('beforeend', temp_html);
          
          //로컬 데이터 호출 후 로컬 id와 id가 같을 시 card display style="block"
          const card = document.querySelector(`.card[data-id="${id}"]`);
          console.log(id)
          if(id === clickedimg){
          card.classList.add('visible');
          }
          else{
            card.classList.remove('visible');
          }
        })
    });
  })
