/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import HellosController from '#controllers/hellos_controller'
import PostsController from '#controllers/posts_controller'

router.get('/', [HellosController, 'index'])
router.post('/post/', [PostsController, 'create'])
router.get('/post/', [PostsController, 'index'])