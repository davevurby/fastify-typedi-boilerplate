import fastify, { FastifyInstance } from 'fastify';
import { PingService } from '../services/ping.service';
import Container from 'typedi';
import { validate } from 'class-validator';
import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';
import { PingQuery } from './queries/ping.query';
import { BadRequestException } from './exceptions/bad-request.exception';
import { Logger } from 'pino';

const fastifyValidate = async <T extends object, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions,
) => {
  const errors = await validate(plainToClass(cls, plain, options));

  if (errors.length > 0) {
    throw new BadRequestException(errors.map((error) => Object.values(error.constraints)).flat());
  }
};

export const createRouter = (logger: Logger): FastifyInstance => {
  const app = fastify({ logger });

  app.setErrorHandler(function (error, request, reply) {
    this.log.error(error);
    const message = error.message.includes('|---|') ? error.message.split('|---|') : error.message;
    reply.status(error.statusCode).send({ statusCode: error.statusCode, message });
  });

  app.get('/ping', async (req, reply) => {
    await fastifyValidate(PingQuery, req.query);
    const response = await Container.get(PingService).ping();
    reply.send(response);
  });

  return app;
};
