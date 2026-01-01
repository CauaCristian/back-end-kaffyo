import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { dataSource } from "../sources/Data_Source";
import { UserEntity } from "../entities/User_Entity";
import { UserRepository } from "../repositories/User_Repository";
import { TokenService } from "../services/Token_Service";

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {

    const token = req.cookies?.token;
    
    if (!token) {
      throw createHttpError(401, "Token não informado");
    }

    const payload = new TokenService().verifyToken(token);

    if (!payload?.sub) {
      throw createHttpError(401, "Token inválido ou expirado");
    }

    const userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);

    const user = await userRepository.findById(payload.sub);

    if (!user) {
      throw createHttpError(401, "Usuário não encontrado");
    }

    req.user = user;
    next();

  } catch (error) {

    next(error);

  }
};
