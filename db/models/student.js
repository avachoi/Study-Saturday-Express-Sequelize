const Sequelize = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
});

Student.addHook("beforeCreate", (studentInstance, optionsObject) => {
	studentInstance.firstName =
		studentInstance.firstName[0].toUpperCase() +
		studentInstance.firstName.slice(1);
	studentInstance.lastName =
		studentInstance.lastName[0].toUpperCase() +
		studentInstance.lastName.slice(1);
});

module.exports = Student;
