/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/users_controller')

router.get('/home', [UserController, 'homeRender'])

router
  .group(() => {
    router.get('', [UserController, 'loginRender'])
    router.post('', [UserController, 'login'])
  })
  .prefix('/login')

router.get('/logout', [UserController, 'logout'])
