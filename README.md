node-red-contrib-meraki-dashboard-api
=====================

Node-RED node for meraki-dashboard-api

[Official Meraki API Docs](https://create.meraki.io/api)

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`
        
        npm install git+https://github.com/dexterlabora/node-red-contrib-meraki-dashboard-api

# About
-------     

The Cisco Meraki Dashboard API is a modern REST API based on the [OpenAPI](https://swagger.io/docs/specification/about/) specification.

## What can the API be used for?
The Dashboard API can be used for many purposes. It's meant to be an open-ended tool. Here are some examples of use cases:

* Add new organizations, admins, networks, devices, VLANs, and more
* Configure networks at scale
* Automatically on-board and off-board new employees' teleworker setups
* Build your own dashboard for store managers, field techs, or unique use cases

## Enabling the Dashboard API
1. Begin by logging into [Meraki Dashboard](https://dashboard.meraki.com) and navigating to **Organization > Settings**

2. Locate the section titled **Dashboard API access** and select **Enable Access**, then **Save** your changes

3. After enabling the API, choose your username at the top-right of the Meraki Dashboard and select **my profile**

4. Locate the section titled **Dashboard API access** and select **Generate new API key**

*Note: The API key is associated with a Dashboard administrator account. You can generate, revoke, and regenerate your API key on your profile.*

**Keep your API key safe as it provides authentication to all of your organizations with the API enabled. If your API key is shared, you can regenerate your API key at any time. This will revoke the existing API key.**

Copy and store your API key in a safe place. Dashboard does not store API keys in plaintext for security reasons, so this is the only time you will be able to record it. If you lose or forget your API key, you will have to revoke it and generate a new one.

Every request must specify an API key via a request header.

The API key must be specified in the URL header. The API will return a 404 (rather than a 403) in response to a request with a missing or incorrect API key in order to prevent leaking the existence of resources to unauthorized users.

`X-Cisco-Meraki-API-Key: <secret key>`

Read more about API [authorization](../api/#/python/getting-started/authorizing-your-client)


## Versioning
Once an API version is released, we will make only backwards-compatible changes to it. Backwards-compatible changes include:

* Adding new API resources

* Adding new optional request parameters to existing API methods

* Adding new properties to existing API responses

* Changing the order of properties in existing API responses

## Rate Limit
* The Dashboard API is limited to **5 calls per second**, per organization.
* A burst of 5 additional calls are allowed in the first second, so a maximum of 15 calls in the first 2 seconds.
* The rate limiting technique is based off of the [token bucket model](https://en.wikipedia.org/wiki/Token_bucket).
* An error with a `429` status code will be returned when the rate limit has been exceeded.
* Expect to backoff for 1 - 2 seconds if the limit has been exceeded. You may have to wait potentially longer if a large number of requests were made within this timeframe.


## Additional Details
Identifiers in the API are opaque strings. A `{networkId}`, for example, might be the string "126043", whereas an `{orderId}` might contain characters, such as "4S1234567". Client applications must not try to parse them as numbers. Even identifiers that look like numbers might be too long to encode without loss of precision in Javascript, where the only numeric type is IEEE 754 floating point.

Verbs in the API follow the usual REST conventions:

`GET` returns the value of a resource or a list of resources, depending on whether an identifier is specified. For example, a `GET` of `/organizations` returns a list of organizations, whereas a `GET` of `/organizations/{organizationId}` returns a particular organization.

`POST` adds a new resource, as in a `POST` to `/organizations/{organizationId}/admins`, or performs some other non-idempotent change.

`PUT` updates a resource. `PUTs` are idempotent; they update a resource, creating it first if it does not already exist. A `PUT` should specify all the fields of a resource; the API will revert omitted fields to their default value.

`DELETE` removes a resource.


Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-meraki-dashboard-api


## Methods

### getDeviceCameraAnalyticsLive 

> Returns live state from camera of analytics zones

*Example Response*

 ```
 [
  {
    "ts": "2018-08-15T18:32:38.123Z",
    "zones": {
      "0": {
        "person": 0
      }
    }
  }
]
 ```
  
    

   

  

### getDeviceCameraAnalyticsOverview 

> Returns an overview of aggregate analytics data for a timespan

*Example Response*

 ```
 [
  [
    {
      "startTs": "2018-08-15T18:32:38.123Z",
      "endTs": "2018-08-15T18:33:38.123Z",
      "zoneId": 0,
      "entrances": 254,
      "averageCount": 5
    }
  ]
]
 ```
  
    

   

  

### getDeviceCameraAnalyticsRecent 

> Returns most recent record for analytics zones

*Example Response*

 ```
 [
  [
    {
      "startTs": "2018-08-15T18:32:38.123Z",
      "endTs": "2018-08-15T18:33:38.123Z",
      "zoneId": 0,
      "entrances": 10,
      "averageCount": 2.54
    }
  ]
]
 ```
  
    

   

  

### getDeviceCameraAnalyticsZones 

> Returns all configured analytic zones for this camera

*Example Response*

 ```
 [
  [
    {
      "id": "0",
      "type": "occupancy",
      "label": "Full Frame"
    }
  ]
]
 ```
  
    

   

  

### getDeviceCameraAnalyticsZoneHistory 

> Return historical records for analytic zones

*Example Response*

 ```
 [
  [
    {
      "startTs": "2018-08-15T18:32:38.123Z",
      "endTs": "2018-08-15T18:33:38.123Z",
      "entrances": 5,
      "averageCount": 1.5
    }
  ]
]
 ```
  
    

   

  

### getDeviceClients 

> List the clients of a device, up to a maximum of a month ago. The usage of each client is returned in kilobytes. If the device is a switch, the switchport is returned; otherwise the switchport field is null.

*Example Response*

 ```
 [
  {
    "usage": {
      "sent": 138,
      "recv": 61
    },
    "id": "k74272e",
    "description": "Miles's phone",
    "mac": "00:11:22:33:44:55",
    "ip": "1.2.3.4",
    "user": "milesmeraki",
    "vlan": 255,
    "switchport": null,
    "mdnsName": "Miles's phone",
    "dhcpHostname": "MilesPhone"
  }
]
 ```
  
    

   

  

### getDeviceSwitchPorts 

> List the switch ports for a switch

*Example Response*

 ```
 [
  [
    {
      "number": 1,
      "name": "My switch port",
      "tags": "tag1 tag2",
      "enabled": true,
      "poeEnabled": true,
      "type": "access",
      "vlan": 10,
      "voiceVlan": 20,
      "isolationEnabled": false,
      "rstpEnabled": true,
      "stpGuard": "disabled",
      "accessPolicyNumber": "1234",
      "linkNegotiation": "Auto negotiate",
      "portScheduleId": "1234",
      "udld": "Alert only",
      "macWhitelist": [
        "34:56:fe:ce:8e:b0",
        "34:56:fe:ce:8e:b1"
      ],
      "stickyMacWhitelist": [
        "34:56:fe:ce:8e:b0",
        "34:56:fe:ce:8e:b1"
      ],
      "stickyMacWhitelistLimit": 5
    }
  ]
]
 ```
  
    

   

  

### getDeviceSwitchPort 

> Return a switch port

*Example Response*

 ```
 [
  {
    "number": 1,
    "name": "My switch port",
    "tags": "tag1 tag2",
    "enabled": true,
    "poeEnabled": true,
    "type": "access",
    "vlan": 10,
    "voiceVlan": 20,
    "isolationEnabled": false,
    "rstpEnabled": true,
    "stpGuard": "disabled",
    "accessPolicyNumber": "1234",
    "linkNegotiation": "Auto negotiate",
    "portScheduleId": "1234",
    "udld": "Alert only",
    "macWhitelist": [
      "34:56:fe:ce:8e:b0",
      "34:56:fe:ce:8e:b1"
    ],
    "stickyMacWhitelist": [
      "34:56:fe:ce:8e:b0",
      "34:56:fe:ce:8e:b1"
    ],
    "stickyMacWhitelistLimit": 5
  }
]
 ```
  
    

   

  

### updateDeviceSwitchPort 

> Update a switch port

*Example Response*

 ```
 [
  {
    "number": 1,
    "name": "My switch port",
    "tags": "tag1 tag2",
    "enabled": true,
    "poeEnabled": true,
    "type": "access",
    "vlan": 10,
    "voiceVlan": 20,
    "isolationEnabled": false,
    "rstpEnabled": true,
    "stpGuard": "disabled",
    "accessPolicyNumber": "1234",
    "linkNegotiation": "Auto negotiate",
    "portScheduleId": "1234",
    "udld": "Alert only",
    "macWhitelist": [
      "34:56:fe:ce:8e:b0",
      "34:56:fe:ce:8e:b1"
    ],
    "stickyMacWhitelist": [
      "34:56:fe:ce:8e:b0",
      "34:56:fe:ce:8e:b1"
    ],
    "stickyMacWhitelistLimit": 5
  }
]
 ```
  
    

   

  

### removeNetworkSwitchStack 

> Remove a switch from a stack

*Example Response*

 ```
 [
  {
    "id": "8473",
    "name": "A cool stack",
    "serials": [
      "QBAB-CDEF-GHIJ"
    ]
  }
]
 ```
  
    

   

  

### getNetwork 

> Return a network

*Example Response*

 ```
 [
  {
    "id": "L_123456",
    "organizationId": "2930418",
    "name": "Long Island Office",
    "timeZone": "America/Los_Angeles",
    "tags": " tag1 tag2 ",
    "type": "combined",
    "disableMyMerakiCom": false
  }
]
 ```
  
    

   

  

### updateNetwork 

> Update a network

*Example Response*

 ```
 [
  {
    "id": "L_123456",
    "organizationId": "2930418",
    "name": "Long Island Office",
    "timeZone": "America/Los_Angeles",
    "tags": " tag1 tag2 ",
    "type": "combined",
    "disableMyMerakiCom": false
  }
]
 ```
  
    

   

  

### deleteNetwork 

> Delete a network

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkAccessPolicies 

> List the access policies for this network. Only valid for MS networks.

*Example Response*

 ```
 [
  [
    {
      "number": 1,
      "name": "My access policy",
      "accessType": "8021.x",
      "guestVlan": 3700,
      "radiusServers": [
        {
          "ip": "1.2.3.4",
          "port": 1337
        },
        {
          "ip": "2.3.4.5",
          "port": 1337
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### getNetworkAirMarshal 

> List Air Marshal scan results from a network

*Example Response*

 ```
 [
  [
    {
      "ssid": "linksys",
      "bssids": [
        {
          "bssid": "00:11:22:33:44:55",
          "contained": false,
          "detectedBy": [
            {
              "device": "Q234-ABCD-5678",
              "rssi": 17
            }
          ]
        }
      ],
      "channels": [
        36,
        40
      ],
      "firstSeen": 1518365681,
      "lastSeen": 1526087474,
      "wiredMacs": [
        "00:11:22:33:44:55"
      ],
      "wiredVlans": [
        0,
        108
      ],
      "wiredLastSeen": 1526087474
    }
  ]
]
 ```
  
    

   

  

### getNetworkAlertSettings 

> Return the alert configuration for this network

*Example Response*

 ```
 [
  {
    "defaultDestinations": {
      "emails": [
        "miles@meraki.com"
      ],
      "allAdmins": true,
      "snmp": true
    },
    "alerts": [
      {
        "type": "gatewayDown",
        "enabled": true,
        "alertDestinations": {
          "emails": [
            "miles@meraki.com"
          ],
          "allAdmins": false,
          "snmp": false
        },
        "filters": {
          "timeout": 60
        }
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkAlertSettings 

> Update the alert configuration for this network

*Example Response*

 ```
 [
  {
    "defaultDestinations": {
      "emails": [
        "miles@meraki.com"
      ],
      "allAdmins": true,
      "snmp": true
    },
    "alerts": [
      {
        "type": "gatewayDown",
        "enabled": true,
        "alertDestinations": {
          "emails": [
            "miles@meraki.com"
          ],
          "allAdmins": false,
          "snmp": false
        },
        "filters": {
          "timeout": 60
        }
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkAppliancePorts 

> List per-port VLAN settings for all ports of a MX.

*Example Response*

 ```
 [
  [
    {
      "number": 1,
      "enabled": true,
      "type": "access",
      "dropUntaggedTraffic": false,
      "vlan": 3,
      "accessPolicy": "open"
    }
  ]
]
 ```
  
    

   

  

### getNetworkAppliancePort 

> Return per-port VLAN settings for a single MX port.

*Example Response*

 ```
 [
  {
    "number": 1,
    "enabled": true,
    "type": "access",
    "dropUntaggedTraffic": false,
    "vlan": 3,
    "accessPolicy": "open"
  }
]
 ```
  
    

   

  

### updateNetworkAppliancePort 

> Update the per-port VLAN settings for a single MX port.

*Example Response*

 ```
 [
  {
    "number": 1,
    "enabled": true,
    "type": "access",
    "dropUntaggedTraffic": false,
    "vlan": 3,
    "accessPolicy": "open"
  }
]
 ```
  
    

   

  

### bindNetwork 

> Bind a network to a template.

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkBluetoothClients 

> List the Bluetooth clients seen by APs in this network

*Example Response*

 ```
 [
  [
    {
      "mac": "00:11:22:33:44:55",
      "networkId": "N_24329156"
    }
  ]
]
 ```
  
    

   

  

### getNetworkBluetoothClient 

> Return a Bluetooth client. Bluetooth clients can be identified by their ID or their MAC.

*Example Response*

 ```
 [
  {
    "mac": "00:11:22:33:44:55",
    "networkId": "N_24329156"
  }
]
 ```
  
    

   

  

### getNetworkBluetoothSettings 

> Return the Bluetooth settings for a network. <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a> must be enabled on the network.

*Example Response*

 ```
 [
  {
    "scanningEnabled": true,
    "advertisingEnabled": true,
    "uuid": "00000000-0000-0000-000-000000000000",
    "majorMinorAssignmentMode": "Non-unique",
    "major": 1
  }
]
 ```
  
    

   

  

### updateNetworkBluetoothSettings 

> Update the Bluetooth settings for a network. See the docs page for <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a>.

*Example Response*

 ```
 [
  {
    "scanningEnabled": true,
    "advertisingEnabled": true,
    "uuid": "00000000-0000-0000-000-000000000000",
    "majorMinorAssignmentMode": "Non-unique",
    "major": 1
  }
]
 ```
  
    

   

  

### generateNetworkCameraSnapshot 

> Generate a snapshot of what the camera sees at the specified time and return a link to that image.

*Example Response*

 ```
 [
  {
    "url": "https://spn4.meraki.com/stream/jpeg/snapshot/b2d123asdf423qd22d2",
    "expiry": "Access to the image will expire at 2018-12-11T03:12:39Z."
  }
]
 ```
  
    

   

  

### getNetworkCameraVideoLink 

> Returns video link to the specified camera. If a timestamp is supplied, it links to that timestamp.

*Example Response*

 ```
 [
  {
    "url": "https://nxx.meraki.com/office-cameras/n/bs0a1k/manage/nodes/new_list/29048243992402?timestamp=1535732570077"
  }
]
 ```
  
    

   

  

### getNetworkCellularFirewallRules 

> Return the cellular firewall rules for an MX network

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24",
      "srcPort": "Any",
      "srcCidr": "Any",
      "syslogEnabled": false
    }
  ]
]
 ```
  
    

   

  

### updateNetworkCellularFirewallRules 

> Update the cellular firewall rules of an MX network

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24",
      "srcPort": "Any",
      "srcCidr": "Any",
      "syslogEnabled": false
    }
  ]
]
 ```
  
    

   

  

### getNetworkClients 

> List the clients that have used this network in the timespan

*Example Response*

 ```
 [
  {
    "usage": {
      "sent": 138,
      "recv": 61
    },
    "id": "k74272e",
    "description": "Miles's phone",
    "mac": "00:11:22:33:44:55",
    "ip": "1.2.3.4",
    "user": "milesmeraki",
    "vlan": 255,
    "switchport": null,
    "ip6": "",
    "firstSeen": 1518365681,
    "lastSeen": 1526087474,
    "manufacturer": "Apple",
    "os": "iOS"
  }
]
 ```
  
    

   

  

### getNetworkClientsConnectionStats 

> Aggregated connectivity info for this network, grouped by clients

*Example Response*

 ```
 [
  [
    {
      "mac": "00:61:71:c8:51:27",
      "connectionStats": {
        "assoc": 0,
        "auth": 4,
        "dhcp": 0,
        "dns": 0,
        "success": 10
      }
    },
    {
      "mac": "1c:4d:70:7f:5e:5e",
      "connectionStats": {
        "assoc": 0,
        "auth": 1,
        "dhcp": 0,
        "dns": 0,
        "success": 24
      }
    },
    {
      "mac": "1c:4d:70:81:8d:0a",
      "connectionStats": {
        "assoc": 1,
        "auth": 0,
        "dhcp": 0,
        "dns": 0,
        "success": 16
      }
    }
  ]
]
 ```
  
    

   

  

### getNetworkClientsLatencyStats 

> Aggregated latency info for this network, grouped by clients

*Example Response*

 ```
 [
  [
    {
      "mac": "00:61:71:c8:51:27",
      "latencyStats": {
        "backgroundTraffic": {
          "rawDistribution": {
            "0": 1234,
            "1": 2345,
            "2": 3456,
            "4": 4567,
            "8": 5678,
            "16": 6789,
            "32": 7890,
            "64": 8901,
            "128": 9012,
            "256": 83,
            "512": 1234,
            "1024": 2345,
            "2048": 9999
          },
          "avg": 606.52
        },
        "bestEffortTraffic": "same shape as backgroundTraffic",
        "videoTraffic": "same shape as backgroundTraffic",
        "voiceTraffic": "same shape as backgroundTraffic"
      }
    },
    {
      "mac": "1c:4d:70:7f:5e:5e",
      "latencyStats": {
        "backgroundTraffic": {
          "rawDistribution": {
            "0": 1234,
            "1": 2345,
            "2": 3456,
            "4": 4567,
            "8": 5678,
            "16": 6789,
            "32": 7890,
            "64": 8901,
            "128": 9012,
            "256": 83,
            "512": 1234,
            "1024": 2345,
            "2048": 9999
          },
          "avg": 606.52
        },
        "bestEffortTraffic": "same shape as backgroundTraffic",
        "videoTraffic": "same shape as backgroundTraffic",
        "voiceTraffic": "same shape as backgroundTraffic"
      }
    },
    {
      "mac": "1c:4d:70:81:8d:0a",
      "latencyStats": {
        "backgroundTraffic": {
          "rawDistribution": {
            "0": 1234,
            "1": 2345,
            "2": 3456,
            "4": 4567,
            "8": 5678,
            "16": 6789,
            "32": 7890,
            "64": 8901,
            "128": 9012,
            "256": 83,
            "512": 1234,
            "1024": 2345,
            "2048": 9999
          },
          "avg": 606.52
        },
        "bestEffortTraffic": "same shape as backgroundTraffic",
        "videoTraffic": "same shape as backgroundTraffic",
        "voiceTraffic": "same shape as backgroundTraffic"
      }
    }
  ]
]
 ```
  
    

   

  

### provisionNetworkClients 

> Provisions a client with a name and policy. Clients can be provisioned before they associate to the network.

*Example Response*

 ```
 [
  {
    "mac": "00:11:22:33:44:55",
    "clientId": "k74272e",
    "name": "Miles's phone",
    "devicePolicy": "Group policy",
    "groupPolicyId": "101"
  }
]
 ```
  
    

   

  

### getNetworkClient 

> Return the client associated with the given identifier. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  {
    "id": "k74272e",
    "description": "Miles's phone",
    "mac": "00:11:22:33:44:55",
    "ip": "1.2.3.4",
    "user": "null",
    "vlan": "255",
    "switchport": null,
    "ip6": "",
    "firstSeen": 1518365681,
    "lastSeen": 1526087474,
    "manufacturer": "Apple",
    "os": "iOS",
    "ssid": "My SSID",
    "wirelessCapabilities": "802.11ac - 2.4 and 5 GHz",
    "smInstalled": true,
    "recentDeviceMac": "00:11:22:33:44:55",
    "clientVpnConnections": [
      {
        "remoteIp": "1.2.3.4",
        "connectedAt": 1522613355,
        "disconnectedAt": 1522613360
      }
    ],
    "lldp": [
      [
        "System name",
        "Some system name"
      ],
      [
        "System description",
        "Some system description"
      ],
      [
        "Port ID",
        "1"
      ],
      [
        "Chassis ID",
        "00:18:0a:00:00:00"
      ],
      [
        "Port description",
        "eth0"
      ],
      [
        "System capabilities",
        "Two-port MAC Relay"
      ]
    ],
    "cdp": null
  }
]
 ```
  
    

   

  

### getNetworkClientConnectionStats 

> Aggregated connectivity info for a given client on this network. Clients are identified by their MAC.

*Example Response*

 ```
 [
  {
    "mac": "00:61:71:c8:51:27",
    "connectionStats": {
      "assoc": 0,
      "auth": 4,
      "dhcp": 0,
      "dns": 0,
      "success": 10
    }
  }
]
 ```
  
    

   

  

### getNetworkClientEvents 

> Return the events associated with this client. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  [
    {
      "deviceSerial": "Q234-ABCD-5678",
      "occurredAt": 1518365681,
      "type": "l3roaming_assoc_start",
      "details": {
        "vap": "1",
        "on_packet": "true"
      }
    }
  ]
]
 ```
  
    

   

  

### getNetworkClientLatencyHistory 

> Return the latency history for a client. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP. The latency data is from a sample of 2% of packets and is grouped into 4 traffic categories: background, best effort, video, voice. Within these categories the sampled packet counters are bucketed by latency in milliseconds.

*Example Response*

 ```
 [
  [
    {
      "t0": 1550534400,
      "t1": 1550620800,
      "latencyBinsByCategory": {
        "backgroundTraffic": {
          "0.5": 41750,
          "1.0": 21552,
          "2.0": 59940,
          "4.0": 146622,
          "8.0": 57354,
          "16.0": 0,
          "32.0": 9954,
          "64.0": 0,
          "128.0": 0,
          "256.0": 1896,
          "512.0": 0,
          "1024.0": 0,
          "2048.0": 0
        },
        "bestEffortTraffic": {
          "0.5": 1840899,
          "1.0": 1644506,
          "2.0": 629958,
          "4.0": 449564,
          "8.0": 2009658,
          "16.0": 1329568,
          "32.0": 282168,
          "64.0": 97573,
          "128.0": 191977,
          "256.0": 30560,
          "512.0": 26032,
          "1024.0": 4943,
          "2048.0": 12072
        },
        "videoTraffic": {
          "0.5": 0,
          "1.0": 0,
          "2.0": 0,
          "4.0": 0,
          "8.0": 0,
          "16.0": 0,
          "32.0": 0,
          "64.0": 0,
          "128.0": 0,
          "256.0": 0,
          "512.0": 0,
          "1024.0": 0,
          "2048.0": 0
        },
        "voiceTraffic": {
          "0.5": 716,
          "1.0": 948,
          "2.0": 474,
          "4.0": 78,
          "8.0": 0,
          "16.0": 0,
          "32.0": 0,
          "64.0": 0,
          "128.0": 0,
          "256.0": 0,
          "512.0": 0,
          "1024.0": 0,
          "2048.0": 0
        }
      }
    }
  ]
]
 ```
  
    

   

  

### getNetworkClientLatencyStats 

> Aggregated latency info for a given client on this network. Clients are identified by their MAC.

*Example Response*

 ```
 [
  {
    "mac": "00:61:71:c8:51:27",
    "latencyStats": {
      "backgroundTraffic": {
        "rawDistribution": {
          "0": 1234,
          "1": 2345,
          "2": 3456,
          "4": 4567,
          "8": 5678,
          "16": 6789,
          "32": 7890,
          "64": 8901,
          "128": 9012,
          "256": 83,
          "512": 1234,
          "1024": 2345,
          "2048": 9999
        },
        "avg": 606.52
      },
      "bestEffortTraffic": "same shape as backgroundTraffic",
      "videoTraffic": "same shape as backgroundTraffic",
      "voiceTraffic": "same shape as backgroundTraffic"
    }
  }
]
 ```
  
    

   

  

### getNetworkClientPolicy 

> Return the policy assigned to a client on the network. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  {
    "mac": "00:11:22:33:44:55",
    "type": "Group policy",
    "groupPolicyId": "101"
  }
]
 ```
  
    

   

  

### updateNetworkClientPolicy 

> Update the policy assigned to a client on the network. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  {
    "mac": "00:11:22:33:44:55",
    "type": "Group policy",
    "groupPolicyId": "101"
  }
]
 ```
  
    

   

  

### getNetworkClientSecurityEvents 

> List the security events for a client. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  [
    {
      "ts": 1547683314.270398,
      "deviceMac": "00:18:0a:01:02:03",
      "clientMac": "A1:B2:C3:D4:E5:F6",
      "srcIp": "1.2.3.4:34195",
      "destIp": "10.20.30.40:80",
      "protocol": "tcp/ip",
      "priority": "2",
      "classification": "4",
      "blocked": true,
      "message": "SERVER-WEBAPP JBoss JMX console access attempt",
      "signature": "1:21516:9",
      "sigSource": ""
    },
    {
      "ts": 1547683827.723265,
      "deviceMac": "00:18:0a:01:02:03",
      "clientMac": "A1:B2:C3:D4:E5:F6",
      "srcIp": "1.2.3.4:56023",
      "destIp": "10.20.30.40:80",
      "protocol": "tcp/ip",
      "priority": "1",
      "classification": "33",
      "blocked": true,
      "message": "POLICY-OTHER Adobe ColdFusion admin interface access attempt",
      "signature": "1:25975:2",
      "sigSource": ""
    }
  ]
]
 ```
  
    

   

  

### getNetworkClientSplashAuthorizationStatus 

> Return the splash authorization for a client, for each SSID they've associated with through splash. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  {
    "ssids": {
      "0": {
        "isAuthorized": true,
        "authorizedAt": "2017-07-19 16:24:13 UTC",
        "expiresAt": "2017-07-20 16:24:13 UTC"
      },
      "2": {
        "isAuthorized": false
      }
    }
  }
]
 ```
  
    

   

  

### updateNetworkClientSplashAuthorizationStatus 

> Update a client's splash authorization. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  {
    "ssids": {
      "0": {
        "isAuthorized": true,
        "authorizedAt": "2017-07-19 16:24:13 UTC",
        "expiresAt": "2017-07-20 16:24:13 UTC"
      },
      "2": {
        "isAuthorized": false
      }
    }
  }
]
 ```
  
    

   

  

### getNetworkClientTrafficHistory 

> Return the client's network traffic data over time. Usage data is in kilobytes. This endpoint requires detailed traffic analysis to be enabled on the Network-wide > General page. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  [
    {
      "ts": 1518365681,
      "application": "Google",
      "destination": "www.google.com",
      "protocol": "UDP",
      "port": 443,
      "recv": 383,
      "sent": 56,
      "numFlows": 5,
      "activeSeconds": 240
    }
  ]
]
 ```
  
    

   

  

### getNetworkClientUsageHistory 

> Return the client's daily usage history. Usage data is in kilobytes. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.

*Example Response*

 ```
 [
  [
    {
      "sent": 500,
      "received": 680,
      "ts": 1518365681
    }
  ]
]
 ```
  
    

   

  

### getNetworkConnectionStats 

> Aggregated connectivity info for this network

*Example Response*

 ```
 [
  {
    "assoc": 1,
    "auth": 5,
    "dhcp": 0,
    "dns": 0,
    "success": 51
  }
]
 ```
  
    

   

  

### getNetworkContentFiltering 

> Return the content filtering settings for an MX network

*Example Response*

 ```
 [
  {
    "allowedUrlPatterns": [
      "http://www.example.org",
      "http://help.com.au"
    ],
    "blockedUrlPatterns": [
      "http://www.example.com",
      "http://www.betting.com"
    ],
    "blockedUrlCategories": [
      {
        "id": "meraki:contentFiltering/category/1",
        "name": "Real Estate"
      },
      {
        "id": "meraki:contentFiltering/category/7",
        "name": "Shopping"
      }
    ],
    "urlCategoryListSize": "topSites"
  }
]
 ```
  
    

   

  

### updateNetworkContentFiltering 

> Update the content filtering settings for an MX network

*Example Response*

 ```
 [
  {
    "allowedUrlPatterns": [
      "http://www.example.org",
      "http://help.com.au"
    ],
    "blockedUrlPatterns": [
      "http://www.example.com",
      "http://www.betting.com"
    ],
    "blockedUrlCategories": [
      {
        "id": "meraki:contentFiltering/category/1",
        "name": "Real Estate"
      },
      {
        "id": "meraki:contentFiltering/category/7",
        "name": "Shopping"
      }
    ],
    "urlCategoryListSize": "topSites"
  }
]
 ```
  
    

   

  

### getNetworkContentFilteringCategories 

> List all available content filtering categories for an MX network

*Example Response*

 ```
 [
  {
    "categories": [
      {
        "id": "meraki:contentFiltering/category/1",
        "name": "Real Estate"
      },
      {
        "id": "meraki:contentFiltering/category/3",
        "name": "Financial Services"
      },
      "...",
      {
        "id": "meraki:contentFiltering/category/11",
        "name": "Adult and Pornography"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkDevices 

> List the devices in a network

*Example Response*

 ```
 [
  [
    {
      "name": "My AP",
      "lat": 37.4180951010362,
      "lng": -122.098531723022,
      "serial": "Q234-ABCD-5678",
      "mac": "00:11:22:33:44:55",
      "model": "MR34",
      "address": "1600 Pennsylvania Ave",
      "notes": "My AP's note",
      "lanIp": "1.2.3.4",
      "tags": " recently-added ",
      "networkId": "N_24329156",
      "beaconIdParams": {
        "uuid": "00000000-0000-0000-0000-000000000000",
        "major": 5,
        "minor": 3
      },
      "firmware": "wireless-25-14"
    }
  ]
]
 ```
  
    

   

  

### claimNetworkDevices 

> Claim a device into a network

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkDevicesConnectionStats 

> Aggregated connectivity info for this network, grouped by node

*Example Response*

 ```
 [
  [
    {
      "serial": "Q2JC-2MJM-FHRD",
      "connectionStats": {
        "assoc": 0,
        "auth": 1,
        "dhcp": 0,
        "dns": 0,
        "success": 43
      }
    },
    {
      "serial": "Q2FJ-3SHB-Y2K2",
      "connectionStats": {
        "assoc": 1,
        "auth": 4,
        "dhcp": 0,
        "dns": 0,
        "success": 8
      }
    }
  ]
]
 ```
  
    

   

  

### getNetworkDevicesLatencyStats 

> Aggregated latency info for this network, grouped by node

*Example Response*

 ```
 [
  [
    {
      "serial": "Q2JC-2MJM-FHRD",
      "latencyStats": {
        "backgroundTraffic": {
          "rawDistribution": {
            "0": 1234,
            "1": 2345,
            "2": 3456,
            "4": 4567,
            "8": 5678,
            "16": 6789,
            "32": 7890,
            "64": 8901,
            "128": 9012,
            "256": 83,
            "512": 1234,
            "1024": 2345,
            "2048": 9999
          },
          "avg": 606.52
        },
        "bestEffortTraffic": "same shape as backgroundTraffic",
        "videoTraffic": "same shape as backgroundTraffic",
        "voiceTraffic": "same shape as backgroundTraffic"
      }
    },
    {
      "serial": "Q2FJ-3SHB-Y2K2",
      "latencyStats": {
        "backgroundTraffic": {
          "rawDistribution": {
            "0": 1234,
            "1": 2345,
            "2": 3456,
            "4": 4567,
            "8": 5678,
            "16": 6789,
            "32": 7890,
            "64": 8901,
            "128": 9012,
            "256": 83,
            "512": 1234,
            "1024": 2345,
            "2048": 9999
          },
          "avg": 606.52
        },
        "bestEffortTraffic": "same shape as backgroundTraffic",
        "videoTraffic": "same shape as backgroundTraffic",
        "voiceTraffic": "same shape as backgroundTraffic"
      }
    }
  ]
]
 ```
  
    

   

  

### getNetworkDevice 

> Return a single device

*Example Response*

 ```
 [
  {
    "name": "My AP",
    "lat": 37.4180951010362,
    "lng": -122.098531723022,
    "serial": "Q234-ABCD-5678",
    "mac": "00:11:22:33:44:55",
    "model": "MR34",
    "address": "1600 Pennsylvania Ave",
    "notes": "My AP's note",
    "lanIp": "1.2.3.4",
    "tags": " recently-added ",
    "networkId": "N_24329156",
    "beaconIdParams": {
      "uuid": "00000000-0000-0000-0000-000000000000",
      "major": 5,
      "minor": 3
    },
    "firmware": "wireless-25-14"
  }
]
 ```
  
    

   

  

### updateNetworkDevice 

> Update the attributes of a device

*Example Response*

 ```
 [
  {
    "name": "My AP",
    "lat": 37.4180951010362,
    "lng": -122.098531723022,
    "serial": "Q234-ABCD-5678",
    "mac": "00:11:22:33:44:55",
    "model": "MR34",
    "address": "1600 Pennsylvania Ave",
    "notes": "My AP's note",
    "lanIp": "1.2.3.4",
    "tags": " recently-added ",
    "networkId": "N_24329156",
    "beaconIdParams": {
      "uuid": "00000000-0000-0000-0000-000000000000",
      "major": 5,
      "minor": 3
    },
    "firmware": "wireless-25-14"
  }
]
 ```
  
    

   

  

### blinkNetworkDeviceLeds 

> Blink the LEDs on a device

*Example Response*

 ```
 [
  {
    "sentToDevice": true
  }
]
 ```
  
    

   

  

### getNetworkDeviceConnectionStats 

> Aggregated connectivity info for a given AP on this network

*Example Response*

 ```
 [
  {
    "serial": "Q2JC-2MJM-FHRD",
    "connectionStats": {
      "assoc": 0,
      "auth": 1,
      "dhcp": 0,
      "dns": 0,
      "success": 43
    }
  }
]
 ```
  
    

   

  

### getNetworkDeviceLatencyStats 

> Aggregated latency info for a given AP on this network

*Example Response*

 ```
 [
  {
    "serial": "Q2JC-2MJM-FHRD",
    "latencyStats": {
      "backgroundTraffic": {
        "rawDistribution": {
          "0": 1234,
          "1": 2345,
          "2": 3456,
          "4": 4567,
          "8": 5678,
          "16": 6789,
          "32": 7890,
          "64": 8901,
          "128": 9012,
          "256": 83,
          "512": 1234,
          "1024": 2345,
          "2048": 9999
        },
        "avg": 606.52
      },
      "bestEffortTraffic": "same shape as backgroundTraffic",
      "videoTraffic": "same shape as backgroundTraffic",
      "voiceTraffic": "same shape as backgroundTraffic"
    }
  }
]
 ```
  
    

   

  

### getNetworkDeviceLldp_cdp 

> List LLDP and CDP information for a device

*Example Response*

 ```
 [
  {
    "sourceMac": "00:11:22:33:44:55",
    "ports": {
      "8": {
        "cdp": {
          "deviceId": "e0553d8cdf53",
          "portId": "Port 10",
          "address": "00:11:22:33:44:55",
          "sourcePort": "8"
        }
      },
      "12": {
        "cdp": {
          "deviceId": "e0553d8cdf53",
          "portId": "Port 11",
          "address": "00:11:22:33:44:55",
          "sourcePort": "12"
        },
        "lldp": {
          "systemName": "Meraki MS350-24X - Phineas",
          "portId": "11",
          "managementAddress": "00:11:22:33:44:55",
          "sourcePort": "12"
        }
      }
    }
  }
]
 ```
  
    

   

  

### getNetworkDeviceLossAndLatencyHistory 

> Get the uplink loss percentage and latency in milliseconds for a wired network device.

*Example Response*

 ```
 [
  [
    {
      "startTime": "2018-10-09T22:18:27Z",
      "endTime": "2018-10-09T22:19:27Z",
      "lossPercent": 5,
      "latencyMs": 324
    },
    {
      "startTime": "2018-10-09T22:19:27Z",
      "endTime": "2018-10-09T22:20:27Z",
      "lossPercent": 1,
      "latencyMs": 43
    },
    {
      "startTime": "2018-10-09T22:20:27Z",
      "endTime": "2018-10-09T22:21:27Z",
      "lossPercent": 0,
      "latencyMs": 44
    }
  ]
]
 ```
  
    

   

  

### getNetworkDeviceManagementInterfaceSettings 

> Return the management interface settings for a device

*Example Response*

 ```
 [
  {
    "wan1": {
      "wanEnabled": "not configured",
      "usingStaticIp": true,
      "staticIp": "1.2.3.4",
      "staticSubnetMask": "255.255.255.0",
      "staticGatewayIp": "1.2.3.1",
      "staticDns": [
        "1.2.3.2",
        "1.2.3.3"
      ],
      "vlan": 7
    },
    "wan2": {
      "wanEnabled": "enabled",
      "usingStaticIp": false,
      "vlan": 2
    }
  }
]
 ```
  
    

   

  

### updateNetworkDeviceManagementInterfaceSettings 

> Update the management interface settings for a device

*Example Response*

 ```
 [
  {
    "wan1": {
      "wanEnabled": "not configured",
      "usingStaticIp": true,
      "staticIp": "1.2.3.4",
      "staticSubnetMask": "255.255.255.0",
      "staticGatewayIp": "1.2.3.1",
      "staticDns": [
        "1.2.3.2",
        "1.2.3.3"
      ],
      "vlan": 7
    },
    "wan2": {
      "wanEnabled": "enabled",
      "usingStaticIp": false,
      "vlan": 2
    }
  }
]
 ```
  
    

   

  

### getNetworkDevicePerformance 

> Return the performance score for a single device. Only primary MX devices supported. If no data is available, a 204 error code is returned.

*Example Response*

 ```
 [
  {
    "perfScore": 10
  }
]
 ```
  
    

   

  

### rebootNetworkDevice 

> Reboot a device

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### removeNetworkDevice 

> Remove a single device

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkDeviceUplink 

> Return the uplink information for a device.

*Example Response*

 ```
 [
  [
    {
      "interface": "WAN 1",
      "status": "Active",
      "ip": "1.2.3.4",
      "gateway": "1.2.3.5",
      "publicIp": "123.123.123.1",
      "dns": "8.8.8.8, 8.8.4.4",
      "usingStaticIp": false
    }
  ]
]
 ```
  
    

   

  

### getNetworkDeviceWirelessRadioSettings 

> Return the radio settings of a device

*Example Response*

 ```
 [
  {
    "serial": "Q234-ABCD-5678",
    "rfProfileId": "1234"
  }
]
 ```
  
    

   

  

### updateNetworkDeviceWirelessRadioSettings 

> Update the radio settings of a device

*Example Response*

 ```
 [
  {
    "serial": "Q234-ABCD-5678",
    "rfProfileId": "1234"
  }
]
 ```
  
    

   

  

### getNetworkDeviceWirelessStatus 

> Return the SSID statuses of an access point

*Example Response*

 ```
 [
  {
    "basicServiceSets": [
      {
        "ssidName": "My SSID",
        "ssidNumber": 0,
        "enabled": true,
        "band": "2.4 GHz",
        "bssid": "8A:15:04:00:00:00",
        "channel": 11,
        "channelWidth": "20 MHz",
        "power": "18 dBm",
        "visible": true,
        "broadcasting": true
      },
      {
        "ssidName": "My SSID",
        "ssidNumber": 0,
        "enabled": true,
        "band": "5 GHz",
        "bssid": "8A:15:14:00:00:00",
        "channel": 149,
        "channelWidth": "80 MHz",
        "power": "18 dBm",
        "visible": true,
        "broadcasting": true
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkFailedConnections 

> List of all failed client connection events on this network in a given time range

*Example Response*

 ```
 [
  [
    {
      "ssidNumber": 0,
      "vlan": -1,
      "clientMac": "00:61:71:c8:51:27",
      "serial": "Q2JC-2MJM-FHRD",
      "failureStep": "auth",
      "type": "802.1X auth fail",
      "ts": 1532032592
    },
    {
      "ssidNumber": 0,
      "vlan": -1,
      "clientMac": "00:61:71:c8:51:27",
      "nodeId": "Q2FJ-3SHB-Y2K2",
      "failureStep": "auth",
      "type": "802.1X auth fail",
      "ts": 1532032593
    },
    {
      "ssidNumber": 0,
      "vlan": -1,
      "clientMac": "00:61:71:c8:51:27",
      "nodeId": "Q2FJ-3SHB-Y2K2",
      "failureStep": "auth",
      "type": "802.1X auth fail",
      "ts": 1532032594
    },
    {
      "ssidNumber": 0,
      "vlan": -1,
      "clientMac": "00:61:71:c8:51:27",
      "nodeId": "Q2FJ-3SHB-Y2K2",
      "failureStep": "auth",
      "type": "802.1X auth fail",
      "ts": 1532032595
    },
    {
      "ssidNumber": 0,
      "vlan": -1,
      "clientMac": "1c:4d:70:7f:5e:5e",
      "nodeId": "Q2FJ-3SHB-Y2K2",
      "failureStep": "assoc",
      "type": "802.1X auth fail",
      "ts": 1532032592
    },
    {
      "ssidNumber": 0,
      "vlan": -1,
      "clientMac": "1c:4d:70:81:8d:0a",
      "nodeId": "Q2FJ-3SHB-Y2K2",
      "failureStep": "auth",
      "type": "802.1X auth fail",
      "ts": 1532032595
    }
  ]
]
 ```
  
    

   

  

### getNetworkFirewalledServices 

> List the appliance services and their accessibility rules

*Example Response*

 ```
 [
  {
    "service": "web",
    "access": "restricted",
    "allowedIps": [
      "123.123.123.1"
    ]
  }
]
 ```
  
    

   

  

### getNetworkFirewalledService 

> Return the accessibility settings of the given service ('ICMP', 'web', or 'SNMP')

*Example Response*

 ```
 [
  {
    "service": "web",
    "access": "restricted",
    "allowedIps": [
      "123.123.123.1"
    ]
  }
]
 ```
  
    

   

  

### updateNetworkFirewalledService 

> Updates the accessibility settings for the given service ('ICMP', 'web', or 'SNMP')

*Example Response*

 ```
 [
  {
    "service": "web",
    "access": "restricted",
    "allowedIps": [
      "123.123.123.1"
    ]
  }
]
 ```
  
    

   

  

### getNetworkGroupPolicies 

> List the group policies in a network

*Example Response*

 ```
 [
  [
    {
      "name": "No video streaming",
      "groupPolicyId": "101",
      "scheduling": {
        "enabled": true,
        "monday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "tuesday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "wednesday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "thursday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "friday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "saturday": {
          "active": false,
          "from": "0:00",
          "to": "24:00"
        },
        "sunday": {
          "active": false,
          "from": "0:00",
          "to": "24:00"
        }
      },
      "bandwidth": {
        "settings": "custom",
        "bandwidthLimits": {
          "limitUp": 1000000,
          "limitDown": 1000000
        }
      },
      "firewallAndTrafficShaping": {
        "settings": "custom",
        "trafficShapingRules": [
          {
            "definitions": [
              {
                "type": "host",
                "value": "google.com"
              },
              {
                "type": "port",
                "value": "9090"
              },
              {
                "type": "ipRange",
                "value": "192.1.0.0"
              },
              {
                "type": "ipRange",
                "value": "192.1.0.0/16"
              },
              {
                "type": "ipRange",
                "value": "10.1.0.0/16:80"
              },
              {
                "type": "localNet",
                "value": "192.168.0.0/16"
              },
              {
                "type": "applicationCategory",
                "value": {
                  "id": "meraki:layer7/category/2",
                  "name": "Blogging"
                }
              },
              {
                "type": "application",
                "value": {
                  "id": "meraki:layer7/application/133",
                  "name": "Battle.net"
                }
              }
            ],
            "perClientBandwidthLimits": {
              "settings": "custom",
              "bandwidthLimits": {
                "limitUp": 1000000,
                "limitDown": 1000000
              }
            },
            "dscpTagValue": null,
            "pcpTagValue": null
          }
        ],
        "l3FirewallRules": [
          {
            "comment": "Allow TCP traffic to subnet with HTTP servers.",
            "policy": "allow",
            "protocol": "tcp",
            "destPort": 443,
            "destCidr": "192.168.1.0/24"
          }
        ],
        "l7FirewallRules": [
          [
            {
              "policy": "deny",
              "type": "application",
              "value": {
                "id": "meraki:layer7/application/67",
                "name": "Xbox LIVE"
              }
            },
            {
              "policy": "deny",
              "type": "applicationCategory",
              "value": {
                "id": "meraki:layer7/category/2",
                "name": "Blogging"
              }
            },
            {
              "policy": "deny",
              "type": "host",
              "value": "google.com"
            },
            {
              "policy": "deny",
              "type": "port",
              "value": "23"
            },
            {
              "policy": "deny",
              "type": "ipRange",
              "value": "10.11.12.00/24"
            },
            {
              "policy": "deny",
              "type": "ipRange",
              "value": "10.11.12.00/24:5555"
            },
            {
              "policy": "deny",
              "type": "blacklistedCountries",
              "value": [
                "AX",
                "CA"
              ]
            },
            {
              "policy": "deny",
              "type": "whitelistedCountries",
              "value": [
                "US"
              ]
            }
          ]
        ]
      },
      "contentFiltering": {
        "allowedUrlPatterns": {
          "settings": "network default",
          "patterns": []
        },
        "blockedUrlPatterns": {
          "settings": "append",
          "patterns": [
            "http://www.example.com",
            "http://www.betting.com"
          ]
        },
        "blockedUrlCategories": {
          "settings": "override",
          "categories": [
            "meraki:contentFiltering/category/1",
            "meraki:contentFiltering/category/7"
          ]
        }
      },
      "splashAuthSettings": "bypass",
      "vlanTagging": {
        "settings": "custom",
        "vlanId": "1"
      },
      "bonjourForwarding": {
        "settings": "custom",
        "rules": [
          {
            "description": "A simple bonjour rule",
            "vlanId": "1",
            "services": [
              "All Services"
            ]
          }
        ]
      }
    }
  ]
]
 ```
  
    

   

  

### createNetworkGroupPolicy 

> Create a group policy

*Example Response*

 ```
 [
  {
    "name": "No video streaming",
    "groupPolicyId": "101",
    "scheduling": {
      "enabled": true,
      "monday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "tuesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "wednesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "thursday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "friday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "saturday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      },
      "sunday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      }
    },
    "bandwidth": {
      "settings": "custom",
      "bandwidthLimits": {
        "limitUp": 1000000,
        "limitDown": 1000000
      }
    },
    "firewallAndTrafficShaping": {
      "settings": "custom",
      "trafficShapingRules": [
        {
          "definitions": [
            {
              "type": "host",
              "value": "google.com"
            },
            {
              "type": "port",
              "value": "9090"
            },
            {
              "type": "ipRange",
              "value": "192.1.0.0"
            },
            {
              "type": "ipRange",
              "value": "192.1.0.0/16"
            },
            {
              "type": "ipRange",
              "value": "10.1.0.0/16:80"
            },
            {
              "type": "localNet",
              "value": "192.168.0.0/16"
            },
            {
              "type": "applicationCategory",
              "value": {
                "id": "meraki:layer7/category/2",
                "name": "Blogging"
              }
            },
            {
              "type": "application",
              "value": {
                "id": "meraki:layer7/application/133",
                "name": "Battle.net"
              }
            }
          ],
          "perClientBandwidthLimits": {
            "settings": "custom",
            "bandwidthLimits": {
              "limitUp": 1000000,
              "limitDown": 1000000
            }
          },
          "dscpTagValue": null,
          "pcpTagValue": null
        }
      ],
      "l3FirewallRules": [
        {
          "comment": "Allow TCP traffic to subnet with HTTP servers.",
          "policy": "allow",
          "protocol": "tcp",
          "destPort": 443,
          "destCidr": "192.168.1.0/24"
        }
      ],
      "l7FirewallRules": [
        [
          {
            "policy": "deny",
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/67",
              "name": "Xbox LIVE"
            }
          },
          {
            "policy": "deny",
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "policy": "deny",
            "type": "host",
            "value": "google.com"
          },
          {
            "policy": "deny",
            "type": "port",
            "value": "23"
          },
          {
            "policy": "deny",
            "type": "ipRange",
            "value": "10.11.12.00/24"
          },
          {
            "policy": "deny",
            "type": "ipRange",
            "value": "10.11.12.00/24:5555"
          },
          {
            "policy": "deny",
            "type": "blacklistedCountries",
            "value": [
              "AX",
              "CA"
            ]
          },
          {
            "policy": "deny",
            "type": "whitelistedCountries",
            "value": [
              "US"
            ]
          }
        ]
      ]
    },
    "contentFiltering": {
      "allowedUrlPatterns": {
        "settings": "network default",
        "patterns": []
      },
      "blockedUrlPatterns": {
        "settings": "append",
        "patterns": [
          "http://www.example.com",
          "http://www.betting.com"
        ]
      },
      "blockedUrlCategories": {
        "settings": "override",
        "categories": [
          "meraki:contentFiltering/category/1",
          "meraki:contentFiltering/category/7"
        ]
      }
    },
    "splashAuthSettings": "bypass",
    "vlanTagging": {
      "settings": "custom",
      "vlanId": "1"
    },
    "bonjourForwarding": {
      "settings": "custom",
      "rules": [
        {
          "description": "A simple bonjour rule",
          "vlanId": "1",
          "services": [
            "All Services"
          ]
        }
      ]
    }
  }
]
 ```
  
    

   

  

### getNetworkGroupPolicy 

> Display a group policy

*Example Response*

 ```
 [
  {
    "name": "No video streaming",
    "groupPolicyId": "101",
    "scheduling": {
      "enabled": true,
      "monday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "tuesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "wednesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "thursday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "friday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "saturday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      },
      "sunday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      }
    },
    "bandwidth": {
      "settings": "custom",
      "bandwidthLimits": {
        "limitUp": 1000000,
        "limitDown": 1000000
      }
    },
    "firewallAndTrafficShaping": {
      "settings": "custom",
      "trafficShapingRules": [
        {
          "definitions": [
            {
              "type": "host",
              "value": "google.com"
            },
            {
              "type": "port",
              "value": "9090"
            },
            {
              "type": "ipRange",
              "value": "192.1.0.0"
            },
            {
              "type": "ipRange",
              "value": "192.1.0.0/16"
            },
            {
              "type": "ipRange",
              "value": "10.1.0.0/16:80"
            },
            {
              "type": "localNet",
              "value": "192.168.0.0/16"
            },
            {
              "type": "applicationCategory",
              "value": {
                "id": "meraki:layer7/category/2",
                "name": "Blogging"
              }
            },
            {
              "type": "application",
              "value": {
                "id": "meraki:layer7/application/133",
                "name": "Battle.net"
              }
            }
          ],
          "perClientBandwidthLimits": {
            "settings": "custom",
            "bandwidthLimits": {
              "limitUp": 1000000,
              "limitDown": 1000000
            }
          },
          "dscpTagValue": null,
          "pcpTagValue": null
        }
      ],
      "l3FirewallRules": [
        {
          "comment": "Allow TCP traffic to subnet with HTTP servers.",
          "policy": "allow",
          "protocol": "tcp",
          "destPort": 443,
          "destCidr": "192.168.1.0/24"
        }
      ],
      "l7FirewallRules": [
        [
          {
            "policy": "deny",
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/67",
              "name": "Xbox LIVE"
            }
          },
          {
            "policy": "deny",
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "policy": "deny",
            "type": "host",
            "value": "google.com"
          },
          {
            "policy": "deny",
            "type": "port",
            "value": "23"
          },
          {
            "policy": "deny",
            "type": "ipRange",
            "value": "10.11.12.00/24"
          },
          {
            "policy": "deny",
            "type": "ipRange",
            "value": "10.11.12.00/24:5555"
          },
          {
            "policy": "deny",
            "type": "blacklistedCountries",
            "value": [
              "AX",
              "CA"
            ]
          },
          {
            "policy": "deny",
            "type": "whitelistedCountries",
            "value": [
              "US"
            ]
          }
        ]
      ]
    },
    "contentFiltering": {
      "allowedUrlPatterns": {
        "settings": "network default",
        "patterns": []
      },
      "blockedUrlPatterns": {
        "settings": "append",
        "patterns": [
          "http://www.example.com",
          "http://www.betting.com"
        ]
      },
      "blockedUrlCategories": {
        "settings": "override",
        "categories": [
          "meraki:contentFiltering/category/1",
          "meraki:contentFiltering/category/7"
        ]
      }
    },
    "splashAuthSettings": "bypass",
    "vlanTagging": {
      "settings": "custom",
      "vlanId": "1"
    },
    "bonjourForwarding": {
      "settings": "custom",
      "rules": [
        {
          "description": "A simple bonjour rule",
          "vlanId": "1",
          "services": [
            "All Services"
          ]
        }
      ]
    }
  }
]
 ```
  
    

   

  

### updateNetworkGroupPolicy 

> Update a group policy

*Example Response*

 ```
 [
  {
    "name": "No video streaming",
    "groupPolicyId": "101",
    "scheduling": {
      "enabled": true,
      "monday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "tuesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "wednesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "thursday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "friday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "saturday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      },
      "sunday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      }
    },
    "bandwidth": {
      "settings": "custom",
      "bandwidthLimits": {
        "limitUp": 1000000,
        "limitDown": 1000000
      }
    },
    "firewallAndTrafficShaping": {
      "settings": "custom",
      "trafficShapingRules": [
        {
          "definitions": [
            {
              "type": "host",
              "value": "google.com"
            },
            {
              "type": "port",
              "value": "9090"
            },
            {
              "type": "ipRange",
              "value": "192.1.0.0"
            },
            {
              "type": "ipRange",
              "value": "192.1.0.0/16"
            },
            {
              "type": "ipRange",
              "value": "10.1.0.0/16:80"
            },
            {
              "type": "localNet",
              "value": "192.168.0.0/16"
            },
            {
              "type": "applicationCategory",
              "value": {
                "id": "meraki:layer7/category/2",
                "name": "Blogging"
              }
            },
            {
              "type": "application",
              "value": {
                "id": "meraki:layer7/application/133",
                "name": "Battle.net"
              }
            }
          ],
          "perClientBandwidthLimits": {
            "settings": "custom",
            "bandwidthLimits": {
              "limitUp": 1000000,
              "limitDown": 1000000
            }
          },
          "dscpTagValue": null,
          "pcpTagValue": null
        }
      ],
      "l3FirewallRules": [
        {
          "comment": "Allow TCP traffic to subnet with HTTP servers.",
          "policy": "allow",
          "protocol": "tcp",
          "destPort": 443,
          "destCidr": "192.168.1.0/24"
        }
      ],
      "l7FirewallRules": [
        [
          {
            "policy": "deny",
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/67",
              "name": "Xbox LIVE"
            }
          },
          {
            "policy": "deny",
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "policy": "deny",
            "type": "host",
            "value": "google.com"
          },
          {
            "policy": "deny",
            "type": "port",
            "value": "23"
          },
          {
            "policy": "deny",
            "type": "ipRange",
            "value": "10.11.12.00/24"
          },
          {
            "policy": "deny",
            "type": "ipRange",
            "value": "10.11.12.00/24:5555"
          },
          {
            "policy": "deny",
            "type": "blacklistedCountries",
            "value": [
              "AX",
              "CA"
            ]
          },
          {
            "policy": "deny",
            "type": "whitelistedCountries",
            "value": [
              "US"
            ]
          }
        ]
      ]
    },
    "contentFiltering": {
      "allowedUrlPatterns": {
        "settings": "network default",
        "patterns": []
      },
      "blockedUrlPatterns": {
        "settings": "append",
        "patterns": [
          "http://www.example.com",
          "http://www.betting.com"
        ]
      },
      "blockedUrlCategories": {
        "settings": "override",
        "categories": [
          "meraki:contentFiltering/category/1",
          "meraki:contentFiltering/category/7"
        ]
      }
    },
    "splashAuthSettings": "bypass",
    "vlanTagging": {
      "settings": "custom",
      "vlanId": "1"
    },
    "bonjourForwarding": {
      "settings": "custom",
      "rules": [
        {
          "description": "A simple bonjour rule",
          "vlanId": "1",
          "services": [
            "All Services"
          ]
        }
      ]
    }
  }
]
 ```
  
    

   

  

### deleteNetworkGroupPolicy 

> Delete a group policy

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkHttpServers 

> List the HTTP servers for a network

*Example Response*

 ```
 [
  [
    {
      "id": "ABC123",
      "networkId": "N_123",
      "name": "My HTTP server",
      "url": "https://www.example.com/webhooks",
      "sharedSecret": "foobar"
    }
  ]
]
 ```
  
    

   

  

### createNetworkHttpServer 

> Add an HTTP server to a network

*Example Response*

 ```
 [
  {
    "id": "ABC123",
    "networkId": "N_123",
    "name": "My HTTP server",
    "url": "https://www.example.com/webhooks",
    "sharedSecret": "foobar"
  }
]
 ```
  
    

   

  

### createNetworkHttpServersWebhookTest 

> Send a test webhook for a network

*Example Response*

 ```
 [
  {
    "id": "1234",
    "url": "https://www.example.com/path",
    "status": "enqueued"
  }
]
 ```
  
    

   

  

### getNetworkHttpServersWebhookTest 

> Return the status of a webhook test for a network

*Example Response*

 ```
 [
  {
    "id": "1234",
    "url": "https://www.example.com/path",
    "status": "delivered"
  }
]
 ```
  
    

   

  

### getNetworkHttpServer 

> Return an HTTP server for a network

*Example Response*

 ```
 [
  {
    "id": "ABC123",
    "networkId": "N_123",
    "name": "My HTTP server",
    "url": "https://www.example.com/webhooks",
    "sharedSecret": "foobar"
  }
]
 ```
  
    

   

  

### updateNetworkHttpServer 

> Update an HTTP server

*Example Response*

 ```
 [
  {
    "id": "ABC123",
    "networkId": "N_123",
    "name": "My HTTP server",
    "url": "https://www.example.com/webhooks",
    "sharedSecret": "foobar"
  }
]
 ```
  
    

   

  

### deleteNetworkHttpServer 

> Delete an HTTP server from a network

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkL3FirewallRules 

> Return the L3 firewall rules for an MX network

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24",
      "srcPort": "Any",
      "srcCidr": "Any",
      "syslogEnabled": false
    }
  ]
]
 ```
  
    

   

  

### updateNetworkL3FirewallRules 

> Update the L3 firewall rules of an MX network

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24",
      "srcPort": "Any",
      "srcCidr": "Any",
      "syslogEnabled": false
    }
  ]
]
 ```
  
    

   

  

### getNetworkL7FirewallRules 

> List the MX L7 firewall rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "policy": "deny",
        "type": "application",
        "value": {
          "id": "meraki:layer7/application/67",
          "name": "Xbox LIVE"
        }
      },
      {
        "policy": "deny",
        "type": "applicationCategory",
        "value": {
          "id": "meraki:layer7/category/2",
          "name": "Blogging"
        }
      },
      {
        "policy": "deny",
        "type": "host",
        "value": "google.com"
      },
      {
        "policy": "deny",
        "type": "port",
        "value": "23"
      },
      {
        "policy": "deny",
        "type": "ipRange",
        "value": "10.11.12.00/24"
      },
      {
        "policy": "deny",
        "type": "ipRange",
        "value": "10.11.12.00/24:5555"
      },
      {
        "policy": "deny",
        "type": "blacklistedCountries",
        "value": [
          "AX",
          "CA"
        ]
      },
      {
        "policy": "deny",
        "type": "whitelistedCountries",
        "value": [
          "US"
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkL7FirewallRules 

> Update the MX L7 firewall rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "policy": "deny",
        "type": "application",
        "value": {
          "id": "meraki:layer7/application/67",
          "name": "Xbox LIVE"
        }
      },
      {
        "policy": "deny",
        "type": "applicationCategory",
        "value": {
          "id": "meraki:layer7/category/2",
          "name": "Blogging"
        }
      },
      {
        "policy": "deny",
        "type": "host",
        "value": "google.com"
      },
      {
        "policy": "deny",
        "type": "port",
        "value": "23"
      },
      {
        "policy": "deny",
        "type": "ipRange",
        "value": "10.11.12.00/24"
      },
      {
        "policy": "deny",
        "type": "ipRange",
        "value": "10.11.12.00/24:5555"
      },
      {
        "policy": "deny",
        "type": "blacklistedCountries",
        "value": [
          "AX",
          "CA"
        ]
      },
      {
        "policy": "deny",
        "type": "whitelistedCountries",
        "value": [
          "US"
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkL7FirewallRulesApplicationCategories 

> Return the L7 firewall application categories and their associated applications for an MX network

*Example Response*

 ```
 [
  [
    {
      "applicationCategories": [
        {
          "id": "meraki:layer7/category/24",
          "name": "Advertising",
          "applications": [
            {
              "id": "meraki:layer7/application/5",
              "name": "Advertising.com"
            },
            {
              "id": "meraki:layer7/application/0",
              "name": "AppNexus"
            },
            {
              "id": "meraki:layer7/application/1",
              "name": "Brightroll"
            }
          ]
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### getNetworkLatencyStats 

> Aggregated latency info for this network

*Example Response*

 ```
 [
  {
    "backgroundTraffic": {
      "rawDistribution": {
        "0": 1234,
        "1": 2345,
        "2": 3456,
        "4": 4567,
        "8": 5678,
        "16": 6789,
        "32": 7890,
        "64": 8901,
        "128": 9012,
        "256": 83,
        "512": 1234,
        "1024": 2345,
        "2048": 9999
      },
      "avg": 606.52
    },
    "bestEffortTraffic": "same shape as backgroundTraffic",
    "videoTraffic": "same shape as backgroundTraffic",
    "voiceTraffic": "same shape as backgroundTraffic"
  }
]
 ```
  
    

   

  

### getNetworkMerakiAuthUsers 

> List the splash or RADIUS users configured under Meraki Authentication for a network

*Example Response*

 ```
 [
  [
    {
      "id": "aGlAaGkuY29t",
      "email": "miles@meraki.com",
      "name": "Miles Meraki",
      "createdAt": 1518365681,
      "accountType": "Guest",
      "authorizations": [
        {
          "authorizedZone": "Store WiFi",
          "expiresAt": 1526087474,
          "authorizedByName": "Miles Meraki",
          "authorizedByEmail": "miles@meraki.com"
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### getNetworkMerakiAuthUser 

> Return the Meraki Auth splash or RADIUS user

*Example Response*

 ```
 [
  {
    "id": "aGlAaGkuY29t",
    "email": "miles@meraki.com",
    "name": "Miles Meraki",
    "createdAt": 1518365681,
    "accountType": "Guest",
    "authorizations": [
      {
        "authorizedZone": "Store WiFi",
        "expiresAt": 1526087474,
        "authorizedByName": "Miles Meraki",
        "authorizedByEmail": "miles@meraki.com"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkNetflowSettings 

> Return the NetFlow traffic reporting settings for a network

*Example Response*

 ```
 [
  {
    "reportingEnabled": true,
    "collectorIp": "1.2.3.4",
    "collectorPort": 443
  }
]
 ```
  
    

   

  

### updateNetworkNetflowSettings 

> Update the NetFlow traffic reporting settings for a network

*Example Response*

 ```
 [
  {
    "reportingEnabled": true,
    "collectorIp": "1.2.3.4",
    "collectorPort": 443
  }
]
 ```
  
    

   

  

### getNetworkOneToManyNatRules 

> Return the 1:Many NAT mapping rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "publicIp": "146.11.11.13",
        "uplink": "internet1",
        "portRules": [
          {
            "name": "Rule 1",
            "protocol": "tcp",
            "publicPort": "9443",
            "localIp": "192.168.128.1",
            "localPort": "443",
            "allowedIps": [
              "any"
            ]
          },
          {
            "name": "Rule 2",
            "protocol": "tcp",
            "publicPort": "8080",
            "localIp": "192.168.128.1",
            "localPort": "80",
            "allowedIps": [
              "10.82.110.0/24",
              "10.82.111.0/24"
            ]
          }
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkOneToManyNatRules 

> Set the 1:Many NAT mapping rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "publicIp": "146.11.11.13",
        "uplink": "internet1",
        "portRules": [
          {
            "name": "Rule 1",
            "protocol": "tcp",
            "publicPort": "9443",
            "localIp": "192.168.128.1",
            "localPort": "443",
            "allowedIps": [
              "any"
            ]
          },
          {
            "name": "Rule 2",
            "protocol": "tcp",
            "publicPort": "8080",
            "localIp": "192.168.128.1",
            "localPort": "80",
            "allowedIps": [
              "10.82.110.0/24",
              "10.82.111.0/24"
            ]
          }
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkOneToOneNatRules 

> Return the 1:1 NAT mapping rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "name": "Service behind NAT",
        "lanIp": "192.168.128.22",
        "publicIp": "146.12.3.33",
        "uplink": "internet1",
        "allowedInbound": [
          {
            "protocol": "tcp",
            "destinationPorts": [
              "80"
            ],
            "allowedIps": [
              "10.82.112.0/24",
              "10.82.0.0/16"
            ]
          },
          {
            "protocol": "udp",
            "destinationPorts": [
              "8080"
            ],
            "allowedIps": [
              "10.81.110.5",
              "10.81.0.0/16"
            ]
          }
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkOneToOneNatRules 

> Set the 1:1 NAT mapping rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "name": "Service behind NAT",
        "lanIp": "192.168.128.22",
        "publicIp": "146.12.3.33",
        "uplink": "internet1",
        "allowedInbound": [
          {
            "protocol": "tcp",
            "destinationPorts": [
              "80"
            ],
            "allowedIps": [
              "10.82.112.0/24",
              "10.82.0.0/16"
            ]
          },
          {
            "protocol": "udp",
            "destinationPorts": [
              "8080"
            ],
            "allowedIps": [
              "10.81.110.5",
              "10.81.0.0/16"
            ]
          }
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkPiiPiiKeys 

> List the keys required to access Personally Identifiable Information (PII) for a given identifier. Exactly one identifier will be accepted. If the organization contains org-wide Systems Manager users matching the key provided then there will be an entry with the key "0" containing the applicable keys.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/piiKeys
```

*Example Response*

 ```
 [
  {
    "N_1234": {
      "macs": [
        "00:77:00:77:00:77"
      ],
      "emails": [
        "fake@example.com"
      ],
      "usernames": [
        "fakename"
      ],
      "serials": [
        "abcd1234"
      ],
      "imeis": [
        "990000862471854"
      ],
      "bluetoothMacs": [
        "00:77:00:77:00:77"
      ]
    }
  }
]
 ```
  
    

   

  

### getNetworkPiiRequests 

> List the PII requests for this network or organization

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```

*Example Response*

 ```
 [
  [
    {
      "id": "1234",
      "organizationWide": false,
      "networkId": "N_1234",
      "type": "delete",
      "mac": "00:77:00:77:00:77",
      "datasets": "['usage', 'events']",
      "status": "Completed",
      "createdAt": 1524692227,
      "completedAt": 1524702227
    }
  ]
]
 ```
  
    

   

  

### createNetworkPiiRequest 

> Submit a new delete or restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```

*Example Response*

 ```
 [
  {
    "id": "1234",
    "organizationWide": false,
    "networkId": "N_1234",
    "type": "delete",
    "mac": "00:77:00:77:00:77",
    "datasets": "['usage', 'events']",
    "status": "Not visible in Dashboard; database deletion in process",
    "createdAt": 1524692227,
    "completedAt": null
  }
]
 ```
  
    

   

  

### getNetworkPiiRequest 

> Return a PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{requestId}
```

*Example Response*

 ```
 [
  {
    "id": "1234",
    "organizationWide": false,
    "networkId": "N_1234",
    "type": "delete",
    "mac": "00:77:00:77:00:77",
    "datasets": "['usage', 'events']",
    "status": "Completed",
    "createdAt": 1524692227,
    "completedAt": 1524702227
  }
]
 ```
  
    

   

  

### deleteNetworkPiiRequest 

> Delete a restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{requestId}
```

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkPiiSmDevicesForKey 

> Given a piece of Personally Identifiable Information (PII), return the Systems Manager device ID(s) associated with that identifier. These device IDs can be used with the Systems Manager API endpoints to retrieve device details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smDevicesForKey
```

*Example Response*

 ```
 [
  {
    "N_1234": [
      "1099541095293",
      "8348382288234"
    ]
  }
]
 ```
  
    

   

  

### getNetworkPiiSmOwnersForKey 

> Given a piece of Personally Identifiable Information (PII), return the Systems Manager owner ID(s) associated with that identifier. These owner IDs can be used with the Systems Manager API endpoints to retrieve owner details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smOwnersForKey
```

*Example Response*

 ```
 [
  {
    "N_1234": [
      "1099541095293"
    ]
  }
]
 ```
  
    

   

  

### getNetworkPortForwardingRules 

> Return the port forwarding rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "lanIp": "192.168.128.1",
        "allowedIps": [
          "any"
        ],
        "name": "Description of Port Forwarding Rule",
        "protocol": "tcp",
        "publicPort": "8100-8101",
        "localPort": "442-443",
        "uplink": "both"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkPortForwardingRules 

> Update the port forwarding rules for an MX network

*Example Response*

 ```
 [
  {
    "rules": [
      {
        "lanIp": "192.168.128.1",
        "allowedIps": [
          "any"
        ],
        "name": "Description of Port Forwarding Rule",
        "protocol": "tcp",
        "publicPort": "8100-8101",
        "localPort": "442-443",
        "uplink": "both"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSecurityIntrusionSettings 

> Returns all supported intrusion settings for an MX network

*Example Response*

 ```
 [
  {
    "mode": "prevention",
    "idsRulesets": "balanced",
    "protectedNetworks": {
      "useDefault": false,
      "includedCidr": [
        "10.0.0.0/8",
        "127.0.0.0/8",
        "169.254.0.0/16",
        "172.16.0.0/12"
      ],
      "excludedCidr": [
        "10.0.0.0/8",
        "127.0.0.0/8"
      ]
    }
  }
]
 ```
  
    

   

  

### updateNetworkSecurityIntrusionSettings 

> Set the supported intrusion settings for an MX network

*Example Response*

 ```
 [
  {
    "mode": "prevention",
    "idsRulesets": "balanced",
    "protectedNetworks": {
      "useDefault": false,
      "includedCidr": [
        "10.0.0.0/8",
        "127.0.0.0/8",
        "169.254.0.0/16",
        "172.16.0.0/12"
      ],
      "excludedCidr": [
        "10.0.0.0/8",
        "127.0.0.0/8"
      ]
    }
  }
]
 ```
  
    

   

  

### getNetworkSecurityMalwareSettings 

> Returns all supported malware settings for an MX network

*Example Response*

 ```
 [
  {
    "mode": "enabled",
    "allowedUrls": [
      {
        "url": "example.org",
        "comment": "allow example.org"
      },
      {
        "url": "help.com.au",
        "comment": "allow help.com.au"
      }
    ],
    "allowedFiles": [
      {
        "sha256": "e82c5f7d75004727e1f3b94426b9a11c8bc4c312a9170ac9a73abace40aef503",
        "comment": "allow ZIP file"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkSecurityMalwareSettings 

> Set the supported malware settings for an MX network

*Example Response*

 ```
 [
  {
    "mode": "enabled",
    "allowedUrls": [
      {
        "url": "example.org",
        "comment": "allow example.org"
      },
      {
        "url": "help.com.au",
        "comment": "allow help.com.au"
      }
    ],
    "allowedFiles": [
      {
        "sha256": "e82c5f7d75004727e1f3b94426b9a11c8bc4c312a9170ac9a73abace40aef503",
        "comment": "allow ZIP file"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSecurityEvents 

> List the security events for a network

*Example Response*

 ```
 [
  [
    {
      "ts": 1547683314.270398,
      "deviceMac": "00:18:0a:01:02:03",
      "clientMac": "A1:B2:C3:D4:E5:F6",
      "srcIp": "1.2.3.4:34195",
      "destIp": "10.20.30.40:80",
      "protocol": "tcp/ip",
      "priority": "2",
      "classification": "4",
      "blocked": true,
      "message": "SERVER-WEBAPP JBoss JMX console access attempt",
      "signature": "1:21516:9",
      "sigSource": ""
    },
    {
      "ts": 1547683827.723265,
      "deviceMac": "00:18:0a:01:02:03",
      "clientMac": "A1:B2:C3:D4:E5:F6",
      "srcIp": "1.2.3.4:56023",
      "destIp": "10.20.30.40:80",
      "protocol": "tcp/ip",
      "priority": "1",
      "classification": "33",
      "blocked": true,
      "message": "POLICY-OTHER Adobe ColdFusion admin interface access attempt",
      "signature": "1:25975:2",
      "sigSource": ""
    }
  ]
]
 ```
  
    

   

  

### getNetworkSiteToSiteVpn 

> Return the site-to-site VPN settings of a network. Only valid for MX networks.

*Example Response*

 ```
 [
  {
    "mode": "spoke",
    "hubs": [
      {
        "hubId": "N_4901849",
        "useDefaultRoute": true
      },
      {
        "hubId": "N_1892489",
        "useDefaultRoute": false
      }
    ],
    "subnets": [
      {
        "localSubnet": "192.168.1.0/24",
        "useVpn": true
      },
      {
        "localSubnet": "192.168.128.0/24",
        "useVpn": true
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkSiteToSiteVpn 

> Update the site-to-site VPN settings of a network. Only valid for MX networks in NAT mode.

*Example Response*

 ```
 [
  {
    "mode": "spoke",
    "hubs": [
      {
        "hubId": "N_4901849",
        "useDefaultRoute": true
      },
      {
        "hubId": "N_1892489",
        "useDefaultRoute": false
      }
    ],
    "subnets": [
      {
        "localSubnet": "192.168.1.0/24",
        "useVpn": true
      },
      {
        "localSubnet": "192.168.128.0/24",
        "useVpn": true
      }
    ]
  }
]
 ```
  
    

   

  

### createNetworkSmAppPolaris 

> Create a new Polaris app

*Example Response*

 ```
 [
  {
    "success": true,
    "app_id": "123456",
    "bundle_id": "com.cisco.polaris",
    "scope": "withAny",
    "tags": " tag1 tag2 ",
    "prevent_auto_install": true,
    "uses_vpp": true
  }
]
 ```
  
    

   

  

### getNetworkSmAppPolaris 

> Get details for a Cisco Polaris app if it exists

*Example Response*

 ```
 [
  {
    "app_id": "123456",
    "bundle_id": "com.cisco.polaris",
    "scope": "withAny",
    "tags": " tag1 tag2 ",
    "prevent_auto_install": true,
    "uses_vpp": true
  }
]
 ```
  
    

   

  

### updateNetworkSmAppPolaris 

> Update an existing Polaris app

*Example Response*

 ```
 [
  {
    "success": true,
    "app_id": "123456",
    "bundle_id": "com.cisco.polaris",
    "scope": "withAny",
    "tags": " tag1 tag2 ",
    "prevent_auto_install": true,
    "uses_vpp": true
  }
]
 ```
  
    

   

  

### deleteNetworkSmAppPolaris 

> Delete a Cisco Polaris app

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### createNetworkSmBypassActivationLockAttempt 

> Bypass activation lock attempt

*Example Response*

 ```
 [
  {
    "id": "1234",
    "status": "pending",
    "data": {}
  }
]
 ```
  
    

   

  

### getNetworkSmBypassActivationLockAttempt 

> Bypass activation lock attempt status

*Example Response*

 ```
 [
  {
    "id": "1234",
    "status": "complete",
    "data": {
      "2090938209": {
        "success": false,
        "errors": [
          "Activation lock bypass code not known for this device"
        ]
      },
      "38290139892": {
        "success": true
      }
    }
  }
]
 ```
  
    

   

  

### updateNetworkSmDeviceFields 

> Modify the fields of a device

*Example Response*

 ```
 [
  {
    "success": [
      {
        "id": "1284392014819",
        "serial": "F5XKHEBX",
        "wifiMac": "00:11:22:33:44:55",
        "name": "My name"
      }
    ]
  }
]
 ```
  
    

   

  

### wipeNetworkSmDevice 

> Wipe a device

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### getNetworkSmDevices 

> List the devices enrolled in an SM network with various specified fields and filters

*Example Response*

 ```
 [
  {
    "devices": [
      {
        "id": "1284392014819",
        "name": "Miles's phone",
        "tags": [
          "tag1",
          "tag2"
        ],
        "ssid": "My SSID",
        "wifiMac": "00:11:22:33:44:55",
        "osName": "iOS 9.3.5",
        "systemModel": "iPhone",
        "uuid": "3d990628ede4c628d52",
        "serialNumber": "F5XKHEBX",
        "ip": "1.2.3.4"
      }
    ],
    "batchToken": "MMbCbpHZtG3TKUCr9B9uc5"
  }
]
 ```
  
    

   

  

### checkinNetworkSmDevices 

> Force check-in a set of devices

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### moveNetworkSmDevices 

> Move a set of devices to a new network

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### updateNetworkSmDevicesTags 

> Add, delete, or update the tags of a set of devices

*Example Response*

 ```
 [
  {
    "success": [
      {
        "id": "1284392014819",
        "serial": "F5XKHEBX",
        "wifiMac": "00:11:22:33:44:55",
        "tags": [
          "tag1",
          "tag2"
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### unenrollNetworkSmDevice 

> Unenroll a device

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### createNetworkSmProfileClarity 

> Create a new profile containing a Cisco Clarity payload

*Example Response*

 ```
 [
  {
    "success": true,
    "profile_id": "12345"
  }
]
 ```
  
    

   

  

### updateNetworkSmProfileClarity 

> Update an existing profile containing a Cisco Clarity payload

*Example Response*

 ```
 [
  {
    "success": true,
    "profile_id": "12345"
  }
]
 ```
  
    

   

  

### addNetworkSmProfileClarity 

> Add a Cisco Clarity payload to an existing profile

*Example Response*

 ```
 [
  {
    "success": true,
    "profile_id": "12345"
  }
]
 ```
  
    

   

  

### getNetworkSmProfileClarity 

> Get details for a Cisco Clarity payload

*Example Response*

 ```
 [
  {
    "profile_id": "12345",
    "name": "Cisco Clarity Config",
    "PluginBundleID": "com.cisco.security.app",
    "FilterBrowsers": true,
    "FilterSockets": true,
    "VendorConfig": [
      {
        "key": "cloud_asn1_server_host",
        "type": "manual_string",
        "value": "immunet.com"
      },
      {
        "key": "cloud_asn1_server_port",
        "type": "manual_int",
        "value": 443
      }
    ]
  }
]
 ```
  
    

   

  

### deleteNetworkSmProfileClarity 

> Delete a Cisco Clarity payload. Deletes the entire profile if it's empty after removing the payload.

*Example Response*

 ```
 [
  {
    "success": true,
    "payload_deleted": true,
    "profile_deleted": true
  }
]
 ```
  
    

   

  

### createNetworkSmProfileUmbrella 

> Create a new profile containing a Cisco Umbrella payload

*Example Response*

 ```
 [
  {
    "success": true,
    "profile_id": "12345"
  }
]
 ```
  
    

   

  

### updateNetworkSmProfileUmbrella 

> Update an existing profile containing a Cisco Umbrella payload

*Example Response*

 ```
 [
  {
    "success": true,
    "profile_id": "12345"
  }
]
 ```
  
    

   

  

### addNetworkSmProfileUmbrella 

> Add a Cisco Umbrella payload to an existing profile

*Example Response*

 ```
 [
  {
    "success": true,
    "profile_id": "12345"
  }
]
 ```
  
    

   

  

### getNetworkSmProfileUmbrella 

> Get details for a Cisco Umbrella payload

*Example Response*

 ```
 [
  {
    "profile_id": "12345",
    "name": "Cisco Umbrella Config",
    "AppBundleIdentifier": "com.cisco.security",
    "ProviderBundleIdentifier": "com.cisco.umbrella",
    "ProviderConfiguration": [
      {
        "key": "internalDomains",
        "type": "manual_list",
        "value": [
          "meraki.com",
          "cisco.com"
        ]
      },
      {
        "key": "user_id",
        "type": "manual_string",
        "value": "miles"
      }
    ]
  }
]
 ```
  
    

   

  

### deleteNetworkSmProfileUmbrella 

> Delete a Cisco Umbrella payload. Deletes the entire profile if it's empty after removing the payload

*Example Response*

 ```
 [
  {
    "success": true,
    "payload_deleted": true,
    "profile_deleted": true
  }
]
 ```
  
    

   

  

### getNetworkSmProfiles 

> List all the profiles in the network

*Example Response*

 ```
 [
  {
    "profiles": [
      {
        "id": "1234",
        "payload_display_name": "API Profile",
        "payload_identifier": "com.meraki.sm.1",
        "payload_description": "API docs test",
        "scope": "some",
        "tags": [
          "tag1",
          "tag2"
        ],
        "wifis": [],
        "payload_types": [
          "Privacy",
          "Document"
        ]
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSmTargetGroups 

> List the target groups in this network

*Example Response*

 ```
 [
  [
    {
      "name": "My target group",
      "scope": "none",
      "tags": "[]",
      "type": "devices"
    }
  ]
]
 ```
  
    

   

  

### createNetworkSmTargetGroup 

> Add a target group

*Example Response*

 ```
 [
  {
    "name": "My target group",
    "scope": "none",
    "tags": "[]",
    "type": "devices"
  }
]
 ```
  
    

   

  

### getNetworkSmTargetGroup 

> Return a target group

*Example Response*

 ```
 [
  {
    "name": "My target group",
    "scope": "none",
    "tags": "[]",
    "type": "devices"
  }
]
 ```
  
    

   

  

### updateNetworkSmTargetGroup 

> Update a target group

*Example Response*

 ```
 [
  {
    "name": "My target group",
    "scope": "none",
    "tags": "[]",
    "type": "devices"
  }
]
 ```
  
    

   

  

### deleteNetworkSmTargetGroup 

> Delete a target group from a network

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkSmUserDeviceProfiles 

> Get the profiles associated with a user

*Example Response*

 ```
 [
  {
    "id": "1284392014819",
    "isEncrypted": true,
    "isManaged": true,
    "profileData": {},
    "profileIdentifier": "com.test.app",
    "name": "My profile",
    "version": "0.0.1"
  }
]
 ```
  
    

   

  

### getNetworkSmUserSoftwares 

> Get a list of softwares associated with a user

*Example Response*

 ```
 [
  [
    {
      "bundleSize": null,
      "createdAt": "2018-02-11T00:00:00Z",
      "dynamicSize": null,
      "id": "1284392014819",
      "identifier": "com.test.app",
      "installedAt": "2018-05-12T00:00:00Z",
      "toInstall": null,
      "iosRedemptionCode": null,
      "isManaged": true,
      "itunesId": null,
      "licenseKey": null,
      "name": "My app",
      "path": "/Path/to/app.app",
      "redemptionCode": null,
      "shortVersion": null,
      "status": null,
      "toUninstall": false,
      "uninstalledAt": null,
      "updatedAt": "2018-05-12T00:00:00Z",
      "vendor": "Apple",
      "version": "0.1"
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmUsers 

> List the owners in an SM network with various specified fields and filters

*Example Response*

 ```
 [
  {
    "id": "1234",
    "email": "miles@meraki.com",
    "fullName": "Miles Meraki",
    "username": "",
    "hasPassword": false,
    "tags": [
      "tag1",
      "tag2"
    ],
    "adGroups": [],
    "asmGroups": [],
    "isExternal": false,
    "displayName": "Miles Meraki <miles@meraki.com>",
    "hasIdentityCertificate": false,
    "userThumbnail": "https://s3.amazonaws.com/image.extension"
  }
]
 ```
  
    

   

  

### getNetworkSmCellularUsageHistory 

> Return the client's daily cellular data usage history. Usage data is in kilobytes.

*Example Response*

 ```
 [
  {
    "sent": 138,
    "recv": 61,
    "ts": 1526087474
  }
]
 ```
  
    

   

  

### getNetworkSmCerts 

> List the certs on a device

*Example Response*

 ```
 [
  [
    {
      "name": "My Cert",
      "notValidAfter": "May 12, 2018",
      "notValidBefore": "Feb 11, 2018",
      "certPem": "-----BEGIN CERTIFICATE-----\n-----END CERTIFICATE-----\n",
      "issuer": "",
      "subject": "",
      "id": 15
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmDeviceProfiles 

> Get the profiles associated with a device

*Example Response*

 ```
 [
  {
    "id": "1284392014819",
    "isEncrypted": true,
    "isManaged": true,
    "profileData": {},
    "profileIdentifier": "com.test.app",
    "name": "My profile",
    "version": "0.0.1"
  }
]
 ```
  
    

   

  

### getNetworkSmNetworkAdapters 

> List the network adapters of a device

*Example Response*

 ```
 [
  [
    {
      "dhcpServer": "123.123.123.1",
      "dnsServer": "8.8.8.8, 8.8.4.4",
      "gateway": "1.2.3.5",
      "id": "1284392014819",
      "ip": "1.2.3.4",
      "mac": "00:11:22:33:44:55",
      "name": "en0",
      "subnet": "255.255.255.0"
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmRestrictions 

> List the restrictions on a device

*Example Response*

 ```
 [
  [
    {
      "profile": "com.meraki.sm.1",
      "restrictions": {
        "myRestriction": {
          "value": true
        }
      }
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmSecurityCenters 

> List the security centers on a device

*Example Response*

 ```
 [
  [
    {
      "isRooted": true,
      "hasAntiVirus": true,
      "antiVirusName": "meraki_av",
      "isFireWallEnabled": true,
      "hasFireWallInstalled": true,
      "fireWallName": "meraki_fw",
      "isDiskEncrypted": true,
      "isAutoLoginDisabled": true,
      "id": "1284392014819",
      "runningProcs": "/software,/software_2"
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmSoftwares 

> Get a list of softwares associated with a device

*Example Response*

 ```
 [
  [
    {
      "bundleSize": null,
      "createdAt": "2018-02-11T00:00:00Z",
      "dynamicSize": null,
      "id": "1284392014819",
      "identifier": "com.test.app",
      "installedAt": "2018-05-12T00:00:00Z",
      "toInstall": null,
      "iosRedemptionCode": null,
      "isManaged": true,
      "itunesId": null,
      "licenseKey": null,
      "name": "My app",
      "path": "/Path/to/app.app",
      "redemptionCode": null,
      "shortVersion": null,
      "status": null,
      "toUninstall": false,
      "uninstalledAt": null,
      "updatedAt": "2018-05-12T00:00:00Z",
      "vendor": "Apple",
      "version": "0.1"
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmWlanLists 

> List the saved SSID names on a device

*Example Response*

 ```
 [
  [
    {
      "createdAt": "2018-02-11T00:00:00Z",
      "id": "1284392014819",
      "xml": "Preferred networks on en0:"
    }
  ]
]
 ```
  
    

   

  

### getNetworkSnmpSettings 

> Return the SNMP settings for a network

*Example Response*

 ```
 [
  {
    "access": "users",
    "users": [
      {
        "username": "AzureDiamond",
        "passphrase": "hunter2"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkSnmpSettings 

> Update the SNMP settings for a network

*Example Response*

 ```
 [
  {
    "access": "users",
    "users": [
      {
        "username": "AzureDiamond",
        "passphrase": "hunter2"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSplashLoginAttempts 

> List the splash login attempts for a network

*Example Response*

 ```
 [
  [
    {
      "name": "Miles Meraki",
      "login": "miles@meraki.com",
      "ssid": "My SSID",
      "loginAt": 1518365681,
      "gatewayDeviceMac": "00:11:22:33:44:55",
      "clientMac": "22:33:44:55:66:77",
      "clientId": "k74272e",
      "authorization": "success"
    }
  ]
]
 ```
  
    

   

  

### splitNetwork 

> Split a combined network into individual networks for each type of device

*Example Response*

 ```
 [
  {
    "resultingNetworks": [
      {
        "id": "N_1234",
        "organizationId": "2930418",
        "name": "Long Island Office - switch",
        "timeZone": "America/Los_Angeles",
        "tags": " tag1 tag2 ",
        "type": "switch",
        "disableMyMerakiCom": false
      },
      {
        "id": "N_5678",
        "organizationId": "2930418",
        "name": "Long Island Office - wireless",
        "timeZone": "America/Los_Angeles",
        "tags": " tag1 tag2 ",
        "type": "wireless",
        "disableMyMerakiCom": false
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSsids 

> List the SSIDs in a network. Supports networks with access points or wireless-enabled security appliances and teleworker gateways.

*Example Response*

 ```
 [
  [
    {
      "number": 0,
      "name": "My SSID",
      "enabled": true,
      "splashPage": "Click-through splash page",
      "ssidAdminAccessible": false,
      "authMode": "8021x-radius",
      "encryptionMode": "wpa-eap",
      "wpaEncryptionMode": "WPA2 only",
      "radiusServers": [
        {
          "host": "0.0.0.0",
          "port": 3000
        }
      ],
      "radiusAccountingEnabled": false,
      "radiusEnabled": true,
      "radiusAttributeForGroupPolicies": "Filter-Id",
      "radiusFailoverPolicy": "null",
      "radiusLoadBalancingPolicy": "null",
      "ipAssignmentMode": "NAT mode",
      "adminSplashUrl": "http://example.com",
      "splashTimeout": "30 minutes",
      "walledGardenEnabled": true,
      "walledGardenRanges": "example.com",
      "minBitrate": 11,
      "bandSelection": "5 GHz band only",
      "perClientBandwidthLimitUp": 0,
      "perClientBandwidthLimitDown": 0
    }
  ]
]
 ```
  
    

   

  

### getNetworkSsid 

> Return a single SSID

*Example Response*

 ```
 [
  {
    "number": 0,
    "name": "My SSID",
    "enabled": true,
    "splashPage": "Click-through splash page",
    "ssidAdminAccessible": false,
    "authMode": "8021x-radius",
    "encryptionMode": "wpa-eap",
    "wpaEncryptionMode": "WPA2 only",
    "radiusServers": [
      {
        "host": "0.0.0.0",
        "port": 3000
      }
    ],
    "radiusAccountingEnabled": false,
    "radiusEnabled": true,
    "radiusAttributeForGroupPolicies": "Filter-Id",
    "radiusFailoverPolicy": "null",
    "radiusLoadBalancingPolicy": "null",
    "ipAssignmentMode": "NAT mode",
    "adminSplashUrl": "http://example.com",
    "splashTimeout": "30 minutes",
    "walledGardenEnabled": true,
    "walledGardenRanges": "example.com",
    "minBitrate": 11,
    "bandSelection": "5 GHz band only",
    "perClientBandwidthLimitUp": 0,
    "perClientBandwidthLimitDown": 0
  }
]
 ```
  
    

   

  

### updateNetworkSsid 

> Update the attributes of an SSID

*Example Response*

 ```
 [
  {
    "number": 0,
    "name": "My SSID",
    "enabled": true,
    "splashPage": "Click-through splash page",
    "ssidAdminAccessible": false,
    "authMode": "8021x-radius",
    "encryptionMode": "wpa-eap",
    "wpaEncryptionMode": "WPA2 only",
    "radiusServers": [
      {
        "host": "0.0.0.0",
        "port": 3000
      }
    ],
    "radiusAccountingEnabled": false,
    "radiusEnabled": true,
    "radiusAttributeForGroupPolicies": "Filter-Id",
    "radiusFailoverPolicy": "null",
    "radiusLoadBalancingPolicy": "null",
    "ipAssignmentMode": "NAT mode",
    "adminSplashUrl": "http://example.com",
    "splashTimeout": "30 minutes",
    "walledGardenEnabled": true,
    "walledGardenRanges": "example.com",
    "minBitrate": 11,
    "bandSelection": "5 GHz band only",
    "perClientBandwidthLimitUp": 0,
    "perClientBandwidthLimitDown": 0
  }
]
 ```
  
    

   

  

### getNetworkSsidL3FirewallRules 

> Return the L3 firewall rules for an SSID on an MR network

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24"
    }
  ]
]
 ```
  
    

   

  

### updateNetworkSsidL3FirewallRules 

> Update the L3 firewall rules of an SSID on an MR network

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24"
    }
  ]
]
 ```
  
    

   

  

### getNetworkSsidSplashSettings 

> Display the splash page settings for the given SSID

*Example Response*

 ```
 [
  {
    "ssidNumber": 0,
    "splashPage": "Click-through splash page",
    "splashUrl": "https://www.custom_splash_url.com",
    "useSplashUrl": true
  }
]
 ```
  
    

   

  

### updateNetworkSsidSplashSettings 

> Modify the splash page settings for the given SSID

*Example Response*

 ```
 [
  {
    "ssidNumber": 0,
    "splashPage": "Click-through splash page",
    "splashUrl": "https://www.custom_splash_url.com",
    "useSplashUrl": true
  }
]
 ```
  
    

   

  

### updateNetworkSsidTrafficShaping 

> Update the traffic shaping settings for an SSID on an MR network

*Example Response*

 ```
 [
  {
    "trafficShapingEnabled": true,
    "defaultRulesEnabled": true,
    "rules": [
      {
        "definitions": [
          {
            "type": "host",
            "value": "google.com"
          },
          {
            "type": "port",
            "value": "9090"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0/16"
          },
          {
            "type": "ipRange",
            "value": "10.1.0.0/16:80"
          },
          {
            "type": "localNet",
            "value": "192.168.0.0/16"
          },
          {
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/133",
              "name": "Battle.net"
            }
          }
        ],
        "perClientBandwidthLimits": {
          "settings": "custom",
          "bandwidthLimits": {
            "limitUp": 1000000,
            "limitDown": 1000000
          }
        },
        "dscpTagValue": null,
        "pcpTagValue": null
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSsidTrafficShaping 

> Display the traffic shaping settings for a SSID on an MR network

*Example Response*

 ```
 [
  {
    "trafficShapingEnabled": true,
    "defaultRulesEnabled": true,
    "rules": [
      {
        "definitions": [
          {
            "type": "host",
            "value": "google.com"
          },
          {
            "type": "port",
            "value": "9090"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0/16"
          },
          {
            "type": "ipRange",
            "value": "10.1.0.0/16:80"
          },
          {
            "type": "localNet",
            "value": "192.168.0.0/16"
          },
          {
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/133",
              "name": "Battle.net"
            }
          }
        ],
        "perClientBandwidthLimits": {
          "settings": "custom",
          "bandwidthLimits": {
            "limitUp": 1000000,
            "limitDown": 1000000
          }
        },
        "dscpTagValue": null,
        "pcpTagValue": null
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkStaticRoutes 

> List the static routes for this network

*Example Response*

 ```
 [
  [
    {
      "id": "d7fa4948-7921-4dfa-af6b-ae8b16c20c39",
      "networkId": "N_24329156",
      "name": "My route",
      "gatewayIp": "1.2.3.5",
      "subnet": "192.168.1.0/24",
      "fixedIpAssignments": "{}",
      "reservedIpRanges": "[]",
      "enabled": true
    }
  ]
]
 ```
  
    

   

  

### createNetworkStaticRoute 

> Add a static route

*Example Response*

 ```
 [
  {
    "name": "My route",
    "subnet": "192.168.1.0/24",
    "gatewayIp": "1.2.3.5"
  }
]
 ```
  
    

   

  

### getNetworkStaticRoute 

> Return a static route

*Example Response*

 ```
 [
  {
    "id": "d7fa4948-7921-4dfa-af6b-ae8b16c20c39",
    "networkId": "N_24329156",
    "name": "My route",
    "gatewayIp": "1.2.3.5",
    "subnet": "192.168.1.0/24",
    "fixedIpAssignments": "{}",
    "reservedIpRanges": "[]",
    "enabled": true
  }
]
 ```
  
    

   

  

### updateNetworkStaticRoute 

> Update a static route

*Example Response*

 ```
 [
  {
    "id": "d7fa4948-7921-4dfa-af6b-ae8b16c20c39",
    "networkId": "N_24329156",
    "name": "My route",
    "gatewayIp": "1.2.3.5",
    "subnet": "192.168.1.0/24",
    "fixedIpAssignments": "{}",
    "reservedIpRanges": "[]",
    "enabled": true
  }
]
 ```
  
    

   

  

### deleteNetworkStaticRoute 

> Delete a static route from a network

*Example Response*

 ```
 []
 ```
  
    

   

  

### swapNetworkWarmspare 

> Swap MX primary and warm spare appliances

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### getNetworkSwitchPortSchedules 

> List switch port schedules

*Example Response*

 ```
 [
  [
    {
      "id": "1234",
      "networkId": "N_24329156",
      "name": "Weekdays schedule",
      "portSchedule": {
        "monday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "tuesday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "wednesday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "thursday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "friday": {
          "active": true,
          "from": "9:00",
          "to": "17:00"
        },
        "saturday": {
          "active": false,
          "from": "0:00",
          "to": "24:00"
        },
        "sunday": {
          "active": false,
          "from": "0:00",
          "to": "24:00"
        }
      }
    }
  ]
]
 ```
  
    

   

  

### createNetworkSwitchPortSchedule 

> Add a switch port schedule

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "Weekdays schedule",
    "portSchedule": {
      "monday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "tuesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "wednesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "thursday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "friday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "saturday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      },
      "sunday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      }
    }
  }
]
 ```
  
    

   

  

### deleteNetworkSwitchPortSchedule 

> Delete a switch port schedule

*Example Response*

 ```
 []
 ```
  
    

   

  

### updateNetworkSwitchPortSchedule 

> Update a switch port schedule

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "Weekdays schedule",
    "portSchedule": {
      "monday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "tuesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "wednesday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "thursday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "friday": {
        "active": true,
        "from": "9:00",
        "to": "17:00"
      },
      "saturday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      },
      "sunday": {
        "active": false,
        "from": "0:00",
        "to": "24:00"
      }
    }
  }
]
 ```
  
    

   

  

### getNetworkSwitchSettings 

> Returns the switch network settings

*Example Response*

 ```
 [
  {
    "useCombinedPower": false,
    "powerExceptions": [
      {
        "serial": "Q234-ABCD-0001",
        "powerType": "redundant"
      },
      {
        "serial": "Q234-ABCD-0002",
        "powerType": "combined"
      },
      {
        "serial": "Q234-ABCD-0003",
        "powerType": "redundant"
      },
      {
        "serial": "Q234-ABCD-0004",
        "powerType": "useNetworkSetting"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkSwitchSettings 

> Update switch network settings

*Example Response*

 ```
 [
  {
    "useCombinedPower": false,
    "powerExceptions": [
      {
        "serial": "Q234-ABCD-0001",
        "powerType": "redundant"
      },
      {
        "serial": "Q234-ABCD-0002",
        "powerType": "combined"
      },
      {
        "serial": "Q234-ABCD-0003",
        "powerType": "redundant"
      },
      {
        "serial": "Q234-ABCD-0004",
        "powerType": "useNetworkSetting"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkSwitchStacks 

> List the switch stacks in a network

*Example Response*

 ```
 [
  [
    {
      "id": "8473",
      "name": "A cool stack",
      "serials": [
        "QBZY-XWVU-TSRQ",
        "QBAB-CDEF-GHIJ"
      ]
    }
  ]
]
 ```
  
    

   

  

### createNetworkSwitchStack 

> Create a stack

*Example Response*

 ```
 [
  {
    "id": "8473",
    "name": "A cool stack",
    "serials": [
      "QBZY-XWVU-TSRQ",
      "QBAB-CDEF-GHIJ"
    ]
  }
]
 ```
  
    

   

  

### getNetworkSwitchStack 

> Show a switch stack

*Example Response*

 ```
 [
  {
    "id": "8473",
    "name": "A cool stack",
    "serials": [
      "QBZY-XWVU-TSRQ",
      "QBAB-CDEF-GHIJ"
    ]
  }
]
 ```
  
    

   

  

### deleteNetworkSwitchStack 

> Delete a stack

*Example Response*

 ```
 []
 ```
  
    

   

  

### addNetworkSwitchStack 

> Add a switch to a stack

*Example Response*

 ```
 [
  {
    "id": "8473",
    "name": "A cool stack",
    "serials": [
      "QBZY-XWVU-TSRQ",
      "QBAB-CDEF-GHIJ"
    ]
  }
]
 ```
  
    

   

  

### getNetworkSyslogServers 

> List the syslog servers for a network

*Example Response*

 ```
 [
  [
    {
      "host": "1.2.3.4",
      "port": 443,
      "roles": [
        "Wireless event log",
        "URLs"
      ]
    }
  ]
]
 ```
  
    

   

  

### updateNetworkSyslogServers 

> Update the syslog servers for a network

*Example Response*

 ```
 [
  [
    {
      "host": "1.2.3.4",
      "port": 443,
      "roles": [
        "Wireless event log",
        "URLs"
      ]
    }
  ]
]
 ```
  
    

   

  

### getNetworkTraffic 

> The traffic analysis data for this network.
<a href="https://documentation.meraki.com/MR/Monitoring_and_Reporting/Hostname_Visibility">Traffic Analysis with Hostname Visibility</a> must be enabled on the network.


*Example Response*

 ```
 [
  [
    {
      "application": "Gmail",
      "destination": null,
      "protocol": "TCP",
      "port": 443,
      "sent": 138,
      "recv": 61,
      "numClients": 7,
      "activeTime": 77000,
      "flows": 300
    }
  ]
]
 ```
  
    

   

  

### getNetworkTrafficAnalysisSettings 

> Return the traffic analysis settings for a network

*Example Response*

 ```
 [
  {
    "mode": "detailed",
    "customPieChartItems": [
      {
        "name": "Item from hostname",
        "type": "host",
        "value": "example.com"
      },
      {
        "name": "Item from port",
        "type": "port",
        "value": "440"
      },
      {
        "name": "Item from IP",
        "type": "ipRange",
        "value": "192.1.0.0"
      },
      {
        "name": "Item from IP range (CIDR)",
        "type": "ipRange",
        "value": "192.2.0.0/16"
      },
      {
        "name": "Item from IP range with port",
        "type": "ipRange",
        "value": "192.3.0.0/16:80"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkTrafficAnalysisSettings 

> Update the traffic analysis settings for a network

*Example Response*

 ```
 [
  {
    "mode": "detailed",
    "customPieChartItems": [
      {
        "name": "Item from hostname",
        "type": "host",
        "value": "example.com"
      },
      {
        "name": "Item from port",
        "type": "port",
        "value": "440"
      },
      {
        "name": "Item from IP",
        "type": "ipRange",
        "value": "192.1.0.0"
      },
      {
        "name": "Item from IP range (CIDR)",
        "type": "ipRange",
        "value": "192.2.0.0/16"
      },
      {
        "name": "Item from IP range with port",
        "type": "ipRange",
        "value": "192.3.0.0/16:80"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkTrafficShaping 

> Update the traffic shaping settings for an MX network

*Example Response*

 ```
 [
  {
    "defaultRulesEnabled": true,
    "rules": [
      {
        "definitions": [
          {
            "type": "host",
            "value": "google.com"
          },
          {
            "type": "port",
            "value": "9090"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0/16"
          },
          {
            "type": "ipRange",
            "value": "10.1.0.0/16:80"
          },
          {
            "type": "localNet",
            "value": "192.168.0.0/16"
          },
          {
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/133",
              "name": "Battle.net"
            }
          }
        ],
        "perClientBandwidthLimits": {
          "settings": "custom",
          "bandwidthLimits": {
            "limitUp": 1000000,
            "limitDown": 1000000
          }
        },
        "dscpTagValue": null,
        "priority": "normal"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkTrafficShaping 

> Display the traffic shaping settings for an MX network

*Example Response*

 ```
 [
  {
    "defaultRulesEnabled": true,
    "rules": [
      {
        "definitions": [
          {
            "type": "host",
            "value": "google.com"
          },
          {
            "type": "port",
            "value": "9090"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0"
          },
          {
            "type": "ipRange",
            "value": "192.1.0.0/16"
          },
          {
            "type": "ipRange",
            "value": "10.1.0.0/16:80"
          },
          {
            "type": "localNet",
            "value": "192.168.0.0/16"
          },
          {
            "type": "applicationCategory",
            "value": {
              "id": "meraki:layer7/category/2",
              "name": "Blogging"
            }
          },
          {
            "type": "application",
            "value": {
              "id": "meraki:layer7/application/133",
              "name": "Battle.net"
            }
          }
        ],
        "perClientBandwidthLimits": {
          "settings": "custom",
          "bandwidthLimits": {
            "limitUp": 1000000,
            "limitDown": 1000000
          }
        },
        "dscpTagValue": null,
        "priority": "normal"
      }
    ]
  }
]
 ```
  
    

   

  

### getNetworkTrafficShapingApplicationCategories 

> Returns the application categories for traffic shaping rules.

*Example Response*

 ```
 [
  [
    {
      "applicationCategories": [
        {
          "id": "meraki:layer7/category/24",
          "name": "Advertising",
          "applications": [
            {
              "id": "meraki:layer7/application/5",
              "name": "Advertising.com"
            },
            {
              "id": "meraki:layer7/application/0",
              "name": "AppNexus"
            },
            {
              "id": "meraki:layer7/application/1",
              "name": "Brightroll"
            }
          ]
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### getNetworkTrafficShapingDscpTaggingOptions 

> Returns the available DSCP tagging options for your traffic shaping rules.

*Example Response*

 ```
 [
  [
    {
      "dscpTagValue": 10,
      "description": "AF11 - High Throughput, Latency Insensitive, Low Drop"
    },
    {
      "dscpTagValue": 12,
      "description": "AF12 - High Throughput, Latency Insensitive, Medium Drop"
    },
    {
      "dscpTagValue": 14,
      "description": "AF13 - High Throughput, Latency Insensitive, High Drop"
    },
    {
      "dscpTagValue": 18,
      "description": "AF21 - Low Latency Data, Low Drop"
    }
  ]
]
 ```
  
    

   

  

### unbindNetwork 

> Unbind a network from a template.

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkUplinkSettings 

> Returns the uplink settings for your MX network.

*Example Response*

 ```
 [
  {
    "bandwidthLimits": {
      "wan1": {
        "limitUp": 1000000,
        "limitDown": 1000000
      },
      "wan2": {
        "limitUp": 1000000,
        "limitDown": 1000000
      },
      "cellular": {
        "limitUp": 51200,
        "limitDown": 51200
      }
    }
  }
]
 ```
  
    

   

  

### updateNetworkUplinkSettings 

> Updates the uplink settings for your MX network.

*Example Response*

 ```
 [
  {
    "bandwidthLimits": {
      "wan1": {
        "limitUp": 1000000,
        "limitDown": 1000000
      },
      "wan2": {
        "limitUp": 1000000,
        "limitDown": 1000000
      },
      "cellular": {
        "limitUp": 51200,
        "limitDown": 51200
      }
    }
  }
]
 ```
  
    

   

  

### getNetworkVlans 

> List the VLANs for an MX network

*Example Response*

 ```
 [
  [
    {
      "id": "1234",
      "networkId": "N_24329156",
      "name": "My VLAN",
      "applianceIp": "1.2.3.4",
      "subnet": "192.168.1.0/24",
      "fixedIpAssignments": {
        "22:33:44:55:66:77": {
          "ip": "1.2.3.4",
          "name": "Some client name"
        }
      },
      "reservedIpRanges": [
        {
          "start": "192.168.1.0",
          "end": "192.168.1.1",
          "comment": "A reserved IP range"
        }
      ],
      "dnsNameservers": "google_dns",
      "dhcpHandling": "Run a DHCP server",
      "dhcpLeaseTime": "1 day",
      "dhcpBootOptionsEnabled": false,
      "dhcpBootNextServer": null,
      "dhcpBootFilename": null,
      "dhcpOptions": [
        {
          "code": 5,
          "type": "text",
          "value": "five"
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### createNetworkVlan 

> Add a VLAN

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "My VLAN",
    "applianceIp": "1.2.3.4",
    "subnet": "192.168.1.0/24",
    "fixedIpAssignments": {},
    "reservedIpRanges": [],
    "dnsNameservers": "google_dns",
    "dhcpHandling": "Run a DHCP server",
    "dhcpLeaseTime": "1 day",
    "dhcpBootOptionsEnabled": false,
    "dhcpBootNextServer": null,
    "dhcpBootFilename": null,
    "dhcpOptions": []
  }
]
 ```
  
    

   

  

### getNetworkVlan 

> Return a VLAN

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "My VLAN",
    "applianceIp": "1.2.3.4",
    "subnet": "192.168.1.0/24",
    "fixedIpAssignments": {
      "22:33:44:55:66:77": {
        "ip": "1.2.3.4",
        "name": "Some client name"
      }
    },
    "reservedIpRanges": [
      {
        "start": "192.168.1.0",
        "end": "192.168.1.1",
        "comment": "A reserved IP range"
      }
    ],
    "dnsNameservers": "google_dns",
    "dhcpHandling": "Run a DHCP server",
    "dhcpLeaseTime": "1 day",
    "dhcpBootOptionsEnabled": false,
    "dhcpBootNextServer": null,
    "dhcpBootFilename": null,
    "dhcpOptions": [
      {
        "code": 5,
        "type": "text",
        "value": "five"
      }
    ]
  }
]
 ```
  
    

   

  

### updateNetworkVlan 

> Update a VLAN

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "My VLAN",
    "applianceIp": "1.2.3.4",
    "subnet": "192.168.1.0/24",
    "fixedIpAssignments": {
      "22:33:44:55:66:77": {
        "ip": "1.2.3.4",
        "name": "Some client name"
      }
    },
    "reservedIpRanges": [
      {
        "start": "192.168.1.0",
        "end": "192.168.1.1",
        "comment": "A reserved IP range"
      }
    ],
    "dnsNameservers": "google_dns",
    "dhcpHandling": "Run a DHCP server",
    "dhcpLeaseTime": "1 day",
    "dhcpBootOptionsEnabled": false,
    "dhcpBootNextServer": null,
    "dhcpBootFilename": null,
    "dhcpOptions": [
      {
        "code": 5,
        "type": "text",
        "value": "five"
      }
    ]
  }
]
 ```
  
    

   

  

### deleteNetworkVlan 

> Delete a VLAN from a network

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkVlansEnabledState 

> Returns the enabled status of VLANs for the network

*Example Response*

 ```
 [
  {
    "enabled": true,
    "networkId": "N_24329156"
  }
]
 ```
  
    

   

  

### updateNetworkVlansEnabledState 

> Enable/Disable VLANs for the given network

*Example Response*

 ```
 [
  {
    "enabled": true,
    "networkId": "N_24329156"
  }
]
 ```
  
    

   

  

### getNetworkWarmSpareSettings 

> Return MX warm spare settings

*Example Response*

 ```
 [
  {
    "enabled": true,
    "primarySerial": "Q234-ABCD-5678",
    "spareSerial": "Q234-ABCD-5678",
    "uplinkMode": "virtual",
    "wan1": {
      "ip": "1.2.3.4",
      "subnet": "192.168.1.0/24"
    },
    "wan2": {
      "ip": "1.2.3.4",
      "subnet": "192.168.128.0/24"
    }
  }
]
 ```
  
    

   

  

### updateNetworkWarmSpareSettings 

> Update MX warm spare settings

*Example Response*

 ```
 [
  {
    "enabled": true,
    "primarySerial": "Q234-ABCD-5678",
    "spareSerial": "Q234-ABCD-5678",
    "uplinkMode": "virtual",
    "wan1": {
      "ip": "1.2.3.4",
      "subnet": "192.168.1.0/24"
    },
    "wan2": {
      "ip": "1.2.3.4",
      "subnet": "192.168.128.0/24"
    }
  }
]
 ```
  
    

   

  

### getNetworkWirelessRfProfiles 

> List the non-basic RF profiles for this network

*Example Response*

 ```
 [
  [
    {
      "id": "1234",
      "networkId": "N_24329156",
      "name": "Some Custom RF Profile",
      "clientBalancingEnabled": true,
      "minBitrateType": "band",
      "bandSelectionType": "ap",
      "apSelectionSettings": {
        "bandOperationMode": "dual",
        "bandSteeringEnabled": true
      },
      "twoFourGhzSettings": {
        "maxPower": 30,
        "minPower": 5,
        "minBitrate": 11,
        "rxsop": null,
        "validAutoChannels": [
          1,
          6,
          11
        ],
        "axEnabled": true
      },
      "fiveGhzSettings": {
        "maxPower": 30,
        "minPower": 8,
        "minBitrate": 12,
        "rxsop": null,
        "validAutoChannels": [
          36,
          40,
          44,
          48,
          52,
          56,
          60,
          64,
          100,
          104,
          108,
          112,
          116,
          120,
          124,
          128,
          132,
          136,
          140,
          144,
          149,
          153,
          157,
          161,
          165
        ],
        "channelWidth": "auto"
      }
    }
  ]
]
 ```
  
    

   

  

### createNetworkWirelessRfProfile 

> Creates new RF profile for this network

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "Some Custom RF Profile",
    "clientBalancingEnabled": true,
    "minBitrateType": "band",
    "bandSelectionType": "ap",
    "apSelectionSettings": {
      "bandOperationMode": "dual",
      "bandSteeringEnabled": true
    },
    "twoFourGhzSettings": {
      "maxPower": 30,
      "minPower": 5,
      "minBitrate": 11,
      "rxsop": null,
      "validAutoChannels": [
        1,
        6,
        11
      ],
      "axEnabled": true
    },
    "fiveGhzSettings": {
      "maxPower": 30,
      "minPower": 8,
      "minBitrate": 12,
      "rxsop": null,
      "validAutoChannels": [
        36,
        40,
        44,
        48,
        52,
        56,
        60,
        64,
        100,
        104,
        108,
        112,
        116,
        120,
        124,
        128,
        132,
        136,
        140,
        144,
        149,
        153,
        157,
        161,
        165
      ],
      "channelWidth": "auto"
    }
  }
]
 ```
  
    

   

  

### updateNetworkWirelessRfProfile 

> Updates specified RF profile for this network

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "Some Custom RF Profile",
    "clientBalancingEnabled": true,
    "minBitrateType": "band",
    "bandSelectionType": "ap",
    "apSelectionSettings": {
      "bandOperationMode": "dual",
      "bandSteeringEnabled": true
    },
    "twoFourGhzSettings": {
      "maxPower": 30,
      "minPower": 5,
      "minBitrate": 11,
      "rxsop": null,
      "validAutoChannels": [
        1,
        6,
        11
      ],
      "axEnabled": true
    },
    "fiveGhzSettings": {
      "maxPower": 30,
      "minPower": 8,
      "minBitrate": 12,
      "rxsop": null,
      "validAutoChannels": [
        36,
        40,
        44,
        48,
        52,
        56,
        60,
        64,
        100,
        104,
        108,
        112,
        116,
        120,
        124,
        128,
        132,
        136,
        140,
        144,
        149,
        153,
        157,
        161,
        165
      ],
      "channelWidth": "auto"
    }
  }
]
 ```
  
    

   

  

### deleteNetworkWirelessRfProfile 

> Delete a RF Profile

*Example Response*

 ```
 []
 ```
  
    

   

  

### getNetworkWirelessRfProfile 

> Return a RF profile

*Example Response*

 ```
 [
  {
    "id": "1234",
    "networkId": "N_24329156",
    "name": "Some Custom RF Profile",
    "clientBalancingEnabled": true,
    "minBitrateType": "band",
    "bandSelectionType": "ap",
    "apSelectionSettings": {
      "bandOperationMode": "dual",
      "bandSteeringEnabled": true
    },
    "twoFourGhzSettings": {
      "maxPower": 30,
      "minPower": 5,
      "minBitrate": 11,
      "rxsop": null,
      "validAutoChannels": [
        1,
        6,
        11
      ],
      "axEnabled": true
    },
    "fiveGhzSettings": {
      "maxPower": 30,
      "minPower": 8,
      "minBitrate": 12,
      "rxsop": null,
      "validAutoChannels": [
        36,
        40,
        44,
        48,
        52,
        56,
        60,
        64,
        100,
        104,
        108,
        112,
        116,
        120,
        124,
        128,
        132,
        136,
        140,
        144,
        149,
        153,
        157,
        161,
        165
      ],
      "channelWidth": "auto"
    }
  }
]
 ```
  
    

   

  

### lockNetworkSmDevices 

> Lock a set of devices

*Example Response*

 ```
 [
  {
    "success": true
  }
]
 ```
  
    

   

  

### getNetworkSmConnectivity 

> Returns historical connectivity data (whether a device is regularly checking in to Dashboard).

*Example Response*

 ```
 [
  {
    "firstSeenAt": 1518365681,
    "lastSeenAt": 1526087474
  }
]
 ```
  
    

   

  

### getNetworkSmDesktopLogs 

> Return historical records of various Systems Manager network connection details for desktop devices.

*Example Response*

 ```
 [
  [
    {
      "measuredAt": 1526087474,
      "user": "milesmeraki",
      "networkDevice": "NIC",
      "networkDriver": "Driver",
      "wifiChannel": "11",
      "wifiAuth": "wpa-psk",
      "wifiBssid": "00:11:22:33:44:55",
      "wifiSsid": "ssid",
      "wifiRssi": "-11",
      "wifiNoise": "-99",
      "dhcpServer": "1.2.3.4",
      "ip": "1.2.3.4",
      "networkMTU": "1500",
      "subnet": "192.168.1.0/24",
      "gateway": "1.2.3.5",
      "publicIP": "123.123.123.1",
      "dnsServer": "8",
      "ts": 1526087474
    }
  ]
]
 ```
  
    

   

  

### getNetworkSmDeviceCommandLogs 

>     Return historical records of commands sent to Systems Manager devices.
    <p>Note that this will include the name of the Dashboard user who initiated the command if it was generated
    by a Dashboard admin rather than the automatic behavior of the system; you may wish to filter this out
    of any reports.</p>


*Example Response*

 ```
 [
  {
    "action": "UpdateProfile",
    "name": "My profile",
    "details": "{}",
    "dashboardUser": "Miles Meraki",
    "ts": 1526087474
  }
]
 ```
  
    

   

  

### getNetworkSmPerformanceHistory 

> Return historical records of various Systems Manager client metrics for desktop devices.

*Example Response*

 ```
 [
  [
    {
      "cpuPercentUsed": 0.95,
      "memFree": 1024,
      "memWired": 4096,
      "memActive": 1024,
      "memInactive": 2048,
      "networkSent": 512,
      "networkReceived": 512,
      "swapUsed": 768,
      "diskUsage": {
        "c": {
          "used": 2048,
          "space": 9096
        }
      },
      "ts": 1526087474
    }
  ]
]
 ```
  
    

   

  

### getOrganizations 

> List the organizations that the user has privileges on

*Example Response*

 ```
 [
  [
    {
      "id": "2930418",
      "name": "My organization"
    }
  ]
]
 ```
  
    

   

  

### createOrganization 

> Create a new organization

*Example Response*

 ```
 [
  {
    "id": "2930418",
    "name": "My organization"
  }
]
 ```
  
    

   

  

### getOrganization 

> Return an organization

*Example Response*

 ```
 [
  {
    "id": "2930418",
    "name": "My organization"
  }
]
 ```
  
    

   

  

### updateOrganization 

> Update an organization

*Example Response*

 ```
 [
  {
    "id": "2930418",
    "name": "My organization"
  }
]
 ```
  
    

   

  

### deleteOrganization 

> Delete an organization

*Example Response*

 ```
 []
 ```
  
    

   

  

### createOrganizationActionBatch 

> Create an action batch

*Example Response*

 ```
 [
  {
    "id": "123",
    "organizationId": "2930418",
    "confirmed": true,
    "synchronous": false,
    "status": {
      "completed": false,
      "failed": false,
      "errors": []
    },
    "actions": [
      {
        "resource": "/devices/QXXX-XXXX-XXXX/switchPorts/3",
        "operation": "update",
        "body": {
          "enabled": false
        }
      }
    ]
  }
]
 ```
  
    

   

  

### getOrganizationActionBatches 

> Return the list of action batches in the organization

*Example Response*

 ```
 [
  [
    {
      "id": "123",
      "organizationId": "2930418",
      "confirmed": true,
      "synchronous": false,
      "status": {
        "completed": false,
        "failed": false,
        "errors": []
      },
      "actions": [
        {
          "resource": "/devices/QXXX-XXXX-XXXX/switchPorts/3",
          "operation": "update",
          "body": {
            "enabled": false
          }
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### getOrganizationActionBatch 

> Return an action batch

*Example Response*

 ```
 [
  {
    "id": "123",
    "organizationId": "2930418",
    "confirmed": true,
    "synchronous": false,
    "status": {
      "completed": false,
      "failed": false,
      "errors": []
    },
    "actions": [
      {
        "resource": "/devices/QXXX-XXXX-XXXX/switchPorts/3",
        "operation": "update",
        "body": {
          "enabled": false
        }
      }
    ]
  }
]
 ```
  
    

   

  

### deleteOrganizationActionBatch 

> Delete an action batch

*Example Response*

 ```
 []
 ```
  
    

   

  

### updateOrganizationActionBatch 

> Update an action batch

*Example Response*

 ```
 [
  {
    "id": "123",
    "organizationId": "2930418",
    "confirmed": true,
    "synchronous": false,
    "status": {
      "completed": false,
      "failed": false,
      "errors": []
    },
    "actions": [
      {
        "resource": "/devices/QXXX-XXXX-XXXX/switchPorts/3",
        "operation": "update",
        "body": {
          "enabled": false
        }
      }
    ]
  }
]
 ```
  
    

   

  

### getOrganizationAdmins 

> List the dashboard administrators in this organization

*Example Response*

 ```
 [
  [
    {
      "id": "212406",
      "name": "Miles Meraki",
      "email": "miles@meraki.com",
      "orgAccess": "none",
      "accountStatus": "ok",
      "twoFactorAuthEnabled": false,
      "hasApiKey": true,
      "lastActive": "2019-01-28 14:58:56 -0800",
      "tags": [
        {
          "tag": "west",
          "access": "read-only"
        }
      ],
      "networks": [
        {
          "id": "N_24329156",
          "access": "full"
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### createOrganizationAdmin 

> Create a new dashboard administrator

*Example Response*

 ```
 [
  {
    "id": "212406",
    "name": "Miles Meraki",
    "email": "miles@meraki.com",
    "orgAccess": "none",
    "accountStatus": "ok",
    "twoFactorAuthEnabled": false,
    "hasApiKey": true,
    "lastActive": "2019-01-28 14:58:56 -0800",
    "tags": [
      {
        "tag": "west",
        "access": "read-only"
      }
    ],
    "networks": [
      {
        "id": "N_24329156",
        "access": "full"
      }
    ]
  }
]
 ```
  
    

   

  

### updateOrganizationAdmin 

> Update an administrator

*Example Response*

 ```
 [
  {
    "id": "212406",
    "name": "Miles Meraki",
    "email": "miles@meraki.com",
    "orgAccess": "none",
    "accountStatus": "ok",
    "twoFactorAuthEnabled": false,
    "hasApiKey": true,
    "lastActive": "2019-01-28 14:58:56 -0800",
    "tags": [
      {
        "tag": "west",
        "access": "read-only"
      }
    ],
    "networks": [
      {
        "id": "N_24329156",
        "access": "full"
      }
    ]
  }
]
 ```
  
    

   

  

### deleteOrganizationAdmin 

> Revoke all access for a dashboard administrator within this organization

*Example Response*

 ```
 []
 ```
  
    

   

  

### getOrganizationApiRequests 

> List the API requests made by an organization

*Example Response*

 ```
 [
  [
    {
      "adminId": "212406",
      "method": "GET",
      "host": "api.meraki.com",
      "path": "/api/v0/organizations/33349/apiRequests",
      "queryString": "timespan=604800",
      "userAgent": "PostmanRuntime/7.6.0",
      "ts": "2019-02-20T17:31:23Z",
      "responseCode": 200
    }
  ]
]
 ```
  
    

   

  

### claimOrganization 

> Claim a list of devices, licenses, and/or orders into an organization. When claiming by order, all devices and licenses in the order will be claimed; licenses will be added to the organization and devices will be placed in the organization's inventory.

*Example Response*

 ```
 [
  {
    "orders": [
      "4CXXXXXXX"
    ],
    "serials": [
      "Q234-ABCD-5678"
    ],
    "licenses": [
      {
        "key": "Z2XXXXXXXXXX",
        "mode": "addDevices"
      }
    ]
  }
]
 ```
  
    

   

  

### cloneOrganization 

> Create a new organization by cloning the addressed organization

*Example Response*

 ```
 [
  {
    "id": "2930418",
    "name": "My organization"
  }
]
 ```
  
    

   

  

### getOrganizationConfigTemplates 

> List the configuration templates for this organization

*Example Response*

 ```
 [
  [
    {
      "id": "N_24329156",
      "name": "My config template"
    }
  ]
]
 ```
  
    

   

  

### deleteOrganizationConfigTemplate 

> Remove a configuration template

*Example Response*

 ```
 []
 ```
  
    

   

  

### getOrganizationConfigTemplateSwitchProfiles 

> List the switch profiles for your switch template configuration

*Example Response*

 ```
 [
  [
    {
      "switchProfileId": "1234",
      "name": "A Simple Switch Profile",
      "model": "MS450-24"
    }
  ]
]
 ```
  
    

   

  

### getOrganizationDeviceStatuses 

> List the status of every Meraki device in the organization

*Example Response*

 ```
 [
  [
    {
      "name": "My AP",
      "serial": "Q234-ABCD-5678",
      "mac": "00:11:22:33:44:55",
      "status": "online",
      "lanIp": "1.2.3.4",
      "publicIp": "123.123.123.1",
      "networkId": "N_24329156"
    }
  ]
]
 ```
  
    

   

  

### getOrganizationDevices 

> List the devices in an organization

*Example Response*

 ```
 [
  {
    "name": "My AP",
    "lat": 37.4180951010362,
    "lng": -122.098531723022,
    "address": "1600 Pennsylvania Ave",
    "notes": "My AP's note",
    "tags": " recently-added ",
    "networkId": "N_24329156",
    "serial": "Q234-ABCD-5678",
    "model": "MR34",
    "mac": "00:11:22:33:44:55",
    "lanIp": "1.2.3.4"
  }
]
 ```
  
    

   

  

### getOrganizationInventory 

> Return the inventory for an organization

*Example Response*

 ```
 [
  [
    {
      "mac": "00:11:22:33:44:55",
      "serial": "Q234-ABCD-5678",
      "networkId": "N_24329156",
      "model": "MR34",
      "claimedAt": 1518365681,
      "publicIp": "123.123.123.1",
      "name": "My AP"
    }
  ]
]
 ```
  
    

   

  

### getOrganizationLicenseState 

> Return the license state for an organization

*Example Response*

 ```
 [
  {
    "status": "OK",
    "expirationDate": "Feb 8, 2020 UTC",
    "licensedDeviceCounts": {
      "MS": 100
    }
  }
]
 ```
  
    

   

  

### getOrganizationNetworks 

> List the networks in an organization

*Example Response*

 ```
 [
  [
    {
      "id": "L_123456",
      "organizationId": "2930418",
      "name": "Long Island Office",
      "timeZone": "America/Los_Angeles",
      "tags": " tag1 tag2 ",
      "type": "combined",
      "disableMyMerakiCom": false
    }
  ]
]
 ```
  
    

   

  

### createOrganizationNetwork 

> Create a network

*Example Response*

 ```
 [
  {
    "id": "L_123456",
    "organizationId": "2930418",
    "name": "Long Island Office",
    "timeZone": "America/Los_Angeles",
    "tags": " tag1 tag2 ",
    "type": "combined",
    "disableMyMerakiCom": false
  }
]
 ```
  
    

   

  

### combineOrganizationNetworks 

> Combine multiple networks into a single network

*Example Response*

 ```
 [
  {
    "resultingNetwork": {
      "id": "L_123456",
      "organizationId": "2930418",
      "name": "Long Island Office",
      "timeZone": "America/Los_Angeles",
      "tags": " tag1 tag2 ",
      "type": "combined",
      "disableMyMerakiCom": false
    }
  }
]
 ```
  
    

   

  

### getOrganizationOpenapiSpec 

> Return the OpenAPI 2.0 Specification of the organization's API documentation in JSON

*Example Response*

 ```
 [
  {
    "swagger": "2.0",
    "info": {
      "version": "v0",
      "title": "Meraki Dashboard API",
      "description": "This collection of API calls provides an easy way to interact with a Cisco Meraki network"
    },
    "paths": {
      "/organizations": {
        "get": {
          "description": "List the organizations that the user has privileges on",
          "operationId": "getOrganizations",
          "responses": {
            "200": {
              "description": "Successful operation",
              "examples": {
                "application/json": [
                  {
                    "id": "2930418",
                    "name": "My organization"
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
]
 ```
  
    

   

  

### getOrganizationSamlRoles 

> List the SAML roles for this organization

*Example Response*

 ```
 [
  [
    {
      "id": "TEdJIEN1c3RvbWVy",
      "role": "myrole",
      "orgAccess": "none",
      "networks": [
        {
          "id": "N_1234",
          "access": "full"
        }
      ],
      "tags": [
        {
          "tag": "west",
          "access": "read-only"
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### createOrganizationSamlRole 

> Create a SAML role

*Example Response*

 ```
 [
  {
    "id": "TEdJIEN1c3RvbWVy",
    "role": "myrole",
    "orgAccess": "none",
    "networks": [
      {
        "id": "N_1234",
        "access": "full"
      }
    ],
    "tags": [
      {
        "tag": "west",
        "access": "read-only"
      }
    ]
  }
]
 ```
  
    

   

  

### getOrganizationSamlRole 

> Return a SAML role

*Example Response*

 ```
 [
  {
    "id": "TEdJIEN1c3RvbWVy",
    "role": "myrole",
    "orgAccess": "none",
    "networks": [
      {
        "id": "N_1234",
        "access": "full"
      }
    ],
    "tags": [
      {
        "tag": "west",
        "access": "read-only"
      }
    ]
  }
]
 ```
  
    

   

  

### updateOrganizationSamlRole 

> Update a SAML role

*Example Response*

 ```
 [
  {
    "id": "TEdJIEN1c3RvbWVy",
    "role": "myrole",
    "orgAccess": "none",
    "networks": [
      {
        "id": "N_1234",
        "access": "full"
      }
    ],
    "tags": [
      {
        "tag": "west",
        "access": "read-only"
      }
    ]
  }
]
 ```
  
    

   

  

### deleteOrganizationSamlRole 

> Remove a SAML role

*Example Response*

 ```
 []
 ```
  
    

   

  

### getOrganizationSecurityIntrusionSettings 

> Returns all supported intrusion settings for an organization

*Example Response*

 ```
 [
  {
    "whitelistedRules": [
      {
        "ruleId": "meraki:intrusion/snort/GID/01/SID/688",
        "message": "SQL sa login failed"
      },
      {
        "ruleId": "meraki:intrusion/snort/GID/01/SID/5805",
        "message": "MALWARE-OTHER Trackware myway speedbar runtime detection - switch engines"
      }
    ]
  }
]
 ```
  
    

   

  

### updateOrganizationSecurityIntrusionSettings 

> Sets supported intrusion settings for an organization

*Example Response*

 ```
 [
  {
    "whitelistedRules": [
      {
        "ruleId": "meraki:intrusion/snort/GID/01/SID/688",
        "message": "SQL sa login failed"
      },
      {
        "ruleId": "meraki:intrusion/snort/GID/01/SID/5805",
        "message": "MALWARE-OTHER Trackware myway speedbar runtime detection - switch engines"
      }
    ]
  }
]
 ```
  
    

   

  

### getOrganizationSecurityEvents 

> List the security events for an organization

*Example Response*

 ```
 [
  [
    {
      "ts": 1547683314.270398,
      "deviceMac": "00:18:0a:01:02:03",
      "clientMac": "A1:B2:C3:D4:E5:F6",
      "srcIp": "1.2.3.4:34195",
      "destIp": "10.20.30.40:80",
      "protocol": "tcp/ip",
      "priority": "2",
      "classification": "4",
      "blocked": true,
      "message": "SERVER-WEBAPP JBoss JMX console access attempt",
      "signature": "1:21516:9",
      "sigSource": ""
    },
    {
      "ts": 1547683827.723265,
      "deviceMac": "00:18:0a:01:02:03",
      "clientMac": "A1:B2:C3:D4:E5:F6",
      "srcIp": "1.2.3.4:56023",
      "destIp": "10.20.30.40:80",
      "protocol": "tcp/ip",
      "priority": "1",
      "classification": "33",
      "blocked": true,
      "message": "POLICY-OTHER Adobe ColdFusion admin interface access attempt",
      "signature": "1:25975:2",
      "sigSource": ""
    }
  ]
]
 ```
  
    

   

  

### getOrganizationSnmp 

> Return the SNMP settings for an organization

*Example Response*

 ```
 [
  {
    "v2cEnabled": false,
    "v3Enabled": true,
    "v3AuthMode": "SHA",
    "v3PrivMode": "AES128",
    "peerIps": "123.123.123.1",
    "hostname": "n1.meraki.com",
    "port": 443
  }
]
 ```
  
    

   

  

### updateOrganizationSnmp 

> Update the SNMP settings for an organization

*Example Response*

 ```
 [
  {
    "v2cEnabled": false,
    "v3Enabled": true,
    "v3AuthMode": "SHA",
    "v3PrivMode": "AES128",
    "peerIps": "123.123.123.1",
    "hostname": "n1.meraki.com",
    "port": 443
  }
]
 ```
  
    

   

  

### getOrganizationThirdPartyVPNPeers 

> Return the third party VPN peers for an organization

*Example Response*

 ```
 [
  [
    {
      "name": "My peer 1",
      "publicIp": "123.123.123.1",
      "privateSubnets": [
        "192.168.1.0/24",
        "192.168.128.0/24"
      ],
      "secret": "asdf1234",
      "ipsecPolicies": {
        "ikeCipherAlgo": [
          "tripledes"
        ],
        "ikeAuthAlgo": [
          "sha1"
        ],
        "ikeDiffieHellmanGroup": [
          "group2"
        ],
        "ikeLifetime": 28800,
        "childCipherAlgo": [
          "aes128"
        ],
        "childAuthAlgo": [
          "sha1"
        ],
        "childPfsGroup": [
          "disabled"
        ],
        "childLifetime": 28800
      }
    },
    {
      "name": "My peer 2",
      "publicIp": "123.123.123.2",
      "privateSubnets": [
        "192.168.2.0/24",
        "192.168.129.0/24"
      ],
      "secret": "asdf56785678567856785678",
      "ipsecPoliciesPreset": "default"
    }
  ]
]
 ```
  
    

   

  

### updateOrganizationThirdPartyVPNPeers 

> Update the third party VPN peers for an organization

*Example Response*

 ```
 [
  [
    {
      "name": "My peer 1",
      "publicIp": "123.123.123.1",
      "privateSubnets": [
        "192.168.1.0/24",
        "192.168.128.0/24"
      ],
      "secret": "asdf1234",
      "ipsecPolicies": {
        "ikeCipherAlgo": [
          "tripledes"
        ],
        "ikeAuthAlgo": [
          "sha1"
        ],
        "ikeDiffieHellmanGroup": [
          "group2"
        ],
        "ikeLifetime": 28800,
        "childCipherAlgo": [
          "aes128"
        ],
        "childAuthAlgo": [
          "sha1"
        ],
        "childPfsGroup": [
          "disabled"
        ],
        "childLifetime": 28800
      }
    },
    {
      "name": "My peer 2",
      "publicIp": "123.123.123.2",
      "privateSubnets": [
        "192.168.2.0/24",
        "192.168.129.0/24"
      ],
      "secret": "asdf56785678567856785678",
      "ipsecPoliciesPreset": "default"
    }
  ]
]
 ```
  
    

   

  

### getOrganizationUplinksLossAndLatency 

> Return the uplink loss and latency for every MX in the organization from at latest 2 minutes ago

*Example Response*

 ```
 [
  [
    {
      "networkId": "N_12345",
      "serial": "Q2AB-CDEF-GHIJ",
      "uplink": "wan1",
      "ip": "8.8.8.8",
      "timeSeries": [
        {
          "ts": "2019-01-31T18:46:13Z",
          "lossPercent": 5.3,
          "latencyMs": 194.9
        }
      ]
    }
  ]
]
 ```
  
    

   

  

### getOrganizationVpnFirewallRules 

> Return the firewall rules for an organization's site-to-site VPN

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24",
      "srcPort": "Any",
      "srcCidr": "Any",
      "syslogEnabled": false
    }
  ]
]
 ```
  
    

   

  

### updateOrganizationVpnFirewallRules 

> Update the firewall rules of an organization's site-to-site VPN

*Example Response*

 ```
 [
  [
    {
      "comment": "Allow TCP traffic to subnet with HTTP servers.",
      "policy": "allow",
      "protocol": "tcp",
      "destPort": 443,
      "destCidr": "192.168.1.0/24",
      "srcPort": "Any",
      "srcCidr": "Any",
      "syslogEnabled": false
    }
  ]
]
 ```
  
    

   

  

### getOrganizationWebhookLogs 

> Return the log of webhook POSTs sent

*Example Response*

 ```
 [
  [
    {
      "organizationId": "33619",
      "networkId": "L_22742",
      "alertType": "Settings changed",
      "url": "https://www.example.com/path",
      "sentAt": "2019-01-01T13:37:28.123456Z",
      "loggedAt": "2019-01-01T13:37:28.423456Z",
      "responseCode": 200,
      "responseDuration": 244
    }
  ]
]
 ```
  
    

   

  


