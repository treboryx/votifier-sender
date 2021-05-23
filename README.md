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
