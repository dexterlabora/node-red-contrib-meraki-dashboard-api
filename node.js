'use strict';
var lib = require('./lib.js');

/*
DISABLES Console.log  for production
*/
console.log = function() {};



module.exports = function (RED) {
    function MerakiDashboardApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        console.log('node.js.mustache this.service.host ', this.service.host);
        console.log('node.js.mustache config.host ', config.host);
        this.method = config.method;
        this.storedParams = config.storedParams;
          
        var node = this;
        console.log('first run: node = this', node);

        node.on('input', function (msg) {
            var node = this;
            var errorFlag = false;
            //console.log("this.service.host", this.service.host);
            //console.log("node.js.mustache config", config);
            //console.log("node.js.mustache this", this);
            var client;
            if (this.service && this.service.host) {
                if(msg.service){
                    if (msg.service.host) {
                        // override apiUrl with input msg
                        client = new lib.MerakiDashboardApi({ domain: msg.service.host });
                }              
                }else{
                    client = new lib.MerakiDashboardApi({ domain: this.service.host });
                }
            } else {
                node.error('Host in configuration node is not specified.', msg);
                errorFlag = true;
            }
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureApiKeyValue) {
                if(msg.service){
                    if (msg.service.apiKey) {
                        // override apiKey with input msg
                        client.setApiKey(msg.service.apiKey,
                            this.service.secureApiKeyHeaderOrQueryName, false);
                    }              
                }else{
                    if (this.service.secureApiKeyIsQuery) {
                        client.setApiKey(this.service.credentials.secureApiKeyValue,
                                        this.service.secureApiKeyHeaderOrQueryName, true);
                    } else {
                        client.setApiKey(this.service.credentials.secureApiKeyValue,
                                        this.service.secureApiKeyHeaderOrQueryName, false);
                    }
                }
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if(!node.storedParams){
                node.storedParams = [];
            }
            console.log('node.js node', node);
            var storedParamValsMap = {};
            node.storedParams.forEach(p =>{
                storedParamValsMap[p.camelCaseName] = p.value;
            })
            var storedParamTypeMap = {};
            node.storedParams.forEach(p =>{
                storedParamTypeMap[p.camelCaseName] = p.type;
            })

            node.method = node.method || RED.util.getMessageProperty(msg, "operationId");

            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsLive') {
                var getDeviceCameraAnalyticsLive_parameters = [];
                var getDeviceCameraAnalyticsLive_nodeParam;
                var getDeviceCameraAnalyticsLive_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceCameraAnalyticsLive_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceCameraAnalyticsLive_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsLive_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsLive_nodeParamType is "str"');
                    getDeviceCameraAnalyticsLive_parameters.serial = getDeviceCameraAnalyticsLive_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsLive_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsLive_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getDeviceCameraAnalyticsLive(getDeviceCameraAnalyticsLive_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsOverview') {
                var getDeviceCameraAnalyticsOverview_parameters = [];
                var getDeviceCameraAnalyticsOverview_nodeParam;
                var getDeviceCameraAnalyticsOverview_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceCameraAnalyticsOverview_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceCameraAnalyticsOverview_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is "str"');
                    getDeviceCameraAnalyticsOverview_parameters.serial = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsOverview_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getDeviceCameraAnalyticsOverview_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getDeviceCameraAnalyticsOverview_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is "str"');
                    getDeviceCameraAnalyticsOverview_parameters.t0 = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsOverview_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getDeviceCameraAnalyticsOverview_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getDeviceCameraAnalyticsOverview_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is "str"');
                    getDeviceCameraAnalyticsOverview_parameters.t1 = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsOverview_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getDeviceCameraAnalyticsOverview_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getDeviceCameraAnalyticsOverview_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is "str"');
                    getDeviceCameraAnalyticsOverview_parameters.timespan = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsOverview_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getDeviceCameraAnalyticsOverview_nodeParam = storedParamValsMap['objectType'] ||
                    RED.util.getMessageProperty(msg, "objectType");

                getDeviceCameraAnalyticsOverview_nodeParamType = storedParamTypeMap['objectType'] ||
                    RED.util.getMessageProperty(msg, "objectType");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is "str"');
                    getDeviceCameraAnalyticsOverview_parameters.objectType = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsOverview_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsOverview_parameters.objectType = RED.util.getMessageProperty(msg, "objectType");
                }
                                result = client.getDeviceCameraAnalyticsOverview(getDeviceCameraAnalyticsOverview_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsRecent') {
                var getDeviceCameraAnalyticsRecent_parameters = [];
                var getDeviceCameraAnalyticsRecent_nodeParam;
                var getDeviceCameraAnalyticsRecent_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceCameraAnalyticsRecent_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceCameraAnalyticsRecent_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsRecent_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsRecent_nodeParamType is "str"');
                    getDeviceCameraAnalyticsRecent_parameters.serial = getDeviceCameraAnalyticsRecent_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsRecent_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsRecent_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getDeviceCameraAnalyticsRecent_nodeParam = storedParamValsMap['objectType'] ||
                    RED.util.getMessageProperty(msg, "objectType");

                getDeviceCameraAnalyticsRecent_nodeParamType = storedParamTypeMap['objectType'] ||
                    RED.util.getMessageProperty(msg, "objectType");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsRecent_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsRecent_nodeParamType is "str"');
                    getDeviceCameraAnalyticsRecent_parameters.objectType = getDeviceCameraAnalyticsRecent_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsRecent_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsRecent_parameters.objectType = RED.util.getMessageProperty(msg, "objectType");
                }
                                result = client.getDeviceCameraAnalyticsRecent(getDeviceCameraAnalyticsRecent_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsZones') {
                var getDeviceCameraAnalyticsZones_parameters = [];
                var getDeviceCameraAnalyticsZones_nodeParam;
                var getDeviceCameraAnalyticsZones_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceCameraAnalyticsZones_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceCameraAnalyticsZones_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZones_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZones_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZones_parameters.serial = getDeviceCameraAnalyticsZones_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZones_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZones_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getDeviceCameraAnalyticsZones(getDeviceCameraAnalyticsZones_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsZoneHistory') {
                var getDeviceCameraAnalyticsZoneHistory_parameters = [];
                var getDeviceCameraAnalyticsZoneHistory_nodeParam;
                var getDeviceCameraAnalyticsZoneHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.serial = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['zoneId'] ||
                    RED.util.getMessageProperty(msg, "zoneId");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['zoneId'] ||
                    RED.util.getMessageProperty(msg, "zoneId");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.zoneId = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.zoneId = RED.util.getMessageProperty(msg, "zoneId");
                }
                                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.t0 = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.t1 = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.timespan = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['resolution'] ||
                    RED.util.getMessageProperty(msg, "resolution");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['resolution'] ||
                    RED.util.getMessageProperty(msg, "resolution");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.resolution = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.resolution = RED.util.getMessageProperty(msg, "resolution");
                }
                                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = storedParamValsMap['objectType'] ||
                    RED.util.getMessageProperty(msg, "objectType");

                getDeviceCameraAnalyticsZoneHistory_nodeParamType = storedParamTypeMap['objectType'] ||
                    RED.util.getMessageProperty(msg, "objectType");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is "str"');
                    getDeviceCameraAnalyticsZoneHistory_parameters.objectType = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    console.log('getDeviceCameraAnalyticsZoneHistory_nodeParamType is not "str"')
                    getDeviceCameraAnalyticsZoneHistory_parameters.objectType = RED.util.getMessageProperty(msg, "objectType");
                }
                                result = client.getDeviceCameraAnalyticsZoneHistory(getDeviceCameraAnalyticsZoneHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceClients') {
                var getDeviceClients_parameters = [];
                var getDeviceClients_nodeParam;
                var getDeviceClients_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceClients_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceClients_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceClients_nodeParamType === 'str') {
                    console.log('getDeviceClients_nodeParamType is "str"');
                    getDeviceClients_parameters.serial = getDeviceClients_nodeParam || undefined;
                } else {
                    console.log('getDeviceClients_nodeParamType is not "str"')
                    getDeviceClients_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getDeviceClients_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getDeviceClients_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceClients_nodeParamType === 'str') {
                    console.log('getDeviceClients_nodeParamType is "str"');
                    getDeviceClients_parameters.t0 = getDeviceClients_nodeParam || undefined;
                } else {
                    console.log('getDeviceClients_nodeParamType is not "str"')
                    getDeviceClients_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getDeviceClients_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getDeviceClients_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceClients_nodeParamType === 'str') {
                    console.log('getDeviceClients_nodeParamType is "str"');
                    getDeviceClients_parameters.timespan = getDeviceClients_nodeParam || undefined;
                } else {
                    console.log('getDeviceClients_nodeParamType is not "str"')
                    getDeviceClients_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                result = client.getDeviceClients(getDeviceClients_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceSwitchPorts') {
                var getDeviceSwitchPorts_parameters = [];
                var getDeviceSwitchPorts_nodeParam;
                var getDeviceSwitchPorts_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceSwitchPorts_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceSwitchPorts_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceSwitchPorts_nodeParamType === 'str') {
                    console.log('getDeviceSwitchPorts_nodeParamType is "str"');
                    getDeviceSwitchPorts_parameters.serial = getDeviceSwitchPorts_nodeParam || undefined;
                } else {
                    console.log('getDeviceSwitchPorts_nodeParamType is not "str"')
                    getDeviceSwitchPorts_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getDeviceSwitchPorts(getDeviceSwitchPorts_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getDeviceSwitchPort') {
                var getDeviceSwitchPort_parameters = [];
                var getDeviceSwitchPort_nodeParam;
                var getDeviceSwitchPort_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getDeviceSwitchPort_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getDeviceSwitchPort_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceSwitchPort_nodeParamType === 'str') {
                    console.log('getDeviceSwitchPort_nodeParamType is "str"');
                    getDeviceSwitchPort_parameters.serial = getDeviceSwitchPort_nodeParam || undefined;
                } else {
                    console.log('getDeviceSwitchPort_nodeParamType is not "str"')
                    getDeviceSwitchPort_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getDeviceSwitchPort_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                getDeviceSwitchPort_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (getDeviceSwitchPort_nodeParamType === 'str') {
                    console.log('getDeviceSwitchPort_nodeParamType is "str"');
                    getDeviceSwitchPort_parameters.number = getDeviceSwitchPort_nodeParam || undefined;
                } else {
                    console.log('getDeviceSwitchPort_nodeParamType is not "str"')
                    getDeviceSwitchPort_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                result = client.getDeviceSwitchPort(getDeviceSwitchPort_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateDeviceSwitchPort') {
                var updateDeviceSwitchPort_parameters = [];
                var updateDeviceSwitchPort_nodeParam;
                var updateDeviceSwitchPort_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateDeviceSwitchPort_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                updateDeviceSwitchPort_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (updateDeviceSwitchPort_nodeParamType === 'str') {
                    console.log('updateDeviceSwitchPort_nodeParamType is "str"');
                    updateDeviceSwitchPort_parameters.serial = updateDeviceSwitchPort_nodeParam || undefined;
                } else {
                    console.log('updateDeviceSwitchPort_nodeParamType is not "str"')
                    updateDeviceSwitchPort_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                updateDeviceSwitchPort_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                updateDeviceSwitchPort_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (updateDeviceSwitchPort_nodeParamType === 'str') {
                    console.log('updateDeviceSwitchPort_nodeParamType is "str"');
                    updateDeviceSwitchPort_parameters.number = updateDeviceSwitchPort_nodeParam || undefined;
                } else {
                    console.log('updateDeviceSwitchPort_nodeParamType is not "str"')
                    updateDeviceSwitchPort_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                
                updateDeviceSwitchPort_nodeParam = storedParamValsMap['updateDeviceSwitchPort'] ||
                    RED.util.getMessageProperty(msg, "updateDeviceSwitchPort");

                updateDeviceSwitchPort_nodeParamType = storedParamTypeMap['updateDeviceSwitchPort'] ||
                    RED.util.getMessageProperty(msg, "updateDeviceSwitchPort");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateDeviceSwitchPort_parameters.updateDeviceSwitchPort = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateDeviceSwitchPort(updateDeviceSwitchPort_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetwork') {
                var getNetwork_parameters = [];
                var getNetwork_nodeParam;
                var getNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetwork_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetwork_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetwork_nodeParamType === 'str') {
                    console.log('getNetwork_nodeParamType is "str"');
                    getNetwork_parameters.networkId = getNetwork_nodeParam || undefined;
                } else {
                    console.log('getNetwork_nodeParamType is not "str"')
                    getNetwork_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetwork(getNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetwork') {
                var updateNetwork_parameters = [];
                var updateNetwork_nodeParam;
                var updateNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetwork_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetwork_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetwork_nodeParamType === 'str') {
                    console.log('updateNetwork_nodeParamType is "str"');
                    updateNetwork_parameters.networkId = updateNetwork_nodeParam || undefined;
                } else {
                    console.log('updateNetwork_nodeParamType is not "str"')
                    updateNetwork_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetwork_nodeParam = storedParamValsMap['updateNetwork'] ||
                    RED.util.getMessageProperty(msg, "updateNetwork");

                updateNetwork_nodeParamType = storedParamTypeMap['updateNetwork'] ||
                    RED.util.getMessageProperty(msg, "updateNetwork");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetwork_parameters.updateNetwork = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetwork(updateNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetwork') {
                var deleteNetwork_parameters = [];
                var deleteNetwork_nodeParam;
                var deleteNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetwork_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetwork_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetwork_nodeParamType === 'str') {
                    console.log('deleteNetwork_nodeParamType is "str"');
                    deleteNetwork_parameters.networkId = deleteNetwork_nodeParam || undefined;
                } else {
                    console.log('deleteNetwork_nodeParamType is not "str"')
                    deleteNetwork_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.deleteNetwork(deleteNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkAccessPolicies') {
                var getNetworkAccessPolicies_parameters = [];
                var getNetworkAccessPolicies_nodeParam;
                var getNetworkAccessPolicies_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkAccessPolicies_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkAccessPolicies_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAccessPolicies_nodeParamType === 'str') {
                    console.log('getNetworkAccessPolicies_nodeParamType is "str"');
                    getNetworkAccessPolicies_parameters.networkId = getNetworkAccessPolicies_nodeParam || undefined;
                } else {
                    console.log('getNetworkAccessPolicies_nodeParamType is not "str"')
                    getNetworkAccessPolicies_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkAccessPolicies(getNetworkAccessPolicies_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkAirMarshal') {
                var getNetworkAirMarshal_parameters = [];
                var getNetworkAirMarshal_nodeParam;
                var getNetworkAirMarshal_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkAirMarshal_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkAirMarshal_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAirMarshal_nodeParamType === 'str') {
                    console.log('getNetworkAirMarshal_nodeParamType is "str"');
                    getNetworkAirMarshal_parameters.networkId = getNetworkAirMarshal_nodeParam || undefined;
                } else {
                    console.log('getNetworkAirMarshal_nodeParamType is not "str"')
                    getNetworkAirMarshal_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkAirMarshal_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkAirMarshal_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAirMarshal_nodeParamType === 'str') {
                    console.log('getNetworkAirMarshal_nodeParamType is "str"');
                    getNetworkAirMarshal_parameters.t0 = getNetworkAirMarshal_nodeParam || undefined;
                } else {
                    console.log('getNetworkAirMarshal_nodeParamType is not "str"')
                    getNetworkAirMarshal_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkAirMarshal_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkAirMarshal_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAirMarshal_nodeParamType === 'str') {
                    console.log('getNetworkAirMarshal_nodeParamType is "str"');
                    getNetworkAirMarshal_parameters.timespan = getNetworkAirMarshal_nodeParam || undefined;
                } else {
                    console.log('getNetworkAirMarshal_nodeParamType is not "str"')
                    getNetworkAirMarshal_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                result = client.getNetworkAirMarshal(getNetworkAirMarshal_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkAlertSettings') {
                var getNetworkAlertSettings_parameters = [];
                var getNetworkAlertSettings_nodeParam;
                var getNetworkAlertSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkAlertSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkAlertSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAlertSettings_nodeParamType === 'str') {
                    console.log('getNetworkAlertSettings_nodeParamType is "str"');
                    getNetworkAlertSettings_parameters.networkId = getNetworkAlertSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkAlertSettings_nodeParamType is not "str"')
                    getNetworkAlertSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkAlertSettings(getNetworkAlertSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkAlertSettings') {
                var updateNetworkAlertSettings_parameters = [];
                var updateNetworkAlertSettings_nodeParam;
                var updateNetworkAlertSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkAlertSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkAlertSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkAlertSettings_nodeParamType === 'str') {
                    console.log('updateNetworkAlertSettings_nodeParamType is "str"');
                    updateNetworkAlertSettings_parameters.networkId = updateNetworkAlertSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkAlertSettings_nodeParamType is not "str"')
                    updateNetworkAlertSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkAlertSettings_nodeParam = storedParamValsMap['updateNetworkAlertSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkAlertSettings");

                updateNetworkAlertSettings_nodeParamType = storedParamTypeMap['updateNetworkAlertSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkAlertSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkAlertSettings_parameters.updateNetworkAlertSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkAlertSettings(updateNetworkAlertSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkAppliancePorts') {
                var getNetworkAppliancePorts_parameters = [];
                var getNetworkAppliancePorts_nodeParam;
                var getNetworkAppliancePorts_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkAppliancePorts_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkAppliancePorts_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAppliancePorts_nodeParamType === 'str') {
                    console.log('getNetworkAppliancePorts_nodeParamType is "str"');
                    getNetworkAppliancePorts_parameters.networkId = getNetworkAppliancePorts_nodeParam || undefined;
                } else {
                    console.log('getNetworkAppliancePorts_nodeParamType is not "str"')
                    getNetworkAppliancePorts_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkAppliancePorts(getNetworkAppliancePorts_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkAppliancePort') {
                var getNetworkAppliancePort_parameters = [];
                var getNetworkAppliancePort_nodeParam;
                var getNetworkAppliancePort_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkAppliancePort_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkAppliancePort_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAppliancePort_nodeParamType === 'str') {
                    console.log('getNetworkAppliancePort_nodeParamType is "str"');
                    getNetworkAppliancePort_parameters.networkId = getNetworkAppliancePort_nodeParam || undefined;
                } else {
                    console.log('getNetworkAppliancePort_nodeParamType is not "str"')
                    getNetworkAppliancePort_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkAppliancePort_nodeParam = storedParamValsMap['appliancePortId'] ||
                    RED.util.getMessageProperty(msg, "appliancePortId");

                getNetworkAppliancePort_nodeParamType = storedParamTypeMap['appliancePortId'] ||
                    RED.util.getMessageProperty(msg, "appliancePortId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkAppliancePort_nodeParamType === 'str') {
                    console.log('getNetworkAppliancePort_nodeParamType is "str"');
                    getNetworkAppliancePort_parameters.appliancePortId = getNetworkAppliancePort_nodeParam || undefined;
                } else {
                    console.log('getNetworkAppliancePort_nodeParamType is not "str"')
                    getNetworkAppliancePort_parameters.appliancePortId = RED.util.getMessageProperty(msg, "appliancePortId");
                }
                                result = client.getNetworkAppliancePort(getNetworkAppliancePort_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkAppliancePort') {
                var updateNetworkAppliancePort_parameters = [];
                var updateNetworkAppliancePort_nodeParam;
                var updateNetworkAppliancePort_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkAppliancePort_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkAppliancePort_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkAppliancePort_nodeParamType === 'str') {
                    console.log('updateNetworkAppliancePort_nodeParamType is "str"');
                    updateNetworkAppliancePort_parameters.networkId = updateNetworkAppliancePort_nodeParam || undefined;
                } else {
                    console.log('updateNetworkAppliancePort_nodeParamType is not "str"')
                    updateNetworkAppliancePort_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkAppliancePort_nodeParam = storedParamValsMap['appliancePortId'] ||
                    RED.util.getMessageProperty(msg, "appliancePortId");

                updateNetworkAppliancePort_nodeParamType = storedParamTypeMap['appliancePortId'] ||
                    RED.util.getMessageProperty(msg, "appliancePortId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkAppliancePort_nodeParamType === 'str') {
                    console.log('updateNetworkAppliancePort_nodeParamType is "str"');
                    updateNetworkAppliancePort_parameters.appliancePortId = updateNetworkAppliancePort_nodeParam || undefined;
                } else {
                    console.log('updateNetworkAppliancePort_nodeParamType is not "str"')
                    updateNetworkAppliancePort_parameters.appliancePortId = RED.util.getMessageProperty(msg, "appliancePortId");
                }
                                
                updateNetworkAppliancePort_nodeParam = storedParamValsMap['updateNetworkAppliancePort'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkAppliancePort");

                updateNetworkAppliancePort_nodeParamType = storedParamTypeMap['updateNetworkAppliancePort'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkAppliancePort");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkAppliancePort_parameters.updateNetworkAppliancePort = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkAppliancePort(updateNetworkAppliancePort_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'bindNetwork') {
                var bindNetwork_parameters = [];
                var bindNetwork_nodeParam;
                var bindNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                bindNetwork_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                bindNetwork_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (bindNetwork_nodeParamType === 'str') {
                    console.log('bindNetwork_nodeParamType is "str"');
                    bindNetwork_parameters.networkId = bindNetwork_nodeParam || undefined;
                } else {
                    console.log('bindNetwork_nodeParamType is not "str"')
                    bindNetwork_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                bindNetwork_nodeParam = storedParamValsMap['bindNetwork'] ||
                    RED.util.getMessageProperty(msg, "bindNetwork");

                bindNetwork_nodeParamType = storedParamTypeMap['bindNetwork'] ||
                    RED.util.getMessageProperty(msg, "bindNetwork");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    bindNetwork_parameters.bindNetwork = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.bindNetwork(bindNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkBluetoothClients') {
                var getNetworkBluetoothClients_parameters = [];
                var getNetworkBluetoothClients_nodeParam;
                var getNetworkBluetoothClients_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.networkId = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.t0 = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.timespan = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.perPage = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.startingAfter = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.endingBefore = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                
                getNetworkBluetoothClients_nodeParam = storedParamValsMap['includeConnectivityHistory'] ||
                    RED.util.getMessageProperty(msg, "includeConnectivityHistory");

                getNetworkBluetoothClients_nodeParamType = storedParamTypeMap['includeConnectivityHistory'] ||
                    RED.util.getMessageProperty(msg, "includeConnectivityHistory");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClients_nodeParamType is "str"');
                    getNetworkBluetoothClients_parameters.includeConnectivityHistory = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClients_nodeParamType is not "str"')
                    getNetworkBluetoothClients_parameters.includeConnectivityHistory = RED.util.getMessageProperty(msg, "includeConnectivityHistory");
                }
                                result = client.getNetworkBluetoothClients(getNetworkBluetoothClients_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkBluetoothClient') {
                var getNetworkBluetoothClient_parameters = [];
                var getNetworkBluetoothClient_nodeParam;
                var getNetworkBluetoothClient_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkBluetoothClient_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkBluetoothClient_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClient_nodeParamType is "str"');
                    getNetworkBluetoothClient_parameters.networkId = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClient_nodeParamType is not "str"')
                    getNetworkBluetoothClient_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkBluetoothClient_nodeParam = storedParamValsMap['bluetoothClientId'] ||
                    RED.util.getMessageProperty(msg, "bluetoothClientId");

                getNetworkBluetoothClient_nodeParamType = storedParamTypeMap['bluetoothClientId'] ||
                    RED.util.getMessageProperty(msg, "bluetoothClientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClient_nodeParamType is "str"');
                    getNetworkBluetoothClient_parameters.bluetoothClientId = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClient_nodeParamType is not "str"')
                    getNetworkBluetoothClient_parameters.bluetoothClientId = RED.util.getMessageProperty(msg, "bluetoothClientId");
                }
                                
                getNetworkBluetoothClient_nodeParam = storedParamValsMap['includeConnectivityHistory'] ||
                    RED.util.getMessageProperty(msg, "includeConnectivityHistory");

                getNetworkBluetoothClient_nodeParamType = storedParamTypeMap['includeConnectivityHistory'] ||
                    RED.util.getMessageProperty(msg, "includeConnectivityHistory");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClient_nodeParamType is "str"');
                    getNetworkBluetoothClient_parameters.includeConnectivityHistory = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClient_nodeParamType is not "str"')
                    getNetworkBluetoothClient_parameters.includeConnectivityHistory = RED.util.getMessageProperty(msg, "includeConnectivityHistory");
                }
                                
                getNetworkBluetoothClient_nodeParam = storedParamValsMap['connectivityHistoryTimespan'] ||
                    RED.util.getMessageProperty(msg, "connectivityHistoryTimespan");

                getNetworkBluetoothClient_nodeParamType = storedParamTypeMap['connectivityHistoryTimespan'] ||
                    RED.util.getMessageProperty(msg, "connectivityHistoryTimespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothClient_nodeParamType is "str"');
                    getNetworkBluetoothClient_parameters.connectivityHistoryTimespan = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothClient_nodeParamType is not "str"')
                    getNetworkBluetoothClient_parameters.connectivityHistoryTimespan = RED.util.getMessageProperty(msg, "connectivityHistoryTimespan");
                }
                                result = client.getNetworkBluetoothClient(getNetworkBluetoothClient_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkBluetoothSettings') {
                var getNetworkBluetoothSettings_parameters = [];
                var getNetworkBluetoothSettings_nodeParam;
                var getNetworkBluetoothSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkBluetoothSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkBluetoothSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkBluetoothSettings_nodeParamType === 'str') {
                    console.log('getNetworkBluetoothSettings_nodeParamType is "str"');
                    getNetworkBluetoothSettings_parameters.networkId = getNetworkBluetoothSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkBluetoothSettings_nodeParamType is not "str"')
                    getNetworkBluetoothSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkBluetoothSettings(getNetworkBluetoothSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkBluetoothSettings') {
                var updateNetworkBluetoothSettings_parameters = [];
                var updateNetworkBluetoothSettings_nodeParam;
                var updateNetworkBluetoothSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkBluetoothSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkBluetoothSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkBluetoothSettings_nodeParamType === 'str') {
                    console.log('updateNetworkBluetoothSettings_nodeParamType is "str"');
                    updateNetworkBluetoothSettings_parameters.networkId = updateNetworkBluetoothSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkBluetoothSettings_nodeParamType is not "str"')
                    updateNetworkBluetoothSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkBluetoothSettings_nodeParam = storedParamValsMap['updateNetworkBluetoothSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkBluetoothSettings");

                updateNetworkBluetoothSettings_nodeParamType = storedParamTypeMap['updateNetworkBluetoothSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkBluetoothSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkBluetoothSettings(updateNetworkBluetoothSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'generateNetworkCameraSnapshot') {
                var generateNetworkCameraSnapshot_parameters = [];
                var generateNetworkCameraSnapshot_nodeParam;
                var generateNetworkCameraSnapshot_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                generateNetworkCameraSnapshot_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                generateNetworkCameraSnapshot_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (generateNetworkCameraSnapshot_nodeParamType === 'str') {
                    console.log('generateNetworkCameraSnapshot_nodeParamType is "str"');
                    generateNetworkCameraSnapshot_parameters.networkId = generateNetworkCameraSnapshot_nodeParam || undefined;
                } else {
                    console.log('generateNetworkCameraSnapshot_nodeParamType is not "str"')
                    generateNetworkCameraSnapshot_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                generateNetworkCameraSnapshot_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                generateNetworkCameraSnapshot_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (generateNetworkCameraSnapshot_nodeParamType === 'str') {
                    console.log('generateNetworkCameraSnapshot_nodeParamType is "str"');
                    generateNetworkCameraSnapshot_parameters.serial = generateNetworkCameraSnapshot_nodeParam || undefined;
                } else {
                    console.log('generateNetworkCameraSnapshot_nodeParamType is not "str"')
                    generateNetworkCameraSnapshot_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                generateNetworkCameraSnapshot_nodeParam = storedParamValsMap['generateNetworkCameraSnapshot'] ||
                    RED.util.getMessageProperty(msg, "generateNetworkCameraSnapshot");

                generateNetworkCameraSnapshot_nodeParamType = storedParamTypeMap['generateNetworkCameraSnapshot'] ||
                    RED.util.getMessageProperty(msg, "generateNetworkCameraSnapshot");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    generateNetworkCameraSnapshot_parameters.generateNetworkCameraSnapshot = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.generateNetworkCameraSnapshot(generateNetworkCameraSnapshot_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkCameraVideoLink') {
                var getNetworkCameraVideoLink_parameters = [];
                var getNetworkCameraVideoLink_nodeParam;
                var getNetworkCameraVideoLink_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkCameraVideoLink_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkCameraVideoLink_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkCameraVideoLink_nodeParamType === 'str') {
                    console.log('getNetworkCameraVideoLink_nodeParamType is "str"');
                    getNetworkCameraVideoLink_parameters.networkId = getNetworkCameraVideoLink_nodeParam || undefined;
                } else {
                    console.log('getNetworkCameraVideoLink_nodeParamType is not "str"')
                    getNetworkCameraVideoLink_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkCameraVideoLink_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkCameraVideoLink_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkCameraVideoLink_nodeParamType === 'str') {
                    console.log('getNetworkCameraVideoLink_nodeParamType is "str"');
                    getNetworkCameraVideoLink_parameters.serial = getNetworkCameraVideoLink_nodeParam || undefined;
                } else {
                    console.log('getNetworkCameraVideoLink_nodeParamType is not "str"')
                    getNetworkCameraVideoLink_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkCameraVideoLink_nodeParam = storedParamValsMap['timestamp'] ||
                    RED.util.getMessageProperty(msg, "timestamp");

                getNetworkCameraVideoLink_nodeParamType = storedParamTypeMap['timestamp'] ||
                    RED.util.getMessageProperty(msg, "timestamp");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkCameraVideoLink_nodeParamType === 'str') {
                    console.log('getNetworkCameraVideoLink_nodeParamType is "str"');
                    getNetworkCameraVideoLink_parameters.timestamp = getNetworkCameraVideoLink_nodeParam || undefined;
                } else {
                    console.log('getNetworkCameraVideoLink_nodeParamType is not "str"')
                    getNetworkCameraVideoLink_parameters.timestamp = RED.util.getMessageProperty(msg, "timestamp");
                }
                                result = client.getNetworkCameraVideoLink(getNetworkCameraVideoLink_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkCellularFirewallRules') {
                var getNetworkCellularFirewallRules_parameters = [];
                var getNetworkCellularFirewallRules_nodeParam;
                var getNetworkCellularFirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkCellularFirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkCellularFirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkCellularFirewallRules_nodeParamType === 'str') {
                    console.log('getNetworkCellularFirewallRules_nodeParamType is "str"');
                    getNetworkCellularFirewallRules_parameters.networkId = getNetworkCellularFirewallRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkCellularFirewallRules_nodeParamType is not "str"')
                    getNetworkCellularFirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkCellularFirewallRules(getNetworkCellularFirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkCellularFirewallRules') {
                var updateNetworkCellularFirewallRules_parameters = [];
                var updateNetworkCellularFirewallRules_nodeParam;
                var updateNetworkCellularFirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkCellularFirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkCellularFirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkCellularFirewallRules_nodeParamType === 'str') {
                    console.log('updateNetworkCellularFirewallRules_nodeParamType is "str"');
                    updateNetworkCellularFirewallRules_parameters.networkId = updateNetworkCellularFirewallRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkCellularFirewallRules_nodeParamType is not "str"')
                    updateNetworkCellularFirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkCellularFirewallRules_nodeParam = storedParamValsMap['updateNetworkCellularFirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkCellularFirewallRules");

                updateNetworkCellularFirewallRules_nodeParamType = storedParamTypeMap['updateNetworkCellularFirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkCellularFirewallRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkCellularFirewallRules(updateNetworkCellularFirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClients') {
                var getNetworkClients_parameters = [];
                var getNetworkClients_nodeParam;
                var getNetworkClients_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClients_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClients_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClients_nodeParamType === 'str') {
                    console.log('getNetworkClients_nodeParamType is "str"');
                    getNetworkClients_parameters.networkId = getNetworkClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkClients_nodeParamType is not "str"')
                    getNetworkClients_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClients_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClients_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClients_nodeParamType === 'str') {
                    console.log('getNetworkClients_nodeParamType is "str"');
                    getNetworkClients_parameters.t0 = getNetworkClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkClients_nodeParamType is not "str"')
                    getNetworkClients_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClients_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClients_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClients_nodeParamType === 'str') {
                    console.log('getNetworkClients_nodeParamType is "str"');
                    getNetworkClients_parameters.timespan = getNetworkClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkClients_nodeParamType is not "str"')
                    getNetworkClients_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClients_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkClients_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClients_nodeParamType === 'str') {
                    console.log('getNetworkClients_nodeParamType is "str"');
                    getNetworkClients_parameters.perPage = getNetworkClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkClients_nodeParamType is not "str"')
                    getNetworkClients_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkClients_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkClients_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClients_nodeParamType === 'str') {
                    console.log('getNetworkClients_nodeParamType is "str"');
                    getNetworkClients_parameters.startingAfter = getNetworkClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkClients_nodeParamType is not "str"')
                    getNetworkClients_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkClients_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkClients_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClients_nodeParamType === 'str') {
                    console.log('getNetworkClients_nodeParamType is "str"');
                    getNetworkClients_parameters.endingBefore = getNetworkClients_nodeParam || undefined;
                } else {
                    console.log('getNetworkClients_nodeParamType is not "str"')
                    getNetworkClients_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkClients(getNetworkClients_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientsConnectionStats') {
                var getNetworkClientsConnectionStats_parameters = [];
                var getNetworkClientsConnectionStats_nodeParam;
                var getNetworkClientsConnectionStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.networkId = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.t0 = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.t1 = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.timespan = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.ssid = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.vlan = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkClientsConnectionStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkClientsConnectionStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is "str"');
                    getNetworkClientsConnectionStats_parameters.apTag = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsConnectionStats_nodeParamType is not "str"')
                    getNetworkClientsConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                result = client.getNetworkClientsConnectionStats(getNetworkClientsConnectionStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientsLatencyStats') {
                var getNetworkClientsLatencyStats_parameters = [];
                var getNetworkClientsLatencyStats_nodeParam;
                var getNetworkClientsLatencyStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.networkId = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.t0 = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.t1 = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.timespan = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.ssid = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.vlan = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.apTag = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                
                getNetworkClientsLatencyStats_nodeParam = storedParamValsMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                getNetworkClientsLatencyStats_nodeParamType = storedParamTypeMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is "str"');
                    getNetworkClientsLatencyStats_parameters.fields = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientsLatencyStats_nodeParamType is not "str"')
                    getNetworkClientsLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, "fields");
                }
                                result = client.getNetworkClientsLatencyStats(getNetworkClientsLatencyStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'provisionNetworkClients') {
                var provisionNetworkClients_parameters = [];
                var provisionNetworkClients_nodeParam;
                var provisionNetworkClients_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                provisionNetworkClients_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                provisionNetworkClients_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (provisionNetworkClients_nodeParamType === 'str') {
                    console.log('provisionNetworkClients_nodeParamType is "str"');
                    provisionNetworkClients_parameters.networkId = provisionNetworkClients_nodeParam || undefined;
                } else {
                    console.log('provisionNetworkClients_nodeParamType is not "str"')
                    provisionNetworkClients_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                provisionNetworkClients_nodeParam = storedParamValsMap['provisionNetworkClients'] ||
                    RED.util.getMessageProperty(msg, "provisionNetworkClients");

                provisionNetworkClients_nodeParamType = storedParamTypeMap['provisionNetworkClients'] ||
                    RED.util.getMessageProperty(msg, "provisionNetworkClients");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    provisionNetworkClients_parameters.provisionNetworkClients = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.provisionNetworkClients(provisionNetworkClients_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClient') {
                var getNetworkClient_parameters = [];
                var getNetworkClient_nodeParam;
                var getNetworkClient_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClient_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClient_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClient_nodeParamType === 'str') {
                    console.log('getNetworkClient_nodeParamType is "str"');
                    getNetworkClient_parameters.networkId = getNetworkClient_nodeParam || undefined;
                } else {
                    console.log('getNetworkClient_nodeParamType is not "str"')
                    getNetworkClient_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClient_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClient_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClient_nodeParamType === 'str') {
                    console.log('getNetworkClient_nodeParamType is "str"');
                    getNetworkClient_parameters.clientId = getNetworkClient_nodeParam || undefined;
                } else {
                    console.log('getNetworkClient_nodeParamType is not "str"')
                    getNetworkClient_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                result = client.getNetworkClient(getNetworkClient_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientConnectionStats') {
                var getNetworkClientConnectionStats_parameters = [];
                var getNetworkClientConnectionStats_nodeParam;
                var getNetworkClientConnectionStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.networkId = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.clientId = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.t0 = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.t1 = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.timespan = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.ssid = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.vlan = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkClientConnectionStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkClientConnectionStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkClientConnectionStats_nodeParamType is "str"');
                    getNetworkClientConnectionStats_parameters.apTag = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientConnectionStats_nodeParamType is not "str"')
                    getNetworkClientConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                result = client.getNetworkClientConnectionStats(getNetworkClientConnectionStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientEvents') {
                var getNetworkClientEvents_parameters = [];
                var getNetworkClientEvents_nodeParam;
                var getNetworkClientEvents_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientEvents_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientEvents_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientEvents_nodeParamType is "str"');
                    getNetworkClientEvents_parameters.networkId = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientEvents_nodeParamType is not "str"')
                    getNetworkClientEvents_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientEvents_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientEvents_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientEvents_nodeParamType is "str"');
                    getNetworkClientEvents_parameters.clientId = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientEvents_nodeParamType is not "str"')
                    getNetworkClientEvents_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                getNetworkClientEvents_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkClientEvents_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientEvents_nodeParamType is "str"');
                    getNetworkClientEvents_parameters.perPage = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientEvents_nodeParamType is not "str"')
                    getNetworkClientEvents_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkClientEvents_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkClientEvents_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientEvents_nodeParamType is "str"');
                    getNetworkClientEvents_parameters.startingAfter = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientEvents_nodeParamType is not "str"')
                    getNetworkClientEvents_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkClientEvents_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkClientEvents_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientEvents_nodeParamType is "str"');
                    getNetworkClientEvents_parameters.endingBefore = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientEvents_nodeParamType is not "str"')
                    getNetworkClientEvents_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkClientEvents(getNetworkClientEvents_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientLatencyHistory') {
                var getNetworkClientLatencyHistory_parameters = [];
                var getNetworkClientLatencyHistory_nodeParam;
                var getNetworkClientLatencyHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientLatencyHistory_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientLatencyHistory_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is "str"');
                    getNetworkClientLatencyHistory_parameters.networkId = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is not "str"')
                    getNetworkClientLatencyHistory_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientLatencyHistory_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientLatencyHistory_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is "str"');
                    getNetworkClientLatencyHistory_parameters.clientId = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is not "str"')
                    getNetworkClientLatencyHistory_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                getNetworkClientLatencyHistory_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClientLatencyHistory_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is "str"');
                    getNetworkClientLatencyHistory_parameters.t0 = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is not "str"')
                    getNetworkClientLatencyHistory_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClientLatencyHistory_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkClientLatencyHistory_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is "str"');
                    getNetworkClientLatencyHistory_parameters.t1 = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is not "str"')
                    getNetworkClientLatencyHistory_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkClientLatencyHistory_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClientLatencyHistory_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is "str"');
                    getNetworkClientLatencyHistory_parameters.timespan = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is not "str"')
                    getNetworkClientLatencyHistory_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClientLatencyHistory_nodeParam = storedParamValsMap['resolution'] ||
                    RED.util.getMessageProperty(msg, "resolution");

                getNetworkClientLatencyHistory_nodeParamType = storedParamTypeMap['resolution'] ||
                    RED.util.getMessageProperty(msg, "resolution");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is "str"');
                    getNetworkClientLatencyHistory_parameters.resolution = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyHistory_nodeParamType is not "str"')
                    getNetworkClientLatencyHistory_parameters.resolution = RED.util.getMessageProperty(msg, "resolution");
                }
                                result = client.getNetworkClientLatencyHistory(getNetworkClientLatencyHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientLatencyStats') {
                var getNetworkClientLatencyStats_parameters = [];
                var getNetworkClientLatencyStats_nodeParam;
                var getNetworkClientLatencyStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.networkId = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.clientId = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.t0 = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.t1 = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.timespan = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.ssid = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.vlan = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.apTag = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                
                getNetworkClientLatencyStats_nodeParam = storedParamValsMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                getNetworkClientLatencyStats_nodeParamType = storedParamTypeMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkClientLatencyStats_nodeParamType is "str"');
                    getNetworkClientLatencyStats_parameters.fields = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientLatencyStats_nodeParamType is not "str"')
                    getNetworkClientLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, "fields");
                }
                                result = client.getNetworkClientLatencyStats(getNetworkClientLatencyStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientPolicy') {
                var getNetworkClientPolicy_parameters = [];
                var getNetworkClientPolicy_nodeParam;
                var getNetworkClientPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientPolicy_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientPolicy_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientPolicy_nodeParamType === 'str') {
                    console.log('getNetworkClientPolicy_nodeParamType is "str"');
                    getNetworkClientPolicy_parameters.networkId = getNetworkClientPolicy_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientPolicy_nodeParamType is not "str"')
                    getNetworkClientPolicy_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientPolicy_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientPolicy_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientPolicy_nodeParamType === 'str') {
                    console.log('getNetworkClientPolicy_nodeParamType is "str"');
                    getNetworkClientPolicy_parameters.clientId = getNetworkClientPolicy_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientPolicy_nodeParamType is not "str"')
                    getNetworkClientPolicy_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                result = client.getNetworkClientPolicy(getNetworkClientPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkClientPolicy') {
                var updateNetworkClientPolicy_parameters = [];
                var updateNetworkClientPolicy_nodeParam;
                var updateNetworkClientPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkClientPolicy_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkClientPolicy_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkClientPolicy_nodeParamType === 'str') {
                    console.log('updateNetworkClientPolicy_nodeParamType is "str"');
                    updateNetworkClientPolicy_parameters.networkId = updateNetworkClientPolicy_nodeParam || undefined;
                } else {
                    console.log('updateNetworkClientPolicy_nodeParamType is not "str"')
                    updateNetworkClientPolicy_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkClientPolicy_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                updateNetworkClientPolicy_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkClientPolicy_nodeParamType === 'str') {
                    console.log('updateNetworkClientPolicy_nodeParamType is "str"');
                    updateNetworkClientPolicy_parameters.clientId = updateNetworkClientPolicy_nodeParam || undefined;
                } else {
                    console.log('updateNetworkClientPolicy_nodeParamType is not "str"')
                    updateNetworkClientPolicy_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                updateNetworkClientPolicy_nodeParam = storedParamValsMap['updateNetworkClientPolicy'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkClientPolicy");

                updateNetworkClientPolicy_nodeParamType = storedParamTypeMap['updateNetworkClientPolicy'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkClientPolicy");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkClientPolicy_parameters.updateNetworkClientPolicy = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkClientPolicy(updateNetworkClientPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientSecurityEvents') {
                var getNetworkClientSecurityEvents_parameters = [];
                var getNetworkClientSecurityEvents_nodeParam;
                var getNetworkClientSecurityEvents_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.networkId = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.clientId = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.t0 = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.t1 = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.timespan = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.perPage = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.startingAfter = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkClientSecurityEvents_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkClientSecurityEvents_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is "str"');
                    getNetworkClientSecurityEvents_parameters.endingBefore = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSecurityEvents_nodeParamType is not "str"')
                    getNetworkClientSecurityEvents_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkClientSecurityEvents(getNetworkClientSecurityEvents_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientSplashAuthorizationStatus') {
                var getNetworkClientSplashAuthorizationStatus_parameters = [];
                var getNetworkClientSplashAuthorizationStatus_nodeParam;
                var getNetworkClientSplashAuthorizationStatus_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientSplashAuthorizationStatus_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientSplashAuthorizationStatus_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    console.log('getNetworkClientSplashAuthorizationStatus_nodeParamType is "str"');
                    getNetworkClientSplashAuthorizationStatus_parameters.networkId = getNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSplashAuthorizationStatus_nodeParamType is not "str"')
                    getNetworkClientSplashAuthorizationStatus_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientSplashAuthorizationStatus_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientSplashAuthorizationStatus_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    console.log('getNetworkClientSplashAuthorizationStatus_nodeParamType is "str"');
                    getNetworkClientSplashAuthorizationStatus_parameters.clientId = getNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientSplashAuthorizationStatus_nodeParamType is not "str"')
                    getNetworkClientSplashAuthorizationStatus_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                result = client.getNetworkClientSplashAuthorizationStatus(getNetworkClientSplashAuthorizationStatus_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkClientSplashAuthorizationStatus') {
                var updateNetworkClientSplashAuthorizationStatus_parameters = [];
                var updateNetworkClientSplashAuthorizationStatus_nodeParam;
                var updateNetworkClientSplashAuthorizationStatus_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkClientSplashAuthorizationStatus_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkClientSplashAuthorizationStatus_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    console.log('updateNetworkClientSplashAuthorizationStatus_nodeParamType is "str"');
                    updateNetworkClientSplashAuthorizationStatus_parameters.networkId = updateNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    console.log('updateNetworkClientSplashAuthorizationStatus_nodeParamType is not "str"')
                    updateNetworkClientSplashAuthorizationStatus_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkClientSplashAuthorizationStatus_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                updateNetworkClientSplashAuthorizationStatus_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    console.log('updateNetworkClientSplashAuthorizationStatus_nodeParamType is "str"');
                    updateNetworkClientSplashAuthorizationStatus_parameters.clientId = updateNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    console.log('updateNetworkClientSplashAuthorizationStatus_nodeParamType is not "str"')
                    updateNetworkClientSplashAuthorizationStatus_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                updateNetworkClientSplashAuthorizationStatus_nodeParam = storedParamValsMap['updateNetworkClientSplashAuthorizationStatus'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkClientSplashAuthorizationStatus");

                updateNetworkClientSplashAuthorizationStatus_nodeParamType = storedParamTypeMap['updateNetworkClientSplashAuthorizationStatus'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkClientSplashAuthorizationStatus");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkClientSplashAuthorizationStatus(updateNetworkClientSplashAuthorizationStatus_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientTrafficHistory') {
                var getNetworkClientTrafficHistory_parameters = [];
                var getNetworkClientTrafficHistory_nodeParam;
                var getNetworkClientTrafficHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientTrafficHistory_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientTrafficHistory_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is "str"');
                    getNetworkClientTrafficHistory_parameters.networkId = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is not "str"')
                    getNetworkClientTrafficHistory_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientTrafficHistory_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientTrafficHistory_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is "str"');
                    getNetworkClientTrafficHistory_parameters.clientId = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is not "str"')
                    getNetworkClientTrafficHistory_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                
                getNetworkClientTrafficHistory_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkClientTrafficHistory_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is "str"');
                    getNetworkClientTrafficHistory_parameters.perPage = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is not "str"')
                    getNetworkClientTrafficHistory_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkClientTrafficHistory_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkClientTrafficHistory_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is "str"');
                    getNetworkClientTrafficHistory_parameters.startingAfter = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is not "str"')
                    getNetworkClientTrafficHistory_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkClientTrafficHistory_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkClientTrafficHistory_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is "str"');
                    getNetworkClientTrafficHistory_parameters.endingBefore = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientTrafficHistory_nodeParamType is not "str"')
                    getNetworkClientTrafficHistory_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkClientTrafficHistory(getNetworkClientTrafficHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkClientUsageHistory') {
                var getNetworkClientUsageHistory_parameters = [];
                var getNetworkClientUsageHistory_nodeParam;
                var getNetworkClientUsageHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkClientUsageHistory_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkClientUsageHistory_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientUsageHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientUsageHistory_nodeParamType is "str"');
                    getNetworkClientUsageHistory_parameters.networkId = getNetworkClientUsageHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientUsageHistory_nodeParamType is not "str"')
                    getNetworkClientUsageHistory_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkClientUsageHistory_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkClientUsageHistory_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkClientUsageHistory_nodeParamType === 'str') {
                    console.log('getNetworkClientUsageHistory_nodeParamType is "str"');
                    getNetworkClientUsageHistory_parameters.clientId = getNetworkClientUsageHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkClientUsageHistory_nodeParamType is not "str"')
                    getNetworkClientUsageHistory_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                result = client.getNetworkClientUsageHistory(getNetworkClientUsageHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkConnectionStats') {
                var getNetworkConnectionStats_parameters = [];
                var getNetworkConnectionStats_nodeParam;
                var getNetworkConnectionStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.networkId = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.t0 = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.t1 = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.timespan = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.ssid = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.vlan = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkConnectionStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkConnectionStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkConnectionStats_nodeParamType is "str"');
                    getNetworkConnectionStats_parameters.apTag = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkConnectionStats_nodeParamType is not "str"')
                    getNetworkConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                result = client.getNetworkConnectionStats(getNetworkConnectionStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkContentFiltering') {
                var getNetworkContentFiltering_parameters = [];
                var getNetworkContentFiltering_nodeParam;
                var getNetworkContentFiltering_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkContentFiltering_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkContentFiltering_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkContentFiltering_nodeParamType === 'str') {
                    console.log('getNetworkContentFiltering_nodeParamType is "str"');
                    getNetworkContentFiltering_parameters.networkId = getNetworkContentFiltering_nodeParam || undefined;
                } else {
                    console.log('getNetworkContentFiltering_nodeParamType is not "str"')
                    getNetworkContentFiltering_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkContentFiltering(getNetworkContentFiltering_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkContentFiltering') {
                var updateNetworkContentFiltering_parameters = [];
                var updateNetworkContentFiltering_nodeParam;
                var updateNetworkContentFiltering_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkContentFiltering_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkContentFiltering_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkContentFiltering_nodeParamType === 'str') {
                    console.log('updateNetworkContentFiltering_nodeParamType is "str"');
                    updateNetworkContentFiltering_parameters.networkId = updateNetworkContentFiltering_nodeParam || undefined;
                } else {
                    console.log('updateNetworkContentFiltering_nodeParamType is not "str"')
                    updateNetworkContentFiltering_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkContentFiltering_nodeParam = storedParamValsMap['updateNetworkContentFiltering'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkContentFiltering");

                updateNetworkContentFiltering_nodeParamType = storedParamTypeMap['updateNetworkContentFiltering'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkContentFiltering");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkContentFiltering_parameters.updateNetworkContentFiltering = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkContentFiltering(updateNetworkContentFiltering_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkContentFilteringCategories') {
                var getNetworkContentFilteringCategories_parameters = [];
                var getNetworkContentFilteringCategories_nodeParam;
                var getNetworkContentFilteringCategories_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkContentFilteringCategories_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkContentFilteringCategories_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkContentFilteringCategories_nodeParamType === 'str') {
                    console.log('getNetworkContentFilteringCategories_nodeParamType is "str"');
                    getNetworkContentFilteringCategories_parameters.networkId = getNetworkContentFilteringCategories_nodeParam || undefined;
                } else {
                    console.log('getNetworkContentFilteringCategories_nodeParamType is not "str"')
                    getNetworkContentFilteringCategories_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkContentFilteringCategories(getNetworkContentFilteringCategories_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDevices') {
                var getNetworkDevices_parameters = [];
                var getNetworkDevices_nodeParam;
                var getNetworkDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDevices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDevices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevices_nodeParamType === 'str') {
                    console.log('getNetworkDevices_nodeParamType is "str"');
                    getNetworkDevices_parameters.networkId = getNetworkDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevices_nodeParamType is not "str"')
                    getNetworkDevices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkDevices(getNetworkDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'claimNetworkDevices') {
                var claimNetworkDevices_parameters = [];
                var claimNetworkDevices_nodeParam;
                var claimNetworkDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                claimNetworkDevices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                claimNetworkDevices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (claimNetworkDevices_nodeParamType === 'str') {
                    console.log('claimNetworkDevices_nodeParamType is "str"');
                    claimNetworkDevices_parameters.networkId = claimNetworkDevices_nodeParam || undefined;
                } else {
                    console.log('claimNetworkDevices_nodeParamType is not "str"')
                    claimNetworkDevices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                claimNetworkDevices_nodeParam = storedParamValsMap['claimNetworkDevices'] ||
                    RED.util.getMessageProperty(msg, "claimNetworkDevices");

                claimNetworkDevices_nodeParamType = storedParamTypeMap['claimNetworkDevices'] ||
                    RED.util.getMessageProperty(msg, "claimNetworkDevices");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    claimNetworkDevices_parameters.claimNetworkDevices = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.claimNetworkDevices(claimNetworkDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDevicesConnectionStats') {
                var getNetworkDevicesConnectionStats_parameters = [];
                var getNetworkDevicesConnectionStats_nodeParam;
                var getNetworkDevicesConnectionStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.networkId = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.t0 = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.t1 = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.timespan = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.ssid = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.vlan = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkDevicesConnectionStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkDevicesConnectionStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is "str"');
                    getNetworkDevicesConnectionStats_parameters.apTag = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesConnectionStats_nodeParamType is not "str"')
                    getNetworkDevicesConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                result = client.getNetworkDevicesConnectionStats(getNetworkDevicesConnectionStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDevicesLatencyStats') {
                var getNetworkDevicesLatencyStats_parameters = [];
                var getNetworkDevicesLatencyStats_nodeParam;
                var getNetworkDevicesLatencyStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.networkId = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.t0 = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.t1 = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.timespan = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.ssid = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.vlan = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.apTag = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                
                getNetworkDevicesLatencyStats_nodeParam = storedParamValsMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                getNetworkDevicesLatencyStats_nodeParamType = storedParamTypeMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is "str"');
                    getNetworkDevicesLatencyStats_parameters.fields = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicesLatencyStats_nodeParamType is not "str"')
                    getNetworkDevicesLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, "fields");
                }
                                result = client.getNetworkDevicesLatencyStats(getNetworkDevicesLatencyStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDevice') {
                var getNetworkDevice_parameters = [];
                var getNetworkDevice_nodeParam;
                var getNetworkDevice_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDevice_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDevice_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevice_nodeParamType === 'str') {
                    console.log('getNetworkDevice_nodeParamType is "str"');
                    getNetworkDevice_parameters.networkId = getNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevice_nodeParamType is not "str"')
                    getNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDevice_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDevice_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevice_nodeParamType === 'str') {
                    console.log('getNetworkDevice_nodeParamType is "str"');
                    getNetworkDevice_parameters.serial = getNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevice_nodeParamType is not "str"')
                    getNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getNetworkDevice(getNetworkDevice_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkDevice') {
                var updateNetworkDevice_parameters = [];
                var updateNetworkDevice_nodeParam;
                var updateNetworkDevice_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkDevice_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkDevice_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkDevice_nodeParamType === 'str') {
                    console.log('updateNetworkDevice_nodeParamType is "str"');
                    updateNetworkDevice_parameters.networkId = updateNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('updateNetworkDevice_nodeParamType is not "str"')
                    updateNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkDevice_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                updateNetworkDevice_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkDevice_nodeParamType === 'str') {
                    console.log('updateNetworkDevice_nodeParamType is "str"');
                    updateNetworkDevice_parameters.serial = updateNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('updateNetworkDevice_nodeParamType is not "str"')
                    updateNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                updateNetworkDevice_nodeParam = storedParamValsMap['updateNetworkDevice'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkDevice");

                updateNetworkDevice_nodeParamType = storedParamTypeMap['updateNetworkDevice'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkDevice");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkDevice_parameters.updateNetworkDevice = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkDevice(updateNetworkDevice_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'blinkNetworkDeviceLeds') {
                var blinkNetworkDeviceLeds_parameters = [];
                var blinkNetworkDeviceLeds_nodeParam;
                var blinkNetworkDeviceLeds_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                blinkNetworkDeviceLeds_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                blinkNetworkDeviceLeds_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (blinkNetworkDeviceLeds_nodeParamType === 'str') {
                    console.log('blinkNetworkDeviceLeds_nodeParamType is "str"');
                    blinkNetworkDeviceLeds_parameters.networkId = blinkNetworkDeviceLeds_nodeParam || undefined;
                } else {
                    console.log('blinkNetworkDeviceLeds_nodeParamType is not "str"')
                    blinkNetworkDeviceLeds_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                blinkNetworkDeviceLeds_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                blinkNetworkDeviceLeds_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (blinkNetworkDeviceLeds_nodeParamType === 'str') {
                    console.log('blinkNetworkDeviceLeds_nodeParamType is "str"');
                    blinkNetworkDeviceLeds_parameters.serial = blinkNetworkDeviceLeds_nodeParam || undefined;
                } else {
                    console.log('blinkNetworkDeviceLeds_nodeParamType is not "str"')
                    blinkNetworkDeviceLeds_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                blinkNetworkDeviceLeds_nodeParam = storedParamValsMap['blinkNetworkDeviceLeds'] ||
                    RED.util.getMessageProperty(msg, "blinkNetworkDeviceLeds");

                blinkNetworkDeviceLeds_nodeParamType = storedParamTypeMap['blinkNetworkDeviceLeds'] ||
                    RED.util.getMessageProperty(msg, "blinkNetworkDeviceLeds");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    blinkNetworkDeviceLeds_parameters.blinkNetworkDeviceLeds = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.blinkNetworkDeviceLeds(blinkNetworkDeviceLeds_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceConnectionStats') {
                var getNetworkDeviceConnectionStats_parameters = [];
                var getNetworkDeviceConnectionStats_nodeParam;
                var getNetworkDeviceConnectionStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.networkId = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.serial = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.t0 = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.t1 = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.timespan = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.ssid = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.vlan = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkDeviceConnectionStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkDeviceConnectionStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is "str"');
                    getNetworkDeviceConnectionStats_parameters.apTag = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceConnectionStats_nodeParamType is not "str"')
                    getNetworkDeviceConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                result = client.getNetworkDeviceConnectionStats(getNetworkDeviceConnectionStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceLatencyStats') {
                var getNetworkDeviceLatencyStats_parameters = [];
                var getNetworkDeviceLatencyStats_nodeParam;
                var getNetworkDeviceLatencyStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.networkId = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.serial = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.t0 = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.t1 = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.timespan = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.ssid = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.vlan = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.apTag = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                
                getNetworkDeviceLatencyStats_nodeParam = storedParamValsMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                getNetworkDeviceLatencyStats_nodeParamType = storedParamTypeMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is "str"');
                    getNetworkDeviceLatencyStats_parameters.fields = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLatencyStats_nodeParamType is not "str"')
                    getNetworkDeviceLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, "fields");
                }
                                result = client.getNetworkDeviceLatencyStats(getNetworkDeviceLatencyStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceLldp_cdp') {
                var getNetworkDeviceLldp_cdp_parameters = [];
                var getNetworkDeviceLldp_cdp_nodeParam;
                var getNetworkDeviceLldp_cdp_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceLldp_cdp_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceLldp_cdp_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLldp_cdp_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLldp_cdp_nodeParamType is "str"');
                    getNetworkDeviceLldp_cdp_parameters.networkId = getNetworkDeviceLldp_cdp_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLldp_cdp_nodeParamType is not "str"')
                    getNetworkDeviceLldp_cdp_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceLldp_cdp_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceLldp_cdp_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLldp_cdp_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLldp_cdp_nodeParamType is "str"');
                    getNetworkDeviceLldp_cdp_parameters.serial = getNetworkDeviceLldp_cdp_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLldp_cdp_nodeParamType is not "str"')
                    getNetworkDeviceLldp_cdp_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkDeviceLldp_cdp_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkDeviceLldp_cdp_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLldp_cdp_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLldp_cdp_nodeParamType is "str"');
                    getNetworkDeviceLldp_cdp_parameters.timespan = getNetworkDeviceLldp_cdp_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLldp_cdp_nodeParamType is not "str"')
                    getNetworkDeviceLldp_cdp_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                result = client.getNetworkDeviceLldp_cdp(getNetworkDeviceLldp_cdp_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceLossAndLatencyHistory') {
                var getNetworkDeviceLossAndLatencyHistory_parameters = [];
                var getNetworkDeviceLossAndLatencyHistory_nodeParam;
                var getNetworkDeviceLossAndLatencyHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.networkId = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.serial = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.t0 = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.t1 = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.timespan = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['resolution'] ||
                    RED.util.getMessageProperty(msg, "resolution");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['resolution'] ||
                    RED.util.getMessageProperty(msg, "resolution");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.resolution = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.resolution = RED.util.getMessageProperty(msg, "resolution");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['uplink'] ||
                    RED.util.getMessageProperty(msg, "uplink");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['uplink'] ||
                    RED.util.getMessageProperty(msg, "uplink");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.uplink = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.uplink = RED.util.getMessageProperty(msg, "uplink");
                }
                                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = storedParamValsMap['ip'] ||
                    RED.util.getMessageProperty(msg, "ip");

                getNetworkDeviceLossAndLatencyHistory_nodeParamType = storedParamTypeMap['ip'] ||
                    RED.util.getMessageProperty(msg, "ip");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is "str"');
                    getNetworkDeviceLossAndLatencyHistory_parameters.ip = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceLossAndLatencyHistory_nodeParamType is not "str"')
                    getNetworkDeviceLossAndLatencyHistory_parameters.ip = RED.util.getMessageProperty(msg, "ip");
                }
                                result = client.getNetworkDeviceLossAndLatencyHistory(getNetworkDeviceLossAndLatencyHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceManagementInterfaceSettings') {
                var getNetworkDeviceManagementInterfaceSettings_parameters = [];
                var getNetworkDeviceManagementInterfaceSettings_nodeParam;
                var getNetworkDeviceManagementInterfaceSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceManagementInterfaceSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceManagementInterfaceSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceManagementInterfaceSettings_nodeParamType === 'str') {
                    console.log('getNetworkDeviceManagementInterfaceSettings_nodeParamType is "str"');
                    getNetworkDeviceManagementInterfaceSettings_parameters.networkId = getNetworkDeviceManagementInterfaceSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceManagementInterfaceSettings_nodeParamType is not "str"')
                    getNetworkDeviceManagementInterfaceSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceManagementInterfaceSettings_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceManagementInterfaceSettings_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceManagementInterfaceSettings_nodeParamType === 'str') {
                    console.log('getNetworkDeviceManagementInterfaceSettings_nodeParamType is "str"');
                    getNetworkDeviceManagementInterfaceSettings_parameters.serial = getNetworkDeviceManagementInterfaceSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceManagementInterfaceSettings_nodeParamType is not "str"')
                    getNetworkDeviceManagementInterfaceSettings_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getNetworkDeviceManagementInterfaceSettings(getNetworkDeviceManagementInterfaceSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkDeviceManagementInterfaceSettings') {
                var updateNetworkDeviceManagementInterfaceSettings_parameters = [];
                var updateNetworkDeviceManagementInterfaceSettings_nodeParam;
                var updateNetworkDeviceManagementInterfaceSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkDeviceManagementInterfaceSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkDeviceManagementInterfaceSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkDeviceManagementInterfaceSettings_nodeParamType === 'str') {
                    console.log('updateNetworkDeviceManagementInterfaceSettings_nodeParamType is "str"');
                    updateNetworkDeviceManagementInterfaceSettings_parameters.networkId = updateNetworkDeviceManagementInterfaceSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkDeviceManagementInterfaceSettings_nodeParamType is not "str"')
                    updateNetworkDeviceManagementInterfaceSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkDeviceManagementInterfaceSettings_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                updateNetworkDeviceManagementInterfaceSettings_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkDeviceManagementInterfaceSettings_nodeParamType === 'str') {
                    console.log('updateNetworkDeviceManagementInterfaceSettings_nodeParamType is "str"');
                    updateNetworkDeviceManagementInterfaceSettings_parameters.serial = updateNetworkDeviceManagementInterfaceSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkDeviceManagementInterfaceSettings_nodeParamType is not "str"')
                    updateNetworkDeviceManagementInterfaceSettings_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                updateNetworkDeviceManagementInterfaceSettings_nodeParam = storedParamValsMap['updateNetworkDeviceManagementInterfaceSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkDeviceManagementInterfaceSettings");

                updateNetworkDeviceManagementInterfaceSettings_nodeParamType = storedParamTypeMap['updateNetworkDeviceManagementInterfaceSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkDeviceManagementInterfaceSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkDeviceManagementInterfaceSettings_parameters.updateNetworkDeviceManagementInterfaceSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkDeviceManagementInterfaceSettings(updateNetworkDeviceManagementInterfaceSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDevicePerformance') {
                var getNetworkDevicePerformance_parameters = [];
                var getNetworkDevicePerformance_nodeParam;
                var getNetworkDevicePerformance_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDevicePerformance_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDevicePerformance_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicePerformance_nodeParamType === 'str') {
                    console.log('getNetworkDevicePerformance_nodeParamType is "str"');
                    getNetworkDevicePerformance_parameters.networkId = getNetworkDevicePerformance_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicePerformance_nodeParamType is not "str"')
                    getNetworkDevicePerformance_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDevicePerformance_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDevicePerformance_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDevicePerformance_nodeParamType === 'str') {
                    console.log('getNetworkDevicePerformance_nodeParamType is "str"');
                    getNetworkDevicePerformance_parameters.serial = getNetworkDevicePerformance_nodeParam || undefined;
                } else {
                    console.log('getNetworkDevicePerformance_nodeParamType is not "str"')
                    getNetworkDevicePerformance_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getNetworkDevicePerformance(getNetworkDevicePerformance_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'rebootNetworkDevice') {
                var rebootNetworkDevice_parameters = [];
                var rebootNetworkDevice_nodeParam;
                var rebootNetworkDevice_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                rebootNetworkDevice_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                rebootNetworkDevice_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (rebootNetworkDevice_nodeParamType === 'str') {
                    console.log('rebootNetworkDevice_nodeParamType is "str"');
                    rebootNetworkDevice_parameters.networkId = rebootNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('rebootNetworkDevice_nodeParamType is not "str"')
                    rebootNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                rebootNetworkDevice_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                rebootNetworkDevice_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (rebootNetworkDevice_nodeParamType === 'str') {
                    console.log('rebootNetworkDevice_nodeParamType is "str"');
                    rebootNetworkDevice_parameters.serial = rebootNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('rebootNetworkDevice_nodeParamType is not "str"')
                    rebootNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.rebootNetworkDevice(rebootNetworkDevice_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'removeNetworkDevice') {
                var removeNetworkDevice_parameters = [];
                var removeNetworkDevice_nodeParam;
                var removeNetworkDevice_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                removeNetworkDevice_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                removeNetworkDevice_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (removeNetworkDevice_nodeParamType === 'str') {
                    console.log('removeNetworkDevice_nodeParamType is "str"');
                    removeNetworkDevice_parameters.networkId = removeNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('removeNetworkDevice_nodeParamType is not "str"')
                    removeNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                removeNetworkDevice_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                removeNetworkDevice_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (removeNetworkDevice_nodeParamType === 'str') {
                    console.log('removeNetworkDevice_nodeParamType is "str"');
                    removeNetworkDevice_parameters.serial = removeNetworkDevice_nodeParam || undefined;
                } else {
                    console.log('removeNetworkDevice_nodeParamType is not "str"')
                    removeNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.removeNetworkDevice(removeNetworkDevice_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceUplink') {
                var getNetworkDeviceUplink_parameters = [];
                var getNetworkDeviceUplink_nodeParam;
                var getNetworkDeviceUplink_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceUplink_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceUplink_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceUplink_nodeParamType === 'str') {
                    console.log('getNetworkDeviceUplink_nodeParamType is "str"');
                    getNetworkDeviceUplink_parameters.networkId = getNetworkDeviceUplink_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceUplink_nodeParamType is not "str"')
                    getNetworkDeviceUplink_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceUplink_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceUplink_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceUplink_nodeParamType === 'str') {
                    console.log('getNetworkDeviceUplink_nodeParamType is "str"');
                    getNetworkDeviceUplink_parameters.serial = getNetworkDeviceUplink_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceUplink_nodeParamType is not "str"')
                    getNetworkDeviceUplink_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getNetworkDeviceUplink(getNetworkDeviceUplink_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceWirelessRadioSettings') {
                var getNetworkDeviceWirelessRadioSettings_parameters = [];
                var getNetworkDeviceWirelessRadioSettings_nodeParam;
                var getNetworkDeviceWirelessRadioSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceWirelessRadioSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceWirelessRadioSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceWirelessRadioSettings_nodeParamType === 'str') {
                    console.log('getNetworkDeviceWirelessRadioSettings_nodeParamType is "str"');
                    getNetworkDeviceWirelessRadioSettings_parameters.networkId = getNetworkDeviceWirelessRadioSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceWirelessRadioSettings_nodeParamType is not "str"')
                    getNetworkDeviceWirelessRadioSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceWirelessRadioSettings_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceWirelessRadioSettings_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceWirelessRadioSettings_nodeParamType === 'str') {
                    console.log('getNetworkDeviceWirelessRadioSettings_nodeParamType is "str"');
                    getNetworkDeviceWirelessRadioSettings_parameters.serial = getNetworkDeviceWirelessRadioSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceWirelessRadioSettings_nodeParamType is not "str"')
                    getNetworkDeviceWirelessRadioSettings_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getNetworkDeviceWirelessRadioSettings(getNetworkDeviceWirelessRadioSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkDeviceWirelessRadioSettings') {
                var updateNetworkDeviceWirelessRadioSettings_parameters = [];
                var updateNetworkDeviceWirelessRadioSettings_nodeParam;
                var updateNetworkDeviceWirelessRadioSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkDeviceWirelessRadioSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkDeviceWirelessRadioSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkDeviceWirelessRadioSettings_nodeParamType === 'str') {
                    console.log('updateNetworkDeviceWirelessRadioSettings_nodeParamType is "str"');
                    updateNetworkDeviceWirelessRadioSettings_parameters.networkId = updateNetworkDeviceWirelessRadioSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkDeviceWirelessRadioSettings_nodeParamType is not "str"')
                    updateNetworkDeviceWirelessRadioSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkDeviceWirelessRadioSettings_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                updateNetworkDeviceWirelessRadioSettings_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkDeviceWirelessRadioSettings_nodeParamType === 'str') {
                    console.log('updateNetworkDeviceWirelessRadioSettings_nodeParamType is "str"');
                    updateNetworkDeviceWirelessRadioSettings_parameters.serial = updateNetworkDeviceWirelessRadioSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkDeviceWirelessRadioSettings_nodeParamType is not "str"')
                    updateNetworkDeviceWirelessRadioSettings_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                updateNetworkDeviceWirelessRadioSettings_nodeParam = storedParamValsMap['updateNetworkDeviceWirelessRadioSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkDeviceWirelessRadioSettings");

                updateNetworkDeviceWirelessRadioSettings_nodeParamType = storedParamTypeMap['updateNetworkDeviceWirelessRadioSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkDeviceWirelessRadioSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkDeviceWirelessRadioSettings_parameters.updateNetworkDeviceWirelessRadioSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkDeviceWirelessRadioSettings(updateNetworkDeviceWirelessRadioSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceWirelessStatus') {
                var getNetworkDeviceWirelessStatus_parameters = [];
                var getNetworkDeviceWirelessStatus_nodeParam;
                var getNetworkDeviceWirelessStatus_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkDeviceWirelessStatus_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkDeviceWirelessStatus_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceWirelessStatus_nodeParamType === 'str') {
                    console.log('getNetworkDeviceWirelessStatus_nodeParamType is "str"');
                    getNetworkDeviceWirelessStatus_parameters.networkId = getNetworkDeviceWirelessStatus_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceWirelessStatus_nodeParamType is not "str"')
                    getNetworkDeviceWirelessStatus_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkDeviceWirelessStatus_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkDeviceWirelessStatus_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkDeviceWirelessStatus_nodeParamType === 'str') {
                    console.log('getNetworkDeviceWirelessStatus_nodeParamType is "str"');
                    getNetworkDeviceWirelessStatus_parameters.serial = getNetworkDeviceWirelessStatus_nodeParam || undefined;
                } else {
                    console.log('getNetworkDeviceWirelessStatus_nodeParamType is not "str"')
                    getNetworkDeviceWirelessStatus_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                result = client.getNetworkDeviceWirelessStatus(getNetworkDeviceWirelessStatus_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkFailedConnections') {
                var getNetworkFailedConnections_parameters = [];
                var getNetworkFailedConnections_nodeParam;
                var getNetworkFailedConnections_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.networkId = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.t0 = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.t1 = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.timespan = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.ssid = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.vlan = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.apTag = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.serial = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkFailedConnections_nodeParam = storedParamValsMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                getNetworkFailedConnections_nodeParamType = storedParamTypeMap['clientId'] ||
                    RED.util.getMessageProperty(msg, "clientId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    console.log('getNetworkFailedConnections_nodeParamType is "str"');
                    getNetworkFailedConnections_parameters.clientId = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    console.log('getNetworkFailedConnections_nodeParamType is not "str"')
                    getNetworkFailedConnections_parameters.clientId = RED.util.getMessageProperty(msg, "clientId");
                }
                                result = client.getNetworkFailedConnections(getNetworkFailedConnections_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkFirewalledServices') {
                var getNetworkFirewalledServices_parameters = [];
                var getNetworkFirewalledServices_nodeParam;
                var getNetworkFirewalledServices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkFirewalledServices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkFirewalledServices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFirewalledServices_nodeParamType === 'str') {
                    console.log('getNetworkFirewalledServices_nodeParamType is "str"');
                    getNetworkFirewalledServices_parameters.networkId = getNetworkFirewalledServices_nodeParam || undefined;
                } else {
                    console.log('getNetworkFirewalledServices_nodeParamType is not "str"')
                    getNetworkFirewalledServices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkFirewalledServices(getNetworkFirewalledServices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkFirewalledService') {
                var getNetworkFirewalledService_parameters = [];
                var getNetworkFirewalledService_nodeParam;
                var getNetworkFirewalledService_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkFirewalledService_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkFirewalledService_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFirewalledService_nodeParamType === 'str') {
                    console.log('getNetworkFirewalledService_nodeParamType is "str"');
                    getNetworkFirewalledService_parameters.networkId = getNetworkFirewalledService_nodeParam || undefined;
                } else {
                    console.log('getNetworkFirewalledService_nodeParamType is not "str"')
                    getNetworkFirewalledService_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkFirewalledService_nodeParam = storedParamValsMap['service'] ||
                    RED.util.getMessageProperty(msg, "service");

                getNetworkFirewalledService_nodeParamType = storedParamTypeMap['service'] ||
                    RED.util.getMessageProperty(msg, "service");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkFirewalledService_nodeParamType === 'str') {
                    console.log('getNetworkFirewalledService_nodeParamType is "str"');
                    getNetworkFirewalledService_parameters.service = getNetworkFirewalledService_nodeParam || undefined;
                } else {
                    console.log('getNetworkFirewalledService_nodeParamType is not "str"')
                    getNetworkFirewalledService_parameters.service = RED.util.getMessageProperty(msg, "service");
                }
                                result = client.getNetworkFirewalledService(getNetworkFirewalledService_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkFirewalledService') {
                var updateNetworkFirewalledService_parameters = [];
                var updateNetworkFirewalledService_nodeParam;
                var updateNetworkFirewalledService_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkFirewalledService_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkFirewalledService_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkFirewalledService_nodeParamType === 'str') {
                    console.log('updateNetworkFirewalledService_nodeParamType is "str"');
                    updateNetworkFirewalledService_parameters.networkId = updateNetworkFirewalledService_nodeParam || undefined;
                } else {
                    console.log('updateNetworkFirewalledService_nodeParamType is not "str"')
                    updateNetworkFirewalledService_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkFirewalledService_nodeParam = storedParamValsMap['service'] ||
                    RED.util.getMessageProperty(msg, "service");

                updateNetworkFirewalledService_nodeParamType = storedParamTypeMap['service'] ||
                    RED.util.getMessageProperty(msg, "service");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkFirewalledService_nodeParamType === 'str') {
                    console.log('updateNetworkFirewalledService_nodeParamType is "str"');
                    updateNetworkFirewalledService_parameters.service = updateNetworkFirewalledService_nodeParam || undefined;
                } else {
                    console.log('updateNetworkFirewalledService_nodeParamType is not "str"')
                    updateNetworkFirewalledService_parameters.service = RED.util.getMessageProperty(msg, "service");
                }
                                
                updateNetworkFirewalledService_nodeParam = storedParamValsMap['updateNetworkFirewalledService'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkFirewalledService");

                updateNetworkFirewalledService_nodeParamType = storedParamTypeMap['updateNetworkFirewalledService'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkFirewalledService");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkFirewalledService_parameters.updateNetworkFirewalledService = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkFirewalledService(updateNetworkFirewalledService_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkGroupPolicies') {
                var getNetworkGroupPolicies_parameters = [];
                var getNetworkGroupPolicies_nodeParam;
                var getNetworkGroupPolicies_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkGroupPolicies_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkGroupPolicies_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkGroupPolicies_nodeParamType === 'str') {
                    console.log('getNetworkGroupPolicies_nodeParamType is "str"');
                    getNetworkGroupPolicies_parameters.networkId = getNetworkGroupPolicies_nodeParam || undefined;
                } else {
                    console.log('getNetworkGroupPolicies_nodeParamType is not "str"')
                    getNetworkGroupPolicies_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkGroupPolicies(getNetworkGroupPolicies_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkGroupPolicy') {
                var createNetworkGroupPolicy_parameters = [];
                var createNetworkGroupPolicy_nodeParam;
                var createNetworkGroupPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkGroupPolicy_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkGroupPolicy_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('createNetworkGroupPolicy_nodeParamType is "str"');
                    createNetworkGroupPolicy_parameters.networkId = createNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('createNetworkGroupPolicy_nodeParamType is not "str"')
                    createNetworkGroupPolicy_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkGroupPolicy_nodeParam = storedParamValsMap['createNetworkGroupPolicy'] ||
                    RED.util.getMessageProperty(msg, "createNetworkGroupPolicy");

                createNetworkGroupPolicy_nodeParamType = storedParamTypeMap['createNetworkGroupPolicy'] ||
                    RED.util.getMessageProperty(msg, "createNetworkGroupPolicy");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkGroupPolicy_parameters.createNetworkGroupPolicy = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkGroupPolicy(createNetworkGroupPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkGroupPolicy') {
                var getNetworkGroupPolicy_parameters = [];
                var getNetworkGroupPolicy_nodeParam;
                var getNetworkGroupPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkGroupPolicy_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkGroupPolicy_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('getNetworkGroupPolicy_nodeParamType is "str"');
                    getNetworkGroupPolicy_parameters.networkId = getNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('getNetworkGroupPolicy_nodeParamType is not "str"')
                    getNetworkGroupPolicy_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkGroupPolicy_nodeParam = storedParamValsMap['groupPolicyId'] ||
                    RED.util.getMessageProperty(msg, "groupPolicyId");

                getNetworkGroupPolicy_nodeParamType = storedParamTypeMap['groupPolicyId'] ||
                    RED.util.getMessageProperty(msg, "groupPolicyId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('getNetworkGroupPolicy_nodeParamType is "str"');
                    getNetworkGroupPolicy_parameters.groupPolicyId = getNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('getNetworkGroupPolicy_nodeParamType is not "str"')
                    getNetworkGroupPolicy_parameters.groupPolicyId = RED.util.getMessageProperty(msg, "groupPolicyId");
                }
                                result = client.getNetworkGroupPolicy(getNetworkGroupPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkGroupPolicy') {
                var updateNetworkGroupPolicy_parameters = [];
                var updateNetworkGroupPolicy_nodeParam;
                var updateNetworkGroupPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkGroupPolicy_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkGroupPolicy_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('updateNetworkGroupPolicy_nodeParamType is "str"');
                    updateNetworkGroupPolicy_parameters.networkId = updateNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('updateNetworkGroupPolicy_nodeParamType is not "str"')
                    updateNetworkGroupPolicy_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkGroupPolicy_nodeParam = storedParamValsMap['groupPolicyId'] ||
                    RED.util.getMessageProperty(msg, "groupPolicyId");

                updateNetworkGroupPolicy_nodeParamType = storedParamTypeMap['groupPolicyId'] ||
                    RED.util.getMessageProperty(msg, "groupPolicyId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('updateNetworkGroupPolicy_nodeParamType is "str"');
                    updateNetworkGroupPolicy_parameters.groupPolicyId = updateNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('updateNetworkGroupPolicy_nodeParamType is not "str"')
                    updateNetworkGroupPolicy_parameters.groupPolicyId = RED.util.getMessageProperty(msg, "groupPolicyId");
                }
                                
                updateNetworkGroupPolicy_nodeParam = storedParamValsMap['updateNetworkGroupPolicy'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkGroupPolicy");

                updateNetworkGroupPolicy_nodeParamType = storedParamTypeMap['updateNetworkGroupPolicy'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkGroupPolicy");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkGroupPolicy_parameters.updateNetworkGroupPolicy = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkGroupPolicy(updateNetworkGroupPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkGroupPolicy') {
                var deleteNetworkGroupPolicy_parameters = [];
                var deleteNetworkGroupPolicy_nodeParam;
                var deleteNetworkGroupPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkGroupPolicy_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkGroupPolicy_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('deleteNetworkGroupPolicy_nodeParamType is "str"');
                    deleteNetworkGroupPolicy_parameters.networkId = deleteNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkGroupPolicy_nodeParamType is not "str"')
                    deleteNetworkGroupPolicy_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkGroupPolicy_nodeParam = storedParamValsMap['groupPolicyId'] ||
                    RED.util.getMessageProperty(msg, "groupPolicyId");

                deleteNetworkGroupPolicy_nodeParamType = storedParamTypeMap['groupPolicyId'] ||
                    RED.util.getMessageProperty(msg, "groupPolicyId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkGroupPolicy_nodeParamType === 'str') {
                    console.log('deleteNetworkGroupPolicy_nodeParamType is "str"');
                    deleteNetworkGroupPolicy_parameters.groupPolicyId = deleteNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkGroupPolicy_nodeParamType is not "str"')
                    deleteNetworkGroupPolicy_parameters.groupPolicyId = RED.util.getMessageProperty(msg, "groupPolicyId");
                }
                                result = client.deleteNetworkGroupPolicy(deleteNetworkGroupPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkHttpServers') {
                var getNetworkHttpServers_parameters = [];
                var getNetworkHttpServers_nodeParam;
                var getNetworkHttpServers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkHttpServers_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkHttpServers_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkHttpServers_nodeParamType === 'str') {
                    console.log('getNetworkHttpServers_nodeParamType is "str"');
                    getNetworkHttpServers_parameters.networkId = getNetworkHttpServers_nodeParam || undefined;
                } else {
                    console.log('getNetworkHttpServers_nodeParamType is not "str"')
                    getNetworkHttpServers_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkHttpServers(getNetworkHttpServers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkHttpServer') {
                var createNetworkHttpServer_parameters = [];
                var createNetworkHttpServer_nodeParam;
                var createNetworkHttpServer_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkHttpServer_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkHttpServer_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkHttpServer_nodeParamType === 'str') {
                    console.log('createNetworkHttpServer_nodeParamType is "str"');
                    createNetworkHttpServer_parameters.networkId = createNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('createNetworkHttpServer_nodeParamType is not "str"')
                    createNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkHttpServer_nodeParam = storedParamValsMap['createNetworkHttpServer'] ||
                    RED.util.getMessageProperty(msg, "createNetworkHttpServer");

                createNetworkHttpServer_nodeParamType = storedParamTypeMap['createNetworkHttpServer'] ||
                    RED.util.getMessageProperty(msg, "createNetworkHttpServer");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkHttpServer_parameters.createNetworkHttpServer = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkHttpServer(createNetworkHttpServer_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkHttpServersWebhookTest') {
                var createNetworkHttpServersWebhookTest_parameters = [];
                var createNetworkHttpServersWebhookTest_nodeParam;
                var createNetworkHttpServersWebhookTest_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkHttpServersWebhookTest_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkHttpServersWebhookTest_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkHttpServersWebhookTest_nodeParamType === 'str') {
                    console.log('createNetworkHttpServersWebhookTest_nodeParamType is "str"');
                    createNetworkHttpServersWebhookTest_parameters.networkId = createNetworkHttpServersWebhookTest_nodeParam || undefined;
                } else {
                    console.log('createNetworkHttpServersWebhookTest_nodeParamType is not "str"')
                    createNetworkHttpServersWebhookTest_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkHttpServersWebhookTest_nodeParam = storedParamValsMap['createNetworkHttpServersWebhookTest'] ||
                    RED.util.getMessageProperty(msg, "createNetworkHttpServersWebhookTest");

                createNetworkHttpServersWebhookTest_nodeParamType = storedParamTypeMap['createNetworkHttpServersWebhookTest'] ||
                    RED.util.getMessageProperty(msg, "createNetworkHttpServersWebhookTest");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkHttpServersWebhookTest_parameters.createNetworkHttpServersWebhookTest = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkHttpServersWebhookTest(createNetworkHttpServersWebhookTest_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkHttpServersWebhookTest') {
                var getNetworkHttpServersWebhookTest_parameters = [];
                var getNetworkHttpServersWebhookTest_nodeParam;
                var getNetworkHttpServersWebhookTest_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkHttpServersWebhookTest_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkHttpServersWebhookTest_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkHttpServersWebhookTest_nodeParamType === 'str') {
                    console.log('getNetworkHttpServersWebhookTest_nodeParamType is "str"');
                    getNetworkHttpServersWebhookTest_parameters.networkId = getNetworkHttpServersWebhookTest_nodeParam || undefined;
                } else {
                    console.log('getNetworkHttpServersWebhookTest_nodeParamType is not "str"')
                    getNetworkHttpServersWebhookTest_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkHttpServersWebhookTest_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getNetworkHttpServersWebhookTest_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkHttpServersWebhookTest_nodeParamType === 'str') {
                    console.log('getNetworkHttpServersWebhookTest_nodeParamType is "str"');
                    getNetworkHttpServersWebhookTest_parameters.id = getNetworkHttpServersWebhookTest_nodeParam || undefined;
                } else {
                    console.log('getNetworkHttpServersWebhookTest_nodeParamType is not "str"')
                    getNetworkHttpServersWebhookTest_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                result = client.getNetworkHttpServersWebhookTest(getNetworkHttpServersWebhookTest_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkHttpServer') {
                var getNetworkHttpServer_parameters = [];
                var getNetworkHttpServer_nodeParam;
                var getNetworkHttpServer_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkHttpServer_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkHttpServer_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkHttpServer_nodeParamType === 'str') {
                    console.log('getNetworkHttpServer_nodeParamType is "str"');
                    getNetworkHttpServer_parameters.networkId = getNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('getNetworkHttpServer_nodeParamType is not "str"')
                    getNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkHttpServer_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getNetworkHttpServer_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkHttpServer_nodeParamType === 'str') {
                    console.log('getNetworkHttpServer_nodeParamType is "str"');
                    getNetworkHttpServer_parameters.id = getNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('getNetworkHttpServer_nodeParamType is not "str"')
                    getNetworkHttpServer_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                result = client.getNetworkHttpServer(getNetworkHttpServer_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkHttpServer') {
                var updateNetworkHttpServer_parameters = [];
                var updateNetworkHttpServer_nodeParam;
                var updateNetworkHttpServer_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkHttpServer_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkHttpServer_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkHttpServer_nodeParamType === 'str') {
                    console.log('updateNetworkHttpServer_nodeParamType is "str"');
                    updateNetworkHttpServer_parameters.networkId = updateNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('updateNetworkHttpServer_nodeParamType is not "str"')
                    updateNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkHttpServer_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                updateNetworkHttpServer_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkHttpServer_nodeParamType === 'str') {
                    console.log('updateNetworkHttpServer_nodeParamType is "str"');
                    updateNetworkHttpServer_parameters.id = updateNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('updateNetworkHttpServer_nodeParamType is not "str"')
                    updateNetworkHttpServer_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                updateNetworkHttpServer_nodeParam = storedParamValsMap['updateNetworkHttpServer'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkHttpServer");

                updateNetworkHttpServer_nodeParamType = storedParamTypeMap['updateNetworkHttpServer'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkHttpServer");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkHttpServer_parameters.updateNetworkHttpServer = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkHttpServer(updateNetworkHttpServer_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkHttpServer') {
                var deleteNetworkHttpServer_parameters = [];
                var deleteNetworkHttpServer_nodeParam;
                var deleteNetworkHttpServer_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkHttpServer_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkHttpServer_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkHttpServer_nodeParamType === 'str') {
                    console.log('deleteNetworkHttpServer_nodeParamType is "str"');
                    deleteNetworkHttpServer_parameters.networkId = deleteNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkHttpServer_nodeParamType is not "str"')
                    deleteNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkHttpServer_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                deleteNetworkHttpServer_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkHttpServer_nodeParamType === 'str') {
                    console.log('deleteNetworkHttpServer_nodeParamType is "str"');
                    deleteNetworkHttpServer_parameters.id = deleteNetworkHttpServer_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkHttpServer_nodeParamType is not "str"')
                    deleteNetworkHttpServer_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                result = client.deleteNetworkHttpServer(deleteNetworkHttpServer_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkL3FirewallRules') {
                var getNetworkL3FirewallRules_parameters = [];
                var getNetworkL3FirewallRules_nodeParam;
                var getNetworkL3FirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkL3FirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkL3FirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkL3FirewallRules_nodeParamType === 'str') {
                    console.log('getNetworkL3FirewallRules_nodeParamType is "str"');
                    getNetworkL3FirewallRules_parameters.networkId = getNetworkL3FirewallRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkL3FirewallRules_nodeParamType is not "str"')
                    getNetworkL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkL3FirewallRules(getNetworkL3FirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkL3FirewallRules') {
                var updateNetworkL3FirewallRules_parameters = [];
                var updateNetworkL3FirewallRules_nodeParam;
                var updateNetworkL3FirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkL3FirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkL3FirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkL3FirewallRules_nodeParamType === 'str') {
                    console.log('updateNetworkL3FirewallRules_nodeParamType is "str"');
                    updateNetworkL3FirewallRules_parameters.networkId = updateNetworkL3FirewallRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkL3FirewallRules_nodeParamType is not "str"')
                    updateNetworkL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkL3FirewallRules_nodeParam = storedParamValsMap['updateNetworkL3FirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkL3FirewallRules");

                updateNetworkL3FirewallRules_nodeParamType = storedParamTypeMap['updateNetworkL3FirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkL3FirewallRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkL3FirewallRules(updateNetworkL3FirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkL7FirewallRules') {
                var getNetworkL7FirewallRules_parameters = [];
                var getNetworkL7FirewallRules_nodeParam;
                var getNetworkL7FirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkL7FirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkL7FirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkL7FirewallRules_nodeParamType === 'str') {
                    console.log('getNetworkL7FirewallRules_nodeParamType is "str"');
                    getNetworkL7FirewallRules_parameters.networkId = getNetworkL7FirewallRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkL7FirewallRules_nodeParamType is not "str"')
                    getNetworkL7FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkL7FirewallRules(getNetworkL7FirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkL7FirewallRules') {
                var updateNetworkL7FirewallRules_parameters = [];
                var updateNetworkL7FirewallRules_nodeParam;
                var updateNetworkL7FirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkL7FirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkL7FirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkL7FirewallRules_nodeParamType === 'str') {
                    console.log('updateNetworkL7FirewallRules_nodeParamType is "str"');
                    updateNetworkL7FirewallRules_parameters.networkId = updateNetworkL7FirewallRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkL7FirewallRules_nodeParamType is not "str"')
                    updateNetworkL7FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkL7FirewallRules_nodeParam = storedParamValsMap['updateNetworkL7FirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkL7FirewallRules");

                updateNetworkL7FirewallRules_nodeParamType = storedParamTypeMap['updateNetworkL7FirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkL7FirewallRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkL7FirewallRules_parameters.updateNetworkL7FirewallRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkL7FirewallRules(updateNetworkL7FirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkL7FirewallRulesApplicationCategories') {
                var getNetworkL7FirewallRulesApplicationCategories_parameters = [];
                var getNetworkL7FirewallRulesApplicationCategories_nodeParam;
                var getNetworkL7FirewallRulesApplicationCategories_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkL7FirewallRulesApplicationCategories_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkL7FirewallRulesApplicationCategories_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkL7FirewallRulesApplicationCategories_nodeParamType === 'str') {
                    console.log('getNetworkL7FirewallRulesApplicationCategories_nodeParamType is "str"');
                    getNetworkL7FirewallRulesApplicationCategories_parameters.networkId = getNetworkL7FirewallRulesApplicationCategories_nodeParam || undefined;
                } else {
                    console.log('getNetworkL7FirewallRulesApplicationCategories_nodeParamType is not "str"')
                    getNetworkL7FirewallRulesApplicationCategories_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkL7FirewallRulesApplicationCategories(getNetworkL7FirewallRulesApplicationCategories_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkLatencyStats') {
                var getNetworkLatencyStats_parameters = [];
                var getNetworkLatencyStats_nodeParam;
                var getNetworkLatencyStats_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.networkId = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.t0 = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.t1 = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.timespan = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['ssid'] ||
                    RED.util.getMessageProperty(msg, "ssid");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.ssid = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, "ssid");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['vlan'] ||
                    RED.util.getMessageProperty(msg, "vlan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.vlan = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, "vlan");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['apTag'] ||
                    RED.util.getMessageProperty(msg, "apTag");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.apTag = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, "apTag");
                }
                                
                getNetworkLatencyStats_nodeParam = storedParamValsMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                getNetworkLatencyStats_nodeParamType = storedParamTypeMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    console.log('getNetworkLatencyStats_nodeParamType is "str"');
                    getNetworkLatencyStats_parameters.fields = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    console.log('getNetworkLatencyStats_nodeParamType is not "str"')
                    getNetworkLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, "fields");
                }
                                result = client.getNetworkLatencyStats(getNetworkLatencyStats_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkMerakiAuthUsers') {
                var getNetworkMerakiAuthUsers_parameters = [];
                var getNetworkMerakiAuthUsers_nodeParam;
                var getNetworkMerakiAuthUsers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkMerakiAuthUsers_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkMerakiAuthUsers_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkMerakiAuthUsers_nodeParamType === 'str') {
                    console.log('getNetworkMerakiAuthUsers_nodeParamType is "str"');
                    getNetworkMerakiAuthUsers_parameters.networkId = getNetworkMerakiAuthUsers_nodeParam || undefined;
                } else {
                    console.log('getNetworkMerakiAuthUsers_nodeParamType is not "str"')
                    getNetworkMerakiAuthUsers_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkMerakiAuthUsers(getNetworkMerakiAuthUsers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkMerakiAuthUser') {
                var getNetworkMerakiAuthUser_parameters = [];
                var getNetworkMerakiAuthUser_nodeParam;
                var getNetworkMerakiAuthUser_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkMerakiAuthUser_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkMerakiAuthUser_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkMerakiAuthUser_nodeParamType === 'str') {
                    console.log('getNetworkMerakiAuthUser_nodeParamType is "str"');
                    getNetworkMerakiAuthUser_parameters.networkId = getNetworkMerakiAuthUser_nodeParam || undefined;
                } else {
                    console.log('getNetworkMerakiAuthUser_nodeParamType is not "str"')
                    getNetworkMerakiAuthUser_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkMerakiAuthUser_nodeParam = storedParamValsMap['merakiAuthUserId'] ||
                    RED.util.getMessageProperty(msg, "merakiAuthUserId");

                getNetworkMerakiAuthUser_nodeParamType = storedParamTypeMap['merakiAuthUserId'] ||
                    RED.util.getMessageProperty(msg, "merakiAuthUserId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkMerakiAuthUser_nodeParamType === 'str') {
                    console.log('getNetworkMerakiAuthUser_nodeParamType is "str"');
                    getNetworkMerakiAuthUser_parameters.merakiAuthUserId = getNetworkMerakiAuthUser_nodeParam || undefined;
                } else {
                    console.log('getNetworkMerakiAuthUser_nodeParamType is not "str"')
                    getNetworkMerakiAuthUser_parameters.merakiAuthUserId = RED.util.getMessageProperty(msg, "merakiAuthUserId");
                }
                                result = client.getNetworkMerakiAuthUser(getNetworkMerakiAuthUser_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkNetflowSettings') {
                var getNetworkNetflowSettings_parameters = [];
                var getNetworkNetflowSettings_nodeParam;
                var getNetworkNetflowSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkNetflowSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkNetflowSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkNetflowSettings_nodeParamType === 'str') {
                    console.log('getNetworkNetflowSettings_nodeParamType is "str"');
                    getNetworkNetflowSettings_parameters.networkId = getNetworkNetflowSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkNetflowSettings_nodeParamType is not "str"')
                    getNetworkNetflowSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkNetflowSettings(getNetworkNetflowSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkNetflowSettings') {
                var updateNetworkNetflowSettings_parameters = [];
                var updateNetworkNetflowSettings_nodeParam;
                var updateNetworkNetflowSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkNetflowSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkNetflowSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkNetflowSettings_nodeParamType === 'str') {
                    console.log('updateNetworkNetflowSettings_nodeParamType is "str"');
                    updateNetworkNetflowSettings_parameters.networkId = updateNetworkNetflowSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkNetflowSettings_nodeParamType is not "str"')
                    updateNetworkNetflowSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkNetflowSettings_nodeParam = storedParamValsMap['updateNetworkNetflowSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkNetflowSettings");

                updateNetworkNetflowSettings_nodeParamType = storedParamTypeMap['updateNetworkNetflowSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkNetflowSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkNetflowSettings_parameters.updateNetworkNetflowSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkNetflowSettings(updateNetworkNetflowSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkOneToManyNatRules') {
                var getNetworkOneToManyNatRules_parameters = [];
                var getNetworkOneToManyNatRules_nodeParam;
                var getNetworkOneToManyNatRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkOneToManyNatRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkOneToManyNatRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkOneToManyNatRules_nodeParamType === 'str') {
                    console.log('getNetworkOneToManyNatRules_nodeParamType is "str"');
                    getNetworkOneToManyNatRules_parameters.networkId = getNetworkOneToManyNatRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkOneToManyNatRules_nodeParamType is not "str"')
                    getNetworkOneToManyNatRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkOneToManyNatRules(getNetworkOneToManyNatRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkOneToManyNatRules') {
                var updateNetworkOneToManyNatRules_parameters = [];
                var updateNetworkOneToManyNatRules_nodeParam;
                var updateNetworkOneToManyNatRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkOneToManyNatRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkOneToManyNatRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkOneToManyNatRules_nodeParamType === 'str') {
                    console.log('updateNetworkOneToManyNatRules_nodeParamType is "str"');
                    updateNetworkOneToManyNatRules_parameters.networkId = updateNetworkOneToManyNatRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkOneToManyNatRules_nodeParamType is not "str"')
                    updateNetworkOneToManyNatRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkOneToManyNatRules_nodeParam = storedParamValsMap['updateNetworkOneToManyNatRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkOneToManyNatRules");

                updateNetworkOneToManyNatRules_nodeParamType = storedParamTypeMap['updateNetworkOneToManyNatRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkOneToManyNatRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkOneToManyNatRules(updateNetworkOneToManyNatRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkOneToOneNatRules') {
                var getNetworkOneToOneNatRules_parameters = [];
                var getNetworkOneToOneNatRules_nodeParam;
                var getNetworkOneToOneNatRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkOneToOneNatRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkOneToOneNatRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkOneToOneNatRules_nodeParamType === 'str') {
                    console.log('getNetworkOneToOneNatRules_nodeParamType is "str"');
                    getNetworkOneToOneNatRules_parameters.networkId = getNetworkOneToOneNatRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkOneToOneNatRules_nodeParamType is not "str"')
                    getNetworkOneToOneNatRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkOneToOneNatRules(getNetworkOneToOneNatRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkOneToOneNatRules') {
                var updateNetworkOneToOneNatRules_parameters = [];
                var updateNetworkOneToOneNatRules_nodeParam;
                var updateNetworkOneToOneNatRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkOneToOneNatRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkOneToOneNatRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkOneToOneNatRules_nodeParamType === 'str') {
                    console.log('updateNetworkOneToOneNatRules_nodeParamType is "str"');
                    updateNetworkOneToOneNatRules_parameters.networkId = updateNetworkOneToOneNatRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkOneToOneNatRules_nodeParamType is not "str"')
                    updateNetworkOneToOneNatRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkOneToOneNatRules_nodeParam = storedParamValsMap['updateNetworkOneToOneNatRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkOneToOneNatRules");

                updateNetworkOneToOneNatRules_nodeParamType = storedParamTypeMap['updateNetworkOneToOneNatRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkOneToOneNatRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkOneToOneNatRules(updateNetworkOneToOneNatRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkPiiPiiKeys') {
                var getNetworkPiiPiiKeys_parameters = [];
                var getNetworkPiiPiiKeys_nodeParam;
                var getNetworkPiiPiiKeys_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.networkId = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['username'] ||
                    RED.util.getMessageProperty(msg, "username");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['username'] ||
                    RED.util.getMessageProperty(msg, "username");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.username = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.username = RED.util.getMessageProperty(msg, "username");
                }
                                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['email'] ||
                    RED.util.getMessageProperty(msg, "email");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['email'] ||
                    RED.util.getMessageProperty(msg, "email");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.email = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.email = RED.util.getMessageProperty(msg, "email");
                }
                                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['mac'] ||
                    RED.util.getMessageProperty(msg, "mac");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['mac'] ||
                    RED.util.getMessageProperty(msg, "mac");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.mac = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.mac = RED.util.getMessageProperty(msg, "mac");
                }
                                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.serial = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['imei'] ||
                    RED.util.getMessageProperty(msg, "imei");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['imei'] ||
                    RED.util.getMessageProperty(msg, "imei");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.imei = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.imei = RED.util.getMessageProperty(msg, "imei");
                }
                                
                getNetworkPiiPiiKeys_nodeParam = storedParamValsMap['bluetoothMac'] ||
                    RED.util.getMessageProperty(msg, "bluetoothMac");

                getNetworkPiiPiiKeys_nodeParamType = storedParamTypeMap['bluetoothMac'] ||
                    RED.util.getMessageProperty(msg, "bluetoothMac");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is "str"');
                    getNetworkPiiPiiKeys_parameters.bluetoothMac = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiPiiKeys_nodeParamType is not "str"')
                    getNetworkPiiPiiKeys_parameters.bluetoothMac = RED.util.getMessageProperty(msg, "bluetoothMac");
                }
                                result = client.getNetworkPiiPiiKeys(getNetworkPiiPiiKeys_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkPiiRequests') {
                var getNetworkPiiRequests_parameters = [];
                var getNetworkPiiRequests_nodeParam;
                var getNetworkPiiRequests_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkPiiRequests_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkPiiRequests_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiRequests_nodeParamType === 'str') {
                    console.log('getNetworkPiiRequests_nodeParamType is "str"');
                    getNetworkPiiRequests_parameters.networkId = getNetworkPiiRequests_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiRequests_nodeParamType is not "str"')
                    getNetworkPiiRequests_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkPiiRequests(getNetworkPiiRequests_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkPiiRequest') {
                var createNetworkPiiRequest_parameters = [];
                var createNetworkPiiRequest_nodeParam;
                var createNetworkPiiRequest_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkPiiRequest_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkPiiRequest_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkPiiRequest_nodeParamType === 'str') {
                    console.log('createNetworkPiiRequest_nodeParamType is "str"');
                    createNetworkPiiRequest_parameters.networkId = createNetworkPiiRequest_nodeParam || undefined;
                } else {
                    console.log('createNetworkPiiRequest_nodeParamType is not "str"')
                    createNetworkPiiRequest_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkPiiRequest_nodeParam = storedParamValsMap['createNetworkPiiRequest'] ||
                    RED.util.getMessageProperty(msg, "createNetworkPiiRequest");

                createNetworkPiiRequest_nodeParamType = storedParamTypeMap['createNetworkPiiRequest'] ||
                    RED.util.getMessageProperty(msg, "createNetworkPiiRequest");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkPiiRequest_parameters.createNetworkPiiRequest = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkPiiRequest(createNetworkPiiRequest_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkPiiRequest') {
                var getNetworkPiiRequest_parameters = [];
                var getNetworkPiiRequest_nodeParam;
                var getNetworkPiiRequest_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkPiiRequest_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkPiiRequest_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiRequest_nodeParamType === 'str') {
                    console.log('getNetworkPiiRequest_nodeParamType is "str"');
                    getNetworkPiiRequest_parameters.networkId = getNetworkPiiRequest_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiRequest_nodeParamType is not "str"')
                    getNetworkPiiRequest_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkPiiRequest_nodeParam = storedParamValsMap['requestId'] ||
                    RED.util.getMessageProperty(msg, "requestId");

                getNetworkPiiRequest_nodeParamType = storedParamTypeMap['requestId'] ||
                    RED.util.getMessageProperty(msg, "requestId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiRequest_nodeParamType === 'str') {
                    console.log('getNetworkPiiRequest_nodeParamType is "str"');
                    getNetworkPiiRequest_parameters.requestId = getNetworkPiiRequest_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiRequest_nodeParamType is not "str"')
                    getNetworkPiiRequest_parameters.requestId = RED.util.getMessageProperty(msg, "requestId");
                }
                                result = client.getNetworkPiiRequest(getNetworkPiiRequest_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkPiiRequest') {
                var deleteNetworkPiiRequest_parameters = [];
                var deleteNetworkPiiRequest_nodeParam;
                var deleteNetworkPiiRequest_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkPiiRequest_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkPiiRequest_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkPiiRequest_nodeParamType === 'str') {
                    console.log('deleteNetworkPiiRequest_nodeParamType is "str"');
                    deleteNetworkPiiRequest_parameters.networkId = deleteNetworkPiiRequest_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkPiiRequest_nodeParamType is not "str"')
                    deleteNetworkPiiRequest_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkPiiRequest_nodeParam = storedParamValsMap['requestId'] ||
                    RED.util.getMessageProperty(msg, "requestId");

                deleteNetworkPiiRequest_nodeParamType = storedParamTypeMap['requestId'] ||
                    RED.util.getMessageProperty(msg, "requestId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkPiiRequest_nodeParamType === 'str') {
                    console.log('deleteNetworkPiiRequest_nodeParamType is "str"');
                    deleteNetworkPiiRequest_parameters.requestId = deleteNetworkPiiRequest_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkPiiRequest_nodeParamType is not "str"')
                    deleteNetworkPiiRequest_parameters.requestId = RED.util.getMessageProperty(msg, "requestId");
                }
                                result = client.deleteNetworkPiiRequest(deleteNetworkPiiRequest_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkPiiSmDevicesForKey') {
                var getNetworkPiiSmDevicesForKey_parameters = [];
                var getNetworkPiiSmDevicesForKey_nodeParam;
                var getNetworkPiiSmDevicesForKey_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.networkId = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['username'] ||
                    RED.util.getMessageProperty(msg, "username");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['username'] ||
                    RED.util.getMessageProperty(msg, "username");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.username = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.username = RED.util.getMessageProperty(msg, "username");
                }
                                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['email'] ||
                    RED.util.getMessageProperty(msg, "email");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['email'] ||
                    RED.util.getMessageProperty(msg, "email");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.email = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.email = RED.util.getMessageProperty(msg, "email");
                }
                                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['mac'] ||
                    RED.util.getMessageProperty(msg, "mac");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['mac'] ||
                    RED.util.getMessageProperty(msg, "mac");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.mac = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.mac = RED.util.getMessageProperty(msg, "mac");
                }
                                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.serial = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['imei'] ||
                    RED.util.getMessageProperty(msg, "imei");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['imei'] ||
                    RED.util.getMessageProperty(msg, "imei");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.imei = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.imei = RED.util.getMessageProperty(msg, "imei");
                }
                                
                getNetworkPiiSmDevicesForKey_nodeParam = storedParamValsMap['bluetoothMac'] ||
                    RED.util.getMessageProperty(msg, "bluetoothMac");

                getNetworkPiiSmDevicesForKey_nodeParamType = storedParamTypeMap['bluetoothMac'] ||
                    RED.util.getMessageProperty(msg, "bluetoothMac");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is "str"');
                    getNetworkPiiSmDevicesForKey_parameters.bluetoothMac = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmDevicesForKey_nodeParamType is not "str"')
                    getNetworkPiiSmDevicesForKey_parameters.bluetoothMac = RED.util.getMessageProperty(msg, "bluetoothMac");
                }
                                result = client.getNetworkPiiSmDevicesForKey(getNetworkPiiSmDevicesForKey_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkPiiSmOwnersForKey') {
                var getNetworkPiiSmOwnersForKey_parameters = [];
                var getNetworkPiiSmOwnersForKey_nodeParam;
                var getNetworkPiiSmOwnersForKey_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.networkId = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['username'] ||
                    RED.util.getMessageProperty(msg, "username");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['username'] ||
                    RED.util.getMessageProperty(msg, "username");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.username = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.username = RED.util.getMessageProperty(msg, "username");
                }
                                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['email'] ||
                    RED.util.getMessageProperty(msg, "email");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['email'] ||
                    RED.util.getMessageProperty(msg, "email");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.email = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.email = RED.util.getMessageProperty(msg, "email");
                }
                                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['mac'] ||
                    RED.util.getMessageProperty(msg, "mac");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['mac'] ||
                    RED.util.getMessageProperty(msg, "mac");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.mac = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.mac = RED.util.getMessageProperty(msg, "mac");
                }
                                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['serial'] ||
                    RED.util.getMessageProperty(msg, "serial");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.serial = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.serial = RED.util.getMessageProperty(msg, "serial");
                }
                                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['imei'] ||
                    RED.util.getMessageProperty(msg, "imei");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['imei'] ||
                    RED.util.getMessageProperty(msg, "imei");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.imei = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.imei = RED.util.getMessageProperty(msg, "imei");
                }
                                
                getNetworkPiiSmOwnersForKey_nodeParam = storedParamValsMap['bluetoothMac'] ||
                    RED.util.getMessageProperty(msg, "bluetoothMac");

                getNetworkPiiSmOwnersForKey_nodeParamType = storedParamTypeMap['bluetoothMac'] ||
                    RED.util.getMessageProperty(msg, "bluetoothMac");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is "str"');
                    getNetworkPiiSmOwnersForKey_parameters.bluetoothMac = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    console.log('getNetworkPiiSmOwnersForKey_nodeParamType is not "str"')
                    getNetworkPiiSmOwnersForKey_parameters.bluetoothMac = RED.util.getMessageProperty(msg, "bluetoothMac");
                }
                                result = client.getNetworkPiiSmOwnersForKey(getNetworkPiiSmOwnersForKey_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkPortForwardingRules') {
                var getNetworkPortForwardingRules_parameters = [];
                var getNetworkPortForwardingRules_nodeParam;
                var getNetworkPortForwardingRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkPortForwardingRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkPortForwardingRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkPortForwardingRules_nodeParamType === 'str') {
                    console.log('getNetworkPortForwardingRules_nodeParamType is "str"');
                    getNetworkPortForwardingRules_parameters.networkId = getNetworkPortForwardingRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkPortForwardingRules_nodeParamType is not "str"')
                    getNetworkPortForwardingRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkPortForwardingRules(getNetworkPortForwardingRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkPortForwardingRules') {
                var updateNetworkPortForwardingRules_parameters = [];
                var updateNetworkPortForwardingRules_nodeParam;
                var updateNetworkPortForwardingRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkPortForwardingRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkPortForwardingRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkPortForwardingRules_nodeParamType === 'str') {
                    console.log('updateNetworkPortForwardingRules_nodeParamType is "str"');
                    updateNetworkPortForwardingRules_parameters.networkId = updateNetworkPortForwardingRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkPortForwardingRules_nodeParamType is not "str"')
                    updateNetworkPortForwardingRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkPortForwardingRules_nodeParam = storedParamValsMap['updateNetworkPortForwardingRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkPortForwardingRules");

                updateNetworkPortForwardingRules_nodeParamType = storedParamTypeMap['updateNetworkPortForwardingRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkPortForwardingRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkPortForwardingRules(updateNetworkPortForwardingRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSecurityIntrusionSettings') {
                var getNetworkSecurityIntrusionSettings_parameters = [];
                var getNetworkSecurityIntrusionSettings_nodeParam;
                var getNetworkSecurityIntrusionSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSecurityIntrusionSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSecurityIntrusionSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityIntrusionSettings_nodeParamType === 'str') {
                    console.log('getNetworkSecurityIntrusionSettings_nodeParamType is "str"');
                    getNetworkSecurityIntrusionSettings_parameters.networkId = getNetworkSecurityIntrusionSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityIntrusionSettings_nodeParamType is not "str"')
                    getNetworkSecurityIntrusionSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSecurityIntrusionSettings(getNetworkSecurityIntrusionSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSecurityIntrusionSettings') {
                var updateNetworkSecurityIntrusionSettings_parameters = [];
                var updateNetworkSecurityIntrusionSettings_nodeParam;
                var updateNetworkSecurityIntrusionSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSecurityIntrusionSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSecurityIntrusionSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSecurityIntrusionSettings_nodeParamType === 'str') {
                    console.log('updateNetworkSecurityIntrusionSettings_nodeParamType is "str"');
                    updateNetworkSecurityIntrusionSettings_parameters.networkId = updateNetworkSecurityIntrusionSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSecurityIntrusionSettings_nodeParamType is not "str"')
                    updateNetworkSecurityIntrusionSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSecurityIntrusionSettings_nodeParam = storedParamValsMap['updateNetworkSecurityIntrusionSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSecurityIntrusionSettings");

                updateNetworkSecurityIntrusionSettings_nodeParamType = storedParamTypeMap['updateNetworkSecurityIntrusionSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSecurityIntrusionSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSecurityIntrusionSettings_parameters.updateNetworkSecurityIntrusionSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSecurityIntrusionSettings(updateNetworkSecurityIntrusionSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSecurityMalwareSettings') {
                var getNetworkSecurityMalwareSettings_parameters = [];
                var getNetworkSecurityMalwareSettings_nodeParam;
                var getNetworkSecurityMalwareSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSecurityMalwareSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSecurityMalwareSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityMalwareSettings_nodeParamType === 'str') {
                    console.log('getNetworkSecurityMalwareSettings_nodeParamType is "str"');
                    getNetworkSecurityMalwareSettings_parameters.networkId = getNetworkSecurityMalwareSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityMalwareSettings_nodeParamType is not "str"')
                    getNetworkSecurityMalwareSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSecurityMalwareSettings(getNetworkSecurityMalwareSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSecurityMalwareSettings') {
                var updateNetworkSecurityMalwareSettings_parameters = [];
                var updateNetworkSecurityMalwareSettings_nodeParam;
                var updateNetworkSecurityMalwareSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSecurityMalwareSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSecurityMalwareSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSecurityMalwareSettings_nodeParamType === 'str') {
                    console.log('updateNetworkSecurityMalwareSettings_nodeParamType is "str"');
                    updateNetworkSecurityMalwareSettings_parameters.networkId = updateNetworkSecurityMalwareSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSecurityMalwareSettings_nodeParamType is not "str"')
                    updateNetworkSecurityMalwareSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSecurityMalwareSettings_nodeParam = storedParamValsMap['updateNetworkSecurityMalwareSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSecurityMalwareSettings");

                updateNetworkSecurityMalwareSettings_nodeParamType = storedParamTypeMap['updateNetworkSecurityMalwareSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSecurityMalwareSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSecurityMalwareSettings_parameters.updateNetworkSecurityMalwareSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSecurityMalwareSettings(updateNetworkSecurityMalwareSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSecurityEvents') {
                var getNetworkSecurityEvents_parameters = [];
                var getNetworkSecurityEvents_nodeParam;
                var getNetworkSecurityEvents_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.networkId = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.t0 = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.t1 = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.timespan = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.perPage = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.startingAfter = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkSecurityEvents_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkSecurityEvents_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSecurityEvents_nodeParamType === 'str') {
                    console.log('getNetworkSecurityEvents_nodeParamType is "str"');
                    getNetworkSecurityEvents_parameters.endingBefore = getNetworkSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getNetworkSecurityEvents_nodeParamType is not "str"')
                    getNetworkSecurityEvents_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkSecurityEvents(getNetworkSecurityEvents_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSiteToSiteVpn') {
                var getNetworkSiteToSiteVpn_parameters = [];
                var getNetworkSiteToSiteVpn_nodeParam;
                var getNetworkSiteToSiteVpn_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSiteToSiteVpn_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSiteToSiteVpn_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSiteToSiteVpn_nodeParamType === 'str') {
                    console.log('getNetworkSiteToSiteVpn_nodeParamType is "str"');
                    getNetworkSiteToSiteVpn_parameters.networkId = getNetworkSiteToSiteVpn_nodeParam || undefined;
                } else {
                    console.log('getNetworkSiteToSiteVpn_nodeParamType is not "str"')
                    getNetworkSiteToSiteVpn_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSiteToSiteVpn(getNetworkSiteToSiteVpn_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSiteToSiteVpn') {
                var updateNetworkSiteToSiteVpn_parameters = [];
                var updateNetworkSiteToSiteVpn_nodeParam;
                var updateNetworkSiteToSiteVpn_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSiteToSiteVpn_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSiteToSiteVpn_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSiteToSiteVpn_nodeParamType === 'str') {
                    console.log('updateNetworkSiteToSiteVpn_nodeParamType is "str"');
                    updateNetworkSiteToSiteVpn_parameters.networkId = updateNetworkSiteToSiteVpn_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSiteToSiteVpn_nodeParamType is not "str"')
                    updateNetworkSiteToSiteVpn_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSiteToSiteVpn_nodeParam = storedParamValsMap['updateNetworkSiteToSiteVpn'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSiteToSiteVpn");

                updateNetworkSiteToSiteVpn_nodeParamType = storedParamTypeMap['updateNetworkSiteToSiteVpn'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSiteToSiteVpn");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSiteToSiteVpn(updateNetworkSiteToSiteVpn_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSmAppPolaris') {
                var createNetworkSmAppPolaris_parameters = [];
                var createNetworkSmAppPolaris_nodeParam;
                var createNetworkSmAppPolaris_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSmAppPolaris_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('createNetworkSmAppPolaris_nodeParamType is "str"');
                    createNetworkSmAppPolaris_parameters.networkId = createNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('createNetworkSmAppPolaris_nodeParamType is not "str"')
                    createNetworkSmAppPolaris_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSmAppPolaris_nodeParam = storedParamValsMap['createNetworkSmAppPolaris'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmAppPolaris");

                createNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['createNetworkSmAppPolaris'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmAppPolaris");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSmAppPolaris(createNetworkSmAppPolaris_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmAppPolaris') {
                var getNetworkSmAppPolaris_parameters = [];
                var getNetworkSmAppPolaris_nodeParam;
                var getNetworkSmAppPolaris_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmAppPolaris_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('getNetworkSmAppPolaris_nodeParamType is "str"');
                    getNetworkSmAppPolaris_parameters.networkId = getNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmAppPolaris_nodeParamType is not "str"')
                    getNetworkSmAppPolaris_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmAppPolaris_nodeParam = storedParamValsMap['bundleId'] ||
                    RED.util.getMessageProperty(msg, "bundleId");

                getNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['bundleId'] ||
                    RED.util.getMessageProperty(msg, "bundleId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('getNetworkSmAppPolaris_nodeParamType is "str"');
                    getNetworkSmAppPolaris_parameters.bundleId = getNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmAppPolaris_nodeParamType is not "str"')
                    getNetworkSmAppPolaris_parameters.bundleId = RED.util.getMessageProperty(msg, "bundleId");
                }
                                result = client.getNetworkSmAppPolaris(getNetworkSmAppPolaris_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSmAppPolaris') {
                var updateNetworkSmAppPolaris_parameters = [];
                var updateNetworkSmAppPolaris_nodeParam;
                var updateNetworkSmAppPolaris_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSmAppPolaris_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('updateNetworkSmAppPolaris_nodeParamType is "str"');
                    updateNetworkSmAppPolaris_parameters.networkId = updateNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmAppPolaris_nodeParamType is not "str"')
                    updateNetworkSmAppPolaris_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSmAppPolaris_nodeParam = storedParamValsMap['appId'] ||
                    RED.util.getMessageProperty(msg, "appId");

                updateNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['appId'] ||
                    RED.util.getMessageProperty(msg, "appId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('updateNetworkSmAppPolaris_nodeParamType is "str"');
                    updateNetworkSmAppPolaris_parameters.appId = updateNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmAppPolaris_nodeParamType is not "str"')
                    updateNetworkSmAppPolaris_parameters.appId = RED.util.getMessageProperty(msg, "appId");
                }
                                
                updateNetworkSmAppPolaris_nodeParam = storedParamValsMap['updateNetworkSmAppPolaris'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmAppPolaris");

                updateNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['updateNetworkSmAppPolaris'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmAppPolaris");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSmAppPolaris_parameters.updateNetworkSmAppPolaris = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSmAppPolaris(updateNetworkSmAppPolaris_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmAppPolaris') {
                var deleteNetworkSmAppPolaris_parameters = [];
                var deleteNetworkSmAppPolaris_nodeParam;
                var deleteNetworkSmAppPolaris_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSmAppPolaris_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('deleteNetworkSmAppPolaris_nodeParamType is "str"');
                    deleteNetworkSmAppPolaris_parameters.networkId = deleteNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmAppPolaris_nodeParamType is not "str"')
                    deleteNetworkSmAppPolaris_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSmAppPolaris_nodeParam = storedParamValsMap['appId'] ||
                    RED.util.getMessageProperty(msg, "appId");

                deleteNetworkSmAppPolaris_nodeParamType = storedParamTypeMap['appId'] ||
                    RED.util.getMessageProperty(msg, "appId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmAppPolaris_nodeParamType === 'str') {
                    console.log('deleteNetworkSmAppPolaris_nodeParamType is "str"');
                    deleteNetworkSmAppPolaris_parameters.appId = deleteNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmAppPolaris_nodeParamType is not "str"')
                    deleteNetworkSmAppPolaris_parameters.appId = RED.util.getMessageProperty(msg, "appId");
                }
                                result = client.deleteNetworkSmAppPolaris(deleteNetworkSmAppPolaris_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSmBypassActivationLockAttempt') {
                var createNetworkSmBypassActivationLockAttempt_parameters = [];
                var createNetworkSmBypassActivationLockAttempt_nodeParam;
                var createNetworkSmBypassActivationLockAttempt_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSmBypassActivationLockAttempt_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSmBypassActivationLockAttempt_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSmBypassActivationLockAttempt_nodeParamType === 'str') {
                    console.log('createNetworkSmBypassActivationLockAttempt_nodeParamType is "str"');
                    createNetworkSmBypassActivationLockAttempt_parameters.networkId = createNetworkSmBypassActivationLockAttempt_nodeParam || undefined;
                } else {
                    console.log('createNetworkSmBypassActivationLockAttempt_nodeParamType is not "str"')
                    createNetworkSmBypassActivationLockAttempt_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSmBypassActivationLockAttempt_nodeParam = storedParamValsMap['createNetworkSmBypassActivationLockAttempt'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmBypassActivationLockAttempt");

                createNetworkSmBypassActivationLockAttempt_nodeParamType = storedParamTypeMap['createNetworkSmBypassActivationLockAttempt'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmBypassActivationLockAttempt");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSmBypassActivationLockAttempt_parameters.createNetworkSmBypassActivationLockAttempt = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSmBypassActivationLockAttempt(createNetworkSmBypassActivationLockAttempt_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmBypassActivationLockAttempt') {
                var getNetworkSmBypassActivationLockAttempt_parameters = [];
                var getNetworkSmBypassActivationLockAttempt_nodeParam;
                var getNetworkSmBypassActivationLockAttempt_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmBypassActivationLockAttempt_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmBypassActivationLockAttempt_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmBypassActivationLockAttempt_nodeParamType === 'str') {
                    console.log('getNetworkSmBypassActivationLockAttempt_nodeParamType is "str"');
                    getNetworkSmBypassActivationLockAttempt_parameters.networkId = getNetworkSmBypassActivationLockAttempt_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmBypassActivationLockAttempt_nodeParamType is not "str"')
                    getNetworkSmBypassActivationLockAttempt_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmBypassActivationLockAttempt_nodeParam = storedParamValsMap['attemptId'] ||
                    RED.util.getMessageProperty(msg, "attemptId");

                getNetworkSmBypassActivationLockAttempt_nodeParamType = storedParamTypeMap['attemptId'] ||
                    RED.util.getMessageProperty(msg, "attemptId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmBypassActivationLockAttempt_nodeParamType === 'str') {
                    console.log('getNetworkSmBypassActivationLockAttempt_nodeParamType is "str"');
                    getNetworkSmBypassActivationLockAttempt_parameters.attemptId = getNetworkSmBypassActivationLockAttempt_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmBypassActivationLockAttempt_nodeParamType is not "str"')
                    getNetworkSmBypassActivationLockAttempt_parameters.attemptId = RED.util.getMessageProperty(msg, "attemptId");
                }
                                result = client.getNetworkSmBypassActivationLockAttempt(getNetworkSmBypassActivationLockAttempt_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDeviceFields') {
                var updateNetworkSmDeviceFields_parameters = [];
                var updateNetworkSmDeviceFields_nodeParam;
                var updateNetworkSmDeviceFields_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSmDeviceFields_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSmDeviceFields_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmDeviceFields_nodeParamType === 'str') {
                    console.log('updateNetworkSmDeviceFields_nodeParamType is "str"');
                    updateNetworkSmDeviceFields_parameters.networkId = updateNetworkSmDeviceFields_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmDeviceFields_nodeParamType is not "str"')
                    updateNetworkSmDeviceFields_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSmDeviceFields_nodeParam = storedParamValsMap['updateNetworkSmDeviceFields'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmDeviceFields");

                updateNetworkSmDeviceFields_nodeParamType = storedParamTypeMap['updateNetworkSmDeviceFields'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmDeviceFields");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSmDeviceFields(updateNetworkSmDeviceFields_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'wipeNetworkSmDevice') {
                var wipeNetworkSmDevice_parameters = [];
                var wipeNetworkSmDevice_nodeParam;
                var wipeNetworkSmDevice_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                wipeNetworkSmDevice_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                wipeNetworkSmDevice_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (wipeNetworkSmDevice_nodeParamType === 'str') {
                    console.log('wipeNetworkSmDevice_nodeParamType is "str"');
                    wipeNetworkSmDevice_parameters.networkId = wipeNetworkSmDevice_nodeParam || undefined;
                } else {
                    console.log('wipeNetworkSmDevice_nodeParamType is not "str"')
                    wipeNetworkSmDevice_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                wipeNetworkSmDevice_nodeParam = storedParamValsMap['wipeNetworkSmDevice'] ||
                    RED.util.getMessageProperty(msg, "wipeNetworkSmDevice");

                wipeNetworkSmDevice_nodeParamType = storedParamTypeMap['wipeNetworkSmDevice'] ||
                    RED.util.getMessageProperty(msg, "wipeNetworkSmDevice");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    wipeNetworkSmDevice_parameters.wipeNetworkSmDevice = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.wipeNetworkSmDevice(wipeNetworkSmDevice_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmDevices') {
                var getNetworkSmDevices_parameters = [];
                var getNetworkSmDevices_nodeParam;
                var getNetworkSmDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmDevices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.networkId = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmDevices_nodeParam = storedParamValsMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['fields'] ||
                    RED.util.getMessageProperty(msg, "fields");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.fields = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.fields = RED.util.getMessageProperty(msg, "fields");
                }
                                
                getNetworkSmDevices_nodeParam = storedParamValsMap['wifiMacs'] ||
                    RED.util.getMessageProperty(msg, "wifiMacs");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['wifiMacs'] ||
                    RED.util.getMessageProperty(msg, "wifiMacs");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.wifiMacs = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.wifiMacs = RED.util.getMessageProperty(msg, "wifiMacs");
                }
                                
                getNetworkSmDevices_nodeParam = storedParamValsMap['serials'] ||
                    RED.util.getMessageProperty(msg, "serials");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['serials'] ||
                    RED.util.getMessageProperty(msg, "serials");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.serials = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.serials = RED.util.getMessageProperty(msg, "serials");
                }
                                
                getNetworkSmDevices_nodeParam = storedParamValsMap['ids'] ||
                    RED.util.getMessageProperty(msg, "ids");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['ids'] ||
                    RED.util.getMessageProperty(msg, "ids");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.ids = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.ids = RED.util.getMessageProperty(msg, "ids");
                }
                                
                getNetworkSmDevices_nodeParam = storedParamValsMap['scope'] ||
                    RED.util.getMessageProperty(msg, "scope");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['scope'] ||
                    RED.util.getMessageProperty(msg, "scope");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.scope = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.scope = RED.util.getMessageProperty(msg, "scope");
                }
                                
                getNetworkSmDevices_nodeParam = storedParamValsMap['batchToken'] ||
                    RED.util.getMessageProperty(msg, "batchToken");

                getNetworkSmDevices_nodeParamType = storedParamTypeMap['batchToken'] ||
                    RED.util.getMessageProperty(msg, "batchToken");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    console.log('getNetworkSmDevices_nodeParamType is "str"');
                    getNetworkSmDevices_parameters.batchToken = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDevices_nodeParamType is not "str"')
                    getNetworkSmDevices_parameters.batchToken = RED.util.getMessageProperty(msg, "batchToken");
                }
                                result = client.getNetworkSmDevices(getNetworkSmDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'checkinNetworkSmDevices') {
                var checkinNetworkSmDevices_parameters = [];
                var checkinNetworkSmDevices_nodeParam;
                var checkinNetworkSmDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                checkinNetworkSmDevices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                checkinNetworkSmDevices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (checkinNetworkSmDevices_nodeParamType === 'str') {
                    console.log('checkinNetworkSmDevices_nodeParamType is "str"');
                    checkinNetworkSmDevices_parameters.networkId = checkinNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('checkinNetworkSmDevices_nodeParamType is not "str"')
                    checkinNetworkSmDevices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                checkinNetworkSmDevices_nodeParam = storedParamValsMap['checkinNetworkSmDevices'] ||
                    RED.util.getMessageProperty(msg, "checkinNetworkSmDevices");

                checkinNetworkSmDevices_nodeParamType = storedParamTypeMap['checkinNetworkSmDevices'] ||
                    RED.util.getMessageProperty(msg, "checkinNetworkSmDevices");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    checkinNetworkSmDevices_parameters.checkinNetworkSmDevices = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.checkinNetworkSmDevices(checkinNetworkSmDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'moveNetworkSmDevices') {
                var moveNetworkSmDevices_parameters = [];
                var moveNetworkSmDevices_nodeParam;
                var moveNetworkSmDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                moveNetworkSmDevices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                moveNetworkSmDevices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (moveNetworkSmDevices_nodeParamType === 'str') {
                    console.log('moveNetworkSmDevices_nodeParamType is "str"');
                    moveNetworkSmDevices_parameters.networkId = moveNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('moveNetworkSmDevices_nodeParamType is not "str"')
                    moveNetworkSmDevices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                moveNetworkSmDevices_nodeParam = storedParamValsMap['moveNetworkSmDevices'] ||
                    RED.util.getMessageProperty(msg, "moveNetworkSmDevices");

                moveNetworkSmDevices_nodeParamType = storedParamTypeMap['moveNetworkSmDevices'] ||
                    RED.util.getMessageProperty(msg, "moveNetworkSmDevices");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    moveNetworkSmDevices_parameters.moveNetworkSmDevices = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.moveNetworkSmDevices(moveNetworkSmDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDevicesTags') {
                var updateNetworkSmDevicesTags_parameters = [];
                var updateNetworkSmDevicesTags_nodeParam;
                var updateNetworkSmDevicesTags_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSmDevicesTags_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSmDevicesTags_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmDevicesTags_nodeParamType === 'str') {
                    console.log('updateNetworkSmDevicesTags_nodeParamType is "str"');
                    updateNetworkSmDevicesTags_parameters.networkId = updateNetworkSmDevicesTags_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmDevicesTags_nodeParamType is not "str"')
                    updateNetworkSmDevicesTags_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSmDevicesTags_nodeParam = storedParamValsMap['updateNetworkSmDevicesTags'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmDevicesTags");

                updateNetworkSmDevicesTags_nodeParamType = storedParamTypeMap['updateNetworkSmDevicesTags'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmDevicesTags");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSmDevicesTags(updateNetworkSmDevicesTags_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'unenrollNetworkSmDevice') {
                var unenrollNetworkSmDevice_parameters = [];
                var unenrollNetworkSmDevice_nodeParam;
                var unenrollNetworkSmDevice_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                unenrollNetworkSmDevice_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                unenrollNetworkSmDevice_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (unenrollNetworkSmDevice_nodeParamType === 'str') {
                    console.log('unenrollNetworkSmDevice_nodeParamType is "str"');
                    unenrollNetworkSmDevice_parameters.networkId = unenrollNetworkSmDevice_nodeParam || undefined;
                } else {
                    console.log('unenrollNetworkSmDevice_nodeParamType is not "str"')
                    unenrollNetworkSmDevice_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                unenrollNetworkSmDevice_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                unenrollNetworkSmDevice_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (unenrollNetworkSmDevice_nodeParamType === 'str') {
                    console.log('unenrollNetworkSmDevice_nodeParamType is "str"');
                    unenrollNetworkSmDevice_parameters.deviceId = unenrollNetworkSmDevice_nodeParam || undefined;
                } else {
                    console.log('unenrollNetworkSmDevice_nodeParamType is not "str"')
                    unenrollNetworkSmDevice_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.unenrollNetworkSmDevice(unenrollNetworkSmDevice_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSmProfileClarity') {
                var createNetworkSmProfileClarity_parameters = [];
                var createNetworkSmProfileClarity_nodeParam;
                var createNetworkSmProfileClarity_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSmProfileClarity_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('createNetworkSmProfileClarity_nodeParamType is "str"');
                    createNetworkSmProfileClarity_parameters.networkId = createNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('createNetworkSmProfileClarity_nodeParamType is not "str"')
                    createNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSmProfileClarity_nodeParam = storedParamValsMap['createNetworkSmProfileClarity'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmProfileClarity");

                createNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['createNetworkSmProfileClarity'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmProfileClarity");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSmProfileClarity(createNetworkSmProfileClarity_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSmProfileClarity') {
                var updateNetworkSmProfileClarity_parameters = [];
                var updateNetworkSmProfileClarity_nodeParam;
                var updateNetworkSmProfileClarity_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSmProfileClarity_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('updateNetworkSmProfileClarity_nodeParamType is "str"');
                    updateNetworkSmProfileClarity_parameters.networkId = updateNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmProfileClarity_nodeParamType is not "str"')
                    updateNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSmProfileClarity_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                updateNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('updateNetworkSmProfileClarity_nodeParamType is "str"');
                    updateNetworkSmProfileClarity_parameters.profileId = updateNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmProfileClarity_nodeParamType is not "str"')
                    updateNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                
                updateNetworkSmProfileClarity_nodeParam = storedParamValsMap['updateNetworkSmProfileClarity'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmProfileClarity");

                updateNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['updateNetworkSmProfileClarity'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmProfileClarity");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSmProfileClarity(updateNetworkSmProfileClarity_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'addNetworkSmProfileClarity') {
                var addNetworkSmProfileClarity_parameters = [];
                var addNetworkSmProfileClarity_nodeParam;
                var addNetworkSmProfileClarity_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                addNetworkSmProfileClarity_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                addNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (addNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('addNetworkSmProfileClarity_nodeParamType is "str"');
                    addNetworkSmProfileClarity_parameters.networkId = addNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('addNetworkSmProfileClarity_nodeParamType is not "str"')
                    addNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                addNetworkSmProfileClarity_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                addNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (addNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('addNetworkSmProfileClarity_nodeParamType is "str"');
                    addNetworkSmProfileClarity_parameters.profileId = addNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('addNetworkSmProfileClarity_nodeParamType is not "str"')
                    addNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                
                addNetworkSmProfileClarity_nodeParam = storedParamValsMap['addNetworkSmProfileClarity'] ||
                    RED.util.getMessageProperty(msg, "addNetworkSmProfileClarity");

                addNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['addNetworkSmProfileClarity'] ||
                    RED.util.getMessageProperty(msg, "addNetworkSmProfileClarity");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.addNetworkSmProfileClarity(addNetworkSmProfileClarity_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmProfileClarity') {
                var getNetworkSmProfileClarity_parameters = [];
                var getNetworkSmProfileClarity_nodeParam;
                var getNetworkSmProfileClarity_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmProfileClarity_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('getNetworkSmProfileClarity_nodeParamType is "str"');
                    getNetworkSmProfileClarity_parameters.networkId = getNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmProfileClarity_nodeParamType is not "str"')
                    getNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmProfileClarity_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                getNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('getNetworkSmProfileClarity_nodeParamType is "str"');
                    getNetworkSmProfileClarity_parameters.profileId = getNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmProfileClarity_nodeParamType is not "str"')
                    getNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                result = client.getNetworkSmProfileClarity(getNetworkSmProfileClarity_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmProfileClarity') {
                var deleteNetworkSmProfileClarity_parameters = [];
                var deleteNetworkSmProfileClarity_nodeParam;
                var deleteNetworkSmProfileClarity_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSmProfileClarity_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('deleteNetworkSmProfileClarity_nodeParamType is "str"');
                    deleteNetworkSmProfileClarity_parameters.networkId = deleteNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmProfileClarity_nodeParamType is not "str"')
                    deleteNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSmProfileClarity_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                deleteNetworkSmProfileClarity_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmProfileClarity_nodeParamType === 'str') {
                    console.log('deleteNetworkSmProfileClarity_nodeParamType is "str"');
                    deleteNetworkSmProfileClarity_parameters.profileId = deleteNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmProfileClarity_nodeParamType is not "str"')
                    deleteNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                result = client.deleteNetworkSmProfileClarity(deleteNetworkSmProfileClarity_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSmProfileUmbrella') {
                var createNetworkSmProfileUmbrella_parameters = [];
                var createNetworkSmProfileUmbrella_nodeParam;
                var createNetworkSmProfileUmbrella_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('createNetworkSmProfileUmbrella_nodeParamType is "str"');
                    createNetworkSmProfileUmbrella_parameters.networkId = createNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('createNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    createNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['createNetworkSmProfileUmbrella'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmProfileUmbrella");

                createNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['createNetworkSmProfileUmbrella'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmProfileUmbrella");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSmProfileUmbrella(createNetworkSmProfileUmbrella_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSmProfileUmbrella') {
                var updateNetworkSmProfileUmbrella_parameters = [];
                var updateNetworkSmProfileUmbrella_nodeParam;
                var updateNetworkSmProfileUmbrella_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('updateNetworkSmProfileUmbrella_nodeParamType is "str"');
                    updateNetworkSmProfileUmbrella_parameters.networkId = updateNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    updateNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                updateNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('updateNetworkSmProfileUmbrella_nodeParamType is "str"');
                    updateNetworkSmProfileUmbrella_parameters.profileId = updateNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    updateNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                
                updateNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['updateNetworkSmProfileUmbrella'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmProfileUmbrella");

                updateNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['updateNetworkSmProfileUmbrella'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmProfileUmbrella");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSmProfileUmbrella(updateNetworkSmProfileUmbrella_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'addNetworkSmProfileUmbrella') {
                var addNetworkSmProfileUmbrella_parameters = [];
                var addNetworkSmProfileUmbrella_nodeParam;
                var addNetworkSmProfileUmbrella_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                addNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                addNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (addNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('addNetworkSmProfileUmbrella_nodeParamType is "str"');
                    addNetworkSmProfileUmbrella_parameters.networkId = addNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('addNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    addNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                addNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                addNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (addNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('addNetworkSmProfileUmbrella_nodeParamType is "str"');
                    addNetworkSmProfileUmbrella_parameters.profileId = addNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('addNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    addNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                
                addNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['addNetworkSmProfileUmbrella'] ||
                    RED.util.getMessageProperty(msg, "addNetworkSmProfileUmbrella");

                addNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['addNetworkSmProfileUmbrella'] ||
                    RED.util.getMessageProperty(msg, "addNetworkSmProfileUmbrella");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.addNetworkSmProfileUmbrella(addNetworkSmProfileUmbrella_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmProfileUmbrella') {
                var getNetworkSmProfileUmbrella_parameters = [];
                var getNetworkSmProfileUmbrella_nodeParam;
                var getNetworkSmProfileUmbrella_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('getNetworkSmProfileUmbrella_nodeParamType is "str"');
                    getNetworkSmProfileUmbrella_parameters.networkId = getNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    getNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                getNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('getNetworkSmProfileUmbrella_nodeParamType is "str"');
                    getNetworkSmProfileUmbrella_parameters.profileId = getNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    getNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                result = client.getNetworkSmProfileUmbrella(getNetworkSmProfileUmbrella_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmProfileUmbrella') {
                var deleteNetworkSmProfileUmbrella_parameters = [];
                var deleteNetworkSmProfileUmbrella_nodeParam;
                var deleteNetworkSmProfileUmbrella_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('deleteNetworkSmProfileUmbrella_nodeParamType is "str"');
                    deleteNetworkSmProfileUmbrella_parameters.networkId = deleteNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    deleteNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSmProfileUmbrella_nodeParam = storedParamValsMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                deleteNetworkSmProfileUmbrella_nodeParamType = storedParamTypeMap['profileId'] ||
                    RED.util.getMessageProperty(msg, "profileId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    console.log('deleteNetworkSmProfileUmbrella_nodeParamType is "str"');
                    deleteNetworkSmProfileUmbrella_parameters.profileId = deleteNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmProfileUmbrella_nodeParamType is not "str"')
                    deleteNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, "profileId");
                }
                                result = client.deleteNetworkSmProfileUmbrella(deleteNetworkSmProfileUmbrella_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmProfiles') {
                var getNetworkSmProfiles_parameters = [];
                var getNetworkSmProfiles_nodeParam;
                var getNetworkSmProfiles_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmProfiles_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmProfiles_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmProfiles_nodeParamType === 'str') {
                    console.log('getNetworkSmProfiles_nodeParamType is "str"');
                    getNetworkSmProfiles_parameters.networkId = getNetworkSmProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmProfiles_nodeParamType is not "str"')
                    getNetworkSmProfiles_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSmProfiles(getNetworkSmProfiles_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmTargetGroups') {
                var getNetworkSmTargetGroups_parameters = [];
                var getNetworkSmTargetGroups_nodeParam;
                var getNetworkSmTargetGroups_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmTargetGroups_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmTargetGroups_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmTargetGroups_nodeParamType === 'str') {
                    console.log('getNetworkSmTargetGroups_nodeParamType is "str"');
                    getNetworkSmTargetGroups_parameters.networkId = getNetworkSmTargetGroups_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmTargetGroups_nodeParamType is not "str"')
                    getNetworkSmTargetGroups_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmTargetGroups_nodeParam = storedParamValsMap['withDetails'] ||
                    RED.util.getMessageProperty(msg, "withDetails");

                getNetworkSmTargetGroups_nodeParamType = storedParamTypeMap['withDetails'] ||
                    RED.util.getMessageProperty(msg, "withDetails");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmTargetGroups_nodeParamType === 'str') {
                    console.log('getNetworkSmTargetGroups_nodeParamType is "str"');
                    getNetworkSmTargetGroups_parameters.withDetails = getNetworkSmTargetGroups_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmTargetGroups_nodeParamType is not "str"')
                    getNetworkSmTargetGroups_parameters.withDetails = RED.util.getMessageProperty(msg, "withDetails");
                }
                                result = client.getNetworkSmTargetGroups(getNetworkSmTargetGroups_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSmTargetGroup') {
                var createNetworkSmTargetGroup_parameters = [];
                var createNetworkSmTargetGroup_nodeParam;
                var createNetworkSmTargetGroup_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSmTargetGroup_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('createNetworkSmTargetGroup_nodeParamType is "str"');
                    createNetworkSmTargetGroup_parameters.networkId = createNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('createNetworkSmTargetGroup_nodeParamType is not "str"')
                    createNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSmTargetGroup_nodeParam = storedParamValsMap['createNetworkSmTargetGroup'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmTargetGroup");

                createNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['createNetworkSmTargetGroup'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSmTargetGroup");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSmTargetGroup_parameters.createNetworkSmTargetGroup = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSmTargetGroup(createNetworkSmTargetGroup_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmTargetGroup') {
                var getNetworkSmTargetGroup_parameters = [];
                var getNetworkSmTargetGroup_nodeParam;
                var getNetworkSmTargetGroup_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmTargetGroup_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('getNetworkSmTargetGroup_nodeParamType is "str"');
                    getNetworkSmTargetGroup_parameters.networkId = getNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmTargetGroup_nodeParamType is not "str"')
                    getNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmTargetGroup_nodeParam = storedParamValsMap['targetGroupId'] ||
                    RED.util.getMessageProperty(msg, "targetGroupId");

                getNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['targetGroupId'] ||
                    RED.util.getMessageProperty(msg, "targetGroupId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('getNetworkSmTargetGroup_nodeParamType is "str"');
                    getNetworkSmTargetGroup_parameters.targetGroupId = getNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmTargetGroup_nodeParamType is not "str"')
                    getNetworkSmTargetGroup_parameters.targetGroupId = RED.util.getMessageProperty(msg, "targetGroupId");
                }
                                
                getNetworkSmTargetGroup_nodeParam = storedParamValsMap['withDetails'] ||
                    RED.util.getMessageProperty(msg, "withDetails");

                getNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['withDetails'] ||
                    RED.util.getMessageProperty(msg, "withDetails");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('getNetworkSmTargetGroup_nodeParamType is "str"');
                    getNetworkSmTargetGroup_parameters.withDetails = getNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmTargetGroup_nodeParamType is not "str"')
                    getNetworkSmTargetGroup_parameters.withDetails = RED.util.getMessageProperty(msg, "withDetails");
                }
                                result = client.getNetworkSmTargetGroup(getNetworkSmTargetGroup_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSmTargetGroup') {
                var updateNetworkSmTargetGroup_parameters = [];
                var updateNetworkSmTargetGroup_nodeParam;
                var updateNetworkSmTargetGroup_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSmTargetGroup_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('updateNetworkSmTargetGroup_nodeParamType is "str"');
                    updateNetworkSmTargetGroup_parameters.networkId = updateNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmTargetGroup_nodeParamType is not "str"')
                    updateNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSmTargetGroup_nodeParam = storedParamValsMap['targetGroupId'] ||
                    RED.util.getMessageProperty(msg, "targetGroupId");

                updateNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['targetGroupId'] ||
                    RED.util.getMessageProperty(msg, "targetGroupId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('updateNetworkSmTargetGroup_nodeParamType is "str"');
                    updateNetworkSmTargetGroup_parameters.targetGroupId = updateNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSmTargetGroup_nodeParamType is not "str"')
                    updateNetworkSmTargetGroup_parameters.targetGroupId = RED.util.getMessageProperty(msg, "targetGroupId");
                }
                                
                updateNetworkSmTargetGroup_nodeParam = storedParamValsMap['updateNetworkSmTargetGroup'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmTargetGroup");

                updateNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['updateNetworkSmTargetGroup'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSmTargetGroup");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSmTargetGroup(updateNetworkSmTargetGroup_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmTargetGroup') {
                var deleteNetworkSmTargetGroup_parameters = [];
                var deleteNetworkSmTargetGroup_nodeParam;
                var deleteNetworkSmTargetGroup_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSmTargetGroup_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('deleteNetworkSmTargetGroup_nodeParamType is "str"');
                    deleteNetworkSmTargetGroup_parameters.networkId = deleteNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmTargetGroup_nodeParamType is not "str"')
                    deleteNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSmTargetGroup_nodeParam = storedParamValsMap['targetGroupId'] ||
                    RED.util.getMessageProperty(msg, "targetGroupId");

                deleteNetworkSmTargetGroup_nodeParamType = storedParamTypeMap['targetGroupId'] ||
                    RED.util.getMessageProperty(msg, "targetGroupId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSmTargetGroup_nodeParamType === 'str') {
                    console.log('deleteNetworkSmTargetGroup_nodeParamType is "str"');
                    deleteNetworkSmTargetGroup_parameters.targetGroupId = deleteNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSmTargetGroup_nodeParamType is not "str"')
                    deleteNetworkSmTargetGroup_parameters.targetGroupId = RED.util.getMessageProperty(msg, "targetGroupId");
                }
                                result = client.deleteNetworkSmTargetGroup(deleteNetworkSmTargetGroup_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmUserDeviceProfiles') {
                var getNetworkSmUserDeviceProfiles_parameters = [];
                var getNetworkSmUserDeviceProfiles_nodeParam;
                var getNetworkSmUserDeviceProfiles_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmUserDeviceProfiles_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmUserDeviceProfiles_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUserDeviceProfiles_nodeParamType === 'str') {
                    console.log('getNetworkSmUserDeviceProfiles_nodeParamType is "str"');
                    getNetworkSmUserDeviceProfiles_parameters.networkId = getNetworkSmUserDeviceProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUserDeviceProfiles_nodeParamType is not "str"')
                    getNetworkSmUserDeviceProfiles_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmUserDeviceProfiles_nodeParam = storedParamValsMap['userId'] ||
                    RED.util.getMessageProperty(msg, "userId");

                getNetworkSmUserDeviceProfiles_nodeParamType = storedParamTypeMap['userId'] ||
                    RED.util.getMessageProperty(msg, "userId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUserDeviceProfiles_nodeParamType === 'str') {
                    console.log('getNetworkSmUserDeviceProfiles_nodeParamType is "str"');
                    getNetworkSmUserDeviceProfiles_parameters.userId = getNetworkSmUserDeviceProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUserDeviceProfiles_nodeParamType is not "str"')
                    getNetworkSmUserDeviceProfiles_parameters.userId = RED.util.getMessageProperty(msg, "userId");
                }
                                result = client.getNetworkSmUserDeviceProfiles(getNetworkSmUserDeviceProfiles_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmUserSoftwares') {
                var getNetworkSmUserSoftwares_parameters = [];
                var getNetworkSmUserSoftwares_nodeParam;
                var getNetworkSmUserSoftwares_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmUserSoftwares_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmUserSoftwares_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUserSoftwares_nodeParamType === 'str') {
                    console.log('getNetworkSmUserSoftwares_nodeParamType is "str"');
                    getNetworkSmUserSoftwares_parameters.networkId = getNetworkSmUserSoftwares_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUserSoftwares_nodeParamType is not "str"')
                    getNetworkSmUserSoftwares_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmUserSoftwares_nodeParam = storedParamValsMap['userId'] ||
                    RED.util.getMessageProperty(msg, "userId");

                getNetworkSmUserSoftwares_nodeParamType = storedParamTypeMap['userId'] ||
                    RED.util.getMessageProperty(msg, "userId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUserSoftwares_nodeParamType === 'str') {
                    console.log('getNetworkSmUserSoftwares_nodeParamType is "str"');
                    getNetworkSmUserSoftwares_parameters.userId = getNetworkSmUserSoftwares_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUserSoftwares_nodeParamType is not "str"')
                    getNetworkSmUserSoftwares_parameters.userId = RED.util.getMessageProperty(msg, "userId");
                }
                                result = client.getNetworkSmUserSoftwares(getNetworkSmUserSoftwares_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmUsers') {
                var getNetworkSmUsers_parameters = [];
                var getNetworkSmUsers_nodeParam;
                var getNetworkSmUsers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmUsers_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmUsers_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    console.log('getNetworkSmUsers_nodeParamType is "str"');
                    getNetworkSmUsers_parameters.networkId = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUsers_nodeParamType is not "str"')
                    getNetworkSmUsers_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmUsers_nodeParam = storedParamValsMap['ids'] ||
                    RED.util.getMessageProperty(msg, "ids");

                getNetworkSmUsers_nodeParamType = storedParamTypeMap['ids'] ||
                    RED.util.getMessageProperty(msg, "ids");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    console.log('getNetworkSmUsers_nodeParamType is "str"');
                    getNetworkSmUsers_parameters.ids = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUsers_nodeParamType is not "str"')
                    getNetworkSmUsers_parameters.ids = RED.util.getMessageProperty(msg, "ids");
                }
                                
                getNetworkSmUsers_nodeParam = storedParamValsMap['usernames'] ||
                    RED.util.getMessageProperty(msg, "usernames");

                getNetworkSmUsers_nodeParamType = storedParamTypeMap['usernames'] ||
                    RED.util.getMessageProperty(msg, "usernames");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    console.log('getNetworkSmUsers_nodeParamType is "str"');
                    getNetworkSmUsers_parameters.usernames = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUsers_nodeParamType is not "str"')
                    getNetworkSmUsers_parameters.usernames = RED.util.getMessageProperty(msg, "usernames");
                }
                                
                getNetworkSmUsers_nodeParam = storedParamValsMap['emails'] ||
                    RED.util.getMessageProperty(msg, "emails");

                getNetworkSmUsers_nodeParamType = storedParamTypeMap['emails'] ||
                    RED.util.getMessageProperty(msg, "emails");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    console.log('getNetworkSmUsers_nodeParamType is "str"');
                    getNetworkSmUsers_parameters.emails = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUsers_nodeParamType is not "str"')
                    getNetworkSmUsers_parameters.emails = RED.util.getMessageProperty(msg, "emails");
                }
                                
                getNetworkSmUsers_nodeParam = storedParamValsMap['scope'] ||
                    RED.util.getMessageProperty(msg, "scope");

                getNetworkSmUsers_nodeParamType = storedParamTypeMap['scope'] ||
                    RED.util.getMessageProperty(msg, "scope");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    console.log('getNetworkSmUsers_nodeParamType is "str"');
                    getNetworkSmUsers_parameters.scope = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmUsers_nodeParamType is not "str"')
                    getNetworkSmUsers_parameters.scope = RED.util.getMessageProperty(msg, "scope");
                }
                                result = client.getNetworkSmUsers(getNetworkSmUsers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmCellularUsageHistory') {
                var getNetworkSmCellularUsageHistory_parameters = [];
                var getNetworkSmCellularUsageHistory_nodeParam;
                var getNetworkSmCellularUsageHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmCellularUsageHistory_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmCellularUsageHistory_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmCellularUsageHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmCellularUsageHistory_nodeParamType is "str"');
                    getNetworkSmCellularUsageHistory_parameters.networkId = getNetworkSmCellularUsageHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmCellularUsageHistory_nodeParamType is not "str"')
                    getNetworkSmCellularUsageHistory_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmCellularUsageHistory_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmCellularUsageHistory_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmCellularUsageHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmCellularUsageHistory_nodeParamType is "str"');
                    getNetworkSmCellularUsageHistory_parameters.deviceId = getNetworkSmCellularUsageHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmCellularUsageHistory_nodeParamType is not "str"')
                    getNetworkSmCellularUsageHistory_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmCellularUsageHistory(getNetworkSmCellularUsageHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmCerts') {
                var getNetworkSmCerts_parameters = [];
                var getNetworkSmCerts_nodeParam;
                var getNetworkSmCerts_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmCerts_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmCerts_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmCerts_nodeParamType === 'str') {
                    console.log('getNetworkSmCerts_nodeParamType is "str"');
                    getNetworkSmCerts_parameters.networkId = getNetworkSmCerts_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmCerts_nodeParamType is not "str"')
                    getNetworkSmCerts_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmCerts_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmCerts_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmCerts_nodeParamType === 'str') {
                    console.log('getNetworkSmCerts_nodeParamType is "str"');
                    getNetworkSmCerts_parameters.deviceId = getNetworkSmCerts_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmCerts_nodeParamType is not "str"')
                    getNetworkSmCerts_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmCerts(getNetworkSmCerts_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmDeviceProfiles') {
                var getNetworkSmDeviceProfiles_parameters = [];
                var getNetworkSmDeviceProfiles_nodeParam;
                var getNetworkSmDeviceProfiles_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmDeviceProfiles_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmDeviceProfiles_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceProfiles_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceProfiles_nodeParamType is "str"');
                    getNetworkSmDeviceProfiles_parameters.networkId = getNetworkSmDeviceProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceProfiles_nodeParamType is not "str"')
                    getNetworkSmDeviceProfiles_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmDeviceProfiles_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmDeviceProfiles_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceProfiles_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceProfiles_nodeParamType is "str"');
                    getNetworkSmDeviceProfiles_parameters.deviceId = getNetworkSmDeviceProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceProfiles_nodeParamType is not "str"')
                    getNetworkSmDeviceProfiles_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmDeviceProfiles(getNetworkSmDeviceProfiles_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmNetworkAdapters') {
                var getNetworkSmNetworkAdapters_parameters = [];
                var getNetworkSmNetworkAdapters_nodeParam;
                var getNetworkSmNetworkAdapters_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmNetworkAdapters_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmNetworkAdapters_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmNetworkAdapters_nodeParamType === 'str') {
                    console.log('getNetworkSmNetworkAdapters_nodeParamType is "str"');
                    getNetworkSmNetworkAdapters_parameters.networkId = getNetworkSmNetworkAdapters_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmNetworkAdapters_nodeParamType is not "str"')
                    getNetworkSmNetworkAdapters_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmNetworkAdapters_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmNetworkAdapters_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmNetworkAdapters_nodeParamType === 'str') {
                    console.log('getNetworkSmNetworkAdapters_nodeParamType is "str"');
                    getNetworkSmNetworkAdapters_parameters.deviceId = getNetworkSmNetworkAdapters_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmNetworkAdapters_nodeParamType is not "str"')
                    getNetworkSmNetworkAdapters_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmNetworkAdapters(getNetworkSmNetworkAdapters_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmRestrictions') {
                var getNetworkSmRestrictions_parameters = [];
                var getNetworkSmRestrictions_nodeParam;
                var getNetworkSmRestrictions_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmRestrictions_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmRestrictions_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmRestrictions_nodeParamType === 'str') {
                    console.log('getNetworkSmRestrictions_nodeParamType is "str"');
                    getNetworkSmRestrictions_parameters.networkId = getNetworkSmRestrictions_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmRestrictions_nodeParamType is not "str"')
                    getNetworkSmRestrictions_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmRestrictions_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmRestrictions_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmRestrictions_nodeParamType === 'str') {
                    console.log('getNetworkSmRestrictions_nodeParamType is "str"');
                    getNetworkSmRestrictions_parameters.deviceId = getNetworkSmRestrictions_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmRestrictions_nodeParamType is not "str"')
                    getNetworkSmRestrictions_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmRestrictions(getNetworkSmRestrictions_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmSecurityCenters') {
                var getNetworkSmSecurityCenters_parameters = [];
                var getNetworkSmSecurityCenters_nodeParam;
                var getNetworkSmSecurityCenters_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmSecurityCenters_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmSecurityCenters_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmSecurityCenters_nodeParamType === 'str') {
                    console.log('getNetworkSmSecurityCenters_nodeParamType is "str"');
                    getNetworkSmSecurityCenters_parameters.networkId = getNetworkSmSecurityCenters_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmSecurityCenters_nodeParamType is not "str"')
                    getNetworkSmSecurityCenters_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmSecurityCenters_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmSecurityCenters_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmSecurityCenters_nodeParamType === 'str') {
                    console.log('getNetworkSmSecurityCenters_nodeParamType is "str"');
                    getNetworkSmSecurityCenters_parameters.deviceId = getNetworkSmSecurityCenters_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmSecurityCenters_nodeParamType is not "str"')
                    getNetworkSmSecurityCenters_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmSecurityCenters(getNetworkSmSecurityCenters_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmSoftwares') {
                var getNetworkSmSoftwares_parameters = [];
                var getNetworkSmSoftwares_nodeParam;
                var getNetworkSmSoftwares_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmSoftwares_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmSoftwares_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmSoftwares_nodeParamType === 'str') {
                    console.log('getNetworkSmSoftwares_nodeParamType is "str"');
                    getNetworkSmSoftwares_parameters.networkId = getNetworkSmSoftwares_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmSoftwares_nodeParamType is not "str"')
                    getNetworkSmSoftwares_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmSoftwares_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmSoftwares_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmSoftwares_nodeParamType === 'str') {
                    console.log('getNetworkSmSoftwares_nodeParamType is "str"');
                    getNetworkSmSoftwares_parameters.deviceId = getNetworkSmSoftwares_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmSoftwares_nodeParamType is not "str"')
                    getNetworkSmSoftwares_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmSoftwares(getNetworkSmSoftwares_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmWlanLists') {
                var getNetworkSmWlanLists_parameters = [];
                var getNetworkSmWlanLists_nodeParam;
                var getNetworkSmWlanLists_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmWlanLists_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmWlanLists_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmWlanLists_nodeParamType === 'str') {
                    console.log('getNetworkSmWlanLists_nodeParamType is "str"');
                    getNetworkSmWlanLists_parameters.networkId = getNetworkSmWlanLists_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmWlanLists_nodeParamType is not "str"')
                    getNetworkSmWlanLists_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmWlanLists_nodeParam = storedParamValsMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                getNetworkSmWlanLists_nodeParamType = storedParamTypeMap['deviceId'] ||
                    RED.util.getMessageProperty(msg, "deviceId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmWlanLists_nodeParamType === 'str') {
                    console.log('getNetworkSmWlanLists_nodeParamType is "str"');
                    getNetworkSmWlanLists_parameters.deviceId = getNetworkSmWlanLists_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmWlanLists_nodeParamType is not "str"')
                    getNetworkSmWlanLists_parameters.deviceId = RED.util.getMessageProperty(msg, "deviceId");
                }
                                result = client.getNetworkSmWlanLists(getNetworkSmWlanLists_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSnmpSettings') {
                var getNetworkSnmpSettings_parameters = [];
                var getNetworkSnmpSettings_nodeParam;
                var getNetworkSnmpSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSnmpSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSnmpSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSnmpSettings_nodeParamType === 'str') {
                    console.log('getNetworkSnmpSettings_nodeParamType is "str"');
                    getNetworkSnmpSettings_parameters.networkId = getNetworkSnmpSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkSnmpSettings_nodeParamType is not "str"')
                    getNetworkSnmpSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSnmpSettings(getNetworkSnmpSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSnmpSettings') {
                var updateNetworkSnmpSettings_parameters = [];
                var updateNetworkSnmpSettings_nodeParam;
                var updateNetworkSnmpSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSnmpSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSnmpSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSnmpSettings_nodeParamType === 'str') {
                    console.log('updateNetworkSnmpSettings_nodeParamType is "str"');
                    updateNetworkSnmpSettings_parameters.networkId = updateNetworkSnmpSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSnmpSettings_nodeParamType is not "str"')
                    updateNetworkSnmpSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSnmpSettings_nodeParam = storedParamValsMap['updateNetworkSnmpSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSnmpSettings");

                updateNetworkSnmpSettings_nodeParamType = storedParamTypeMap['updateNetworkSnmpSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSnmpSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSnmpSettings_parameters.updateNetworkSnmpSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSnmpSettings(updateNetworkSnmpSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSplashLoginAttempts') {
                var getNetworkSplashLoginAttempts_parameters = [];
                var getNetworkSplashLoginAttempts_nodeParam;
                var getNetworkSplashLoginAttempts_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSplashLoginAttempts_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSplashLoginAttempts_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is "str"');
                    getNetworkSplashLoginAttempts_parameters.networkId = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is not "str"')
                    getNetworkSplashLoginAttempts_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSplashLoginAttempts_nodeParam = storedParamValsMap['ssidNumber'] ||
                    RED.util.getMessageProperty(msg, "ssidNumber");

                getNetworkSplashLoginAttempts_nodeParamType = storedParamTypeMap['ssidNumber'] ||
                    RED.util.getMessageProperty(msg, "ssidNumber");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is "str"');
                    getNetworkSplashLoginAttempts_parameters.ssidNumber = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is not "str"')
                    getNetworkSplashLoginAttempts_parameters.ssidNumber = RED.util.getMessageProperty(msg, "ssidNumber");
                }
                                
                getNetworkSplashLoginAttempts_nodeParam = storedParamValsMap['loginIdentifier'] ||
                    RED.util.getMessageProperty(msg, "loginIdentifier");

                getNetworkSplashLoginAttempts_nodeParamType = storedParamTypeMap['loginIdentifier'] ||
                    RED.util.getMessageProperty(msg, "loginIdentifier");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is "str"');
                    getNetworkSplashLoginAttempts_parameters.loginIdentifier = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is not "str"')
                    getNetworkSplashLoginAttempts_parameters.loginIdentifier = RED.util.getMessageProperty(msg, "loginIdentifier");
                }
                                
                getNetworkSplashLoginAttempts_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkSplashLoginAttempts_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is "str"');
                    getNetworkSplashLoginAttempts_parameters.timespan = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    console.log('getNetworkSplashLoginAttempts_nodeParamType is not "str"')
                    getNetworkSplashLoginAttempts_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                result = client.getNetworkSplashLoginAttempts(getNetworkSplashLoginAttempts_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'splitNetwork') {
                var splitNetwork_parameters = [];
                var splitNetwork_nodeParam;
                var splitNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                splitNetwork_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                splitNetwork_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (splitNetwork_nodeParamType === 'str') {
                    console.log('splitNetwork_nodeParamType is "str"');
                    splitNetwork_parameters.networkId = splitNetwork_nodeParam || undefined;
                } else {
                    console.log('splitNetwork_nodeParamType is not "str"')
                    splitNetwork_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.splitNetwork(splitNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSsids') {
                var getNetworkSsids_parameters = [];
                var getNetworkSsids_nodeParam;
                var getNetworkSsids_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSsids_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSsids_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsids_nodeParamType === 'str') {
                    console.log('getNetworkSsids_nodeParamType is "str"');
                    getNetworkSsids_parameters.networkId = getNetworkSsids_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsids_nodeParamType is not "str"')
                    getNetworkSsids_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSsids(getNetworkSsids_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSsid') {
                var getNetworkSsid_parameters = [];
                var getNetworkSsid_nodeParam;
                var getNetworkSsid_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSsid_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSsid_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsid_nodeParamType === 'str') {
                    console.log('getNetworkSsid_nodeParamType is "str"');
                    getNetworkSsid_parameters.networkId = getNetworkSsid_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsid_nodeParamType is not "str"')
                    getNetworkSsid_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSsid_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                getNetworkSsid_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsid_nodeParamType === 'str') {
                    console.log('getNetworkSsid_nodeParamType is "str"');
                    getNetworkSsid_parameters.number = getNetworkSsid_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsid_nodeParamType is not "str"')
                    getNetworkSsid_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                result = client.getNetworkSsid(getNetworkSsid_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSsid') {
                var updateNetworkSsid_parameters = [];
                var updateNetworkSsid_nodeParam;
                var updateNetworkSsid_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSsid_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSsid_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsid_nodeParamType === 'str') {
                    console.log('updateNetworkSsid_nodeParamType is "str"');
                    updateNetworkSsid_parameters.networkId = updateNetworkSsid_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsid_nodeParamType is not "str"')
                    updateNetworkSsid_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSsid_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                updateNetworkSsid_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsid_nodeParamType === 'str') {
                    console.log('updateNetworkSsid_nodeParamType is "str"');
                    updateNetworkSsid_parameters.number = updateNetworkSsid_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsid_nodeParamType is not "str"')
                    updateNetworkSsid_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                
                updateNetworkSsid_nodeParam = storedParamValsMap['updateNetworkSsid'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsid");

                updateNetworkSsid_nodeParamType = storedParamTypeMap['updateNetworkSsid'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsid");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSsid_parameters.updateNetworkSsid = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSsid(updateNetworkSsid_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSsidL3FirewallRules') {
                var getNetworkSsidL3FirewallRules_parameters = [];
                var getNetworkSsidL3FirewallRules_nodeParam;
                var getNetworkSsidL3FirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSsidL3FirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSsidL3FirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    console.log('getNetworkSsidL3FirewallRules_nodeParamType is "str"');
                    getNetworkSsidL3FirewallRules_parameters.networkId = getNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsidL3FirewallRules_nodeParamType is not "str"')
                    getNetworkSsidL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSsidL3FirewallRules_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                getNetworkSsidL3FirewallRules_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    console.log('getNetworkSsidL3FirewallRules_nodeParamType is "str"');
                    getNetworkSsidL3FirewallRules_parameters.number = getNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsidL3FirewallRules_nodeParamType is not "str"')
                    getNetworkSsidL3FirewallRules_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                result = client.getNetworkSsidL3FirewallRules(getNetworkSsidL3FirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSsidL3FirewallRules') {
                var updateNetworkSsidL3FirewallRules_parameters = [];
                var updateNetworkSsidL3FirewallRules_nodeParam;
                var updateNetworkSsidL3FirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSsidL3FirewallRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSsidL3FirewallRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    console.log('updateNetworkSsidL3FirewallRules_nodeParamType is "str"');
                    updateNetworkSsidL3FirewallRules_parameters.networkId = updateNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsidL3FirewallRules_nodeParamType is not "str"')
                    updateNetworkSsidL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSsidL3FirewallRules_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                updateNetworkSsidL3FirewallRules_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    console.log('updateNetworkSsidL3FirewallRules_nodeParamType is "str"');
                    updateNetworkSsidL3FirewallRules_parameters.number = updateNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsidL3FirewallRules_nodeParamType is not "str"')
                    updateNetworkSsidL3FirewallRules_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                
                updateNetworkSsidL3FirewallRules_nodeParam = storedParamValsMap['updateNetworkSsidL3FirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsidL3FirewallRules");

                updateNetworkSsidL3FirewallRules_nodeParamType = storedParamTypeMap['updateNetworkSsidL3FirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsidL3FirewallRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSsidL3FirewallRules(updateNetworkSsidL3FirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSsidSplashSettings') {
                var getNetworkSsidSplashSettings_parameters = [];
                var getNetworkSsidSplashSettings_nodeParam;
                var getNetworkSsidSplashSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSsidSplashSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSsidSplashSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsidSplashSettings_nodeParamType === 'str') {
                    console.log('getNetworkSsidSplashSettings_nodeParamType is "str"');
                    getNetworkSsidSplashSettings_parameters.networkId = getNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsidSplashSettings_nodeParamType is not "str"')
                    getNetworkSsidSplashSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSsidSplashSettings_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                getNetworkSsidSplashSettings_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsidSplashSettings_nodeParamType === 'str') {
                    console.log('getNetworkSsidSplashSettings_nodeParamType is "str"');
                    getNetworkSsidSplashSettings_parameters.number = getNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsidSplashSettings_nodeParamType is not "str"')
                    getNetworkSsidSplashSettings_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                result = client.getNetworkSsidSplashSettings(getNetworkSsidSplashSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSsidSplashSettings') {
                var updateNetworkSsidSplashSettings_parameters = [];
                var updateNetworkSsidSplashSettings_nodeParam;
                var updateNetworkSsidSplashSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSsidSplashSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSsidSplashSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsidSplashSettings_nodeParamType === 'str') {
                    console.log('updateNetworkSsidSplashSettings_nodeParamType is "str"');
                    updateNetworkSsidSplashSettings_parameters.networkId = updateNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsidSplashSettings_nodeParamType is not "str"')
                    updateNetworkSsidSplashSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSsidSplashSettings_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                updateNetworkSsidSplashSettings_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsidSplashSettings_nodeParamType === 'str') {
                    console.log('updateNetworkSsidSplashSettings_nodeParamType is "str"');
                    updateNetworkSsidSplashSettings_parameters.number = updateNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsidSplashSettings_nodeParamType is not "str"')
                    updateNetworkSsidSplashSettings_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                
                updateNetworkSsidSplashSettings_nodeParam = storedParamValsMap['updateNetworkSsidSplashSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsidSplashSettings");

                updateNetworkSsidSplashSettings_nodeParamType = storedParamTypeMap['updateNetworkSsidSplashSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsidSplashSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSsidSplashSettings(updateNetworkSsidSplashSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSsidTrafficShaping') {
                var updateNetworkSsidTrafficShaping_parameters = [];
                var updateNetworkSsidTrafficShaping_nodeParam;
                var updateNetworkSsidTrafficShaping_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSsidTrafficShaping_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSsidTrafficShaping_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsidTrafficShaping_nodeParamType === 'str') {
                    console.log('updateNetworkSsidTrafficShaping_nodeParamType is "str"');
                    updateNetworkSsidTrafficShaping_parameters.networkId = updateNetworkSsidTrafficShaping_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsidTrafficShaping_nodeParamType is not "str"')
                    updateNetworkSsidTrafficShaping_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSsidTrafficShaping_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                updateNetworkSsidTrafficShaping_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSsidTrafficShaping_nodeParamType === 'str') {
                    console.log('updateNetworkSsidTrafficShaping_nodeParamType is "str"');
                    updateNetworkSsidTrafficShaping_parameters.number = updateNetworkSsidTrafficShaping_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSsidTrafficShaping_nodeParamType is not "str"')
                    updateNetworkSsidTrafficShaping_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                
                updateNetworkSsidTrafficShaping_nodeParam = storedParamValsMap['updateNetworkSsidTrafficShaping'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsidTrafficShaping");

                updateNetworkSsidTrafficShaping_nodeParamType = storedParamTypeMap['updateNetworkSsidTrafficShaping'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSsidTrafficShaping");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSsidTrafficShaping_parameters.updateNetworkSsidTrafficShaping = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSsidTrafficShaping(updateNetworkSsidTrafficShaping_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSsidTrafficShaping') {
                var getNetworkSsidTrafficShaping_parameters = [];
                var getNetworkSsidTrafficShaping_nodeParam;
                var getNetworkSsidTrafficShaping_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSsidTrafficShaping_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSsidTrafficShaping_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsidTrafficShaping_nodeParamType === 'str') {
                    console.log('getNetworkSsidTrafficShaping_nodeParamType is "str"');
                    getNetworkSsidTrafficShaping_parameters.networkId = getNetworkSsidTrafficShaping_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsidTrafficShaping_nodeParamType is not "str"')
                    getNetworkSsidTrafficShaping_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSsidTrafficShaping_nodeParam = storedParamValsMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                getNetworkSsidTrafficShaping_nodeParamType = storedParamTypeMap['number'] ||
                    RED.util.getMessageProperty(msg, "number");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSsidTrafficShaping_nodeParamType === 'str') {
                    console.log('getNetworkSsidTrafficShaping_nodeParamType is "str"');
                    getNetworkSsidTrafficShaping_parameters.number = getNetworkSsidTrafficShaping_nodeParam || undefined;
                } else {
                    console.log('getNetworkSsidTrafficShaping_nodeParamType is not "str"')
                    getNetworkSsidTrafficShaping_parameters.number = RED.util.getMessageProperty(msg, "number");
                }
                                result = client.getNetworkSsidTrafficShaping(getNetworkSsidTrafficShaping_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkStaticRoutes') {
                var getNetworkStaticRoutes_parameters = [];
                var getNetworkStaticRoutes_nodeParam;
                var getNetworkStaticRoutes_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkStaticRoutes_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkStaticRoutes_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkStaticRoutes_nodeParamType === 'str') {
                    console.log('getNetworkStaticRoutes_nodeParamType is "str"');
                    getNetworkStaticRoutes_parameters.networkId = getNetworkStaticRoutes_nodeParam || undefined;
                } else {
                    console.log('getNetworkStaticRoutes_nodeParamType is not "str"')
                    getNetworkStaticRoutes_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkStaticRoutes(getNetworkStaticRoutes_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkStaticRoute') {
                var createNetworkStaticRoute_parameters = [];
                var createNetworkStaticRoute_nodeParam;
                var createNetworkStaticRoute_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkStaticRoute_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkStaticRoute_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('createNetworkStaticRoute_nodeParamType is "str"');
                    createNetworkStaticRoute_parameters.networkId = createNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('createNetworkStaticRoute_nodeParamType is not "str"')
                    createNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkStaticRoute_nodeParam = storedParamValsMap['createNetworkStaticRoute'] ||
                    RED.util.getMessageProperty(msg, "createNetworkStaticRoute");

                createNetworkStaticRoute_nodeParamType = storedParamTypeMap['createNetworkStaticRoute'] ||
                    RED.util.getMessageProperty(msg, "createNetworkStaticRoute");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkStaticRoute_parameters.createNetworkStaticRoute = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkStaticRoute(createNetworkStaticRoute_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkStaticRoute') {
                var getNetworkStaticRoute_parameters = [];
                var getNetworkStaticRoute_nodeParam;
                var getNetworkStaticRoute_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkStaticRoute_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkStaticRoute_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('getNetworkStaticRoute_nodeParamType is "str"');
                    getNetworkStaticRoute_parameters.networkId = getNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('getNetworkStaticRoute_nodeParamType is not "str"')
                    getNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkStaticRoute_nodeParam = storedParamValsMap['srId'] ||
                    RED.util.getMessageProperty(msg, "srId");

                getNetworkStaticRoute_nodeParamType = storedParamTypeMap['srId'] ||
                    RED.util.getMessageProperty(msg, "srId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('getNetworkStaticRoute_nodeParamType is "str"');
                    getNetworkStaticRoute_parameters.srId = getNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('getNetworkStaticRoute_nodeParamType is not "str"')
                    getNetworkStaticRoute_parameters.srId = RED.util.getMessageProperty(msg, "srId");
                }
                                result = client.getNetworkStaticRoute(getNetworkStaticRoute_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkStaticRoute') {
                var updateNetworkStaticRoute_parameters = [];
                var updateNetworkStaticRoute_nodeParam;
                var updateNetworkStaticRoute_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkStaticRoute_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkStaticRoute_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('updateNetworkStaticRoute_nodeParamType is "str"');
                    updateNetworkStaticRoute_parameters.networkId = updateNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('updateNetworkStaticRoute_nodeParamType is not "str"')
                    updateNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkStaticRoute_nodeParam = storedParamValsMap['srId'] ||
                    RED.util.getMessageProperty(msg, "srId");

                updateNetworkStaticRoute_nodeParamType = storedParamTypeMap['srId'] ||
                    RED.util.getMessageProperty(msg, "srId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('updateNetworkStaticRoute_nodeParamType is "str"');
                    updateNetworkStaticRoute_parameters.srId = updateNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('updateNetworkStaticRoute_nodeParamType is not "str"')
                    updateNetworkStaticRoute_parameters.srId = RED.util.getMessageProperty(msg, "srId");
                }
                                
                updateNetworkStaticRoute_nodeParam = storedParamValsMap['updateNetworkStaticRoute'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkStaticRoute");

                updateNetworkStaticRoute_nodeParamType = storedParamTypeMap['updateNetworkStaticRoute'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkStaticRoute");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkStaticRoute_parameters.updateNetworkStaticRoute = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkStaticRoute(updateNetworkStaticRoute_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkStaticRoute') {
                var deleteNetworkStaticRoute_parameters = [];
                var deleteNetworkStaticRoute_nodeParam;
                var deleteNetworkStaticRoute_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkStaticRoute_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkStaticRoute_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('deleteNetworkStaticRoute_nodeParamType is "str"');
                    deleteNetworkStaticRoute_parameters.networkId = deleteNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkStaticRoute_nodeParamType is not "str"')
                    deleteNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkStaticRoute_nodeParam = storedParamValsMap['srId'] ||
                    RED.util.getMessageProperty(msg, "srId");

                deleteNetworkStaticRoute_nodeParamType = storedParamTypeMap['srId'] ||
                    RED.util.getMessageProperty(msg, "srId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkStaticRoute_nodeParamType === 'str') {
                    console.log('deleteNetworkStaticRoute_nodeParamType is "str"');
                    deleteNetworkStaticRoute_parameters.srId = deleteNetworkStaticRoute_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkStaticRoute_nodeParamType is not "str"')
                    deleteNetworkStaticRoute_parameters.srId = RED.util.getMessageProperty(msg, "srId");
                }
                                result = client.deleteNetworkStaticRoute(deleteNetworkStaticRoute_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'swapNetworkWarmspare') {
                var swapNetworkWarmspare_parameters = [];
                var swapNetworkWarmspare_nodeParam;
                var swapNetworkWarmspare_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                swapNetworkWarmspare_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                swapNetworkWarmspare_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (swapNetworkWarmspare_nodeParamType === 'str') {
                    console.log('swapNetworkWarmspare_nodeParamType is "str"');
                    swapNetworkWarmspare_parameters.networkId = swapNetworkWarmspare_nodeParam || undefined;
                } else {
                    console.log('swapNetworkWarmspare_nodeParamType is not "str"')
                    swapNetworkWarmspare_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.swapNetworkWarmspare(swapNetworkWarmspare_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchPortSchedules') {
                var getNetworkSwitchPortSchedules_parameters = [];
                var getNetworkSwitchPortSchedules_nodeParam;
                var getNetworkSwitchPortSchedules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchPortSchedules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchPortSchedules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchPortSchedules_nodeParamType === 'str') {
                    console.log('getNetworkSwitchPortSchedules_nodeParamType is "str"');
                    getNetworkSwitchPortSchedules_parameters.networkId = getNetworkSwitchPortSchedules_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchPortSchedules_nodeParamType is not "str"')
                    getNetworkSwitchPortSchedules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSwitchPortSchedules(getNetworkSwitchPortSchedules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSwitchPortSchedule') {
                var createNetworkSwitchPortSchedule_parameters = [];
                var createNetworkSwitchPortSchedule_nodeParam;
                var createNetworkSwitchPortSchedule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSwitchPortSchedule_nodeParamType === 'str') {
                    console.log('createNetworkSwitchPortSchedule_nodeParamType is "str"');
                    createNetworkSwitchPortSchedule_parameters.networkId = createNetworkSwitchPortSchedule_nodeParam || undefined;
                } else {
                    console.log('createNetworkSwitchPortSchedule_nodeParamType is not "str"')
                    createNetworkSwitchPortSchedule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['createNetworkSwitchPortSchedule'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSwitchPortSchedule");

                createNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['createNetworkSwitchPortSchedule'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSwitchPortSchedule");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSwitchPortSchedule_parameters.createNetworkSwitchPortSchedule = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSwitchPortSchedule(createNetworkSwitchPortSchedule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSwitchPortSchedule') {
                var deleteNetworkSwitchPortSchedule_parameters = [];
                var deleteNetworkSwitchPortSchedule_nodeParam;
                var deleteNetworkSwitchPortSchedule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSwitchPortSchedule_nodeParamType === 'str') {
                    console.log('deleteNetworkSwitchPortSchedule_nodeParamType is "str"');
                    deleteNetworkSwitchPortSchedule_parameters.networkId = deleteNetworkSwitchPortSchedule_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSwitchPortSchedule_nodeParamType is not "str"')
                    deleteNetworkSwitchPortSchedule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['portScheduleId'] ||
                    RED.util.getMessageProperty(msg, "portScheduleId");

                deleteNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['portScheduleId'] ||
                    RED.util.getMessageProperty(msg, "portScheduleId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSwitchPortSchedule_nodeParamType === 'str') {
                    console.log('deleteNetworkSwitchPortSchedule_nodeParamType is "str"');
                    deleteNetworkSwitchPortSchedule_parameters.portScheduleId = deleteNetworkSwitchPortSchedule_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSwitchPortSchedule_nodeParamType is not "str"')
                    deleteNetworkSwitchPortSchedule_parameters.portScheduleId = RED.util.getMessageProperty(msg, "portScheduleId");
                }
                                result = client.deleteNetworkSwitchPortSchedule(deleteNetworkSwitchPortSchedule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSwitchPortSchedule') {
                var updateNetworkSwitchPortSchedule_parameters = [];
                var updateNetworkSwitchPortSchedule_nodeParam;
                var updateNetworkSwitchPortSchedule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSwitchPortSchedule_nodeParamType === 'str') {
                    console.log('updateNetworkSwitchPortSchedule_nodeParamType is "str"');
                    updateNetworkSwitchPortSchedule_parameters.networkId = updateNetworkSwitchPortSchedule_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSwitchPortSchedule_nodeParamType is not "str"')
                    updateNetworkSwitchPortSchedule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['portScheduleId'] ||
                    RED.util.getMessageProperty(msg, "portScheduleId");

                updateNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['portScheduleId'] ||
                    RED.util.getMessageProperty(msg, "portScheduleId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSwitchPortSchedule_nodeParamType === 'str') {
                    console.log('updateNetworkSwitchPortSchedule_nodeParamType is "str"');
                    updateNetworkSwitchPortSchedule_parameters.portScheduleId = updateNetworkSwitchPortSchedule_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSwitchPortSchedule_nodeParamType is not "str"')
                    updateNetworkSwitchPortSchedule_parameters.portScheduleId = RED.util.getMessageProperty(msg, "portScheduleId");
                }
                                
                updateNetworkSwitchPortSchedule_nodeParam = storedParamValsMap['updateNetworkSwitchPortSchedule'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchPortSchedule");

                updateNetworkSwitchPortSchedule_nodeParamType = storedParamTypeMap['updateNetworkSwitchPortSchedule'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchPortSchedule");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSwitchPortSchedule_parameters.updateNetworkSwitchPortSchedule = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSwitchPortSchedule(updateNetworkSwitchPortSchedule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchSettings') {
                var getNetworkSwitchSettings_parameters = [];
                var getNetworkSwitchSettings_nodeParam;
                var getNetworkSwitchSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchSettings_nodeParamType === 'str') {
                    console.log('getNetworkSwitchSettings_nodeParamType is "str"');
                    getNetworkSwitchSettings_parameters.networkId = getNetworkSwitchSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchSettings_nodeParamType is not "str"')
                    getNetworkSwitchSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSwitchSettings(getNetworkSwitchSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSwitchSettings') {
                var updateNetworkSwitchSettings_parameters = [];
                var updateNetworkSwitchSettings_nodeParam;
                var updateNetworkSwitchSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSwitchSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSwitchSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSwitchSettings_nodeParamType === 'str') {
                    console.log('updateNetworkSwitchSettings_nodeParamType is "str"');
                    updateNetworkSwitchSettings_parameters.networkId = updateNetworkSwitchSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSwitchSettings_nodeParamType is not "str"')
                    updateNetworkSwitchSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSwitchSettings_nodeParam = storedParamValsMap['updateNetworkSwitchSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchSettings");

                updateNetworkSwitchSettings_nodeParamType = storedParamTypeMap['updateNetworkSwitchSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSwitchSettings(updateNetworkSwitchSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchSettingsQosRules') {
                var getNetworkSwitchSettingsQosRules_parameters = [];
                var getNetworkSwitchSettingsQosRules_nodeParam;
                var getNetworkSwitchSettingsQosRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchSettingsQosRules_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchSettingsQosRules_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchSettingsQosRules_nodeParamType === 'str') {
                    console.log('getNetworkSwitchSettingsQosRules_nodeParamType is "str"');
                    getNetworkSwitchSettingsQosRules_parameters.networkId = getNetworkSwitchSettingsQosRules_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchSettingsQosRules_nodeParamType is not "str"')
                    getNetworkSwitchSettingsQosRules_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSwitchSettingsQosRules(getNetworkSwitchSettingsQosRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSwitchSettingsQosRule') {
                var createNetworkSwitchSettingsQosRule_parameters = [];
                var createNetworkSwitchSettingsQosRule_nodeParam;
                var createNetworkSwitchSettingsQosRule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('createNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    createNetworkSwitchSettingsQosRule_parameters.networkId = createNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('createNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    createNetworkSwitchSettingsQosRule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['createNetworkSwitchSettingsQosRule'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSwitchSettingsQosRule");

                createNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['createNetworkSwitchSettingsQosRule'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSwitchSettingsQosRule");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSwitchSettingsQosRule_parameters.createNetworkSwitchSettingsQosRule = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSwitchSettingsQosRule(createNetworkSwitchSettingsQosRule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchSettingsQosRulesOrder') {
                var getNetworkSwitchSettingsQosRulesOrder_parameters = [];
                var getNetworkSwitchSettingsQosRulesOrder_nodeParam;
                var getNetworkSwitchSettingsQosRulesOrder_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchSettingsQosRulesOrder_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchSettingsQosRulesOrder_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchSettingsQosRulesOrder_nodeParamType === 'str') {
                    console.log('getNetworkSwitchSettingsQosRulesOrder_nodeParamType is "str"');
                    getNetworkSwitchSettingsQosRulesOrder_parameters.networkId = getNetworkSwitchSettingsQosRulesOrder_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchSettingsQosRulesOrder_nodeParamType is not "str"')
                    getNetworkSwitchSettingsQosRulesOrder_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSwitchSettingsQosRulesOrder(getNetworkSwitchSettingsQosRulesOrder_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSwitchSettingsQosRulesOrder') {
                var updateNetworkSwitchSettingsQosRulesOrder_parameters = [];
                var updateNetworkSwitchSettingsQosRulesOrder_nodeParam;
                var updateNetworkSwitchSettingsQosRulesOrder_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSwitchSettingsQosRulesOrder_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSwitchSettingsQosRulesOrder_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSwitchSettingsQosRulesOrder_nodeParamType === 'str') {
                    console.log('updateNetworkSwitchSettingsQosRulesOrder_nodeParamType is "str"');
                    updateNetworkSwitchSettingsQosRulesOrder_parameters.networkId = updateNetworkSwitchSettingsQosRulesOrder_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSwitchSettingsQosRulesOrder_nodeParamType is not "str"')
                    updateNetworkSwitchSettingsQosRulesOrder_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSwitchSettingsQosRulesOrder_nodeParam = storedParamValsMap['updateNetworkSwitchSettingsQosRulesOrder'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchSettingsQosRulesOrder");

                updateNetworkSwitchSettingsQosRulesOrder_nodeParamType = storedParamTypeMap['updateNetworkSwitchSettingsQosRulesOrder'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchSettingsQosRulesOrder");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSwitchSettingsQosRulesOrder_parameters.updateNetworkSwitchSettingsQosRulesOrder = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSwitchSettingsQosRulesOrder(updateNetworkSwitchSettingsQosRulesOrder_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchSettingsQosRule') {
                var getNetworkSwitchSettingsQosRule_parameters = [];
                var getNetworkSwitchSettingsQosRule_nodeParam;
                var getNetworkSwitchSettingsQosRule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('getNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    getNetworkSwitchSettingsQosRule_parameters.networkId = getNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    getNetworkSwitchSettingsQosRule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['qosRuleId'] ||
                    RED.util.getMessageProperty(msg, "qosRuleId");

                getNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['qosRuleId'] ||
                    RED.util.getMessageProperty(msg, "qosRuleId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('getNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    getNetworkSwitchSettingsQosRule_parameters.qosRuleId = getNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    getNetworkSwitchSettingsQosRule_parameters.qosRuleId = RED.util.getMessageProperty(msg, "qosRuleId");
                }
                                result = client.getNetworkSwitchSettingsQosRule(getNetworkSwitchSettingsQosRule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSwitchSettingsQosRule') {
                var deleteNetworkSwitchSettingsQosRule_parameters = [];
                var deleteNetworkSwitchSettingsQosRule_nodeParam;
                var deleteNetworkSwitchSettingsQosRule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('deleteNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    deleteNetworkSwitchSettingsQosRule_parameters.networkId = deleteNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    deleteNetworkSwitchSettingsQosRule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['qosRuleId'] ||
                    RED.util.getMessageProperty(msg, "qosRuleId");

                deleteNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['qosRuleId'] ||
                    RED.util.getMessageProperty(msg, "qosRuleId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('deleteNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    deleteNetworkSwitchSettingsQosRule_parameters.qosRuleId = deleteNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    deleteNetworkSwitchSettingsQosRule_parameters.qosRuleId = RED.util.getMessageProperty(msg, "qosRuleId");
                }
                                result = client.deleteNetworkSwitchSettingsQosRule(deleteNetworkSwitchSettingsQosRule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSwitchSettingsQosRule') {
                var updateNetworkSwitchSettingsQosRule_parameters = [];
                var updateNetworkSwitchSettingsQosRule_nodeParam;
                var updateNetworkSwitchSettingsQosRule_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('updateNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    updateNetworkSwitchSettingsQosRule_parameters.networkId = updateNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    updateNetworkSwitchSettingsQosRule_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['qosRuleId'] ||
                    RED.util.getMessageProperty(msg, "qosRuleId");

                updateNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['qosRuleId'] ||
                    RED.util.getMessageProperty(msg, "qosRuleId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSwitchSettingsQosRule_nodeParamType === 'str') {
                    console.log('updateNetworkSwitchSettingsQosRule_nodeParamType is "str"');
                    updateNetworkSwitchSettingsQosRule_parameters.qosRuleId = updateNetworkSwitchSettingsQosRule_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSwitchSettingsQosRule_nodeParamType is not "str"')
                    updateNetworkSwitchSettingsQosRule_parameters.qosRuleId = RED.util.getMessageProperty(msg, "qosRuleId");
                }
                                
                updateNetworkSwitchSettingsQosRule_nodeParam = storedParamValsMap['updateNetworkSwitchSettingsQosRule'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchSettingsQosRule");

                updateNetworkSwitchSettingsQosRule_nodeParamType = storedParamTypeMap['updateNetworkSwitchSettingsQosRule'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSwitchSettingsQosRule");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSwitchSettingsQosRule_parameters.updateNetworkSwitchSettingsQosRule = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSwitchSettingsQosRule(updateNetworkSwitchSettingsQosRule_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchStacks') {
                var getNetworkSwitchStacks_parameters = [];
                var getNetworkSwitchStacks_nodeParam;
                var getNetworkSwitchStacks_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchStacks_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchStacks_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchStacks_nodeParamType === 'str') {
                    console.log('getNetworkSwitchStacks_nodeParamType is "str"');
                    getNetworkSwitchStacks_parameters.networkId = getNetworkSwitchStacks_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchStacks_nodeParamType is not "str"')
                    getNetworkSwitchStacks_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSwitchStacks(getNetworkSwitchStacks_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkSwitchStack') {
                var createNetworkSwitchStack_parameters = [];
                var createNetworkSwitchStack_nodeParam;
                var createNetworkSwitchStack_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkSwitchStack_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkSwitchStack_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('createNetworkSwitchStack_nodeParamType is "str"');
                    createNetworkSwitchStack_parameters.networkId = createNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('createNetworkSwitchStack_nodeParamType is not "str"')
                    createNetworkSwitchStack_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkSwitchStack_nodeParam = storedParamValsMap['createNetworkSwitchStack'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSwitchStack");

                createNetworkSwitchStack_nodeParamType = storedParamTypeMap['createNetworkSwitchStack'] ||
                    RED.util.getMessageProperty(msg, "createNetworkSwitchStack");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkSwitchStack_parameters.createNetworkSwitchStack = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkSwitchStack(createNetworkSwitchStack_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchStack') {
                var getNetworkSwitchStack_parameters = [];
                var getNetworkSwitchStack_nodeParam;
                var getNetworkSwitchStack_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSwitchStack_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSwitchStack_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('getNetworkSwitchStack_nodeParamType is "str"');
                    getNetworkSwitchStack_parameters.networkId = getNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchStack_nodeParamType is not "str"')
                    getNetworkSwitchStack_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSwitchStack_nodeParam = storedParamValsMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                getNetworkSwitchStack_nodeParamType = storedParamTypeMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('getNetworkSwitchStack_nodeParamType is "str"');
                    getNetworkSwitchStack_parameters.switchStackId = getNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('getNetworkSwitchStack_nodeParamType is not "str"')
                    getNetworkSwitchStack_parameters.switchStackId = RED.util.getMessageProperty(msg, "switchStackId");
                }
                                result = client.getNetworkSwitchStack(getNetworkSwitchStack_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkSwitchStack') {
                var deleteNetworkSwitchStack_parameters = [];
                var deleteNetworkSwitchStack_nodeParam;
                var deleteNetworkSwitchStack_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkSwitchStack_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkSwitchStack_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('deleteNetworkSwitchStack_nodeParamType is "str"');
                    deleteNetworkSwitchStack_parameters.networkId = deleteNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSwitchStack_nodeParamType is not "str"')
                    deleteNetworkSwitchStack_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkSwitchStack_nodeParam = storedParamValsMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                deleteNetworkSwitchStack_nodeParamType = storedParamTypeMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('deleteNetworkSwitchStack_nodeParamType is "str"');
                    deleteNetworkSwitchStack_parameters.switchStackId = deleteNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkSwitchStack_nodeParamType is not "str"')
                    deleteNetworkSwitchStack_parameters.switchStackId = RED.util.getMessageProperty(msg, "switchStackId");
                }
                                result = client.deleteNetworkSwitchStack(deleteNetworkSwitchStack_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'addNetworkSwitchStack') {
                var addNetworkSwitchStack_parameters = [];
                var addNetworkSwitchStack_nodeParam;
                var addNetworkSwitchStack_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                addNetworkSwitchStack_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                addNetworkSwitchStack_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (addNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('addNetworkSwitchStack_nodeParamType is "str"');
                    addNetworkSwitchStack_parameters.networkId = addNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('addNetworkSwitchStack_nodeParamType is not "str"')
                    addNetworkSwitchStack_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                addNetworkSwitchStack_nodeParam = storedParamValsMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                addNetworkSwitchStack_nodeParamType = storedParamTypeMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                // Check if its the body param

                // notBodyParam                                            
                if (addNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('addNetworkSwitchStack_nodeParamType is "str"');
                    addNetworkSwitchStack_parameters.switchStackId = addNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('addNetworkSwitchStack_nodeParamType is not "str"')
                    addNetworkSwitchStack_parameters.switchStackId = RED.util.getMessageProperty(msg, "switchStackId");
                }
                                
                addNetworkSwitchStack_nodeParam = storedParamValsMap['addNetworkSwitchStack'] ||
                    RED.util.getMessageProperty(msg, "addNetworkSwitchStack");

                addNetworkSwitchStack_nodeParamType = storedParamTypeMap['addNetworkSwitchStack'] ||
                    RED.util.getMessageProperty(msg, "addNetworkSwitchStack");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    addNetworkSwitchStack_parameters.addNetworkSwitchStack = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.addNetworkSwitchStack(addNetworkSwitchStack_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'removeNetworkSwitchStack') {
                var removeNetworkSwitchStack_parameters = [];
                var removeNetworkSwitchStack_nodeParam;
                var removeNetworkSwitchStack_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                removeNetworkSwitchStack_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                removeNetworkSwitchStack_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (removeNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('removeNetworkSwitchStack_nodeParamType is "str"');
                    removeNetworkSwitchStack_parameters.networkId = removeNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('removeNetworkSwitchStack_nodeParamType is not "str"')
                    removeNetworkSwitchStack_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                removeNetworkSwitchStack_nodeParam = storedParamValsMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                removeNetworkSwitchStack_nodeParamType = storedParamTypeMap['switchStackId'] ||
                    RED.util.getMessageProperty(msg, "switchStackId");

                // Check if its the body param

                // notBodyParam                                            
                if (removeNetworkSwitchStack_nodeParamType === 'str') {
                    console.log('removeNetworkSwitchStack_nodeParamType is "str"');
                    removeNetworkSwitchStack_parameters.switchStackId = removeNetworkSwitchStack_nodeParam || undefined;
                } else {
                    console.log('removeNetworkSwitchStack_nodeParamType is not "str"')
                    removeNetworkSwitchStack_parameters.switchStackId = RED.util.getMessageProperty(msg, "switchStackId");
                }
                                
                removeNetworkSwitchStack_nodeParam = storedParamValsMap['removeNetworkSwitchStack'] ||
                    RED.util.getMessageProperty(msg, "removeNetworkSwitchStack");

                removeNetworkSwitchStack_nodeParamType = storedParamTypeMap['removeNetworkSwitchStack'] ||
                    RED.util.getMessageProperty(msg, "removeNetworkSwitchStack");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    removeNetworkSwitchStack_parameters.removeNetworkSwitchStack = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.removeNetworkSwitchStack(removeNetworkSwitchStack_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSyslogServers') {
                var getNetworkSyslogServers_parameters = [];
                var getNetworkSyslogServers_nodeParam;
                var getNetworkSyslogServers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSyslogServers_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSyslogServers_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSyslogServers_nodeParamType === 'str') {
                    console.log('getNetworkSyslogServers_nodeParamType is "str"');
                    getNetworkSyslogServers_parameters.networkId = getNetworkSyslogServers_nodeParam || undefined;
                } else {
                    console.log('getNetworkSyslogServers_nodeParamType is not "str"')
                    getNetworkSyslogServers_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkSyslogServers(getNetworkSyslogServers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkSyslogServers') {
                var updateNetworkSyslogServers_parameters = [];
                var updateNetworkSyslogServers_nodeParam;
                var updateNetworkSyslogServers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkSyslogServers_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkSyslogServers_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkSyslogServers_nodeParamType === 'str') {
                    console.log('updateNetworkSyslogServers_nodeParamType is "str"');
                    updateNetworkSyslogServers_parameters.networkId = updateNetworkSyslogServers_nodeParam || undefined;
                } else {
                    console.log('updateNetworkSyslogServers_nodeParamType is not "str"')
                    updateNetworkSyslogServers_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkSyslogServers_nodeParam = storedParamValsMap['updateNetworkSyslogServers'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSyslogServers");

                updateNetworkSyslogServers_nodeParamType = storedParamTypeMap['updateNetworkSyslogServers'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkSyslogServers");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkSyslogServers_parameters.updateNetworkSyslogServers = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkSyslogServers(updateNetworkSyslogServers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkTraffic') {
                var getNetworkTraffic_parameters = [];
                var getNetworkTraffic_nodeParam;
                var getNetworkTraffic_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkTraffic_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkTraffic_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTraffic_nodeParamType === 'str') {
                    console.log('getNetworkTraffic_nodeParamType is "str"');
                    getNetworkTraffic_parameters.networkId = getNetworkTraffic_nodeParam || undefined;
                } else {
                    console.log('getNetworkTraffic_nodeParamType is not "str"')
                    getNetworkTraffic_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkTraffic_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getNetworkTraffic_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTraffic_nodeParamType === 'str') {
                    console.log('getNetworkTraffic_nodeParamType is "str"');
                    getNetworkTraffic_parameters.t0 = getNetworkTraffic_nodeParam || undefined;
                } else {
                    console.log('getNetworkTraffic_nodeParamType is not "str"')
                    getNetworkTraffic_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getNetworkTraffic_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getNetworkTraffic_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTraffic_nodeParamType === 'str') {
                    console.log('getNetworkTraffic_nodeParamType is "str"');
                    getNetworkTraffic_parameters.timespan = getNetworkTraffic_nodeParam || undefined;
                } else {
                    console.log('getNetworkTraffic_nodeParamType is not "str"')
                    getNetworkTraffic_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getNetworkTraffic_nodeParam = storedParamValsMap['deviceType'] ||
                    RED.util.getMessageProperty(msg, "deviceType");

                getNetworkTraffic_nodeParamType = storedParamTypeMap['deviceType'] ||
                    RED.util.getMessageProperty(msg, "deviceType");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTraffic_nodeParamType === 'str') {
                    console.log('getNetworkTraffic_nodeParamType is "str"');
                    getNetworkTraffic_parameters.deviceType = getNetworkTraffic_nodeParam || undefined;
                } else {
                    console.log('getNetworkTraffic_nodeParamType is not "str"')
                    getNetworkTraffic_parameters.deviceType = RED.util.getMessageProperty(msg, "deviceType");
                }
                                result = client.getNetworkTraffic(getNetworkTraffic_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkTrafficAnalysisSettings') {
                var getNetworkTrafficAnalysisSettings_parameters = [];
                var getNetworkTrafficAnalysisSettings_nodeParam;
                var getNetworkTrafficAnalysisSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkTrafficAnalysisSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkTrafficAnalysisSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTrafficAnalysisSettings_nodeParamType === 'str') {
                    console.log('getNetworkTrafficAnalysisSettings_nodeParamType is "str"');
                    getNetworkTrafficAnalysisSettings_parameters.networkId = getNetworkTrafficAnalysisSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkTrafficAnalysisSettings_nodeParamType is not "str"')
                    getNetworkTrafficAnalysisSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkTrafficAnalysisSettings(getNetworkTrafficAnalysisSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkTrafficAnalysisSettings') {
                var updateNetworkTrafficAnalysisSettings_parameters = [];
                var updateNetworkTrafficAnalysisSettings_nodeParam;
                var updateNetworkTrafficAnalysisSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkTrafficAnalysisSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkTrafficAnalysisSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkTrafficAnalysisSettings_nodeParamType === 'str') {
                    console.log('updateNetworkTrafficAnalysisSettings_nodeParamType is "str"');
                    updateNetworkTrafficAnalysisSettings_parameters.networkId = updateNetworkTrafficAnalysisSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkTrafficAnalysisSettings_nodeParamType is not "str"')
                    updateNetworkTrafficAnalysisSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkTrafficAnalysisSettings_nodeParam = storedParamValsMap['updateNetworkTrafficAnalysisSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkTrafficAnalysisSettings");

                updateNetworkTrafficAnalysisSettings_nodeParamType = storedParamTypeMap['updateNetworkTrafficAnalysisSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkTrafficAnalysisSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkTrafficAnalysisSettings_parameters.updateNetworkTrafficAnalysisSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkTrafficAnalysisSettings(updateNetworkTrafficAnalysisSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkTrafficShaping') {
                var updateNetworkTrafficShaping_parameters = [];
                var updateNetworkTrafficShaping_nodeParam;
                var updateNetworkTrafficShaping_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkTrafficShaping_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkTrafficShaping_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkTrafficShaping_nodeParamType === 'str') {
                    console.log('updateNetworkTrafficShaping_nodeParamType is "str"');
                    updateNetworkTrafficShaping_parameters.networkId = updateNetworkTrafficShaping_nodeParam || undefined;
                } else {
                    console.log('updateNetworkTrafficShaping_nodeParamType is not "str"')
                    updateNetworkTrafficShaping_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkTrafficShaping_nodeParam = storedParamValsMap['updateNetworkTrafficShaping'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkTrafficShaping");

                updateNetworkTrafficShaping_nodeParamType = storedParamTypeMap['updateNetworkTrafficShaping'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkTrafficShaping");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkTrafficShaping_parameters.updateNetworkTrafficShaping = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkTrafficShaping(updateNetworkTrafficShaping_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkTrafficShaping') {
                var getNetworkTrafficShaping_parameters = [];
                var getNetworkTrafficShaping_nodeParam;
                var getNetworkTrafficShaping_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkTrafficShaping_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkTrafficShaping_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTrafficShaping_nodeParamType === 'str') {
                    console.log('getNetworkTrafficShaping_nodeParamType is "str"');
                    getNetworkTrafficShaping_parameters.networkId = getNetworkTrafficShaping_nodeParam || undefined;
                } else {
                    console.log('getNetworkTrafficShaping_nodeParamType is not "str"')
                    getNetworkTrafficShaping_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkTrafficShaping(getNetworkTrafficShaping_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkTrafficShapingApplicationCategories') {
                var getNetworkTrafficShapingApplicationCategories_parameters = [];
                var getNetworkTrafficShapingApplicationCategories_nodeParam;
                var getNetworkTrafficShapingApplicationCategories_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkTrafficShapingApplicationCategories_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkTrafficShapingApplicationCategories_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTrafficShapingApplicationCategories_nodeParamType === 'str') {
                    console.log('getNetworkTrafficShapingApplicationCategories_nodeParamType is "str"');
                    getNetworkTrafficShapingApplicationCategories_parameters.networkId = getNetworkTrafficShapingApplicationCategories_nodeParam || undefined;
                } else {
                    console.log('getNetworkTrafficShapingApplicationCategories_nodeParamType is not "str"')
                    getNetworkTrafficShapingApplicationCategories_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkTrafficShapingApplicationCategories(getNetworkTrafficShapingApplicationCategories_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkTrafficShapingDscpTaggingOptions') {
                var getNetworkTrafficShapingDscpTaggingOptions_parameters = [];
                var getNetworkTrafficShapingDscpTaggingOptions_nodeParam;
                var getNetworkTrafficShapingDscpTaggingOptions_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkTrafficShapingDscpTaggingOptions_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkTrafficShapingDscpTaggingOptions_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkTrafficShapingDscpTaggingOptions_nodeParamType === 'str') {
                    console.log('getNetworkTrafficShapingDscpTaggingOptions_nodeParamType is "str"');
                    getNetworkTrafficShapingDscpTaggingOptions_parameters.networkId = getNetworkTrafficShapingDscpTaggingOptions_nodeParam || undefined;
                } else {
                    console.log('getNetworkTrafficShapingDscpTaggingOptions_nodeParamType is not "str"')
                    getNetworkTrafficShapingDscpTaggingOptions_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkTrafficShapingDscpTaggingOptions(getNetworkTrafficShapingDscpTaggingOptions_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'unbindNetwork') {
                var unbindNetwork_parameters = [];
                var unbindNetwork_nodeParam;
                var unbindNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                unbindNetwork_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                unbindNetwork_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (unbindNetwork_nodeParamType === 'str') {
                    console.log('unbindNetwork_nodeParamType is "str"');
                    unbindNetwork_parameters.networkId = unbindNetwork_nodeParam || undefined;
                } else {
                    console.log('unbindNetwork_nodeParamType is not "str"')
                    unbindNetwork_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.unbindNetwork(unbindNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkUplinkSettings') {
                var getNetworkUplinkSettings_parameters = [];
                var getNetworkUplinkSettings_nodeParam;
                var getNetworkUplinkSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkUplinkSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkUplinkSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkUplinkSettings_nodeParamType === 'str') {
                    console.log('getNetworkUplinkSettings_nodeParamType is "str"');
                    getNetworkUplinkSettings_parameters.networkId = getNetworkUplinkSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkUplinkSettings_nodeParamType is not "str"')
                    getNetworkUplinkSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkUplinkSettings(getNetworkUplinkSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkUplinkSettings') {
                var updateNetworkUplinkSettings_parameters = [];
                var updateNetworkUplinkSettings_nodeParam;
                var updateNetworkUplinkSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkUplinkSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkUplinkSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkUplinkSettings_nodeParamType === 'str') {
                    console.log('updateNetworkUplinkSettings_nodeParamType is "str"');
                    updateNetworkUplinkSettings_parameters.networkId = updateNetworkUplinkSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkUplinkSettings_nodeParamType is not "str"')
                    updateNetworkUplinkSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkUplinkSettings_nodeParam = storedParamValsMap['updateNetworkUplinkSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkUplinkSettings");

                updateNetworkUplinkSettings_nodeParamType = storedParamTypeMap['updateNetworkUplinkSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkUplinkSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkUplinkSettings(updateNetworkUplinkSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkVlans') {
                var getNetworkVlans_parameters = [];
                var getNetworkVlans_nodeParam;
                var getNetworkVlans_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkVlans_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkVlans_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkVlans_nodeParamType === 'str') {
                    console.log('getNetworkVlans_nodeParamType is "str"');
                    getNetworkVlans_parameters.networkId = getNetworkVlans_nodeParam || undefined;
                } else {
                    console.log('getNetworkVlans_nodeParamType is not "str"')
                    getNetworkVlans_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkVlans(getNetworkVlans_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkVlan') {
                var createNetworkVlan_parameters = [];
                var createNetworkVlan_nodeParam;
                var createNetworkVlan_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkVlan_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkVlan_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkVlan_nodeParamType === 'str') {
                    console.log('createNetworkVlan_nodeParamType is "str"');
                    createNetworkVlan_parameters.networkId = createNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('createNetworkVlan_nodeParamType is not "str"')
                    createNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkVlan_nodeParam = storedParamValsMap['createNetworkVlan'] ||
                    RED.util.getMessageProperty(msg, "createNetworkVlan");

                createNetworkVlan_nodeParamType = storedParamTypeMap['createNetworkVlan'] ||
                    RED.util.getMessageProperty(msg, "createNetworkVlan");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkVlan_parameters.createNetworkVlan = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkVlan(createNetworkVlan_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkVlan') {
                var getNetworkVlan_parameters = [];
                var getNetworkVlan_nodeParam;
                var getNetworkVlan_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkVlan_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkVlan_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkVlan_nodeParamType === 'str') {
                    console.log('getNetworkVlan_nodeParamType is "str"');
                    getNetworkVlan_parameters.networkId = getNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('getNetworkVlan_nodeParamType is not "str"')
                    getNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkVlan_nodeParam = storedParamValsMap['vlanId'] ||
                    RED.util.getMessageProperty(msg, "vlanId");

                getNetworkVlan_nodeParamType = storedParamTypeMap['vlanId'] ||
                    RED.util.getMessageProperty(msg, "vlanId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkVlan_nodeParamType === 'str') {
                    console.log('getNetworkVlan_nodeParamType is "str"');
                    getNetworkVlan_parameters.vlanId = getNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('getNetworkVlan_nodeParamType is not "str"')
                    getNetworkVlan_parameters.vlanId = RED.util.getMessageProperty(msg, "vlanId");
                }
                                result = client.getNetworkVlan(getNetworkVlan_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkVlan') {
                var updateNetworkVlan_parameters = [];
                var updateNetworkVlan_nodeParam;
                var updateNetworkVlan_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkVlan_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkVlan_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkVlan_nodeParamType === 'str') {
                    console.log('updateNetworkVlan_nodeParamType is "str"');
                    updateNetworkVlan_parameters.networkId = updateNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('updateNetworkVlan_nodeParamType is not "str"')
                    updateNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkVlan_nodeParam = storedParamValsMap['vlanId'] ||
                    RED.util.getMessageProperty(msg, "vlanId");

                updateNetworkVlan_nodeParamType = storedParamTypeMap['vlanId'] ||
                    RED.util.getMessageProperty(msg, "vlanId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkVlan_nodeParamType === 'str') {
                    console.log('updateNetworkVlan_nodeParamType is "str"');
                    updateNetworkVlan_parameters.vlanId = updateNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('updateNetworkVlan_nodeParamType is not "str"')
                    updateNetworkVlan_parameters.vlanId = RED.util.getMessageProperty(msg, "vlanId");
                }
                                
                updateNetworkVlan_nodeParam = storedParamValsMap['updateNetworkVlan'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkVlan");

                updateNetworkVlan_nodeParamType = storedParamTypeMap['updateNetworkVlan'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkVlan");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkVlan_parameters.updateNetworkVlan = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkVlan(updateNetworkVlan_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkVlan') {
                var deleteNetworkVlan_parameters = [];
                var deleteNetworkVlan_nodeParam;
                var deleteNetworkVlan_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkVlan_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkVlan_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkVlan_nodeParamType === 'str') {
                    console.log('deleteNetworkVlan_nodeParamType is "str"');
                    deleteNetworkVlan_parameters.networkId = deleteNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkVlan_nodeParamType is not "str"')
                    deleteNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkVlan_nodeParam = storedParamValsMap['vlanId'] ||
                    RED.util.getMessageProperty(msg, "vlanId");

                deleteNetworkVlan_nodeParamType = storedParamTypeMap['vlanId'] ||
                    RED.util.getMessageProperty(msg, "vlanId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkVlan_nodeParamType === 'str') {
                    console.log('deleteNetworkVlan_nodeParamType is "str"');
                    deleteNetworkVlan_parameters.vlanId = deleteNetworkVlan_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkVlan_nodeParamType is not "str"')
                    deleteNetworkVlan_parameters.vlanId = RED.util.getMessageProperty(msg, "vlanId");
                }
                                result = client.deleteNetworkVlan(deleteNetworkVlan_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkVlansEnabledState') {
                var getNetworkVlansEnabledState_parameters = [];
                var getNetworkVlansEnabledState_nodeParam;
                var getNetworkVlansEnabledState_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkVlansEnabledState_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkVlansEnabledState_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkVlansEnabledState_nodeParamType === 'str') {
                    console.log('getNetworkVlansEnabledState_nodeParamType is "str"');
                    getNetworkVlansEnabledState_parameters.networkId = getNetworkVlansEnabledState_nodeParam || undefined;
                } else {
                    console.log('getNetworkVlansEnabledState_nodeParamType is not "str"')
                    getNetworkVlansEnabledState_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkVlansEnabledState(getNetworkVlansEnabledState_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkVlansEnabledState') {
                var updateNetworkVlansEnabledState_parameters = [];
                var updateNetworkVlansEnabledState_nodeParam;
                var updateNetworkVlansEnabledState_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkVlansEnabledState_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkVlansEnabledState_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkVlansEnabledState_nodeParamType === 'str') {
                    console.log('updateNetworkVlansEnabledState_nodeParamType is "str"');
                    updateNetworkVlansEnabledState_parameters.networkId = updateNetworkVlansEnabledState_nodeParam || undefined;
                } else {
                    console.log('updateNetworkVlansEnabledState_nodeParamType is not "str"')
                    updateNetworkVlansEnabledState_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkVlansEnabledState_nodeParam = storedParamValsMap['updateNetworkVlansEnabledState'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkVlansEnabledState");

                updateNetworkVlansEnabledState_nodeParamType = storedParamTypeMap['updateNetworkVlansEnabledState'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkVlansEnabledState");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkVlansEnabledState(updateNetworkVlansEnabledState_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkWarmSpareSettings') {
                var getNetworkWarmSpareSettings_parameters = [];
                var getNetworkWarmSpareSettings_nodeParam;
                var getNetworkWarmSpareSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkWarmSpareSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkWarmSpareSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkWarmSpareSettings_nodeParamType === 'str') {
                    console.log('getNetworkWarmSpareSettings_nodeParamType is "str"');
                    getNetworkWarmSpareSettings_parameters.networkId = getNetworkWarmSpareSettings_nodeParam || undefined;
                } else {
                    console.log('getNetworkWarmSpareSettings_nodeParamType is not "str"')
                    getNetworkWarmSpareSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                result = client.getNetworkWarmSpareSettings(getNetworkWarmSpareSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkWarmSpareSettings') {
                var updateNetworkWarmSpareSettings_parameters = [];
                var updateNetworkWarmSpareSettings_nodeParam;
                var updateNetworkWarmSpareSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkWarmSpareSettings_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkWarmSpareSettings_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkWarmSpareSettings_nodeParamType === 'str') {
                    console.log('updateNetworkWarmSpareSettings_nodeParamType is "str"');
                    updateNetworkWarmSpareSettings_parameters.networkId = updateNetworkWarmSpareSettings_nodeParam || undefined;
                } else {
                    console.log('updateNetworkWarmSpareSettings_nodeParamType is not "str"')
                    updateNetworkWarmSpareSettings_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkWarmSpareSettings_nodeParam = storedParamValsMap['updateNetworkWarmSpareSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkWarmSpareSettings");

                updateNetworkWarmSpareSettings_nodeParamType = storedParamTypeMap['updateNetworkWarmSpareSettings'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkWarmSpareSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkWarmSpareSettings_parameters.updateNetworkWarmSpareSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkWarmSpareSettings(updateNetworkWarmSpareSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkWirelessRfProfiles') {
                var getNetworkWirelessRfProfiles_parameters = [];
                var getNetworkWirelessRfProfiles_nodeParam;
                var getNetworkWirelessRfProfiles_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkWirelessRfProfiles_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkWirelessRfProfiles_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkWirelessRfProfiles_nodeParamType === 'str') {
                    console.log('getNetworkWirelessRfProfiles_nodeParamType is "str"');
                    getNetworkWirelessRfProfiles_parameters.networkId = getNetworkWirelessRfProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkWirelessRfProfiles_nodeParamType is not "str"')
                    getNetworkWirelessRfProfiles_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkWirelessRfProfiles_nodeParam = storedParamValsMap['includeTemplateProfiles'] ||
                    RED.util.getMessageProperty(msg, "includeTemplateProfiles");

                getNetworkWirelessRfProfiles_nodeParamType = storedParamTypeMap['includeTemplateProfiles'] ||
                    RED.util.getMessageProperty(msg, "includeTemplateProfiles");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkWirelessRfProfiles_nodeParamType === 'str') {
                    console.log('getNetworkWirelessRfProfiles_nodeParamType is "str"');
                    getNetworkWirelessRfProfiles_parameters.includeTemplateProfiles = getNetworkWirelessRfProfiles_nodeParam || undefined;
                } else {
                    console.log('getNetworkWirelessRfProfiles_nodeParamType is not "str"')
                    getNetworkWirelessRfProfiles_parameters.includeTemplateProfiles = RED.util.getMessageProperty(msg, "includeTemplateProfiles");
                }
                                result = client.getNetworkWirelessRfProfiles(getNetworkWirelessRfProfiles_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createNetworkWirelessRfProfile') {
                var createNetworkWirelessRfProfile_parameters = [];
                var createNetworkWirelessRfProfile_nodeParam;
                var createNetworkWirelessRfProfile_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createNetworkWirelessRfProfile_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                createNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (createNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('createNetworkWirelessRfProfile_nodeParamType is "str"');
                    createNetworkWirelessRfProfile_parameters.networkId = createNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('createNetworkWirelessRfProfile_nodeParamType is not "str"')
                    createNetworkWirelessRfProfile_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                createNetworkWirelessRfProfile_nodeParam = storedParamValsMap['createNetworkWirelessRfProfile'] ||
                    RED.util.getMessageProperty(msg, "createNetworkWirelessRfProfile");

                createNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['createNetworkWirelessRfProfile'] ||
                    RED.util.getMessageProperty(msg, "createNetworkWirelessRfProfile");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createNetworkWirelessRfProfile_parameters.createNetworkWirelessRfProfile = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createNetworkWirelessRfProfile(createNetworkWirelessRfProfile_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateNetworkWirelessRfProfile') {
                var updateNetworkWirelessRfProfile_parameters = [];
                var updateNetworkWirelessRfProfile_nodeParam;
                var updateNetworkWirelessRfProfile_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateNetworkWirelessRfProfile_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                updateNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('updateNetworkWirelessRfProfile_nodeParamType is "str"');
                    updateNetworkWirelessRfProfile_parameters.networkId = updateNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('updateNetworkWirelessRfProfile_nodeParamType is not "str"')
                    updateNetworkWirelessRfProfile_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                updateNetworkWirelessRfProfile_nodeParam = storedParamValsMap['rfProfileId'] ||
                    RED.util.getMessageProperty(msg, "rfProfileId");

                updateNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['rfProfileId'] ||
                    RED.util.getMessageProperty(msg, "rfProfileId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('updateNetworkWirelessRfProfile_nodeParamType is "str"');
                    updateNetworkWirelessRfProfile_parameters.rfProfileId = updateNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('updateNetworkWirelessRfProfile_nodeParamType is not "str"')
                    updateNetworkWirelessRfProfile_parameters.rfProfileId = RED.util.getMessageProperty(msg, "rfProfileId");
                }
                                
                updateNetworkWirelessRfProfile_nodeParam = storedParamValsMap['updateNetworkWirelessRfProfile'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkWirelessRfProfile");

                updateNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['updateNetworkWirelessRfProfile'] ||
                    RED.util.getMessageProperty(msg, "updateNetworkWirelessRfProfile");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateNetworkWirelessRfProfile_parameters.updateNetworkWirelessRfProfile = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateNetworkWirelessRfProfile(updateNetworkWirelessRfProfile_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteNetworkWirelessRfProfile') {
                var deleteNetworkWirelessRfProfile_parameters = [];
                var deleteNetworkWirelessRfProfile_nodeParam;
                var deleteNetworkWirelessRfProfile_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteNetworkWirelessRfProfile_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                deleteNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('deleteNetworkWirelessRfProfile_nodeParamType is "str"');
                    deleteNetworkWirelessRfProfile_parameters.networkId = deleteNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkWirelessRfProfile_nodeParamType is not "str"')
                    deleteNetworkWirelessRfProfile_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                deleteNetworkWirelessRfProfile_nodeParam = storedParamValsMap['rfProfileId'] ||
                    RED.util.getMessageProperty(msg, "rfProfileId");

                deleteNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['rfProfileId'] ||
                    RED.util.getMessageProperty(msg, "rfProfileId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('deleteNetworkWirelessRfProfile_nodeParamType is "str"');
                    deleteNetworkWirelessRfProfile_parameters.rfProfileId = deleteNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('deleteNetworkWirelessRfProfile_nodeParamType is not "str"')
                    deleteNetworkWirelessRfProfile_parameters.rfProfileId = RED.util.getMessageProperty(msg, "rfProfileId");
                }
                                result = client.deleteNetworkWirelessRfProfile(deleteNetworkWirelessRfProfile_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkWirelessRfProfile') {
                var getNetworkWirelessRfProfile_parameters = [];
                var getNetworkWirelessRfProfile_nodeParam;
                var getNetworkWirelessRfProfile_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkWirelessRfProfile_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('getNetworkWirelessRfProfile_nodeParamType is "str"');
                    getNetworkWirelessRfProfile_parameters.networkId = getNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('getNetworkWirelessRfProfile_nodeParamType is not "str"')
                    getNetworkWirelessRfProfile_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkWirelessRfProfile_nodeParam = storedParamValsMap['rfProfileId'] ||
                    RED.util.getMessageProperty(msg, "rfProfileId");

                getNetworkWirelessRfProfile_nodeParamType = storedParamTypeMap['rfProfileId'] ||
                    RED.util.getMessageProperty(msg, "rfProfileId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkWirelessRfProfile_nodeParamType === 'str') {
                    console.log('getNetworkWirelessRfProfile_nodeParamType is "str"');
                    getNetworkWirelessRfProfile_parameters.rfProfileId = getNetworkWirelessRfProfile_nodeParam || undefined;
                } else {
                    console.log('getNetworkWirelessRfProfile_nodeParamType is not "str"')
                    getNetworkWirelessRfProfile_parameters.rfProfileId = RED.util.getMessageProperty(msg, "rfProfileId");
                }
                                result = client.getNetworkWirelessRfProfile(getNetworkWirelessRfProfile_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'lockNetworkSmDevices') {
                var lockNetworkSmDevices_parameters = [];
                var lockNetworkSmDevices_nodeParam;
                var lockNetworkSmDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                lockNetworkSmDevices_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                lockNetworkSmDevices_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (lockNetworkSmDevices_nodeParamType === 'str') {
                    console.log('lockNetworkSmDevices_nodeParamType is "str"');
                    lockNetworkSmDevices_parameters.networkId = lockNetworkSmDevices_nodeParam || undefined;
                } else {
                    console.log('lockNetworkSmDevices_nodeParamType is not "str"')
                    lockNetworkSmDevices_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                lockNetworkSmDevices_nodeParam = storedParamValsMap['lockNetworkSmDevices'] ||
                    RED.util.getMessageProperty(msg, "lockNetworkSmDevices");

                lockNetworkSmDevices_nodeParamType = storedParamTypeMap['lockNetworkSmDevices'] ||
                    RED.util.getMessageProperty(msg, "lockNetworkSmDevices");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    lockNetworkSmDevices_parameters.lockNetworkSmDevices = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.lockNetworkSmDevices(lockNetworkSmDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmConnectivity') {
                var getNetworkSmConnectivity_parameters = [];
                var getNetworkSmConnectivity_nodeParam;
                var getNetworkSmConnectivity_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmConnectivity_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmConnectivity_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    console.log('getNetworkSmConnectivity_nodeParamType is "str"');
                    getNetworkSmConnectivity_parameters.networkId = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmConnectivity_nodeParamType is not "str"')
                    getNetworkSmConnectivity_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmConnectivity_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getNetworkSmConnectivity_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    console.log('getNetworkSmConnectivity_nodeParamType is "str"');
                    getNetworkSmConnectivity_parameters.id = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmConnectivity_nodeParamType is not "str"')
                    getNetworkSmConnectivity_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                getNetworkSmConnectivity_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkSmConnectivity_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    console.log('getNetworkSmConnectivity_nodeParamType is "str"');
                    getNetworkSmConnectivity_parameters.perPage = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmConnectivity_nodeParamType is not "str"')
                    getNetworkSmConnectivity_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkSmConnectivity_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkSmConnectivity_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    console.log('getNetworkSmConnectivity_nodeParamType is "str"');
                    getNetworkSmConnectivity_parameters.startingAfter = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmConnectivity_nodeParamType is not "str"')
                    getNetworkSmConnectivity_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkSmConnectivity_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkSmConnectivity_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    console.log('getNetworkSmConnectivity_nodeParamType is "str"');
                    getNetworkSmConnectivity_parameters.endingBefore = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmConnectivity_nodeParamType is not "str"')
                    getNetworkSmConnectivity_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkSmConnectivity(getNetworkSmConnectivity_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmDesktopLogs') {
                var getNetworkSmDesktopLogs_parameters = [];
                var getNetworkSmDesktopLogs_nodeParam;
                var getNetworkSmDesktopLogs_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmDesktopLogs_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmDesktopLogs_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is "str"');
                    getNetworkSmDesktopLogs_parameters.networkId = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is not "str"')
                    getNetworkSmDesktopLogs_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmDesktopLogs_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getNetworkSmDesktopLogs_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is "str"');
                    getNetworkSmDesktopLogs_parameters.id = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is not "str"')
                    getNetworkSmDesktopLogs_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                getNetworkSmDesktopLogs_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkSmDesktopLogs_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is "str"');
                    getNetworkSmDesktopLogs_parameters.perPage = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is not "str"')
                    getNetworkSmDesktopLogs_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkSmDesktopLogs_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkSmDesktopLogs_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is "str"');
                    getNetworkSmDesktopLogs_parameters.startingAfter = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is not "str"')
                    getNetworkSmDesktopLogs_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkSmDesktopLogs_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkSmDesktopLogs_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is "str"');
                    getNetworkSmDesktopLogs_parameters.endingBefore = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDesktopLogs_nodeParamType is not "str"')
                    getNetworkSmDesktopLogs_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkSmDesktopLogs(getNetworkSmDesktopLogs_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmDeviceCommandLogs') {
                var getNetworkSmDeviceCommandLogs_parameters = [];
                var getNetworkSmDeviceCommandLogs_nodeParam;
                var getNetworkSmDeviceCommandLogs_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmDeviceCommandLogs_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmDeviceCommandLogs_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is "str"');
                    getNetworkSmDeviceCommandLogs_parameters.networkId = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is not "str"')
                    getNetworkSmDeviceCommandLogs_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmDeviceCommandLogs_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getNetworkSmDeviceCommandLogs_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is "str"');
                    getNetworkSmDeviceCommandLogs_parameters.id = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is not "str"')
                    getNetworkSmDeviceCommandLogs_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                getNetworkSmDeviceCommandLogs_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkSmDeviceCommandLogs_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is "str"');
                    getNetworkSmDeviceCommandLogs_parameters.perPage = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is not "str"')
                    getNetworkSmDeviceCommandLogs_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkSmDeviceCommandLogs_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkSmDeviceCommandLogs_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is "str"');
                    getNetworkSmDeviceCommandLogs_parameters.startingAfter = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is not "str"')
                    getNetworkSmDeviceCommandLogs_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkSmDeviceCommandLogs_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkSmDeviceCommandLogs_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is "str"');
                    getNetworkSmDeviceCommandLogs_parameters.endingBefore = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmDeviceCommandLogs_nodeParamType is not "str"')
                    getNetworkSmDeviceCommandLogs_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkSmDeviceCommandLogs(getNetworkSmDeviceCommandLogs_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getNetworkSmPerformanceHistory') {
                var getNetworkSmPerformanceHistory_parameters = [];
                var getNetworkSmPerformanceHistory_nodeParam;
                var getNetworkSmPerformanceHistory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getNetworkSmPerformanceHistory_nodeParam = storedParamValsMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                getNetworkSmPerformanceHistory_nodeParamType = storedParamTypeMap['networkId'] ||
                    RED.util.getMessageProperty(msg, "networkId");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is "str"');
                    getNetworkSmPerformanceHistory_parameters.networkId = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is not "str"')
                    getNetworkSmPerformanceHistory_parameters.networkId = RED.util.getMessageProperty(msg, "networkId");
                }
                                
                getNetworkSmPerformanceHistory_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getNetworkSmPerformanceHistory_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is "str"');
                    getNetworkSmPerformanceHistory_parameters.id = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is not "str"')
                    getNetworkSmPerformanceHistory_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                getNetworkSmPerformanceHistory_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getNetworkSmPerformanceHistory_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is "str"');
                    getNetworkSmPerformanceHistory_parameters.perPage = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is not "str"')
                    getNetworkSmPerformanceHistory_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getNetworkSmPerformanceHistory_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getNetworkSmPerformanceHistory_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is "str"');
                    getNetworkSmPerformanceHistory_parameters.startingAfter = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is not "str"')
                    getNetworkSmPerformanceHistory_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getNetworkSmPerformanceHistory_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getNetworkSmPerformanceHistory_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is "str"');
                    getNetworkSmPerformanceHistory_parameters.endingBefore = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    console.log('getNetworkSmPerformanceHistory_nodeParamType is not "str"')
                    getNetworkSmPerformanceHistory_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getNetworkSmPerformanceHistory(getNetworkSmPerformanceHistory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizations') {
                var getOrganizations_parameters = [];
                var getOrganizations_nodeParam;
                var getOrganizations_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                result = client.getOrganizations(getOrganizations_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createOrganization') {
                var createOrganization_parameters = [];
                var createOrganization_nodeParam;
                var createOrganization_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createOrganization_nodeParam = storedParamValsMap['createOrganization'] ||
                    RED.util.getMessageProperty(msg, "createOrganization");

                createOrganization_nodeParamType = storedParamTypeMap['createOrganization'] ||
                    RED.util.getMessageProperty(msg, "createOrganization");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createOrganization_parameters.createOrganization = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createOrganization(createOrganization_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganization') {
                var getOrganization_parameters = [];
                var getOrganization_nodeParam;
                var getOrganization_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganization_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganization_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganization_nodeParamType === 'str') {
                    console.log('getOrganization_nodeParamType is "str"');
                    getOrganization_parameters.organizationId = getOrganization_nodeParam || undefined;
                } else {
                    console.log('getOrganization_nodeParamType is not "str"')
                    getOrganization_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganization(getOrganization_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganization') {
                var updateOrganization_parameters = [];
                var updateOrganization_nodeParam;
                var updateOrganization_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganization_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganization_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganization_nodeParamType === 'str') {
                    console.log('updateOrganization_nodeParamType is "str"');
                    updateOrganization_parameters.organizationId = updateOrganization_nodeParam || undefined;
                } else {
                    console.log('updateOrganization_nodeParamType is not "str"')
                    updateOrganization_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganization_nodeParam = storedParamValsMap['updateOrganization'] ||
                    RED.util.getMessageProperty(msg, "updateOrganization");

                updateOrganization_nodeParamType = storedParamTypeMap['updateOrganization'] ||
                    RED.util.getMessageProperty(msg, "updateOrganization");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganization_parameters.updateOrganization = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganization(updateOrganization_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteOrganization') {
                var deleteOrganization_parameters = [];
                var deleteOrganization_nodeParam;
                var deleteOrganization_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteOrganization_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                deleteOrganization_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganization_nodeParamType === 'str') {
                    console.log('deleteOrganization_nodeParamType is "str"');
                    deleteOrganization_parameters.organizationId = deleteOrganization_nodeParam || undefined;
                } else {
                    console.log('deleteOrganization_nodeParamType is not "str"')
                    deleteOrganization_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.deleteOrganization(deleteOrganization_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createOrganizationActionBatch') {
                var createOrganizationActionBatch_parameters = [];
                var createOrganizationActionBatch_nodeParam;
                var createOrganizationActionBatch_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createOrganizationActionBatch_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                createOrganizationActionBatch_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (createOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('createOrganizationActionBatch_nodeParamType is "str"');
                    createOrganizationActionBatch_parameters.organizationId = createOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('createOrganizationActionBatch_nodeParamType is not "str"')
                    createOrganizationActionBatch_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                createOrganizationActionBatch_nodeParam = storedParamValsMap['createOrganizationActionBatch'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationActionBatch");

                createOrganizationActionBatch_nodeParamType = storedParamTypeMap['createOrganizationActionBatch'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationActionBatch");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createOrganizationActionBatch_parameters.createOrganizationActionBatch = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createOrganizationActionBatch(createOrganizationActionBatch_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationActionBatches') {
                var getOrganizationActionBatches_parameters = [];
                var getOrganizationActionBatches_nodeParam;
                var getOrganizationActionBatches_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationActionBatches_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationActionBatches_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationActionBatches_nodeParamType === 'str') {
                    console.log('getOrganizationActionBatches_nodeParamType is "str"');
                    getOrganizationActionBatches_parameters.organizationId = getOrganizationActionBatches_nodeParam || undefined;
                } else {
                    console.log('getOrganizationActionBatches_nodeParamType is not "str"')
                    getOrganizationActionBatches_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationActionBatches(getOrganizationActionBatches_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationActionBatch') {
                var getOrganizationActionBatch_parameters = [];
                var getOrganizationActionBatch_nodeParam;
                var getOrganizationActionBatch_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationActionBatch_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationActionBatch_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('getOrganizationActionBatch_nodeParamType is "str"');
                    getOrganizationActionBatch_parameters.organizationId = getOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('getOrganizationActionBatch_nodeParamType is not "str"')
                    getOrganizationActionBatch_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationActionBatch_nodeParam = storedParamValsMap['actionBatchId'] ||
                    RED.util.getMessageProperty(msg, "actionBatchId");

                getOrganizationActionBatch_nodeParamType = storedParamTypeMap['actionBatchId'] ||
                    RED.util.getMessageProperty(msg, "actionBatchId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('getOrganizationActionBatch_nodeParamType is "str"');
                    getOrganizationActionBatch_parameters.actionBatchId = getOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('getOrganizationActionBatch_nodeParamType is not "str"')
                    getOrganizationActionBatch_parameters.actionBatchId = RED.util.getMessageProperty(msg, "actionBatchId");
                }
                                result = client.getOrganizationActionBatch(getOrganizationActionBatch_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteOrganizationActionBatch') {
                var deleteOrganizationActionBatch_parameters = [];
                var deleteOrganizationActionBatch_nodeParam;
                var deleteOrganizationActionBatch_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteOrganizationActionBatch_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                deleteOrganizationActionBatch_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('deleteOrganizationActionBatch_nodeParamType is "str"');
                    deleteOrganizationActionBatch_parameters.organizationId = deleteOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationActionBatch_nodeParamType is not "str"')
                    deleteOrganizationActionBatch_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                deleteOrganizationActionBatch_nodeParam = storedParamValsMap['actionBatchId'] ||
                    RED.util.getMessageProperty(msg, "actionBatchId");

                deleteOrganizationActionBatch_nodeParamType = storedParamTypeMap['actionBatchId'] ||
                    RED.util.getMessageProperty(msg, "actionBatchId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('deleteOrganizationActionBatch_nodeParamType is "str"');
                    deleteOrganizationActionBatch_parameters.actionBatchId = deleteOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationActionBatch_nodeParamType is not "str"')
                    deleteOrganizationActionBatch_parameters.actionBatchId = RED.util.getMessageProperty(msg, "actionBatchId");
                }
                                result = client.deleteOrganizationActionBatch(deleteOrganizationActionBatch_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationActionBatch') {
                var updateOrganizationActionBatch_parameters = [];
                var updateOrganizationActionBatch_nodeParam;
                var updateOrganizationActionBatch_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationActionBatch_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationActionBatch_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('updateOrganizationActionBatch_nodeParamType is "str"');
                    updateOrganizationActionBatch_parameters.organizationId = updateOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationActionBatch_nodeParamType is not "str"')
                    updateOrganizationActionBatch_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationActionBatch_nodeParam = storedParamValsMap['actionBatchId'] ||
                    RED.util.getMessageProperty(msg, "actionBatchId");

                updateOrganizationActionBatch_nodeParamType = storedParamTypeMap['actionBatchId'] ||
                    RED.util.getMessageProperty(msg, "actionBatchId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationActionBatch_nodeParamType === 'str') {
                    console.log('updateOrganizationActionBatch_nodeParamType is "str"');
                    updateOrganizationActionBatch_parameters.actionBatchId = updateOrganizationActionBatch_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationActionBatch_nodeParamType is not "str"')
                    updateOrganizationActionBatch_parameters.actionBatchId = RED.util.getMessageProperty(msg, "actionBatchId");
                }
                                
                updateOrganizationActionBatch_nodeParam = storedParamValsMap['updateOrganizationActionBatch'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationActionBatch");

                updateOrganizationActionBatch_nodeParamType = storedParamTypeMap['updateOrganizationActionBatch'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationActionBatch");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationActionBatch_parameters.updateOrganizationActionBatch = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationActionBatch(updateOrganizationActionBatch_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationAdmins') {
                var getOrganizationAdmins_parameters = [];
                var getOrganizationAdmins_nodeParam;
                var getOrganizationAdmins_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationAdmins_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationAdmins_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationAdmins_nodeParamType === 'str') {
                    console.log('getOrganizationAdmins_nodeParamType is "str"');
                    getOrganizationAdmins_parameters.organizationId = getOrganizationAdmins_nodeParam || undefined;
                } else {
                    console.log('getOrganizationAdmins_nodeParamType is not "str"')
                    getOrganizationAdmins_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationAdmins(getOrganizationAdmins_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createOrganizationAdmin') {
                var createOrganizationAdmin_parameters = [];
                var createOrganizationAdmin_nodeParam;
                var createOrganizationAdmin_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createOrganizationAdmin_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                createOrganizationAdmin_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (createOrganizationAdmin_nodeParamType === 'str') {
                    console.log('createOrganizationAdmin_nodeParamType is "str"');
                    createOrganizationAdmin_parameters.organizationId = createOrganizationAdmin_nodeParam || undefined;
                } else {
                    console.log('createOrganizationAdmin_nodeParamType is not "str"')
                    createOrganizationAdmin_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                createOrganizationAdmin_nodeParam = storedParamValsMap['createOrganizationAdmin'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationAdmin");

                createOrganizationAdmin_nodeParamType = storedParamTypeMap['createOrganizationAdmin'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationAdmin");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createOrganizationAdmin_parameters.createOrganizationAdmin = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createOrganizationAdmin(createOrganizationAdmin_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationAdmin') {
                var updateOrganizationAdmin_parameters = [];
                var updateOrganizationAdmin_nodeParam;
                var updateOrganizationAdmin_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationAdmin_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationAdmin_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationAdmin_nodeParamType === 'str') {
                    console.log('updateOrganizationAdmin_nodeParamType is "str"');
                    updateOrganizationAdmin_parameters.organizationId = updateOrganizationAdmin_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationAdmin_nodeParamType is not "str"')
                    updateOrganizationAdmin_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationAdmin_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                updateOrganizationAdmin_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationAdmin_nodeParamType === 'str') {
                    console.log('updateOrganizationAdmin_nodeParamType is "str"');
                    updateOrganizationAdmin_parameters.id = updateOrganizationAdmin_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationAdmin_nodeParamType is not "str"')
                    updateOrganizationAdmin_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                updateOrganizationAdmin_nodeParam = storedParamValsMap['updateOrganizationAdmin'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationAdmin");

                updateOrganizationAdmin_nodeParamType = storedParamTypeMap['updateOrganizationAdmin'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationAdmin");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationAdmin_parameters.updateOrganizationAdmin = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationAdmin(updateOrganizationAdmin_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteOrganizationAdmin') {
                var deleteOrganizationAdmin_parameters = [];
                var deleteOrganizationAdmin_nodeParam;
                var deleteOrganizationAdmin_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteOrganizationAdmin_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                deleteOrganizationAdmin_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationAdmin_nodeParamType === 'str') {
                    console.log('deleteOrganizationAdmin_nodeParamType is "str"');
                    deleteOrganizationAdmin_parameters.organizationId = deleteOrganizationAdmin_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationAdmin_nodeParamType is not "str"')
                    deleteOrganizationAdmin_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                deleteOrganizationAdmin_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                deleteOrganizationAdmin_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationAdmin_nodeParamType === 'str') {
                    console.log('deleteOrganizationAdmin_nodeParamType is "str"');
                    deleteOrganizationAdmin_parameters.id = deleteOrganizationAdmin_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationAdmin_nodeParamType is not "str"')
                    deleteOrganizationAdmin_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                result = client.deleteOrganizationAdmin(deleteOrganizationAdmin_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationApiRequests') {
                var getOrganizationApiRequests_parameters = [];
                var getOrganizationApiRequests_nodeParam;
                var getOrganizationApiRequests_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.organizationId = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.t0 = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.t1 = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.timespan = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.perPage = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.startingAfter = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.endingBefore = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['adminId'] ||
                    RED.util.getMessageProperty(msg, "adminId");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['adminId'] ||
                    RED.util.getMessageProperty(msg, "adminId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.adminId = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.adminId = RED.util.getMessageProperty(msg, "adminId");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['path'] ||
                    RED.util.getMessageProperty(msg, "path");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['path'] ||
                    RED.util.getMessageProperty(msg, "path");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.path = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.path = RED.util.getMessageProperty(msg, "path");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['method'] ||
                    RED.util.getMessageProperty(msg, "method");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['method'] ||
                    RED.util.getMessageProperty(msg, "method");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.method = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.method = RED.util.getMessageProperty(msg, "method");
                }
                                
                getOrganizationApiRequests_nodeParam = storedParamValsMap['responseCode'] ||
                    RED.util.getMessageProperty(msg, "responseCode");

                getOrganizationApiRequests_nodeParamType = storedParamTypeMap['responseCode'] ||
                    RED.util.getMessageProperty(msg, "responseCode");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    console.log('getOrganizationApiRequests_nodeParamType is "str"');
                    getOrganizationApiRequests_parameters.responseCode = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    console.log('getOrganizationApiRequests_nodeParamType is not "str"')
                    getOrganizationApiRequests_parameters.responseCode = RED.util.getMessageProperty(msg, "responseCode");
                }
                                result = client.getOrganizationApiRequests(getOrganizationApiRequests_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationBrandingPolicies') {
                var getOrganizationBrandingPolicies_parameters = [];
                var getOrganizationBrandingPolicies_nodeParam;
                var getOrganizationBrandingPolicies_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationBrandingPolicies_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationBrandingPolicies_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationBrandingPolicies_nodeParamType === 'str') {
                    console.log('getOrganizationBrandingPolicies_nodeParamType is "str"');
                    getOrganizationBrandingPolicies_parameters.organizationId = getOrganizationBrandingPolicies_nodeParam || undefined;
                } else {
                    console.log('getOrganizationBrandingPolicies_nodeParamType is not "str"')
                    getOrganizationBrandingPolicies_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationBrandingPolicies(getOrganizationBrandingPolicies_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createOrganizationBrandingPolicy') {
                var createOrganizationBrandingPolicy_parameters = [];
                var createOrganizationBrandingPolicy_nodeParam;
                var createOrganizationBrandingPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createOrganizationBrandingPolicy_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                createOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (createOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('createOrganizationBrandingPolicy_nodeParamType is "str"');
                    createOrganizationBrandingPolicy_parameters.organizationId = createOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('createOrganizationBrandingPolicy_nodeParamType is not "str"')
                    createOrganizationBrandingPolicy_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                createOrganizationBrandingPolicy_nodeParam = storedParamValsMap['createOrganizationBrandingPolicy'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationBrandingPolicy");

                createOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['createOrganizationBrandingPolicy'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationBrandingPolicy");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createOrganizationBrandingPolicy_parameters.createOrganizationBrandingPolicy = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createOrganizationBrandingPolicy(createOrganizationBrandingPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationBrandingPoliciesPriorities') {
                var getOrganizationBrandingPoliciesPriorities_parameters = [];
                var getOrganizationBrandingPoliciesPriorities_nodeParam;
                var getOrganizationBrandingPoliciesPriorities_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationBrandingPoliciesPriorities_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationBrandingPoliciesPriorities_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationBrandingPoliciesPriorities_nodeParamType === 'str') {
                    console.log('getOrganizationBrandingPoliciesPriorities_nodeParamType is "str"');
                    getOrganizationBrandingPoliciesPriorities_parameters.organizationId = getOrganizationBrandingPoliciesPriorities_nodeParam || undefined;
                } else {
                    console.log('getOrganizationBrandingPoliciesPriorities_nodeParamType is not "str"')
                    getOrganizationBrandingPoliciesPriorities_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationBrandingPoliciesPriorities(getOrganizationBrandingPoliciesPriorities_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationBrandingPoliciesPriorities') {
                var updateOrganizationBrandingPoliciesPriorities_parameters = [];
                var updateOrganizationBrandingPoliciesPriorities_nodeParam;
                var updateOrganizationBrandingPoliciesPriorities_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationBrandingPoliciesPriorities_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationBrandingPoliciesPriorities_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationBrandingPoliciesPriorities_nodeParamType === 'str') {
                    console.log('updateOrganizationBrandingPoliciesPriorities_nodeParamType is "str"');
                    updateOrganizationBrandingPoliciesPriorities_parameters.organizationId = updateOrganizationBrandingPoliciesPriorities_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationBrandingPoliciesPriorities_nodeParamType is not "str"')
                    updateOrganizationBrandingPoliciesPriorities_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationBrandingPoliciesPriorities_nodeParam = storedParamValsMap['updateOrganizationBrandingPoliciesPriorities'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationBrandingPoliciesPriorities");

                updateOrganizationBrandingPoliciesPriorities_nodeParamType = storedParamTypeMap['updateOrganizationBrandingPoliciesPriorities'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationBrandingPoliciesPriorities");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationBrandingPoliciesPriorities_parameters.updateOrganizationBrandingPoliciesPriorities = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationBrandingPoliciesPriorities(updateOrganizationBrandingPoliciesPriorities_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationBrandingPolicy') {
                var getOrganizationBrandingPolicy_parameters = [];
                var getOrganizationBrandingPolicy_nodeParam;
                var getOrganizationBrandingPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationBrandingPolicy_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('getOrganizationBrandingPolicy_nodeParamType is "str"');
                    getOrganizationBrandingPolicy_parameters.organizationId = getOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('getOrganizationBrandingPolicy_nodeParamType is not "str"')
                    getOrganizationBrandingPolicy_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationBrandingPolicy_nodeParam = storedParamValsMap['brandingPolicyId'] ||
                    RED.util.getMessageProperty(msg, "brandingPolicyId");

                getOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['brandingPolicyId'] ||
                    RED.util.getMessageProperty(msg, "brandingPolicyId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('getOrganizationBrandingPolicy_nodeParamType is "str"');
                    getOrganizationBrandingPolicy_parameters.brandingPolicyId = getOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('getOrganizationBrandingPolicy_nodeParamType is not "str"')
                    getOrganizationBrandingPolicy_parameters.brandingPolicyId = RED.util.getMessageProperty(msg, "brandingPolicyId");
                }
                                result = client.getOrganizationBrandingPolicy(getOrganizationBrandingPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationBrandingPolicy') {
                var updateOrganizationBrandingPolicy_parameters = [];
                var updateOrganizationBrandingPolicy_nodeParam;
                var updateOrganizationBrandingPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationBrandingPolicy_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('updateOrganizationBrandingPolicy_nodeParamType is "str"');
                    updateOrganizationBrandingPolicy_parameters.organizationId = updateOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationBrandingPolicy_nodeParamType is not "str"')
                    updateOrganizationBrandingPolicy_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationBrandingPolicy_nodeParam = storedParamValsMap['brandingPolicyId'] ||
                    RED.util.getMessageProperty(msg, "brandingPolicyId");

                updateOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['brandingPolicyId'] ||
                    RED.util.getMessageProperty(msg, "brandingPolicyId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('updateOrganizationBrandingPolicy_nodeParamType is "str"');
                    updateOrganizationBrandingPolicy_parameters.brandingPolicyId = updateOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationBrandingPolicy_nodeParamType is not "str"')
                    updateOrganizationBrandingPolicy_parameters.brandingPolicyId = RED.util.getMessageProperty(msg, "brandingPolicyId");
                }
                                
                updateOrganizationBrandingPolicy_nodeParam = storedParamValsMap['updateOrganizationBrandingPolicy'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationBrandingPolicy");

                updateOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['updateOrganizationBrandingPolicy'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationBrandingPolicy");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationBrandingPolicy_parameters.updateOrganizationBrandingPolicy = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationBrandingPolicy(updateOrganizationBrandingPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteOrganizationBrandingPolicy') {
                var deleteOrganizationBrandingPolicy_parameters = [];
                var deleteOrganizationBrandingPolicy_nodeParam;
                var deleteOrganizationBrandingPolicy_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteOrganizationBrandingPolicy_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                deleteOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('deleteOrganizationBrandingPolicy_nodeParamType is "str"');
                    deleteOrganizationBrandingPolicy_parameters.organizationId = deleteOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationBrandingPolicy_nodeParamType is not "str"')
                    deleteOrganizationBrandingPolicy_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                deleteOrganizationBrandingPolicy_nodeParam = storedParamValsMap['brandingPolicyId'] ||
                    RED.util.getMessageProperty(msg, "brandingPolicyId");

                deleteOrganizationBrandingPolicy_nodeParamType = storedParamTypeMap['brandingPolicyId'] ||
                    RED.util.getMessageProperty(msg, "brandingPolicyId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationBrandingPolicy_nodeParamType === 'str') {
                    console.log('deleteOrganizationBrandingPolicy_nodeParamType is "str"');
                    deleteOrganizationBrandingPolicy_parameters.brandingPolicyId = deleteOrganizationBrandingPolicy_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationBrandingPolicy_nodeParamType is not "str"')
                    deleteOrganizationBrandingPolicy_parameters.brandingPolicyId = RED.util.getMessageProperty(msg, "brandingPolicyId");
                }
                                result = client.deleteOrganizationBrandingPolicy(deleteOrganizationBrandingPolicy_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'claimOrganization') {
                var claimOrganization_parameters = [];
                var claimOrganization_nodeParam;
                var claimOrganization_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                claimOrganization_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                claimOrganization_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (claimOrganization_nodeParamType === 'str') {
                    console.log('claimOrganization_nodeParamType is "str"');
                    claimOrganization_parameters.organizationId = claimOrganization_nodeParam || undefined;
                } else {
                    console.log('claimOrganization_nodeParamType is not "str"')
                    claimOrganization_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                claimOrganization_nodeParam = storedParamValsMap['claimOrganization'] ||
                    RED.util.getMessageProperty(msg, "claimOrganization");

                claimOrganization_nodeParamType = storedParamTypeMap['claimOrganization'] ||
                    RED.util.getMessageProperty(msg, "claimOrganization");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    claimOrganization_parameters.claimOrganization = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.claimOrganization(claimOrganization_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'cloneOrganization') {
                var cloneOrganization_parameters = [];
                var cloneOrganization_nodeParam;
                var cloneOrganization_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                cloneOrganization_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                cloneOrganization_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (cloneOrganization_nodeParamType === 'str') {
                    console.log('cloneOrganization_nodeParamType is "str"');
                    cloneOrganization_parameters.organizationId = cloneOrganization_nodeParam || undefined;
                } else {
                    console.log('cloneOrganization_nodeParamType is not "str"')
                    cloneOrganization_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                cloneOrganization_nodeParam = storedParamValsMap['cloneOrganization'] ||
                    RED.util.getMessageProperty(msg, "cloneOrganization");

                cloneOrganization_nodeParamType = storedParamTypeMap['cloneOrganization'] ||
                    RED.util.getMessageProperty(msg, "cloneOrganization");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    cloneOrganization_parameters.cloneOrganization = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.cloneOrganization(cloneOrganization_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationConfigTemplates') {
                var getOrganizationConfigTemplates_parameters = [];
                var getOrganizationConfigTemplates_nodeParam;
                var getOrganizationConfigTemplates_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationConfigTemplates_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationConfigTemplates_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationConfigTemplates_nodeParamType === 'str') {
                    console.log('getOrganizationConfigTemplates_nodeParamType is "str"');
                    getOrganizationConfigTemplates_parameters.organizationId = getOrganizationConfigTemplates_nodeParam || undefined;
                } else {
                    console.log('getOrganizationConfigTemplates_nodeParamType is not "str"')
                    getOrganizationConfigTemplates_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationConfigTemplates(getOrganizationConfigTemplates_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteOrganizationConfigTemplate') {
                var deleteOrganizationConfigTemplate_parameters = [];
                var deleteOrganizationConfigTemplate_nodeParam;
                var deleteOrganizationConfigTemplate_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteOrganizationConfigTemplate_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                deleteOrganizationConfigTemplate_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationConfigTemplate_nodeParamType === 'str') {
                    console.log('deleteOrganizationConfigTemplate_nodeParamType is "str"');
                    deleteOrganizationConfigTemplate_parameters.organizationId = deleteOrganizationConfigTemplate_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationConfigTemplate_nodeParamType is not "str"')
                    deleteOrganizationConfigTemplate_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                deleteOrganizationConfigTemplate_nodeParam = storedParamValsMap['configTemplateId'] ||
                    RED.util.getMessageProperty(msg, "configTemplateId");

                deleteOrganizationConfigTemplate_nodeParamType = storedParamTypeMap['configTemplateId'] ||
                    RED.util.getMessageProperty(msg, "configTemplateId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationConfigTemplate_nodeParamType === 'str') {
                    console.log('deleteOrganizationConfigTemplate_nodeParamType is "str"');
                    deleteOrganizationConfigTemplate_parameters.configTemplateId = deleteOrganizationConfigTemplate_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationConfigTemplate_nodeParamType is not "str"')
                    deleteOrganizationConfigTemplate_parameters.configTemplateId = RED.util.getMessageProperty(msg, "configTemplateId");
                }
                                result = client.deleteOrganizationConfigTemplate(deleteOrganizationConfigTemplate_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationConfigTemplateSwitchProfiles') {
                var getOrganizationConfigTemplateSwitchProfiles_parameters = [];
                var getOrganizationConfigTemplateSwitchProfiles_nodeParam;
                var getOrganizationConfigTemplateSwitchProfiles_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationConfigTemplateSwitchProfiles_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationConfigTemplateSwitchProfiles_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationConfigTemplateSwitchProfiles_nodeParamType === 'str') {
                    console.log('getOrganizationConfigTemplateSwitchProfiles_nodeParamType is "str"');
                    getOrganizationConfigTemplateSwitchProfiles_parameters.organizationId = getOrganizationConfigTemplateSwitchProfiles_nodeParam || undefined;
                } else {
                    console.log('getOrganizationConfigTemplateSwitchProfiles_nodeParamType is not "str"')
                    getOrganizationConfigTemplateSwitchProfiles_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationConfigTemplateSwitchProfiles_nodeParam = storedParamValsMap['configTemplateId'] ||
                    RED.util.getMessageProperty(msg, "configTemplateId");

                getOrganizationConfigTemplateSwitchProfiles_nodeParamType = storedParamTypeMap['configTemplateId'] ||
                    RED.util.getMessageProperty(msg, "configTemplateId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationConfigTemplateSwitchProfiles_nodeParamType === 'str') {
                    console.log('getOrganizationConfigTemplateSwitchProfiles_nodeParamType is "str"');
                    getOrganizationConfigTemplateSwitchProfiles_parameters.configTemplateId = getOrganizationConfigTemplateSwitchProfiles_nodeParam || undefined;
                } else {
                    console.log('getOrganizationConfigTemplateSwitchProfiles_nodeParamType is not "str"')
                    getOrganizationConfigTemplateSwitchProfiles_parameters.configTemplateId = RED.util.getMessageProperty(msg, "configTemplateId");
                }
                                result = client.getOrganizationConfigTemplateSwitchProfiles(getOrganizationConfigTemplateSwitchProfiles_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationDeviceStatuses') {
                var getOrganizationDeviceStatuses_parameters = [];
                var getOrganizationDeviceStatuses_nodeParam;
                var getOrganizationDeviceStatuses_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationDeviceStatuses_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationDeviceStatuses_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationDeviceStatuses_nodeParamType === 'str') {
                    console.log('getOrganizationDeviceStatuses_nodeParamType is "str"');
                    getOrganizationDeviceStatuses_parameters.organizationId = getOrganizationDeviceStatuses_nodeParam || undefined;
                } else {
                    console.log('getOrganizationDeviceStatuses_nodeParamType is not "str"')
                    getOrganizationDeviceStatuses_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationDeviceStatuses(getOrganizationDeviceStatuses_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationDevices') {
                var getOrganizationDevices_parameters = [];
                var getOrganizationDevices_nodeParam;
                var getOrganizationDevices_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationDevices_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationDevices_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationDevices_nodeParamType === 'str') {
                    console.log('getOrganizationDevices_nodeParamType is "str"');
                    getOrganizationDevices_parameters.organizationId = getOrganizationDevices_nodeParam || undefined;
                } else {
                    console.log('getOrganizationDevices_nodeParamType is not "str"')
                    getOrganizationDevices_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationDevices_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getOrganizationDevices_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationDevices_nodeParamType === 'str') {
                    console.log('getOrganizationDevices_nodeParamType is "str"');
                    getOrganizationDevices_parameters.perPage = getOrganizationDevices_nodeParam || undefined;
                } else {
                    console.log('getOrganizationDevices_nodeParamType is not "str"')
                    getOrganizationDevices_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getOrganizationDevices_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getOrganizationDevices_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationDevices_nodeParamType === 'str') {
                    console.log('getOrganizationDevices_nodeParamType is "str"');
                    getOrganizationDevices_parameters.startingAfter = getOrganizationDevices_nodeParam || undefined;
                } else {
                    console.log('getOrganizationDevices_nodeParamType is not "str"')
                    getOrganizationDevices_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getOrganizationDevices_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getOrganizationDevices_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationDevices_nodeParamType === 'str') {
                    console.log('getOrganizationDevices_nodeParamType is "str"');
                    getOrganizationDevices_parameters.endingBefore = getOrganizationDevices_nodeParam || undefined;
                } else {
                    console.log('getOrganizationDevices_nodeParamType is not "str"')
                    getOrganizationDevices_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getOrganizationDevices(getOrganizationDevices_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationInventory') {
                var getOrganizationInventory_parameters = [];
                var getOrganizationInventory_nodeParam;
                var getOrganizationInventory_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationInventory_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationInventory_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationInventory_nodeParamType === 'str') {
                    console.log('getOrganizationInventory_nodeParamType is "str"');
                    getOrganizationInventory_parameters.organizationId = getOrganizationInventory_nodeParam || undefined;
                } else {
                    console.log('getOrganizationInventory_nodeParamType is not "str"')
                    getOrganizationInventory_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationInventory(getOrganizationInventory_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationLicenseState') {
                var getOrganizationLicenseState_parameters = [];
                var getOrganizationLicenseState_nodeParam;
                var getOrganizationLicenseState_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationLicenseState_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationLicenseState_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationLicenseState_nodeParamType === 'str') {
                    console.log('getOrganizationLicenseState_nodeParamType is "str"');
                    getOrganizationLicenseState_parameters.organizationId = getOrganizationLicenseState_nodeParam || undefined;
                } else {
                    console.log('getOrganizationLicenseState_nodeParamType is not "str"')
                    getOrganizationLicenseState_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationLicenseState(getOrganizationLicenseState_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationNetworks') {
                var getOrganizationNetworks_parameters = [];
                var getOrganizationNetworks_nodeParam;
                var getOrganizationNetworks_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationNetworks_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationNetworks_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationNetworks_nodeParamType === 'str') {
                    console.log('getOrganizationNetworks_nodeParamType is "str"');
                    getOrganizationNetworks_parameters.organizationId = getOrganizationNetworks_nodeParam || undefined;
                } else {
                    console.log('getOrganizationNetworks_nodeParamType is not "str"')
                    getOrganizationNetworks_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationNetworks_nodeParam = storedParamValsMap['configTemplateId'] ||
                    RED.util.getMessageProperty(msg, "configTemplateId");

                getOrganizationNetworks_nodeParamType = storedParamTypeMap['configTemplateId'] ||
                    RED.util.getMessageProperty(msg, "configTemplateId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationNetworks_nodeParamType === 'str') {
                    console.log('getOrganizationNetworks_nodeParamType is "str"');
                    getOrganizationNetworks_parameters.configTemplateId = getOrganizationNetworks_nodeParam || undefined;
                } else {
                    console.log('getOrganizationNetworks_nodeParamType is not "str"')
                    getOrganizationNetworks_parameters.configTemplateId = RED.util.getMessageProperty(msg, "configTemplateId");
                }
                                result = client.getOrganizationNetworks(getOrganizationNetworks_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createOrganizationNetwork') {
                var createOrganizationNetwork_parameters = [];
                var createOrganizationNetwork_nodeParam;
                var createOrganizationNetwork_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createOrganizationNetwork_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                createOrganizationNetwork_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (createOrganizationNetwork_nodeParamType === 'str') {
                    console.log('createOrganizationNetwork_nodeParamType is "str"');
                    createOrganizationNetwork_parameters.organizationId = createOrganizationNetwork_nodeParam || undefined;
                } else {
                    console.log('createOrganizationNetwork_nodeParamType is not "str"')
                    createOrganizationNetwork_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                createOrganizationNetwork_nodeParam = storedParamValsMap['createOrganizationNetwork'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationNetwork");

                createOrganizationNetwork_nodeParamType = storedParamTypeMap['createOrganizationNetwork'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationNetwork");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createOrganizationNetwork_parameters.createOrganizationNetwork = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createOrganizationNetwork(createOrganizationNetwork_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'combineOrganizationNetworks') {
                var combineOrganizationNetworks_parameters = [];
                var combineOrganizationNetworks_nodeParam;
                var combineOrganizationNetworks_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                combineOrganizationNetworks_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                combineOrganizationNetworks_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (combineOrganizationNetworks_nodeParamType === 'str') {
                    console.log('combineOrganizationNetworks_nodeParamType is "str"');
                    combineOrganizationNetworks_parameters.organizationId = combineOrganizationNetworks_nodeParam || undefined;
                } else {
                    console.log('combineOrganizationNetworks_nodeParamType is not "str"')
                    combineOrganizationNetworks_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                combineOrganizationNetworks_nodeParam = storedParamValsMap['combineOrganizationNetworks'] ||
                    RED.util.getMessageProperty(msg, "combineOrganizationNetworks");

                combineOrganizationNetworks_nodeParamType = storedParamTypeMap['combineOrganizationNetworks'] ||
                    RED.util.getMessageProperty(msg, "combineOrganizationNetworks");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    combineOrganizationNetworks_parameters.combineOrganizationNetworks = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.combineOrganizationNetworks(combineOrganizationNetworks_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationOpenapiSpec') {
                var getOrganizationOpenapiSpec_parameters = [];
                var getOrganizationOpenapiSpec_nodeParam;
                var getOrganizationOpenapiSpec_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationOpenapiSpec_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationOpenapiSpec_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationOpenapiSpec_nodeParamType === 'str') {
                    console.log('getOrganizationOpenapiSpec_nodeParamType is "str"');
                    getOrganizationOpenapiSpec_parameters.organizationId = getOrganizationOpenapiSpec_nodeParam || undefined;
                } else {
                    console.log('getOrganizationOpenapiSpec_nodeParamType is not "str"')
                    getOrganizationOpenapiSpec_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationOpenapiSpec(getOrganizationOpenapiSpec_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationSamlRoles') {
                var getOrganizationSamlRoles_parameters = [];
                var getOrganizationSamlRoles_nodeParam;
                var getOrganizationSamlRoles_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationSamlRoles_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationSamlRoles_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSamlRoles_nodeParamType === 'str') {
                    console.log('getOrganizationSamlRoles_nodeParamType is "str"');
                    getOrganizationSamlRoles_parameters.organizationId = getOrganizationSamlRoles_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSamlRoles_nodeParamType is not "str"')
                    getOrganizationSamlRoles_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationSamlRoles(getOrganizationSamlRoles_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'createOrganizationSamlRole') {
                var createOrganizationSamlRole_parameters = [];
                var createOrganizationSamlRole_nodeParam;
                var createOrganizationSamlRole_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                createOrganizationSamlRole_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                createOrganizationSamlRole_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (createOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('createOrganizationSamlRole_nodeParamType is "str"');
                    createOrganizationSamlRole_parameters.organizationId = createOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('createOrganizationSamlRole_nodeParamType is not "str"')
                    createOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                createOrganizationSamlRole_nodeParam = storedParamValsMap['createOrganizationSamlRole'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationSamlRole");

                createOrganizationSamlRole_nodeParamType = storedParamTypeMap['createOrganizationSamlRole'] ||
                    RED.util.getMessageProperty(msg, "createOrganizationSamlRole");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    createOrganizationSamlRole_parameters.createOrganizationSamlRole = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.createOrganizationSamlRole(createOrganizationSamlRole_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationSamlRole') {
                var getOrganizationSamlRole_parameters = [];
                var getOrganizationSamlRole_nodeParam;
                var getOrganizationSamlRole_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationSamlRole_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationSamlRole_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('getOrganizationSamlRole_nodeParamType is "str"');
                    getOrganizationSamlRole_parameters.organizationId = getOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSamlRole_nodeParamType is not "str"')
                    getOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationSamlRole_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                getOrganizationSamlRole_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('getOrganizationSamlRole_nodeParamType is "str"');
                    getOrganizationSamlRole_parameters.id = getOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSamlRole_nodeParamType is not "str"')
                    getOrganizationSamlRole_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                result = client.getOrganizationSamlRole(getOrganizationSamlRole_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationSamlRole') {
                var updateOrganizationSamlRole_parameters = [];
                var updateOrganizationSamlRole_nodeParam;
                var updateOrganizationSamlRole_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationSamlRole_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationSamlRole_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('updateOrganizationSamlRole_nodeParamType is "str"');
                    updateOrganizationSamlRole_parameters.organizationId = updateOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationSamlRole_nodeParamType is not "str"')
                    updateOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationSamlRole_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                updateOrganizationSamlRole_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('updateOrganizationSamlRole_nodeParamType is "str"');
                    updateOrganizationSamlRole_parameters.id = updateOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationSamlRole_nodeParamType is not "str"')
                    updateOrganizationSamlRole_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                
                updateOrganizationSamlRole_nodeParam = storedParamValsMap['updateOrganizationSamlRole'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationSamlRole");

                updateOrganizationSamlRole_nodeParamType = storedParamTypeMap['updateOrganizationSamlRole'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationSamlRole");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationSamlRole_parameters.updateOrganizationSamlRole = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationSamlRole(updateOrganizationSamlRole_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'deleteOrganizationSamlRole') {
                var deleteOrganizationSamlRole_parameters = [];
                var deleteOrganizationSamlRole_nodeParam;
                var deleteOrganizationSamlRole_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                deleteOrganizationSamlRole_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                deleteOrganizationSamlRole_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('deleteOrganizationSamlRole_nodeParamType is "str"');
                    deleteOrganizationSamlRole_parameters.organizationId = deleteOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationSamlRole_nodeParamType is not "str"')
                    deleteOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                deleteOrganizationSamlRole_nodeParam = storedParamValsMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                deleteOrganizationSamlRole_nodeParamType = storedParamTypeMap['id'] ||
                    RED.util.getMessageProperty(msg, "id");

                // Check if its the body param

                // notBodyParam                                            
                if (deleteOrganizationSamlRole_nodeParamType === 'str') {
                    console.log('deleteOrganizationSamlRole_nodeParamType is "str"');
                    deleteOrganizationSamlRole_parameters.id = deleteOrganizationSamlRole_nodeParam || undefined;
                } else {
                    console.log('deleteOrganizationSamlRole_nodeParamType is not "str"')
                    deleteOrganizationSamlRole_parameters.id = RED.util.getMessageProperty(msg, "id");
                }
                                result = client.deleteOrganizationSamlRole(deleteOrganizationSamlRole_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationSecurityIntrusionSettings') {
                var getOrganizationSecurityIntrusionSettings_parameters = [];
                var getOrganizationSecurityIntrusionSettings_nodeParam;
                var getOrganizationSecurityIntrusionSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationSecurityIntrusionSettings_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationSecurityIntrusionSettings_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityIntrusionSettings_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityIntrusionSettings_nodeParamType is "str"');
                    getOrganizationSecurityIntrusionSettings_parameters.organizationId = getOrganizationSecurityIntrusionSettings_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityIntrusionSettings_nodeParamType is not "str"')
                    getOrganizationSecurityIntrusionSettings_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationSecurityIntrusionSettings(getOrganizationSecurityIntrusionSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationSecurityIntrusionSettings') {
                var updateOrganizationSecurityIntrusionSettings_parameters = [];
                var updateOrganizationSecurityIntrusionSettings_nodeParam;
                var updateOrganizationSecurityIntrusionSettings_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationSecurityIntrusionSettings_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationSecurityIntrusionSettings_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationSecurityIntrusionSettings_nodeParamType === 'str') {
                    console.log('updateOrganizationSecurityIntrusionSettings_nodeParamType is "str"');
                    updateOrganizationSecurityIntrusionSettings_parameters.organizationId = updateOrganizationSecurityIntrusionSettings_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationSecurityIntrusionSettings_nodeParamType is not "str"')
                    updateOrganizationSecurityIntrusionSettings_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationSecurityIntrusionSettings_nodeParam = storedParamValsMap['updateOrganizationSecurityIntrusionSettings'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationSecurityIntrusionSettings");

                updateOrganizationSecurityIntrusionSettings_nodeParamType = storedParamTypeMap['updateOrganizationSecurityIntrusionSettings'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationSecurityIntrusionSettings");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationSecurityIntrusionSettings_parameters.updateOrganizationSecurityIntrusionSettings = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationSecurityIntrusionSettings(updateOrganizationSecurityIntrusionSettings_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationSecurityEvents') {
                var getOrganizationSecurityEvents_parameters = [];
                var getOrganizationSecurityEvents_nodeParam;
                var getOrganizationSecurityEvents_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.organizationId = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.t0 = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.t1 = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.timespan = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.perPage = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.startingAfter = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getOrganizationSecurityEvents_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getOrganizationSecurityEvents_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSecurityEvents_nodeParamType === 'str') {
                    console.log('getOrganizationSecurityEvents_nodeParamType is "str"');
                    getOrganizationSecurityEvents_parameters.endingBefore = getOrganizationSecurityEvents_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSecurityEvents_nodeParamType is not "str"')
                    getOrganizationSecurityEvents_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                result = client.getOrganizationSecurityEvents(getOrganizationSecurityEvents_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationSnmp') {
                var getOrganizationSnmp_parameters = [];
                var getOrganizationSnmp_nodeParam;
                var getOrganizationSnmp_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationSnmp_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationSnmp_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationSnmp_nodeParamType === 'str') {
                    console.log('getOrganizationSnmp_nodeParamType is "str"');
                    getOrganizationSnmp_parameters.organizationId = getOrganizationSnmp_nodeParam || undefined;
                } else {
                    console.log('getOrganizationSnmp_nodeParamType is not "str"')
                    getOrganizationSnmp_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationSnmp(getOrganizationSnmp_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationSnmp') {
                var updateOrganizationSnmp_parameters = [];
                var updateOrganizationSnmp_nodeParam;
                var updateOrganizationSnmp_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationSnmp_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationSnmp_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationSnmp_nodeParamType === 'str') {
                    console.log('updateOrganizationSnmp_nodeParamType is "str"');
                    updateOrganizationSnmp_parameters.organizationId = updateOrganizationSnmp_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationSnmp_nodeParamType is not "str"')
                    updateOrganizationSnmp_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationSnmp_nodeParam = storedParamValsMap['updateOrganizationSnmp'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationSnmp");

                updateOrganizationSnmp_nodeParamType = storedParamTypeMap['updateOrganizationSnmp'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationSnmp");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationSnmp_parameters.updateOrganizationSnmp = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationSnmp(updateOrganizationSnmp_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationThirdPartyVPNPeers') {
                var getOrganizationThirdPartyVPNPeers_parameters = [];
                var getOrganizationThirdPartyVPNPeers_nodeParam;
                var getOrganizationThirdPartyVPNPeers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationThirdPartyVPNPeers_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationThirdPartyVPNPeers_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationThirdPartyVPNPeers_nodeParamType === 'str') {
                    console.log('getOrganizationThirdPartyVPNPeers_nodeParamType is "str"');
                    getOrganizationThirdPartyVPNPeers_parameters.organizationId = getOrganizationThirdPartyVPNPeers_nodeParam || undefined;
                } else {
                    console.log('getOrganizationThirdPartyVPNPeers_nodeParamType is not "str"')
                    getOrganizationThirdPartyVPNPeers_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationThirdPartyVPNPeers(getOrganizationThirdPartyVPNPeers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationThirdPartyVPNPeers') {
                var updateOrganizationThirdPartyVPNPeers_parameters = [];
                var updateOrganizationThirdPartyVPNPeers_nodeParam;
                var updateOrganizationThirdPartyVPNPeers_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationThirdPartyVPNPeers_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationThirdPartyVPNPeers_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationThirdPartyVPNPeers_nodeParamType === 'str') {
                    console.log('updateOrganizationThirdPartyVPNPeers_nodeParamType is "str"');
                    updateOrganizationThirdPartyVPNPeers_parameters.organizationId = updateOrganizationThirdPartyVPNPeers_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationThirdPartyVPNPeers_nodeParamType is not "str"')
                    updateOrganizationThirdPartyVPNPeers_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationThirdPartyVPNPeers_nodeParam = storedParamValsMap['updateOrganizationThirdPartyVpnPeers'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationThirdPartyVpnPeers");

                updateOrganizationThirdPartyVPNPeers_nodeParamType = storedParamTypeMap['updateOrganizationThirdPartyVpnPeers'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationThirdPartyVpnPeers");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationThirdPartyVPNPeers_nodeParamType === 'str') {
                    console.log('updateOrganizationThirdPartyVPNPeers_nodeParamType is "str"');
                    updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers = updateOrganizationThirdPartyVPNPeers_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationThirdPartyVPNPeers_nodeParamType is not "str"')
                    updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers = RED.util.getMessageProperty(msg, "updateOrganizationThirdPartyVpnPeers");
                }
                                result = client.updateOrganizationThirdPartyVPNPeers(updateOrganizationThirdPartyVPNPeers_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationUplinksLossAndLatency') {
                var getOrganizationUplinksLossAndLatency_parameters = [];
                var getOrganizationUplinksLossAndLatency_nodeParam;
                var getOrganizationUplinksLossAndLatency_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationUplinksLossAndLatency_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationUplinksLossAndLatency_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is "str"');
                    getOrganizationUplinksLossAndLatency_parameters.organizationId = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is not "str"')
                    getOrganizationUplinksLossAndLatency_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationUplinksLossAndLatency_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getOrganizationUplinksLossAndLatency_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is "str"');
                    getOrganizationUplinksLossAndLatency_parameters.t0 = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is not "str"')
                    getOrganizationUplinksLossAndLatency_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getOrganizationUplinksLossAndLatency_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getOrganizationUplinksLossAndLatency_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is "str"');
                    getOrganizationUplinksLossAndLatency_parameters.t1 = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is not "str"')
                    getOrganizationUplinksLossAndLatency_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getOrganizationUplinksLossAndLatency_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getOrganizationUplinksLossAndLatency_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is "str"');
                    getOrganizationUplinksLossAndLatency_parameters.timespan = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is not "str"')
                    getOrganizationUplinksLossAndLatency_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getOrganizationUplinksLossAndLatency_nodeParam = storedParamValsMap['uplink'] ||
                    RED.util.getMessageProperty(msg, "uplink");

                getOrganizationUplinksLossAndLatency_nodeParamType = storedParamTypeMap['uplink'] ||
                    RED.util.getMessageProperty(msg, "uplink");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is "str"');
                    getOrganizationUplinksLossAndLatency_parameters.uplink = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is not "str"')
                    getOrganizationUplinksLossAndLatency_parameters.uplink = RED.util.getMessageProperty(msg, "uplink");
                }
                                
                getOrganizationUplinksLossAndLatency_nodeParam = storedParamValsMap['ip'] ||
                    RED.util.getMessageProperty(msg, "ip");

                getOrganizationUplinksLossAndLatency_nodeParamType = storedParamTypeMap['ip'] ||
                    RED.util.getMessageProperty(msg, "ip");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is "str"');
                    getOrganizationUplinksLossAndLatency_parameters.ip = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    console.log('getOrganizationUplinksLossAndLatency_nodeParamType is not "str"')
                    getOrganizationUplinksLossAndLatency_parameters.ip = RED.util.getMessageProperty(msg, "ip");
                }
                                result = client.getOrganizationUplinksLossAndLatency(getOrganizationUplinksLossAndLatency_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationVpnFirewallRules') {
                var getOrganizationVpnFirewallRules_parameters = [];
                var getOrganizationVpnFirewallRules_nodeParam;
                var getOrganizationVpnFirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationVpnFirewallRules_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationVpnFirewallRules_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationVpnFirewallRules_nodeParamType === 'str') {
                    console.log('getOrganizationVpnFirewallRules_nodeParamType is "str"');
                    getOrganizationVpnFirewallRules_parameters.organizationId = getOrganizationVpnFirewallRules_nodeParam || undefined;
                } else {
                    console.log('getOrganizationVpnFirewallRules_nodeParamType is not "str"')
                    getOrganizationVpnFirewallRules_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                result = client.getOrganizationVpnFirewallRules(getOrganizationVpnFirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'updateOrganizationVpnFirewallRules') {
                var updateOrganizationVpnFirewallRules_parameters = [];
                var updateOrganizationVpnFirewallRules_nodeParam;
                var updateOrganizationVpnFirewallRules_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                updateOrganizationVpnFirewallRules_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                updateOrganizationVpnFirewallRules_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (updateOrganizationVpnFirewallRules_nodeParamType === 'str') {
                    console.log('updateOrganizationVpnFirewallRules_nodeParamType is "str"');
                    updateOrganizationVpnFirewallRules_parameters.organizationId = updateOrganizationVpnFirewallRules_nodeParam || undefined;
                } else {
                    console.log('updateOrganizationVpnFirewallRules_nodeParamType is not "str"')
                    updateOrganizationVpnFirewallRules_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                updateOrganizationVpnFirewallRules_nodeParam = storedParamValsMap['updateOrganizationVpnFirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationVpnFirewallRules");

                updateOrganizationVpnFirewallRules_nodeParamType = storedParamTypeMap['updateOrganizationVpnFirewallRules'] ||
                    RED.util.getMessageProperty(msg, "updateOrganizationVpnFirewallRules");

                // Check if its the body param

                // isBodyParam
                if (typeof msg.payload === 'object') {
                    updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateOrganizationVpnFirewallRules(updateOrganizationVpnFirewallRules_parameters);
                console.log('result', result);
            }
            if (!errorFlag && node.method === 'getOrganizationWebhookLogs') {
                var getOrganizationWebhookLogs_parameters = [];
                var getOrganizationWebhookLogs_nodeParam;
                var getOrganizationWebhookLogs_nodeParamType;
                console.log('check if body param   msg.payload, ', msg.payload);
                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['organizationId'] ||
                    RED.util.getMessageProperty(msg, "organizationId");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.organizationId = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.organizationId = RED.util.getMessageProperty(msg, "organizationId");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['t0'] ||
                    RED.util.getMessageProperty(msg, "t0");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.t0 = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.t0 = RED.util.getMessageProperty(msg, "t0");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['t1'] ||
                    RED.util.getMessageProperty(msg, "t1");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.t1 = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.t1 = RED.util.getMessageProperty(msg, "t1");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['timespan'] ||
                    RED.util.getMessageProperty(msg, "timespan");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.timespan = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.timespan = RED.util.getMessageProperty(msg, "timespan");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['perPage'] ||
                    RED.util.getMessageProperty(msg, "perPage");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.perPage = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.perPage = RED.util.getMessageProperty(msg, "perPage");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['startingAfter'] ||
                    RED.util.getMessageProperty(msg, "startingAfter");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.startingAfter = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.startingAfter = RED.util.getMessageProperty(msg, "startingAfter");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['endingBefore'] ||
                    RED.util.getMessageProperty(msg, "endingBefore");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.endingBefore = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.endingBefore = RED.util.getMessageProperty(msg, "endingBefore");
                }
                                
                getOrganizationWebhookLogs_nodeParam = storedParamValsMap['url'] ||
                    RED.util.getMessageProperty(msg, "url");

                getOrganizationWebhookLogs_nodeParamType = storedParamTypeMap['url'] ||
                    RED.util.getMessageProperty(msg, "url");

                // Check if its the body param

                // notBodyParam                                            
                if (getOrganizationWebhookLogs_nodeParamType === 'str') {
                    console.log('getOrganizationWebhookLogs_nodeParamType is "str"');
                    getOrganizationWebhookLogs_parameters.url = getOrganizationWebhookLogs_nodeParam || undefined;
                } else {
                    console.log('getOrganizationWebhookLogs_nodeParamType is not "str"')
                    getOrganizationWebhookLogs_parameters.url = RED.util.getMessageProperty(msg, "url");
                }
                                result = client.getOrganizationWebhookLogs(getOrganizationWebhookLogs_parameters);
                console.log('result', result);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                console.log('setData msg', msg)                  
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                        console.log('setData data.body', data.body)  
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'MerakiDashboardApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }else{
                        message = error;
                    }
                    console.log('setData msg', msg);
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('meraki-dashboard-api', MerakiDashboardApiNode);
    function MerakiDashboardApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        
        this.host = n.host;
       

        this.secureApiKeyValue = n.secureApiKeyValue;
        this.secureApiKeyHeaderOrQueryName = n.secureApiKeyHeaderOrQueryName;
        this.secureApiKeyIsQuery = n.secureApiKeyIsQuery;
    }

    RED.nodes.registerType('meraki-dashboard-api-service', MerakiDashboardApiServiceNode, {
        host: { type: 'text' },
        credentials: {
            secureApiKeyValue: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
