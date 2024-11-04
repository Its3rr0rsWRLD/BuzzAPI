import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing folder name.' });
    }

    const cookies = req.headers.cookie || '';
    const sessionMatch = cookies.match(/session=([^;]+)/);

    if (!sessionMatch) {
      return res.status(401).json({ error: 'Unauthorized: Session cookie not found.' });
    }

    const sessionCookie = `session=${sessionMatch[1]}`;

    const form = new FormData();
    form.append('name', name);

    const response = await fetch('https://buzzheavier.com/fl', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'HX-Request': 'true',
        'HX-Target': 'tbody',
        'Priority': 'u=1, i',
        'Sec-GPC': '1',
        'Cookie': sessionCookie,
      },
      body: form,
    });

    const responseBody = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to create folder.',
        details: responseBody,
      });
    }

    const folderIdMatch = responseBody.match(/copyFolderLink\('([^']+)'\)/);
    const folderId = folderIdMatch ? folderIdMatch[1] : null;

    res.status(200).json({
      message: 'Folder created successfully.',
      folderId: folderId,
      data: responseBody,
    });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}