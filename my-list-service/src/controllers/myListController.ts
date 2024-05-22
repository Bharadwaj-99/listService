import { Request, Response } from 'express';
import { MyListService } from '../services/myListService';
import { ErrorResponse } from '../type/errorResponse';

export class MyListController {
  private myListService: MyListService;

  constructor() {
    this.myListService = new MyListService();
  }

  addToMyList = async (req: Request, res: Response) => {
    try {
      const { userId, contentId, contentType } = req.body;
      const result = await this.myListService.addToMyList(userId, contentId, contentType);
      res.status(200).json(result);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = { error: error instanceof Error ? error.message : 'An unknown error occurred' };
      res.status(400).json(errorResponse);
    }
  };

  removeFromMyList = async (req: Request, res: Response) => {
    try {
      const { userId, contentId } = req.params;
      const result = await this.myListService.removeFromMyList(userId, contentId);
      res.status(200).json(result);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = { error: error instanceof Error ? error.message : 'An unknown error occurred' };
      res.status(400).json(errorResponse);
    }
  };

  listMyItems = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query;
      const result = await this.myListService.listMyItems(userId, { });
      res.status(200).json(result);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = { error: error instanceof Error ? error.message : 'An unknown error occurred' };
      res.status(400).json(errorResponse);
    }
  };
}