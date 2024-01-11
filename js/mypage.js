var SERVER_DOMAIN = "http://localhost:8081";
var API_SERVER_DOMAIN = "http://localhost:8000";

let container = document.getElementById("container");

async function fetchProfile() {
  try {
    const response = await fetch(`${API_SERVER_DOMAIN}/user/details`, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    if (!response.ok) {
      // 에러 처리
      return;
    }
    const data = await response.json();
    document.getElementById("height").value = data.height;
    document.getElementById("weight").value = data.weight;
    document.getElementById("goal").value = data.goal;
    document.getElementById("purpose").value = data.purpose;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

function enableEdit() {
  document.getElementById("height").disabled = false;
  document.getElementById("weight").disabled = false;
  document.getElementById("goal").disabled = false;
  document.getElementById("purpose").disabled = false;
  document.getElementById("editButton").style.display = "none";
  document.getElementById("saveButton").style.display = "block";
}

async function saveData() {
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

  try {
    const response = await fetch(`${API_SERVER_DOMAIN}/user/details`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(jsonData),
    });

    if (response.ok) {
      alert("Profile updated successfully.");
    } else {
      alert("Error updating profile.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }

  // 수정 상태를 되돌림
  document.getElementById("height").disabled = true;
  document.getElementById("weight").disabled = true;
  document.getElementById("goal").disabled = true;
  document.getElementById("purpose").disabled = true;
  document.getElementById("editButton").style.display = "block";
  document.getElementById("saveButton").style.display = "none";
}

// 페이지 로드 시 프로필 정보 가져오기
window.addEventListener("load", fetchProfile);
