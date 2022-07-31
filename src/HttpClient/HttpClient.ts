import axios from "axios";

export interface HttpClient {
  get<T>(url: string): Promise<T>;
}

export const AxiosHttpClient = (): HttpClient => ({
  async get(url: string) {
    const result = await axios.get(url);
    return result.data;
  },
});
