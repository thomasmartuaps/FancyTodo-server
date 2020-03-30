'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 4,
          msg: 'title must be at least 4 letters'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "Must be a valid date."
        },
        isAfter: {
          args: new Date().toString(),
          msg: "Date cannot be earlier than now."
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(todo, options) {
        if(!todo.description || todo.description === '') {
          todo.description = 'No description added.'
        }
      }
    },
    sequelize
  });

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
    // associations can be defined here
  };
  return Todo;
};