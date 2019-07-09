// export const testLogin = (id, pw) => {
//   const requestURL = "https://trainee-api.appspot.com/login";
//   const requestHeader = {
//     "Content-Type": "application/json"
//   };
//   const param = { username: id, password: pw };
//   return fetch(requestURL, {
//     method: "POST",
//     headers: requestHeader,
//     body: JSON.stringify(param)
//   })
//     .then(response => response.json())
//     .then(response => {
//       return response;
//     })
//     .catch(error => {
//       return error;
//     });
// };

export const testLogin = (id, pw) => {
  const API_KEY = "k-3166f58c-2752-5df4-a4cd-6cb2616342bc";
  const requestURL = "https://api.vallaris.space/v2/auth/signin";
  const requestHeader = {
    "Content-Type": "application/json",
    "Client-Service": "frontend-client",
    "Auth-Key": API_KEY
  };
  const param = { email: id, password: pw };
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
