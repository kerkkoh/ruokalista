if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) && window.navigator.standalone) {if ('addEventListener' in document) {document.addEventListener('DOMContentLoaded', function () {FastClick.attach(document.body);}, false);}};console.log("~ Ruokalista ~"),window.navigator.standalone===!0&&($("nav.navbar").css("padding-top","15px"),console.log($("nav").css("padding-top")),$("a").each(function(a){this.onclick=function(){if(void 0===$(this).attr("target"))return window.location=$(this).attr("href"),!1}}));