// // // const router = require("express").Router();
// // // const ctrl = require("../controllers/channel.controller");

// // // router.get("/channels", ctrl.getChannels);
// // // router.get("/channels/categories", ctrl.getCategories);
// // // router.get("/channels/:id", ctrl.getChannel);

// // // router.post("/channels", ctrl.createChannel);
// // // router.put("/channels/:id", ctrl.updateChannel);
// // // router.delete("/channels/:id", ctrl.deleteChannel);
// // // router.post("/channels/:id/view", ctrl.trackView);

// // // module.exports = router;
// // const router = require("express").Router();
// // const ctrl = require("../controllers/channel.controller");

// // router.get("/channels", ctrl.getChannels);
// // router.get("/channels/categories", ctrl.getCategories);
// // router.get("/channels/:id", ctrl.getChannel);

// // router.post("/channels", ctrl.createChannel);
// // router.put("/channels/:id", ctrl.updateChannel);
// // router.delete("/channels/:id", ctrl.deleteChannel);
// // router.post("/channels/:id/view", ctrl.trackView);

// // module.exports = router;
// const router = require("express").Router();
// const ctrl = require("../controllers/channel.controller");

// router.get("/channels", ctrl.getChannels);
// router.get("/channels/categories", ctrl.getCategories);
// router.get("/channels/:id", ctrl.getChannel);

// /* CRUD */
// router.post("/channels", ctrl.createChannel);
// router.put("/channels/:id", ctrl.updateChannel);
// router.delete("/channels/:id", ctrl.deleteChannel);

// /* viewers */
// router.post("/channels/:id/view", ctrl.trackView);

// /* 🔥 STREAM PROXY */
// router.get("/channels/:id/stream", ctrl.getStream);

// module.exports = router;
const router = require("express").Router();
const ctrl = require("../controllers/channel.controller");

/* CHANNELS */
router.get("/channels", ctrl.getChannels);
router.get("/channels/:id", ctrl.getChannel);

/* CRUD */
router.post("/channels", ctrl.createChannel);
router.put("/channels/:id", ctrl.updateChannel);
router.delete("/channels/:id", ctrl.deleteChannel);

/* VIEW COUNT */
router.post("/channels/:id/view", ctrl.trackView);

/* STREAM PROXY */
router.get("/channels/:id/stream", ctrl.getStream);

module.exports = router;
