const Restaurant = require("../models/Restaurant.js")
const router = Router()
const {Router} = require("express")
const {check, validationResult} = require("express-validator")

router.get("/", async function (req, res) {
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
})
router.get("/:id", async function (req, res) {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})
router.post("/", [
    check ("name").notEmpty().trim().isLength({min: 10, max: 30}),
    check("location").notEmpty().trim(),
    check("cuisine").notEmpty().trim()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.json({error: errors.array})
    await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
})
router.put("/", async function(req, res) {
    const newRest = await Restaurant.update(req.body,
        {where: {id: req.params.id}}
    )
    res.json(newRest)
})
router.delete("/:id", async function (req, res) {
    const restaurant = await Restaurant.destroy(
        {where: {id: req.params.id}}
    )
    res.json(restaurant)
})

module.exports = router;
