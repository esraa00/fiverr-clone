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
const getAllGigs = async (req, res) => {};
const deleteGig = async (req, res) => {};
const getGig = async (req, res) => {};
module.exports = { createGig, getAllGigs, deleteGig, getGig };
