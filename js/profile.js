// 로그인 상태를 확인하는 함수
function checkLoginStatus() {
  // 여기서 실제 로그인 상태를 확인하는 로직을 구현합니다.
  // 예시로는 로그인 상태를 true로 가정합니다.
  return true; // 로그인 상태라고 가정
}

// 페이지 로드 시 로그인 상태에 따라 버튼 표시 변경
document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = checkLoginStatus();
  document.getElementById("login-link").style.display = loggedIn
    ? "none"
    : "block";
  document.getElementById("register-link").style.display = loggedIn
    ? "none"
    : "block";
  document.getElementById("logout-link").style.display = loggedIn
    ? "block"
    : "none";
});
