import app from "./app";
import { PORT_SERVER } from "./config";

const port = PORT_SERVER;
const server = app.listen(port);

server.on("listening", () => console.log(`Server running on port ${port}.`));
