// backend/utils/auth.js
const isAdmin = (user) => {
  return user.groupsNeve === "admin";
};

export { isAdmin }; // 👈 ES modul export