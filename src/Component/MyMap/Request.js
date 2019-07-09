const API_Key = "k-3166f58c-2752-5df4-a4cd-6cb2616342bc";
export const getMapLayers = () => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");
  const requestURL =
    "https://api.vallaris.space/v2/mapservice/layers?user_id=" + USER_ID;
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "frontend-client"
  };

  return fetch(requestURL, {
    method: "GET",
    headers: requestHeader,
    qs: {
      user_id: USER_ID
    }
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const AddMapLayers = (layername, label, description) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/mapservice/layers";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "vallaris-backend"
  };
  const params = {
    layer_name: layername,
    layer_label: label,
    layer_description: description,
    user_id: USER_ID
  };
  return fetch(requestURL, {
    method: "POST",
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

export const AddRequest = (request, layerid) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/mapservice/requests";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "vallaris-backend"
  };
  const params = {
    layer_id: layerid,
    service_name: "WMS",
    service_version: "1.3.0",
    request_type: "GET_MAP",
    request_url: request,
    user_id: USER_ID
  };
  return fetch(requestURL, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(params),
    json: true
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const GetDisplay = () => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL =
    "https://api.vallaris.space/v2/mapservice/display?user_id=" + USER_ID;
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "frontend-client"
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

export const SignOut = () => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/auth/signout";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "frontend-client"
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
