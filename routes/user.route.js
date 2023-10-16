const express = require("express");
const router = express.Router();
const multer = require("multer");

var userController = require("../controller/userController");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, "public/images");
        } else {
            cb(new Error("Not image"), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, "upload" + Date.now() + ".jpg");
    },
});
const upload = multer({ storage: storage });

router.get("/", userController.getUser);
router.post("/loadinfouser", userController.getInfoUser);
router.post("/changePassword", userController.changePassword);
router.post("/updateinfouser", userController.updateInfoUser);
router.post("/getBills", userController.getBills);
router.post("/getDetailBills", userController.getDetailBills);
router.post("/uploadImage", upload.single("imageUser"), userController.updateImage);

module.exports = router;
