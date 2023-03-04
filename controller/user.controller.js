const { User } = require("../models");
const deleteUser = async (req, res) => {
  if (req.userId !== req.params.id)
    return res.status(403).send("you are unauthorized to create this action");

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("user not found to delete it");

  await User.findByIdAndDelete(req.params.id);
  res.status(204).send("user deleted successfully");
};
module.exports = { deleteUser };
