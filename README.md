node-red-contrib-meraki-dashboard-api
=====================

Node-RED node for meraki-dashboard-api

This collection of API calls provides an easy way to interact with a Cisco Meraki network

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-meraki-dashboard-api

Usage
-----

### Methods

- getOrganizationAdmins

    List the dashboard administrators in this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins'
```

- createOrganizationAdmins

    Create a new dashboard administrator

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Miles Meraki","email":"miles@meraki.com","orgAccess":"none","tags":[{"tag":"west","access":"read-only"}]}' 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins'
```

- updateOrganizationAdmin

    Update an administrator

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Miles Meraki","email":"miles@meraki.com","orgAccess":"none","tags":[{"tag":"west","access":"read-only"}]}' 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins/{id}'
```

- deleteOrganizationAdmin

    Revoke all access for a dashboard administrator within this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins/{id}'
```

- getNetworkAlertSettings

    Return the alert configuration for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/alertSettings'
```

- updateNetworkAlertSettings

    Update the alert configuration for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"defaultDestinations":{"emails":["miles@meraki.com"],"allAdmins":true,"snmp":true},"alerts":[{"type":"gatewayDown","enabled":true,"alertDestinations":{"emails":["miles@meraki.com"],"allAdmins":false,"snmp":false},"filters":{"timeout":60}}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/alertSettings'
```

- getDeviceCameraAnalyticsZones

    Returns all configured analytic zones for this camera

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/zones'
```

- getDeviceCameraAnalyticsRecent

    Returns most recent record for analytics zones

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/recent'
```

- getDeviceCameraAnalyticsLive

    Returns live state from camera of analytics zones

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/live'
```

- getDeviceCameraAnalyticsOverview

    Returns an overview of aggregate analytics data for a timespan

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/{serial}/camera/analytics/overview'
```

- getDeviceCameraAnalyticsZoneHistory

    Return historical records for analytic zones

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/{serial}/camera/analytics/zones/{zoneId}/history'
```

- getOrganizationApiRequests

    List the API requests made by an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/apiRequests'
```

- getNetworkBluetoothClient

    Return a Bluetooth client

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/bluetoothClients/[id]'
```

- getNetworkBluetoothClients

    List the Bluetooth clients seen by APs in this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/bluetoothClients'
```

- getNetworkBluetoothSettings

    Return the Bluetooth settings for a network. <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a> must be enabled on the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/bluetoothSettings'
```

- updateNetworkBluetoothSettings

    Update the Bluetooth settings for a network. See the docs page for <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a>.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"scanningEnabled":true,"advertisingEnabled":true,"uuid":"00000000-0000-0000-000-000000000000","majorMinorAssignmentMode":"Non-unique","major":1}' 'https://api.meraki.com/api/v0/networks/{networkId}/bluetoothSettings'
```

- getOrganizationNetworks

    List the networks in an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/networks'
```

- createOrganizationNetworks

    Create a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Long Island Office","timeZone":"America/Los_Angeles","tags":" tag1 tag2 ","disableMyMerakiCom":false,"type":"appliance switch camera"}' 'https://api.meraki.com/api/v0/organizations/{organizationId}/networks'
```

- getNetwork

    Return a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}'
```

- updateNetwork

    Update a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Long Island Office","timeZone":"America/Los_Angeles","tags":" tag1 tag2 ","disableMyMerakiCom":false}' 'https://api.meraki.com/api/v0/networks/{networkId}'
```

- deleteNetwork

    Delete a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/{networkId}'
```

- bindNetwork

    Bind a network to a template.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"configTemplateId":"N_23952905","autoBind":false}' 'https://api.meraki.com/api/v0/networks/{networkId}/bind'
```

- unbindNetwork

    Unbind a network from a template.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/{networkId}/unbind'
```

- getNetworkTraffic

    The traffic analysis data for this network.
<a href="https://documentation.meraki.com/MR/Monitoring_and_Reporting/Hostname_Visibility">Traffic Analysis with Hostname Visibility</a> must be enabled on the network.


## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/traffic'
```

- getNetworkAccessPolicies

    List the access policies for this network. Only valid for MS networks.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/accessPolicies'
