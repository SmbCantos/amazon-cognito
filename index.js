'use strict'

import Koa from 'koa'
import Router from 'koa-router'
import jsonBody from 'koa-json-body'
import * as swagger from 'swagger2'
import { ui as swaggerUI } from 'swagger2-koa'

import { config } from './config'
import { routes as tokenRoutes } from './routes/token'
import { routes as passwordRoutes } from './routes/password'
import { routes as deleteRoutes } from './routes/delete'
import { routes as signoutRoutes } from './routes/signout'
import { routes as signinRoutes } from './routes/signin'
import { routes as signupRoutes } from './routes/signup'

const spec = swagger.loadDocumentSync('./swagger.yaml')
if (!swagger.validateDocument(spec)) {
	throw Error('./swagger.yaml is not valid Swagger 2.0 schema.')
}

const app = new Koa()
	.use(jsonBody())
	.use(swaggerUI(spec, '/', ['/v1']))

const router = new Router({
	prefix: '/v1'
})

for (const routes of [
	tokenRoutes,
	passwordRoutes,
	deleteRoutes,
	signoutRoutes,
	signinRoutes,
	signupRoutes
]) {
	routes(router)
}

router.get('/swagger.json', ctx => {
	ctx.status = 200
	ctx.body = spec
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port)
console.log(`Backend Active on Port: ${config.port}`)

