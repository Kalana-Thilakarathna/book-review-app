const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const { rate, sote } = req.query;
  try {
    const filter = rate && rate !== "all" ? { rating: rate } : {};  
    const reviews = await Review.find(filter).sort(
      sote === "true" ? { createdAt: -1 } : {} 
    );
    res.status(200).json({ count: reviews.length, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error); 
    res.status(500).json({ message: "internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ data: review });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { bookTitle, author, rating, reviewText, date } = req.body;
    if (!bookTitle || !author || !reviewText || !rating || !date) {
      return res
        .status(400)
        .json({ message: "please send the all the required data" });
    }
    const review = new Review({
      bookTitle,
      author,
      rating,
      reviewText,
      date,
    });
    const newReview = await review.save();
    res.status(201).json({ message: "Review created", data: newReview });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const title = req.body.bookTitle;
    const author = req.body.author;
    const reviewText = req.body.reviewText;
    const date = req.body.date;
    const rating = req.body.rating;
    if (!title || !author || !reviewText || !rating || !date) {
      return res
        .status(400)
        .json({ message: "please send the all the required data" });
    } else {
      const results = await Review.findByIdAndUpdate(id, req.body);
      if (!results) {
        return res.status(404).json({ message: "review not found" });
      } else {
        return res.status(200).json({ message: "review updated successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/edit/delete/:id", async (req, res) => {
  if (req.params.id) {
    console.log("no id provided");
    {
      const results = await Review.findByIdAndDelete(req.params.id);
      console.log(results);
      if (!results) {
        return res.status(404).json({ message: "review not found" });
      }
      return res.status(200).json({ message: "review deleted successfully" });
    }
  }
});

module.exports = router;