```

- getNetworkAirMarshal

    List Air Marshal scan results from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/airMarshal'
```

- getNetworkSiteToSiteVpn

    Return the site-to-site VPN settings of a network. Only valid for MX networks.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/siteToSiteVpn'
```

- updateNetworkSiteToSiteVpn

    Update the site-to-site VPN settings of a network. Only valid for MX networks in NAT mode.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"mode":"spoke","hubs":[{"hubId":"N_4901849","useDefaultRoute":true},{"hubId":"N_1892489","useDefaultRoute":false}],"subnets":[{"localSubnet":"192.168.1.0/24","useVpn":true},{"localSubnet":"192.168.128.0/24","useVpn":true}]}' 'https://api.meraki.com/api/v0/networks/{networkId}/siteToSiteVpn'
```

- getNetworkCameraVideoLink

    Returns video link for the specified camera. If a timestamp supplied, it links to that time.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/cameras/[serial]/videoLink'
```

- snapshotNetworkCamera

    Generate a snapshot of what the camera sees at the specified time and return a link to that image.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[networkId]/cameras/[serial]/snapshot'
```

- getDeviceClients

    List the clients of a device, up to a maximum of a month ago. The usage of each client is returned in kilobytes. If the device is a switch, the switchport is returned; otherwise the switchport field is null.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/clients?timespan=7200'
```

- getNetworkClient

    Return the client associated with the given identifier. This endpoint will lookup by client ID or either the MAC or IP depending on whether the network uses Track-by-IP.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[idOrMacOrIp]'
```

- provisionNetworkClients

    Provisions a client with a name and policy. Clients can be provisioned before they associate to the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"mac":"00:11:22:33:44:55","name":"Miles's phone","devicePolicy":"Group policy","groupPolicyId":"101"}' 'https://api.meraki.com/api/v0/networks/[networkId]/clients/provision'
```

- getNetworkClientUsageHistory

    Return the client's daily usage history. Usage data is in kilobytes.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[idOrMacOrIp]/usageHistory'
```

- getNetworkClientPolicy

    Return the policy assigned to a client on the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[mac]/policy?timespan=7200'
```

- updateNetworkClientPolicy

    Update the policy assigned to a client on the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"mac":"00:11:22:33:44:55","type":"Group policy","groupPolicyId":"101"}' 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[mac]/policy'
```

- getNetworkClientSplashAuthorizationStatus

    Return the splash authorization for a client, for each SSID they've associated with through splash.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/clients/[mac]/splashAuthorizationStatus'
```

- updateNetworkClientSplashAuthorizationStatus

    Update a client's splash authorization.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ssids":{"0":{"isAuthorized":true,"authorizedAt":"2017-07-19 16:24:13 UTC","expiresAt":"2017-07-20 16:24:13 UTC"},"2":{"isAuthorized":false}}}' 'https://api.meraki.com/api/v0/networks/[id]/clients/[mac]/splashAuthorizationStatus'
```

- getNetworkClientTrafficHistory

    Return the client's network traffic data over time. Usage data is in kilobytes. This endpoint requires detailed traffic analysis to be enabled on the Network-wide > General page.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{idOrMacOrIp}/trafficHistory'
```

- getNetworkClientEvents

    Return the events associated with this client

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{idOrMacOrIp}/events'
```

- getNetworkClientLatencyHistory

    Return the latency history for a client. The latency data is from a sample of 2% of packets and is grouped into 4 traffic categories: background, best effort, video, voice. Within these categories the sampled packet counters are bucketed by latency in milliseconds.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{idOrMacOrIp}/latencyHistory?timespan=7200'
```

- getOrganizationConfigTemplates

    List the configuration templates for this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/configTemplates'
```

- deleteOrganizationConfigTemplate

    Remove a configuration template

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organizationId]/configTemplates/[id]'
```

- getNetworkDevices

    List the devices in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices'
```

- getNetworkDevice

    Return a single device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]'
```

- updateNetworkDevice

    Update the attributes of a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My AP","lat":37.4180951010362,"lng":-122.098531723022,"serial":"Q234-ABCD-5678","mac":"00:11:22:33:44:55","tags":" recently-added "}' 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]'
```

