import { reactive } from "vue";
import { defineStore } from "pinia";

export const store = reactive({
  coins: 1000,
});

export const useUserStore = defineStore("user", {
  state: () => ({
    profileImage: localStorage.getItem("profileImage") || "/default.jpg",
  }),
  actions: {
    setProfileImage(imageUrl) {
      this.profileImage = imageUrl;
      localStorage.setItem("profileImage", imageUrl);
    },
  },
});
