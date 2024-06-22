import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageDto } from './dto/top-page.dto';
import { TopPageModel } from './top-page.model/top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() topPageDto: TopPageDto): Promise<TopPageModel> {
    return await this.topPageService.create(topPageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id', IdValidationPipe) id: number) {
    return await this.topPageService.removeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async patch(
    @Param('id', IdValidationPipe) id: number,
    @Body() topPageDto: TopPageDto,
  ) {
    return await this.topPageService.updateTopPage(id, topPageDto);
  }

  @Post(':id')
  @HttpCode(200)
  async find(@Body() findTopPageDto: FindTopPageDto) {
    return await this.topPageService.findTopPageByCategory(findTopPageDto);
  }

  @Get('/category/:category')
  async getByCategory(
    @Param('category') category: string,
  ): Promise<TopPageModel> {
    return await this.topPageService.getByCategory(category);
  }

  @Get('/search/:text')
  async getByTagText(@Param('text') text: string): Promise<TopPageModel[]> {
    return await this.topPageService.findByTagText(text);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: number): Promise<TopPageModel> {
    return await this.topPageService.getById(id);
  }
}
