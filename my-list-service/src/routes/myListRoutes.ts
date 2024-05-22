import { Router } from 'express';
import { MyListController } from '../controllers/myListController';

const router = Router();
const myListController = new MyListController();

router.post('/', myListController.addToMyList);
router.delete('/:userId/:contentId', myListController.removeFromMyList);
router.get('/:userId', myListController.listMyItems);

export default router;