import React, { useState, useEffect, FormEvent } from 'react'
import api from '../../../services/api';
import Modal from 'react-modal'


interface LocalsProps {
    bairro: string,
    cep: string,
    cidade: string,
    complemento: string,
    endereco: string,
    idLocal: number,
    numero: number,
    estado: string
}
const ListLocal: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [locals, setLocals] = useState<LocalsProps[]>([]);
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState(0);
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');
    const [modalIsOpen,setModalIsOpen]=useState(false)


    async function getLocals() {
        const response = await api.get<LocalsProps[]>('/local');
        setLocals(response.data);
        setLoading(false);
    }

    async function deleteLocal(e: FormEvent, id: number) {
        e.preventDefault();
        const response = await api.delete(`/local/${id}`)
        if (response.data.message === "Local Excluido") {
            alert(`Localidade excluída`);
            window.location.reload(true);
        } else {
            alert("Erro ao excluir")
        }
    }
    async function insertLocal(e: FormEvent) {
        e.preventDefault();
        const response = await api.post('/local', { bairro, cep, cidade, complemento, endereco, numero, estado })
        if (response.data.message === "Local Adicionado") {
            alert(`Local Adicionado`);
            window.location.reload(true);
        } else {
            alert('Erro ao adicionar')
        }
    }

    async function update(e:FormEvent,id:number){
        e.preventDefault();
        const response = await api.patch(`/local/${id}`,{bairro,cep,cidade,complemento,endereco,numero,estado})
        if(response.data.message==="editado"){
            alert("local editado")
            window.location.reload(true)
        }else{
            alert("erro")
        }
    }
    function openModal(e:FormEvent){
        e.preventDefault();
        const teste = setModalIsOpen(true);
        return teste;
    }

    useEffect(() => {
        getLocals()
    }, []);


    return (
        <div id='page-create-point'>
            <form>
                <h1>Locais</h1>
                {
                    !loading ? (
                        <fieldset>
                            {locals.length > 0 ? (
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Rua</th>
                                            <th>Numero</th>
                                            <th>Bairro</th>
                                            <th>Complemento</th>
                                            <th>Cep</th>
                                            <th>Estado</th>
                                            <th>idLocal</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        {locals.map((local) => (
                                            <tr key={local.idLocal}>
                                                <td>{local.endereco}</td>
                                                <td>{local.numero}</td>
                                                <td>{local.bairro}</td>
                                                <td>{local.complemento}</td>
                                                <td>{local.cep}</td>
                                                <td>{local.estado}</td>
                                                <td>{local.idLocal}</td>
                                                <td><button onClick={(e) => deleteLocal(e, local.idLocal)}>Apagar</button></td>
                                                <td><button onClick={(e)=> openModal(e)}>Editar</button>
                                                <Modal isOpen={modalIsOpen}>
                                                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="EnderecoAtualizar">Rua</label>
                        <input onChange={(text) => setEndereco(text.currentTarget.value)} type="text" name="endereco" id="endereco"></input>
                    </div>
                    <div className="field">
                        <label htmlFor="numero">Numero</label>
                        <input onChange={(text) => setNumero(Number(text.currentTarget.value))} type="text" name="numero" id="numero"></input>
                    </div>
                </div>
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="bairro">Bairro</label>
                        <input onChange={(text) => setBairro(text.currentTarget.value)} type="text" name="bairro" id="bairro"></input>
                    </div>
                    <div className="field">
                        <label htmlFor="cep">Cep</label>
                        <input onChange={(text) => setCep(text.currentTarget.value)} type="text" name="cep" id="cep"></input>
                    </div>
                </div>
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="complemento">Complemento</label>
                        <input onChange={(text) => setComplemento(text.currentTarget.value)} type="text" name="complemento" id="complemento"></input>
                    </div>
                    <div className="field">
                        <label htmlFor="cidade">Cidade</label>
                        <input onChange={(text) => setCidade(text.currentTarget.value)} type="text" name="complemento" id="complemento"></input>
                    </div>
                </div>
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="estado">Estado</label>
                        <input onChange={(text) => setEstado(text.currentTarget.value)} type="text" name="estado" id="estado"></input>
                    </div>
                </div>
                <button onClick={() => setModalIsOpen(false)}>fechar</button>
                <button onClick={(e) => update(e, local.idLocal)}>Salvar</button>
                                                </Modal>
                                                
                                                
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (<p>A lista não possui locais adicionados</p>)}
                        </fieldset>) : (<div>
                            <br />
                            <br />
                            <p>Carregando</p>
                        </div>
                        )
                }
                <br />
                <br />
                <br />
                <h2>Cadastrar</h2>
                <br />
                <br />
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="Endereco">Rua</label>
                        <input onChange={(text) => setEndereco(text.currentTarget.value)} type="text" name="endereco" id="endereco"></input>
                    </div>
                    <div className="field">
                        <label htmlFor="numero">Numero</label>
                        <input onChange={(text) => setNumero(Number(text.currentTarget.value))} type="text" name="numero" id="numero"></input>
                    </div>
                </div>
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="bairro">Bairro</label>
                        <input onChange={(text) => setBairro(text.currentTarget.value)} type="text" name="bairro" id="bairro"></input>
                    </div>
                    <div className="field">
                        <label htmlFor="cep">Cep</label>
                        <input onChange={(text) => setCep(text.currentTarget.value)} type="text" name="cep" id="cep"></input>
                    </div>
                </div>
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="complemento">Complemento</label>
                        <input onChange={(text) => setComplemento(text.currentTarget.value)} type="text" name="complemento" id="complemento"></input>
                    </div>
                    <div className="field">
                        <label htmlFor="cidade">Cidade</label>
                        <input onChange={(text) => setCidade(text.currentTarget.value)} type="text" name="complemento" id="complemento"></input>
                    </div>
                </div>
                <div className='field-group'>
                    <div className="field">
                        <label htmlFor="estado">Estado</label>
                        <input onChange={(text) => setEstado(text.currentTarget.value)} type="text" name="estado" id="estado"></input>
                    </div>
                </div>
                <button onClick={(e) => insertLocal(e)}>Cadastrar</button>
            </form>
        </div>
    )

}



export default ListLocal;