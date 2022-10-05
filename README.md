# webhoot

The original developer was too lazy to accept my PRs, so I had to fork and make my own variation that does not depend on Express.

## Example

`src/index.ts`

```typescript
import { Activity } from 'webhoot'

export const twitter_activity = new Activity('<ENVIRONMENT-LABEL>', {
  consumerKey: '<CONSUMER-KEY>',
  consumerSecret: '<CONSUMER-SECRET>',
  token: '<ACCESS-TOKEN>',
  tokenSecret: '<ACCESS-TOKEN-SECRET>',
})

const handle_favorite_events = (event) => {
  for (const like of event.favorite_events) {
    console.log(
      `${like.user.screen_name} liked your tweet (${like.favorited_status.text})`
    )
  }
}

export const handler: Handler = async (event: LambdaFunctionURLEvent): Promise<APIGatewayProxyResultV2> => {
  if (event.requestContext.http.method === 'GET') {
    const response = twitter_activity.handle_crc(event.queryStringParameters!['crc_token'])
    return typeof response === 'string'
      ? { statusCode: 400, body: response }
      : { statusCode: 200, body: JSON.stringify(response) }
  }

  twitter_activity.onFavorite(handle_favorite_events)

  return twitter_activity.handle_post(event.body)
    ? { statusCode: 200, body: 'OK!' }
    : { statusCode: 400, body: 'Invalid request!' }
}
```

`src/register_webhook.ts`

```typescript
import { twitter_activity } from 'src/index.ts'

await twitter_activity.deleteAllWebhooks()
await twitter_activity.registerWebhook('<WEBHOOK_ENDPOINT>')
await twitter_activity.subscribe()
```
