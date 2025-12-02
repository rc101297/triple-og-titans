import { defineStore } from "pinia";
import { reactive } from "vue";
import api from "../api";

export const useGlobalStore = defineStore("global", () => {
  const token = localStorage.getItem("token");

  let decodedToken = null;
  try {
    decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  } catch (err) {
    console.error("Invalid token format:", err);
  }

  const user = reactive({
    token,
    email: decodedToken ? decodedToken.email : null,
    isAdmin: decodedToken ? Boolean(decodedToken.isAdmin) : null,
    firstName: null,
    lastName: null,
    mobileNo: null,
    isLoading: false,
  });

  async function getUserDetails(token) {
    if (!token) {
      Object.assign(user, {
        token: null,
        email: null,
        isAdmin: null,
        firstName: null,
        lastName: null,
        mobileNo: null,
        isLoading: false,
      });
      return;
    }

    user.isLoading = true;

    try {
      const { data } = await api.get("/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Object.assign(user, {
        token,
        email: user.email,
        isAdmin: data.user.isAdmin,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        mobileNo: data.user.mobileNo,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      user.isLoading = false;
    }
  }

  return {
    user,
    getUserDetails,
  };
});
