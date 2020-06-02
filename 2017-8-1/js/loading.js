window.onload = function(){
    setTimeout(function(){
    var loader = document.getElementsByClassName("loader")[0];
    loader.className="loader fadeout" ;//使用渐隐的方法淡出loading page
    setTimeout(function(){loader.style.display="none"},1000)
    },1000)//强制显示loading page 1s
};

// $(function () {
//     var isPageHide = false;
//     window.addEventListener('pageshow', function () {
//         if (isPageHide) {
//             window.location.reload();
//         }
//     });
//     window.addEventListener('pagehide', function () {
//         isPageHide = true;
//     });
// })

