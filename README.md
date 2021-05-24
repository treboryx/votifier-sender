# votifier-sender
Proxy votifier through a Vercel hosted service

## Example

```javascript
const axios = require("axios");

const data = {
  settings: {
    key: "publicKey",
    host: "votifier-host",
    port: 1234,
    data: {
      user: "username",
      site: "url",
      addr: "host",
    },
  },
};

axios({
  method: "post",
  url: "https://votifier.vercel.app",
  data: JSON.stringify(data),
});

```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftreboryx%2Fvotifier-sender)
