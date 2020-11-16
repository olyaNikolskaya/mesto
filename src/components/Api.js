export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: "GET",
            headers: this.headers, 
        }).then((res) => {
            return this._getResponseData(res)
        })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            method: "GET",
            headers: this.headers 
        })
        .then((res) => {
            return this._getResponseData(res)
        })
    }

    editUserInfo({name, about}) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((res) => {
            return this._getResponseData(res)
        })
    }

    setLike(cardId) {
        return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then((res) => {
            return this._getResponseData(res)
        })
        .then((data) => {
            return data.likes.length
        })
    }

    addCard({name, image}) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: image, 
            })
        })
        .then((res) => {
            return this._getResponseData(res)
        })
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then((res)=> {
            return this._getResponseData(res)
        })
    }

    removeLike(cardId) {
        return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then((res) => {
            return this._getResponseData(res)
        })
        .then((data) => {
            return data.likes.length
        })
    }

    updateAvatar({avatar}) {
        return fetch(this._baseUrl + `/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then((res) => {
            return this._getResponseData(res)
        })
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}