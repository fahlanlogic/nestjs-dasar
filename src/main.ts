import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';

const dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser(process.env.COOKIE_PASSWORD)); // set cookie

  // set view
  app.set('view engine', 'html');
  app.set('views', __dirname + '/../views');
  app.engine('html', mustache());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
