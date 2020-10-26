const {Client} = require("pg")
const response = require("express")

class EventoController{
    async index(){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
            client.connect();
            const result = await client.query("SELECT * FROM eventos");
            client.end()
            const results = result.rows
            return results
        }catch(err){
            console.error(err)
            return response.json(err)
        }
    }
    async create(nomeEvento, dataHora, numeroParticipantes){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
    
    const text ="INSERT INTO public.eventos (nomeEvento, dataHora, numeroParticipantes)VALUES($1, $2, $3);"
     const params = [nomeEvento, dataHora, numeroParticipantes];
     client.connect();
     const result = await client.query(text,params);
     client.end();

     const response={
         message:"Evento Adicionado"
     }
     return response;
    }catch(err){
        console.error(err)
        const response = {
            message:"Falha ao adicionar"
        }
     }
    }

    async delete(idEvento){
        try{
            const client = new Client({
                connectionString:process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized:false
                }
            })
            const text = "DELETE FROM public.eventos WHERE idEvento=$1;"
            const params = [idEvento]
            client.connect();
            const result = await client.query(text,params)
            client.end();
            const results = result.rows;

            const response = {
                message:"Contato excluído"
            }
            return response;
    }catch(err){
        console.error(err)
        const response = {
            message:"Falha ao excluir"
        }
        return response;
    }
    }

    /*
    async update
    */
}

module.exports=EventoController


