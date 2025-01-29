import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should say hello', async () => {
    const response = await controller.sayHai('Fahdi', 'Alan');
    expect(response).toBe('Hai Fahdi Alan 👋');
  })

  it('should show view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Fahdi', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Template Engine!',
      name: 'Fahdi',
    })
  })
});
