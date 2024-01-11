
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
        .then(data => {
            var username = data.name;
            var gender = data.gender;
            setGender(gender);
            document.getElementById("username").innerText = username + " 님";
            document.getElementById("username2").innerText = username + " 님";
            document.getElementById("username3").innerText = username + " 님";
        })
        .catch(error => {
            // 오류가 발생하면 콘솔에 출력합니다.
            console.error('오류:', error);
        });
}

function setGender(Gender) {
    const profileImage = document.getElementById('profileImage');

    let imagePath = "";

    if (Gender === "MALE") {
        imagePath = "img/undraw_profile_2.svg";
    } else if (Gender === "FEMALE") {
        imagePath = "img/undraw_profile_3.svg";
    } else {
        // 성별 정보가 없는 경우 기본 이미지 경로 설정
        imagePath = "img/undraw_profile.svg";
    }
    // 프로필 이미지의 src 속성을 변경합니다.
    profileImage.src = imagePath;
}


$(document).ready(function() {
    // 평균 단백질 섭취량 계산 및 업데이트
    getUser();
});
