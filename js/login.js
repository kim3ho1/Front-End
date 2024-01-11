var SERVER_DOMAIN = "http://localhost:8081"
var API_SERVER_DOMAIN = "http://localhost:8000"


let container = document.getElementById("container");

toggle = () => {
  container.classList.toggle("sign-in");
  container.classList.toggle("sign-up");
};

setTimeout(() => {
  container.classList.add("sign-in");
}, 200);

var currentUrl = window.location.href;

// URL에서 query string을 추출합니다.
var queryString = currentUrl.split('?')[1];

// query string이 있다면 파라미터를 추출합니다.
if (queryString) {
    // URL 파라미터를 객체로 변환합니다.
    var params = {};
    queryString.split('&').forEach(function (param) {
        var keyValue = param.split('=');
        params[keyValue[0]] = decodeURIComponent(keyValue[1]);
    });

    // code 파라미터를 가져옵니다.
    var codeParam = params['code'];

    login(codeParam);
  }

function login(code){
  fetch(API_SERVER_DOMAIN+"/login/kakao?code="+code)
            .then(response => {
                // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
                if (!response.ok) {
                    // window.location.replace(SERVER_DOMAIN+ "/login.html")
                }
                return response.json();
            })
            .then(data => {
                var accessToken = data.accessToken;
                setCookie("accessToken", accessToken, 1);
                var refreshToken = data.refreshToken;
                setCookie("refreshToken", refreshToken, 1);
                console.log("new user? " + data.isNewUser)
                if(data.isNewUser){
                  toggle();
                }else{
                  window.location.replace(SERVER_DOMAIN)
                }

            })
            .catch(error => {
                // 오류가 발생하면 콘솔에 출력합니다.
                console.error('오류:', error);
                // window.location.replace(SERVER_DOMAIN+ "/login.html")
            });
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
      }
  }
  return null;
}

function signup(){
  var age = document.getElementById("age").value
  var gender = document.getElementById("gender").value
  var height = document.getElementById("height").value
  var weight = document.getElementById("weight").value
  var purpose = document.getElementById("purpose").value
  console.log(age)
  console.log(gender)
  console.log(height)
  console.log(weight)
  console.log(purpose)

  if(age == null || gender ==null || height==null || weight == null || purpose == null){
    alert("빈칸을 모두 채워주세요.")
    return
  }

  // 서버 엔드포인트 URL
  var url = API_SERVER_DOMAIN+"/user/details";

  var jsonData = {
    "age": age,
    "gender" : gender,
    "height" : height,
    "weight" : weight,
    "purpose" : purpose
  };
  
  // fetch 함수를 사용하여 POST 요청 보냄
  fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + getCookie("accessToken")
      },
      body: JSON.stringify(jsonData) // JSON 데이터를 문자열로 변환하여 body에 포함
  })
  // .then(response => response.json()) // 응답을 JSON 형식으로 파싱
  .then(data => {
      console.log("서버 응답:", data);
      // 여기에서 서버 응답을 처리할 수 있습니다.
      window.location.replace(SERVER_DOMAIN)
  })
  .catch(error => {
      console.error("에러 발생:", error);
  });

}


function logout(){
  var url = API_SERVER_DOMAIN+"/logout";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    })
    // .then(response => response.json()) // 응답을 JSON 형식으로 파싱
    .then(data => {
        console.log("서버 응답:", data);
        // 여기에서 서버 응답을 처리할 수 있습니다.
        window.location.replace(SERVER_DOMAIN)
    })
    .catch(error => {
        console.error("에러 발생:", error);
    });
}



