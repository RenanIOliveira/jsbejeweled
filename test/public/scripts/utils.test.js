import * as utils from "../../../public/scripts/utils"

describe("random_int should return a int in the given range", () => {
    test("in range 1,10", () => {
        let randint = utils.random_int(1,10);
        expect(randint).toBeLessThan(11);
        expect(randint).toBeGreaterThan(0);
    });

    test("in range 1,2", () => {
        let randint = utils.random_int(1,2);
        expect(randint).toBeLessThan(3);
        expect(randint).toBeGreaterThan(0);
    });

    test("in range 1,1" ,()=>{
        let randint = utils.random_int(1,1);
        expect(randint).toBe(1);
    })
});


describe("random_gems should return the correct number of gems", () => {
    test("10 gems", () => {
        let gems = utils.random_gems(10,1,1);
        expect(gems.length).toBe(10);
    });

    test("1 gem", () => {
        let gems = utils.random_gems(1,100,150);
        expect(gems.length).toBe(1);
    });

    test("157 gems", () => {
        let gems = utils.random_gems(157,100,150);
        expect(gems.length).toBe(157);
    });

});


describe("random_gems should return only gems in the given range",() =>{
    test("in range 1,10", () => {
        let gems = utils.random_gems(10,1,10);

        gems.forEach(gem => {
            expect(gem).toBeLessThan(11);
            expect(gem).toBeGreaterThan(0);
        });
    });

    test("in range 1,2", () => {
        let gems = utils.random_gems(17,1,2);

        gems.forEach(gem => {
            expect(gem).toBeLessThan(3);
            expect(gem).toBeGreaterThan(0);
        });
    });

    test("in range 1,1", ()=>{
        let gems = utils.random_gems(7,1,1);

        gems.forEach(gem =>{
            expect(gem).toBe(1);
        })
    })
})

