import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/api/v1/users')
export class UserController {
  @Get()
  getUser() {
    return 'Hello user!';
  }

  // get all Query
  @Get('/hello')
  sayHello(@Query() Query: string): string {
    const queryParsing: any = JSON.parse(JSON.stringify(Query));
    const { first_name, last_name } = queryParsing;
    return `Hello ${first_name} ${last_name} 👋`;
  }

  // get spesific Query
  @Get('/hai')
  sayHai(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return `Hai ${firstName} ${lastName} 👋`;
  }

  // detail response with async
  @Get('/sample-response')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  sampleResponse() {
    return {
      data: {
        user_name: 'johndoe',
        first_name: 'John',
        last_name: 'Doe',
      },
    };
  }

  @Get('/redirect')
  // @Redirect('/api/v1/users/sample-response', 301) // explisit
  // redirect(): void {}

  // dinamis
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/v1/users/sample-response',
      statusCode: 301,
    };
  }

  // set cookies
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie!');
  }

  // generate view
  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine!',
      name: name,
    });
  }
}
