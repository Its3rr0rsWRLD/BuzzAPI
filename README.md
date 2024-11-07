# BuzzAPI

BuzzAPI is a JavaScript API that simplifies folder management on BuzzHeavier. With BuzzAPI, you can seamlessly create, retrieve, and delete folders directly from your application or script. This README provides full usage details, examples, response structures, and troubleshooting tips.

## Author

Created by [Its3rr0rsWRLD](https://github.com/Its3rr0rsWRLD).

---

## Features

- **Create Folder**: Quickly create a new folder on BuzzHeavier with a specified name.
- **Get Folders**: Retrieve a list of your existing folders, including names and IDs.
- **Delete Folder**: Delete folders by specifying either folder ID or name.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Its3rr0rsWRLD/BuzzAPI.git
cd BuzzAPI
npm install
```

### Prerequisites

Ensure you have:
- **Node.js** installed for running and testing the API locally.
- **API Key (Session Cookie)**: Required for authenticated access to BuzzHeavier’s API.

## Setup

1. Create a `.env` file in the root directory and add your session cookie in the following format:

   ```env
   API_KEY=your_api_key
   ```

2. Verify that your API key (session cookie) has permissions for folder creation, retrieval, and deletion.

## Usage

To interact with BuzzAPI, use the `test.js` script, which prompts you to select an action:

```bash
node test.js
```

The script will guide you to:

1. **Create Folder**: Enter a folder name to create a new folder.
2. **Get Folders**: Retrieve a list of your folders.
3. **Delete Folder**: Delete a folder by specifying either its name or ID.

---

## API Endpoints

Here’s a detailed guide to each API endpoint, including example requests, response structures, and error handling.

### 1. Create Folder

#### `POST https://buzz.3rr0r.lol/api/buzzheavier/folder/create`

This endpoint allows you to create a new folder on BuzzHeavier by specifying a folder name.

**Example Request with `curl`:**

```bash
curl -X POST https://buzz.3rr0r.lol/api/buzzheavier/folder/create \
  -H "Content-Type: application/json" \
  -H "Cookie: session=YOUR_API_KEY" \
  -d '{"name": "New Folder"}'
```

**Expected Success Response (201 Created):**

```json
{
  "message": "Folder created successfully.",
  "data": {
    "id": "GbgGV7OwoAA",
    "name": "New Folder",
    "createdAt": "2024-11-03T16:49:57Z"
  }
}
```

- **`id`**: Unique identifier for the folder.
- **`name`**: Name of the newly created folder.
- **`createdAt`**: Timestamp of when the folder was created.

**Error Responses:**

- **400 Bad Request**: Missing or invalid data (e.g., empty folder name).
  
  ```json
  {
    "error": "Folder name is required."
  }
  ```

- **401 Unauthorized**: Invalid or missing session cookie.
  
  ```json
  {
    "error": "Authentication required."
  }
  ```

- **500 Internal Server Error**: Unexpected error during creation.
  
  ```json
  {
    "error": "Failed to create folder."
  }
  ```

### 2. Get Folders

#### `GET https://buzz.3rr0r.lol/api/buzzheavier/getFolders`

This endpoint retrieves a list of all folders associated with your account, including folder IDs, names, and creation dates.

**Example Request with `curl`:**

```bash
curl -X GET https://buzz.3rr0r.lol/api/buzzheavier/getFolders \
  -H "Cookie: session=YOUR_API_KEY"
```

**Expected Success Response (200 OK):**

```json
{
  "folders": [
    {
      "id": "GajgOmgMEAA",
      "name": "Other",
      "createdAt": "2024-10-22T23:26:13Z"
    },
    {
      "id": "GYsgBUfOgAA",
      "name": "SteamDL",
      "createdAt": "2024-09-30T03:50:30Z"
    },
    {
      "id": "GbgGV7OwoAA",
      "name": "New Folder",
      "createdAt": "2024-11-03T16:49:57Z"
    }
  ]
}
```

- **`id`**: Unique identifier for the folder.
- **`name`**: Name of the folder.
- **`createdAt`**: Timestamp of when the folder was created.

**Error Responses:**

- **401 Unauthorized**: Invalid or missing session cookie.
  
  ```json
  {
    "error": "Authentication required."
  }
  ```

- **500 Internal Server Error**: Unexpected error retrieving folders.
  
  ```json
  {
    "error": "Failed to retrieve folders."
  }
  ```

### 3. Delete Folder

#### `DELETE https://buzz.3rr0r.lol/api/buzzheavier/folder/delete`

This endpoint deletes a folder specified by either its **ID** or **name**. If a name is provided, the endpoint will locate the folder’s ID automatically.

**Request with Folder ID:**

```bash
curl -X DELETE https://buzz.3rr0r.lol/api/buzzheavier/folder/delete \
  -H "Content-Type: application/json" \
  -H "Cookie: session=YOUR_API_KEY" \
  -d '{"id": "GbgGV7OwoAA"}'
```

**Request with Folder Name:**

```bash
curl -X DELETE https://buzz.3rr0r.lol/api/buzzheavier/folder/delete \
  -H "Content-Type: application/json" \
  -H "Cookie: session=YOUR_API_KEY" \
  -d '{"name": "New Folder"}'
```

**Expected Success Response (200 OK):**

```json
{
  "message": "Folder deleted successfully."
}
```

**Error Responses:**

- **400 Bad Request**: Missing folder ID or name.

  ```json
  {
    "error": "Folder ID or name is required."
  }
  ```

- **404 Not Found**: Folder name does not match any existing folder.

  ```json
  {
    "error": "Folder with name 'NonExistentFolder' not found."
  }
  ```

- **500 Internal Server Error**: Unexpected error during deletion.

  ```json
  {
    "error": "Failed to delete folder."
  }
  ```

---

## Troubleshooting

### Common Issues and Solutions

- **Invalid Session Cookie**: Ensure that the `API_KEY` in your `.env` file is correct and active. Without a valid session cookie, the API will return `401 Unauthorized`.
- **Network Errors**: If requests fail with network-related errors, verify your internet connection and that BuzzHeavier’s servers are accessible.
- **Invalid Folder ID**: Double-check folder IDs or names before deletion. Deleting a folder that doesn’t exist will result in a `404 Not Found` error.

---

## Contributing

Contributions are welcome! Here’s how you can get involved:

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

Please ensure any new code is thoroughly tested.

---

## License

This project is open-source and available under the MIT License. See the `LICENSE` file for more information.