import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY } from '../config/index'

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  secure: true
})

export async function uploadImage (filePath: string): Promise<UploadApiResponse> {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'expenseManager'
  })
}
