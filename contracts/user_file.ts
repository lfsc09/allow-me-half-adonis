import { MultipartFile } from '@adonisjs/core/bodyparser'
import Stream from 'stream'

export abstract class UserFile {
  abstract getAvatarFile(filename: string, fileExt: string): Promise<Stream.Readable>
  abstract persistFile(file: MultipartFile, filename: string): Promise<void>
  abstract deleteFile(filename: string, fileExt: string): Promise<void>
}
