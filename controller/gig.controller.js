const { Gig, Category } = require("../models");
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

const getAllGigs = async (req, res) => {
  const query = req.query;
  try {
    const category = await Category.findOne({ category: query.category });
    if (!category)
      return res.status(404).send("there's no category with that name");
    const filters = {
      categoryId: category.id,
    };
    const gigs = await Gig.find(filters);
    res.status(200).send(gigs);
  } catch (error) {
    res.send(error);
  }
};

const getGig = async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).send("there's no gig with this id");
  res.status(200).send(gig);
};
module.exports = { createGig, getAllGigs, deleteGig, getGig };
