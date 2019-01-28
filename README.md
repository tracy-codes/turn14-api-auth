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
  const bearerToken = turn14AuthProvider(clietnId, clientSecret);
  console.log(`My Bearer Token is ${bearerToken}`);
}
```

The following function will output `My Bearer Token is 123456789abcdefghijklmnopqrstuvwxyz` where the last string will be your bearer token. You can move on to implementing this in any way you'd like.

### Real-World Example

- TODO: Write this real-world example

## Roadmap

- Replace Axios package with native http module
- Provide useful error messages & codes
