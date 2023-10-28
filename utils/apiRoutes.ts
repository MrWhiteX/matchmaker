import axios, { AxiosRequestConfig } from "axios";
import {
  IChangePassword,
  IFilterPayload,
  IRegister,
  IResetPassword,
} from "types/types";
type SkipRequestConfig<T = any> = AxiosRequestConfig<T> & {
  targetUserId: number;
};

const httpClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRoutes = {
  profiles: {
    like: (payload: IFilterPayload) =>
      httpClient.post("/api/profiles", payload),
    skip: (payload: SkipRequestConfig<IFilterPayload>) =>
      httpClient({ url: "/api/profiles", data: payload, method: "DELETE" }),
  },

  user: {
    register: {
      post: (payload: IRegister) => httpClient.post(`/api/register`, payload),
    },
    resetPassword: {
      post: (payload: IResetPassword) =>
        httpClient.post(`/api/user/reset-password`, payload),
      put: (payload: IChangePassword) =>
        httpClient.put(`/api/user/reset-password`, payload),
    },
    filter: {
      update: (payload: IFilterPayload) =>
        httpClient.put("/api/user/filter", payload),
    },
    profile: {
      get: () => httpClient.get("/api/user/profile"),
      update: (payload: IFilterPayload) =>
        httpClient.put("/api/user/profile", payload),
    },
  },
  conversations: {
    message: {
      create: (id: number, payload: { content: string }) =>
        httpClient.post(`/api/conversations/${id}`, payload),
    },
  },
  admin: {
    banUser: {
      create: (payload: { userId: number; status: boolean }) =>
        httpClient.post(`/api/admin/ban`, payload),
    },
  },
  fetcher: (url: string) => httpClient.get(url).then((res) => res.data),
};

export default apiRoutes;
