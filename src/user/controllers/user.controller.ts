import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1/users')
export class UserController {
  @Get()
  getUser() {
    return 'Hello user!';
  }
}
