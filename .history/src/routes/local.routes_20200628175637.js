const { Router } = require('express');
const LocalController = require("../controllers/LocalController")

const localRouter = Router()
const local = new LocalController()

localRouter.get("/", async (req, res) => {

    const items = await local.index();
    return res.json(items)

});

localRouter.post("/", async (req, res) => {

    const [bairro,cep,cidade,complemento,numero,estado]= req.body;
    const resp = await local.create(bairro,cep,cidade,complemento,numero,estado)
    return res.json(json)


});


//alterar depois
    localRouter.patch("/:id", async (req, res) => {

    const { id } = req.params;
    const { descricao } = req.body;

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        const text = "UPDATE tipo_contato SET descricao = $1 WHERE id = $2";
        const parametros = [descricao, id];

        const client = await pool.connect();
        const result = await client.query(text, parametros);
        const results = result.rows;
        client.end();
        return res.json({ results });

    } catch (err) {

        console.error(err);
        return res.json(err);

    }


});

localRouter.delete("/:id", async (req, res) => {
     const {id} = req.params
     const items = await local.delete(id)
     return res.json(items)


});

module.exports = localRouter;