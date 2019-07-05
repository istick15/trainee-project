const link = "https://trainee-api.appspot.com/";
export const getMapLayers = () => {
  const token = localStorage.getItem("token");
  const requestURL = link + "auth/mapservices";
  const requestHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  };

  return fetch(
    requestURL,
    {
      method: "GET",
      headers: requestHeader
    },
    { credentials: "include" }
  )
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const AddMapLayers = (layername, request) => {
  const token = localStorage.getItem("token");
  const requestURL = link + "auth/mapservices";
  const requestHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  };
  const params = {
    LayerName: layername,
    Label: layername,
    Request: request
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
