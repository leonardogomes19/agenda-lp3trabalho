const { Router } = require('express');
const eventoRouter = Router()
const EventoController = require("../controllers/EventoController");
const eventoController = new EventoController();

eventoRouter.get("/", async (req, res) => {
const items = await eventoController.index();
return res.json(items)
  });
  
    eventoRouter.post("/", async (req, res) => {
  
    const [nomeEvento, dataHora, numeroParticipantes] = req.body;
    
    const resp = await eventoController.create(nomeEvento,dataHora,numeroParticipantes);

    return res.json(resp)
  
  });
  
  //alterar depois
  eventoRouter.patch("/:id", async (req, res) => {
  
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
  
  eventoRouter.delete("/:id", async (req, res) => {
  
    const {id} = req.params
    const items = await eventoController.delete(id)
    return res.json(items)
  
  
  });
  
  module.exports=eventoRouter;