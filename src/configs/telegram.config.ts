import { ConfigService } from '@nestjs/config';
import { TELEGRAM_TOKEN_IS_NOT_DEFINED } from 'src/telegram/telegram.constants';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get<string>('TELEGRAM_TOKEN');
  const chatId = configService.get<string>('TELEGRAM_CHAT_ID') ?? '';
  console.log('token: ', token);
  console.log('chatId: ', chatId);
  if (!token) throw new Error(TELEGRAM_TOKEN_IS_NOT_DEFINED);
  return {
    token,
    chatId,
  };
};
