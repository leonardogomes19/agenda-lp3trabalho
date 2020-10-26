const {Client} = require('pg');
const { response } = require('express');

class ContatoController {
    async index(){
        try{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized :false,
                }
            });
            client.connect();
            const result = await client.query("SELECT * FROM contatos");
            client.end()
            const results = result.rows
            return results
        }catch(err){
            console.error(err)
            return response.json(err)
        }
    }

    async create(name, email, telephone, idLocal, idTipoContato){
        try{
            const client = new client({
                connectionString:process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized:false
                }
            })
            const text = "INSERT INTO public.contatos (nome, email, telefone, idLocal, idTipoContato)VALUES($1,$2,$3,$4,$5);"
            const params = [name,email,telephone,idLocal, idTipoContato]
            client.connect();
            const result = await client.query(text,params);
            client.end();
            const results = result.rows;
            const response={
                message:"Contato Adicionado"
            };
            return response;
        }catch(err){
            console.error(err)
            const response={
                message:"Falha ao adicionar"
            }
        return response;
        }
    }

    async delete(idContato){
        try{
            const client = new client({
                connectionString:process.env.DATABASE_URL,
                ssl:{
                    rejectUnauthorized:false
                }
            })
         
            const text = "DELETE FROM public.contatos WHERE idContato =$1;"
            const params = [idContato]
            client.connect();
            const results = await client.query(text,params)
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

/*async update (id){
    try{
        const client = new client({
            connectionString:process.env.DATABASE_URL,
            ssl:{
                rejectUnauthorized:false
            }
        }) 

    const text = "UPDATE public.contato SET nome='', email='', telefone=0, idLocal=0, idTipoContato=0 WHERE "idContato"=nextval('"Contatos_idContato_seq"'::regclass);
    "
}
*/
}

module.exports=ContatoController