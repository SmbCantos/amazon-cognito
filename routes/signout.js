import {SignOutUser} from '../aws-cognito'

export function routes(router) {
  router
    .get('/signout', async (ctx) => {
      const token = ctx.headers['authorization']
      if (!token) return ctx.body = 'User is not Signed In'
      const accessToken = token.split(' ')[1]
      const response = await SignOutUser(accessToken)
      ctx.body = response
    })
}
