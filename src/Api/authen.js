export const testLogin = (id, pw) => {
  const requestURL = "https://trainee-api.appspot.com/login";
  const requestHeader = {
    "Content-Type": "application/json"
  };
  const param = { username: id, password: pw };
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
