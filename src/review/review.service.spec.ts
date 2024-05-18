import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';

const mockReviewRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: jest.Mocked<Repository<ReviewModel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(ReviewModel),
          useFactory: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repository = module.get<Repository<ReviewModel>>(
      getRepositoryToken(ReviewModel),
    ) as jest.Mocked<Repository<ReviewModel>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a review', async () => {
      const createReviewDto = {
        content: 'Great product!',
        rating: 5,
        product: { id: 1 },
        createdAt: new Date(),
      } as any;
      const savedReview = { id: 1, ...createReviewDto };

      repository.create.mockReturnValue(createReviewDto);
      repository.save.mockResolvedValue(savedReview);

      const result = await service.create(createReviewDto);

      expect(repository.create).toHaveBeenCalledWith(createReviewDto);
      expect(repository.save).toHaveBeenCalledWith(createReviewDto);
      expect(result).toEqual(savedReview);
    });
  });

  describe('get', () => {
    it('should return a review by id', async () => {
      const review = {
        id: 1,
        title: 'reviewTitle',
        content: 'test',
        author: 'Andrii Boiadzhi',
        description: 'description',
        rating: 5,
        product: { id: 1 } as any,
        createdAt: new Date(),
      };
      repository.find.mockResolvedValue([review]);

      const result = await service.get({ id: 1 });

      expect(repository.find).toHaveBeenCalledWith({
        where: { id: 1 },
        take: 1,
      });
      expect(result).toEqual([review]);
    });
  });

  describe('getByProductId', () => {
    it('should return reviews by product id', async () => {
      const reviews = [
        {
          id: 1,
          title: 'reviewTitle',
          content: 'Great product!',
          author: 'Andrii Boiadzhi',
          description: 'description',
          rating: 5,
          product: { id: 1 } as any,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'reviewTitle',
          content: 'Not bad',
          author: 'Andrii Boiadzhi',
          description: 'description',
          rating: 4,
          product: { id: 1 } as any,
          createdAt: new Date(),
        },
      ];
      repository.find.mockResolvedValue(reviews);

      const result = await service.getByProductId(1);

      expect(repository.find).toHaveBeenCalledWith({
        where: { product: { id: 1 } },
      });
      expect(result).toEqual(reviews);
    });
  });

  describe('getAll', () => {
    it('should return all reviews', async () => {
      const reviews = [
        {
          id: 1,
          title: 'reviewTitle',
          content: 'Great product!',
          author: 'Andrii Boiadzhi',
          description: 'description',
          rating: 5,
          product: { id: 1 } as any,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'reviewTitle',
          content: 'Not bad',
          author: 'Andrii Boiadzhi',
          description: 'description',
          rating: 4,
          product: { id: 1 } as any,
          createdAt: new Date(),
        },
      ];
      repository.find.mockResolvedValue(reviews);

      const result = await service.getAll();

      expect(repository.find).toHaveBeenCalledWith({ take: 100 });
      expect(result).toEqual(reviews);
    });
  });

  describe('delete', () => {
    it('should delete a review by id', async () => {
      const review = {
        id: 1,
        title: 'reviewTitle',
        content: 'Great product!',
        author: 'Andrii Boiadzhi',
        description: 'description',
        rating: 5,
        product: { id: 1 } as any,
        createdAt: new Date(),
      };
      repository.find.mockResolvedValue([review]);
      repository.remove.mockResolvedValue(review);

      const result = await service.delete({ id: 1 });

      expect(repository.find).toHaveBeenCalledWith({
        where: { id: 1 },
        take: 1,
      });
      expect(repository.remove).toHaveBeenCalledWith([review]);
      expect(result).toEqual(review);
    });
  });

  describe('deleteByProduct', () => {
    it('should delete reviews by product id', async () => {
      const reviews = [
        {
          id: 1,
          title: 'reviewTitle',
          content: 'Great product!',
          author: 'Andrii Boiadzhi',
          description: 'description',
          rating: 5,
          product: { id: 1 } as any,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'reviewTitle',
          content: 'Not bad',
          author: 'Andrii Boiadzhi',
          description: 'description',
          rating: 4,
          product: { id: 1 } as any,
          createdAt: new Date(),
        },
      ];
      repository.find.mockResolvedValue(reviews);
      repository.remove.mockResolvedValue(reviews[0]);

      const result = await service.deleteByProduct(1);

      expect(repository.find).toHaveBeenCalledWith({
        where: { product: { id: 1 } },
      });
      expect(repository.remove).toHaveBeenCalledWith(reviews);
      expect(result).toEqual(reviews[0]);
    });
  });
});
