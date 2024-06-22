import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserEmail = createParamDecorator((data, ctx: ExecutionContext) => {
  const email = ctx.switchToHttp().getRequest().user;
  return email;
});
