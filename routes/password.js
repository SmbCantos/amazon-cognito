import {ConfirmPassword, changePassword, ResetPassword } from '../aws-cognito'

export function routes(router) {
  router
    .post('/password/new', async (ctx) => {
      const response = await ConfirmPassword(ctx.request.body)
      ctx.body = response
    })
    .post('/password/change', async (ctx) => {
      const token = ctx.headers['authorization']
      const { previous, proposed } = ctx.request.body
      const response = await changePassword(token, previous, proposed)
      ctx.response = response
    })
    .post('/password/forgot', async (ctx) => {
      const response = await ResetPassword(ctx.request.body)
      ctx.response = response
    })
}
