'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email is already in use"
      },
      validate: {
        len: {
          args: 3,
          msg: "Email must be at least 3 characters long."
        },
        isEmail: {
          args: true,
          msg: 'Must use valid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 16],
          msg: "Password must be between 6-16 characters."
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize
  })
  User.associate = function(models) {
    User.hasMany(models.Todo)
    // associations can be defined here
  };
  return User;
};