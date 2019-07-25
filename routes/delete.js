import {DeleteUser} from '../aws-cognito'

export function routes(router) {
  router
    .delete('/delete', async (ctx) => {
      const token = ctx.headers['authorization']
      if (!token) return ctx.body = 'User is not Signed In'
      const accessToken = token.split(' ')[1]
      const response = await DeleteUser(accessToken)
      ctx.body = response
    })
}
