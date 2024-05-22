# My List API

This is the backend API for the "My List" feature, which allows users to add, remove, and list their favorite movies and TV shows.

## Installation

1. Clone the repository: `git clone https://github.com/Bharadwaj-99/listService/tree/main/my-list-service`
2. Install dependencies: `npm install`
3. Set up the environment variables:
   - `DATABASE_URL`: MongoDB connection URL (default: `mongodb://localhost:27017/my-list-api`)
   - `PORT`: Port to run the server on (default: `3000`)
4. Start the development server: `npm run dev`

## Usage

The API provides the following endpoints:

- `POST /api/mylist`: Add an item to the user's list
- `DELETE /api/mylist/:userId/:contentId`: Remove an item from the user's list
- `GET /api/mylist/:userId?limit=10&offset=0`: List items in the user's list with pagination

## Testing

Run the test suite with: `npm test`

## Building and Deployment

1. Build the project: `npm run build`
2. Start the server: `npm start`

You can deploy the built application to any hosting platform of your choice.
