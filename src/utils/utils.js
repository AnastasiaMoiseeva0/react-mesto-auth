export default function request(url, options) {
    return fetch(url, options).then(getResponseData);
}


function getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }