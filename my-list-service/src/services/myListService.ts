import { UserList } from '../models/userList';
import { Movie } from '../models/movie';
import { TVShow } from '../models/tvShow';

export class MyListService {
  async addToMyList(userId: string, contentId: string, contentType: 'Movie' | 'TVShow') {
   
    const existingItem = await UserList.findOne({ userId, contentId });
    if (existingItem) {
      throw new Error('Item already exists in the list');
    }

   
    const newItem = new UserList({ userId, contentId, contentType, addedAt: new Date() });
    await newItem.save();

    return { message: 'Item added to the list' };
  }

  async removeFromMyList(userId: string, contentId: string) {
   
    const result = await UserList.deleteOne({ userId, contentId });

    if (result.deletedCount === 0) {
      throw new Error('Item not found in the list');
    }

    return { message: 'Item removed from the list' };
  }

  async listMyItems(userId: string, { limit = 10, offset = 0 }) {
   
    const userListItems = await UserList.find({ userId })
      .skip(offset)
      .limit(limit)
      .sort({ addedAt: -1 })
      .lean();

   
    const itemDetails = await Promise.all(
      userListItems.map(async (item) => {
        if (item.contentType === 'Movie') {
          const movie = await Movie.findById(item.contentId);
          return movie;
        } else {
          const tvShow = await TVShow.findById(item.contentId);
          return tvShow;
        }
      })
    );

    return { items: itemDetails };
  }
}