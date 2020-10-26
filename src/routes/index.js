const {Router} = require('express')

const tipoContatoRouter = require ('./tipoContato.routes')
const localRouter = require ('./local.routes')
const eventoRouter = require ('./evento.routes')
const contatoRouter = require('./contato.routes')
const participantesEventoRouter = require('./participantesEvento.routes')
const routes = Router();

routes.use('/tipoContato',tipoContatoRouter);
routes.use('/local',localRouter);
routes.use('/evento',eventoRouter);
routes.use('/contato',contatoRouter);
routes.use('/participantes',participantesEventoRouter);

module.exports=routes;
