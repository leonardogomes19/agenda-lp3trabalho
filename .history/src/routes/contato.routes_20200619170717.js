const { Router } = require('express');
const contatoRouter = Router()
const ContatoController = require("../controllers/ContatoController")
const contatoController = new ContatoController()

contatoRouter.get("/", async (req, res) => {

    const items = await contatoController.index()
    res.json(items)
});

contatoRouter.post("/", async (req, res) => {

    const [name, email,telephone,idLocal,idTipoContato] = req.body;

    const resp = await contatoController.create(name,email,telephone,idLocal,idTipoContato)
    return res.json(resp)
});

//alterar depois
    contatoRouter.patch("/:id", async (req, res) => {

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

contatoRouter.delete("/:id", async (req, res) => {
const {id} = req.params;

const items = await contatoController.delete(id)
return res.json(items)

});

module.exports = contatoRouter;