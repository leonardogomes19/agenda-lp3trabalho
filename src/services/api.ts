import axios from "axios";

const api = axios.create({
    baseURL:"https://agendaapplp3.herokuapp.com"
})

export default api;