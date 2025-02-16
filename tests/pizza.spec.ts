import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
    await page.goto('/');

    expect(await page.title()).toBe('JWT Pizza');
});

test('Register New User', async ({ page }) => {
    // POST http://localhost:3000/api/auth
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = {
            "name": "Test",
            "email": "t@t.t",
            "password": "t"
        };

        const loginRes = {
            "user": {
                "name": "Test",
                "email": "t@t.t",
                "roles": [
                    {
                        "role": "diner"
                    }
                ],
                "id": 124
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImVtYWlsIjoidEB0LnQiLCJyb2xlcyI6W3sicm9sZSI6ImRpbmVyIn1dLCJpZCI6MTI0LCJpYXQiOjE3Mzk2ODAxMzZ9.wfgBzqa58ANbPc0agOQgwaelU6sTLOeNCPCL_r4HheE"
        };

        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Full name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Email address' }).fill('t@t.t');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('t');
    await page.getByRole('button', { name: 'Register' }).click();
});


test('Login User', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: "t@t.t", password: "t" }


        const loginRes = {
            "user": {
                "id": 4,
                "name": "Test",
                "email": "t@t.t",
                "roles": []
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRAdC50Iiwicm9sZXMiOltdLCJpYXQiOjE3Mzk2ODE3NjZ9.zTEXYTCEnmhgBmE5n8DBQev-rGynRaEq27N_GROobfE"
        };

        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.goto('http://localhost:5173/');

    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('t@t.t');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('t');
    await page.getByRole('button', { name: 'Login' }).click();
});

