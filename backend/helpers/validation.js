const User = require("../models/user");

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

exports.validateUsername = async (username) => {
  let isUsernameTaken = true;

  while (isUsernameTaken) {
    // console.log(`Checking username: ${username}`);
    let check = await User.findOne({ username });
    if (check) {
    //   console.log(`Username ${username} is taken, generating a new one`);
      username += (+new Date() * Math.random()).toString().substring(0, 1);
    } else {
    //   console.log(`Username ${username} is available`);
      isUsernameTaken = false;
    }
  }

  return username;
};
