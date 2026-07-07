import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validateRequest(schema: ZodType<any, any, any>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Safely assign validated body back to req
      req.body = parsed.body;

      // Safely redefine read-only query and params properties using defineProperty
      Object.defineProperty(req, "query", {
        value: parsed.query,
        writable: true,
        configurable: true,
      });

      Object.defineProperty(req, "params", {
        value: parsed.params,
        writable: true,
        configurable: true,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
}
