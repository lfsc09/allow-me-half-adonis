import { MultipartFile } from '@adonisjs/core/bodyparser'
import drive from '@adonisjs/drive/services/main'
import Stream from 'stream'
import { UserFile } from '../../../contracts/user_file.js'

export class UserFilesystem implements UserFile {
  async getAvatarFile(filename: string, fileExt: string): Promise<Stream.Readable> {
    return await drive.use().getStream(`/uploads/avatar/${filename}.${fileExt}`)
  }

  async persistFile(file: MultipartFile, filename: string): Promise<void> {
    await file.moveToDisk(`uploads/avatar/${filename}.${file.extname}`)
  }

  async deleteFile(filename: string, fileExt: string): Promise<void> {
    await drive.use().delete(`uploads/avatar/${filename}.${fileExt}`)
  }
}
