import { test, expect } from "@playwright/test";
import postAPIRequest from '../../test-data/api_requests/POST_API_Request.json'

test.use({
    baseURL: process.env.BASE_API_URL,
})

test("Create POST API request using Static file", async ({ request }) => {

   const response =  await request.post(`/booking`, { data: postAPIRequest });
   console.log(response)
   const jsonResponse = await response.json();
   console.log('POST API Response ' + JSON.stringify(jsonResponse, null, 2));

});
