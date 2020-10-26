import React, { useState, useEffect, FormEvent } from 'react'
import ReactDOM from "react-dom";
import Modal from 'react-modal'
import api from '../../../services/api'
import { Link } from "react-router-dom"

interface ContactsProps {
    idContato: number;
    nome: string;
    email: string;
    telefone: string;
    idlocal: number;
    idTipoContato: number;
};


const ListContacts: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState<ContactsProps[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idTipoContato, setIdTipoContato] = useState(0);
    const [idLocal, setLocal] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [idContato, setContato] = useState('')



    async function getContacts() {
        const response = await api.get<ContactsProps[]>("/contatos");
        setContacts(response.data);
        setLoading(false);
    }


    async function insertContact(e: FormEvent) {
        e.preventDefault();

        const response = await api.post('/contatos', { nome, email, telefone, idLocal, idTipoContato })
        if (response.data.message === "Contato Adicionado") {
            alert(`Contato adicionado: ${nome}`);
            window.location.reload(true);
        } else {
            alert(('Erro ao adicionar'))
        }
    }//sadsa
    async function updateContact(e: FormEvent, id: number) {
        e.preventDefault();
        const response = await api.patch(`/contatos/${id}`, { nome, email, telefone, idLocal, idTipoContato })
        if (response.data.message === "adicionado") {
            alert("Contato editado")
            window.location.reload(true);
        } else {
            alert("Erro ao editar")
        }

    }


    async function deleteContact(e: FormEvent, id: number, nome: string) {
        e.preventDefault();
        const response = await api.delete(`/contatos/${id}`)
        if (response.data.message === "excluido") {
            alert(`Contato excluído :${nome}`);
            window.location.reload(true);

        } else {
            alert("Erro ao excluir contato")
        }
    }
    function openModal(e: FormEvent) {
        e.preventDefault();
        const teste = setModalIsOpen(true);
        return teste;
    }

    function getId() {

    }

    useEffect(() => {
        getContacts()
    }, []);

    return (
        <div className='Navbar' fixed-top>
            <div className='lettersRight'>
                <nav>
                    <ul>
                        <Link to="/">   HOME    </Link>
                        <Link to="/contacts/list">   CONTATOS    </Link>
                        <Link to="/locals/list">   LOCAIS  </Link>
                        <Link to="/events/list">   EVENTOS </Link>
                        <Link to="/contacts-types/list">   TIPOSCONTATO    </Link>
                        <Link to="/participants/list">   PARTICIPANTEEVENTOS   </Link>
                    </ul>
                </nav>
            </div>

            <div id='page-create-point'>
                <form>
                    <h1>Lista de Contatos</h1>
                </form> 
                <form>   
                    {
                        !loading ? (
                            <fieldset>
                                {contacts.length > 0 ? (<table>
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Telefone</th>
                                            <th>ID TipoContato</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        {contacts.map((contact) => (
                                            <tr key={contact.idContato}>
                                                <td>{contact.idContato}</td>
                                                <td>{contact.nome}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.telefone}</td>
                                                <td>{contact.idTipoContato}</td>
                                                <td><button onClick={(e) => deleteContact(e, contact.idContato, contact.nome)}>Apagar</button></td>
                                                <td><button onClick={(e) => openModal(e)} >Editar</button>

                                                    <Modal isOpen={modalIsOpen}>
                                                        <h2>Atualizar</h2>
                                                        {console.log()}
                                                        <div className="field-group">
                                                            <div className="field">
                                                                <label htmlFor="NomeAtualizar">Nome</label>
                                                                <input onChange={(text) => setNome(text.currentTarget.value)} type="text" />
                                                                <label htmlFor="emailAtualizar">Email</label>
                                                                <input onChange={(text) => setEmail(text.currentTarget.value)} type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="field-group">
                                                            <div className="field">
                                                                <label htmlFor="TelefoneAtualizar">Telefone</label>
                                                                <input onChange={(text) => setTelefone(text.currentTarget.value)} type="text" />
                                                                <label htmlFor="localAtualizar">Local</label>
                                                                <input onChange={(text) => setLocal(Number(text.currentTarget.value))} type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="field-group">
                                                            <div className="field">
                                                                <label htmlFor="tipoContato">TipoContato</label>
                                                                <input onChange={(text) => setIdTipoContato(Number(text.currentTarget.value))} type="text" /><br />

                                                            </div>
                                                        </div>

                                                        <button onClick={() => setModalIsOpen(false)}>fechar</button>
                                                        <button onClick={(e) => updateContact(e, contact.idContato)}>Salvar</button>


                                                    </Modal> </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>) : (<p>A agenda não possui nenhum contato adcionado</p>)}
                            </fieldset>
                        ) : (<div>
                            <br />
                            <br />
                            <p>Carregando....</p>
                        </div>
                            )}
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>Cadastrar</h2>
                    <br />
                    <br />
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="Nome">Nome</label>
                            <input onChange={(text) => setNome(text.currentTarget.value)} type="text" name="nome" id="nome" />
                        </div>
                        <div className="field">
                            <label htmlFor="Email">Email</label>
                            <input onChange={(text) => setEmail(text.currentTarget.value)} type="text" name="email" id="email" />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="Telefone">Telefone</label>
                            <input onChange={(text) => setTelefone(text.currentTarget.value)} type="text" name="Telefone" id="Telefone" />
                        </div>
                        <div className="field">
                            <label htmlFor="tipocotato">Tipo contato</label>
                            <input onChange={(text) => setIdTipoContato(Number(text.currentTarget.value))} type="text" name="idtipocontato" id="idtipocontato" />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="local">Local</label>
                            <input onChange={(text) => setLocal(Number(text.currentTarget.value))} type="text" name="idlocal" id="idlocal" />
                        </div>
                    </div>
                    <div className="bottonCadastrar">
                    <button onClick={(e) => insertContact(e)}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ListContacts;