const {Client} = require("pg")
const response = require("express")

class TipoContatoController{
    async index(){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
            client.connect();
            const result = await client.query("SELECT * FROM tipo_contato");
            client.end()
            const results = result.rows
            return results
        }catch(err){
            console.error(err)
            return response.json(err)
        }
    }

    async create(descricao){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
            const text ="INSERT INTO public.tipo_contato (descricao)VALUES($1);"
            const params = [descricao]
            client.connect();
            const result = await client.query(text,params)
            client.end();
            const response ={
                message:"Uma nova categoria de contatos foi adicionada"
            }
            return response;
            }catch(err){
                console.error(err)
                const response = {
                    message:"Falha ao adicionar"
                }
                return response;
            }
        }
    async delete(id){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
        const text = "DELETE FROM public.tipo_contato where idTipoContato = $1"
        const params = [id]
        client.connect();
        const results = await client.query(text,params)
        client.end()
        const response = {
            message:"Categoria de contatos excluída"
        }
        return response;
    }catch(err){
        console.error(err)
        const response ={
            message:"Falha ao excluir"
        }
        return response
    }
    }
}
    

module.exports=TipoContatoController