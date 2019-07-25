import {InitiateAuth} from '../aws-cognito'

export function routes(router) {
  router
    .get('/token/refresh', async (ctx) => {
      const token = ctx.headers['x-refresh_token']
      if (!token) return ctx.body = 'Refresh Token Not Found'
      const accessToken = token.split(' ')[1]
      const response = await InitiateAuth(accessToken)
      ctx.response = response
    })
}
