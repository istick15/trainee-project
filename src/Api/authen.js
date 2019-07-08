export const testLogin = (id, pw) => {
  const API_Key = "k-3166f58c-2752-5df4-a4cd-6cb2616342bc";
  const requestURL = "https://api.vallaris.space/v2/auth/signin";
  const requestHeader = {
    "Auth-key": API_Key,
    "Client-Service": "frontend-client",
    "Content-Type": "application/json"
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
