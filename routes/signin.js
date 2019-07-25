import { SigninUser } from '../aws-cognito'

export function routes(router) {
  router
    .post('/signin', async (ctx) => {
      const {username, password} = ctx.request.body
      const response = await SigninUser(username, password)
      ctx.body = response
    })
}
