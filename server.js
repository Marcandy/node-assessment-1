var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var cors = require('cors');

var app  = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

var userCtrl = require('./userCtrl.js');

app.get('/api/users', function (req, res) {
  if (req.query.favorites) {
    let users = userCtrl.getUsersByFavorite(req.query.favorites);
  return res.status(200).json(users);
}
  else if (req.query.type) {
    let users = userCtrl.findUserByQuery('type', req.query.type);
    return res.status(200).json(users);
  }
  else if (req.query.age) {
    users = userCtrl.getUsersByAgeLimit(req.query.age)
    return res.status(200).json(users);
  }
  else if (req.query.state) {
    let users = userCtrl.findUserByQuery('state', req.query.state);
    return res.status(200).json(users);
  }
  else {
    return res.status(200).send(userCtrl.readAll());
  }
});

app.get('/api/users/:id', function (req, res) {
  //does not even need to pass req param.id because it does not depend of it
  let user = userCtrl.findUserById(req.params.id)
  if(!user) {
    return res.status(404).json('not found')
  }
  else {
    return res.status(200).json(user);
  }
});

app.get('/api/admins', function (req, res) {
  let users = userCtrl.getAdmins();
  return res.status(200).json(users)
})

app.get('/api/nonadmins', function (req, res) {
  let users = userCtrl.getNonAdmins();
  return res.status(200).json(users)
})

app.put('/api/users/:id', function (req, res) {
  let user = userCtrl.updateUser(req.params.id, req.body);
  return res.status(200).json(user);
})

app.post('/api/users', function (req, res) {
  let user = userCtrl.createUser(req.body);
  return res.status(200).json(user);
})

app.delete('/api/users/:id', function (req, res) {
  let user = userCtrl.removeUser(req.params.id);
  return res.status(200).json(user)
})

app.listen(port, function () {
  console.log('listening on', port);
})
