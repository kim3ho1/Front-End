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
            //fetch 해야함

            ai_chat("답변입니다.")
            document.getElementById("loading").remove();
            document.getElementById("mymsg").disabled = false;
            document.getElementById("mymsg").focus();
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

