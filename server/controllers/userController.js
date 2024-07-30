const User = require("../models/user.model");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (name, email, password) => {
  try {
    let alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      return {
        status: 400,
        res: "User already registered, try login",
      };
    }
    let user = await User.create({
      name,
      email,
      password: bycrpt.hashSync(password),
    });
    user.toJSON();
    const res = { name, email, ...user };
    return {
      status: 201,
      res,
    };
  } catch (error) {
    return {
      status: 500,
      res: error,
    };
  }
};

const GenerateToken = (user) => {
  // console.log(user);
  // let payload = {
  //   _id: user.id,
  //   email: user.email,
  //   name: user.name,
  // };

  return jwt.sign(user, process.env.JWT_SIGN);
};

const login = async (email, password) => {
  let user = await User.findOne({ email });
  if (user) {
    user = user.toJSON();
    if (bycrpt.compareSync(password, user.password)) {
      //
      delete user.password;
      user.token = GenerateToken(user);

      return {
        status: 200,
        res: user,
      };
    } else {
      return {
        status: 400,
        res: "Invalid password",
      };
    }
  } else {
    return {
      status: 400,
      res: "Invalid email",
    };
  }
};

const loggedin = async (email) => {
  let user = await User.findOne({ email });
  user = user.toJSON();
  delete user.password;
  return user;
};

function verifyTOken(token) {
  const payload = jwt.verify(token, process.env.JWT_SIGN);
  return payload;
}

module.exports = {
  register,
  login,
  loggedin,
  verifyTOken,
};
