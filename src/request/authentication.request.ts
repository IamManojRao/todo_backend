// request/authentication.request.ts
import { Request } from 'express';

export interface AuthenticatedRequest
 extends Request {
  user?: {
    id: string;
  };
  params: {
    userId?: string;
  };
}