import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home"
import ListContacts from "./pages/Contacts/List"
import ListLocal from "./pages/Locals/List"
import ListContactsTypes from "./pages/ContactsTypes/List"
import ListParticipants from "./pages/Participants/List"

const Routes: React.FC = ()=>{
    return (
        <BrowserRouter> 
            <Route component = {Home} path="/" exact/>
            <Route component = {ListContacts} path="/contacts/list"/>
            <Route component = {ListLocal} path="/locals/list"/>
            <Route component = {ListContactsTypes} path="/contacts-types/list"/>
            <Route component = {ListParticipants} path="/participants/list"/>
           
            </BrowserRouter>
    )

}

export default Routes;