import axios from 'axios'
const baseurl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseurl).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseurl, newPerson).then(response => response.data)
}

const erase = (id) => {
    return axios.delete(`${baseurl}/${id}`)
}

const update = (id, changedPerson) => {
    return axios.put(`${baseurl}/${id}`, changedPerson)
}

export default {getAll, create, erase, update}