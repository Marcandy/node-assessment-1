var userData = require('./users.js');


module.exports = {
  readAll: function (req, res) {
    let users = userData.find();
    return users
  },
  getUsersByFavorite: function (fav) {
    let users = userData.find();
    return users.filter(function (user) {
      for (var i = 0; i < user.favorites.length; i++) {
        if (user.favorites[i] ==fav) {
          return user.favorites;
        }
      }
  })
},

  getUsersByAgeLimit: function (age) {
    let users = userData.find();
    return users.filter(function (user) {
      return user.age < age
    })
  },

  findUserByQuery: function (val1, val2) {
      let users = userData.find(val1, val2);
      return users;
  },

  findUserById: function (id) {
    let user = userData.findOne('id', id)
    return user;
  },

  getAdmins: function () {
    let users = userData.find();
    return users.filter(function (user) {
      return user.type == 'admin'
    })
  },

  getNonAdmins: function () {
    let users = userData.find();
    return users.filter(function (user) {
      return user.type != 'admin'
    })
  },

  updateUser: function (id, obj) {
     userData.update('id', id, obj);
     let updatedUser = userData.findOne('id', id);
     return updatedUser;
  },

  createUser: function (obj) {
    let user = userData.add(obj);
    return user
  },

  removeUser: function (id) {
    let user = userData.remove('id', id);
    return user
  }
}