- getNetworkDevicePerformance

    Return the performance score for a single device. Only primary MX devices supported. If no data is available, a 204 error code is returned.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/performance'
```

- getNetworkDeviceUplink

    Return the uplink information for a device.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/uplink'
```

- getNetworkDeviceLldp_cdp

    List LLDP and CDP information for a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/lldp_cdp?timespan=7200'
```

- claimNetworkDevices

    Claim a device into a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"serial":"Q234-ABCD-5678"}' 'https://api.meraki.com/api/v0/networks/{networkId}/devices/claim'
```

- removeNetworkDevice

    Remove a single device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/remove'
```

- getNetworkDeviceLossAndLatencyHistory

    Get the uplink loss percentage and latency in milliseconds for a wired network device.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/lossAndLatencyHistory?uplink=wan1&ip=1.2.3.4&timespan=7200'
```

- rebootNetworkDevice

    Reboot a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/reboot'
```

- getNetworkCellularFirewallRules

    Return the cellular firewall rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/cellularFirewallRules'
```

- updateNetworkCellularFirewallRules

    Update the cellular firewall rules of an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/cellularFirewallRules'
```

- getNetworkL3FirewallRules

    Return the L3 firewall rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/l3FirewallRules'
```

- updateNetworkL3FirewallRules

    Update the L3 firewall rules of an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/l3FirewallRules'
```

- getOrganizationVpnFirewallRules

    Return the firewall rules for an organization's site-to-site VPN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/vpnFirewallRules'
```

- updateOrganizationVpnFirewallRules

    Update firewall rules of an organization's site-to-site VPN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/organizations/[organizationId]/vpnFirewallRules'
```

- getNetworkSsidL3FirewallRules

    Return the L3 firewall rules for an SSID on an MR network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/l3FirewallRules'
```

- updateNetworkSsidL3FirewallRules

    Update the L3 firewall rules of an SSID on an MR network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/l3FirewallRules'
```

- getNetworkGroupPolicies

    List the group policies in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/groupPolicies'
```

- deleteNetworkGroupPolicy

    Delete a group policy

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/{networkId}/groupPolicies/{groupPolicyId}'
```

- getNetworkHttpServers

    List the HTTP servers for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers'
```

- createNetworkHttpServers

    Add an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My HTTP server","url":"https://www.example.com/webhooks","sharedSecret":"foobar"}' 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers'
```

- getNetworkHttpServer

    Return an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```

- updateNetworkHttpServer

    Update an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My HTTP server","url":"https://www.example.com/webhooks","sharedSecret":"foobar"}' 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```

- deleteNetworkHttpServer

    Delete an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```

- createNetworkHttpServersWebhookTests

    Send a test webhook

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/webhookTests'
```

- getNetworkHttpServersWebhookTest

    Return the status of a webhook test

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/webhookTests/[id]'
```

- getNetworkMerakiAuthUsers

    List the splash or RADIUS users configured under Meraki Authentication for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/merakiAuthUsers'
```

- getNetworkMerakiAuthUser

    Return the Meraki Auth splash or RADIUS user

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/merakiAuthUsers/[id]'
```

- getOrganizations

    List the organizations that the user has privileges on

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations'
```

- createOrganizations

    Create a new organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations'
```

- getOrganization

    Return an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]'
```

- updateOrganization

    Update an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations/[id]'
```

- cloneOrganization

    Create a new organization by cloning the addressed organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations/[id]/clone'
```

- claimOrganization

    Claim a device, license key, or order into an organization. When claiming by order, all devices and licenses in the order will be claimed; licenses will be added to the organization and devices will be placed in the organization's inventory. These three types of claims are mutually exclusive and cannot be performed in one request.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"order":"4CXXXXXXX"}' 'https://api.meraki.com/api/v0/organizations/[id]/claim'
```

- getOrganizationLicenseState

    Return the license state for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/licenseState'
```

- getOrganizationInventory

    Return the inventory for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/inventory'
```

- getOrganizationDeviceStatuses

    List the status of every Meraki device in the organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/deviceStatuses'
```

- getOrganizationSnmp

    Return the SNMP settings for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/snmp'
