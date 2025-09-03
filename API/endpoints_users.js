const GET = ["programs", "users"];

const ROUTES_GET = [
    "/api/users",
    "/api/users/:id_user",
    "/api/users/:id_user/programs",
    "/api/users/:id_user/programs/:id_program/seasons/:id_season/weeks/:id_week/sessions/:id_session/exercises",
];

const ROUTES_POST = [""];

const ROUTES_DELETE = [""];

export { GET, ROUTES_GET, ROUTES_POST, ROUTES_DELETE };
