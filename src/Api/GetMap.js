export const getMapServices = (layerName, label, request) => {
  const token = localStorage.getItem("token");
  const requestURL = "https://trainee-api.appspot.com/auth/mapservices";
  const requestHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  };
  const param = { Layername: layerName, Label: label, URL: request };

  return fetch(requestURL, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(param)
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
