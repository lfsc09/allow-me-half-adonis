import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { UserFile } from '../../../contracts/user_file.js'

export class UserFilesystem implements UserFile {
  async getFilePath(filename: string, fileExt: string): Promise<string> {
    return app.makePath('public', 'avatars', `${filename}.${fileExt}`)
  }

  async persistFile(file: MultipartFile, filename: string): Promise<void> {
    return await file.move('public/avatars', { name: `${filename}.${file.extname}` })
  }
}
