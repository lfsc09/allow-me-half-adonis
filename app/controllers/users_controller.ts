import { createUserValidator, loginValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserDAO } from '../../contracts/user_dao.js'
import { UserFile } from '../../contracts/user_file.js'

@inject()
export default class UsersController {
  constructor(private userDAO: UserDAO) {}

  async loginRender({ view }: HttpContext) {
    return view.render('pages/login')
  }

  async homeRender({ response, view, session }: HttpContext) {
    if (!session.has('user') || !(await this.userDAO.verifyUserToken(session.get('user').token))) return response.redirect('/logout')
    const userId = session.get('user').uid
    const user = await this.userDAO.getUser(userId)
    return view.render('pages/home', {
      name: user.fullName.toUpperCase(),
      course: user.course.toUpperCase(),
      rgm: user.rgm.padStart(15, '0'),
      cardCode: user.cardCode,
      date: user.validUntil.toFormat('MM/yyyy'),
    })
  }

  async usersRender({ response, view, session }: HttpContext) {
    if (!session.has('user') || !(await this.userDAO.verifyUserToken(session.get('user').token))) return response.redirect('/logout')
    if (!(await this.userDAO.isUserAdmin(session.get('user').uid))) return response.redirect('/home')
    const users = await this.userDAO.getUsers()
    return view.render('pages/users', { users })
  }

  @inject()
  async avatarFile({ response, request, session }: HttpContext, userFile: UserFile) {
    if (!session.has('user') || !(await this.userDAO.verifyUserToken(session.get('user').token))) return response.redirect('/logout')
    const userId = request.param('id')
    const { avatarId, avatarExt } = await this.userDAO.getUser(userId)
    return response.stream(await userFile.getAvatarFile(avatarId, avatarExt ?? ''))
  }

  async login({ request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const accessToken = await this.userDAO.getUserToken(email, password)
    session.put('user', {
      token: accessToken.value,
      uid: accessToken.tokenableId,
      tid: accessToken.identifier,
    })
    return response.redirect(`/home`)
  }

  async logout({ response, session }: HttpContext) {
    if (session.has('user')) {
      if (await this.userDAO.verifyUserToken(session.get('user').token)) {
        const sessionData = session.get('user')
        await this.userDAO.deleteUserToken(sessionData.uid, sessionData.tid)
      }
      session.forget('user')
    }
    return response.redirect('/login')
  }

  async refresh({ request, response, session }: HttpContext) {
    if (!session.has('user') || !(await this.userDAO.verifyUserToken(session.get('user').token))) return response.redirect('/logout')
    if (!(await this.userDAO.isUserAdmin(session.get('user').uid))) return response.redirect('/home')
    const userId = request.param('id')
    await this.userDAO.refreshUser(userId)
    return response.redirect('/users')
  }

  @inject()
  async create({ request, response, session }: HttpContext, userFile: UserFile) {
    if (!session.has('user') || !(await this.userDAO.verifyUserToken(session.get('user').token))) return response.redirect('/logout')
    if (!(await this.userDAO.isUserAdmin(session.get('user').uid))) return response.redirect('/home')
    const input = await request.validateUsing(createUserValidator)
    const avatarId = (
      await this.userDAO.createUser({
        avatarExt: input.avatar.extname!,
        email: input.email,
        password: input.password,
        fullName: input.fullName,
        course: input.course,
      })
    ).avatarId
    await userFile.persistFile(input.avatar, avatarId)
    return response.redirect('/users')
  }

  @inject()
  async delete({ request, response, session }: HttpContext, userFile: UserFile) {
    if (!session.has('user') || !(await this.userDAO.verifyUserToken(session.get('user').token))) return response.redirect('/logout')
    if (!(await this.userDAO.isUserAdmin(session.get('user').uid))) return response.redirect('/home')
    const userId = request.param('id')
    if (userId !== session.get('user').uid) {
      try {
        const user = await this.userDAO.getUser(userId)
        await this.userDAO.deleteUser(user)
        await userFile.deleteFile(user.avatarId, user.avatarExt ?? '')
      } catch (error) {}
    }
    return response.redirect('/users')
  }
}
