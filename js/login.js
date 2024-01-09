var SERVER_DOMAIN = "http://localhost:8081"


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

    // 가져온 파라미터를 사용하거나 로깅합니다.
    console.log('code 파라미터 값:', codeParam);
    login(codeParam);
  }

function login(code){
  fetch('https://api.yourprotein.shop/login/kakao?code='+code)
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
                window.location.replace(SERVER_DOMAIN)
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