```

- updateOrganizationSnmp

    Update the SNMP settings for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"v2cEnabled":false,"v3Enabled":false}' 'https://api.meraki.com/api/v0/organizations/[id]/snmp'
```

- getOrganizationThirdPartyVPNPeers

    Return the third party VPN peers for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/thirdPartyVPNPeers'
```

- updateOrganizationThirdPartyVPNPeers

    Update the third party VPN peers for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '[[{"name":"My peer 1","publicIp":"123.123.123.1","privateSubnets":["192.168.1.0/24","192.168.128.0/24"],"secret":"asdf1234","ipsecPolicies":{"ikeCipherAlgo":["tripledes"],"ikeAuthAlgo":["sha1"],"ikeDiffieHellmanGroup":["group2"],"ikeLifetime":"28800","childCipherAlgo":["aes128"],"childAuthAlgo":["sha1"],"childPfsGroup":["disabled"],"childLifetime":"28800"}},{"name":"My peer 2","publicIp":"123.123.123.2","privateSubnets":["192.168.2.0/24","192.168.129.0/24"],"secret":"asdf56785678567856785678","ipsecPoliciesPreset":"default"}]]' 'https://api.meraki.com/api/v0/organizations/[id]/thirdPartyVPNPeers'
```

- getOrganizationUplinksLossAndLatency

    Return the uplink loss and latency for every MX in the organization from 2 - 7 minutes ago

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/uplinksLossAndLatency'
```

- getNetworkPhoneAnnouncements

    List all announcement groups in a network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements'
```

- createNetworkPhoneAnnouncements

    Add an announcement group.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My announcement group"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements'
```

- deleteNetworkPhoneAnnouncement

    Delete an announcement group.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements/[id]'
```

- getNetworkPhoneAssignments

    List all phones in a network and their contact assignment

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments'
```

- getNetworkPhoneAssignment

    Return a phone's contact assignment

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```

- updateNetworkPhoneAssignment

    Assign a contact and number(s) to a phone

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"contactId":"823","contactType":"Google","publicNumber":["+15555555555"],"ext":"1234"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```

- deleteNetworkPhoneAssignment

    Remove a phone assignment (unprovision a phone)

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```

- getNetworkPhoneCallgroups

    List all call groups in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups'
```

- createNetworkPhoneCallgroups

    Create a new call group.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Sales Group","ext":"1234","publicNumber":"+15555555555","ringStrategy":"ring-all","scope":"some","tags":["sales","support"],"noAnswerAction":"transfer-to-ext","transferExtension":"1003"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups'
```

- getNetworkPhoneCallgroup

    Show a call group's details

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```

- updateNetworkPhoneCallgroup

    Update a call group's details. Only submit parameters you would like to update. Omitting any parameters will leave them as-is.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ext":"1234","publicNumber":"+15555555555","ringStrategy":"ring-all","scope":"some","tags":["sales","support"],"noAnswerAction":"transfer-to-ext","transferExtension":"1003"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```

- deleteNetworkPhoneCallgroup

    Delete a call group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```

- getNetworkPhoneConferenceRooms

    List all the phone conference rooms in a network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms'
```

- createNetworkPhoneConferenceRooms

    Add a conference room.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Meraki Conference Room"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms'
```

- getNetworkPhoneConferenceRoom

    Show a conference room's details.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```

- updateNetworkPhoneConferenceRoom

    Update a conference room's. Only submit parameters you would like to update. Omitting any parameters will leave them as-is.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Meraki Conference Room"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```

- deleteNetworkPhoneConferenceRoom

    Delete a conference room.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```

- getNetworkPhoneContacts

    List the phone contacts in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts'
```

- createNetworkPhoneContacts

    Add a contact

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Miles Meraki"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts'
```

- updateNetworkPhoneContact

    Update a phone contact. Google Directory contacts cannot be modified.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Miles Meraki"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts/[contactId]'
```

- deleteNetworkPhoneContact

    Delete a phone contact. Google Directory contacts cannot be removed.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts/[contactId]'
```

- getNetworkPhoneNumbers

    List all the phone numbers in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneNumbers'
```

- getNetworkPhoneNumbersAvailable

    List the available phone numbers in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneNumbers/available'
