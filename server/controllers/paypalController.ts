import { Request, Response } from "../types/express";

const fetchPaypalClientId = (req: Request, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
};

export { fetchPaypalClientId };
