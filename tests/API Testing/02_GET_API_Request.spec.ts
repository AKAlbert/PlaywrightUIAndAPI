import {expect, test} from '@playwright/test';
import postResponse from '../../test-data/api_requests/POST_API_Request.json';

import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";
import { faker } from "@faker-js/faker";

test.use({
    baseURL: process.env.BASE_API_URL
});

test("Create POST API request using Dynamic file", async ({ request }) => {

    // Reading the json file 

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const price = faker.number.int({min: 1000, max: 10000});

    const postAPIRequest = await getPOSTAPIRequestBody(firstName, lastName, price, 
    true, "Lunch", "2025-10-20", "2025-10-27")

    // Updating the POST API Request Body
    // const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    // Create the Post Request
   const response =  await request.post(`/booking`, { data: (postAPIRequest) });
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

   const bookingId = jsonResponse.bookingid;
   console.log('Booking Id :' + bookingId)

   const getAPIResponse = await request.get(`/booking/${bookingId}`);

   // Validate status code
   expect (getAPIResponse.status()).toBe(200);
   expect (getAPIResponse.statusText()).toBe('OK');

   // Print response body
   // First we convert repsonse to json and assign variable name
   // null means no updating, 2 means the spacing

   const getAPIJSONResponse = await getAPIResponse.json();
   console.log('GET API Response ' + JSON.stringify(getAPIJSONResponse, null, 2));

});
