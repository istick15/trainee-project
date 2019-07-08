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
  const API_KEY = "k-2e33c66d-4f30-5ed8-ab3d-dee60bfb989a";
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
