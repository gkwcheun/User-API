declare global {
  namespace Express {
    export interface Request {
      token?: string;
      verifiedUser?: any;
      body?: {
        login?: string;
        password?: string;
      };
    }
  }
}
