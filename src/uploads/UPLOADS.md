# Uploads Module - Quick Start Guide

## Installation

The uploads module is already integrated. Just install dependencies:

```bash
npm install
```

## Basic Configuration

1. Copy the environment template:

```bash
cp .env.example .env
```

2. For development, the defaults work fine:

```env
STORAGE_TYPE=local
STORAGE_LOCAL_PATH=./uploads
STORAGE_BASE_URL=http://localhost:3000/api/uploads
```

## Start the Server

```bash
npm run dev
```

## Test Upload

### Using cURL

Upload an image:

```bash
curl -X POST http://localhost:3000/api/uploads/single \
  -F "file=@/path/to/your/image.jpg"
```

### Using Postman/Insomnia

1. Create a new POST request to `http://localhost:3000/api/uploads/single`
2. Set body type to `form-data`
3. Add a field named `file` with type `File`
4. Select an image file
5. Send the request

### Response

You'll receive:

```json
{
  "success": true,
  "data": {
    "filename": "1733400000000-abc123def456.jpg",
    "originalName": "image.jpg",
    "url": "http://localhost:3000/api/uploads/1733400000000-abc123def456.jpg",
    "size": 524288,
    "mimeType": "image/jpeg"
  }
}
```

## View Uploaded File

Access the file URL from the response:

```
http://localhost:3000/api/uploads/1733400000000-abc123def456.jpg
```

## File Upload Limits

Default limits (configurable via .env):

- Maximum file size: 10MB
- Maximum files per request: 10
- Allowed image types: JPEG, PNG, GIF, WebP, SVG, BMP

## Multiple File Upload

```bash
curl -X POST http://localhost:3000/api/uploads/multiple \
  -F "files=@/path/to/image1.jpg" \
  -F "files=@/path/to/image2.jpg"
```

## Delete a File

```bash
curl -X DELETE http://localhost:3000/api/uploads/1733400000000-abc123def456.jpg
```

## Get File Metadata

```bash
curl http://localhost:3000/api/uploads/1733400000000-abc123def456.jpg/metadata
```

## Production Deployment

### With Docker

1. Update `.env`:

```env
STORAGE_TYPE=docker
STORAGE_DOCKER_VOLUME=/app/uploads
STORAGE_BASE_URL=https://your-domain.com/api/uploads
```

2. Add volume to `docker-compose.yml`:

```yaml
volumes:
  - uploads:/app/uploads
```

### With Cloud Storage (AWS S3 Example)

1. Update `.env`:

```env
STORAGE_TYPE=cloud
STORAGE_CLOUD_PROVIDER=aws
STORAGE_CLOUD_BUCKET=your-bucket-name
STORAGE_CLOUD_REGION=us-east-1
STORAGE_CLOUD_ACCESS_KEY=your-access-key
STORAGE_CLOUD_SECRET_KEY=your-secret-key
```

2. Implement AWS S3 logic in `src/uploads/storage/cloudStorage.ts`
3. Install AWS SDK: `npm install @aws-sdk/client-s3`

## Advanced Features

### Custom Validation Rules

```javascript
// In your upload request body
{
  "options": {
    "validationRules": {
      "maxSize": 5242880,  // 5MB
      "allowedMimeTypes": ["image/jpeg", "image/png"]
    }
  }
}
```

### Image Processing

Install `sharp` for advanced image processing:

```bash
npm install sharp
```

Then uncomment the processing logic in `src/uploads/processors/imageProcessor.ts`.

## Extending the Module

See `UPLOADS_MODULE.md` for detailed guides on:

- Adding new file types (documents, videos, audio)
- Creating custom storage backends
- Implementing custom validators and processors
- Production best practices

## Troubleshooting

**Upload fails with 413 error:**

- Increase `UPLOAD_MAX_FILE_SIZE` in `.env`
- Check your reverse proxy limits (nginx, etc.)

**Files not accessible:**

- Verify `STORAGE_BASE_URL` matches your server URL
- Check directory permissions for `STORAGE_LOCAL_PATH`

**TypeScript errors:**

- Run `npm install` to ensure all dependencies are installed
- Ensure `@types/multer` is installed

## Next Steps

1. ✅ Test basic file upload
2. ✅ Verify file retrieval
3. ✅ Configure for your environment (dev/staging/prod)
4. 📖 Read `UPLOADS_MODULE.md` for advanced usage
5. 🔒 Add authentication/authorization
6. 🚀 Deploy to production

## Support

For detailed documentation, see `UPLOADS_MODULE.md`.
