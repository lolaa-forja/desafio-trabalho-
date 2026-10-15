import { Request, Response, NextFunction } from "express";

export function apenasAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.usuario?.papel !== "ADMIN") {
    return res.status(403).json({ erro: "Acesso permitido apenas para administradores" });
  }
  return next();
}

export function adminOuProprio(req: Request, res: Response, next: NextFunction) {
  const ehAdmin = req.usuario?.papel === "ADMIN";
  const ehProprio = req.usuario?.id === req.params.id;

  if (!ehAdmin && !ehProprio) {
    return res.status(403).json({ erro: "Você só pode acessar os seus próprios dados" });
  }
  return next();
}