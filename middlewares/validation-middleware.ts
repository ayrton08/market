import type { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

export function validationMiddleware(
  handler: Handler,
  reqValidator?: any,
  bodyValidator?: any
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      if (reqValidator) await reqValidator.validate(req.query);
      if (bodyValidator) await bodyValidator.validate(req.body);
      handler(req, res);
    } catch (error: any) {
      res.status(422).send({ error: true, message: error.message });
    }
  };
}
