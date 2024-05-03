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

          let id = movieDetails.id;
          let original_title = movieDetails.original_title;
          let overview = movieDetails.overview;
          let poster_path = movieDetails.poster_path;
          let vote_average = movieDetails.vote_average;
          let runtime = movieDetails.runtime;   //러닝타임
          let genres = movieDetails.genres.map(genre => genre.name);   //장르
          let release_date = movieDetails.release_date;   //개봉일
          let origin_country = movieDetails.origin_country;   //나라
          const clickedimg = localStorage.getItem('clickedimg');
          let display = id.toString() === clickedimg ? "block" : "none";
          let temp_html = `
            <div style="display:${display}" id="movieId" data-id="${id}">
            <div class="detailcontainer">
            <div class ="detail-img-box">
              <img class="detail-img" src="https://image.tmdb.org/t/p/w500/${poster_path}" class="detail-img" alt="${original_title}">
             </div>
              <div class='detail-textContainer'>
              <div class="">
              <h5 class="detail-title">${original_title}</h5>
              <div class="detail-index">
              <p>${genres} / ${origin_country} / ${runtime}minutes</p>
              <p>Release Date: ${release_date}</p>
              </div>
              <p class="detail-text">${overview}</p>
             

              </div>
            </div>`;

          document.getElementById("homeButton").addEventListener("click", function () {
            window.location.href = "index.html";
          });

          body.insertAdjacentHTML('beforeend', temp_html);
          displayReviews();

          
        })
    });
  })

//review
function submitReview() { // 리뷰를 제출하는 함수
  const person = document.getElementById('person').value;
  const review = document.getElementById('review').value;
  const password = document.getElementById('password').value;
  const movieId = localStorage.getItem('clickedimg');

  // 입력값이 비어 있는지 확인
  if (!person || !review || !password) {
    alert('이름과 리뷰를 모두 작성해주세요.');
    return;
  }

  const reviewData = { // reviewData 객체로 세 가지 정보를 저장
    person: person,
    review: review,
    password: password,
    movieId: movieId
  };

  let reviews = JSON.parse(localStorage.getItem('movieReviews')) || []; // 데이터 불러오기 - 로컬 스토리지에서 리뷰를 가져옴
  reviews.push(reviewData);                                             // 새로운 리뷰를 배열에 추가

  localStorage.setItem('movieReviews', JSON.stringify(reviews)); // 데이터 저장하기 - 리뷰를 로컬 스토리지에 저장 
  alert('리뷰가 저장되었습니다!');
  displayReviews(); // 리뷰를 화면에 표시



  document.getElementById('reviewForm').reset(); // 리뷰를 제출한 후 입력 폼을 초기화
}

function displayReviews() { // 로컬 스토리지에 저장된 리뷰를 화면에 표시하는 함수
  const reviews = JSON.parse(localStorage.getItem('movieReviews')) || []; // 로컬 스토리지에서 리뷰를 가져옴
  const checkmovieId = localStorage.getItem('clickedimg');

  const matchedReviews = reviews.filter(review => review.movieId === checkmovieId);

  const container = document.getElementById('scrollContainer'); // 리뷰를 표시할 컨테이너 reviwesContainer 생성
  container.innerHTML = ''; // 컨테이너를 비움

  matchedReviews.forEach((review, index) => { // 리뷰를 순회하면서 화면에 표시
    const reviewElement = document.createElement('div'); // 리뷰를 표시할 div 요소 생성
    reviewElement.innerHTML =
      `<strong>${review.person}</strong><br> ${review.review} <br> 
        <input type='password' placeholder='비밀번호' id='pwd${index}' style='display: inline-block;'> 
        <button class='delbtn' onclick='deleteReview(${index})' style='display: inline-block;'>삭제</button>`; // 리뷰 삭제 버튼 생성
    container.appendChild(reviewElement); // 리뷰를 컨테이너에 추가
  });
}


function deleteReview(index) { // 사용자가 입력한 비밀번호를 확인하고 리뷰를 삭제하는 함수
  const pwdInput = document.getElementById(`pwd${index}`); // 사용자가 입력한 비밀번호를 가져옴
  const reviews = JSON.parse(localStorage.getItem('movieReviews')) || []; // 로컬 스토리지에서 리뷰를 가져옴

  const checkmovieId = localStorage.getItem('clickedimg');
  const matchedReviews = reviews.filter(review => review.movieId === checkmovieId);

  if (matchedReviews[index].password === pwdInput.value) { // 사용자가 입력한 비밀번호가 일치하면 리뷰를 삭제
    matchedReviews.splice(index, 1); // 배열에서 해당 인덱스의 리뷰를 삭제
    localStorage.setItem('movieReviews', JSON.stringify(matchedReviews)); // 리뷰를 로컬 스토리지에 저장
    displayReviews(); // 리뷰를 다시 표시
    alert('리뷰가 삭제되었습니다.'); // 삭제 완료 메시지
  } else if (!pwdInput.value) {
    alert('비밀번호를 입력해주세요'); // 경고 메시지
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
}

// window.onload = function () { // 페이지가 로드되면 displayReviews 함수를 실행
//   displayReviews();  // 로컬 스토리지에 저장된 리뷰를 화면에 표시
// };