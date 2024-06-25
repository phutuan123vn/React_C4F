import axios from "axios";
import {IUserContext} from "../Context/UserContext";

interface IAPIResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
  access_token?: string;
}
// const userContext = useUserContext();

export async function axiosPost(url: string, data: Record<string, string>,context: IUserContext ) {
  const config = context.token ? { headers: { Authorization: `Token ${context.token}` } } : {};
  let dataResponse: IAPIResponse = {};
  try {
    const res = await axios.post<IAPIResponse>(context.API_URL + url, data, config);
    if (res === undefined || res.data === undefined) {
      throw new Error("No data returned from axiosPost");
    }
    if (res.data.token) {
      context.setToken(res.data.token);
    }
    dataResponse = res.data;
  }
  catch (error) {
    console.error(error);
  }
  return dataResponse;


}

