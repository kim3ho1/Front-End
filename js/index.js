var currentProtein = 0;
var goalProtein = 0;
var weeklydata;
var weeklydate = ["월", "화", "수", "목", "금", "토", "일"];
var weeklyamount = [0, 0, 0, 0, 0, 0, 0];

function updateIconProgress(currentProtein, goalProtein) {
  var progressIcon = document.getElementById("progressIcon");
  var iconHeight = progressIcon.offsetHeight; // 아이콘의 전체 높이
  var clipHeight = iconHeight * (1 - currentProtein / goalProtein); // 클리핑 높이 계산

  // 클리핑 영역 업데이트
  progressIcon.style.clip = `rect(${clipHeight}px, auto, auto, 0)`;
}


function getRecommendRecipe() {
    return fetch("https://api.yourprotein.shop/recipe/recommend?protein=20", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + getCookie("accessToken")
        },
    })
        .then(response => {
            // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
            if (!response.ok) {
                // window.location.replace(SERVER_DOMAIN+ "/login.html")
            }
            return response.json();
        })
        .then(data => {
            const recipes = data;
            const recipeContainer = document.getElementById('recipe-container');

            // 각 레시피 데이터를 순회하면서 이미지와 레시피 이름을 생성합니다.
            recipes.forEach(recipe => {
                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe-item');

                const recipeContent = document.createElement('div');
                recipeContent.classList.add('recipe-content');

                const img = document.createElement('img');
                img.src = recipe.images[0]; // 첫 번째 이미지만 사용
                img.alt = recipe.recipeName;

                const h4 = document.createElement('h4');
                h4.classList.add('recipe-name');
                h4.textContent = recipe.recipeName;

                recipeContent.appendChild(img);
                recipeContent.appendChild(h4);

                const btn = document.createElement('a');
                btn.href = `cook_recipe_${recipe.id}.html`; // 레시피 페이지 URL
                btn.classList.add('btn', 'btn-primary');
                btn.textContent = '요리하기';

                recipeItem.appendChild(recipeContent);
                recipeItem.appendChild(btn);
                recipeContainer.appendChild(recipeItem);

                const divider = document.createElement('hr');
                divider.classList.add('sidebar-divider');
                recipeContainer.appendChild(divider);
            });

        })
        .catch(error => {
            // 오류가 발생하면 콘솔에 출력합니다.
            console.error('오류:', error);
            // window.location.replace(SERVER_DOMAIN+ "/login.html")
        });
}

function getCurrentProtein() {
  return fetch("https://api.yourprotein.shop/food", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    // body: JSON.stringify(jsonData)
  })
    .then((response) => {
      // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
      if (!response.ok) {
        // window.location.replace(SERVER_DOMAIN+ "/login.html")
      }
      return response.json();
    })
    .catch((error) => {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error("오류:", error);
      // window.location.replace(SERVER_DOMAIN+ "/login.html")
    });

}

function getWeeklyData() {
  return fetch("https://api.yourprotein.shop/food/weekly", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    // body: JSON.stringify(jsonData)
  })
    .then((response) => {
      // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
      if (!response.ok) {
        // window.location.replace(SERVER_DOMAIN+ "/login.html")
      }
      return response.json();
    })
    .catch((error) => {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error("오류:", error);
      // window.location.replace(SERVER_DOMAIN+ "/login.html")
    });
}

function updateAverageProteinIntake() {
  var sum = weeklyamount.reduce(function (a, b) {
    return a + b;
  }, 0);
  var average = sum / weeklyamount.length;
  $("#averageProteinIntake").text(average.toFixed(1) + "g");
}

Promise.all([getCurrentProtein(), getWeeklyData()])
  .then((results) => {
        // 현재 단백질 섭취량 & 목표 단백질 설정
        currentProtein = results[0].currentProtein.toFixed(1);
        goalProtein = results[0].goalProtein.toFixed(1);
        document.getElementById("currentProtein").innerText = currentProtein;
        document.getElementById("goalProtein").innerText = goalProtein;
        updateIconProgress(currentProtein, goalProtein);

        // 차트 설정
        weeklydata = results[1].slice(0, 7); // 인덱스 0부터 6까지의 데이터를 추출하여 저장
        var weeklydateoriginal = weeklydata.map(item => item.date); // 날짜만을 추출하여 저장
        weeklydate = weeklydateoriginal.reverse();
        var weeklyamountoriginal = weeklydata.map(item => item.amount); // 양만을 추출하여 저장
        weeklyamount = weeklyamountoriginal.reverse();
        updateAverageProteinIntake(); // 평균 단백질 섭취량 업데이트
        setChart();

    })
    .catch(error => {
        console.error('오류:', error);
    });



// Document ready function
$(document).ready(function() {
    // 평균 단백질 섭취량 계산 및 업데이트
    setChart();
    getRecommendRecipe();
});

