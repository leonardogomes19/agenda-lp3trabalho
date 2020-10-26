const {Client} = require("pg");
const response = require("express")

class LocalController{
    async index(){
            try{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl:{
                        rejectUnauthorized :false,
                    }
                });
                client.connect();
                const result = await client.query("SELECT * FROM local");
                client.end()
                const results = result.rows
                return results
            }catch(err){
                console.error(err)
                return response.json(err)
            }
        }

    async create(bairro, cep, cidade, complemento,endereco,numero,estado){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
            const text = "INSERT INTO public.local(bairro, cep, cidade, complemento, endereco, numero, estado)VALUES($1, $2, $3, $4, $5, $6, $7);"
            const params = [bairro, cep, cidade, complemento,endereco,numero,estado]
            client.connect();
            const result = await client.query(text,params);
            client.end()
            const results = result.rows
            const response = {
                message: "Local Adicionado"
            }
            return response;
        }catch(err){
            console.error(err)
            const response={
                message:"Falha ao adicionar"
            }
            return response
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
        const text = "DELETE from public.local where idLocal=$1"
        const params = [id]
        client.connect();
        const results = await client.query(text,params)
        client.end();
        const results = result.rows;
        const response ={
            message:"Local Excluido"
        }
        return response;
    }catch(err){
        console.error(err)
        const response={
            message:"Falha ao excluir"
        }
        return response;
    }
    }

    /*  
    async update
    */
}

module.exports=LocalController
