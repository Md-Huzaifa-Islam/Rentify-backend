import app from "./app";
import { envVars } from "./config/envVars";

const port = envVars.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
