import request from "./utils";
export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return request(`${BASE_URL}/signup`,  {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
};

export const authorize = (password, email) => {
  return request(`${BASE_URL}/signin`,  {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((data) => {
    if (data?.token) {
      localStorage.setItem("jwt", data.token);
      return data;
    } else {
      throw new Error();
    }
  })
};

export const getCurrentUser = () => {
    return request(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
  } 