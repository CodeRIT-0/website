import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    const file = formData.get("image");
    const name = formData.get("name");

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "No name provided for the image" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a promise wrapper
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // Automatically detect file type
          folder: "uploads", // Optional: organize uploads in a folder
          public_id: name, // Use the provided name as the public_id for clean URLs
          overwrite: true, // Allow overwriting if same name exists
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // Return the Cloudinary URL
    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { 
        error: "Failed to upload image",
        details: error.message 
      },
      { status: 500 }
    );
  }
}
