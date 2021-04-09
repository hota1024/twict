<h1 align="center">🐦 twict</h1>
<h2 align="center">A library for Twitter Account Activity API written in TypeScript</h2>

## 🚀 Installation

```shell
yarn add twict
# or
npm install twict
```

## 🗺️ Tutorial

### 1. Install twict

```shell
yarn add twict
# or
npm install twict
```

### 2. ngrok

[download ngrok](https://ngrok.com/download) to your environment.

start http tunnel on port 5000 and copy `https://*.ngrok.io` url.

```shell
ngrok http 5000
```

### 3. Like detection

```typescript
// like-detection.ts
import { Activity, isExpectEventType } from 'twict'

async function main() {
  const activity = new Activity('your environment label', {
    consumerKey: 'your consumer key',
    consumerSecret: 'your consumer secret',
    token: 'your access token',
    tokenSecret: 'your access token secret',
  })

  activity.onEvent((event) => {
    if (isExpectEventType(event, 'favorite_events')) {
      for (const like of event.favorite_events) {
        console.log(
          `${like.user.screen_name} liked your tweet (${like.favorited_status.text})`
        )
      }
    }
  })

  await activity.listen(5000)

  await activity.deleteAllWebhooks()
  await activity.registerWebhook('your ngrok url here')
  await activity.subscribe()
}

main()

```

and run with ts-node.

```shell
npx ts-node like-detection.ts
```
