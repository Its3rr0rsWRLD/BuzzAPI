import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Folder ID is required.' });

    const cookies = req.headers.cookie || '';
    const response = await fetch(`https://buzzheavier.com/fl/${id}`, {
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