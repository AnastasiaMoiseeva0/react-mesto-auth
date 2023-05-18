export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    } else {
      throw new Error();
    }
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
};