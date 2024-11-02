// types/custom-request.d.ts
import { Request } from 'express';

declare module 'express' {
    interface Request {
        user?: {
            userId: number;
        };
    }
}
