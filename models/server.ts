import express, { Application } from 'express';
import cors from 'cors';
import postRoutes from '../routes/post';
class Server {
  private app: Application;
  private port: string;
  private postRoutesPath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';
    this.postRoutesPath = '/api/post';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.postRoutesPath, postRoutes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('Server running in ' + this.port);
    });
  }
}

export default Server;
