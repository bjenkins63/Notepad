const axios = require("axios");

class Todo {

    baseUrl = "https://jsonplaceholder.typicode.com/todos";
    // update

    update({ id, ...payload }) {
        return axios.put(`${this.baseUrl}/${id}`, payload).then(({ data }) => data);
    }

    // create

    create(payload) {
        return axios.post(this.baseUrl, payload).then(({ data }) => data);
    }

    // delete

    remove(id) {
        return axios.delete(`${this.baseUrl}/${id}`).then(({ data }) => data);
    }

    // read

    read(id) {
        return axios.get(`${this.baseUrl}/${id}`).then(({ data }) => data);
    }

    list() {
        return axios.get(this.baseUrl).then(({ data }) => data);
    }

}

module.exports = new Todo();