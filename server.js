const express = require('express'),
      app = express(),
      fs = require('fs'),
      moment = require('moment'),
      kehitys = false,
      exphbs  = require('express-handlebars');

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let obj = JSON.parse(fs.readFileSync(__dirname+'/public/list.json', 'utf8'));

function hae(objLista, id) {
  let mo = moment();
  const weekday = ["Sunnuntai","Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"];

  mo = mo.add(parseInt(id), 'days');
  const n = mo.weekday();
  const week = mo.isoWeek();

  let found;
  for (let i = 0; i < objLista.length; i++) {
    if (objLista[i].weeks.indexOf(week) != -1) {
      found = i;
    }
  }

  let nobject = {"food": "Viikonloppu","day": n, "dayStr": weekday[n],"week": week};
  if (!(n === 6 || n === 0)) nobject.food = objLista[found].foods[n - 1];
  return nobject;
}

app.get("/", function (req, res) {
  res.render('index',{showCombobox:true});
});

app.get("/info", function (req, res) {
  res.render('info',{showCombobox:false});
});

app.get("/kehitys", function (req, res) {
  res.send(kehitys);
});

app.get("/api", function (req, res) {  
  if (req.query.q != null && req.query.id != null) {
    res.send(JSON.stringify(hae(obj[req.query.q],req.query.id)));
  } else {
    res.sendFile(__dirname + '/views/api.html');
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
