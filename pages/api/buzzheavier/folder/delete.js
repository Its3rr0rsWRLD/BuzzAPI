import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { id, name } = req.body;
    if (!id && !name) return res.status(400).json({ error: 'Folder ID or name is required.' });

    const cookies = req.headers.cookie || '';

    let folderId = id;

    if (!folderId && name) {
      const foldersResponse = await fetch('http://localhost:3000/api/buzzheavier/getFolders', {
        method: 'GET',
        headers: { 'Cookie': cookies },
      });

      if (!foldersResponse.ok) {
        return res.status(foldersResponse.status).json({ error: 'Failed to retrieve folders.' });
      }

      const { folders } = await foldersResponse.json();

      const folder = folders.find(f => f.name.toLowerCase() === name.toLowerCase());

      if (!folder) {
        return res.status(404).json({ error: `Folder with name '${name}' not found.` });
      }

      folderId = folder.id;
    }

    const response = await fetch(`https://buzzheavier.com/fl/${folderId}`, {
      method: 'DELETE',
      headers: { 'Cookie': cookies },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to delete folder.' });
    }

    res.status(200).json({ message: 'Folder deleted successfully.' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}