```

- getNetworkPiiPiiKeys

    List the keys required to access Personally Identifiable Information (PII) for a given identifier. Exactly one identifier will be accepted. If the organization contains org-wide Systems Manager users matching the key provided then there will be an entry with the key "0" containing the applicable keys.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/piiKeys
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/piiKeys'
```

- getNetworkPiiSmDevicesForKey

    Given a piece of Personally Identifiable Information (PII), return the Systems Manager device ID(s) associated with that identifier. These device IDs can be used with the Systems Manager API endpoints to retrieve device details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smDevicesForKey
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/smDevicesForKey'
```

- getNetworkPiiSmOwnersForKey

    Given a piece of Personally Identifiable Information (PII), return the Systems Manager owner ID(s) associated with that identifier. These owner IDs can be used with the Systems Manager API endpoints to retrieve owner details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smOwnersForKey
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/smOwnersForKey'
```

- getNetworkPiiRequests

    List the PII requests for this network or organization

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests'
```

- createNetworkPiiRequests

    Submit a new delete or restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -X POST -H 'Content-Type: application/json' --data-binary '{"type":"delete", "datasets":"["usage","events"]", "mac":"00:77:00:77:00:77"}' 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests'

```

- getNetworkPiiRequest

    Return a PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{id}
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests/[id]'
```

- deleteNetworkPiiRequest

    Delete a restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{id}
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests/[id]'
```

- getOrganizationSamlRoles

    List the SAML roles for this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles'
```

- createOrganizationSamlRoles

    Create a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles'
```

- getOrganizationSamlRole

    Return a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```

- updateOrganizationSamlRole

    Update a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```

- deleteOrganizationSamlRole

    Remove a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```

- getNetworkClientSecurityEvents

    List the security events

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{clientId}/securityEvents'
```

- getNetworkSmTargetGroups

    List the target groups in this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups'
```

- createNetworkSmTargetGroups

    Add a target group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My target group","scope":"none","tags":"[]","type":"devices"}' 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups'
```

- getNetworkSmTargetGroup

    Return a target group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups/[targetGroupId]'
```

- updateNetworkSmTargetGroup

    Update a target group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My target group","scope":"none","tags":"[]","type":"devices"}' 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups/[targetGroupId]'
```

- deleteNetworkSmTargetGroup

    Delete a target group from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups/[targetGroupId]'
```

- createNetworkSmProfileClarity

    Create a new profile containing a Cisco Clarity payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Clarity Config" \
  -F "PluginBundleID=com.cisco.security.app" \
  -F 'VendorConfig=[ {"key":"cloud_asn1_server_host", "type":"manual_string", "value":"immunet.com"}, {"key":"cloud_asn1_server_port", "type":"manual_int", "value":443} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity"

```

- updateNetworkSmProfileClarity

    Update an existing profile containing a Cisco Clarity payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X PUT \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Clarity Config" \
  -F 'VendorConfig=[ {"key":"cloud_asn1_server_host", "type":"manual_string", "value":"immunet.com"}, {"key":"cloud_asn1_server_port", "type":"manual_int", "value":443} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```

- addNetworkSmProfileClarity

    Add a Cisco Clarity payload to an existing profile

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F 'VendorConfig=[ {"key":"cloud_asn1_server_host", "type":"manual_string", "value":"immunet.com"}, {"key":"cloud_asn1_server_port", "type":"manual_int", "value":443} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```

- getNetworkSmProfileClarity

    Get details for a Cisco Clarity payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```

- deleteNetworkSmProfileClarity

    Delete a Cisco Clarity payload. Deletes the entire profile if it's empty after removing the payload.

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X DELETE \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```

- createNetworkSmProfileUmbrella

    Create a new profile containing a Cisco Umbrella payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Umbrella Config" \
  -F "AppBundleIdentifier=com.cisco.security" \
  -F "ProviderBundleIdentifier=com.cisco.umbrella" \
  -F 'ProviderConfiguration=[ {"key":"internalDomains", "type":"manual_list", "value":["meraki.com", "cisco.com"] }, {"key":"user_id", "type":"manual_string", "value":"miles"} ]' \
  -F "usesCert=true" \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella"

