import axios, { AxiosHeaders } from "axios";
import {IUserContext} from "../Context/UserContext";

interface IAPIResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
  access_token?: string;
}
// const userContext = () => {
//   const {token} = useUserContext();
//   return token
// }

let token: string | null = null;

export function setToken(newToken: string | null) {
  token = newToken;
}

const Axios = axios.create()

Axios.interceptors.request.use(
  async (config) => {
    if (config.headers && token)
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    config.withCredentials = true;
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default Axios;

export async function axiosPost(url: string, data: Record<string, string>,context: IUserContext ) {
  let dataResponse: IAPIResponse = {};
  try {
    const res = await Axios.post<IAPIResponse>(context.API_URL + url, data);
    if (res === undefined) {
      throw new Error("No data returned from Server");
    }
    dataResponse = res.data;
    console.log("dataResponse", dataResponse)
    console.log("check bool dataResponse", !!dataResponse.access_token);
    if (dataResponse.access_token) {
      context.setToken(dataResponse.access_token);
    }
  } catch (error) {
    console.error(error);
  }
  return dataResponse;
}

export async function axiosGet<T extends IAPIResponse = IAPIResponse>(url: string, context: IUserContext, abortController?: AbortController) : Promise<T> {
  let dataResponse: T = {} as T;
  try {
    const res = await Axios.get<T>(context.API_URL + url, { signal: abortController?.signal });
    if (res === undefined) {
      throw new Error("No data returned from Server");
    }
    dataResponse = res.data;
    if (dataResponse.token) {
      context.setToken(res.data.token);
    }
  } catch (error) {
    console.error(error);
  }
  return dataResponse;
}
