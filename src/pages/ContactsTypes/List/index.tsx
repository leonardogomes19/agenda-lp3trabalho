import React, { useState, useEffect, FormEvent } from 'react'
import api from '../../../services/api'
import Modal from 'react-modal'


interface ContactsTypesProps {
    idTipoContato: number,
    descricao: string
}

const ListContactsTypes: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [contactsTypes, setContactsType] = useState<ContactsTypesProps[]>([]);
    const [descricao, setDescricao] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false)

    async function getTypesContacts() {
        const response = await api.get<ContactsTypesProps[]>("/tipoContato")
        setContactsType(response.data);
        setLoading(false);
    }

    async function deleteType(e: FormEvent, id: number, descricao: string) {
        e.preventDefault();
        const response = await api.delete(`/tipocontato/${id}`)
        if (response.data.message === "Categoria de contatos excluída") {
            alert(`O tipo ${descricao} foi excluido`)
            window.location.reload(true);
        } else {
            alert("Erro ao excluir")
        }
    }
    async function updateType(e: FormEvent, id: number) {
        e.preventDefault();
        const response = await api.patch(`/tipocontato/${id}`, { descricao })
        if (response.data.message === "editado") {
            alert("Tipo de Contato editado")
            window.location.reload(true);
        } else {
            alert("Erro ao editar")
        }

    }

    async function insertType(e: FormEvent) {
        e.preventDefault();

        const response = await api.post('/tipocontato', { descricao })
        if (response.data.message === "Uma nova categoria de contatos foi adicionada") {
            alert("Uma nova categoria foi adicionada")
            window.location.reload(true)
        } else {
            alert("Erro ao adicionar");
        }
    }

    function openModal(e: FormEvent) {
        e.preventDefault();
        const teste = setModalIsOpen(true);
        return teste;
    }



    useEffect(() => {
        getTypesContacts()
    }, []);

    return (
        <div id="page-create-point">
            <form>
                <h1>Tipos de Contato</h1>
                {
                    !loading ? (<fieldset>
                        {contactsTypes.length > 0 ? (<table>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Descrição</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {contactsTypes.map((type) => (
                                    <tr key={type.idTipoContato}>
                                        <td>{type.idTipoContato}</td>
                                        <td>{type.descricao}</td>
                                        <td><button onClick={(e) => deleteType(e, type.idTipoContato, type.descricao)}>Apagar </button></td>
                                        <td><button onClick={(e) => openModal(e)}>editar</button>
                                            <Modal isOpen={modalIsOpen}>
                                            <div className="field-group">
                                                        <div className="field">
                                                            <label htmlFor="descricao">Descrição</label>
                                                            <input onChange={(text) => setDescricao(text.currentTarget.value)} type="text" />
                                                            </div>
                                                    </div>
                                                    <button onClick={() => setModalIsOpen(false)}>fechar</button>
                                                    <button onClick={(e) => updateType(e, type.idTipoContato)}>Salvar</button>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>) : (<p>A agenda não possui nenhum tipo de contato adicionado</p>)}
                    </fieldset>) : (<div>
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
                        <label htmlFor="descricao">Descrição</label>
                        <input onChange={(text) => setDescricao(text.currentTarget.value)} type="text" name="descricao" id="descricao" />
                    </div>
                    <button onClick={(e) => insertType(e)}>Cadastrar</button>

                </div>
            </form>
        </div>
    )
}



export default ListContactsTypes;