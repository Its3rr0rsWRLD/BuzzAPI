import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const cookies = req.headers.cookie || '';
    const response = await fetch('https://buzzheavier.com/account', {
      method: 'GET',
      headers: { 'Cookie': cookies }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to load account page.' });
    }

    const html = await response.text();
    const root = parse(html);
    const folders = Array.from(root.querySelectorAll('tbody .editable')).map(row => {
      const id = row.querySelector('a').getAttribute('href').split('/').pop();
      const name = row.querySelector('a').textContent;
      return { id, name };
    });

    res.status(200).json({ folders });
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}