// Shared helpers for the Create and Edit recipe forms.

export const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

const maxImageSize = 5 * 1024 * 1024;

const isWholeNumberBetween = (value, min, max) => {
  const number = Number(value);

  return value !== "" && Number.isInteger(number) && number >= min && number <= max;
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

// hasCurrentImage: when editing, the recipe may keep its existing image without a new upload.
export function validateRecipe(values, imageFile, isFileUpload, hasCurrentImage = false) {
  const errors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length < 3 || title.length > 60) {
    errors.title = "Title must be between 3 and 60 characters.";
  }

  if (values.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  if (!categories.includes(values.category)) {
    errors.category = "Please choose a category.";
  }

  if (!isWholeNumberBetween(values.prepTime, 1, 1440)) {
    errors.prepTime = "Time must be a whole number between 1 and 1440 minutes.";
  }

  if (!isWholeNumberBetween(values.servings, 1, 50)) {
    errors.servings = "Servings must be a whole number between 1 and 50.";
  }

  if (!values.ingredients.trim()) {
    errors.ingredients = "Add at least one ingredient.";
  }

  if (!values.instructions.trim()) {
    errors.instructions = "Add at least one instruction step.";
  }


  if (isFileUpload) {
    if (!imageFile) {
      if (!hasCurrentImage) {
        errors.image = "Please choose an image.";
      }
    } else if (!imageFile.type.startsWith("image/")) {
      errors.image = "The file must be an image.";
    } else if (imageFile.size > maxImageSize) {
      errors.image = "The image must be 5 MB or smaller.";
    }
  } else if (!isValidUrl(values.imageUrl.trim())) {
    errors.image = "Please enter a valid image URL (http or https).";
  }

  return errors;
}
