import Express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const GET = ["programs", "users"];

const ROUTES_GET = ["/api/users/:id_user/programs/:id_program/seasons/:id_season/weeks/:id_week/sessions/:id_session/exercises", "/api/users/:id_user", "/api/users"];

const ROUTES_POST = [""];

const ROUTES_DELETE = [""];

//Configuration de l'api
const express = Express();
express.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//Query à utiliser pour les GET
const query = (route) => {
    express.get(`/${route}`, (req, res) => {
        db.all(`SELECT * FROM ${route}`, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    });
};

//==============================
// BDD
//==============================

const db = new sqlite3.Database(`API/bdd2.db`, (err) => {
    if (err) console.error("Erreur de connexion à la BDD");
    else console.log("Connecté à la  BDD");
});

//-------------------------------
//fin BDD
//-------------------------------

//========================================================================
// Documentation API
//========================================================================

express.get(`/`, (req, res) => {
    const tmpDoc = {
        ROUTES_GET,
        ROUTES_POST,
        ROUTES_DELETE,
    };
    return res.status(200).json(tmpDoc);
});
//------------------------------
//fin doc
//------------------------------

//========================================================================
// Routes GET
//========================================================================

//Select All
GET.forEach((route) => {
    query(route);
});

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

export default express;
