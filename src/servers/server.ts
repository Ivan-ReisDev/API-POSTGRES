import fastify from "fastify";
import dotenv from 'dotenv';
import { appRoutes } from "../routes/router";
import fastifyCors from '@fastify/cors';

dotenv.config();

const port: number = 8080;

const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: "*",
});

app.register(appRoutes);

app.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server online no endereço ${address}`);
});
