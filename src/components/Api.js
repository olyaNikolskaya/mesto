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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          });
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            method: "GET",
            headers: this.headers 
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          });
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          })
    }

    setLike(cardId) {
        return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data.likes.length
        })
        .catch((err) => {
            console.log(err);
          });
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          })
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then((res)=> {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          })
    }

    removeLike(cardId) {
        return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data.likes.length
        })
        .catch((err) => {
            console.log(err);
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          })
    }
}