test('Order a Pizza', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
        const loginRes = [
            {
                "id": 1,
                "title": "Veggie",
                "image": "pizza1.png",
                "price": 0.0038,
                "description": "A garden of delight"
            },
            {
                "id": 2,
                "title": "Pepperoni",
                "image": "pizza2.png",
                "price": 0.0042,
                "description": "Spicy treat"
            },
            {
                "id": 3,
                "title": "Margarita",
                "image": "pizza3.png",
                "price": 0.0042,
                "description": "Essential classic"
            },
            {
                "id": 4,
                "title": "Crusty",
                "image": "pizza4.png",
                "price": 0.0028,
                "description": "A dry mouthed favorite"
            },
            {
                "id": 5,
                "title": "Charred Leopard",
                "image": "pizza5.png",
                "price": 0.0099,
                "description": "For those with a darker side"
            },
            {
                "id": 6,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 7,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 8,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 9,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 10,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 11,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 12,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 13,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 14,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 15,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 16,
                "title": "Test Item",
                "image": "image.png",
                "price": 9.99,
                "description": "Test Description"
            },
            {
                "id": 17,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 18,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 19,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 20,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 21,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 22,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 23,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 24,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 25,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 26,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 27,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 28,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 29,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 30,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 31,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 32,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 33,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 34,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 35,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 36,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 37,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 38,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 39,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 40,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 41,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 42,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 43,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 44,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 45,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 46,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 47,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 48,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 49,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 50,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 51,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 52,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 53,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 54,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 55,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 56,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 57,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 58,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 59,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 60,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 61,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 62,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 63,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 64,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 65,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            },
            {
                "id": 66,
                "title": "Pizza",
                "image": "image.jpg",
                "price": 9.99,
                "description": "Delicious pizza"
            }
        ];

        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const loginRes = [
            {
                "id": 3,
                "name": "Franchise",
                "stores": []
            },
            {
                "id": 14,
                "name": "Franchise_1738862221744",
                "stores": []
            },
            {
                "id": 17,
                "name": "Franchise_1738862327739",
                "stores": []
            },
            {
                "id": 19,
                "name": "Franchise_1738862392677",
                "stores": []
            },
            {
                "id": 20,
                "name": "Franchise_1738862392727",
                "stores": [
                    {
                        "id": 8,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 21,
                "name": "Franchise_1738862392762",
                "stores": []
            },
            {
                "id": 22,
                "name": "Franchise_1738862407762",
                "stores": []
            },
            {
                "id": 23,
                "name": "Franchise_1738862407843",
                "stores": [
                    {
                        "id": 10,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 24,
                "name": "Franchise_1738862407881",
                "stores": []
            },
            {
                "id": 25,
                "name": "Franchise_1738862420212",
                "stores": []
            },
            {
                "id": 26,
                "name": "Franchise_1738862420280",
                "stores": [
                    {
                        "id": 12,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 27,
                "name": "Franchise_1738862420318",
                "stores": []
            },
            {
                "id": 28,
                "name": "Franchise_1738862439125",
                "stores": []
            },
            {
                "id": 29,
                "name": "Franchise_1738862439205",
                "stores": [
                    {
                        "id": 14,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 30,
                "name": "Franchise_1738862439250",
                "stores": []
            },
            {
                "id": 31,
                "name": "Franchise_1738862498152",
                "stores": []
            },
            {
                "id": 32,
                "name": "Franchise_1738862498247",
                "stores": [
                    {
                        "id": 16,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 33,
                "name": "Franchise_1738862498291",
                "stores": []
            },
            {
                "id": 34,
                "name": "Franchise_1738862527292",
                "stores": []
            },
            {
                "id": 35,
                "name": "Franchise_1738862527458",
                "stores": [
                    {
                        "id": 18,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 36,
                "name": "Franchise_1738862527585",
                "stores": []
            },
            {
                "id": 37,
                "name": "Franchise_1738862543501",
                "stores": []
            },
            {
                "id": 38,
                "name": "Franchise_1738862543754",
                "stores": [
                    {
                        "id": 20,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 39,
                "name": "Franchise_1738862543784",
                "stores": []
            },
            {
                "id": 40,
                "name": "Franchise_1738862553904",
                "stores": []
            },
            {
                "id": 41,
                "name": "Franchise_1738862554005",
                "stores": [
                    {
                        "id": 22,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 42,
                "name": "Franchise_1738862554063",
                "stores": []
            },
            {
                "id": 43,
                "name": "Franchise_1738862562931",
                "stores": []
            },
            {
                "id": 44,
                "name": "Franchise_1738862563033",
                "stores": [
                    {
                        "id": 24,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 45,
                "name": "Franchise_1738862563064",
                "stores": []
            },
            {
                "id": 46,
                "name": "Franchise_1738862609987",
                "stores": []
            },
            {
                "id": 47,
                "name": "Franchise_1738862610079",
                "stores": [
                    {
                        "id": 26,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 48,
                "name": "Franchise_1738862610118",
                "stores": []
            },
            {
                "id": 49,
                "name": "Franchise_1738862681888",
                "stores": []
            },
            {
                "id": 50,
                "name": "Franchise_1738862681978",
                "stores": [
                    {
                        "id": 28,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 51,
                "name": "Franchise_1738862682013",
                "stores": []
            },
            {
                "id": 52,
                "name": "Franchise_1738862689335",
                "stores": []
            },
            {
                "id": 53,
                "name": "Franchise_1738862689430",
                "stores": [
                    {
                        "id": 30,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 54,
                "name": "Franchise_1738862689479",
                "stores": []
            },
            {
                "id": 55,
                "name": "Franchise_1738862706920",
                "stores": []
            },
            {
                "id": 56,
                "name": "Franchise_1738862707059",
                "stores": [
                    {
                        "id": 32,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 57,
                "name": "Franchise_1738862707100",
                "stores": []
            },
            {
                "id": 58,
                "name": "Franchise_1738862727549",
                "stores": []
            },
            {
                "id": 59,
                "name": "Franchise_1738862727640",
                "stores": [
                    {
                        "id": 34,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 60,
                "name": "Franchise_1738862727678",
                "stores": []
            },
            {
                "id": 61,
                "name": "Franchise_1738862742567",
                "stores": []
            },
            {
                "id": 62,
                "name": "Franchise_1738862742672",
                "stores": [
                    {
                        "id": 36,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 63,
                "name": "Franchise_1738862742702",
                "stores": []
            },
            {
                "id": 64,
                "name": "Franchise_1738862753463",
                "stores": []
            },
            {
                "id": 65,
                "name": "Franchise_1738862753566",
                "stores": [
                    {
                        "id": 38,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 66,
                "name": "Franchise_1738862753608",
                "stores": []
            },
            {
                "id": 67,
                "name": "Franchise_1738862792851",
                "stores": []
            },
            {
                "id": 68,
                "name": "Franchise_1738862792964",
                "stores": [
                    {
                        "id": 40,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 69,
                "name": "Franchise_1738862792998",
                "stores": []
            },
            {
                "id": 70,
                "name": "Franchise_1738862813676",
                "stores": []
            },
            {
                "id": 71,
                "name": "Franchise_1738862813794",
                "stores": [
                    {
                        "id": 42,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 72,
                "name": "Franchise_1738862813827",
                "stores": []
            },
            {
                "id": 73,
                "name": "Franchise_1738862828345",
                "stores": []
            },
            {
                "id": 74,
                "name": "Franchise_1738862828469",
                "stores": [
                    {
                        "id": 44,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 75,
                "name": "Franchise_1738862828507",
                "stores": []
            },
            {
                "id": 76,
                "name": "Franchise_1738862834802",
                "stores": []
            },
            {
                "id": 77,
                "name": "Franchise_1738862834939",
                "stores": [
                    {
                        "id": 46,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 78,
                "name": "Franchise_1738862834975",
                "stores": []
            },
            {
                "id": 79,
                "name": "Franchise_1738862844114",
                "stores": []
            },
            {
                "id": 80,
                "name": "Franchise_1738862844262",
                "stores": [
                    {
                        "id": 48,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 81,
                "name": "Franchise_1738862844296",
                "stores": []
            },
            {
                "id": 82,
                "name": "Franchise_1738863283037",
                "stores": []
            },
            {
                "id": 83,
                "name": "Franchise_1738863283178",
                "stores": [
                    {
                        "id": 50,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 84,
                "name": "Franchise_1738863283223",
                "stores": []
            },
            {
                "id": 85,
                "name": "Franchise_1738863305403",
                "stores": []
            },
            {
                "id": 86,
                "name": "Franchise_1738863305529",
                "stores": [
                    {
                        "id": 52,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 87,
                "name": "Franchise_1738863305568",
                "stores": []
            },
            {
                "id": 88,
                "name": "Franchise_1738863324370",
                "stores": []
            },
            {
                "id": 89,
                "name": "Franchise_1738863324524",
                "stores": [
                    {
                        "id": 54,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 90,
                "name": "Franchise_1738863324567",
                "stores": []
            },
            {
                "id": 91,
                "name": "Franchise_1738863336607",
                "stores": []
            },
            {
                "id": 92,
                "name": "Franchise_1738863336771",
                "stores": [
                    {
                        "id": 56,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 93,
                "name": "Franchise_1738863336814",
                "stores": []
            },
            {
                "id": 94,
                "name": "Franchise_1738863777640",
                "stores": []
            },
            {
                "id": 95,
                "name": "Franchise_1738863777797",
                "stores": [
                    {
                        "id": 58,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 96,
                "name": "Franchise_1738863777835",
                "stores": []
            },
            {
                "id": 97,
                "name": "Franchise_1738863836151",
                "stores": []
            },
            {
                "id": 98,
                "name": "Franchise_1738863836287",
                "stores": [
                    {
                        "id": 60,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 99,
                "name": "Franchise_1738863836320",
                "stores": []
            },
            {
                "id": 100,
                "name": "Franchise_1738864059891",
                "stores": [
                    {
                        "id": 62,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 101,
                "name": "Franchise_1738864059930",
                "stores": []
            },
            {
                "id": 102,
                "name": "Franchise_1738864084693",
                "stores": [
                    {
                        "id": 64,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 103,
                "name": "Franchise_1738864128818",
                "stores": [
                    {
                        "id": 65,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 104,
                "name": "Franchise_1738864128853",
                "stores": []
            },
            {
                "id": 105,
                "name": "Franchise_1738864188815",
                "stores": []
            },
            {
                "id": 106,
                "name": "Franchise_1738864189150",
                "stores": [
                    {
                        "id": 67,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 107,
                "name": "Franchise_1738864189185",
                "stores": []
            },
            {
                "id": 108,
                "name": "Franchise_1738864199170",
                "stores": []
            },
            {
                "id": 109,
                "name": "Franchise_1738864199517",
                "stores": [
                    {
                        "id": 69,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 110,
                "name": "Franchise_1738864199730",
                "stores": []
            },
            {
                "id": 111,
                "name": "Franchise_1738865935017",
                "stores": []
            },
            {
                "id": 112,
                "name": "Franchise_1738865935357",
                "stores": [
                    {
                        "id": 71,
                        "name": "Store"
                    }
                ]
            },
            {
                "id": 113,
                "name": "Franchise_1738865935559",
                "stores": []
            }
        ];

        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: "t@t.t", password: "t" }


        const loginRes = {
            "user": {
                "id": 4,
                "name": "Test",
                "email": "t@t.t",
                "roles": []
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRAdC50Iiwicm9sZXMiOltdLCJpYXQiOjE3Mzk2ODE3NjZ9.zTEXYTCEnmhgBmE5n8DBQev-rGynRaEq27N_GROobfE"
        };

        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
        const loginReq = { "items": [{ "menuId": 1, "description": "Veggie", "price": 0.0038 }, { "menuId": 2, "description": "Pepperoni", "price": 0.0042 }], "storeId": "8", "franchiseId": 20 };


        const loginRes = {
            "order": {
                "items": [
                    {
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ],
                "storeId": "8",
                "franchiseId": 20,
                "id": 63
            },
            "jwt": "eyJpYXQiOjE3Mzk2ODMwOTcsImV4cCI6MTczOTc2OTQ5NywiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJqYW1lc3A0MCIsIm5hbWUiOiJKYW1lcyBQaGVscHMifSwiZGluZXIiOnsiaWQiOjQsIm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0QHQudCJ9LCJvcmRlciI6eyJpdGVtcyI6W3sibWVudUlkIjoxLCJkZXNjcmlwdGlvbiI6IlZlZ2dpZSIsInByaWNlIjowLjAwMzh9LHsibWVudUlkIjoyLCJkZXNjcmlwdGlvbiI6IlBlcHBlcm9uaSIsInByaWNlIjowLjAwNDJ9XSwic3RvcmVJZCI6IjgiLCJmcmFuY2hpc2VJZCI6MjAsImlkIjo2M319.PRb_BZrAuZ1j-3ee7YQcpbNL_l44mD052EAqEefW0cBE5EDj10xduDpzZBDYUHHXehv0VnEqSCMke6sBWOjnxIw3uW2AU6Y7HkQBTWzkBq6J4xh0SQpEU3kE1St2IvVFP-9aaMKfuYtOIrOg302fs_89ukKwQkbC6Qe0z6DJ7VRz_fJOlsRQR5JgfpwV0Qom4znQyvD60BQz-y6h4FD4RWHkxGqfXsUgqdq0Ng2EIXUVsW82HEi1ixiRgB_KZYLiNHyt02Sr4KLXoMYgyCg3jgmkZyD4gRYyRHnlHxbAo8U83IIxOjKjMxlZIyDtbvCmAmf6oSArp_nKajLKj3R43R5l5uQDI3qOMQWsubbYH6PsitFrOqCMzAOXXPW2eBGzy1SrTFJ7Vfi8iDMY5DFdeQqH1Zat6ckzybygnrvFdF34TpQfm7jM1uSO9nI2i1v56dJ-JfWz4a1p8EYVOBWMD6hjOEBWm1xQZc6BDZPcZ47l126WesYOf-XygXpQZM7M9GvfPENTf1vmLFIGiQDPGd_eQApbDegLJtpnn1RGHYzG3ItVCxuaBKZD4PFbrdG0LxG-mHiz1eGJ0qhKWA4a2IUmLGnLJkXWAYY__NsAXFy51pjdd5j8AweCw9sNJN4U50Xz6Oom5Q8y8VmutLQ2nsXs9UjryVpXBe25Zky5VeU"
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order/verify', async (route) => {
        const loginReq = { "jwt": "eyJpYXQiOjE3Mzk2ODMwOTcsImV4cCI6MTczOTc2OTQ5NywiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJqYW1lc3A0MCIsIm5hbWUiOiJKYW1lcyBQaGVscHMifSwiZGluZXIiOnsiaWQiOjQsIm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0QHQudCJ9LCJvcmRlciI6eyJpdGVtcyI6W3sibWVudUlkIjoxLCJkZXNjcmlwdGlvbiI6IlZlZ2dpZSIsInByaWNlIjowLjAwMzh9LHsibWVudUlkIjoyLCJkZXNjcmlwdGlvbiI6IlBlcHBlcm9uaSIsInByaWNlIjowLjAwNDJ9XSwic3RvcmVJZCI6IjgiLCJmcmFuY2hpc2VJZCI6MjAsImlkIjo2M319.PRb_BZrAuZ1j-3ee7YQcpbNL_l44mD052EAqEefW0cBE5EDj10xduDpzZBDYUHHXehv0VnEqSCMke6sBWOjnxIw3uW2AU6Y7HkQBTWzkBq6J4xh0SQpEU3kE1St2IvVFP-9aaMKfuYtOIrOg302fs_89ukKwQkbC6Qe0z6DJ7VRz_fJOlsRQR5JgfpwV0Qom4znQyvD60BQz-y6h4FD4RWHkxGqfXsUgqdq0Ng2EIXUVsW82HEi1ixiRgB_KZYLiNHyt02Sr4KLXoMYgyCg3jgmkZyD4gRYyRHnlHxbAo8U83IIxOjKjMxlZIyDtbvCmAmf6oSArp_nKajLKj3R43R5l5uQDI3qOMQWsubbYH6PsitFrOqCMzAOXXPW2eBGzy1SrTFJ7Vfi8iDMY5DFdeQqH1Zat6ckzybygnrvFdF34TpQfm7jM1uSO9nI2i1v56dJ-JfWz4a1p8EYVOBWMD6hjOEBWm1xQZc6BDZPcZ47l126WesYOf-XygXpQZM7M9GvfPENTf1vmLFIGiQDPGd_eQApbDegLJtpnn1RGHYzG3ItVCxuaBKZD4PFbrdG0LxG-mHiz1eGJ0qhKWA4a2IUmLGnLJkXWAYY__NsAXFy51pjdd5j8AweCw9sNJN4U50Xz6Oom5Q8y8VmutLQ2nsXs9UjryVpXBe25Zky5VeU" };

        const loginRes = {
            "message": "valid",
            "payload": {
                "vendor": {
                    "id": "jamesp40",
                    "name": "James Phelps"
                },
                "diner": {
                    "id": 4,
                    "name": "Test",
                    "email": "t@t.t"
                },
                "order": {
                    "items": [
                        {
                            "menuId": 1,
                            "description": "Veggie",
                            "price": 0.0038
                        },
                        {
                            "menuId": 2,
                            "description": "Pepperoni",
                            "price": 0.0042
                        }
                    ],
                    "storeId": "8",
                    "franchiseId": 20,
                    "id": 63
                }
            }
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Order' }).click();
    await page.getByRole('combobox').selectOption('8');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('t@t.t');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('t');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForNavigation();
    await page.getByRole('button', { name: 'Pay now' }).click();
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
});


test('User Profile and Nav', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { "email": "t@t.t", "password": "t" }


        const loginRes = {
            "user": {
                "id": 4,
                "name": "Test",
                "email": "t@t.t",
                "roles": []
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRAdC50Iiwicm9sZXMiOltdLCJpYXQiOjE3Mzk2ODYxNjZ9.hxmF_r2GsHWujAYQ7Y-_evOZ3WVjH7VyXUpLI_PUck4"
        };

        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
    const loginReq = {
        "dinerId": 4,
        "orders": [
            {
                "id": 53,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:02:04.000Z",
                "items": [
                    {
                        "id": 53,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 54,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 54,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:10:07.000Z",
                "items": [
                    {
                        "id": 55,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 56,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 55,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:10:54.000Z",
                "items": [
                    {
                        "id": 57,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 58,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 56,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:12:50.000Z",
                "items": [
                    {
                        "id": 59,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 60,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 57,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:12:57.000Z",
                "items": [
                    {
                        "id": 61,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 62,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 58,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:13:41.000Z",
                "items": [
                    {
                        "id": 63,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 64,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 59,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:14:12.000Z",
                "items": [
                    {
                        "id": 65,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    }
                ]
            },
            {
                "id": 60,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:14:25.000Z",
                "items": [
                    {
                        "id": 66,
                        "menuId": 6,
                        "description": "Test Item",
                        "price": 9.99
                    }
                ]
            },
            {
                "id": 61,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:15:54.000Z",
                "items": [
                    {
                        "id": 67,
                        "menuId": 6,
                        "description": "Test Item",
                        "price": 9.99
                    }
                ]
            },
            {
                "id": 62,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:16:33.000Z",
                "items": [
                    {
                        "id": 68,
                        "menuId": 6,
                        "description": "Test Item",
                        "price": 9.99
                    }
                ]
            }
        ],
        "page": 1
    };

    const loginRes = {
        "dinerId": 4,
        "orders": [
            {
                "id": 53,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:02:04.000Z",
                "items": [
                    {
                        "id": 53,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 54,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 54,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:10:07.000Z",
                "items": [
                    {
                        "id": 55,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 56,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 55,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:10:54.000Z",
                "items": [
                    {
                        "id": 57,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 58,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 56,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:12:50.000Z",
                "items": [
                    {
                        "id": 59,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 60,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 57,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:12:57.000Z",
                "items": [
                    {
                        "id": 61,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 62,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 58,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:13:41.000Z",
                "items": [
                    {
                        "id": 63,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    },
                    {
                        "id": 64,
                        "menuId": 2,
                        "description": "Pepperoni",
                        "price": 0.0042
                    }
                ]
            },
            {
                "id": 59,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:14:12.000Z",
                "items": [
                    {
                        "id": 65,
                        "menuId": 1,
                        "description": "Veggie",
                        "price": 0.0038
                    }
                ]
            },
            {
                "id": 60,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:14:25.000Z",
                "items": [
                    {
                        "id": 66,
                        "menuId": 6,
                        "description": "Test Item",
                        "price": 9.99
                    }
                ]
            },
            {
                "id": 61,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:15:54.000Z",
                "items": [
                    {
                        "id": 67,
                        "menuId": 6,
                        "description": "Test Item",
                        "price": 9.99
                    }
                ]
            },
            {
                "id": 62,
                "franchiseId": 20,
                "storeId": 8,
                "date": "2025-02-16T05:16:33.000Z",
                "items": [
                    {
                        "id": 68,
                        "menuId": 6,
                        "description": "Test Item",
                        "price": 9.99
                    }
                ]
            }
        ],
        "page": 1
    };
        expect(route.request().method()).toBe('GET');
        expect(route.request().url()).toContain('/api/order');
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/4', async (route) => {
        const loginRes: any[] = [];

        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    


    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('t@t.t');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('t');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'T', exact: true }).click();
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('link', { name: 'About' }).click();
    await page.getByRole('link', { name: 'History' }).click();


});

test('Login and Logout', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { "email": "t@t.t", "password": "t" }

        if (route.request().method() === 'PUT') {
            const loginRes = {
                "user": {
                    "id": 4,
                    "name": "Test",
                    "email": "t@t.t",
                    "roles": []
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRAdC50Iiwicm9sZXMiOltdLCJpYXQiOjE3Mzk2ODYxNjZ9.hxmF_r2GsHWujAYQ7Y-_evOZ3WVjH7VyXUpLI_PUck4"
            };

            expect(route.request().method()).toBe('PUT');
            expect(route.request().postDataJSON()).toMatchObject(loginReq);
            await route.fulfill({ json: loginRes });
        }
        if (route.request().method() === 'DELETE') {
            expect(route.request().method()).toBe('DELETE');
            await route.fulfill({ status: 200 });
        }
    });
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('t@t.t');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('t');
    await page.getByRole('textbox', { name: 'Password' });
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
  });


test('Login Admin User and Create and Delete Store', async ({ page }) => {

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { "email": "a@jwt.com", "password": "admin" }


        const loginRes = {
            "user": {
                "id": 4,
                "name": "Test",
                "email": "t@t.t",
                "roles": []
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRlc3QiLCJlbWFpbCI6InRAdC50Iiwicm9sZXMiOltdLCJpYXQiOjE3Mzk2ODYxNjZ9.hxmF_r2GsHWujAYQ7Y-_evOZ3WVjH7VyXUpLI_PUck4"
        };

        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/4', async (route) => {
        const loginRes = [{"id":82,"name":"Franchise_1738863283037","admins":[{"id":4,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":77,"name":"name","totalRevenue":0}]},{"id":83,"name":"Franchise_1738863283178","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":50,"name":"Store","totalRevenue":0}]},{"id":84,"name":"Franchise_1738863283223","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":85,"name":"Franchise_1738863305403","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":86,"name":"Franchise_1738863305529","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":52,"name":"Store","totalRevenue":0}]},{"id":87,"name":"Franchise_1738863305568","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":88,"name":"Franchise_1738863324370","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":89,"name":"Franchise_1738863324524","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":54,"name":"Store","totalRevenue":0}]},{"id":90,"name":"Franchise_1738863324567","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":91,"name":"Franchise_1738863336607","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":92,"name":"Franchise_1738863336771","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":56,"name":"Store","totalRevenue":0}]},{"id":93,"name":"Franchise_1738863336814","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":94,"name":"Franchise_1738863777640","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":95,"name":"Franchise_1738863777797","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":58,"name":"Store","totalRevenue":0}]},{"id":96,"name":"Franchise_1738863777835","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":97,"name":"Franchise_1738863836151","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":98,"name":"Franchise_1738863836287","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":60,"name":"Store","totalRevenue":0}]},{"id":99,"name":"Franchise_1738863836320","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":100,"name":"Franchise_1738864059891","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":62,"name":"Store","totalRevenue":0}]},{"id":101,"name":"Franchise_1738864059930","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":102,"name":"Franchise_1738864084693","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":64,"name":"Store","totalRevenue":0}]},{"id":103,"name":"Franchise_1738864128818","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":65,"name":"Store","totalRevenue":0}]},{"id":104,"name":"Franchise_1738864128853","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":105,"name":"Franchise_1738864188815","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":106,"name":"Franchise_1738864189150","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":67,"name":"Store","totalRevenue":0}]},{"id":107,"name":"Franchise_1738864189185","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":108,"name":"Franchise_1738864199170","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":109,"name":"Franchise_1738864199517","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":69,"name":"Store","totalRevenue":0}]},{"id":110,"name":"Franchise_1738864199730","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":111,"name":"Franchise_1738865935017","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]},{"id":112,"name":"Franchise_1738865935357","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[{"id":71,"name":"Store","totalRevenue":0}]},{"id":113,"name":"Franchise_1738865935559","admins":[{"id":28,"name":"Admin User","email":"a@jwt.com"}],"stores":[]}];

        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
    });

    ///api/franchise/82/store
    await page.route('*/**/api/franchise/82/store', async (route) => {
        const loginReq = {"id":"","name":"test"};


        const loginRes = {"id":80,"franchiseId":82,"name":"test"};

        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/82/store/80', async (route) => {


        const loginRes = {"message":"store deleted"};

        expect(route.request().method()).toBe('DELETE');
        await route.fulfill({ json: loginRes });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('test');
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    // await page.getByRole('link', { name: 'Logout' }).click();
    // await page.getByRole('link', { name: 'Logout' }).click();
  });

  test('Not Found', async ({ page }) => {
    await page.goto('http://localhost:5173/test');
  });


  test('Docs Exists...', async ({ page }) => {
    await page.goto('http://localhost:5173/docs');
  });