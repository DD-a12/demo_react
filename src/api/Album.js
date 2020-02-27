import { baseUrl } from "../config";

export const Album = {
  all() {
    return fetch(`${baseUrl}/albums`, {
      credentials: "include"
    }).then(res => res.json());
  },

  one(id) {
    return fetch(`${baseUrl}/albums/${id}`, {
      credentials: "include"
    }).then(res => res.json());
  },
  
  create(params) {
    return fetch(`${baseUrl}/albums`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  
  update(id, params) {
    return fetch(`${baseUrl}/albums/${id}`, {
      method: "PATCH",
      credentials: "include",
      // headers: {
      //   Accept: "application/json"
      // },
      body: params
    }).then(res => res.json());
  },
  
  destroy(id) {
    return fetch(`${baseUrl}/albums/${id}`, {
      credentials: "include",
      method: "DELETE"
    }).then(res => res.json());
  }
};