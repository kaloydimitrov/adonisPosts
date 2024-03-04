// import type { HttpContext } from '@adonisjs/core/http'

export default class HellosController {
    async index() {
        return {
            hello: 'world'
        }
    }
}