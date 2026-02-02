const router = require("express").Router();
const ctrl = require("../controllers/channel.controller");

router.get("/channels", ctrl.getChannels);
router.get("/channels/categories", ctrl.getCategories);
router.get("/channels/:id", ctrl.getChannel);

router.post("/channels", ctrl.createChannel);
router.put("/channels/:id", ctrl.updateChannel);
router.delete("/channels/:id", ctrl.deleteChannel);
router.post("/channels/:id/view", ctrl.trackView);

module.exports = router;
