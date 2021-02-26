
import BasicIcon from "../../../public/scripts/BasicIcon.js";



var BasicIconContructorTestData =
    [{ IconType: 3 },
     { IconType: 2 },
     { IconType: null }];


describe.each(BasicIconContructorTestData)
    ("BasicIcon constructor should generate icon with the proper type", ({ IconType }) => {
        test("icon type should be " + IconType, () => {
            let icon = new BasicIcon(IconType);

            expect(icon.type).toBe(IconType);
        });
    });

var BasicIconEqualsTestData = [
    {
        type1: 1,
        type2: 1,
        expectedToBeEqual: true
    },
    {
        type1:1,
        type2:2,
        expectedToBeEqual:false,
    },
    {
        type1:1,
        type2:null,
        expectedToBeEqual:false,
    },
    {
        type1:0,
        type2:null,
        expectedToBeEqual:false,
    },
    {
        type1:null,
        type2:null,
        expectedToBeEqual:false,
    }
];

describe.each(BasicIconEqualsTestData)
    ("BasicIcon equals should proper compare initialized icon types", ({ type1,type2,expectedToBeEqual }) => {
        test("", () => {
            let icon1 = new BasicIcon(type1);
            let icon2 = new BasicIcon(type2);


            expect(icon1.equals(icon2)).toBe(expectedToBeEqual);
            expect(icon2.equals(icon1)).toBe(expectedToBeEqual);
        });
    });
