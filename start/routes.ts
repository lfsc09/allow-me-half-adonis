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

router
.group(() => {
  router.get('', [UserController, 'loginRender'])
  router.post('', [UserController, 'login'])
})
.prefix('/login')

router.get('/home', [UserController, 'homeRender'])

router.get('/users', [UserController, 'usersRender'])

router
  .group(() => {
    router.get('avatar/:id', [UserController, 'avatarFile'])
    router.get('refresh/:id', [UserController, 'refresh'])
    router.get('delete/:id', [UserController, 'delete'])
    router.post('create', [UserController, 'create'])
  })
  .prefix('/user')

router.get('/logout', [UserController, 'logout'])
