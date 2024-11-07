const app = require("./src/app.js")
const syncSeed = require("./seed.js")
const request = require("supertest")
const Restaurant = reqiure("./models.Restaurant.js")

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll();
    restQuantity = restaurants.length;
});

describe("Testing GET /resturants,", () => {
    it("responds with the array of restaurants", async () => {
        const restaurants = await request(app).get("/restaurants")
        expect(restaurants.body).toEqual({
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood'
          },
          {
            name: 'LittleSheep',
            location: 'Dallas',
            cuisine: 'Hotpot'
          },
          {
            name: 'Spice Grill',
            location: 'Houston',
            cuisine: 'Indian'
          })
    })
    it("responds with a status code of 200", async () => {
        const status = await request(app).get("/restaurants")
        expect(status.statusCode).toBe(200)
    })
    it("returns the correct number of restaurants", async () => {
        const restaurants = await request(app).get("/restaurants")
        expect(restaurants.body.length).toEqual(restQuantity)
    })
    it("returns the correct restaurant data", async () => {
        const restaurant = await request(app).get("/restaurants")
        expect(restaurant.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        )
    })
})

it("GET /restaurants/:id", async () => {
    const restaurant = await request(app).get("/restaurants/2")
    expect(restaurant.body).toEqual(
        expect.objectContaining({
            id: 2,
            name: 'LittleSheep',
            location: 'Dallas',
            cuisine: 'Hotpot'
        })
    )
})

describe("POST /restaurants, ", () => {

    it("request returns the updated with the new value", async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({name: "Bento Boss", location: "Bristol", cuisine: "Asian"})
        expect(restaurant.body.length).toEqual(restQuantity+1)
    })

    it("returns error when name is empty", async () => {
        const status = await request(app)
        .post("/restaurants")
        .send({location: "Bristol", cuisine: "Asian"})
        expect(status.body).toHavePropety("error")
        expect(Array.isArray(status.body.error)).toBe(true)
    })

    it("returns error when locatiojn is empty", async () => {
        const status = await request(app)
        .post("/restaurants")
        .send({name: "Bento Boss", cuisine: "Asian"})
        expect(status.body).toHavePropety("error")
        expect(Array.isArray(status.body.error)).toBe(true)
    })

    it("returns error when cuisine is empty", async () => {
        const status = await request(app)
        .post("/restaurants")
        .send({name: "Bento Boss", location: "Bristol"})
        expect(status.body).toHavePropety("error")
        expect(Array.isArray(status.body.error)).toBe(true)
    })
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

