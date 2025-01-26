import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const { google } = require('googleapis');
const fs = require('fs');

// Authenticate with Google Drive
const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/your-service-account-key.json', // Replace with your service account key file
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

async function uploadImage(filePath: string, fileName: string) {
  const fileMetadata = { name: fileName };
  const media = { mimeType: 'image/jpeg', body: fs.createReadStream(filePath) };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id', // Only retrieve the file ID
  });

  console.log(`Image uploaded with ID: ${response.data.id}`);
  return response.data.id; // Save this ID in the database
}

uploadImage('./example.jpg', 'example.jpg').catch(console.error);


async function generatePublicLink(fileId: number) {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader', // Allow read-only access
        type: 'anyone', // Anyone with the link
      },
    });
  
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
  
    console.log('Public Link:', file.data.webContentLink);
    return file.data.webContentLink; // Return the public link
  }
  