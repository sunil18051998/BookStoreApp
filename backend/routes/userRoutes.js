const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create a new user (CREATE)
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all users (READ)
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a single user by ID (READ)
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a user by ID (UPDATE)
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a user by ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
