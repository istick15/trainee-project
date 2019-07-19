//const API_KEY = "k-5f444300-948f-55f1-8581-ae36bc6e20f1";
const API_KEY = "k-2e33c66d-4f30-5ed8-ab3d-dee60bfb989a";
export const DeleteRequest = (layerID, request) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/mapservice/requests";
  const requestHeader = {
    "User-ID": USER_ID,
    Authorization: token,
    "Auth-Key": API_KEY,
    "Client-Service": "frontend-client",
    "Content-Type": "application/json"
  };
  const params = {
    user_id: USER_ID,
    layer_id: layerID,
    request_id: request
  };
  return fetch(requestURL, {
    method: "DELETE",
    headers: requestHeader,
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const getRequest = layer => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/mapservice/requests";
  const requestHeader = {
    "User-ID": USER_ID,
    Authorization: token,
    "Auth-Key": API_KEY,
    "Client-Service": "frontend-client",
    "Content-Type": "application/json"
  };
  return fetch(requestURL, {
    method: "GET",
    headers: requestHeader
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const delelayer = layerID => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");
  console.log(USER_ID);
  const requestURL = "https://api.vallaris.space/v2/mapservice/layers";
  const requestHeader = {
    "User-ID": USER_ID,
    Authorization: token,
    "Auth-Key": API_KEY,
    "Client-Service": "frontend-client",
    "Content-Type": "application/json"
  };
  const parama = {
    layer_id: layerID,
    user_id: USER_ID
  };
  return fetch(requestURL, {
    method: "DELETE",
    headers: requestHeader,
    body: JSON.stringify(parama)
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
