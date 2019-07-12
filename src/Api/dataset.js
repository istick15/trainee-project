const API_KEY = "k-2e33c66d-4f30-5ed8-ab3d-dee60bfb989a";

//Parn
//const API_KEY = "k-5f444300-948f-55f1-8581-ae36bc6e20f1";
//
export const DeleteDataset = (site, dataset) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");
  const requestURL = "https://api.vallaris.space/v2/datasets";
  const requestHeader = {
    "User-ID": USER_ID,
    Authorization: token,
    "Auth-Key": API_KEY,
    "Client-Service": "frontend-client",
    "Content-Type": "application/json"
  };
  const params = {
    dataset_id: dataset,
    user_id: USER_ID,
    site_id: site
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

export const createdataset = (Name, Description, site) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");
  const requestURL = "https://api.vallaris.space/v2/datasets";
  const requestHeader = {
    "User-ID": USER_ID,
    "Auth-Key": API_KEY,
    Authorization: token,
    "Client-Service": "frontend-client",
    "Content-Type": "application/json"
  };
  const param = {
    dataset_name: Name,
    dataset_description: Description,
    dataset_publish: 0,
    dataset_style: {
      some: "json"
    },
    group_dataset_id: null,
    user_id: USER_ID,
    site_id: site
  };
  return fetch(requestURL, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(param)
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
