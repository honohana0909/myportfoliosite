$(function(){
     var animation = lottie.loadAnimation({
         container: document.getElementById("honokamaekawa"),　//HTMLのID
         renderer: "svg",
         loop: false, //ループ
         autoplay: false,　//自動再生
         path: "json/data.json"　//jsonファイルの場所
     });
 });

$(function(){
     var animation = lottie.loadAnimation({
         container: document.getElementById("scroll_down"),　//HTMLのID
         renderer: "svg",
         loop: false, //ループ
         autoplay: false,　//自動再生
         path: "json/scroll_back.json"　//jsonファイルの場所
     });
 });