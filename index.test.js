const app = require("./src/app.js")
const syncSeed = require("./seed.js")
const request = require("supertest")
const Restaurant = reqiure("./models.Restaurant.js")

describe("Testing GET /resturants,", () => {
    it("responds with the array of restaurants", async () => {

    })
    it("responds with a status code of 200", async () => {
        const status = await request(app).get("/restaurants")
        expect(response.statusCode).toBe(200)
    })
    it("returns the correct number of restaurants", async () => {
        const restaurants = await request(app).get("/restaurants")
        expect(restaurants.body.length).toEqual(restQuantity)
    })
    it("returns the correct restaurant data", async () => {

    })
})

it("GET /restaurants/:id", async () => {

})

it("POST /restaurants, request returns the updated with the new value", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({name: "Bento Boss", location: "Bristol", cuisine: "Aisan"})
    expect(restaurant.body.length).toEqual(restQuantity+1)
})

it("PUT /restaurants/:id", async () => {
    await request(app)
    .put("/restaurants/1")
    .send({name: "Bento Boss", location: "Bristol", cuisine: "Aisan"})
    const restaurant = await Restaurant.findByPk(1)
    expect(restaurant.name).toEqual("Bento Boss")
    expect(restaurant.location).toEqual("Bristol")
    expect(restaurant.cuisine).toEqual("Asian")
})

it("DELETE /restaurant/:id", async () => {
    await request(app).delete("/restaurants/1")
    const restaurants =await Restaurant.findAll()
    expect(restaurant.length).toEqual(restQuantity)
    expect(restaurants[0].id).not.toEqual(1)
})

