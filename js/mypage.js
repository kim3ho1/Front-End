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
    .then((data) => {
      var height = data.height;
      var weight = data.weight;
      var goalProtein = data.goalProtein;
      var purpose = data.purpose;
      document.getElementById("height").value = height;
      document.getElementById("weight").value = weight;
      document.getElementById("goalProtein").value = goalProtein;
      document.getElementById("purpose").value = purpose;
    })
    .catch((error) => {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error("오류:", error);
    });
}

function enableEdit() {
  document.getElementById("height").disabled = false;
  document.getElementById("weight").disabled = false;
  document.getElementById("purpose").disabled = false;
  document.getElementById("editButton").style.display = "none";
  document.getElementById("saveButton").style.display = "block";
}

function saveData() {
  const inputElement = document.getElementById("inputValue");
  // 입력된 값을 가져와서 JSON 객체를 만듭니다.
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const goalProtein = parseFloat(document.getElementById("goalProtein").value);
  const purpose = document.getElementById("purpose").value;

  console.log(height);
  console.log(weight);
  console.log(goalProtein);
  console.log(purpose);

  const requestBody = {
    height: height,
    weight: weight,
    goalProtein: goalProtein,
    purpose: purpose,
  };

  // fetch 요청을 보냅니다.
  return fetch("https://api.yourprotein.shop/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(requestBody), // JSON 데이터를 요청 본문에 추가합니다.
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }
      return response.json();
    })
    .then((data) => {
      // 수정 상태를 되돌립니다.
      document.getElementById("height").disabled = true;
      document.getElementById("weight").disabled = true;
      document.getElementById("goalProtein").disabled = true;
      document.getElementById("purpose").disabled = true;
      document.getElementById("editButton").style.display = "block";
      document.getElementById("saveButton").style.display = "none";
    })
    .catch((error) => {
      console.error("오류:", error);
    });
}

// 페이지 로드 시 프로필 정보 가져오기
window.addEventListener("load", getUser);
