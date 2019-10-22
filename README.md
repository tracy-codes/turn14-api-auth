# Turn14 API Auth Provider

This package makes it easy to authenticate with Turn14's OAuth 2.0-based API. Their API requires you to provide a Client ID & Client Secret in exchange for a Bearer Token that you provide in the header of all requests. Their API is great, but the token they provide expires after ~ 3600 seconds (60 minutes), which means you either request a token just before each request you make, or you have a service that periodically renews a token that all your services can access.

### Usage:

- Please note that this module does return a Promise, so I recommend you use Async/Await to handle the Promise.
- When requiring this module, you may call it whatever you like. There is only 1 function that is exported and it's set to the default

```javascript
const turn14AuthProvider = require("turn14-api-auth");
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

async function run() {
  const bearerToken = turn14AuthProvider(client, clientSecret);
  console.log(`My Bearer Token is ${bearerToken}`);
}
```

The above function will output `My Bearer Token is 123456789abcdefghijklmnopqrstuvwxyz` where the last string will be your bearer token. You can move on to implementing this in any way you'd like.

### Real-World Example

The following function `getProductInventory` would be supplied with a correct Product ID from Turn14. From there, the function will perform the Oauth handshake with Turn14's API, then use the bearer token returned to make the GET request to the inventory API endpoint to get the product inventory for that specific product.

I would give more detail and a more accurate example, but Turn14 has specific information that I must keep private amongst dealers, so this is about as far in as I can go.

```javascript
const turn14AuthProvider = require("turn14-api-auth");
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const axios = require("axios");

async function getProductInventory(productId) {
  const bearerToken = await turn14AuthProvider(clientId, clientSecret);
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` }
  };
  const inventoryUrl = `https://api.turn14.com/v1/inventory/${productId}`;
  return await axios.get(inventoryUrl, config);
}
```

## Warnings
Please note, the Turn14 API does have a rate limit. Please read through Turn14's API Usage Policy for more details on the rate limits, as it is very important that you abide by them.

In my real world example above, you may notice that I am requesting a token within the `getProductInventory` function. This is great for an example or testing, but in the real world, you should have a separate function, or *service*, that runs in the background on a server somewhere out in the abyss of the *cloud*. This service should run periodically (my recommendation is once every 40-50 minutes) and insert the new bearer token into a database record. Every subsequent service you have running that makes requests to the Turn14 API should simply get that bearer token from your database and use that token, instead of obtaining a new token for each request. **This will surely get you rate limited/temporarily banned from using the Turn14 API**

## Roadmap

- Replace Axios package with native http module
- Provide useful error messages & codes
