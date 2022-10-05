# webhoot

The original developer was too lazy to accept my PRs, so I had to fork and make my own variation that does not depend on Express.

## 🗺️ Tutorial

### 1. ngrok

[download ngrok](https://ngrok.com/download) to your environment.

start http tunnel on port 5000 and copy `https://*.ngrok.io` url.

```shell
ngrok http 5000
```

### 2. Like detection

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
