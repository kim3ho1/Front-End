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
      var goalProtein = data.goalProtein;
      var username = data.name;
      document.getElementById("goalProtein").innerText = goalProtein + " g";
      document.getElementById("username").innerText = username + " 님";
      document.getElementById("username2").innerText = username + " 님";
      document.getElementById("username3").innerText = username + " 님";
      document.getElementById("username4").innerText = username + " 님";
    })
    .catch((error) => {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error("오류:", error);
      // window.location.replace(SERVER_DOMAIN+ "/login.html")
    });
}

// Document ready function
$(document).ready(function () {
  // Update icon progress
  function updateIconProgress(percentage) {
    var progressIcon = document.getElementById("progressIcon");
    var iconHeight = progressIcon.offsetHeight; // 아이콘의 전체 높이
    var clipHeight = iconHeight * (1 - percentage / 100); // 클리핑 높이 계산

    // 클리핑 영역 업데이트
    progressIcon.style.clip = `rect(${clipHeight}px, auto, auto, 0)`;
  }

  // 평균 단백질 섭취량 계산 및 업데이트
  function updateAverageProteinIntake() {
    var data = [40, 80, 95, 35, 55, 72, 48]; // 더미 데이터
    var sum = data.reduce(function (a, b) {
      return a + b;
    }, 0);
    var average = sum / data.length;
    $("#averageProteinIntake").text(average.toFixed(1) + "g");
  }

  updateIconProgress(70); // 아이콘 프로그레스 업데이트
  updateAverageProteinIntake(); // 평균 단백질 섭취량 업데이트
});

getuser();
