import {SignupUser} from '../aws-cognito'

export function routes(router) {
  router
    .post('/signup', async (ctx) => {
      const response = await SignupUser(ctx.request.body)
      ctx.body = response
      return ctx
    })
}
