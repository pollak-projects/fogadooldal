const isAdmin = (user) => {
  return user.groupsNeve === "admin";
};

export { isAdmin }; 