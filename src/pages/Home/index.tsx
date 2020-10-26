import React from "react";
import {Link} from "react-router-dom"

import {IoMdContact, IoMdContacts} from "react-icons/io"
import {MdPlace, MdEvent} from "react-icons/md"
import {RiContactsLine} from "react-icons/ri"


const Home: React.FC =()=>{
    return( 
        <div id="page-create-point">
           <form>
               <h1>Bem vindo a nossa agenda</h1>
               <br />
               <br />
               <br />
 
               <ul className="items-grid">
                   <Link to="/contacts/list">
                    <li>
                    <IoMdContact size={80} color='#6C6C80'/>
                    <span>Contatos</span>
                   </li>
                   </Link>

                    <Link to ="/locals/list">
                   <li>
                    <MdPlace size={80} color='#6C6C80'/>
                    <span>Locais</span>
                   </li>
                   </Link>
                   <Link to='/events/list'>
                   <li>
                    <MdEvent size={80} color='#6C6C80'/>
                    <span>Eventos</span>
                   </li>
                   </Link>
                   <Link to="/contacts-types/list">
                   <li>
                    <RiContactsLine size={80} color='#6C6C80'/>
                    <span>Tipos de contato</span>
                   </li>
                   </Link>
                   <Link to="/participants/list">
                   <li>
                    <IoMdContacts size={80} color='#6C6C80'/>
                    <span>Participantes de Eventos</span>
                   </li>
                   </Link>
                  

               </ul>
           </form>
        </div>
    )
}

export default Home;