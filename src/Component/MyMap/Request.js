import { pick } from "lodash";
// const API_Key = "k-3166f58c-2752-5df4-a4cd-6cb2616342bc";
// const API_Key = "k-2e33c66d-4f30-5ed8-ab3d-dee60bfb989a";
const API_Key = "k-5f444300-948f-55f1-8581-ae36bc6e20f1";
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
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
    .then((response) => response.json())
    .then((response) => {
      let mapserviceListItem = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          mapserviceListItem = response.data.map((user) =>
            pick(user, [
              "layer_id",
              "layer_label",
              "layer_name",
              "layer_description",
              "service"
            ])
          );
        } else {
          if (Object.keys(response.data).length > 0) {
            mapserviceListItem.push(
              pick(response.data, [
                "layer_id",
                "layer_label",
                "layer_name",
                "layer_description",
                "service"
              ])
            );
          }
        }
      }

      return mapserviceListItem;
      // return response;
    })
    .catch((error) => {
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
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
    .then((response) => response.json())
    .then((response) => {
      let mapserviceListItem = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          mapserviceListItem = response.data.map((user) =>
            pick(user, [
              "layer_id",
              "layer_label",
              "layer_name",
              "layer_description",
              "service"
            ])
          );
        } else {
          if (Object.keys(response.data).length > 0) {
            mapserviceListItem.push(
              pick(response.data, [
                "layer_id",
                "layer_label",
                "layer_name",
                "layer_description",
                "service"
              ])
            );
          }
        }
      }

      return mapserviceListItem;
      return response;
    })
    .catch((error) => {
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const DeleteLayers = (layerID) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/mapservice/layers";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "frontend-client"
  };
  const params = {
    layer_id: layerID,
    user_id: USER_ID
  };
  return fetch(requestURL, {
    method: "DELETE",
    headers: requestHeader,
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const DeleteRequest = (layerID, request) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/mapservice/layers";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "frontend-client"
  };
  const params = {
    layer_id: layerID,
    user_id: USER_ID,
    request_id: request
  };
  return fetch(requestURL, {
    method: "DELETE",
    headers: requestHeader,
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const GetSite = () => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL =
    "https://api.vallaris.space/v2/sites?creator_user_id=" + USER_ID;
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const GetDataset = (site) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL =
    "https://api.vallaris.space/v2/datasets?site_id=" +
    site +
    "&user_id=" +
    USER_ID;
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const CreateFeature = (geojson, site, dataset) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/features";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "vallaris-backend"
  };

  const params = {
    dataset_id: dataset,
    user_id: USER_ID,
    site_id: site,
    features: geojson
  };
  return fetch(requestURL, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(params),
    json: true
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const CreateTile = (site, dataset) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/gp/tile/create";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "vallaris-backend"
  };

  const params = {
    dataset_id: dataset,
    user_id: USER_ID,
    site_id: site
  };
  return fetch(requestURL, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(params),
    json: true
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getFeature = (site, dataset) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL =
    "https://api.vallaris.space/v2/features?user_id=" +
    USER_ID +
    "&site_id=" +
    site +
    "&dataset_id=" +
    dataset;
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
      dataset_id: dataset,
      user_id: USER_ID,
      site_id: site
    }
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getFeatureByID = (site, dataset, feature) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL =
    "https://api.vallaris.space/v2/features?user_id=" +
    USER_ID +
    "&site_id=" +
    site +
    "&dataset_id=" +
    dataset +
    "&feature_id=" +
    feature;
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const DeleteFeature = (site, dataset, feature) => {
  const token = localStorage.getItem("user_token");
  const USER_ID = localStorage.getItem("user_id");

  const requestURL = "https://api.vallaris.space/v2/features";
  const requestHeader = {
    "User-ID": USER_ID,
    "Content-Type": "application/json",
    Authorization: token,
    "Auth-Key": API_Key,
    "Client-Service": "frontend-client"
  };

  const params = {
    dataset_id: dataset,
    user_id: USER_ID,
    site_id: site,
    features: [feature]
  };

  return fetch(requestURL, {
    method: "DELETE",
    headers: requestHeader,
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
