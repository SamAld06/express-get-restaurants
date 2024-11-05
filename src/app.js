const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
app.use(express.json())
app.use(express.urlencoded())

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll({})
    res.json(allRestaurants)
})

app.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})

app.post("/restaurants", async (req, res) => {
    const restaurant = await Restaurant.create(req.body)
    res.json(restaurant)
})

app.put("/restaurants/:id", async (req, res) => {
    const updated = await Restaurant.update(req.body, {where: {id: req.params.id}})
    res.json(update)
})

app.delete("/restaurants/:id", async (req, res) => {
    const deleted = await Restaurant.destroy({where: {id: req.params.id},})
    res.json(deleted)
})


module.exports = app;