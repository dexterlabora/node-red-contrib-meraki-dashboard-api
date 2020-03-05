/*jshint -W069 */
/**
 * The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 * @class MerakiDashboardApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var MerakiDashboardApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function MerakiDashboardApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.meraki.com/api/v0';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
                this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name MerakiDashboardApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    MerakiDashboardApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body,
            followAllRedirects: true
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

            /**
            * Set Api Key
            * @method
            * @name MerakiDashboardApi#setApiKey
            * @param {string} value - apiKey's value
            * @param {string} headerOrQueryName - the header or query name to send the apiKey at
            * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
            */
            MerakiDashboardApi.prototype.setApiKey = function (value, headerOrQueryName, isQuery) {
                this.apiKey.value = value;
                this.apiKey.headerOrQueryName = headerOrQueryName;
                this.apiKey.isQuery = isQuery;
            };
        /**
        * Set Auth headers
        * @method
        * @name MerakiDashboardApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        MerakiDashboardApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
                headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
            }
            return headers;
        };

/**
 * Returns live state from camera of analytics zones
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsLive
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceCameraAnalyticsLive = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/analytics/live';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns an overview of aggregate analytics data for a timespan
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsOverview
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days. The default is 1 hour.
     * @param {string} parameters.objectType - [optional] The object type for which analytics will be retrieved. The default object type is person. The available types are [person, vehicle].
 */
 MerakiDashboardApi.prototype.getDeviceCameraAnalyticsOverview = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/analytics/overview';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['objectType'] !== undefined){
                    queryParameters['objectType'] = parameters['objectType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns most recent record for analytics zones
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsRecent
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.objectType - [optional] The object type for which analytics will be retrieved. The default object type is person. The available types are [person, vehicle].
 */
 MerakiDashboardApi.prototype.getDeviceCameraAnalyticsRecent = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/analytics/recent';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['objectType'] !== undefined){
                    queryParameters['objectType'] = parameters['objectType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all configured analytic zones for this camera
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsZones
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceCameraAnalyticsZones = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/analytics/zones';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return historical records for analytic zones
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsZoneHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.zoneId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 14 hours after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 14 hours. The default is 1 hour.
     * @param {integer} parameters.resolution - The time resolution in seconds for returned data. The valid resolutions are: 60. The default is 60.
     * @param {string} parameters.objectType - [optional] The object type for which analytics will be retrieved. The default object type is person. The available types are [person, vehicle].
 */
 MerakiDashboardApi.prototype.getDeviceCameraAnalyticsZoneHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/analytics/zones/{zoneId}/history';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
            path = path.replace('{zoneId}', parameters['zoneId']);
        
        


        if(parameters['zoneId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: zoneId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['resolution'] !== undefined){
                    queryParameters['resolution'] = parameters['resolution'];
                }
        
        
        


 

                if(parameters['objectType'] !== undefined){
                    queryParameters['objectType'] = parameters['objectType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns quality and retention settings for the given camera
 * @method
 * @name MerakiDashboardApi#getDeviceCameraQualityAndRetentionSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceCameraQualityAndRetentionSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/qualityAndRetentionSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update quality and retention settings for the given camera
 * @method
 * @name MerakiDashboardApi#updateDeviceCameraQualityAndRetentionSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateDeviceCameraQualityAndRetentionSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateDeviceCameraQualityAndRetentionSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/camera/qualityAndRetentionSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateDeviceCameraQualityAndRetentionSettings'] !== undefined){
                body = parameters['updateDeviceCameraQualityAndRetentionSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Show the LAN Settings of a MG
 * @method
 * @name MerakiDashboardApi#getDeviceCellularGatewaySettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceCellularGatewaySettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/cellularGateway/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the LAN Settings for a single MG.
 * @method
 * @name MerakiDashboardApi#updateDeviceCellularGatewaySettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateDeviceCellularGatewaySettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateDeviceCellularGatewaySettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/cellularGateway/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateDeviceCellularGatewaySettings'] !== undefined){
                body = parameters['updateDeviceCellularGatewaySettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the port forwarding rules for a single MG.
 * @method
 * @name MerakiDashboardApi#getDeviceCellularGatewaySettingsPortForwardingRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceCellularGatewaySettingsPortForwardingRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/cellularGateway/settings/portForwardingRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the port forwarding rules for a single MG.
 * @method
 * @name MerakiDashboardApi#updateDeviceCellularGatewaySettingsPortForwardingRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateDeviceCellularGatewaySettingsPortForwardingRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateDeviceCellularGatewaySettingsPortForwardingRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/cellularGateway/settings/portForwardingRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateDeviceCellularGatewaySettingsPortForwardingRules'] !== undefined){
                body = parameters['updateDeviceCellularGatewaySettingsPortForwardingRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the clients of a device, up to a maximum of a month ago. The usage of each client is returned in kilobytes. If the device is a switch, the switchport is returned; otherwise the switchport field is null.
 * @method
 * @name MerakiDashboardApi#getDeviceClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 31 days. The default is 1 day.
 */
 MerakiDashboardApi.prototype.getDeviceClients = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/clients';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Cycle a set of switch ports
 * @method
 * @name MerakiDashboardApi#cycleDeviceSwitchPorts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.cycleDeviceSwitchPorts - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.cycleDeviceSwitchPorts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/switch/ports/cycle';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['cycleDeviceSwitchPorts'] !== undefined){
                body = parameters['cycleDeviceSwitchPorts'];
            }


        if(parameters['cycleDeviceSwitchPorts'] === undefined){
            deferred.reject(new Error('Missing required  parameter: cycleDeviceSwitchPorts'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the status for all the ports of a switch
 * @method
 * @name MerakiDashboardApi#getDeviceSwitchPortStatuses
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 31 days. The default is 1 day.
 */
 MerakiDashboardApi.prototype.getDeviceSwitchPortStatuses = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/switchPortStatuses';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the packet counters for all the ports of a switch
 * @method
 * @name MerakiDashboardApi#getDeviceSwitchPortStatusesPackets
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 1 day from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 1 day. The default is 1 day.
 */
 MerakiDashboardApi.prototype.getDeviceSwitchPortStatusesPackets = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/switchPortStatuses/packets';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the switch ports for a switch
 * @method
 * @name MerakiDashboardApi#getDeviceSwitchPorts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceSwitchPorts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/switchPorts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a switch port
 * @method
 * @name MerakiDashboardApi#getDeviceSwitchPort
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceSwitchPort = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/switchPorts/{number}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a switch port
 * @method
 * @name MerakiDashboardApi#updateDeviceSwitchPort
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateDeviceSwitchPort - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateDeviceSwitchPort = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/switchPorts/{number}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateDeviceSwitchPort'] !== undefined){
                body = parameters['updateDeviceSwitchPort'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the bluetooth settings for a wireless device
 * @method
 * @name MerakiDashboardApi#getDeviceWirelessBluetoothSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getDeviceWirelessBluetoothSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/wireless/bluetooth/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the bluetooth settings for a wireless device
 * @method
 * @name MerakiDashboardApi#updateDeviceWirelessBluetoothSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateDeviceWirelessBluetoothSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateDeviceWirelessBluetoothSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{serial}/wireless/bluetooth/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateDeviceWirelessBluetoothSettings'] !== undefined){
                body = parameters['updateDeviceWirelessBluetoothSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a network
 * @method
 * @name MerakiDashboardApi#getNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a network
 * @method
 * @name MerakiDashboardApi#updateNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetwork - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetwork'] !== undefined){
                body = parameters['updateNetwork'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a network
 * @method
 * @name MerakiDashboardApi#deleteNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the access policies for this network. Only valid for MS networks.
 * @method
 * @name MerakiDashboardApi#getNetworkAccessPolicies
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkAccessPolicies = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/accessPolicies';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List Air Marshal scan results from a network
 * @method
 * @name MerakiDashboardApi#getNetworkAirMarshal
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 31 days. The default is 7 days.
 */
 MerakiDashboardApi.prototype.getNetworkAirMarshal = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/airMarshal';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the alert configuration for this network
 * @method
 * @name MerakiDashboardApi#getNetworkAlertSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkAlertSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/alertSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the alert configuration for this network
 * @method
 * @name MerakiDashboardApi#updateNetworkAlertSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkAlertSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkAlertSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/alertSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkAlertSettings'] !== undefined){
                body = parameters['updateNetworkAlertSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the inbound firewall rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkApplianceFirewallInboundFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkApplianceFirewallInboundFirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/appliance/firewall/inboundFirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the inbound firewall rules of an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkApplianceFirewallInboundFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkApplianceFirewallInboundFirewallRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkApplianceFirewallInboundFirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/appliance/firewall/inboundFirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkApplianceFirewallInboundFirewallRules'] !== undefined){
                body = parameters['updateNetworkApplianceFirewallInboundFirewallRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List per-port VLAN settings for all ports of a MX.
 * @method
 * @name MerakiDashboardApi#getNetworkAppliancePorts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkAppliancePorts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/appliancePorts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return per-port VLAN settings for a single MX port.
 * @method
 * @name MerakiDashboardApi#getNetworkAppliancePort
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.appliancePortId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkAppliancePort = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/appliancePorts/{appliancePortId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appliancePortId}', parameters['appliancePortId']);
        
        


        if(parameters['appliancePortId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appliancePortId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the per-port VLAN settings for a single MX port.
 * @method
 * @name MerakiDashboardApi#updateNetworkAppliancePort
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.appliancePortId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkAppliancePort - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkAppliancePort = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/appliancePorts/{appliancePortId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appliancePortId}', parameters['appliancePortId']);
        
        


        if(parameters['appliancePortId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appliancePortId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkAppliancePort'] !== undefined){
                body = parameters['updateNetworkAppliancePort'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Bind a network to a template.
 * @method
 * @name MerakiDashboardApi#bindNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.bindNetwork - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.bindNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/bind';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['bindNetwork'] !== undefined){
                body = parameters['bindNetwork'];
            }


        if(parameters['bindNetwork'] === undefined){
            deferred.reject(new Error('Missing required  parameter: bindNetwork'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the Bluetooth clients seen by APs in this network
 * @method
 * @name MerakiDashboardApi#getNetworkBluetoothClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 7 days from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 7 days. The default is 1 day.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 5 - 1000. Default is 10.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {boolean} parameters.includeConnectivityHistory - Include the connectivity history for this client
 */
 MerakiDashboardApi.prototype.getNetworkBluetoothClients = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/bluetoothClients';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 

                if(parameters['includeConnectivityHistory'] !== undefined){
                    queryParameters['includeConnectivityHistory'] = parameters['includeConnectivityHistory'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a Bluetooth client. Bluetooth clients can be identified by their ID or their MAC.
 * @method
 * @name MerakiDashboardApi#getNetworkBluetoothClient
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.bluetoothClientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {boolean} parameters.includeConnectivityHistory - Include the connectivity history for this client
     * @param {integer} parameters.connectivityHistoryTimespan - The timespan, in seconds, for the connectivityHistory data. By default 1 day, 86400, will be used.
 */
 MerakiDashboardApi.prototype.getNetworkBluetoothClient = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/bluetoothClients/{bluetoothClientId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{bluetoothClientId}', parameters['bluetoothClientId']);
        
        


        if(parameters['bluetoothClientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: bluetoothClientId'));
            return deferred.promise;
        }
 

                if(parameters['includeConnectivityHistory'] !== undefined){
                    queryParameters['includeConnectivityHistory'] = parameters['includeConnectivityHistory'];
                }
        
        
        


 

                if(parameters['connectivityHistoryTimespan'] !== undefined){
                    queryParameters['connectivityHistoryTimespan'] = parameters['connectivityHistoryTimespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the Bluetooth settings for a network. <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a> must be enabled on the network.
 * @method
 * @name MerakiDashboardApi#getNetworkBluetoothSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkBluetoothSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/bluetoothSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the Bluetooth settings for a network. See the docs page for <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a>.
 * @method
 * @name MerakiDashboardApi#updateNetworkBluetoothSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkBluetoothSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkBluetoothSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/bluetoothSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkBluetoothSettings'] !== undefined){
                body = parameters['updateNetworkBluetoothSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the quality retention profiles for this network
 * @method
 * @name MerakiDashboardApi#getNetworkCameraQualityRetentionProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCameraQualityRetentionProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/camera/qualityRetentionProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates new quality retention profile for this network.
 * @method
 * @name MerakiDashboardApi#createNetworkCameraQualityRetentionProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkCameraQualityRetentionProfile - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkCameraQualityRetentionProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/camera/qualityRetentionProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkCameraQualityRetentionProfile'] !== undefined){
                body = parameters['createNetworkCameraQualityRetentionProfile'];
            }


        if(parameters['createNetworkCameraQualityRetentionProfile'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkCameraQualityRetentionProfile'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Retrieve a single quality retention profile
 * @method
 * @name MerakiDashboardApi#getNetworkCameraQualityRetentionProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.qualityRetentionProfileId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCameraQualityRetentionProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/camera/qualityRetentionProfiles/{qualityRetentionProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{qualityRetentionProfileId}', parameters['qualityRetentionProfileId']);
        
        


        if(parameters['qualityRetentionProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: qualityRetentionProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an existing quality retention profile for this network.
 * @method
 * @name MerakiDashboardApi#updateNetworkCameraQualityRetentionProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.qualityRetentionProfileId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkCameraQualityRetentionProfile - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkCameraQualityRetentionProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/camera/qualityRetentionProfiles/{qualityRetentionProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{qualityRetentionProfileId}', parameters['qualityRetentionProfileId']);
        
        


        if(parameters['qualityRetentionProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: qualityRetentionProfileId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkCameraQualityRetentionProfile'] !== undefined){
                body = parameters['updateNetworkCameraQualityRetentionProfile'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete an existing quality retention profile for this network.
 * @method
 * @name MerakiDashboardApi#deleteNetworkCameraQualityRetentionProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.qualityRetentionProfileId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkCameraQualityRetentionProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/camera/qualityRetentionProfiles/{qualityRetentionProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{qualityRetentionProfileId}', parameters['qualityRetentionProfileId']);
        
        


        if(parameters['qualityRetentionProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: qualityRetentionProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of all camera recording schedules.
 * @method
 * @name MerakiDashboardApi#getNetworkCameraSchedules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCameraSchedules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/camera/schedules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Generate a snapshot of what the camera sees at the specified time and return a link to that image.
 * @method
 * @name MerakiDashboardApi#generateNetworkCameraSnapshot
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.generateNetworkCameraSnapshot - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.generateNetworkCameraSnapshot = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cameras/{serial}/snapshot';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['generateNetworkCameraSnapshot'] !== undefined){
                body = parameters['generateNetworkCameraSnapshot'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns video link to the specified camera. If a timestamp is supplied, it links to that timestamp.
 * @method
 * @name MerakiDashboardApi#getNetworkCameraVideoLink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.timestamp - [optional] The video link will start at this timestamp. The timestamp is in UNIX Epoch time (milliseconds). If no timestamp is specified, we will assume current time.
 */
 MerakiDashboardApi.prototype.getNetworkCameraVideoLink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cameras/{serial}/videoLink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['timestamp'] !== undefined){
                    queryParameters['timestamp'] = parameters['timestamp'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the cellular firewall rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkCellularFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCellularFirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularFirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the cellular firewall rules of an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkCellularFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkCellularFirewallRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkCellularFirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularFirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkCellularFirewallRules'] !== undefined){
                body = parameters['updateNetworkCellularFirewallRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the connectivity testing destinations for an MG network
 * @method
 * @name MerakiDashboardApi#getNetworkCellularGatewaySettingsConnectivityMonitoringDestinations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCellularGatewaySettingsConnectivityMonitoringDestinations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/connectivityMonitoringDestinations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the connectivity testing destinations for an MG network
 * @method
 * @name MerakiDashboardApi#updateNetworkCellularGatewaySettingsConnectivityMonitoringDestinations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkCellularGatewaySettingsConnectivityMonitoringDestinations - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkCellularGatewaySettingsConnectivityMonitoringDestinations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/connectivityMonitoringDestinations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkCellularGatewaySettingsConnectivityMonitoringDestinations'] !== undefined){
                body = parameters['updateNetworkCellularGatewaySettingsConnectivityMonitoringDestinations'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List common DHCP settings of MGs
 * @method
 * @name MerakiDashboardApi#getNetworkCellularGatewaySettingsDhcp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCellularGatewaySettingsDhcp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/dhcp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update common DHCP settings of MGs
 * @method
 * @name MerakiDashboardApi#updateNetworkCellularGatewaySettingsDhcp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkCellularGatewaySettingsDhcp - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkCellularGatewaySettingsDhcp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/dhcp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkCellularGatewaySettingsDhcp'] !== undefined){
                body = parameters['updateNetworkCellularGatewaySettingsDhcp'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the subnet pool and mask configured for MGs in the network.
 * @method
 * @name MerakiDashboardApi#getNetworkCellularGatewaySettingsSubnetPool
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCellularGatewaySettingsSubnetPool = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/subnetPool';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the subnet pool and mask configuration for MGs in the network.
 * @method
 * @name MerakiDashboardApi#updateNetworkCellularGatewaySettingsSubnetPool
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkCellularGatewaySettingsSubnetPool - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkCellularGatewaySettingsSubnetPool = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/subnetPool';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkCellularGatewaySettingsSubnetPool'] !== undefined){
                body = parameters['updateNetworkCellularGatewaySettingsSubnetPool'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the uplink settings for your MG network.
 * @method
 * @name MerakiDashboardApi#getNetworkCellularGatewaySettingsUplink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkCellularGatewaySettingsUplink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/uplink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the uplink settings for your MG network.
 * @method
 * @name MerakiDashboardApi#updateNetworkCellularGatewaySettingsUplink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkCellularGatewaySettingsUplink - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkCellularGatewaySettingsUplink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/cellularGateway/settings/uplink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkCellularGatewaySettingsUplink'] !== undefined){
                body = parameters['updateNetworkCellularGatewaySettingsUplink'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the clients that have used this network in the timespan
 * @method
 * @name MerakiDashboardApi#getNetworkClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 31 days. The default is 1 day.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 10.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkClients = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated connectivity info for this network, grouped by clients
 * @method
 * @name MerakiDashboardApi#getNetworkClientsConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
 MerakiDashboardApi.prototype.getNetworkClientsConnectionStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/connectionStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated latency info for this network, grouped by clients
 * @method
 * @name MerakiDashboardApi#getNetworkClientsLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
 MerakiDashboardApi.prototype.getNetworkClientsLatencyStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/latencyStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 

                if(parameters['fields'] !== undefined){
                    queryParameters['fields'] = parameters['fields'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Provisions a client with a name and policy. Clients can be provisioned before they associate to the network.
 * @method
 * @name MerakiDashboardApi#provisionNetworkClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.provisionNetworkClients - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.provisionNetworkClients = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/provision';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['provisionNetworkClients'] !== undefined){
                body = parameters['provisionNetworkClients'];
            }


        if(parameters['provisionNetworkClients'] === undefined){
            deferred.reject(new Error('Missing required  parameter: provisionNetworkClients'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the client associated with the given identifier. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClient
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkClient = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated connectivity info for a given client on this network. Clients are identified by their MAC.
 * @method
 * @name MerakiDashboardApi#getNetworkClientConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
 MerakiDashboardApi.prototype.getNetworkClientConnectionStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/connectionStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the events associated with this client. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClientEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 100. Default is 100.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkClientEvents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/events';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the latency history for a client. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP. The latency data is from a sample of 2% of packets and is grouped into 4 traffic categories: background, best effort, video, voice. Within these categories the sampled packet counters are bucketed by latency in milliseconds.
 * @method
 * @name MerakiDashboardApi#getNetworkClientLatencyHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 791 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 791 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 791 days. The default is 1 day.
     * @param {integer} parameters.resolution - The time resolution in seconds for returned data. The valid resolutions are: 86400. The default is 86400.
 */
 MerakiDashboardApi.prototype.getNetworkClientLatencyHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/latencyHistory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['resolution'] !== undefined){
                    queryParameters['resolution'] = parameters['resolution'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated latency info for a given client on this network. Clients are identified by their MAC.
 * @method
 * @name MerakiDashboardApi#getNetworkClientLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
 MerakiDashboardApi.prototype.getNetworkClientLatencyStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/latencyStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 

                if(parameters['fields'] !== undefined){
                    queryParameters['fields'] = parameters['fields'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the policy assigned to a client on the network. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClientPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkClientPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/policy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the policy assigned to a client on the network. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#updateNetworkClientPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkClientPolicy - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkClientPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/policy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkClientPolicy'] !== undefined){
                body = parameters['updateNetworkClientPolicy'];
            }


        if(parameters['updateNetworkClientPolicy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkClientPolicy'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the security events for a client. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClientSecurityEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 791 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 791 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 791 days. The default is 31 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 100.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkClientSecurityEvents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/securityEvents';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the splash authorization for a client, for each SSID they've associated with through splash. Only enabled SSIDs with Click-through splash enabled will be included. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClientSplashAuthorizationStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkClientSplashAuthorizationStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/splashAuthorizationStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a client's splash authorization. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#updateNetworkClientSplashAuthorizationStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkClientSplashAuthorizationStatus - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkClientSplashAuthorizationStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/splashAuthorizationStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkClientSplashAuthorizationStatus'] !== undefined){
                body = parameters['updateNetworkClientSplashAuthorizationStatus'];
            }


        if(parameters['updateNetworkClientSplashAuthorizationStatus'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkClientSplashAuthorizationStatus'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the client's network traffic data over time. Usage data is in kilobytes. This endpoint requires detailed traffic analysis to be enabled on the Network-wide > General page. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClientTrafficHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkClientTrafficHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/trafficHistory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the client's daily usage history. Usage data is in kilobytes. Clients can be identified by a client key or either the MAC or IP depending on whether the network uses Track-by-IP.
 * @method
 * @name MerakiDashboardApi#getNetworkClientUsageHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.clientId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkClientUsageHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/clients/{clientId}/usageHistory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientId}', parameters['clientId']);
        
        


        if(parameters['clientId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated connectivity info for this network
 * @method
 * @name MerakiDashboardApi#getNetworkConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
 MerakiDashboardApi.prototype.getNetworkConnectionStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/connectionStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the connectivity testing destinations for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkConnectivityMonitoringDestinations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkConnectivityMonitoringDestinations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/connectivityMonitoringDestinations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the connectivity testing destinations for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkConnectivityMonitoringDestinations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkConnectivityMonitoringDestinations - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkConnectivityMonitoringDestinations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/connectivityMonitoringDestinations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkConnectivityMonitoringDestinations'] !== undefined){
                body = parameters['updateNetworkConnectivityMonitoringDestinations'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the content filtering settings for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkContentFiltering
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkContentFiltering = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/contentFiltering';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the content filtering settings for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkContentFiltering
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkContentFiltering - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkContentFiltering = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/contentFiltering';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkContentFiltering'] !== undefined){
                body = parameters['updateNetworkContentFiltering'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List all available content filtering categories for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkContentFilteringCategories
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkContentFilteringCategories = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/contentFiltering/categories';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the devices in a network
 * @method
 * @name MerakiDashboardApi#getNetworkDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Claim devices into a network
 * @method
 * @name MerakiDashboardApi#claimNetworkDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.claimNetworkDevices - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.claimNetworkDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/claim';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['claimNetworkDevices'] !== undefined){
                body = parameters['claimNetworkDevices'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated connectivity info for this network, grouped by node
 * @method
 * @name MerakiDashboardApi#getNetworkDevicesConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
 MerakiDashboardApi.prototype.getNetworkDevicesConnectionStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/connectionStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated latency info for this network, grouped by node
 * @method
 * @name MerakiDashboardApi#getNetworkDevicesLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
 MerakiDashboardApi.prototype.getNetworkDevicesLatencyStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/latencyStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 

                if(parameters['fields'] !== undefined){
                    queryParameters['fields'] = parameters['fields'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a single device
 * @method
 * @name MerakiDashboardApi#getNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the attributes of a device
 * @method
 * @name MerakiDashboardApi#updateNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkDevice - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkDevice'] !== undefined){
                body = parameters['updateNetworkDevice'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Blink the LEDs on a device
 * @method
 * @name MerakiDashboardApi#blinkNetworkDeviceLeds
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.blinkNetworkDeviceLeds - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.blinkNetworkDeviceLeds = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/blinkLeds';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['blinkNetworkDeviceLeds'] !== undefined){
                body = parameters['blinkNetworkDeviceLeds'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated connectivity info for a given AP on this network
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
 MerakiDashboardApi.prototype.getNetworkDeviceConnectionStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/connectionStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated latency info for a given AP on this network
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
 MerakiDashboardApi.prototype.getNetworkDeviceLatencyStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/latencyStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 

                if(parameters['fields'] !== undefined){
                    queryParameters['fields'] = parameters['fields'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List LLDP and CDP information for a device
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceLldp_cdp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.timespan - The timespan for which LLDP and CDP information will be fetched. Must be in seconds and less than or equal to a month (2592000 seconds). LLDP and CDP information is sent to the Meraki dashboard every 10 minutes. In instances where this LLDP and CDP information matches an existing entry in the Meraki dashboard, the data is updated once every two hours. Meraki recommends querying LLDP and CDP information at an interval slightly greater than two hours, to ensure that unchanged CDP / LLDP information can be queried consistently.
 */
 MerakiDashboardApi.prototype.getNetworkDeviceLldp_cdp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/lldp_cdp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the uplink loss percentage and latency in milliseconds for a wired network device.
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceLossAndLatencyHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 31 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 1 day.
     * @param {integer} parameters.resolution - The time resolution in seconds for returned data. The valid resolutions are: 60, 600, 3600, 86400. The default is 60.
     * @param {string} parameters.uplink - The WAN uplink used to obtain the requested stats. Valid uplinks are wan1, wan2, cellular. The default is wan1.
     * @param {string} parameters.ip - The destination IP used to obtain the requested stats. This is required.
 */
 MerakiDashboardApi.prototype.getNetworkDeviceLossAndLatencyHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/lossAndLatencyHistory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['resolution'] !== undefined){
                    queryParameters['resolution'] = parameters['resolution'];
                }
        
        
        


 

                if(parameters['uplink'] !== undefined){
                    queryParameters['uplink'] = parameters['uplink'];
                }
        
        
        


 

                if(parameters['ip'] !== undefined){
                    queryParameters['ip'] = parameters['ip'];
                }
        
        
        


        if(parameters['ip'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ip'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the management interface settings for a device
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceManagementInterfaceSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDeviceManagementInterfaceSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/managementInterfaceSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the management interface settings for a device
 * @method
 * @name MerakiDashboardApi#updateNetworkDeviceManagementInterfaceSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkDeviceManagementInterfaceSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkDeviceManagementInterfaceSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/managementInterfaceSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkDeviceManagementInterfaceSettings'] !== undefined){
                body = parameters['updateNetworkDeviceManagementInterfaceSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the performance score for a single device. Only primary MX devices supported. If no data is available, a 204 error code is returned.
 * @method
 * @name MerakiDashboardApi#getNetworkDevicePerformance
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDevicePerformance = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/performance';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Reboot a device
 * @method
 * @name MerakiDashboardApi#rebootNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.rebootNetworkDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/reboot';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove a single device
 * @method
 * @name MerakiDashboardApi#removeNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.removeNetworkDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/remove';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the uplink information for a device.
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceUplink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDeviceUplink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/uplink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the radio settings of a device
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceWirelessRadioSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDeviceWirelessRadioSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/wireless/radioSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the radio settings of a device
 * @method
 * @name MerakiDashboardApi#updateNetworkDeviceWirelessRadioSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkDeviceWirelessRadioSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkDeviceWirelessRadioSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/wireless/radioSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkDeviceWirelessRadioSettings'] !== undefined){
                body = parameters['updateNetworkDeviceWirelessRadioSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the SSID statuses of an access point
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceWirelessStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.serial - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkDeviceWirelessStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/devices/{serial}/wireless/status';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{serial}', parameters['serial']);
        
        


        if(parameters['serial'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serial'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the events for the network
 * @method
 * @name MerakiDashboardApi#getNetworkEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.productType - The product type to fetch events for. This parameter is required for networks with multiple device types. Valid types are wireless, appliance, switch, systemsManager, camera, and cellularGateway
     * @param {array} parameters.includedEventTypes - A list of event types. The returned events will be filtered to only include events with these types.
     * @param {array} parameters.excludedEventTypes - A list of event types. The returned events will be filtered to exclude events with these types.
     * @param {string} parameters.deviceMac - The MAC address of the Meraki device which the list of events will be filtered with
     * @param {string} parameters.deviceSerial - The serial of the Meraki device which the list of events will be filtered with
     * @param {string} parameters.deviceName - The name of the Meraki device which the list of events will be filtered with
     * @param {string} parameters.clientIp - The IP of the client which the list of events will be filtered with. Only supported for track-by-IP networks.
     * @param {string} parameters.clientMac - The MAC address of the client which the list of events will be filtered with. Only supported for track-by-MAC networks.
     * @param {string} parameters.clientName - The name, or partial name, of the client which the list of events will be filtered with
     * @param {string} parameters.smDeviceMac - The MAC address of the Systems Manager device which the list of events will be filtered with
     * @param {string} parameters.smDeviceName - The name of the Systems Manager device which the list of events will be filtered with
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 10.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkEvents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/events';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['productType'] !== undefined){
                    queryParameters['productType'] = parameters['productType'];
                }
        
        
        


 

                if(parameters['includedEventTypes'] !== undefined){
                    queryParameters['includedEventTypes'] = parameters['includedEventTypes'];
                }
        
        
        


 

                if(parameters['excludedEventTypes'] !== undefined){
                    queryParameters['excludedEventTypes'] = parameters['excludedEventTypes'];
                }
        
        
        


 

                if(parameters['deviceMac'] !== undefined){
                    queryParameters['deviceMac'] = parameters['deviceMac'];
                }
        
        
        


 

                if(parameters['deviceSerial'] !== undefined){
                    queryParameters['deviceSerial'] = parameters['deviceSerial'];
                }
        
        
        


 

                if(parameters['deviceName'] !== undefined){
                    queryParameters['deviceName'] = parameters['deviceName'];
                }
        
        
        


 

                if(parameters['clientIp'] !== undefined){
                    queryParameters['clientIp'] = parameters['clientIp'];
                }
        
        
        


 

                if(parameters['clientMac'] !== undefined){
                    queryParameters['clientMac'] = parameters['clientMac'];
                }
        
        
        


 

                if(parameters['clientName'] !== undefined){
                    queryParameters['clientName'] = parameters['clientName'];
                }
        
        
        


 

                if(parameters['smDeviceMac'] !== undefined){
                    queryParameters['smDeviceMac'] = parameters['smDeviceMac'];
                }
        
        
        


 

                if(parameters['smDeviceName'] !== undefined){
                    queryParameters['smDeviceName'] = parameters['smDeviceName'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the event type to human-readable description
 * @method
 * @name MerakiDashboardApi#getNetworkEventsEventTypes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkEventsEventTypes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/events/eventTypes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List of all failed client connection events on this network in a given time range
 * @method
 * @name MerakiDashboardApi#getNetworkFailedConnections
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.serial - Filter by AP
     * @param {string} parameters.clientId - Filter by client MAC
 */
 MerakiDashboardApi.prototype.getNetworkFailedConnections = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/failedConnections';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 

                if(parameters['serial'] !== undefined){
                    queryParameters['serial'] = parameters['serial'];
                }
        
        
        


 

                if(parameters['clientId'] !== undefined){
                    queryParameters['clientId'] = parameters['clientId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the appliance services and their accessibility rules
 * @method
 * @name MerakiDashboardApi#getNetworkFirewalledServices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkFirewalledServices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/firewalledServices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the accessibility settings of the given service ('ICMP', 'web', or 'SNMP')
 * @method
 * @name MerakiDashboardApi#getNetworkFirewalledService
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.service - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkFirewalledService = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/firewalledServices/{service}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{service}', parameters['service']);
        
        


        if(parameters['service'] === undefined){
            deferred.reject(new Error('Missing required  parameter: service'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the accessibility settings for the given service ('ICMP', 'web', or 'SNMP')
 * @method
 * @name MerakiDashboardApi#updateNetworkFirewalledService
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.service - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkFirewalledService - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkFirewalledService = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/firewalledServices/{service}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{service}', parameters['service']);
        
        


        if(parameters['service'] === undefined){
            deferred.reject(new Error('Missing required  parameter: service'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkFirewalledService'] !== undefined){
                body = parameters['updateNetworkFirewalledService'];
            }


        if(parameters['updateNetworkFirewalledService'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkFirewalledService'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the floor plans that belong to your network
 * @method
 * @name MerakiDashboardApi#getNetworkFloorPlans
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkFloorPlans = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/floorPlans';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Upload a floor plan
 * @method
 * @name MerakiDashboardApi#createNetworkFloorPlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkFloorPlan - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkFloorPlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/floorPlans';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkFloorPlan'] !== undefined){
                body = parameters['createNetworkFloorPlan'];
            }


        if(parameters['createNetworkFloorPlan'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkFloorPlan'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Find a floor plan by ID
 * @method
 * @name MerakiDashboardApi#getNetworkFloorPlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.floorPlanId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkFloorPlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/floorPlans/{floorPlanId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{floorPlanId}', parameters['floorPlanId']);
        
        


        if(parameters['floorPlanId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: floorPlanId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a floor plan's geolocation and other meta data
 * @method
 * @name MerakiDashboardApi#updateNetworkFloorPlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.floorPlanId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkFloorPlan - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkFloorPlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/floorPlans/{floorPlanId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{floorPlanId}', parameters['floorPlanId']);
        
        


        if(parameters['floorPlanId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: floorPlanId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkFloorPlan'] !== undefined){
                body = parameters['updateNetworkFloorPlan'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Destroy a floor plan
 * @method
 * @name MerakiDashboardApi#deleteNetworkFloorPlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.floorPlanId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkFloorPlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/floorPlans/{floorPlanId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{floorPlanId}', parameters['floorPlanId']);
        
        


        if(parameters['floorPlanId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: floorPlanId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the group policies in a network
 * @method
 * @name MerakiDashboardApi#getNetworkGroupPolicies
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkGroupPolicies = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/groupPolicies';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a group policy
 * @method
 * @name MerakiDashboardApi#createNetworkGroupPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkGroupPolicy - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkGroupPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/groupPolicies';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkGroupPolicy'] !== undefined){
                body = parameters['createNetworkGroupPolicy'];
            }


        if(parameters['createNetworkGroupPolicy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkGroupPolicy'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Display a group policy
 * @method
 * @name MerakiDashboardApi#getNetworkGroupPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.groupPolicyId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkGroupPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/groupPolicies/{groupPolicyId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupPolicyId}', parameters['groupPolicyId']);
        
        


        if(parameters['groupPolicyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupPolicyId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a group policy
 * @method
 * @name MerakiDashboardApi#updateNetworkGroupPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.groupPolicyId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkGroupPolicy - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkGroupPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/groupPolicies/{groupPolicyId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupPolicyId}', parameters['groupPolicyId']);
        
        


        if(parameters['groupPolicyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupPolicyId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkGroupPolicy'] !== undefined){
                body = parameters['updateNetworkGroupPolicy'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a group policy
 * @method
 * @name MerakiDashboardApi#deleteNetworkGroupPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.groupPolicyId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkGroupPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/groupPolicies/{groupPolicyId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupPolicyId}', parameters['groupPolicyId']);
        
        


        if(parameters['groupPolicyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupPolicyId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the HTTP servers for a network
 * @method
 * @name MerakiDashboardApi#getNetworkHttpServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkHttpServers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add an HTTP server to a network
 * @method
 * @name MerakiDashboardApi#createNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkHttpServer - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkHttpServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkHttpServer'] !== undefined){
                body = parameters['createNetworkHttpServer'];
            }


        if(parameters['createNetworkHttpServer'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkHttpServer'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Send a test webhook for a network
 * @method
 * @name MerakiDashboardApi#createNetworkHttpServersWebhookTest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkHttpServersWebhookTest - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkHttpServersWebhookTest = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers/webhookTests';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkHttpServersWebhookTest'] !== undefined){
                body = parameters['createNetworkHttpServersWebhookTest'];
            }


        if(parameters['createNetworkHttpServersWebhookTest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkHttpServersWebhookTest'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the status of a webhook test for a network
 * @method
 * @name MerakiDashboardApi#getNetworkHttpServersWebhookTest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkHttpServersWebhookTest = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers/webhookTests/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return an HTTP server for a network
 * @method
 * @name MerakiDashboardApi#getNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkHttpServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an HTTP server
 * @method
 * @name MerakiDashboardApi#updateNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkHttpServer - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkHttpServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkHttpServer'] !== undefined){
                body = parameters['updateNetworkHttpServer'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete an HTTP server from a network
 * @method
 * @name MerakiDashboardApi#deleteNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkHttpServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/httpServers/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the L3 firewall rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkL3FirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/l3FirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the L3 firewall rules of an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkL3FirewallRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkL3FirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/l3FirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkL3FirewallRules'] !== undefined){
                body = parameters['updateNetworkL3FirewallRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the MX L7 firewall rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkL7FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkL7FirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/l7FirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the MX L7 firewall rules for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkL7FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkL7FirewallRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkL7FirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/l7FirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkL7FirewallRules'] !== undefined){
                body = parameters['updateNetworkL7FirewallRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the L7 firewall application categories and their associated applications for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkL7FirewallRulesApplicationCategories
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkL7FirewallRulesApplicationCategories = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/l7FirewallRules/applicationCategories';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Aggregated latency info for this network
 * @method
 * @name MerakiDashboardApi#getNetworkLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 180 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days.
     * @param {integer} parameters.ssid - Filter results by SSID
     * @param {integer} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
 MerakiDashboardApi.prototype.getNetworkLatencyStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/latencyStats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['ssid'] !== undefined){
                    queryParameters['ssid'] = parameters['ssid'];
                }
        
        
        


 

                if(parameters['vlan'] !== undefined){
                    queryParameters['vlan'] = parameters['vlan'];
                }
        
        
        


 

                if(parameters['apTag'] !== undefined){
                    queryParameters['apTag'] = parameters['apTag'];
                }
        
        
        


 

                if(parameters['fields'] !== undefined){
                    queryParameters['fields'] = parameters['fields'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the splash or RADIUS users configured under Meraki Authentication for a network
 * @method
 * @name MerakiDashboardApi#getNetworkMerakiAuthUsers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkMerakiAuthUsers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/merakiAuthUsers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the Meraki Auth splash or RADIUS user
 * @method
 * @name MerakiDashboardApi#getNetworkMerakiAuthUser
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.merakiAuthUserId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkMerakiAuthUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/merakiAuthUsers/{merakiAuthUserId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{merakiAuthUserId}', parameters['merakiAuthUserId']);
        
        


        if(parameters['merakiAuthUserId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: merakiAuthUserId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the NetFlow traffic reporting settings for a network
 * @method
 * @name MerakiDashboardApi#getNetworkNetflowSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkNetflowSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/netflowSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the NetFlow traffic reporting settings for a network
 * @method
 * @name MerakiDashboardApi#updateNetworkNetflowSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkNetflowSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkNetflowSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/netflowSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkNetflowSettings'] !== undefined){
                body = parameters['updateNetworkNetflowSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the 1:Many NAT mapping rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkOneToManyNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkOneToManyNatRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/oneToManyNatRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Set the 1:Many NAT mapping rules for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkOneToManyNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkOneToManyNatRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkOneToManyNatRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/oneToManyNatRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkOneToManyNatRules'] !== undefined){
                body = parameters['updateNetworkOneToManyNatRules'];
            }


        if(parameters['updateNetworkOneToManyNatRules'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkOneToManyNatRules'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the 1:1 NAT mapping rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkOneToOneNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkOneToOneNatRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/oneToOneNatRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Set the 1:1 NAT mapping rules for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkOneToOneNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkOneToOneNatRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkOneToOneNatRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/oneToOneNatRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkOneToOneNatRules'] !== undefined){
                body = parameters['updateNetworkOneToOneNatRules'];
            }


        if(parameters['updateNetworkOneToOneNatRules'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkOneToOneNatRules'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the keys required to access Personally Identifiable Information (PII) for a given identifier. Exactly one identifier will be accepted. If the organization contains org-wide Systems Manager users matching the key provided then there will be an entry with the key "0" containing the applicable keys.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/piiKeys
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiPiiKeys
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.username - The username of a Systems Manager user
     * @param {string} parameters.email - The email of a network user account or a Systems Manager device
     * @param {string} parameters.mac - The MAC of a network client device or a Systems Manager device
     * @param {string} parameters.serial - The serial of a Systems Manager device
     * @param {string} parameters.imei - The IMEI of a Systems Manager device
     * @param {string} parameters.bluetoothMac - The MAC of a Bluetooth client
 */
 MerakiDashboardApi.prototype.getNetworkPiiPiiKeys = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/piiKeys';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['username'] !== undefined){
                    queryParameters['username'] = parameters['username'];
                }
        
        
        


 

                if(parameters['email'] !== undefined){
                    queryParameters['email'] = parameters['email'];
                }
        
        
        


 

                if(parameters['mac'] !== undefined){
                    queryParameters['mac'] = parameters['mac'];
                }
        
        
        


 

                if(parameters['serial'] !== undefined){
                    queryParameters['serial'] = parameters['serial'];
                }
        
        
        


 

                if(parameters['imei'] !== undefined){
                    queryParameters['imei'] = parameters['imei'];
                }
        
        
        


 

                if(parameters['bluetoothMac'] !== undefined){
                    queryParameters['bluetoothMac'] = parameters['bluetoothMac'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the PII requests for this network or organization

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiRequests
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkPiiRequests = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/requests';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Submit a new delete or restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```
 * @method
 * @name MerakiDashboardApi#createNetworkPiiRequest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkPiiRequest - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkPiiRequest = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/requests';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkPiiRequest'] !== undefined){
                body = parameters['createNetworkPiiRequest'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{requestId}
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiRequest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.requestId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkPiiRequest = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/requests/{requestId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{requestId}', parameters['requestId']);
        
        


        if(parameters['requestId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: requestId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{requestId}
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPiiRequest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.requestId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkPiiRequest = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/requests/{requestId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{requestId}', parameters['requestId']);
        
        


        if(parameters['requestId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: requestId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Given a piece of Personally Identifiable Information (PII), return the Systems Manager device ID(s) associated with that identifier. These device IDs can be used with the Systems Manager API endpoints to retrieve device details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smDevicesForKey
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiSmDevicesForKey
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.username - The username of a Systems Manager user
     * @param {string} parameters.email - The email of a network user account or a Systems Manager device
     * @param {string} parameters.mac - The MAC of a network client device or a Systems Manager device
     * @param {string} parameters.serial - The serial of a Systems Manager device
     * @param {string} parameters.imei - The IMEI of a Systems Manager device
     * @param {string} parameters.bluetoothMac - The MAC of a Bluetooth client
 */
 MerakiDashboardApi.prototype.getNetworkPiiSmDevicesForKey = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/smDevicesForKey';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['username'] !== undefined){
                    queryParameters['username'] = parameters['username'];
                }
        
        
        


 

                if(parameters['email'] !== undefined){
                    queryParameters['email'] = parameters['email'];
                }
        
        
        


 

                if(parameters['mac'] !== undefined){
                    queryParameters['mac'] = parameters['mac'];
                }
        
        
        


 

                if(parameters['serial'] !== undefined){
                    queryParameters['serial'] = parameters['serial'];
                }
        
        
        


 

                if(parameters['imei'] !== undefined){
                    queryParameters['imei'] = parameters['imei'];
                }
        
        
        


 

                if(parameters['bluetoothMac'] !== undefined){
                    queryParameters['bluetoothMac'] = parameters['bluetoothMac'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Given a piece of Personally Identifiable Information (PII), return the Systems Manager owner ID(s) associated with that identifier. These owner IDs can be used with the Systems Manager API endpoints to retrieve owner details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smOwnersForKey
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiSmOwnersForKey
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.username - The username of a Systems Manager user
     * @param {string} parameters.email - The email of a network user account or a Systems Manager device
     * @param {string} parameters.mac - The MAC of a network client device or a Systems Manager device
     * @param {string} parameters.serial - The serial of a Systems Manager device
     * @param {string} parameters.imei - The IMEI of a Systems Manager device
     * @param {string} parameters.bluetoothMac - The MAC of a Bluetooth client
 */
 MerakiDashboardApi.prototype.getNetworkPiiSmOwnersForKey = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/pii/smOwnersForKey';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['username'] !== undefined){
                    queryParameters['username'] = parameters['username'];
                }
        
        
        


 

                if(parameters['email'] !== undefined){
                    queryParameters['email'] = parameters['email'];
                }
        
        
        


 

                if(parameters['mac'] !== undefined){
                    queryParameters['mac'] = parameters['mac'];
                }
        
        
        


 

                if(parameters['serial'] !== undefined){
                    queryParameters['serial'] = parameters['serial'];
                }
        
        
        


 

                if(parameters['imei'] !== undefined){
                    queryParameters['imei'] = parameters['imei'];
                }
        
        
        


 

                if(parameters['bluetoothMac'] !== undefined){
                    queryParameters['bluetoothMac'] = parameters['bluetoothMac'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the port forwarding rules for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkPortForwardingRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkPortForwardingRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/portForwardingRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the port forwarding rules for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkPortForwardingRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkPortForwardingRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkPortForwardingRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/portForwardingRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkPortForwardingRules'] !== undefined){
                body = parameters['updateNetworkPortForwardingRules'];
            }


        if(parameters['updateNetworkPortForwardingRules'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkPortForwardingRules'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all supported intrusion settings for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkSecurityIntrusionSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSecurityIntrusionSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/security/intrusionSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Set the supported intrusion settings for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkSecurityIntrusionSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSecurityIntrusionSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSecurityIntrusionSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/security/intrusionSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSecurityIntrusionSettings'] !== undefined){
                body = parameters['updateNetworkSecurityIntrusionSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all supported malware settings for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkSecurityMalwareSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSecurityMalwareSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/security/malwareSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Set the supported malware settings for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkSecurityMalwareSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSecurityMalwareSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSecurityMalwareSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/security/malwareSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSecurityMalwareSettings'] !== undefined){
                body = parameters['updateNetworkSecurityMalwareSettings'];
            }


        if(parameters['updateNetworkSecurityMalwareSettings'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSecurityMalwareSettings'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the security events for a network
 * @method
 * @name MerakiDashboardApi#getNetworkSecurityEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 365 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 365 days. The default is 31 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 100.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkSecurityEvents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/securityEvents';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the site-to-site VPN settings of a network. Only valid for MX networks.
 * @method
 * @name MerakiDashboardApi#getNetworkSiteToSiteVpn
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSiteToSiteVpn = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/siteToSiteVpn';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the site-to-site VPN settings of a network. Only valid for MX networks in NAT mode.
 * @method
 * @name MerakiDashboardApi#updateNetworkSiteToSiteVpn
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSiteToSiteVpn - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSiteToSiteVpn = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/siteToSiteVpn';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSiteToSiteVpn'] !== undefined){
                body = parameters['updateNetworkSiteToSiteVpn'];
            }


        if(parameters['updateNetworkSiteToSiteVpn'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSiteToSiteVpn'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a new Polaris app
 * @method
 * @name MerakiDashboardApi#createNetworkSmAppPolaris
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSmAppPolaris - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSmAppPolaris = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/app/polaris';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSmAppPolaris'] !== undefined){
                body = parameters['createNetworkSmAppPolaris'];
            }


        if(parameters['createNetworkSmAppPolaris'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkSmAppPolaris'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get details for a Cisco Polaris app if it exists
 * @method
 * @name MerakiDashboardApi#getNetworkSmAppPolaris
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.bundleId - The bundle ID of the app to be found, defaults to com.cisco.ciscosecurity.app
 */
 MerakiDashboardApi.prototype.getNetworkSmAppPolaris = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/app/polaris';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['bundleId'] !== undefined){
                    queryParameters['bundleId'] = parameters['bundleId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an existing Polaris app
 * @method
 * @name MerakiDashboardApi#updateNetworkSmAppPolaris
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.appId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSmAppPolaris - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSmAppPolaris = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/app/polaris/{appId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appId}', parameters['appId']);
        
        


        if(parameters['appId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSmAppPolaris'] !== undefined){
                body = parameters['updateNetworkSmAppPolaris'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a Cisco Polaris app
 * @method
 * @name MerakiDashboardApi#deleteNetworkSmAppPolaris
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.appId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkSmAppPolaris = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/app/polaris/{appId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appId}', parameters['appId']);
        
        


        if(parameters['appId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Bypass activation lock attempt
 * @method
 * @name MerakiDashboardApi#createNetworkSmBypassActivationLockAttempt
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSmBypassActivationLockAttempt - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSmBypassActivationLockAttempt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/bypassActivationLockAttempts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSmBypassActivationLockAttempt'] !== undefined){
                body = parameters['createNetworkSmBypassActivationLockAttempt'];
            }


        if(parameters['createNetworkSmBypassActivationLockAttempt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkSmBypassActivationLockAttempt'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Bypass activation lock attempt status
 * @method
 * @name MerakiDashboardApi#getNetworkSmBypassActivationLockAttempt
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.attemptId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmBypassActivationLockAttempt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/bypassActivationLockAttempts/{attemptId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{attemptId}', parameters['attemptId']);
        
        


        if(parameters['attemptId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: attemptId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Modify the fields of a device
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDeviceFields
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSmDeviceFields - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSmDeviceFields = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/device/fields';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSmDeviceFields'] !== undefined){
                body = parameters['updateNetworkSmDeviceFields'];
            }


        if(parameters['updateNetworkSmDeviceFields'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSmDeviceFields'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Wipe a device
 * @method
 * @name MerakiDashboardApi#wipeNetworkSmDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.wipeNetworkSmDevice - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.wipeNetworkSmDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/device/wipe';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['wipeNetworkSmDevice'] !== undefined){
                body = parameters['wipeNetworkSmDevice'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Refresh the details of a device
 * @method
 * @name MerakiDashboardApi#refreshNetworkSmDeviceDetails
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.refreshNetworkSmDeviceDetails = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/device/{deviceId}/refreshDetails';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the devices enrolled in an SM network with various specified fields and filters
 * @method
 * @name MerakiDashboardApi#getNetworkSmDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.fields - Additional fields that will be displayed for each device. Multiple fields can be passed in as comma separated values.
    The default fields are: id, name, tags, ssid, wifiMac, osName, systemModel, uuid, and serialNumber. The additional fields are: ip,
    systemType, availableDeviceCapacity, kioskAppName, biosVersion, lastConnected, missingAppsCount, userSuppliedAddress, location, lastUser,
    ownerEmail, ownerUsername, publicIp, phoneNumber, diskInfoJson, deviceCapacity, isManaged, hadMdm, isSupervised, meid, imei, iccid,
    simCarrierNetwork, cellularDataUsed, isHotspotEnabled, createdAt, batteryEstCharge, quarantined, avName, avRunning, asName, fwName,
    isRooted, loginRequired, screenLockEnabled, screenLockDelay, autoLoginDisabled, autoTags, hasMdm, hasDesktopAgent, diskEncryptionEnabled,
    hardwareEncryptionCaps, passCodeLock, usesHardwareKeystore, and androidSecurityPatchVersion.
     * @param {string} parameters.wifiMacs - Filter devices by wifi mac(s). Multiple wifi macs can be passed in as comma separated values.
     * @param {string} parameters.serials - Filter devices by serial(s). Multiple serials can be passed in as comma separated values.
     * @param {string} parameters.ids - Filter devices by id(s). Multiple ids can be passed in as comma separated values.
     * @param {string} parameters.scope - Specify a scope (one of all, none, withAny, withAll, withoutAny, or withoutAll) and a set of tags as comma separated values.
     * @param {integer} parameters.batchSize - Number of devices to return, 1000 is the default as well as the max.
     * @param {string} parameters.batchToken - If the network has more devices than the batch size, a batch token will be returned
    as a part of the device list. To see the remainder of the devices, pass in the batchToken as a parameter in the next request.
    Requests made with the batchToken do not require additional parameters as the batchToken includes the parameters passed in
    with the original request. Additional parameters passed in with the batchToken will be ignored.
 */
 MerakiDashboardApi.prototype.getNetworkSmDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['fields'] !== undefined){
                    queryParameters['fields'] = parameters['fields'];
                }
        
        
        


 

                if(parameters['wifiMacs'] !== undefined){
                    queryParameters['wifiMacs'] = parameters['wifiMacs'];
                }
        
        
        


 

                if(parameters['serials'] !== undefined){
                    queryParameters['serials'] = parameters['serials'];
                }
        
        
        


 

                if(parameters['ids'] !== undefined){
                    queryParameters['ids'] = parameters['ids'];
                }
        
        
        


 

                if(parameters['scope'] !== undefined){
                    queryParameters['scope'] = parameters['scope'];
                }
        
        
        


 

                if(parameters['batchSize'] !== undefined){
                    queryParameters['batchSize'] = parameters['batchSize'];
                }
        
        
        


 

                if(parameters['batchToken'] !== undefined){
                    queryParameters['batchToken'] = parameters['batchToken'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Force check-in a set of devices
 * @method
 * @name MerakiDashboardApi#checkinNetworkSmDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.checkinNetworkSmDevices - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.checkinNetworkSmDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/devices/checkin';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['checkinNetworkSmDevices'] !== undefined){
                body = parameters['checkinNetworkSmDevices'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Move a set of devices to a new network
 * @method
 * @name MerakiDashboardApi#moveNetworkSmDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.moveNetworkSmDevices - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.moveNetworkSmDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/devices/move';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['moveNetworkSmDevices'] !== undefined){
                body = parameters['moveNetworkSmDevices'];
            }


        if(parameters['moveNetworkSmDevices'] === undefined){
            deferred.reject(new Error('Missing required  parameter: moveNetworkSmDevices'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add, delete, or update the tags of a set of devices
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDevicesTags
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSmDevicesTags - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSmDevicesTags = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/devices/tags';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSmDevicesTags'] !== undefined){
                body = parameters['updateNetworkSmDevicesTags'];
            }


        if(parameters['updateNetworkSmDevicesTags'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSmDevicesTags'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Unenroll a device
 * @method
 * @name MerakiDashboardApi#unenrollNetworkSmDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.unenrollNetworkSmDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/devices/{deviceId}/unenroll';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List all the profiles in the network
 * @method
 * @name MerakiDashboardApi#getNetworkSmProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/profiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the target groups in this network
 * @method
 * @name MerakiDashboardApi#getNetworkSmTargetGroups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {boolean} parameters.withDetails - Boolean indicating if the the ids of the devices or users scoped by the target group should be included in the response
 */
 MerakiDashboardApi.prototype.getNetworkSmTargetGroups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/targetGroups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['withDetails'] !== undefined){
                    queryParameters['withDetails'] = parameters['withDetails'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a target group
 * @method
 * @name MerakiDashboardApi#createNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSmTargetGroup - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSmTargetGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/targetGroups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSmTargetGroup'] !== undefined){
                body = parameters['createNetworkSmTargetGroup'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a target group
 * @method
 * @name MerakiDashboardApi#getNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.targetGroupId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {boolean} parameters.withDetails - Boolean indicating if the the ids of the devices or users scoped by the target group should be included in the response
 */
 MerakiDashboardApi.prototype.getNetworkSmTargetGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/targetGroups/{targetGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{targetGroupId}', parameters['targetGroupId']);
        
        


        if(parameters['targetGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: targetGroupId'));
            return deferred.promise;
        }
 

                if(parameters['withDetails'] !== undefined){
                    queryParameters['withDetails'] = parameters['withDetails'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a target group
 * @method
 * @name MerakiDashboardApi#updateNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.targetGroupId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSmTargetGroup - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSmTargetGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/targetGroups/{targetGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{targetGroupId}', parameters['targetGroupId']);
        
        


        if(parameters['targetGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: targetGroupId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSmTargetGroup'] !== undefined){
                body = parameters['updateNetworkSmTargetGroup'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a target group from a network
 * @method
 * @name MerakiDashboardApi#deleteNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.targetGroupId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkSmTargetGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/targetGroups/{targetGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{targetGroupId}', parameters['targetGroupId']);
        
        


        if(parameters['targetGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: targetGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the profiles associated with a user
 * @method
 * @name MerakiDashboardApi#getNetworkSmUserDeviceProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.userId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmUserDeviceProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/user/{userId}/deviceProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of softwares associated with a user
 * @method
 * @name MerakiDashboardApi#getNetworkSmUserSoftwares
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.userId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmUserSoftwares = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/user/{userId}/softwares';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the owners in an SM network with various specified fields and filters
 * @method
 * @name MerakiDashboardApi#getNetworkSmUsers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.ids - Filter users by id(s). Multiple ids can be passed in as comma separated values.
     * @param {string} parameters.usernames - Filter users by username(s). Multiple usernames can be passed in as comma separated values.
     * @param {string} parameters.emails - Filter users by email(s). Multiple emails can be passed in as comma separated values.
     * @param {string} parameters.scope - Specifiy a scope (one of all, none, withAny, withAll, withoutAny, withoutAll) and a set of tags as comma separated values.
 */
 MerakiDashboardApi.prototype.getNetworkSmUsers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/users';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['ids'] !== undefined){
                    queryParameters['ids'] = parameters['ids'];
                }
        
        
        


 

                if(parameters['usernames'] !== undefined){
                    queryParameters['usernames'] = parameters['usernames'];
                }
        
        
        


 

                if(parameters['emails'] !== undefined){
                    queryParameters['emails'] = parameters['emails'];
                }
        
        
        


 

                if(parameters['scope'] !== undefined){
                    queryParameters['scope'] = parameters['scope'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the client's daily cellular data usage history. Usage data is in kilobytes.
 * @method
 * @name MerakiDashboardApi#getNetworkSmCellularUsageHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmCellularUsageHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/cellularUsageHistory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the certs on a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmCerts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmCerts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/certs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the profiles associated with a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmDeviceProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmDeviceProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/deviceProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the network adapters of a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmNetworkAdapters
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmNetworkAdapters = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/networkAdapters';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the restrictions on a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmRestrictions
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmRestrictions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/restrictions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the security centers on a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmSecurityCenters
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmSecurityCenters = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/securityCenters';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of softwares associated with a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmSoftwares
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmSoftwares = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/softwares';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the saved SSID names on a device
 * @method
 * @name MerakiDashboardApi#getNetworkSmWlanLists
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.deviceId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSmWlanLists = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/sm/{deviceId}/wlanLists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the SNMP settings for a network
 * @method
 * @name MerakiDashboardApi#getNetworkSnmpSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSnmpSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/snmpSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the SNMP settings for a network
 * @method
 * @name MerakiDashboardApi#updateNetworkSnmpSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSnmpSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSnmpSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/snmpSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSnmpSettings'] !== undefined){
                body = parameters['updateNetworkSnmpSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the splash login attempts for a network
 * @method
 * @name MerakiDashboardApi#getNetworkSplashLoginAttempts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.ssidNumber - Only return the login attempts for the specified SSID
     * @param {string} parameters.loginIdentifier - The username, email, or phone number used during login
     * @param {integer} parameters.timespan - The timespan, in seconds, for the login attempts. The period will be from [timespan] seconds ago until now. The maximum timespan is 3 months
 */
 MerakiDashboardApi.prototype.getNetworkSplashLoginAttempts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/splashLoginAttempts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['ssidNumber'] !== undefined){
                    queryParameters['ssidNumber'] = parameters['ssidNumber'];
                }
        
        
        


 

                if(parameters['loginIdentifier'] !== undefined){
                    queryParameters['loginIdentifier'] = parameters['loginIdentifier'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Split a combined network into individual networks for each type of device
 * @method
 * @name MerakiDashboardApi#splitNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.splitNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/split';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the SSIDs in a network. Supports networks with access points or wireless-enabled security appliances and teleworker gateways.
 * @method
 * @name MerakiDashboardApi#getNetworkSsids
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSsids = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a single SSID
 * @method
 * @name MerakiDashboardApi#getNetworkSsid
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSsid = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the attributes of an SSID
 * @method
 * @name MerakiDashboardApi#updateNetworkSsid
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSsid - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSsid = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSsid'] !== undefined){
                body = parameters['updateNetworkSsid'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the L3 firewall rules for an SSID on an MR network
 * @method
 * @name MerakiDashboardApi#getNetworkSsidL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSsidL3FirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}/l3FirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the L3 firewall rules of an SSID on an MR network
 * @method
 * @name MerakiDashboardApi#updateNetworkSsidL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSsidL3FirewallRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSsidL3FirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}/l3FirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSsidL3FirewallRules'] !== undefined){
                body = parameters['updateNetworkSsidL3FirewallRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Display the splash page settings for the given SSID
 * @method
 * @name MerakiDashboardApi#getNetworkSsidSplashSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSsidSplashSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}/splashSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Modify the splash page settings for the given SSID
 * @method
 * @name MerakiDashboardApi#updateNetworkSsidSplashSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSsidSplashSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSsidSplashSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}/splashSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSsidSplashSettings'] !== undefined){
                body = parameters['updateNetworkSsidSplashSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the traffic shaping settings for an SSID on an MR network
 * @method
 * @name MerakiDashboardApi#updateNetworkSsidTrafficShaping
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSsidTrafficShaping - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSsidTrafficShaping = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}/trafficShaping';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSsidTrafficShaping'] !== undefined){
                body = parameters['updateNetworkSsidTrafficShaping'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Display the traffic shaping settings for a SSID on an MR network
 * @method
 * @name MerakiDashboardApi#getNetworkSsidTrafficShaping
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.number - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSsidTrafficShaping = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/ssids/{number}/trafficShaping';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the static routes for an MX or teleworker network
 * @method
 * @name MerakiDashboardApi#getNetworkStaticRoutes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkStaticRoutes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/staticRoutes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a static route for an MX or teleworker network
 * @method
 * @name MerakiDashboardApi#createNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkStaticRoute - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkStaticRoute = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/staticRoutes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkStaticRoute'] !== undefined){
                body = parameters['createNetworkStaticRoute'];
            }


        if(parameters['createNetworkStaticRoute'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkStaticRoute'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a static route for an MX or teleworker network
 * @method
 * @name MerakiDashboardApi#getNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.staticRouteId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkStaticRoute = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/staticRoutes/{staticRouteId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{staticRouteId}', parameters['staticRouteId']);
        
        


        if(parameters['staticRouteId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: staticRouteId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a static route for an MX or teleworker network
 * @method
 * @name MerakiDashboardApi#updateNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.staticRouteId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkStaticRoute - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkStaticRoute = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/staticRoutes/{staticRouteId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{staticRouteId}', parameters['staticRouteId']);
        
        


        if(parameters['staticRouteId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: staticRouteId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkStaticRoute'] !== undefined){
                body = parameters['updateNetworkStaticRoute'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a static route from an MX or teleworker network
 * @method
 * @name MerakiDashboardApi#deleteNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.staticRouteId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkStaticRoute = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/staticRoutes/{staticRouteId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{staticRouteId}', parameters['staticRouteId']);
        
        


        if(parameters['staticRouteId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: staticRouteId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Swap MX primary and warm spare appliances
 * @method
 * @name MerakiDashboardApi#swapNetworkWarmspare
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.swapNetworkWarmspare = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/swapWarmSpare';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the access control lists for a MS network
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchAccessControlLists
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchAccessControlLists = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/accessControlLists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the access control lists for a MS network
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchAccessControlLists
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchAccessControlLists - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchAccessControlLists = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/accessControlLists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchAccessControlLists'] !== undefined){
                body = parameters['updateNetworkSwitchAccessControlLists'];
            }


        if(parameters['updateNetworkSwitchAccessControlLists'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSwitchAccessControlLists'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List link aggregation groups
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchLinkAggregations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchLinkAggregations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/linkAggregations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a link aggregation group
 * @method
 * @name MerakiDashboardApi#createNetworkSwitchLinkAggregation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSwitchLinkAggregation - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSwitchLinkAggregation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/linkAggregations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSwitchLinkAggregation'] !== undefined){
                body = parameters['createNetworkSwitchLinkAggregation'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a link aggregation group
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchLinkAggregation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.linkAggregationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchLinkAggregation - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchLinkAggregation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/linkAggregations/{linkAggregationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{linkAggregationId}', parameters['linkAggregationId']);
        
        


        if(parameters['linkAggregationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: linkAggregationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchLinkAggregation'] !== undefined){
                body = parameters['updateNetworkSwitchLinkAggregation'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Split a link aggregation group into separate ports
 * @method
 * @name MerakiDashboardApi#deleteNetworkSwitchLinkAggregation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.linkAggregationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkSwitchLinkAggregation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/linkAggregations/{linkAggregationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{linkAggregationId}', parameters['linkAggregationId']);
        
        


        if(parameters['linkAggregationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: linkAggregationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List switch port schedules
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchPortSchedules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchPortSchedules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/portSchedules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a switch port schedule
 * @method
 * @name MerakiDashboardApi#createNetworkSwitchPortSchedule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSwitchPortSchedule - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSwitchPortSchedule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/portSchedules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSwitchPortSchedule'] !== undefined){
                body = parameters['createNetworkSwitchPortSchedule'];
            }


        if(parameters['createNetworkSwitchPortSchedule'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkSwitchPortSchedule'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a switch port schedule
 * @method
 * @name MerakiDashboardApi#deleteNetworkSwitchPortSchedule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.portScheduleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkSwitchPortSchedule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/portSchedules/{portScheduleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{portScheduleId}', parameters['portScheduleId']);
        
        


        if(parameters['portScheduleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: portScheduleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a switch port schedule
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchPortSchedule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.portScheduleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchPortSchedule - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchPortSchedule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/portSchedules/{portScheduleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{portScheduleId}', parameters['portScheduleId']);
        
        


        if(parameters['portScheduleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: portScheduleId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchPortSchedule'] !== undefined){
                body = parameters['updateNetworkSwitchPortSchedule'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the switch network settings
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update switch network settings
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettings'] !== undefined){
                body = parameters['updateNetworkSwitchSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the DHCP server policy
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsDhcpServerPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsDhcpServerPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/dhcpServerPolicy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the DHCP server policy
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsDhcpServerPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsDhcpServerPolicy - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsDhcpServerPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/dhcpServerPolicy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsDhcpServerPolicy'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsDhcpServerPolicy'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the DSCP to CoS mappings
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsDscpToCosMappings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsDscpToCosMappings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/dscpToCosMappings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the DSCP to CoS mappings
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsDscpToCosMappings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsDscpToCosMappings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsDscpToCosMappings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/dscpToCosMappings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsDscpToCosMappings'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsDscpToCosMappings'];
            }


        if(parameters['updateNetworkSwitchSettingsDscpToCosMappings'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSwitchSettingsDscpToCosMappings'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the MTU configuration
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsMtu
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsMtu = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/mtu';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the MTU configuration
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsMtu
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsMtu - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsMtu = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/mtu';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsMtu'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsMtu'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return multicast settings for a network
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsMulticast
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsMulticast = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/multicast';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update multicast settings for a network
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsMulticast
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsMulticast - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsMulticast = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/multicast';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsMulticast'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsMulticast'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List quality of service rules
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsQosRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsQosRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a quality of service rule
 * @method
 * @name MerakiDashboardApi#createNetworkSwitchSettingsQosRule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSwitchSettingsQosRule - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSwitchSettingsQosRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSwitchSettingsQosRule'] !== undefined){
                body = parameters['createNetworkSwitchSettingsQosRule'];
            }


        if(parameters['createNetworkSwitchSettingsQosRule'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkSwitchSettingsQosRule'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the quality of service rule IDs by order in which they will be processed by the switch
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsQosRulesOrder
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsQosRulesOrder = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules/order';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the order in which the rules should be processed by the switch
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsQosRulesOrder
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsQosRulesOrder - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsQosRulesOrder = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules/order';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsQosRulesOrder'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsQosRulesOrder'];
            }


        if(parameters['updateNetworkSwitchSettingsQosRulesOrder'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSwitchSettingsQosRulesOrder'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a quality of service rule
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsQosRule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.qosRuleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsQosRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules/{qosRuleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{qosRuleId}', parameters['qosRuleId']);
        
        


        if(parameters['qosRuleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: qosRuleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a quality of service rule
 * @method
 * @name MerakiDashboardApi#deleteNetworkSwitchSettingsQosRule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.qosRuleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkSwitchSettingsQosRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules/{qosRuleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{qosRuleId}', parameters['qosRuleId']);
        
        


        if(parameters['qosRuleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: qosRuleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a quality of service rule
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsQosRule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.qosRuleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsQosRule - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsQosRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/qosRules/{qosRuleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{qosRuleId}', parameters['qosRuleId']);
        
        


        if(parameters['qosRuleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: qosRuleId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsQosRule'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsQosRule'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the storm control configuration for a switch network
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsStormControl
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsStormControl = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/stormControl';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the storm control configuration for a switch network
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsStormControl
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsStormControl - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsStormControl = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/stormControl';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsStormControl'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsStormControl'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns STP settings
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettingsStp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchSettingsStp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/stp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates STP settings
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettingsStp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSwitchSettingsStp - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSwitchSettingsStp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switch/settings/stp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSwitchSettingsStp'] !== undefined){
                body = parameters['updateNetworkSwitchSettingsStp'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the switch stacks in a network
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchStacks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchStacks = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switchStacks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a stack
 * @method
 * @name MerakiDashboardApi#createNetworkSwitchStack
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkSwitchStack - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkSwitchStack = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switchStacks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkSwitchStack'] !== undefined){
                body = parameters['createNetworkSwitchStack'];
            }


        if(parameters['createNetworkSwitchStack'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkSwitchStack'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Show a switch stack
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchStack
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.switchStackId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSwitchStack = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switchStacks/{switchStackId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{switchStackId}', parameters['switchStackId']);
        
        


        if(parameters['switchStackId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: switchStackId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a stack
 * @method
 * @name MerakiDashboardApi#deleteNetworkSwitchStack
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.switchStackId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkSwitchStack = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switchStacks/{switchStackId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{switchStackId}', parameters['switchStackId']);
        
        


        if(parameters['switchStackId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: switchStackId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a switch to a stack
 * @method
 * @name MerakiDashboardApi#addNetworkSwitchStack
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.switchStackId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.addNetworkSwitchStack - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.addNetworkSwitchStack = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switchStacks/{switchStackId}/add';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{switchStackId}', parameters['switchStackId']);
        
        


        if(parameters['switchStackId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: switchStackId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['addNetworkSwitchStack'] !== undefined){
                body = parameters['addNetworkSwitchStack'];
            }


        if(parameters['addNetworkSwitchStack'] === undefined){
            deferred.reject(new Error('Missing required  parameter: addNetworkSwitchStack'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove a switch from a stack
 * @method
 * @name MerakiDashboardApi#removeNetworkSwitchStack
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.switchStackId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.removeNetworkSwitchStack - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.removeNetworkSwitchStack = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/switchStacks/{switchStackId}/remove';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{switchStackId}', parameters['switchStackId']);
        
        


        if(parameters['switchStackId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: switchStackId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['removeNetworkSwitchStack'] !== undefined){
                body = parameters['removeNetworkSwitchStack'];
            }


        if(parameters['removeNetworkSwitchStack'] === undefined){
            deferred.reject(new Error('Missing required  parameter: removeNetworkSwitchStack'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the syslog servers for a network
 * @method
 * @name MerakiDashboardApi#getNetworkSyslogServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkSyslogServers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/syslogServers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the syslog servers for a network
 * @method
 * @name MerakiDashboardApi#updateNetworkSyslogServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkSyslogServers - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkSyslogServers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/syslogServers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkSyslogServers'] !== undefined){
                body = parameters['updateNetworkSyslogServers'];
            }


        if(parameters['updateNetworkSyslogServers'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkSyslogServers'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 *     The traffic analysis data for this network.
    <a href="https://documentation.meraki.com/MR/Monitoring_and_Reporting/Hostname_Visibility">Traffic Analysis with Hostname Visibility</a> must be enabled on the network.

 * @method
 * @name MerakiDashboardApi#getNetworkTraffic
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 30 days from today.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameter t0. The value must be in seconds and be less than or equal to 30 days.
     * @param {string} parameters.deviceType -     Filter the data by device type: combined (default), wireless, switch, appliance.
    When using combined, for each rule the data will come from the device type with the most usage.

 */
 MerakiDashboardApi.prototype.getNetworkTraffic = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/traffic';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['deviceType'] !== undefined){
                    queryParameters['deviceType'] = parameters['deviceType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the traffic analysis settings for a network
 * @method
 * @name MerakiDashboardApi#getNetworkTrafficAnalysisSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkTrafficAnalysisSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/trafficAnalysisSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the traffic analysis settings for a network
 * @method
 * @name MerakiDashboardApi#updateNetworkTrafficAnalysisSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkTrafficAnalysisSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkTrafficAnalysisSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/trafficAnalysisSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkTrafficAnalysisSettings'] !== undefined){
                body = parameters['updateNetworkTrafficAnalysisSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the traffic shaping settings for an MX network
 * @method
 * @name MerakiDashboardApi#updateNetworkTrafficShaping
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkTrafficShaping - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkTrafficShaping = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/trafficShaping';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkTrafficShaping'] !== undefined){
                body = parameters['updateNetworkTrafficShaping'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Display the traffic shaping settings for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkTrafficShaping
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkTrafficShaping = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/trafficShaping';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the application categories for traffic shaping rules.
 * @method
 * @name MerakiDashboardApi#getNetworkTrafficShapingApplicationCategories
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkTrafficShapingApplicationCategories = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/trafficShaping/applicationCategories';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the available DSCP tagging options for your traffic shaping rules.
 * @method
 * @name MerakiDashboardApi#getNetworkTrafficShapingDscpTaggingOptions
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkTrafficShapingDscpTaggingOptions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/trafficShaping/dscpTaggingOptions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Unbind a network from a template.
 * @method
 * @name MerakiDashboardApi#unbindNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.unbindNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/unbind';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the uplink settings for your MX network.
 * @method
 * @name MerakiDashboardApi#getNetworkUplinkSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkUplinkSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/uplinkSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the uplink settings for your MX network.
 * @method
 * @name MerakiDashboardApi#updateNetworkUplinkSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkUplinkSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkUplinkSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/uplinkSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkUplinkSettings'] !== undefined){
                body = parameters['updateNetworkUplinkSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the VLANs for an MX network
 * @method
 * @name MerakiDashboardApi#getNetworkVlans
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkVlans = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlans';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a VLAN
 * @method
 * @name MerakiDashboardApi#createNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkVlan - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkVlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlans';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkVlan'] !== undefined){
                body = parameters['createNetworkVlan'];
            }


        if(parameters['createNetworkVlan'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkVlan'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a VLAN
 * @method
 * @name MerakiDashboardApi#getNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.vlanId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkVlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlans/{vlanId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{vlanId}', parameters['vlanId']);
        
        


        if(parameters['vlanId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: vlanId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a VLAN
 * @method
 * @name MerakiDashboardApi#updateNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.vlanId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkVlan - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkVlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlans/{vlanId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{vlanId}', parameters['vlanId']);
        
        


        if(parameters['vlanId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: vlanId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkVlan'] !== undefined){
                body = parameters['updateNetworkVlan'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a VLAN from a network
 * @method
 * @name MerakiDashboardApi#deleteNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.vlanId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkVlan = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlans/{vlanId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{vlanId}', parameters['vlanId']);
        
        


        if(parameters['vlanId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: vlanId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the enabled status of VLANs for the network
 * @method
 * @name MerakiDashboardApi#getNetworkVlansEnabledState
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkVlansEnabledState = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlansEnabledState';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Enable/Disable VLANs for the given network
 * @method
 * @name MerakiDashboardApi#updateNetworkVlansEnabledState
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkVlansEnabledState - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkVlansEnabledState = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/vlansEnabledState';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkVlansEnabledState'] !== undefined){
                body = parameters['updateNetworkVlansEnabledState'];
            }


        if(parameters['updateNetworkVlansEnabledState'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkVlansEnabledState'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return MX warm spare settings
 * @method
 * @name MerakiDashboardApi#getNetworkWarmSpareSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkWarmSpareSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/warmSpareSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update MX warm spare settings
 * @method
 * @name MerakiDashboardApi#updateNetworkWarmSpareSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkWarmSpareSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkWarmSpareSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/warmSpareSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkWarmSpareSettings'] !== undefined){
                body = parameters['updateNetworkWarmSpareSettings'];
            }


        if(parameters['updateNetworkWarmSpareSettings'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateNetworkWarmSpareSettings'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the non-basic RF profiles for this network
 * @method
 * @name MerakiDashboardApi#getNetworkWirelessRfProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {boolean} parameters.includeTemplateProfiles -     If the network is bound to a template, this parameter controls whether or not the non-basic RF profiles defined on the template
    should be included in the response alongside the non-basic profiles defined on the bound network. Defaults to false.

 */
 MerakiDashboardApi.prototype.getNetworkWirelessRfProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/rfProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 

                if(parameters['includeTemplateProfiles'] !== undefined){
                    queryParameters['includeTemplateProfiles'] = parameters['includeTemplateProfiles'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates new RF profile for this network
 * @method
 * @name MerakiDashboardApi#createNetworkWirelessRfProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createNetworkWirelessRfProfile - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createNetworkWirelessRfProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/rfProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createNetworkWirelessRfProfile'] !== undefined){
                body = parameters['createNetworkWirelessRfProfile'];
            }


        if(parameters['createNetworkWirelessRfProfile'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createNetworkWirelessRfProfile'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates specified RF profile for this network
 * @method
 * @name MerakiDashboardApi#updateNetworkWirelessRfProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.rfProfileId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkWirelessRfProfile - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkWirelessRfProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/rfProfiles/{rfProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{rfProfileId}', parameters['rfProfileId']);
        
        


        if(parameters['rfProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: rfProfileId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkWirelessRfProfile'] !== undefined){
                body = parameters['updateNetworkWirelessRfProfile'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a RF Profile
 * @method
 * @name MerakiDashboardApi#deleteNetworkWirelessRfProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.rfProfileId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteNetworkWirelessRfProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/rfProfiles/{rfProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{rfProfileId}', parameters['rfProfileId']);
        
        


        if(parameters['rfProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: rfProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a RF profile
 * @method
 * @name MerakiDashboardApi#getNetworkWirelessRfProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.rfProfileId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkWirelessRfProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/rfProfiles/{rfProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{rfProfileId}', parameters['rfProfileId']);
        
        


        if(parameters['rfProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: rfProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the wireless settings for a network
 * @method
 * @name MerakiDashboardApi#getNetworkWirelessSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getNetworkWirelessSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the wireless settings for a network
 * @method
 * @name MerakiDashboardApi#updateNetworkWirelessSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateNetworkWirelessSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateNetworkWirelessSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{networkId}/wireless/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{networkId}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateNetworkWirelessSettings'] !== undefined){
                body = parameters['updateNetworkWirelessSettings'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Lock a set of devices
 * @method
 * @name MerakiDashboardApi#lockNetworkSmDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.lockNetworkSmDevices - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.lockNetworkSmDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{network_id}/sm/devices/lock';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{network_id}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['lockNetworkSmDevices'] !== undefined){
                body = parameters['lockNetworkSmDevices'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns historical connectivity data (whether a device is regularly checking in to Dashboard).
 * @method
 * @name MerakiDashboardApi#getNetworkSmConnectivity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkSmConnectivity = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{network_id}/sm/{id}/connectivity';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{network_id}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return historical records of various Systems Manager network connection details for desktop devices.
 * @method
 * @name MerakiDashboardApi#getNetworkSmDesktopLogs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkSmDesktopLogs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{network_id}/sm/{id}/desktopLogs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{network_id}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 *     Return historical records of commands sent to Systems Manager devices.
    <p>Note that this will include the name of the Dashboard user who initiated the command if it was generated
    by a Dashboard admin rather than the automatic behavior of the system; you may wish to filter this out
    of any reports.</p>

 * @method
 * @name MerakiDashboardApi#getNetworkSmDeviceCommandLogs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkSmDeviceCommandLogs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{network_id}/sm/{id}/deviceCommandLogs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{network_id}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return historical records of various Systems Manager client metrics for desktop devices.
 * @method
 * @name MerakiDashboardApi#getNetworkSmPerformanceHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getNetworkSmPerformanceHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/networks/{network_id}/sm/{id}/performanceHistory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{network_id}', parameters['networkId']);
        
        


        if(parameters['networkId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: networkId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the organizations that the user has privileges on
 * @method
 * @name MerakiDashboardApi#getOrganizations
 * @param {object} parameters - method options and parameters
 */
 MerakiDashboardApi.prototype.getOrganizations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a new organization
 * @method
 * @name MerakiDashboardApi#createOrganization
 * @param {object} parameters - method options and parameters
     * @param {} parameters.createOrganization - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganization = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['createOrganization'] !== undefined){
                body = parameters['createOrganization'];
            }


        if(parameters['createOrganization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrganization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return an organization
 * @method
 * @name MerakiDashboardApi#getOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganization = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an organization
 * @method
 * @name MerakiDashboardApi#updateOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganization - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganization = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganization'] !== undefined){
                body = parameters['updateOrganization'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete an organization
 * @method
 * @name MerakiDashboardApi#deleteOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganization = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create an action batch
 * @method
 * @name MerakiDashboardApi#createOrganizationActionBatch
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createOrganizationActionBatch - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganizationActionBatch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/actionBatches';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrganizationActionBatch'] !== undefined){
                body = parameters['createOrganizationActionBatch'];
            }


        if(parameters['createOrganizationActionBatch'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrganizationActionBatch'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the list of action batches in the organization
 * @method
 * @name MerakiDashboardApi#getOrganizationActionBatches
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationActionBatches = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/actionBatches';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return an action batch
 * @method
 * @name MerakiDashboardApi#getOrganizationActionBatch
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.actionBatchId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationActionBatch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/actionBatches/{actionBatchId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{actionBatchId}', parameters['actionBatchId']);
        
        


        if(parameters['actionBatchId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: actionBatchId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete an action batch
 * @method
 * @name MerakiDashboardApi#deleteOrganizationActionBatch
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.actionBatchId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganizationActionBatch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/actionBatches/{actionBatchId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{actionBatchId}', parameters['actionBatchId']);
        
        


        if(parameters['actionBatchId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: actionBatchId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an action batch
 * @method
 * @name MerakiDashboardApi#updateOrganizationActionBatch
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.actionBatchId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationActionBatch - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationActionBatch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/actionBatches/{actionBatchId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{actionBatchId}', parameters['actionBatchId']);
        
        


        if(parameters['actionBatchId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: actionBatchId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationActionBatch'] !== undefined){
                body = parameters['updateOrganizationActionBatch'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the dashboard administrators in this organization
 * @method
 * @name MerakiDashboardApi#getOrganizationAdmins
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationAdmins = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/admins';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a new dashboard administrator
 * @method
 * @name MerakiDashboardApi#createOrganizationAdmin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createOrganizationAdmin - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganizationAdmin = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/admins';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrganizationAdmin'] !== undefined){
                body = parameters['createOrganizationAdmin'];
            }


        if(parameters['createOrganizationAdmin'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrganizationAdmin'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an administrator
 * @method
 * @name MerakiDashboardApi#updateOrganizationAdmin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationAdmin - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationAdmin = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/admins/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationAdmin'] !== undefined){
                body = parameters['updateOrganizationAdmin'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Revoke all access for a dashboard administrator within this organization
 * @method
 * @name MerakiDashboardApi#deleteOrganizationAdmin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.id - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganizationAdmin = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/admins/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the API requests made by an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationApiRequests
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 31 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 31 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 50.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.adminId - Filter the results by the ID of the admin who made the API requests
     * @param {string} parameters.path - Filter the results by the path of the API requests
     * @param {string} parameters.method - Filter the results by the method of the API requests (must be 'GET', 'PUT', 'POST' or 'DELETE')
     * @param {integer} parameters.responseCode - Filter the results by the response code of the API requests
     * @param {string} parameters.sourceIp - Filter the results by the IP address of the originating API request
 */
 MerakiDashboardApi.prototype.getOrganizationApiRequests = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/apiRequests';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 

                if(parameters['adminId'] !== undefined){
                    queryParameters['adminId'] = parameters['adminId'];
                }
        
        
        


 

                if(parameters['path'] !== undefined){
                    queryParameters['path'] = parameters['path'];
                }
        
        
        


 

                if(parameters['method'] !== undefined){
                    queryParameters['method'] = parameters['method'];
                }
        
        
        


 

                if(parameters['responseCode'] !== undefined){
                    queryParameters['responseCode'] = parameters['responseCode'];
                }
        
        
        


 

                if(parameters['sourceIp'] !== undefined){
                    queryParameters['sourceIp'] = parameters['sourceIp'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return an aggregated overview of API requests data
 * @method
 * @name MerakiDashboardApi#getOrganizationApiRequestsOverview
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 31 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 31 days.
 */
 MerakiDashboardApi.prototype.getOrganizationApiRequestsOverview = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/apiRequests/overview';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the branding policies of an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationBrandingPolicies
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationBrandingPolicies = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a new branding policy to an organization
 * @method
 * @name MerakiDashboardApi#createOrganizationBrandingPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createOrganizationBrandingPolicy - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganizationBrandingPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrganizationBrandingPolicy'] !== undefined){
                body = parameters['createOrganizationBrandingPolicy'];
            }


        if(parameters['createOrganizationBrandingPolicy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrganizationBrandingPolicy'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the branding policy IDs of an organization in priority order. IDs are ordered in ascending order of priority (IDs later in the array have higher priority).
 * @method
 * @name MerakiDashboardApi#getOrganizationBrandingPoliciesPriorities
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationBrandingPoliciesPriorities = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies/priorities';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the priority ordering of an organization's branding policies.
 * @method
 * @name MerakiDashboardApi#updateOrganizationBrandingPoliciesPriorities
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationBrandingPoliciesPriorities - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationBrandingPoliciesPriorities = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies/priorities';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationBrandingPoliciesPriorities'] !== undefined){
                body = parameters['updateOrganizationBrandingPoliciesPriorities'];
            }


        if(parameters['updateOrganizationBrandingPoliciesPriorities'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateOrganizationBrandingPoliciesPriorities'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a branding policy
 * @method
 * @name MerakiDashboardApi#getOrganizationBrandingPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.brandingPolicyId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationBrandingPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies/{brandingPolicyId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{brandingPolicyId}', parameters['brandingPolicyId']);
        
        


        if(parameters['brandingPolicyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: brandingPolicyId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a branding policy
 * @method
 * @name MerakiDashboardApi#updateOrganizationBrandingPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.brandingPolicyId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationBrandingPolicy - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationBrandingPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies/{brandingPolicyId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{brandingPolicyId}', parameters['brandingPolicyId']);
        
        


        if(parameters['brandingPolicyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: brandingPolicyId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationBrandingPolicy'] !== undefined){
                body = parameters['updateOrganizationBrandingPolicy'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a branding policy
 * @method
 * @name MerakiDashboardApi#deleteOrganizationBrandingPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.brandingPolicyId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganizationBrandingPolicy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/brandingPolicies/{brandingPolicyId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{brandingPolicyId}', parameters['brandingPolicyId']);
        
        


        if(parameters['brandingPolicyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: brandingPolicyId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Claim a list of devices, licenses, and/or orders into an organization. When claiming by order, all devices and licenses in the order will be claimed; licenses will be added to the organization and devices will be placed in the organization's inventory.
 * @method
 * @name MerakiDashboardApi#claimOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.claimOrganization - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.claimOrganization = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/claim';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['claimOrganization'] !== undefined){
                body = parameters['claimOrganization'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a new organization by cloning the addressed organization
 * @method
 * @name MerakiDashboardApi#cloneOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.cloneOrganization - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.cloneOrganization = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/clone';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['cloneOrganization'] !== undefined){
                body = parameters['cloneOrganization'];
            }


        if(parameters['cloneOrganization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: cloneOrganization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the configuration templates for this organization
 * @method
 * @name MerakiDashboardApi#getOrganizationConfigTemplates
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationConfigTemplates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/configTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove a configuration template
 * @method
 * @name MerakiDashboardApi#deleteOrganizationConfigTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.configTemplateId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganizationConfigTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/configTemplates/{configTemplateId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{configTemplateId}', parameters['configTemplateId']);
        
        


        if(parameters['configTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: configTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the switch profiles for your switch template configuration
 * @method
 * @name MerakiDashboardApi#getOrganizationConfigTemplateSwitchProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.configTemplateId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationConfigTemplateSwitchProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/configTemplates/{configTemplateId}/switchProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{configTemplateId}', parameters['configTemplateId']);
        
        


        if(parameters['configTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: configTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * View the Change Log for your organization
 * @method
 * @name MerakiDashboardApi#getOrganizationConfigurationChanges
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 365 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 365 days. The default is 365 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 5000. Default is 5000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.networkId - Filters on the given network
     * @param {string} parameters.adminId - Filters on the given Admin
 */
 MerakiDashboardApi.prototype.getOrganizationConfigurationChanges = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/configurationChanges';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 

                if(parameters['networkId'] !== undefined){
                    queryParameters['networkId'] = parameters['networkId'];
                }
        
        
        


 

                if(parameters['adminId'] !== undefined){
                    queryParameters['adminId'] = parameters['adminId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the status of every Meraki device in the organization
 * @method
 * @name MerakiDashboardApi#getOrganizationDeviceStatuses
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationDeviceStatuses = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/deviceStatuses';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the devices in an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.configurationUpdatedAfter - Filter results by whether or not the device's configuration has been updated after the given timestamp
 */
 MerakiDashboardApi.prototype.getOrganizationDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 

                if(parameters['configurationUpdatedAfter'] !== undefined){
                    queryParameters['configurationUpdatedAfter'] = parameters['configurationUpdatedAfter'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the monitored media servers for this organization. Only valid for organizations with Meraki Insight.
 * @method
 * @name MerakiDashboardApi#getOrganizationInsightMonitoredMediaServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationInsightMonitoredMediaServers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/insight/monitoredMediaServers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add a media server to be monitored for this organization. Only valid for organizations with Meraki Insight.
 * @method
 * @name MerakiDashboardApi#createOrganizationInsightMonitoredMediaServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createOrganizationInsightMonitoredMediaServer - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganizationInsightMonitoredMediaServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/insight/monitoredMediaServers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrganizationInsightMonitoredMediaServer'] !== undefined){
                body = parameters['createOrganizationInsightMonitoredMediaServer'];
            }


        if(parameters['createOrganizationInsightMonitoredMediaServer'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrganizationInsightMonitoredMediaServer'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a monitored media server for this organization. Only valid for organizations with Meraki Insight.
 * @method
 * @name MerakiDashboardApi#getOrganizationInsightMonitoredMediaServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.monitoredMediaServerId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationInsightMonitoredMediaServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/insight/monitoredMediaServers/{monitoredMediaServerId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{monitoredMediaServerId}', parameters['monitoredMediaServerId']);
        
        


        if(parameters['monitoredMediaServerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: monitoredMediaServerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a monitored media server for this organization. Only valid for organizations with Meraki Insight.
 * @method
 * @name MerakiDashboardApi#updateOrganizationInsightMonitoredMediaServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.monitoredMediaServerId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationInsightMonitoredMediaServer - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationInsightMonitoredMediaServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/insight/monitoredMediaServers/{monitoredMediaServerId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{monitoredMediaServerId}', parameters['monitoredMediaServerId']);
        
        


        if(parameters['monitoredMediaServerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: monitoredMediaServerId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationInsightMonitoredMediaServer'] !== undefined){
                body = parameters['updateOrganizationInsightMonitoredMediaServer'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a monitored media server from this organization. Only valid for organizations with Meraki Insight.
 * @method
 * @name MerakiDashboardApi#deleteOrganizationInsightMonitoredMediaServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.monitoredMediaServerId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganizationInsightMonitoredMediaServer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/insight/monitoredMediaServers/{monitoredMediaServerId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{monitoredMediaServerId}', parameters['monitoredMediaServerId']);
        
        


        if(parameters['monitoredMediaServerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: monitoredMediaServerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the inventory for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationInventory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {boolean} parameters.includeLicenseInfo - When this parameter is true, each entity in the response will include the license expiration date of the device (if any). Only applies to organizations that support per-device licensing. Defaults to false.
 */
 MerakiDashboardApi.prototype.getOrganizationInventory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/inventory';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['includeLicenseInfo'] !== undefined){
                    queryParameters['includeLicenseInfo'] = parameters['includeLicenseInfo'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return an overview of the license state for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationLicenseState
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationLicenseState = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenseState';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the licenses for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationLicenses
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.deviceSerial - Filter the licenses to those assigned to a particular device
     * @param {string} parameters.networkId - Filter the licenses to those assigned in a particular network
     * @param {string} parameters.state - Filter the licenses to those in a particular state. Can be one of 'active', 'expired', 'expiring', 'unused', 'unusedActive' or 'recentlyQueued'
 */
 MerakiDashboardApi.prototype.getOrganizationLicenses = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 

                if(parameters['deviceSerial'] !== undefined){
                    queryParameters['deviceSerial'] = parameters['deviceSerial'];
                }
        
        
        


 

                if(parameters['networkId'] !== undefined){
                    queryParameters['networkId'] = parameters['networkId'];
                }
        
        
        


 

                if(parameters['state'] !== undefined){
                    queryParameters['state'] = parameters['state'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Assign SM seats to a network. This will increase the managed SM device limit of the network
 * @method
 * @name MerakiDashboardApi#assignOrganizationLicensesSeats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.assignOrganizationLicensesSeats - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.assignOrganizationLicensesSeats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses/assignSeats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['assignOrganizationLicensesSeats'] !== undefined){
                body = parameters['assignOrganizationLicensesSeats'];
            }


        if(parameters['assignOrganizationLicensesSeats'] === undefined){
            deferred.reject(new Error('Missing required  parameter: assignOrganizationLicensesSeats'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Move licenses to another organization. This will also move any devices that the licenses are assigned to
 * @method
 * @name MerakiDashboardApi#moveOrganizationLicenses
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.moveOrganizationLicenses - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.moveOrganizationLicenses = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses/move';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['moveOrganizationLicenses'] !== undefined){
                body = parameters['moveOrganizationLicenses'];
            }


        if(parameters['moveOrganizationLicenses'] === undefined){
            deferred.reject(new Error('Missing required  parameter: moveOrganizationLicenses'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Move SM seats to another organization
 * @method
 * @name MerakiDashboardApi#moveOrganizationLicensesSeats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.moveOrganizationLicensesSeats - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.moveOrganizationLicensesSeats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses/moveSeats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['moveOrganizationLicensesSeats'] !== undefined){
                body = parameters['moveOrganizationLicensesSeats'];
            }


        if(parameters['moveOrganizationLicensesSeats'] === undefined){
            deferred.reject(new Error('Missing required  parameter: moveOrganizationLicensesSeats'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Renew SM seats of a license. This will extend the license expiration date of managed SM devices covered by this license
 * @method
 * @name MerakiDashboardApi#renewOrganizationLicensesSeats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.renewOrganizationLicensesSeats - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.renewOrganizationLicensesSeats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses/renewSeats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['renewOrganizationLicensesSeats'] !== undefined){
                body = parameters['renewOrganizationLicensesSeats'];
            }


        if(parameters['renewOrganizationLicensesSeats'] === undefined){
            deferred.reject(new Error('Missing required  parameter: renewOrganizationLicensesSeats'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Display a license
 * @method
 * @name MerakiDashboardApi#getOrganizationLicense
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.licenseId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationLicense = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses/{licenseId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{licenseId}', parameters['licenseId']);
        
        


        if(parameters['licenseId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: licenseId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a license
 * @method
 * @name MerakiDashboardApi#updateOrganizationLicense
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.licenseId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationLicense - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationLicense = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/licenses/{licenseId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{licenseId}', parameters['licenseId']);
        
        


        if(parameters['licenseId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: licenseId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationLicense'] !== undefined){
                body = parameters['updateOrganizationLicense'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the networks in an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationNetworks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.configTemplateId - An optional parameter that is the ID of a config template. Will return all networks bound to that template.
 */
 MerakiDashboardApi.prototype.getOrganizationNetworks = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/networks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['configTemplateId'] !== undefined){
                    queryParameters['configTemplateId'] = parameters['configTemplateId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a network
 * @method
 * @name MerakiDashboardApi#createOrganizationNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createOrganizationNetwork - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganizationNetwork = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/networks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrganizationNetwork'] !== undefined){
                body = parameters['createOrganizationNetwork'];
            }


        if(parameters['createOrganizationNetwork'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrganizationNetwork'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Combine multiple networks into a single network
 * @method
 * @name MerakiDashboardApi#combineOrganizationNetworks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.combineOrganizationNetworks - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.combineOrganizationNetworks = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/networks/combine';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['combineOrganizationNetworks'] !== undefined){
                body = parameters['combineOrganizationNetworks'];
            }


        if(parameters['combineOrganizationNetworks'] === undefined){
            deferred.reject(new Error('Missing required  parameter: combineOrganizationNetworks'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the OpenAPI 2.0 Specification of the organization's API documentation in JSON
 * @method
 * @name MerakiDashboardApi#getOrganizationOpenapiSpec
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationOpenapiSpec = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/openapiSpec';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the SAML roles for this organization
 * @method
 * @name MerakiDashboardApi#getOrganizationSamlRoles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationSamlRoles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/samlRoles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a SAML role
 * @method
 * @name MerakiDashboardApi#createOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.createOrganizationSamlRole - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.createOrganizationSamlRole = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/samlRoles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrganizationSamlRole'] !== undefined){
                body = parameters['createOrganizationSamlRole'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return a SAML role
 * @method
 * @name MerakiDashboardApi#getOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.samlRoleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationSamlRole = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/samlRoles/{samlRoleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{samlRoleId}', parameters['samlRoleId']);
        
        


        if(parameters['samlRoleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: samlRoleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update a SAML role
 * @method
 * @name MerakiDashboardApi#updateOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.samlRoleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationSamlRole - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationSamlRole = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/samlRoles/{samlRoleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{samlRoleId}', parameters['samlRoleId']);
        
        


        if(parameters['samlRoleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: samlRoleId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationSamlRole'] !== undefined){
                body = parameters['updateOrganizationSamlRole'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove a SAML role
 * @method
 * @name MerakiDashboardApi#deleteOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.samlRoleId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.deleteOrganizationSamlRole = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/samlRoles/{samlRoleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{samlRoleId}', parameters['samlRoleId']);
        
        


        if(parameters['samlRoleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: samlRoleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all supported intrusion settings for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationSecurityIntrusionSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationSecurityIntrusionSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/security/intrusionSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Sets supported intrusion settings for an organization
 * @method
 * @name MerakiDashboardApi#updateOrganizationSecurityIntrusionSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationSecurityIntrusionSettings - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationSecurityIntrusionSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/security/intrusionSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationSecurityIntrusionSettings'] !== undefined){
                body = parameters['updateOrganizationSecurityIntrusionSettings'];
            }


        if(parameters['updateOrganizationSecurityIntrusionSettings'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateOrganizationSecurityIntrusionSettings'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the security events for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationSecurityEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 365 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 365 days. The default is 31 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 100.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
 MerakiDashboardApi.prototype.getOrganizationSecurityEvents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/securityEvents';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the SNMP settings for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationSnmp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationSnmp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/snmp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the SNMP settings for an organization
 * @method
 * @name MerakiDashboardApi#updateOrganizationSnmp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationSnmp - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationSnmp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/snmp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationSnmp'] !== undefined){
                body = parameters['updateOrganizationSnmp'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the third party VPN peers for an organization
 * @method
 * @name MerakiDashboardApi#getOrganizationThirdPartyVPNPeers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationThirdPartyVPNPeers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/thirdPartyVPNPeers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the third party VPN peers for an organization
 * @method
 * @name MerakiDashboardApi#updateOrganizationThirdPartyVPNPeers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationThirdPartyVpnPeers - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationThirdPartyVPNPeers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/thirdPartyVPNPeers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationThirdPartyVpnPeers'] !== undefined){
                body = parameters['updateOrganizationThirdPartyVpnPeers'];
            }


        if(parameters['updateOrganizationThirdPartyVpnPeers'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateOrganizationThirdPartyVpnPeers'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the uplink loss and latency for every MX in the organization from at latest 2 minutes ago
 * @method
 * @name MerakiDashboardApi#getOrganizationUplinksLossAndLatency
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 5 minutes after t0. The latest possible time that t1 can be is 2 minutes into the past.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 5 minutes. The default is 5 minutes.
     * @param {string} parameters.uplink - Optional filter for a specific WAN uplink. Valid uplinks are wan1, wan2, cellular. Default will return all uplinks.
     * @param {string} parameters.ip - Optional filter for a specific destination IP. Default will return all destination IPs.
 */
 MerakiDashboardApi.prototype.getOrganizationUplinksLossAndLatency = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/uplinksLossAndLatency';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['uplink'] !== undefined){
                    queryParameters['uplink'] = parameters['uplink'];
                }
        
        
        


 

                if(parameters['ip'] !== undefined){
                    queryParameters['ip'] = parameters['ip'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the firewall rules for an organization's site-to-site VPN
 * @method
 * @name MerakiDashboardApi#getOrganizationVpnFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.getOrganizationVpnFirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/vpnFirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the firewall rules of an organization's site-to-site VPN
 * @method
 * @name MerakiDashboardApi#updateOrganizationVpnFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {} parameters.updateOrganizationVpnFirewallRules - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

 */
 MerakiDashboardApi.prototype.updateOrganizationVpnFirewallRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/vpnFirewallRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateOrganizationVpnFirewallRules'] !== undefined){
                body = parameters['updateOrganizationVpnFirewallRules'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Return the log of webhook POSTs sent
 * @method
 * @name MerakiDashboardApi#getOrganizationWebhookLogs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - The Cisco Meraki Dashboard API is a modern REST API based on the OpenAPI specification.

> Date: 04 March, 2020
>
> [What's New](https://meraki.io/whats-new/)

---

[API Documentation](https://meraki.io/api)

[Community Support](https://meraki.io/community)

[Meraki Homepage](https://www.meraki.com)

     * @param {string} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 90 days from today.
     * @param {string} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 31 days after t0.
     * @param {number} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 1 day.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 50.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.url - The URL the webhook was sent to
 */
 MerakiDashboardApi.prototype.getOrganizationWebhookLogs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/organizations/{organizationId}/webhookLogs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{organizationId}', parameters['organizationId']);
        
        


        if(parameters['organizationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: organizationId'));
            return deferred.promise;
        }
 

                if(parameters['t0'] !== undefined){
                    queryParameters['t0'] = parameters['t0'];
                }
        
        
        


 

                if(parameters['t1'] !== undefined){
                    queryParameters['t1'] = parameters['t1'];
                }
        
        
        


 

                if(parameters['timespan'] !== undefined){
                    queryParameters['timespan'] = parameters['timespan'];
                }
        
        
        


 

                if(parameters['perPage'] !== undefined){
                    queryParameters['perPage'] = parameters['perPage'];
                }
        
        
        


 

                if(parameters['startingAfter'] !== undefined){
                    queryParameters['startingAfter'] = parameters['startingAfter'];
                }
        
        
        


 

                if(parameters['endingBefore'] !== undefined){
                    queryParameters['endingBefore'] = parameters['endingBefore'];
                }
        
        
        


 

                if(parameters['url'] !== undefined){
                    queryParameters['url'] = parameters['url'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return MerakiDashboardApi;
})();

exports.MerakiDashboardApi = MerakiDashboardApi;
