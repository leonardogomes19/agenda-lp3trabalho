const { Router } = require('express');
const tipoContatoRouter = Router()
const TipoContatoController = require("../controllers/TipoContatoController")
const tipoContatoController = new TipoContatoController();

tipoContatoRouter.get("/", async (req, res) => {

    const items = await tipoContatoController.index();
    return res.json(items)  
  });
  
    tipoContatoRouter.post("/", async (req, res) => {
  const [descricao] = req.body;

  const resp = await tipoContatoController.create(descricao)
  return res.json(resp)
  
  });
  
  //alterar depois
  tipoContatoRouter.patch("/:id", async (req, res) => {
  
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
  
  tipoContatoRouter.delete("/:id", async (req, res) => {
  
    const {id}= req.params
    const items = await tipoContatoController.delete(id)
    return res.json(items)
    
    
  
  
  });
  
  module.exports=tipoContatoRouter;