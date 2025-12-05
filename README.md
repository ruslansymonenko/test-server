# Test Server

## Description

A minimal Express server built with TypeScript, intended for testing ideas, experimenting with backend concepts, and quickly prototyping features.
The project includes a clean structure, TypeScript configuration, development tools, and a **professional file uploads module** with clean architecture.

## Features

⚡ Express server with TypeScript

🔄 Auto-restart using ts-node-dev

📁 Clean and extensible project structure

📤 **Professional uploads module** with storage abstraction (local/Docker/cloud)

🖼️ Image upload support with validation and processing

🔌 Fully decoupled architecture - easily swap storage backends

🌐 Environment-based configuration for dev/staging/production

🧪 Suitable for experiments and rapid prototyping

🐳 Docker-ready with volume support

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

The server will start on `http://localhost:3000`

## Uploads Module

The project includes a production-ready file uploads system with:

- ✅ **Storage Abstraction**: Switch between local, Docker, or cloud storage
- ✅ **File Validation**: Size, type, dimensions (for images)
- ✅ **File Processing**: Resize, optimize, format conversion (with sharp)
- ✅ **Clean Architecture**: Fully decoupled, functional programming
- ✅ **Extensible**: Easy to add new file types (documents, videos, audio)

### Upload Endpoints

```bash
# Upload single file
POST /api/uploads/single

# Upload multiple files
POST /api/uploads/multiple

# Get file
GET /api/uploads/:filename

# Delete file
DELETE /api/uploads/:filename

# Get metadata
GET /api/uploads/:filename/metadata
```

### Quick Test

```bash
curl -X POST http://localhost:3000/api/uploads/single \
  -F "file=@./path/to/image.jpg"
```

**See detailed documentation:**

- 📖 [UPLOADS.md](.uploads/UPLOADS.md) - Get started in 5 minutes

## Scripts

`npm run dev` — start the development server

`npm run build` — compile TypeScript into JavaScript

`npm start` — run the compiled server

## Project Structure

```
src/
├── config/          # Configuration management
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── uploads/        # File uploads module ⭐
│   ├── storage/    # Storage abstraction layer
│   ├── validators/ # File validation
│   ├── processors/ # File processing
│   └── ...
└── utils/          # Utility functions
```

## Configuration

Environment variables (see `.env.example`):

```bash
# Server
PORT=3000
NODE_ENV=development

# Storage (choose one)
STORAGE_TYPE=local              # or 'docker' or 'cloud'
STORAGE_LOCAL_PATH=./uploads    # for local development
STORAGE_DOCKER_VOLUME=/app/uploads  # for Docker
STORAGE_BASE_URL=http://localhost:3000/api/uploads

# Upload limits
UPLOAD_MAX_FILE_SIZE=10485760   # 10MB
UPLOAD_MAX_FILES=10
```

## Production Deployment

### With Docker

```yaml
# docker-compose.yml
volumes:
  - uploads:/app/uploads

environment:
  - STORAGE_TYPE=docker
  - STORAGE_DOCKER_VOLUME=/app/uploads
```

### With Cloud Storage

```bash
STORAGE_TYPE=cloud
STORAGE_CLOUD_PROVIDER=aws
STORAGE_CLOUD_BUCKET=your-bucket
STORAGE_CLOUD_REGION=us-east-1
```

## Purpose

This repository serves as a base for quickly testing backend ideas, file upload logic, middleware, utilities, and other experimental features without affecting production projects.
