import {config as loadEnv} from 'dotenv';
import SpheronClient, {Instance, InstanceLogType, Organization, SpheronClientConfiguration} from "@spheron/compute";

loadEnv();

declare var process: {
    env: {
        SPHERON_TOKEN: string
    }
};

module.exports = (async function () {

    const spheronClientConfiguration: SpheronClientConfiguration = {token: process.env.SPHERON_TOKEN};
    const client: SpheronClient = new SpheronClient(spheronClientConfiguration);

    /*
        Set these constants to get deployment info for your instance
     */
    const deploymentId: string = '65954649fcc39d0012b5a735';
    const instanceId: string = '659545e0f7cb6100125dcb88';

    const org: Organization = await client.organization.get();
    console.log("Org ID: " + org.id);
    console.log("Org Name: " + org.profile.name);

    console.log("\nClusters\n");
    const clusters = await client.organization.getClusters({
        skip: 0,
        limit: 10
    });

    clusters.forEach(cluster => {
        console.log("Cluster ID: " + cluster.id);
        console.log("Cluster URL: " + cluster.url);
    });

    console.log("\nInstance & Deployment Info\n");
    const instance: Instance = await client.instance.get(instanceId);

    console.log("Instance name: " + instance.name);

    instance.deployments.forEach((deployment, index) => {
        console.log(`Deployment ${index} ID: ` + instance.deployments[index]);
    });

    console.log("\nDeployment Config\n");
    if (deploymentId.length > 0) {
        const instanceDeployment = await client.instance.getInstanceDeployment(deploymentId);

        instanceDeployment.connectionUrls.forEach((url:string, index:number) => {
            console.log(`Cluster ${index} URL: ` + url + "\n");
        });

        console.log("Instance id: " + instanceDeployment.id);

        instanceDeployment.instanceConfiguration.commands.forEach((cmd:string, index:number) => {
            console.log(`Config command ${index}: ` + cmd + "\n");
        });

        instanceDeployment.instanceConfiguration.environmentVariables
            .forEach(envVar => {
                console.log("Config env var: " + envVar.key + ": " + envVar.value + "\n");
            });

        console.log("Status: " + instanceDeployment.status);
    }

    console.log("\nLogs\n");
    const instanceLogs: Array<string> = await client.instance.getInstanceLogs(
        deploymentId,
        {
            from: 0,
            to: 1000,
            logType: InstanceLogType.INSTANCE_LOGS,
        });

    await client.instance.triggerLatestLog(instanceId);

    instanceLogs.forEach(log => {
        console.log("Logs: " + log.toString());
    })

})();
