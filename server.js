const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql');





PORT = process.env.PORT || 8082;

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'funddb'
});

db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/initial_signup', (req, res) => {
  var users= req.body;
  var values = [];


values.push([users.email, users.Create_pw,users.Confirm_pw]);

console.log(users)
console.log(values)
db.query('INSERT INTO initial_signup (email, Create_pw, Confirm_pw) VALUES ?', [values], function(err,result) {
  if(err) {
     res.send(err);
  }
 else {
     res.send('Success');
  } }
  )
})
app.post('/signup', (req, res) => {
  var users = req.body;
  var values = []
  values.push([users.name, users.email, users.Create_pw, users.Confirm_pw, users.Phone, users.City, users.State, users.Country])

  console.log(users)
  console.log(values)

  db.query('INSERT INTO signup (name, email, Create_pw, Confirm_pw, Phone, City, State, Country VALUES ?', [values], function(err, result){
    if(err){
      res.send(err);
    }
    else{
      res.send('success')
    }
  })
})
app.get('/init', function(req, res){
  var query = db.query('SELECT email FROM initial_signup',function(err, result) {
    // Neat!
  });
  console.log(query)
  res.end('success')
})

app.get('/lboard1', (req, res) => {
  const sqlSelect = "SELECT Name, Tamt_donated FROM user_info ORDER BY Tamt_donated DESC limit 0,1";
  db.query(sqlSelect, (err, result)=> {
    res.send(result);
    result = JSON.stringify(result)
    console.log(result)
  });
  //res.end()
});

app.get('/lboard2', (req, res) => {
  const sqlSelect = "SELECT Name, Tamt_donated FROM user_info ORDER BY Tamt_donated DESC limit 1,1";
  db.query(sqlSelect, (err, result)=> {
    res.send(result);
    console.log("successread")
  });
  //res.end()
});

app.get('/lboard3', (req, res) => {
  const sqlSelect = "SELECT Name, Tamt_donated FROM user_info ORDER BY Tamt_donated DESC limit 2,1";
  db.query(sqlSelect, (err, result)=> {
    res.send(result);
    console.log("successread")
  });
  //res.end()
});
/*
app.get("/", (req, res) => {
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  res.send('hello world');
});*/
  



app.listen(PORT, console.log(`Server started on port ${PORT}`));
