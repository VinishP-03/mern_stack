const express = require("express");
const Budget = require("../models/Budget");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD BUDGET
router.post("/", auth, async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET BUDGETS
router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE BUDGET
router.put("/:id", auth, async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE BUDGET
router.delete("/:id", auth, async (req, res) => {
  try {
    await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
