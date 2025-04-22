import axios from "axios"

const baseurl = "/api"

const getAll = () => {
    const request = axios.get(baseurl + "/persons")

    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseurl + "/persons", newObject)

    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(baseurl + `/persons/${id}`)

    return request.then(response => response.data)
}

const update = newObject => {
    const request = axios.put(baseurl + `/persons/${newObject.id}`, newObject)

    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }