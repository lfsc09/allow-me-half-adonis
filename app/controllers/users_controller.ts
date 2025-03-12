import { loginValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserDAO } from '../../contracts/user_dao.js'

@inject()
export default class UsersController {
  constructor(private userDAO: UserDAO) {}

  async loginRender({ view }: HttpContext) {
    return view.render('pages/login')
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
      const sessionData = session.get('user')
      await this.userDAO.deleteUserToken(sessionData.uid, sessionData.tid)
      session.forget('user')
    }
    return response.redirect('/login')
  }

  async homeRender({ view, session }: HttpContext) {
    const userId = session.get('user')?.uid ?? ''
    const user = await this.userDAO.getUser(userId)
    return view.render('pages/home', {
      name: user.fullName.toUpperCase(),
      course: user.course.toUpperCase(),
      rgm: user.rgm.padStart(15, '0'),
      date: user.validUntil.toFormat('MM/yyyy'),
    })
  }
}
