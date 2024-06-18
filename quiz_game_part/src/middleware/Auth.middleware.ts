import { Injectable, NestMiddleware } from "@nestjs/common";
import { FirebaseService } from "src/shared/services/firebase.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly _firebaseService: FirebaseService
  ) {  }

  use(req: any, res: any, next: (error?: any) => void): any {
    const token: string = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      const idToken = token.split('Bearer ')[1];
      this._firebaseService.verifyToken(idToken)
          .then((decodedToken) => {
            req.user = decodedToken;
            next();
          })
          .catch((error) => {
            res.status(401).json({ message: 'Unauthorized', error: error.message });
          });
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  }
}