```

- updateNetworkSmProfileUmbrella

    Update an existing profile containing a Cisco Umbrella payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X PUT \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Umbrella Config" \
  -F 'ProviderConfiguration=[ {"key":"internalDomains", "type":"manual_list", "value":["meraki.com", "cisco.com"] }, {"key":"user_id", "type":"manual_string", "value":"miles"} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```

- addNetworkSmProfileUmbrella

    Add a Cisco Umbrella payload to an existing profile

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F 'ProviderConfiguration=[ {"key":"internalDomains", "type":"manual_list", "value":["meraki.com", "cisco.com"] }, {"key":"user_id", "type":"manual_string", "value":"miles"} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```

- getNetworkSmProfileUmbrella

    Get details for a Cisco Umbrella payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```

- deleteNetworkSmProfileUmbrella

    Delete a Cisco Umbrella payload. Deletes the entire profile if it's empty after removing the payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```

- createNetworkSmAppPolaris

    Create a new Polaris app

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "manifestUrl=https://website.com/assets/manifest.plist" \
  -F "preventAutoInstall=true" \
  -F "usesVPP=true" \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/app/polaris"

```

- getNetworkSmAppPolaris

    Get details for a Cisco Polaris app if it exists

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/app/polaris?bundleId=com.cisco.polaris"

```

- updateNetworkSmAppPolari

    Update an existing Polaris app

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X PUT \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "preventAutoInstall=true" \
  -F "usesVPP=true" \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/app/polaris/[appId]"

```

- deleteNetworkSmAppPolari

    Delete a Cisco Polaris app

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X DELETE \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/app/polaris/[appId]"

```

- getNetworkSmDevices

    List the devices enrolled in an SM network with various specified fields and filters

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices'
```

- getNetworkSmUsers

    List the owners in an SM network with various specified fields and filters

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/users'
```

- getNetworkSmUserDeviceProfiles

    Get the profiles associated with a user

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/user/[id]/deviceProfiles'
```

- getNetworkSmDeviceProfiles

    Get the profiles associated with a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/deviceProfiles'
```

- getNetworkSmUserSoftwares

    Get a list of softwares associated with a user

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/user/[id]/softwares'
```

- getNetworkSmSoftwares

    Get a list of softwares associated with a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/softwares'
```

- getNetworkSmNetworkAdapters

    List the network adapters of a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/networkAdapters'
```

- getNetworkSmWlanLists

    List the saved SSID names on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/wlanLists'
```

- getNetworkSmSecurityCenters

    List the security centers on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/securityCenters'
```

- getNetworkSmRestrictions

    List the restrictions on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/restrictions'
```

- getNetworkSmCerts

    List the certs on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/certs'
```

- updateNetworkSmDevicesTags

    Add, delete, or update the tags of a set of devices

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"scope":"withAny, old_tag","updateAction":"add","tags":"tag1,tag2"}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/tags'
```

- updateNetworkSmDeviceFields

    Modify the fields of a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1284392014819","deviceFields":{"name":"My name"}}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/device/fields'
```

- updateNetworkSmDevicesLock

    Lock a set of devices

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ids":"\"1284392014819\""}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/lock'
```

- updateNetworkSmDeviceWipe

    Wipe a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1284392014819"}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/device/wipe'
```

- updateNetworkSmDevicesCheckin

    Force check-in a set of devices

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ids":"\"1284392014819\""}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/checkin'
```

- updateNetworkSmDevicesMove

    Move a set of devices to a new network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ids":"\"1284392014819\"","newNetwork":"N_24329156"}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/move'
```

- getNetworkSmProfiles

    List all the profiles in the network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/profiles'
```

- getNetworkSmCellularUsageHistory

    Return the client's daily cellular data usage history. Usage data is in kilobytes.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/cellularUsageHistory'
```

- getNetworkSmPerformanceHistory

    Return historical records of various Systems Manager client metrics for desktop devices.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/performanceHistory'
```

- getNetworkSmDesktopLogs

    Return historical records of various Systems Manager network connection details for desktop devices.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/desktopLogs'
