import { Request, Response, NextFunction } from 'express';

const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send({ status: "Unauthorized" });
  }
};

export default checkAuthentication;
