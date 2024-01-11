// URL에서 recipeId 추출
const searchparams = new URLSearchParams(window.location.search);
const recipeId = searchparams.get('id');
console.log(recipeId);

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
// 레시피 정보를 가져와서 화면에 표시하는 함수
function loadRecipeDetails() {
    const apiUrl = `https://api.yourprotein.shop/recipe/${recipeId}`;

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + getCookie("accessToken")
        },
    })
        .then(response => {
            if (!response.ok) {
                // 오류 처리
                throw new Error('API 요청이 실패했습니다.');
            }
            return response.json();
        })
        .then(data => {
            // API 응답 데이터를 화면에 표시
            document.getElementById('recipe-name').textContent = data.recipeName;
            document.getElementById('recipe-details').textContent = data.details;
            document.getElementById('recipe-kcal').textContent = `칼로리: ${data.kcal}`;
            document.getElementById('recipe-carbo').textContent = `탄수화물: ${data.carbo}`;
            document.getElementById('recipe-protein').textContent = `단백질: ${data.protein}`;
            document.getElementById('recipe-fat').textContent = `지방: ${data.fat}`;
            document.getElementById('recipe-na').textContent = `나트륨: ${data.na}`;
            document.getElementById('recipe-kind').textContent = `종류: ${data.kind}`;

            // 이미지 표시
            const images = data.images[0];
            const imageContainer = document.getElementById('recipe-images');
            if (images) {
                const img = document.createElement('img');
                img.src = images;
                img.alt = data.recipeName;
                imageContainer.appendChild(img);
            }

            // 조리 방법 표시
            const manualContainer = document.getElementById('recipe-manual-content');
            const manualItems = data.manual; // manual 배열
            console.log(manualItems);
            // manualItems 배열의 각 항목을 <p> 태그로 감싸서 연결
            const manualText = manualItems.map(item => `<p>${item}</p>`).join('');

            manualContainer.innerHTML = manualText; // innerHTML을 사용하여 HTML 태그를 해석하도록 설정


        })
        .catch(error => {
            console.error('오류:', error);
            // 오류 처리를 여기에 추가하세요.
        });
}

// 레시피 정보 로드 함수 호출
loadRecipeDetails();
