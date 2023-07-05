const pg = require("pg");

const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: true
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM public."user";', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM public."user" WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const createUser = (req, res) => {
    const { name, password } = req.body;

    pool.query('INSERT INTO public."user" (name, password) VALUES ($1, $2) RETURNING *', [name, password], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM public."user" WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, password } = req.body;

    pool.query(
        'UPDATE public."user" SET name = $1, password = $2 WHERE id = $3',
        [name, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`);
        }
    )
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    deleteUser,
    updateUser
}