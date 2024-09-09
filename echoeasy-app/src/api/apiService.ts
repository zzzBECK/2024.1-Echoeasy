import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const httpClient = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API_URL}`,
});

httpClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token from AsyncStorage", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export class ApiService {
  post(url: string, data: any) {
    return httpClient.post(url, data);
  }

  get(url: string,) {
    return httpClient.get(url);
  }

  put(url: string, data: any) {
    return httpClient.put(url, data);
  }

  delete(url: string) {
    return httpClient.delete(url);
  }

  search(url: string, params: any) {
    return httpClient.get(url, { params });
  }
}
