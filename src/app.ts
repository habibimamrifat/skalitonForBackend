import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouts } from './app/students/studet.rout';
import globalErrorhandeler from './app/middleware/globalErrorHandeler';
import routNotFoiund from './app/middleware/routNotFound';
import authRouts from './app/auth/auth.rout';

const app: Application = express();

// persers
app.use(express.json());
app.use(cors());

// application Routes
app.use("/api/v1/students",StudentRouts)
app.use("/api/v1/auth/",authRouts)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World everyone yoo black!');
  // Promise.reject()
});



app.use(globalErrorhandeler)
app.use(routNotFoiund)

export default app;
