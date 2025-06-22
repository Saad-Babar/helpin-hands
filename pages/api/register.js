// api/register.js

import { connectToDB } from '../../lib/mongodb';
import User from '../../models/User';
const { v4: uuidv4 } = require('uuid'); // For generating unique filenames
import path from 'path';
// import fs from 'fs/promises'; // Remove this line
import { mkdir, copyFile, unlink } from 'fs/promises'; // Import specific functions
import formidable from 'formidable'; // Changed import to ES Module



export const config = {
    api: {
        bodyParser: false, // Don't let Next.js parse the body, we'll use a middleware
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
                return reject(err);
            }
        });
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectToDB();
        const { fields, files } = await parseForm(req);

        const { fname, lname, email, phone, password, role, address } = fields;
        const documentFile = files.document;

        const name = `${fname} ${lname}`;

        // Server validation
        if (!name || !email || !phone || !password || !role || !address) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: 'EMAIL_EXISTS',
                message: 'This email is already registered',
            });
        }

        let documentPath = null;
        if (documentFile) {
            const originalFilename = documentFile.originalFilename;
            const fileExtension = path.extname(originalFilename);
            const newFilename = `${uuidv4()}${fileExtension}`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Ensure this directory exists
            await mkdir(uploadDir, { recursive: true });
            documentPath = path.join('/uploads', newFilename); // Path to save in DB (relative to public)
            const finalPath = path.join(uploadDir, newFilename);

            try {
                await copyFile(documentFile.filepath, finalPath); // Copy the file
                await unlink(documentFile.filepath); // Delete the temporary file
            } catch (error) {
                console.error('Error saving document:', error);
                return res.status(500).json({ error: 'Failed to save uploaded document' });
            }
        }

        const newUser = await User.create({
            name,
            email,
            phone,
            password, // Make sure your User model handles password hashing
            role,
            address,
            document: documentPath,
        });

        return res.status(201).json({
            success: true,
            user: newUser,
        });
    } catch (error) {
        console.error('Registration error:', error);

        if (error.isDuplicate || error.code === 11000) {
            return res.status(409).json({
                error: 'EMAIL_EXISTS',
                message: 'This email is already registered',
            });
        }

        return res.status(500).json({
            error: 'REGISTRATION_FAILED',
            message: error.message || 'Registration failed on the server',
        });
    }
}