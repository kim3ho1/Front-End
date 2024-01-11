document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search").addEventListener("click", function () {
    const query = document.getElementById("food-search").value;
    getFood(query);
  });
  document
    .getElementById("calculate")
    .addEventListener("click", calculateProtein);
});

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// 사용자의 검색어를 기반으로 음식 데이터를 검색하는 함수
function fetchFoods(query) {
  getFood(query)
    .then((foods) => {
      const foodSelect = document.getElementById("food-select");
      foodSelect.innerHTML = ""; // 기존 목록 초기화

      foods.forEach((food) => {
        const option = document.createElement("option");
        const proteinPer100g = (food.protein / food.amount) * 100;
        option.value = proteinPer100g;
        option.dataset.foodId = food.id;
        option.textContent = `${
          food.foodName
        } (100g 당 ${proteinPer100g.toFixed(2)}g 단백질)`;
        foodSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("음식 데이터 로드 실패:", error);
    });
}

function calculateProtein() {
  const selectedOption =
    document.getElementById("food-select").selectedOptions[0];
  const proteinPer100g = parseFloat(selectedOption.value);
  const foodId = selectedOption.dataset.foodId;
  const weight = parseFloat(document.getElementById("food-weight").value);
  const proteinIntake = (proteinPer100g * weight) / 100;
  document.getElementById("protein-intake").textContent =
    proteinIntake.toFixed(2);

  putUserProtein(foodId, proteinIntake)
    .then(() => {
      console.log("사용자의 단백질 섭취량이 서버에 전송되었습니다.");
    })
    .catch((error) => {
      console.error("단백질 섭취량 전송 오류:", error);
    });
}

function getUser() {
  return fetch("https://api.yourprotein.shop/user", {
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
        throw new Error("API 호출 실패");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error("오류:", error);
    });
}

function getFood(query) {
  // 검색 쿼리를 URL에 포함하여 요청합니다.
  return fetch(
    `https://api.yourprotein.shop/food/search?keyword=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }
      return response.json();
    })
    .then((data) => {
      console.log("서버 응답:", data); // 서버 응답 로깅
      updateFoodSelect(data); // 음식 선택 목록 업데이트
    })
    .catch((error) => {
      console.error("오류:", error);
    });
}

// 음식 선택 드롭다운 목록을 업데이트하는 함수
function updateFoodSelect(foods) {
  const foodSelect = document.getElementById("food-select");
  foodSelect.innerHTML = ""; // 기존 목록 초기화

  // foods가 유효한 배열인지 확인합니다.
  if (!Array.isArray(foods)) {
    console.error("유효하지 않은 데이터:", foods);
    return;
  }

  foods.forEach((food) => {
    const option = document.createElement("option");
    const proteinPer100g =
      food.protein === "-" ? 0 : (food.protein / food.amount) * 100;
    option.value = proteinPer100g;
    option.dataset.foodId = food.id;
    option.textContent = `${food.foodName} (100g 당 ${proteinPer100g.toFixed(
      2
    )}g 단백질)`;
    foodSelect.appendChild(option);
  });
}

// 단백질 섭취량을 계산하고 서버에 전송하는 함수
function calculateProtein() {
  const selectedOption =
    document.getElementById("food-select").selectedOptions[0];
  const proteinPer100g = selectedOption.value;
  const foodId = selectedOption.dataset.foodId; // 선택된 음식의 ID
  const weight = document.getElementById("food-weight").value;
  const proteinIntake = (proteinPer100g * weight) / 100;
  document.getElementById("protein-intake").textContent =
    proteinIntake.toFixed(2);

  // 서버에 사용자의 프로틴 섭취량 전송
  putUserProtein(foodId, proteinIntake)
    .then(() => {
      console.log("사용자의 단백질 섭취량이 성공적으로 전송되었습니다.");
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });
}

// 사용자가 섭취한 프로틴을 서버에 전송하는 함수
function putUserProtein(foodId, proteinIntake) {
  return fetch("https://api.yourprotein.shop/food/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      foodId: foodId,
      proteinIntake: proteinIntake,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("API 호출 실패");
    }
    return response.json();
  });
}
