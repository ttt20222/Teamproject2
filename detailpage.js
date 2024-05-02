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
            console.log(movieDetails);  //여기서 이미지 id랑 같은거 찾아서 보여주면 될 것 같습니당 지금은 전체 다 보여주는 코드
          })
          .catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));