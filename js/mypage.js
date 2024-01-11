function getuser() {
  fetch("https://api.yourprotein.shop/user", {
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
    .then((data) => {
      var height = data.height;
      var weight = data.weight;
      var goalProtein = data.goalProtein;
      var purpose = data.purpose;
      document.getElementById("height").innerText = height;
      document.getElementById("weight").value = weight;
      document.getElementById("goalProtein").value = goalProtein;
      document.getElementById("weight").value = weight;
    })
    .catch((error) => {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error("오류:", error);
      // window.location.replace(SERVER_DOMAIN+ "/login.html")
    });
}

function enableEdit() {
  document.getElementById("height").disabled = false;
  document.getElementById("weight").disabled = false;
  document.getElementById("goal").disabled = false;
  document.getElementById("purpose").disabled = false;
  document.getElementById("editButton").style.display = "none";
  document.getElementById("saveButton").style.display = "block";
}

function saveData() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const goal = parseFloat(document.getElementById("goal").value);
  const purpose = document.getElementById("purpose").value;

  const jsonData = {
    height: height,
    weight: weight,
    goal: goal,
    purpose: purpose,
  };

  // 수정 상태를 되돌림
  document.getElementById("height").disabled = true;
  document.getElementById("weight").disabled = true;
  document.getElementById("goal").disabled = true;
  document.getElementById("purpose").disabled = true;
  document.getElementById("editButton").style.display = "block";
  document.getElementById("saveButton").style.display = "none";
}

// 페이지 로드 시 프로필 정보 가져오기
getuser();
