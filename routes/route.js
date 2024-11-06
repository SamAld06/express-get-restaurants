const Restaurant = require("../models/Restaurant.js")
const router = Router()
const {Router} = require("express")

router.get("/", async function (req, res) {
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
})
router.get("/:id", async function (req, res) {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})
router.post("/", async function (req, res) {
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
})
router.put("/", async function(req, res) {
    const newRest = await Restaurant.update(req.body,
        {where: {id: req.params.id}}
    )
    res.json(newRest)
})
routeer.delete("/:id", async function (req, res) {
    const restaurant = await Restaurant.destroy(
        {where: {id: req.params.id}}
    )
    res.json(restaurant)
})

module.exports = router;
