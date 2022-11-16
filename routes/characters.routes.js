const express = require("express");
const router = express.Router();

const characterApi = require("../services/character-service");
const characterService = new characterApi();

// Characters list
router.get("/characters", (req, res) => {
	characterService
		.listCharacters()
		.then((characters) => res.render("characters/list-characters", { characters }))
		.catch((err) => console.log(err));
});

// Create new character
router.get("/characters/create", (req, res, next) => {
	res.render("characters/create-characters");
});

router.post("/characters/create", (req, res) => {
	const { name, occupation, debt, weapon } = req.body;

	characterService
		.createCharacter({ name, occupation, debt, weapon })
		.then(() => res.redirect("/characters"))
		.catch((err) => console.log(err));
});

// Character details
router.get("/characters/:id", (req, res) => {
	const { id: character_id } = req.params;

	characterService
		.getCharacterDetails(character_id)
		.then((character) => {
			res.render("characters/details-characters", { character });
		})
		.catch((err) => console.log(err));
});

// Character delete
router.get("/characters/:id/delete", (req, res, next) => {
	const { id: character_id } = req.params;

	characterService
		.deleteCharacter(character_id)
		.then(() => res.redirect("/characters"))
		.catch((err) => next(err));
});

// Character edit
router.get("/characters/:id/edit", (req, res, next) => {
	const { id: character_id } = req.params;

	characterService
		.getCharacterDetails(character_id)
		.then((details) => {
			res.render("characters/edit-characters", details);
		})
		.catch((err) => next(err));
});

router.post("/characters/:id/edit", (req, res, next) => {
	const { id: character_id } = req.params;

	const { name, occupation, debt, weapon } = req.body;

	characterService
		.editCharacter(character_id, { name, occupation, debt, weapon })
		.then(() => res.redirect(`/characters/${character_id}`))
		.catch((err) => next(err));
});

module.exports = router;
