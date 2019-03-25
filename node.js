'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function MerakiDashboardApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.getOrganizationAdmins_organizationId = config.getOrganizationAdmins_organizationId;
        this.getOrganizationAdmins_organizationIdType = config.getOrganizationAdmins_organizationIdType || 'str';
        this.createOrganizationAdmins_organizationId = config.createOrganizationAdmins_organizationId;
        this.createOrganizationAdmins_organizationIdType = config.createOrganizationAdmins_organizationIdType || 'str';
        this.createOrganizationAdmins_createOrganizationAdmins = config.createOrganizationAdmins_createOrganizationAdmins;
        this.createOrganizationAdmins_createOrganizationAdminsType = config.createOrganizationAdmins_createOrganizationAdminsType || 'str';
        this.updateOrganizationAdmin_organizationId = config.updateOrganizationAdmin_organizationId;
        this.updateOrganizationAdmin_organizationIdType = config.updateOrganizationAdmin_organizationIdType || 'str';
        this.updateOrganizationAdmin_id = config.updateOrganizationAdmin_id;
        this.updateOrganizationAdmin_idType = config.updateOrganizationAdmin_idType || 'str';
        this.updateOrganizationAdmin_updateOrganizationAdmin = config.updateOrganizationAdmin_updateOrganizationAdmin;
        this.updateOrganizationAdmin_updateOrganizationAdminType = config.updateOrganizationAdmin_updateOrganizationAdminType || 'str';
        this.deleteOrganizationAdmin_organizationId = config.deleteOrganizationAdmin_organizationId;
        this.deleteOrganizationAdmin_organizationIdType = config.deleteOrganizationAdmin_organizationIdType || 'str';
        this.deleteOrganizationAdmin_id = config.deleteOrganizationAdmin_id;
        this.deleteOrganizationAdmin_idType = config.deleteOrganizationAdmin_idType || 'str';
        this.getNetworkAlertSettings_networkId = config.getNetworkAlertSettings_networkId;
        this.getNetworkAlertSettings_networkIdType = config.getNetworkAlertSettings_networkIdType || 'str';
        this.updateNetworkAlertSettings_networkId = config.updateNetworkAlertSettings_networkId;
        this.updateNetworkAlertSettings_networkIdType = config.updateNetworkAlertSettings_networkIdType || 'str';
        this.updateNetworkAlertSettings_updateNetworkAlertSettings = config.updateNetworkAlertSettings_updateNetworkAlertSettings;
        this.updateNetworkAlertSettings_updateNetworkAlertSettingsType = config.updateNetworkAlertSettings_updateNetworkAlertSettingsType || 'str';
        this.getDeviceCameraAnalyticsZones_serial = config.getDeviceCameraAnalyticsZones_serial;
        this.getDeviceCameraAnalyticsZones_serialType = config.getDeviceCameraAnalyticsZones_serialType || 'str';
        this.getDeviceCameraAnalyticsRecent_serial = config.getDeviceCameraAnalyticsRecent_serial;
        this.getDeviceCameraAnalyticsRecent_serialType = config.getDeviceCameraAnalyticsRecent_serialType || 'str';
        this.getDeviceCameraAnalyticsLive_serial = config.getDeviceCameraAnalyticsLive_serial;
        this.getDeviceCameraAnalyticsLive_serialType = config.getDeviceCameraAnalyticsLive_serialType || 'str';
        this.getDeviceCameraAnalyticsOverview_serial = config.getDeviceCameraAnalyticsOverview_serial;
        this.getDeviceCameraAnalyticsOverview_serialType = config.getDeviceCameraAnalyticsOverview_serialType || 'str';
        this.getDeviceCameraAnalyticsOverview_t0 = config.getDeviceCameraAnalyticsOverview_t0;
        this.getDeviceCameraAnalyticsOverview_t0Type = config.getDeviceCameraAnalyticsOverview_t0Type || 'str';
        this.getDeviceCameraAnalyticsOverview_t1 = config.getDeviceCameraAnalyticsOverview_t1;
        this.getDeviceCameraAnalyticsOverview_t1Type = config.getDeviceCameraAnalyticsOverview_t1Type || 'str';
        this.getDeviceCameraAnalyticsOverview_timespan = config.getDeviceCameraAnalyticsOverview_timespan;
        this.getDeviceCameraAnalyticsOverview_timespanType = config.getDeviceCameraAnalyticsOverview_timespanType || 'str';
        this.getDeviceCameraAnalyticsZoneHistory_serial = config.getDeviceCameraAnalyticsZoneHistory_serial;
        this.getDeviceCameraAnalyticsZoneHistory_serialType = config.getDeviceCameraAnalyticsZoneHistory_serialType || 'str';
        this.getDeviceCameraAnalyticsZoneHistory_zoneId = config.getDeviceCameraAnalyticsZoneHistory_zoneId;
        this.getDeviceCameraAnalyticsZoneHistory_zoneIdType = config.getDeviceCameraAnalyticsZoneHistory_zoneIdType || 'str';
        this.getDeviceCameraAnalyticsZoneHistory_t0 = config.getDeviceCameraAnalyticsZoneHistory_t0;
        this.getDeviceCameraAnalyticsZoneHistory_t0Type = config.getDeviceCameraAnalyticsZoneHistory_t0Type || 'str';
        this.getDeviceCameraAnalyticsZoneHistory_t1 = config.getDeviceCameraAnalyticsZoneHistory_t1;
        this.getDeviceCameraAnalyticsZoneHistory_t1Type = config.getDeviceCameraAnalyticsZoneHistory_t1Type || 'str';
        this.getDeviceCameraAnalyticsZoneHistory_timespan = config.getDeviceCameraAnalyticsZoneHistory_timespan;
        this.getDeviceCameraAnalyticsZoneHistory_timespanType = config.getDeviceCameraAnalyticsZoneHistory_timespanType || 'str';
        this.getDeviceCameraAnalyticsZoneHistory_resolution = config.getDeviceCameraAnalyticsZoneHistory_resolution;
        this.getDeviceCameraAnalyticsZoneHistory_resolutionType = config.getDeviceCameraAnalyticsZoneHistory_resolutionType || 'str';
        this.getOrganizationApiRequests_organizationId = config.getOrganizationApiRequests_organizationId;
        this.getOrganizationApiRequests_organizationIdType = config.getOrganizationApiRequests_organizationIdType || 'str';
        this.getOrganizationApiRequests_t0 = config.getOrganizationApiRequests_t0;
        this.getOrganizationApiRequests_t0Type = config.getOrganizationApiRequests_t0Type || 'str';
        this.getOrganizationApiRequests_t1 = config.getOrganizationApiRequests_t1;
        this.getOrganizationApiRequests_t1Type = config.getOrganizationApiRequests_t1Type || 'str';
        this.getOrganizationApiRequests_timespan = config.getOrganizationApiRequests_timespan;
        this.getOrganizationApiRequests_timespanType = config.getOrganizationApiRequests_timespanType || 'str';
        this.getOrganizationApiRequests_perPage = config.getOrganizationApiRequests_perPage;
        this.getOrganizationApiRequests_perPageType = config.getOrganizationApiRequests_perPageType || 'str';
        this.getOrganizationApiRequests_startingAfter = config.getOrganizationApiRequests_startingAfter;
        this.getOrganizationApiRequests_startingAfterType = config.getOrganizationApiRequests_startingAfterType || 'str';
        this.getOrganizationApiRequests_endingBefore = config.getOrganizationApiRequests_endingBefore;
        this.getOrganizationApiRequests_endingBeforeType = config.getOrganizationApiRequests_endingBeforeType || 'str';
        this.getOrganizationApiRequests_adminId = config.getOrganizationApiRequests_adminId;
        this.getOrganizationApiRequests_adminIdType = config.getOrganizationApiRequests_adminIdType || 'str';
        this.getOrganizationApiRequests_path = config.getOrganizationApiRequests_path;
        this.getOrganizationApiRequests_pathType = config.getOrganizationApiRequests_pathType || 'str';
        this.getOrganizationApiRequests_method = config.getOrganizationApiRequests_method;
        this.getOrganizationApiRequests_methodType = config.getOrganizationApiRequests_methodType || 'str';
        this.getNetworkBluetoothClient_networkId = config.getNetworkBluetoothClient_networkId;
        this.getNetworkBluetoothClient_networkIdType = config.getNetworkBluetoothClient_networkIdType || 'str';
        this.getNetworkBluetoothClient_id = config.getNetworkBluetoothClient_id;
        this.getNetworkBluetoothClient_idType = config.getNetworkBluetoothClient_idType || 'str';
        this.getNetworkBluetoothClient_includeConnectivityHistory = config.getNetworkBluetoothClient_includeConnectivityHistory;
        this.getNetworkBluetoothClient_includeConnectivityHistoryType = config.getNetworkBluetoothClient_includeConnectivityHistoryType || 'str';
        this.getNetworkBluetoothClient_connectivityHistoryTimespan = config.getNetworkBluetoothClient_connectivityHistoryTimespan;
        this.getNetworkBluetoothClient_connectivityHistoryTimespanType = config.getNetworkBluetoothClient_connectivityHistoryTimespanType || 'str';
        this.getNetworkBluetoothClients_networkId = config.getNetworkBluetoothClients_networkId;
        this.getNetworkBluetoothClients_networkIdType = config.getNetworkBluetoothClients_networkIdType || 'str';
        this.getNetworkBluetoothClients_perPage = config.getNetworkBluetoothClients_perPage;
        this.getNetworkBluetoothClients_perPageType = config.getNetworkBluetoothClients_perPageType || 'str';
        this.getNetworkBluetoothClients_startingAfter = config.getNetworkBluetoothClients_startingAfter;
        this.getNetworkBluetoothClients_startingAfterType = config.getNetworkBluetoothClients_startingAfterType || 'str';
        this.getNetworkBluetoothClients_endingBefore = config.getNetworkBluetoothClients_endingBefore;
        this.getNetworkBluetoothClients_endingBeforeType = config.getNetworkBluetoothClients_endingBeforeType || 'str';
        this.getNetworkBluetoothClients_timespan = config.getNetworkBluetoothClients_timespan;
        this.getNetworkBluetoothClients_timespanType = config.getNetworkBluetoothClients_timespanType || 'str';
        this.getNetworkBluetoothClients_includeConnectivityHistory = config.getNetworkBluetoothClients_includeConnectivityHistory;
        this.getNetworkBluetoothClients_includeConnectivityHistoryType = config.getNetworkBluetoothClients_includeConnectivityHistoryType || 'str';
        this.getNetworkBluetoothSettings_networkId = config.getNetworkBluetoothSettings_networkId;
        this.getNetworkBluetoothSettings_networkIdType = config.getNetworkBluetoothSettings_networkIdType || 'str';
        this.updateNetworkBluetoothSettings_networkId = config.updateNetworkBluetoothSettings_networkId;
        this.updateNetworkBluetoothSettings_networkIdType = config.updateNetworkBluetoothSettings_networkIdType || 'str';
        this.updateNetworkBluetoothSettings_updateNetworkBluetoothSettings = config.updateNetworkBluetoothSettings_updateNetworkBluetoothSettings;
        this.updateNetworkBluetoothSettings_updateNetworkBluetoothSettingsType = config.updateNetworkBluetoothSettings_updateNetworkBluetoothSettingsType || 'str';
        this.getOrganizationNetworks_organizationId = config.getOrganizationNetworks_organizationId;
        this.getOrganizationNetworks_organizationIdType = config.getOrganizationNetworks_organizationIdType || 'str';
        this.getOrganizationNetworks_configTemplateId = config.getOrganizationNetworks_configTemplateId;
        this.getOrganizationNetworks_configTemplateIdType = config.getOrganizationNetworks_configTemplateIdType || 'str';
        this.createOrganizationNetworks_organizationId = config.createOrganizationNetworks_organizationId;
        this.createOrganizationNetworks_organizationIdType = config.createOrganizationNetworks_organizationIdType || 'str';
        this.createOrganizationNetworks_createOrganizationNetworks = config.createOrganizationNetworks_createOrganizationNetworks;
        this.createOrganizationNetworks_createOrganizationNetworksType = config.createOrganizationNetworks_createOrganizationNetworksType || 'str';
        this.getNetwork_networkId = config.getNetwork_networkId;
        this.getNetwork_networkIdType = config.getNetwork_networkIdType || 'str';
        this.updateNetwork_networkId = config.updateNetwork_networkId;
        this.updateNetwork_networkIdType = config.updateNetwork_networkIdType || 'str';
        this.updateNetwork_updateNetwork = config.updateNetwork_updateNetwork;
        this.updateNetwork_updateNetworkType = config.updateNetwork_updateNetworkType || 'str';
        this.deleteNetwork_networkId = config.deleteNetwork_networkId;
        this.deleteNetwork_networkIdType = config.deleteNetwork_networkIdType || 'str';
        this.bindNetwork_networkId = config.bindNetwork_networkId;
        this.bindNetwork_networkIdType = config.bindNetwork_networkIdType || 'str';
        this.bindNetwork_bindNetwork = config.bindNetwork_bindNetwork;
        this.bindNetwork_bindNetworkType = config.bindNetwork_bindNetworkType || 'str';
        this.unbindNetwork_networkId = config.unbindNetwork_networkId;
        this.unbindNetwork_networkIdType = config.unbindNetwork_networkIdType || 'str';
        this.getNetworkTraffic_networkId = config.getNetworkTraffic_networkId;
        this.getNetworkTraffic_networkIdType = config.getNetworkTraffic_networkIdType || 'str';
        this.getNetworkTraffic_timespan = config.getNetworkTraffic_timespan;
        this.getNetworkTraffic_timespanType = config.getNetworkTraffic_timespanType || 'str';
        this.getNetworkTraffic_deviceType = config.getNetworkTraffic_deviceType;
        this.getNetworkTraffic_deviceTypeType = config.getNetworkTraffic_deviceTypeType || 'str';
        this.getNetworkAccessPolicies_networkId = config.getNetworkAccessPolicies_networkId;
        this.getNetworkAccessPolicies_networkIdType = config.getNetworkAccessPolicies_networkIdType || 'str';
        this.getNetworkAirMarshal_networkId = config.getNetworkAirMarshal_networkId;
        this.getNetworkAirMarshal_networkIdType = config.getNetworkAirMarshal_networkIdType || 'str';
        this.getNetworkAirMarshal_t0 = config.getNetworkAirMarshal_t0;
        this.getNetworkAirMarshal_t0Type = config.getNetworkAirMarshal_t0Type || 'str';
        this.getNetworkAirMarshal_timespan = config.getNetworkAirMarshal_timespan;
        this.getNetworkAirMarshal_timespanType = config.getNetworkAirMarshal_timespanType || 'str';
        this.getNetworkSiteToSiteVpn_networkId = config.getNetworkSiteToSiteVpn_networkId;
        this.getNetworkSiteToSiteVpn_networkIdType = config.getNetworkSiteToSiteVpn_networkIdType || 'str';
        this.updateNetworkSiteToSiteVpn_networkId = config.updateNetworkSiteToSiteVpn_networkId;
        this.updateNetworkSiteToSiteVpn_networkIdType = config.updateNetworkSiteToSiteVpn_networkIdType || 'str';
        this.updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpn = config.updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpn;
        this.updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpnType = config.updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpnType || 'str';
        this.getNetworkCameraVideoLink_networkId = config.getNetworkCameraVideoLink_networkId;
        this.getNetworkCameraVideoLink_networkIdType = config.getNetworkCameraVideoLink_networkIdType || 'str';
        this.getNetworkCameraVideoLink_serial = config.getNetworkCameraVideoLink_serial;
        this.getNetworkCameraVideoLink_serialType = config.getNetworkCameraVideoLink_serialType || 'str';
        this.getNetworkCameraVideoLink_timestamp = config.getNetworkCameraVideoLink_timestamp;
        this.getNetworkCameraVideoLink_timestampType = config.getNetworkCameraVideoLink_timestampType || 'str';
        this.snapshotNetworkCamera_networkId = config.snapshotNetworkCamera_networkId;
        this.snapshotNetworkCamera_networkIdType = config.snapshotNetworkCamera_networkIdType || 'str';
        this.snapshotNetworkCamera_serial = config.snapshotNetworkCamera_serial;
        this.snapshotNetworkCamera_serialType = config.snapshotNetworkCamera_serialType || 'str';
        this.snapshotNetworkCamera_snapshotNetworkCamera = config.snapshotNetworkCamera_snapshotNetworkCamera;
        this.snapshotNetworkCamera_snapshotNetworkCameraType = config.snapshotNetworkCamera_snapshotNetworkCameraType || 'str';
        this.getDeviceClients_serial = config.getDeviceClients_serial;
        this.getDeviceClients_serialType = config.getDeviceClients_serialType || 'str';
        this.getDeviceClients_timespan = config.getDeviceClients_timespan;
        this.getDeviceClients_timespanType = config.getDeviceClients_timespanType || 'str';
        this.getNetworkClient_networkId = config.getNetworkClient_networkId;
        this.getNetworkClient_networkIdType = config.getNetworkClient_networkIdType || 'str';
        this.getNetworkClient_idOrMacOrIp = config.getNetworkClient_idOrMacOrIp;
        this.getNetworkClient_idOrMacOrIpType = config.getNetworkClient_idOrMacOrIpType || 'str';
        this.provisionNetworkClients_networkId = config.provisionNetworkClients_networkId;
        this.provisionNetworkClients_networkIdType = config.provisionNetworkClients_networkIdType || 'str';
        this.provisionNetworkClients_provisionNetworkClients = config.provisionNetworkClients_provisionNetworkClients;
        this.provisionNetworkClients_provisionNetworkClientsType = config.provisionNetworkClients_provisionNetworkClientsType || 'str';
        this.getNetworkClientUsageHistory_networkId = config.getNetworkClientUsageHistory_networkId;
        this.getNetworkClientUsageHistory_networkIdType = config.getNetworkClientUsageHistory_networkIdType || 'str';
        this.getNetworkClientUsageHistory_idOrMacOrIp = config.getNetworkClientUsageHistory_idOrMacOrIp;
        this.getNetworkClientUsageHistory_idOrMacOrIpType = config.getNetworkClientUsageHistory_idOrMacOrIpType || 'str';
        this.getNetworkClientPolicy_networkId = config.getNetworkClientPolicy_networkId;
        this.getNetworkClientPolicy_networkIdType = config.getNetworkClientPolicy_networkIdType || 'str';
        this.getNetworkClientPolicy_mac = config.getNetworkClientPolicy_mac;
        this.getNetworkClientPolicy_macType = config.getNetworkClientPolicy_macType || 'str';
        this.getNetworkClientPolicy_timespan = config.getNetworkClientPolicy_timespan;
        this.getNetworkClientPolicy_timespanType = config.getNetworkClientPolicy_timespanType || 'str';
        this.updateNetworkClientPolicy_networkId = config.updateNetworkClientPolicy_networkId;
        this.updateNetworkClientPolicy_networkIdType = config.updateNetworkClientPolicy_networkIdType || 'str';
        this.updateNetworkClientPolicy_mac = config.updateNetworkClientPolicy_mac;
        this.updateNetworkClientPolicy_macType = config.updateNetworkClientPolicy_macType || 'str';
        this.updateNetworkClientPolicy_updateNetworkClientPolicy = config.updateNetworkClientPolicy_updateNetworkClientPolicy;
        this.updateNetworkClientPolicy_updateNetworkClientPolicyType = config.updateNetworkClientPolicy_updateNetworkClientPolicyType || 'str';
        this.getNetworkClientSplashAuthorizationStatus_id = config.getNetworkClientSplashAuthorizationStatus_id;
        this.getNetworkClientSplashAuthorizationStatus_idType = config.getNetworkClientSplashAuthorizationStatus_idType || 'str';
        this.getNetworkClientSplashAuthorizationStatus_mac = config.getNetworkClientSplashAuthorizationStatus_mac;
        this.getNetworkClientSplashAuthorizationStatus_macType = config.getNetworkClientSplashAuthorizationStatus_macType || 'str';
        this.updateNetworkClientSplashAuthorizationStatus_id = config.updateNetworkClientSplashAuthorizationStatus_id;
        this.updateNetworkClientSplashAuthorizationStatus_idType = config.updateNetworkClientSplashAuthorizationStatus_idType || 'str';
        this.updateNetworkClientSplashAuthorizationStatus_mac = config.updateNetworkClientSplashAuthorizationStatus_mac;
        this.updateNetworkClientSplashAuthorizationStatus_macType = config.updateNetworkClientSplashAuthorizationStatus_macType || 'str';
        this.updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatus = config.updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatus;
        this.updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatusType = config.updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatusType || 'str';
        this.getNetworkClientTrafficHistory_networkId = config.getNetworkClientTrafficHistory_networkId;
        this.getNetworkClientTrafficHistory_networkIdType = config.getNetworkClientTrafficHistory_networkIdType || 'str';
        this.getNetworkClientTrafficHistory_idOrMacOrIp = config.getNetworkClientTrafficHistory_idOrMacOrIp;
        this.getNetworkClientTrafficHistory_idOrMacOrIpType = config.getNetworkClientTrafficHistory_idOrMacOrIpType || 'str';
        this.getNetworkClientTrafficHistory_perPage = config.getNetworkClientTrafficHistory_perPage;
        this.getNetworkClientTrafficHistory_perPageType = config.getNetworkClientTrafficHistory_perPageType || 'str';
        this.getNetworkClientTrafficHistory_startingAfter = config.getNetworkClientTrafficHistory_startingAfter;
        this.getNetworkClientTrafficHistory_startingAfterType = config.getNetworkClientTrafficHistory_startingAfterType || 'str';
        this.getNetworkClientTrafficHistory_endingBefore = config.getNetworkClientTrafficHistory_endingBefore;
        this.getNetworkClientTrafficHistory_endingBeforeType = config.getNetworkClientTrafficHistory_endingBeforeType || 'str';
        this.getNetworkClientEvents_networkId = config.getNetworkClientEvents_networkId;
        this.getNetworkClientEvents_networkIdType = config.getNetworkClientEvents_networkIdType || 'str';
        this.getNetworkClientEvents_idOrMacOrIp = config.getNetworkClientEvents_idOrMacOrIp;
        this.getNetworkClientEvents_idOrMacOrIpType = config.getNetworkClientEvents_idOrMacOrIpType || 'str';
        this.getNetworkClientEvents_perPage = config.getNetworkClientEvents_perPage;
        this.getNetworkClientEvents_perPageType = config.getNetworkClientEvents_perPageType || 'str';
        this.getNetworkClientEvents_startingAfter = config.getNetworkClientEvents_startingAfter;
        this.getNetworkClientEvents_startingAfterType = config.getNetworkClientEvents_startingAfterType || 'str';
        this.getNetworkClientEvents_endingBefore = config.getNetworkClientEvents_endingBefore;
        this.getNetworkClientEvents_endingBeforeType = config.getNetworkClientEvents_endingBeforeType || 'str';
        this.getNetworkClientLatencyHistory_networkId = config.getNetworkClientLatencyHistory_networkId;
        this.getNetworkClientLatencyHistory_networkIdType = config.getNetworkClientLatencyHistory_networkIdType || 'str';
        this.getNetworkClientLatencyHistory_idOrMacOrIp = config.getNetworkClientLatencyHistory_idOrMacOrIp;
        this.getNetworkClientLatencyHistory_idOrMacOrIpType = config.getNetworkClientLatencyHistory_idOrMacOrIpType || 'str';
        this.getNetworkClientLatencyHistory_t0 = config.getNetworkClientLatencyHistory_t0;
        this.getNetworkClientLatencyHistory_t0Type = config.getNetworkClientLatencyHistory_t0Type || 'str';
        this.getNetworkClientLatencyHistory_t1 = config.getNetworkClientLatencyHistory_t1;
        this.getNetworkClientLatencyHistory_t1Type = config.getNetworkClientLatencyHistory_t1Type || 'str';
        this.getNetworkClientLatencyHistory_timespan = config.getNetworkClientLatencyHistory_timespan;
        this.getNetworkClientLatencyHistory_timespanType = config.getNetworkClientLatencyHistory_timespanType || 'str';
        this.getNetworkClientLatencyHistory_resolution = config.getNetworkClientLatencyHistory_resolution;
        this.getNetworkClientLatencyHistory_resolutionType = config.getNetworkClientLatencyHistory_resolutionType || 'str';
        this.getOrganizationConfigTemplates_organizationId = config.getOrganizationConfigTemplates_organizationId;
        this.getOrganizationConfigTemplates_organizationIdType = config.getOrganizationConfigTemplates_organizationIdType || 'str';
        this.deleteOrganizationConfigTemplate_organizationId = config.deleteOrganizationConfigTemplate_organizationId;
        this.deleteOrganizationConfigTemplate_organizationIdType = config.deleteOrganizationConfigTemplate_organizationIdType || 'str';
        this.deleteOrganizationConfigTemplate_id = config.deleteOrganizationConfigTemplate_id;
        this.deleteOrganizationConfigTemplate_idType = config.deleteOrganizationConfigTemplate_idType || 'str';
        this.getNetworkDevices_networkId = config.getNetworkDevices_networkId;
        this.getNetworkDevices_networkIdType = config.getNetworkDevices_networkIdType || 'str';
        this.getNetworkDevice_networkId = config.getNetworkDevice_networkId;
        this.getNetworkDevice_networkIdType = config.getNetworkDevice_networkIdType || 'str';
        this.getNetworkDevice_serial = config.getNetworkDevice_serial;
        this.getNetworkDevice_serialType = config.getNetworkDevice_serialType || 'str';
        this.updateNetworkDevice_networkId = config.updateNetworkDevice_networkId;
        this.updateNetworkDevice_networkIdType = config.updateNetworkDevice_networkIdType || 'str';
        this.updateNetworkDevice_serial = config.updateNetworkDevice_serial;
        this.updateNetworkDevice_serialType = config.updateNetworkDevice_serialType || 'str';
        this.updateNetworkDevice_updateNetworkDevice = config.updateNetworkDevice_updateNetworkDevice;
        this.updateNetworkDevice_updateNetworkDeviceType = config.updateNetworkDevice_updateNetworkDeviceType || 'str';
        this.getNetworkDevicePerformance_networkId = config.getNetworkDevicePerformance_networkId;
        this.getNetworkDevicePerformance_networkIdType = config.getNetworkDevicePerformance_networkIdType || 'str';
        this.getNetworkDevicePerformance_serial = config.getNetworkDevicePerformance_serial;
        this.getNetworkDevicePerformance_serialType = config.getNetworkDevicePerformance_serialType || 'str';
        this.getNetworkDeviceUplink_networkId = config.getNetworkDeviceUplink_networkId;
        this.getNetworkDeviceUplink_networkIdType = config.getNetworkDeviceUplink_networkIdType || 'str';
        this.getNetworkDeviceUplink_serial = config.getNetworkDeviceUplink_serial;
        this.getNetworkDeviceUplink_serialType = config.getNetworkDeviceUplink_serialType || 'str';
        this.getNetworkDeviceLldp_cdp_networkId = config.getNetworkDeviceLldp_cdp_networkId;
        this.getNetworkDeviceLldp_cdp_networkIdType = config.getNetworkDeviceLldp_cdp_networkIdType || 'str';
        this.getNetworkDeviceLldp_cdp_serial = config.getNetworkDeviceLldp_cdp_serial;
        this.getNetworkDeviceLldp_cdp_serialType = config.getNetworkDeviceLldp_cdp_serialType || 'str';
        this.getNetworkDeviceLldp_cdp_timespan = config.getNetworkDeviceLldp_cdp_timespan;
        this.getNetworkDeviceLldp_cdp_timespanType = config.getNetworkDeviceLldp_cdp_timespanType || 'str';
        this.claimNetworkDevices_networkId = config.claimNetworkDevices_networkId;
        this.claimNetworkDevices_networkIdType = config.claimNetworkDevices_networkIdType || 'str';
        this.claimNetworkDevices_claimNetworkDevices = config.claimNetworkDevices_claimNetworkDevices;
        this.claimNetworkDevices_claimNetworkDevicesType = config.claimNetworkDevices_claimNetworkDevicesType || 'str';
        this.removeNetworkDevice_networkId = config.removeNetworkDevice_networkId;
        this.removeNetworkDevice_networkIdType = config.removeNetworkDevice_networkIdType || 'str';
        this.removeNetworkDevice_serial = config.removeNetworkDevice_serial;
        this.removeNetworkDevice_serialType = config.removeNetworkDevice_serialType || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_networkId = config.getNetworkDeviceLossAndLatencyHistory_networkId;
        this.getNetworkDeviceLossAndLatencyHistory_networkIdType = config.getNetworkDeviceLossAndLatencyHistory_networkIdType || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_serial = config.getNetworkDeviceLossAndLatencyHistory_serial;
        this.getNetworkDeviceLossAndLatencyHistory_serialType = config.getNetworkDeviceLossAndLatencyHistory_serialType || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_t0 = config.getNetworkDeviceLossAndLatencyHistory_t0;
        this.getNetworkDeviceLossAndLatencyHistory_t0Type = config.getNetworkDeviceLossAndLatencyHistory_t0Type || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_t1 = config.getNetworkDeviceLossAndLatencyHistory_t1;
        this.getNetworkDeviceLossAndLatencyHistory_t1Type = config.getNetworkDeviceLossAndLatencyHistory_t1Type || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_timespan = config.getNetworkDeviceLossAndLatencyHistory_timespan;
        this.getNetworkDeviceLossAndLatencyHistory_timespanType = config.getNetworkDeviceLossAndLatencyHistory_timespanType || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_resolution = config.getNetworkDeviceLossAndLatencyHistory_resolution;
        this.getNetworkDeviceLossAndLatencyHistory_resolutionType = config.getNetworkDeviceLossAndLatencyHistory_resolutionType || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_uplink = config.getNetworkDeviceLossAndLatencyHistory_uplink;
        this.getNetworkDeviceLossAndLatencyHistory_uplinkType = config.getNetworkDeviceLossAndLatencyHistory_uplinkType || 'str';
        this.getNetworkDeviceLossAndLatencyHistory_ip = config.getNetworkDeviceLossAndLatencyHistory_ip;
        this.getNetworkDeviceLossAndLatencyHistory_ipType = config.getNetworkDeviceLossAndLatencyHistory_ipType || 'str';
        this.rebootNetworkDevice_networkId = config.rebootNetworkDevice_networkId;
        this.rebootNetworkDevice_networkIdType = config.rebootNetworkDevice_networkIdType || 'str';
        this.rebootNetworkDevice_serial = config.rebootNetworkDevice_serial;
        this.rebootNetworkDevice_serialType = config.rebootNetworkDevice_serialType || 'str';
        this.getNetworkCellularFirewallRules_networkId = config.getNetworkCellularFirewallRules_networkId;
        this.getNetworkCellularFirewallRules_networkIdType = config.getNetworkCellularFirewallRules_networkIdType || 'str';
        this.updateNetworkCellularFirewallRules_networkId = config.updateNetworkCellularFirewallRules_networkId;
        this.updateNetworkCellularFirewallRules_networkIdType = config.updateNetworkCellularFirewallRules_networkIdType || 'str';
        this.updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRules = config.updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRules;
        this.updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRulesType = config.updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRulesType || 'str';
        this.getNetworkL3FirewallRules_networkId = config.getNetworkL3FirewallRules_networkId;
        this.getNetworkL3FirewallRules_networkIdType = config.getNetworkL3FirewallRules_networkIdType || 'str';
        this.updateNetworkL3FirewallRules_networkId = config.updateNetworkL3FirewallRules_networkId;
        this.updateNetworkL3FirewallRules_networkIdType = config.updateNetworkL3FirewallRules_networkIdType || 'str';
        this.updateNetworkL3FirewallRules_updateNetworkL3FirewallRules = config.updateNetworkL3FirewallRules_updateNetworkL3FirewallRules;
        this.updateNetworkL3FirewallRules_updateNetworkL3FirewallRulesType = config.updateNetworkL3FirewallRules_updateNetworkL3FirewallRulesType || 'str';
        this.getOrganizationVpnFirewallRules_organizationId = config.getOrganizationVpnFirewallRules_organizationId;
        this.getOrganizationVpnFirewallRules_organizationIdType = config.getOrganizationVpnFirewallRules_organizationIdType || 'str';
        this.updateOrganizationVpnFirewallRules_organizationId = config.updateOrganizationVpnFirewallRules_organizationId;
        this.updateOrganizationVpnFirewallRules_organizationIdType = config.updateOrganizationVpnFirewallRules_organizationIdType || 'str';
        this.updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRules = config.updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRules;
        this.updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRulesType = config.updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRulesType || 'str';
        this.getNetworkSsidL3FirewallRules_networkId = config.getNetworkSsidL3FirewallRules_networkId;
        this.getNetworkSsidL3FirewallRules_networkIdType = config.getNetworkSsidL3FirewallRules_networkIdType || 'str';
        this.getNetworkSsidL3FirewallRules_number = config.getNetworkSsidL3FirewallRules_number;
        this.getNetworkSsidL3FirewallRules_numberType = config.getNetworkSsidL3FirewallRules_numberType || 'str';
        this.updateNetworkSsidL3FirewallRules_networkId = config.updateNetworkSsidL3FirewallRules_networkId;
        this.updateNetworkSsidL3FirewallRules_networkIdType = config.updateNetworkSsidL3FirewallRules_networkIdType || 'str';
        this.updateNetworkSsidL3FirewallRules_number = config.updateNetworkSsidL3FirewallRules_number;
        this.updateNetworkSsidL3FirewallRules_numberType = config.updateNetworkSsidL3FirewallRules_numberType || 'str';
        this.updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRules = config.updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRules;
        this.updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRulesType = config.updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRulesType || 'str';
        this.getNetworkGroupPolicies_networkId = config.getNetworkGroupPolicies_networkId;
        this.getNetworkGroupPolicies_networkIdType = config.getNetworkGroupPolicies_networkIdType || 'str';
        this.deleteNetworkGroupPolicy_networkId = config.deleteNetworkGroupPolicy_networkId;
        this.deleteNetworkGroupPolicy_networkIdType = config.deleteNetworkGroupPolicy_networkIdType || 'str';
        this.deleteNetworkGroupPolicy_groupPolicyId = config.deleteNetworkGroupPolicy_groupPolicyId;
        this.deleteNetworkGroupPolicy_groupPolicyIdType = config.deleteNetworkGroupPolicy_groupPolicyIdType || 'str';
        this.getNetworkHttpServers_networkId = config.getNetworkHttpServers_networkId;
        this.getNetworkHttpServers_networkIdType = config.getNetworkHttpServers_networkIdType || 'str';
        this.createNetworkHttpServers_networkId = config.createNetworkHttpServers_networkId;
        this.createNetworkHttpServers_networkIdType = config.createNetworkHttpServers_networkIdType || 'str';
        this.createNetworkHttpServers_createNetworkHttpServers = config.createNetworkHttpServers_createNetworkHttpServers;
        this.createNetworkHttpServers_createNetworkHttpServersType = config.createNetworkHttpServers_createNetworkHttpServersType || 'str';
        this.getNetworkHttpServer_networkId = config.getNetworkHttpServer_networkId;
        this.getNetworkHttpServer_networkIdType = config.getNetworkHttpServer_networkIdType || 'str';
        this.getNetworkHttpServer_id = config.getNetworkHttpServer_id;
        this.getNetworkHttpServer_idType = config.getNetworkHttpServer_idType || 'str';
        this.updateNetworkHttpServer_networkId = config.updateNetworkHttpServer_networkId;
        this.updateNetworkHttpServer_networkIdType = config.updateNetworkHttpServer_networkIdType || 'str';
        this.updateNetworkHttpServer_id = config.updateNetworkHttpServer_id;
        this.updateNetworkHttpServer_idType = config.updateNetworkHttpServer_idType || 'str';
        this.updateNetworkHttpServer_updateNetworkHttpServer = config.updateNetworkHttpServer_updateNetworkHttpServer;
        this.updateNetworkHttpServer_updateNetworkHttpServerType = config.updateNetworkHttpServer_updateNetworkHttpServerType || 'str';
        this.deleteNetworkHttpServer_networkId = config.deleteNetworkHttpServer_networkId;
        this.deleteNetworkHttpServer_networkIdType = config.deleteNetworkHttpServer_networkIdType || 'str';
        this.deleteNetworkHttpServer_id = config.deleteNetworkHttpServer_id;
        this.deleteNetworkHttpServer_idType = config.deleteNetworkHttpServer_idType || 'str';
        this.createNetworkHttpServersWebhookTests_networkId = config.createNetworkHttpServersWebhookTests_networkId;
        this.createNetworkHttpServersWebhookTests_networkIdType = config.createNetworkHttpServersWebhookTests_networkIdType || 'str';
        this.createNetworkHttpServersWebhookTests_createNetworkHttpServersWebhookTests = config.createNetworkHttpServersWebhookTests_createNetworkHttpServersWebhookTests;
        this.createNetworkHttpServersWebhookTests_createNetworkHttpServersWebhookTestsType = config.createNetworkHttpServersWebhookTests_createNetworkHttpServersWebhookTestsType || 'str';
        this.getNetworkHttpServersWebhookTest_networkId = config.getNetworkHttpServersWebhookTest_networkId;
        this.getNetworkHttpServersWebhookTest_networkIdType = config.getNetworkHttpServersWebhookTest_networkIdType || 'str';
        this.getNetworkHttpServersWebhookTest_id = config.getNetworkHttpServersWebhookTest_id;
        this.getNetworkHttpServersWebhookTest_idType = config.getNetworkHttpServersWebhookTest_idType || 'str';
        this.getNetworkMerakiAuthUsers_networkId = config.getNetworkMerakiAuthUsers_networkId;
        this.getNetworkMerakiAuthUsers_networkIdType = config.getNetworkMerakiAuthUsers_networkIdType || 'str';
        this.getNetworkMerakiAuthUser_networkId = config.getNetworkMerakiAuthUser_networkId;
        this.getNetworkMerakiAuthUser_networkIdType = config.getNetworkMerakiAuthUser_networkIdType || 'str';
        this.getNetworkMerakiAuthUser_id = config.getNetworkMerakiAuthUser_id;
        this.getNetworkMerakiAuthUser_idType = config.getNetworkMerakiAuthUser_idType || 'str';
        this.createOrganizations_createOrganizations = config.createOrganizations_createOrganizations;
        this.createOrganizations_createOrganizationsType = config.createOrganizations_createOrganizationsType || 'str';
        this.getOrganization_id = config.getOrganization_id;
        this.getOrganization_idType = config.getOrganization_idType || 'str';
        this.updateOrganization_id = config.updateOrganization_id;
        this.updateOrganization_idType = config.updateOrganization_idType || 'str';
        this.updateOrganization_updateOrganization = config.updateOrganization_updateOrganization;
        this.updateOrganization_updateOrganizationType = config.updateOrganization_updateOrganizationType || 'str';
        this.cloneOrganization_id = config.cloneOrganization_id;
        this.cloneOrganization_idType = config.cloneOrganization_idType || 'str';
        this.cloneOrganization_cloneOrganization = config.cloneOrganization_cloneOrganization;
        this.cloneOrganization_cloneOrganizationType = config.cloneOrganization_cloneOrganizationType || 'str';
        this.claimOrganization_id = config.claimOrganization_id;
        this.claimOrganization_idType = config.claimOrganization_idType || 'str';
        this.claimOrganization_claimOrganization = config.claimOrganization_claimOrganization;
        this.claimOrganization_claimOrganizationType = config.claimOrganization_claimOrganizationType || 'str';
        this.getOrganizationLicenseState_id = config.getOrganizationLicenseState_id;
        this.getOrganizationLicenseState_idType = config.getOrganizationLicenseState_idType || 'str';
        this.getOrganizationInventory_id = config.getOrganizationInventory_id;
        this.getOrganizationInventory_idType = config.getOrganizationInventory_idType || 'str';
        this.getOrganizationDeviceStatuses_id = config.getOrganizationDeviceStatuses_id;
        this.getOrganizationDeviceStatuses_idType = config.getOrganizationDeviceStatuses_idType || 'str';
        this.getOrganizationSnmp_id = config.getOrganizationSnmp_id;
        this.getOrganizationSnmp_idType = config.getOrganizationSnmp_idType || 'str';
        this.updateOrganizationSnmp_id = config.updateOrganizationSnmp_id;
        this.updateOrganizationSnmp_idType = config.updateOrganizationSnmp_idType || 'str';
        this.updateOrganizationSnmp_updateOrganizationSnmp = config.updateOrganizationSnmp_updateOrganizationSnmp;
        this.updateOrganizationSnmp_updateOrganizationSnmpType = config.updateOrganizationSnmp_updateOrganizationSnmpType || 'str';
        this.getOrganizationThirdPartyVPNPeers_id = config.getOrganizationThirdPartyVPNPeers_id;
        this.getOrganizationThirdPartyVPNPeers_idType = config.getOrganizationThirdPartyVPNPeers_idType || 'str';
        this.updateOrganizationThirdPartyVPNPeers_id = config.updateOrganizationThirdPartyVPNPeers_id;
        this.updateOrganizationThirdPartyVPNPeers_idType = config.updateOrganizationThirdPartyVPNPeers_idType || 'str';
        this.updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeers = config.updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeers;
        this.updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeersType = config.updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeersType || 'str';
        this.getOrganizationUplinksLossAndLatency_organizationId = config.getOrganizationUplinksLossAndLatency_organizationId;
        this.getOrganizationUplinksLossAndLatency_organizationIdType = config.getOrganizationUplinksLossAndLatency_organizationIdType || 'str';
        this.getOrganizationUplinksLossAndLatency_uplink = config.getOrganizationUplinksLossAndLatency_uplink;
        this.getOrganizationUplinksLossAndLatency_uplinkType = config.getOrganizationUplinksLossAndLatency_uplinkType || 'str';
        this.getOrganizationUplinksLossAndLatency_ip = config.getOrganizationUplinksLossAndLatency_ip;
        this.getOrganizationUplinksLossAndLatency_ipType = config.getOrganizationUplinksLossAndLatency_ipType || 'str';
        this.getNetworkPhoneAnnouncements_networkId = config.getNetworkPhoneAnnouncements_networkId;
        this.getNetworkPhoneAnnouncements_networkIdType = config.getNetworkPhoneAnnouncements_networkIdType || 'str';
        this.createNetworkPhoneAnnouncements_networkId = config.createNetworkPhoneAnnouncements_networkId;
        this.createNetworkPhoneAnnouncements_networkIdType = config.createNetworkPhoneAnnouncements_networkIdType || 'str';
        this.createNetworkPhoneAnnouncements_createNetworkPhoneAnnouncements = config.createNetworkPhoneAnnouncements_createNetworkPhoneAnnouncements;
        this.createNetworkPhoneAnnouncements_createNetworkPhoneAnnouncementsType = config.createNetworkPhoneAnnouncements_createNetworkPhoneAnnouncementsType || 'str';
        this.deleteNetworkPhoneAnnouncement_networkId = config.deleteNetworkPhoneAnnouncement_networkId;
        this.deleteNetworkPhoneAnnouncement_networkIdType = config.deleteNetworkPhoneAnnouncement_networkIdType || 'str';
        this.deleteNetworkPhoneAnnouncement_id = config.deleteNetworkPhoneAnnouncement_id;
        this.deleteNetworkPhoneAnnouncement_idType = config.deleteNetworkPhoneAnnouncement_idType || 'str';
        this.getNetworkPhoneAssignments_networkId = config.getNetworkPhoneAssignments_networkId;
        this.getNetworkPhoneAssignments_networkIdType = config.getNetworkPhoneAssignments_networkIdType || 'str';
        this.getNetworkPhoneAssignment_networkId = config.getNetworkPhoneAssignment_networkId;
        this.getNetworkPhoneAssignment_networkIdType = config.getNetworkPhoneAssignment_networkIdType || 'str';
        this.getNetworkPhoneAssignment_serial = config.getNetworkPhoneAssignment_serial;
        this.getNetworkPhoneAssignment_serialType = config.getNetworkPhoneAssignment_serialType || 'str';
        this.updateNetworkPhoneAssignment_networkId = config.updateNetworkPhoneAssignment_networkId;
        this.updateNetworkPhoneAssignment_networkIdType = config.updateNetworkPhoneAssignment_networkIdType || 'str';
        this.updateNetworkPhoneAssignment_serial = config.updateNetworkPhoneAssignment_serial;
        this.updateNetworkPhoneAssignment_serialType = config.updateNetworkPhoneAssignment_serialType || 'str';
        this.updateNetworkPhoneAssignment_updateNetworkPhoneAssignment = config.updateNetworkPhoneAssignment_updateNetworkPhoneAssignment;
        this.updateNetworkPhoneAssignment_updateNetworkPhoneAssignmentType = config.updateNetworkPhoneAssignment_updateNetworkPhoneAssignmentType || 'str';
        this.deleteNetworkPhoneAssignment_networkId = config.deleteNetworkPhoneAssignment_networkId;
        this.deleteNetworkPhoneAssignment_networkIdType = config.deleteNetworkPhoneAssignment_networkIdType || 'str';
        this.deleteNetworkPhoneAssignment_serial = config.deleteNetworkPhoneAssignment_serial;
        this.deleteNetworkPhoneAssignment_serialType = config.deleteNetworkPhoneAssignment_serialType || 'str';
        this.getNetworkPhoneCallgroups_networkId = config.getNetworkPhoneCallgroups_networkId;
        this.getNetworkPhoneCallgroups_networkIdType = config.getNetworkPhoneCallgroups_networkIdType || 'str';
        this.createNetworkPhoneCallgroups_networkId = config.createNetworkPhoneCallgroups_networkId;
        this.createNetworkPhoneCallgroups_networkIdType = config.createNetworkPhoneCallgroups_networkIdType || 'str';
        this.createNetworkPhoneCallgroups_createNetworkPhoneCallgroups = config.createNetworkPhoneCallgroups_createNetworkPhoneCallgroups;
        this.createNetworkPhoneCallgroups_createNetworkPhoneCallgroupsType = config.createNetworkPhoneCallgroups_createNetworkPhoneCallgroupsType || 'str';
        this.getNetworkPhoneCallgroup_networkId = config.getNetworkPhoneCallgroup_networkId;
        this.getNetworkPhoneCallgroup_networkIdType = config.getNetworkPhoneCallgroup_networkIdType || 'str';
        this.getNetworkPhoneCallgroup_id = config.getNetworkPhoneCallgroup_id;
        this.getNetworkPhoneCallgroup_idType = config.getNetworkPhoneCallgroup_idType || 'str';
        this.updateNetworkPhoneCallgroup_networkId = config.updateNetworkPhoneCallgroup_networkId;
        this.updateNetworkPhoneCallgroup_networkIdType = config.updateNetworkPhoneCallgroup_networkIdType || 'str';
        this.updateNetworkPhoneCallgroup_id = config.updateNetworkPhoneCallgroup_id;
        this.updateNetworkPhoneCallgroup_idType = config.updateNetworkPhoneCallgroup_idType || 'str';
        this.updateNetworkPhoneCallgroup_updateNetworkPhoneCallgroup = config.updateNetworkPhoneCallgroup_updateNetworkPhoneCallgroup;
        this.updateNetworkPhoneCallgroup_updateNetworkPhoneCallgroupType = config.updateNetworkPhoneCallgroup_updateNetworkPhoneCallgroupType || 'str';
        this.deleteNetworkPhoneCallgroup_networkId = config.deleteNetworkPhoneCallgroup_networkId;
        this.deleteNetworkPhoneCallgroup_networkIdType = config.deleteNetworkPhoneCallgroup_networkIdType || 'str';
        this.deleteNetworkPhoneCallgroup_id = config.deleteNetworkPhoneCallgroup_id;
        this.deleteNetworkPhoneCallgroup_idType = config.deleteNetworkPhoneCallgroup_idType || 'str';
        this.getNetworkPhoneConferenceRooms_networkId = config.getNetworkPhoneConferenceRooms_networkId;
        this.getNetworkPhoneConferenceRooms_networkIdType = config.getNetworkPhoneConferenceRooms_networkIdType || 'str';
        this.createNetworkPhoneConferenceRooms_networkId = config.createNetworkPhoneConferenceRooms_networkId;
        this.createNetworkPhoneConferenceRooms_networkIdType = config.createNetworkPhoneConferenceRooms_networkIdType || 'str';
        this.createNetworkPhoneConferenceRooms_createNetworkPhoneConferenceRooms = config.createNetworkPhoneConferenceRooms_createNetworkPhoneConferenceRooms;
        this.createNetworkPhoneConferenceRooms_createNetworkPhoneConferenceRoomsType = config.createNetworkPhoneConferenceRooms_createNetworkPhoneConferenceRoomsType || 'str';
        this.getNetworkPhoneConferenceRoom_networkId = config.getNetworkPhoneConferenceRoom_networkId;
        this.getNetworkPhoneConferenceRoom_networkIdType = config.getNetworkPhoneConferenceRoom_networkIdType || 'str';
        this.getNetworkPhoneConferenceRoom_id = config.getNetworkPhoneConferenceRoom_id;
        this.getNetworkPhoneConferenceRoom_idType = config.getNetworkPhoneConferenceRoom_idType || 'str';
        this.updateNetworkPhoneConferenceRoom_networkId = config.updateNetworkPhoneConferenceRoom_networkId;
        this.updateNetworkPhoneConferenceRoom_networkIdType = config.updateNetworkPhoneConferenceRoom_networkIdType || 'str';
        this.updateNetworkPhoneConferenceRoom_id = config.updateNetworkPhoneConferenceRoom_id;
        this.updateNetworkPhoneConferenceRoom_idType = config.updateNetworkPhoneConferenceRoom_idType || 'str';
        this.updateNetworkPhoneConferenceRoom_updateNetworkPhoneConferenceRoom = config.updateNetworkPhoneConferenceRoom_updateNetworkPhoneConferenceRoom;
        this.updateNetworkPhoneConferenceRoom_updateNetworkPhoneConferenceRoomType = config.updateNetworkPhoneConferenceRoom_updateNetworkPhoneConferenceRoomType || 'str';
        this.deleteNetworkPhoneConferenceRoom_networkId = config.deleteNetworkPhoneConferenceRoom_networkId;
        this.deleteNetworkPhoneConferenceRoom_networkIdType = config.deleteNetworkPhoneConferenceRoom_networkIdType || 'str';
        this.deleteNetworkPhoneConferenceRoom_id = config.deleteNetworkPhoneConferenceRoom_id;
        this.deleteNetworkPhoneConferenceRoom_idType = config.deleteNetworkPhoneConferenceRoom_idType || 'str';
        this.getNetworkPhoneContacts_networkId = config.getNetworkPhoneContacts_networkId;
        this.getNetworkPhoneContacts_networkIdType = config.getNetworkPhoneContacts_networkIdType || 'str';
        this.createNetworkPhoneContacts_networkId = config.createNetworkPhoneContacts_networkId;
        this.createNetworkPhoneContacts_networkIdType = config.createNetworkPhoneContacts_networkIdType || 'str';
        this.createNetworkPhoneContacts_createNetworkPhoneContacts = config.createNetworkPhoneContacts_createNetworkPhoneContacts;
        this.createNetworkPhoneContacts_createNetworkPhoneContactsType = config.createNetworkPhoneContacts_createNetworkPhoneContactsType || 'str';
        this.updateNetworkPhoneContact_networkId = config.updateNetworkPhoneContact_networkId;
        this.updateNetworkPhoneContact_networkIdType = config.updateNetworkPhoneContact_networkIdType || 'str';
        this.updateNetworkPhoneContact_contactId = config.updateNetworkPhoneContact_contactId;
        this.updateNetworkPhoneContact_contactIdType = config.updateNetworkPhoneContact_contactIdType || 'str';
        this.updateNetworkPhoneContact_updateNetworkPhoneContact = config.updateNetworkPhoneContact_updateNetworkPhoneContact;
        this.updateNetworkPhoneContact_updateNetworkPhoneContactType = config.updateNetworkPhoneContact_updateNetworkPhoneContactType || 'str';
        this.deleteNetworkPhoneContact_networkId = config.deleteNetworkPhoneContact_networkId;
        this.deleteNetworkPhoneContact_networkIdType = config.deleteNetworkPhoneContact_networkIdType || 'str';
        this.deleteNetworkPhoneContact_contactId = config.deleteNetworkPhoneContact_contactId;
        this.deleteNetworkPhoneContact_contactIdType = config.deleteNetworkPhoneContact_contactIdType || 'str';
        this.getNetworkPhoneNumbers_networkId = config.getNetworkPhoneNumbers_networkId;
        this.getNetworkPhoneNumbers_networkIdType = config.getNetworkPhoneNumbers_networkIdType || 'str';
        this.getNetworkPhoneNumbersAvailable_networkId = config.getNetworkPhoneNumbersAvailable_networkId;
        this.getNetworkPhoneNumbersAvailable_networkIdType = config.getNetworkPhoneNumbersAvailable_networkIdType || 'str';
        this.getNetworkPiiPiiKeys_networkId = config.getNetworkPiiPiiKeys_networkId;
        this.getNetworkPiiPiiKeys_networkIdType = config.getNetworkPiiPiiKeys_networkIdType || 'str';
        this.getNetworkPiiPiiKeys_username = config.getNetworkPiiPiiKeys_username;
        this.getNetworkPiiPiiKeys_usernameType = config.getNetworkPiiPiiKeys_usernameType || 'str';
        this.getNetworkPiiPiiKeys_email = config.getNetworkPiiPiiKeys_email;
        this.getNetworkPiiPiiKeys_emailType = config.getNetworkPiiPiiKeys_emailType || 'str';
        this.getNetworkPiiPiiKeys_mac = config.getNetworkPiiPiiKeys_mac;
        this.getNetworkPiiPiiKeys_macType = config.getNetworkPiiPiiKeys_macType || 'str';
        this.getNetworkPiiPiiKeys_serial = config.getNetworkPiiPiiKeys_serial;
        this.getNetworkPiiPiiKeys_serialType = config.getNetworkPiiPiiKeys_serialType || 'str';
        this.getNetworkPiiPiiKeys_imei = config.getNetworkPiiPiiKeys_imei;
        this.getNetworkPiiPiiKeys_imeiType = config.getNetworkPiiPiiKeys_imeiType || 'str';
        this.getNetworkPiiPiiKeys_bluetoothMac = config.getNetworkPiiPiiKeys_bluetoothMac;
        this.getNetworkPiiPiiKeys_bluetoothMacType = config.getNetworkPiiPiiKeys_bluetoothMacType || 'str';
        this.getNetworkPiiSmDevicesForKey_networkId = config.getNetworkPiiSmDevicesForKey_networkId;
        this.getNetworkPiiSmDevicesForKey_networkIdType = config.getNetworkPiiSmDevicesForKey_networkIdType || 'str';
        this.getNetworkPiiSmDevicesForKey_username = config.getNetworkPiiSmDevicesForKey_username;
        this.getNetworkPiiSmDevicesForKey_usernameType = config.getNetworkPiiSmDevicesForKey_usernameType || 'str';
        this.getNetworkPiiSmDevicesForKey_email = config.getNetworkPiiSmDevicesForKey_email;
        this.getNetworkPiiSmDevicesForKey_emailType = config.getNetworkPiiSmDevicesForKey_emailType || 'str';
        this.getNetworkPiiSmDevicesForKey_mac = config.getNetworkPiiSmDevicesForKey_mac;
        this.getNetworkPiiSmDevicesForKey_macType = config.getNetworkPiiSmDevicesForKey_macType || 'str';
        this.getNetworkPiiSmDevicesForKey_serial = config.getNetworkPiiSmDevicesForKey_serial;
        this.getNetworkPiiSmDevicesForKey_serialType = config.getNetworkPiiSmDevicesForKey_serialType || 'str';
        this.getNetworkPiiSmDevicesForKey_imei = config.getNetworkPiiSmDevicesForKey_imei;
        this.getNetworkPiiSmDevicesForKey_imeiType = config.getNetworkPiiSmDevicesForKey_imeiType || 'str';
        this.getNetworkPiiSmDevicesForKey_bluetoothMac = config.getNetworkPiiSmDevicesForKey_bluetoothMac;
        this.getNetworkPiiSmDevicesForKey_bluetoothMacType = config.getNetworkPiiSmDevicesForKey_bluetoothMacType || 'str';
        this.getNetworkPiiSmOwnersForKey_networkId = config.getNetworkPiiSmOwnersForKey_networkId;
        this.getNetworkPiiSmOwnersForKey_networkIdType = config.getNetworkPiiSmOwnersForKey_networkIdType || 'str';
        this.getNetworkPiiSmOwnersForKey_username = config.getNetworkPiiSmOwnersForKey_username;
        this.getNetworkPiiSmOwnersForKey_usernameType = config.getNetworkPiiSmOwnersForKey_usernameType || 'str';
        this.getNetworkPiiSmOwnersForKey_email = config.getNetworkPiiSmOwnersForKey_email;
        this.getNetworkPiiSmOwnersForKey_emailType = config.getNetworkPiiSmOwnersForKey_emailType || 'str';
        this.getNetworkPiiSmOwnersForKey_mac = config.getNetworkPiiSmOwnersForKey_mac;
        this.getNetworkPiiSmOwnersForKey_macType = config.getNetworkPiiSmOwnersForKey_macType || 'str';
        this.getNetworkPiiSmOwnersForKey_serial = config.getNetworkPiiSmOwnersForKey_serial;
        this.getNetworkPiiSmOwnersForKey_serialType = config.getNetworkPiiSmOwnersForKey_serialType || 'str';
        this.getNetworkPiiSmOwnersForKey_imei = config.getNetworkPiiSmOwnersForKey_imei;
        this.getNetworkPiiSmOwnersForKey_imeiType = config.getNetworkPiiSmOwnersForKey_imeiType || 'str';
        this.getNetworkPiiSmOwnersForKey_bluetoothMac = config.getNetworkPiiSmOwnersForKey_bluetoothMac;
        this.getNetworkPiiSmOwnersForKey_bluetoothMacType = config.getNetworkPiiSmOwnersForKey_bluetoothMacType || 'str';
        this.getNetworkPiiRequests_networkId = config.getNetworkPiiRequests_networkId;
        this.getNetworkPiiRequests_networkIdType = config.getNetworkPiiRequests_networkIdType || 'str';
        this.createNetworkPiiRequests_networkId = config.createNetworkPiiRequests_networkId;
        this.createNetworkPiiRequests_networkIdType = config.createNetworkPiiRequests_networkIdType || 'str';
        this.createNetworkPiiRequests_createNetworkPiiRequests = config.createNetworkPiiRequests_createNetworkPiiRequests;
        this.createNetworkPiiRequests_createNetworkPiiRequestsType = config.createNetworkPiiRequests_createNetworkPiiRequestsType || 'str';
        this.getNetworkPiiRequest_networkId = config.getNetworkPiiRequest_networkId;
        this.getNetworkPiiRequest_networkIdType = config.getNetworkPiiRequest_networkIdType || 'str';
        this.getNetworkPiiRequest_id = config.getNetworkPiiRequest_id;
        this.getNetworkPiiRequest_idType = config.getNetworkPiiRequest_idType || 'str';
        this.deleteNetworkPiiRequest_networkId = config.deleteNetworkPiiRequest_networkId;
        this.deleteNetworkPiiRequest_networkIdType = config.deleteNetworkPiiRequest_networkIdType || 'str';
        this.deleteNetworkPiiRequest_id = config.deleteNetworkPiiRequest_id;
        this.deleteNetworkPiiRequest_idType = config.deleteNetworkPiiRequest_idType || 'str';
        this.getOrganizationSamlRoles_organizationId = config.getOrganizationSamlRoles_organizationId;
        this.getOrganizationSamlRoles_organizationIdType = config.getOrganizationSamlRoles_organizationIdType || 'str';
        this.createOrganizationSamlRoles_organizationId = config.createOrganizationSamlRoles_organizationId;
        this.createOrganizationSamlRoles_organizationIdType = config.createOrganizationSamlRoles_organizationIdType || 'str';
        this.createOrganizationSamlRoles_createOrganizationSamlRoles = config.createOrganizationSamlRoles_createOrganizationSamlRoles;
        this.createOrganizationSamlRoles_createOrganizationSamlRolesType = config.createOrganizationSamlRoles_createOrganizationSamlRolesType || 'str';
        this.getOrganizationSamlRole_organizationId = config.getOrganizationSamlRole_organizationId;
        this.getOrganizationSamlRole_organizationIdType = config.getOrganizationSamlRole_organizationIdType || 'str';
        this.getOrganizationSamlRole_id = config.getOrganizationSamlRole_id;
        this.getOrganizationSamlRole_idType = config.getOrganizationSamlRole_idType || 'str';
        this.updateOrganizationSamlRole_organizationId = config.updateOrganizationSamlRole_organizationId;
        this.updateOrganizationSamlRole_organizationIdType = config.updateOrganizationSamlRole_organizationIdType || 'str';
        this.updateOrganizationSamlRole_id = config.updateOrganizationSamlRole_id;
        this.updateOrganizationSamlRole_idType = config.updateOrganizationSamlRole_idType || 'str';
        this.updateOrganizationSamlRole_updateOrganizationSamlRole = config.updateOrganizationSamlRole_updateOrganizationSamlRole;
        this.updateOrganizationSamlRole_updateOrganizationSamlRoleType = config.updateOrganizationSamlRole_updateOrganizationSamlRoleType || 'str';
        this.deleteOrganizationSamlRole_organizationId = config.deleteOrganizationSamlRole_organizationId;
        this.deleteOrganizationSamlRole_organizationIdType = config.deleteOrganizationSamlRole_organizationIdType || 'str';
        this.deleteOrganizationSamlRole_id = config.deleteOrganizationSamlRole_id;
        this.deleteOrganizationSamlRole_idType = config.deleteOrganizationSamlRole_idType || 'str';
        this.getNetworkClientSecurityEvents_networkId = config.getNetworkClientSecurityEvents_networkId;
        this.getNetworkClientSecurityEvents_networkIdType = config.getNetworkClientSecurityEvents_networkIdType || 'str';
        this.getNetworkClientSecurityEvents_clientId = config.getNetworkClientSecurityEvents_clientId;
        this.getNetworkClientSecurityEvents_clientIdType = config.getNetworkClientSecurityEvents_clientIdType || 'str';
        this.getNetworkClientSecurityEvents_t0 = config.getNetworkClientSecurityEvents_t0;
        this.getNetworkClientSecurityEvents_t0Type = config.getNetworkClientSecurityEvents_t0Type || 'str';
        this.getNetworkClientSecurityEvents_t1 = config.getNetworkClientSecurityEvents_t1;
        this.getNetworkClientSecurityEvents_t1Type = config.getNetworkClientSecurityEvents_t1Type || 'str';
        this.getNetworkClientSecurityEvents_timespan = config.getNetworkClientSecurityEvents_timespan;
        this.getNetworkClientSecurityEvents_timespanType = config.getNetworkClientSecurityEvents_timespanType || 'str';
        this.getNetworkClientSecurityEvents_perPage = config.getNetworkClientSecurityEvents_perPage;
        this.getNetworkClientSecurityEvents_perPageType = config.getNetworkClientSecurityEvents_perPageType || 'str';
        this.getNetworkClientSecurityEvents_startingAfter = config.getNetworkClientSecurityEvents_startingAfter;
        this.getNetworkClientSecurityEvents_startingAfterType = config.getNetworkClientSecurityEvents_startingAfterType || 'str';
        this.getNetworkClientSecurityEvents_endingBefore = config.getNetworkClientSecurityEvents_endingBefore;
        this.getNetworkClientSecurityEvents_endingBeforeType = config.getNetworkClientSecurityEvents_endingBeforeType || 'str';
        this.getNetworkSmTargetGroups_networkId = config.getNetworkSmTargetGroups_networkId;
        this.getNetworkSmTargetGroups_networkIdType = config.getNetworkSmTargetGroups_networkIdType || 'str';
        this.getNetworkSmTargetGroups_withDetails = config.getNetworkSmTargetGroups_withDetails;
        this.getNetworkSmTargetGroups_withDetailsType = config.getNetworkSmTargetGroups_withDetailsType || 'str';
        this.createNetworkSmTargetGroups_networkId = config.createNetworkSmTargetGroups_networkId;
        this.createNetworkSmTargetGroups_networkIdType = config.createNetworkSmTargetGroups_networkIdType || 'str';
        this.createNetworkSmTargetGroups_createNetworkSmTargetGroups = config.createNetworkSmTargetGroups_createNetworkSmTargetGroups;
        this.createNetworkSmTargetGroups_createNetworkSmTargetGroupsType = config.createNetworkSmTargetGroups_createNetworkSmTargetGroupsType || 'str';
        this.getNetworkSmTargetGroup_networkId = config.getNetworkSmTargetGroup_networkId;
        this.getNetworkSmTargetGroup_networkIdType = config.getNetworkSmTargetGroup_networkIdType || 'str';
        this.getNetworkSmTargetGroup_targetGroupId = config.getNetworkSmTargetGroup_targetGroupId;
        this.getNetworkSmTargetGroup_targetGroupIdType = config.getNetworkSmTargetGroup_targetGroupIdType || 'str';
        this.getNetworkSmTargetGroup_withDetails = config.getNetworkSmTargetGroup_withDetails;
        this.getNetworkSmTargetGroup_withDetailsType = config.getNetworkSmTargetGroup_withDetailsType || 'str';
        this.updateNetworkSmTargetGroup_networkId = config.updateNetworkSmTargetGroup_networkId;
        this.updateNetworkSmTargetGroup_networkIdType = config.updateNetworkSmTargetGroup_networkIdType || 'str';
        this.updateNetworkSmTargetGroup_targetGroupId = config.updateNetworkSmTargetGroup_targetGroupId;
        this.updateNetworkSmTargetGroup_targetGroupIdType = config.updateNetworkSmTargetGroup_targetGroupIdType || 'str';
        this.updateNetworkSmTargetGroup_updateNetworkSmTargetGroup = config.updateNetworkSmTargetGroup_updateNetworkSmTargetGroup;
        this.updateNetworkSmTargetGroup_updateNetworkSmTargetGroupType = config.updateNetworkSmTargetGroup_updateNetworkSmTargetGroupType || 'str';
        this.deleteNetworkSmTargetGroup_networkId = config.deleteNetworkSmTargetGroup_networkId;
        this.deleteNetworkSmTargetGroup_networkIdType = config.deleteNetworkSmTargetGroup_networkIdType || 'str';
        this.deleteNetworkSmTargetGroup_targetGroupId = config.deleteNetworkSmTargetGroup_targetGroupId;
        this.deleteNetworkSmTargetGroup_targetGroupIdType = config.deleteNetworkSmTargetGroup_targetGroupIdType || 'str';
        this.createNetworkSmProfileClarity_networkId = config.createNetworkSmProfileClarity_networkId;
        this.createNetworkSmProfileClarity_networkIdType = config.createNetworkSmProfileClarity_networkIdType || 'str';
        this.createNetworkSmProfileClarity_createNetworkSmProfileClarity = config.createNetworkSmProfileClarity_createNetworkSmProfileClarity;
        this.createNetworkSmProfileClarity_createNetworkSmProfileClarityType = config.createNetworkSmProfileClarity_createNetworkSmProfileClarityType || 'str';
        this.updateNetworkSmProfileClarity_networkId = config.updateNetworkSmProfileClarity_networkId;
        this.updateNetworkSmProfileClarity_networkIdType = config.updateNetworkSmProfileClarity_networkIdType || 'str';
        this.updateNetworkSmProfileClarity_profileId = config.updateNetworkSmProfileClarity_profileId;
        this.updateNetworkSmProfileClarity_profileIdType = config.updateNetworkSmProfileClarity_profileIdType || 'str';
        this.updateNetworkSmProfileClarity_updateNetworkSmProfileClarity = config.updateNetworkSmProfileClarity_updateNetworkSmProfileClarity;
        this.updateNetworkSmProfileClarity_updateNetworkSmProfileClarityType = config.updateNetworkSmProfileClarity_updateNetworkSmProfileClarityType || 'str';
        this.addNetworkSmProfileClarity_networkId = config.addNetworkSmProfileClarity_networkId;
        this.addNetworkSmProfileClarity_networkIdType = config.addNetworkSmProfileClarity_networkIdType || 'str';
        this.addNetworkSmProfileClarity_profileId = config.addNetworkSmProfileClarity_profileId;
        this.addNetworkSmProfileClarity_profileIdType = config.addNetworkSmProfileClarity_profileIdType || 'str';
        this.addNetworkSmProfileClarity_addNetworkSmProfileClarity = config.addNetworkSmProfileClarity_addNetworkSmProfileClarity;
        this.addNetworkSmProfileClarity_addNetworkSmProfileClarityType = config.addNetworkSmProfileClarity_addNetworkSmProfileClarityType || 'str';
        this.getNetworkSmProfileClarity_networkId = config.getNetworkSmProfileClarity_networkId;
        this.getNetworkSmProfileClarity_networkIdType = config.getNetworkSmProfileClarity_networkIdType || 'str';
        this.getNetworkSmProfileClarity_profileId = config.getNetworkSmProfileClarity_profileId;
        this.getNetworkSmProfileClarity_profileIdType = config.getNetworkSmProfileClarity_profileIdType || 'str';
        this.deleteNetworkSmProfileClarity_networkId = config.deleteNetworkSmProfileClarity_networkId;
        this.deleteNetworkSmProfileClarity_networkIdType = config.deleteNetworkSmProfileClarity_networkIdType || 'str';
        this.deleteNetworkSmProfileClarity_profileId = config.deleteNetworkSmProfileClarity_profileId;
        this.deleteNetworkSmProfileClarity_profileIdType = config.deleteNetworkSmProfileClarity_profileIdType || 'str';
        this.createNetworkSmProfileUmbrella_networkId = config.createNetworkSmProfileUmbrella_networkId;
        this.createNetworkSmProfileUmbrella_networkIdType = config.createNetworkSmProfileUmbrella_networkIdType || 'str';
        this.createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrella = config.createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrella;
        this.createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrellaType = config.createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrellaType || 'str';
        this.updateNetworkSmProfileUmbrella_networkId = config.updateNetworkSmProfileUmbrella_networkId;
        this.updateNetworkSmProfileUmbrella_networkIdType = config.updateNetworkSmProfileUmbrella_networkIdType || 'str';
        this.updateNetworkSmProfileUmbrella_profileId = config.updateNetworkSmProfileUmbrella_profileId;
        this.updateNetworkSmProfileUmbrella_profileIdType = config.updateNetworkSmProfileUmbrella_profileIdType || 'str';
        this.updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrella = config.updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrella;
        this.updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrellaType = config.updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrellaType || 'str';
        this.addNetworkSmProfileUmbrella_networkId = config.addNetworkSmProfileUmbrella_networkId;
        this.addNetworkSmProfileUmbrella_networkIdType = config.addNetworkSmProfileUmbrella_networkIdType || 'str';
        this.addNetworkSmProfileUmbrella_profileId = config.addNetworkSmProfileUmbrella_profileId;
        this.addNetworkSmProfileUmbrella_profileIdType = config.addNetworkSmProfileUmbrella_profileIdType || 'str';
        this.addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrella = config.addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrella;
        this.addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrellaType = config.addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrellaType || 'str';
        this.getNetworkSmProfileUmbrella_networkId = config.getNetworkSmProfileUmbrella_networkId;
        this.getNetworkSmProfileUmbrella_networkIdType = config.getNetworkSmProfileUmbrella_networkIdType || 'str';
        this.getNetworkSmProfileUmbrella_profileId = config.getNetworkSmProfileUmbrella_profileId;
        this.getNetworkSmProfileUmbrella_profileIdType = config.getNetworkSmProfileUmbrella_profileIdType || 'str';
        this.deleteNetworkSmProfileUmbrella_networkId = config.deleteNetworkSmProfileUmbrella_networkId;
        this.deleteNetworkSmProfileUmbrella_networkIdType = config.deleteNetworkSmProfileUmbrella_networkIdType || 'str';
        this.deleteNetworkSmProfileUmbrella_profileId = config.deleteNetworkSmProfileUmbrella_profileId;
        this.deleteNetworkSmProfileUmbrella_profileIdType = config.deleteNetworkSmProfileUmbrella_profileIdType || 'str';
        this.createNetworkSmAppPolaris_networkId = config.createNetworkSmAppPolaris_networkId;
        this.createNetworkSmAppPolaris_networkIdType = config.createNetworkSmAppPolaris_networkIdType || 'str';
        this.createNetworkSmAppPolaris_createNetworkSmAppPolaris = config.createNetworkSmAppPolaris_createNetworkSmAppPolaris;
        this.createNetworkSmAppPolaris_createNetworkSmAppPolarisType = config.createNetworkSmAppPolaris_createNetworkSmAppPolarisType || 'str';
        this.getNetworkSmAppPolaris_networkId = config.getNetworkSmAppPolaris_networkId;
        this.getNetworkSmAppPolaris_networkIdType = config.getNetworkSmAppPolaris_networkIdType || 'str';
        this.getNetworkSmAppPolaris_bundleId = config.getNetworkSmAppPolaris_bundleId;
        this.getNetworkSmAppPolaris_bundleIdType = config.getNetworkSmAppPolaris_bundleIdType || 'str';
        this.updateNetworkSmAppPolari_networkId = config.updateNetworkSmAppPolari_networkId;
        this.updateNetworkSmAppPolari_networkIdType = config.updateNetworkSmAppPolari_networkIdType || 'str';
        this.updateNetworkSmAppPolari_appId = config.updateNetworkSmAppPolari_appId;
        this.updateNetworkSmAppPolari_appIdType = config.updateNetworkSmAppPolari_appIdType || 'str';
        this.updateNetworkSmAppPolari_updateNetworkSmAppPolari = config.updateNetworkSmAppPolari_updateNetworkSmAppPolari;
        this.updateNetworkSmAppPolari_updateNetworkSmAppPolariType = config.updateNetworkSmAppPolari_updateNetworkSmAppPolariType || 'str';
        this.deleteNetworkSmAppPolari_networkId = config.deleteNetworkSmAppPolari_networkId;
        this.deleteNetworkSmAppPolari_networkIdType = config.deleteNetworkSmAppPolari_networkIdType || 'str';
        this.deleteNetworkSmAppPolari_appId = config.deleteNetworkSmAppPolari_appId;
        this.deleteNetworkSmAppPolari_appIdType = config.deleteNetworkSmAppPolari_appIdType || 'str';
        this.getNetworkSmDevices_networkId = config.getNetworkSmDevices_networkId;
        this.getNetworkSmDevices_networkIdType = config.getNetworkSmDevices_networkIdType || 'str';
        this.getNetworkSmDevices_fields = config.getNetworkSmDevices_fields;
        this.getNetworkSmDevices_fieldsType = config.getNetworkSmDevices_fieldsType || 'str';
        this.getNetworkSmDevices_wifiMacs = config.getNetworkSmDevices_wifiMacs;
        this.getNetworkSmDevices_wifiMacsType = config.getNetworkSmDevices_wifiMacsType || 'str';
        this.getNetworkSmDevices_serials = config.getNetworkSmDevices_serials;
        this.getNetworkSmDevices_serialsType = config.getNetworkSmDevices_serialsType || 'str';
        this.getNetworkSmDevices_ids = config.getNetworkSmDevices_ids;
        this.getNetworkSmDevices_idsType = config.getNetworkSmDevices_idsType || 'str';
        this.getNetworkSmDevices_scope = config.getNetworkSmDevices_scope;
        this.getNetworkSmDevices_scopeType = config.getNetworkSmDevices_scopeType || 'str';
        this.getNetworkSmDevices_batchToken = config.getNetworkSmDevices_batchToken;
        this.getNetworkSmDevices_batchTokenType = config.getNetworkSmDevices_batchTokenType || 'str';
        this.getNetworkSmUsers_networkId = config.getNetworkSmUsers_networkId;
        this.getNetworkSmUsers_networkIdType = config.getNetworkSmUsers_networkIdType || 'str';
        this.getNetworkSmUsers_usernames = config.getNetworkSmUsers_usernames;
        this.getNetworkSmUsers_usernamesType = config.getNetworkSmUsers_usernamesType || 'str';
        this.getNetworkSmUsers_emails = config.getNetworkSmUsers_emails;
        this.getNetworkSmUsers_emailsType = config.getNetworkSmUsers_emailsType || 'str';
        this.getNetworkSmUsers_ids = config.getNetworkSmUsers_ids;
        this.getNetworkSmUsers_idsType = config.getNetworkSmUsers_idsType || 'str';
        this.getNetworkSmUsers_scope = config.getNetworkSmUsers_scope;
        this.getNetworkSmUsers_scopeType = config.getNetworkSmUsers_scopeType || 'str';
        this.getNetworkSmUserDeviceProfiles_networkId = config.getNetworkSmUserDeviceProfiles_networkId;
        this.getNetworkSmUserDeviceProfiles_networkIdType = config.getNetworkSmUserDeviceProfiles_networkIdType || 'str';
        this.getNetworkSmUserDeviceProfiles_id = config.getNetworkSmUserDeviceProfiles_id;
        this.getNetworkSmUserDeviceProfiles_idType = config.getNetworkSmUserDeviceProfiles_idType || 'str';
        this.getNetworkSmDeviceProfiles_networkId = config.getNetworkSmDeviceProfiles_networkId;
        this.getNetworkSmDeviceProfiles_networkIdType = config.getNetworkSmDeviceProfiles_networkIdType || 'str';
        this.getNetworkSmDeviceProfiles_id = config.getNetworkSmDeviceProfiles_id;
        this.getNetworkSmDeviceProfiles_idType = config.getNetworkSmDeviceProfiles_idType || 'str';
        this.getNetworkSmUserSoftwares_networkId = config.getNetworkSmUserSoftwares_networkId;
        this.getNetworkSmUserSoftwares_networkIdType = config.getNetworkSmUserSoftwares_networkIdType || 'str';
        this.getNetworkSmUserSoftwares_id = config.getNetworkSmUserSoftwares_id;
        this.getNetworkSmUserSoftwares_idType = config.getNetworkSmUserSoftwares_idType || 'str';
        this.getNetworkSmSoftwares_networkId = config.getNetworkSmSoftwares_networkId;
        this.getNetworkSmSoftwares_networkIdType = config.getNetworkSmSoftwares_networkIdType || 'str';
        this.getNetworkSmSoftwares_id = config.getNetworkSmSoftwares_id;
        this.getNetworkSmSoftwares_idType = config.getNetworkSmSoftwares_idType || 'str';
        this.getNetworkSmNetworkAdapters_networkId = config.getNetworkSmNetworkAdapters_networkId;
        this.getNetworkSmNetworkAdapters_networkIdType = config.getNetworkSmNetworkAdapters_networkIdType || 'str';
        this.getNetworkSmNetworkAdapters_id = config.getNetworkSmNetworkAdapters_id;
        this.getNetworkSmNetworkAdapters_idType = config.getNetworkSmNetworkAdapters_idType || 'str';
        this.getNetworkSmWlanLists_networkId = config.getNetworkSmWlanLists_networkId;
        this.getNetworkSmWlanLists_networkIdType = config.getNetworkSmWlanLists_networkIdType || 'str';
        this.getNetworkSmWlanLists_id = config.getNetworkSmWlanLists_id;
        this.getNetworkSmWlanLists_idType = config.getNetworkSmWlanLists_idType || 'str';
        this.getNetworkSmSecurityCenters_networkId = config.getNetworkSmSecurityCenters_networkId;
        this.getNetworkSmSecurityCenters_networkIdType = config.getNetworkSmSecurityCenters_networkIdType || 'str';
        this.getNetworkSmSecurityCenters_id = config.getNetworkSmSecurityCenters_id;
        this.getNetworkSmSecurityCenters_idType = config.getNetworkSmSecurityCenters_idType || 'str';
        this.getNetworkSmRestrictions_networkId = config.getNetworkSmRestrictions_networkId;
        this.getNetworkSmRestrictions_networkIdType = config.getNetworkSmRestrictions_networkIdType || 'str';
        this.getNetworkSmRestrictions_id = config.getNetworkSmRestrictions_id;
        this.getNetworkSmRestrictions_idType = config.getNetworkSmRestrictions_idType || 'str';
        this.getNetworkSmCerts_networkId = config.getNetworkSmCerts_networkId;
        this.getNetworkSmCerts_networkIdType = config.getNetworkSmCerts_networkIdType || 'str';
        this.getNetworkSmCerts_id = config.getNetworkSmCerts_id;
        this.getNetworkSmCerts_idType = config.getNetworkSmCerts_idType || 'str';
        this.updateNetworkSmDevicesTags_networkId = config.updateNetworkSmDevicesTags_networkId;
        this.updateNetworkSmDevicesTags_networkIdType = config.updateNetworkSmDevicesTags_networkIdType || 'str';
        this.updateNetworkSmDevicesTags_updateNetworkSmDevicesTags = config.updateNetworkSmDevicesTags_updateNetworkSmDevicesTags;
        this.updateNetworkSmDevicesTags_updateNetworkSmDevicesTagsType = config.updateNetworkSmDevicesTags_updateNetworkSmDevicesTagsType || 'str';
        this.updateNetworkSmDeviceFields_networkId = config.updateNetworkSmDeviceFields_networkId;
        this.updateNetworkSmDeviceFields_networkIdType = config.updateNetworkSmDeviceFields_networkIdType || 'str';
        this.updateNetworkSmDeviceFields_updateNetworkSmDeviceFields = config.updateNetworkSmDeviceFields_updateNetworkSmDeviceFields;
        this.updateNetworkSmDeviceFields_updateNetworkSmDeviceFieldsType = config.updateNetworkSmDeviceFields_updateNetworkSmDeviceFieldsType || 'str';
        this.updateNetworkSmDevicesLock_networkId = config.updateNetworkSmDevicesLock_networkId;
        this.updateNetworkSmDevicesLock_networkIdType = config.updateNetworkSmDevicesLock_networkIdType || 'str';
        this.updateNetworkSmDevicesLock_updateNetworkSmDevicesLock = config.updateNetworkSmDevicesLock_updateNetworkSmDevicesLock;
        this.updateNetworkSmDevicesLock_updateNetworkSmDevicesLockType = config.updateNetworkSmDevicesLock_updateNetworkSmDevicesLockType || 'str';
        this.updateNetworkSmDeviceWipe_networkId = config.updateNetworkSmDeviceWipe_networkId;
        this.updateNetworkSmDeviceWipe_networkIdType = config.updateNetworkSmDeviceWipe_networkIdType || 'str';
        this.updateNetworkSmDeviceWipe_updateNetworkSmDeviceWipe = config.updateNetworkSmDeviceWipe_updateNetworkSmDeviceWipe;
        this.updateNetworkSmDeviceWipe_updateNetworkSmDeviceWipeType = config.updateNetworkSmDeviceWipe_updateNetworkSmDeviceWipeType || 'str';
        this.updateNetworkSmDevicesCheckin_networkId = config.updateNetworkSmDevicesCheckin_networkId;
        this.updateNetworkSmDevicesCheckin_networkIdType = config.updateNetworkSmDevicesCheckin_networkIdType || 'str';
        this.updateNetworkSmDevicesCheckin_updateNetworkSmDevicesCheckin = config.updateNetworkSmDevicesCheckin_updateNetworkSmDevicesCheckin;
        this.updateNetworkSmDevicesCheckin_updateNetworkSmDevicesCheckinType = config.updateNetworkSmDevicesCheckin_updateNetworkSmDevicesCheckinType || 'str';
        this.updateNetworkSmDevicesMove_networkId = config.updateNetworkSmDevicesMove_networkId;
        this.updateNetworkSmDevicesMove_networkIdType = config.updateNetworkSmDevicesMove_networkIdType || 'str';
        this.updateNetworkSmDevicesMove_updateNetworkSmDevicesMove = config.updateNetworkSmDevicesMove_updateNetworkSmDevicesMove;
        this.updateNetworkSmDevicesMove_updateNetworkSmDevicesMoveType = config.updateNetworkSmDevicesMove_updateNetworkSmDevicesMoveType || 'str';
        this.getNetworkSmProfiles_networkId = config.getNetworkSmProfiles_networkId;
        this.getNetworkSmProfiles_networkIdType = config.getNetworkSmProfiles_networkIdType || 'str';
        this.getNetworkSmCellularUsageHistory_networkId = config.getNetworkSmCellularUsageHistory_networkId;
        this.getNetworkSmCellularUsageHistory_networkIdType = config.getNetworkSmCellularUsageHistory_networkIdType || 'str';
        this.getNetworkSmCellularUsageHistory_id = config.getNetworkSmCellularUsageHistory_id;
        this.getNetworkSmCellularUsageHistory_idType = config.getNetworkSmCellularUsageHistory_idType || 'str';
        this.getNetworkSmPerformanceHistory_networkId = config.getNetworkSmPerformanceHistory_networkId;
        this.getNetworkSmPerformanceHistory_networkIdType = config.getNetworkSmPerformanceHistory_networkIdType || 'str';
        this.getNetworkSmPerformanceHistory_id = config.getNetworkSmPerformanceHistory_id;
        this.getNetworkSmPerformanceHistory_idType = config.getNetworkSmPerformanceHistory_idType || 'str';
        this.getNetworkSmPerformanceHistory_perPage = config.getNetworkSmPerformanceHistory_perPage;
        this.getNetworkSmPerformanceHistory_perPageType = config.getNetworkSmPerformanceHistory_perPageType || 'str';
        this.getNetworkSmPerformanceHistory_startingAfter = config.getNetworkSmPerformanceHistory_startingAfter;
        this.getNetworkSmPerformanceHistory_startingAfterType = config.getNetworkSmPerformanceHistory_startingAfterType || 'str';
        this.getNetworkSmPerformanceHistory_endingBefore = config.getNetworkSmPerformanceHistory_endingBefore;
        this.getNetworkSmPerformanceHistory_endingBeforeType = config.getNetworkSmPerformanceHistory_endingBeforeType || 'str';
        this.getNetworkSmDesktopLogs_networkId = config.getNetworkSmDesktopLogs_networkId;
        this.getNetworkSmDesktopLogs_networkIdType = config.getNetworkSmDesktopLogs_networkIdType || 'str';
        this.getNetworkSmDesktopLogs_id = config.getNetworkSmDesktopLogs_id;
        this.getNetworkSmDesktopLogs_idType = config.getNetworkSmDesktopLogs_idType || 'str';
        this.getNetworkSmDesktopLogs_perPage = config.getNetworkSmDesktopLogs_perPage;
        this.getNetworkSmDesktopLogs_perPageType = config.getNetworkSmDesktopLogs_perPageType || 'str';
        this.getNetworkSmDesktopLogs_startingAfter = config.getNetworkSmDesktopLogs_startingAfter;
        this.getNetworkSmDesktopLogs_startingAfterType = config.getNetworkSmDesktopLogs_startingAfterType || 'str';
        this.getNetworkSmDesktopLogs_endingBefore = config.getNetworkSmDesktopLogs_endingBefore;
        this.getNetworkSmDesktopLogs_endingBeforeType = config.getNetworkSmDesktopLogs_endingBeforeType || 'str';
        this.getNetworkSmDeviceCommandLogs_networkId = config.getNetworkSmDeviceCommandLogs_networkId;
        this.getNetworkSmDeviceCommandLogs_networkIdType = config.getNetworkSmDeviceCommandLogs_networkIdType || 'str';
        this.getNetworkSmDeviceCommandLogs_id = config.getNetworkSmDeviceCommandLogs_id;
        this.getNetworkSmDeviceCommandLogs_idType = config.getNetworkSmDeviceCommandLogs_idType || 'str';
        this.getNetworkSmDeviceCommandLogs_perPage = config.getNetworkSmDeviceCommandLogs_perPage;
        this.getNetworkSmDeviceCommandLogs_perPageType = config.getNetworkSmDeviceCommandLogs_perPageType || 'str';
        this.getNetworkSmDeviceCommandLogs_startingAfter = config.getNetworkSmDeviceCommandLogs_startingAfter;
        this.getNetworkSmDeviceCommandLogs_startingAfterType = config.getNetworkSmDeviceCommandLogs_startingAfterType || 'str';
        this.getNetworkSmDeviceCommandLogs_endingBefore = config.getNetworkSmDeviceCommandLogs_endingBefore;
        this.getNetworkSmDeviceCommandLogs_endingBeforeType = config.getNetworkSmDeviceCommandLogs_endingBeforeType || 'str';
        this.getNetworkSmConnectivity_networkId = config.getNetworkSmConnectivity_networkId;
        this.getNetworkSmConnectivity_networkIdType = config.getNetworkSmConnectivity_networkIdType || 'str';
        this.getNetworkSmConnectivity_id = config.getNetworkSmConnectivity_id;
        this.getNetworkSmConnectivity_idType = config.getNetworkSmConnectivity_idType || 'str';
        this.getNetworkSmConnectivity_perPage = config.getNetworkSmConnectivity_perPage;
        this.getNetworkSmConnectivity_perPageType = config.getNetworkSmConnectivity_perPageType || 'str';
        this.getNetworkSmConnectivity_startingAfter = config.getNetworkSmConnectivity_startingAfter;
        this.getNetworkSmConnectivity_startingAfterType = config.getNetworkSmConnectivity_startingAfterType || 'str';
        this.getNetworkSmConnectivity_endingBefore = config.getNetworkSmConnectivity_endingBefore;
        this.getNetworkSmConnectivity_endingBeforeType = config.getNetworkSmConnectivity_endingBeforeType || 'str';
        this.getNetworkSplashLoginAttempts_id = config.getNetworkSplashLoginAttempts_id;
        this.getNetworkSplashLoginAttempts_idType = config.getNetworkSplashLoginAttempts_idType || 'str';
        this.getNetworkSplashLoginAttempts_ssidNumber = config.getNetworkSplashLoginAttempts_ssidNumber;
        this.getNetworkSplashLoginAttempts_ssidNumberType = config.getNetworkSplashLoginAttempts_ssidNumberType || 'str';
        this.getNetworkSplashLoginAttempts_loginIdentifier = config.getNetworkSplashLoginAttempts_loginIdentifier;
        this.getNetworkSplashLoginAttempts_loginIdentifierType = config.getNetworkSplashLoginAttempts_loginIdentifierType || 'str';
        this.getNetworkSplashLoginAttempts_timespan = config.getNetworkSplashLoginAttempts_timespan;
        this.getNetworkSplashLoginAttempts_timespanType = config.getNetworkSplashLoginAttempts_timespanType || 'str';
        this.getNetworkSsidSplashSettings_networkId = config.getNetworkSsidSplashSettings_networkId;
        this.getNetworkSsidSplashSettings_networkIdType = config.getNetworkSsidSplashSettings_networkIdType || 'str';
        this.getNetworkSsidSplashSettings_number = config.getNetworkSsidSplashSettings_number;
        this.getNetworkSsidSplashSettings_numberType = config.getNetworkSsidSplashSettings_numberType || 'str';
        this.updateNetworkSsidSplashSettings_networkId = config.updateNetworkSsidSplashSettings_networkId;
        this.updateNetworkSsidSplashSettings_networkIdType = config.updateNetworkSsidSplashSettings_networkIdType || 'str';
        this.updateNetworkSsidSplashSettings_number = config.updateNetworkSsidSplashSettings_number;
        this.updateNetworkSsidSplashSettings_numberType = config.updateNetworkSsidSplashSettings_numberType || 'str';
        this.updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettings = config.updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettings;
        this.updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettingsType = config.updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettingsType || 'str';
        this.getNetworkSsids_networkId = config.getNetworkSsids_networkId;
        this.getNetworkSsids_networkIdType = config.getNetworkSsids_networkIdType || 'str';
        this.getNetworkSsid_networkId = config.getNetworkSsid_networkId;
        this.getNetworkSsid_networkIdType = config.getNetworkSsid_networkIdType || 'str';
        this.getNetworkSsid_number = config.getNetworkSsid_number;
        this.getNetworkSsid_numberType = config.getNetworkSsid_numberType || 'str';
        this.updateNetworkSsid_networkId = config.updateNetworkSsid_networkId;
        this.updateNetworkSsid_networkIdType = config.updateNetworkSsid_networkIdType || 'str';
        this.updateNetworkSsid_number = config.updateNetworkSsid_number;
        this.updateNetworkSsid_numberType = config.updateNetworkSsid_numberType || 'str';
        this.updateNetworkSsid_updateNetworkSsid = config.updateNetworkSsid_updateNetworkSsid;
        this.updateNetworkSsid_updateNetworkSsidType = config.updateNetworkSsid_updateNetworkSsidType || 'str';
        this.getNetworkSwitchSettings_networkId = config.getNetworkSwitchSettings_networkId;
        this.getNetworkSwitchSettings_networkIdType = config.getNetworkSwitchSettings_networkIdType || 'str';
        this.updateNetworkSwitchSettings_networkId = config.updateNetworkSwitchSettings_networkId;
        this.updateNetworkSwitchSettings_networkIdType = config.updateNetworkSwitchSettings_networkIdType || 'str';
        this.updateNetworkSwitchSettings_updateNetworkSwitchSettings = config.updateNetworkSwitchSettings_updateNetworkSwitchSettings;
        this.updateNetworkSwitchSettings_updateNetworkSwitchSettingsType = config.updateNetworkSwitchSettings_updateNetworkSwitchSettingsType || 'str';
        this.getDeviceSwitchPorts_serial = config.getDeviceSwitchPorts_serial;
        this.getDeviceSwitchPorts_serialType = config.getDeviceSwitchPorts_serialType || 'str';
        this.getDeviceSwitchPort_serial = config.getDeviceSwitchPort_serial;
        this.getDeviceSwitchPort_serialType = config.getDeviceSwitchPort_serialType || 'str';
        this.getDeviceSwitchPort_number = config.getDeviceSwitchPort_number;
        this.getDeviceSwitchPort_numberType = config.getDeviceSwitchPort_numberType || 'str';
        this.updateDeviceSwitchPort_serial = config.updateDeviceSwitchPort_serial;
        this.updateDeviceSwitchPort_serialType = config.updateDeviceSwitchPort_serialType || 'str';
        this.updateDeviceSwitchPort_number = config.updateDeviceSwitchPort_number;
        this.updateDeviceSwitchPort_numberType = config.updateDeviceSwitchPort_numberType || 'str';
        this.updateDeviceSwitchPort_updateDeviceSwitchPort = config.updateDeviceSwitchPort_updateDeviceSwitchPort;
        this.updateDeviceSwitchPort_updateDeviceSwitchPortType = config.updateDeviceSwitchPort_updateDeviceSwitchPortType || 'str';
        this.getNetworkSyslogServers_networkId = config.getNetworkSyslogServers_networkId;
        this.getNetworkSyslogServers_networkIdType = config.getNetworkSyslogServers_networkIdType || 'str';
        this.updateNetworkSyslogServers_networkId = config.updateNetworkSyslogServers_networkId;
        this.updateNetworkSyslogServers_networkIdType = config.updateNetworkSyslogServers_networkIdType || 'str';
        this.updateNetworkSyslogServers_updateNetworkSyslogServers = config.updateNetworkSyslogServers_updateNetworkSyslogServers;
        this.updateNetworkSyslogServers_updateNetworkSyslogServersType = config.updateNetworkSyslogServers_updateNetworkSyslogServersType || 'str';
        this.getNetworkContentFilteringCategories_networkId = config.getNetworkContentFilteringCategories_networkId;
        this.getNetworkContentFilteringCategories_networkIdType = config.getNetworkContentFilteringCategories_networkIdType || 'str';
        this.getNetworkContentFiltering_networkId = config.getNetworkContentFiltering_networkId;
        this.getNetworkContentFiltering_networkIdType = config.getNetworkContentFiltering_networkIdType || 'str';
        this.updateNetworkContentFiltering_networkId = config.updateNetworkContentFiltering_networkId;
        this.updateNetworkContentFiltering_networkIdType = config.updateNetworkContentFiltering_networkIdType || 'str';
        this.updateNetworkContentFiltering_updateNetworkContentFiltering = config.updateNetworkContentFiltering_updateNetworkContentFiltering;
        this.updateNetworkContentFiltering_updateNetworkContentFilteringType = config.updateNetworkContentFiltering_updateNetworkContentFilteringType || 'str';
        this.getNetworkFirewalledServices_networkId = config.getNetworkFirewalledServices_networkId;
        this.getNetworkFirewalledServices_networkIdType = config.getNetworkFirewalledServices_networkIdType || 'str';
        this.getNetworkFirewalledService_networkId = config.getNetworkFirewalledService_networkId;
        this.getNetworkFirewalledService_networkIdType = config.getNetworkFirewalledService_networkIdType || 'str';
        this.getNetworkFirewalledService_service = config.getNetworkFirewalledService_service;
        this.getNetworkFirewalledService_serviceType = config.getNetworkFirewalledService_serviceType || 'str';
        this.updateNetworkFirewalledService_networkId = config.updateNetworkFirewalledService_networkId;
        this.updateNetworkFirewalledService_networkIdType = config.updateNetworkFirewalledService_networkIdType || 'str';
        this.updateNetworkFirewalledService_service = config.updateNetworkFirewalledService_service;
        this.updateNetworkFirewalledService_serviceType = config.updateNetworkFirewalledService_serviceType || 'str';
        this.updateNetworkFirewalledService_updateNetworkFirewalledService = config.updateNetworkFirewalledService_updateNetworkFirewalledService;
        this.updateNetworkFirewalledService_updateNetworkFirewalledServiceType = config.updateNetworkFirewalledService_updateNetworkFirewalledServiceType || 'str';
        this.getNetworkOneToManyNatRules_networkId = config.getNetworkOneToManyNatRules_networkId;
        this.getNetworkOneToManyNatRules_networkIdType = config.getNetworkOneToManyNatRules_networkIdType || 'str';
        this.updateNetworkOneToManyNatRules_networkId = config.updateNetworkOneToManyNatRules_networkId;
        this.updateNetworkOneToManyNatRules_networkIdType = config.updateNetworkOneToManyNatRules_networkIdType || 'str';
        this.updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRules = config.updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRules;
        this.updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRulesType = config.updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRulesType || 'str';
        this.getNetworkOneToOneNatRules_networkId = config.getNetworkOneToOneNatRules_networkId;
        this.getNetworkOneToOneNatRules_networkIdType = config.getNetworkOneToOneNatRules_networkIdType || 'str';
        this.updateNetworkOneToOneNatRules_networkId = config.updateNetworkOneToOneNatRules_networkId;
        this.updateNetworkOneToOneNatRules_networkIdType = config.updateNetworkOneToOneNatRules_networkIdType || 'str';
        this.updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRules = config.updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRules;
        this.updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRulesType = config.updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRulesType || 'str';
        this.getNetworkPortForwardingRules_networkId = config.getNetworkPortForwardingRules_networkId;
        this.getNetworkPortForwardingRules_networkIdType = config.getNetworkPortForwardingRules_networkIdType || 'str';
        this.updateNetworkPortForwardingRules_networkId = config.updateNetworkPortForwardingRules_networkId;
        this.updateNetworkPortForwardingRules_networkIdType = config.updateNetworkPortForwardingRules_networkIdType || 'str';
        this.updateNetworkPortForwardingRules_updateNetworkPortForwardingRules = config.updateNetworkPortForwardingRules_updateNetworkPortForwardingRules;
        this.updateNetworkPortForwardingRules_updateNetworkPortForwardingRulesType = config.updateNetworkPortForwardingRules_updateNetworkPortForwardingRulesType || 'str';
        this.getNetworkStaticRoutes_networkId = config.getNetworkStaticRoutes_networkId;
        this.getNetworkStaticRoutes_networkIdType = config.getNetworkStaticRoutes_networkIdType || 'str';
        this.createNetworkStaticRoutes_networkId = config.createNetworkStaticRoutes_networkId;
        this.createNetworkStaticRoutes_networkIdType = config.createNetworkStaticRoutes_networkIdType || 'str';
        this.createNetworkStaticRoutes_createNetworkStaticRoutes = config.createNetworkStaticRoutes_createNetworkStaticRoutes;
        this.createNetworkStaticRoutes_createNetworkStaticRoutesType = config.createNetworkStaticRoutes_createNetworkStaticRoutesType || 'str';
        this.getNetworkStaticRoute_networkId = config.getNetworkStaticRoute_networkId;
        this.getNetworkStaticRoute_networkIdType = config.getNetworkStaticRoute_networkIdType || 'str';
        this.getNetworkStaticRoute_srId = config.getNetworkStaticRoute_srId;
        this.getNetworkStaticRoute_srIdType = config.getNetworkStaticRoute_srIdType || 'str';
        this.updateNetworkStaticRoute_networkId = config.updateNetworkStaticRoute_networkId;
        this.updateNetworkStaticRoute_networkIdType = config.updateNetworkStaticRoute_networkIdType || 'str';
        this.updateNetworkStaticRoute_srId = config.updateNetworkStaticRoute_srId;
        this.updateNetworkStaticRoute_srIdType = config.updateNetworkStaticRoute_srIdType || 'str';
        this.updateNetworkStaticRoute_updateNetworkStaticRoute = config.updateNetworkStaticRoute_updateNetworkStaticRoute;
        this.updateNetworkStaticRoute_updateNetworkStaticRouteType = config.updateNetworkStaticRoute_updateNetworkStaticRouteType || 'str';
        this.deleteNetworkStaticRoute_networkId = config.deleteNetworkStaticRoute_networkId;
        this.deleteNetworkStaticRoute_networkIdType = config.deleteNetworkStaticRoute_networkIdType || 'str';
        this.deleteNetworkStaticRoute_srId = config.deleteNetworkStaticRoute_srId;
        this.deleteNetworkStaticRoute_srIdType = config.deleteNetworkStaticRoute_srIdType || 'str';
        this.getNetworkUplinkSettings_networkId = config.getNetworkUplinkSettings_networkId;
        this.getNetworkUplinkSettings_networkIdType = config.getNetworkUplinkSettings_networkIdType || 'str';
        this.updateNetworkUplinkSettings_networkId = config.updateNetworkUplinkSettings_networkId;
        this.updateNetworkUplinkSettings_networkIdType = config.updateNetworkUplinkSettings_networkIdType || 'str';
        this.updateNetworkUplinkSettings_updateNetworkUplinkSettings = config.updateNetworkUplinkSettings_updateNetworkUplinkSettings;
        this.updateNetworkUplinkSettings_updateNetworkUplinkSettingsType = config.updateNetworkUplinkSettings_updateNetworkUplinkSettingsType || 'str';
        this.getNetworkVlans_networkId = config.getNetworkVlans_networkId;
        this.getNetworkVlans_networkIdType = config.getNetworkVlans_networkIdType || 'str';
        this.createNetworkVlans_networkId = config.createNetworkVlans_networkId;
        this.createNetworkVlans_networkIdType = config.createNetworkVlans_networkIdType || 'str';
        this.createNetworkVlans_createNetworkVlans = config.createNetworkVlans_createNetworkVlans;
        this.createNetworkVlans_createNetworkVlansType = config.createNetworkVlans_createNetworkVlansType || 'str';
        this.getNetworkVlan_networkId = config.getNetworkVlan_networkId;
        this.getNetworkVlan_networkIdType = config.getNetworkVlan_networkIdType || 'str';
        this.getNetworkVlan_vlanId = config.getNetworkVlan_vlanId;
        this.getNetworkVlan_vlanIdType = config.getNetworkVlan_vlanIdType || 'str';
        this.updateNetworkVlan_networkId = config.updateNetworkVlan_networkId;
        this.updateNetworkVlan_networkIdType = config.updateNetworkVlan_networkIdType || 'str';
        this.updateNetworkVlan_vlanId = config.updateNetworkVlan_vlanId;
        this.updateNetworkVlan_vlanIdType = config.updateNetworkVlan_vlanIdType || 'str';
        this.updateNetworkVlan_updateNetworkVlan = config.updateNetworkVlan_updateNetworkVlan;
        this.updateNetworkVlan_updateNetworkVlanType = config.updateNetworkVlan_updateNetworkVlanType || 'str';
        this.deleteNetworkVlan_networkId = config.deleteNetworkVlan_networkId;
        this.deleteNetworkVlan_networkIdType = config.deleteNetworkVlan_networkIdType || 'str';
        this.deleteNetworkVlan_vlanId = config.deleteNetworkVlan_vlanId;
        this.deleteNetworkVlan_vlanIdType = config.deleteNetworkVlan_vlanIdType || 'str';
        this.getNetworkVlansEnabledState_networkId = config.getNetworkVlansEnabledState_networkId;
        this.getNetworkVlansEnabledState_networkIdType = config.getNetworkVlansEnabledState_networkIdType || 'str';
        this.updateNetworkVlansEnabledState_networkId = config.updateNetworkVlansEnabledState_networkId;
        this.updateNetworkVlansEnabledState_networkIdType = config.updateNetworkVlansEnabledState_networkIdType || 'str';
        this.updateNetworkVlansEnabledState_updateNetworkVlansEnabledState = config.updateNetworkVlansEnabledState_updateNetworkVlansEnabledState;
        this.updateNetworkVlansEnabledState_updateNetworkVlansEnabledStateType = config.updateNetworkVlansEnabledState_updateNetworkVlansEnabledStateType || 'str';
        this.getNetworkConnectionStats_networkId = config.getNetworkConnectionStats_networkId;
        this.getNetworkConnectionStats_networkIdType = config.getNetworkConnectionStats_networkIdType || 'str';
        this.getNetworkConnectionStats_t0 = config.getNetworkConnectionStats_t0;
        this.getNetworkConnectionStats_t0Type = config.getNetworkConnectionStats_t0Type || 'str';
        this.getNetworkConnectionStats_t1 = config.getNetworkConnectionStats_t1;
        this.getNetworkConnectionStats_t1Type = config.getNetworkConnectionStats_t1Type || 'str';
        this.getNetworkConnectionStats_ssid = config.getNetworkConnectionStats_ssid;
        this.getNetworkConnectionStats_ssidType = config.getNetworkConnectionStats_ssidType || 'str';
        this.getNetworkConnectionStats_vlan = config.getNetworkConnectionStats_vlan;
        this.getNetworkConnectionStats_vlanType = config.getNetworkConnectionStats_vlanType || 'str';
        this.getNetworkConnectionStats_apTag = config.getNetworkConnectionStats_apTag;
        this.getNetworkConnectionStats_apTagType = config.getNetworkConnectionStats_apTagType || 'str';
        this.getNetworkDevicesConnectionStats_networkId = config.getNetworkDevicesConnectionStats_networkId;
        this.getNetworkDevicesConnectionStats_networkIdType = config.getNetworkDevicesConnectionStats_networkIdType || 'str';
        this.getNetworkDevicesConnectionStats_t0 = config.getNetworkDevicesConnectionStats_t0;
        this.getNetworkDevicesConnectionStats_t0Type = config.getNetworkDevicesConnectionStats_t0Type || 'str';
        this.getNetworkDevicesConnectionStats_t1 = config.getNetworkDevicesConnectionStats_t1;
        this.getNetworkDevicesConnectionStats_t1Type = config.getNetworkDevicesConnectionStats_t1Type || 'str';
        this.getNetworkDevicesConnectionStats_ssid = config.getNetworkDevicesConnectionStats_ssid;
        this.getNetworkDevicesConnectionStats_ssidType = config.getNetworkDevicesConnectionStats_ssidType || 'str';
        this.getNetworkDevicesConnectionStats_vlan = config.getNetworkDevicesConnectionStats_vlan;
        this.getNetworkDevicesConnectionStats_vlanType = config.getNetworkDevicesConnectionStats_vlanType || 'str';
        this.getNetworkDevicesConnectionStats_apTag = config.getNetworkDevicesConnectionStats_apTag;
        this.getNetworkDevicesConnectionStats_apTagType = config.getNetworkDevicesConnectionStats_apTagType || 'str';
        this.getNetworkDeviceConnectionStats_networkId = config.getNetworkDeviceConnectionStats_networkId;
        this.getNetworkDeviceConnectionStats_networkIdType = config.getNetworkDeviceConnectionStats_networkIdType || 'str';
        this.getNetworkDeviceConnectionStats_serial = config.getNetworkDeviceConnectionStats_serial;
        this.getNetworkDeviceConnectionStats_serialType = config.getNetworkDeviceConnectionStats_serialType || 'str';
        this.getNetworkDeviceConnectionStats_t0 = config.getNetworkDeviceConnectionStats_t0;
        this.getNetworkDeviceConnectionStats_t0Type = config.getNetworkDeviceConnectionStats_t0Type || 'str';
        this.getNetworkDeviceConnectionStats_t1 = config.getNetworkDeviceConnectionStats_t1;
        this.getNetworkDeviceConnectionStats_t1Type = config.getNetworkDeviceConnectionStats_t1Type || 'str';
        this.getNetworkDeviceConnectionStats_ssid = config.getNetworkDeviceConnectionStats_ssid;
        this.getNetworkDeviceConnectionStats_ssidType = config.getNetworkDeviceConnectionStats_ssidType || 'str';
        this.getNetworkDeviceConnectionStats_vlan = config.getNetworkDeviceConnectionStats_vlan;
        this.getNetworkDeviceConnectionStats_vlanType = config.getNetworkDeviceConnectionStats_vlanType || 'str';
        this.getNetworkDeviceConnectionStats_apTag = config.getNetworkDeviceConnectionStats_apTag;
        this.getNetworkDeviceConnectionStats_apTagType = config.getNetworkDeviceConnectionStats_apTagType || 'str';
        this.getNetworkClientsConnectionStats_networkId = config.getNetworkClientsConnectionStats_networkId;
        this.getNetworkClientsConnectionStats_networkIdType = config.getNetworkClientsConnectionStats_networkIdType || 'str';
        this.getNetworkClientsConnectionStats_t0 = config.getNetworkClientsConnectionStats_t0;
        this.getNetworkClientsConnectionStats_t0Type = config.getNetworkClientsConnectionStats_t0Type || 'str';
        this.getNetworkClientsConnectionStats_t1 = config.getNetworkClientsConnectionStats_t1;
        this.getNetworkClientsConnectionStats_t1Type = config.getNetworkClientsConnectionStats_t1Type || 'str';
        this.getNetworkClientsConnectionStats_ssid = config.getNetworkClientsConnectionStats_ssid;
        this.getNetworkClientsConnectionStats_ssidType = config.getNetworkClientsConnectionStats_ssidType || 'str';
        this.getNetworkClientsConnectionStats_vlan = config.getNetworkClientsConnectionStats_vlan;
        this.getNetworkClientsConnectionStats_vlanType = config.getNetworkClientsConnectionStats_vlanType || 'str';
        this.getNetworkClientsConnectionStats_apTag = config.getNetworkClientsConnectionStats_apTag;
        this.getNetworkClientsConnectionStats_apTagType = config.getNetworkClientsConnectionStats_apTagType || 'str';
        this.getNetworkClientConnectionStats_networkId = config.getNetworkClientConnectionStats_networkId;
        this.getNetworkClientConnectionStats_networkIdType = config.getNetworkClientConnectionStats_networkIdType || 'str';
        this.getNetworkClientConnectionStats_clientId = config.getNetworkClientConnectionStats_clientId;
        this.getNetworkClientConnectionStats_clientIdType = config.getNetworkClientConnectionStats_clientIdType || 'str';
        this.getNetworkClientConnectionStats_t0 = config.getNetworkClientConnectionStats_t0;
        this.getNetworkClientConnectionStats_t0Type = config.getNetworkClientConnectionStats_t0Type || 'str';
        this.getNetworkClientConnectionStats_t1 = config.getNetworkClientConnectionStats_t1;
        this.getNetworkClientConnectionStats_t1Type = config.getNetworkClientConnectionStats_t1Type || 'str';
        this.getNetworkClientConnectionStats_ssid = config.getNetworkClientConnectionStats_ssid;
        this.getNetworkClientConnectionStats_ssidType = config.getNetworkClientConnectionStats_ssidType || 'str';
        this.getNetworkClientConnectionStats_vlan = config.getNetworkClientConnectionStats_vlan;
        this.getNetworkClientConnectionStats_vlanType = config.getNetworkClientConnectionStats_vlanType || 'str';
        this.getNetworkClientConnectionStats_apTag = config.getNetworkClientConnectionStats_apTag;
        this.getNetworkClientConnectionStats_apTagType = config.getNetworkClientConnectionStats_apTagType || 'str';
        this.getNetworkLatencyStats_networkId = config.getNetworkLatencyStats_networkId;
        this.getNetworkLatencyStats_networkIdType = config.getNetworkLatencyStats_networkIdType || 'str';
        this.getNetworkLatencyStats_t0 = config.getNetworkLatencyStats_t0;
        this.getNetworkLatencyStats_t0Type = config.getNetworkLatencyStats_t0Type || 'str';
        this.getNetworkLatencyStats_t1 = config.getNetworkLatencyStats_t1;
        this.getNetworkLatencyStats_t1Type = config.getNetworkLatencyStats_t1Type || 'str';
        this.getNetworkLatencyStats_ssid = config.getNetworkLatencyStats_ssid;
        this.getNetworkLatencyStats_ssidType = config.getNetworkLatencyStats_ssidType || 'str';
        this.getNetworkLatencyStats_vlan = config.getNetworkLatencyStats_vlan;
        this.getNetworkLatencyStats_vlanType = config.getNetworkLatencyStats_vlanType || 'str';
        this.getNetworkLatencyStats_apTag = config.getNetworkLatencyStats_apTag;
        this.getNetworkLatencyStats_apTagType = config.getNetworkLatencyStats_apTagType || 'str';
        this.getNetworkLatencyStats_fields = config.getNetworkLatencyStats_fields;
        this.getNetworkLatencyStats_fieldsType = config.getNetworkLatencyStats_fieldsType || 'str';
        this.getNetworkDevicesLatencyStats_networkId = config.getNetworkDevicesLatencyStats_networkId;
        this.getNetworkDevicesLatencyStats_networkIdType = config.getNetworkDevicesLatencyStats_networkIdType || 'str';
        this.getNetworkDevicesLatencyStats_t0 = config.getNetworkDevicesLatencyStats_t0;
        this.getNetworkDevicesLatencyStats_t0Type = config.getNetworkDevicesLatencyStats_t0Type || 'str';
        this.getNetworkDevicesLatencyStats_t1 = config.getNetworkDevicesLatencyStats_t1;
        this.getNetworkDevicesLatencyStats_t1Type = config.getNetworkDevicesLatencyStats_t1Type || 'str';
        this.getNetworkDevicesLatencyStats_ssid = config.getNetworkDevicesLatencyStats_ssid;
        this.getNetworkDevicesLatencyStats_ssidType = config.getNetworkDevicesLatencyStats_ssidType || 'str';
        this.getNetworkDevicesLatencyStats_vlan = config.getNetworkDevicesLatencyStats_vlan;
        this.getNetworkDevicesLatencyStats_vlanType = config.getNetworkDevicesLatencyStats_vlanType || 'str';
        this.getNetworkDevicesLatencyStats_apTag = config.getNetworkDevicesLatencyStats_apTag;
        this.getNetworkDevicesLatencyStats_apTagType = config.getNetworkDevicesLatencyStats_apTagType || 'str';
        this.getNetworkDevicesLatencyStats_fields = config.getNetworkDevicesLatencyStats_fields;
        this.getNetworkDevicesLatencyStats_fieldsType = config.getNetworkDevicesLatencyStats_fieldsType || 'str';
        this.getNetworkDeviceLatencyStats_networkId = config.getNetworkDeviceLatencyStats_networkId;
        this.getNetworkDeviceLatencyStats_networkIdType = config.getNetworkDeviceLatencyStats_networkIdType || 'str';
        this.getNetworkDeviceLatencyStats_serial = config.getNetworkDeviceLatencyStats_serial;
        this.getNetworkDeviceLatencyStats_serialType = config.getNetworkDeviceLatencyStats_serialType || 'str';
        this.getNetworkDeviceLatencyStats_t0 = config.getNetworkDeviceLatencyStats_t0;
        this.getNetworkDeviceLatencyStats_t0Type = config.getNetworkDeviceLatencyStats_t0Type || 'str';
        this.getNetworkDeviceLatencyStats_t1 = config.getNetworkDeviceLatencyStats_t1;
        this.getNetworkDeviceLatencyStats_t1Type = config.getNetworkDeviceLatencyStats_t1Type || 'str';
        this.getNetworkDeviceLatencyStats_ssid = config.getNetworkDeviceLatencyStats_ssid;
        this.getNetworkDeviceLatencyStats_ssidType = config.getNetworkDeviceLatencyStats_ssidType || 'str';
        this.getNetworkDeviceLatencyStats_vlan = config.getNetworkDeviceLatencyStats_vlan;
        this.getNetworkDeviceLatencyStats_vlanType = config.getNetworkDeviceLatencyStats_vlanType || 'str';
        this.getNetworkDeviceLatencyStats_apTag = config.getNetworkDeviceLatencyStats_apTag;
        this.getNetworkDeviceLatencyStats_apTagType = config.getNetworkDeviceLatencyStats_apTagType || 'str';
        this.getNetworkDeviceLatencyStats_fields = config.getNetworkDeviceLatencyStats_fields;
        this.getNetworkDeviceLatencyStats_fieldsType = config.getNetworkDeviceLatencyStats_fieldsType || 'str';
        this.getNetworkClientsLatencyStats_networkId = config.getNetworkClientsLatencyStats_networkId;
        this.getNetworkClientsLatencyStats_networkIdType = config.getNetworkClientsLatencyStats_networkIdType || 'str';
        this.getNetworkClientsLatencyStats_t0 = config.getNetworkClientsLatencyStats_t0;
        this.getNetworkClientsLatencyStats_t0Type = config.getNetworkClientsLatencyStats_t0Type || 'str';
        this.getNetworkClientsLatencyStats_t1 = config.getNetworkClientsLatencyStats_t1;
        this.getNetworkClientsLatencyStats_t1Type = config.getNetworkClientsLatencyStats_t1Type || 'str';
        this.getNetworkClientsLatencyStats_ssid = config.getNetworkClientsLatencyStats_ssid;
        this.getNetworkClientsLatencyStats_ssidType = config.getNetworkClientsLatencyStats_ssidType || 'str';
        this.getNetworkClientsLatencyStats_vlan = config.getNetworkClientsLatencyStats_vlan;
        this.getNetworkClientsLatencyStats_vlanType = config.getNetworkClientsLatencyStats_vlanType || 'str';
        this.getNetworkClientsLatencyStats_apTag = config.getNetworkClientsLatencyStats_apTag;
        this.getNetworkClientsLatencyStats_apTagType = config.getNetworkClientsLatencyStats_apTagType || 'str';
        this.getNetworkClientsLatencyStats_fields = config.getNetworkClientsLatencyStats_fields;
        this.getNetworkClientsLatencyStats_fieldsType = config.getNetworkClientsLatencyStats_fieldsType || 'str';
        this.getNetworkClientLatencyStats_networkId = config.getNetworkClientLatencyStats_networkId;
        this.getNetworkClientLatencyStats_networkIdType = config.getNetworkClientLatencyStats_networkIdType || 'str';
        this.getNetworkClientLatencyStats_clientId = config.getNetworkClientLatencyStats_clientId;
        this.getNetworkClientLatencyStats_clientIdType = config.getNetworkClientLatencyStats_clientIdType || 'str';
        this.getNetworkClientLatencyStats_t0 = config.getNetworkClientLatencyStats_t0;
        this.getNetworkClientLatencyStats_t0Type = config.getNetworkClientLatencyStats_t0Type || 'str';
        this.getNetworkClientLatencyStats_t1 = config.getNetworkClientLatencyStats_t1;
        this.getNetworkClientLatencyStats_t1Type = config.getNetworkClientLatencyStats_t1Type || 'str';
        this.getNetworkClientLatencyStats_ssid = config.getNetworkClientLatencyStats_ssid;
        this.getNetworkClientLatencyStats_ssidType = config.getNetworkClientLatencyStats_ssidType || 'str';
        this.getNetworkClientLatencyStats_vlan = config.getNetworkClientLatencyStats_vlan;
        this.getNetworkClientLatencyStats_vlanType = config.getNetworkClientLatencyStats_vlanType || 'str';
        this.getNetworkClientLatencyStats_apTag = config.getNetworkClientLatencyStats_apTag;
        this.getNetworkClientLatencyStats_apTagType = config.getNetworkClientLatencyStats_apTagType || 'str';
        this.getNetworkClientLatencyStats_fields = config.getNetworkClientLatencyStats_fields;
        this.getNetworkClientLatencyStats_fieldsType = config.getNetworkClientLatencyStats_fieldsType || 'str';
        this.getNetworkFailedConnections_networkId = config.getNetworkFailedConnections_networkId;
        this.getNetworkFailedConnections_networkIdType = config.getNetworkFailedConnections_networkIdType || 'str';
        this.getNetworkFailedConnections_t0 = config.getNetworkFailedConnections_t0;
        this.getNetworkFailedConnections_t0Type = config.getNetworkFailedConnections_t0Type || 'str';
        this.getNetworkFailedConnections_t1 = config.getNetworkFailedConnections_t1;
        this.getNetworkFailedConnections_t1Type = config.getNetworkFailedConnections_t1Type || 'str';
        this.getNetworkFailedConnections_ssid = config.getNetworkFailedConnections_ssid;
        this.getNetworkFailedConnections_ssidType = config.getNetworkFailedConnections_ssidType || 'str';
        this.getNetworkFailedConnections_vlan = config.getNetworkFailedConnections_vlan;
        this.getNetworkFailedConnections_vlanType = config.getNetworkFailedConnections_vlanType || 'str';
        this.getNetworkFailedConnections_apTag = config.getNetworkFailedConnections_apTag;
        this.getNetworkFailedConnections_apTagType = config.getNetworkFailedConnections_apTagType || 'str';
        this.getNetworkFailedConnections_serial = config.getNetworkFailedConnections_serial;
        this.getNetworkFailedConnections_serialType = config.getNetworkFailedConnections_serialType || 'str';
        this.getNetworkFailedConnections_clientId = config.getNetworkFailedConnections_clientId;
        this.getNetworkFailedConnections_clientIdType = config.getNetworkFailedConnections_clientIdType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client = new lib.MerakiDashboardApi();
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureApiKeyValue) {
                if (this.service.secureApiKeyIsQuery) {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                                     this.service.secureApiKeyHeaderOrQueryName, true);
                } else {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                                     this.service.secureApiKeyHeaderOrQueryName, false);
                }
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'getOrganizationAdmins') {
                var getOrganizationAdmins_parameters = [];
                var getOrganizationAdmins_nodeParam;
                var getOrganizationAdmins_nodeParamType;

                getOrganizationAdmins_nodeParam = node.getOrganizationAdmins_organizationId;
                getOrganizationAdmins_nodeParamType = node.getOrganizationAdmins_organizationIdType;
                if (getOrganizationAdmins_nodeParamType === 'str') {
                    //getOrganizationAdmins_parameters.organizationId = getOrganizationAdmins_nodeParam || '';
                    getOrganizationAdmins_parameters.organizationId = getOrganizationAdmins_nodeParam || undefined;
                } else {
                    getOrganizationAdmins_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationAdmins_nodeParam);
                }
                //getOrganizationAdmins_parameters.organizationId = !!getOrganizationAdmins_parameters.organizationId ? getOrganizationAdmins_parameters.organizationId : msg.payload;
                                result = client.getOrganizationAdmins(getOrganizationAdmins_parameters);
            }
            if (!errorFlag && node.method === 'createOrganizationAdmins') {
                var createOrganizationAdmins_parameters = [];
                var createOrganizationAdmins_nodeParam;
                var createOrganizationAdmins_nodeParamType;

                createOrganizationAdmins_nodeParam = node.createOrganizationAdmins_organizationId;
                createOrganizationAdmins_nodeParamType = node.createOrganizationAdmins_organizationIdType;
                if (createOrganizationAdmins_nodeParamType === 'str') {
                    //createOrganizationAdmins_parameters.organizationId = createOrganizationAdmins_nodeParam || '';
                    createOrganizationAdmins_parameters.organizationId = createOrganizationAdmins_nodeParam || undefined;
                } else {
                    createOrganizationAdmins_parameters.organizationId = RED.util.getMessageProperty(msg, createOrganizationAdmins_nodeParam);
                }
                //createOrganizationAdmins_parameters.organizationId = !!createOrganizationAdmins_parameters.organizationId ? createOrganizationAdmins_parameters.organizationId : msg.payload;
                
                createOrganizationAdmins_nodeParam = node.createOrganizationAdmins_createOrganizationAdmins;
                createOrganizationAdmins_nodeParamType = node.createOrganizationAdmins_createOrganizationAdminsType;
                if (createOrganizationAdmins_nodeParamType === 'str') {
                    //createOrganizationAdmins_parameters.createOrganizationAdmins = createOrganizationAdmins_nodeParam || '';
                    createOrganizationAdmins_parameters.createOrganizationAdmins = createOrganizationAdmins_nodeParam || undefined;
                } else {
                    createOrganizationAdmins_parameters.createOrganizationAdmins = RED.util.getMessageProperty(msg, createOrganizationAdmins_nodeParam);
                }
                //createOrganizationAdmins_parameters.createOrganizationAdmins = !!createOrganizationAdmins_parameters.createOrganizationAdmins ? createOrganizationAdmins_parameters.createOrganizationAdmins : msg.payload;
                                result = client.createOrganizationAdmins(createOrganizationAdmins_parameters);
            }
            if (!errorFlag && node.method === 'updateOrganizationAdmin') {
                var updateOrganizationAdmin_parameters = [];
                var updateOrganizationAdmin_nodeParam;
                var updateOrganizationAdmin_nodeParamType;

                updateOrganizationAdmin_nodeParam = node.updateOrganizationAdmin_organizationId;
                updateOrganizationAdmin_nodeParamType = node.updateOrganizationAdmin_organizationIdType;
                if (updateOrganizationAdmin_nodeParamType === 'str') {
                    //updateOrganizationAdmin_parameters.organizationId = updateOrganizationAdmin_nodeParam || '';
                    updateOrganizationAdmin_parameters.organizationId = updateOrganizationAdmin_nodeParam || undefined;
                } else {
                    updateOrganizationAdmin_parameters.organizationId = RED.util.getMessageProperty(msg, updateOrganizationAdmin_nodeParam);
                }
                //updateOrganizationAdmin_parameters.organizationId = !!updateOrganizationAdmin_parameters.organizationId ? updateOrganizationAdmin_parameters.organizationId : msg.payload;
                
                updateOrganizationAdmin_nodeParam = node.updateOrganizationAdmin_id;
                updateOrganizationAdmin_nodeParamType = node.updateOrganizationAdmin_idType;
                if (updateOrganizationAdmin_nodeParamType === 'str') {
                    //updateOrganizationAdmin_parameters.id = updateOrganizationAdmin_nodeParam || '';
                    updateOrganizationAdmin_parameters.id = updateOrganizationAdmin_nodeParam || undefined;
                } else {
                    updateOrganizationAdmin_parameters.id = RED.util.getMessageProperty(msg, updateOrganizationAdmin_nodeParam);
                }
                //updateOrganizationAdmin_parameters.id = !!updateOrganizationAdmin_parameters.id ? updateOrganizationAdmin_parameters.id : msg.payload;
                
                updateOrganizationAdmin_nodeParam = node.updateOrganizationAdmin_updateOrganizationAdmin;
                updateOrganizationAdmin_nodeParamType = node.updateOrganizationAdmin_updateOrganizationAdminType;
                if (updateOrganizationAdmin_nodeParamType === 'str') {
                    //updateOrganizationAdmin_parameters.updateOrganizationAdmin = updateOrganizationAdmin_nodeParam || '';
                    updateOrganizationAdmin_parameters.updateOrganizationAdmin = updateOrganizationAdmin_nodeParam || undefined;
                } else {
                    updateOrganizationAdmin_parameters.updateOrganizationAdmin = RED.util.getMessageProperty(msg, updateOrganizationAdmin_nodeParam);
                }
                //updateOrganizationAdmin_parameters.updateOrganizationAdmin = !!updateOrganizationAdmin_parameters.updateOrganizationAdmin ? updateOrganizationAdmin_parameters.updateOrganizationAdmin : msg.payload;
                                result = client.updateOrganizationAdmin(updateOrganizationAdmin_parameters);
            }
            if (!errorFlag && node.method === 'deleteOrganizationAdmin') {
                var deleteOrganizationAdmin_parameters = [];
                var deleteOrganizationAdmin_nodeParam;
                var deleteOrganizationAdmin_nodeParamType;

                deleteOrganizationAdmin_nodeParam = node.deleteOrganizationAdmin_organizationId;
                deleteOrganizationAdmin_nodeParamType = node.deleteOrganizationAdmin_organizationIdType;
                if (deleteOrganizationAdmin_nodeParamType === 'str') {
                    //deleteOrganizationAdmin_parameters.organizationId = deleteOrganizationAdmin_nodeParam || '';
                    deleteOrganizationAdmin_parameters.organizationId = deleteOrganizationAdmin_nodeParam || undefined;
                } else {
                    deleteOrganizationAdmin_parameters.organizationId = RED.util.getMessageProperty(msg, deleteOrganizationAdmin_nodeParam);
                }
                //deleteOrganizationAdmin_parameters.organizationId = !!deleteOrganizationAdmin_parameters.organizationId ? deleteOrganizationAdmin_parameters.organizationId : msg.payload;
                
                deleteOrganizationAdmin_nodeParam = node.deleteOrganizationAdmin_id;
                deleteOrganizationAdmin_nodeParamType = node.deleteOrganizationAdmin_idType;
                if (deleteOrganizationAdmin_nodeParamType === 'str') {
                    //deleteOrganizationAdmin_parameters.id = deleteOrganizationAdmin_nodeParam || '';
                    deleteOrganizationAdmin_parameters.id = deleteOrganizationAdmin_nodeParam || undefined;
                } else {
                    deleteOrganizationAdmin_parameters.id = RED.util.getMessageProperty(msg, deleteOrganizationAdmin_nodeParam);
                }
                //deleteOrganizationAdmin_parameters.id = !!deleteOrganizationAdmin_parameters.id ? deleteOrganizationAdmin_parameters.id : msg.payload;
                                result = client.deleteOrganizationAdmin(deleteOrganizationAdmin_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkAlertSettings') {
                var getNetworkAlertSettings_parameters = [];
                var getNetworkAlertSettings_nodeParam;
                var getNetworkAlertSettings_nodeParamType;

                getNetworkAlertSettings_nodeParam = node.getNetworkAlertSettings_networkId;
                getNetworkAlertSettings_nodeParamType = node.getNetworkAlertSettings_networkIdType;
                if (getNetworkAlertSettings_nodeParamType === 'str') {
                    //getNetworkAlertSettings_parameters.networkId = getNetworkAlertSettings_nodeParam || '';
                    getNetworkAlertSettings_parameters.networkId = getNetworkAlertSettings_nodeParam || undefined;
                } else {
                    getNetworkAlertSettings_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkAlertSettings_nodeParam);
                }
                //getNetworkAlertSettings_parameters.networkId = !!getNetworkAlertSettings_parameters.networkId ? getNetworkAlertSettings_parameters.networkId : msg.payload;
                                result = client.getNetworkAlertSettings(getNetworkAlertSettings_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkAlertSettings') {
                var updateNetworkAlertSettings_parameters = [];
                var updateNetworkAlertSettings_nodeParam;
                var updateNetworkAlertSettings_nodeParamType;

                updateNetworkAlertSettings_nodeParam = node.updateNetworkAlertSettings_networkId;
                updateNetworkAlertSettings_nodeParamType = node.updateNetworkAlertSettings_networkIdType;
                if (updateNetworkAlertSettings_nodeParamType === 'str') {
                    //updateNetworkAlertSettings_parameters.networkId = updateNetworkAlertSettings_nodeParam || '';
                    updateNetworkAlertSettings_parameters.networkId = updateNetworkAlertSettings_nodeParam || undefined;
                } else {
                    updateNetworkAlertSettings_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkAlertSettings_nodeParam);
                }
                //updateNetworkAlertSettings_parameters.networkId = !!updateNetworkAlertSettings_parameters.networkId ? updateNetworkAlertSettings_parameters.networkId : msg.payload;
                
                updateNetworkAlertSettings_nodeParam = node.updateNetworkAlertSettings_updateNetworkAlertSettings;
                updateNetworkAlertSettings_nodeParamType = node.updateNetworkAlertSettings_updateNetworkAlertSettingsType;
                if (updateNetworkAlertSettings_nodeParamType === 'str') {
                    //updateNetworkAlertSettings_parameters.updateNetworkAlertSettings = updateNetworkAlertSettings_nodeParam || '';
                    updateNetworkAlertSettings_parameters.updateNetworkAlertSettings = updateNetworkAlertSettings_nodeParam || undefined;
                } else {
                    updateNetworkAlertSettings_parameters.updateNetworkAlertSettings = RED.util.getMessageProperty(msg, updateNetworkAlertSettings_nodeParam);
                }
                //updateNetworkAlertSettings_parameters.updateNetworkAlertSettings = !!updateNetworkAlertSettings_parameters.updateNetworkAlertSettings ? updateNetworkAlertSettings_parameters.updateNetworkAlertSettings : msg.payload;
                                result = client.updateNetworkAlertSettings(updateNetworkAlertSettings_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsZones') {
                var getDeviceCameraAnalyticsZones_parameters = [];
                var getDeviceCameraAnalyticsZones_nodeParam;
                var getDeviceCameraAnalyticsZones_nodeParamType;

                getDeviceCameraAnalyticsZones_nodeParam = node.getDeviceCameraAnalyticsZones_serial;
                getDeviceCameraAnalyticsZones_nodeParamType = node.getDeviceCameraAnalyticsZones_serialType;
                if (getDeviceCameraAnalyticsZones_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZones_parameters.serial = getDeviceCameraAnalyticsZones_nodeParam || '';
                    getDeviceCameraAnalyticsZones_parameters.serial = getDeviceCameraAnalyticsZones_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZones_parameters.serial = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZones_nodeParam);
                }
                //getDeviceCameraAnalyticsZones_parameters.serial = !!getDeviceCameraAnalyticsZones_parameters.serial ? getDeviceCameraAnalyticsZones_parameters.serial : msg.payload;
                                result = client.getDeviceCameraAnalyticsZones(getDeviceCameraAnalyticsZones_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsRecent') {
                var getDeviceCameraAnalyticsRecent_parameters = [];
                var getDeviceCameraAnalyticsRecent_nodeParam;
                var getDeviceCameraAnalyticsRecent_nodeParamType;

                getDeviceCameraAnalyticsRecent_nodeParam = node.getDeviceCameraAnalyticsRecent_serial;
                getDeviceCameraAnalyticsRecent_nodeParamType = node.getDeviceCameraAnalyticsRecent_serialType;
                if (getDeviceCameraAnalyticsRecent_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsRecent_parameters.serial = getDeviceCameraAnalyticsRecent_nodeParam || '';
                    getDeviceCameraAnalyticsRecent_parameters.serial = getDeviceCameraAnalyticsRecent_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsRecent_parameters.serial = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsRecent_nodeParam);
                }
                //getDeviceCameraAnalyticsRecent_parameters.serial = !!getDeviceCameraAnalyticsRecent_parameters.serial ? getDeviceCameraAnalyticsRecent_parameters.serial : msg.payload;
                                result = client.getDeviceCameraAnalyticsRecent(getDeviceCameraAnalyticsRecent_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsLive') {
                var getDeviceCameraAnalyticsLive_parameters = [];
                var getDeviceCameraAnalyticsLive_nodeParam;
                var getDeviceCameraAnalyticsLive_nodeParamType;

                getDeviceCameraAnalyticsLive_nodeParam = node.getDeviceCameraAnalyticsLive_serial;
                getDeviceCameraAnalyticsLive_nodeParamType = node.getDeviceCameraAnalyticsLive_serialType;
                if (getDeviceCameraAnalyticsLive_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsLive_parameters.serial = getDeviceCameraAnalyticsLive_nodeParam || '';
                    getDeviceCameraAnalyticsLive_parameters.serial = getDeviceCameraAnalyticsLive_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsLive_parameters.serial = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsLive_nodeParam);
                }
                //getDeviceCameraAnalyticsLive_parameters.serial = !!getDeviceCameraAnalyticsLive_parameters.serial ? getDeviceCameraAnalyticsLive_parameters.serial : msg.payload;
                                result = client.getDeviceCameraAnalyticsLive(getDeviceCameraAnalyticsLive_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsOverview') {
                var getDeviceCameraAnalyticsOverview_parameters = [];
                var getDeviceCameraAnalyticsOverview_nodeParam;
                var getDeviceCameraAnalyticsOverview_nodeParamType;

                getDeviceCameraAnalyticsOverview_nodeParam = node.getDeviceCameraAnalyticsOverview_serial;
                getDeviceCameraAnalyticsOverview_nodeParamType = node.getDeviceCameraAnalyticsOverview_serialType;
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsOverview_parameters.serial = getDeviceCameraAnalyticsOverview_nodeParam || '';
                    getDeviceCameraAnalyticsOverview_parameters.serial = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsOverview_parameters.serial = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsOverview_nodeParam);
                }
                //getDeviceCameraAnalyticsOverview_parameters.serial = !!getDeviceCameraAnalyticsOverview_parameters.serial ? getDeviceCameraAnalyticsOverview_parameters.serial : msg.payload;
                
                getDeviceCameraAnalyticsOverview_nodeParam = node.getDeviceCameraAnalyticsOverview_t0;
                getDeviceCameraAnalyticsOverview_nodeParamType = node.getDeviceCameraAnalyticsOverview_t0Type;
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsOverview_parameters.t0 = getDeviceCameraAnalyticsOverview_nodeParam || '';
                    getDeviceCameraAnalyticsOverview_parameters.t0 = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsOverview_parameters.t0 = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsOverview_nodeParam);
                }
                //getDeviceCameraAnalyticsOverview_parameters.t0 = !!getDeviceCameraAnalyticsOverview_parameters.t0 ? getDeviceCameraAnalyticsOverview_parameters.t0 : msg.payload;
                
                getDeviceCameraAnalyticsOverview_nodeParam = node.getDeviceCameraAnalyticsOverview_t1;
                getDeviceCameraAnalyticsOverview_nodeParamType = node.getDeviceCameraAnalyticsOverview_t1Type;
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsOverview_parameters.t1 = getDeviceCameraAnalyticsOverview_nodeParam || '';
                    getDeviceCameraAnalyticsOverview_parameters.t1 = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsOverview_parameters.t1 = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsOverview_nodeParam);
                }
                //getDeviceCameraAnalyticsOverview_parameters.t1 = !!getDeviceCameraAnalyticsOverview_parameters.t1 ? getDeviceCameraAnalyticsOverview_parameters.t1 : msg.payload;
                
                getDeviceCameraAnalyticsOverview_nodeParam = node.getDeviceCameraAnalyticsOverview_timespan;
                getDeviceCameraAnalyticsOverview_nodeParamType = node.getDeviceCameraAnalyticsOverview_timespanType;
                if (getDeviceCameraAnalyticsOverview_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsOverview_parameters.timespan = getDeviceCameraAnalyticsOverview_nodeParam || '';
                    getDeviceCameraAnalyticsOverview_parameters.timespan = getDeviceCameraAnalyticsOverview_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsOverview_parameters.timespan = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsOverview_nodeParam);
                }
                //getDeviceCameraAnalyticsOverview_parameters.timespan = !!getDeviceCameraAnalyticsOverview_parameters.timespan ? getDeviceCameraAnalyticsOverview_parameters.timespan : msg.payload;
                                result = client.getDeviceCameraAnalyticsOverview(getDeviceCameraAnalyticsOverview_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceCameraAnalyticsZoneHistory') {
                var getDeviceCameraAnalyticsZoneHistory_parameters = [];
                var getDeviceCameraAnalyticsZoneHistory_nodeParam;
                var getDeviceCameraAnalyticsZoneHistory_nodeParamType;

                getDeviceCameraAnalyticsZoneHistory_nodeParam = node.getDeviceCameraAnalyticsZoneHistory_serial;
                getDeviceCameraAnalyticsZoneHistory_nodeParamType = node.getDeviceCameraAnalyticsZoneHistory_serialType;
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZoneHistory_parameters.serial = getDeviceCameraAnalyticsZoneHistory_nodeParam || '';
                    getDeviceCameraAnalyticsZoneHistory_parameters.serial = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZoneHistory_parameters.serial = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZoneHistory_nodeParam);
                }
                //getDeviceCameraAnalyticsZoneHistory_parameters.serial = !!getDeviceCameraAnalyticsZoneHistory_parameters.serial ? getDeviceCameraAnalyticsZoneHistory_parameters.serial : msg.payload;
                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = node.getDeviceCameraAnalyticsZoneHistory_zoneId;
                getDeviceCameraAnalyticsZoneHistory_nodeParamType = node.getDeviceCameraAnalyticsZoneHistory_zoneIdType;
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZoneHistory_parameters.zoneId = getDeviceCameraAnalyticsZoneHistory_nodeParam || '';
                    getDeviceCameraAnalyticsZoneHistory_parameters.zoneId = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZoneHistory_parameters.zoneId = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZoneHistory_nodeParam);
                }
                //getDeviceCameraAnalyticsZoneHistory_parameters.zoneId = !!getDeviceCameraAnalyticsZoneHistory_parameters.zoneId ? getDeviceCameraAnalyticsZoneHistory_parameters.zoneId : msg.payload;
                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = node.getDeviceCameraAnalyticsZoneHistory_t0;
                getDeviceCameraAnalyticsZoneHistory_nodeParamType = node.getDeviceCameraAnalyticsZoneHistory_t0Type;
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZoneHistory_parameters.t0 = getDeviceCameraAnalyticsZoneHistory_nodeParam || '';
                    getDeviceCameraAnalyticsZoneHistory_parameters.t0 = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZoneHistory_parameters.t0 = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZoneHistory_nodeParam);
                }
                //getDeviceCameraAnalyticsZoneHistory_parameters.t0 = !!getDeviceCameraAnalyticsZoneHistory_parameters.t0 ? getDeviceCameraAnalyticsZoneHistory_parameters.t0 : msg.payload;
                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = node.getDeviceCameraAnalyticsZoneHistory_t1;
                getDeviceCameraAnalyticsZoneHistory_nodeParamType = node.getDeviceCameraAnalyticsZoneHistory_t1Type;
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZoneHistory_parameters.t1 = getDeviceCameraAnalyticsZoneHistory_nodeParam || '';
                    getDeviceCameraAnalyticsZoneHistory_parameters.t1 = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZoneHistory_parameters.t1 = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZoneHistory_nodeParam);
                }
                //getDeviceCameraAnalyticsZoneHistory_parameters.t1 = !!getDeviceCameraAnalyticsZoneHistory_parameters.t1 ? getDeviceCameraAnalyticsZoneHistory_parameters.t1 : msg.payload;
                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = node.getDeviceCameraAnalyticsZoneHistory_timespan;
                getDeviceCameraAnalyticsZoneHistory_nodeParamType = node.getDeviceCameraAnalyticsZoneHistory_timespanType;
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZoneHistory_parameters.timespan = getDeviceCameraAnalyticsZoneHistory_nodeParam || '';
                    getDeviceCameraAnalyticsZoneHistory_parameters.timespan = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZoneHistory_parameters.timespan = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZoneHistory_nodeParam);
                }
                //getDeviceCameraAnalyticsZoneHistory_parameters.timespan = !!getDeviceCameraAnalyticsZoneHistory_parameters.timespan ? getDeviceCameraAnalyticsZoneHistory_parameters.timespan : msg.payload;
                
                getDeviceCameraAnalyticsZoneHistory_nodeParam = node.getDeviceCameraAnalyticsZoneHistory_resolution;
                getDeviceCameraAnalyticsZoneHistory_nodeParamType = node.getDeviceCameraAnalyticsZoneHistory_resolutionType;
                if (getDeviceCameraAnalyticsZoneHistory_nodeParamType === 'str') {
                    //getDeviceCameraAnalyticsZoneHistory_parameters.resolution = getDeviceCameraAnalyticsZoneHistory_nodeParam || '';
                    getDeviceCameraAnalyticsZoneHistory_parameters.resolution = getDeviceCameraAnalyticsZoneHistory_nodeParam || undefined;
                } else {
                    getDeviceCameraAnalyticsZoneHistory_parameters.resolution = RED.util.getMessageProperty(msg, getDeviceCameraAnalyticsZoneHistory_nodeParam);
                }
                //getDeviceCameraAnalyticsZoneHistory_parameters.resolution = !!getDeviceCameraAnalyticsZoneHistory_parameters.resolution ? getDeviceCameraAnalyticsZoneHistory_parameters.resolution : msg.payload;
                                result = client.getDeviceCameraAnalyticsZoneHistory(getDeviceCameraAnalyticsZoneHistory_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationApiRequests') {
                var getOrganizationApiRequests_parameters = [];
                var getOrganizationApiRequests_nodeParam;
                var getOrganizationApiRequests_nodeParamType;

                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_organizationId;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_organizationIdType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.organizationId = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.organizationId = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.organizationId = !!getOrganizationApiRequests_parameters.organizationId ? getOrganizationApiRequests_parameters.organizationId : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_t0;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_t0Type;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.t0 = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.t0 = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.t0 = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.t0 = !!getOrganizationApiRequests_parameters.t0 ? getOrganizationApiRequests_parameters.t0 : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_t1;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_t1Type;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.t1 = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.t1 = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.t1 = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.t1 = !!getOrganizationApiRequests_parameters.t1 ? getOrganizationApiRequests_parameters.t1 : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_timespan;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_timespanType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.timespan = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.timespan = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.timespan = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.timespan = !!getOrganizationApiRequests_parameters.timespan ? getOrganizationApiRequests_parameters.timespan : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_perPage;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_perPageType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.perPage = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.perPage = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.perPage = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.perPage = !!getOrganizationApiRequests_parameters.perPage ? getOrganizationApiRequests_parameters.perPage : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_startingAfter;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_startingAfterType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.startingAfter = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.startingAfter = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.startingAfter = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.startingAfter = !!getOrganizationApiRequests_parameters.startingAfter ? getOrganizationApiRequests_parameters.startingAfter : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_endingBefore;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_endingBeforeType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.endingBefore = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.endingBefore = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.endingBefore = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.endingBefore = !!getOrganizationApiRequests_parameters.endingBefore ? getOrganizationApiRequests_parameters.endingBefore : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_adminId;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_adminIdType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.adminId = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.adminId = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.adminId = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.adminId = !!getOrganizationApiRequests_parameters.adminId ? getOrganizationApiRequests_parameters.adminId : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_path;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_pathType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.path = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.path = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.path = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.path = !!getOrganizationApiRequests_parameters.path ? getOrganizationApiRequests_parameters.path : msg.payload;
                
                getOrganizationApiRequests_nodeParam = node.getOrganizationApiRequests_method;
                getOrganizationApiRequests_nodeParamType = node.getOrganizationApiRequests_methodType;
                if (getOrganizationApiRequests_nodeParamType === 'str') {
                    //getOrganizationApiRequests_parameters.method = getOrganizationApiRequests_nodeParam || '';
                    getOrganizationApiRequests_parameters.method = getOrganizationApiRequests_nodeParam || undefined;
                } else {
                    getOrganizationApiRequests_parameters.method = RED.util.getMessageProperty(msg, getOrganizationApiRequests_nodeParam);
                }
                //getOrganizationApiRequests_parameters.method = !!getOrganizationApiRequests_parameters.method ? getOrganizationApiRequests_parameters.method : msg.payload;
                                result = client.getOrganizationApiRequests(getOrganizationApiRequests_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkBluetoothClient') {
                var getNetworkBluetoothClient_parameters = [];
                var getNetworkBluetoothClient_nodeParam;
                var getNetworkBluetoothClient_nodeParamType;

                getNetworkBluetoothClient_nodeParam = node.getNetworkBluetoothClient_networkId;
                getNetworkBluetoothClient_nodeParamType = node.getNetworkBluetoothClient_networkIdType;
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    //getNetworkBluetoothClient_parameters.networkId = getNetworkBluetoothClient_nodeParam || '';
                    getNetworkBluetoothClient_parameters.networkId = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClient_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkBluetoothClient_nodeParam);
                }
                //getNetworkBluetoothClient_parameters.networkId = !!getNetworkBluetoothClient_parameters.networkId ? getNetworkBluetoothClient_parameters.networkId : msg.payload;
                
                getNetworkBluetoothClient_nodeParam = node.getNetworkBluetoothClient_id;
                getNetworkBluetoothClient_nodeParamType = node.getNetworkBluetoothClient_idType;
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    //getNetworkBluetoothClient_parameters.id = getNetworkBluetoothClient_nodeParam || '';
                    getNetworkBluetoothClient_parameters.id = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClient_parameters.id = RED.util.getMessageProperty(msg, getNetworkBluetoothClient_nodeParam);
                }
                //getNetworkBluetoothClient_parameters.id = !!getNetworkBluetoothClient_parameters.id ? getNetworkBluetoothClient_parameters.id : msg.payload;
                
                getNetworkBluetoothClient_nodeParam = node.getNetworkBluetoothClient_includeConnectivityHistory;
                getNetworkBluetoothClient_nodeParamType = node.getNetworkBluetoothClient_includeConnectivityHistoryType;
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    //getNetworkBluetoothClient_parameters.includeConnectivityHistory = getNetworkBluetoothClient_nodeParam || '';
                    getNetworkBluetoothClient_parameters.includeConnectivityHistory = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClient_parameters.includeConnectivityHistory = RED.util.getMessageProperty(msg, getNetworkBluetoothClient_nodeParam);
                }
                //getNetworkBluetoothClient_parameters.includeConnectivityHistory = !!getNetworkBluetoothClient_parameters.includeConnectivityHistory ? getNetworkBluetoothClient_parameters.includeConnectivityHistory : msg.payload;
                
                getNetworkBluetoothClient_nodeParam = node.getNetworkBluetoothClient_connectivityHistoryTimespan;
                getNetworkBluetoothClient_nodeParamType = node.getNetworkBluetoothClient_connectivityHistoryTimespanType;
                if (getNetworkBluetoothClient_nodeParamType === 'str') {
                    //getNetworkBluetoothClient_parameters.connectivityHistoryTimespan = getNetworkBluetoothClient_nodeParam || '';
                    getNetworkBluetoothClient_parameters.connectivityHistoryTimespan = getNetworkBluetoothClient_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClient_parameters.connectivityHistoryTimespan = RED.util.getMessageProperty(msg, getNetworkBluetoothClient_nodeParam);
                }
                //getNetworkBluetoothClient_parameters.connectivityHistoryTimespan = !!getNetworkBluetoothClient_parameters.connectivityHistoryTimespan ? getNetworkBluetoothClient_parameters.connectivityHistoryTimespan : msg.payload;
                                result = client.getNetworkBluetoothClient(getNetworkBluetoothClient_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkBluetoothClients') {
                var getNetworkBluetoothClients_parameters = [];
                var getNetworkBluetoothClients_nodeParam;
                var getNetworkBluetoothClients_nodeParamType;

                getNetworkBluetoothClients_nodeParam = node.getNetworkBluetoothClients_networkId;
                getNetworkBluetoothClients_nodeParamType = node.getNetworkBluetoothClients_networkIdType;
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    //getNetworkBluetoothClients_parameters.networkId = getNetworkBluetoothClients_nodeParam || '';
                    getNetworkBluetoothClients_parameters.networkId = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClients_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkBluetoothClients_nodeParam);
                }
                //getNetworkBluetoothClients_parameters.networkId = !!getNetworkBluetoothClients_parameters.networkId ? getNetworkBluetoothClients_parameters.networkId : msg.payload;
                
                getNetworkBluetoothClients_nodeParam = node.getNetworkBluetoothClients_perPage;
                getNetworkBluetoothClients_nodeParamType = node.getNetworkBluetoothClients_perPageType;
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    //getNetworkBluetoothClients_parameters.perPage = getNetworkBluetoothClients_nodeParam || '';
                    getNetworkBluetoothClients_parameters.perPage = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClients_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkBluetoothClients_nodeParam);
                }
                //getNetworkBluetoothClients_parameters.perPage = !!getNetworkBluetoothClients_parameters.perPage ? getNetworkBluetoothClients_parameters.perPage : msg.payload;
                
                getNetworkBluetoothClients_nodeParam = node.getNetworkBluetoothClients_startingAfter;
                getNetworkBluetoothClients_nodeParamType = node.getNetworkBluetoothClients_startingAfterType;
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    //getNetworkBluetoothClients_parameters.startingAfter = getNetworkBluetoothClients_nodeParam || '';
                    getNetworkBluetoothClients_parameters.startingAfter = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClients_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkBluetoothClients_nodeParam);
                }
                //getNetworkBluetoothClients_parameters.startingAfter = !!getNetworkBluetoothClients_parameters.startingAfter ? getNetworkBluetoothClients_parameters.startingAfter : msg.payload;
                
                getNetworkBluetoothClients_nodeParam = node.getNetworkBluetoothClients_endingBefore;
                getNetworkBluetoothClients_nodeParamType = node.getNetworkBluetoothClients_endingBeforeType;
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    //getNetworkBluetoothClients_parameters.endingBefore = getNetworkBluetoothClients_nodeParam || '';
                    getNetworkBluetoothClients_parameters.endingBefore = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClients_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkBluetoothClients_nodeParam);
                }
                //getNetworkBluetoothClients_parameters.endingBefore = !!getNetworkBluetoothClients_parameters.endingBefore ? getNetworkBluetoothClients_parameters.endingBefore : msg.payload;
                
                getNetworkBluetoothClients_nodeParam = node.getNetworkBluetoothClients_timespan;
                getNetworkBluetoothClients_nodeParamType = node.getNetworkBluetoothClients_timespanType;
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    //getNetworkBluetoothClients_parameters.timespan = getNetworkBluetoothClients_nodeParam || '';
                    getNetworkBluetoothClients_parameters.timespan = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClients_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkBluetoothClients_nodeParam);
                }
                //getNetworkBluetoothClients_parameters.timespan = !!getNetworkBluetoothClients_parameters.timespan ? getNetworkBluetoothClients_parameters.timespan : msg.payload;
                
                getNetworkBluetoothClients_nodeParam = node.getNetworkBluetoothClients_includeConnectivityHistory;
                getNetworkBluetoothClients_nodeParamType = node.getNetworkBluetoothClients_includeConnectivityHistoryType;
                if (getNetworkBluetoothClients_nodeParamType === 'str') {
                    //getNetworkBluetoothClients_parameters.includeConnectivityHistory = getNetworkBluetoothClients_nodeParam || '';
                    getNetworkBluetoothClients_parameters.includeConnectivityHistory = getNetworkBluetoothClients_nodeParam || undefined;
                } else {
                    getNetworkBluetoothClients_parameters.includeConnectivityHistory = RED.util.getMessageProperty(msg, getNetworkBluetoothClients_nodeParam);
                }
                //getNetworkBluetoothClients_parameters.includeConnectivityHistory = !!getNetworkBluetoothClients_parameters.includeConnectivityHistory ? getNetworkBluetoothClients_parameters.includeConnectivityHistory : msg.payload;
                                result = client.getNetworkBluetoothClients(getNetworkBluetoothClients_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkBluetoothSettings') {
                var getNetworkBluetoothSettings_parameters = [];
                var getNetworkBluetoothSettings_nodeParam;
                var getNetworkBluetoothSettings_nodeParamType;

                getNetworkBluetoothSettings_nodeParam = node.getNetworkBluetoothSettings_networkId;
                getNetworkBluetoothSettings_nodeParamType = node.getNetworkBluetoothSettings_networkIdType;
                if (getNetworkBluetoothSettings_nodeParamType === 'str') {
                    //getNetworkBluetoothSettings_parameters.networkId = getNetworkBluetoothSettings_nodeParam || '';
                    getNetworkBluetoothSettings_parameters.networkId = getNetworkBluetoothSettings_nodeParam || undefined;
                } else {
                    getNetworkBluetoothSettings_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkBluetoothSettings_nodeParam);
                }
                //getNetworkBluetoothSettings_parameters.networkId = !!getNetworkBluetoothSettings_parameters.networkId ? getNetworkBluetoothSettings_parameters.networkId : msg.payload;
                                result = client.getNetworkBluetoothSettings(getNetworkBluetoothSettings_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkBluetoothSettings') {
                var updateNetworkBluetoothSettings_parameters = [];
                var updateNetworkBluetoothSettings_nodeParam;
                var updateNetworkBluetoothSettings_nodeParamType;

                updateNetworkBluetoothSettings_nodeParam = node.updateNetworkBluetoothSettings_networkId;
                updateNetworkBluetoothSettings_nodeParamType = node.updateNetworkBluetoothSettings_networkIdType;
                if (updateNetworkBluetoothSettings_nodeParamType === 'str') {
                    //updateNetworkBluetoothSettings_parameters.networkId = updateNetworkBluetoothSettings_nodeParam || '';
                    updateNetworkBluetoothSettings_parameters.networkId = updateNetworkBluetoothSettings_nodeParam || undefined;
                } else {
                    updateNetworkBluetoothSettings_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkBluetoothSettings_nodeParam);
                }
                //updateNetworkBluetoothSettings_parameters.networkId = !!updateNetworkBluetoothSettings_parameters.networkId ? updateNetworkBluetoothSettings_parameters.networkId : msg.payload;
                
                updateNetworkBluetoothSettings_nodeParam = node.updateNetworkBluetoothSettings_updateNetworkBluetoothSettings;
                updateNetworkBluetoothSettings_nodeParamType = node.updateNetworkBluetoothSettings_updateNetworkBluetoothSettingsType;
                if (updateNetworkBluetoothSettings_nodeParamType === 'str') {
                    //updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings = updateNetworkBluetoothSettings_nodeParam || '';
                    updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings = updateNetworkBluetoothSettings_nodeParam || undefined;
                } else {
                    updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings = RED.util.getMessageProperty(msg, updateNetworkBluetoothSettings_nodeParam);
                }
                //updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings = !!updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings ? updateNetworkBluetoothSettings_parameters.updateNetworkBluetoothSettings : msg.payload;
                                result = client.updateNetworkBluetoothSettings(updateNetworkBluetoothSettings_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationNetworks') {
                var getOrganizationNetworks_parameters = [];
                var getOrganizationNetworks_nodeParam;
                var getOrganizationNetworks_nodeParamType;

                getOrganizationNetworks_nodeParam = node.getOrganizationNetworks_organizationId;
                getOrganizationNetworks_nodeParamType = node.getOrganizationNetworks_organizationIdType;
                if (getOrganizationNetworks_nodeParamType === 'str') {
                    //getOrganizationNetworks_parameters.organizationId = getOrganizationNetworks_nodeParam || '';
                    getOrganizationNetworks_parameters.organizationId = getOrganizationNetworks_nodeParam || undefined;
                } else {
                    getOrganizationNetworks_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationNetworks_nodeParam);
                }
                //getOrganizationNetworks_parameters.organizationId = !!getOrganizationNetworks_parameters.organizationId ? getOrganizationNetworks_parameters.organizationId : msg.payload;
                
                getOrganizationNetworks_nodeParam = node.getOrganizationNetworks_configTemplateId;
                getOrganizationNetworks_nodeParamType = node.getOrganizationNetworks_configTemplateIdType;
                if (getOrganizationNetworks_nodeParamType === 'str') {
                    //getOrganizationNetworks_parameters.configTemplateId = getOrganizationNetworks_nodeParam || '';
                    getOrganizationNetworks_parameters.configTemplateId = getOrganizationNetworks_nodeParam || undefined;
                } else {
                    getOrganizationNetworks_parameters.configTemplateId = RED.util.getMessageProperty(msg, getOrganizationNetworks_nodeParam);
                }
                //getOrganizationNetworks_parameters.configTemplateId = !!getOrganizationNetworks_parameters.configTemplateId ? getOrganizationNetworks_parameters.configTemplateId : msg.payload;
                                result = client.getOrganizationNetworks(getOrganizationNetworks_parameters);
            }
            if (!errorFlag && node.method === 'createOrganizationNetworks') {
                var createOrganizationNetworks_parameters = [];
                var createOrganizationNetworks_nodeParam;
                var createOrganizationNetworks_nodeParamType;

                createOrganizationNetworks_nodeParam = node.createOrganizationNetworks_organizationId;
                createOrganizationNetworks_nodeParamType = node.createOrganizationNetworks_organizationIdType;
                if (createOrganizationNetworks_nodeParamType === 'str') {
                    //createOrganizationNetworks_parameters.organizationId = createOrganizationNetworks_nodeParam || '';
                    createOrganizationNetworks_parameters.organizationId = createOrganizationNetworks_nodeParam || undefined;
                } else {
                    createOrganizationNetworks_parameters.organizationId = RED.util.getMessageProperty(msg, createOrganizationNetworks_nodeParam);
                }
                //createOrganizationNetworks_parameters.organizationId = !!createOrganizationNetworks_parameters.organizationId ? createOrganizationNetworks_parameters.organizationId : msg.payload;
                
                createOrganizationNetworks_nodeParam = node.createOrganizationNetworks_createOrganizationNetworks;
                createOrganizationNetworks_nodeParamType = node.createOrganizationNetworks_createOrganizationNetworksType;
                if (createOrganizationNetworks_nodeParamType === 'str') {
                    //createOrganizationNetworks_parameters.createOrganizationNetworks = createOrganizationNetworks_nodeParam || '';
                    createOrganizationNetworks_parameters.createOrganizationNetworks = createOrganizationNetworks_nodeParam || undefined;
                } else {
                    createOrganizationNetworks_parameters.createOrganizationNetworks = RED.util.getMessageProperty(msg, createOrganizationNetworks_nodeParam);
                }
                //createOrganizationNetworks_parameters.createOrganizationNetworks = !!createOrganizationNetworks_parameters.createOrganizationNetworks ? createOrganizationNetworks_parameters.createOrganizationNetworks : msg.payload;
                                result = client.createOrganizationNetworks(createOrganizationNetworks_parameters);
            }
            if (!errorFlag && node.method === 'getNetwork') {
                var getNetwork_parameters = [];
                var getNetwork_nodeParam;
                var getNetwork_nodeParamType;

                getNetwork_nodeParam = node.getNetwork_networkId;
                getNetwork_nodeParamType = node.getNetwork_networkIdType;
                if (getNetwork_nodeParamType === 'str') {
                    //getNetwork_parameters.networkId = getNetwork_nodeParam || '';
                    getNetwork_parameters.networkId = getNetwork_nodeParam || undefined;
                } else {
                    getNetwork_parameters.networkId = RED.util.getMessageProperty(msg, getNetwork_nodeParam);
                }
                //getNetwork_parameters.networkId = !!getNetwork_parameters.networkId ? getNetwork_parameters.networkId : msg.payload;
                                result = client.getNetwork(getNetwork_parameters);
            }
            if (!errorFlag && node.method === 'updateNetwork') {
                var updateNetwork_parameters = [];
                var updateNetwork_nodeParam;
                var updateNetwork_nodeParamType;

                updateNetwork_nodeParam = node.updateNetwork_networkId;
                updateNetwork_nodeParamType = node.updateNetwork_networkIdType;
                if (updateNetwork_nodeParamType === 'str') {
                    //updateNetwork_parameters.networkId = updateNetwork_nodeParam || '';
                    updateNetwork_parameters.networkId = updateNetwork_nodeParam || undefined;
                } else {
                    updateNetwork_parameters.networkId = RED.util.getMessageProperty(msg, updateNetwork_nodeParam);
                }
                //updateNetwork_parameters.networkId = !!updateNetwork_parameters.networkId ? updateNetwork_parameters.networkId : msg.payload;
                
                updateNetwork_nodeParam = node.updateNetwork_updateNetwork;
                updateNetwork_nodeParamType = node.updateNetwork_updateNetworkType;
                if (updateNetwork_nodeParamType === 'str') {
                    //updateNetwork_parameters.updateNetwork = updateNetwork_nodeParam || '';
                    updateNetwork_parameters.updateNetwork = updateNetwork_nodeParam || undefined;
                } else {
                    updateNetwork_parameters.updateNetwork = RED.util.getMessageProperty(msg, updateNetwork_nodeParam);
                }
                //updateNetwork_parameters.updateNetwork = !!updateNetwork_parameters.updateNetwork ? updateNetwork_parameters.updateNetwork : msg.payload;
                                result = client.updateNetwork(updateNetwork_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetwork') {
                var deleteNetwork_parameters = [];
                var deleteNetwork_nodeParam;
                var deleteNetwork_nodeParamType;

                deleteNetwork_nodeParam = node.deleteNetwork_networkId;
                deleteNetwork_nodeParamType = node.deleteNetwork_networkIdType;
                if (deleteNetwork_nodeParamType === 'str') {
                    //deleteNetwork_parameters.networkId = deleteNetwork_nodeParam || '';
                    deleteNetwork_parameters.networkId = deleteNetwork_nodeParam || undefined;
                } else {
                    deleteNetwork_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetwork_nodeParam);
                }
                //deleteNetwork_parameters.networkId = !!deleteNetwork_parameters.networkId ? deleteNetwork_parameters.networkId : msg.payload;
                                result = client.deleteNetwork(deleteNetwork_parameters);
            }
            if (!errorFlag && node.method === 'bindNetwork') {
                var bindNetwork_parameters = [];
                var bindNetwork_nodeParam;
                var bindNetwork_nodeParamType;

                bindNetwork_nodeParam = node.bindNetwork_networkId;
                bindNetwork_nodeParamType = node.bindNetwork_networkIdType;
                if (bindNetwork_nodeParamType === 'str') {
                    //bindNetwork_parameters.networkId = bindNetwork_nodeParam || '';
                    bindNetwork_parameters.networkId = bindNetwork_nodeParam || undefined;
                } else {
                    bindNetwork_parameters.networkId = RED.util.getMessageProperty(msg, bindNetwork_nodeParam);
                }
                //bindNetwork_parameters.networkId = !!bindNetwork_parameters.networkId ? bindNetwork_parameters.networkId : msg.payload;
                
                bindNetwork_nodeParam = node.bindNetwork_bindNetwork;
                bindNetwork_nodeParamType = node.bindNetwork_bindNetworkType;
                if (bindNetwork_nodeParamType === 'str') {
                    //bindNetwork_parameters.bindNetwork = bindNetwork_nodeParam || '';
                    bindNetwork_parameters.bindNetwork = bindNetwork_nodeParam || undefined;
                } else {
                    bindNetwork_parameters.bindNetwork = RED.util.getMessageProperty(msg, bindNetwork_nodeParam);
                }
                //bindNetwork_parameters.bindNetwork = !!bindNetwork_parameters.bindNetwork ? bindNetwork_parameters.bindNetwork : msg.payload;
                                result = client.bindNetwork(bindNetwork_parameters);
            }
            if (!errorFlag && node.method === 'unbindNetwork') {
                var unbindNetwork_parameters = [];
                var unbindNetwork_nodeParam;
                var unbindNetwork_nodeParamType;

                unbindNetwork_nodeParam = node.unbindNetwork_networkId;
                unbindNetwork_nodeParamType = node.unbindNetwork_networkIdType;
                if (unbindNetwork_nodeParamType === 'str') {
                    //unbindNetwork_parameters.networkId = unbindNetwork_nodeParam || '';
                    unbindNetwork_parameters.networkId = unbindNetwork_nodeParam || undefined;
                } else {
                    unbindNetwork_parameters.networkId = RED.util.getMessageProperty(msg, unbindNetwork_nodeParam);
                }
                //unbindNetwork_parameters.networkId = !!unbindNetwork_parameters.networkId ? unbindNetwork_parameters.networkId : msg.payload;
                                result = client.unbindNetwork(unbindNetwork_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkTraffic') {
                var getNetworkTraffic_parameters = [];
                var getNetworkTraffic_nodeParam;
                var getNetworkTraffic_nodeParamType;

                getNetworkTraffic_nodeParam = node.getNetworkTraffic_networkId;
                getNetworkTraffic_nodeParamType = node.getNetworkTraffic_networkIdType;
                if (getNetworkTraffic_nodeParamType === 'str') {
                    //getNetworkTraffic_parameters.networkId = getNetworkTraffic_nodeParam || '';
                    getNetworkTraffic_parameters.networkId = getNetworkTraffic_nodeParam || undefined;
                } else {
                    getNetworkTraffic_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkTraffic_nodeParam);
                }
                //getNetworkTraffic_parameters.networkId = !!getNetworkTraffic_parameters.networkId ? getNetworkTraffic_parameters.networkId : msg.payload;
                
                getNetworkTraffic_nodeParam = node.getNetworkTraffic_timespan;
                getNetworkTraffic_nodeParamType = node.getNetworkTraffic_timespanType;
                if (getNetworkTraffic_nodeParamType === 'str') {
                    //getNetworkTraffic_parameters.timespan = getNetworkTraffic_nodeParam || '';
                    getNetworkTraffic_parameters.timespan = getNetworkTraffic_nodeParam || undefined;
                } else {
                    getNetworkTraffic_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkTraffic_nodeParam);
                }
                //getNetworkTraffic_parameters.timespan = !!getNetworkTraffic_parameters.timespan ? getNetworkTraffic_parameters.timespan : msg.payload;
                
                getNetworkTraffic_nodeParam = node.getNetworkTraffic_deviceType;
                getNetworkTraffic_nodeParamType = node.getNetworkTraffic_deviceTypeType;
                if (getNetworkTraffic_nodeParamType === 'str') {
                    //getNetworkTraffic_parameters.deviceType = getNetworkTraffic_nodeParam || '';
                    getNetworkTraffic_parameters.deviceType = getNetworkTraffic_nodeParam || undefined;
                } else {
                    getNetworkTraffic_parameters.deviceType = RED.util.getMessageProperty(msg, getNetworkTraffic_nodeParam);
                }
                //getNetworkTraffic_parameters.deviceType = !!getNetworkTraffic_parameters.deviceType ? getNetworkTraffic_parameters.deviceType : msg.payload;
                                result = client.getNetworkTraffic(getNetworkTraffic_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkAccessPolicies') {
                var getNetworkAccessPolicies_parameters = [];
                var getNetworkAccessPolicies_nodeParam;
                var getNetworkAccessPolicies_nodeParamType;

                getNetworkAccessPolicies_nodeParam = node.getNetworkAccessPolicies_networkId;
                getNetworkAccessPolicies_nodeParamType = node.getNetworkAccessPolicies_networkIdType;
                if (getNetworkAccessPolicies_nodeParamType === 'str') {
                    //getNetworkAccessPolicies_parameters.networkId = getNetworkAccessPolicies_nodeParam || '';
                    getNetworkAccessPolicies_parameters.networkId = getNetworkAccessPolicies_nodeParam || undefined;
                } else {
                    getNetworkAccessPolicies_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkAccessPolicies_nodeParam);
                }
                //getNetworkAccessPolicies_parameters.networkId = !!getNetworkAccessPolicies_parameters.networkId ? getNetworkAccessPolicies_parameters.networkId : msg.payload;
                                result = client.getNetworkAccessPolicies(getNetworkAccessPolicies_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkAirMarshal') {
                var getNetworkAirMarshal_parameters = [];
                var getNetworkAirMarshal_nodeParam;
                var getNetworkAirMarshal_nodeParamType;

                getNetworkAirMarshal_nodeParam = node.getNetworkAirMarshal_networkId;
                getNetworkAirMarshal_nodeParamType = node.getNetworkAirMarshal_networkIdType;
                if (getNetworkAirMarshal_nodeParamType === 'str') {
                    //getNetworkAirMarshal_parameters.networkId = getNetworkAirMarshal_nodeParam || '';
                    getNetworkAirMarshal_parameters.networkId = getNetworkAirMarshal_nodeParam || undefined;
                } else {
                    getNetworkAirMarshal_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkAirMarshal_nodeParam);
                }
                //getNetworkAirMarshal_parameters.networkId = !!getNetworkAirMarshal_parameters.networkId ? getNetworkAirMarshal_parameters.networkId : msg.payload;
                
                getNetworkAirMarshal_nodeParam = node.getNetworkAirMarshal_t0;
                getNetworkAirMarshal_nodeParamType = node.getNetworkAirMarshal_t0Type;
                if (getNetworkAirMarshal_nodeParamType === 'str') {
                    //getNetworkAirMarshal_parameters.t0 = getNetworkAirMarshal_nodeParam || '';
                    getNetworkAirMarshal_parameters.t0 = getNetworkAirMarshal_nodeParam || undefined;
                } else {
                    getNetworkAirMarshal_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkAirMarshal_nodeParam);
                }
                //getNetworkAirMarshal_parameters.t0 = !!getNetworkAirMarshal_parameters.t0 ? getNetworkAirMarshal_parameters.t0 : msg.payload;
                
                getNetworkAirMarshal_nodeParam = node.getNetworkAirMarshal_timespan;
                getNetworkAirMarshal_nodeParamType = node.getNetworkAirMarshal_timespanType;
                if (getNetworkAirMarshal_nodeParamType === 'str') {
                    //getNetworkAirMarshal_parameters.timespan = getNetworkAirMarshal_nodeParam || '';
                    getNetworkAirMarshal_parameters.timespan = getNetworkAirMarshal_nodeParam || undefined;
                } else {
                    getNetworkAirMarshal_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkAirMarshal_nodeParam);
                }
                //getNetworkAirMarshal_parameters.timespan = !!getNetworkAirMarshal_parameters.timespan ? getNetworkAirMarshal_parameters.timespan : msg.payload;
                                result = client.getNetworkAirMarshal(getNetworkAirMarshal_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSiteToSiteVpn') {
                var getNetworkSiteToSiteVpn_parameters = [];
                var getNetworkSiteToSiteVpn_nodeParam;
                var getNetworkSiteToSiteVpn_nodeParamType;

                getNetworkSiteToSiteVpn_nodeParam = node.getNetworkSiteToSiteVpn_networkId;
                getNetworkSiteToSiteVpn_nodeParamType = node.getNetworkSiteToSiteVpn_networkIdType;
                if (getNetworkSiteToSiteVpn_nodeParamType === 'str') {
                    //getNetworkSiteToSiteVpn_parameters.networkId = getNetworkSiteToSiteVpn_nodeParam || '';
                    getNetworkSiteToSiteVpn_parameters.networkId = getNetworkSiteToSiteVpn_nodeParam || undefined;
                } else {
                    getNetworkSiteToSiteVpn_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSiteToSiteVpn_nodeParam);
                }
                //getNetworkSiteToSiteVpn_parameters.networkId = !!getNetworkSiteToSiteVpn_parameters.networkId ? getNetworkSiteToSiteVpn_parameters.networkId : msg.payload;
                                result = client.getNetworkSiteToSiteVpn(getNetworkSiteToSiteVpn_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSiteToSiteVpn') {
                var updateNetworkSiteToSiteVpn_parameters = [];
                var updateNetworkSiteToSiteVpn_nodeParam;
                var updateNetworkSiteToSiteVpn_nodeParamType;

                updateNetworkSiteToSiteVpn_nodeParam = node.updateNetworkSiteToSiteVpn_networkId;
                updateNetworkSiteToSiteVpn_nodeParamType = node.updateNetworkSiteToSiteVpn_networkIdType;
                if (updateNetworkSiteToSiteVpn_nodeParamType === 'str') {
                    //updateNetworkSiteToSiteVpn_parameters.networkId = updateNetworkSiteToSiteVpn_nodeParam || '';
                    updateNetworkSiteToSiteVpn_parameters.networkId = updateNetworkSiteToSiteVpn_nodeParam || undefined;
                } else {
                    updateNetworkSiteToSiteVpn_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSiteToSiteVpn_nodeParam);
                }
                //updateNetworkSiteToSiteVpn_parameters.networkId = !!updateNetworkSiteToSiteVpn_parameters.networkId ? updateNetworkSiteToSiteVpn_parameters.networkId : msg.payload;
                
                updateNetworkSiteToSiteVpn_nodeParam = node.updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpn;
                updateNetworkSiteToSiteVpn_nodeParamType = node.updateNetworkSiteToSiteVpn_updateNetworkSiteToSiteVpnType;
                if (updateNetworkSiteToSiteVpn_nodeParamType === 'str') {
                    //updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn = updateNetworkSiteToSiteVpn_nodeParam || '';
                    updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn = updateNetworkSiteToSiteVpn_nodeParam || undefined;
                } else {
                    updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn = RED.util.getMessageProperty(msg, updateNetworkSiteToSiteVpn_nodeParam);
                }
                //updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn = !!updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn ? updateNetworkSiteToSiteVpn_parameters.updateNetworkSiteToSiteVpn : msg.payload;
                                result = client.updateNetworkSiteToSiteVpn(updateNetworkSiteToSiteVpn_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkCameraVideoLink') {
                var getNetworkCameraVideoLink_parameters = [];
                var getNetworkCameraVideoLink_nodeParam;
                var getNetworkCameraVideoLink_nodeParamType;

                getNetworkCameraVideoLink_nodeParam = node.getNetworkCameraVideoLink_networkId;
                getNetworkCameraVideoLink_nodeParamType = node.getNetworkCameraVideoLink_networkIdType;
                if (getNetworkCameraVideoLink_nodeParamType === 'str') {
                    //getNetworkCameraVideoLink_parameters.networkId = getNetworkCameraVideoLink_nodeParam || '';
                    getNetworkCameraVideoLink_parameters.networkId = getNetworkCameraVideoLink_nodeParam || undefined;
                } else {
                    getNetworkCameraVideoLink_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkCameraVideoLink_nodeParam);
                }
                //getNetworkCameraVideoLink_parameters.networkId = !!getNetworkCameraVideoLink_parameters.networkId ? getNetworkCameraVideoLink_parameters.networkId : msg.payload;
                
                getNetworkCameraVideoLink_nodeParam = node.getNetworkCameraVideoLink_serial;
                getNetworkCameraVideoLink_nodeParamType = node.getNetworkCameraVideoLink_serialType;
                if (getNetworkCameraVideoLink_nodeParamType === 'str') {
                    //getNetworkCameraVideoLink_parameters.serial = getNetworkCameraVideoLink_nodeParam || '';
                    getNetworkCameraVideoLink_parameters.serial = getNetworkCameraVideoLink_nodeParam || undefined;
                } else {
                    getNetworkCameraVideoLink_parameters.serial = RED.util.getMessageProperty(msg, getNetworkCameraVideoLink_nodeParam);
                }
                //getNetworkCameraVideoLink_parameters.serial = !!getNetworkCameraVideoLink_parameters.serial ? getNetworkCameraVideoLink_parameters.serial : msg.payload;
                
                getNetworkCameraVideoLink_nodeParam = node.getNetworkCameraVideoLink_timestamp;
                getNetworkCameraVideoLink_nodeParamType = node.getNetworkCameraVideoLink_timestampType;
                if (getNetworkCameraVideoLink_nodeParamType === 'str') {
                    //getNetworkCameraVideoLink_parameters.timestamp = getNetworkCameraVideoLink_nodeParam || '';
                    getNetworkCameraVideoLink_parameters.timestamp = getNetworkCameraVideoLink_nodeParam || undefined;
                } else {
                    getNetworkCameraVideoLink_parameters.timestamp = RED.util.getMessageProperty(msg, getNetworkCameraVideoLink_nodeParam);
                }
                //getNetworkCameraVideoLink_parameters.timestamp = !!getNetworkCameraVideoLink_parameters.timestamp ? getNetworkCameraVideoLink_parameters.timestamp : msg.payload;
                                result = client.getNetworkCameraVideoLink(getNetworkCameraVideoLink_parameters);
            }
            if (!errorFlag && node.method === 'snapshotNetworkCamera') {
                var snapshotNetworkCamera_parameters = [];
                var snapshotNetworkCamera_nodeParam;
                var snapshotNetworkCamera_nodeParamType;

                snapshotNetworkCamera_nodeParam = node.snapshotNetworkCamera_networkId;
                snapshotNetworkCamera_nodeParamType = node.snapshotNetworkCamera_networkIdType;
                if (snapshotNetworkCamera_nodeParamType === 'str') {
                    //snapshotNetworkCamera_parameters.networkId = snapshotNetworkCamera_nodeParam || '';
                    snapshotNetworkCamera_parameters.networkId = snapshotNetworkCamera_nodeParam || undefined;
                } else {
                    snapshotNetworkCamera_parameters.networkId = RED.util.getMessageProperty(msg, snapshotNetworkCamera_nodeParam);
                }
                //snapshotNetworkCamera_parameters.networkId = !!snapshotNetworkCamera_parameters.networkId ? snapshotNetworkCamera_parameters.networkId : msg.payload;
                
                snapshotNetworkCamera_nodeParam = node.snapshotNetworkCamera_serial;
                snapshotNetworkCamera_nodeParamType = node.snapshotNetworkCamera_serialType;
                if (snapshotNetworkCamera_nodeParamType === 'str') {
                    //snapshotNetworkCamera_parameters.serial = snapshotNetworkCamera_nodeParam || '';
                    snapshotNetworkCamera_parameters.serial = snapshotNetworkCamera_nodeParam || undefined;
                } else {
                    snapshotNetworkCamera_parameters.serial = RED.util.getMessageProperty(msg, snapshotNetworkCamera_nodeParam);
                }
                //snapshotNetworkCamera_parameters.serial = !!snapshotNetworkCamera_parameters.serial ? snapshotNetworkCamera_parameters.serial : msg.payload;
                
                snapshotNetworkCamera_nodeParam = node.snapshotNetworkCamera_snapshotNetworkCamera;
                snapshotNetworkCamera_nodeParamType = node.snapshotNetworkCamera_snapshotNetworkCameraType;
                if (snapshotNetworkCamera_nodeParamType === 'str') {
                    //snapshotNetworkCamera_parameters.snapshotNetworkCamera = snapshotNetworkCamera_nodeParam || '';
                    snapshotNetworkCamera_parameters.snapshotNetworkCamera = snapshotNetworkCamera_nodeParam || undefined;
                } else {
                    snapshotNetworkCamera_parameters.snapshotNetworkCamera = RED.util.getMessageProperty(msg, snapshotNetworkCamera_nodeParam);
                }
                //snapshotNetworkCamera_parameters.snapshotNetworkCamera = !!snapshotNetworkCamera_parameters.snapshotNetworkCamera ? snapshotNetworkCamera_parameters.snapshotNetworkCamera : msg.payload;
                                result = client.snapshotNetworkCamera(snapshotNetworkCamera_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceClients') {
                var getDeviceClients_parameters = [];
                var getDeviceClients_nodeParam;
                var getDeviceClients_nodeParamType;

                getDeviceClients_nodeParam = node.getDeviceClients_serial;
                getDeviceClients_nodeParamType = node.getDeviceClients_serialType;
                if (getDeviceClients_nodeParamType === 'str') {
                    //getDeviceClients_parameters.serial = getDeviceClients_nodeParam || '';
                    getDeviceClients_parameters.serial = getDeviceClients_nodeParam || undefined;
                } else {
                    getDeviceClients_parameters.serial = RED.util.getMessageProperty(msg, getDeviceClients_nodeParam);
                }
                //getDeviceClients_parameters.serial = !!getDeviceClients_parameters.serial ? getDeviceClients_parameters.serial : msg.payload;
                
                getDeviceClients_nodeParam = node.getDeviceClients_timespan;
                getDeviceClients_nodeParamType = node.getDeviceClients_timespanType;
                if (getDeviceClients_nodeParamType === 'str') {
                    //getDeviceClients_parameters.timespan = getDeviceClients_nodeParam || '';
                    getDeviceClients_parameters.timespan = getDeviceClients_nodeParam || undefined;
                } else {
                    getDeviceClients_parameters.timespan = RED.util.getMessageProperty(msg, getDeviceClients_nodeParam);
                }
                //getDeviceClients_parameters.timespan = !!getDeviceClients_parameters.timespan ? getDeviceClients_parameters.timespan : msg.payload;
                                result = client.getDeviceClients(getDeviceClients_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClient') {
                var getNetworkClient_parameters = [];
                var getNetworkClient_nodeParam;
                var getNetworkClient_nodeParamType;

                getNetworkClient_nodeParam = node.getNetworkClient_networkId;
                getNetworkClient_nodeParamType = node.getNetworkClient_networkIdType;
                if (getNetworkClient_nodeParamType === 'str') {
                    //getNetworkClient_parameters.networkId = getNetworkClient_nodeParam || '';
                    getNetworkClient_parameters.networkId = getNetworkClient_nodeParam || undefined;
                } else {
                    getNetworkClient_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClient_nodeParam);
                }
                //getNetworkClient_parameters.networkId = !!getNetworkClient_parameters.networkId ? getNetworkClient_parameters.networkId : msg.payload;
                
                getNetworkClient_nodeParam = node.getNetworkClient_idOrMacOrIp;
                getNetworkClient_nodeParamType = node.getNetworkClient_idOrMacOrIpType;
                if (getNetworkClient_nodeParamType === 'str') {
                    //getNetworkClient_parameters.idOrMacOrIp = getNetworkClient_nodeParam || '';
                    getNetworkClient_parameters.idOrMacOrIp = getNetworkClient_nodeParam || undefined;
                } else {
                    getNetworkClient_parameters.idOrMacOrIp = RED.util.getMessageProperty(msg, getNetworkClient_nodeParam);
                }
                //getNetworkClient_parameters.idOrMacOrIp = !!getNetworkClient_parameters.idOrMacOrIp ? getNetworkClient_parameters.idOrMacOrIp : msg.payload;
                                result = client.getNetworkClient(getNetworkClient_parameters);
            }
            if (!errorFlag && node.method === 'provisionNetworkClients') {
                var provisionNetworkClients_parameters = [];
                var provisionNetworkClients_nodeParam;
                var provisionNetworkClients_nodeParamType;

                provisionNetworkClients_nodeParam = node.provisionNetworkClients_networkId;
                provisionNetworkClients_nodeParamType = node.provisionNetworkClients_networkIdType;
                if (provisionNetworkClients_nodeParamType === 'str') {
                    //provisionNetworkClients_parameters.networkId = provisionNetworkClients_nodeParam || '';
                    provisionNetworkClients_parameters.networkId = provisionNetworkClients_nodeParam || undefined;
                } else {
                    provisionNetworkClients_parameters.networkId = RED.util.getMessageProperty(msg, provisionNetworkClients_nodeParam);
                }
                //provisionNetworkClients_parameters.networkId = !!provisionNetworkClients_parameters.networkId ? provisionNetworkClients_parameters.networkId : msg.payload;
                
                provisionNetworkClients_nodeParam = node.provisionNetworkClients_provisionNetworkClients;
                provisionNetworkClients_nodeParamType = node.provisionNetworkClients_provisionNetworkClientsType;
                if (provisionNetworkClients_nodeParamType === 'str') {
                    //provisionNetworkClients_parameters.provisionNetworkClients = provisionNetworkClients_nodeParam || '';
                    provisionNetworkClients_parameters.provisionNetworkClients = provisionNetworkClients_nodeParam || undefined;
                } else {
                    provisionNetworkClients_parameters.provisionNetworkClients = RED.util.getMessageProperty(msg, provisionNetworkClients_nodeParam);
                }
                //provisionNetworkClients_parameters.provisionNetworkClients = !!provisionNetworkClients_parameters.provisionNetworkClients ? provisionNetworkClients_parameters.provisionNetworkClients : msg.payload;
                                result = client.provisionNetworkClients(provisionNetworkClients_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientUsageHistory') {
                var getNetworkClientUsageHistory_parameters = [];
                var getNetworkClientUsageHistory_nodeParam;
                var getNetworkClientUsageHistory_nodeParamType;

                getNetworkClientUsageHistory_nodeParam = node.getNetworkClientUsageHistory_networkId;
                getNetworkClientUsageHistory_nodeParamType = node.getNetworkClientUsageHistory_networkIdType;
                if (getNetworkClientUsageHistory_nodeParamType === 'str') {
                    //getNetworkClientUsageHistory_parameters.networkId = getNetworkClientUsageHistory_nodeParam || '';
                    getNetworkClientUsageHistory_parameters.networkId = getNetworkClientUsageHistory_nodeParam || undefined;
                } else {
                    getNetworkClientUsageHistory_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientUsageHistory_nodeParam);
                }
                //getNetworkClientUsageHistory_parameters.networkId = !!getNetworkClientUsageHistory_parameters.networkId ? getNetworkClientUsageHistory_parameters.networkId : msg.payload;
                
                getNetworkClientUsageHistory_nodeParam = node.getNetworkClientUsageHistory_idOrMacOrIp;
                getNetworkClientUsageHistory_nodeParamType = node.getNetworkClientUsageHistory_idOrMacOrIpType;
                if (getNetworkClientUsageHistory_nodeParamType === 'str') {
                    //getNetworkClientUsageHistory_parameters.idOrMacOrIp = getNetworkClientUsageHistory_nodeParam || '';
                    getNetworkClientUsageHistory_parameters.idOrMacOrIp = getNetworkClientUsageHistory_nodeParam || undefined;
                } else {
                    getNetworkClientUsageHistory_parameters.idOrMacOrIp = RED.util.getMessageProperty(msg, getNetworkClientUsageHistory_nodeParam);
                }
                //getNetworkClientUsageHistory_parameters.idOrMacOrIp = !!getNetworkClientUsageHistory_parameters.idOrMacOrIp ? getNetworkClientUsageHistory_parameters.idOrMacOrIp : msg.payload;
                                result = client.getNetworkClientUsageHistory(getNetworkClientUsageHistory_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientPolicy') {
                var getNetworkClientPolicy_parameters = [];
                var getNetworkClientPolicy_nodeParam;
                var getNetworkClientPolicy_nodeParamType;

                getNetworkClientPolicy_nodeParam = node.getNetworkClientPolicy_networkId;
                getNetworkClientPolicy_nodeParamType = node.getNetworkClientPolicy_networkIdType;
                if (getNetworkClientPolicy_nodeParamType === 'str') {
                    //getNetworkClientPolicy_parameters.networkId = getNetworkClientPolicy_nodeParam || '';
                    getNetworkClientPolicy_parameters.networkId = getNetworkClientPolicy_nodeParam || undefined;
                } else {
                    getNetworkClientPolicy_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientPolicy_nodeParam);
                }
                //getNetworkClientPolicy_parameters.networkId = !!getNetworkClientPolicy_parameters.networkId ? getNetworkClientPolicy_parameters.networkId : msg.payload;
                
                getNetworkClientPolicy_nodeParam = node.getNetworkClientPolicy_mac;
                getNetworkClientPolicy_nodeParamType = node.getNetworkClientPolicy_macType;
                if (getNetworkClientPolicy_nodeParamType === 'str') {
                    //getNetworkClientPolicy_parameters.mac = getNetworkClientPolicy_nodeParam || '';
                    getNetworkClientPolicy_parameters.mac = getNetworkClientPolicy_nodeParam || undefined;
                } else {
                    getNetworkClientPolicy_parameters.mac = RED.util.getMessageProperty(msg, getNetworkClientPolicy_nodeParam);
                }
                //getNetworkClientPolicy_parameters.mac = !!getNetworkClientPolicy_parameters.mac ? getNetworkClientPolicy_parameters.mac : msg.payload;
                
                getNetworkClientPolicy_nodeParam = node.getNetworkClientPolicy_timespan;
                getNetworkClientPolicy_nodeParamType = node.getNetworkClientPolicy_timespanType;
                if (getNetworkClientPolicy_nodeParamType === 'str') {
                    //getNetworkClientPolicy_parameters.timespan = getNetworkClientPolicy_nodeParam || '';
                    getNetworkClientPolicy_parameters.timespan = getNetworkClientPolicy_nodeParam || undefined;
                } else {
                    getNetworkClientPolicy_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkClientPolicy_nodeParam);
                }
                //getNetworkClientPolicy_parameters.timespan = !!getNetworkClientPolicy_parameters.timespan ? getNetworkClientPolicy_parameters.timespan : msg.payload;
                                result = client.getNetworkClientPolicy(getNetworkClientPolicy_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkClientPolicy') {
                var updateNetworkClientPolicy_parameters = [];
                var updateNetworkClientPolicy_nodeParam;
                var updateNetworkClientPolicy_nodeParamType;

                updateNetworkClientPolicy_nodeParam = node.updateNetworkClientPolicy_networkId;
                updateNetworkClientPolicy_nodeParamType = node.updateNetworkClientPolicy_networkIdType;
                if (updateNetworkClientPolicy_nodeParamType === 'str') {
                    //updateNetworkClientPolicy_parameters.networkId = updateNetworkClientPolicy_nodeParam || '';
                    updateNetworkClientPolicy_parameters.networkId = updateNetworkClientPolicy_nodeParam || undefined;
                } else {
                    updateNetworkClientPolicy_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkClientPolicy_nodeParam);
                }
                //updateNetworkClientPolicy_parameters.networkId = !!updateNetworkClientPolicy_parameters.networkId ? updateNetworkClientPolicy_parameters.networkId : msg.payload;
                
                updateNetworkClientPolicy_nodeParam = node.updateNetworkClientPolicy_mac;
                updateNetworkClientPolicy_nodeParamType = node.updateNetworkClientPolicy_macType;
                if (updateNetworkClientPolicy_nodeParamType === 'str') {
                    //updateNetworkClientPolicy_parameters.mac = updateNetworkClientPolicy_nodeParam || '';
                    updateNetworkClientPolicy_parameters.mac = updateNetworkClientPolicy_nodeParam || undefined;
                } else {
                    updateNetworkClientPolicy_parameters.mac = RED.util.getMessageProperty(msg, updateNetworkClientPolicy_nodeParam);
                }
                //updateNetworkClientPolicy_parameters.mac = !!updateNetworkClientPolicy_parameters.mac ? updateNetworkClientPolicy_parameters.mac : msg.payload;
                
                updateNetworkClientPolicy_nodeParam = node.updateNetworkClientPolicy_updateNetworkClientPolicy;
                updateNetworkClientPolicy_nodeParamType = node.updateNetworkClientPolicy_updateNetworkClientPolicyType;
                if (updateNetworkClientPolicy_nodeParamType === 'str') {
                    //updateNetworkClientPolicy_parameters.updateNetworkClientPolicy = updateNetworkClientPolicy_nodeParam || '';
                    updateNetworkClientPolicy_parameters.updateNetworkClientPolicy = updateNetworkClientPolicy_nodeParam || undefined;
                } else {
                    updateNetworkClientPolicy_parameters.updateNetworkClientPolicy = RED.util.getMessageProperty(msg, updateNetworkClientPolicy_nodeParam);
                }
                //updateNetworkClientPolicy_parameters.updateNetworkClientPolicy = !!updateNetworkClientPolicy_parameters.updateNetworkClientPolicy ? updateNetworkClientPolicy_parameters.updateNetworkClientPolicy : msg.payload;
                                result = client.updateNetworkClientPolicy(updateNetworkClientPolicy_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientSplashAuthorizationStatus') {
                var getNetworkClientSplashAuthorizationStatus_parameters = [];
                var getNetworkClientSplashAuthorizationStatus_nodeParam;
                var getNetworkClientSplashAuthorizationStatus_nodeParamType;

                getNetworkClientSplashAuthorizationStatus_nodeParam = node.getNetworkClientSplashAuthorizationStatus_id;
                getNetworkClientSplashAuthorizationStatus_nodeParamType = node.getNetworkClientSplashAuthorizationStatus_idType;
                if (getNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    //getNetworkClientSplashAuthorizationStatus_parameters.id = getNetworkClientSplashAuthorizationStatus_nodeParam || '';
                    getNetworkClientSplashAuthorizationStatus_parameters.id = getNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    getNetworkClientSplashAuthorizationStatus_parameters.id = RED.util.getMessageProperty(msg, getNetworkClientSplashAuthorizationStatus_nodeParam);
                }
                //getNetworkClientSplashAuthorizationStatus_parameters.id = !!getNetworkClientSplashAuthorizationStatus_parameters.id ? getNetworkClientSplashAuthorizationStatus_parameters.id : msg.payload;
                
                getNetworkClientSplashAuthorizationStatus_nodeParam = node.getNetworkClientSplashAuthorizationStatus_mac;
                getNetworkClientSplashAuthorizationStatus_nodeParamType = node.getNetworkClientSplashAuthorizationStatus_macType;
                if (getNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    //getNetworkClientSplashAuthorizationStatus_parameters.mac = getNetworkClientSplashAuthorizationStatus_nodeParam || '';
                    getNetworkClientSplashAuthorizationStatus_parameters.mac = getNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    getNetworkClientSplashAuthorizationStatus_parameters.mac = RED.util.getMessageProperty(msg, getNetworkClientSplashAuthorizationStatus_nodeParam);
                }
                //getNetworkClientSplashAuthorizationStatus_parameters.mac = !!getNetworkClientSplashAuthorizationStatus_parameters.mac ? getNetworkClientSplashAuthorizationStatus_parameters.mac : msg.payload;
                                result = client.getNetworkClientSplashAuthorizationStatus(getNetworkClientSplashAuthorizationStatus_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkClientSplashAuthorizationStatus') {
                var updateNetworkClientSplashAuthorizationStatus_parameters = [];
                var updateNetworkClientSplashAuthorizationStatus_nodeParam;
                var updateNetworkClientSplashAuthorizationStatus_nodeParamType;

                updateNetworkClientSplashAuthorizationStatus_nodeParam = node.updateNetworkClientSplashAuthorizationStatus_id;
                updateNetworkClientSplashAuthorizationStatus_nodeParamType = node.updateNetworkClientSplashAuthorizationStatus_idType;
                if (updateNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    //updateNetworkClientSplashAuthorizationStatus_parameters.id = updateNetworkClientSplashAuthorizationStatus_nodeParam || '';
                    updateNetworkClientSplashAuthorizationStatus_parameters.id = updateNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    updateNetworkClientSplashAuthorizationStatus_parameters.id = RED.util.getMessageProperty(msg, updateNetworkClientSplashAuthorizationStatus_nodeParam);
                }
                //updateNetworkClientSplashAuthorizationStatus_parameters.id = !!updateNetworkClientSplashAuthorizationStatus_parameters.id ? updateNetworkClientSplashAuthorizationStatus_parameters.id : msg.payload;
                
                updateNetworkClientSplashAuthorizationStatus_nodeParam = node.updateNetworkClientSplashAuthorizationStatus_mac;
                updateNetworkClientSplashAuthorizationStatus_nodeParamType = node.updateNetworkClientSplashAuthorizationStatus_macType;
                if (updateNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    //updateNetworkClientSplashAuthorizationStatus_parameters.mac = updateNetworkClientSplashAuthorizationStatus_nodeParam || '';
                    updateNetworkClientSplashAuthorizationStatus_parameters.mac = updateNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    updateNetworkClientSplashAuthorizationStatus_parameters.mac = RED.util.getMessageProperty(msg, updateNetworkClientSplashAuthorizationStatus_nodeParam);
                }
                //updateNetworkClientSplashAuthorizationStatus_parameters.mac = !!updateNetworkClientSplashAuthorizationStatus_parameters.mac ? updateNetworkClientSplashAuthorizationStatus_parameters.mac : msg.payload;
                
                updateNetworkClientSplashAuthorizationStatus_nodeParam = node.updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatus;
                updateNetworkClientSplashAuthorizationStatus_nodeParamType = node.updateNetworkClientSplashAuthorizationStatus_updateNetworkClientSplashAuthorizationStatusType;
                if (updateNetworkClientSplashAuthorizationStatus_nodeParamType === 'str') {
                    //updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus = updateNetworkClientSplashAuthorizationStatus_nodeParam || '';
                    updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus = updateNetworkClientSplashAuthorizationStatus_nodeParam || undefined;
                } else {
                    updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus = RED.util.getMessageProperty(msg, updateNetworkClientSplashAuthorizationStatus_nodeParam);
                }
                //updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus = !!updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus ? updateNetworkClientSplashAuthorizationStatus_parameters.updateNetworkClientSplashAuthorizationStatus : msg.payload;
                                result = client.updateNetworkClientSplashAuthorizationStatus(updateNetworkClientSplashAuthorizationStatus_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientTrafficHistory') {
                var getNetworkClientTrafficHistory_parameters = [];
                var getNetworkClientTrafficHistory_nodeParam;
                var getNetworkClientTrafficHistory_nodeParamType;

                getNetworkClientTrafficHistory_nodeParam = node.getNetworkClientTrafficHistory_networkId;
                getNetworkClientTrafficHistory_nodeParamType = node.getNetworkClientTrafficHistory_networkIdType;
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    //getNetworkClientTrafficHistory_parameters.networkId = getNetworkClientTrafficHistory_nodeParam || '';
                    getNetworkClientTrafficHistory_parameters.networkId = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    getNetworkClientTrafficHistory_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientTrafficHistory_nodeParam);
                }
                //getNetworkClientTrafficHistory_parameters.networkId = !!getNetworkClientTrafficHistory_parameters.networkId ? getNetworkClientTrafficHistory_parameters.networkId : msg.payload;
                
                getNetworkClientTrafficHistory_nodeParam = node.getNetworkClientTrafficHistory_idOrMacOrIp;
                getNetworkClientTrafficHistory_nodeParamType = node.getNetworkClientTrafficHistory_idOrMacOrIpType;
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    //getNetworkClientTrafficHistory_parameters.idOrMacOrIp = getNetworkClientTrafficHistory_nodeParam || '';
                    getNetworkClientTrafficHistory_parameters.idOrMacOrIp = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    getNetworkClientTrafficHistory_parameters.idOrMacOrIp = RED.util.getMessageProperty(msg, getNetworkClientTrafficHistory_nodeParam);
                }
                //getNetworkClientTrafficHistory_parameters.idOrMacOrIp = !!getNetworkClientTrafficHistory_parameters.idOrMacOrIp ? getNetworkClientTrafficHistory_parameters.idOrMacOrIp : msg.payload;
                
                getNetworkClientTrafficHistory_nodeParam = node.getNetworkClientTrafficHistory_perPage;
                getNetworkClientTrafficHistory_nodeParamType = node.getNetworkClientTrafficHistory_perPageType;
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    //getNetworkClientTrafficHistory_parameters.perPage = getNetworkClientTrafficHistory_nodeParam || '';
                    getNetworkClientTrafficHistory_parameters.perPage = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    getNetworkClientTrafficHistory_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkClientTrafficHistory_nodeParam);
                }
                //getNetworkClientTrafficHistory_parameters.perPage = !!getNetworkClientTrafficHistory_parameters.perPage ? getNetworkClientTrafficHistory_parameters.perPage : msg.payload;
                
                getNetworkClientTrafficHistory_nodeParam = node.getNetworkClientTrafficHistory_startingAfter;
                getNetworkClientTrafficHistory_nodeParamType = node.getNetworkClientTrafficHistory_startingAfterType;
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    //getNetworkClientTrafficHistory_parameters.startingAfter = getNetworkClientTrafficHistory_nodeParam || '';
                    getNetworkClientTrafficHistory_parameters.startingAfter = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    getNetworkClientTrafficHistory_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkClientTrafficHistory_nodeParam);
                }
                //getNetworkClientTrafficHistory_parameters.startingAfter = !!getNetworkClientTrafficHistory_parameters.startingAfter ? getNetworkClientTrafficHistory_parameters.startingAfter : msg.payload;
                
                getNetworkClientTrafficHistory_nodeParam = node.getNetworkClientTrafficHistory_endingBefore;
                getNetworkClientTrafficHistory_nodeParamType = node.getNetworkClientTrafficHistory_endingBeforeType;
                if (getNetworkClientTrafficHistory_nodeParamType === 'str') {
                    //getNetworkClientTrafficHistory_parameters.endingBefore = getNetworkClientTrafficHistory_nodeParam || '';
                    getNetworkClientTrafficHistory_parameters.endingBefore = getNetworkClientTrafficHistory_nodeParam || undefined;
                } else {
                    getNetworkClientTrafficHistory_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkClientTrafficHistory_nodeParam);
                }
                //getNetworkClientTrafficHistory_parameters.endingBefore = !!getNetworkClientTrafficHistory_parameters.endingBefore ? getNetworkClientTrafficHistory_parameters.endingBefore : msg.payload;
                                result = client.getNetworkClientTrafficHistory(getNetworkClientTrafficHistory_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientEvents') {
                var getNetworkClientEvents_parameters = [];
                var getNetworkClientEvents_nodeParam;
                var getNetworkClientEvents_nodeParamType;

                getNetworkClientEvents_nodeParam = node.getNetworkClientEvents_networkId;
                getNetworkClientEvents_nodeParamType = node.getNetworkClientEvents_networkIdType;
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    //getNetworkClientEvents_parameters.networkId = getNetworkClientEvents_nodeParam || '';
                    getNetworkClientEvents_parameters.networkId = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    getNetworkClientEvents_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientEvents_nodeParam);
                }
                //getNetworkClientEvents_parameters.networkId = !!getNetworkClientEvents_parameters.networkId ? getNetworkClientEvents_parameters.networkId : msg.payload;
                
                getNetworkClientEvents_nodeParam = node.getNetworkClientEvents_idOrMacOrIp;
                getNetworkClientEvents_nodeParamType = node.getNetworkClientEvents_idOrMacOrIpType;
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    //getNetworkClientEvents_parameters.idOrMacOrIp = getNetworkClientEvents_nodeParam || '';
                    getNetworkClientEvents_parameters.idOrMacOrIp = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    getNetworkClientEvents_parameters.idOrMacOrIp = RED.util.getMessageProperty(msg, getNetworkClientEvents_nodeParam);
                }
                //getNetworkClientEvents_parameters.idOrMacOrIp = !!getNetworkClientEvents_parameters.idOrMacOrIp ? getNetworkClientEvents_parameters.idOrMacOrIp : msg.payload;
                
                getNetworkClientEvents_nodeParam = node.getNetworkClientEvents_perPage;
                getNetworkClientEvents_nodeParamType = node.getNetworkClientEvents_perPageType;
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    //getNetworkClientEvents_parameters.perPage = getNetworkClientEvents_nodeParam || '';
                    getNetworkClientEvents_parameters.perPage = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    getNetworkClientEvents_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkClientEvents_nodeParam);
                }
                //getNetworkClientEvents_parameters.perPage = !!getNetworkClientEvents_parameters.perPage ? getNetworkClientEvents_parameters.perPage : msg.payload;
                
                getNetworkClientEvents_nodeParam = node.getNetworkClientEvents_startingAfter;
                getNetworkClientEvents_nodeParamType = node.getNetworkClientEvents_startingAfterType;
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    //getNetworkClientEvents_parameters.startingAfter = getNetworkClientEvents_nodeParam || '';
                    getNetworkClientEvents_parameters.startingAfter = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    getNetworkClientEvents_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkClientEvents_nodeParam);
                }
                //getNetworkClientEvents_parameters.startingAfter = !!getNetworkClientEvents_parameters.startingAfter ? getNetworkClientEvents_parameters.startingAfter : msg.payload;
                
                getNetworkClientEvents_nodeParam = node.getNetworkClientEvents_endingBefore;
                getNetworkClientEvents_nodeParamType = node.getNetworkClientEvents_endingBeforeType;
                if (getNetworkClientEvents_nodeParamType === 'str') {
                    //getNetworkClientEvents_parameters.endingBefore = getNetworkClientEvents_nodeParam || '';
                    getNetworkClientEvents_parameters.endingBefore = getNetworkClientEvents_nodeParam || undefined;
                } else {
                    getNetworkClientEvents_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkClientEvents_nodeParam);
                }
                //getNetworkClientEvents_parameters.endingBefore = !!getNetworkClientEvents_parameters.endingBefore ? getNetworkClientEvents_parameters.endingBefore : msg.payload;
                                result = client.getNetworkClientEvents(getNetworkClientEvents_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientLatencyHistory') {
                var getNetworkClientLatencyHistory_parameters = [];
                var getNetworkClientLatencyHistory_nodeParam;
                var getNetworkClientLatencyHistory_nodeParamType;

                getNetworkClientLatencyHistory_nodeParam = node.getNetworkClientLatencyHistory_networkId;
                getNetworkClientLatencyHistory_nodeParamType = node.getNetworkClientLatencyHistory_networkIdType;
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    //getNetworkClientLatencyHistory_parameters.networkId = getNetworkClientLatencyHistory_nodeParam || '';
                    getNetworkClientLatencyHistory_parameters.networkId = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyHistory_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientLatencyHistory_nodeParam);
                }
                //getNetworkClientLatencyHistory_parameters.networkId = !!getNetworkClientLatencyHistory_parameters.networkId ? getNetworkClientLatencyHistory_parameters.networkId : msg.payload;
                
                getNetworkClientLatencyHistory_nodeParam = node.getNetworkClientLatencyHistory_idOrMacOrIp;
                getNetworkClientLatencyHistory_nodeParamType = node.getNetworkClientLatencyHistory_idOrMacOrIpType;
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    //getNetworkClientLatencyHistory_parameters.idOrMacOrIp = getNetworkClientLatencyHistory_nodeParam || '';
                    getNetworkClientLatencyHistory_parameters.idOrMacOrIp = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyHistory_parameters.idOrMacOrIp = RED.util.getMessageProperty(msg, getNetworkClientLatencyHistory_nodeParam);
                }
                //getNetworkClientLatencyHistory_parameters.idOrMacOrIp = !!getNetworkClientLatencyHistory_parameters.idOrMacOrIp ? getNetworkClientLatencyHistory_parameters.idOrMacOrIp : msg.payload;
                
                getNetworkClientLatencyHistory_nodeParam = node.getNetworkClientLatencyHistory_t0;
                getNetworkClientLatencyHistory_nodeParamType = node.getNetworkClientLatencyHistory_t0Type;
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    //getNetworkClientLatencyHistory_parameters.t0 = getNetworkClientLatencyHistory_nodeParam || '';
                    getNetworkClientLatencyHistory_parameters.t0 = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyHistory_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkClientLatencyHistory_nodeParam);
                }
                //getNetworkClientLatencyHistory_parameters.t0 = !!getNetworkClientLatencyHistory_parameters.t0 ? getNetworkClientLatencyHistory_parameters.t0 : msg.payload;
                
                getNetworkClientLatencyHistory_nodeParam = node.getNetworkClientLatencyHistory_t1;
                getNetworkClientLatencyHistory_nodeParamType = node.getNetworkClientLatencyHistory_t1Type;
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    //getNetworkClientLatencyHistory_parameters.t1 = getNetworkClientLatencyHistory_nodeParam || '';
                    getNetworkClientLatencyHistory_parameters.t1 = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyHistory_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkClientLatencyHistory_nodeParam);
                }
                //getNetworkClientLatencyHistory_parameters.t1 = !!getNetworkClientLatencyHistory_parameters.t1 ? getNetworkClientLatencyHistory_parameters.t1 : msg.payload;
                
                getNetworkClientLatencyHistory_nodeParam = node.getNetworkClientLatencyHistory_timespan;
                getNetworkClientLatencyHistory_nodeParamType = node.getNetworkClientLatencyHistory_timespanType;
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    //getNetworkClientLatencyHistory_parameters.timespan = getNetworkClientLatencyHistory_nodeParam || '';
                    getNetworkClientLatencyHistory_parameters.timespan = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyHistory_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkClientLatencyHistory_nodeParam);
                }
                //getNetworkClientLatencyHistory_parameters.timespan = !!getNetworkClientLatencyHistory_parameters.timespan ? getNetworkClientLatencyHistory_parameters.timespan : msg.payload;
                
                getNetworkClientLatencyHistory_nodeParam = node.getNetworkClientLatencyHistory_resolution;
                getNetworkClientLatencyHistory_nodeParamType = node.getNetworkClientLatencyHistory_resolutionType;
                if (getNetworkClientLatencyHistory_nodeParamType === 'str') {
                    //getNetworkClientLatencyHistory_parameters.resolution = getNetworkClientLatencyHistory_nodeParam || '';
                    getNetworkClientLatencyHistory_parameters.resolution = getNetworkClientLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyHistory_parameters.resolution = RED.util.getMessageProperty(msg, getNetworkClientLatencyHistory_nodeParam);
                }
                //getNetworkClientLatencyHistory_parameters.resolution = !!getNetworkClientLatencyHistory_parameters.resolution ? getNetworkClientLatencyHistory_parameters.resolution : msg.payload;
                                result = client.getNetworkClientLatencyHistory(getNetworkClientLatencyHistory_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationConfigTemplates') {
                var getOrganizationConfigTemplates_parameters = [];
                var getOrganizationConfigTemplates_nodeParam;
                var getOrganizationConfigTemplates_nodeParamType;

                getOrganizationConfigTemplates_nodeParam = node.getOrganizationConfigTemplates_organizationId;
                getOrganizationConfigTemplates_nodeParamType = node.getOrganizationConfigTemplates_organizationIdType;
                if (getOrganizationConfigTemplates_nodeParamType === 'str') {
                    //getOrganizationConfigTemplates_parameters.organizationId = getOrganizationConfigTemplates_nodeParam || '';
                    getOrganizationConfigTemplates_parameters.organizationId = getOrganizationConfigTemplates_nodeParam || undefined;
                } else {
                    getOrganizationConfigTemplates_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationConfigTemplates_nodeParam);
                }
                //getOrganizationConfigTemplates_parameters.organizationId = !!getOrganizationConfigTemplates_parameters.organizationId ? getOrganizationConfigTemplates_parameters.organizationId : msg.payload;
                                result = client.getOrganizationConfigTemplates(getOrganizationConfigTemplates_parameters);
            }
            if (!errorFlag && node.method === 'deleteOrganizationConfigTemplate') {
                var deleteOrganizationConfigTemplate_parameters = [];
                var deleteOrganizationConfigTemplate_nodeParam;
                var deleteOrganizationConfigTemplate_nodeParamType;

                deleteOrganizationConfigTemplate_nodeParam = node.deleteOrganizationConfigTemplate_organizationId;
                deleteOrganizationConfigTemplate_nodeParamType = node.deleteOrganizationConfigTemplate_organizationIdType;
                if (deleteOrganizationConfigTemplate_nodeParamType === 'str') {
                    //deleteOrganizationConfigTemplate_parameters.organizationId = deleteOrganizationConfigTemplate_nodeParam || '';
                    deleteOrganizationConfigTemplate_parameters.organizationId = deleteOrganizationConfigTemplate_nodeParam || undefined;
                } else {
                    deleteOrganizationConfigTemplate_parameters.organizationId = RED.util.getMessageProperty(msg, deleteOrganizationConfigTemplate_nodeParam);
                }
                //deleteOrganizationConfigTemplate_parameters.organizationId = !!deleteOrganizationConfigTemplate_parameters.organizationId ? deleteOrganizationConfigTemplate_parameters.organizationId : msg.payload;
                
                deleteOrganizationConfigTemplate_nodeParam = node.deleteOrganizationConfigTemplate_id;
                deleteOrganizationConfigTemplate_nodeParamType = node.deleteOrganizationConfigTemplate_idType;
                if (deleteOrganizationConfigTemplate_nodeParamType === 'str') {
                    //deleteOrganizationConfigTemplate_parameters.id = deleteOrganizationConfigTemplate_nodeParam || '';
                    deleteOrganizationConfigTemplate_parameters.id = deleteOrganizationConfigTemplate_nodeParam || undefined;
                } else {
                    deleteOrganizationConfigTemplate_parameters.id = RED.util.getMessageProperty(msg, deleteOrganizationConfigTemplate_nodeParam);
                }
                //deleteOrganizationConfigTemplate_parameters.id = !!deleteOrganizationConfigTemplate_parameters.id ? deleteOrganizationConfigTemplate_parameters.id : msg.payload;
                                result = client.deleteOrganizationConfigTemplate(deleteOrganizationConfigTemplate_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDevices') {
                var getNetworkDevices_parameters = [];
                var getNetworkDevices_nodeParam;
                var getNetworkDevices_nodeParamType;

                getNetworkDevices_nodeParam = node.getNetworkDevices_networkId;
                getNetworkDevices_nodeParamType = node.getNetworkDevices_networkIdType;
                if (getNetworkDevices_nodeParamType === 'str') {
                    //getNetworkDevices_parameters.networkId = getNetworkDevices_nodeParam || '';
                    getNetworkDevices_parameters.networkId = getNetworkDevices_nodeParam || undefined;
                } else {
                    getNetworkDevices_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDevices_nodeParam);
                }
                //getNetworkDevices_parameters.networkId = !!getNetworkDevices_parameters.networkId ? getNetworkDevices_parameters.networkId : msg.payload;
                                result = client.getNetworkDevices(getNetworkDevices_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDevice') {
                var getNetworkDevice_parameters = [];
                var getNetworkDevice_nodeParam;
                var getNetworkDevice_nodeParamType;

                getNetworkDevice_nodeParam = node.getNetworkDevice_networkId;
                getNetworkDevice_nodeParamType = node.getNetworkDevice_networkIdType;
                if (getNetworkDevice_nodeParamType === 'str') {
                    //getNetworkDevice_parameters.networkId = getNetworkDevice_nodeParam || '';
                    getNetworkDevice_parameters.networkId = getNetworkDevice_nodeParam || undefined;
                } else {
                    getNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDevice_nodeParam);
                }
                //getNetworkDevice_parameters.networkId = !!getNetworkDevice_parameters.networkId ? getNetworkDevice_parameters.networkId : msg.payload;
                
                getNetworkDevice_nodeParam = node.getNetworkDevice_serial;
                getNetworkDevice_nodeParamType = node.getNetworkDevice_serialType;
                if (getNetworkDevice_nodeParamType === 'str') {
                    //getNetworkDevice_parameters.serial = getNetworkDevice_nodeParam || '';
                    getNetworkDevice_parameters.serial = getNetworkDevice_nodeParam || undefined;
                } else {
                    getNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDevice_nodeParam);
                }
                //getNetworkDevice_parameters.serial = !!getNetworkDevice_parameters.serial ? getNetworkDevice_parameters.serial : msg.payload;
                                result = client.getNetworkDevice(getNetworkDevice_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkDevice') {
                var updateNetworkDevice_parameters = [];
                var updateNetworkDevice_nodeParam;
                var updateNetworkDevice_nodeParamType;

                updateNetworkDevice_nodeParam = node.updateNetworkDevice_networkId;
                updateNetworkDevice_nodeParamType = node.updateNetworkDevice_networkIdType;
                if (updateNetworkDevice_nodeParamType === 'str') {
                    //updateNetworkDevice_parameters.networkId = updateNetworkDevice_nodeParam || '';
                    updateNetworkDevice_parameters.networkId = updateNetworkDevice_nodeParam || undefined;
                } else {
                    updateNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkDevice_nodeParam);
                }
                //updateNetworkDevice_parameters.networkId = !!updateNetworkDevice_parameters.networkId ? updateNetworkDevice_parameters.networkId : msg.payload;
                
                updateNetworkDevice_nodeParam = node.updateNetworkDevice_serial;
                updateNetworkDevice_nodeParamType = node.updateNetworkDevice_serialType;
                if (updateNetworkDevice_nodeParamType === 'str') {
                    //updateNetworkDevice_parameters.serial = updateNetworkDevice_nodeParam || '';
                    updateNetworkDevice_parameters.serial = updateNetworkDevice_nodeParam || undefined;
                } else {
                    updateNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, updateNetworkDevice_nodeParam);
                }
                //updateNetworkDevice_parameters.serial = !!updateNetworkDevice_parameters.serial ? updateNetworkDevice_parameters.serial : msg.payload;
                
                updateNetworkDevice_nodeParam = node.updateNetworkDevice_updateNetworkDevice;
                updateNetworkDevice_nodeParamType = node.updateNetworkDevice_updateNetworkDeviceType;
                if (updateNetworkDevice_nodeParamType === 'str') {
                    //updateNetworkDevice_parameters.updateNetworkDevice = updateNetworkDevice_nodeParam || '';
                    updateNetworkDevice_parameters.updateNetworkDevice = updateNetworkDevice_nodeParam || undefined;
                } else {
                    updateNetworkDevice_parameters.updateNetworkDevice = RED.util.getMessageProperty(msg, updateNetworkDevice_nodeParam);
                }
                //updateNetworkDevice_parameters.updateNetworkDevice = !!updateNetworkDevice_parameters.updateNetworkDevice ? updateNetworkDevice_parameters.updateNetworkDevice : msg.payload;
                                result = client.updateNetworkDevice(updateNetworkDevice_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDevicePerformance') {
                var getNetworkDevicePerformance_parameters = [];
                var getNetworkDevicePerformance_nodeParam;
                var getNetworkDevicePerformance_nodeParamType;

                getNetworkDevicePerformance_nodeParam = node.getNetworkDevicePerformance_networkId;
                getNetworkDevicePerformance_nodeParamType = node.getNetworkDevicePerformance_networkIdType;
                if (getNetworkDevicePerformance_nodeParamType === 'str') {
                    //getNetworkDevicePerformance_parameters.networkId = getNetworkDevicePerformance_nodeParam || '';
                    getNetworkDevicePerformance_parameters.networkId = getNetworkDevicePerformance_nodeParam || undefined;
                } else {
                    getNetworkDevicePerformance_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDevicePerformance_nodeParam);
                }
                //getNetworkDevicePerformance_parameters.networkId = !!getNetworkDevicePerformance_parameters.networkId ? getNetworkDevicePerformance_parameters.networkId : msg.payload;
                
                getNetworkDevicePerformance_nodeParam = node.getNetworkDevicePerformance_serial;
                getNetworkDevicePerformance_nodeParamType = node.getNetworkDevicePerformance_serialType;
                if (getNetworkDevicePerformance_nodeParamType === 'str') {
                    //getNetworkDevicePerformance_parameters.serial = getNetworkDevicePerformance_nodeParam || '';
                    getNetworkDevicePerformance_parameters.serial = getNetworkDevicePerformance_nodeParam || undefined;
                } else {
                    getNetworkDevicePerformance_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDevicePerformance_nodeParam);
                }
                //getNetworkDevicePerformance_parameters.serial = !!getNetworkDevicePerformance_parameters.serial ? getNetworkDevicePerformance_parameters.serial : msg.payload;
                                result = client.getNetworkDevicePerformance(getNetworkDevicePerformance_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceUplink') {
                var getNetworkDeviceUplink_parameters = [];
                var getNetworkDeviceUplink_nodeParam;
                var getNetworkDeviceUplink_nodeParamType;

                getNetworkDeviceUplink_nodeParam = node.getNetworkDeviceUplink_networkId;
                getNetworkDeviceUplink_nodeParamType = node.getNetworkDeviceUplink_networkIdType;
                if (getNetworkDeviceUplink_nodeParamType === 'str') {
                    //getNetworkDeviceUplink_parameters.networkId = getNetworkDeviceUplink_nodeParam || '';
                    getNetworkDeviceUplink_parameters.networkId = getNetworkDeviceUplink_nodeParam || undefined;
                } else {
                    getNetworkDeviceUplink_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDeviceUplink_nodeParam);
                }
                //getNetworkDeviceUplink_parameters.networkId = !!getNetworkDeviceUplink_parameters.networkId ? getNetworkDeviceUplink_parameters.networkId : msg.payload;
                
                getNetworkDeviceUplink_nodeParam = node.getNetworkDeviceUplink_serial;
                getNetworkDeviceUplink_nodeParamType = node.getNetworkDeviceUplink_serialType;
                if (getNetworkDeviceUplink_nodeParamType === 'str') {
                    //getNetworkDeviceUplink_parameters.serial = getNetworkDeviceUplink_nodeParam || '';
                    getNetworkDeviceUplink_parameters.serial = getNetworkDeviceUplink_nodeParam || undefined;
                } else {
                    getNetworkDeviceUplink_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDeviceUplink_nodeParam);
                }
                //getNetworkDeviceUplink_parameters.serial = !!getNetworkDeviceUplink_parameters.serial ? getNetworkDeviceUplink_parameters.serial : msg.payload;
                                result = client.getNetworkDeviceUplink(getNetworkDeviceUplink_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceLldp_cdp') {
                var getNetworkDeviceLldp_cdp_parameters = [];
                var getNetworkDeviceLldp_cdp_nodeParam;
                var getNetworkDeviceLldp_cdp_nodeParamType;

                getNetworkDeviceLldp_cdp_nodeParam = node.getNetworkDeviceLldp_cdp_networkId;
                getNetworkDeviceLldp_cdp_nodeParamType = node.getNetworkDeviceLldp_cdp_networkIdType;
                if (getNetworkDeviceLldp_cdp_nodeParamType === 'str') {
                    //getNetworkDeviceLldp_cdp_parameters.networkId = getNetworkDeviceLldp_cdp_nodeParam || '';
                    getNetworkDeviceLldp_cdp_parameters.networkId = getNetworkDeviceLldp_cdp_nodeParam || undefined;
                } else {
                    getNetworkDeviceLldp_cdp_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDeviceLldp_cdp_nodeParam);
                }
                //getNetworkDeviceLldp_cdp_parameters.networkId = !!getNetworkDeviceLldp_cdp_parameters.networkId ? getNetworkDeviceLldp_cdp_parameters.networkId : msg.payload;
                
                getNetworkDeviceLldp_cdp_nodeParam = node.getNetworkDeviceLldp_cdp_serial;
                getNetworkDeviceLldp_cdp_nodeParamType = node.getNetworkDeviceLldp_cdp_serialType;
                if (getNetworkDeviceLldp_cdp_nodeParamType === 'str') {
                    //getNetworkDeviceLldp_cdp_parameters.serial = getNetworkDeviceLldp_cdp_nodeParam || '';
                    getNetworkDeviceLldp_cdp_parameters.serial = getNetworkDeviceLldp_cdp_nodeParam || undefined;
                } else {
                    getNetworkDeviceLldp_cdp_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDeviceLldp_cdp_nodeParam);
                }
                //getNetworkDeviceLldp_cdp_parameters.serial = !!getNetworkDeviceLldp_cdp_parameters.serial ? getNetworkDeviceLldp_cdp_parameters.serial : msg.payload;
                
                getNetworkDeviceLldp_cdp_nodeParam = node.getNetworkDeviceLldp_cdp_timespan;
                getNetworkDeviceLldp_cdp_nodeParamType = node.getNetworkDeviceLldp_cdp_timespanType;
                if (getNetworkDeviceLldp_cdp_nodeParamType === 'str') {
                    //getNetworkDeviceLldp_cdp_parameters.timespan = getNetworkDeviceLldp_cdp_nodeParam || '';
                    getNetworkDeviceLldp_cdp_parameters.timespan = getNetworkDeviceLldp_cdp_nodeParam || undefined;
                } else {
                    getNetworkDeviceLldp_cdp_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkDeviceLldp_cdp_nodeParam);
                }
                //getNetworkDeviceLldp_cdp_parameters.timespan = !!getNetworkDeviceLldp_cdp_parameters.timespan ? getNetworkDeviceLldp_cdp_parameters.timespan : msg.payload;
                                result = client.getNetworkDeviceLldp_cdp(getNetworkDeviceLldp_cdp_parameters);
            }
            if (!errorFlag && node.method === 'claimNetworkDevices') {
                var claimNetworkDevices_parameters = [];
                var claimNetworkDevices_nodeParam;
                var claimNetworkDevices_nodeParamType;

                claimNetworkDevices_nodeParam = node.claimNetworkDevices_networkId;
                claimNetworkDevices_nodeParamType = node.claimNetworkDevices_networkIdType;
                if (claimNetworkDevices_nodeParamType === 'str') {
                    //claimNetworkDevices_parameters.networkId = claimNetworkDevices_nodeParam || '';
                    claimNetworkDevices_parameters.networkId = claimNetworkDevices_nodeParam || undefined;
                } else {
                    claimNetworkDevices_parameters.networkId = RED.util.getMessageProperty(msg, claimNetworkDevices_nodeParam);
                }
                //claimNetworkDevices_parameters.networkId = !!claimNetworkDevices_parameters.networkId ? claimNetworkDevices_parameters.networkId : msg.payload;
                
                claimNetworkDevices_nodeParam = node.claimNetworkDevices_claimNetworkDevices;
                claimNetworkDevices_nodeParamType = node.claimNetworkDevices_claimNetworkDevicesType;
                if (claimNetworkDevices_nodeParamType === 'str') {
                    //claimNetworkDevices_parameters.claimNetworkDevices = claimNetworkDevices_nodeParam || '';
                    claimNetworkDevices_parameters.claimNetworkDevices = claimNetworkDevices_nodeParam || undefined;
                } else {
                    claimNetworkDevices_parameters.claimNetworkDevices = RED.util.getMessageProperty(msg, claimNetworkDevices_nodeParam);
                }
                //claimNetworkDevices_parameters.claimNetworkDevices = !!claimNetworkDevices_parameters.claimNetworkDevices ? claimNetworkDevices_parameters.claimNetworkDevices : msg.payload;
                                result = client.claimNetworkDevices(claimNetworkDevices_parameters);
            }
            if (!errorFlag && node.method === 'removeNetworkDevice') {
                var removeNetworkDevice_parameters = [];
                var removeNetworkDevice_nodeParam;
                var removeNetworkDevice_nodeParamType;

                removeNetworkDevice_nodeParam = node.removeNetworkDevice_networkId;
                removeNetworkDevice_nodeParamType = node.removeNetworkDevice_networkIdType;
                if (removeNetworkDevice_nodeParamType === 'str') {
                    //removeNetworkDevice_parameters.networkId = removeNetworkDevice_nodeParam || '';
                    removeNetworkDevice_parameters.networkId = removeNetworkDevice_nodeParam || undefined;
                } else {
                    removeNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, removeNetworkDevice_nodeParam);
                }
                //removeNetworkDevice_parameters.networkId = !!removeNetworkDevice_parameters.networkId ? removeNetworkDevice_parameters.networkId : msg.payload;
                
                removeNetworkDevice_nodeParam = node.removeNetworkDevice_serial;
                removeNetworkDevice_nodeParamType = node.removeNetworkDevice_serialType;
                if (removeNetworkDevice_nodeParamType === 'str') {
                    //removeNetworkDevice_parameters.serial = removeNetworkDevice_nodeParam || '';
                    removeNetworkDevice_parameters.serial = removeNetworkDevice_nodeParam || undefined;
                } else {
                    removeNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, removeNetworkDevice_nodeParam);
                }
                //removeNetworkDevice_parameters.serial = !!removeNetworkDevice_parameters.serial ? removeNetworkDevice_parameters.serial : msg.payload;
                                result = client.removeNetworkDevice(removeNetworkDevice_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceLossAndLatencyHistory') {
                var getNetworkDeviceLossAndLatencyHistory_parameters = [];
                var getNetworkDeviceLossAndLatencyHistory_nodeParam;
                var getNetworkDeviceLossAndLatencyHistory_nodeParamType;

                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_networkId;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_networkIdType;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.networkId = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.networkId = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.networkId = !!getNetworkDeviceLossAndLatencyHistory_parameters.networkId ? getNetworkDeviceLossAndLatencyHistory_parameters.networkId : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_serial;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_serialType;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.serial = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.serial = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.serial = !!getNetworkDeviceLossAndLatencyHistory_parameters.serial ? getNetworkDeviceLossAndLatencyHistory_parameters.serial : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_t0;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_t0Type;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.t0 = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.t0 = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.t0 = !!getNetworkDeviceLossAndLatencyHistory_parameters.t0 ? getNetworkDeviceLossAndLatencyHistory_parameters.t0 : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_t1;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_t1Type;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.t1 = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.t1 = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.t1 = !!getNetworkDeviceLossAndLatencyHistory_parameters.t1 ? getNetworkDeviceLossAndLatencyHistory_parameters.t1 : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_timespan;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_timespanType;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.timespan = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.timespan = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.timespan = !!getNetworkDeviceLossAndLatencyHistory_parameters.timespan ? getNetworkDeviceLossAndLatencyHistory_parameters.timespan : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_resolution;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_resolutionType;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.resolution = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.resolution = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.resolution = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.resolution = !!getNetworkDeviceLossAndLatencyHistory_parameters.resolution ? getNetworkDeviceLossAndLatencyHistory_parameters.resolution : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_uplink;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_uplinkType;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.uplink = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.uplink = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.uplink = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.uplink = !!getNetworkDeviceLossAndLatencyHistory_parameters.uplink ? getNetworkDeviceLossAndLatencyHistory_parameters.uplink : msg.payload;
                
                getNetworkDeviceLossAndLatencyHistory_nodeParam = node.getNetworkDeviceLossAndLatencyHistory_ip;
                getNetworkDeviceLossAndLatencyHistory_nodeParamType = node.getNetworkDeviceLossAndLatencyHistory_ipType;
                if (getNetworkDeviceLossAndLatencyHistory_nodeParamType === 'str') {
                    //getNetworkDeviceLossAndLatencyHistory_parameters.ip = getNetworkDeviceLossAndLatencyHistory_nodeParam || '';
                    getNetworkDeviceLossAndLatencyHistory_parameters.ip = getNetworkDeviceLossAndLatencyHistory_nodeParam || undefined;
                } else {
                    getNetworkDeviceLossAndLatencyHistory_parameters.ip = RED.util.getMessageProperty(msg, getNetworkDeviceLossAndLatencyHistory_nodeParam);
                }
                //getNetworkDeviceLossAndLatencyHistory_parameters.ip = !!getNetworkDeviceLossAndLatencyHistory_parameters.ip ? getNetworkDeviceLossAndLatencyHistory_parameters.ip : msg.payload;
                                result = client.getNetworkDeviceLossAndLatencyHistory(getNetworkDeviceLossAndLatencyHistory_parameters);
            }
            if (!errorFlag && node.method === 'rebootNetworkDevice') {
                var rebootNetworkDevice_parameters = [];
                var rebootNetworkDevice_nodeParam;
                var rebootNetworkDevice_nodeParamType;

                rebootNetworkDevice_nodeParam = node.rebootNetworkDevice_networkId;
                rebootNetworkDevice_nodeParamType = node.rebootNetworkDevice_networkIdType;
                if (rebootNetworkDevice_nodeParamType === 'str') {
                    //rebootNetworkDevice_parameters.networkId = rebootNetworkDevice_nodeParam || '';
                    rebootNetworkDevice_parameters.networkId = rebootNetworkDevice_nodeParam || undefined;
                } else {
                    rebootNetworkDevice_parameters.networkId = RED.util.getMessageProperty(msg, rebootNetworkDevice_nodeParam);
                }
                //rebootNetworkDevice_parameters.networkId = !!rebootNetworkDevice_parameters.networkId ? rebootNetworkDevice_parameters.networkId : msg.payload;
                
                rebootNetworkDevice_nodeParam = node.rebootNetworkDevice_serial;
                rebootNetworkDevice_nodeParamType = node.rebootNetworkDevice_serialType;
                if (rebootNetworkDevice_nodeParamType === 'str') {
                    //rebootNetworkDevice_parameters.serial = rebootNetworkDevice_nodeParam || '';
                    rebootNetworkDevice_parameters.serial = rebootNetworkDevice_nodeParam || undefined;
                } else {
                    rebootNetworkDevice_parameters.serial = RED.util.getMessageProperty(msg, rebootNetworkDevice_nodeParam);
                }
                //rebootNetworkDevice_parameters.serial = !!rebootNetworkDevice_parameters.serial ? rebootNetworkDevice_parameters.serial : msg.payload;
                                result = client.rebootNetworkDevice(rebootNetworkDevice_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkCellularFirewallRules') {
                var getNetworkCellularFirewallRules_parameters = [];
                var getNetworkCellularFirewallRules_nodeParam;
                var getNetworkCellularFirewallRules_nodeParamType;

                getNetworkCellularFirewallRules_nodeParam = node.getNetworkCellularFirewallRules_networkId;
                getNetworkCellularFirewallRules_nodeParamType = node.getNetworkCellularFirewallRules_networkIdType;
                if (getNetworkCellularFirewallRules_nodeParamType === 'str') {
                    //getNetworkCellularFirewallRules_parameters.networkId = getNetworkCellularFirewallRules_nodeParam || '';
                    getNetworkCellularFirewallRules_parameters.networkId = getNetworkCellularFirewallRules_nodeParam || undefined;
                } else {
                    getNetworkCellularFirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkCellularFirewallRules_nodeParam);
                }
                //getNetworkCellularFirewallRules_parameters.networkId = !!getNetworkCellularFirewallRules_parameters.networkId ? getNetworkCellularFirewallRules_parameters.networkId : msg.payload;
                                result = client.getNetworkCellularFirewallRules(getNetworkCellularFirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkCellularFirewallRules') {
                var updateNetworkCellularFirewallRules_parameters = [];
                var updateNetworkCellularFirewallRules_nodeParam;
                var updateNetworkCellularFirewallRules_nodeParamType;

                updateNetworkCellularFirewallRules_nodeParam = node.updateNetworkCellularFirewallRules_networkId;
                updateNetworkCellularFirewallRules_nodeParamType = node.updateNetworkCellularFirewallRules_networkIdType;
                if (updateNetworkCellularFirewallRules_nodeParamType === 'str') {
                    //updateNetworkCellularFirewallRules_parameters.networkId = updateNetworkCellularFirewallRules_nodeParam || '';
                    updateNetworkCellularFirewallRules_parameters.networkId = updateNetworkCellularFirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkCellularFirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkCellularFirewallRules_nodeParam);
                }
                //updateNetworkCellularFirewallRules_parameters.networkId = !!updateNetworkCellularFirewallRules_parameters.networkId ? updateNetworkCellularFirewallRules_parameters.networkId : msg.payload;
                
                updateNetworkCellularFirewallRules_nodeParam = node.updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRules;
                updateNetworkCellularFirewallRules_nodeParamType = node.updateNetworkCellularFirewallRules_updateNetworkCellularFirewallRulesType;
                if (updateNetworkCellularFirewallRules_nodeParamType === 'str') {
                    //updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules = updateNetworkCellularFirewallRules_nodeParam || '';
                    updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules = updateNetworkCellularFirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules = RED.util.getMessageProperty(msg, updateNetworkCellularFirewallRules_nodeParam);
                }
                //updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules = !!updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules ? updateNetworkCellularFirewallRules_parameters.updateNetworkCellularFirewallRules : msg.payload;
                                result = client.updateNetworkCellularFirewallRules(updateNetworkCellularFirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkL3FirewallRules') {
                var getNetworkL3FirewallRules_parameters = [];
                var getNetworkL3FirewallRules_nodeParam;
                var getNetworkL3FirewallRules_nodeParamType;

                getNetworkL3FirewallRules_nodeParam = node.getNetworkL3FirewallRules_networkId;
                getNetworkL3FirewallRules_nodeParamType = node.getNetworkL3FirewallRules_networkIdType;
                if (getNetworkL3FirewallRules_nodeParamType === 'str') {
                    //getNetworkL3FirewallRules_parameters.networkId = getNetworkL3FirewallRules_nodeParam || '';
                    getNetworkL3FirewallRules_parameters.networkId = getNetworkL3FirewallRules_nodeParam || undefined;
                } else {
                    getNetworkL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkL3FirewallRules_nodeParam);
                }
                //getNetworkL3FirewallRules_parameters.networkId = !!getNetworkL3FirewallRules_parameters.networkId ? getNetworkL3FirewallRules_parameters.networkId : msg.payload;
                                result = client.getNetworkL3FirewallRules(getNetworkL3FirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkL3FirewallRules') {
                var updateNetworkL3FirewallRules_parameters = [];
                var updateNetworkL3FirewallRules_nodeParam;
                var updateNetworkL3FirewallRules_nodeParamType;

                updateNetworkL3FirewallRules_nodeParam = node.updateNetworkL3FirewallRules_networkId;
                updateNetworkL3FirewallRules_nodeParamType = node.updateNetworkL3FirewallRules_networkIdType;
                if (updateNetworkL3FirewallRules_nodeParamType === 'str') {
                    //updateNetworkL3FirewallRules_parameters.networkId = updateNetworkL3FirewallRules_nodeParam || '';
                    updateNetworkL3FirewallRules_parameters.networkId = updateNetworkL3FirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkL3FirewallRules_nodeParam);
                }
                //updateNetworkL3FirewallRules_parameters.networkId = !!updateNetworkL3FirewallRules_parameters.networkId ? updateNetworkL3FirewallRules_parameters.networkId : msg.payload;
                
                updateNetworkL3FirewallRules_nodeParam = node.updateNetworkL3FirewallRules_updateNetworkL3FirewallRules;
                updateNetworkL3FirewallRules_nodeParamType = node.updateNetworkL3FirewallRules_updateNetworkL3FirewallRulesType;
                if (updateNetworkL3FirewallRules_nodeParamType === 'str') {
                    //updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules = updateNetworkL3FirewallRules_nodeParam || '';
                    updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules = updateNetworkL3FirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules = RED.util.getMessageProperty(msg, updateNetworkL3FirewallRules_nodeParam);
                }
                //updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules = !!updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules ? updateNetworkL3FirewallRules_parameters.updateNetworkL3FirewallRules : msg.payload;
                                result = client.updateNetworkL3FirewallRules(updateNetworkL3FirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationVpnFirewallRules') {
                var getOrganizationVpnFirewallRules_parameters = [];
                var getOrganizationVpnFirewallRules_nodeParam;
                var getOrganizationVpnFirewallRules_nodeParamType;

                getOrganizationVpnFirewallRules_nodeParam = node.getOrganizationVpnFirewallRules_organizationId;
                getOrganizationVpnFirewallRules_nodeParamType = node.getOrganizationVpnFirewallRules_organizationIdType;
                if (getOrganizationVpnFirewallRules_nodeParamType === 'str') {
                    //getOrganizationVpnFirewallRules_parameters.organizationId = getOrganizationVpnFirewallRules_nodeParam || '';
                    getOrganizationVpnFirewallRules_parameters.organizationId = getOrganizationVpnFirewallRules_nodeParam || undefined;
                } else {
                    getOrganizationVpnFirewallRules_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationVpnFirewallRules_nodeParam);
                }
                //getOrganizationVpnFirewallRules_parameters.organizationId = !!getOrganizationVpnFirewallRules_parameters.organizationId ? getOrganizationVpnFirewallRules_parameters.organizationId : msg.payload;
                                result = client.getOrganizationVpnFirewallRules(getOrganizationVpnFirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'updateOrganizationVpnFirewallRules') {
                var updateOrganizationVpnFirewallRules_parameters = [];
                var updateOrganizationVpnFirewallRules_nodeParam;
                var updateOrganizationVpnFirewallRules_nodeParamType;

                updateOrganizationVpnFirewallRules_nodeParam = node.updateOrganizationVpnFirewallRules_organizationId;
                updateOrganizationVpnFirewallRules_nodeParamType = node.updateOrganizationVpnFirewallRules_organizationIdType;
                if (updateOrganizationVpnFirewallRules_nodeParamType === 'str') {
                    //updateOrganizationVpnFirewallRules_parameters.organizationId = updateOrganizationVpnFirewallRules_nodeParam || '';
                    updateOrganizationVpnFirewallRules_parameters.organizationId = updateOrganizationVpnFirewallRules_nodeParam || undefined;
                } else {
                    updateOrganizationVpnFirewallRules_parameters.organizationId = RED.util.getMessageProperty(msg, updateOrganizationVpnFirewallRules_nodeParam);
                }
                //updateOrganizationVpnFirewallRules_parameters.organizationId = !!updateOrganizationVpnFirewallRules_parameters.organizationId ? updateOrganizationVpnFirewallRules_parameters.organizationId : msg.payload;
                
                updateOrganizationVpnFirewallRules_nodeParam = node.updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRules;
                updateOrganizationVpnFirewallRules_nodeParamType = node.updateOrganizationVpnFirewallRules_updateOrganizationVpnFirewallRulesType;
                if (updateOrganizationVpnFirewallRules_nodeParamType === 'str') {
                    //updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules = updateOrganizationVpnFirewallRules_nodeParam || '';
                    updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules = updateOrganizationVpnFirewallRules_nodeParam || undefined;
                } else {
                    updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules = RED.util.getMessageProperty(msg, updateOrganizationVpnFirewallRules_nodeParam);
                }
                //updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules = !!updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules ? updateOrganizationVpnFirewallRules_parameters.updateOrganizationVpnFirewallRules : msg.payload;
                                result = client.updateOrganizationVpnFirewallRules(updateOrganizationVpnFirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSsidL3FirewallRules') {
                var getNetworkSsidL3FirewallRules_parameters = [];
                var getNetworkSsidL3FirewallRules_nodeParam;
                var getNetworkSsidL3FirewallRules_nodeParamType;

                getNetworkSsidL3FirewallRules_nodeParam = node.getNetworkSsidL3FirewallRules_networkId;
                getNetworkSsidL3FirewallRules_nodeParamType = node.getNetworkSsidL3FirewallRules_networkIdType;
                if (getNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    //getNetworkSsidL3FirewallRules_parameters.networkId = getNetworkSsidL3FirewallRules_nodeParam || '';
                    getNetworkSsidL3FirewallRules_parameters.networkId = getNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    getNetworkSsidL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSsidL3FirewallRules_nodeParam);
                }
                //getNetworkSsidL3FirewallRules_parameters.networkId = !!getNetworkSsidL3FirewallRules_parameters.networkId ? getNetworkSsidL3FirewallRules_parameters.networkId : msg.payload;
                
                getNetworkSsidL3FirewallRules_nodeParam = node.getNetworkSsidL3FirewallRules_number;
                getNetworkSsidL3FirewallRules_nodeParamType = node.getNetworkSsidL3FirewallRules_numberType;
                if (getNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    //getNetworkSsidL3FirewallRules_parameters.number = getNetworkSsidL3FirewallRules_nodeParam || '';
                    getNetworkSsidL3FirewallRules_parameters.number = getNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    getNetworkSsidL3FirewallRules_parameters.number = RED.util.getMessageProperty(msg, getNetworkSsidL3FirewallRules_nodeParam);
                }
                //getNetworkSsidL3FirewallRules_parameters.number = !!getNetworkSsidL3FirewallRules_parameters.number ? getNetworkSsidL3FirewallRules_parameters.number : msg.payload;
                                result = client.getNetworkSsidL3FirewallRules(getNetworkSsidL3FirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSsidL3FirewallRules') {
                var updateNetworkSsidL3FirewallRules_parameters = [];
                var updateNetworkSsidL3FirewallRules_nodeParam;
                var updateNetworkSsidL3FirewallRules_nodeParamType;

                updateNetworkSsidL3FirewallRules_nodeParam = node.updateNetworkSsidL3FirewallRules_networkId;
                updateNetworkSsidL3FirewallRules_nodeParamType = node.updateNetworkSsidL3FirewallRules_networkIdType;
                if (updateNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    //updateNetworkSsidL3FirewallRules_parameters.networkId = updateNetworkSsidL3FirewallRules_nodeParam || '';
                    updateNetworkSsidL3FirewallRules_parameters.networkId = updateNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkSsidL3FirewallRules_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSsidL3FirewallRules_nodeParam);
                }
                //updateNetworkSsidL3FirewallRules_parameters.networkId = !!updateNetworkSsidL3FirewallRules_parameters.networkId ? updateNetworkSsidL3FirewallRules_parameters.networkId : msg.payload;
                
                updateNetworkSsidL3FirewallRules_nodeParam = node.updateNetworkSsidL3FirewallRules_number;
                updateNetworkSsidL3FirewallRules_nodeParamType = node.updateNetworkSsidL3FirewallRules_numberType;
                if (updateNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    //updateNetworkSsidL3FirewallRules_parameters.number = updateNetworkSsidL3FirewallRules_nodeParam || '';
                    updateNetworkSsidL3FirewallRules_parameters.number = updateNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkSsidL3FirewallRules_parameters.number = RED.util.getMessageProperty(msg, updateNetworkSsidL3FirewallRules_nodeParam);
                }
                //updateNetworkSsidL3FirewallRules_parameters.number = !!updateNetworkSsidL3FirewallRules_parameters.number ? updateNetworkSsidL3FirewallRules_parameters.number : msg.payload;
                
                updateNetworkSsidL3FirewallRules_nodeParam = node.updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRules;
                updateNetworkSsidL3FirewallRules_nodeParamType = node.updateNetworkSsidL3FirewallRules_updateNetworkSsidL3FirewallRulesType;
                if (updateNetworkSsidL3FirewallRules_nodeParamType === 'str') {
                    //updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules = updateNetworkSsidL3FirewallRules_nodeParam || '';
                    updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules = updateNetworkSsidL3FirewallRules_nodeParam || undefined;
                } else {
                    updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules = RED.util.getMessageProperty(msg, updateNetworkSsidL3FirewallRules_nodeParam);
                }
                //updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules = !!updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules ? updateNetworkSsidL3FirewallRules_parameters.updateNetworkSsidL3FirewallRules : msg.payload;
                                result = client.updateNetworkSsidL3FirewallRules(updateNetworkSsidL3FirewallRules_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkGroupPolicies') {
                var getNetworkGroupPolicies_parameters = [];
                var getNetworkGroupPolicies_nodeParam;
                var getNetworkGroupPolicies_nodeParamType;

                getNetworkGroupPolicies_nodeParam = node.getNetworkGroupPolicies_networkId;
                getNetworkGroupPolicies_nodeParamType = node.getNetworkGroupPolicies_networkIdType;
                if (getNetworkGroupPolicies_nodeParamType === 'str') {
                    //getNetworkGroupPolicies_parameters.networkId = getNetworkGroupPolicies_nodeParam || '';
                    getNetworkGroupPolicies_parameters.networkId = getNetworkGroupPolicies_nodeParam || undefined;
                } else {
                    getNetworkGroupPolicies_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkGroupPolicies_nodeParam);
                }
                //getNetworkGroupPolicies_parameters.networkId = !!getNetworkGroupPolicies_parameters.networkId ? getNetworkGroupPolicies_parameters.networkId : msg.payload;
                                result = client.getNetworkGroupPolicies(getNetworkGroupPolicies_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkGroupPolicy') {
                var deleteNetworkGroupPolicy_parameters = [];
                var deleteNetworkGroupPolicy_nodeParam;
                var deleteNetworkGroupPolicy_nodeParamType;

                deleteNetworkGroupPolicy_nodeParam = node.deleteNetworkGroupPolicy_networkId;
                deleteNetworkGroupPolicy_nodeParamType = node.deleteNetworkGroupPolicy_networkIdType;
                if (deleteNetworkGroupPolicy_nodeParamType === 'str') {
                    //deleteNetworkGroupPolicy_parameters.networkId = deleteNetworkGroupPolicy_nodeParam || '';
                    deleteNetworkGroupPolicy_parameters.networkId = deleteNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    deleteNetworkGroupPolicy_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkGroupPolicy_nodeParam);
                }
                //deleteNetworkGroupPolicy_parameters.networkId = !!deleteNetworkGroupPolicy_parameters.networkId ? deleteNetworkGroupPolicy_parameters.networkId : msg.payload;
                
                deleteNetworkGroupPolicy_nodeParam = node.deleteNetworkGroupPolicy_groupPolicyId;
                deleteNetworkGroupPolicy_nodeParamType = node.deleteNetworkGroupPolicy_groupPolicyIdType;
                if (deleteNetworkGroupPolicy_nodeParamType === 'str') {
                    //deleteNetworkGroupPolicy_parameters.groupPolicyId = deleteNetworkGroupPolicy_nodeParam || '';
                    deleteNetworkGroupPolicy_parameters.groupPolicyId = deleteNetworkGroupPolicy_nodeParam || undefined;
                } else {
                    deleteNetworkGroupPolicy_parameters.groupPolicyId = RED.util.getMessageProperty(msg, deleteNetworkGroupPolicy_nodeParam);
                }
                //deleteNetworkGroupPolicy_parameters.groupPolicyId = !!deleteNetworkGroupPolicy_parameters.groupPolicyId ? deleteNetworkGroupPolicy_parameters.groupPolicyId : msg.payload;
                                result = client.deleteNetworkGroupPolicy(deleteNetworkGroupPolicy_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkHttpServers') {
                var getNetworkHttpServers_parameters = [];
                var getNetworkHttpServers_nodeParam;
                var getNetworkHttpServers_nodeParamType;

                getNetworkHttpServers_nodeParam = node.getNetworkHttpServers_networkId;
                getNetworkHttpServers_nodeParamType = node.getNetworkHttpServers_networkIdType;
                if (getNetworkHttpServers_nodeParamType === 'str') {
                    //getNetworkHttpServers_parameters.networkId = getNetworkHttpServers_nodeParam || '';
                    getNetworkHttpServers_parameters.networkId = getNetworkHttpServers_nodeParam || undefined;
                } else {
                    getNetworkHttpServers_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkHttpServers_nodeParam);
                }
                //getNetworkHttpServers_parameters.networkId = !!getNetworkHttpServers_parameters.networkId ? getNetworkHttpServers_parameters.networkId : msg.payload;
                                result = client.getNetworkHttpServers(getNetworkHttpServers_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkHttpServers') {
                var createNetworkHttpServers_parameters = [];
                var createNetworkHttpServers_nodeParam;
                var createNetworkHttpServers_nodeParamType;

                createNetworkHttpServers_nodeParam = node.createNetworkHttpServers_networkId;
                createNetworkHttpServers_nodeParamType = node.createNetworkHttpServers_networkIdType;
                if (createNetworkHttpServers_nodeParamType === 'str') {
                    //createNetworkHttpServers_parameters.networkId = createNetworkHttpServers_nodeParam || '';
                    createNetworkHttpServers_parameters.networkId = createNetworkHttpServers_nodeParam || undefined;
                } else {
                    createNetworkHttpServers_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkHttpServers_nodeParam);
                }
                //createNetworkHttpServers_parameters.networkId = !!createNetworkHttpServers_parameters.networkId ? createNetworkHttpServers_parameters.networkId : msg.payload;
                
                createNetworkHttpServers_nodeParam = node.createNetworkHttpServers_createNetworkHttpServers;
                createNetworkHttpServers_nodeParamType = node.createNetworkHttpServers_createNetworkHttpServersType;
                if (createNetworkHttpServers_nodeParamType === 'str') {
                    //createNetworkHttpServers_parameters.createNetworkHttpServers = createNetworkHttpServers_nodeParam || '';
                    createNetworkHttpServers_parameters.createNetworkHttpServers = createNetworkHttpServers_nodeParam || undefined;
                } else {
                    createNetworkHttpServers_parameters.createNetworkHttpServers = RED.util.getMessageProperty(msg, createNetworkHttpServers_nodeParam);
                }
                //createNetworkHttpServers_parameters.createNetworkHttpServers = !!createNetworkHttpServers_parameters.createNetworkHttpServers ? createNetworkHttpServers_parameters.createNetworkHttpServers : msg.payload;
                                result = client.createNetworkHttpServers(createNetworkHttpServers_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkHttpServer') {
                var getNetworkHttpServer_parameters = [];
                var getNetworkHttpServer_nodeParam;
                var getNetworkHttpServer_nodeParamType;

                getNetworkHttpServer_nodeParam = node.getNetworkHttpServer_networkId;
                getNetworkHttpServer_nodeParamType = node.getNetworkHttpServer_networkIdType;
                if (getNetworkHttpServer_nodeParamType === 'str') {
                    //getNetworkHttpServer_parameters.networkId = getNetworkHttpServer_nodeParam || '';
                    getNetworkHttpServer_parameters.networkId = getNetworkHttpServer_nodeParam || undefined;
                } else {
                    getNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkHttpServer_nodeParam);
                }
                //getNetworkHttpServer_parameters.networkId = !!getNetworkHttpServer_parameters.networkId ? getNetworkHttpServer_parameters.networkId : msg.payload;
                
                getNetworkHttpServer_nodeParam = node.getNetworkHttpServer_id;
                getNetworkHttpServer_nodeParamType = node.getNetworkHttpServer_idType;
                if (getNetworkHttpServer_nodeParamType === 'str') {
                    //getNetworkHttpServer_parameters.id = getNetworkHttpServer_nodeParam || '';
                    getNetworkHttpServer_parameters.id = getNetworkHttpServer_nodeParam || undefined;
                } else {
                    getNetworkHttpServer_parameters.id = RED.util.getMessageProperty(msg, getNetworkHttpServer_nodeParam);
                }
                //getNetworkHttpServer_parameters.id = !!getNetworkHttpServer_parameters.id ? getNetworkHttpServer_parameters.id : msg.payload;
                                result = client.getNetworkHttpServer(getNetworkHttpServer_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkHttpServer') {
                var updateNetworkHttpServer_parameters = [];
                var updateNetworkHttpServer_nodeParam;
                var updateNetworkHttpServer_nodeParamType;

                updateNetworkHttpServer_nodeParam = node.updateNetworkHttpServer_networkId;
                updateNetworkHttpServer_nodeParamType = node.updateNetworkHttpServer_networkIdType;
                if (updateNetworkHttpServer_nodeParamType === 'str') {
                    //updateNetworkHttpServer_parameters.networkId = updateNetworkHttpServer_nodeParam || '';
                    updateNetworkHttpServer_parameters.networkId = updateNetworkHttpServer_nodeParam || undefined;
                } else {
                    updateNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkHttpServer_nodeParam);
                }
                //updateNetworkHttpServer_parameters.networkId = !!updateNetworkHttpServer_parameters.networkId ? updateNetworkHttpServer_parameters.networkId : msg.payload;
                
                updateNetworkHttpServer_nodeParam = node.updateNetworkHttpServer_id;
                updateNetworkHttpServer_nodeParamType = node.updateNetworkHttpServer_idType;
                if (updateNetworkHttpServer_nodeParamType === 'str') {
                    //updateNetworkHttpServer_parameters.id = updateNetworkHttpServer_nodeParam || '';
                    updateNetworkHttpServer_parameters.id = updateNetworkHttpServer_nodeParam || undefined;
                } else {
                    updateNetworkHttpServer_parameters.id = RED.util.getMessageProperty(msg, updateNetworkHttpServer_nodeParam);
                }
                //updateNetworkHttpServer_parameters.id = !!updateNetworkHttpServer_parameters.id ? updateNetworkHttpServer_parameters.id : msg.payload;
                
                updateNetworkHttpServer_nodeParam = node.updateNetworkHttpServer_updateNetworkHttpServer;
                updateNetworkHttpServer_nodeParamType = node.updateNetworkHttpServer_updateNetworkHttpServerType;
                if (updateNetworkHttpServer_nodeParamType === 'str') {
                    //updateNetworkHttpServer_parameters.updateNetworkHttpServer = updateNetworkHttpServer_nodeParam || '';
                    updateNetworkHttpServer_parameters.updateNetworkHttpServer = updateNetworkHttpServer_nodeParam || undefined;
                } else {
                    updateNetworkHttpServer_parameters.updateNetworkHttpServer = RED.util.getMessageProperty(msg, updateNetworkHttpServer_nodeParam);
                }
                //updateNetworkHttpServer_parameters.updateNetworkHttpServer = !!updateNetworkHttpServer_parameters.updateNetworkHttpServer ? updateNetworkHttpServer_parameters.updateNetworkHttpServer : msg.payload;
                                result = client.updateNetworkHttpServer(updateNetworkHttpServer_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkHttpServer') {
                var deleteNetworkHttpServer_parameters = [];
                var deleteNetworkHttpServer_nodeParam;
                var deleteNetworkHttpServer_nodeParamType;

                deleteNetworkHttpServer_nodeParam = node.deleteNetworkHttpServer_networkId;
                deleteNetworkHttpServer_nodeParamType = node.deleteNetworkHttpServer_networkIdType;
                if (deleteNetworkHttpServer_nodeParamType === 'str') {
                    //deleteNetworkHttpServer_parameters.networkId = deleteNetworkHttpServer_nodeParam || '';
                    deleteNetworkHttpServer_parameters.networkId = deleteNetworkHttpServer_nodeParam || undefined;
                } else {
                    deleteNetworkHttpServer_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkHttpServer_nodeParam);
                }
                //deleteNetworkHttpServer_parameters.networkId = !!deleteNetworkHttpServer_parameters.networkId ? deleteNetworkHttpServer_parameters.networkId : msg.payload;
                
                deleteNetworkHttpServer_nodeParam = node.deleteNetworkHttpServer_id;
                deleteNetworkHttpServer_nodeParamType = node.deleteNetworkHttpServer_idType;
                if (deleteNetworkHttpServer_nodeParamType === 'str') {
                    //deleteNetworkHttpServer_parameters.id = deleteNetworkHttpServer_nodeParam || '';
                    deleteNetworkHttpServer_parameters.id = deleteNetworkHttpServer_nodeParam || undefined;
                } else {
                    deleteNetworkHttpServer_parameters.id = RED.util.getMessageProperty(msg, deleteNetworkHttpServer_nodeParam);
                }
                //deleteNetworkHttpServer_parameters.id = !!deleteNetworkHttpServer_parameters.id ? deleteNetworkHttpServer_parameters.id : msg.payload;
                                result = client.deleteNetworkHttpServer(deleteNetworkHttpServer_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkHttpServersWebhookTests') {
                var createNetworkHttpServersWebhookTests_parameters = [];
                var createNetworkHttpServersWebhookTests_nodeParam;
                var createNetworkHttpServersWebhookTests_nodeParamType;

                createNetworkHttpServersWebhookTests_nodeParam = node.createNetworkHttpServersWebhookTests_networkId;
                createNetworkHttpServersWebhookTests_nodeParamType = node.createNetworkHttpServersWebhookTests_networkIdType;
                if (createNetworkHttpServersWebhookTests_nodeParamType === 'str') {
                    //createNetworkHttpServersWebhookTests_parameters.networkId = createNetworkHttpServersWebhookTests_nodeParam || '';
                    createNetworkHttpServersWebhookTests_parameters.networkId = createNetworkHttpServersWebhookTests_nodeParam || undefined;
                } else {
                    createNetworkHttpServersWebhookTests_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkHttpServersWebhookTests_nodeParam);
                }
                //createNetworkHttpServersWebhookTests_parameters.networkId = !!createNetworkHttpServersWebhookTests_parameters.networkId ? createNetworkHttpServersWebhookTests_parameters.networkId : msg.payload;
                
                createNetworkHttpServersWebhookTests_nodeParam = node.createNetworkHttpServersWebhookTests_createNetworkHttpServersWebhookTests;
                createNetworkHttpServersWebhookTests_nodeParamType = node.createNetworkHttpServersWebhookTests_createNetworkHttpServersWebhookTestsType;
                if (createNetworkHttpServersWebhookTests_nodeParamType === 'str') {
                    //createNetworkHttpServersWebhookTests_parameters.createNetworkHttpServersWebhookTests = createNetworkHttpServersWebhookTests_nodeParam || '';
                    createNetworkHttpServersWebhookTests_parameters.createNetworkHttpServersWebhookTests = createNetworkHttpServersWebhookTests_nodeParam || undefined;
                } else {
                    createNetworkHttpServersWebhookTests_parameters.createNetworkHttpServersWebhookTests = RED.util.getMessageProperty(msg, createNetworkHttpServersWebhookTests_nodeParam);
                }
                //createNetworkHttpServersWebhookTests_parameters.createNetworkHttpServersWebhookTests = !!createNetworkHttpServersWebhookTests_parameters.createNetworkHttpServersWebhookTests ? createNetworkHttpServersWebhookTests_parameters.createNetworkHttpServersWebhookTests : msg.payload;
                                result = client.createNetworkHttpServersWebhookTests(createNetworkHttpServersWebhookTests_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkHttpServersWebhookTest') {
                var getNetworkHttpServersWebhookTest_parameters = [];
                var getNetworkHttpServersWebhookTest_nodeParam;
                var getNetworkHttpServersWebhookTest_nodeParamType;

                getNetworkHttpServersWebhookTest_nodeParam = node.getNetworkHttpServersWebhookTest_networkId;
                getNetworkHttpServersWebhookTest_nodeParamType = node.getNetworkHttpServersWebhookTest_networkIdType;
                if (getNetworkHttpServersWebhookTest_nodeParamType === 'str') {
                    //getNetworkHttpServersWebhookTest_parameters.networkId = getNetworkHttpServersWebhookTest_nodeParam || '';
                    getNetworkHttpServersWebhookTest_parameters.networkId = getNetworkHttpServersWebhookTest_nodeParam || undefined;
                } else {
                    getNetworkHttpServersWebhookTest_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkHttpServersWebhookTest_nodeParam);
                }
                //getNetworkHttpServersWebhookTest_parameters.networkId = !!getNetworkHttpServersWebhookTest_parameters.networkId ? getNetworkHttpServersWebhookTest_parameters.networkId : msg.payload;
                
                getNetworkHttpServersWebhookTest_nodeParam = node.getNetworkHttpServersWebhookTest_id;
                getNetworkHttpServersWebhookTest_nodeParamType = node.getNetworkHttpServersWebhookTest_idType;
                if (getNetworkHttpServersWebhookTest_nodeParamType === 'str') {
                    //getNetworkHttpServersWebhookTest_parameters.id = getNetworkHttpServersWebhookTest_nodeParam || '';
                    getNetworkHttpServersWebhookTest_parameters.id = getNetworkHttpServersWebhookTest_nodeParam || undefined;
                } else {
                    getNetworkHttpServersWebhookTest_parameters.id = RED.util.getMessageProperty(msg, getNetworkHttpServersWebhookTest_nodeParam);
                }
                //getNetworkHttpServersWebhookTest_parameters.id = !!getNetworkHttpServersWebhookTest_parameters.id ? getNetworkHttpServersWebhookTest_parameters.id : msg.payload;
                                result = client.getNetworkHttpServersWebhookTest(getNetworkHttpServersWebhookTest_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkMerakiAuthUsers') {
                var getNetworkMerakiAuthUsers_parameters = [];
                var getNetworkMerakiAuthUsers_nodeParam;
                var getNetworkMerakiAuthUsers_nodeParamType;

                getNetworkMerakiAuthUsers_nodeParam = node.getNetworkMerakiAuthUsers_networkId;
                getNetworkMerakiAuthUsers_nodeParamType = node.getNetworkMerakiAuthUsers_networkIdType;
                if (getNetworkMerakiAuthUsers_nodeParamType === 'str') {
                    //getNetworkMerakiAuthUsers_parameters.networkId = getNetworkMerakiAuthUsers_nodeParam || '';
                    getNetworkMerakiAuthUsers_parameters.networkId = getNetworkMerakiAuthUsers_nodeParam || undefined;
                } else {
                    getNetworkMerakiAuthUsers_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkMerakiAuthUsers_nodeParam);
                }
                //getNetworkMerakiAuthUsers_parameters.networkId = !!getNetworkMerakiAuthUsers_parameters.networkId ? getNetworkMerakiAuthUsers_parameters.networkId : msg.payload;
                                result = client.getNetworkMerakiAuthUsers(getNetworkMerakiAuthUsers_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkMerakiAuthUser') {
                var getNetworkMerakiAuthUser_parameters = [];
                var getNetworkMerakiAuthUser_nodeParam;
                var getNetworkMerakiAuthUser_nodeParamType;

                getNetworkMerakiAuthUser_nodeParam = node.getNetworkMerakiAuthUser_networkId;
                getNetworkMerakiAuthUser_nodeParamType = node.getNetworkMerakiAuthUser_networkIdType;
                if (getNetworkMerakiAuthUser_nodeParamType === 'str') {
                    //getNetworkMerakiAuthUser_parameters.networkId = getNetworkMerakiAuthUser_nodeParam || '';
                    getNetworkMerakiAuthUser_parameters.networkId = getNetworkMerakiAuthUser_nodeParam || undefined;
                } else {
                    getNetworkMerakiAuthUser_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkMerakiAuthUser_nodeParam);
                }
                //getNetworkMerakiAuthUser_parameters.networkId = !!getNetworkMerakiAuthUser_parameters.networkId ? getNetworkMerakiAuthUser_parameters.networkId : msg.payload;
                
                getNetworkMerakiAuthUser_nodeParam = node.getNetworkMerakiAuthUser_id;
                getNetworkMerakiAuthUser_nodeParamType = node.getNetworkMerakiAuthUser_idType;
                if (getNetworkMerakiAuthUser_nodeParamType === 'str') {
                    //getNetworkMerakiAuthUser_parameters.id = getNetworkMerakiAuthUser_nodeParam || '';
                    getNetworkMerakiAuthUser_parameters.id = getNetworkMerakiAuthUser_nodeParam || undefined;
                } else {
                    getNetworkMerakiAuthUser_parameters.id = RED.util.getMessageProperty(msg, getNetworkMerakiAuthUser_nodeParam);
                }
                //getNetworkMerakiAuthUser_parameters.id = !!getNetworkMerakiAuthUser_parameters.id ? getNetworkMerakiAuthUser_parameters.id : msg.payload;
                                result = client.getNetworkMerakiAuthUser(getNetworkMerakiAuthUser_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizations') {
                var getOrganizations_parameters = [];
                var getOrganizations_nodeParam;
                var getOrganizations_nodeParamType;
                result = client.getOrganizations(getOrganizations_parameters);
            }
            if (!errorFlag && node.method === 'createOrganizations') {
                var createOrganizations_parameters = [];
                var createOrganizations_nodeParam;
                var createOrganizations_nodeParamType;

                createOrganizations_nodeParam = node.createOrganizations_createOrganizations;
                createOrganizations_nodeParamType = node.createOrganizations_createOrganizationsType;
                if (createOrganizations_nodeParamType === 'str') {
                    //createOrganizations_parameters.createOrganizations = createOrganizations_nodeParam || '';
                    createOrganizations_parameters.createOrganizations = createOrganizations_nodeParam || undefined;
                } else {
                    createOrganizations_parameters.createOrganizations = RED.util.getMessageProperty(msg, createOrganizations_nodeParam);
                }
                //createOrganizations_parameters.createOrganizations = !!createOrganizations_parameters.createOrganizations ? createOrganizations_parameters.createOrganizations : msg.payload;
                                result = client.createOrganizations(createOrganizations_parameters);
            }
            if (!errorFlag && node.method === 'getOrganization') {
                var getOrganization_parameters = [];
                var getOrganization_nodeParam;
                var getOrganization_nodeParamType;

                getOrganization_nodeParam = node.getOrganization_id;
                getOrganization_nodeParamType = node.getOrganization_idType;
                if (getOrganization_nodeParamType === 'str') {
                    //getOrganization_parameters.id = getOrganization_nodeParam || '';
                    getOrganization_parameters.id = getOrganization_nodeParam || undefined;
                } else {
                    getOrganization_parameters.id = RED.util.getMessageProperty(msg, getOrganization_nodeParam);
                }
                //getOrganization_parameters.id = !!getOrganization_parameters.id ? getOrganization_parameters.id : msg.payload;
                                result = client.getOrganization(getOrganization_parameters);
            }
            if (!errorFlag && node.method === 'updateOrganization') {
                var updateOrganization_parameters = [];
                var updateOrganization_nodeParam;
                var updateOrganization_nodeParamType;

                updateOrganization_nodeParam = node.updateOrganization_id;
                updateOrganization_nodeParamType = node.updateOrganization_idType;
                if (updateOrganization_nodeParamType === 'str') {
                    //updateOrganization_parameters.id = updateOrganization_nodeParam || '';
                    updateOrganization_parameters.id = updateOrganization_nodeParam || undefined;
                } else {
                    updateOrganization_parameters.id = RED.util.getMessageProperty(msg, updateOrganization_nodeParam);
                }
                //updateOrganization_parameters.id = !!updateOrganization_parameters.id ? updateOrganization_parameters.id : msg.payload;
                
                updateOrganization_nodeParam = node.updateOrganization_updateOrganization;
                updateOrganization_nodeParamType = node.updateOrganization_updateOrganizationType;
                if (updateOrganization_nodeParamType === 'str') {
                    //updateOrganization_parameters.updateOrganization = updateOrganization_nodeParam || '';
                    updateOrganization_parameters.updateOrganization = updateOrganization_nodeParam || undefined;
                } else {
                    updateOrganization_parameters.updateOrganization = RED.util.getMessageProperty(msg, updateOrganization_nodeParam);
                }
                //updateOrganization_parameters.updateOrganization = !!updateOrganization_parameters.updateOrganization ? updateOrganization_parameters.updateOrganization : msg.payload;
                                result = client.updateOrganization(updateOrganization_parameters);
            }
            if (!errorFlag && node.method === 'cloneOrganization') {
                var cloneOrganization_parameters = [];
                var cloneOrganization_nodeParam;
                var cloneOrganization_nodeParamType;

                cloneOrganization_nodeParam = node.cloneOrganization_id;
                cloneOrganization_nodeParamType = node.cloneOrganization_idType;
                if (cloneOrganization_nodeParamType === 'str') {
                    //cloneOrganization_parameters.id = cloneOrganization_nodeParam || '';
                    cloneOrganization_parameters.id = cloneOrganization_nodeParam || undefined;
                } else {
                    cloneOrganization_parameters.id = RED.util.getMessageProperty(msg, cloneOrganization_nodeParam);
                }
                //cloneOrganization_parameters.id = !!cloneOrganization_parameters.id ? cloneOrganization_parameters.id : msg.payload;
                
                cloneOrganization_nodeParam = node.cloneOrganization_cloneOrganization;
                cloneOrganization_nodeParamType = node.cloneOrganization_cloneOrganizationType;
                if (cloneOrganization_nodeParamType === 'str') {
                    //cloneOrganization_parameters.cloneOrganization = cloneOrganization_nodeParam || '';
                    cloneOrganization_parameters.cloneOrganization = cloneOrganization_nodeParam || undefined;
                } else {
                    cloneOrganization_parameters.cloneOrganization = RED.util.getMessageProperty(msg, cloneOrganization_nodeParam);
                }
                //cloneOrganization_parameters.cloneOrganization = !!cloneOrganization_parameters.cloneOrganization ? cloneOrganization_parameters.cloneOrganization : msg.payload;
                                result = client.cloneOrganization(cloneOrganization_parameters);
            }
            if (!errorFlag && node.method === 'claimOrganization') {
                var claimOrganization_parameters = [];
                var claimOrganization_nodeParam;
                var claimOrganization_nodeParamType;

                claimOrganization_nodeParam = node.claimOrganization_id;
                claimOrganization_nodeParamType = node.claimOrganization_idType;
                if (claimOrganization_nodeParamType === 'str') {
                    //claimOrganization_parameters.id = claimOrganization_nodeParam || '';
                    claimOrganization_parameters.id = claimOrganization_nodeParam || undefined;
                } else {
                    claimOrganization_parameters.id = RED.util.getMessageProperty(msg, claimOrganization_nodeParam);
                }
                //claimOrganization_parameters.id = !!claimOrganization_parameters.id ? claimOrganization_parameters.id : msg.payload;
                
                claimOrganization_nodeParam = node.claimOrganization_claimOrganization;
                claimOrganization_nodeParamType = node.claimOrganization_claimOrganizationType;
                if (claimOrganization_nodeParamType === 'str') {
                    //claimOrganization_parameters.claimOrganization = claimOrganization_nodeParam || '';
                    claimOrganization_parameters.claimOrganization = claimOrganization_nodeParam || undefined;
                } else {
                    claimOrganization_parameters.claimOrganization = RED.util.getMessageProperty(msg, claimOrganization_nodeParam);
                }
                //claimOrganization_parameters.claimOrganization = !!claimOrganization_parameters.claimOrganization ? claimOrganization_parameters.claimOrganization : msg.payload;
                                result = client.claimOrganization(claimOrganization_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationLicenseState') {
                var getOrganizationLicenseState_parameters = [];
                var getOrganizationLicenseState_nodeParam;
                var getOrganizationLicenseState_nodeParamType;

                getOrganizationLicenseState_nodeParam = node.getOrganizationLicenseState_id;
                getOrganizationLicenseState_nodeParamType = node.getOrganizationLicenseState_idType;
                if (getOrganizationLicenseState_nodeParamType === 'str') {
                    //getOrganizationLicenseState_parameters.id = getOrganizationLicenseState_nodeParam || '';
                    getOrganizationLicenseState_parameters.id = getOrganizationLicenseState_nodeParam || undefined;
                } else {
                    getOrganizationLicenseState_parameters.id = RED.util.getMessageProperty(msg, getOrganizationLicenseState_nodeParam);
                }
                //getOrganizationLicenseState_parameters.id = !!getOrganizationLicenseState_parameters.id ? getOrganizationLicenseState_parameters.id : msg.payload;
                                result = client.getOrganizationLicenseState(getOrganizationLicenseState_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationInventory') {
                var getOrganizationInventory_parameters = [];
                var getOrganizationInventory_nodeParam;
                var getOrganizationInventory_nodeParamType;

                getOrganizationInventory_nodeParam = node.getOrganizationInventory_id;
                getOrganizationInventory_nodeParamType = node.getOrganizationInventory_idType;
                if (getOrganizationInventory_nodeParamType === 'str') {
                    //getOrganizationInventory_parameters.id = getOrganizationInventory_nodeParam || '';
                    getOrganizationInventory_parameters.id = getOrganizationInventory_nodeParam || undefined;
                } else {
                    getOrganizationInventory_parameters.id = RED.util.getMessageProperty(msg, getOrganizationInventory_nodeParam);
                }
                //getOrganizationInventory_parameters.id = !!getOrganizationInventory_parameters.id ? getOrganizationInventory_parameters.id : msg.payload;
                                result = client.getOrganizationInventory(getOrganizationInventory_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationDeviceStatuses') {
                var getOrganizationDeviceStatuses_parameters = [];
                var getOrganizationDeviceStatuses_nodeParam;
                var getOrganizationDeviceStatuses_nodeParamType;

                getOrganizationDeviceStatuses_nodeParam = node.getOrganizationDeviceStatuses_id;
                getOrganizationDeviceStatuses_nodeParamType = node.getOrganizationDeviceStatuses_idType;
                if (getOrganizationDeviceStatuses_nodeParamType === 'str') {
                    //getOrganizationDeviceStatuses_parameters.id = getOrganizationDeviceStatuses_nodeParam || '';
                    getOrganizationDeviceStatuses_parameters.id = getOrganizationDeviceStatuses_nodeParam || undefined;
                } else {
                    getOrganizationDeviceStatuses_parameters.id = RED.util.getMessageProperty(msg, getOrganizationDeviceStatuses_nodeParam);
                }
                //getOrganizationDeviceStatuses_parameters.id = !!getOrganizationDeviceStatuses_parameters.id ? getOrganizationDeviceStatuses_parameters.id : msg.payload;
                                result = client.getOrganizationDeviceStatuses(getOrganizationDeviceStatuses_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationSnmp') {
                var getOrganizationSnmp_parameters = [];
                var getOrganizationSnmp_nodeParam;
                var getOrganizationSnmp_nodeParamType;

                getOrganizationSnmp_nodeParam = node.getOrganizationSnmp_id;
                getOrganizationSnmp_nodeParamType = node.getOrganizationSnmp_idType;
                if (getOrganizationSnmp_nodeParamType === 'str') {
                    //getOrganizationSnmp_parameters.id = getOrganizationSnmp_nodeParam || '';
                    getOrganizationSnmp_parameters.id = getOrganizationSnmp_nodeParam || undefined;
                } else {
                    getOrganizationSnmp_parameters.id = RED.util.getMessageProperty(msg, getOrganizationSnmp_nodeParam);
                }
                //getOrganizationSnmp_parameters.id = !!getOrganizationSnmp_parameters.id ? getOrganizationSnmp_parameters.id : msg.payload;
                                result = client.getOrganizationSnmp(getOrganizationSnmp_parameters);
            }
            if (!errorFlag && node.method === 'updateOrganizationSnmp') {
                var updateOrganizationSnmp_parameters = [];
                var updateOrganizationSnmp_nodeParam;
                var updateOrganizationSnmp_nodeParamType;

                updateOrganizationSnmp_nodeParam = node.updateOrganizationSnmp_id;
                updateOrganizationSnmp_nodeParamType = node.updateOrganizationSnmp_idType;
                if (updateOrganizationSnmp_nodeParamType === 'str') {
                    //updateOrganizationSnmp_parameters.id = updateOrganizationSnmp_nodeParam || '';
                    updateOrganizationSnmp_parameters.id = updateOrganizationSnmp_nodeParam || undefined;
                } else {
                    updateOrganizationSnmp_parameters.id = RED.util.getMessageProperty(msg, updateOrganizationSnmp_nodeParam);
                }
                //updateOrganizationSnmp_parameters.id = !!updateOrganizationSnmp_parameters.id ? updateOrganizationSnmp_parameters.id : msg.payload;
                
                updateOrganizationSnmp_nodeParam = node.updateOrganizationSnmp_updateOrganizationSnmp;
                updateOrganizationSnmp_nodeParamType = node.updateOrganizationSnmp_updateOrganizationSnmpType;
                if (updateOrganizationSnmp_nodeParamType === 'str') {
                    //updateOrganizationSnmp_parameters.updateOrganizationSnmp = updateOrganizationSnmp_nodeParam || '';
                    updateOrganizationSnmp_parameters.updateOrganizationSnmp = updateOrganizationSnmp_nodeParam || undefined;
                } else {
                    updateOrganizationSnmp_parameters.updateOrganizationSnmp = RED.util.getMessageProperty(msg, updateOrganizationSnmp_nodeParam);
                }
                //updateOrganizationSnmp_parameters.updateOrganizationSnmp = !!updateOrganizationSnmp_parameters.updateOrganizationSnmp ? updateOrganizationSnmp_parameters.updateOrganizationSnmp : msg.payload;
                                result = client.updateOrganizationSnmp(updateOrganizationSnmp_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationThirdPartyVPNPeers') {
                var getOrganizationThirdPartyVPNPeers_parameters = [];
                var getOrganizationThirdPartyVPNPeers_nodeParam;
                var getOrganizationThirdPartyVPNPeers_nodeParamType;

                getOrganizationThirdPartyVPNPeers_nodeParam = node.getOrganizationThirdPartyVPNPeers_id;
                getOrganizationThirdPartyVPNPeers_nodeParamType = node.getOrganizationThirdPartyVPNPeers_idType;
                if (getOrganizationThirdPartyVPNPeers_nodeParamType === 'str') {
                    //getOrganizationThirdPartyVPNPeers_parameters.id = getOrganizationThirdPartyVPNPeers_nodeParam || '';
                    getOrganizationThirdPartyVPNPeers_parameters.id = getOrganizationThirdPartyVPNPeers_nodeParam || undefined;
                } else {
                    getOrganizationThirdPartyVPNPeers_parameters.id = RED.util.getMessageProperty(msg, getOrganizationThirdPartyVPNPeers_nodeParam);
                }
                //getOrganizationThirdPartyVPNPeers_parameters.id = !!getOrganizationThirdPartyVPNPeers_parameters.id ? getOrganizationThirdPartyVPNPeers_parameters.id : msg.payload;
                                result = client.getOrganizationThirdPartyVPNPeers(getOrganizationThirdPartyVPNPeers_parameters);
            }
            if (!errorFlag && node.method === 'updateOrganizationThirdPartyVPNPeers') {
                var updateOrganizationThirdPartyVPNPeers_parameters = [];
                var updateOrganizationThirdPartyVPNPeers_nodeParam;
                var updateOrganizationThirdPartyVPNPeers_nodeParamType;

                updateOrganizationThirdPartyVPNPeers_nodeParam = node.updateOrganizationThirdPartyVPNPeers_id;
                updateOrganizationThirdPartyVPNPeers_nodeParamType = node.updateOrganizationThirdPartyVPNPeers_idType;
                if (updateOrganizationThirdPartyVPNPeers_nodeParamType === 'str') {
                    //updateOrganizationThirdPartyVPNPeers_parameters.id = updateOrganizationThirdPartyVPNPeers_nodeParam || '';
                    updateOrganizationThirdPartyVPNPeers_parameters.id = updateOrganizationThirdPartyVPNPeers_nodeParam || undefined;
                } else {
                    updateOrganizationThirdPartyVPNPeers_parameters.id = RED.util.getMessageProperty(msg, updateOrganizationThirdPartyVPNPeers_nodeParam);
                }
                //updateOrganizationThirdPartyVPNPeers_parameters.id = !!updateOrganizationThirdPartyVPNPeers_parameters.id ? updateOrganizationThirdPartyVPNPeers_parameters.id : msg.payload;
                
                updateOrganizationThirdPartyVPNPeers_nodeParam = node.updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeers;
                updateOrganizationThirdPartyVPNPeers_nodeParamType = node.updateOrganizationThirdPartyVPNPeers_updateOrganizationThirdPartyVpnPeersType;
                if (updateOrganizationThirdPartyVPNPeers_nodeParamType === 'str') {
                    //updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers = updateOrganizationThirdPartyVPNPeers_nodeParam || '';
                    updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers = updateOrganizationThirdPartyVPNPeers_nodeParam || undefined;
                } else {
                    updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers = RED.util.getMessageProperty(msg, updateOrganizationThirdPartyVPNPeers_nodeParam);
                }
                //updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers = !!updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers ? updateOrganizationThirdPartyVPNPeers_parameters.updateOrganizationThirdPartyVpnPeers : msg.payload;
                                result = client.updateOrganizationThirdPartyVPNPeers(updateOrganizationThirdPartyVPNPeers_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationUplinksLossAndLatency') {
                var getOrganizationUplinksLossAndLatency_parameters = [];
                var getOrganizationUplinksLossAndLatency_nodeParam;
                var getOrganizationUplinksLossAndLatency_nodeParamType;

                getOrganizationUplinksLossAndLatency_nodeParam = node.getOrganizationUplinksLossAndLatency_organizationId;
                getOrganizationUplinksLossAndLatency_nodeParamType = node.getOrganizationUplinksLossAndLatency_organizationIdType;
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    //getOrganizationUplinksLossAndLatency_parameters.organizationId = getOrganizationUplinksLossAndLatency_nodeParam || '';
                    getOrganizationUplinksLossAndLatency_parameters.organizationId = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    getOrganizationUplinksLossAndLatency_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationUplinksLossAndLatency_nodeParam);
                }
                //getOrganizationUplinksLossAndLatency_parameters.organizationId = !!getOrganizationUplinksLossAndLatency_parameters.organizationId ? getOrganizationUplinksLossAndLatency_parameters.organizationId : msg.payload;
                
                getOrganizationUplinksLossAndLatency_nodeParam = node.getOrganizationUplinksLossAndLatency_uplink;
                getOrganizationUplinksLossAndLatency_nodeParamType = node.getOrganizationUplinksLossAndLatency_uplinkType;
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    //getOrganizationUplinksLossAndLatency_parameters.uplink = getOrganizationUplinksLossAndLatency_nodeParam || '';
                    getOrganizationUplinksLossAndLatency_parameters.uplink = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    getOrganizationUplinksLossAndLatency_parameters.uplink = RED.util.getMessageProperty(msg, getOrganizationUplinksLossAndLatency_nodeParam);
                }
                //getOrganizationUplinksLossAndLatency_parameters.uplink = !!getOrganizationUplinksLossAndLatency_parameters.uplink ? getOrganizationUplinksLossAndLatency_parameters.uplink : msg.payload;
                
                getOrganizationUplinksLossAndLatency_nodeParam = node.getOrganizationUplinksLossAndLatency_ip;
                getOrganizationUplinksLossAndLatency_nodeParamType = node.getOrganizationUplinksLossAndLatency_ipType;
                if (getOrganizationUplinksLossAndLatency_nodeParamType === 'str') {
                    //getOrganizationUplinksLossAndLatency_parameters.ip = getOrganizationUplinksLossAndLatency_nodeParam || '';
                    getOrganizationUplinksLossAndLatency_parameters.ip = getOrganizationUplinksLossAndLatency_nodeParam || undefined;
                } else {
                    getOrganizationUplinksLossAndLatency_parameters.ip = RED.util.getMessageProperty(msg, getOrganizationUplinksLossAndLatency_nodeParam);
                }
                //getOrganizationUplinksLossAndLatency_parameters.ip = !!getOrganizationUplinksLossAndLatency_parameters.ip ? getOrganizationUplinksLossAndLatency_parameters.ip : msg.payload;
                                result = client.getOrganizationUplinksLossAndLatency(getOrganizationUplinksLossAndLatency_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneAnnouncements') {
                var getNetworkPhoneAnnouncements_parameters = [];
                var getNetworkPhoneAnnouncements_nodeParam;
                var getNetworkPhoneAnnouncements_nodeParamType;

                getNetworkPhoneAnnouncements_nodeParam = node.getNetworkPhoneAnnouncements_networkId;
                getNetworkPhoneAnnouncements_nodeParamType = node.getNetworkPhoneAnnouncements_networkIdType;
                if (getNetworkPhoneAnnouncements_nodeParamType === 'str') {
                    //getNetworkPhoneAnnouncements_parameters.networkId = getNetworkPhoneAnnouncements_nodeParam || '';
                    getNetworkPhoneAnnouncements_parameters.networkId = getNetworkPhoneAnnouncements_nodeParam || undefined;
                } else {
                    getNetworkPhoneAnnouncements_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneAnnouncements_nodeParam);
                }
                //getNetworkPhoneAnnouncements_parameters.networkId = !!getNetworkPhoneAnnouncements_parameters.networkId ? getNetworkPhoneAnnouncements_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneAnnouncements(getNetworkPhoneAnnouncements_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkPhoneAnnouncements') {
                var createNetworkPhoneAnnouncements_parameters = [];
                var createNetworkPhoneAnnouncements_nodeParam;
                var createNetworkPhoneAnnouncements_nodeParamType;

                createNetworkPhoneAnnouncements_nodeParam = node.createNetworkPhoneAnnouncements_networkId;
                createNetworkPhoneAnnouncements_nodeParamType = node.createNetworkPhoneAnnouncements_networkIdType;
                if (createNetworkPhoneAnnouncements_nodeParamType === 'str') {
                    //createNetworkPhoneAnnouncements_parameters.networkId = createNetworkPhoneAnnouncements_nodeParam || '';
                    createNetworkPhoneAnnouncements_parameters.networkId = createNetworkPhoneAnnouncements_nodeParam || undefined;
                } else {
                    createNetworkPhoneAnnouncements_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkPhoneAnnouncements_nodeParam);
                }
                //createNetworkPhoneAnnouncements_parameters.networkId = !!createNetworkPhoneAnnouncements_parameters.networkId ? createNetworkPhoneAnnouncements_parameters.networkId : msg.payload;
                
                createNetworkPhoneAnnouncements_nodeParam = node.createNetworkPhoneAnnouncements_createNetworkPhoneAnnouncements;
                createNetworkPhoneAnnouncements_nodeParamType = node.createNetworkPhoneAnnouncements_createNetworkPhoneAnnouncementsType;
                if (createNetworkPhoneAnnouncements_nodeParamType === 'str') {
                    //createNetworkPhoneAnnouncements_parameters.createNetworkPhoneAnnouncements = createNetworkPhoneAnnouncements_nodeParam || '';
                    createNetworkPhoneAnnouncements_parameters.createNetworkPhoneAnnouncements = createNetworkPhoneAnnouncements_nodeParam || undefined;
                } else {
                    createNetworkPhoneAnnouncements_parameters.createNetworkPhoneAnnouncements = RED.util.getMessageProperty(msg, createNetworkPhoneAnnouncements_nodeParam);
                }
                //createNetworkPhoneAnnouncements_parameters.createNetworkPhoneAnnouncements = !!createNetworkPhoneAnnouncements_parameters.createNetworkPhoneAnnouncements ? createNetworkPhoneAnnouncements_parameters.createNetworkPhoneAnnouncements : msg.payload;
                                result = client.createNetworkPhoneAnnouncements(createNetworkPhoneAnnouncements_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkPhoneAnnouncement') {
                var deleteNetworkPhoneAnnouncement_parameters = [];
                var deleteNetworkPhoneAnnouncement_nodeParam;
                var deleteNetworkPhoneAnnouncement_nodeParamType;

                deleteNetworkPhoneAnnouncement_nodeParam = node.deleteNetworkPhoneAnnouncement_networkId;
                deleteNetworkPhoneAnnouncement_nodeParamType = node.deleteNetworkPhoneAnnouncement_networkIdType;
                if (deleteNetworkPhoneAnnouncement_nodeParamType === 'str') {
                    //deleteNetworkPhoneAnnouncement_parameters.networkId = deleteNetworkPhoneAnnouncement_nodeParam || '';
                    deleteNetworkPhoneAnnouncement_parameters.networkId = deleteNetworkPhoneAnnouncement_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneAnnouncement_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkPhoneAnnouncement_nodeParam);
                }
                //deleteNetworkPhoneAnnouncement_parameters.networkId = !!deleteNetworkPhoneAnnouncement_parameters.networkId ? deleteNetworkPhoneAnnouncement_parameters.networkId : msg.payload;
                
                deleteNetworkPhoneAnnouncement_nodeParam = node.deleteNetworkPhoneAnnouncement_id;
                deleteNetworkPhoneAnnouncement_nodeParamType = node.deleteNetworkPhoneAnnouncement_idType;
                if (deleteNetworkPhoneAnnouncement_nodeParamType === 'str') {
                    //deleteNetworkPhoneAnnouncement_parameters.id = deleteNetworkPhoneAnnouncement_nodeParam || '';
                    deleteNetworkPhoneAnnouncement_parameters.id = deleteNetworkPhoneAnnouncement_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneAnnouncement_parameters.id = RED.util.getMessageProperty(msg, deleteNetworkPhoneAnnouncement_nodeParam);
                }
                //deleteNetworkPhoneAnnouncement_parameters.id = !!deleteNetworkPhoneAnnouncement_parameters.id ? deleteNetworkPhoneAnnouncement_parameters.id : msg.payload;
                                result = client.deleteNetworkPhoneAnnouncement(deleteNetworkPhoneAnnouncement_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneAssignments') {
                var getNetworkPhoneAssignments_parameters = [];
                var getNetworkPhoneAssignments_nodeParam;
                var getNetworkPhoneAssignments_nodeParamType;

                getNetworkPhoneAssignments_nodeParam = node.getNetworkPhoneAssignments_networkId;
                getNetworkPhoneAssignments_nodeParamType = node.getNetworkPhoneAssignments_networkIdType;
                if (getNetworkPhoneAssignments_nodeParamType === 'str') {
                    //getNetworkPhoneAssignments_parameters.networkId = getNetworkPhoneAssignments_nodeParam || '';
                    getNetworkPhoneAssignments_parameters.networkId = getNetworkPhoneAssignments_nodeParam || undefined;
                } else {
                    getNetworkPhoneAssignments_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneAssignments_nodeParam);
                }
                //getNetworkPhoneAssignments_parameters.networkId = !!getNetworkPhoneAssignments_parameters.networkId ? getNetworkPhoneAssignments_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneAssignments(getNetworkPhoneAssignments_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneAssignment') {
                var getNetworkPhoneAssignment_parameters = [];
                var getNetworkPhoneAssignment_nodeParam;
                var getNetworkPhoneAssignment_nodeParamType;

                getNetworkPhoneAssignment_nodeParam = node.getNetworkPhoneAssignment_networkId;
                getNetworkPhoneAssignment_nodeParamType = node.getNetworkPhoneAssignment_networkIdType;
                if (getNetworkPhoneAssignment_nodeParamType === 'str') {
                    //getNetworkPhoneAssignment_parameters.networkId = getNetworkPhoneAssignment_nodeParam || '';
                    getNetworkPhoneAssignment_parameters.networkId = getNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    getNetworkPhoneAssignment_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneAssignment_nodeParam);
                }
                //getNetworkPhoneAssignment_parameters.networkId = !!getNetworkPhoneAssignment_parameters.networkId ? getNetworkPhoneAssignment_parameters.networkId : msg.payload;
                
                getNetworkPhoneAssignment_nodeParam = node.getNetworkPhoneAssignment_serial;
                getNetworkPhoneAssignment_nodeParamType = node.getNetworkPhoneAssignment_serialType;
                if (getNetworkPhoneAssignment_nodeParamType === 'str') {
                    //getNetworkPhoneAssignment_parameters.serial = getNetworkPhoneAssignment_nodeParam || '';
                    getNetworkPhoneAssignment_parameters.serial = getNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    getNetworkPhoneAssignment_parameters.serial = RED.util.getMessageProperty(msg, getNetworkPhoneAssignment_nodeParam);
                }
                //getNetworkPhoneAssignment_parameters.serial = !!getNetworkPhoneAssignment_parameters.serial ? getNetworkPhoneAssignment_parameters.serial : msg.payload;
                                result = client.getNetworkPhoneAssignment(getNetworkPhoneAssignment_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkPhoneAssignment') {
                var updateNetworkPhoneAssignment_parameters = [];
                var updateNetworkPhoneAssignment_nodeParam;
                var updateNetworkPhoneAssignment_nodeParamType;

                updateNetworkPhoneAssignment_nodeParam = node.updateNetworkPhoneAssignment_networkId;
                updateNetworkPhoneAssignment_nodeParamType = node.updateNetworkPhoneAssignment_networkIdType;
                if (updateNetworkPhoneAssignment_nodeParamType === 'str') {
                    //updateNetworkPhoneAssignment_parameters.networkId = updateNetworkPhoneAssignment_nodeParam || '';
                    updateNetworkPhoneAssignment_parameters.networkId = updateNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    updateNetworkPhoneAssignment_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkPhoneAssignment_nodeParam);
                }
                //updateNetworkPhoneAssignment_parameters.networkId = !!updateNetworkPhoneAssignment_parameters.networkId ? updateNetworkPhoneAssignment_parameters.networkId : msg.payload;
                
                updateNetworkPhoneAssignment_nodeParam = node.updateNetworkPhoneAssignment_serial;
                updateNetworkPhoneAssignment_nodeParamType = node.updateNetworkPhoneAssignment_serialType;
                if (updateNetworkPhoneAssignment_nodeParamType === 'str') {
                    //updateNetworkPhoneAssignment_parameters.serial = updateNetworkPhoneAssignment_nodeParam || '';
                    updateNetworkPhoneAssignment_parameters.serial = updateNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    updateNetworkPhoneAssignment_parameters.serial = RED.util.getMessageProperty(msg, updateNetworkPhoneAssignment_nodeParam);
                }
                //updateNetworkPhoneAssignment_parameters.serial = !!updateNetworkPhoneAssignment_parameters.serial ? updateNetworkPhoneAssignment_parameters.serial : msg.payload;
                
                updateNetworkPhoneAssignment_nodeParam = node.updateNetworkPhoneAssignment_updateNetworkPhoneAssignment;
                updateNetworkPhoneAssignment_nodeParamType = node.updateNetworkPhoneAssignment_updateNetworkPhoneAssignmentType;
                if (updateNetworkPhoneAssignment_nodeParamType === 'str') {
                    //updateNetworkPhoneAssignment_parameters.updateNetworkPhoneAssignment = updateNetworkPhoneAssignment_nodeParam || '';
                    updateNetworkPhoneAssignment_parameters.updateNetworkPhoneAssignment = updateNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    updateNetworkPhoneAssignment_parameters.updateNetworkPhoneAssignment = RED.util.getMessageProperty(msg, updateNetworkPhoneAssignment_nodeParam);
                }
                //updateNetworkPhoneAssignment_parameters.updateNetworkPhoneAssignment = !!updateNetworkPhoneAssignment_parameters.updateNetworkPhoneAssignment ? updateNetworkPhoneAssignment_parameters.updateNetworkPhoneAssignment : msg.payload;
                                result = client.updateNetworkPhoneAssignment(updateNetworkPhoneAssignment_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkPhoneAssignment') {
                var deleteNetworkPhoneAssignment_parameters = [];
                var deleteNetworkPhoneAssignment_nodeParam;
                var deleteNetworkPhoneAssignment_nodeParamType;

                deleteNetworkPhoneAssignment_nodeParam = node.deleteNetworkPhoneAssignment_networkId;
                deleteNetworkPhoneAssignment_nodeParamType = node.deleteNetworkPhoneAssignment_networkIdType;
                if (deleteNetworkPhoneAssignment_nodeParamType === 'str') {
                    //deleteNetworkPhoneAssignment_parameters.networkId = deleteNetworkPhoneAssignment_nodeParam || '';
                    deleteNetworkPhoneAssignment_parameters.networkId = deleteNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneAssignment_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkPhoneAssignment_nodeParam);
                }
                //deleteNetworkPhoneAssignment_parameters.networkId = !!deleteNetworkPhoneAssignment_parameters.networkId ? deleteNetworkPhoneAssignment_parameters.networkId : msg.payload;
                
                deleteNetworkPhoneAssignment_nodeParam = node.deleteNetworkPhoneAssignment_serial;
                deleteNetworkPhoneAssignment_nodeParamType = node.deleteNetworkPhoneAssignment_serialType;
                if (deleteNetworkPhoneAssignment_nodeParamType === 'str') {
                    //deleteNetworkPhoneAssignment_parameters.serial = deleteNetworkPhoneAssignment_nodeParam || '';
                    deleteNetworkPhoneAssignment_parameters.serial = deleteNetworkPhoneAssignment_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneAssignment_parameters.serial = RED.util.getMessageProperty(msg, deleteNetworkPhoneAssignment_nodeParam);
                }
                //deleteNetworkPhoneAssignment_parameters.serial = !!deleteNetworkPhoneAssignment_parameters.serial ? deleteNetworkPhoneAssignment_parameters.serial : msg.payload;
                                result = client.deleteNetworkPhoneAssignment(deleteNetworkPhoneAssignment_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneCallgroups') {
                var getNetworkPhoneCallgroups_parameters = [];
                var getNetworkPhoneCallgroups_nodeParam;
                var getNetworkPhoneCallgroups_nodeParamType;

                getNetworkPhoneCallgroups_nodeParam = node.getNetworkPhoneCallgroups_networkId;
                getNetworkPhoneCallgroups_nodeParamType = node.getNetworkPhoneCallgroups_networkIdType;
                if (getNetworkPhoneCallgroups_nodeParamType === 'str') {
                    //getNetworkPhoneCallgroups_parameters.networkId = getNetworkPhoneCallgroups_nodeParam || '';
                    getNetworkPhoneCallgroups_parameters.networkId = getNetworkPhoneCallgroups_nodeParam || undefined;
                } else {
                    getNetworkPhoneCallgroups_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneCallgroups_nodeParam);
                }
                //getNetworkPhoneCallgroups_parameters.networkId = !!getNetworkPhoneCallgroups_parameters.networkId ? getNetworkPhoneCallgroups_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneCallgroups(getNetworkPhoneCallgroups_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkPhoneCallgroups') {
                var createNetworkPhoneCallgroups_parameters = [];
                var createNetworkPhoneCallgroups_nodeParam;
                var createNetworkPhoneCallgroups_nodeParamType;

                createNetworkPhoneCallgroups_nodeParam = node.createNetworkPhoneCallgroups_networkId;
                createNetworkPhoneCallgroups_nodeParamType = node.createNetworkPhoneCallgroups_networkIdType;
                if (createNetworkPhoneCallgroups_nodeParamType === 'str') {
                    //createNetworkPhoneCallgroups_parameters.networkId = createNetworkPhoneCallgroups_nodeParam || '';
                    createNetworkPhoneCallgroups_parameters.networkId = createNetworkPhoneCallgroups_nodeParam || undefined;
                } else {
                    createNetworkPhoneCallgroups_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkPhoneCallgroups_nodeParam);
                }
                //createNetworkPhoneCallgroups_parameters.networkId = !!createNetworkPhoneCallgroups_parameters.networkId ? createNetworkPhoneCallgroups_parameters.networkId : msg.payload;
                
                createNetworkPhoneCallgroups_nodeParam = node.createNetworkPhoneCallgroups_createNetworkPhoneCallgroups;
                createNetworkPhoneCallgroups_nodeParamType = node.createNetworkPhoneCallgroups_createNetworkPhoneCallgroupsType;
                if (createNetworkPhoneCallgroups_nodeParamType === 'str') {
                    //createNetworkPhoneCallgroups_parameters.createNetworkPhoneCallgroups = createNetworkPhoneCallgroups_nodeParam || '';
                    createNetworkPhoneCallgroups_parameters.createNetworkPhoneCallgroups = createNetworkPhoneCallgroups_nodeParam || undefined;
                } else {
                    createNetworkPhoneCallgroups_parameters.createNetworkPhoneCallgroups = RED.util.getMessageProperty(msg, createNetworkPhoneCallgroups_nodeParam);
                }
                //createNetworkPhoneCallgroups_parameters.createNetworkPhoneCallgroups = !!createNetworkPhoneCallgroups_parameters.createNetworkPhoneCallgroups ? createNetworkPhoneCallgroups_parameters.createNetworkPhoneCallgroups : msg.payload;
                                result = client.createNetworkPhoneCallgroups(createNetworkPhoneCallgroups_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneCallgroup') {
                var getNetworkPhoneCallgroup_parameters = [];
                var getNetworkPhoneCallgroup_nodeParam;
                var getNetworkPhoneCallgroup_nodeParamType;

                getNetworkPhoneCallgroup_nodeParam = node.getNetworkPhoneCallgroup_networkId;
                getNetworkPhoneCallgroup_nodeParamType = node.getNetworkPhoneCallgroup_networkIdType;
                if (getNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //getNetworkPhoneCallgroup_parameters.networkId = getNetworkPhoneCallgroup_nodeParam || '';
                    getNetworkPhoneCallgroup_parameters.networkId = getNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    getNetworkPhoneCallgroup_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneCallgroup_nodeParam);
                }
                //getNetworkPhoneCallgroup_parameters.networkId = !!getNetworkPhoneCallgroup_parameters.networkId ? getNetworkPhoneCallgroup_parameters.networkId : msg.payload;
                
                getNetworkPhoneCallgroup_nodeParam = node.getNetworkPhoneCallgroup_id;
                getNetworkPhoneCallgroup_nodeParamType = node.getNetworkPhoneCallgroup_idType;
                if (getNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //getNetworkPhoneCallgroup_parameters.id = getNetworkPhoneCallgroup_nodeParam || '';
                    getNetworkPhoneCallgroup_parameters.id = getNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    getNetworkPhoneCallgroup_parameters.id = RED.util.getMessageProperty(msg, getNetworkPhoneCallgroup_nodeParam);
                }
                //getNetworkPhoneCallgroup_parameters.id = !!getNetworkPhoneCallgroup_parameters.id ? getNetworkPhoneCallgroup_parameters.id : msg.payload;
                                result = client.getNetworkPhoneCallgroup(getNetworkPhoneCallgroup_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkPhoneCallgroup') {
                var updateNetworkPhoneCallgroup_parameters = [];
                var updateNetworkPhoneCallgroup_nodeParam;
                var updateNetworkPhoneCallgroup_nodeParamType;

                updateNetworkPhoneCallgroup_nodeParam = node.updateNetworkPhoneCallgroup_networkId;
                updateNetworkPhoneCallgroup_nodeParamType = node.updateNetworkPhoneCallgroup_networkIdType;
                if (updateNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //updateNetworkPhoneCallgroup_parameters.networkId = updateNetworkPhoneCallgroup_nodeParam || '';
                    updateNetworkPhoneCallgroup_parameters.networkId = updateNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    updateNetworkPhoneCallgroup_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkPhoneCallgroup_nodeParam);
                }
                //updateNetworkPhoneCallgroup_parameters.networkId = !!updateNetworkPhoneCallgroup_parameters.networkId ? updateNetworkPhoneCallgroup_parameters.networkId : msg.payload;
                
                updateNetworkPhoneCallgroup_nodeParam = node.updateNetworkPhoneCallgroup_id;
                updateNetworkPhoneCallgroup_nodeParamType = node.updateNetworkPhoneCallgroup_idType;
                if (updateNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //updateNetworkPhoneCallgroup_parameters.id = updateNetworkPhoneCallgroup_nodeParam || '';
                    updateNetworkPhoneCallgroup_parameters.id = updateNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    updateNetworkPhoneCallgroup_parameters.id = RED.util.getMessageProperty(msg, updateNetworkPhoneCallgroup_nodeParam);
                }
                //updateNetworkPhoneCallgroup_parameters.id = !!updateNetworkPhoneCallgroup_parameters.id ? updateNetworkPhoneCallgroup_parameters.id : msg.payload;
                
                updateNetworkPhoneCallgroup_nodeParam = node.updateNetworkPhoneCallgroup_updateNetworkPhoneCallgroup;
                updateNetworkPhoneCallgroup_nodeParamType = node.updateNetworkPhoneCallgroup_updateNetworkPhoneCallgroupType;
                if (updateNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //updateNetworkPhoneCallgroup_parameters.updateNetworkPhoneCallgroup = updateNetworkPhoneCallgroup_nodeParam || '';
                    updateNetworkPhoneCallgroup_parameters.updateNetworkPhoneCallgroup = updateNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    updateNetworkPhoneCallgroup_parameters.updateNetworkPhoneCallgroup = RED.util.getMessageProperty(msg, updateNetworkPhoneCallgroup_nodeParam);
                }
                //updateNetworkPhoneCallgroup_parameters.updateNetworkPhoneCallgroup = !!updateNetworkPhoneCallgroup_parameters.updateNetworkPhoneCallgroup ? updateNetworkPhoneCallgroup_parameters.updateNetworkPhoneCallgroup : msg.payload;
                                result = client.updateNetworkPhoneCallgroup(updateNetworkPhoneCallgroup_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkPhoneCallgroup') {
                var deleteNetworkPhoneCallgroup_parameters = [];
                var deleteNetworkPhoneCallgroup_nodeParam;
                var deleteNetworkPhoneCallgroup_nodeParamType;

                deleteNetworkPhoneCallgroup_nodeParam = node.deleteNetworkPhoneCallgroup_networkId;
                deleteNetworkPhoneCallgroup_nodeParamType = node.deleteNetworkPhoneCallgroup_networkIdType;
                if (deleteNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //deleteNetworkPhoneCallgroup_parameters.networkId = deleteNetworkPhoneCallgroup_nodeParam || '';
                    deleteNetworkPhoneCallgroup_parameters.networkId = deleteNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneCallgroup_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkPhoneCallgroup_nodeParam);
                }
                //deleteNetworkPhoneCallgroup_parameters.networkId = !!deleteNetworkPhoneCallgroup_parameters.networkId ? deleteNetworkPhoneCallgroup_parameters.networkId : msg.payload;
                
                deleteNetworkPhoneCallgroup_nodeParam = node.deleteNetworkPhoneCallgroup_id;
                deleteNetworkPhoneCallgroup_nodeParamType = node.deleteNetworkPhoneCallgroup_idType;
                if (deleteNetworkPhoneCallgroup_nodeParamType === 'str') {
                    //deleteNetworkPhoneCallgroup_parameters.id = deleteNetworkPhoneCallgroup_nodeParam || '';
                    deleteNetworkPhoneCallgroup_parameters.id = deleteNetworkPhoneCallgroup_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneCallgroup_parameters.id = RED.util.getMessageProperty(msg, deleteNetworkPhoneCallgroup_nodeParam);
                }
                //deleteNetworkPhoneCallgroup_parameters.id = !!deleteNetworkPhoneCallgroup_parameters.id ? deleteNetworkPhoneCallgroup_parameters.id : msg.payload;
                                result = client.deleteNetworkPhoneCallgroup(deleteNetworkPhoneCallgroup_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneConferenceRooms') {
                var getNetworkPhoneConferenceRooms_parameters = [];
                var getNetworkPhoneConferenceRooms_nodeParam;
                var getNetworkPhoneConferenceRooms_nodeParamType;

                getNetworkPhoneConferenceRooms_nodeParam = node.getNetworkPhoneConferenceRooms_networkId;
                getNetworkPhoneConferenceRooms_nodeParamType = node.getNetworkPhoneConferenceRooms_networkIdType;
                if (getNetworkPhoneConferenceRooms_nodeParamType === 'str') {
                    //getNetworkPhoneConferenceRooms_parameters.networkId = getNetworkPhoneConferenceRooms_nodeParam || '';
                    getNetworkPhoneConferenceRooms_parameters.networkId = getNetworkPhoneConferenceRooms_nodeParam || undefined;
                } else {
                    getNetworkPhoneConferenceRooms_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneConferenceRooms_nodeParam);
                }
                //getNetworkPhoneConferenceRooms_parameters.networkId = !!getNetworkPhoneConferenceRooms_parameters.networkId ? getNetworkPhoneConferenceRooms_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneConferenceRooms(getNetworkPhoneConferenceRooms_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkPhoneConferenceRooms') {
                var createNetworkPhoneConferenceRooms_parameters = [];
                var createNetworkPhoneConferenceRooms_nodeParam;
                var createNetworkPhoneConferenceRooms_nodeParamType;

                createNetworkPhoneConferenceRooms_nodeParam = node.createNetworkPhoneConferenceRooms_networkId;
                createNetworkPhoneConferenceRooms_nodeParamType = node.createNetworkPhoneConferenceRooms_networkIdType;
                if (createNetworkPhoneConferenceRooms_nodeParamType === 'str') {
                    //createNetworkPhoneConferenceRooms_parameters.networkId = createNetworkPhoneConferenceRooms_nodeParam || '';
                    createNetworkPhoneConferenceRooms_parameters.networkId = createNetworkPhoneConferenceRooms_nodeParam || undefined;
                } else {
                    createNetworkPhoneConferenceRooms_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkPhoneConferenceRooms_nodeParam);
                }
                //createNetworkPhoneConferenceRooms_parameters.networkId = !!createNetworkPhoneConferenceRooms_parameters.networkId ? createNetworkPhoneConferenceRooms_parameters.networkId : msg.payload;
                
                createNetworkPhoneConferenceRooms_nodeParam = node.createNetworkPhoneConferenceRooms_createNetworkPhoneConferenceRooms;
                createNetworkPhoneConferenceRooms_nodeParamType = node.createNetworkPhoneConferenceRooms_createNetworkPhoneConferenceRoomsType;
                if (createNetworkPhoneConferenceRooms_nodeParamType === 'str') {
                    //createNetworkPhoneConferenceRooms_parameters.createNetworkPhoneConferenceRooms = createNetworkPhoneConferenceRooms_nodeParam || '';
                    createNetworkPhoneConferenceRooms_parameters.createNetworkPhoneConferenceRooms = createNetworkPhoneConferenceRooms_nodeParam || undefined;
                } else {
                    createNetworkPhoneConferenceRooms_parameters.createNetworkPhoneConferenceRooms = RED.util.getMessageProperty(msg, createNetworkPhoneConferenceRooms_nodeParam);
                }
                //createNetworkPhoneConferenceRooms_parameters.createNetworkPhoneConferenceRooms = !!createNetworkPhoneConferenceRooms_parameters.createNetworkPhoneConferenceRooms ? createNetworkPhoneConferenceRooms_parameters.createNetworkPhoneConferenceRooms : msg.payload;
                                result = client.createNetworkPhoneConferenceRooms(createNetworkPhoneConferenceRooms_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneConferenceRoom') {
                var getNetworkPhoneConferenceRoom_parameters = [];
                var getNetworkPhoneConferenceRoom_nodeParam;
                var getNetworkPhoneConferenceRoom_nodeParamType;

                getNetworkPhoneConferenceRoom_nodeParam = node.getNetworkPhoneConferenceRoom_networkId;
                getNetworkPhoneConferenceRoom_nodeParamType = node.getNetworkPhoneConferenceRoom_networkIdType;
                if (getNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //getNetworkPhoneConferenceRoom_parameters.networkId = getNetworkPhoneConferenceRoom_nodeParam || '';
                    getNetworkPhoneConferenceRoom_parameters.networkId = getNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    getNetworkPhoneConferenceRoom_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneConferenceRoom_nodeParam);
                }
                //getNetworkPhoneConferenceRoom_parameters.networkId = !!getNetworkPhoneConferenceRoom_parameters.networkId ? getNetworkPhoneConferenceRoom_parameters.networkId : msg.payload;
                
                getNetworkPhoneConferenceRoom_nodeParam = node.getNetworkPhoneConferenceRoom_id;
                getNetworkPhoneConferenceRoom_nodeParamType = node.getNetworkPhoneConferenceRoom_idType;
                if (getNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //getNetworkPhoneConferenceRoom_parameters.id = getNetworkPhoneConferenceRoom_nodeParam || '';
                    getNetworkPhoneConferenceRoom_parameters.id = getNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    getNetworkPhoneConferenceRoom_parameters.id = RED.util.getMessageProperty(msg, getNetworkPhoneConferenceRoom_nodeParam);
                }
                //getNetworkPhoneConferenceRoom_parameters.id = !!getNetworkPhoneConferenceRoom_parameters.id ? getNetworkPhoneConferenceRoom_parameters.id : msg.payload;
                                result = client.getNetworkPhoneConferenceRoom(getNetworkPhoneConferenceRoom_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkPhoneConferenceRoom') {
                var updateNetworkPhoneConferenceRoom_parameters = [];
                var updateNetworkPhoneConferenceRoom_nodeParam;
                var updateNetworkPhoneConferenceRoom_nodeParamType;

                updateNetworkPhoneConferenceRoom_nodeParam = node.updateNetworkPhoneConferenceRoom_networkId;
                updateNetworkPhoneConferenceRoom_nodeParamType = node.updateNetworkPhoneConferenceRoom_networkIdType;
                if (updateNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //updateNetworkPhoneConferenceRoom_parameters.networkId = updateNetworkPhoneConferenceRoom_nodeParam || '';
                    updateNetworkPhoneConferenceRoom_parameters.networkId = updateNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    updateNetworkPhoneConferenceRoom_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkPhoneConferenceRoom_nodeParam);
                }
                //updateNetworkPhoneConferenceRoom_parameters.networkId = !!updateNetworkPhoneConferenceRoom_parameters.networkId ? updateNetworkPhoneConferenceRoom_parameters.networkId : msg.payload;
                
                updateNetworkPhoneConferenceRoom_nodeParam = node.updateNetworkPhoneConferenceRoom_id;
                updateNetworkPhoneConferenceRoom_nodeParamType = node.updateNetworkPhoneConferenceRoom_idType;
                if (updateNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //updateNetworkPhoneConferenceRoom_parameters.id = updateNetworkPhoneConferenceRoom_nodeParam || '';
                    updateNetworkPhoneConferenceRoom_parameters.id = updateNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    updateNetworkPhoneConferenceRoom_parameters.id = RED.util.getMessageProperty(msg, updateNetworkPhoneConferenceRoom_nodeParam);
                }
                //updateNetworkPhoneConferenceRoom_parameters.id = !!updateNetworkPhoneConferenceRoom_parameters.id ? updateNetworkPhoneConferenceRoom_parameters.id : msg.payload;
                
                updateNetworkPhoneConferenceRoom_nodeParam = node.updateNetworkPhoneConferenceRoom_updateNetworkPhoneConferenceRoom;
                updateNetworkPhoneConferenceRoom_nodeParamType = node.updateNetworkPhoneConferenceRoom_updateNetworkPhoneConferenceRoomType;
                if (updateNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //updateNetworkPhoneConferenceRoom_parameters.updateNetworkPhoneConferenceRoom = updateNetworkPhoneConferenceRoom_nodeParam || '';
                    updateNetworkPhoneConferenceRoom_parameters.updateNetworkPhoneConferenceRoom = updateNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    updateNetworkPhoneConferenceRoom_parameters.updateNetworkPhoneConferenceRoom = RED.util.getMessageProperty(msg, updateNetworkPhoneConferenceRoom_nodeParam);
                }
                //updateNetworkPhoneConferenceRoom_parameters.updateNetworkPhoneConferenceRoom = !!updateNetworkPhoneConferenceRoom_parameters.updateNetworkPhoneConferenceRoom ? updateNetworkPhoneConferenceRoom_parameters.updateNetworkPhoneConferenceRoom : msg.payload;
                                result = client.updateNetworkPhoneConferenceRoom(updateNetworkPhoneConferenceRoom_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkPhoneConferenceRoom') {
                var deleteNetworkPhoneConferenceRoom_parameters = [];
                var deleteNetworkPhoneConferenceRoom_nodeParam;
                var deleteNetworkPhoneConferenceRoom_nodeParamType;

                deleteNetworkPhoneConferenceRoom_nodeParam = node.deleteNetworkPhoneConferenceRoom_networkId;
                deleteNetworkPhoneConferenceRoom_nodeParamType = node.deleteNetworkPhoneConferenceRoom_networkIdType;
                if (deleteNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //deleteNetworkPhoneConferenceRoom_parameters.networkId = deleteNetworkPhoneConferenceRoom_nodeParam || '';
                    deleteNetworkPhoneConferenceRoom_parameters.networkId = deleteNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneConferenceRoom_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkPhoneConferenceRoom_nodeParam);
                }
                //deleteNetworkPhoneConferenceRoom_parameters.networkId = !!deleteNetworkPhoneConferenceRoom_parameters.networkId ? deleteNetworkPhoneConferenceRoom_parameters.networkId : msg.payload;
                
                deleteNetworkPhoneConferenceRoom_nodeParam = node.deleteNetworkPhoneConferenceRoom_id;
                deleteNetworkPhoneConferenceRoom_nodeParamType = node.deleteNetworkPhoneConferenceRoom_idType;
                if (deleteNetworkPhoneConferenceRoom_nodeParamType === 'str') {
                    //deleteNetworkPhoneConferenceRoom_parameters.id = deleteNetworkPhoneConferenceRoom_nodeParam || '';
                    deleteNetworkPhoneConferenceRoom_parameters.id = deleteNetworkPhoneConferenceRoom_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneConferenceRoom_parameters.id = RED.util.getMessageProperty(msg, deleteNetworkPhoneConferenceRoom_nodeParam);
                }
                //deleteNetworkPhoneConferenceRoom_parameters.id = !!deleteNetworkPhoneConferenceRoom_parameters.id ? deleteNetworkPhoneConferenceRoom_parameters.id : msg.payload;
                                result = client.deleteNetworkPhoneConferenceRoom(deleteNetworkPhoneConferenceRoom_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneContacts') {
                var getNetworkPhoneContacts_parameters = [];
                var getNetworkPhoneContacts_nodeParam;
                var getNetworkPhoneContacts_nodeParamType;

                getNetworkPhoneContacts_nodeParam = node.getNetworkPhoneContacts_networkId;
                getNetworkPhoneContacts_nodeParamType = node.getNetworkPhoneContacts_networkIdType;
                if (getNetworkPhoneContacts_nodeParamType === 'str') {
                    //getNetworkPhoneContacts_parameters.networkId = getNetworkPhoneContacts_nodeParam || '';
                    getNetworkPhoneContacts_parameters.networkId = getNetworkPhoneContacts_nodeParam || undefined;
                } else {
                    getNetworkPhoneContacts_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneContacts_nodeParam);
                }
                //getNetworkPhoneContacts_parameters.networkId = !!getNetworkPhoneContacts_parameters.networkId ? getNetworkPhoneContacts_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneContacts(getNetworkPhoneContacts_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkPhoneContacts') {
                var createNetworkPhoneContacts_parameters = [];
                var createNetworkPhoneContacts_nodeParam;
                var createNetworkPhoneContacts_nodeParamType;

                createNetworkPhoneContacts_nodeParam = node.createNetworkPhoneContacts_networkId;
                createNetworkPhoneContacts_nodeParamType = node.createNetworkPhoneContacts_networkIdType;
                if (createNetworkPhoneContacts_nodeParamType === 'str') {
                    //createNetworkPhoneContacts_parameters.networkId = createNetworkPhoneContacts_nodeParam || '';
                    createNetworkPhoneContacts_parameters.networkId = createNetworkPhoneContacts_nodeParam || undefined;
                } else {
                    createNetworkPhoneContacts_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkPhoneContacts_nodeParam);
                }
                //createNetworkPhoneContacts_parameters.networkId = !!createNetworkPhoneContacts_parameters.networkId ? createNetworkPhoneContacts_parameters.networkId : msg.payload;
                
                createNetworkPhoneContacts_nodeParam = node.createNetworkPhoneContacts_createNetworkPhoneContacts;
                createNetworkPhoneContacts_nodeParamType = node.createNetworkPhoneContacts_createNetworkPhoneContactsType;
                if (createNetworkPhoneContacts_nodeParamType === 'str') {
                    //createNetworkPhoneContacts_parameters.createNetworkPhoneContacts = createNetworkPhoneContacts_nodeParam || '';
                    createNetworkPhoneContacts_parameters.createNetworkPhoneContacts = createNetworkPhoneContacts_nodeParam || undefined;
                } else {
                    createNetworkPhoneContacts_parameters.createNetworkPhoneContacts = RED.util.getMessageProperty(msg, createNetworkPhoneContacts_nodeParam);
                }
                //createNetworkPhoneContacts_parameters.createNetworkPhoneContacts = !!createNetworkPhoneContacts_parameters.createNetworkPhoneContacts ? createNetworkPhoneContacts_parameters.createNetworkPhoneContacts : msg.payload;
                                result = client.createNetworkPhoneContacts(createNetworkPhoneContacts_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkPhoneContact') {
                var updateNetworkPhoneContact_parameters = [];
                var updateNetworkPhoneContact_nodeParam;
                var updateNetworkPhoneContact_nodeParamType;

                updateNetworkPhoneContact_nodeParam = node.updateNetworkPhoneContact_networkId;
                updateNetworkPhoneContact_nodeParamType = node.updateNetworkPhoneContact_networkIdType;
                if (updateNetworkPhoneContact_nodeParamType === 'str') {
                    //updateNetworkPhoneContact_parameters.networkId = updateNetworkPhoneContact_nodeParam || '';
                    updateNetworkPhoneContact_parameters.networkId = updateNetworkPhoneContact_nodeParam || undefined;
                } else {
                    updateNetworkPhoneContact_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkPhoneContact_nodeParam);
                }
                //updateNetworkPhoneContact_parameters.networkId = !!updateNetworkPhoneContact_parameters.networkId ? updateNetworkPhoneContact_parameters.networkId : msg.payload;
                
                updateNetworkPhoneContact_nodeParam = node.updateNetworkPhoneContact_contactId;
                updateNetworkPhoneContact_nodeParamType = node.updateNetworkPhoneContact_contactIdType;
                if (updateNetworkPhoneContact_nodeParamType === 'str') {
                    //updateNetworkPhoneContact_parameters.contactId = updateNetworkPhoneContact_nodeParam || '';
                    updateNetworkPhoneContact_parameters.contactId = updateNetworkPhoneContact_nodeParam || undefined;
                } else {
                    updateNetworkPhoneContact_parameters.contactId = RED.util.getMessageProperty(msg, updateNetworkPhoneContact_nodeParam);
                }
                //updateNetworkPhoneContact_parameters.contactId = !!updateNetworkPhoneContact_parameters.contactId ? updateNetworkPhoneContact_parameters.contactId : msg.payload;
                
                updateNetworkPhoneContact_nodeParam = node.updateNetworkPhoneContact_updateNetworkPhoneContact;
                updateNetworkPhoneContact_nodeParamType = node.updateNetworkPhoneContact_updateNetworkPhoneContactType;
                if (updateNetworkPhoneContact_nodeParamType === 'str') {
                    //updateNetworkPhoneContact_parameters.updateNetworkPhoneContact = updateNetworkPhoneContact_nodeParam || '';
                    updateNetworkPhoneContact_parameters.updateNetworkPhoneContact = updateNetworkPhoneContact_nodeParam || undefined;
                } else {
                    updateNetworkPhoneContact_parameters.updateNetworkPhoneContact = RED.util.getMessageProperty(msg, updateNetworkPhoneContact_nodeParam);
                }
                //updateNetworkPhoneContact_parameters.updateNetworkPhoneContact = !!updateNetworkPhoneContact_parameters.updateNetworkPhoneContact ? updateNetworkPhoneContact_parameters.updateNetworkPhoneContact : msg.payload;
                                result = client.updateNetworkPhoneContact(updateNetworkPhoneContact_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkPhoneContact') {
                var deleteNetworkPhoneContact_parameters = [];
                var deleteNetworkPhoneContact_nodeParam;
                var deleteNetworkPhoneContact_nodeParamType;

                deleteNetworkPhoneContact_nodeParam = node.deleteNetworkPhoneContact_networkId;
                deleteNetworkPhoneContact_nodeParamType = node.deleteNetworkPhoneContact_networkIdType;
                if (deleteNetworkPhoneContact_nodeParamType === 'str') {
                    //deleteNetworkPhoneContact_parameters.networkId = deleteNetworkPhoneContact_nodeParam || '';
                    deleteNetworkPhoneContact_parameters.networkId = deleteNetworkPhoneContact_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneContact_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkPhoneContact_nodeParam);
                }
                //deleteNetworkPhoneContact_parameters.networkId = !!deleteNetworkPhoneContact_parameters.networkId ? deleteNetworkPhoneContact_parameters.networkId : msg.payload;
                
                deleteNetworkPhoneContact_nodeParam = node.deleteNetworkPhoneContact_contactId;
                deleteNetworkPhoneContact_nodeParamType = node.deleteNetworkPhoneContact_contactIdType;
                if (deleteNetworkPhoneContact_nodeParamType === 'str') {
                    //deleteNetworkPhoneContact_parameters.contactId = deleteNetworkPhoneContact_nodeParam || '';
                    deleteNetworkPhoneContact_parameters.contactId = deleteNetworkPhoneContact_nodeParam || undefined;
                } else {
                    deleteNetworkPhoneContact_parameters.contactId = RED.util.getMessageProperty(msg, deleteNetworkPhoneContact_nodeParam);
                }
                //deleteNetworkPhoneContact_parameters.contactId = !!deleteNetworkPhoneContact_parameters.contactId ? deleteNetworkPhoneContact_parameters.contactId : msg.payload;
                                result = client.deleteNetworkPhoneContact(deleteNetworkPhoneContact_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneNumbers') {
                var getNetworkPhoneNumbers_parameters = [];
                var getNetworkPhoneNumbers_nodeParam;
                var getNetworkPhoneNumbers_nodeParamType;

                getNetworkPhoneNumbers_nodeParam = node.getNetworkPhoneNumbers_networkId;
                getNetworkPhoneNumbers_nodeParamType = node.getNetworkPhoneNumbers_networkIdType;
                if (getNetworkPhoneNumbers_nodeParamType === 'str') {
                    //getNetworkPhoneNumbers_parameters.networkId = getNetworkPhoneNumbers_nodeParam || '';
                    getNetworkPhoneNumbers_parameters.networkId = getNetworkPhoneNumbers_nodeParam || undefined;
                } else {
                    getNetworkPhoneNumbers_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneNumbers_nodeParam);
                }
                //getNetworkPhoneNumbers_parameters.networkId = !!getNetworkPhoneNumbers_parameters.networkId ? getNetworkPhoneNumbers_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneNumbers(getNetworkPhoneNumbers_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPhoneNumbersAvailable') {
                var getNetworkPhoneNumbersAvailable_parameters = [];
                var getNetworkPhoneNumbersAvailable_nodeParam;
                var getNetworkPhoneNumbersAvailable_nodeParamType;

                getNetworkPhoneNumbersAvailable_nodeParam = node.getNetworkPhoneNumbersAvailable_networkId;
                getNetworkPhoneNumbersAvailable_nodeParamType = node.getNetworkPhoneNumbersAvailable_networkIdType;
                if (getNetworkPhoneNumbersAvailable_nodeParamType === 'str') {
                    //getNetworkPhoneNumbersAvailable_parameters.networkId = getNetworkPhoneNumbersAvailable_nodeParam || '';
                    getNetworkPhoneNumbersAvailable_parameters.networkId = getNetworkPhoneNumbersAvailable_nodeParam || undefined;
                } else {
                    getNetworkPhoneNumbersAvailable_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPhoneNumbersAvailable_nodeParam);
                }
                //getNetworkPhoneNumbersAvailable_parameters.networkId = !!getNetworkPhoneNumbersAvailable_parameters.networkId ? getNetworkPhoneNumbersAvailable_parameters.networkId : msg.payload;
                                result = client.getNetworkPhoneNumbersAvailable(getNetworkPhoneNumbersAvailable_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPiiPiiKeys') {
                var getNetworkPiiPiiKeys_parameters = [];
                var getNetworkPiiPiiKeys_nodeParam;
                var getNetworkPiiPiiKeys_nodeParamType;

                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_networkId;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_networkIdType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.networkId = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.networkId = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.networkId = !!getNetworkPiiPiiKeys_parameters.networkId ? getNetworkPiiPiiKeys_parameters.networkId : msg.payload;
                
                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_username;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_usernameType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.username = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.username = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.username = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.username = !!getNetworkPiiPiiKeys_parameters.username ? getNetworkPiiPiiKeys_parameters.username : msg.payload;
                
                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_email;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_emailType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.email = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.email = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.email = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.email = !!getNetworkPiiPiiKeys_parameters.email ? getNetworkPiiPiiKeys_parameters.email : msg.payload;
                
                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_mac;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_macType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.mac = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.mac = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.mac = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.mac = !!getNetworkPiiPiiKeys_parameters.mac ? getNetworkPiiPiiKeys_parameters.mac : msg.payload;
                
                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_serial;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_serialType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.serial = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.serial = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.serial = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.serial = !!getNetworkPiiPiiKeys_parameters.serial ? getNetworkPiiPiiKeys_parameters.serial : msg.payload;
                
                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_imei;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_imeiType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.imei = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.imei = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.imei = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.imei = !!getNetworkPiiPiiKeys_parameters.imei ? getNetworkPiiPiiKeys_parameters.imei : msg.payload;
                
                getNetworkPiiPiiKeys_nodeParam = node.getNetworkPiiPiiKeys_bluetoothMac;
                getNetworkPiiPiiKeys_nodeParamType = node.getNetworkPiiPiiKeys_bluetoothMacType;
                if (getNetworkPiiPiiKeys_nodeParamType === 'str') {
                    //getNetworkPiiPiiKeys_parameters.bluetoothMac = getNetworkPiiPiiKeys_nodeParam || '';
                    getNetworkPiiPiiKeys_parameters.bluetoothMac = getNetworkPiiPiiKeys_nodeParam || undefined;
                } else {
                    getNetworkPiiPiiKeys_parameters.bluetoothMac = RED.util.getMessageProperty(msg, getNetworkPiiPiiKeys_nodeParam);
                }
                //getNetworkPiiPiiKeys_parameters.bluetoothMac = !!getNetworkPiiPiiKeys_parameters.bluetoothMac ? getNetworkPiiPiiKeys_parameters.bluetoothMac : msg.payload;
                                result = client.getNetworkPiiPiiKeys(getNetworkPiiPiiKeys_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPiiSmDevicesForKey') {
                var getNetworkPiiSmDevicesForKey_parameters = [];
                var getNetworkPiiSmDevicesForKey_nodeParam;
                var getNetworkPiiSmDevicesForKey_nodeParamType;

                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_networkId;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_networkIdType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.networkId = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.networkId = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.networkId = !!getNetworkPiiSmDevicesForKey_parameters.networkId ? getNetworkPiiSmDevicesForKey_parameters.networkId : msg.payload;
                
                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_username;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_usernameType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.username = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.username = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.username = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.username = !!getNetworkPiiSmDevicesForKey_parameters.username ? getNetworkPiiSmDevicesForKey_parameters.username : msg.payload;
                
                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_email;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_emailType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.email = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.email = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.email = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.email = !!getNetworkPiiSmDevicesForKey_parameters.email ? getNetworkPiiSmDevicesForKey_parameters.email : msg.payload;
                
                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_mac;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_macType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.mac = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.mac = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.mac = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.mac = !!getNetworkPiiSmDevicesForKey_parameters.mac ? getNetworkPiiSmDevicesForKey_parameters.mac : msg.payload;
                
                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_serial;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_serialType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.serial = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.serial = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.serial = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.serial = !!getNetworkPiiSmDevicesForKey_parameters.serial ? getNetworkPiiSmDevicesForKey_parameters.serial : msg.payload;
                
                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_imei;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_imeiType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.imei = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.imei = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.imei = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.imei = !!getNetworkPiiSmDevicesForKey_parameters.imei ? getNetworkPiiSmDevicesForKey_parameters.imei : msg.payload;
                
                getNetworkPiiSmDevicesForKey_nodeParam = node.getNetworkPiiSmDevicesForKey_bluetoothMac;
                getNetworkPiiSmDevicesForKey_nodeParamType = node.getNetworkPiiSmDevicesForKey_bluetoothMacType;
                if (getNetworkPiiSmDevicesForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmDevicesForKey_parameters.bluetoothMac = getNetworkPiiSmDevicesForKey_nodeParam || '';
                    getNetworkPiiSmDevicesForKey_parameters.bluetoothMac = getNetworkPiiSmDevicesForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmDevicesForKey_parameters.bluetoothMac = RED.util.getMessageProperty(msg, getNetworkPiiSmDevicesForKey_nodeParam);
                }
                //getNetworkPiiSmDevicesForKey_parameters.bluetoothMac = !!getNetworkPiiSmDevicesForKey_parameters.bluetoothMac ? getNetworkPiiSmDevicesForKey_parameters.bluetoothMac : msg.payload;
                                result = client.getNetworkPiiSmDevicesForKey(getNetworkPiiSmDevicesForKey_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPiiSmOwnersForKey') {
                var getNetworkPiiSmOwnersForKey_parameters = [];
                var getNetworkPiiSmOwnersForKey_nodeParam;
                var getNetworkPiiSmOwnersForKey_nodeParamType;

                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_networkId;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_networkIdType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.networkId = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.networkId = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.networkId = !!getNetworkPiiSmOwnersForKey_parameters.networkId ? getNetworkPiiSmOwnersForKey_parameters.networkId : msg.payload;
                
                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_username;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_usernameType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.username = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.username = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.username = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.username = !!getNetworkPiiSmOwnersForKey_parameters.username ? getNetworkPiiSmOwnersForKey_parameters.username : msg.payload;
                
                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_email;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_emailType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.email = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.email = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.email = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.email = !!getNetworkPiiSmOwnersForKey_parameters.email ? getNetworkPiiSmOwnersForKey_parameters.email : msg.payload;
                
                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_mac;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_macType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.mac = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.mac = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.mac = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.mac = !!getNetworkPiiSmOwnersForKey_parameters.mac ? getNetworkPiiSmOwnersForKey_parameters.mac : msg.payload;
                
                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_serial;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_serialType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.serial = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.serial = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.serial = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.serial = !!getNetworkPiiSmOwnersForKey_parameters.serial ? getNetworkPiiSmOwnersForKey_parameters.serial : msg.payload;
                
                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_imei;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_imeiType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.imei = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.imei = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.imei = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.imei = !!getNetworkPiiSmOwnersForKey_parameters.imei ? getNetworkPiiSmOwnersForKey_parameters.imei : msg.payload;
                
                getNetworkPiiSmOwnersForKey_nodeParam = node.getNetworkPiiSmOwnersForKey_bluetoothMac;
                getNetworkPiiSmOwnersForKey_nodeParamType = node.getNetworkPiiSmOwnersForKey_bluetoothMacType;
                if (getNetworkPiiSmOwnersForKey_nodeParamType === 'str') {
                    //getNetworkPiiSmOwnersForKey_parameters.bluetoothMac = getNetworkPiiSmOwnersForKey_nodeParam || '';
                    getNetworkPiiSmOwnersForKey_parameters.bluetoothMac = getNetworkPiiSmOwnersForKey_nodeParam || undefined;
                } else {
                    getNetworkPiiSmOwnersForKey_parameters.bluetoothMac = RED.util.getMessageProperty(msg, getNetworkPiiSmOwnersForKey_nodeParam);
                }
                //getNetworkPiiSmOwnersForKey_parameters.bluetoothMac = !!getNetworkPiiSmOwnersForKey_parameters.bluetoothMac ? getNetworkPiiSmOwnersForKey_parameters.bluetoothMac : msg.payload;
                                result = client.getNetworkPiiSmOwnersForKey(getNetworkPiiSmOwnersForKey_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPiiRequests') {
                var getNetworkPiiRequests_parameters = [];
                var getNetworkPiiRequests_nodeParam;
                var getNetworkPiiRequests_nodeParamType;

                getNetworkPiiRequests_nodeParam = node.getNetworkPiiRequests_networkId;
                getNetworkPiiRequests_nodeParamType = node.getNetworkPiiRequests_networkIdType;
                if (getNetworkPiiRequests_nodeParamType === 'str') {
                    //getNetworkPiiRequests_parameters.networkId = getNetworkPiiRequests_nodeParam || '';
                    getNetworkPiiRequests_parameters.networkId = getNetworkPiiRequests_nodeParam || undefined;
                } else {
                    getNetworkPiiRequests_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPiiRequests_nodeParam);
                }
                //getNetworkPiiRequests_parameters.networkId = !!getNetworkPiiRequests_parameters.networkId ? getNetworkPiiRequests_parameters.networkId : msg.payload;
                                result = client.getNetworkPiiRequests(getNetworkPiiRequests_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkPiiRequests') {
                var createNetworkPiiRequests_parameters = [];
                var createNetworkPiiRequests_nodeParam;
                var createNetworkPiiRequests_nodeParamType;

                createNetworkPiiRequests_nodeParam = node.createNetworkPiiRequests_networkId;
                createNetworkPiiRequests_nodeParamType = node.createNetworkPiiRequests_networkIdType;
                if (createNetworkPiiRequests_nodeParamType === 'str') {
                    //createNetworkPiiRequests_parameters.networkId = createNetworkPiiRequests_nodeParam || '';
                    createNetworkPiiRequests_parameters.networkId = createNetworkPiiRequests_nodeParam || undefined;
                } else {
                    createNetworkPiiRequests_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkPiiRequests_nodeParam);
                }
                //createNetworkPiiRequests_parameters.networkId = !!createNetworkPiiRequests_parameters.networkId ? createNetworkPiiRequests_parameters.networkId : msg.payload;
                
                createNetworkPiiRequests_nodeParam = node.createNetworkPiiRequests_createNetworkPiiRequests;
                createNetworkPiiRequests_nodeParamType = node.createNetworkPiiRequests_createNetworkPiiRequestsType;
                if (createNetworkPiiRequests_nodeParamType === 'str') {
                    //createNetworkPiiRequests_parameters.createNetworkPiiRequests = createNetworkPiiRequests_nodeParam || '';
                    createNetworkPiiRequests_parameters.createNetworkPiiRequests = createNetworkPiiRequests_nodeParam || undefined;
                } else {
                    createNetworkPiiRequests_parameters.createNetworkPiiRequests = RED.util.getMessageProperty(msg, createNetworkPiiRequests_nodeParam);
                }
                //createNetworkPiiRequests_parameters.createNetworkPiiRequests = !!createNetworkPiiRequests_parameters.createNetworkPiiRequests ? createNetworkPiiRequests_parameters.createNetworkPiiRequests : msg.payload;
                                result = client.createNetworkPiiRequests(createNetworkPiiRequests_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPiiRequest') {
                var getNetworkPiiRequest_parameters = [];
                var getNetworkPiiRequest_nodeParam;
                var getNetworkPiiRequest_nodeParamType;

                getNetworkPiiRequest_nodeParam = node.getNetworkPiiRequest_networkId;
                getNetworkPiiRequest_nodeParamType = node.getNetworkPiiRequest_networkIdType;
                if (getNetworkPiiRequest_nodeParamType === 'str') {
                    //getNetworkPiiRequest_parameters.networkId = getNetworkPiiRequest_nodeParam || '';
                    getNetworkPiiRequest_parameters.networkId = getNetworkPiiRequest_nodeParam || undefined;
                } else {
                    getNetworkPiiRequest_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPiiRequest_nodeParam);
                }
                //getNetworkPiiRequest_parameters.networkId = !!getNetworkPiiRequest_parameters.networkId ? getNetworkPiiRequest_parameters.networkId : msg.payload;
                
                getNetworkPiiRequest_nodeParam = node.getNetworkPiiRequest_id;
                getNetworkPiiRequest_nodeParamType = node.getNetworkPiiRequest_idType;
                if (getNetworkPiiRequest_nodeParamType === 'str') {
                    //getNetworkPiiRequest_parameters.id = getNetworkPiiRequest_nodeParam || '';
                    getNetworkPiiRequest_parameters.id = getNetworkPiiRequest_nodeParam || undefined;
                } else {
                    getNetworkPiiRequest_parameters.id = RED.util.getMessageProperty(msg, getNetworkPiiRequest_nodeParam);
                }
                //getNetworkPiiRequest_parameters.id = !!getNetworkPiiRequest_parameters.id ? getNetworkPiiRequest_parameters.id : msg.payload;
                                result = client.getNetworkPiiRequest(getNetworkPiiRequest_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkPiiRequest') {
                var deleteNetworkPiiRequest_parameters = [];
                var deleteNetworkPiiRequest_nodeParam;
                var deleteNetworkPiiRequest_nodeParamType;

                deleteNetworkPiiRequest_nodeParam = node.deleteNetworkPiiRequest_networkId;
                deleteNetworkPiiRequest_nodeParamType = node.deleteNetworkPiiRequest_networkIdType;
                if (deleteNetworkPiiRequest_nodeParamType === 'str') {
                    //deleteNetworkPiiRequest_parameters.networkId = deleteNetworkPiiRequest_nodeParam || '';
                    deleteNetworkPiiRequest_parameters.networkId = deleteNetworkPiiRequest_nodeParam || undefined;
                } else {
                    deleteNetworkPiiRequest_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkPiiRequest_nodeParam);
                }
                //deleteNetworkPiiRequest_parameters.networkId = !!deleteNetworkPiiRequest_parameters.networkId ? deleteNetworkPiiRequest_parameters.networkId : msg.payload;
                
                deleteNetworkPiiRequest_nodeParam = node.deleteNetworkPiiRequest_id;
                deleteNetworkPiiRequest_nodeParamType = node.deleteNetworkPiiRequest_idType;
                if (deleteNetworkPiiRequest_nodeParamType === 'str') {
                    //deleteNetworkPiiRequest_parameters.id = deleteNetworkPiiRequest_nodeParam || '';
                    deleteNetworkPiiRequest_parameters.id = deleteNetworkPiiRequest_nodeParam || undefined;
                } else {
                    deleteNetworkPiiRequest_parameters.id = RED.util.getMessageProperty(msg, deleteNetworkPiiRequest_nodeParam);
                }
                //deleteNetworkPiiRequest_parameters.id = !!deleteNetworkPiiRequest_parameters.id ? deleteNetworkPiiRequest_parameters.id : msg.payload;
                                result = client.deleteNetworkPiiRequest(deleteNetworkPiiRequest_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationSamlRoles') {
                var getOrganizationSamlRoles_parameters = [];
                var getOrganizationSamlRoles_nodeParam;
                var getOrganizationSamlRoles_nodeParamType;

                getOrganizationSamlRoles_nodeParam = node.getOrganizationSamlRoles_organizationId;
                getOrganizationSamlRoles_nodeParamType = node.getOrganizationSamlRoles_organizationIdType;
                if (getOrganizationSamlRoles_nodeParamType === 'str') {
                    //getOrganizationSamlRoles_parameters.organizationId = getOrganizationSamlRoles_nodeParam || '';
                    getOrganizationSamlRoles_parameters.organizationId = getOrganizationSamlRoles_nodeParam || undefined;
                } else {
                    getOrganizationSamlRoles_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationSamlRoles_nodeParam);
                }
                //getOrganizationSamlRoles_parameters.organizationId = !!getOrganizationSamlRoles_parameters.organizationId ? getOrganizationSamlRoles_parameters.organizationId : msg.payload;
                                result = client.getOrganizationSamlRoles(getOrganizationSamlRoles_parameters);
            }
            if (!errorFlag && node.method === 'createOrganizationSamlRoles') {
                var createOrganizationSamlRoles_parameters = [];
                var createOrganizationSamlRoles_nodeParam;
                var createOrganizationSamlRoles_nodeParamType;

                createOrganizationSamlRoles_nodeParam = node.createOrganizationSamlRoles_organizationId;
                createOrganizationSamlRoles_nodeParamType = node.createOrganizationSamlRoles_organizationIdType;
                if (createOrganizationSamlRoles_nodeParamType === 'str') {
                    //createOrganizationSamlRoles_parameters.organizationId = createOrganizationSamlRoles_nodeParam || '';
                    createOrganizationSamlRoles_parameters.organizationId = createOrganizationSamlRoles_nodeParam || undefined;
                } else {
                    createOrganizationSamlRoles_parameters.organizationId = RED.util.getMessageProperty(msg, createOrganizationSamlRoles_nodeParam);
                }
                //createOrganizationSamlRoles_parameters.organizationId = !!createOrganizationSamlRoles_parameters.organizationId ? createOrganizationSamlRoles_parameters.organizationId : msg.payload;
                
                createOrganizationSamlRoles_nodeParam = node.createOrganizationSamlRoles_createOrganizationSamlRoles;
                createOrganizationSamlRoles_nodeParamType = node.createOrganizationSamlRoles_createOrganizationSamlRolesType;
                if (createOrganizationSamlRoles_nodeParamType === 'str') {
                    //createOrganizationSamlRoles_parameters.createOrganizationSamlRoles = createOrganizationSamlRoles_nodeParam || '';
                    createOrganizationSamlRoles_parameters.createOrganizationSamlRoles = createOrganizationSamlRoles_nodeParam || undefined;
                } else {
                    createOrganizationSamlRoles_parameters.createOrganizationSamlRoles = RED.util.getMessageProperty(msg, createOrganizationSamlRoles_nodeParam);
                }
                //createOrganizationSamlRoles_parameters.createOrganizationSamlRoles = !!createOrganizationSamlRoles_parameters.createOrganizationSamlRoles ? createOrganizationSamlRoles_parameters.createOrganizationSamlRoles : msg.payload;
                                result = client.createOrganizationSamlRoles(createOrganizationSamlRoles_parameters);
            }
            if (!errorFlag && node.method === 'getOrganizationSamlRole') {
                var getOrganizationSamlRole_parameters = [];
                var getOrganizationSamlRole_nodeParam;
                var getOrganizationSamlRole_nodeParamType;

                getOrganizationSamlRole_nodeParam = node.getOrganizationSamlRole_organizationId;
                getOrganizationSamlRole_nodeParamType = node.getOrganizationSamlRole_organizationIdType;
                if (getOrganizationSamlRole_nodeParamType === 'str') {
                    //getOrganizationSamlRole_parameters.organizationId = getOrganizationSamlRole_nodeParam || '';
                    getOrganizationSamlRole_parameters.organizationId = getOrganizationSamlRole_nodeParam || undefined;
                } else {
                    getOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, getOrganizationSamlRole_nodeParam);
                }
                //getOrganizationSamlRole_parameters.organizationId = !!getOrganizationSamlRole_parameters.organizationId ? getOrganizationSamlRole_parameters.organizationId : msg.payload;
                
                getOrganizationSamlRole_nodeParam = node.getOrganizationSamlRole_id;
                getOrganizationSamlRole_nodeParamType = node.getOrganizationSamlRole_idType;
                if (getOrganizationSamlRole_nodeParamType === 'str') {
                    //getOrganizationSamlRole_parameters.id = getOrganizationSamlRole_nodeParam || '';
                    getOrganizationSamlRole_parameters.id = getOrganizationSamlRole_nodeParam || undefined;
                } else {
                    getOrganizationSamlRole_parameters.id = RED.util.getMessageProperty(msg, getOrganizationSamlRole_nodeParam);
                }
                //getOrganizationSamlRole_parameters.id = !!getOrganizationSamlRole_parameters.id ? getOrganizationSamlRole_parameters.id : msg.payload;
                                result = client.getOrganizationSamlRole(getOrganizationSamlRole_parameters);
            }
            if (!errorFlag && node.method === 'updateOrganizationSamlRole') {
                var updateOrganizationSamlRole_parameters = [];
                var updateOrganizationSamlRole_nodeParam;
                var updateOrganizationSamlRole_nodeParamType;

                updateOrganizationSamlRole_nodeParam = node.updateOrganizationSamlRole_organizationId;
                updateOrganizationSamlRole_nodeParamType = node.updateOrganizationSamlRole_organizationIdType;
                if (updateOrganizationSamlRole_nodeParamType === 'str') {
                    //updateOrganizationSamlRole_parameters.organizationId = updateOrganizationSamlRole_nodeParam || '';
                    updateOrganizationSamlRole_parameters.organizationId = updateOrganizationSamlRole_nodeParam || undefined;
                } else {
                    updateOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, updateOrganizationSamlRole_nodeParam);
                }
                //updateOrganizationSamlRole_parameters.organizationId = !!updateOrganizationSamlRole_parameters.organizationId ? updateOrganizationSamlRole_parameters.organizationId : msg.payload;
                
                updateOrganizationSamlRole_nodeParam = node.updateOrganizationSamlRole_id;
                updateOrganizationSamlRole_nodeParamType = node.updateOrganizationSamlRole_idType;
                if (updateOrganizationSamlRole_nodeParamType === 'str') {
                    //updateOrganizationSamlRole_parameters.id = updateOrganizationSamlRole_nodeParam || '';
                    updateOrganizationSamlRole_parameters.id = updateOrganizationSamlRole_nodeParam || undefined;
                } else {
                    updateOrganizationSamlRole_parameters.id = RED.util.getMessageProperty(msg, updateOrganizationSamlRole_nodeParam);
                }
                //updateOrganizationSamlRole_parameters.id = !!updateOrganizationSamlRole_parameters.id ? updateOrganizationSamlRole_parameters.id : msg.payload;
                
                updateOrganizationSamlRole_nodeParam = node.updateOrganizationSamlRole_updateOrganizationSamlRole;
                updateOrganizationSamlRole_nodeParamType = node.updateOrganizationSamlRole_updateOrganizationSamlRoleType;
                if (updateOrganizationSamlRole_nodeParamType === 'str') {
                    //updateOrganizationSamlRole_parameters.updateOrganizationSamlRole = updateOrganizationSamlRole_nodeParam || '';
                    updateOrganizationSamlRole_parameters.updateOrganizationSamlRole = updateOrganizationSamlRole_nodeParam || undefined;
                } else {
                    updateOrganizationSamlRole_parameters.updateOrganizationSamlRole = RED.util.getMessageProperty(msg, updateOrganizationSamlRole_nodeParam);
                }
                //updateOrganizationSamlRole_parameters.updateOrganizationSamlRole = !!updateOrganizationSamlRole_parameters.updateOrganizationSamlRole ? updateOrganizationSamlRole_parameters.updateOrganizationSamlRole : msg.payload;
                                result = client.updateOrganizationSamlRole(updateOrganizationSamlRole_parameters);
            }
            if (!errorFlag && node.method === 'deleteOrganizationSamlRole') {
                var deleteOrganizationSamlRole_parameters = [];
                var deleteOrganizationSamlRole_nodeParam;
                var deleteOrganizationSamlRole_nodeParamType;

                deleteOrganizationSamlRole_nodeParam = node.deleteOrganizationSamlRole_organizationId;
                deleteOrganizationSamlRole_nodeParamType = node.deleteOrganizationSamlRole_organizationIdType;
                if (deleteOrganizationSamlRole_nodeParamType === 'str') {
                    //deleteOrganizationSamlRole_parameters.organizationId = deleteOrganizationSamlRole_nodeParam || '';
                    deleteOrganizationSamlRole_parameters.organizationId = deleteOrganizationSamlRole_nodeParam || undefined;
                } else {
                    deleteOrganizationSamlRole_parameters.organizationId = RED.util.getMessageProperty(msg, deleteOrganizationSamlRole_nodeParam);
                }
                //deleteOrganizationSamlRole_parameters.organizationId = !!deleteOrganizationSamlRole_parameters.organizationId ? deleteOrganizationSamlRole_parameters.organizationId : msg.payload;
                
                deleteOrganizationSamlRole_nodeParam = node.deleteOrganizationSamlRole_id;
                deleteOrganizationSamlRole_nodeParamType = node.deleteOrganizationSamlRole_idType;
                if (deleteOrganizationSamlRole_nodeParamType === 'str') {
                    //deleteOrganizationSamlRole_parameters.id = deleteOrganizationSamlRole_nodeParam || '';
                    deleteOrganizationSamlRole_parameters.id = deleteOrganizationSamlRole_nodeParam || undefined;
                } else {
                    deleteOrganizationSamlRole_parameters.id = RED.util.getMessageProperty(msg, deleteOrganizationSamlRole_nodeParam);
                }
                //deleteOrganizationSamlRole_parameters.id = !!deleteOrganizationSamlRole_parameters.id ? deleteOrganizationSamlRole_parameters.id : msg.payload;
                                result = client.deleteOrganizationSamlRole(deleteOrganizationSamlRole_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientSecurityEvents') {
                var getNetworkClientSecurityEvents_parameters = [];
                var getNetworkClientSecurityEvents_nodeParam;
                var getNetworkClientSecurityEvents_nodeParamType;

                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_networkId;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_networkIdType;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.networkId = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.networkId = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.networkId = !!getNetworkClientSecurityEvents_parameters.networkId ? getNetworkClientSecurityEvents_parameters.networkId : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_clientId;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_clientIdType;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.clientId = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.clientId = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.clientId = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.clientId = !!getNetworkClientSecurityEvents_parameters.clientId ? getNetworkClientSecurityEvents_parameters.clientId : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_t0;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_t0Type;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.t0 = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.t0 = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.t0 = !!getNetworkClientSecurityEvents_parameters.t0 ? getNetworkClientSecurityEvents_parameters.t0 : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_t1;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_t1Type;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.t1 = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.t1 = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.t1 = !!getNetworkClientSecurityEvents_parameters.t1 ? getNetworkClientSecurityEvents_parameters.t1 : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_timespan;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_timespanType;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.timespan = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.timespan = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.timespan = !!getNetworkClientSecurityEvents_parameters.timespan ? getNetworkClientSecurityEvents_parameters.timespan : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_perPage;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_perPageType;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.perPage = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.perPage = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.perPage = !!getNetworkClientSecurityEvents_parameters.perPage ? getNetworkClientSecurityEvents_parameters.perPage : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_startingAfter;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_startingAfterType;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.startingAfter = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.startingAfter = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.startingAfter = !!getNetworkClientSecurityEvents_parameters.startingAfter ? getNetworkClientSecurityEvents_parameters.startingAfter : msg.payload;
                
                getNetworkClientSecurityEvents_nodeParam = node.getNetworkClientSecurityEvents_endingBefore;
                getNetworkClientSecurityEvents_nodeParamType = node.getNetworkClientSecurityEvents_endingBeforeType;
                if (getNetworkClientSecurityEvents_nodeParamType === 'str') {
                    //getNetworkClientSecurityEvents_parameters.endingBefore = getNetworkClientSecurityEvents_nodeParam || '';
                    getNetworkClientSecurityEvents_parameters.endingBefore = getNetworkClientSecurityEvents_nodeParam || undefined;
                } else {
                    getNetworkClientSecurityEvents_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkClientSecurityEvents_nodeParam);
                }
                //getNetworkClientSecurityEvents_parameters.endingBefore = !!getNetworkClientSecurityEvents_parameters.endingBefore ? getNetworkClientSecurityEvents_parameters.endingBefore : msg.payload;
                                result = client.getNetworkClientSecurityEvents(getNetworkClientSecurityEvents_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmTargetGroups') {
                var getNetworkSmTargetGroups_parameters = [];
                var getNetworkSmTargetGroups_nodeParam;
                var getNetworkSmTargetGroups_nodeParamType;

                getNetworkSmTargetGroups_nodeParam = node.getNetworkSmTargetGroups_networkId;
                getNetworkSmTargetGroups_nodeParamType = node.getNetworkSmTargetGroups_networkIdType;
                if (getNetworkSmTargetGroups_nodeParamType === 'str') {
                    //getNetworkSmTargetGroups_parameters.networkId = getNetworkSmTargetGroups_nodeParam || '';
                    getNetworkSmTargetGroups_parameters.networkId = getNetworkSmTargetGroups_nodeParam || undefined;
                } else {
                    getNetworkSmTargetGroups_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmTargetGroups_nodeParam);
                }
                //getNetworkSmTargetGroups_parameters.networkId = !!getNetworkSmTargetGroups_parameters.networkId ? getNetworkSmTargetGroups_parameters.networkId : msg.payload;
                
                getNetworkSmTargetGroups_nodeParam = node.getNetworkSmTargetGroups_withDetails;
                getNetworkSmTargetGroups_nodeParamType = node.getNetworkSmTargetGroups_withDetailsType;
                if (getNetworkSmTargetGroups_nodeParamType === 'str') {
                    //getNetworkSmTargetGroups_parameters.withDetails = getNetworkSmTargetGroups_nodeParam || '';
                    getNetworkSmTargetGroups_parameters.withDetails = getNetworkSmTargetGroups_nodeParam || undefined;
                } else {
                    getNetworkSmTargetGroups_parameters.withDetails = RED.util.getMessageProperty(msg, getNetworkSmTargetGroups_nodeParam);
                }
                //getNetworkSmTargetGroups_parameters.withDetails = !!getNetworkSmTargetGroups_parameters.withDetails ? getNetworkSmTargetGroups_parameters.withDetails : msg.payload;
                                result = client.getNetworkSmTargetGroups(getNetworkSmTargetGroups_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkSmTargetGroups') {
                var createNetworkSmTargetGroups_parameters = [];
                var createNetworkSmTargetGroups_nodeParam;
                var createNetworkSmTargetGroups_nodeParamType;

                createNetworkSmTargetGroups_nodeParam = node.createNetworkSmTargetGroups_networkId;
                createNetworkSmTargetGroups_nodeParamType = node.createNetworkSmTargetGroups_networkIdType;
                if (createNetworkSmTargetGroups_nodeParamType === 'str') {
                    //createNetworkSmTargetGroups_parameters.networkId = createNetworkSmTargetGroups_nodeParam || '';
                    createNetworkSmTargetGroups_parameters.networkId = createNetworkSmTargetGroups_nodeParam || undefined;
                } else {
                    createNetworkSmTargetGroups_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkSmTargetGroups_nodeParam);
                }
                //createNetworkSmTargetGroups_parameters.networkId = !!createNetworkSmTargetGroups_parameters.networkId ? createNetworkSmTargetGroups_parameters.networkId : msg.payload;
                
                createNetworkSmTargetGroups_nodeParam = node.createNetworkSmTargetGroups_createNetworkSmTargetGroups;
                createNetworkSmTargetGroups_nodeParamType = node.createNetworkSmTargetGroups_createNetworkSmTargetGroupsType;
                if (createNetworkSmTargetGroups_nodeParamType === 'str') {
                    //createNetworkSmTargetGroups_parameters.createNetworkSmTargetGroups = createNetworkSmTargetGroups_nodeParam || '';
                    createNetworkSmTargetGroups_parameters.createNetworkSmTargetGroups = createNetworkSmTargetGroups_nodeParam || undefined;
                } else {
                    createNetworkSmTargetGroups_parameters.createNetworkSmTargetGroups = RED.util.getMessageProperty(msg, createNetworkSmTargetGroups_nodeParam);
                }
                //createNetworkSmTargetGroups_parameters.createNetworkSmTargetGroups = !!createNetworkSmTargetGroups_parameters.createNetworkSmTargetGroups ? createNetworkSmTargetGroups_parameters.createNetworkSmTargetGroups : msg.payload;
                                result = client.createNetworkSmTargetGroups(createNetworkSmTargetGroups_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmTargetGroup') {
                var getNetworkSmTargetGroup_parameters = [];
                var getNetworkSmTargetGroup_nodeParam;
                var getNetworkSmTargetGroup_nodeParamType;

                getNetworkSmTargetGroup_nodeParam = node.getNetworkSmTargetGroup_networkId;
                getNetworkSmTargetGroup_nodeParamType = node.getNetworkSmTargetGroup_networkIdType;
                if (getNetworkSmTargetGroup_nodeParamType === 'str') {
                    //getNetworkSmTargetGroup_parameters.networkId = getNetworkSmTargetGroup_nodeParam || '';
                    getNetworkSmTargetGroup_parameters.networkId = getNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    getNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmTargetGroup_nodeParam);
                }
                //getNetworkSmTargetGroup_parameters.networkId = !!getNetworkSmTargetGroup_parameters.networkId ? getNetworkSmTargetGroup_parameters.networkId : msg.payload;
                
                getNetworkSmTargetGroup_nodeParam = node.getNetworkSmTargetGroup_targetGroupId;
                getNetworkSmTargetGroup_nodeParamType = node.getNetworkSmTargetGroup_targetGroupIdType;
                if (getNetworkSmTargetGroup_nodeParamType === 'str') {
                    //getNetworkSmTargetGroup_parameters.targetGroupId = getNetworkSmTargetGroup_nodeParam || '';
                    getNetworkSmTargetGroup_parameters.targetGroupId = getNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    getNetworkSmTargetGroup_parameters.targetGroupId = RED.util.getMessageProperty(msg, getNetworkSmTargetGroup_nodeParam);
                }
                //getNetworkSmTargetGroup_parameters.targetGroupId = !!getNetworkSmTargetGroup_parameters.targetGroupId ? getNetworkSmTargetGroup_parameters.targetGroupId : msg.payload;
                
                getNetworkSmTargetGroup_nodeParam = node.getNetworkSmTargetGroup_withDetails;
                getNetworkSmTargetGroup_nodeParamType = node.getNetworkSmTargetGroup_withDetailsType;
                if (getNetworkSmTargetGroup_nodeParamType === 'str') {
                    //getNetworkSmTargetGroup_parameters.withDetails = getNetworkSmTargetGroup_nodeParam || '';
                    getNetworkSmTargetGroup_parameters.withDetails = getNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    getNetworkSmTargetGroup_parameters.withDetails = RED.util.getMessageProperty(msg, getNetworkSmTargetGroup_nodeParam);
                }
                //getNetworkSmTargetGroup_parameters.withDetails = !!getNetworkSmTargetGroup_parameters.withDetails ? getNetworkSmTargetGroup_parameters.withDetails : msg.payload;
                                result = client.getNetworkSmTargetGroup(getNetworkSmTargetGroup_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmTargetGroup') {
                var updateNetworkSmTargetGroup_parameters = [];
                var updateNetworkSmTargetGroup_nodeParam;
                var updateNetworkSmTargetGroup_nodeParamType;

                updateNetworkSmTargetGroup_nodeParam = node.updateNetworkSmTargetGroup_networkId;
                updateNetworkSmTargetGroup_nodeParamType = node.updateNetworkSmTargetGroup_networkIdType;
                if (updateNetworkSmTargetGroup_nodeParamType === 'str') {
                    //updateNetworkSmTargetGroup_parameters.networkId = updateNetworkSmTargetGroup_nodeParam || '';
                    updateNetworkSmTargetGroup_parameters.networkId = updateNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    updateNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmTargetGroup_nodeParam);
                }
                //updateNetworkSmTargetGroup_parameters.networkId = !!updateNetworkSmTargetGroup_parameters.networkId ? updateNetworkSmTargetGroup_parameters.networkId : msg.payload;
                
                updateNetworkSmTargetGroup_nodeParam = node.updateNetworkSmTargetGroup_targetGroupId;
                updateNetworkSmTargetGroup_nodeParamType = node.updateNetworkSmTargetGroup_targetGroupIdType;
                if (updateNetworkSmTargetGroup_nodeParamType === 'str') {
                    //updateNetworkSmTargetGroup_parameters.targetGroupId = updateNetworkSmTargetGroup_nodeParam || '';
                    updateNetworkSmTargetGroup_parameters.targetGroupId = updateNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    updateNetworkSmTargetGroup_parameters.targetGroupId = RED.util.getMessageProperty(msg, updateNetworkSmTargetGroup_nodeParam);
                }
                //updateNetworkSmTargetGroup_parameters.targetGroupId = !!updateNetworkSmTargetGroup_parameters.targetGroupId ? updateNetworkSmTargetGroup_parameters.targetGroupId : msg.payload;
                
                updateNetworkSmTargetGroup_nodeParam = node.updateNetworkSmTargetGroup_updateNetworkSmTargetGroup;
                updateNetworkSmTargetGroup_nodeParamType = node.updateNetworkSmTargetGroup_updateNetworkSmTargetGroupType;
                if (updateNetworkSmTargetGroup_nodeParamType === 'str') {
                    //updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup = updateNetworkSmTargetGroup_nodeParam || '';
                    updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup = updateNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup = RED.util.getMessageProperty(msg, updateNetworkSmTargetGroup_nodeParam);
                }
                //updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup = !!updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup ? updateNetworkSmTargetGroup_parameters.updateNetworkSmTargetGroup : msg.payload;
                                result = client.updateNetworkSmTargetGroup(updateNetworkSmTargetGroup_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmTargetGroup') {
                var deleteNetworkSmTargetGroup_parameters = [];
                var deleteNetworkSmTargetGroup_nodeParam;
                var deleteNetworkSmTargetGroup_nodeParamType;

                deleteNetworkSmTargetGroup_nodeParam = node.deleteNetworkSmTargetGroup_networkId;
                deleteNetworkSmTargetGroup_nodeParamType = node.deleteNetworkSmTargetGroup_networkIdType;
                if (deleteNetworkSmTargetGroup_nodeParamType === 'str') {
                    //deleteNetworkSmTargetGroup_parameters.networkId = deleteNetworkSmTargetGroup_nodeParam || '';
                    deleteNetworkSmTargetGroup_parameters.networkId = deleteNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    deleteNetworkSmTargetGroup_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkSmTargetGroup_nodeParam);
                }
                //deleteNetworkSmTargetGroup_parameters.networkId = !!deleteNetworkSmTargetGroup_parameters.networkId ? deleteNetworkSmTargetGroup_parameters.networkId : msg.payload;
                
                deleteNetworkSmTargetGroup_nodeParam = node.deleteNetworkSmTargetGroup_targetGroupId;
                deleteNetworkSmTargetGroup_nodeParamType = node.deleteNetworkSmTargetGroup_targetGroupIdType;
                if (deleteNetworkSmTargetGroup_nodeParamType === 'str') {
                    //deleteNetworkSmTargetGroup_parameters.targetGroupId = deleteNetworkSmTargetGroup_nodeParam || '';
                    deleteNetworkSmTargetGroup_parameters.targetGroupId = deleteNetworkSmTargetGroup_nodeParam || undefined;
                } else {
                    deleteNetworkSmTargetGroup_parameters.targetGroupId = RED.util.getMessageProperty(msg, deleteNetworkSmTargetGroup_nodeParam);
                }
                //deleteNetworkSmTargetGroup_parameters.targetGroupId = !!deleteNetworkSmTargetGroup_parameters.targetGroupId ? deleteNetworkSmTargetGroup_parameters.targetGroupId : msg.payload;
                                result = client.deleteNetworkSmTargetGroup(deleteNetworkSmTargetGroup_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkSmProfileClarity') {
                var createNetworkSmProfileClarity_parameters = [];
                var createNetworkSmProfileClarity_nodeParam;
                var createNetworkSmProfileClarity_nodeParamType;

                createNetworkSmProfileClarity_nodeParam = node.createNetworkSmProfileClarity_networkId;
                createNetworkSmProfileClarity_nodeParamType = node.createNetworkSmProfileClarity_networkIdType;
                if (createNetworkSmProfileClarity_nodeParamType === 'str') {
                    //createNetworkSmProfileClarity_parameters.networkId = createNetworkSmProfileClarity_nodeParam || '';
                    createNetworkSmProfileClarity_parameters.networkId = createNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    createNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkSmProfileClarity_nodeParam);
                }
                //createNetworkSmProfileClarity_parameters.networkId = !!createNetworkSmProfileClarity_parameters.networkId ? createNetworkSmProfileClarity_parameters.networkId : msg.payload;
                
                createNetworkSmProfileClarity_nodeParam = node.createNetworkSmProfileClarity_createNetworkSmProfileClarity;
                createNetworkSmProfileClarity_nodeParamType = node.createNetworkSmProfileClarity_createNetworkSmProfileClarityType;
                if (createNetworkSmProfileClarity_nodeParamType === 'str') {
                    //createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity = createNetworkSmProfileClarity_nodeParam || '';
                    createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity = createNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity = RED.util.getMessageProperty(msg, createNetworkSmProfileClarity_nodeParam);
                }
                //createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity = !!createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity ? createNetworkSmProfileClarity_parameters.createNetworkSmProfileClarity : msg.payload;
                                result = client.createNetworkSmProfileClarity(createNetworkSmProfileClarity_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmProfileClarity') {
                var updateNetworkSmProfileClarity_parameters = [];
                var updateNetworkSmProfileClarity_nodeParam;
                var updateNetworkSmProfileClarity_nodeParamType;

                updateNetworkSmProfileClarity_nodeParam = node.updateNetworkSmProfileClarity_networkId;
                updateNetworkSmProfileClarity_nodeParamType = node.updateNetworkSmProfileClarity_networkIdType;
                if (updateNetworkSmProfileClarity_nodeParamType === 'str') {
                    //updateNetworkSmProfileClarity_parameters.networkId = updateNetworkSmProfileClarity_nodeParam || '';
                    updateNetworkSmProfileClarity_parameters.networkId = updateNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    updateNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmProfileClarity_nodeParam);
                }
                //updateNetworkSmProfileClarity_parameters.networkId = !!updateNetworkSmProfileClarity_parameters.networkId ? updateNetworkSmProfileClarity_parameters.networkId : msg.payload;
                
                updateNetworkSmProfileClarity_nodeParam = node.updateNetworkSmProfileClarity_profileId;
                updateNetworkSmProfileClarity_nodeParamType = node.updateNetworkSmProfileClarity_profileIdType;
                if (updateNetworkSmProfileClarity_nodeParamType === 'str') {
                    //updateNetworkSmProfileClarity_parameters.profileId = updateNetworkSmProfileClarity_nodeParam || '';
                    updateNetworkSmProfileClarity_parameters.profileId = updateNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    updateNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, updateNetworkSmProfileClarity_nodeParam);
                }
                //updateNetworkSmProfileClarity_parameters.profileId = !!updateNetworkSmProfileClarity_parameters.profileId ? updateNetworkSmProfileClarity_parameters.profileId : msg.payload;
                
                updateNetworkSmProfileClarity_nodeParam = node.updateNetworkSmProfileClarity_updateNetworkSmProfileClarity;
                updateNetworkSmProfileClarity_nodeParamType = node.updateNetworkSmProfileClarity_updateNetworkSmProfileClarityType;
                if (updateNetworkSmProfileClarity_nodeParamType === 'str') {
                    //updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity = updateNetworkSmProfileClarity_nodeParam || '';
                    updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity = updateNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity = RED.util.getMessageProperty(msg, updateNetworkSmProfileClarity_nodeParam);
                }
                //updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity = !!updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity ? updateNetworkSmProfileClarity_parameters.updateNetworkSmProfileClarity : msg.payload;
                                result = client.updateNetworkSmProfileClarity(updateNetworkSmProfileClarity_parameters);
            }
            if (!errorFlag && node.method === 'addNetworkSmProfileClarity') {
                var addNetworkSmProfileClarity_parameters = [];
                var addNetworkSmProfileClarity_nodeParam;
                var addNetworkSmProfileClarity_nodeParamType;

                addNetworkSmProfileClarity_nodeParam = node.addNetworkSmProfileClarity_networkId;
                addNetworkSmProfileClarity_nodeParamType = node.addNetworkSmProfileClarity_networkIdType;
                if (addNetworkSmProfileClarity_nodeParamType === 'str') {
                    //addNetworkSmProfileClarity_parameters.networkId = addNetworkSmProfileClarity_nodeParam || '';
                    addNetworkSmProfileClarity_parameters.networkId = addNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    addNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, addNetworkSmProfileClarity_nodeParam);
                }
                //addNetworkSmProfileClarity_parameters.networkId = !!addNetworkSmProfileClarity_parameters.networkId ? addNetworkSmProfileClarity_parameters.networkId : msg.payload;
                
                addNetworkSmProfileClarity_nodeParam = node.addNetworkSmProfileClarity_profileId;
                addNetworkSmProfileClarity_nodeParamType = node.addNetworkSmProfileClarity_profileIdType;
                if (addNetworkSmProfileClarity_nodeParamType === 'str') {
                    //addNetworkSmProfileClarity_parameters.profileId = addNetworkSmProfileClarity_nodeParam || '';
                    addNetworkSmProfileClarity_parameters.profileId = addNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    addNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, addNetworkSmProfileClarity_nodeParam);
                }
                //addNetworkSmProfileClarity_parameters.profileId = !!addNetworkSmProfileClarity_parameters.profileId ? addNetworkSmProfileClarity_parameters.profileId : msg.payload;
                
                addNetworkSmProfileClarity_nodeParam = node.addNetworkSmProfileClarity_addNetworkSmProfileClarity;
                addNetworkSmProfileClarity_nodeParamType = node.addNetworkSmProfileClarity_addNetworkSmProfileClarityType;
                if (addNetworkSmProfileClarity_nodeParamType === 'str') {
                    //addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity = addNetworkSmProfileClarity_nodeParam || '';
                    addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity = addNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity = RED.util.getMessageProperty(msg, addNetworkSmProfileClarity_nodeParam);
                }
                //addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity = !!addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity ? addNetworkSmProfileClarity_parameters.addNetworkSmProfileClarity : msg.payload;
                                result = client.addNetworkSmProfileClarity(addNetworkSmProfileClarity_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmProfileClarity') {
                var getNetworkSmProfileClarity_parameters = [];
                var getNetworkSmProfileClarity_nodeParam;
                var getNetworkSmProfileClarity_nodeParamType;

                getNetworkSmProfileClarity_nodeParam = node.getNetworkSmProfileClarity_networkId;
                getNetworkSmProfileClarity_nodeParamType = node.getNetworkSmProfileClarity_networkIdType;
                if (getNetworkSmProfileClarity_nodeParamType === 'str') {
                    //getNetworkSmProfileClarity_parameters.networkId = getNetworkSmProfileClarity_nodeParam || '';
                    getNetworkSmProfileClarity_parameters.networkId = getNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    getNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmProfileClarity_nodeParam);
                }
                //getNetworkSmProfileClarity_parameters.networkId = !!getNetworkSmProfileClarity_parameters.networkId ? getNetworkSmProfileClarity_parameters.networkId : msg.payload;
                
                getNetworkSmProfileClarity_nodeParam = node.getNetworkSmProfileClarity_profileId;
                getNetworkSmProfileClarity_nodeParamType = node.getNetworkSmProfileClarity_profileIdType;
                if (getNetworkSmProfileClarity_nodeParamType === 'str') {
                    //getNetworkSmProfileClarity_parameters.profileId = getNetworkSmProfileClarity_nodeParam || '';
                    getNetworkSmProfileClarity_parameters.profileId = getNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    getNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, getNetworkSmProfileClarity_nodeParam);
                }
                //getNetworkSmProfileClarity_parameters.profileId = !!getNetworkSmProfileClarity_parameters.profileId ? getNetworkSmProfileClarity_parameters.profileId : msg.payload;
                                result = client.getNetworkSmProfileClarity(getNetworkSmProfileClarity_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmProfileClarity') {
                var deleteNetworkSmProfileClarity_parameters = [];
                var deleteNetworkSmProfileClarity_nodeParam;
                var deleteNetworkSmProfileClarity_nodeParamType;

                deleteNetworkSmProfileClarity_nodeParam = node.deleteNetworkSmProfileClarity_networkId;
                deleteNetworkSmProfileClarity_nodeParamType = node.deleteNetworkSmProfileClarity_networkIdType;
                if (deleteNetworkSmProfileClarity_nodeParamType === 'str') {
                    //deleteNetworkSmProfileClarity_parameters.networkId = deleteNetworkSmProfileClarity_nodeParam || '';
                    deleteNetworkSmProfileClarity_parameters.networkId = deleteNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    deleteNetworkSmProfileClarity_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkSmProfileClarity_nodeParam);
                }
                //deleteNetworkSmProfileClarity_parameters.networkId = !!deleteNetworkSmProfileClarity_parameters.networkId ? deleteNetworkSmProfileClarity_parameters.networkId : msg.payload;
                
                deleteNetworkSmProfileClarity_nodeParam = node.deleteNetworkSmProfileClarity_profileId;
                deleteNetworkSmProfileClarity_nodeParamType = node.deleteNetworkSmProfileClarity_profileIdType;
                if (deleteNetworkSmProfileClarity_nodeParamType === 'str') {
                    //deleteNetworkSmProfileClarity_parameters.profileId = deleteNetworkSmProfileClarity_nodeParam || '';
                    deleteNetworkSmProfileClarity_parameters.profileId = deleteNetworkSmProfileClarity_nodeParam || undefined;
                } else {
                    deleteNetworkSmProfileClarity_parameters.profileId = RED.util.getMessageProperty(msg, deleteNetworkSmProfileClarity_nodeParam);
                }
                //deleteNetworkSmProfileClarity_parameters.profileId = !!deleteNetworkSmProfileClarity_parameters.profileId ? deleteNetworkSmProfileClarity_parameters.profileId : msg.payload;
                                result = client.deleteNetworkSmProfileClarity(deleteNetworkSmProfileClarity_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkSmProfileUmbrella') {
                var createNetworkSmProfileUmbrella_parameters = [];
                var createNetworkSmProfileUmbrella_nodeParam;
                var createNetworkSmProfileUmbrella_nodeParamType;

                createNetworkSmProfileUmbrella_nodeParam = node.createNetworkSmProfileUmbrella_networkId;
                createNetworkSmProfileUmbrella_nodeParamType = node.createNetworkSmProfileUmbrella_networkIdType;
                if (createNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //createNetworkSmProfileUmbrella_parameters.networkId = createNetworkSmProfileUmbrella_nodeParam || '';
                    createNetworkSmProfileUmbrella_parameters.networkId = createNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    createNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkSmProfileUmbrella_nodeParam);
                }
                //createNetworkSmProfileUmbrella_parameters.networkId = !!createNetworkSmProfileUmbrella_parameters.networkId ? createNetworkSmProfileUmbrella_parameters.networkId : msg.payload;
                
                createNetworkSmProfileUmbrella_nodeParam = node.createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrella;
                createNetworkSmProfileUmbrella_nodeParamType = node.createNetworkSmProfileUmbrella_createNetworkSmProfileUmbrellaType;
                if (createNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella = createNetworkSmProfileUmbrella_nodeParam || '';
                    createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella = createNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella = RED.util.getMessageProperty(msg, createNetworkSmProfileUmbrella_nodeParam);
                }
                //createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella = !!createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella ? createNetworkSmProfileUmbrella_parameters.createNetworkSmProfileUmbrella : msg.payload;
                                result = client.createNetworkSmProfileUmbrella(createNetworkSmProfileUmbrella_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmProfileUmbrella') {
                var updateNetworkSmProfileUmbrella_parameters = [];
                var updateNetworkSmProfileUmbrella_nodeParam;
                var updateNetworkSmProfileUmbrella_nodeParamType;

                updateNetworkSmProfileUmbrella_nodeParam = node.updateNetworkSmProfileUmbrella_networkId;
                updateNetworkSmProfileUmbrella_nodeParamType = node.updateNetworkSmProfileUmbrella_networkIdType;
                if (updateNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //updateNetworkSmProfileUmbrella_parameters.networkId = updateNetworkSmProfileUmbrella_nodeParam || '';
                    updateNetworkSmProfileUmbrella_parameters.networkId = updateNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    updateNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmProfileUmbrella_nodeParam);
                }
                //updateNetworkSmProfileUmbrella_parameters.networkId = !!updateNetworkSmProfileUmbrella_parameters.networkId ? updateNetworkSmProfileUmbrella_parameters.networkId : msg.payload;
                
                updateNetworkSmProfileUmbrella_nodeParam = node.updateNetworkSmProfileUmbrella_profileId;
                updateNetworkSmProfileUmbrella_nodeParamType = node.updateNetworkSmProfileUmbrella_profileIdType;
                if (updateNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //updateNetworkSmProfileUmbrella_parameters.profileId = updateNetworkSmProfileUmbrella_nodeParam || '';
                    updateNetworkSmProfileUmbrella_parameters.profileId = updateNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    updateNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, updateNetworkSmProfileUmbrella_nodeParam);
                }
                //updateNetworkSmProfileUmbrella_parameters.profileId = !!updateNetworkSmProfileUmbrella_parameters.profileId ? updateNetworkSmProfileUmbrella_parameters.profileId : msg.payload;
                
                updateNetworkSmProfileUmbrella_nodeParam = node.updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrella;
                updateNetworkSmProfileUmbrella_nodeParamType = node.updateNetworkSmProfileUmbrella_updateNetworkSmProfileUmbrellaType;
                if (updateNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella = updateNetworkSmProfileUmbrella_nodeParam || '';
                    updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella = updateNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella = RED.util.getMessageProperty(msg, updateNetworkSmProfileUmbrella_nodeParam);
                }
                //updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella = !!updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella ? updateNetworkSmProfileUmbrella_parameters.updateNetworkSmProfileUmbrella : msg.payload;
                                result = client.updateNetworkSmProfileUmbrella(updateNetworkSmProfileUmbrella_parameters);
            }
            if (!errorFlag && node.method === 'addNetworkSmProfileUmbrella') {
                var addNetworkSmProfileUmbrella_parameters = [];
                var addNetworkSmProfileUmbrella_nodeParam;
                var addNetworkSmProfileUmbrella_nodeParamType;

                addNetworkSmProfileUmbrella_nodeParam = node.addNetworkSmProfileUmbrella_networkId;
                addNetworkSmProfileUmbrella_nodeParamType = node.addNetworkSmProfileUmbrella_networkIdType;
                if (addNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //addNetworkSmProfileUmbrella_parameters.networkId = addNetworkSmProfileUmbrella_nodeParam || '';
                    addNetworkSmProfileUmbrella_parameters.networkId = addNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    addNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, addNetworkSmProfileUmbrella_nodeParam);
                }
                //addNetworkSmProfileUmbrella_parameters.networkId = !!addNetworkSmProfileUmbrella_parameters.networkId ? addNetworkSmProfileUmbrella_parameters.networkId : msg.payload;
                
                addNetworkSmProfileUmbrella_nodeParam = node.addNetworkSmProfileUmbrella_profileId;
                addNetworkSmProfileUmbrella_nodeParamType = node.addNetworkSmProfileUmbrella_profileIdType;
                if (addNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //addNetworkSmProfileUmbrella_parameters.profileId = addNetworkSmProfileUmbrella_nodeParam || '';
                    addNetworkSmProfileUmbrella_parameters.profileId = addNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    addNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, addNetworkSmProfileUmbrella_nodeParam);
                }
                //addNetworkSmProfileUmbrella_parameters.profileId = !!addNetworkSmProfileUmbrella_parameters.profileId ? addNetworkSmProfileUmbrella_parameters.profileId : msg.payload;
                
                addNetworkSmProfileUmbrella_nodeParam = node.addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrella;
                addNetworkSmProfileUmbrella_nodeParamType = node.addNetworkSmProfileUmbrella_addNetworkSmProfileUmbrellaType;
                if (addNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella = addNetworkSmProfileUmbrella_nodeParam || '';
                    addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella = addNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella = RED.util.getMessageProperty(msg, addNetworkSmProfileUmbrella_nodeParam);
                }
                //addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella = !!addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella ? addNetworkSmProfileUmbrella_parameters.addNetworkSmProfileUmbrella : msg.payload;
                                result = client.addNetworkSmProfileUmbrella(addNetworkSmProfileUmbrella_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmProfileUmbrella') {
                var getNetworkSmProfileUmbrella_parameters = [];
                var getNetworkSmProfileUmbrella_nodeParam;
                var getNetworkSmProfileUmbrella_nodeParamType;

                getNetworkSmProfileUmbrella_nodeParam = node.getNetworkSmProfileUmbrella_networkId;
                getNetworkSmProfileUmbrella_nodeParamType = node.getNetworkSmProfileUmbrella_networkIdType;
                if (getNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //getNetworkSmProfileUmbrella_parameters.networkId = getNetworkSmProfileUmbrella_nodeParam || '';
                    getNetworkSmProfileUmbrella_parameters.networkId = getNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    getNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmProfileUmbrella_nodeParam);
                }
                //getNetworkSmProfileUmbrella_parameters.networkId = !!getNetworkSmProfileUmbrella_parameters.networkId ? getNetworkSmProfileUmbrella_parameters.networkId : msg.payload;
                
                getNetworkSmProfileUmbrella_nodeParam = node.getNetworkSmProfileUmbrella_profileId;
                getNetworkSmProfileUmbrella_nodeParamType = node.getNetworkSmProfileUmbrella_profileIdType;
                if (getNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //getNetworkSmProfileUmbrella_parameters.profileId = getNetworkSmProfileUmbrella_nodeParam || '';
                    getNetworkSmProfileUmbrella_parameters.profileId = getNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    getNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, getNetworkSmProfileUmbrella_nodeParam);
                }
                //getNetworkSmProfileUmbrella_parameters.profileId = !!getNetworkSmProfileUmbrella_parameters.profileId ? getNetworkSmProfileUmbrella_parameters.profileId : msg.payload;
                                result = client.getNetworkSmProfileUmbrella(getNetworkSmProfileUmbrella_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmProfileUmbrella') {
                var deleteNetworkSmProfileUmbrella_parameters = [];
                var deleteNetworkSmProfileUmbrella_nodeParam;
                var deleteNetworkSmProfileUmbrella_nodeParamType;

                deleteNetworkSmProfileUmbrella_nodeParam = node.deleteNetworkSmProfileUmbrella_networkId;
                deleteNetworkSmProfileUmbrella_nodeParamType = node.deleteNetworkSmProfileUmbrella_networkIdType;
                if (deleteNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //deleteNetworkSmProfileUmbrella_parameters.networkId = deleteNetworkSmProfileUmbrella_nodeParam || '';
                    deleteNetworkSmProfileUmbrella_parameters.networkId = deleteNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    deleteNetworkSmProfileUmbrella_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkSmProfileUmbrella_nodeParam);
                }
                //deleteNetworkSmProfileUmbrella_parameters.networkId = !!deleteNetworkSmProfileUmbrella_parameters.networkId ? deleteNetworkSmProfileUmbrella_parameters.networkId : msg.payload;
                
                deleteNetworkSmProfileUmbrella_nodeParam = node.deleteNetworkSmProfileUmbrella_profileId;
                deleteNetworkSmProfileUmbrella_nodeParamType = node.deleteNetworkSmProfileUmbrella_profileIdType;
                if (deleteNetworkSmProfileUmbrella_nodeParamType === 'str') {
                    //deleteNetworkSmProfileUmbrella_parameters.profileId = deleteNetworkSmProfileUmbrella_nodeParam || '';
                    deleteNetworkSmProfileUmbrella_parameters.profileId = deleteNetworkSmProfileUmbrella_nodeParam || undefined;
                } else {
                    deleteNetworkSmProfileUmbrella_parameters.profileId = RED.util.getMessageProperty(msg, deleteNetworkSmProfileUmbrella_nodeParam);
                }
                //deleteNetworkSmProfileUmbrella_parameters.profileId = !!deleteNetworkSmProfileUmbrella_parameters.profileId ? deleteNetworkSmProfileUmbrella_parameters.profileId : msg.payload;
                                result = client.deleteNetworkSmProfileUmbrella(deleteNetworkSmProfileUmbrella_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkSmAppPolaris') {
                var createNetworkSmAppPolaris_parameters = [];
                var createNetworkSmAppPolaris_nodeParam;
                var createNetworkSmAppPolaris_nodeParamType;

                createNetworkSmAppPolaris_nodeParam = node.createNetworkSmAppPolaris_networkId;
                createNetworkSmAppPolaris_nodeParamType = node.createNetworkSmAppPolaris_networkIdType;
                if (createNetworkSmAppPolaris_nodeParamType === 'str') {
                    //createNetworkSmAppPolaris_parameters.networkId = createNetworkSmAppPolaris_nodeParam || '';
                    createNetworkSmAppPolaris_parameters.networkId = createNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    createNetworkSmAppPolaris_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkSmAppPolaris_nodeParam);
                }
                //createNetworkSmAppPolaris_parameters.networkId = !!createNetworkSmAppPolaris_parameters.networkId ? createNetworkSmAppPolaris_parameters.networkId : msg.payload;
                
                createNetworkSmAppPolaris_nodeParam = node.createNetworkSmAppPolaris_createNetworkSmAppPolaris;
                createNetworkSmAppPolaris_nodeParamType = node.createNetworkSmAppPolaris_createNetworkSmAppPolarisType;
                if (createNetworkSmAppPolaris_nodeParamType === 'str') {
                    //createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris = createNetworkSmAppPolaris_nodeParam || '';
                    createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris = createNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris = RED.util.getMessageProperty(msg, createNetworkSmAppPolaris_nodeParam);
                }
                //createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris = !!createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris ? createNetworkSmAppPolaris_parameters.createNetworkSmAppPolaris : msg.payload;
                                result = client.createNetworkSmAppPolaris(createNetworkSmAppPolaris_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmAppPolaris') {
                var getNetworkSmAppPolaris_parameters = [];
                var getNetworkSmAppPolaris_nodeParam;
                var getNetworkSmAppPolaris_nodeParamType;

                getNetworkSmAppPolaris_nodeParam = node.getNetworkSmAppPolaris_networkId;
                getNetworkSmAppPolaris_nodeParamType = node.getNetworkSmAppPolaris_networkIdType;
                if (getNetworkSmAppPolaris_nodeParamType === 'str') {
                    //getNetworkSmAppPolaris_parameters.networkId = getNetworkSmAppPolaris_nodeParam || '';
                    getNetworkSmAppPolaris_parameters.networkId = getNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    getNetworkSmAppPolaris_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmAppPolaris_nodeParam);
                }
                //getNetworkSmAppPolaris_parameters.networkId = !!getNetworkSmAppPolaris_parameters.networkId ? getNetworkSmAppPolaris_parameters.networkId : msg.payload;
                
                getNetworkSmAppPolaris_nodeParam = node.getNetworkSmAppPolaris_bundleId;
                getNetworkSmAppPolaris_nodeParamType = node.getNetworkSmAppPolaris_bundleIdType;
                if (getNetworkSmAppPolaris_nodeParamType === 'str') {
                    //getNetworkSmAppPolaris_parameters.bundleId = getNetworkSmAppPolaris_nodeParam || '';
                    getNetworkSmAppPolaris_parameters.bundleId = getNetworkSmAppPolaris_nodeParam || undefined;
                } else {
                    getNetworkSmAppPolaris_parameters.bundleId = RED.util.getMessageProperty(msg, getNetworkSmAppPolaris_nodeParam);
                }
                //getNetworkSmAppPolaris_parameters.bundleId = !!getNetworkSmAppPolaris_parameters.bundleId ? getNetworkSmAppPolaris_parameters.bundleId : msg.payload;
                                result = client.getNetworkSmAppPolaris(getNetworkSmAppPolaris_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmAppPolari') {
                var updateNetworkSmAppPolari_parameters = [];
                var updateNetworkSmAppPolari_nodeParam;
                var updateNetworkSmAppPolari_nodeParamType;

                updateNetworkSmAppPolari_nodeParam = node.updateNetworkSmAppPolari_networkId;
                updateNetworkSmAppPolari_nodeParamType = node.updateNetworkSmAppPolari_networkIdType;
                if (updateNetworkSmAppPolari_nodeParamType === 'str') {
                    //updateNetworkSmAppPolari_parameters.networkId = updateNetworkSmAppPolari_nodeParam || '';
                    updateNetworkSmAppPolari_parameters.networkId = updateNetworkSmAppPolari_nodeParam || undefined;
                } else {
                    updateNetworkSmAppPolari_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmAppPolari_nodeParam);
                }
                //updateNetworkSmAppPolari_parameters.networkId = !!updateNetworkSmAppPolari_parameters.networkId ? updateNetworkSmAppPolari_parameters.networkId : msg.payload;
                
                updateNetworkSmAppPolari_nodeParam = node.updateNetworkSmAppPolari_appId;
                updateNetworkSmAppPolari_nodeParamType = node.updateNetworkSmAppPolari_appIdType;
                if (updateNetworkSmAppPolari_nodeParamType === 'str') {
                    //updateNetworkSmAppPolari_parameters.appId = updateNetworkSmAppPolari_nodeParam || '';
                    updateNetworkSmAppPolari_parameters.appId = updateNetworkSmAppPolari_nodeParam || undefined;
                } else {
                    updateNetworkSmAppPolari_parameters.appId = RED.util.getMessageProperty(msg, updateNetworkSmAppPolari_nodeParam);
                }
                //updateNetworkSmAppPolari_parameters.appId = !!updateNetworkSmAppPolari_parameters.appId ? updateNetworkSmAppPolari_parameters.appId : msg.payload;
                
                updateNetworkSmAppPolari_nodeParam = node.updateNetworkSmAppPolari_updateNetworkSmAppPolari;
                updateNetworkSmAppPolari_nodeParamType = node.updateNetworkSmAppPolari_updateNetworkSmAppPolariType;
                if (updateNetworkSmAppPolari_nodeParamType === 'str') {
                    //updateNetworkSmAppPolari_parameters.updateNetworkSmAppPolari = updateNetworkSmAppPolari_nodeParam || '';
                    updateNetworkSmAppPolari_parameters.updateNetworkSmAppPolari = updateNetworkSmAppPolari_nodeParam || undefined;
                } else {
                    updateNetworkSmAppPolari_parameters.updateNetworkSmAppPolari = RED.util.getMessageProperty(msg, updateNetworkSmAppPolari_nodeParam);
                }
                //updateNetworkSmAppPolari_parameters.updateNetworkSmAppPolari = !!updateNetworkSmAppPolari_parameters.updateNetworkSmAppPolari ? updateNetworkSmAppPolari_parameters.updateNetworkSmAppPolari : msg.payload;
                                result = client.updateNetworkSmAppPolari(updateNetworkSmAppPolari_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkSmAppPolari') {
                var deleteNetworkSmAppPolari_parameters = [];
                var deleteNetworkSmAppPolari_nodeParam;
                var deleteNetworkSmAppPolari_nodeParamType;

                deleteNetworkSmAppPolari_nodeParam = node.deleteNetworkSmAppPolari_networkId;
                deleteNetworkSmAppPolari_nodeParamType = node.deleteNetworkSmAppPolari_networkIdType;
                if (deleteNetworkSmAppPolari_nodeParamType === 'str') {
                    //deleteNetworkSmAppPolari_parameters.networkId = deleteNetworkSmAppPolari_nodeParam || '';
                    deleteNetworkSmAppPolari_parameters.networkId = deleteNetworkSmAppPolari_nodeParam || undefined;
                } else {
                    deleteNetworkSmAppPolari_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkSmAppPolari_nodeParam);
                }
                //deleteNetworkSmAppPolari_parameters.networkId = !!deleteNetworkSmAppPolari_parameters.networkId ? deleteNetworkSmAppPolari_parameters.networkId : msg.payload;
                
                deleteNetworkSmAppPolari_nodeParam = node.deleteNetworkSmAppPolari_appId;
                deleteNetworkSmAppPolari_nodeParamType = node.deleteNetworkSmAppPolari_appIdType;
                if (deleteNetworkSmAppPolari_nodeParamType === 'str') {
                    //deleteNetworkSmAppPolari_parameters.appId = deleteNetworkSmAppPolari_nodeParam || '';
                    deleteNetworkSmAppPolari_parameters.appId = deleteNetworkSmAppPolari_nodeParam || undefined;
                } else {
                    deleteNetworkSmAppPolari_parameters.appId = RED.util.getMessageProperty(msg, deleteNetworkSmAppPolari_nodeParam);
                }
                //deleteNetworkSmAppPolari_parameters.appId = !!deleteNetworkSmAppPolari_parameters.appId ? deleteNetworkSmAppPolari_parameters.appId : msg.payload;
                                result = client.deleteNetworkSmAppPolari(deleteNetworkSmAppPolari_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmDevices') {
                var getNetworkSmDevices_parameters = [];
                var getNetworkSmDevices_nodeParam;
                var getNetworkSmDevices_nodeParamType;

                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_networkId;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_networkIdType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.networkId = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.networkId = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.networkId = !!getNetworkSmDevices_parameters.networkId ? getNetworkSmDevices_parameters.networkId : msg.payload;
                
                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_fields;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_fieldsType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.fields = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.fields = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.fields = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.fields = !!getNetworkSmDevices_parameters.fields ? getNetworkSmDevices_parameters.fields : msg.payload;
                
                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_wifiMacs;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_wifiMacsType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.wifiMacs = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.wifiMacs = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.wifiMacs = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.wifiMacs = !!getNetworkSmDevices_parameters.wifiMacs ? getNetworkSmDevices_parameters.wifiMacs : msg.payload;
                
                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_serials;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_serialsType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.serials = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.serials = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.serials = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.serials = !!getNetworkSmDevices_parameters.serials ? getNetworkSmDevices_parameters.serials : msg.payload;
                
                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_ids;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_idsType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.ids = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.ids = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.ids = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.ids = !!getNetworkSmDevices_parameters.ids ? getNetworkSmDevices_parameters.ids : msg.payload;
                
                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_scope;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_scopeType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.scope = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.scope = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.scope = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.scope = !!getNetworkSmDevices_parameters.scope ? getNetworkSmDevices_parameters.scope : msg.payload;
                
                getNetworkSmDevices_nodeParam = node.getNetworkSmDevices_batchToken;
                getNetworkSmDevices_nodeParamType = node.getNetworkSmDevices_batchTokenType;
                if (getNetworkSmDevices_nodeParamType === 'str') {
                    //getNetworkSmDevices_parameters.batchToken = getNetworkSmDevices_nodeParam || '';
                    getNetworkSmDevices_parameters.batchToken = getNetworkSmDevices_nodeParam || undefined;
                } else {
                    getNetworkSmDevices_parameters.batchToken = RED.util.getMessageProperty(msg, getNetworkSmDevices_nodeParam);
                }
                //getNetworkSmDevices_parameters.batchToken = !!getNetworkSmDevices_parameters.batchToken ? getNetworkSmDevices_parameters.batchToken : msg.payload;
                                result = client.getNetworkSmDevices(getNetworkSmDevices_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmUsers') {
                var getNetworkSmUsers_parameters = [];
                var getNetworkSmUsers_nodeParam;
                var getNetworkSmUsers_nodeParamType;

                getNetworkSmUsers_nodeParam = node.getNetworkSmUsers_networkId;
                getNetworkSmUsers_nodeParamType = node.getNetworkSmUsers_networkIdType;
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    //getNetworkSmUsers_parameters.networkId = getNetworkSmUsers_nodeParam || '';
                    getNetworkSmUsers_parameters.networkId = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    getNetworkSmUsers_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmUsers_nodeParam);
                }
                //getNetworkSmUsers_parameters.networkId = !!getNetworkSmUsers_parameters.networkId ? getNetworkSmUsers_parameters.networkId : msg.payload;
                
                getNetworkSmUsers_nodeParam = node.getNetworkSmUsers_usernames;
                getNetworkSmUsers_nodeParamType = node.getNetworkSmUsers_usernamesType;
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    //getNetworkSmUsers_parameters.usernames = getNetworkSmUsers_nodeParam || '';
                    getNetworkSmUsers_parameters.usernames = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    getNetworkSmUsers_parameters.usernames = RED.util.getMessageProperty(msg, getNetworkSmUsers_nodeParam);
                }
                //getNetworkSmUsers_parameters.usernames = !!getNetworkSmUsers_parameters.usernames ? getNetworkSmUsers_parameters.usernames : msg.payload;
                
                getNetworkSmUsers_nodeParam = node.getNetworkSmUsers_emails;
                getNetworkSmUsers_nodeParamType = node.getNetworkSmUsers_emailsType;
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    //getNetworkSmUsers_parameters.emails = getNetworkSmUsers_nodeParam || '';
                    getNetworkSmUsers_parameters.emails = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    getNetworkSmUsers_parameters.emails = RED.util.getMessageProperty(msg, getNetworkSmUsers_nodeParam);
                }
                //getNetworkSmUsers_parameters.emails = !!getNetworkSmUsers_parameters.emails ? getNetworkSmUsers_parameters.emails : msg.payload;
                
                getNetworkSmUsers_nodeParam = node.getNetworkSmUsers_ids;
                getNetworkSmUsers_nodeParamType = node.getNetworkSmUsers_idsType;
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    //getNetworkSmUsers_parameters.ids = getNetworkSmUsers_nodeParam || '';
                    getNetworkSmUsers_parameters.ids = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    getNetworkSmUsers_parameters.ids = RED.util.getMessageProperty(msg, getNetworkSmUsers_nodeParam);
                }
                //getNetworkSmUsers_parameters.ids = !!getNetworkSmUsers_parameters.ids ? getNetworkSmUsers_parameters.ids : msg.payload;
                
                getNetworkSmUsers_nodeParam = node.getNetworkSmUsers_scope;
                getNetworkSmUsers_nodeParamType = node.getNetworkSmUsers_scopeType;
                if (getNetworkSmUsers_nodeParamType === 'str') {
                    //getNetworkSmUsers_parameters.scope = getNetworkSmUsers_nodeParam || '';
                    getNetworkSmUsers_parameters.scope = getNetworkSmUsers_nodeParam || undefined;
                } else {
                    getNetworkSmUsers_parameters.scope = RED.util.getMessageProperty(msg, getNetworkSmUsers_nodeParam);
                }
                //getNetworkSmUsers_parameters.scope = !!getNetworkSmUsers_parameters.scope ? getNetworkSmUsers_parameters.scope : msg.payload;
                                result = client.getNetworkSmUsers(getNetworkSmUsers_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmUserDeviceProfiles') {
                var getNetworkSmUserDeviceProfiles_parameters = [];
                var getNetworkSmUserDeviceProfiles_nodeParam;
                var getNetworkSmUserDeviceProfiles_nodeParamType;

                getNetworkSmUserDeviceProfiles_nodeParam = node.getNetworkSmUserDeviceProfiles_networkId;
                getNetworkSmUserDeviceProfiles_nodeParamType = node.getNetworkSmUserDeviceProfiles_networkIdType;
                if (getNetworkSmUserDeviceProfiles_nodeParamType === 'str') {
                    //getNetworkSmUserDeviceProfiles_parameters.networkId = getNetworkSmUserDeviceProfiles_nodeParam || '';
                    getNetworkSmUserDeviceProfiles_parameters.networkId = getNetworkSmUserDeviceProfiles_nodeParam || undefined;
                } else {
                    getNetworkSmUserDeviceProfiles_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmUserDeviceProfiles_nodeParam);
                }
                //getNetworkSmUserDeviceProfiles_parameters.networkId = !!getNetworkSmUserDeviceProfiles_parameters.networkId ? getNetworkSmUserDeviceProfiles_parameters.networkId : msg.payload;
                
                getNetworkSmUserDeviceProfiles_nodeParam = node.getNetworkSmUserDeviceProfiles_id;
                getNetworkSmUserDeviceProfiles_nodeParamType = node.getNetworkSmUserDeviceProfiles_idType;
                if (getNetworkSmUserDeviceProfiles_nodeParamType === 'str') {
                    //getNetworkSmUserDeviceProfiles_parameters.id = getNetworkSmUserDeviceProfiles_nodeParam || '';
                    getNetworkSmUserDeviceProfiles_parameters.id = getNetworkSmUserDeviceProfiles_nodeParam || undefined;
                } else {
                    getNetworkSmUserDeviceProfiles_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmUserDeviceProfiles_nodeParam);
                }
                //getNetworkSmUserDeviceProfiles_parameters.id = !!getNetworkSmUserDeviceProfiles_parameters.id ? getNetworkSmUserDeviceProfiles_parameters.id : msg.payload;
                                result = client.getNetworkSmUserDeviceProfiles(getNetworkSmUserDeviceProfiles_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmDeviceProfiles') {
                var getNetworkSmDeviceProfiles_parameters = [];
                var getNetworkSmDeviceProfiles_nodeParam;
                var getNetworkSmDeviceProfiles_nodeParamType;

                getNetworkSmDeviceProfiles_nodeParam = node.getNetworkSmDeviceProfiles_networkId;
                getNetworkSmDeviceProfiles_nodeParamType = node.getNetworkSmDeviceProfiles_networkIdType;
                if (getNetworkSmDeviceProfiles_nodeParamType === 'str') {
                    //getNetworkSmDeviceProfiles_parameters.networkId = getNetworkSmDeviceProfiles_nodeParam || '';
                    getNetworkSmDeviceProfiles_parameters.networkId = getNetworkSmDeviceProfiles_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceProfiles_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmDeviceProfiles_nodeParam);
                }
                //getNetworkSmDeviceProfiles_parameters.networkId = !!getNetworkSmDeviceProfiles_parameters.networkId ? getNetworkSmDeviceProfiles_parameters.networkId : msg.payload;
                
                getNetworkSmDeviceProfiles_nodeParam = node.getNetworkSmDeviceProfiles_id;
                getNetworkSmDeviceProfiles_nodeParamType = node.getNetworkSmDeviceProfiles_idType;
                if (getNetworkSmDeviceProfiles_nodeParamType === 'str') {
                    //getNetworkSmDeviceProfiles_parameters.id = getNetworkSmDeviceProfiles_nodeParam || '';
                    getNetworkSmDeviceProfiles_parameters.id = getNetworkSmDeviceProfiles_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceProfiles_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmDeviceProfiles_nodeParam);
                }
                //getNetworkSmDeviceProfiles_parameters.id = !!getNetworkSmDeviceProfiles_parameters.id ? getNetworkSmDeviceProfiles_parameters.id : msg.payload;
                                result = client.getNetworkSmDeviceProfiles(getNetworkSmDeviceProfiles_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmUserSoftwares') {
                var getNetworkSmUserSoftwares_parameters = [];
                var getNetworkSmUserSoftwares_nodeParam;
                var getNetworkSmUserSoftwares_nodeParamType;

                getNetworkSmUserSoftwares_nodeParam = node.getNetworkSmUserSoftwares_networkId;
                getNetworkSmUserSoftwares_nodeParamType = node.getNetworkSmUserSoftwares_networkIdType;
                if (getNetworkSmUserSoftwares_nodeParamType === 'str') {
                    //getNetworkSmUserSoftwares_parameters.networkId = getNetworkSmUserSoftwares_nodeParam || '';
                    getNetworkSmUserSoftwares_parameters.networkId = getNetworkSmUserSoftwares_nodeParam || undefined;
                } else {
                    getNetworkSmUserSoftwares_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmUserSoftwares_nodeParam);
                }
                //getNetworkSmUserSoftwares_parameters.networkId = !!getNetworkSmUserSoftwares_parameters.networkId ? getNetworkSmUserSoftwares_parameters.networkId : msg.payload;
                
                getNetworkSmUserSoftwares_nodeParam = node.getNetworkSmUserSoftwares_id;
                getNetworkSmUserSoftwares_nodeParamType = node.getNetworkSmUserSoftwares_idType;
                if (getNetworkSmUserSoftwares_nodeParamType === 'str') {
                    //getNetworkSmUserSoftwares_parameters.id = getNetworkSmUserSoftwares_nodeParam || '';
                    getNetworkSmUserSoftwares_parameters.id = getNetworkSmUserSoftwares_nodeParam || undefined;
                } else {
                    getNetworkSmUserSoftwares_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmUserSoftwares_nodeParam);
                }
                //getNetworkSmUserSoftwares_parameters.id = !!getNetworkSmUserSoftwares_parameters.id ? getNetworkSmUserSoftwares_parameters.id : msg.payload;
                                result = client.getNetworkSmUserSoftwares(getNetworkSmUserSoftwares_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmSoftwares') {
                var getNetworkSmSoftwares_parameters = [];
                var getNetworkSmSoftwares_nodeParam;
                var getNetworkSmSoftwares_nodeParamType;

                getNetworkSmSoftwares_nodeParam = node.getNetworkSmSoftwares_networkId;
                getNetworkSmSoftwares_nodeParamType = node.getNetworkSmSoftwares_networkIdType;
                if (getNetworkSmSoftwares_nodeParamType === 'str') {
                    //getNetworkSmSoftwares_parameters.networkId = getNetworkSmSoftwares_nodeParam || '';
                    getNetworkSmSoftwares_parameters.networkId = getNetworkSmSoftwares_nodeParam || undefined;
                } else {
                    getNetworkSmSoftwares_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmSoftwares_nodeParam);
                }
                //getNetworkSmSoftwares_parameters.networkId = !!getNetworkSmSoftwares_parameters.networkId ? getNetworkSmSoftwares_parameters.networkId : msg.payload;
                
                getNetworkSmSoftwares_nodeParam = node.getNetworkSmSoftwares_id;
                getNetworkSmSoftwares_nodeParamType = node.getNetworkSmSoftwares_idType;
                if (getNetworkSmSoftwares_nodeParamType === 'str') {
                    //getNetworkSmSoftwares_parameters.id = getNetworkSmSoftwares_nodeParam || '';
                    getNetworkSmSoftwares_parameters.id = getNetworkSmSoftwares_nodeParam || undefined;
                } else {
                    getNetworkSmSoftwares_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmSoftwares_nodeParam);
                }
                //getNetworkSmSoftwares_parameters.id = !!getNetworkSmSoftwares_parameters.id ? getNetworkSmSoftwares_parameters.id : msg.payload;
                                result = client.getNetworkSmSoftwares(getNetworkSmSoftwares_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmNetworkAdapters') {
                var getNetworkSmNetworkAdapters_parameters = [];
                var getNetworkSmNetworkAdapters_nodeParam;
                var getNetworkSmNetworkAdapters_nodeParamType;

                getNetworkSmNetworkAdapters_nodeParam = node.getNetworkSmNetworkAdapters_networkId;
                getNetworkSmNetworkAdapters_nodeParamType = node.getNetworkSmNetworkAdapters_networkIdType;
                if (getNetworkSmNetworkAdapters_nodeParamType === 'str') {
                    //getNetworkSmNetworkAdapters_parameters.networkId = getNetworkSmNetworkAdapters_nodeParam || '';
                    getNetworkSmNetworkAdapters_parameters.networkId = getNetworkSmNetworkAdapters_nodeParam || undefined;
                } else {
                    getNetworkSmNetworkAdapters_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmNetworkAdapters_nodeParam);
                }
                //getNetworkSmNetworkAdapters_parameters.networkId = !!getNetworkSmNetworkAdapters_parameters.networkId ? getNetworkSmNetworkAdapters_parameters.networkId : msg.payload;
                
                getNetworkSmNetworkAdapters_nodeParam = node.getNetworkSmNetworkAdapters_id;
                getNetworkSmNetworkAdapters_nodeParamType = node.getNetworkSmNetworkAdapters_idType;
                if (getNetworkSmNetworkAdapters_nodeParamType === 'str') {
                    //getNetworkSmNetworkAdapters_parameters.id = getNetworkSmNetworkAdapters_nodeParam || '';
                    getNetworkSmNetworkAdapters_parameters.id = getNetworkSmNetworkAdapters_nodeParam || undefined;
                } else {
                    getNetworkSmNetworkAdapters_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmNetworkAdapters_nodeParam);
                }
                //getNetworkSmNetworkAdapters_parameters.id = !!getNetworkSmNetworkAdapters_parameters.id ? getNetworkSmNetworkAdapters_parameters.id : msg.payload;
                                result = client.getNetworkSmNetworkAdapters(getNetworkSmNetworkAdapters_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmWlanLists') {
                var getNetworkSmWlanLists_parameters = [];
                var getNetworkSmWlanLists_nodeParam;
                var getNetworkSmWlanLists_nodeParamType;

                getNetworkSmWlanLists_nodeParam = node.getNetworkSmWlanLists_networkId;
                getNetworkSmWlanLists_nodeParamType = node.getNetworkSmWlanLists_networkIdType;
                if (getNetworkSmWlanLists_nodeParamType === 'str') {
                    //getNetworkSmWlanLists_parameters.networkId = getNetworkSmWlanLists_nodeParam || '';
                    getNetworkSmWlanLists_parameters.networkId = getNetworkSmWlanLists_nodeParam || undefined;
                } else {
                    getNetworkSmWlanLists_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmWlanLists_nodeParam);
                }
                //getNetworkSmWlanLists_parameters.networkId = !!getNetworkSmWlanLists_parameters.networkId ? getNetworkSmWlanLists_parameters.networkId : msg.payload;
                
                getNetworkSmWlanLists_nodeParam = node.getNetworkSmWlanLists_id;
                getNetworkSmWlanLists_nodeParamType = node.getNetworkSmWlanLists_idType;
                if (getNetworkSmWlanLists_nodeParamType === 'str') {
                    //getNetworkSmWlanLists_parameters.id = getNetworkSmWlanLists_nodeParam || '';
                    getNetworkSmWlanLists_parameters.id = getNetworkSmWlanLists_nodeParam || undefined;
                } else {
                    getNetworkSmWlanLists_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmWlanLists_nodeParam);
                }
                //getNetworkSmWlanLists_parameters.id = !!getNetworkSmWlanLists_parameters.id ? getNetworkSmWlanLists_parameters.id : msg.payload;
                                result = client.getNetworkSmWlanLists(getNetworkSmWlanLists_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmSecurityCenters') {
                var getNetworkSmSecurityCenters_parameters = [];
                var getNetworkSmSecurityCenters_nodeParam;
                var getNetworkSmSecurityCenters_nodeParamType;

                getNetworkSmSecurityCenters_nodeParam = node.getNetworkSmSecurityCenters_networkId;
                getNetworkSmSecurityCenters_nodeParamType = node.getNetworkSmSecurityCenters_networkIdType;
                if (getNetworkSmSecurityCenters_nodeParamType === 'str') {
                    //getNetworkSmSecurityCenters_parameters.networkId = getNetworkSmSecurityCenters_nodeParam || '';
                    getNetworkSmSecurityCenters_parameters.networkId = getNetworkSmSecurityCenters_nodeParam || undefined;
                } else {
                    getNetworkSmSecurityCenters_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmSecurityCenters_nodeParam);
                }
                //getNetworkSmSecurityCenters_parameters.networkId = !!getNetworkSmSecurityCenters_parameters.networkId ? getNetworkSmSecurityCenters_parameters.networkId : msg.payload;
                
                getNetworkSmSecurityCenters_nodeParam = node.getNetworkSmSecurityCenters_id;
                getNetworkSmSecurityCenters_nodeParamType = node.getNetworkSmSecurityCenters_idType;
                if (getNetworkSmSecurityCenters_nodeParamType === 'str') {
                    //getNetworkSmSecurityCenters_parameters.id = getNetworkSmSecurityCenters_nodeParam || '';
                    getNetworkSmSecurityCenters_parameters.id = getNetworkSmSecurityCenters_nodeParam || undefined;
                } else {
                    getNetworkSmSecurityCenters_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmSecurityCenters_nodeParam);
                }
                //getNetworkSmSecurityCenters_parameters.id = !!getNetworkSmSecurityCenters_parameters.id ? getNetworkSmSecurityCenters_parameters.id : msg.payload;
                                result = client.getNetworkSmSecurityCenters(getNetworkSmSecurityCenters_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmRestrictions') {
                var getNetworkSmRestrictions_parameters = [];
                var getNetworkSmRestrictions_nodeParam;
                var getNetworkSmRestrictions_nodeParamType;

                getNetworkSmRestrictions_nodeParam = node.getNetworkSmRestrictions_networkId;
                getNetworkSmRestrictions_nodeParamType = node.getNetworkSmRestrictions_networkIdType;
                if (getNetworkSmRestrictions_nodeParamType === 'str') {
                    //getNetworkSmRestrictions_parameters.networkId = getNetworkSmRestrictions_nodeParam || '';
                    getNetworkSmRestrictions_parameters.networkId = getNetworkSmRestrictions_nodeParam || undefined;
                } else {
                    getNetworkSmRestrictions_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmRestrictions_nodeParam);
                }
                //getNetworkSmRestrictions_parameters.networkId = !!getNetworkSmRestrictions_parameters.networkId ? getNetworkSmRestrictions_parameters.networkId : msg.payload;
                
                getNetworkSmRestrictions_nodeParam = node.getNetworkSmRestrictions_id;
                getNetworkSmRestrictions_nodeParamType = node.getNetworkSmRestrictions_idType;
                if (getNetworkSmRestrictions_nodeParamType === 'str') {
                    //getNetworkSmRestrictions_parameters.id = getNetworkSmRestrictions_nodeParam || '';
                    getNetworkSmRestrictions_parameters.id = getNetworkSmRestrictions_nodeParam || undefined;
                } else {
                    getNetworkSmRestrictions_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmRestrictions_nodeParam);
                }
                //getNetworkSmRestrictions_parameters.id = !!getNetworkSmRestrictions_parameters.id ? getNetworkSmRestrictions_parameters.id : msg.payload;
                                result = client.getNetworkSmRestrictions(getNetworkSmRestrictions_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmCerts') {
                var getNetworkSmCerts_parameters = [];
                var getNetworkSmCerts_nodeParam;
                var getNetworkSmCerts_nodeParamType;

                getNetworkSmCerts_nodeParam = node.getNetworkSmCerts_networkId;
                getNetworkSmCerts_nodeParamType = node.getNetworkSmCerts_networkIdType;
                if (getNetworkSmCerts_nodeParamType === 'str') {
                    //getNetworkSmCerts_parameters.networkId = getNetworkSmCerts_nodeParam || '';
                    getNetworkSmCerts_parameters.networkId = getNetworkSmCerts_nodeParam || undefined;
                } else {
                    getNetworkSmCerts_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmCerts_nodeParam);
                }
                //getNetworkSmCerts_parameters.networkId = !!getNetworkSmCerts_parameters.networkId ? getNetworkSmCerts_parameters.networkId : msg.payload;
                
                getNetworkSmCerts_nodeParam = node.getNetworkSmCerts_id;
                getNetworkSmCerts_nodeParamType = node.getNetworkSmCerts_idType;
                if (getNetworkSmCerts_nodeParamType === 'str') {
                    //getNetworkSmCerts_parameters.id = getNetworkSmCerts_nodeParam || '';
                    getNetworkSmCerts_parameters.id = getNetworkSmCerts_nodeParam || undefined;
                } else {
                    getNetworkSmCerts_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmCerts_nodeParam);
                }
                //getNetworkSmCerts_parameters.id = !!getNetworkSmCerts_parameters.id ? getNetworkSmCerts_parameters.id : msg.payload;
                                result = client.getNetworkSmCerts(getNetworkSmCerts_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDevicesTags') {
                var updateNetworkSmDevicesTags_parameters = [];
                var updateNetworkSmDevicesTags_nodeParam;
                var updateNetworkSmDevicesTags_nodeParamType;

                updateNetworkSmDevicesTags_nodeParam = node.updateNetworkSmDevicesTags_networkId;
                updateNetworkSmDevicesTags_nodeParamType = node.updateNetworkSmDevicesTags_networkIdType;
                if (updateNetworkSmDevicesTags_nodeParamType === 'str') {
                    //updateNetworkSmDevicesTags_parameters.networkId = updateNetworkSmDevicesTags_nodeParam || '';
                    updateNetworkSmDevicesTags_parameters.networkId = updateNetworkSmDevicesTags_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesTags_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmDevicesTags_nodeParam);
                }
                //updateNetworkSmDevicesTags_parameters.networkId = !!updateNetworkSmDevicesTags_parameters.networkId ? updateNetworkSmDevicesTags_parameters.networkId : msg.payload;
                
                updateNetworkSmDevicesTags_nodeParam = node.updateNetworkSmDevicesTags_updateNetworkSmDevicesTags;
                updateNetworkSmDevicesTags_nodeParamType = node.updateNetworkSmDevicesTags_updateNetworkSmDevicesTagsType;
                if (updateNetworkSmDevicesTags_nodeParamType === 'str') {
                    //updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags = updateNetworkSmDevicesTags_nodeParam || '';
                    updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags = updateNetworkSmDevicesTags_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags = RED.util.getMessageProperty(msg, updateNetworkSmDevicesTags_nodeParam);
                }
                //updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags = !!updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags ? updateNetworkSmDevicesTags_parameters.updateNetworkSmDevicesTags : msg.payload;
                                result = client.updateNetworkSmDevicesTags(updateNetworkSmDevicesTags_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDeviceFields') {
                var updateNetworkSmDeviceFields_parameters = [];
                var updateNetworkSmDeviceFields_nodeParam;
                var updateNetworkSmDeviceFields_nodeParamType;

                updateNetworkSmDeviceFields_nodeParam = node.updateNetworkSmDeviceFields_networkId;
                updateNetworkSmDeviceFields_nodeParamType = node.updateNetworkSmDeviceFields_networkIdType;
                if (updateNetworkSmDeviceFields_nodeParamType === 'str') {
                    //updateNetworkSmDeviceFields_parameters.networkId = updateNetworkSmDeviceFields_nodeParam || '';
                    updateNetworkSmDeviceFields_parameters.networkId = updateNetworkSmDeviceFields_nodeParam || undefined;
                } else {
                    updateNetworkSmDeviceFields_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmDeviceFields_nodeParam);
                }
                //updateNetworkSmDeviceFields_parameters.networkId = !!updateNetworkSmDeviceFields_parameters.networkId ? updateNetworkSmDeviceFields_parameters.networkId : msg.payload;
                
                updateNetworkSmDeviceFields_nodeParam = node.updateNetworkSmDeviceFields_updateNetworkSmDeviceFields;
                updateNetworkSmDeviceFields_nodeParamType = node.updateNetworkSmDeviceFields_updateNetworkSmDeviceFieldsType;
                if (updateNetworkSmDeviceFields_nodeParamType === 'str') {
                    //updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields = updateNetworkSmDeviceFields_nodeParam || '';
                    updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields = updateNetworkSmDeviceFields_nodeParam || undefined;
                } else {
                    updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields = RED.util.getMessageProperty(msg, updateNetworkSmDeviceFields_nodeParam);
                }
                //updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields = !!updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields ? updateNetworkSmDeviceFields_parameters.updateNetworkSmDeviceFields : msg.payload;
                                result = client.updateNetworkSmDeviceFields(updateNetworkSmDeviceFields_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDevicesLock') {
                var updateNetworkSmDevicesLock_parameters = [];
                var updateNetworkSmDevicesLock_nodeParam;
                var updateNetworkSmDevicesLock_nodeParamType;

                updateNetworkSmDevicesLock_nodeParam = node.updateNetworkSmDevicesLock_networkId;
                updateNetworkSmDevicesLock_nodeParamType = node.updateNetworkSmDevicesLock_networkIdType;
                if (updateNetworkSmDevicesLock_nodeParamType === 'str') {
                    //updateNetworkSmDevicesLock_parameters.networkId = updateNetworkSmDevicesLock_nodeParam || '';
                    updateNetworkSmDevicesLock_parameters.networkId = updateNetworkSmDevicesLock_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesLock_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmDevicesLock_nodeParam);
                }
                //updateNetworkSmDevicesLock_parameters.networkId = !!updateNetworkSmDevicesLock_parameters.networkId ? updateNetworkSmDevicesLock_parameters.networkId : msg.payload;
                
                updateNetworkSmDevicesLock_nodeParam = node.updateNetworkSmDevicesLock_updateNetworkSmDevicesLock;
                updateNetworkSmDevicesLock_nodeParamType = node.updateNetworkSmDevicesLock_updateNetworkSmDevicesLockType;
                if (updateNetworkSmDevicesLock_nodeParamType === 'str') {
                    //updateNetworkSmDevicesLock_parameters.updateNetworkSmDevicesLock = updateNetworkSmDevicesLock_nodeParam || '';
                    updateNetworkSmDevicesLock_parameters.updateNetworkSmDevicesLock = updateNetworkSmDevicesLock_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesLock_parameters.updateNetworkSmDevicesLock = RED.util.getMessageProperty(msg, updateNetworkSmDevicesLock_nodeParam);
                }
                //updateNetworkSmDevicesLock_parameters.updateNetworkSmDevicesLock = !!updateNetworkSmDevicesLock_parameters.updateNetworkSmDevicesLock ? updateNetworkSmDevicesLock_parameters.updateNetworkSmDevicesLock : msg.payload;
                                result = client.updateNetworkSmDevicesLock(updateNetworkSmDevicesLock_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDeviceWipe') {
                var updateNetworkSmDeviceWipe_parameters = [];
                var updateNetworkSmDeviceWipe_nodeParam;
                var updateNetworkSmDeviceWipe_nodeParamType;

                updateNetworkSmDeviceWipe_nodeParam = node.updateNetworkSmDeviceWipe_networkId;
                updateNetworkSmDeviceWipe_nodeParamType = node.updateNetworkSmDeviceWipe_networkIdType;
                if (updateNetworkSmDeviceWipe_nodeParamType === 'str') {
                    //updateNetworkSmDeviceWipe_parameters.networkId = updateNetworkSmDeviceWipe_nodeParam || '';
                    updateNetworkSmDeviceWipe_parameters.networkId = updateNetworkSmDeviceWipe_nodeParam || undefined;
                } else {
                    updateNetworkSmDeviceWipe_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmDeviceWipe_nodeParam);
                }
                //updateNetworkSmDeviceWipe_parameters.networkId = !!updateNetworkSmDeviceWipe_parameters.networkId ? updateNetworkSmDeviceWipe_parameters.networkId : msg.payload;
                
                updateNetworkSmDeviceWipe_nodeParam = node.updateNetworkSmDeviceWipe_updateNetworkSmDeviceWipe;
                updateNetworkSmDeviceWipe_nodeParamType = node.updateNetworkSmDeviceWipe_updateNetworkSmDeviceWipeType;
                if (updateNetworkSmDeviceWipe_nodeParamType === 'str') {
                    //updateNetworkSmDeviceWipe_parameters.updateNetworkSmDeviceWipe = updateNetworkSmDeviceWipe_nodeParam || '';
                    updateNetworkSmDeviceWipe_parameters.updateNetworkSmDeviceWipe = updateNetworkSmDeviceWipe_nodeParam || undefined;
                } else {
                    updateNetworkSmDeviceWipe_parameters.updateNetworkSmDeviceWipe = RED.util.getMessageProperty(msg, updateNetworkSmDeviceWipe_nodeParam);
                }
                //updateNetworkSmDeviceWipe_parameters.updateNetworkSmDeviceWipe = !!updateNetworkSmDeviceWipe_parameters.updateNetworkSmDeviceWipe ? updateNetworkSmDeviceWipe_parameters.updateNetworkSmDeviceWipe : msg.payload;
                                result = client.updateNetworkSmDeviceWipe(updateNetworkSmDeviceWipe_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDevicesCheckin') {
                var updateNetworkSmDevicesCheckin_parameters = [];
                var updateNetworkSmDevicesCheckin_nodeParam;
                var updateNetworkSmDevicesCheckin_nodeParamType;

                updateNetworkSmDevicesCheckin_nodeParam = node.updateNetworkSmDevicesCheckin_networkId;
                updateNetworkSmDevicesCheckin_nodeParamType = node.updateNetworkSmDevicesCheckin_networkIdType;
                if (updateNetworkSmDevicesCheckin_nodeParamType === 'str') {
                    //updateNetworkSmDevicesCheckin_parameters.networkId = updateNetworkSmDevicesCheckin_nodeParam || '';
                    updateNetworkSmDevicesCheckin_parameters.networkId = updateNetworkSmDevicesCheckin_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesCheckin_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmDevicesCheckin_nodeParam);
                }
                //updateNetworkSmDevicesCheckin_parameters.networkId = !!updateNetworkSmDevicesCheckin_parameters.networkId ? updateNetworkSmDevicesCheckin_parameters.networkId : msg.payload;
                
                updateNetworkSmDevicesCheckin_nodeParam = node.updateNetworkSmDevicesCheckin_updateNetworkSmDevicesCheckin;
                updateNetworkSmDevicesCheckin_nodeParamType = node.updateNetworkSmDevicesCheckin_updateNetworkSmDevicesCheckinType;
                if (updateNetworkSmDevicesCheckin_nodeParamType === 'str') {
                    //updateNetworkSmDevicesCheckin_parameters.updateNetworkSmDevicesCheckin = updateNetworkSmDevicesCheckin_nodeParam || '';
                    updateNetworkSmDevicesCheckin_parameters.updateNetworkSmDevicesCheckin = updateNetworkSmDevicesCheckin_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesCheckin_parameters.updateNetworkSmDevicesCheckin = RED.util.getMessageProperty(msg, updateNetworkSmDevicesCheckin_nodeParam);
                }
                //updateNetworkSmDevicesCheckin_parameters.updateNetworkSmDevicesCheckin = !!updateNetworkSmDevicesCheckin_parameters.updateNetworkSmDevicesCheckin ? updateNetworkSmDevicesCheckin_parameters.updateNetworkSmDevicesCheckin : msg.payload;
                                result = client.updateNetworkSmDevicesCheckin(updateNetworkSmDevicesCheckin_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSmDevicesMove') {
                var updateNetworkSmDevicesMove_parameters = [];
                var updateNetworkSmDevicesMove_nodeParam;
                var updateNetworkSmDevicesMove_nodeParamType;

                updateNetworkSmDevicesMove_nodeParam = node.updateNetworkSmDevicesMove_networkId;
                updateNetworkSmDevicesMove_nodeParamType = node.updateNetworkSmDevicesMove_networkIdType;
                if (updateNetworkSmDevicesMove_nodeParamType === 'str') {
                    //updateNetworkSmDevicesMove_parameters.networkId = updateNetworkSmDevicesMove_nodeParam || '';
                    updateNetworkSmDevicesMove_parameters.networkId = updateNetworkSmDevicesMove_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesMove_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSmDevicesMove_nodeParam);
                }
                //updateNetworkSmDevicesMove_parameters.networkId = !!updateNetworkSmDevicesMove_parameters.networkId ? updateNetworkSmDevicesMove_parameters.networkId : msg.payload;
                
                updateNetworkSmDevicesMove_nodeParam = node.updateNetworkSmDevicesMove_updateNetworkSmDevicesMove;
                updateNetworkSmDevicesMove_nodeParamType = node.updateNetworkSmDevicesMove_updateNetworkSmDevicesMoveType;
                if (updateNetworkSmDevicesMove_nodeParamType === 'str') {
                    //updateNetworkSmDevicesMove_parameters.updateNetworkSmDevicesMove = updateNetworkSmDevicesMove_nodeParam || '';
                    updateNetworkSmDevicesMove_parameters.updateNetworkSmDevicesMove = updateNetworkSmDevicesMove_nodeParam || undefined;
                } else {
                    updateNetworkSmDevicesMove_parameters.updateNetworkSmDevicesMove = RED.util.getMessageProperty(msg, updateNetworkSmDevicesMove_nodeParam);
                }
                //updateNetworkSmDevicesMove_parameters.updateNetworkSmDevicesMove = !!updateNetworkSmDevicesMove_parameters.updateNetworkSmDevicesMove ? updateNetworkSmDevicesMove_parameters.updateNetworkSmDevicesMove : msg.payload;
                                result = client.updateNetworkSmDevicesMove(updateNetworkSmDevicesMove_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmProfiles') {
                var getNetworkSmProfiles_parameters = [];
                var getNetworkSmProfiles_nodeParam;
                var getNetworkSmProfiles_nodeParamType;

                getNetworkSmProfiles_nodeParam = node.getNetworkSmProfiles_networkId;
                getNetworkSmProfiles_nodeParamType = node.getNetworkSmProfiles_networkIdType;
                if (getNetworkSmProfiles_nodeParamType === 'str') {
                    //getNetworkSmProfiles_parameters.networkId = getNetworkSmProfiles_nodeParam || '';
                    getNetworkSmProfiles_parameters.networkId = getNetworkSmProfiles_nodeParam || undefined;
                } else {
                    getNetworkSmProfiles_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmProfiles_nodeParam);
                }
                //getNetworkSmProfiles_parameters.networkId = !!getNetworkSmProfiles_parameters.networkId ? getNetworkSmProfiles_parameters.networkId : msg.payload;
                                result = client.getNetworkSmProfiles(getNetworkSmProfiles_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmCellularUsageHistory') {
                var getNetworkSmCellularUsageHistory_parameters = [];
                var getNetworkSmCellularUsageHistory_nodeParam;
                var getNetworkSmCellularUsageHistory_nodeParamType;

                getNetworkSmCellularUsageHistory_nodeParam = node.getNetworkSmCellularUsageHistory_networkId;
                getNetworkSmCellularUsageHistory_nodeParamType = node.getNetworkSmCellularUsageHistory_networkIdType;
                if (getNetworkSmCellularUsageHistory_nodeParamType === 'str') {
                    //getNetworkSmCellularUsageHistory_parameters.networkId = getNetworkSmCellularUsageHistory_nodeParam || '';
                    getNetworkSmCellularUsageHistory_parameters.networkId = getNetworkSmCellularUsageHistory_nodeParam || undefined;
                } else {
                    getNetworkSmCellularUsageHistory_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmCellularUsageHistory_nodeParam);
                }
                //getNetworkSmCellularUsageHistory_parameters.networkId = !!getNetworkSmCellularUsageHistory_parameters.networkId ? getNetworkSmCellularUsageHistory_parameters.networkId : msg.payload;
                
                getNetworkSmCellularUsageHistory_nodeParam = node.getNetworkSmCellularUsageHistory_id;
                getNetworkSmCellularUsageHistory_nodeParamType = node.getNetworkSmCellularUsageHistory_idType;
                if (getNetworkSmCellularUsageHistory_nodeParamType === 'str') {
                    //getNetworkSmCellularUsageHistory_parameters.id = getNetworkSmCellularUsageHistory_nodeParam || '';
                    getNetworkSmCellularUsageHistory_parameters.id = getNetworkSmCellularUsageHistory_nodeParam || undefined;
                } else {
                    getNetworkSmCellularUsageHistory_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmCellularUsageHistory_nodeParam);
                }
                //getNetworkSmCellularUsageHistory_parameters.id = !!getNetworkSmCellularUsageHistory_parameters.id ? getNetworkSmCellularUsageHistory_parameters.id : msg.payload;
                                result = client.getNetworkSmCellularUsageHistory(getNetworkSmCellularUsageHistory_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmPerformanceHistory') {
                var getNetworkSmPerformanceHistory_parameters = [];
                var getNetworkSmPerformanceHistory_nodeParam;
                var getNetworkSmPerformanceHistory_nodeParamType;

                getNetworkSmPerformanceHistory_nodeParam = node.getNetworkSmPerformanceHistory_networkId;
                getNetworkSmPerformanceHistory_nodeParamType = node.getNetworkSmPerformanceHistory_networkIdType;
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    //getNetworkSmPerformanceHistory_parameters.networkId = getNetworkSmPerformanceHistory_nodeParam || '';
                    getNetworkSmPerformanceHistory_parameters.networkId = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    getNetworkSmPerformanceHistory_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmPerformanceHistory_nodeParam);
                }
                //getNetworkSmPerformanceHistory_parameters.networkId = !!getNetworkSmPerformanceHistory_parameters.networkId ? getNetworkSmPerformanceHistory_parameters.networkId : msg.payload;
                
                getNetworkSmPerformanceHistory_nodeParam = node.getNetworkSmPerformanceHistory_id;
                getNetworkSmPerformanceHistory_nodeParamType = node.getNetworkSmPerformanceHistory_idType;
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    //getNetworkSmPerformanceHistory_parameters.id = getNetworkSmPerformanceHistory_nodeParam || '';
                    getNetworkSmPerformanceHistory_parameters.id = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    getNetworkSmPerformanceHistory_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmPerformanceHistory_nodeParam);
                }
                //getNetworkSmPerformanceHistory_parameters.id = !!getNetworkSmPerformanceHistory_parameters.id ? getNetworkSmPerformanceHistory_parameters.id : msg.payload;
                
                getNetworkSmPerformanceHistory_nodeParam = node.getNetworkSmPerformanceHistory_perPage;
                getNetworkSmPerformanceHistory_nodeParamType = node.getNetworkSmPerformanceHistory_perPageType;
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    //getNetworkSmPerformanceHistory_parameters.perPage = getNetworkSmPerformanceHistory_nodeParam || '';
                    getNetworkSmPerformanceHistory_parameters.perPage = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    getNetworkSmPerformanceHistory_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkSmPerformanceHistory_nodeParam);
                }
                //getNetworkSmPerformanceHistory_parameters.perPage = !!getNetworkSmPerformanceHistory_parameters.perPage ? getNetworkSmPerformanceHistory_parameters.perPage : msg.payload;
                
                getNetworkSmPerformanceHistory_nodeParam = node.getNetworkSmPerformanceHistory_startingAfter;
                getNetworkSmPerformanceHistory_nodeParamType = node.getNetworkSmPerformanceHistory_startingAfterType;
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    //getNetworkSmPerformanceHistory_parameters.startingAfter = getNetworkSmPerformanceHistory_nodeParam || '';
                    getNetworkSmPerformanceHistory_parameters.startingAfter = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    getNetworkSmPerformanceHistory_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkSmPerformanceHistory_nodeParam);
                }
                //getNetworkSmPerformanceHistory_parameters.startingAfter = !!getNetworkSmPerformanceHistory_parameters.startingAfter ? getNetworkSmPerformanceHistory_parameters.startingAfter : msg.payload;
                
                getNetworkSmPerformanceHistory_nodeParam = node.getNetworkSmPerformanceHistory_endingBefore;
                getNetworkSmPerformanceHistory_nodeParamType = node.getNetworkSmPerformanceHistory_endingBeforeType;
                if (getNetworkSmPerformanceHistory_nodeParamType === 'str') {
                    //getNetworkSmPerformanceHistory_parameters.endingBefore = getNetworkSmPerformanceHistory_nodeParam || '';
                    getNetworkSmPerformanceHistory_parameters.endingBefore = getNetworkSmPerformanceHistory_nodeParam || undefined;
                } else {
                    getNetworkSmPerformanceHistory_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkSmPerformanceHistory_nodeParam);
                }
                //getNetworkSmPerformanceHistory_parameters.endingBefore = !!getNetworkSmPerformanceHistory_parameters.endingBefore ? getNetworkSmPerformanceHistory_parameters.endingBefore : msg.payload;
                                result = client.getNetworkSmPerformanceHistory(getNetworkSmPerformanceHistory_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmDesktopLogs') {
                var getNetworkSmDesktopLogs_parameters = [];
                var getNetworkSmDesktopLogs_nodeParam;
                var getNetworkSmDesktopLogs_nodeParamType;

                getNetworkSmDesktopLogs_nodeParam = node.getNetworkSmDesktopLogs_networkId;
                getNetworkSmDesktopLogs_nodeParamType = node.getNetworkSmDesktopLogs_networkIdType;
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    //getNetworkSmDesktopLogs_parameters.networkId = getNetworkSmDesktopLogs_nodeParam || '';
                    getNetworkSmDesktopLogs_parameters.networkId = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDesktopLogs_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmDesktopLogs_nodeParam);
                }
                //getNetworkSmDesktopLogs_parameters.networkId = !!getNetworkSmDesktopLogs_parameters.networkId ? getNetworkSmDesktopLogs_parameters.networkId : msg.payload;
                
                getNetworkSmDesktopLogs_nodeParam = node.getNetworkSmDesktopLogs_id;
                getNetworkSmDesktopLogs_nodeParamType = node.getNetworkSmDesktopLogs_idType;
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    //getNetworkSmDesktopLogs_parameters.id = getNetworkSmDesktopLogs_nodeParam || '';
                    getNetworkSmDesktopLogs_parameters.id = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDesktopLogs_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmDesktopLogs_nodeParam);
                }
                //getNetworkSmDesktopLogs_parameters.id = !!getNetworkSmDesktopLogs_parameters.id ? getNetworkSmDesktopLogs_parameters.id : msg.payload;
                
                getNetworkSmDesktopLogs_nodeParam = node.getNetworkSmDesktopLogs_perPage;
                getNetworkSmDesktopLogs_nodeParamType = node.getNetworkSmDesktopLogs_perPageType;
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    //getNetworkSmDesktopLogs_parameters.perPage = getNetworkSmDesktopLogs_nodeParam || '';
                    getNetworkSmDesktopLogs_parameters.perPage = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDesktopLogs_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkSmDesktopLogs_nodeParam);
                }
                //getNetworkSmDesktopLogs_parameters.perPage = !!getNetworkSmDesktopLogs_parameters.perPage ? getNetworkSmDesktopLogs_parameters.perPage : msg.payload;
                
                getNetworkSmDesktopLogs_nodeParam = node.getNetworkSmDesktopLogs_startingAfter;
                getNetworkSmDesktopLogs_nodeParamType = node.getNetworkSmDesktopLogs_startingAfterType;
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    //getNetworkSmDesktopLogs_parameters.startingAfter = getNetworkSmDesktopLogs_nodeParam || '';
                    getNetworkSmDesktopLogs_parameters.startingAfter = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDesktopLogs_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkSmDesktopLogs_nodeParam);
                }
                //getNetworkSmDesktopLogs_parameters.startingAfter = !!getNetworkSmDesktopLogs_parameters.startingAfter ? getNetworkSmDesktopLogs_parameters.startingAfter : msg.payload;
                
                getNetworkSmDesktopLogs_nodeParam = node.getNetworkSmDesktopLogs_endingBefore;
                getNetworkSmDesktopLogs_nodeParamType = node.getNetworkSmDesktopLogs_endingBeforeType;
                if (getNetworkSmDesktopLogs_nodeParamType === 'str') {
                    //getNetworkSmDesktopLogs_parameters.endingBefore = getNetworkSmDesktopLogs_nodeParam || '';
                    getNetworkSmDesktopLogs_parameters.endingBefore = getNetworkSmDesktopLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDesktopLogs_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkSmDesktopLogs_nodeParam);
                }
                //getNetworkSmDesktopLogs_parameters.endingBefore = !!getNetworkSmDesktopLogs_parameters.endingBefore ? getNetworkSmDesktopLogs_parameters.endingBefore : msg.payload;
                                result = client.getNetworkSmDesktopLogs(getNetworkSmDesktopLogs_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmDeviceCommandLogs') {
                var getNetworkSmDeviceCommandLogs_parameters = [];
                var getNetworkSmDeviceCommandLogs_nodeParam;
                var getNetworkSmDeviceCommandLogs_nodeParamType;

                getNetworkSmDeviceCommandLogs_nodeParam = node.getNetworkSmDeviceCommandLogs_networkId;
                getNetworkSmDeviceCommandLogs_nodeParamType = node.getNetworkSmDeviceCommandLogs_networkIdType;
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    //getNetworkSmDeviceCommandLogs_parameters.networkId = getNetworkSmDeviceCommandLogs_nodeParam || '';
                    getNetworkSmDeviceCommandLogs_parameters.networkId = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceCommandLogs_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmDeviceCommandLogs_nodeParam);
                }
                //getNetworkSmDeviceCommandLogs_parameters.networkId = !!getNetworkSmDeviceCommandLogs_parameters.networkId ? getNetworkSmDeviceCommandLogs_parameters.networkId : msg.payload;
                
                getNetworkSmDeviceCommandLogs_nodeParam = node.getNetworkSmDeviceCommandLogs_id;
                getNetworkSmDeviceCommandLogs_nodeParamType = node.getNetworkSmDeviceCommandLogs_idType;
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    //getNetworkSmDeviceCommandLogs_parameters.id = getNetworkSmDeviceCommandLogs_nodeParam || '';
                    getNetworkSmDeviceCommandLogs_parameters.id = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceCommandLogs_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmDeviceCommandLogs_nodeParam);
                }
                //getNetworkSmDeviceCommandLogs_parameters.id = !!getNetworkSmDeviceCommandLogs_parameters.id ? getNetworkSmDeviceCommandLogs_parameters.id : msg.payload;
                
                getNetworkSmDeviceCommandLogs_nodeParam = node.getNetworkSmDeviceCommandLogs_perPage;
                getNetworkSmDeviceCommandLogs_nodeParamType = node.getNetworkSmDeviceCommandLogs_perPageType;
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    //getNetworkSmDeviceCommandLogs_parameters.perPage = getNetworkSmDeviceCommandLogs_nodeParam || '';
                    getNetworkSmDeviceCommandLogs_parameters.perPage = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceCommandLogs_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkSmDeviceCommandLogs_nodeParam);
                }
                //getNetworkSmDeviceCommandLogs_parameters.perPage = !!getNetworkSmDeviceCommandLogs_parameters.perPage ? getNetworkSmDeviceCommandLogs_parameters.perPage : msg.payload;
                
                getNetworkSmDeviceCommandLogs_nodeParam = node.getNetworkSmDeviceCommandLogs_startingAfter;
                getNetworkSmDeviceCommandLogs_nodeParamType = node.getNetworkSmDeviceCommandLogs_startingAfterType;
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    //getNetworkSmDeviceCommandLogs_parameters.startingAfter = getNetworkSmDeviceCommandLogs_nodeParam || '';
                    getNetworkSmDeviceCommandLogs_parameters.startingAfter = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceCommandLogs_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkSmDeviceCommandLogs_nodeParam);
                }
                //getNetworkSmDeviceCommandLogs_parameters.startingAfter = !!getNetworkSmDeviceCommandLogs_parameters.startingAfter ? getNetworkSmDeviceCommandLogs_parameters.startingAfter : msg.payload;
                
                getNetworkSmDeviceCommandLogs_nodeParam = node.getNetworkSmDeviceCommandLogs_endingBefore;
                getNetworkSmDeviceCommandLogs_nodeParamType = node.getNetworkSmDeviceCommandLogs_endingBeforeType;
                if (getNetworkSmDeviceCommandLogs_nodeParamType === 'str') {
                    //getNetworkSmDeviceCommandLogs_parameters.endingBefore = getNetworkSmDeviceCommandLogs_nodeParam || '';
                    getNetworkSmDeviceCommandLogs_parameters.endingBefore = getNetworkSmDeviceCommandLogs_nodeParam || undefined;
                } else {
                    getNetworkSmDeviceCommandLogs_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkSmDeviceCommandLogs_nodeParam);
                }
                //getNetworkSmDeviceCommandLogs_parameters.endingBefore = !!getNetworkSmDeviceCommandLogs_parameters.endingBefore ? getNetworkSmDeviceCommandLogs_parameters.endingBefore : msg.payload;
                                result = client.getNetworkSmDeviceCommandLogs(getNetworkSmDeviceCommandLogs_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSmConnectivity') {
                var getNetworkSmConnectivity_parameters = [];
                var getNetworkSmConnectivity_nodeParam;
                var getNetworkSmConnectivity_nodeParamType;

                getNetworkSmConnectivity_nodeParam = node.getNetworkSmConnectivity_networkId;
                getNetworkSmConnectivity_nodeParamType = node.getNetworkSmConnectivity_networkIdType;
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    //getNetworkSmConnectivity_parameters.networkId = getNetworkSmConnectivity_nodeParam || '';
                    getNetworkSmConnectivity_parameters.networkId = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    getNetworkSmConnectivity_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSmConnectivity_nodeParam);
                }
                //getNetworkSmConnectivity_parameters.networkId = !!getNetworkSmConnectivity_parameters.networkId ? getNetworkSmConnectivity_parameters.networkId : msg.payload;
                
                getNetworkSmConnectivity_nodeParam = node.getNetworkSmConnectivity_id;
                getNetworkSmConnectivity_nodeParamType = node.getNetworkSmConnectivity_idType;
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    //getNetworkSmConnectivity_parameters.id = getNetworkSmConnectivity_nodeParam || '';
                    getNetworkSmConnectivity_parameters.id = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    getNetworkSmConnectivity_parameters.id = RED.util.getMessageProperty(msg, getNetworkSmConnectivity_nodeParam);
                }
                //getNetworkSmConnectivity_parameters.id = !!getNetworkSmConnectivity_parameters.id ? getNetworkSmConnectivity_parameters.id : msg.payload;
                
                getNetworkSmConnectivity_nodeParam = node.getNetworkSmConnectivity_perPage;
                getNetworkSmConnectivity_nodeParamType = node.getNetworkSmConnectivity_perPageType;
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    //getNetworkSmConnectivity_parameters.perPage = getNetworkSmConnectivity_nodeParam || '';
                    getNetworkSmConnectivity_parameters.perPage = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    getNetworkSmConnectivity_parameters.perPage = RED.util.getMessageProperty(msg, getNetworkSmConnectivity_nodeParam);
                }
                //getNetworkSmConnectivity_parameters.perPage = !!getNetworkSmConnectivity_parameters.perPage ? getNetworkSmConnectivity_parameters.perPage : msg.payload;
                
                getNetworkSmConnectivity_nodeParam = node.getNetworkSmConnectivity_startingAfter;
                getNetworkSmConnectivity_nodeParamType = node.getNetworkSmConnectivity_startingAfterType;
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    //getNetworkSmConnectivity_parameters.startingAfter = getNetworkSmConnectivity_nodeParam || '';
                    getNetworkSmConnectivity_parameters.startingAfter = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    getNetworkSmConnectivity_parameters.startingAfter = RED.util.getMessageProperty(msg, getNetworkSmConnectivity_nodeParam);
                }
                //getNetworkSmConnectivity_parameters.startingAfter = !!getNetworkSmConnectivity_parameters.startingAfter ? getNetworkSmConnectivity_parameters.startingAfter : msg.payload;
                
                getNetworkSmConnectivity_nodeParam = node.getNetworkSmConnectivity_endingBefore;
                getNetworkSmConnectivity_nodeParamType = node.getNetworkSmConnectivity_endingBeforeType;
                if (getNetworkSmConnectivity_nodeParamType === 'str') {
                    //getNetworkSmConnectivity_parameters.endingBefore = getNetworkSmConnectivity_nodeParam || '';
                    getNetworkSmConnectivity_parameters.endingBefore = getNetworkSmConnectivity_nodeParam || undefined;
                } else {
                    getNetworkSmConnectivity_parameters.endingBefore = RED.util.getMessageProperty(msg, getNetworkSmConnectivity_nodeParam);
                }
                //getNetworkSmConnectivity_parameters.endingBefore = !!getNetworkSmConnectivity_parameters.endingBefore ? getNetworkSmConnectivity_parameters.endingBefore : msg.payload;
                                result = client.getNetworkSmConnectivity(getNetworkSmConnectivity_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSplashLoginAttempts') {
                var getNetworkSplashLoginAttempts_parameters = [];
                var getNetworkSplashLoginAttempts_nodeParam;
                var getNetworkSplashLoginAttempts_nodeParamType;

                getNetworkSplashLoginAttempts_nodeParam = node.getNetworkSplashLoginAttempts_id;
                getNetworkSplashLoginAttempts_nodeParamType = node.getNetworkSplashLoginAttempts_idType;
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    //getNetworkSplashLoginAttempts_parameters.id = getNetworkSplashLoginAttempts_nodeParam || '';
                    getNetworkSplashLoginAttempts_parameters.id = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    getNetworkSplashLoginAttempts_parameters.id = RED.util.getMessageProperty(msg, getNetworkSplashLoginAttempts_nodeParam);
                }
                //getNetworkSplashLoginAttempts_parameters.id = !!getNetworkSplashLoginAttempts_parameters.id ? getNetworkSplashLoginAttempts_parameters.id : msg.payload;
                
                getNetworkSplashLoginAttempts_nodeParam = node.getNetworkSplashLoginAttempts_ssidNumber;
                getNetworkSplashLoginAttempts_nodeParamType = node.getNetworkSplashLoginAttempts_ssidNumberType;
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    //getNetworkSplashLoginAttempts_parameters.ssidNumber = getNetworkSplashLoginAttempts_nodeParam || '';
                    getNetworkSplashLoginAttempts_parameters.ssidNumber = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    getNetworkSplashLoginAttempts_parameters.ssidNumber = RED.util.getMessageProperty(msg, getNetworkSplashLoginAttempts_nodeParam);
                }
                //getNetworkSplashLoginAttempts_parameters.ssidNumber = !!getNetworkSplashLoginAttempts_parameters.ssidNumber ? getNetworkSplashLoginAttempts_parameters.ssidNumber : msg.payload;
                
                getNetworkSplashLoginAttempts_nodeParam = node.getNetworkSplashLoginAttempts_loginIdentifier;
                getNetworkSplashLoginAttempts_nodeParamType = node.getNetworkSplashLoginAttempts_loginIdentifierType;
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    //getNetworkSplashLoginAttempts_parameters.loginIdentifier = getNetworkSplashLoginAttempts_nodeParam || '';
                    getNetworkSplashLoginAttempts_parameters.loginIdentifier = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    getNetworkSplashLoginAttempts_parameters.loginIdentifier = RED.util.getMessageProperty(msg, getNetworkSplashLoginAttempts_nodeParam);
                }
                //getNetworkSplashLoginAttempts_parameters.loginIdentifier = !!getNetworkSplashLoginAttempts_parameters.loginIdentifier ? getNetworkSplashLoginAttempts_parameters.loginIdentifier : msg.payload;
                
                getNetworkSplashLoginAttempts_nodeParam = node.getNetworkSplashLoginAttempts_timespan;
                getNetworkSplashLoginAttempts_nodeParamType = node.getNetworkSplashLoginAttempts_timespanType;
                if (getNetworkSplashLoginAttempts_nodeParamType === 'str') {
                    //getNetworkSplashLoginAttempts_parameters.timespan = getNetworkSplashLoginAttempts_nodeParam || '';
                    getNetworkSplashLoginAttempts_parameters.timespan = getNetworkSplashLoginAttempts_nodeParam || undefined;
                } else {
                    getNetworkSplashLoginAttempts_parameters.timespan = RED.util.getMessageProperty(msg, getNetworkSplashLoginAttempts_nodeParam);
                }
                //getNetworkSplashLoginAttempts_parameters.timespan = !!getNetworkSplashLoginAttempts_parameters.timespan ? getNetworkSplashLoginAttempts_parameters.timespan : msg.payload;
                                result = client.getNetworkSplashLoginAttempts(getNetworkSplashLoginAttempts_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSsidSplashSettings') {
                var getNetworkSsidSplashSettings_parameters = [];
                var getNetworkSsidSplashSettings_nodeParam;
                var getNetworkSsidSplashSettings_nodeParamType;

                getNetworkSsidSplashSettings_nodeParam = node.getNetworkSsidSplashSettings_networkId;
                getNetworkSsidSplashSettings_nodeParamType = node.getNetworkSsidSplashSettings_networkIdType;
                if (getNetworkSsidSplashSettings_nodeParamType === 'str') {
                    //getNetworkSsidSplashSettings_parameters.networkId = getNetworkSsidSplashSettings_nodeParam || '';
                    getNetworkSsidSplashSettings_parameters.networkId = getNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    getNetworkSsidSplashSettings_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSsidSplashSettings_nodeParam);
                }
                //getNetworkSsidSplashSettings_parameters.networkId = !!getNetworkSsidSplashSettings_parameters.networkId ? getNetworkSsidSplashSettings_parameters.networkId : msg.payload;
                
                getNetworkSsidSplashSettings_nodeParam = node.getNetworkSsidSplashSettings_number;
                getNetworkSsidSplashSettings_nodeParamType = node.getNetworkSsidSplashSettings_numberType;
                if (getNetworkSsidSplashSettings_nodeParamType === 'str') {
                    //getNetworkSsidSplashSettings_parameters.number = getNetworkSsidSplashSettings_nodeParam || '';
                    getNetworkSsidSplashSettings_parameters.number = getNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    getNetworkSsidSplashSettings_parameters.number = RED.util.getMessageProperty(msg, getNetworkSsidSplashSettings_nodeParam);
                }
                //getNetworkSsidSplashSettings_parameters.number = !!getNetworkSsidSplashSettings_parameters.number ? getNetworkSsidSplashSettings_parameters.number : msg.payload;
                                result = client.getNetworkSsidSplashSettings(getNetworkSsidSplashSettings_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSsidSplashSettings') {
                var updateNetworkSsidSplashSettings_parameters = [];
                var updateNetworkSsidSplashSettings_nodeParam;
                var updateNetworkSsidSplashSettings_nodeParamType;

                updateNetworkSsidSplashSettings_nodeParam = node.updateNetworkSsidSplashSettings_networkId;
                updateNetworkSsidSplashSettings_nodeParamType = node.updateNetworkSsidSplashSettings_networkIdType;
                if (updateNetworkSsidSplashSettings_nodeParamType === 'str') {
                    //updateNetworkSsidSplashSettings_parameters.networkId = updateNetworkSsidSplashSettings_nodeParam || '';
                    updateNetworkSsidSplashSettings_parameters.networkId = updateNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    updateNetworkSsidSplashSettings_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSsidSplashSettings_nodeParam);
                }
                //updateNetworkSsidSplashSettings_parameters.networkId = !!updateNetworkSsidSplashSettings_parameters.networkId ? updateNetworkSsidSplashSettings_parameters.networkId : msg.payload;
                
                updateNetworkSsidSplashSettings_nodeParam = node.updateNetworkSsidSplashSettings_number;
                updateNetworkSsidSplashSettings_nodeParamType = node.updateNetworkSsidSplashSettings_numberType;
                if (updateNetworkSsidSplashSettings_nodeParamType === 'str') {
                    //updateNetworkSsidSplashSettings_parameters.number = updateNetworkSsidSplashSettings_nodeParam || '';
                    updateNetworkSsidSplashSettings_parameters.number = updateNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    updateNetworkSsidSplashSettings_parameters.number = RED.util.getMessageProperty(msg, updateNetworkSsidSplashSettings_nodeParam);
                }
                //updateNetworkSsidSplashSettings_parameters.number = !!updateNetworkSsidSplashSettings_parameters.number ? updateNetworkSsidSplashSettings_parameters.number : msg.payload;
                
                updateNetworkSsidSplashSettings_nodeParam = node.updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettings;
                updateNetworkSsidSplashSettings_nodeParamType = node.updateNetworkSsidSplashSettings_updateNetworkSsidSplashSettingsType;
                if (updateNetworkSsidSplashSettings_nodeParamType === 'str') {
                    //updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings = updateNetworkSsidSplashSettings_nodeParam || '';
                    updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings = updateNetworkSsidSplashSettings_nodeParam || undefined;
                } else {
                    updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings = RED.util.getMessageProperty(msg, updateNetworkSsidSplashSettings_nodeParam);
                }
                //updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings = !!updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings ? updateNetworkSsidSplashSettings_parameters.updateNetworkSsidSplashSettings : msg.payload;
                                result = client.updateNetworkSsidSplashSettings(updateNetworkSsidSplashSettings_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSsids') {
                var getNetworkSsids_parameters = [];
                var getNetworkSsids_nodeParam;
                var getNetworkSsids_nodeParamType;

                getNetworkSsids_nodeParam = node.getNetworkSsids_networkId;
                getNetworkSsids_nodeParamType = node.getNetworkSsids_networkIdType;
                if (getNetworkSsids_nodeParamType === 'str') {
                    //getNetworkSsids_parameters.networkId = getNetworkSsids_nodeParam || '';
                    getNetworkSsids_parameters.networkId = getNetworkSsids_nodeParam || undefined;
                } else {
                    getNetworkSsids_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSsids_nodeParam);
                }
                //getNetworkSsids_parameters.networkId = !!getNetworkSsids_parameters.networkId ? getNetworkSsids_parameters.networkId : msg.payload;
                                result = client.getNetworkSsids(getNetworkSsids_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSsid') {
                var getNetworkSsid_parameters = [];
                var getNetworkSsid_nodeParam;
                var getNetworkSsid_nodeParamType;

                getNetworkSsid_nodeParam = node.getNetworkSsid_networkId;
                getNetworkSsid_nodeParamType = node.getNetworkSsid_networkIdType;
                if (getNetworkSsid_nodeParamType === 'str') {
                    //getNetworkSsid_parameters.networkId = getNetworkSsid_nodeParam || '';
                    getNetworkSsid_parameters.networkId = getNetworkSsid_nodeParam || undefined;
                } else {
                    getNetworkSsid_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSsid_nodeParam);
                }
                //getNetworkSsid_parameters.networkId = !!getNetworkSsid_parameters.networkId ? getNetworkSsid_parameters.networkId : msg.payload;
                
                getNetworkSsid_nodeParam = node.getNetworkSsid_number;
                getNetworkSsid_nodeParamType = node.getNetworkSsid_numberType;
                if (getNetworkSsid_nodeParamType === 'str') {
                    //getNetworkSsid_parameters.number = getNetworkSsid_nodeParam || '';
                    getNetworkSsid_parameters.number = getNetworkSsid_nodeParam || undefined;
                } else {
                    getNetworkSsid_parameters.number = RED.util.getMessageProperty(msg, getNetworkSsid_nodeParam);
                }
                //getNetworkSsid_parameters.number = !!getNetworkSsid_parameters.number ? getNetworkSsid_parameters.number : msg.payload;
                                result = client.getNetworkSsid(getNetworkSsid_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSsid') {
                var updateNetworkSsid_parameters = [];
                var updateNetworkSsid_nodeParam;
                var updateNetworkSsid_nodeParamType;

                updateNetworkSsid_nodeParam = node.updateNetworkSsid_networkId;
                updateNetworkSsid_nodeParamType = node.updateNetworkSsid_networkIdType;
                if (updateNetworkSsid_nodeParamType === 'str') {
                    //updateNetworkSsid_parameters.networkId = updateNetworkSsid_nodeParam || '';
                    updateNetworkSsid_parameters.networkId = updateNetworkSsid_nodeParam || undefined;
                } else {
                    updateNetworkSsid_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSsid_nodeParam);
                }
                //updateNetworkSsid_parameters.networkId = !!updateNetworkSsid_parameters.networkId ? updateNetworkSsid_parameters.networkId : msg.payload;
                
                updateNetworkSsid_nodeParam = node.updateNetworkSsid_number;
                updateNetworkSsid_nodeParamType = node.updateNetworkSsid_numberType;
                if (updateNetworkSsid_nodeParamType === 'str') {
                    //updateNetworkSsid_parameters.number = updateNetworkSsid_nodeParam || '';
                    updateNetworkSsid_parameters.number = updateNetworkSsid_nodeParam || undefined;
                } else {
                    updateNetworkSsid_parameters.number = RED.util.getMessageProperty(msg, updateNetworkSsid_nodeParam);
                }
                //updateNetworkSsid_parameters.number = !!updateNetworkSsid_parameters.number ? updateNetworkSsid_parameters.number : msg.payload;
                
                updateNetworkSsid_nodeParam = node.updateNetworkSsid_updateNetworkSsid;
                updateNetworkSsid_nodeParamType = node.updateNetworkSsid_updateNetworkSsidType;
                if (updateNetworkSsid_nodeParamType === 'str') {
                    //updateNetworkSsid_parameters.updateNetworkSsid = updateNetworkSsid_nodeParam || '';
                    updateNetworkSsid_parameters.updateNetworkSsid = updateNetworkSsid_nodeParam || undefined;
                } else {
                    updateNetworkSsid_parameters.updateNetworkSsid = RED.util.getMessageProperty(msg, updateNetworkSsid_nodeParam);
                }
                //updateNetworkSsid_parameters.updateNetworkSsid = !!updateNetworkSsid_parameters.updateNetworkSsid ? updateNetworkSsid_parameters.updateNetworkSsid : msg.payload;
                                result = client.updateNetworkSsid(updateNetworkSsid_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSwitchSettings') {
                var getNetworkSwitchSettings_parameters = [];
                var getNetworkSwitchSettings_nodeParam;
                var getNetworkSwitchSettings_nodeParamType;

                getNetworkSwitchSettings_nodeParam = node.getNetworkSwitchSettings_networkId;
                getNetworkSwitchSettings_nodeParamType = node.getNetworkSwitchSettings_networkIdType;
                if (getNetworkSwitchSettings_nodeParamType === 'str') {
                    //getNetworkSwitchSettings_parameters.networkId = getNetworkSwitchSettings_nodeParam || '';
                    getNetworkSwitchSettings_parameters.networkId = getNetworkSwitchSettings_nodeParam || undefined;
                } else {
                    getNetworkSwitchSettings_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSwitchSettings_nodeParam);
                }
                //getNetworkSwitchSettings_parameters.networkId = !!getNetworkSwitchSettings_parameters.networkId ? getNetworkSwitchSettings_parameters.networkId : msg.payload;
                                result = client.getNetworkSwitchSettings(getNetworkSwitchSettings_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSwitchSettings') {
                var updateNetworkSwitchSettings_parameters = [];
                var updateNetworkSwitchSettings_nodeParam;
                var updateNetworkSwitchSettings_nodeParamType;

                updateNetworkSwitchSettings_nodeParam = node.updateNetworkSwitchSettings_networkId;
                updateNetworkSwitchSettings_nodeParamType = node.updateNetworkSwitchSettings_networkIdType;
                if (updateNetworkSwitchSettings_nodeParamType === 'str') {
                    //updateNetworkSwitchSettings_parameters.networkId = updateNetworkSwitchSettings_nodeParam || '';
                    updateNetworkSwitchSettings_parameters.networkId = updateNetworkSwitchSettings_nodeParam || undefined;
                } else {
                    updateNetworkSwitchSettings_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSwitchSettings_nodeParam);
                }
                //updateNetworkSwitchSettings_parameters.networkId = !!updateNetworkSwitchSettings_parameters.networkId ? updateNetworkSwitchSettings_parameters.networkId : msg.payload;
                
                updateNetworkSwitchSettings_nodeParam = node.updateNetworkSwitchSettings_updateNetworkSwitchSettings;
                updateNetworkSwitchSettings_nodeParamType = node.updateNetworkSwitchSettings_updateNetworkSwitchSettingsType;
                if (updateNetworkSwitchSettings_nodeParamType === 'str') {
                    //updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings = updateNetworkSwitchSettings_nodeParam || '';
                    updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings = updateNetworkSwitchSettings_nodeParam || undefined;
                } else {
                    updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings = RED.util.getMessageProperty(msg, updateNetworkSwitchSettings_nodeParam);
                }
                //updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings = !!updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings ? updateNetworkSwitchSettings_parameters.updateNetworkSwitchSettings : msg.payload;
                                result = client.updateNetworkSwitchSettings(updateNetworkSwitchSettings_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceSwitchPorts') {
                var getDeviceSwitchPorts_parameters = [];
                var getDeviceSwitchPorts_nodeParam;
                var getDeviceSwitchPorts_nodeParamType;

                getDeviceSwitchPorts_nodeParam = node.getDeviceSwitchPorts_serial;
                getDeviceSwitchPorts_nodeParamType = node.getDeviceSwitchPorts_serialType;
                if (getDeviceSwitchPorts_nodeParamType === 'str') {
                    //getDeviceSwitchPorts_parameters.serial = getDeviceSwitchPorts_nodeParam || '';
                    getDeviceSwitchPorts_parameters.serial = getDeviceSwitchPorts_nodeParam || undefined;
                } else {
                    getDeviceSwitchPorts_parameters.serial = RED.util.getMessageProperty(msg, getDeviceSwitchPorts_nodeParam);
                }
                //getDeviceSwitchPorts_parameters.serial = !!getDeviceSwitchPorts_parameters.serial ? getDeviceSwitchPorts_parameters.serial : msg.payload;
                                result = client.getDeviceSwitchPorts(getDeviceSwitchPorts_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceSwitchPort') {
                var getDeviceSwitchPort_parameters = [];
                var getDeviceSwitchPort_nodeParam;
                var getDeviceSwitchPort_nodeParamType;

                getDeviceSwitchPort_nodeParam = node.getDeviceSwitchPort_serial;
                getDeviceSwitchPort_nodeParamType = node.getDeviceSwitchPort_serialType;
                if (getDeviceSwitchPort_nodeParamType === 'str') {
                    //getDeviceSwitchPort_parameters.serial = getDeviceSwitchPort_nodeParam || '';
                    getDeviceSwitchPort_parameters.serial = getDeviceSwitchPort_nodeParam || undefined;
                } else {
                    getDeviceSwitchPort_parameters.serial = RED.util.getMessageProperty(msg, getDeviceSwitchPort_nodeParam);
                }
                //getDeviceSwitchPort_parameters.serial = !!getDeviceSwitchPort_parameters.serial ? getDeviceSwitchPort_parameters.serial : msg.payload;
                
                getDeviceSwitchPort_nodeParam = node.getDeviceSwitchPort_number;
                getDeviceSwitchPort_nodeParamType = node.getDeviceSwitchPort_numberType;
                if (getDeviceSwitchPort_nodeParamType === 'str') {
                    //getDeviceSwitchPort_parameters.number = getDeviceSwitchPort_nodeParam || '';
                    getDeviceSwitchPort_parameters.number = getDeviceSwitchPort_nodeParam || undefined;
                } else {
                    getDeviceSwitchPort_parameters.number = RED.util.getMessageProperty(msg, getDeviceSwitchPort_nodeParam);
                }
                //getDeviceSwitchPort_parameters.number = !!getDeviceSwitchPort_parameters.number ? getDeviceSwitchPort_parameters.number : msg.payload;
                                result = client.getDeviceSwitchPort(getDeviceSwitchPort_parameters);
            }
            if (!errorFlag && node.method === 'updateDeviceSwitchPort') {
                var updateDeviceSwitchPort_parameters = [];
                var updateDeviceSwitchPort_nodeParam;
                var updateDeviceSwitchPort_nodeParamType;

                updateDeviceSwitchPort_nodeParam = node.updateDeviceSwitchPort_serial;
                updateDeviceSwitchPort_nodeParamType = node.updateDeviceSwitchPort_serialType;
                if (updateDeviceSwitchPort_nodeParamType === 'str') {
                    //updateDeviceSwitchPort_parameters.serial = updateDeviceSwitchPort_nodeParam || '';
                    updateDeviceSwitchPort_parameters.serial = updateDeviceSwitchPort_nodeParam || undefined;
                } else {
                    updateDeviceSwitchPort_parameters.serial = RED.util.getMessageProperty(msg, updateDeviceSwitchPort_nodeParam);
                }
                //updateDeviceSwitchPort_parameters.serial = !!updateDeviceSwitchPort_parameters.serial ? updateDeviceSwitchPort_parameters.serial : msg.payload;
                
                updateDeviceSwitchPort_nodeParam = node.updateDeviceSwitchPort_number;
                updateDeviceSwitchPort_nodeParamType = node.updateDeviceSwitchPort_numberType;
                if (updateDeviceSwitchPort_nodeParamType === 'str') {
                    //updateDeviceSwitchPort_parameters.number = updateDeviceSwitchPort_nodeParam || '';
                    updateDeviceSwitchPort_parameters.number = updateDeviceSwitchPort_nodeParam || undefined;
                } else {
                    updateDeviceSwitchPort_parameters.number = RED.util.getMessageProperty(msg, updateDeviceSwitchPort_nodeParam);
                }
                //updateDeviceSwitchPort_parameters.number = !!updateDeviceSwitchPort_parameters.number ? updateDeviceSwitchPort_parameters.number : msg.payload;
                
                updateDeviceSwitchPort_nodeParam = node.updateDeviceSwitchPort_updateDeviceSwitchPort;
                updateDeviceSwitchPort_nodeParamType = node.updateDeviceSwitchPort_updateDeviceSwitchPortType;
                if (updateDeviceSwitchPort_nodeParamType === 'str') {
                    //updateDeviceSwitchPort_parameters.updateDeviceSwitchPort = updateDeviceSwitchPort_nodeParam || '';
                    updateDeviceSwitchPort_parameters.updateDeviceSwitchPort = updateDeviceSwitchPort_nodeParam || undefined;
                } else {
                    updateDeviceSwitchPort_parameters.updateDeviceSwitchPort = RED.util.getMessageProperty(msg, updateDeviceSwitchPort_nodeParam);
                }
                //updateDeviceSwitchPort_parameters.updateDeviceSwitchPort = !!updateDeviceSwitchPort_parameters.updateDeviceSwitchPort ? updateDeviceSwitchPort_parameters.updateDeviceSwitchPort : msg.payload;
                                result = client.updateDeviceSwitchPort(updateDeviceSwitchPort_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkSyslogServers') {
                var getNetworkSyslogServers_parameters = [];
                var getNetworkSyslogServers_nodeParam;
                var getNetworkSyslogServers_nodeParamType;

                getNetworkSyslogServers_nodeParam = node.getNetworkSyslogServers_networkId;
                getNetworkSyslogServers_nodeParamType = node.getNetworkSyslogServers_networkIdType;
                if (getNetworkSyslogServers_nodeParamType === 'str') {
                    //getNetworkSyslogServers_parameters.networkId = getNetworkSyslogServers_nodeParam || '';
                    getNetworkSyslogServers_parameters.networkId = getNetworkSyslogServers_nodeParam || undefined;
                } else {
                    getNetworkSyslogServers_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkSyslogServers_nodeParam);
                }
                //getNetworkSyslogServers_parameters.networkId = !!getNetworkSyslogServers_parameters.networkId ? getNetworkSyslogServers_parameters.networkId : msg.payload;
                                result = client.getNetworkSyslogServers(getNetworkSyslogServers_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkSyslogServers') {
                var updateNetworkSyslogServers_parameters = [];
                var updateNetworkSyslogServers_nodeParam;
                var updateNetworkSyslogServers_nodeParamType;

                updateNetworkSyslogServers_nodeParam = node.updateNetworkSyslogServers_networkId;
                updateNetworkSyslogServers_nodeParamType = node.updateNetworkSyslogServers_networkIdType;
                if (updateNetworkSyslogServers_nodeParamType === 'str') {
                    //updateNetworkSyslogServers_parameters.networkId = updateNetworkSyslogServers_nodeParam || '';
                    updateNetworkSyslogServers_parameters.networkId = updateNetworkSyslogServers_nodeParam || undefined;
                } else {
                    updateNetworkSyslogServers_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkSyslogServers_nodeParam);
                }
                //updateNetworkSyslogServers_parameters.networkId = !!updateNetworkSyslogServers_parameters.networkId ? updateNetworkSyslogServers_parameters.networkId : msg.payload;
                
                updateNetworkSyslogServers_nodeParam = node.updateNetworkSyslogServers_updateNetworkSyslogServers;
                updateNetworkSyslogServers_nodeParamType = node.updateNetworkSyslogServers_updateNetworkSyslogServersType;
                if (updateNetworkSyslogServers_nodeParamType === 'str') {
                    //updateNetworkSyslogServers_parameters.updateNetworkSyslogServers = updateNetworkSyslogServers_nodeParam || '';
                    updateNetworkSyslogServers_parameters.updateNetworkSyslogServers = updateNetworkSyslogServers_nodeParam || undefined;
                } else {
                    updateNetworkSyslogServers_parameters.updateNetworkSyslogServers = RED.util.getMessageProperty(msg, updateNetworkSyslogServers_nodeParam);
                }
                //updateNetworkSyslogServers_parameters.updateNetworkSyslogServers = !!updateNetworkSyslogServers_parameters.updateNetworkSyslogServers ? updateNetworkSyslogServers_parameters.updateNetworkSyslogServers : msg.payload;
                                result = client.updateNetworkSyslogServers(updateNetworkSyslogServers_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkContentFilteringCategories') {
                var getNetworkContentFilteringCategories_parameters = [];
                var getNetworkContentFilteringCategories_nodeParam;
                var getNetworkContentFilteringCategories_nodeParamType;

                getNetworkContentFilteringCategories_nodeParam = node.getNetworkContentFilteringCategories_networkId;
                getNetworkContentFilteringCategories_nodeParamType = node.getNetworkContentFilteringCategories_networkIdType;
                if (getNetworkContentFilteringCategories_nodeParamType === 'str') {
                    //getNetworkContentFilteringCategories_parameters.networkId = getNetworkContentFilteringCategories_nodeParam || '';
                    getNetworkContentFilteringCategories_parameters.networkId = getNetworkContentFilteringCategories_nodeParam || undefined;
                } else {
                    getNetworkContentFilteringCategories_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkContentFilteringCategories_nodeParam);
                }
                //getNetworkContentFilteringCategories_parameters.networkId = !!getNetworkContentFilteringCategories_parameters.networkId ? getNetworkContentFilteringCategories_parameters.networkId : msg.payload;
                                result = client.getNetworkContentFilteringCategories(getNetworkContentFilteringCategories_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkContentFiltering') {
                var getNetworkContentFiltering_parameters = [];
                var getNetworkContentFiltering_nodeParam;
                var getNetworkContentFiltering_nodeParamType;

                getNetworkContentFiltering_nodeParam = node.getNetworkContentFiltering_networkId;
                getNetworkContentFiltering_nodeParamType = node.getNetworkContentFiltering_networkIdType;
                if (getNetworkContentFiltering_nodeParamType === 'str') {
                    //getNetworkContentFiltering_parameters.networkId = getNetworkContentFiltering_nodeParam || '';
                    getNetworkContentFiltering_parameters.networkId = getNetworkContentFiltering_nodeParam || undefined;
                } else {
                    getNetworkContentFiltering_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkContentFiltering_nodeParam);
                }
                //getNetworkContentFiltering_parameters.networkId = !!getNetworkContentFiltering_parameters.networkId ? getNetworkContentFiltering_parameters.networkId : msg.payload;
                                result = client.getNetworkContentFiltering(getNetworkContentFiltering_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkContentFiltering') {
                var updateNetworkContentFiltering_parameters = [];
                var updateNetworkContentFiltering_nodeParam;
                var updateNetworkContentFiltering_nodeParamType;

                updateNetworkContentFiltering_nodeParam = node.updateNetworkContentFiltering_networkId;
                updateNetworkContentFiltering_nodeParamType = node.updateNetworkContentFiltering_networkIdType;
                if (updateNetworkContentFiltering_nodeParamType === 'str') {
                    //updateNetworkContentFiltering_parameters.networkId = updateNetworkContentFiltering_nodeParam || '';
                    updateNetworkContentFiltering_parameters.networkId = updateNetworkContentFiltering_nodeParam || undefined;
                } else {
                    updateNetworkContentFiltering_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkContentFiltering_nodeParam);
                }
                //updateNetworkContentFiltering_parameters.networkId = !!updateNetworkContentFiltering_parameters.networkId ? updateNetworkContentFiltering_parameters.networkId : msg.payload;
                
                updateNetworkContentFiltering_nodeParam = node.updateNetworkContentFiltering_updateNetworkContentFiltering;
                updateNetworkContentFiltering_nodeParamType = node.updateNetworkContentFiltering_updateNetworkContentFilteringType;
                if (updateNetworkContentFiltering_nodeParamType === 'str') {
                    //updateNetworkContentFiltering_parameters.updateNetworkContentFiltering = updateNetworkContentFiltering_nodeParam || '';
                    updateNetworkContentFiltering_parameters.updateNetworkContentFiltering = updateNetworkContentFiltering_nodeParam || undefined;
                } else {
                    updateNetworkContentFiltering_parameters.updateNetworkContentFiltering = RED.util.getMessageProperty(msg, updateNetworkContentFiltering_nodeParam);
                }
                //updateNetworkContentFiltering_parameters.updateNetworkContentFiltering = !!updateNetworkContentFiltering_parameters.updateNetworkContentFiltering ? updateNetworkContentFiltering_parameters.updateNetworkContentFiltering : msg.payload;
                                result = client.updateNetworkContentFiltering(updateNetworkContentFiltering_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkFirewalledServices') {
                var getNetworkFirewalledServices_parameters = [];
                var getNetworkFirewalledServices_nodeParam;
                var getNetworkFirewalledServices_nodeParamType;

                getNetworkFirewalledServices_nodeParam = node.getNetworkFirewalledServices_networkId;
                getNetworkFirewalledServices_nodeParamType = node.getNetworkFirewalledServices_networkIdType;
                if (getNetworkFirewalledServices_nodeParamType === 'str') {
                    //getNetworkFirewalledServices_parameters.networkId = getNetworkFirewalledServices_nodeParam || '';
                    getNetworkFirewalledServices_parameters.networkId = getNetworkFirewalledServices_nodeParam || undefined;
                } else {
                    getNetworkFirewalledServices_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkFirewalledServices_nodeParam);
                }
                //getNetworkFirewalledServices_parameters.networkId = !!getNetworkFirewalledServices_parameters.networkId ? getNetworkFirewalledServices_parameters.networkId : msg.payload;
                                result = client.getNetworkFirewalledServices(getNetworkFirewalledServices_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkFirewalledService') {
                var getNetworkFirewalledService_parameters = [];
                var getNetworkFirewalledService_nodeParam;
                var getNetworkFirewalledService_nodeParamType;

                getNetworkFirewalledService_nodeParam = node.getNetworkFirewalledService_networkId;
                getNetworkFirewalledService_nodeParamType = node.getNetworkFirewalledService_networkIdType;
                if (getNetworkFirewalledService_nodeParamType === 'str') {
                    //getNetworkFirewalledService_parameters.networkId = getNetworkFirewalledService_nodeParam || '';
                    getNetworkFirewalledService_parameters.networkId = getNetworkFirewalledService_nodeParam || undefined;
                } else {
                    getNetworkFirewalledService_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkFirewalledService_nodeParam);
                }
                //getNetworkFirewalledService_parameters.networkId = !!getNetworkFirewalledService_parameters.networkId ? getNetworkFirewalledService_parameters.networkId : msg.payload;
                
                getNetworkFirewalledService_nodeParam = node.getNetworkFirewalledService_service;
                getNetworkFirewalledService_nodeParamType = node.getNetworkFirewalledService_serviceType;
                if (getNetworkFirewalledService_nodeParamType === 'str') {
                    //getNetworkFirewalledService_parameters.service = getNetworkFirewalledService_nodeParam || '';
                    getNetworkFirewalledService_parameters.service = getNetworkFirewalledService_nodeParam || undefined;
                } else {
                    getNetworkFirewalledService_parameters.service = RED.util.getMessageProperty(msg, getNetworkFirewalledService_nodeParam);
                }
                //getNetworkFirewalledService_parameters.service = !!getNetworkFirewalledService_parameters.service ? getNetworkFirewalledService_parameters.service : msg.payload;
                                result = client.getNetworkFirewalledService(getNetworkFirewalledService_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkFirewalledService') {
                var updateNetworkFirewalledService_parameters = [];
                var updateNetworkFirewalledService_nodeParam;
                var updateNetworkFirewalledService_nodeParamType;

                updateNetworkFirewalledService_nodeParam = node.updateNetworkFirewalledService_networkId;
                updateNetworkFirewalledService_nodeParamType = node.updateNetworkFirewalledService_networkIdType;
                if (updateNetworkFirewalledService_nodeParamType === 'str') {
                    //updateNetworkFirewalledService_parameters.networkId = updateNetworkFirewalledService_nodeParam || '';
                    updateNetworkFirewalledService_parameters.networkId = updateNetworkFirewalledService_nodeParam || undefined;
                } else {
                    updateNetworkFirewalledService_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkFirewalledService_nodeParam);
                }
                //updateNetworkFirewalledService_parameters.networkId = !!updateNetworkFirewalledService_parameters.networkId ? updateNetworkFirewalledService_parameters.networkId : msg.payload;
                
                updateNetworkFirewalledService_nodeParam = node.updateNetworkFirewalledService_service;
                updateNetworkFirewalledService_nodeParamType = node.updateNetworkFirewalledService_serviceType;
                if (updateNetworkFirewalledService_nodeParamType === 'str') {
                    //updateNetworkFirewalledService_parameters.service = updateNetworkFirewalledService_nodeParam || '';
                    updateNetworkFirewalledService_parameters.service = updateNetworkFirewalledService_nodeParam || undefined;
                } else {
                    updateNetworkFirewalledService_parameters.service = RED.util.getMessageProperty(msg, updateNetworkFirewalledService_nodeParam);
                }
                //updateNetworkFirewalledService_parameters.service = !!updateNetworkFirewalledService_parameters.service ? updateNetworkFirewalledService_parameters.service : msg.payload;
                
                updateNetworkFirewalledService_nodeParam = node.updateNetworkFirewalledService_updateNetworkFirewalledService;
                updateNetworkFirewalledService_nodeParamType = node.updateNetworkFirewalledService_updateNetworkFirewalledServiceType;
                if (updateNetworkFirewalledService_nodeParamType === 'str') {
                    //updateNetworkFirewalledService_parameters.updateNetworkFirewalledService = updateNetworkFirewalledService_nodeParam || '';
                    updateNetworkFirewalledService_parameters.updateNetworkFirewalledService = updateNetworkFirewalledService_nodeParam || undefined;
                } else {
                    updateNetworkFirewalledService_parameters.updateNetworkFirewalledService = RED.util.getMessageProperty(msg, updateNetworkFirewalledService_nodeParam);
                }
                //updateNetworkFirewalledService_parameters.updateNetworkFirewalledService = !!updateNetworkFirewalledService_parameters.updateNetworkFirewalledService ? updateNetworkFirewalledService_parameters.updateNetworkFirewalledService : msg.payload;
                                result = client.updateNetworkFirewalledService(updateNetworkFirewalledService_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkOneToManyNatRules') {
                var getNetworkOneToManyNatRules_parameters = [];
                var getNetworkOneToManyNatRules_nodeParam;
                var getNetworkOneToManyNatRules_nodeParamType;

                getNetworkOneToManyNatRules_nodeParam = node.getNetworkOneToManyNatRules_networkId;
                getNetworkOneToManyNatRules_nodeParamType = node.getNetworkOneToManyNatRules_networkIdType;
                if (getNetworkOneToManyNatRules_nodeParamType === 'str') {
                    //getNetworkOneToManyNatRules_parameters.networkId = getNetworkOneToManyNatRules_nodeParam || '';
                    getNetworkOneToManyNatRules_parameters.networkId = getNetworkOneToManyNatRules_nodeParam || undefined;
                } else {
                    getNetworkOneToManyNatRules_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkOneToManyNatRules_nodeParam);
                }
                //getNetworkOneToManyNatRules_parameters.networkId = !!getNetworkOneToManyNatRules_parameters.networkId ? getNetworkOneToManyNatRules_parameters.networkId : msg.payload;
                                result = client.getNetworkOneToManyNatRules(getNetworkOneToManyNatRules_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkOneToManyNatRules') {
                var updateNetworkOneToManyNatRules_parameters = [];
                var updateNetworkOneToManyNatRules_nodeParam;
                var updateNetworkOneToManyNatRules_nodeParamType;

                updateNetworkOneToManyNatRules_nodeParam = node.updateNetworkOneToManyNatRules_networkId;
                updateNetworkOneToManyNatRules_nodeParamType = node.updateNetworkOneToManyNatRules_networkIdType;
                if (updateNetworkOneToManyNatRules_nodeParamType === 'str') {
                    //updateNetworkOneToManyNatRules_parameters.networkId = updateNetworkOneToManyNatRules_nodeParam || '';
                    updateNetworkOneToManyNatRules_parameters.networkId = updateNetworkOneToManyNatRules_nodeParam || undefined;
                } else {
                    updateNetworkOneToManyNatRules_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkOneToManyNatRules_nodeParam);
                }
                //updateNetworkOneToManyNatRules_parameters.networkId = !!updateNetworkOneToManyNatRules_parameters.networkId ? updateNetworkOneToManyNatRules_parameters.networkId : msg.payload;
                
                updateNetworkOneToManyNatRules_nodeParam = node.updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRules;
                updateNetworkOneToManyNatRules_nodeParamType = node.updateNetworkOneToManyNatRules_updateNetworkOneToManyNatRulesType;
                if (updateNetworkOneToManyNatRules_nodeParamType === 'str') {
                    //updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules = updateNetworkOneToManyNatRules_nodeParam || '';
                    updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules = updateNetworkOneToManyNatRules_nodeParam || undefined;
                } else {
                    updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules = RED.util.getMessageProperty(msg, updateNetworkOneToManyNatRules_nodeParam);
                }
                //updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules = !!updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules ? updateNetworkOneToManyNatRules_parameters.updateNetworkOneToManyNatRules : msg.payload;
                                result = client.updateNetworkOneToManyNatRules(updateNetworkOneToManyNatRules_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkOneToOneNatRules') {
                var getNetworkOneToOneNatRules_parameters = [];
                var getNetworkOneToOneNatRules_nodeParam;
                var getNetworkOneToOneNatRules_nodeParamType;

                getNetworkOneToOneNatRules_nodeParam = node.getNetworkOneToOneNatRules_networkId;
                getNetworkOneToOneNatRules_nodeParamType = node.getNetworkOneToOneNatRules_networkIdType;
                if (getNetworkOneToOneNatRules_nodeParamType === 'str') {
                    //getNetworkOneToOneNatRules_parameters.networkId = getNetworkOneToOneNatRules_nodeParam || '';
                    getNetworkOneToOneNatRules_parameters.networkId = getNetworkOneToOneNatRules_nodeParam || undefined;
                } else {
                    getNetworkOneToOneNatRules_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkOneToOneNatRules_nodeParam);
                }
                //getNetworkOneToOneNatRules_parameters.networkId = !!getNetworkOneToOneNatRules_parameters.networkId ? getNetworkOneToOneNatRules_parameters.networkId : msg.payload;
                                result = client.getNetworkOneToOneNatRules(getNetworkOneToOneNatRules_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkOneToOneNatRules') {
                var updateNetworkOneToOneNatRules_parameters = [];
                var updateNetworkOneToOneNatRules_nodeParam;
                var updateNetworkOneToOneNatRules_nodeParamType;

                updateNetworkOneToOneNatRules_nodeParam = node.updateNetworkOneToOneNatRules_networkId;
                updateNetworkOneToOneNatRules_nodeParamType = node.updateNetworkOneToOneNatRules_networkIdType;
                if (updateNetworkOneToOneNatRules_nodeParamType === 'str') {
                    //updateNetworkOneToOneNatRules_parameters.networkId = updateNetworkOneToOneNatRules_nodeParam || '';
                    updateNetworkOneToOneNatRules_parameters.networkId = updateNetworkOneToOneNatRules_nodeParam || undefined;
                } else {
                    updateNetworkOneToOneNatRules_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkOneToOneNatRules_nodeParam);
                }
                //updateNetworkOneToOneNatRules_parameters.networkId = !!updateNetworkOneToOneNatRules_parameters.networkId ? updateNetworkOneToOneNatRules_parameters.networkId : msg.payload;
                
                updateNetworkOneToOneNatRules_nodeParam = node.updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRules;
                updateNetworkOneToOneNatRules_nodeParamType = node.updateNetworkOneToOneNatRules_updateNetworkOneToOneNatRulesType;
                if (updateNetworkOneToOneNatRules_nodeParamType === 'str') {
                    //updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules = updateNetworkOneToOneNatRules_nodeParam || '';
                    updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules = updateNetworkOneToOneNatRules_nodeParam || undefined;
                } else {
                    updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules = RED.util.getMessageProperty(msg, updateNetworkOneToOneNatRules_nodeParam);
                }
                //updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules = !!updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules ? updateNetworkOneToOneNatRules_parameters.updateNetworkOneToOneNatRules : msg.payload;
                                result = client.updateNetworkOneToOneNatRules(updateNetworkOneToOneNatRules_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkPortForwardingRules') {
                var getNetworkPortForwardingRules_parameters = [];
                var getNetworkPortForwardingRules_nodeParam;
                var getNetworkPortForwardingRules_nodeParamType;

                getNetworkPortForwardingRules_nodeParam = node.getNetworkPortForwardingRules_networkId;
                getNetworkPortForwardingRules_nodeParamType = node.getNetworkPortForwardingRules_networkIdType;
                if (getNetworkPortForwardingRules_nodeParamType === 'str') {
                    //getNetworkPortForwardingRules_parameters.networkId = getNetworkPortForwardingRules_nodeParam || '';
                    getNetworkPortForwardingRules_parameters.networkId = getNetworkPortForwardingRules_nodeParam || undefined;
                } else {
                    getNetworkPortForwardingRules_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkPortForwardingRules_nodeParam);
                }
                //getNetworkPortForwardingRules_parameters.networkId = !!getNetworkPortForwardingRules_parameters.networkId ? getNetworkPortForwardingRules_parameters.networkId : msg.payload;
                                result = client.getNetworkPortForwardingRules(getNetworkPortForwardingRules_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkPortForwardingRules') {
                var updateNetworkPortForwardingRules_parameters = [];
                var updateNetworkPortForwardingRules_nodeParam;
                var updateNetworkPortForwardingRules_nodeParamType;

                updateNetworkPortForwardingRules_nodeParam = node.updateNetworkPortForwardingRules_networkId;
                updateNetworkPortForwardingRules_nodeParamType = node.updateNetworkPortForwardingRules_networkIdType;
                if (updateNetworkPortForwardingRules_nodeParamType === 'str') {
                    //updateNetworkPortForwardingRules_parameters.networkId = updateNetworkPortForwardingRules_nodeParam || '';
                    updateNetworkPortForwardingRules_parameters.networkId = updateNetworkPortForwardingRules_nodeParam || undefined;
                } else {
                    updateNetworkPortForwardingRules_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkPortForwardingRules_nodeParam);
                }
                //updateNetworkPortForwardingRules_parameters.networkId = !!updateNetworkPortForwardingRules_parameters.networkId ? updateNetworkPortForwardingRules_parameters.networkId : msg.payload;
                
                updateNetworkPortForwardingRules_nodeParam = node.updateNetworkPortForwardingRules_updateNetworkPortForwardingRules;
                updateNetworkPortForwardingRules_nodeParamType = node.updateNetworkPortForwardingRules_updateNetworkPortForwardingRulesType;
                if (updateNetworkPortForwardingRules_nodeParamType === 'str') {
                    //updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules = updateNetworkPortForwardingRules_nodeParam || '';
                    updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules = updateNetworkPortForwardingRules_nodeParam || undefined;
                } else {
                    updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules = RED.util.getMessageProperty(msg, updateNetworkPortForwardingRules_nodeParam);
                }
                //updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules = !!updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules ? updateNetworkPortForwardingRules_parameters.updateNetworkPortForwardingRules : msg.payload;
                                result = client.updateNetworkPortForwardingRules(updateNetworkPortForwardingRules_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkStaticRoutes') {
                var getNetworkStaticRoutes_parameters = [];
                var getNetworkStaticRoutes_nodeParam;
                var getNetworkStaticRoutes_nodeParamType;

                getNetworkStaticRoutes_nodeParam = node.getNetworkStaticRoutes_networkId;
                getNetworkStaticRoutes_nodeParamType = node.getNetworkStaticRoutes_networkIdType;
                if (getNetworkStaticRoutes_nodeParamType === 'str') {
                    //getNetworkStaticRoutes_parameters.networkId = getNetworkStaticRoutes_nodeParam || '';
                    getNetworkStaticRoutes_parameters.networkId = getNetworkStaticRoutes_nodeParam || undefined;
                } else {
                    getNetworkStaticRoutes_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkStaticRoutes_nodeParam);
                }
                //getNetworkStaticRoutes_parameters.networkId = !!getNetworkStaticRoutes_parameters.networkId ? getNetworkStaticRoutes_parameters.networkId : msg.payload;
                                result = client.getNetworkStaticRoutes(getNetworkStaticRoutes_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkStaticRoutes') {
                var createNetworkStaticRoutes_parameters = [];
                var createNetworkStaticRoutes_nodeParam;
                var createNetworkStaticRoutes_nodeParamType;

                createNetworkStaticRoutes_nodeParam = node.createNetworkStaticRoutes_networkId;
                createNetworkStaticRoutes_nodeParamType = node.createNetworkStaticRoutes_networkIdType;
                if (createNetworkStaticRoutes_nodeParamType === 'str') {
                    //createNetworkStaticRoutes_parameters.networkId = createNetworkStaticRoutes_nodeParam || '';
                    createNetworkStaticRoutes_parameters.networkId = createNetworkStaticRoutes_nodeParam || undefined;
                } else {
                    createNetworkStaticRoutes_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkStaticRoutes_nodeParam);
                }
                //createNetworkStaticRoutes_parameters.networkId = !!createNetworkStaticRoutes_parameters.networkId ? createNetworkStaticRoutes_parameters.networkId : msg.payload;
                
                createNetworkStaticRoutes_nodeParam = node.createNetworkStaticRoutes_createNetworkStaticRoutes;
                createNetworkStaticRoutes_nodeParamType = node.createNetworkStaticRoutes_createNetworkStaticRoutesType;
                if (createNetworkStaticRoutes_nodeParamType === 'str') {
                    //createNetworkStaticRoutes_parameters.createNetworkStaticRoutes = createNetworkStaticRoutes_nodeParam || '';
                    createNetworkStaticRoutes_parameters.createNetworkStaticRoutes = createNetworkStaticRoutes_nodeParam || undefined;
                } else {
                    createNetworkStaticRoutes_parameters.createNetworkStaticRoutes = RED.util.getMessageProperty(msg, createNetworkStaticRoutes_nodeParam);
                }
                //createNetworkStaticRoutes_parameters.createNetworkStaticRoutes = !!createNetworkStaticRoutes_parameters.createNetworkStaticRoutes ? createNetworkStaticRoutes_parameters.createNetworkStaticRoutes : msg.payload;
                                result = client.createNetworkStaticRoutes(createNetworkStaticRoutes_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkStaticRoute') {
                var getNetworkStaticRoute_parameters = [];
                var getNetworkStaticRoute_nodeParam;
                var getNetworkStaticRoute_nodeParamType;

                getNetworkStaticRoute_nodeParam = node.getNetworkStaticRoute_networkId;
                getNetworkStaticRoute_nodeParamType = node.getNetworkStaticRoute_networkIdType;
                if (getNetworkStaticRoute_nodeParamType === 'str') {
                    //getNetworkStaticRoute_parameters.networkId = getNetworkStaticRoute_nodeParam || '';
                    getNetworkStaticRoute_parameters.networkId = getNetworkStaticRoute_nodeParam || undefined;
                } else {
                    getNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkStaticRoute_nodeParam);
                }
                //getNetworkStaticRoute_parameters.networkId = !!getNetworkStaticRoute_parameters.networkId ? getNetworkStaticRoute_parameters.networkId : msg.payload;
                
                getNetworkStaticRoute_nodeParam = node.getNetworkStaticRoute_srId;
                getNetworkStaticRoute_nodeParamType = node.getNetworkStaticRoute_srIdType;
                if (getNetworkStaticRoute_nodeParamType === 'str') {
                    //getNetworkStaticRoute_parameters.srId = getNetworkStaticRoute_nodeParam || '';
                    getNetworkStaticRoute_parameters.srId = getNetworkStaticRoute_nodeParam || undefined;
                } else {
                    getNetworkStaticRoute_parameters.srId = RED.util.getMessageProperty(msg, getNetworkStaticRoute_nodeParam);
                }
                //getNetworkStaticRoute_parameters.srId = !!getNetworkStaticRoute_parameters.srId ? getNetworkStaticRoute_parameters.srId : msg.payload;
                                result = client.getNetworkStaticRoute(getNetworkStaticRoute_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkStaticRoute') {
                var updateNetworkStaticRoute_parameters = [];
                var updateNetworkStaticRoute_nodeParam;
                var updateNetworkStaticRoute_nodeParamType;

                updateNetworkStaticRoute_nodeParam = node.updateNetworkStaticRoute_networkId;
                updateNetworkStaticRoute_nodeParamType = node.updateNetworkStaticRoute_networkIdType;
                if (updateNetworkStaticRoute_nodeParamType === 'str') {
                    //updateNetworkStaticRoute_parameters.networkId = updateNetworkStaticRoute_nodeParam || '';
                    updateNetworkStaticRoute_parameters.networkId = updateNetworkStaticRoute_nodeParam || undefined;
                } else {
                    updateNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkStaticRoute_nodeParam);
                }
                //updateNetworkStaticRoute_parameters.networkId = !!updateNetworkStaticRoute_parameters.networkId ? updateNetworkStaticRoute_parameters.networkId : msg.payload;
                
                updateNetworkStaticRoute_nodeParam = node.updateNetworkStaticRoute_srId;
                updateNetworkStaticRoute_nodeParamType = node.updateNetworkStaticRoute_srIdType;
                if (updateNetworkStaticRoute_nodeParamType === 'str') {
                    //updateNetworkStaticRoute_parameters.srId = updateNetworkStaticRoute_nodeParam || '';
                    updateNetworkStaticRoute_parameters.srId = updateNetworkStaticRoute_nodeParam || undefined;
                } else {
                    updateNetworkStaticRoute_parameters.srId = RED.util.getMessageProperty(msg, updateNetworkStaticRoute_nodeParam);
                }
                //updateNetworkStaticRoute_parameters.srId = !!updateNetworkStaticRoute_parameters.srId ? updateNetworkStaticRoute_parameters.srId : msg.payload;
                
                updateNetworkStaticRoute_nodeParam = node.updateNetworkStaticRoute_updateNetworkStaticRoute;
                updateNetworkStaticRoute_nodeParamType = node.updateNetworkStaticRoute_updateNetworkStaticRouteType;
                if (updateNetworkStaticRoute_nodeParamType === 'str') {
                    //updateNetworkStaticRoute_parameters.updateNetworkStaticRoute = updateNetworkStaticRoute_nodeParam || '';
                    updateNetworkStaticRoute_parameters.updateNetworkStaticRoute = updateNetworkStaticRoute_nodeParam || undefined;
                } else {
                    updateNetworkStaticRoute_parameters.updateNetworkStaticRoute = RED.util.getMessageProperty(msg, updateNetworkStaticRoute_nodeParam);
                }
                //updateNetworkStaticRoute_parameters.updateNetworkStaticRoute = !!updateNetworkStaticRoute_parameters.updateNetworkStaticRoute ? updateNetworkStaticRoute_parameters.updateNetworkStaticRoute : msg.payload;
                                result = client.updateNetworkStaticRoute(updateNetworkStaticRoute_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkStaticRoute') {
                var deleteNetworkStaticRoute_parameters = [];
                var deleteNetworkStaticRoute_nodeParam;
                var deleteNetworkStaticRoute_nodeParamType;

                deleteNetworkStaticRoute_nodeParam = node.deleteNetworkStaticRoute_networkId;
                deleteNetworkStaticRoute_nodeParamType = node.deleteNetworkStaticRoute_networkIdType;
                if (deleteNetworkStaticRoute_nodeParamType === 'str') {
                    //deleteNetworkStaticRoute_parameters.networkId = deleteNetworkStaticRoute_nodeParam || '';
                    deleteNetworkStaticRoute_parameters.networkId = deleteNetworkStaticRoute_nodeParam || undefined;
                } else {
                    deleteNetworkStaticRoute_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkStaticRoute_nodeParam);
                }
                //deleteNetworkStaticRoute_parameters.networkId = !!deleteNetworkStaticRoute_parameters.networkId ? deleteNetworkStaticRoute_parameters.networkId : msg.payload;
                
                deleteNetworkStaticRoute_nodeParam = node.deleteNetworkStaticRoute_srId;
                deleteNetworkStaticRoute_nodeParamType = node.deleteNetworkStaticRoute_srIdType;
                if (deleteNetworkStaticRoute_nodeParamType === 'str') {
                    //deleteNetworkStaticRoute_parameters.srId = deleteNetworkStaticRoute_nodeParam || '';
                    deleteNetworkStaticRoute_parameters.srId = deleteNetworkStaticRoute_nodeParam || undefined;
                } else {
                    deleteNetworkStaticRoute_parameters.srId = RED.util.getMessageProperty(msg, deleteNetworkStaticRoute_nodeParam);
                }
                //deleteNetworkStaticRoute_parameters.srId = !!deleteNetworkStaticRoute_parameters.srId ? deleteNetworkStaticRoute_parameters.srId : msg.payload;
                                result = client.deleteNetworkStaticRoute(deleteNetworkStaticRoute_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkUplinkSettings') {
                var getNetworkUplinkSettings_parameters = [];
                var getNetworkUplinkSettings_nodeParam;
                var getNetworkUplinkSettings_nodeParamType;

                getNetworkUplinkSettings_nodeParam = node.getNetworkUplinkSettings_networkId;
                getNetworkUplinkSettings_nodeParamType = node.getNetworkUplinkSettings_networkIdType;
                if (getNetworkUplinkSettings_nodeParamType === 'str') {
                    //getNetworkUplinkSettings_parameters.networkId = getNetworkUplinkSettings_nodeParam || '';
                    getNetworkUplinkSettings_parameters.networkId = getNetworkUplinkSettings_nodeParam || undefined;
                } else {
                    getNetworkUplinkSettings_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkUplinkSettings_nodeParam);
                }
                //getNetworkUplinkSettings_parameters.networkId = !!getNetworkUplinkSettings_parameters.networkId ? getNetworkUplinkSettings_parameters.networkId : msg.payload;
                                result = client.getNetworkUplinkSettings(getNetworkUplinkSettings_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkUplinkSettings') {
                var updateNetworkUplinkSettings_parameters = [];
                var updateNetworkUplinkSettings_nodeParam;
                var updateNetworkUplinkSettings_nodeParamType;

                updateNetworkUplinkSettings_nodeParam = node.updateNetworkUplinkSettings_networkId;
                updateNetworkUplinkSettings_nodeParamType = node.updateNetworkUplinkSettings_networkIdType;
                if (updateNetworkUplinkSettings_nodeParamType === 'str') {
                    //updateNetworkUplinkSettings_parameters.networkId = updateNetworkUplinkSettings_nodeParam || '';
                    updateNetworkUplinkSettings_parameters.networkId = updateNetworkUplinkSettings_nodeParam || undefined;
                } else {
                    updateNetworkUplinkSettings_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkUplinkSettings_nodeParam);
                }
                //updateNetworkUplinkSettings_parameters.networkId = !!updateNetworkUplinkSettings_parameters.networkId ? updateNetworkUplinkSettings_parameters.networkId : msg.payload;
                
                updateNetworkUplinkSettings_nodeParam = node.updateNetworkUplinkSettings_updateNetworkUplinkSettings;
                updateNetworkUplinkSettings_nodeParamType = node.updateNetworkUplinkSettings_updateNetworkUplinkSettingsType;
                if (updateNetworkUplinkSettings_nodeParamType === 'str') {
                    //updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings = updateNetworkUplinkSettings_nodeParam || '';
                    updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings = updateNetworkUplinkSettings_nodeParam || undefined;
                } else {
                    updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings = RED.util.getMessageProperty(msg, updateNetworkUplinkSettings_nodeParam);
                }
                //updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings = !!updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings ? updateNetworkUplinkSettings_parameters.updateNetworkUplinkSettings : msg.payload;
                                result = client.updateNetworkUplinkSettings(updateNetworkUplinkSettings_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkVlans') {
                var getNetworkVlans_parameters = [];
                var getNetworkVlans_nodeParam;
                var getNetworkVlans_nodeParamType;

                getNetworkVlans_nodeParam = node.getNetworkVlans_networkId;
                getNetworkVlans_nodeParamType = node.getNetworkVlans_networkIdType;
                if (getNetworkVlans_nodeParamType === 'str') {
                    //getNetworkVlans_parameters.networkId = getNetworkVlans_nodeParam || '';
                    getNetworkVlans_parameters.networkId = getNetworkVlans_nodeParam || undefined;
                } else {
                    getNetworkVlans_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkVlans_nodeParam);
                }
                //getNetworkVlans_parameters.networkId = !!getNetworkVlans_parameters.networkId ? getNetworkVlans_parameters.networkId : msg.payload;
                                result = client.getNetworkVlans(getNetworkVlans_parameters);
            }
            if (!errorFlag && node.method === 'createNetworkVlans') {
                var createNetworkVlans_parameters = [];
                var createNetworkVlans_nodeParam;
                var createNetworkVlans_nodeParamType;

                createNetworkVlans_nodeParam = node.createNetworkVlans_networkId;
                createNetworkVlans_nodeParamType = node.createNetworkVlans_networkIdType;
                if (createNetworkVlans_nodeParamType === 'str') {
                    //createNetworkVlans_parameters.networkId = createNetworkVlans_nodeParam || '';
                    createNetworkVlans_parameters.networkId = createNetworkVlans_nodeParam || undefined;
                } else {
                    createNetworkVlans_parameters.networkId = RED.util.getMessageProperty(msg, createNetworkVlans_nodeParam);
                }
                //createNetworkVlans_parameters.networkId = !!createNetworkVlans_parameters.networkId ? createNetworkVlans_parameters.networkId : msg.payload;
                
                createNetworkVlans_nodeParam = node.createNetworkVlans_createNetworkVlans;
                createNetworkVlans_nodeParamType = node.createNetworkVlans_createNetworkVlansType;
                if (createNetworkVlans_nodeParamType === 'str') {
                    //createNetworkVlans_parameters.createNetworkVlans = createNetworkVlans_nodeParam || '';
                    createNetworkVlans_parameters.createNetworkVlans = createNetworkVlans_nodeParam || undefined;
                } else {
                    createNetworkVlans_parameters.createNetworkVlans = RED.util.getMessageProperty(msg, createNetworkVlans_nodeParam);
                }
                //createNetworkVlans_parameters.createNetworkVlans = !!createNetworkVlans_parameters.createNetworkVlans ? createNetworkVlans_parameters.createNetworkVlans : msg.payload;
                                result = client.createNetworkVlans(createNetworkVlans_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkVlan') {
                var getNetworkVlan_parameters = [];
                var getNetworkVlan_nodeParam;
                var getNetworkVlan_nodeParamType;

                getNetworkVlan_nodeParam = node.getNetworkVlan_networkId;
                getNetworkVlan_nodeParamType = node.getNetworkVlan_networkIdType;
                if (getNetworkVlan_nodeParamType === 'str') {
                    //getNetworkVlan_parameters.networkId = getNetworkVlan_nodeParam || '';
                    getNetworkVlan_parameters.networkId = getNetworkVlan_nodeParam || undefined;
                } else {
                    getNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkVlan_nodeParam);
                }
                //getNetworkVlan_parameters.networkId = !!getNetworkVlan_parameters.networkId ? getNetworkVlan_parameters.networkId : msg.payload;
                
                getNetworkVlan_nodeParam = node.getNetworkVlan_vlanId;
                getNetworkVlan_nodeParamType = node.getNetworkVlan_vlanIdType;
                if (getNetworkVlan_nodeParamType === 'str') {
                    //getNetworkVlan_parameters.vlanId = getNetworkVlan_nodeParam || '';
                    getNetworkVlan_parameters.vlanId = getNetworkVlan_nodeParam || undefined;
                } else {
                    getNetworkVlan_parameters.vlanId = RED.util.getMessageProperty(msg, getNetworkVlan_nodeParam);
                }
                //getNetworkVlan_parameters.vlanId = !!getNetworkVlan_parameters.vlanId ? getNetworkVlan_parameters.vlanId : msg.payload;
                                result = client.getNetworkVlan(getNetworkVlan_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkVlan') {
                var updateNetworkVlan_parameters = [];
                var updateNetworkVlan_nodeParam;
                var updateNetworkVlan_nodeParamType;

                updateNetworkVlan_nodeParam = node.updateNetworkVlan_networkId;
                updateNetworkVlan_nodeParamType = node.updateNetworkVlan_networkIdType;
                if (updateNetworkVlan_nodeParamType === 'str') {
                    //updateNetworkVlan_parameters.networkId = updateNetworkVlan_nodeParam || '';
                    updateNetworkVlan_parameters.networkId = updateNetworkVlan_nodeParam || undefined;
                } else {
                    updateNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkVlan_nodeParam);
                }
                //updateNetworkVlan_parameters.networkId = !!updateNetworkVlan_parameters.networkId ? updateNetworkVlan_parameters.networkId : msg.payload;
                
                updateNetworkVlan_nodeParam = node.updateNetworkVlan_vlanId;
                updateNetworkVlan_nodeParamType = node.updateNetworkVlan_vlanIdType;
                if (updateNetworkVlan_nodeParamType === 'str') {
                    //updateNetworkVlan_parameters.vlanId = updateNetworkVlan_nodeParam || '';
                    updateNetworkVlan_parameters.vlanId = updateNetworkVlan_nodeParam || undefined;
                } else {
                    updateNetworkVlan_parameters.vlanId = RED.util.getMessageProperty(msg, updateNetworkVlan_nodeParam);
                }
                //updateNetworkVlan_parameters.vlanId = !!updateNetworkVlan_parameters.vlanId ? updateNetworkVlan_parameters.vlanId : msg.payload;
                
                updateNetworkVlan_nodeParam = node.updateNetworkVlan_updateNetworkVlan;
                updateNetworkVlan_nodeParamType = node.updateNetworkVlan_updateNetworkVlanType;
                if (updateNetworkVlan_nodeParamType === 'str') {
                    //updateNetworkVlan_parameters.updateNetworkVlan = updateNetworkVlan_nodeParam || '';
                    updateNetworkVlan_parameters.updateNetworkVlan = updateNetworkVlan_nodeParam || undefined;
                } else {
                    updateNetworkVlan_parameters.updateNetworkVlan = RED.util.getMessageProperty(msg, updateNetworkVlan_nodeParam);
                }
                //updateNetworkVlan_parameters.updateNetworkVlan = !!updateNetworkVlan_parameters.updateNetworkVlan ? updateNetworkVlan_parameters.updateNetworkVlan : msg.payload;
                                result = client.updateNetworkVlan(updateNetworkVlan_parameters);
            }
            if (!errorFlag && node.method === 'deleteNetworkVlan') {
                var deleteNetworkVlan_parameters = [];
                var deleteNetworkVlan_nodeParam;
                var deleteNetworkVlan_nodeParamType;

                deleteNetworkVlan_nodeParam = node.deleteNetworkVlan_networkId;
                deleteNetworkVlan_nodeParamType = node.deleteNetworkVlan_networkIdType;
                if (deleteNetworkVlan_nodeParamType === 'str') {
                    //deleteNetworkVlan_parameters.networkId = deleteNetworkVlan_nodeParam || '';
                    deleteNetworkVlan_parameters.networkId = deleteNetworkVlan_nodeParam || undefined;
                } else {
                    deleteNetworkVlan_parameters.networkId = RED.util.getMessageProperty(msg, deleteNetworkVlan_nodeParam);
                }
                //deleteNetworkVlan_parameters.networkId = !!deleteNetworkVlan_parameters.networkId ? deleteNetworkVlan_parameters.networkId : msg.payload;
                
                deleteNetworkVlan_nodeParam = node.deleteNetworkVlan_vlanId;
                deleteNetworkVlan_nodeParamType = node.deleteNetworkVlan_vlanIdType;
                if (deleteNetworkVlan_nodeParamType === 'str') {
                    //deleteNetworkVlan_parameters.vlanId = deleteNetworkVlan_nodeParam || '';
                    deleteNetworkVlan_parameters.vlanId = deleteNetworkVlan_nodeParam || undefined;
                } else {
                    deleteNetworkVlan_parameters.vlanId = RED.util.getMessageProperty(msg, deleteNetworkVlan_nodeParam);
                }
                //deleteNetworkVlan_parameters.vlanId = !!deleteNetworkVlan_parameters.vlanId ? deleteNetworkVlan_parameters.vlanId : msg.payload;
                                result = client.deleteNetworkVlan(deleteNetworkVlan_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkVlansEnabledState') {
                var getNetworkVlansEnabledState_parameters = [];
                var getNetworkVlansEnabledState_nodeParam;
                var getNetworkVlansEnabledState_nodeParamType;

                getNetworkVlansEnabledState_nodeParam = node.getNetworkVlansEnabledState_networkId;
                getNetworkVlansEnabledState_nodeParamType = node.getNetworkVlansEnabledState_networkIdType;
                if (getNetworkVlansEnabledState_nodeParamType === 'str') {
                    //getNetworkVlansEnabledState_parameters.networkId = getNetworkVlansEnabledState_nodeParam || '';
                    getNetworkVlansEnabledState_parameters.networkId = getNetworkVlansEnabledState_nodeParam || undefined;
                } else {
                    getNetworkVlansEnabledState_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkVlansEnabledState_nodeParam);
                }
                //getNetworkVlansEnabledState_parameters.networkId = !!getNetworkVlansEnabledState_parameters.networkId ? getNetworkVlansEnabledState_parameters.networkId : msg.payload;
                                result = client.getNetworkVlansEnabledState(getNetworkVlansEnabledState_parameters);
            }
            if (!errorFlag && node.method === 'updateNetworkVlansEnabledState') {
                var updateNetworkVlansEnabledState_parameters = [];
                var updateNetworkVlansEnabledState_nodeParam;
                var updateNetworkVlansEnabledState_nodeParamType;

                updateNetworkVlansEnabledState_nodeParam = node.updateNetworkVlansEnabledState_networkId;
                updateNetworkVlansEnabledState_nodeParamType = node.updateNetworkVlansEnabledState_networkIdType;
                if (updateNetworkVlansEnabledState_nodeParamType === 'str') {
                    //updateNetworkVlansEnabledState_parameters.networkId = updateNetworkVlansEnabledState_nodeParam || '';
                    updateNetworkVlansEnabledState_parameters.networkId = updateNetworkVlansEnabledState_nodeParam || undefined;
                } else {
                    updateNetworkVlansEnabledState_parameters.networkId = RED.util.getMessageProperty(msg, updateNetworkVlansEnabledState_nodeParam);
                }
                //updateNetworkVlansEnabledState_parameters.networkId = !!updateNetworkVlansEnabledState_parameters.networkId ? updateNetworkVlansEnabledState_parameters.networkId : msg.payload;
                
                updateNetworkVlansEnabledState_nodeParam = node.updateNetworkVlansEnabledState_updateNetworkVlansEnabledState;
                updateNetworkVlansEnabledState_nodeParamType = node.updateNetworkVlansEnabledState_updateNetworkVlansEnabledStateType;
                if (updateNetworkVlansEnabledState_nodeParamType === 'str') {
                    //updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState = updateNetworkVlansEnabledState_nodeParam || '';
                    updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState = updateNetworkVlansEnabledState_nodeParam || undefined;
                } else {
                    updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState = RED.util.getMessageProperty(msg, updateNetworkVlansEnabledState_nodeParam);
                }
                //updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState = !!updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState ? updateNetworkVlansEnabledState_parameters.updateNetworkVlansEnabledState : msg.payload;
                                result = client.updateNetworkVlansEnabledState(updateNetworkVlansEnabledState_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkConnectionStats') {
                var getNetworkConnectionStats_parameters = [];
                var getNetworkConnectionStats_nodeParam;
                var getNetworkConnectionStats_nodeParamType;

                getNetworkConnectionStats_nodeParam = node.getNetworkConnectionStats_networkId;
                getNetworkConnectionStats_nodeParamType = node.getNetworkConnectionStats_networkIdType;
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    //getNetworkConnectionStats_parameters.networkId = getNetworkConnectionStats_nodeParam || '';
                    getNetworkConnectionStats_parameters.networkId = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkConnectionStats_nodeParam);
                }
                //getNetworkConnectionStats_parameters.networkId = !!getNetworkConnectionStats_parameters.networkId ? getNetworkConnectionStats_parameters.networkId : msg.payload;
                
                getNetworkConnectionStats_nodeParam = node.getNetworkConnectionStats_t0;
                getNetworkConnectionStats_nodeParamType = node.getNetworkConnectionStats_t0Type;
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    //getNetworkConnectionStats_parameters.t0 = getNetworkConnectionStats_nodeParam || '';
                    getNetworkConnectionStats_parameters.t0 = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkConnectionStats_nodeParam);
                }
                //getNetworkConnectionStats_parameters.t0 = !!getNetworkConnectionStats_parameters.t0 ? getNetworkConnectionStats_parameters.t0 : msg.payload;
                
                getNetworkConnectionStats_nodeParam = node.getNetworkConnectionStats_t1;
                getNetworkConnectionStats_nodeParamType = node.getNetworkConnectionStats_t1Type;
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    //getNetworkConnectionStats_parameters.t1 = getNetworkConnectionStats_nodeParam || '';
                    getNetworkConnectionStats_parameters.t1 = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkConnectionStats_nodeParam);
                }
                //getNetworkConnectionStats_parameters.t1 = !!getNetworkConnectionStats_parameters.t1 ? getNetworkConnectionStats_parameters.t1 : msg.payload;
                
                getNetworkConnectionStats_nodeParam = node.getNetworkConnectionStats_ssid;
                getNetworkConnectionStats_nodeParamType = node.getNetworkConnectionStats_ssidType;
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    //getNetworkConnectionStats_parameters.ssid = getNetworkConnectionStats_nodeParam || '';
                    getNetworkConnectionStats_parameters.ssid = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkConnectionStats_nodeParam);
                }
                //getNetworkConnectionStats_parameters.ssid = !!getNetworkConnectionStats_parameters.ssid ? getNetworkConnectionStats_parameters.ssid : msg.payload;
                
                getNetworkConnectionStats_nodeParam = node.getNetworkConnectionStats_vlan;
                getNetworkConnectionStats_nodeParamType = node.getNetworkConnectionStats_vlanType;
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    //getNetworkConnectionStats_parameters.vlan = getNetworkConnectionStats_nodeParam || '';
                    getNetworkConnectionStats_parameters.vlan = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkConnectionStats_nodeParam);
                }
                //getNetworkConnectionStats_parameters.vlan = !!getNetworkConnectionStats_parameters.vlan ? getNetworkConnectionStats_parameters.vlan : msg.payload;
                
                getNetworkConnectionStats_nodeParam = node.getNetworkConnectionStats_apTag;
                getNetworkConnectionStats_nodeParamType = node.getNetworkConnectionStats_apTagType;
                if (getNetworkConnectionStats_nodeParamType === 'str') {
                    //getNetworkConnectionStats_parameters.apTag = getNetworkConnectionStats_nodeParam || '';
                    getNetworkConnectionStats_parameters.apTag = getNetworkConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkConnectionStats_nodeParam);
                }
                //getNetworkConnectionStats_parameters.apTag = !!getNetworkConnectionStats_parameters.apTag ? getNetworkConnectionStats_parameters.apTag : msg.payload;
                                result = client.getNetworkConnectionStats(getNetworkConnectionStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDevicesConnectionStats') {
                var getNetworkDevicesConnectionStats_parameters = [];
                var getNetworkDevicesConnectionStats_nodeParam;
                var getNetworkDevicesConnectionStats_nodeParamType;

                getNetworkDevicesConnectionStats_nodeParam = node.getNetworkDevicesConnectionStats_networkId;
                getNetworkDevicesConnectionStats_nodeParamType = node.getNetworkDevicesConnectionStats_networkIdType;
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    //getNetworkDevicesConnectionStats_parameters.networkId = getNetworkDevicesConnectionStats_nodeParam || '';
                    getNetworkDevicesConnectionStats_parameters.networkId = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDevicesConnectionStats_nodeParam);
                }
                //getNetworkDevicesConnectionStats_parameters.networkId = !!getNetworkDevicesConnectionStats_parameters.networkId ? getNetworkDevicesConnectionStats_parameters.networkId : msg.payload;
                
                getNetworkDevicesConnectionStats_nodeParam = node.getNetworkDevicesConnectionStats_t0;
                getNetworkDevicesConnectionStats_nodeParamType = node.getNetworkDevicesConnectionStats_t0Type;
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    //getNetworkDevicesConnectionStats_parameters.t0 = getNetworkDevicesConnectionStats_nodeParam || '';
                    getNetworkDevicesConnectionStats_parameters.t0 = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkDevicesConnectionStats_nodeParam);
                }
                //getNetworkDevicesConnectionStats_parameters.t0 = !!getNetworkDevicesConnectionStats_parameters.t0 ? getNetworkDevicesConnectionStats_parameters.t0 : msg.payload;
                
                getNetworkDevicesConnectionStats_nodeParam = node.getNetworkDevicesConnectionStats_t1;
                getNetworkDevicesConnectionStats_nodeParamType = node.getNetworkDevicesConnectionStats_t1Type;
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    //getNetworkDevicesConnectionStats_parameters.t1 = getNetworkDevicesConnectionStats_nodeParam || '';
                    getNetworkDevicesConnectionStats_parameters.t1 = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkDevicesConnectionStats_nodeParam);
                }
                //getNetworkDevicesConnectionStats_parameters.t1 = !!getNetworkDevicesConnectionStats_parameters.t1 ? getNetworkDevicesConnectionStats_parameters.t1 : msg.payload;
                
                getNetworkDevicesConnectionStats_nodeParam = node.getNetworkDevicesConnectionStats_ssid;
                getNetworkDevicesConnectionStats_nodeParamType = node.getNetworkDevicesConnectionStats_ssidType;
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    //getNetworkDevicesConnectionStats_parameters.ssid = getNetworkDevicesConnectionStats_nodeParam || '';
                    getNetworkDevicesConnectionStats_parameters.ssid = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkDevicesConnectionStats_nodeParam);
                }
                //getNetworkDevicesConnectionStats_parameters.ssid = !!getNetworkDevicesConnectionStats_parameters.ssid ? getNetworkDevicesConnectionStats_parameters.ssid : msg.payload;
                
                getNetworkDevicesConnectionStats_nodeParam = node.getNetworkDevicesConnectionStats_vlan;
                getNetworkDevicesConnectionStats_nodeParamType = node.getNetworkDevicesConnectionStats_vlanType;
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    //getNetworkDevicesConnectionStats_parameters.vlan = getNetworkDevicesConnectionStats_nodeParam || '';
                    getNetworkDevicesConnectionStats_parameters.vlan = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkDevicesConnectionStats_nodeParam);
                }
                //getNetworkDevicesConnectionStats_parameters.vlan = !!getNetworkDevicesConnectionStats_parameters.vlan ? getNetworkDevicesConnectionStats_parameters.vlan : msg.payload;
                
                getNetworkDevicesConnectionStats_nodeParam = node.getNetworkDevicesConnectionStats_apTag;
                getNetworkDevicesConnectionStats_nodeParamType = node.getNetworkDevicesConnectionStats_apTagType;
                if (getNetworkDevicesConnectionStats_nodeParamType === 'str') {
                    //getNetworkDevicesConnectionStats_parameters.apTag = getNetworkDevicesConnectionStats_nodeParam || '';
                    getNetworkDevicesConnectionStats_parameters.apTag = getNetworkDevicesConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkDevicesConnectionStats_nodeParam);
                }
                //getNetworkDevicesConnectionStats_parameters.apTag = !!getNetworkDevicesConnectionStats_parameters.apTag ? getNetworkDevicesConnectionStats_parameters.apTag : msg.payload;
                                result = client.getNetworkDevicesConnectionStats(getNetworkDevicesConnectionStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceConnectionStats') {
                var getNetworkDeviceConnectionStats_parameters = [];
                var getNetworkDeviceConnectionStats_nodeParam;
                var getNetworkDeviceConnectionStats_nodeParamType;

                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_networkId;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_networkIdType;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.networkId = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.networkId = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.networkId = !!getNetworkDeviceConnectionStats_parameters.networkId ? getNetworkDeviceConnectionStats_parameters.networkId : msg.payload;
                
                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_serial;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_serialType;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.serial = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.serial = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.serial = !!getNetworkDeviceConnectionStats_parameters.serial ? getNetworkDeviceConnectionStats_parameters.serial : msg.payload;
                
                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_t0;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_t0Type;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.t0 = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.t0 = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.t0 = !!getNetworkDeviceConnectionStats_parameters.t0 ? getNetworkDeviceConnectionStats_parameters.t0 : msg.payload;
                
                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_t1;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_t1Type;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.t1 = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.t1 = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.t1 = !!getNetworkDeviceConnectionStats_parameters.t1 ? getNetworkDeviceConnectionStats_parameters.t1 : msg.payload;
                
                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_ssid;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_ssidType;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.ssid = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.ssid = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.ssid = !!getNetworkDeviceConnectionStats_parameters.ssid ? getNetworkDeviceConnectionStats_parameters.ssid : msg.payload;
                
                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_vlan;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_vlanType;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.vlan = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.vlan = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.vlan = !!getNetworkDeviceConnectionStats_parameters.vlan ? getNetworkDeviceConnectionStats_parameters.vlan : msg.payload;
                
                getNetworkDeviceConnectionStats_nodeParam = node.getNetworkDeviceConnectionStats_apTag;
                getNetworkDeviceConnectionStats_nodeParamType = node.getNetworkDeviceConnectionStats_apTagType;
                if (getNetworkDeviceConnectionStats_nodeParamType === 'str') {
                    //getNetworkDeviceConnectionStats_parameters.apTag = getNetworkDeviceConnectionStats_nodeParam || '';
                    getNetworkDeviceConnectionStats_parameters.apTag = getNetworkDeviceConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkDeviceConnectionStats_nodeParam);
                }
                //getNetworkDeviceConnectionStats_parameters.apTag = !!getNetworkDeviceConnectionStats_parameters.apTag ? getNetworkDeviceConnectionStats_parameters.apTag : msg.payload;
                                result = client.getNetworkDeviceConnectionStats(getNetworkDeviceConnectionStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientsConnectionStats') {
                var getNetworkClientsConnectionStats_parameters = [];
                var getNetworkClientsConnectionStats_nodeParam;
                var getNetworkClientsConnectionStats_nodeParamType;

                getNetworkClientsConnectionStats_nodeParam = node.getNetworkClientsConnectionStats_networkId;
                getNetworkClientsConnectionStats_nodeParamType = node.getNetworkClientsConnectionStats_networkIdType;
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientsConnectionStats_parameters.networkId = getNetworkClientsConnectionStats_nodeParam || '';
                    getNetworkClientsConnectionStats_parameters.networkId = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientsConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientsConnectionStats_nodeParam);
                }
                //getNetworkClientsConnectionStats_parameters.networkId = !!getNetworkClientsConnectionStats_parameters.networkId ? getNetworkClientsConnectionStats_parameters.networkId : msg.payload;
                
                getNetworkClientsConnectionStats_nodeParam = node.getNetworkClientsConnectionStats_t0;
                getNetworkClientsConnectionStats_nodeParamType = node.getNetworkClientsConnectionStats_t0Type;
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientsConnectionStats_parameters.t0 = getNetworkClientsConnectionStats_nodeParam || '';
                    getNetworkClientsConnectionStats_parameters.t0 = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientsConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkClientsConnectionStats_nodeParam);
                }
                //getNetworkClientsConnectionStats_parameters.t0 = !!getNetworkClientsConnectionStats_parameters.t0 ? getNetworkClientsConnectionStats_parameters.t0 : msg.payload;
                
                getNetworkClientsConnectionStats_nodeParam = node.getNetworkClientsConnectionStats_t1;
                getNetworkClientsConnectionStats_nodeParamType = node.getNetworkClientsConnectionStats_t1Type;
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientsConnectionStats_parameters.t1 = getNetworkClientsConnectionStats_nodeParam || '';
                    getNetworkClientsConnectionStats_parameters.t1 = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientsConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkClientsConnectionStats_nodeParam);
                }
                //getNetworkClientsConnectionStats_parameters.t1 = !!getNetworkClientsConnectionStats_parameters.t1 ? getNetworkClientsConnectionStats_parameters.t1 : msg.payload;
                
                getNetworkClientsConnectionStats_nodeParam = node.getNetworkClientsConnectionStats_ssid;
                getNetworkClientsConnectionStats_nodeParamType = node.getNetworkClientsConnectionStats_ssidType;
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientsConnectionStats_parameters.ssid = getNetworkClientsConnectionStats_nodeParam || '';
                    getNetworkClientsConnectionStats_parameters.ssid = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientsConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkClientsConnectionStats_nodeParam);
                }
                //getNetworkClientsConnectionStats_parameters.ssid = !!getNetworkClientsConnectionStats_parameters.ssid ? getNetworkClientsConnectionStats_parameters.ssid : msg.payload;
                
                getNetworkClientsConnectionStats_nodeParam = node.getNetworkClientsConnectionStats_vlan;
                getNetworkClientsConnectionStats_nodeParamType = node.getNetworkClientsConnectionStats_vlanType;
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientsConnectionStats_parameters.vlan = getNetworkClientsConnectionStats_nodeParam || '';
                    getNetworkClientsConnectionStats_parameters.vlan = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientsConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkClientsConnectionStats_nodeParam);
                }
                //getNetworkClientsConnectionStats_parameters.vlan = !!getNetworkClientsConnectionStats_parameters.vlan ? getNetworkClientsConnectionStats_parameters.vlan : msg.payload;
                
                getNetworkClientsConnectionStats_nodeParam = node.getNetworkClientsConnectionStats_apTag;
                getNetworkClientsConnectionStats_nodeParamType = node.getNetworkClientsConnectionStats_apTagType;
                if (getNetworkClientsConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientsConnectionStats_parameters.apTag = getNetworkClientsConnectionStats_nodeParam || '';
                    getNetworkClientsConnectionStats_parameters.apTag = getNetworkClientsConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientsConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkClientsConnectionStats_nodeParam);
                }
                //getNetworkClientsConnectionStats_parameters.apTag = !!getNetworkClientsConnectionStats_parameters.apTag ? getNetworkClientsConnectionStats_parameters.apTag : msg.payload;
                                result = client.getNetworkClientsConnectionStats(getNetworkClientsConnectionStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientConnectionStats') {
                var getNetworkClientConnectionStats_parameters = [];
                var getNetworkClientConnectionStats_nodeParam;
                var getNetworkClientConnectionStats_nodeParamType;

                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_networkId;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_networkIdType;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.networkId = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.networkId = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.networkId = !!getNetworkClientConnectionStats_parameters.networkId ? getNetworkClientConnectionStats_parameters.networkId : msg.payload;
                
                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_clientId;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_clientIdType;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.clientId = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.clientId = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.clientId = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.clientId = !!getNetworkClientConnectionStats_parameters.clientId ? getNetworkClientConnectionStats_parameters.clientId : msg.payload;
                
                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_t0;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_t0Type;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.t0 = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.t0 = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.t0 = !!getNetworkClientConnectionStats_parameters.t0 ? getNetworkClientConnectionStats_parameters.t0 : msg.payload;
                
                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_t1;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_t1Type;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.t1 = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.t1 = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.t1 = !!getNetworkClientConnectionStats_parameters.t1 ? getNetworkClientConnectionStats_parameters.t1 : msg.payload;
                
                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_ssid;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_ssidType;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.ssid = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.ssid = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.ssid = !!getNetworkClientConnectionStats_parameters.ssid ? getNetworkClientConnectionStats_parameters.ssid : msg.payload;
                
                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_vlan;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_vlanType;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.vlan = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.vlan = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.vlan = !!getNetworkClientConnectionStats_parameters.vlan ? getNetworkClientConnectionStats_parameters.vlan : msg.payload;
                
                getNetworkClientConnectionStats_nodeParam = node.getNetworkClientConnectionStats_apTag;
                getNetworkClientConnectionStats_nodeParamType = node.getNetworkClientConnectionStats_apTagType;
                if (getNetworkClientConnectionStats_nodeParamType === 'str') {
                    //getNetworkClientConnectionStats_parameters.apTag = getNetworkClientConnectionStats_nodeParam || '';
                    getNetworkClientConnectionStats_parameters.apTag = getNetworkClientConnectionStats_nodeParam || undefined;
                } else {
                    getNetworkClientConnectionStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkClientConnectionStats_nodeParam);
                }
                //getNetworkClientConnectionStats_parameters.apTag = !!getNetworkClientConnectionStats_parameters.apTag ? getNetworkClientConnectionStats_parameters.apTag : msg.payload;
                                result = client.getNetworkClientConnectionStats(getNetworkClientConnectionStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkLatencyStats') {
                var getNetworkLatencyStats_parameters = [];
                var getNetworkLatencyStats_nodeParam;
                var getNetworkLatencyStats_nodeParamType;

                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_networkId;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_networkIdType;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.networkId = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.networkId = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.networkId = !!getNetworkLatencyStats_parameters.networkId ? getNetworkLatencyStats_parameters.networkId : msg.payload;
                
                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_t0;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_t0Type;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.t0 = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.t0 = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.t0 = !!getNetworkLatencyStats_parameters.t0 ? getNetworkLatencyStats_parameters.t0 : msg.payload;
                
                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_t1;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_t1Type;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.t1 = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.t1 = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.t1 = !!getNetworkLatencyStats_parameters.t1 ? getNetworkLatencyStats_parameters.t1 : msg.payload;
                
                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_ssid;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_ssidType;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.ssid = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.ssid = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.ssid = !!getNetworkLatencyStats_parameters.ssid ? getNetworkLatencyStats_parameters.ssid : msg.payload;
                
                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_vlan;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_vlanType;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.vlan = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.vlan = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.vlan = !!getNetworkLatencyStats_parameters.vlan ? getNetworkLatencyStats_parameters.vlan : msg.payload;
                
                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_apTag;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_apTagType;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.apTag = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.apTag = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.apTag = !!getNetworkLatencyStats_parameters.apTag ? getNetworkLatencyStats_parameters.apTag : msg.payload;
                
                getNetworkLatencyStats_nodeParam = node.getNetworkLatencyStats_fields;
                getNetworkLatencyStats_nodeParamType = node.getNetworkLatencyStats_fieldsType;
                if (getNetworkLatencyStats_nodeParamType === 'str') {
                    //getNetworkLatencyStats_parameters.fields = getNetworkLatencyStats_nodeParam || '';
                    getNetworkLatencyStats_parameters.fields = getNetworkLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, getNetworkLatencyStats_nodeParam);
                }
                //getNetworkLatencyStats_parameters.fields = !!getNetworkLatencyStats_parameters.fields ? getNetworkLatencyStats_parameters.fields : msg.payload;
                                result = client.getNetworkLatencyStats(getNetworkLatencyStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDevicesLatencyStats') {
                var getNetworkDevicesLatencyStats_parameters = [];
                var getNetworkDevicesLatencyStats_nodeParam;
                var getNetworkDevicesLatencyStats_nodeParamType;

                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_networkId;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_networkIdType;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.networkId = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.networkId = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.networkId = !!getNetworkDevicesLatencyStats_parameters.networkId ? getNetworkDevicesLatencyStats_parameters.networkId : msg.payload;
                
                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_t0;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_t0Type;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.t0 = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.t0 = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.t0 = !!getNetworkDevicesLatencyStats_parameters.t0 ? getNetworkDevicesLatencyStats_parameters.t0 : msg.payload;
                
                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_t1;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_t1Type;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.t1 = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.t1 = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.t1 = !!getNetworkDevicesLatencyStats_parameters.t1 ? getNetworkDevicesLatencyStats_parameters.t1 : msg.payload;
                
                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_ssid;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_ssidType;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.ssid = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.ssid = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.ssid = !!getNetworkDevicesLatencyStats_parameters.ssid ? getNetworkDevicesLatencyStats_parameters.ssid : msg.payload;
                
                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_vlan;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_vlanType;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.vlan = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.vlan = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.vlan = !!getNetworkDevicesLatencyStats_parameters.vlan ? getNetworkDevicesLatencyStats_parameters.vlan : msg.payload;
                
                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_apTag;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_apTagType;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.apTag = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.apTag = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.apTag = !!getNetworkDevicesLatencyStats_parameters.apTag ? getNetworkDevicesLatencyStats_parameters.apTag : msg.payload;
                
                getNetworkDevicesLatencyStats_nodeParam = node.getNetworkDevicesLatencyStats_fields;
                getNetworkDevicesLatencyStats_nodeParamType = node.getNetworkDevicesLatencyStats_fieldsType;
                if (getNetworkDevicesLatencyStats_nodeParamType === 'str') {
                    //getNetworkDevicesLatencyStats_parameters.fields = getNetworkDevicesLatencyStats_nodeParam || '';
                    getNetworkDevicesLatencyStats_parameters.fields = getNetworkDevicesLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDevicesLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, getNetworkDevicesLatencyStats_nodeParam);
                }
                //getNetworkDevicesLatencyStats_parameters.fields = !!getNetworkDevicesLatencyStats_parameters.fields ? getNetworkDevicesLatencyStats_parameters.fields : msg.payload;
                                result = client.getNetworkDevicesLatencyStats(getNetworkDevicesLatencyStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkDeviceLatencyStats') {
                var getNetworkDeviceLatencyStats_parameters = [];
                var getNetworkDeviceLatencyStats_nodeParam;
                var getNetworkDeviceLatencyStats_nodeParamType;

                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_networkId;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_networkIdType;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.networkId = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.networkId = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.networkId = !!getNetworkDeviceLatencyStats_parameters.networkId ? getNetworkDeviceLatencyStats_parameters.networkId : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_serial;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_serialType;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.serial = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.serial = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.serial = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.serial = !!getNetworkDeviceLatencyStats_parameters.serial ? getNetworkDeviceLatencyStats_parameters.serial : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_t0;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_t0Type;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.t0 = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.t0 = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.t0 = !!getNetworkDeviceLatencyStats_parameters.t0 ? getNetworkDeviceLatencyStats_parameters.t0 : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_t1;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_t1Type;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.t1 = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.t1 = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.t1 = !!getNetworkDeviceLatencyStats_parameters.t1 ? getNetworkDeviceLatencyStats_parameters.t1 : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_ssid;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_ssidType;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.ssid = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.ssid = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.ssid = !!getNetworkDeviceLatencyStats_parameters.ssid ? getNetworkDeviceLatencyStats_parameters.ssid : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_vlan;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_vlanType;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.vlan = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.vlan = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.vlan = !!getNetworkDeviceLatencyStats_parameters.vlan ? getNetworkDeviceLatencyStats_parameters.vlan : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_apTag;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_apTagType;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.apTag = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.apTag = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.apTag = !!getNetworkDeviceLatencyStats_parameters.apTag ? getNetworkDeviceLatencyStats_parameters.apTag : msg.payload;
                
                getNetworkDeviceLatencyStats_nodeParam = node.getNetworkDeviceLatencyStats_fields;
                getNetworkDeviceLatencyStats_nodeParamType = node.getNetworkDeviceLatencyStats_fieldsType;
                if (getNetworkDeviceLatencyStats_nodeParamType === 'str') {
                    //getNetworkDeviceLatencyStats_parameters.fields = getNetworkDeviceLatencyStats_nodeParam || '';
                    getNetworkDeviceLatencyStats_parameters.fields = getNetworkDeviceLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkDeviceLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, getNetworkDeviceLatencyStats_nodeParam);
                }
                //getNetworkDeviceLatencyStats_parameters.fields = !!getNetworkDeviceLatencyStats_parameters.fields ? getNetworkDeviceLatencyStats_parameters.fields : msg.payload;
                                result = client.getNetworkDeviceLatencyStats(getNetworkDeviceLatencyStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientsLatencyStats') {
                var getNetworkClientsLatencyStats_parameters = [];
                var getNetworkClientsLatencyStats_nodeParam;
                var getNetworkClientsLatencyStats_nodeParamType;

                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_networkId;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_networkIdType;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.networkId = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.networkId = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.networkId = !!getNetworkClientsLatencyStats_parameters.networkId ? getNetworkClientsLatencyStats_parameters.networkId : msg.payload;
                
                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_t0;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_t0Type;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.t0 = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.t0 = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.t0 = !!getNetworkClientsLatencyStats_parameters.t0 ? getNetworkClientsLatencyStats_parameters.t0 : msg.payload;
                
                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_t1;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_t1Type;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.t1 = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.t1 = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.t1 = !!getNetworkClientsLatencyStats_parameters.t1 ? getNetworkClientsLatencyStats_parameters.t1 : msg.payload;
                
                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_ssid;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_ssidType;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.ssid = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.ssid = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.ssid = !!getNetworkClientsLatencyStats_parameters.ssid ? getNetworkClientsLatencyStats_parameters.ssid : msg.payload;
                
                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_vlan;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_vlanType;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.vlan = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.vlan = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.vlan = !!getNetworkClientsLatencyStats_parameters.vlan ? getNetworkClientsLatencyStats_parameters.vlan : msg.payload;
                
                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_apTag;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_apTagType;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.apTag = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.apTag = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.apTag = !!getNetworkClientsLatencyStats_parameters.apTag ? getNetworkClientsLatencyStats_parameters.apTag : msg.payload;
                
                getNetworkClientsLatencyStats_nodeParam = node.getNetworkClientsLatencyStats_fields;
                getNetworkClientsLatencyStats_nodeParamType = node.getNetworkClientsLatencyStats_fieldsType;
                if (getNetworkClientsLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientsLatencyStats_parameters.fields = getNetworkClientsLatencyStats_nodeParam || '';
                    getNetworkClientsLatencyStats_parameters.fields = getNetworkClientsLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientsLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, getNetworkClientsLatencyStats_nodeParam);
                }
                //getNetworkClientsLatencyStats_parameters.fields = !!getNetworkClientsLatencyStats_parameters.fields ? getNetworkClientsLatencyStats_parameters.fields : msg.payload;
                                result = client.getNetworkClientsLatencyStats(getNetworkClientsLatencyStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkClientLatencyStats') {
                var getNetworkClientLatencyStats_parameters = [];
                var getNetworkClientLatencyStats_nodeParam;
                var getNetworkClientLatencyStats_nodeParamType;

                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_networkId;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_networkIdType;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.networkId = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.networkId = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.networkId = !!getNetworkClientLatencyStats_parameters.networkId ? getNetworkClientLatencyStats_parameters.networkId : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_clientId;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_clientIdType;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.clientId = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.clientId = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.clientId = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.clientId = !!getNetworkClientLatencyStats_parameters.clientId ? getNetworkClientLatencyStats_parameters.clientId : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_t0;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_t0Type;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.t0 = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.t0 = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.t0 = !!getNetworkClientLatencyStats_parameters.t0 ? getNetworkClientLatencyStats_parameters.t0 : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_t1;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_t1Type;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.t1 = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.t1 = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.t1 = !!getNetworkClientLatencyStats_parameters.t1 ? getNetworkClientLatencyStats_parameters.t1 : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_ssid;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_ssidType;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.ssid = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.ssid = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.ssid = !!getNetworkClientLatencyStats_parameters.ssid ? getNetworkClientLatencyStats_parameters.ssid : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_vlan;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_vlanType;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.vlan = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.vlan = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.vlan = !!getNetworkClientLatencyStats_parameters.vlan ? getNetworkClientLatencyStats_parameters.vlan : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_apTag;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_apTagType;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.apTag = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.apTag = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.apTag = !!getNetworkClientLatencyStats_parameters.apTag ? getNetworkClientLatencyStats_parameters.apTag : msg.payload;
                
                getNetworkClientLatencyStats_nodeParam = node.getNetworkClientLatencyStats_fields;
                getNetworkClientLatencyStats_nodeParamType = node.getNetworkClientLatencyStats_fieldsType;
                if (getNetworkClientLatencyStats_nodeParamType === 'str') {
                    //getNetworkClientLatencyStats_parameters.fields = getNetworkClientLatencyStats_nodeParam || '';
                    getNetworkClientLatencyStats_parameters.fields = getNetworkClientLatencyStats_nodeParam || undefined;
                } else {
                    getNetworkClientLatencyStats_parameters.fields = RED.util.getMessageProperty(msg, getNetworkClientLatencyStats_nodeParam);
                }
                //getNetworkClientLatencyStats_parameters.fields = !!getNetworkClientLatencyStats_parameters.fields ? getNetworkClientLatencyStats_parameters.fields : msg.payload;
                                result = client.getNetworkClientLatencyStats(getNetworkClientLatencyStats_parameters);
            }
            if (!errorFlag && node.method === 'getNetworkFailedConnections') {
                var getNetworkFailedConnections_parameters = [];
                var getNetworkFailedConnections_nodeParam;
                var getNetworkFailedConnections_nodeParamType;

                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_networkId;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_networkIdType;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.networkId = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.networkId = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.networkId = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.networkId = !!getNetworkFailedConnections_parameters.networkId ? getNetworkFailedConnections_parameters.networkId : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_t0;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_t0Type;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.t0 = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.t0 = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.t0 = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.t0 = !!getNetworkFailedConnections_parameters.t0 ? getNetworkFailedConnections_parameters.t0 : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_t1;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_t1Type;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.t1 = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.t1 = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.t1 = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.t1 = !!getNetworkFailedConnections_parameters.t1 ? getNetworkFailedConnections_parameters.t1 : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_ssid;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_ssidType;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.ssid = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.ssid = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.ssid = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.ssid = !!getNetworkFailedConnections_parameters.ssid ? getNetworkFailedConnections_parameters.ssid : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_vlan;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_vlanType;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.vlan = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.vlan = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.vlan = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.vlan = !!getNetworkFailedConnections_parameters.vlan ? getNetworkFailedConnections_parameters.vlan : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_apTag;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_apTagType;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.apTag = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.apTag = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.apTag = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.apTag = !!getNetworkFailedConnections_parameters.apTag ? getNetworkFailedConnections_parameters.apTag : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_serial;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_serialType;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.serial = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.serial = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.serial = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.serial = !!getNetworkFailedConnections_parameters.serial ? getNetworkFailedConnections_parameters.serial : msg.payload;
                
                getNetworkFailedConnections_nodeParam = node.getNetworkFailedConnections_clientId;
                getNetworkFailedConnections_nodeParamType = node.getNetworkFailedConnections_clientIdType;
                if (getNetworkFailedConnections_nodeParamType === 'str') {
                    //getNetworkFailedConnections_parameters.clientId = getNetworkFailedConnections_nodeParam || '';
                    getNetworkFailedConnections_parameters.clientId = getNetworkFailedConnections_nodeParam || undefined;
                } else {
                    getNetworkFailedConnections_parameters.clientId = RED.util.getMessageProperty(msg, getNetworkFailedConnections_nodeParam);
                }
                //getNetworkFailedConnections_parameters.clientId = !!getNetworkFailedConnections_parameters.clientId ? getNetworkFailedConnections_parameters.clientId : msg.payload;
                                result = client.getNetworkFailedConnections(getNetworkFailedConnections_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
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
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('meraki-dashboard-api', MerakiDashboardApiNode);
    function MerakiDashboardApiServiceNode(n) {
        RED.nodes.createNode(this, n);

        this.secureApiKeyValue = n.secureApiKeyValue;
        this.secureApiKeyHeaderOrQueryName = n.secureApiKeyHeaderOrQueryName;
        this.secureApiKeyIsQuery = n.secureApiKeyIsQuery;
    }

    RED.nodes.registerType('meraki-dashboard-api-service', MerakiDashboardApiServiceNode, {
        credentials: {
            secureApiKeyValue: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
