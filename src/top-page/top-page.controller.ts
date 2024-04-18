import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {TopPageModel} from "./top-page.model/top-page.model";
import {FindTopPageDto} from "./dto/find-top-page.dto";

@Controller('top-page')
export class TopPageController {


    @Post('create')
    async create(@Body() productDto: Omit<TopPageModel, 'id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string){

    }

    @Delete('delete/:id')
    async delete(@Param('id') id:string){

    }

    @Patch('update/:id')
    async patch(@Param('id') id:string, @Body() productModel: TopPageModel){

    }

    @Post(':id')
    @HttpCode(200)
    async find(@Body() findDto: FindTopPageDto){

    }
}
