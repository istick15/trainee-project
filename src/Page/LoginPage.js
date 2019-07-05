import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
const LoginPage = () => {
  const { history } = useReactRouter();
  const goToBackend = () => {
    history.push("/Backend");
  };
  return (
    <div>
      <TextField label="username" />
      <TextField label="password" />
      <Button onClick={goToBackend}>Logidffffn</Button>
    </div>
  );
};

export default LoginPage;
