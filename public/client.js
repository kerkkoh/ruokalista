/*
    Uncompressed JS
*/
if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) && window.navigator.standalone) {if ('addEventListener' in document) {document.addEventListener('DOMContentLoaded', function () {FastClick.attach(document.body);}, false);}};

console.log("~ Ruokalista ~ Copyright Kerkko Karttunen ~");

if (window.navigator.standalone === true) {
  //$("nav.navbar").css('padding-top','15px');
  //$("body").css('margin-top', '15px !important');
  $('a').each(function (indx) {
      this.onclick=function() {
        if ($(this).attr('target') === undefined) {
          window.location=$(this).attr("href");
          return false;
        }
      }
  })
}

// This (getWeek) script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript 
// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

function hae(objLista, id) {
  var d = new Date();
  var week = d.getWeek();
  var found;
  var n = d.getDay();
  
  switch (id) {
    case "eilen":
      var testVar = n - 1;
      if (testVar == -1) {
        n = 6;
      } else if (testVar === 0) {
        n = 0;
        week--;
      } else {
        n--;
      }
    break;
    case "huomenna":
      var testVar1 = n + 1;
      if (testVar1 == 7) {
        n = 0;
      } else if (testVar1 == 1) {
        n = 1;
        week++;
      } else {
        n++;
      }
    break;
  }
  
  
  objLista.forEach(function(item, indx) {
    if (item.weeks.indexOf(week) != -1) found = indx;
  });

  var ds = ["Sunnuntai","Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"][n];
  var str;
  if (n === 6 || n === 0) {
    str = "<h1>" + ds + ":</h1><h3>Viikonloppu</h3>";
  } else {
    str = "<h1>" + ds + ":</h1><h3>" + objLista[found].foods[n - 1] + "</h3>";
  }
  $("#"+id).html(str);
}

function cbChanged() {
  var cb = $("#cb").val();
  $.getJSON("/list.json", function(json) {
    hae(json[cb], "eilen");
    hae(json[cb], "tanaan");
    hae(json[cb], "huomenna");
  });
}

cbChanged();
