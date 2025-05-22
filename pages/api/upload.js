// api/upload.js

import path from 'path';
import { mkdir, copyFile, unlink } from 'fs/promises';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false, // We use formidable to parse form-data
  },
};

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    const fields = {};
    const files = {};

    form.on('field', (name, value) => {
      fields[name] = value;
    });
    form.on('file', (name, file) => {
      files[name] = file;
    });
    form.on('end', () => {
      resolve({ fields, files });
    });
    form.on('error', (err) => {
      console.error('Formidable Error:', err);
      reject(err);
    });

    form.parse(req, (err) => {
      if (err) {
        console.error('Form Parse Error:', err);
        reject(err);
      }
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = await parseForm(req);

    const file = files.file; // Expecting field name 'file'
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalFilename = file.originalFilename;
    const fileExtension = path.extname(originalFilename);
    const newFilename = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'food');
    await mkdir(uploadDir, { recursive: true });
    const finalPath = path.join(uploadDir, newFilename);

    try {
      await copyFile(file.filepath, finalPath);
      await unlink(file.filepath); // remove temp file
    } catch (error) {
      console.error('Error saving uploaded file:', error);
      return res.status(500).json({ error: 'Failed to save uploaded file' });
    }

    const fileUrl = `/uploads/food/${newFilename}`;

    return res.status(200).json({
      success: true,
      filename: newFilename,
      url: fileUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed', details: error.message });
  }
}
