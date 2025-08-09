This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First,  run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## API Documentation

### Image Upload Endpoint

Upload images to Cloudinary and get clean URLs back.

#### Endpoint
```
POST /api/addimage
```

#### Description
This endpoint allows you to upload images to Cloudinary with custom names for clean, readable URLs.

#### Prerequisites
Make sure you have the following environment variables set in your `.env` file
```env
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"
```

#### Request Format
- **Content-Type**: `multipart/form-data`
- **Method**: `POST`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | File | Yes | The image file to upload (supports common formats: jpg, png, gif, webp, etc.) |
| `name` | String | Yes | Custom name for the image (will be used in the URL) |

#### Response Format

**Success Response (200)**
```json
{
  "message": "Image uploaded successfully",
  "success": true,
  "url": "https://res.cloudinary.com/cloud_name/image/upload/v1234567890/uploads/your-image-name.jpg",
  "public_id": "uploads/your-image-name"
}
```

**Error Responses**

*Missing Image (400)*
```json
{
  "error": "No image file provided"
}
```

*Missing Name (400)*
```json
{
  "error": "No name provided for the image"
}
```

*Upload Failed (500)*
```json
{
  "error": "Failed to upload image",
  "details": "Error details here"
}
```

#### Example Usage

Using cURL:
```bash
curl -X POST http://localhost:3000/api/addimage \
  -F "image=@public/interviewexperience/morgan-stanley.png" \
  -F "name=morgan-stanley-logo"
```

Using JavaScript/Fetch:
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('name', 'my-image-name');

fetch('/api/addimage', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Image URL:', data.url);
});
```

#### Notes
- Images are stored in the `uploads/` folder on Cloudinary
- If an image with the same name already exists, it will be overwritten
- The `name` parameter will be used as the public ID, creating clean URLs
- Supported file formats: Auto-detected by Cloudinary (jpg, png, gif, webp, svg, etc.)



- 
