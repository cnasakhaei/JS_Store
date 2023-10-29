const validateUsername = (username) => {
  const regex = /^[a-zA-Z\d_]{4,16}/;
  const result = regex.test(username);
  return result;
};

const validatePassword = (password) => {
  const regex = /^.{4,20}$/;
  const result = regex.test(password);
  return result;
};

const validateForm = (username, password) => {
  const userNameResult = validateUsername(username);
  const passwordResult = validatePassword(password);

  if (userNameResult && passwordResult) {
    return true;
  } else if (!userNameResult) {
    alert("Invalid username");
  } else if (!passwordResult) {
    alert("Invalid password");
  }
};

export default validateForm;
