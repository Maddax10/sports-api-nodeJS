import Express from "express";
import cors from "cors";
import { GET, ROUTES_GET, ROUTES_POST, ROUTES_DELETE } from "./endpoints_users.js";
/**
 * Classe qui permet d'initialiser le serveur API, la documentation pour les users et les sports
 */
export class Connect_DB {
    static instance;
    #express;
    constructor() {
        this.singleton();
        this.init_connexion();
        this.setup_users_docs();
    }
    /**
     * Le principe est d'avoir une seule instance de notre objet express
     */
    singleton() {
        //Si notre instance est vide, alors on lui attribut l'instance de la classe
        if (!this.instance) {
            this.instance = this;
        }
        //On retourne l'instance
        return this.instance;
    }
    /**
     * Initialise la connexion à la BDD
     */
    init_connexion() {
        //Configuration de l'api
        this.#express = Express();

        try {
            this.#express.use(
                cors({
                    origin: "*",
                    methods: ["GET", "POST", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"],
                })
            );
            console.log("Instance connectDB create ✅");
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Initialise la documentation de l'API pour l'user
     */
    setup_users_docs() {
        this.#express.get(`/docs`, (req, res) => {
            const tmpDoc = {
                ROUTES_GET,
                ROUTES_POST,
                ROUTES_DELETE,
            };
            return res.status(200).json(tmpDoc);
        });

        console.log("Initialisation user docs ✅");
    }

    getExpress() {
        return this.#express;
    }
}
