const users = [];

module.exports = {
  getUserByEmail: function (email) {
    return users.find((user) => user.email === email);
  },
  createUser: function (name, email, password) {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    return newUser;
  },
};
