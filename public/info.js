/*
    Uncompressed JS
*/
console.log("~ Ruokalista ~");

if (window.navigator.standalone === true) {
  $("nav.navbar").css('padding-top','15px');
  console.log($('nav').css("padding-top"));
  $('a').each(function (indx) {
      this.onclick=function() {
        if ($(this).attr('target') === undefined) {
          window.location=$(this).attr("href");
          return false;
        }
      }
  })
}