```

- getNetworkSmDeviceCommandLogs

        Return historical records of commands sent to Systems Manager devices.
    <p>Note that this will include the name of the Dashboard user who initiated the command if it was generated
    by a Dashboard admin rather than the automatic behavior of the system; you may wish to filter this out
    of any reports.</p>


## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/deviceCommandLogs'
```

- getNetworkSmConnectivity

    Returns historical connectivity data (whether a device is regularly checking in to Dashboard).

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/connectivity'
```

- getNetworkSplashLoginAttempts

    List the splash login attempts for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/splashLoginAttempts?timespan=7200'
```

- getNetworkSsidSplashSettings

    Display the splash page settings for the given SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/splashSettings'
```

- updateNetworkSsidSplashSettings

    Modify the splash page settings for the given SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"splashUrl":"https://www.custom_splash_url.com","useSplashUrl":true}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/splashSettings'
```

- getNetworkSsids

    List the SSIDs in a network. Supports networks with access points or wireless-enabled security appliances and teleworker gateways.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids'
```

- getNetworkSsid

    Return a single SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]'
```

- updateNetworkSsid

    Update the attributes of an SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My SSID","enabled":true}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]'
```

- getNetworkSwitchSettings

    Returns the switch network settings

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/switch/settings'
```

- updateNetworkSwitchSettings

    Update switch network settings

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"useCombinedPower":true,"powerExceptions":[{"serial":"Q234-ABCD-0001","powerType":"redundant"},{"serial":"Q234-ABCD-0002","powerType":"combined"},{"serial":"Q234-ABCD-0003","powerType":"combined"},{"serial":"Q234-ABCD-0004","powerType":"useNetworkSetting"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/switch/settings'
```

- getDeviceSwitchPorts

    List the switch ports for a switch

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts'
```

- getDeviceSwitchPort

    Return a switch port

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts/[number]'
```

- updateDeviceSwitchPort

    Update a switch port

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts/[number]'
```

- getNetworkSyslogServers

    List the syslog servers for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/syslogServers'
```

- updateNetworkSyslogServers

    Update the syslog servers for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"servers":[{"host":"1.2.3.4","port":443,"roles":["Wireless event log","URLs"]}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/syslogServers'
```

- getNetworkContentFilteringCategories

    List all available content filtering categories for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/contentFiltering/categories'
```

- getNetworkContentFiltering

    Return the content filtering settings for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/contentFiltering'
```

- updateNetworkContentFiltering

    Update the content filtering settings for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"allowedUrlPatterns":["http://www.example.org","http://help.com.au"],"blockedUrlPatterns":["http://www.example.com","http://www.betting.com"],"blockedUrlCategories":["meraki:contentFiltering/category/1","meraki:contentFiltering/category/7"],"urlCategoryListSize":"topSites"}' 'https://api.meraki.com/api/v0/networks/[networkId]/contentFiltering'
```

- getNetworkFirewalledServices

    List the appliance services and their accessibility rules

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices'
```

- getNetworkFirewalledService

    Return the accessibility settings of the given service ('ICMP', 'web', or 'SNMP')

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices/[service]'
```

- updateNetworkFirewalledService

    Updates the accessibility settings for the given service ('ICMP', 'web', or 'SNMP')

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"access":"restricted","allowedIps":["123.123.123.1"]}' 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices/[service]'
```

- getNetworkOneToManyNatRules

    Return the 1:Many NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/oneToManyNatRules'
```

- updateNetworkOneToManyNatRules

    Set the 1:Many NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"publicIp":"146.11.11.13","uplink":"internet1","portRules":[{"name":"Rule 1","protocol":"tcp","publicPort":"9443","localIp":"192.168.128.1","localPort":"443","allowedIps":["any"]},{"name":"Rule 2","protocol":"tcp","publicPort":"8080","localIp":"192.168.128.1","localPort":"80","allowedIps":["10.82.110.0/24","10.82.111.0/24"]}]}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/oneToManyNatRules'
```

- getNetworkOneToOneNatRules

    Return the 1:1 NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/oneToOneNatRules'
```

- updateNetworkOneToOneNatRules

    Set the 1:1 NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"name":"Service behind NAT","lanIp":"192.168.128.22","publicIp":"146.12.3.33","uplink":"internet1","allowedInbound":[{"protocol":"tcp","destinationPorts":["80"],"allowedIps":["10.82.112.0/24","10.82.0.0/16"]},{"protocol":"udp","destinationPorts":["8080"],"allowedIps":["10.81.110.5","10.81.0.0/16"]}]}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/oneToOneNatRules'
```

- getNetworkPortForwardingRules

    Return the port forwarding rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/portForwardingRules'
```

- updateNetworkPortForwardingRules

    Update the port forwarding rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"lanIp":"192.168.128.1","allowedIps":["any"],"name":"Description of Port Forwarding Rule","protocol":"tcp","publicPort":"8100-8101","localPort":"442-443","uplink":"both"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/portForwardingRules'
```

- getNetworkStaticRoutes

    List the static routes for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```

- createNetworkStaticRoutes

    Add a static route

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My route","subnet":"192.168.1.0/24","gatewayIp":"1.2.3.5"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```

- getNetworkStaticRoute

    Return a static route

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```

- updateNetworkStaticRoute

    Update a static route

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My route","subnet":"192.168.1.0/24","fixedIpAssignments":"{}","reservedIpRanges":"[]"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```

- deleteNetworkStaticRoute

    Delete a static route from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```

- getNetworkUplinkSettings

    Returns the uplink settings for your MX network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/uplinkSettings'
```

- updateNetworkUplinkSettings

    Updates the uplink settings for your MX network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"bandwidthLimits":{"wan1":{"limitUp":1000000,"limitDown":1000000},"wan2":{"limitUp":1000000,"limitDown":1000000},"cellular":{"limitUp":51200,"limitDown":51200}}}' 'https://api.meraki.com/api/v0/networks/{networkId}/uplinkSettings'
