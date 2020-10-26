import React, { useState, useEffect, FormEvent } from 'react'
import api from '../../../services/api'

interface ParticipantsProps {
    confirmacao: number,
    idEvento: number,
    idContato: number,
}
const ListParticipants: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState<ParticipantsProps[]>([]);

    
    

    async function getParticipants() {
        const response = await api.get<ParticipantsProps[]>("/participantes")
        setParticipants(response.data);
        setLoading(false);
    }

    useEffect(() => {
        getParticipants()
    }, [])
    return (
        <div id="page-create-point">
            <form>
                <h1>Contatos no evento</h1>
                {
                    !loading ? (<fieldset>
                        {participants.length > 0 ? (<table>
                            <tbody>
                                <tr>
                                    <th>Evento</th>
                                    <th>Contato</th>
                                    <th>Confirmou?</th>
                                    <th></th>
                                </tr>
                                {participants.map((participant) => (
                                    <tr key={participant.idEvento}>
                                        <td>{participant.idEvento}</td>
                                        <td>{participant.idContato}</td>
                                        <td>{participant.confirmacao}</td>
                                        <td><button></button></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>) : (<p>Nenhum contato</p>)}
                    </fieldset>) : (<div><br />
                        <br />
                        <br />
                        <p>Carregando..</p>
                    </div>)
                }
            </form>
        </div>
    )
}


export default ListParticipants
