const galleryCategoryModel = require("../../model/galleryCategory");
const galleryModel = require("../../model/gallery");

// ===== Gallery Category CRUD =====

// Add Gallery Category
exports.addGalleryCategory = async (req, res) => {
  try {
    const category = new galleryCategoryModel(req.body);
    await category.save();
    res.status(201).json({ message: "Category added", category });
  } catch (error) {
    res.status(500).json({ message: "Failed to add category", error });
  }
};

// Get All Gallery Categories
exports.getGalleryCategories = async (req, res) => {
  try {
    const categories = await galleryCategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to get categories", error });
  }
};

// Update Gallery Category
exports.updateGalleryCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await galleryCategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category updated", category: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
  }
};

// Delete Gallery Category
exports.deleteGalleryCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await galleryCategoryModel.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};

// ===== Gallery CRUD =====

// Add Gallery
exports.addGallery = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.image) {
      images = req.files.image.map((file) => file.filename);
    }
    console.log("Images:", images);
    

    const videoFile = req.files?.video?.[0]?.filename || null;

    const galleryData = {
      ...req.body,
      image: images,
      video: videoFile,
    };

    const gallery = new galleryModel(galleryData);
    await gallery.save();

    res.status(201).json({ message: "Gallery added", gallery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add gallery", error });
  }
};

// Update Gallery
exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    // Get existing gallery
    const existing = await galleryModel.findById(id);
    if (!existing)
      return res.status(404).json({ message: "Gallery not found" });

    // Process images
    let images = [];
    if (req.files && req.files.image) {
      images = req.files.image.map((file) => file.filename);
    } else {
      images = existing.image; // retain old images
    }

    // Process video
    let videoFile = existing.video; // default to existing
    if (req.files && req.files.video && req.files.video[0]) {
      videoFile = req.files.video[0].filename;
    }

    const updateData = {
      ...req.body,
      image: images,
      video: videoFile, // always include video, old or new
    };

    const updated = await galleryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Gallery updated", gallery: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update gallery", error });
  }
};


// Get All Galleries
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await galleryModel.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ message: "Failed to get galleries", error });
  }
};

// Delete Gallery
exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await galleryModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Gallery not found" });
    res.status(200).json({ message: "Gallery deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete gallery", error });
  }
};
