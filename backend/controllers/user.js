import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    const allUserDetails = await User.find();
    res.status(200).json(allUserDetails);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    console.log(req.user);
    // await User.findByIdAndDelete(req.params.id);
    if (req.user.is_Admin)
      res.status(200).json("Hello admin  you can delete all accounts");
    else res.status(200).json("Hello user,  you can delete your account");
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const UserDetails = await User.findById(req.params.id);
    const { password, isAdmin, ...otherDetails } = UserDetails._doc;
    res.status(200).json(otherDetails);
  } catch (err) {
    next(err);
  }
};
