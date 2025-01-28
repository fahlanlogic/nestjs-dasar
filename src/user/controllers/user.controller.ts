import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Query, Redirect } from '@nestjs/common';

@Controller('/api/v1/users')
export class UserController {
  @Get()
  getUser() {
    return 'Hello user!';
  }

  // get all Query
  @Get("/hello")
  sayHello(
    @Query() Query: string
  ): string 
  {
    const queryParsing = JSON.parse(JSON.stringify(Query));
    const { first_name, last_name } = queryParsing;
    return `Hello ${first_name} ${last_name} 👋`
  }

  // get spesific Query
  @Get("/hai")
  sayHai(
    @Query("first_name") firstName: string,
    @Query("last_name") lastName: string
  ): string 
  {
    return `Hai ${firstName} ${lastName} 👋`
  }

  @Get("/sample-response")
  @HttpCode(200)
  @Header("Content-Type", "application/json")
  sampleResponse() {
    return {
      "data" : {
        "user_name": "johndoe",
        "first_name": "John",
        "last_name": "Doe Dong",
      }
    }
  }

  @Get('/redirect')
  // @Redirect('/api/v1/users/sample-response', 301) // explisit
  // redirect(): void {}

  // dinamis
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      'url': '/api/v1/users/sample-response',
      'statusCode': 301
    }
  }
}
