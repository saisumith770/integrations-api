# Integrations API

This is an api to connect to various plaforms like twitch, youtube and many more. More integrations are yet to come. This is a follow up api for my other project called API buisiness logic which is a restful api for user to create accounts and perform general activities on the platform. This api will allow users to connect their accounts and allow us to provide them with extra benifits.

---

## Dependencies

- axios
- cookie-parser
- cors
- express
- express-rate-limit
- helmet
- joi
- jsonwebtoken

---

## Security

> Same implementation as the api-buisiness-logic project

---

## How to setup

```
git clone https://github.com/sai-web/integrations-api.git
npm run dev
```

### extra steps

- write a .env file with the environment variables from config/environment_variables.ts

---

## Twitch Endpoints `` /twitch ``
### Auth `` /auth ``
```
/connect :- provide authorization code and user id
/disconnect :- provide access token and user id
/update :- provide user id
/validation :- provide access token
```

### App `` /extension ``
```
/subscribe :- provide hub topic, twitch_user_id, access token
/unsubscribe :- provide hub topic, twitch user id, access token
```

## Youtube Endpoints `` /youtube ``
### Auth `` /auth ``
```

```

### App `` /app ``
```

```

## Upcoming
- Discord integration 
- Spotify integration
- Twitter integration

## Contribute

[![Join Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/n9rVDZh)