import { baseUrl } from "../config";

export const User = {
  current() {
    return fetch(`${baseUrl}/users/current`, {
      method: "GET",
      credentials: "include"
    }).then(res => res.json());
  },
  create(params) {
    return fetch(`${baseUrl}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};