document.querySelectorAll('.recipe-item .btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        console.log("버튼이 클릭되었습니다.");
        try {
            console.log("버튼이 클릭되었습니다.");
            const recipeId = btn.id.replace('recipepopup', ''); // 버튼의 id에서 숫자만 추출
            openRecipeModal(recipeId);
        } catch (error) {
            console.error('오류:', error);
        }
    });
});

// 팝업 창 띄우는 함수
function openRecipeModal(recipeId) {

    const popupUrl = `recipepopup.html?id=${recipeId}`;

    // 모달 요소를 생성하고 스타일을 지정합니다.
    const modalContainer = document.createElement('div');
    modalContainer.className = 'popup-container';

    const modal = document.createElement('div');
    modal.className = 'popup';

    // recipepopup.html 파일을 iframe으로 포함합니다.
    const iframe = document.createElement('iframe');
    iframe.src = popupUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    modal.appendChild(iframe);

    // 모달을 body에 추가합니다.
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);

    // 모달 외부를 클릭하면 모달을 닫도록 이벤트 리스너를 추가합니다.
    modalContainer.addEventListener('click', function (event) {
        if (event.target === modalContainer) {
            modalContainer.remove();
        }
    });
}

function cook(el){
    openRecipeModal(el.getAttribute("id"));
}