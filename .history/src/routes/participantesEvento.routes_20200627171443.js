const {Router} = require("express")
const ParticipantesEventoController = require("../controllers/ParticipantesEventoController")
const participantesEventoRouter = Router();
const participantesEventoController = new ParticipantesEventoController();


participantesEventoRouter.get("/", async (req,res)=>{
    const items = await participantesEventoController.index();
    return res.json(items)
})
participantesEventoRouter.post("/",async(req,res)=>{
    const [idEvento,idContato,confirmacao]= req.body;

    const resp = await participantesEventoController.create(
        idEvento,idContato,confirmacao
    );
    return res.json(resp)
})

participantesEventoRouter.delete("/:idEvento/:idContato",async(req,res)=>{
    const {idEvento,idContato} = req.params

    const items = await participantesEventoController.delete(idEvento,idContato)
    return res.json(items)
}) sadds

module.exports = participantesEventoRouter;