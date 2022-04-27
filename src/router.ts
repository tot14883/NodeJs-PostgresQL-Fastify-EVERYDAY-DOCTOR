import { FastifyInstance } from "fastify";

import indexRoute from "./controllers/index";
import demoRoute from "./controllers/demo";
import testRoute from "./controllers/test";
import userRoute from "./controllers/users";
import schemaRoute from "./controllers/schema"
import customersRoute from "./controllers/customer"
import loginRoute from "./controllers/login"
import uploadRoute from './controllers/upload';

export default async function router(fastify: FastifyInstance) {
  //router prefix
  fastify.register(indexRoute, { prefix: "/" });
  fastify.register(demoRoute, { prefix: "/demo" }); // http://localhost:8080/demo
  fastify.register(testRoute, { prefix: "/test" });
  fastify.register(userRoute, { prefix: "/users"});
  fastify.register(schemaRoute,{ prefix: "/schema" });
  fastify.register(customersRoute,{prefix: "/customers"})
  fastify.register(loginRoute,{prefix: "/login"})
  fastify.register(uploadRoute,{prefix: "/uploads"})
}
