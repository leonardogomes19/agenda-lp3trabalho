const { Client } = require("pg")
const response = require("express")

class ParticipantesEventoController {
    async index() {
        try {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                }
            });
            client.connect();
            const result = await client.query("SELECT * FROM participantes_evento;")
            client.end();
            const results = result.rows
            return results;
        } catch (err) {
            console.error(err)
            return response.json(err)
        }
    }
    async create(idEvento, idContato, confirmacao) {
        try {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                }
            });

            const text = "INSERT INTO public.participantes_evento(idEvento,idContato,confirmacao)VALUES($1,$2,$3);"
            const params = [idEvento, idContato, confirmacao]
            client.connect();
            const result = await client.query(text, params);
            client.end();
            const results = result.rows
            const response = {
                message: "Participantes Adicionado"
            }
            return response;
        } catch (err) {
            console.error(err)
            const response = {
                message: "Falha ao adicionar"
            }
        }
    }
    async delete(idEvento,idContato){
        try{
            const client = new client({
                connectionString:process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized:false
                }
            })
            const text = "DELETE FROM public.participantes_evento where idEvento=$1 AND idContato = $2;"
            const params = [idEvento,idContato]
            client.connect();
            const result = await client.query(text,params)
            client.end();
            const response = {
                message:"Participante excluído"
            }
            return response;
        }catch(err){
            console.error(err)
            const response ={
                message:"Falha ao excluir"
            }
            return response;
        }
}
        /*
    async update()
        */
}

module.exports = ParticipantesEventoController