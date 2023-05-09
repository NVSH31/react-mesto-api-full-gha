class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include', // отправляем куки
      headers: this._headers
    });
  }

  getMe() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include', // отправляем куки
      headers: this._headers
    });
  }

  editMe(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include', // отправляем куки
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }
  addCard(name, link) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include', // отправляем куки
      headers: this._headers,
      body: JSON.stringify({name, link})
    });
  }
  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include', // отправляем куки
      headers: this._headers
    });
  }
  addLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include', // отправляем куки
      headers: this._headers
    });
  }
  deleteLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include', // отправляем куки
      headers: this._headers
    });
  }
  editAvatar(url) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include', // отправляем куки
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    });
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  baseUrl: 'https://api.shpaknv15.frontend.nomoredomains.monster',
  headers: {
    'authorization': '2c81cee7-0b96-4411-b571-732e2b2c6fdf',
    'Content-Type': 'application/json',
  }
});

export default api;
