import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageDto } from './dto/top-page.dto';
import { TopPageModel } from './top-page.model/top-page.model';

@Injectable()
export class TopPageService {
  @InjectRepository(TopPageModel)
  private readonly topPageRepository: Repository<TopPageModel>;

  async create(topPageDto: TopPageDto) {
    const topPage = this.topPageRepository.create(topPageDto);
    return this.topPageRepository.save(topPage);
  }

  async getById(id: number) {
    return this.topPageRepository.findOne({ where: { id } });
  }

  async removeById(id: number) {
    const topPage = await this.getById(id);
    if (!topPage) {
      throw new NotFoundException('TopPage not found');
    } else {
      return this.topPageRepository.delete({ id });
    }
  }

  async updateTopPage(id: number, topPageDto: TopPageDto) {
    const topPage = await this.getById(id);
    if (!topPage) {
      throw new NotFoundException('TopPage not found');
    } else {
      return this.topPageRepository.update({ id }, topPageDto);
    }
  }

  async getByCategory(category: string) {
    return this.topPageRepository.findOne({ where: { category: category } });
  }

  async findTopPageByCategory(findTopPageDto: FindTopPageDto) {
    return this.topPageRepository.find({
      where: { ...findTopPageDto },
    });
  }

  // todo implement method that finds a top-page by part of the tag text
  // review (ex. "tags" will find "string tags")
  // idea implement method that finds a top-page by part of the tag text
  // fixme implement method that finds a top-page by part of the tag text
  // implement method that finds a top-page by part of the tag text sdfd
  async findByTagText(tagText: string): Promise<TopPageModel[]> {
    return this.topPageRepository
      .createQueryBuilder('topPage')
      .where(':tagText = ANY (topPage.tags)', { tagText })
      .getMany();
  }
}
