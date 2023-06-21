import { Request } from 'express';

interface PassportUser {
  id: string;
}
export interface ContextualRequest extends Request {
  user: PassportUser;
}
