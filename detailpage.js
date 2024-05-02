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

            console.log(movieDetails);
            

          })
          .catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
  