# BuzzAPI

BuzzAPI is a simple JavaScript API for interacting with BuzzHeavier's folder management system. It lets you create, retrieve, and delete folders easily.

## Author

Created by [Its3rr0rsWRLD](https://github.com/Its3rr0rsWRLD).

## Features

- **Create Folder**: Create new folders on BuzzHeavier.
- **Get Folders**: Retrieve a list of your folders with names and IDs.
- **Delete Folder**: Delete folders by specifying their ID.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Its3rr0rsWRLD/BuzzAPI.git
cd BuzzAPI
npm install
```

## Setup

Create a `.env` file in the root directory and add your session cookie:

```env
API_KEY=your_api_key
```

## Usage

Run the test script to interact with the API:

```bash
node test.js
```

You'll be prompted to select an action:

1. Create Folder
2. Get Folders
3. Delete Folder

Follow the prompts to test each functionality.

## API Endpoints

- **Create Folder**: `POST /api/buzzheavier/folder/create`
- **Get Folders**: `GET /api/buzzheavier/getFolders`
- **Delete Folder**: `DELETE /api/buzzheavier/folder/delete`

## Contributing

Feel free to open issues or submit pull requests. Any help is appreciated!

## License

This project is open-source and available under the MIT License.