import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { DurakRoom } from "./rooms/durakRoom";

const port = Number(process.env.PORT || 8000);
const app = express()

app.use((req, res, next) => { next(); }, cors({maxAge: 84600}));
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define('durak', DurakRoom);


app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)
