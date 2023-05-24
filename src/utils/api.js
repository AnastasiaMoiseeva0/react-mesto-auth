import request from "./utils";

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return request(`${this._baseUrl}/cards`,  {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return request(`${this._baseUrl}/users/me`,  {
      headers: this._headers,
    });
  }

  createCards(cardData) {
    return request(`${this._baseUrl}/cards`,  {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    });
  }

  setUserInfo(userInfo) {
    return request(`${this._baseUrl}/users/me`,  {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    });
  }

  deleteCard(id) {
    return request(`${this._baseUrl}/cards/${id}`,  {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return request(`${this._baseUrl}/cards/${id}/likes`,  {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }
  
  setNewAvatar(avatarInfo) {
    return request(`${this._baseUrl}/users/me/avatar`,  {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatarInfo),
    });
  }

}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "110366df-b38b-45be-88c4-715aacdd3349",
    "Content-Type": "application/json",
  },
});

export default api;