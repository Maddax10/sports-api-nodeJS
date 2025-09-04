// import sqlite3 from "sqlite3";
// import { Connect_DB } from "./connectDB.js";
// const connectDB = new Connect_DB().instance;
// const express = connectDB.getExpress();

// >>>>>>>> origin/RUD-users:API/crud.js
// //Query à utiliser pour les GET
// const query = (route) => {
//     express.get(`/${route}`, (req, res) => {
//         db.all(`SELECT * FROM ${route}`, [], (err, rows) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.json(rows);
//         });
//     });
// };

// //==============================
// // BDD
// //==============================

// const db = new sqlite3.Database(`API/bdd.db`, (err) => {
//     if (err) console.error("Erreur de connexion à la BDD");
//     else console.log("Connecté à la BDD");
// });

// //-------------------------------
// //fin BDD
// //-------------------------------

// //------------------------------
// //fin doc
// //------------------------------

// //========================================================================
// // Routes GET
// //========================================================================

// //Select de  tous les exercices d'un user
// express.get("/users/:id_user", (req, res) => {
//     const { id_user } = req.params;

//     db.all(`SELECT * FROM users WHERE _id_user = ?`, [id_user], (err, rows) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(rows);
//     });
// });
// // //Select de  tous les exercices d'un user
// // express.get("/users/:id_user/programs", (req, res) => {
// //     const { id_user } = req.params;
// //     db.all(
// //         `
// //         SELECT p.*
// //         FROM users u
// //         JOIN programs p ON p.id_user_program = u._id_user
// //         WHERE u._id_user = ?

// <<<<<<<< HEAD:API/sportsController.js
// //           `,
// //         [id_user],
// //         (err, rows) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.json(rows);
// //         }
// //     );
// // });
// ========
//           `,
//         [id_user],
//         (err, rows) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json(rows);
//         }
//     );
// });
// // import sqlite3 from "sqlite3";
// // import { Connect_DB } from "./connectDB.js";
// >>>>>>>> origin/RUD-users:API/crud.js
// =======
// // import sqlite3 from "sqlite3";
// // import { Connect_DB } from "./connectDB.js";
// >>>>>>> origin/RUD-users

// // const connectDB = new Connect_DB().instance;
// // const express = connectDB.getExpress();

// // //Query à utiliser pour les GET
// // const query = (route) => {
// //     express.get(`/${route}`, (req, res) => {
// //         db.all(`SELECT * FROM ${route}`, [], (err, rows) => {
// //             if (err) {
// //                 return res.status(500).json({ error: err.message });
// //             }
// //             res.json(rows);
// //         });
// //     });
// // };

// // //==============================
// // // BDD
// // //==============================

// // const db = new sqlite3.Database(`API/bdd.db`, (err) => {
// //     if (err) console.error("Erreur de connexion à la BDD");
// //     else console.log("Connecté à la BDD");
// // });

// // //-------------------------------
// // //fin BDD
// // //-------------------------------

// // //------------------------------
// // //fin doc
// // //------------------------------

// // //========================================================================
// // // Routes GET
// // //========================================================================

// // //Select de  tous les exercices d'un user
// // express.get("/users/:id_user", (req, res) => {
// //     const { id_user } = req.params;

// //     db.all(`SELECT * FROM users WHERE _id_user = ?`, [id_user], (err, rows) => {
// //         if (err) return res.status(500).json({ error: err.message });
// //         res.json(rows);
// //     });
// // });
// // // //Select de  tous les exercices d'un user
// // // express.get("/users/:id_user/programs", (req, res) => {
// // //     const { id_user } = req.params;
// // //     db.all(
// // //         `
// // //         SELECT p.*
// // //         FROM users u
// // //         JOIN programs p ON p.id_user_program = u._id_user
// // //         WHERE u._id_user = ?

// // //           `,
// // //         [id_user],
// // //         (err, rows) => {
// // //             if (err) return res.status(500).json({ error: err.message });
// // //             res.json(rows);
// // //         }
// // //     );
// // // });

// // //Select All
// // GET.forEach((route) => {
// //     query(route);
// // });

// // //========================================================================
// // // Routes CREATE
// // //========================================================================

// // //Ajouter une formation
// // express.post(`/formations`, (req, res) => {
// //     // Exemple générique, à adapter selon la structure de chaque table
// //     const keys = Object.keys(req.body);
// //     const values = Object.values(req.body);
// //     db.run(`INSERT INTO formations (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`, values, function (err) {
// //         if (err) return res.status(500).json({ error: err.message });
// //         res.status(201).json({ id: this.lastID, ...req.body });
// //     });
// // });

// // //========================================================================
// // // Routes DELETE
// // //========================================================================

// // express.delete("/formations/:id", (req, res) => {
// //     const id = req.params.id;
// //     db.run(`DELETE FROM formations WHERE id_formation = ${id}`, function (err) {
// //         if (err) return res.status(500).json({ error: err.message });
// //         res.status(200).json({ deleted: this.changes });
// //     });
// // });

// // //---------------------------
// // // FIN Routes DELETE
// // //---------------------------

// // export default express;
