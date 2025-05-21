import { expect, test } from "@playwright/test";
import tokenAPIRequest from "../../test-data/api_requests/Token_API_Request.json";
import patchAPIRequest from "../../test-data/api_requests/PATCH_API_Request.json";

import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";
import { de, faker } from "@faker-js/faker";

test.use({
    baseURL: process.env.BASE_API_URL,
});

test("Create DELETE API request using Playwrigt and Typescript",{tag: ['@PlaywrightAutomation']}, async ({
    request,
}) => {
    // Reading the json file

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const price = faker.number.int({ min: 1000, max: 10000 });

    const postAPIRequest = await getPOSTAPIRequestBody(
        firstName,
        lastName,
        price,
        true,
        "Lunch",
        "2025-10-20",
        "2025-10-27"
    );

    // Create the Post Request
    const response = await request.post(`/booking`, { data: postAPIRequest });
    console.log(response);
    const jsonResponse = await response.json();
    console.log("POST API Response " + JSON.stringify(jsonResponse, null, 2));

    // Validations
    await expect(response.status()).toBe(200);
    await expect(response.statusText()).toBe("OK");
    await expect(response.headers()["content-type"]).toContain(
        "application/json"
    );

    expect(jsonResponse.booking).toHaveProperty("firstname");
    expect(jsonResponse.booking).toHaveProperty("lastname");

    expect(jsonResponse.booking.firstname).toBe(firstName);

    // GET API request using the booking id

    const bookingId = jsonResponse.bookingid;
    console.log("Booking Id :" + bookingId);

    const getAPIResponse = await request.get(`/booking/${bookingId}`, {
        params: {
            firstname: firstName,
            lastname: lastName,
        },
    });

    // Validate status code
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe("OK");

    // Print response body
    // First we convert repsonse to json and assign variable name
    // null means no updating, 2 means the spacing

    const getAPIJSONResponse = await getAPIResponse.json();
    console.log(
        "GET API Response " + JSON.stringify(getAPIJSONResponse, null, 2)
    );

    // Generate Token
    const tokenAPIResponse = await request.post(`/auth`, {
        data: tokenAPIRequest,
    });
    expect(tokenAPIResponse.status()).toBe(200);
    expect(tokenAPIResponse.statusText()).toBe("OK");

    const tokenAPIJSONResponse = await tokenAPIResponse.json();

    const token = tokenAPIJSONResponse.token;
    console.log("Token :" + token);

    // Create the DELETE API Request
    const deleteAPIResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
        },
    });

    // Validate the status code and text
    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponse.statusText()).toBe("Created");

    console.log("DELETE API Response: " + (await deleteAPIResponse.body()));

    const getNewAPIResponse = await request.get(`/booking/${bookingId}`, {
        params: {
            firstname: firstName,
            lastname: lastName,
        },
    });

    // Validate status code
    expect(getNewAPIResponse.status()).toBe(404);
    expect(getNewAPIResponse.statusText()).toBe("Not Found");

});