```

- getNetworkVlans

    List the VLANs for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/vlans'
```

- createNetworkVlans

    Add a VLAN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"id":"1234","name":"My VLAN","subnet":"192.168.1.0/24","applianceIp":"1.2.3.4"}' 'https://api.meraki.com/api/v0/networks/{networkId}/vlans'
```

- getNetworkVlan

    Return a VLAN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/vlans/{vlanId}'
```

- updateNetworkVlan

    Update a VLAN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1234","networkId":"N_24329156","name":"My VLAN","applianceIp":"1.2.3.4","subnet":"192.168.1.0/24","fixedIpAssignments":"{}","reservedIpRanges":"[]","dnsNameservers":"google_dns"}' 'https://api.meraki.com/api/v0/networks/{networkId}/vlans/{vlanId}'
```

- deleteNetworkVlan

    Delete a VLAN from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/{networkId}/vlans/{vlanId}'
```

- getNetworkVlansEnabledState

    Returns the enabled status of VLANs for the network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/vlansEnabledState'
```

- updateNetworkVlansEnabledState

    Enable/Disable VLANs for the given network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"enabled":true}' 'https://api.meraki.com/api/v0/networks/{networkId}/vlansEnabledState'
```

- getNetworkConnectionStats

    Aggregated connectivity info for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/connectionStats'
```

- getNetworkDevicesConnectionStats

    Aggregated connectivity info for this network, grouped by node

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/connectionStats'
```

- getNetworkDeviceConnectionStats

    Aggregated connectivity info for a given AP on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/connectionStats'
```

- getNetworkClientsConnectionStats

    Aggregated connectivity info for this network, grouped by clients

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/connectionStats'
```

- getNetworkClientConnectionStats

    Aggregated connectivity info for a given client on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/connectionStats'
```

- getNetworkLatencyStats

    Aggregated latency info for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/latencyStats'
```

- getNetworkDevicesLatencyStats

    Aggregated latency info for this network, grouped by node

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/latencyStats'
```

- getNetworkDeviceLatencyStats

    Aggregated latency info for a given AP on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/latencyStats'
```

- getNetworkClientsLatencyStats

    Aggregated latency info for this network, grouped by clients

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/latencyStats'
```

- getNetworkClientLatencyStats

    Aggregated latency info for a given client on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/latencyStats'
```

- getNetworkFailedConnections

    List of all failed client connection events on this network in a given time range

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/failedConnections'
```


