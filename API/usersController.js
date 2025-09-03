import sqlite3 from "sqlite3";
import { Connect_DB } from "./connectDB.js";
const endpoint = "users_EP";

const ROUTES_GET = [
    `/${endpoint}/:_id_user`,
    `/${endpoint}/users`,
    `/${endpoint}/login`,
    `/${endpoint}/login/connect/:_id_user`,
    `/${endpoint}/login/disconnect/:_id_user`,
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

const db = new sqlite3.Database(`API/bdd2.db`, (err) => {
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
 * Renvoit les infos de l'utilisateur si le login est bon
 */
express.get("/login/:username_user/:password_user", (req, res) => {
    const { username_user } = req.params;
    const { password_user } = req.params;

    db.all(`SELECT * FROM users WHERE username_user = ? AND password_user = ?`, [username_user, password_user], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// //Select de  tous les exercices d'un user
// express.get("/users/:id_user/programs", (req, res) => {
//     const { id_user } = req.params;
//     db.all(
//         `
//         SELECT p.*
//         FROM users u
//         JOIN programs p ON p.id_user_program = u._id_user
//         WHERE u._id_user = ?

//           `,
//         [id_user],
//         (err, rows) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json(rows);
//         }
//     );
// });

//========================================================================
// Routes CREATE
//========================================================================

//Ajouter une formation
express.post(`/formations`, (req, res) => {
    // Exemple générique, à adapter selon la structure de chaque table
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    db.run(`INSERT INTO formations (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});
//========================================================================
// Routes UPDATE/PUT
//========================================================================
//connect
express.put("/login/connect/:_id_user", (req, res) => {
    const { _id_user } = req.params;
    // Construction dynamique de la requête SQL
    db.run(`UPDATE users SET _connected_user = 1 WHERE _id_user = ?`, [_id_user], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        db.get(`SELECT * FROM users WHERE _id_user = ?`, [_id_user], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(row);
        });
    });
});
//disconnect
express.put("/login/disconnect/:_id_user", (req, res) => {
    const { _id_user } = req.params;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // Construction dynamique de la requête SQL
    db.run(`UPDATE users SET _connected_user = 0 WHERE _id_user = ?`, [...values, _id_user], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ updated: this.changes });
    });
});

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
