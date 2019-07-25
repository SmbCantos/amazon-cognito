import AWS from 'aws-sdk'
import { config } from './config'

const updateConfig = {
  region: config.region,
  accessKeyId: config.accessId,
  secretAccessKey: config.secretKey
}

AWS.config.update(updateConfig)

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

export async function SignupUser({email, password, attributes}) {
  const params = {
    ClientId: config.client_id,
    Password: password,
    Username: email,
    UserAttributes: attributes
  }
  try {
    const response = await cognitoidentityserviceprovider.signUp(params).promise()
    return response
  } catch (err) {
    return err
  }
}

export async function SigninUser(username, password) {
  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: config.client_id,
    UserPoolId: config.pool_id,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
    }
  try {
    const response = await cognitoidentityserviceprovider.adminInitiateAuth(params).promise()
    return response
  } catch (err) {
    return err
  }
}

export async function ResetPassword({username}) {
  const params = {
    ClientId: config.client_id,
    Username: username
  }
  try {
    const response = await cognitoidentityserviceprovider.forgotPassword(params).promise()
    return response
  } catch (err) {
    return err
  }
}

export async function ConfirmPassword({username, resetCode, newPassword}) {
  const params = {
    ClientId: config.client_id,
    ConfirmationCode: resetCode,
    Password: newPassword,
    Username: username
  }
  try {
    const response = await cognitoidentityserviceprovider.confirmForgotPassword(params).promise()
    return response
  } catch (error) {
    return err
  }
}

export async function SignOutUser(access_token) {
  const params = {
    AccessToken: access_token
  }
  try {
    const response = await cognitoidentityserviceprovider.globalSignOut(params).promise()
    return response
  } catch (err) {
    return err
  }
}

export async function DeleteUser(access_token) {
  const params = {
    AccessToken: access_token
  }
  try {
    const response = await cognitoidentityserviceprovider.deleteUser(params).promise()
    return response
  } catch (err) {
    return err
  }
}

export async function InitiateAuth(refresh_token) {
  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: config.client_id,
    UserPoolId: config.pool_id,
    AuthParameters: {
      REFRESH_TOKEN: refresh_token
    }
    }
  try {
    const response = await cognitoidentityserviceprovider.adminInitiateAuth(params).promise()
    return response
  } catch (err) {
    return err
  }
}

export async function changePassword(token, previous, proposed) {
  const data = {
    AccessToken: token,
    PreviousPassword: previous,
    ProposedPassword: proposed
  }
  try {
    const response = await cognitoidentityserviceprovider.changePassword(data).promise()
    return response
  } catch (err) {
    return err
  }
}

