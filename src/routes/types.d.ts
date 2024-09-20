import { URIComponent } from "fast-uri";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import serverless from "../../serverless";

type FastifyServer = typeof serverless;

type RouteProps = {
  request?: FastifyRequest;
  reply?: FastifyReply;
  urlData?: URIComponent;
};
