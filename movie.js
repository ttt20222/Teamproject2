const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTAzOWQwOTUzYjRhZWQ5MjI3ZjI2NTk1OGYyNjY0YyIsInN1YiI6IjY2MjlmZDcxMjNkMjc4MDExZDMzM2QyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b4Cn-Vd8CJ6AMD6OpU5zoFauyOgCvLy5ufYQ5l2hCac'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)     //api 정보 불러오기
  .then((response) => response.json())
  .then((response) => {
    const mainBox = document.querySelector('.main_box');    

    response.results.forEach(result => {
      let original_title = result.original_title;
      let overview = result.overview;
      let poster_path = result.poster_path;
      let vote_average = result.vote_average;
      let id = result.id;

      let temp_html = `
        <div class="card" data-id="${id}">
          <div class="card-body">
            <h5 class="card-title">${original_title}</h5>
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top" alt="...">
            <div class="rating">
              <div class ="rate1">
              ★★★★★
              <span class="rating_star" style = "width: ${vote_average * 10}%;">★★★★★</span>
              </div>
            </div>
          </div>
        </div>`;

      mainBox.insertAdjacentHTML('beforeend', temp_html);

    });

    // 모든 .card 요소를 선택
    const cards = document.querySelectorAll(".card");

    // 각각의 .card 요소에 대해 클릭 이벤트 리스너 추가
    cards.forEach(card => {
      card.addEventListener("click", function () {
        const movieId = this.getAttribute('data-id');
        
      localStorage.setItem('clickedimg', movieId); //이미지 id 로컬에 저장
      window.location.href ='detailpage.html';//(주소#1)
        // alert(`영화 id : ${movieId}`); //잠시 꺼둠
      });
    });



    // let inputBox = document.querySelector('.form-control');

    // inputBox.addEventListener("keyup", () => {

    //   let value = document.getElementById("value").value.toUpperCase();
    //   let item = document.querySelectorAll(".card");
    //   // console.log(value);
    //   // console.log(item[0]);

    //   for (let i = 0; i < item.length; i++) {
    //     let name = item[i].getElementsByClassName("card-title");
    //     if (name[0].innerHTML.toUpperCase().indexOf(value) > -1) {
    //       item[i].style.display = "flex";
    //     } else {
    //       item[i].style.display = "none";
    //     }
    //   }

    // });

    

    //검색버튼 입력시 동일한 영화제목 보여줌

    const performSearch = async () => {
      let value = document.getElementById("value").value.toUpperCase();
      let item = document.querySelectorAll(".card");

      // 검색어가 비어있는 경우 모든 카드를 보여줌
      if (value === "") {
        item.forEach(item => {
          item.style.display = "block";
        });
        return; // 검색어가 없으면 이후 코드 실행 안 함
      }

      let searchCount = 0;
      //검색어와 일치 카드 보여주기
      for (let i = 0; i < item.length; i++) {
        let name = item[i].getElementsByClassName("card-title");

        let findTitle = Array.from(name).find(title => title.innerHTML.toUpperCase() === value);

        if(findTitle || name[0].innerHTML.toUpperCase().indexOf(value) > -1){
          item[i].style.display = "block";
          // console.log(item[i]);
          searchCount++;
        }else {
          item[i].style.display = "none";
        }

        // if (name[0].innerHTML.toUpperCase() === value) {
        //   item[i].style.display = "block";
        //   console.log(item[i]);
        // } else {
        //   item[i].style.display = "none";
        // }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${searchCount}건이 검색되었습니다.`);
    }


    const searchButton = document.getElementById("sbtn");   //버튼클릭
    searchButton.addEventListener("click", () => performSearch());   //버튼이벤트


    document.addEventListener("keypress", (event) => {    //엔터이벤트
      if (event.key === "Enter") {
        event.preventDefault(); // 기본 엔터 동작 방지
        performSearch();
      }
    });

  })
  .catch(err => console.error(err));

  /* 다크 모드 설정 */

  function darkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");

    var button = document.getElementById("button");
    if(button.innerHTML === "Dark Mode") {
      button.innerHTML = "Light Mode";
  } else {
      button.innerHTML = "Dark Mode";
  }
}