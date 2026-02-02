const router = require("express").Router();
const ctrl = require("../controllers/category.controller");

router.get("/categories", ctrl.getCategories);
router.post("/categories", ctrl.createCategory);
router.put("/categories/:id", ctrl.updateCategory); // 👈 EDIT
router.delete("/categories/:id", ctrl.deleteCategory);

module.exports = router;
