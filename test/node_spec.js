var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('meraki-dashboard-api node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'meraki-dashboard-api');
            done();
        });
    });

    it('should handle getDeviceCameraAnalyticsLive()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceCameraAnalyticsLive',
                getDeviceCameraAnalyticsLive_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceCameraAnalyticsOverview()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceCameraAnalyticsOverview',
                getDeviceCameraAnalyticsOverview_serial: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsOverview_t0: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsOverview_t1: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsOverview_timespan: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsOverview_objectType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceCameraAnalyticsRecent()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceCameraAnalyticsRecent',
                getDeviceCameraAnalyticsRecent_serial: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsRecent_objectType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceCameraAnalyticsZones()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceCameraAnalyticsZones',
                getDeviceCameraAnalyticsZones_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceCameraAnalyticsZoneHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceCameraAnalyticsZoneHistory',
                getDeviceCameraAnalyticsZoneHistory_serial: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsZoneHistory_zoneId: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsZoneHistory_t0: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsZoneHistory_t1: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsZoneHistory_timespan: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsZoneHistory_resolution: '<node property>', // (1) define node properties
                getDeviceCameraAnalyticsZoneHistory_objectType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceClients()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceClients',
                getDeviceClients_serial: '<node property>', // (1) define node properties
                getDeviceClients_t0: '<node property>', // (1) define node properties
                getDeviceClients_timespan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceSwitchPorts()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceSwitchPorts',
                getDeviceSwitchPorts_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceSwitchPort()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getDeviceSwitchPort',
                getDeviceSwitchPort_serial: '<node property>', // (1) define node properties
                getDeviceSwitchPort_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateDeviceSwitchPort()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateDeviceSwitchPort',
                updateDeviceSwitchPort_serial: '<node property>', // (1) define node properties
                updateDeviceSwitchPort_number: '<node property>', // (1) define node properties
                updateDeviceSwitchPort_updateDeviceSwitchPort: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle removeNetworkSwitchStack()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'removeNetworkSwitchStack',
                removeNetworkSwitchStack_networkId: '<node property>', // (1) define node properties
                removeNetworkSwitchStack_switchStackId: '<node property>', // (1) define node properties
                removeNetworkSwitchStack_removeNetworkSwitchStack: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetwork',
                getNetwork_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetwork',
                updateNetwork_networkId: '<node property>', // (1) define node properties
                updateNetwork_updateNetwork: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetwork',
                deleteNetwork_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkAccessPolicies()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkAccessPolicies',
                getNetworkAccessPolicies_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkAirMarshal()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkAirMarshal',
                getNetworkAirMarshal_networkId: '<node property>', // (1) define node properties
                getNetworkAirMarshal_t0: '<node property>', // (1) define node properties
                getNetworkAirMarshal_timespan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkAlertSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkAlertSettings',
                getNetworkAlertSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkAlertSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkAlertSettings',
                updateNetworkAlertSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkAlertSettings_updateNetworkAlertSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkAppliancePorts()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkAppliancePorts',
                getNetworkAppliancePorts_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkAppliancePort()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkAppliancePort',
                getNetworkAppliancePort_networkId: '<node property>', // (1) define node properties
                getNetworkAppliancePort_appliancePortId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkAppliancePort()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkAppliancePort',
                updateNetworkAppliancePort_networkId: '<node property>', // (1) define node properties
                updateNetworkAppliancePort_appliancePortId: '<node property>', // (1) define node properties
                updateNetworkAppliancePort_updateNetworkAppliancePort: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle bindNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'bindNetwork',
                bindNetwork_networkId: '<node property>', // (1) define node properties
                bindNetwork_bindNetwork: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkBluetoothClients()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkBluetoothClients',
                getNetworkBluetoothClients_networkId: '<node property>', // (1) define node properties
                getNetworkBluetoothClients_perPage: '<node property>', // (1) define node properties
                getNetworkBluetoothClients_startingAfter: '<node property>', // (1) define node properties
                getNetworkBluetoothClients_endingBefore: '<node property>', // (1) define node properties
                getNetworkBluetoothClients_timespan: '<node property>', // (1) define node properties
                getNetworkBluetoothClients_includeConnectivityHistory: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkBluetoothClient()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkBluetoothClient',
                getNetworkBluetoothClient_networkId: '<node property>', // (1) define node properties
                getNetworkBluetoothClient_bluetoothClientId: '<node property>', // (1) define node properties
                getNetworkBluetoothClient_includeConnectivityHistory: '<node property>', // (1) define node properties
                getNetworkBluetoothClient_connectivityHistoryTimespan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkBluetoothSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkBluetoothSettings',
                getNetworkBluetoothSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkBluetoothSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkBluetoothSettings',
                updateNetworkBluetoothSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkBluetoothSettings_updateNetworkBluetoothSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle generateNetworkCameraSnapshot()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'generateNetworkCameraSnapshot',
                generateNetworkCameraSnapshot_networkId: '<node property>', // (1) define node properties
                generateNetworkCameraSnapshot_serial: '<node property>', // (1) define node properties
                generateNetworkCameraSnapshot_generateNetworkCameraSnapshot: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkCameraVideoLink()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkCameraVideoLink',
                getNetworkCameraVideoLink_networkId: '<node property>', // (1) define node properties
                getNetworkCameraVideoLink_serial: '<node property>', // (1) define node properties
                getNetworkCameraVideoLink_timestamp: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkCellularFirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkCellularFirewallRules',
                getNetworkCellularFirewallRules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkCellularFirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkCellularFirewallRules',
                updateNetworkCellularFirewallRules_networkId: '<node property>', // (1) define node properties
                updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClients()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClients',
                getNetworkClients_networkId: '<node property>', // (1) define node properties
                getNetworkClients_t0: '<node property>', // (1) define node properties
                getNetworkClients_timespan: '<node property>', // (1) define node properties
                getNetworkClients_perPage: '<node property>', // (1) define node properties
                getNetworkClients_startingAfter: '<node property>', // (1) define node properties
                getNetworkClients_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientsConnectionStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientsConnectionStats',
                getNetworkClientsConnectionStats_networkId: '<node property>', // (1) define node properties
                getNetworkClientsConnectionStats_t0: '<node property>', // (1) define node properties
                getNetworkClientsConnectionStats_t1: '<node property>', // (1) define node properties
                getNetworkClientsConnectionStats_timespan: '<node property>', // (1) define node properties
                getNetworkClientsConnectionStats_ssid: '<node property>', // (1) define node properties
                getNetworkClientsConnectionStats_vlan: '<node property>', // (1) define node properties
                getNetworkClientsConnectionStats_apTag: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientsLatencyStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientsLatencyStats',
                getNetworkClientsLatencyStats_networkId: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_t0: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_t1: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_timespan: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_ssid: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_vlan: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_apTag: '<node property>', // (1) define node properties
                getNetworkClientsLatencyStats_fields: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle provisionNetworkClients()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'provisionNetworkClients',
                provisionNetworkClients_networkId: '<node property>', // (1) define node properties
                provisionNetworkClients_provisionNetworkClients: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClient()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClient',
                getNetworkClient_networkId: '<node property>', // (1) define node properties
                getNetworkClient_clientId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientConnectionStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientConnectionStats',
                getNetworkClientConnectionStats_networkId: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_clientId: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_t0: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_t1: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_timespan: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_ssid: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_vlan: '<node property>', // (1) define node properties
                getNetworkClientConnectionStats_apTag: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientEvents()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientEvents',
                getNetworkClientEvents_networkId: '<node property>', // (1) define node properties
                getNetworkClientEvents_clientId: '<node property>', // (1) define node properties
                getNetworkClientEvents_perPage: '<node property>', // (1) define node properties
                getNetworkClientEvents_startingAfter: '<node property>', // (1) define node properties
                getNetworkClientEvents_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientLatencyHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientLatencyHistory',
                getNetworkClientLatencyHistory_networkId: '<node property>', // (1) define node properties
                getNetworkClientLatencyHistory_clientId: '<node property>', // (1) define node properties
                getNetworkClientLatencyHistory_t0: '<node property>', // (1) define node properties
                getNetworkClientLatencyHistory_t1: '<node property>', // (1) define node properties
                getNetworkClientLatencyHistory_timespan: '<node property>', // (1) define node properties
                getNetworkClientLatencyHistory_resolution: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientLatencyStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientLatencyStats',
                getNetworkClientLatencyStats_networkId: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_clientId: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_t0: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_t1: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_timespan: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_ssid: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_vlan: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_apTag: '<node property>', // (1) define node properties
                getNetworkClientLatencyStats_fields: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientPolicy()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientPolicy',
                getNetworkClientPolicy_networkId: '<node property>', // (1) define node properties
                getNetworkClientPolicy_clientId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkClientPolicy()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkClientPolicy',
                updateNetworkClientPolicy_networkId: '<node property>', // (1) define node properties
                updateNetworkClientPolicy_clientId: '<node property>', // (1) define node properties
                updateNetworkClientPolicy_updateNetworkClientPolicy: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientSecurityEvents()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientSecurityEvents',
                getNetworkClientSecurityEvents_networkId: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_clientId: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_t0: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_t1: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_timespan: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_perPage: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_startingAfter: '<node property>', // (1) define node properties
                getNetworkClientSecurityEvents_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientSplashAuthorizationStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientSplashAuthorizationStatus',
                getNetworkClientSplashAuthorizationStatus_networkId: '<node property>', // (1) define node properties
                getNetworkClientSplashAuthorizationStatus_clientId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkClientSplashAuthorizationStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkClientSplashAuthorizationStatus',
                updateNetworkClientSplashAuthorizationStatus_networkId: '<node property>', // (1) define node properties
                updateNetworkClientSplashAuthorizationStatus_clientId: '<node property>', // (1) define node properties
                updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatus: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientTrafficHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientTrafficHistory',
                getNetworkClientTrafficHistory_networkId: '<node property>', // (1) define node properties
                getNetworkClientTrafficHistory_clientId: '<node property>', // (1) define node properties
                getNetworkClientTrafficHistory_perPage: '<node property>', // (1) define node properties
                getNetworkClientTrafficHistory_startingAfter: '<node property>', // (1) define node properties
                getNetworkClientTrafficHistory_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkClientUsageHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkClientUsageHistory',
                getNetworkClientUsageHistory_networkId: '<node property>', // (1) define node properties
                getNetworkClientUsageHistory_clientId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkConnectionStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkConnectionStats',
                getNetworkConnectionStats_networkId: '<node property>', // (1) define node properties
                getNetworkConnectionStats_t0: '<node property>', // (1) define node properties
                getNetworkConnectionStats_t1: '<node property>', // (1) define node properties
                getNetworkConnectionStats_timespan: '<node property>', // (1) define node properties
                getNetworkConnectionStats_ssid: '<node property>', // (1) define node properties
                getNetworkConnectionStats_vlan: '<node property>', // (1) define node properties
                getNetworkConnectionStats_apTag: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkContentFiltering()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkContentFiltering',
                getNetworkContentFiltering_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkContentFiltering()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkContentFiltering',
                updateNetworkContentFiltering_networkId: '<node property>', // (1) define node properties
                updateNetworkContentFiltering_updateNetworkContentFiltering: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkContentFilteringCategories()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkContentFilteringCategories',
                getNetworkContentFilteringCategories_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDevices',
                getNetworkDevices_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle claimNetworkDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'claimNetworkDevices',
                claimNetworkDevices_networkId: '<node property>', // (1) define node properties
                claimNetworkDevices_claimNetworkDevices: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDevicesConnectionStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDevicesConnectionStats',
                getNetworkDevicesConnectionStats_networkId: '<node property>', // (1) define node properties
                getNetworkDevicesConnectionStats_t0: '<node property>', // (1) define node properties
                getNetworkDevicesConnectionStats_t1: '<node property>', // (1) define node properties
                getNetworkDevicesConnectionStats_timespan: '<node property>', // (1) define node properties
                getNetworkDevicesConnectionStats_ssid: '<node property>', // (1) define node properties
                getNetworkDevicesConnectionStats_vlan: '<node property>', // (1) define node properties
                getNetworkDevicesConnectionStats_apTag: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDevicesLatencyStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDevicesLatencyStats',
                getNetworkDevicesLatencyStats_networkId: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_t0: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_t1: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_timespan: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_ssid: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_vlan: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_apTag: '<node property>', // (1) define node properties
                getNetworkDevicesLatencyStats_fields: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDevice',
                getNetworkDevice_networkId: '<node property>', // (1) define node properties
                getNetworkDevice_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkDevice',
                updateNetworkDevice_networkId: '<node property>', // (1) define node properties
                updateNetworkDevice_serial: '<node property>', // (1) define node properties
                updateNetworkDevice_updateNetworkDevice: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle blinkNetworkDeviceLeds()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'blinkNetworkDeviceLeds',
                blinkNetworkDeviceLeds_networkId: '<node property>', // (1) define node properties
                blinkNetworkDeviceLeds_serial: '<node property>', // (1) define node properties
                blinkNetworkDeviceLeds_blinkNetworkDeviceLeds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceConnectionStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceConnectionStats',
                getNetworkDeviceConnectionStats_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_serial: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_t0: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_t1: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_timespan: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_ssid: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_vlan: '<node property>', // (1) define node properties
                getNetworkDeviceConnectionStats_apTag: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceLatencyStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceLatencyStats',
                getNetworkDeviceLatencyStats_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_serial: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_t0: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_t1: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_timespan: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_ssid: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_vlan: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_apTag: '<node property>', // (1) define node properties
                getNetworkDeviceLatencyStats_fields: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceLldp_cdp()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceLldp_cdp',
                getNetworkDeviceLldp_cdp_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceLldp_cdp_serial: '<node property>', // (1) define node properties
                getNetworkDeviceLldp_cdp_timespan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceLossAndLatencyHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceLossAndLatencyHistory',
                getNetworkDeviceLossAndLatencyHistory_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_serial: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_t0: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_t1: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_timespan: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_resolution: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_uplink: '<node property>', // (1) define node properties
                getNetworkDeviceLossAndLatencyHistory_ip: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceManagementInterfaceSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceManagementInterfaceSettings',
                getNetworkDeviceManagementInterfaceSettings_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceManagementInterfaceSettings_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkDeviceManagementInterfaceSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkDeviceManagementInterfaceSettings',
                updateNetworkDeviceManagementInterfaceSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkDeviceManagementInterfaceSettings_serial: '<node property>', // (1) define node properties
                updateNetworkDeviceManagementInterfaceSettings_updateNetworkDeviceManagementInterfaceSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDevicePerformance()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDevicePerformance',
                getNetworkDevicePerformance_networkId: '<node property>', // (1) define node properties
                getNetworkDevicePerformance_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle rebootNetworkDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'rebootNetworkDevice',
                rebootNetworkDevice_networkId: '<node property>', // (1) define node properties
                rebootNetworkDevice_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle removeNetworkDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'removeNetworkDevice',
                removeNetworkDevice_networkId: '<node property>', // (1) define node properties
                removeNetworkDevice_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceUplink()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceUplink',
                getNetworkDeviceUplink_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceUplink_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceWirelessRadioSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceWirelessRadioSettings',
                getNetworkDeviceWirelessRadioSettings_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceWirelessRadioSettings_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkDeviceWirelessRadioSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkDeviceWirelessRadioSettings',
                updateNetworkDeviceWirelessRadioSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkDeviceWirelessRadioSettings_serial: '<node property>', // (1) define node properties
                updateNetworkDeviceWirelessRadioSettings_updateNetworkDeviceWirelessRadioSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkDeviceWirelessStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkDeviceWirelessStatus',
                getNetworkDeviceWirelessStatus_networkId: '<node property>', // (1) define node properties
                getNetworkDeviceWirelessStatus_serial: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkFailedConnections()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkFailedConnections',
                getNetworkFailedConnections_networkId: '<node property>', // (1) define node properties
                getNetworkFailedConnections_t0: '<node property>', // (1) define node properties
                getNetworkFailedConnections_t1: '<node property>', // (1) define node properties
                getNetworkFailedConnections_timespan: '<node property>', // (1) define node properties
                getNetworkFailedConnections_ssid: '<node property>', // (1) define node properties
                getNetworkFailedConnections_vlan: '<node property>', // (1) define node properties
                getNetworkFailedConnections_apTag: '<node property>', // (1) define node properties
                getNetworkFailedConnections_serial: '<node property>', // (1) define node properties
                getNetworkFailedConnections_clientId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkFirewalledServices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkFirewalledServices',
                getNetworkFirewalledServices_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkFirewalledService()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkFirewalledService',
                getNetworkFirewalledService_networkId: '<node property>', // (1) define node properties
                getNetworkFirewalledService_service: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkFirewalledService()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkFirewalledService',
                updateNetworkFirewalledService_networkId: '<node property>', // (1) define node properties
                updateNetworkFirewalledService_service: '<node property>', // (1) define node properties
                updateNetworkFirewalledService_updateNetworkFirewalledService: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkGroupPolicies()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkGroupPolicies',
                getNetworkGroupPolicies_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkGroupPolicy()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkGroupPolicy',
                createNetworkGroupPolicy_networkId: '<node property>', // (1) define node properties
                createNetworkGroupPolicy_createNetworkGroupPolicy: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkGroupPolicy()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkGroupPolicy',
                getNetworkGroupPolicy_networkId: '<node property>', // (1) define node properties
                getNetworkGroupPolicy_groupPolicyId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkGroupPolicy()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkGroupPolicy',
                updateNetworkGroupPolicy_networkId: '<node property>', // (1) define node properties
                updateNetworkGroupPolicy_groupPolicyId: '<node property>', // (1) define node properties
                updateNetworkGroupPolicy_updateNetworkGroupPolicy: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkGroupPolicy()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkGroupPolicy',
                deleteNetworkGroupPolicy_networkId: '<node property>', // (1) define node properties
                deleteNetworkGroupPolicy_groupPolicyId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkHttpServers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkHttpServers',
                getNetworkHttpServers_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkHttpServer()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkHttpServer',
                createNetworkHttpServer_networkId: '<node property>', // (1) define node properties
                createNetworkHttpServer_createNetworkHttpServer: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkHttpServersWebhookTest()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkHttpServersWebhookTest',
                createNetworkHttpServersWebhookTest_networkId: '<node property>', // (1) define node properties
                createNetworkHttpServersWebhookTest_createNetworkHttpServersWebhookTest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkHttpServersWebhookTest()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkHttpServersWebhookTest',
                getNetworkHttpServersWebhookTest_networkId: '<node property>', // (1) define node properties
                getNetworkHttpServersWebhookTest_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkHttpServer()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkHttpServer',
                getNetworkHttpServer_networkId: '<node property>', // (1) define node properties
                getNetworkHttpServer_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkHttpServer()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkHttpServer',
                updateNetworkHttpServer_networkId: '<node property>', // (1) define node properties
                updateNetworkHttpServer_id: '<node property>', // (1) define node properties
                updateNetworkHttpServer_updateNetworkHttpServer: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkHttpServer()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkHttpServer',
                deleteNetworkHttpServer_networkId: '<node property>', // (1) define node properties
                deleteNetworkHttpServer_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkL3FirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkL3FirewallRules',
                getNetworkL3FirewallRules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkL3FirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkL3FirewallRules',
                updateNetworkL3FirewallRules_networkId: '<node property>', // (1) define node properties
                updateNetworkL3FirewallRules_updateNetworkL3FirewallRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkL7FirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkL7FirewallRules',
                getNetworkL7FirewallRules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkL7FirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkL7FirewallRules',
                updateNetworkL7FirewallRules_networkId: '<node property>', // (1) define node properties
                updateNetworkL7FirewallRules_updateNetworkL7FirewallRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkL7FirewallRulesApplicationCategories()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkL7FirewallRulesApplicationCategories',
                getNetworkL7FirewallRulesApplicationCategories_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkLatencyStats()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkLatencyStats',
                getNetworkLatencyStats_networkId: '<node property>', // (1) define node properties
                getNetworkLatencyStats_t0: '<node property>', // (1) define node properties
                getNetworkLatencyStats_t1: '<node property>', // (1) define node properties
                getNetworkLatencyStats_timespan: '<node property>', // (1) define node properties
                getNetworkLatencyStats_ssid: '<node property>', // (1) define node properties
                getNetworkLatencyStats_vlan: '<node property>', // (1) define node properties
                getNetworkLatencyStats_apTag: '<node property>', // (1) define node properties
                getNetworkLatencyStats_fields: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkMerakiAuthUsers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkMerakiAuthUsers',
                getNetworkMerakiAuthUsers_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkMerakiAuthUser()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkMerakiAuthUser',
                getNetworkMerakiAuthUser_networkId: '<node property>', // (1) define node properties
                getNetworkMerakiAuthUser_merakiAuthUserId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkNetflowSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkNetflowSettings',
                getNetworkNetflowSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkNetflowSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkNetflowSettings',
                updateNetworkNetflowSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkNetflowSettings_updateNetworkNetflowSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkOneToManyNatRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkOneToManyNatRules',
                getNetworkOneToManyNatRules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkOneToManyNatRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkOneToManyNatRules',
                updateNetworkOneToManyNatRules_networkId: '<node property>', // (1) define node properties
                updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkOneToOneNatRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkOneToOneNatRules',
                getNetworkOneToOneNatRules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkOneToOneNatRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkOneToOneNatRules',
                updateNetworkOneToOneNatRules_networkId: '<node property>', // (1) define node properties
                updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkPiiPiiKeys()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkPiiPiiKeys',
                getNetworkPiiPiiKeys_networkId: '<node property>', // (1) define node properties
                getNetworkPiiPiiKeys_username: '<node property>', // (1) define node properties
                getNetworkPiiPiiKeys_email: '<node property>', // (1) define node properties
                getNetworkPiiPiiKeys_mac: '<node property>', // (1) define node properties
                getNetworkPiiPiiKeys_serial: '<node property>', // (1) define node properties
                getNetworkPiiPiiKeys_imei: '<node property>', // (1) define node properties
                getNetworkPiiPiiKeys_bluetoothMac: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkPiiRequests()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkPiiRequests',
                getNetworkPiiRequests_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkPiiRequest()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkPiiRequest',
                createNetworkPiiRequest_networkId: '<node property>', // (1) define node properties
                createNetworkPiiRequest_createNetworkPiiRequest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkPiiRequest()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkPiiRequest',
                getNetworkPiiRequest_networkId: '<node property>', // (1) define node properties
                getNetworkPiiRequest_requestId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkPiiRequest()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkPiiRequest',
                deleteNetworkPiiRequest_networkId: '<node property>', // (1) define node properties
                deleteNetworkPiiRequest_requestId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkPiiSmDevicesForKey()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkPiiSmDevicesForKey',
                getNetworkPiiSmDevicesForKey_networkId: '<node property>', // (1) define node properties
                getNetworkPiiSmDevicesForKey_username: '<node property>', // (1) define node properties
                getNetworkPiiSmDevicesForKey_email: '<node property>', // (1) define node properties
                getNetworkPiiSmDevicesForKey_mac: '<node property>', // (1) define node properties
                getNetworkPiiSmDevicesForKey_serial: '<node property>', // (1) define node properties
                getNetworkPiiSmDevicesForKey_imei: '<node property>', // (1) define node properties
                getNetworkPiiSmDevicesForKey_bluetoothMac: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkPiiSmOwnersForKey()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkPiiSmOwnersForKey',
                getNetworkPiiSmOwnersForKey_networkId: '<node property>', // (1) define node properties
                getNetworkPiiSmOwnersForKey_username: '<node property>', // (1) define node properties
                getNetworkPiiSmOwnersForKey_email: '<node property>', // (1) define node properties
                getNetworkPiiSmOwnersForKey_mac: '<node property>', // (1) define node properties
                getNetworkPiiSmOwnersForKey_serial: '<node property>', // (1) define node properties
                getNetworkPiiSmOwnersForKey_imei: '<node property>', // (1) define node properties
                getNetworkPiiSmOwnersForKey_bluetoothMac: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkPortForwardingRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkPortForwardingRules',
                getNetworkPortForwardingRules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkPortForwardingRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkPortForwardingRules',
                updateNetworkPortForwardingRules_networkId: '<node property>', // (1) define node properties
                updateNetworkPortForwardingRules_updateNetworkPortForwardingRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSecurityIntrusionSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSecurityIntrusionSettings',
                getNetworkSecurityIntrusionSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSecurityIntrusionSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSecurityIntrusionSettings',
                updateNetworkSecurityIntrusionSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkSecurityIntrusionSettings_updateNetworkSecurityIntrusionSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSecurityMalwareSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSecurityMalwareSettings',
                getNetworkSecurityMalwareSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSecurityMalwareSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSecurityMalwareSettings',
                updateNetworkSecurityMalwareSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkSecurityMalwareSettings_updateNetworkSecurityMalwareSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSecurityEvents()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSecurityEvents',
                getNetworkSecurityEvents_networkId: '<node property>', // (1) define node properties
                getNetworkSecurityEvents_t0: '<node property>', // (1) define node properties
                getNetworkSecurityEvents_t1: '<node property>', // (1) define node properties
                getNetworkSecurityEvents_timespan: '<node property>', // (1) define node properties
                getNetworkSecurityEvents_perPage: '<node property>', // (1) define node properties
                getNetworkSecurityEvents_startingAfter: '<node property>', // (1) define node properties
                getNetworkSecurityEvents_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSiteToSiteVpn()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSiteToSiteVpn',
                getNetworkSiteToSiteVpn_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSiteToSiteVpn()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSiteToSiteVpn',
                updateNetworkSiteToSiteVpn_networkId: '<node property>', // (1) define node properties
                updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpn: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSmAppPolaris()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSmAppPolaris',
                createNetworkSmAppPolaris_networkId: '<node property>', // (1) define node properties
                createNetworkSmAppPolaris_createNetworkSmAppPolaris: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmAppPolaris()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmAppPolaris',
                getNetworkSmAppPolaris_networkId: '<node property>', // (1) define node properties
                getNetworkSmAppPolaris_bundleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSmAppPolaris()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSmAppPolaris',
                updateNetworkSmAppPolaris_networkId: '<node property>', // (1) define node properties
                updateNetworkSmAppPolaris_appId: '<node property>', // (1) define node properties
                updateNetworkSmAppPolaris_updateNetworkSmAppPolaris: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkSmAppPolaris()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkSmAppPolaris',
                deleteNetworkSmAppPolaris_networkId: '<node property>', // (1) define node properties
                deleteNetworkSmAppPolaris_appId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSmBypassActivationLockAttempt()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSmBypassActivationLockAttempt',
                createNetworkSmBypassActivationLockAttempt_networkId: '<node property>', // (1) define node properties
                createNetworkSmBypassActivationLockAttempt_createNetworkSmBypassActivationLockAttempt: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmBypassActivationLockAttempt()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmBypassActivationLockAttempt',
                getNetworkSmBypassActivationLockAttempt_networkId: '<node property>', // (1) define node properties
                getNetworkSmBypassActivationLockAttempt_attemptId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSmDeviceFields()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSmDeviceFields',
                updateNetworkSmDeviceFields_networkId: '<node property>', // (1) define node properties
                updateNetworkSmDeviceFields_updateNetworkSmDeviceFields: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle wipeNetworkSmDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'wipeNetworkSmDevice',
                wipeNetworkSmDevice_networkId: '<node property>', // (1) define node properties
                wipeNetworkSmDevice_wipeNetworkSmDevice: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmDevices',
                getNetworkSmDevices_networkId: '<node property>', // (1) define node properties
                getNetworkSmDevices_fields: '<node property>', // (1) define node properties
                getNetworkSmDevices_wifiMacs: '<node property>', // (1) define node properties
                getNetworkSmDevices_serials: '<node property>', // (1) define node properties
                getNetworkSmDevices_ids: '<node property>', // (1) define node properties
                getNetworkSmDevices_scope: '<node property>', // (1) define node properties
                getNetworkSmDevices_batchToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle checkinNetworkSmDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'checkinNetworkSmDevices',
                checkinNetworkSmDevices_networkId: '<node property>', // (1) define node properties
                checkinNetworkSmDevices_checkinNetworkSmDevices: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle moveNetworkSmDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'moveNetworkSmDevices',
                moveNetworkSmDevices_networkId: '<node property>', // (1) define node properties
                moveNetworkSmDevices_moveNetworkSmDevices: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSmDevicesTags()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSmDevicesTags',
                updateNetworkSmDevicesTags_networkId: '<node property>', // (1) define node properties
                updateNetworkSmDevicesTags_updateNetworkSmDevicesTags: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle unenrollNetworkSmDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'unenrollNetworkSmDevice',
                unenrollNetworkSmDevice_networkId: '<node property>', // (1) define node properties
                unenrollNetworkSmDevice_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSmProfileClarity()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSmProfileClarity',
                createNetworkSmProfileClarity_networkId: '<node property>', // (1) define node properties
                createNetworkSmProfileClarity_createNetworkSmProfileClarity: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSmProfileClarity()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSmProfileClarity',
                updateNetworkSmProfileClarity_networkId: '<node property>', // (1) define node properties
                updateNetworkSmProfileClarity_profileId: '<node property>', // (1) define node properties
                updateNetworkSmProfileClarity_updateNetworkSmProfileClarity: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addNetworkSmProfileClarity()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'addNetworkSmProfileClarity',
                addNetworkSmProfileClarity_networkId: '<node property>', // (1) define node properties
                addNetworkSmProfileClarity_profileId: '<node property>', // (1) define node properties
                addNetworkSmProfileClarity_addNetworkSmProfileClarity: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmProfileClarity()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmProfileClarity',
                getNetworkSmProfileClarity_networkId: '<node property>', // (1) define node properties
                getNetworkSmProfileClarity_profileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkSmProfileClarity()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkSmProfileClarity',
                deleteNetworkSmProfileClarity_networkId: '<node property>', // (1) define node properties
                deleteNetworkSmProfileClarity_profileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSmProfileUmbrella()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSmProfileUmbrella',
                createNetworkSmProfileUmbrella_networkId: '<node property>', // (1) define node properties
                createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrella: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSmProfileUmbrella()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSmProfileUmbrella',
                updateNetworkSmProfileUmbrella_networkId: '<node property>', // (1) define node properties
                updateNetworkSmProfileUmbrella_profileId: '<node property>', // (1) define node properties
                updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrella: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addNetworkSmProfileUmbrella()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'addNetworkSmProfileUmbrella',
                addNetworkSmProfileUmbrella_networkId: '<node property>', // (1) define node properties
                addNetworkSmProfileUmbrella_profileId: '<node property>', // (1) define node properties
                addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrella: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmProfileUmbrella()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmProfileUmbrella',
                getNetworkSmProfileUmbrella_networkId: '<node property>', // (1) define node properties
                getNetworkSmProfileUmbrella_profileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkSmProfileUmbrella()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkSmProfileUmbrella',
                deleteNetworkSmProfileUmbrella_networkId: '<node property>', // (1) define node properties
                deleteNetworkSmProfileUmbrella_profileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmProfiles',
                getNetworkSmProfiles_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmTargetGroups()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmTargetGroups',
                getNetworkSmTargetGroups_networkId: '<node property>', // (1) define node properties
                getNetworkSmTargetGroups_withDetails: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSmTargetGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSmTargetGroup',
                createNetworkSmTargetGroup_networkId: '<node property>', // (1) define node properties
                createNetworkSmTargetGroup_createNetworkSmTargetGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmTargetGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmTargetGroup',
                getNetworkSmTargetGroup_networkId: '<node property>', // (1) define node properties
                getNetworkSmTargetGroup_targetGroupId: '<node property>', // (1) define node properties
                getNetworkSmTargetGroup_withDetails: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSmTargetGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSmTargetGroup',
                updateNetworkSmTargetGroup_networkId: '<node property>', // (1) define node properties
                updateNetworkSmTargetGroup_targetGroupId: '<node property>', // (1) define node properties
                updateNetworkSmTargetGroup_updateNetworkSmTargetGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkSmTargetGroup()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkSmTargetGroup',
                deleteNetworkSmTargetGroup_networkId: '<node property>', // (1) define node properties
                deleteNetworkSmTargetGroup_targetGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmUserDeviceProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmUserDeviceProfiles',
                getNetworkSmUserDeviceProfiles_networkId: '<node property>', // (1) define node properties
                getNetworkSmUserDeviceProfiles_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmUserSoftwares()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmUserSoftwares',
                getNetworkSmUserSoftwares_networkId: '<node property>', // (1) define node properties
                getNetworkSmUserSoftwares_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmUsers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmUsers',
                getNetworkSmUsers_networkId: '<node property>', // (1) define node properties
                getNetworkSmUsers_ids: '<node property>', // (1) define node properties
                getNetworkSmUsers_usernames: '<node property>', // (1) define node properties
                getNetworkSmUsers_emails: '<node property>', // (1) define node properties
                getNetworkSmUsers_scope: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmCellularUsageHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmCellularUsageHistory',
                getNetworkSmCellularUsageHistory_networkId: '<node property>', // (1) define node properties
                getNetworkSmCellularUsageHistory_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmCerts()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmCerts',
                getNetworkSmCerts_networkId: '<node property>', // (1) define node properties
                getNetworkSmCerts_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmDeviceProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmDeviceProfiles',
                getNetworkSmDeviceProfiles_networkId: '<node property>', // (1) define node properties
                getNetworkSmDeviceProfiles_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmNetworkAdapters()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmNetworkAdapters',
                getNetworkSmNetworkAdapters_networkId: '<node property>', // (1) define node properties
                getNetworkSmNetworkAdapters_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmRestrictions()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmRestrictions',
                getNetworkSmRestrictions_networkId: '<node property>', // (1) define node properties
                getNetworkSmRestrictions_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmSecurityCenters()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmSecurityCenters',
                getNetworkSmSecurityCenters_networkId: '<node property>', // (1) define node properties
                getNetworkSmSecurityCenters_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmSoftwares()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmSoftwares',
                getNetworkSmSoftwares_networkId: '<node property>', // (1) define node properties
                getNetworkSmSoftwares_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmWlanLists()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmWlanLists',
                getNetworkSmWlanLists_networkId: '<node property>', // (1) define node properties
                getNetworkSmWlanLists_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSnmpSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSnmpSettings',
                getNetworkSnmpSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSnmpSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSnmpSettings',
                updateNetworkSnmpSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkSnmpSettings_updateNetworkSnmpSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSplashLoginAttempts()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSplashLoginAttempts',
                getNetworkSplashLoginAttempts_networkId: '<node property>', // (1) define node properties
                getNetworkSplashLoginAttempts_ssidNumber: '<node property>', // (1) define node properties
                getNetworkSplashLoginAttempts_loginIdentifier: '<node property>', // (1) define node properties
                getNetworkSplashLoginAttempts_timespan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle splitNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'splitNetwork',
                splitNetwork_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSsids()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSsids',
                getNetworkSsids_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSsid()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSsid',
                getNetworkSsid_networkId: '<node property>', // (1) define node properties
                getNetworkSsid_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSsid()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSsid',
                updateNetworkSsid_networkId: '<node property>', // (1) define node properties
                updateNetworkSsid_number: '<node property>', // (1) define node properties
                updateNetworkSsid_updateNetworkSsid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSsidL3FirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSsidL3FirewallRules',
                getNetworkSsidL3FirewallRules_networkId: '<node property>', // (1) define node properties
                getNetworkSsidL3FirewallRules_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSsidL3FirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSsidL3FirewallRules',
                updateNetworkSsidL3FirewallRules_networkId: '<node property>', // (1) define node properties
                updateNetworkSsidL3FirewallRules_number: '<node property>', // (1) define node properties
                updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSsidSplashSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSsidSplashSettings',
                getNetworkSsidSplashSettings_networkId: '<node property>', // (1) define node properties
                getNetworkSsidSplashSettings_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSsidSplashSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSsidSplashSettings',
                updateNetworkSsidSplashSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkSsidSplashSettings_number: '<node property>', // (1) define node properties
                updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSsidTrafficShaping()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSsidTrafficShaping',
                updateNetworkSsidTrafficShaping_networkId: '<node property>', // (1) define node properties
                updateNetworkSsidTrafficShaping_number: '<node property>', // (1) define node properties
                updateNetworkSsidTrafficShaping_updateNetworkSsidTrafficShaping: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSsidTrafficShaping()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSsidTrafficShaping',
                getNetworkSsidTrafficShaping_networkId: '<node property>', // (1) define node properties
                getNetworkSsidTrafficShaping_number: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkStaticRoutes()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkStaticRoutes',
                getNetworkStaticRoutes_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkStaticRoute()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkStaticRoute',
                createNetworkStaticRoute_networkId: '<node property>', // (1) define node properties
                createNetworkStaticRoute_createNetworkStaticRoute: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkStaticRoute()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkStaticRoute',
                getNetworkStaticRoute_networkId: '<node property>', // (1) define node properties
                getNetworkStaticRoute_srId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkStaticRoute()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkStaticRoute',
                updateNetworkStaticRoute_networkId: '<node property>', // (1) define node properties
                updateNetworkStaticRoute_srId: '<node property>', // (1) define node properties
                updateNetworkStaticRoute_updateNetworkStaticRoute: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkStaticRoute()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkStaticRoute',
                deleteNetworkStaticRoute_networkId: '<node property>', // (1) define node properties
                deleteNetworkStaticRoute_srId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle swapNetworkWarmspare()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'swapNetworkWarmspare',
                swapNetworkWarmspare_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSwitchPortSchedules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSwitchPortSchedules',
                getNetworkSwitchPortSchedules_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSwitchPortSchedule()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSwitchPortSchedule',
                createNetworkSwitchPortSchedule_networkId: '<node property>', // (1) define node properties
                createNetworkSwitchPortSchedule_createNetworkSwitchPortSchedule: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkSwitchPortSchedule()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkSwitchPortSchedule',
                deleteNetworkSwitchPortSchedule_networkId: '<node property>', // (1) define node properties
                deleteNetworkSwitchPortSchedule_portScheduleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSwitchPortSchedule()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSwitchPortSchedule',
                updateNetworkSwitchPortSchedule_networkId: '<node property>', // (1) define node properties
                updateNetworkSwitchPortSchedule_portScheduleId: '<node property>', // (1) define node properties
                updateNetworkSwitchPortSchedule_updateNetworkSwitchPortSchedule: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSwitchSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSwitchSettings',
                getNetworkSwitchSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSwitchSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSwitchSettings',
                updateNetworkSwitchSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkSwitchSettings_updateNetworkSwitchSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSwitchStacks()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSwitchStacks',
                getNetworkSwitchStacks_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkSwitchStack()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkSwitchStack',
                createNetworkSwitchStack_networkId: '<node property>', // (1) define node properties
                createNetworkSwitchStack_createNetworkSwitchStack: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSwitchStack()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSwitchStack',
                getNetworkSwitchStack_networkId: '<node property>', // (1) define node properties
                getNetworkSwitchStack_switchStackId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkSwitchStack()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkSwitchStack',
                deleteNetworkSwitchStack_networkId: '<node property>', // (1) define node properties
                deleteNetworkSwitchStack_switchStackId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addNetworkSwitchStack()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'addNetworkSwitchStack',
                addNetworkSwitchStack_networkId: '<node property>', // (1) define node properties
                addNetworkSwitchStack_switchStackId: '<node property>', // (1) define node properties
                addNetworkSwitchStack_addNetworkSwitchStack: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSyslogServers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSyslogServers',
                getNetworkSyslogServers_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkSyslogServers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkSyslogServers',
                updateNetworkSyslogServers_networkId: '<node property>', // (1) define node properties
                updateNetworkSyslogServers_updateNetworkSyslogServers: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkTraffic()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkTraffic',
                getNetworkTraffic_networkId: '<node property>', // (1) define node properties
                getNetworkTraffic_timespan: '<node property>', // (1) define node properties
                getNetworkTraffic_deviceType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkTrafficAnalysisSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkTrafficAnalysisSettings',
                getNetworkTrafficAnalysisSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkTrafficAnalysisSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkTrafficAnalysisSettings',
                updateNetworkTrafficAnalysisSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkTrafficAnalysisSettings_updateNetworkTrafficAnalysisSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkTrafficShaping()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkTrafficShaping',
                updateNetworkTrafficShaping_networkId: '<node property>', // (1) define node properties
                updateNetworkTrafficShaping_updateNetworkTrafficShaping: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkTrafficShaping()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkTrafficShaping',
                getNetworkTrafficShaping_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkTrafficShapingApplicationCategories()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkTrafficShapingApplicationCategories',
                getNetworkTrafficShapingApplicationCategories_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkTrafficShapingDscpTaggingOptions()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkTrafficShapingDscpTaggingOptions',
                getNetworkTrafficShapingDscpTaggingOptions_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle unbindNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'unbindNetwork',
                unbindNetwork_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkUplinkSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkUplinkSettings',
                getNetworkUplinkSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkUplinkSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkUplinkSettings',
                updateNetworkUplinkSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkUplinkSettings_updateNetworkUplinkSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkVlans()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkVlans',
                getNetworkVlans_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkVlan()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkVlan',
                createNetworkVlan_networkId: '<node property>', // (1) define node properties
                createNetworkVlan_createNetworkVlan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkVlan()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkVlan',
                getNetworkVlan_networkId: '<node property>', // (1) define node properties
                getNetworkVlan_vlanId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkVlan()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkVlan',
                updateNetworkVlan_networkId: '<node property>', // (1) define node properties
                updateNetworkVlan_vlanId: '<node property>', // (1) define node properties
                updateNetworkVlan_updateNetworkVlan: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkVlan()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkVlan',
                deleteNetworkVlan_networkId: '<node property>', // (1) define node properties
                deleteNetworkVlan_vlanId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkVlansEnabledState()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkVlansEnabledState',
                getNetworkVlansEnabledState_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkVlansEnabledState()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkVlansEnabledState',
                updateNetworkVlansEnabledState_networkId: '<node property>', // (1) define node properties
                updateNetworkVlansEnabledState_updateNetworkVlansEnabledState: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkWarmSpareSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkWarmSpareSettings',
                getNetworkWarmSpareSettings_networkId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkWarmSpareSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkWarmSpareSettings',
                updateNetworkWarmSpareSettings_networkId: '<node property>', // (1) define node properties
                updateNetworkWarmSpareSettings_updateNetworkWarmSpareSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkWirelessRfProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkWirelessRfProfiles',
                getNetworkWirelessRfProfiles_networkId: '<node property>', // (1) define node properties
                getNetworkWirelessRfProfiles_includeTemplateProfiles: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createNetworkWirelessRfProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createNetworkWirelessRfProfile',
                createNetworkWirelessRfProfile_networkId: '<node property>', // (1) define node properties
                createNetworkWirelessRfProfile_createNetworkWirelessRfProfile: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateNetworkWirelessRfProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateNetworkWirelessRfProfile',
                updateNetworkWirelessRfProfile_networkId: '<node property>', // (1) define node properties
                updateNetworkWirelessRfProfile_rfProfileId: '<node property>', // (1) define node properties
                updateNetworkWirelessRfProfile_updateNetworkWirelessRfProfile: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteNetworkWirelessRfProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteNetworkWirelessRfProfile',
                deleteNetworkWirelessRfProfile_networkId: '<node property>', // (1) define node properties
                deleteNetworkWirelessRfProfile_rfProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkWirelessRfProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkWirelessRfProfile',
                getNetworkWirelessRfProfile_networkId: '<node property>', // (1) define node properties
                getNetworkWirelessRfProfile_rfProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle lockNetworkSmDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'lockNetworkSmDevices',
                lockNetworkSmDevices_networkId: '<node property>', // (1) define node properties
                lockNetworkSmDevices_lockNetworkSmDevices: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmConnectivity()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmConnectivity',
                getNetworkSmConnectivity_networkId: '<node property>', // (1) define node properties
                getNetworkSmConnectivity_id: '<node property>', // (1) define node properties
                getNetworkSmConnectivity_perPage: '<node property>', // (1) define node properties
                getNetworkSmConnectivity_startingAfter: '<node property>', // (1) define node properties
                getNetworkSmConnectivity_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmDesktopLogs()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmDesktopLogs',
                getNetworkSmDesktopLogs_networkId: '<node property>', // (1) define node properties
                getNetworkSmDesktopLogs_id: '<node property>', // (1) define node properties
                getNetworkSmDesktopLogs_perPage: '<node property>', // (1) define node properties
                getNetworkSmDesktopLogs_startingAfter: '<node property>', // (1) define node properties
                getNetworkSmDesktopLogs_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmDeviceCommandLogs()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmDeviceCommandLogs',
                getNetworkSmDeviceCommandLogs_networkId: '<node property>', // (1) define node properties
                getNetworkSmDeviceCommandLogs_id: '<node property>', // (1) define node properties
                getNetworkSmDeviceCommandLogs_perPage: '<node property>', // (1) define node properties
                getNetworkSmDeviceCommandLogs_startingAfter: '<node property>', // (1) define node properties
                getNetworkSmDeviceCommandLogs_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getNetworkSmPerformanceHistory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getNetworkSmPerformanceHistory',
                getNetworkSmPerformanceHistory_networkId: '<node property>', // (1) define node properties
                getNetworkSmPerformanceHistory_id: '<node property>', // (1) define node properties
                getNetworkSmPerformanceHistory_perPage: '<node property>', // (1) define node properties
                getNetworkSmPerformanceHistory_startingAfter: '<node property>', // (1) define node properties
                getNetworkSmPerformanceHistory_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizations()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizations',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createOrganization()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createOrganization',
                createOrganization_createOrganization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganization()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganization',
                getOrganization_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganization()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganization',
                updateOrganization_organizationId: '<node property>', // (1) define node properties
                updateOrganization_updateOrganization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteOrganization()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteOrganization',
                deleteOrganization_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createOrganizationActionBatch()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createOrganizationActionBatch',
                createOrganizationActionBatch_organizationId: '<node property>', // (1) define node properties
                createOrganizationActionBatch_createOrganizationActionBatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationActionBatches()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationActionBatches',
                getOrganizationActionBatches_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationActionBatch()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationActionBatch',
                getOrganizationActionBatch_organizationId: '<node property>', // (1) define node properties
                getOrganizationActionBatch_actionBatchId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteOrganizationActionBatch()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteOrganizationActionBatch',
                deleteOrganizationActionBatch_organizationId: '<node property>', // (1) define node properties
                deleteOrganizationActionBatch_actionBatchId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationActionBatch()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationActionBatch',
                updateOrganizationActionBatch_organizationId: '<node property>', // (1) define node properties
                updateOrganizationActionBatch_actionBatchId: '<node property>', // (1) define node properties
                updateOrganizationActionBatch_updateOrganizationActionBatch: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationAdmins()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationAdmins',
                getOrganizationAdmins_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createOrganizationAdmin()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createOrganizationAdmin',
                createOrganizationAdmin_organizationId: '<node property>', // (1) define node properties
                createOrganizationAdmin_createOrganizationAdmin: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationAdmin()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationAdmin',
                updateOrganizationAdmin_organizationId: '<node property>', // (1) define node properties
                updateOrganizationAdmin_id: '<node property>', // (1) define node properties
                updateOrganizationAdmin_updateOrganizationAdmin: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteOrganizationAdmin()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteOrganizationAdmin',
                deleteOrganizationAdmin_organizationId: '<node property>', // (1) define node properties
                deleteOrganizationAdmin_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationApiRequests()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationApiRequests',
                getOrganizationApiRequests_organizationId: '<node property>', // (1) define node properties
                getOrganizationApiRequests_t0: '<node property>', // (1) define node properties
                getOrganizationApiRequests_t1: '<node property>', // (1) define node properties
                getOrganizationApiRequests_timespan: '<node property>', // (1) define node properties
                getOrganizationApiRequests_perPage: '<node property>', // (1) define node properties
                getOrganizationApiRequests_startingAfter: '<node property>', // (1) define node properties
                getOrganizationApiRequests_endingBefore: '<node property>', // (1) define node properties
                getOrganizationApiRequests_adminId: '<node property>', // (1) define node properties
                getOrganizationApiRequests_path: '<node property>', // (1) define node properties
                getOrganizationApiRequests_method: '<node property>', // (1) define node properties
                getOrganizationApiRequests_responseCode: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle claimOrganization()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'claimOrganization',
                claimOrganization_organizationId: '<node property>', // (1) define node properties
                claimOrganization_claimOrganization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle cloneOrganization()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'cloneOrganization',
                cloneOrganization_organizationId: '<node property>', // (1) define node properties
                cloneOrganization_cloneOrganization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationConfigTemplates()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationConfigTemplates',
                getOrganizationConfigTemplates_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteOrganizationConfigTemplate()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteOrganizationConfigTemplate',
                deleteOrganizationConfigTemplate_organizationId: '<node property>', // (1) define node properties
                deleteOrganizationConfigTemplate_configTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationConfigTemplateSwitchProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationConfigTemplateSwitchProfiles',
                getOrganizationConfigTemplateSwitchProfiles_organizationId: '<node property>', // (1) define node properties
                getOrganizationConfigTemplateSwitchProfiles_configTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationDeviceStatuses()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationDeviceStatuses',
                getOrganizationDeviceStatuses_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationDevices',
                getOrganizationDevices_organizationId: '<node property>', // (1) define node properties
                getOrganizationDevices_perPage: '<node property>', // (1) define node properties
                getOrganizationDevices_startingAfter: '<node property>', // (1) define node properties
                getOrganizationDevices_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationInventory()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationInventory',
                getOrganizationInventory_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationLicenseState()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationLicenseState',
                getOrganizationLicenseState_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationNetworks()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationNetworks',
                getOrganizationNetworks_organizationId: '<node property>', // (1) define node properties
                getOrganizationNetworks_configTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createOrganizationNetwork()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createOrganizationNetwork',
                createOrganizationNetwork_organizationId: '<node property>', // (1) define node properties
                createOrganizationNetwork_createOrganizationNetwork: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle combineOrganizationNetworks()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'combineOrganizationNetworks',
                combineOrganizationNetworks_organizationId: '<node property>', // (1) define node properties
                combineOrganizationNetworks_combineOrganizationNetworks: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationOpenapiSpec()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationOpenapiSpec',
                getOrganizationOpenapiSpec_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationSamlRoles()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationSamlRoles',
                getOrganizationSamlRoles_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createOrganizationSamlRole()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'createOrganizationSamlRole',
                createOrganizationSamlRole_organizationId: '<node property>', // (1) define node properties
                createOrganizationSamlRole_createOrganizationSamlRole: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationSamlRole()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationSamlRole',
                getOrganizationSamlRole_organizationId: '<node property>', // (1) define node properties
                getOrganizationSamlRole_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationSamlRole()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationSamlRole',
                updateOrganizationSamlRole_organizationId: '<node property>', // (1) define node properties
                updateOrganizationSamlRole_id: '<node property>', // (1) define node properties
                updateOrganizationSamlRole_updateOrganizationSamlRole: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteOrganizationSamlRole()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'deleteOrganizationSamlRole',
                deleteOrganizationSamlRole_organizationId: '<node property>', // (1) define node properties
                deleteOrganizationSamlRole_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationSecurityIntrusionSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationSecurityIntrusionSettings',
                getOrganizationSecurityIntrusionSettings_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationSecurityIntrusionSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationSecurityIntrusionSettings',
                updateOrganizationSecurityIntrusionSettings_organizationId: '<node property>', // (1) define node properties
                updateOrganizationSecurityIntrusionSettings_updateOrganizationSecurityIntrusionSettings: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationSecurityEvents()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationSecurityEvents',
                getOrganizationSecurityEvents_organizationId: '<node property>', // (1) define node properties
                getOrganizationSecurityEvents_t0: '<node property>', // (1) define node properties
                getOrganizationSecurityEvents_t1: '<node property>', // (1) define node properties
                getOrganizationSecurityEvents_timespan: '<node property>', // (1) define node properties
                getOrganizationSecurityEvents_perPage: '<node property>', // (1) define node properties
                getOrganizationSecurityEvents_startingAfter: '<node property>', // (1) define node properties
                getOrganizationSecurityEvents_endingBefore: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationSnmp()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationSnmp',
                getOrganizationSnmp_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationSnmp()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationSnmp',
                updateOrganizationSnmp_organizationId: '<node property>', // (1) define node properties
                updateOrganizationSnmp_updateOrganizationSnmp: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationThirdPartyVPNPeers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationThirdPartyVPNPeers',
                getOrganizationThirdPartyVPNPeers_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationThirdPartyVPNPeers()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationThirdPartyVPNPeers',
                updateOrganizationThirdPartyVPNPeers_organizationId: '<node property>', // (1) define node properties
                updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeers: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationUplinksLossAndLatency()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationUplinksLossAndLatency',
                getOrganizationUplinksLossAndLatency_organizationId: '<node property>', // (1) define node properties
                getOrganizationUplinksLossAndLatency_t0: '<node property>', // (1) define node properties
                getOrganizationUplinksLossAndLatency_t1: '<node property>', // (1) define node properties
                getOrganizationUplinksLossAndLatency_timespan: '<node property>', // (1) define node properties
                getOrganizationUplinksLossAndLatency_uplink: '<node property>', // (1) define node properties
                getOrganizationUplinksLossAndLatency_ip: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationVpnFirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationVpnFirewallRules',
                getOrganizationVpnFirewallRules_organizationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateOrganizationVpnFirewallRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'updateOrganizationVpnFirewallRules',
                updateOrganizationVpnFirewallRules_organizationId: '<node property>', // (1) define node properties
                updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRules: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOrganizationWebhookLogs()', function (done) {
        var flow = [
            { id: 'n1', type: 'meraki-dashboard-api', name: 'meraki-dashboard-api',
                method: 'getOrganizationWebhookLogs',
                getOrganizationWebhookLogs_organizationId: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_t0: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_t1: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_timespan: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_perPage: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_startingAfter: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_endingBefore: '<node property>', // (1) define node properties
                getOrganizationWebhookLogs_url: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'meraki-dashboard-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
