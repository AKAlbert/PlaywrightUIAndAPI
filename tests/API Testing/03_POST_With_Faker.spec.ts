import { test, expect } from "@playwright/test";
import postAPIRequest from '../../test-data/api_requests/POST_API_Request.json';

import { formatAPIRequest } from "../../src/utils/APIHelper";
import path from "path";
import fs from 'fs';
import { faker } from "@faker-js/faker";

test.use({
    baseURL: process.env.BASE_API_URL
});

test("Create POST API request using Dynamic file", async ({ request }) => {

    // Reading the json file 

    const filepath = path.join(__dirname, '../../test-data/api_requests/Dynamic_POST_API_Request.json');
    const jsonTemplate = fs.readFileSync(filepath, 'utf-8');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const price = faker.number.int({min: 1000, max: 10000});


    const values = [firstName, lastName, price];

    // Updating the POST API Request Body
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    // Create the Post Request
   const response =  await request.post(`/booking`, { data: JSON.parse(postAPIRequest) });
   console.log(response)
   const jsonResponse = await response.json();
   console.log('POST API Response ' + JSON.stringify(jsonResponse, null, 2));

   // Validations
   await expect(response.status()).toBe(200);
   await expect (response.statusText()).toBe('OK');
   await expect(response.headers()['content-type']).toContain('application/json');

   expect (jsonResponse.booking).toHaveProperty('firstname');
   expect (jsonResponse.booking).toHaveProperty('lastname');

   expect (jsonResponse.booking.firstname).toBe(firstName);
});

