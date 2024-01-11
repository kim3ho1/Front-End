function talk_ai_open(){
    var i = document.getElementById("talk_ai_i")

    if(i.classList.contains("fa-angle-down")){
        return
    }
    i.classList.remove("fa-angle-right")
    i.classList.add("fa-angle-down")
    document.getElementsByClassName("chat_wrap")[0].style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {}, 5000);
    ai_chat("안녕하세요. 무엇이든 물어보세요!")
}

$(function(){
    $("input[type='text']").keypress(function(e){
        if(e.keyCode == 13 && $(this).val().length){
            var _val = $(this).val();
            var _class = $(this).attr("class");
            $(this).val('');
            var _tar = $(".chat_wrap .inner").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+currentTime()+'</span></div></div>');

            var lastItem = $(".chat_wrap .inner").find(".item:last");
            setTimeout(function(){
                lastItem.addClass("on");
            },10);

            var position = lastItem.position().top + $(".chat_wrap .inner").scrollTop();
            console.log(position);

            $(".chat_wrap .inner").stop().animate({scrollTop:position},500);

            //msg input false
            document.getElementById("mymsg").disabled = true;
            
            //loading effect
            loadingElementStr = '<img id="loading" src="/img/loading.gif" alt="" style="height: 20px;">'
            var parser = new DOMParser();
            var parsedHtml = parser.parseFromString(loadingElementStr, 'text/html');
            var newElement = parsedHtml.body.firstChild;
            document.getElementsByClassName("inner")[0].appendChild(newElement)

            //fetch
            var jsonData = {
                "prompt": _val
              };

            fetch("https://api.yourprotein.shop/api/chatgpt/rest/completion/chat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : "Bearer " + getCookie("accessToken")
                },
                body: JSON.stringify(jsonData) // JSON 데이터를 문자열로 변환하여 body에 포함
            })
            .then(response => {
                // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
                if (!response.ok) {
                    // window.location.replace(SERVER_DOMAIN+ "/login.html")
                }
                return response.json();
            })
            // .then(response => response.json()) // 응답을 JSON 형식으로 파싱
            .then(data => {
                console.log("서버 응답:", data);
                // 여기에서 서버 응답을 처리할 수 있습니다.
                ai_chat(data.messages[0].message)
                document.getElementById("loading").remove();
                document.getElementById("mymsg").disabled = false;
                document.getElementById("mymsg").focus();
            })
            .catch(error => {
                console.error("에러 발생:", error);
            });
        }
    });

});

var currentTime = function(){
    var date = new Date();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var apm = hh >12 ? "오후":"오전";
    var ct = apm + " "+hh+":"+mm+"";
    return ct;
}

function ai_chat(msg){
    var _class = "yourmsg";
    var _val = msg;
    var _tar = $(".chat_wrap .inner").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+currentTime()+'</span></div></div>');

    var lastItem = $(".chat_wrap .inner").find(".item:last");
    setTimeout(function(){
        lastItem.addClass("on");
    },10);

    var position = lastItem.position().top + $(".chat_wrap .inner").scrollTop();
    console.log(position);

    $(".chat_wrap .inner").stop().animate({scrollTop:position},500);
}

function getPlanAdvice(){
    fetch("https://api.yourprotein.shop/gpt/total", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : "Bearer " + getCookie("accessToken")
                }
            })
            .then(response => {
                // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
                if (!response.ok) {
                    // window.location.replace(SERVER_DOMAIN+ "/login.html")
                }
                return response.json();
            })
            // .then(response => response.json()) // 응답을 JSON 형식으로 파싱
            .then(data => {
                console.log("서버 응답:", data);
                // 여기에서 서버 응답을 처리할 수 있습니다.
                document.getElementById("1_loading").remove();
                document.getElementById("advice_1").innerText = data.messages[0].message
            })
            .catch(error => {
                console.error("에러 발생:", error);
            });
}

function getTotalAdvice(){
    fetch("https://api.yourprotein.shop/gpt/plan", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : "Bearer " + getCookie("accessToken")
                }
            })
            .then(response => {
                // 응답이 성공적으로 받아지면 JSON 형식으로 파싱합니다.
                if (!response.ok) {
                    // window.location.replace(SERVER_DOMAIN+ "/login.html")
                }
                return response.json();
            })
            // .then(response => response.json()) // 응답을 JSON 형식으로 파싱
            .then(data => {
                console.log("서버 응답:", data);
                // 여기에서 서버 응답을 처리할 수 있습니다.
                document.getElementById("2_loading").remove();
                document.getElementById("advice_2").innerText = data.messages[0].message
            })
            .catch(error => {
                console.error("에러 발생:", error);
            });
}
getTotalAdvice();
getPlanAdvice();