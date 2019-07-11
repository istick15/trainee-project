//  const API_KEY = "k-3166f58c-2752-5df4-a4cd-6cb2616342bc";
// // export const Getsite =()=>{
// //   const token = localStorage.getItem("user_token");
// //   const USER_ID = localStorage.getItem("user_id");
// //   const requestURL ="https://api.vallaris.space/v2/sites"
// //   const requestHeader ={
// //     'User-ID': USER_ID,
// //         'Authorization':token,
// //         'Auth-Key':API_KEY,
// //         'Client-Service': 'frontend-client',
// //         'Content-Type': 'application/json'
// //   }
// //   return fetch(requestURL,{
// //     method: "GET",
// //     headers: requestHeader
// //   })
// //   .then(response => response.json())
// //     .then(response => {
// //       return response;
// //     })
// //     .catch(error => {
// //       return error;
// //     });
// // };
// // }

// export const createdataset = (Name, Description) => {
//   const token = localStorage.getItem("user_token");
//   const USER_ID = localStorage.getItem("user_id");
//   const requestURL = "https://api.vallaris.space/v2/datasets";
//   const requestHeader = {
//     "User-ID": USER_ID,
//     "Auth-Key": API_KEY,
//     Authorization: token,
//     "Client-Service": "frontend-client",
//     "Content-Type": "application/json"
//   };
//   const param = {
//     dataset_name: Name,
//     dataset_description: Description,
//     dataset_publish: 0,
//     dataset_style: {
//       some: "json"
//     },
//     group_dataset_id: null,
//     user_id: USER_ID,
//     //site_id:
//   };
//   return fetch(requestURL, {
//     method: "POST",
//     headers: requestHeader,
//     body: JSON.stringify(param),

//   })
//     .then(response => response.json())
//     .then(response => {
//       return response;
//     })
//     .catch(error => {
//       return error;
//     });
// };
const API_KEY = "k-5f444300-948f-55f1-8581-ae36bc6e20f1";

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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
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
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
