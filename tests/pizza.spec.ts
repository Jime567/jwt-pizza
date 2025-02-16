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

