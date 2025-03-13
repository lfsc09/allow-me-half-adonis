import { MultipartFile } from '@adonisjs/core/bodyparser'

export abstract class UserFile {
  abstract getFilePath(filename: string, fileExt: string): Promise<string>
  abstract persistFile(file: MultipartFile, filename: string): Promise<void>
}
