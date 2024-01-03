# Spheron SDK Demo

This application demonstrates how to use the [Spheron Compute SDK](https://docs.spheron.network/sdk/compute).

This can be used to get additional debug info for an instance or deployment.

Sign up for a [Spheron account here](https://app.spheron.network/#/signup).

## Development

Install deps:

```
npm install
```

### Run Instance and Deployment Debugging tool    

Open index.ts and update `instanceId` and/or `deploymentId`:
```
    /*
        Set these constants to get deployment info for your instance
     */
    const deploymentId: string = '6594d2fff7cb6100125d918d';
    const instanceId = '6594ba2cfcc39d0012b55895';
```

Then run the script to pull detailed data about your instance and deployment:
```
npx ts-node index.ts
```

## Support

- [Spheron Docs](https://docs.spheron.network/)
- [Spheron Discourse](https://community.spheron.network/latest)