import axios from 'axios'

axios.defaults.baseURL = 'https://clothe-backend-8020c1e86185.herokuapp.com/api/'

async function getRequestHeaders() {
  try {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      session: localStorage.getItem('access'),
      accessToken: 'Bearer ' + localStorage.getItem('accessToken'),
    }
  } catch (error) {
    return {}
  }
}

export async function apiRestGet(path: string, body = {}): Promise<any> {
  try {
    const requestOptions: any = {}

    requestOptions.headers = await getRequestHeaders()
    requestOptions.params = body
    const response = await axios.get(path, requestOptions)
    return response.data
  } catch (e) {
    return e
  }
}

export async function apiRestDelete(path: string, body = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()

    requestOptions.params = body
    const response = await axios.delete(path, requestOptions)
    return response.data
  } catch (e) {
    return e
  }
}

export async function apiRestPost(path: string, body: any = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()
    const response = await axios.post(path, body, requestOptions)
    return response.data
  } catch (e) {
    return { error: e }
  }
}

export async function apiRestPatch(
  path: string,
  body: any = {},
  headers?: any
): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()

    if (headers) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...headers,
      }
    }

    const response = await axios.patch(path, body, requestOptions)

    return response.data
  } catch (e) {
    return { error: e }
  }
}

export async function apiRestPut(path: string, body: any = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()

    const response = await axios.put(path, body, requestOptions)
    return response.data
  } catch (e) {
    return { error: e }
  }
}