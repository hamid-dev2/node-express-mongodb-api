const { Router } = require('express');
const router = Router()
const {
    signup,
    login,
    getAll,
    getById,
    updateById,
    deleteById,
    deleteAll
} = require('../controllers/users-controller');
const auth = require('../middlewares/auth-middleware');
const { check } = require('express-validator');

router.post('/auth/signup', [ check("email").isEmail(), check("password").isLength({ min : 8 }) ] , signup)
router.post('/auth/login', login)
router.get("/", getAll)
router.get("/:userId", getById)
router.use(auth)
router.patch("/:userId", updateById)
router.delete("/:userId", deleteById)
router.delete("/", deleteAll)

module.exports = router