import sqlite3 from "sqlite3";
import { Connect_DB } from "../connectDB.js";
const endpoint = "users_EP";

const ROUTES_GET = [
	{ "/users_EP/:_id_user": "get one user" },
	{ "/users_EP/users": "get all users" },
	{ "/users_EP/login/:username_user/:password_user": "login" },
	{
		"/users_EP/register/": {
			username_user: "test",
			password_user: "test",
			mail_user: "test@gmail.com",
			firstname_user: "test",
			name_user: "test",
			url_img_user: null,
		},
	},
	// "/users/:id_user/programs",
	// "/users/:id_user/programs/:id_program/seasons/:id_season/weeks/:id_week/sessions/:id_session/exercises",
];

const ROUTES_POST = [""];

const ROUTES_DELETE = [""];

const connectDB = new Connect_DB().instance;
const express = connectDB.getExpress();

//==============================
// BDD
//==============================

const db = new sqlite3.Database(`bdd.db`, (err) => {
	if (err) console.error("Erreur de connexion à la BDD");
	else console.log("Connecté à la BDD");
});

//-------------------------------
//fin BDD
//-------------------------------

//------------------------------
//fin doc
//------------------------------

//========================================================================
// Routes GET
//========================================================================
/**
 * Select de tous les users
 */
express.get("/users", (req, res) => {
	db.all(`SELECT * FROM users `, [], (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
});
/**
 * Select d'un user via son id
 */
express.get("/:_id_user", (req, res) => {
	const { _id_user } = req.params;

	db.all(`SELECT * FROM users WHERE _id_user = ?`, [_id_user], (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
});

/**
 * login avec username et password
 */
express.get("/login/:username_user/:password_user", (req, res) => {
	const { username_user } = req.params;
	const { password_user } = req.params;

	db.get(`SELECT * FROM users WHERE username_user = ? AND password_user = ?`, [username_user, password_user], (err, row) => {
		if (err) return res.status(500).json({ error: err.message });
		res.status(200).json(row);
	});
});

/**
 * Renvoit les infos de l'utilisateur si le login est bon
 */
// express.get("/login/:username_user/:password_user", (req, res) => {
//     const { username_user } = req.params;
//     const { password_user } = req.params;

//     db.all(`SELECT * FROM users WHERE username_user = ? AND password_user = ?`, [username_user, password_user], (err, rows) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(rows);
//     });
// });

//========================================================================
// Routes CREATE
//========================================================================

//Ajouter un user
express.post(`/register`, (req, res) => {
	const keys = Object.keys(req.body);
	// console.log("keys", keys);
	const values = Object.values(req.body);
	// console.log("values", values);
	// console.log(
	// 	'keys.map(() => "?").join(",")',
	// 	keys.map(() => "?")
	// );
	db.run(
		`INSERT INTO users (${keys.join(",")}) 
		VALUES (${keys.map(() => "?").join(",")})`,
		values,
		function (err) {
			if (err) return res.status(500).json({ error: err.message });
			res.status(201).json({ id: this.lastID, ...req.body });
		}
	);
});
//========================================================================
// Routes UPDATE/PUT
//========================================================================

//========================================================================
// Routes DELETE
//========================================================================

express.delete("/formations/:id", (req, res) => {
	const id = req.params.id;
	db.run(`DELETE FROM formations WHERE id_formation = ${id}`, function (err) {
		if (err) return res.status(500).json({ error: err.message });
		res.status(200).json({ deleted: this.changes });
	});
});

//---------------------------
// FIN Routes DELETE
//---------------------------
/**
 * Documentation de l'api
 */
express.get(`/`, (req, res) => {
	const tmpDoc = {
		ROUTES_GET,
		ROUTES_POST,
		ROUTES_DELETE,
	};
	return res.status(200).json(tmpDoc);
});
export default express;
