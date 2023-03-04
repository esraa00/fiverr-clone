const { Gig } = require("../models");
const createGig = async (req, res) => {
  try {
    const gig = new Gig({
      ...req.body,
      userId: req.userId,
    });
    const createdGig = await gig.save();
    res.status(201).send(createdGig);
  } catch (error) {
    res.send(error);
  }
};

const deleteGig = async (req, res) => {
  try {
    const gigToBeDeleted = await Gig.findById(req.params.id);
    if (!gigToBeDeleted)
      return res.status(404).send("this resource is already deleted");
    if (gigToBeDeleted.userId !== req.userId)
      return res
        .status(403)
        .send("you don't have permission to perform this action");
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted successfully");
  } catch (error) {
    res.send(error);
  }
};

const getAllGigs = async (req, res) => {};
const getGig = async (req, res) => {};
module.exports = { createGig, getAllGigs, deleteGig, getGig };
