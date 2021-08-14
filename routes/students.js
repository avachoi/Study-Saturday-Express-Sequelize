// const { noExtendLeft } = require("sequelize/types/lib/operators");
const Student = require("../db/models/student");

const router = require("express").Router();

router.get("/", async (req, res) => {
	try {
		const allStudent = await Student.findAll();

		res.status(200).json(allStudent);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res) => {
	const aStudent = await Student.findByPk(req.params.id);
	if (!aStudent) {
		res.status(404).json('"Not Found"');
	} else {
		res.status(200).json(aStudent);
	}
});

router.post("/", async (req, res) => {
	try {
		const newStudent = await Student.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
		});
		res.status(201).json(newStudent);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const targetStudent = Student.findByPk(req.params.id);
		targetStudent.firstName = req.body.firstName;
		res.status(200).json(targetStudent);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res) => {
	const deleted = await Student.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(204).json(deleted);
});

module.exports = router;
