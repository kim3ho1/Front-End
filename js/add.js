const foodDatabase = [
  { name: "사과", proteinPer100g: 0.3 },
  { name: "닭 가슴살", proteinPer100g: 31 },
  { name: "계란", proteinPer100g: 13 },
  // 추가 음식 데이터...
];

// 음식 필터링 함수
function filterFoods() {
  const search = document.getElementById("food-search").value.toLowerCase();
  const foodList = document.getElementById("food-name");
  foodList.innerHTML = "";

  foodDatabase
    .filter((food) => food.name.toLowerCase().includes(search))
    .forEach((filteredFood) => {
      const option = document.createElement("option");
      option.value = filteredFood.name;
      option.textContent = filteredFood.name;
      foodList.appendChild(option);
    });
}

// 음식 제출 처리 및 단백질 계산
document.getElementById("food-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedFoodName = document.getElementById("food-name").value;
  const foodWeight = document.getElementById("food-weight").value;
  const selectedFood = foodDatabase.find(
    (food) => food.name === selectedFoodName
  );

  if (selectedFood) {
    const proteinContent = (selectedFood.proteinPer100g * foodWeight) / 100;
    document.getElementById("protein-content").value =
      proteinContent.toFixed(2);
  } else {
    alert("음식을 선택해주세요 !");
  }
});

function setSelectedFoodToInput() {
  var selectedFood = document.getElementById("food-name").value;
  document.getElementById("food-search").value = selectedFood;
}

function updateProteinContent() {
  const selectedFoodName = document.getElementById("food-search").value;
  const foodWeight = document.getElementById("food-weight").value;
  const selectedFood = foodDatabase.find(
    (food) => food.name === selectedFoodName
  );

  if (selectedFood && foodWeight) {
    const proteinContent = (selectedFood.proteinPer100g * foodWeight) / 100;
    document.getElementById("protein-content").value =
      proteinContent.toFixed(2);
  }
}

// 페이지 로드 시 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("food-search").addEventListener("input", filterFoods);
  document
    .getElementById("food-name")
    .addEventListener("change", setSelectedFoodToInput);
  document
    .getElementById("food-weight")
    .addEventListener("input", updateProteinContent);
});
