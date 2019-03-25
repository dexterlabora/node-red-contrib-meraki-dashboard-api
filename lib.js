var JSONbig = require("json-bigint")({ storeAsString: true });
/*jshint -W069 */
/**
 * This collection of API calls provides an easy way to interact with a Cisco Meraki network
 * @class MerakiDashboardApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var MerakiDashboardApi = (function() {
  "use strict";

  var request = require("request");
  var Q = require("q");
  var fileType = require("file-type");

  function MerakiDashboardApi(options) {
    var domain = typeof options === "object" ? options.domain : options;
    this.domain = domain ? domain : "https://api.meraki.com/api/v0";
    if (this.domain.length === 0) {
      throw new Error("Domain parameter must be specified as a string.");
    }
    this.apiKey =
      typeof options === "object" ? (options.apiKey ? options.apiKey : {}) : {};
  }

  function mergeQueryParams(parameters, queryParameters) {
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
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
  MerakiDashboardApi.prototype.request = function(
    method,
    url,
    parameters,
    body,
    headers,
    queryParameters,
    form,
    deferred
  ) {
    var req = {
      method: method,
      uri: url,
      qs: queryParameters,
      headers: headers,
      body: body
    };
    if (Object.keys(form).length > 0) {
      if (
        req.headers["Content-Type"] &&
        req.headers["Content-Type"][0] === "multipart/form-data"
      ) {
        delete req.body;
        var keyName = Object.keys(form)[0];
        req.formData = {
          [keyName]: {
            value: form[keyName],
            options: {
              filename:
                fileType(form[keyName]) != null
                  ? `file.${fileType(form[keyName]).ext}`
                  : `file`
            }
          }
        };
      } else {
        req.form = form;
      }
    }
    if (typeof body === "object" && !(body instanceof Buffer)) {
      req.json = true;
    }
    request(req, function(error, response, body) {
      if (error) {
        deferred.reject(error);
      } else {
        if (
          /^application\/(.*\\+)?json/.test(response.headers["content-type"])
        ) {
          try {
            //body = JSON.parse(body);
            console.log("lib.js body ", body);
            console.log("lib.js response", response);
            body = JSONbig.parse(body);
            console.log("lib.js body JSONbig(body) ", body);
          } catch (e) {}
        }
        if (response.statusCode === 204) {
          deferred.resolve({ response: response });
        } else if (response.statusCode >= 200 && response.statusCode <= 299) {
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
  MerakiDashboardApi.prototype.setApiKey = function(
    value,
    headerOrQueryName,
    isQuery
  ) {
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
  MerakiDashboardApi.prototype.setAuthHeaders = function(headerParams) {
    var headers = headerParams ? headerParams : {};
    if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
      headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
    }
    return headers;
  };

  /**
 * List the dashboard administrators in this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationAdmins
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationAdmins = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/admins";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new dashboard administrator

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Miles Meraki","email":"miles@meraki.com","orgAccess":"none","tags":[{"tag":"west","access":"read-only"}]}' 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins'
```
 * @method
 * @name MerakiDashboardApi#createOrganizationAdmins
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createOrganizationAdmins - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createOrganizationAdmins = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/admins";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["createOrganizationAdmins"] !== undefined) {
      body = parameters["createOrganizationAdmins"];
    }

    if (parameters["createOrganizationAdmins"] === undefined) {
      deferred.reject(
        new Error("Missing required  parameter: createOrganizationAdmins")
      );
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update an administrator

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Miles Meraki","email":"miles@meraki.com","orgAccess":"none","tags":[{"tag":"west","access":"read-only"}]}' 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins/{id}'
```
 * @method
 * @name MerakiDashboardApi#updateOrganizationAdmin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateOrganizationAdmin - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateOrganizationAdmin = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/admins/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateOrganizationAdmin"] !== undefined) {
      body = parameters["updateOrganizationAdmin"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Revoke all access for a dashboard administrator within this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/{organizationId}/admins/{id}'
```
 * @method
 * @name MerakiDashboardApi#deleteOrganizationAdmin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteOrganizationAdmin = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/admins/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the alert configuration for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/alertSettings'
```
 * @method
 * @name MerakiDashboardApi#getNetworkAlertSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkAlertSettings = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/alertSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the alert configuration for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"defaultDestinations":{"emails":["miles@meraki.com"],"allAdmins":true,"snmp":true},"alerts":[{"type":"gatewayDown","enabled":true,"alertDestinations":{"emails":["miles@meraki.com"],"allAdmins":false,"snmp":false},"filters":{"timeout":60}}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/alertSettings'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkAlertSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkAlertSettings - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkAlertSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/alertSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkAlertSettings"] !== undefined) {
      body = parameters["updateNetworkAlertSettings"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns all configured analytic zones for this camera

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/zones'
```
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsZones
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getDeviceCameraAnalyticsZones = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/camera/analytics/zones";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns most recent record for analytics zones

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/recent'
```
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsRecent
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getDeviceCameraAnalyticsRecent = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/camera/analytics/recent";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns live state from camera of analytics zones

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/live'
```
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsLive
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getDeviceCameraAnalyticsLive = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/camera/analytics/live";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns an overview of aggregate analytics data for a timespan

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/{serial}/camera/analytics/overview'
```
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsOverview
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {integer} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 7 days. The default is 1 hour.
 */
  MerakiDashboardApi.prototype.getDeviceCameraAnalyticsOverview = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/camera/analytics/overview";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return historical records for analytic zones

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/{serial}/camera/analytics/zones/{zoneId}/history'
```
 * @method
 * @name MerakiDashboardApi#getDeviceCameraAnalyticsZoneHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.zoneId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {integer} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 14 hours after t0.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 14 hours. The default is 1 hour.
     * @param {integer} parameters.resolution - The time resolution in seconds for returned data. The valid resolutions are: 60. The default is 60.
 */
  MerakiDashboardApi.prototype.getDeviceCameraAnalyticsZoneHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/camera/analytics/zones/{zoneId}/history";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    path = path.replace("{zoneId}", parameters["zoneId"]);

    if (parameters["zoneId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: zoneId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["resolution"] !== undefined) {
      queryParameters["resolution"] = parameters["resolution"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the API requests made by an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/apiRequests'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationApiRequests
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {integer} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 31 days after t0.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 31 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000. Default is 50.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.adminId - Filter the results by the ID of the admin who made the API requests
     * @param {string} parameters.path - Filter the results by the path of the API requests
     * @param {string} parameters.method - Filter the results by the method of the API requests (must be 'GET', 'PUT', 'POST' or 'DELETE')
 */
  MerakiDashboardApi.prototype.getOrganizationApiRequests = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/apiRequests";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    if (parameters["adminId"] !== undefined) {
      queryParameters["adminId"] = parameters["adminId"];
    }

    if (parameters["path"] !== undefined) {
      queryParameters["path"] = parameters["path"];
    }

    if (parameters["method"] !== undefined) {
      queryParameters["method"] = parameters["method"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a Bluetooth client

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/bluetoothClients/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkBluetoothClient
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.includeConnectivityHistory - Include the connectivity history for this client
     * @param {string} parameters.connectivityHistoryTimespan - The timespan, in seconds, for the connectivityHistory data. By default 1 day, 86400, will be used.
 */
  MerakiDashboardApi.prototype.getNetworkBluetoothClient = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/bluetoothClients/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["includeConnectivityHistory"] !== undefined) {
      queryParameters["includeConnectivityHistory"] =
        parameters["includeConnectivityHistory"];
    }

    if (parameters["connectivityHistoryTimespan"] !== undefined) {
      queryParameters["connectivityHistoryTimespan"] =
        parameters["connectivityHistoryTimespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the Bluetooth clients seen by APs in this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/bluetoothClients'
```
 * @method
 * @name MerakiDashboardApi#getNetworkBluetoothClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 5 - 1000. Default is 10.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.timespan - The timespan, in seconds, used to look back from now for bluetooth clients
     * @param {string} parameters.includeConnectivityHistory - Include the connectivity history for this client
 */
  MerakiDashboardApi.prototype.getNetworkBluetoothClients = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/bluetoothClients";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["includeConnectivityHistory"] !== undefined) {
      queryParameters["includeConnectivityHistory"] =
        parameters["includeConnectivityHistory"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the Bluetooth settings for a network. <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a> must be enabled on the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/bluetoothSettings'
```
 * @method
 * @name MerakiDashboardApi#getNetworkBluetoothSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkBluetoothSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/bluetoothSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the Bluetooth settings for a network. See the docs page for <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a>.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"scanningEnabled":true,"advertisingEnabled":true,"uuid":"00000000-0000-0000-000-000000000000","majorMinorAssignmentMode":"Non-unique","major":1}' 'https://api.meraki.com/api/v0/networks/{networkId}/bluetoothSettings'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkBluetoothSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkBluetoothSettings - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkBluetoothSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/bluetoothSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkBluetoothSettings"] !== undefined) {
      body = parameters["updateNetworkBluetoothSettings"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the networks in an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/networks'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationNetworks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.configTemplateId - An optional parameter that is the ID of a config template. Will return all networks bound to that template.
 */
  MerakiDashboardApi.prototype.getOrganizationNetworks = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/networks";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["configTemplateId"] !== undefined) {
      queryParameters["configTemplateId"] = parameters["configTemplateId"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Long Island Office","timeZone":"America/Los_Angeles","tags":" tag1 tag2 ","disableMyMerakiCom":false,"type":"appliance switch camera"}' 'https://api.meraki.com/api/v0/organizations/{organizationId}/networks'
```
 * @method
 * @name MerakiDashboardApi#createOrganizationNetworks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createOrganizationNetworks - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createOrganizationNetworks = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/networks";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["createOrganizationNetworks"] !== undefined) {
      body = parameters["createOrganizationNetworks"];
    }

    if (parameters["createOrganizationNetworks"] === undefined) {
      deferred.reject(
        new Error("Missing required  parameter: createOrganizationNetworks")
      );
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}'
```
 * @method
 * @name MerakiDashboardApi#getNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetwork = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Long Island Office","timeZone":"America/Los_Angeles","tags":" tag1 tag2 ","disableMyMerakiCom":false}' 'https://api.meraki.com/api/v0/networks/{networkId}'
```
 * @method
 * @name MerakiDashboardApi#updateNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetwork - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetwork = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetwork"] !== undefined) {
      body = parameters["updateNetwork"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/{networkId}'
```
 * @method
 * @name MerakiDashboardApi#deleteNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetwork = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Bind a network to a template.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"configTemplateId":"N_23952905","autoBind":false}' 'https://api.meraki.com/api/v0/networks/{networkId}/bind'
```
 * @method
 * @name MerakiDashboardApi#bindNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.bindNetwork - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.bindNetwork = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/bind";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["bindNetwork"] !== undefined) {
      body = parameters["bindNetwork"];
    }

    if (parameters["bindNetwork"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: bindNetwork"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Unbind a network from a template.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/{networkId}/unbind'
```
 * @method
 * @name MerakiDashboardApi#unbindNetwork
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.unbindNetwork = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/unbind";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * The traffic analysis data for this network.
<a href="https://documentation.meraki.com/MR/Monitoring_and_Reporting/Hostname_Visibility">Traffic Analysis with Hostname Visibility</a> must be enabled on the network.


## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/traffic'
```
 * @method
 * @name MerakiDashboardApi#getNetworkTraffic
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.timespan - The timespan for the data. Must be an integer representing a duration in seconds between two hours and one month. (Mandatory.)
     * @param {string} parameters.deviceType - Filter the data by device type: combined (default), wireless, switch, appliance. When using combined, for each rule the data will come from the device type with the most usage.
 */
  MerakiDashboardApi.prototype.getNetworkTraffic = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/traffic";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["timespan"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: timespan"));
      return deferred.promise;
    }

    if (parameters["deviceType"] !== undefined) {
      queryParameters["deviceType"] = parameters["deviceType"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the access policies for this network. Only valid for MS networks.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/accessPolicies'
```
 * @method
 * @name MerakiDashboardApi#getNetworkAccessPolicies
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkAccessPolicies = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/accessPolicies";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List Air Marshal scan results from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/airMarshal'
```
 * @method
 * @name MerakiDashboardApi#getNetworkAirMarshal
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 31 days from today.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 7 days.
 */
  MerakiDashboardApi.prototype.getNetworkAirMarshal = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/airMarshal";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the site-to-site VPN settings of a network. Only valid for MX networks.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/siteToSiteVpn'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSiteToSiteVpn
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSiteToSiteVpn = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/siteToSiteVpn";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the site-to-site VPN settings of a network. Only valid for MX networks in NAT mode.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"mode":"spoke","hubs":[{"hubId":"N_4901849","useDefaultRoute":true},{"hubId":"N_1892489","useDefaultRoute":false}],"subnets":[{"localSubnet":"192.168.1.0/24","useVpn":true},{"localSubnet":"192.168.128.0/24","useVpn":true}]}' 'https://api.meraki.com/api/v0/networks/{networkId}/siteToSiteVpn'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSiteToSiteVpn
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSiteToSiteVpn - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSiteToSiteVpn = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/siteToSiteVpn";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSiteToSiteVpn"] !== undefined) {
      body = parameters["updateNetworkSiteToSiteVpn"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns video link for the specified camera. If a timestamp supplied, it links to that time.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/cameras/[serial]/videoLink'
```
 * @method
 * @name MerakiDashboardApi#getNetworkCameraVideoLink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.timestamp - The video link will start at this timestamp. The timestamp is in UNIX Epoch time (milliseconds).
 */
  MerakiDashboardApi.prototype.getNetworkCameraVideoLink = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/cameras/{serial}/videoLink";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["timestamp"] !== undefined) {
      queryParameters["timestamp"] = parameters["timestamp"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Generate a snapshot of what the camera sees at the specified time and return a link to that image.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[networkId]/cameras/[serial]/snapshot'
```
 * @method
 * @name MerakiDashboardApi#snapshotNetworkCamera
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.snapshotNetworkCamera - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.snapshotNetworkCamera = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/cameras/{serial}/snapshot";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["snapshotNetworkCamera"] !== undefined) {
      body = parameters["snapshotNetworkCamera"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the clients of a device, up to a maximum of a month ago. The usage of each client is returned in kilobytes. If the device is a switch, the switchport is returned; otherwise the switchport field is null.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/clients?timespan=7200'
```
 * @method
 * @name MerakiDashboardApi#getDeviceClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.timespan - The timespan for which clients will be fetched. Must be in seconds and less than or equal to a month (2592000 seconds).
 */
  MerakiDashboardApi.prototype.getDeviceClients = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/clients";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the client associated with the given identifier. This endpoint will lookup by client ID or either the MAC or IP depending on whether the network uses Track-by-IP.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[idOrMacOrIp]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClient
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.idOrMacOrIp - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkClient = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{idOrMacOrIp}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{idOrMacOrIp}", parameters["idOrMacOrIp"]);

    if (parameters["idOrMacOrIp"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: idOrMacOrIp"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Provisions a client with a name and policy. Clients can be provisioned before they associate to the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"mac":"00:11:22:33:44:55","name":"Miles's phone","devicePolicy":"Group policy","groupPolicyId":"101"}' 'https://api.meraki.com/api/v0/networks/[networkId]/clients/provision'
```
 * @method
 * @name MerakiDashboardApi#provisionNetworkClients
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.provisionNetworkClients - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.provisionNetworkClients = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/provision";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["provisionNetworkClients"] !== undefined) {
      body = parameters["provisionNetworkClients"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the client's daily usage history. Usage data is in kilobytes.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[idOrMacOrIp]/usageHistory'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientUsageHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.idOrMacOrIp - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkClientUsageHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{idOrMacOrIp}/usageHistory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{idOrMacOrIp}", parameters["idOrMacOrIp"]);

    if (parameters["idOrMacOrIp"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: idOrMacOrIp"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the policy assigned to a client on the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[mac]/policy?timespan=7200'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.mac - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.timespan - The timespan for which clients will be fetched. Must be in seconds and less than or equal to a month (2592000 seconds).
 */
  MerakiDashboardApi.prototype.getNetworkClientPolicy = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{mac}/policy";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{mac}", parameters["mac"]);

    if (parameters["mac"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: mac"));
      return deferred.promise;
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the policy assigned to a client on the network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"mac":"00:11:22:33:44:55","type":"Group policy","groupPolicyId":"101"}' 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[mac]/policy'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkClientPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.mac - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkClientPolicy - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkClientPolicy = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{mac}/policy";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{mac}", parameters["mac"]);

    if (parameters["mac"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: mac"));
      return deferred.promise;
    }

    if (parameters["updateNetworkClientPolicy"] !== undefined) {
      body = parameters["updateNetworkClientPolicy"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the splash authorization for a client, for each SSID they've associated with through splash.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/clients/[mac]/splashAuthorizationStatus'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientSplashAuthorizationStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.mac - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkClientSplashAuthorizationStatus = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{id}/clients/{mac}/splashAuthorizationStatus";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    path = path.replace("{mac}", parameters["mac"]);

    if (parameters["mac"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: mac"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a client's splash authorization.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ssids":{"0":{"isAuthorized":true,"authorizedAt":"2017-07-19 16:24:13 UTC","expiresAt":"2017-07-20 16:24:13 UTC"},"2":{"isAuthorized":false}}}' 'https://api.meraki.com/api/v0/networks/[id]/clients/[mac]/splashAuthorizationStatus'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkClientSplashAuthorizationStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.mac - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkClientSplashAuthorizationStatus - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkClientSplashAuthorizationStatus = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{id}/clients/{mac}/splashAuthorizationStatus";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    path = path.replace("{mac}", parameters["mac"]);

    if (parameters["mac"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: mac"));
      return deferred.promise;
    }

    if (
      parameters["updateNetworkClientSplashAuthorizationStatus"] !== undefined
    ) {
      body = parameters["updateNetworkClientSplashAuthorizationStatus"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the client's network traffic data over time. Usage data is in kilobytes. This endpoint requires detailed traffic analysis to be enabled on the Network-wide > General page.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{idOrMacOrIp}/trafficHistory'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientTrafficHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.idOrMacOrIp - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkClientTrafficHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{idOrMacOrIp}/trafficHistory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{idOrMacOrIp}", parameters["idOrMacOrIp"]);

    if (parameters["idOrMacOrIp"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: idOrMacOrIp"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the events associated with this client

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{idOrMacOrIp}/events'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.idOrMacOrIp - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 100. Default is 100.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkClientEvents = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{idOrMacOrIp}/events";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{idOrMacOrIp}", parameters["idOrMacOrIp"]);

    if (parameters["idOrMacOrIp"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: idOrMacOrIp"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the latency history for a client. The latency data is from a sample of 2% of packets and is grouped into 4 traffic categories: background, best effort, video, voice. Within these categories the sampled packet counters are bucketed by latency in milliseconds.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{idOrMacOrIp}/latencyHistory?timespan=7200'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientLatencyHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.idOrMacOrIp - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 791 days from today.
     * @param {integer} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 791 days after t0.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 791 days. The default is 1 day.
     * @param {integer} parameters.resolution - The time resolution in seconds for returned data. The valid resolutions are: 86400. The default is 86400.
 */
  MerakiDashboardApi.prototype.getNetworkClientLatencyHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{idOrMacOrIp}/latencyHistory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{idOrMacOrIp}", parameters["idOrMacOrIp"]);

    if (parameters["idOrMacOrIp"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: idOrMacOrIp"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["resolution"] !== undefined) {
      queryParameters["resolution"] = parameters["resolution"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the configuration templates for this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/configTemplates'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationConfigTemplates
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationConfigTemplates = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/configTemplates";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Remove a configuration template

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organizationId]/configTemplates/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteOrganizationConfigTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteOrganizationConfigTemplate = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/configTemplates/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the devices in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkDevices = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a single device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkDevice = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the attributes of a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My AP","lat":37.4180951010362,"lng":-122.098531723022,"serial":"Q234-ABCD-5678","mac":"00:11:22:33:44:55","tags":" recently-added "}' 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkDevice - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkDevice = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["updateNetworkDevice"] !== undefined) {
      body = parameters["updateNetworkDevice"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the performance score for a single device. Only primary MX devices supported. If no data is available, a 204 error code is returned.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/performance'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDevicePerformance
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkDevicePerformance = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/performance";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the uplink information for a device.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/uplink'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceUplink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkDeviceUplink = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/uplink";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List LLDP and CDP information for a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/lldp_cdp?timespan=7200'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceLldp_cdp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.timespan - The timespan for which LLDP and CDP information will be fetched. Must be in seconds and less than or equal to a month (2592000 seconds). LLDP and CDP information is sent to the Meraki dashboard every 10 minutes. In instances where this LLDP and CDP information matches an existing entry in the Meraki dashboard, the data is updated once every two hours. Meraki recommends querying LLDP and CDP information at an interval slightly greater than two hours, to ensure that unchanged CDP / LLDP information can be queried consistently.
 */
  MerakiDashboardApi.prototype.getNetworkDeviceLldp_cdp = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/lldp_cdp";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Claim a device into a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"serial":"Q234-ABCD-5678"}' 'https://api.meraki.com/api/v0/networks/{networkId}/devices/claim'
```
 * @method
 * @name MerakiDashboardApi#claimNetworkDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.claimNetworkDevices - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.claimNetworkDevices = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/claim";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["claimNetworkDevices"] !== undefined) {
      body = parameters["claimNetworkDevices"];
    }

    if (parameters["claimNetworkDevices"] === undefined) {
      deferred.reject(
        new Error("Missing required  parameter: claimNetworkDevices")
      );
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Remove a single device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/remove'
```
 * @method
 * @name MerakiDashboardApi#removeNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.removeNetworkDevice = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/remove";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get the uplink loss percentage and latency in milliseconds for a wired network device.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/lossAndLatencyHistory?uplink=wan1&ip=1.2.3.4&timespan=7200'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceLossAndLatencyHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 365 days from today.
     * @param {integer} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 31 days after t0.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 31 days. The default is 1 day.
     * @param {integer} parameters.resolution - The time resolution in seconds for returned data. The valid resolutions are: 60, 600, 3600, 86400. The default is 60.
     * @param {string} parameters.uplink - The WAN uplink used to obtain the requested stats. Valid uplinks are wan1, wan2. The default is wan1.
     * @param {string} parameters.ip - The destination IP used to obtain the requested stats. This is required.
 */
  MerakiDashboardApi.prototype.getNetworkDeviceLossAndLatencyHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/lossAndLatencyHistory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["resolution"] !== undefined) {
      queryParameters["resolution"] = parameters["resolution"];
    }

    if (parameters["uplink"] !== undefined) {
      queryParameters["uplink"] = parameters["uplink"];
    }

    if (parameters["ip"] !== undefined) {
      queryParameters["ip"] = parameters["ip"];
    }

    if (parameters["ip"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: ip"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Reboot a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/reboot'
```
 * @method
 * @name MerakiDashboardApi#rebootNetworkDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.rebootNetworkDevice = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/reboot";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the cellular firewall rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/cellularFirewallRules'
```
 * @method
 * @name MerakiDashboardApi#getNetworkCellularFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkCellularFirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/cellularFirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the cellular firewall rules of an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/cellularFirewallRules'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkCellularFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkCellularFirewallRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkCellularFirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/cellularFirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkCellularFirewallRules"] !== undefined) {
      body = parameters["updateNetworkCellularFirewallRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the L3 firewall rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/l3FirewallRules'
```
 * @method
 * @name MerakiDashboardApi#getNetworkL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkL3FirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/l3FirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the L3 firewall rules of an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/l3FirewallRules'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkL3FirewallRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkL3FirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/l3FirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkL3FirewallRules"] !== undefined) {
      body = parameters["updateNetworkL3FirewallRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the firewall rules for an organization's site-to-site VPN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/vpnFirewallRules'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationVpnFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationVpnFirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/vpnFirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update firewall rules of an organization's site-to-site VPN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/organizations/[organizationId]/vpnFirewallRules'
```
 * @method
 * @name MerakiDashboardApi#updateOrganizationVpnFirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateOrganizationVpnFirewallRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateOrganizationVpnFirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/vpnFirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["updateOrganizationVpnFirewallRules"] !== undefined) {
      body = parameters["updateOrganizationVpnFirewallRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the L3 firewall rules for an SSID on an MR network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/l3FirewallRules'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSsidL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSsidL3FirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids/{number}/l3FirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the L3 firewall rules of an SSID on an MR network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/l3FirewallRules'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSsidL3FirewallRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSsidL3FirewallRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSsidL3FirewallRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids/{number}/l3FirewallRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSsidL3FirewallRules"] !== undefined) {
      body = parameters["updateNetworkSsidL3FirewallRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the group policies in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/groupPolicies'
```
 * @method
 * @name MerakiDashboardApi#getNetworkGroupPolicies
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkGroupPolicies = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/groupPolicies";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a group policy

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/{networkId}/groupPolicies/{groupPolicyId}'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkGroupPolicy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.groupPolicyId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkGroupPolicy = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/groupPolicies/{groupPolicyId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{groupPolicyId}", parameters["groupPolicyId"]);

    if (parameters["groupPolicyId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: groupPolicyId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the HTTP servers for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers'
```
 * @method
 * @name MerakiDashboardApi#getNetworkHttpServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkHttpServers = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My HTTP server","url":"https://www.example.com/webhooks","sharedSecret":"foobar"}' 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers'
```
 * @method
 * @name MerakiDashboardApi#createNetworkHttpServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkHttpServers - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkHttpServers = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkHttpServers"] !== undefined) {
      body = parameters["createNetworkHttpServers"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkHttpServer = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My HTTP server","url":"https://www.example.com/webhooks","sharedSecret":"foobar"}' 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkHttpServer - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkHttpServer = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateNetworkHttpServer"] !== undefined) {
      body = parameters["updateNetworkHttpServer"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete an HTTP server

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkHttpServer
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkHttpServer = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Send a test webhook

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/webhookTests'
```
 * @method
 * @name MerakiDashboardApi#createNetworkHttpServersWebhookTests
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkHttpServersWebhookTests - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkHttpServersWebhookTests = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers/webhookTests";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkHttpServersWebhookTests"] !== undefined) {
      body = parameters["createNetworkHttpServersWebhookTests"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the status of a webhook test

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/webhookTests/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkHttpServersWebhookTest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkHttpServersWebhookTest = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/httpServers/webhookTests/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the splash or RADIUS users configured under Meraki Authentication for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/merakiAuthUsers'
```
 * @method
 * @name MerakiDashboardApi#getNetworkMerakiAuthUsers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkMerakiAuthUsers = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/merakiAuthUsers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the Meraki Auth splash or RADIUS user

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/merakiAuthUsers/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkMerakiAuthUser
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkMerakiAuthUser = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/merakiAuthUsers/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the organizations that the user has privileges on

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations'
```
 * @method
 * @name MerakiDashboardApi#getOrganizations
 * @param {object} parameters - method options and parameters
 */
  MerakiDashboardApi.prototype.getOrganizations = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations'
```
 * @method
 * @name MerakiDashboardApi#createOrganizations
 * @param {object} parameters - method options and parameters
     * @param {} parameters.createOrganizations - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createOrganizations = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    if (parameters["createOrganizations"] !== undefined) {
      body = parameters["createOrganizations"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]'
```
 * @method
 * @name MerakiDashboardApi#getOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganization = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations/[id]'
```
 * @method
 * @name MerakiDashboardApi#updateOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateOrganization - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateOrganization = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateOrganization"] !== undefined) {
      body = parameters["updateOrganization"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new organization by cloning the addressed organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations/[id]/clone'
```
 * @method
 * @name MerakiDashboardApi#cloneOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.cloneOrganization - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.cloneOrganization = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/clone";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["cloneOrganization"] !== undefined) {
      body = parameters["cloneOrganization"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Claim a device, license key, or order into an organization. When claiming by order, all devices and licenses in the order will be claimed; licenses will be added to the organization and devices will be placed in the organization's inventory. These three types of claims are mutually exclusive and cannot be performed in one request.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"order":"4CXXXXXXX"}' 'https://api.meraki.com/api/v0/organizations/[id]/claim'
```
 * @method
 * @name MerakiDashboardApi#claimOrganization
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.claimOrganization - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.claimOrganization = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/claim";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["claimOrganization"] !== undefined) {
      body = parameters["claimOrganization"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the license state for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/licenseState'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationLicenseState
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationLicenseState = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/licenseState";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the inventory for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/inventory'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationInventory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationInventory = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/inventory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the status of every Meraki device in the organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/deviceStatuses'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationDeviceStatuses
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationDeviceStatuses = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/deviceStatuses";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the SNMP settings for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/snmp'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationSnmp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationSnmp = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/snmp";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the SNMP settings for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"v2cEnabled":false,"v3Enabled":false}' 'https://api.meraki.com/api/v0/organizations/[id]/snmp'
```
 * @method
 * @name MerakiDashboardApi#updateOrganizationSnmp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateOrganizationSnmp - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateOrganizationSnmp = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/snmp";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateOrganizationSnmp"] !== undefined) {
      body = parameters["updateOrganizationSnmp"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the third party VPN peers for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/thirdPartyVPNPeers'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationThirdPartyVPNPeers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationThirdPartyVPNPeers = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/thirdPartyVPNPeers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the third party VPN peers for an organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '[[{"name":"My peer 1","publicIp":"123.123.123.1","privateSubnets":["192.168.1.0/24","192.168.128.0/24"],"secret":"asdf1234","ipsecPolicies":{"ikeCipherAlgo":["tripledes"],"ikeAuthAlgo":["sha1"],"ikeDiffieHellmanGroup":["group2"],"ikeLifetime":"28800","childCipherAlgo":["aes128"],"childAuthAlgo":["sha1"],"childPfsGroup":["disabled"],"childLifetime":"28800"}},{"name":"My peer 2","publicIp":"123.123.123.2","privateSubnets":["192.168.2.0/24","192.168.129.0/24"],"secret":"asdf56785678567856785678","ipsecPoliciesPreset":"default"}]]' 'https://api.meraki.com/api/v0/organizations/[id]/thirdPartyVPNPeers'
```
 * @method
 * @name MerakiDashboardApi#updateOrganizationThirdPartyVPNPeers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateOrganizationThirdPartyVpnPeers - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateOrganizationThirdPartyVPNPeers = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{id}/thirdPartyVPNPeers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateOrganizationThirdPartyVpnPeers"] !== undefined) {
      body = parameters["updateOrganizationThirdPartyVpnPeers"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the uplink loss and latency for every MX in the organization from 2 - 7 minutes ago

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/{organizationId}/uplinksLossAndLatency'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationUplinksLossAndLatency
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.uplink - Optional filter for a specific WAN uplink. Valid uplinks are wan1, wan2. Default will return all uplinks.
     * @param {string} parameters.ip - Optional filter for a specific destination IP. Default will return all destination IPs.
 */
  MerakiDashboardApi.prototype.getOrganizationUplinksLossAndLatency = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/uplinksLossAndLatency";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["uplink"] !== undefined) {
      queryParameters["uplink"] = parameters["uplink"];
    }

    if (parameters["ip"] !== undefined) {
      queryParameters["ip"] = parameters["ip"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all announcement groups in a network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneAnnouncements
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneAnnouncements = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAnnouncements";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add an announcement group.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My announcement group"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements'
```
 * @method
 * @name MerakiDashboardApi#createNetworkPhoneAnnouncements
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkPhoneAnnouncements - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkPhoneAnnouncements = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAnnouncements";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkPhoneAnnouncements"] !== undefined) {
      body = parameters["createNetworkPhoneAnnouncements"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete an announcement group.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPhoneAnnouncement
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkPhoneAnnouncement = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAnnouncements/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all phones in a network and their contact assignment

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneAssignments
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneAssignments = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAssignments";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a phone's contact assignment

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneAssignment
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneAssignment = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAssignments/{serial}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Assign a contact and number(s) to a phone

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"contactId":"823","contactType":"Google","publicNumber":["+15555555555"],"ext":"1234"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkPhoneAssignment
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkPhoneAssignment - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkPhoneAssignment = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAssignments/{serial}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["updateNetworkPhoneAssignment"] !== undefined) {
      body = parameters["updateNetworkPhoneAssignment"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Remove a phone assignment (unprovision a phone)

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPhoneAssignment
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkPhoneAssignment = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneAssignments/{serial}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all call groups in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneCallgroups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneCallgroups = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneCallgroups";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new call group.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Sales Group","ext":"1234","publicNumber":"+15555555555","ringStrategy":"ring-all","scope":"some","tags":["sales","support"],"noAnswerAction":"transfer-to-ext","transferExtension":"1003"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups'
```
 * @method
 * @name MerakiDashboardApi#createNetworkPhoneCallgroups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkPhoneCallgroups - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkPhoneCallgroups = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneCallgroups";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkPhoneCallgroups"] !== undefined) {
      body = parameters["createNetworkPhoneCallgroups"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Show a call group's details

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneCallgroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneCallgroup = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneCallgroups/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a call group's details. Only submit parameters you would like to update. Omitting any parameters will leave them as-is.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ext":"1234","publicNumber":"+15555555555","ringStrategy":"ring-all","scope":"some","tags":["sales","support"],"noAnswerAction":"transfer-to-ext","transferExtension":"1003"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkPhoneCallgroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkPhoneCallgroup - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkPhoneCallgroup = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneCallgroups/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateNetworkPhoneCallgroup"] !== undefined) {
      body = parameters["updateNetworkPhoneCallgroup"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a call group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPhoneCallgroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkPhoneCallgroup = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneCallgroups/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all the phone conference rooms in a network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneConferenceRooms
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneConferenceRooms = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneConferenceRooms";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a conference room.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Meraki Conference Room"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms'
```
 * @method
 * @name MerakiDashboardApi#createNetworkPhoneConferenceRooms
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkPhoneConferenceRooms - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkPhoneConferenceRooms = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneConferenceRooms";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkPhoneConferenceRooms"] !== undefined) {
      body = parameters["createNetworkPhoneConferenceRooms"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Show a conference room's details.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneConferenceRoom
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneConferenceRoom = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneConferenceRooms/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a conference room's. Only submit parameters you would like to update. Omitting any parameters will leave them as-is.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Meraki Conference Room"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkPhoneConferenceRoom
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkPhoneConferenceRoom - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkPhoneConferenceRoom = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneConferenceRooms/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateNetworkPhoneConferenceRoom"] !== undefined) {
      body = parameters["updateNetworkPhoneConferenceRoom"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a conference room.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPhoneConferenceRoom
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkPhoneConferenceRoom = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneConferenceRooms/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the phone contacts in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneContacts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneContacts = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneContacts";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a contact

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Miles Meraki"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts'
```
 * @method
 * @name MerakiDashboardApi#createNetworkPhoneContacts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkPhoneContacts - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkPhoneContacts = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneContacts";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkPhoneContacts"] !== undefined) {
      body = parameters["createNetworkPhoneContacts"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a phone contact. Google Directory contacts cannot be modified.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Miles Meraki"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts/[contactId]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkPhoneContact
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.contactId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkPhoneContact - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkPhoneContact = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneContacts/{contactId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{contactId}", parameters["contactId"]);

    if (parameters["contactId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: contactId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkPhoneContact"] !== undefined) {
      body = parameters["updateNetworkPhoneContact"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a phone contact. Google Directory contacts cannot be removed.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts/[contactId]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPhoneContact
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.contactId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkPhoneContact = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneContacts/{contactId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{contactId}", parameters["contactId"]);

    if (parameters["contactId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: contactId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all the phone numbers in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneNumbers'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneNumbers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneNumbers = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneNumbers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the available phone numbers in a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneNumbers/available'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPhoneNumbersAvailable
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPhoneNumbersAvailable = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/phoneNumbers/available";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the keys required to access Personally Identifiable Information (PII) for a given identifier. Exactly one identifier will be accepted. If the organization contains org-wide Systems Manager users matching the key provided then there will be an entry with the key "0" containing the applicable keys.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/piiKeys
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/piiKeys'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiPiiKeys
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.username - The username of a Systems Manager user
     * @param {string} parameters.email - The email of a network user account or a Systems Manager device
     * @param {string} parameters.mac - The MAC of a network client device or a Systems Manager device
     * @param {string} parameters.serial - The serial of a Systems Manager device
     * @param {string} parameters.imei - The IMEI of a Systems Manager device
     * @param {string} parameters.bluetoothMac - The MAC of a Bluetooth client
 */
  MerakiDashboardApi.prototype.getNetworkPiiPiiKeys = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/piiKeys";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["username"] !== undefined) {
      queryParameters["username"] = parameters["username"];
    }

    if (parameters["email"] !== undefined) {
      queryParameters["email"] = parameters["email"];
    }

    if (parameters["mac"] !== undefined) {
      queryParameters["mac"] = parameters["mac"];
    }

    if (parameters["serial"] !== undefined) {
      queryParameters["serial"] = parameters["serial"];
    }

    if (parameters["imei"] !== undefined) {
      queryParameters["imei"] = parameters["imei"];
    }

    if (parameters["bluetoothMac"] !== undefined) {
      queryParameters["bluetoothMac"] = parameters["bluetoothMac"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Given a piece of Personally Identifiable Information (PII), return the Systems Manager device ID(s) associated with that identifier. These device IDs can be used with the Systems Manager API endpoints to retrieve device details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smDevicesForKey
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/smDevicesForKey'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiSmDevicesForKey
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.username - The username of a Systems Manager user
     * @param {string} parameters.email - The email of a network user account or a Systems Manager device
     * @param {string} parameters.mac - The MAC of a network client device or a Systems Manager device
     * @param {string} parameters.serial - The serial of a Systems Manager device
     * @param {string} parameters.imei - The IMEI of a Systems Manager device
     * @param {string} parameters.bluetoothMac - The MAC of a Bluetooth client
 */
  MerakiDashboardApi.prototype.getNetworkPiiSmDevicesForKey = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/smDevicesForKey";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["username"] !== undefined) {
      queryParameters["username"] = parameters["username"];
    }

    if (parameters["email"] !== undefined) {
      queryParameters["email"] = parameters["email"];
    }

    if (parameters["mac"] !== undefined) {
      queryParameters["mac"] = parameters["mac"];
    }

    if (parameters["serial"] !== undefined) {
      queryParameters["serial"] = parameters["serial"];
    }

    if (parameters["imei"] !== undefined) {
      queryParameters["imei"] = parameters["imei"];
    }

    if (parameters["bluetoothMac"] !== undefined) {
      queryParameters["bluetoothMac"] = parameters["bluetoothMac"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Given a piece of Personally Identifiable Information (PII), return the Systems Manager owner ID(s) associated with that identifier. These owner IDs can be used with the Systems Manager API endpoints to retrieve owner details. Exactly one identifier will be accepted.

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/smOwnersForKey
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/smOwnersForKey'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiSmOwnersForKey
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.username - The username of a Systems Manager user
     * @param {string} parameters.email - The email of a network user account or a Systems Manager device
     * @param {string} parameters.mac - The MAC of a network client device or a Systems Manager device
     * @param {string} parameters.serial - The serial of a Systems Manager device
     * @param {string} parameters.imei - The IMEI of a Systems Manager device
     * @param {string} parameters.bluetoothMac - The MAC of a Bluetooth client
 */
  MerakiDashboardApi.prototype.getNetworkPiiSmOwnersForKey = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/smOwnersForKey";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["username"] !== undefined) {
      queryParameters["username"] = parameters["username"];
    }

    if (parameters["email"] !== undefined) {
      queryParameters["email"] = parameters["email"];
    }

    if (parameters["mac"] !== undefined) {
      queryParameters["mac"] = parameters["mac"];
    }

    if (parameters["serial"] !== undefined) {
      queryParameters["serial"] = parameters["serial"];
    }

    if (parameters["imei"] !== undefined) {
      queryParameters["imei"] = parameters["imei"];
    }

    if (parameters["bluetoothMac"] !== undefined) {
      queryParameters["bluetoothMac"] = parameters["bluetoothMac"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the PII requests for this network or organization

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiRequests
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPiiRequests = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/requests";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Submit a new delete or restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -X POST -H 'Content-Type: application/json' --data-binary '{"type":"delete", "datasets":"["usage","events"]", "mac":"00:77:00:77:00:77"}' 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests'

```
 * @method
 * @name MerakiDashboardApi#createNetworkPiiRequests
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkPiiRequests - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkPiiRequests = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/requests";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkPiiRequests"] !== undefined) {
      body = parameters["createNetworkPiiRequests"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{id}
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests/[id]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPiiRequest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPiiRequest = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/requests/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a restrict processing PII request

## ALTERNATE PATH

```
/organizations/{organizationId}/pii/requests/{id}
```

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkPiiRequest
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkPiiRequest = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/pii/requests/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the SAML roles for this organization

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationSamlRoles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationSamlRoles = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/samlRoles";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles'
```
 * @method
 * @name MerakiDashboardApi#createOrganizationSamlRoles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createOrganizationSamlRoles - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createOrganizationSamlRoles = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/samlRoles";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    if (parameters["createOrganizationSamlRoles"] !== undefined) {
      body = parameters["createOrganizationSamlRoles"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```
 * @method
 * @name MerakiDashboardApi#getOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getOrganizationSamlRole = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/samlRoles/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```
 * @method
 * @name MerakiDashboardApi#updateOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateOrganizationSamlRole - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateOrganizationSamlRole = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/samlRoles/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["updateOrganizationSamlRole"] !== undefined) {
      body = parameters["updateOrganizationSamlRole"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Remove a SAML role

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```
 * @method
 * @name MerakiDashboardApi#deleteOrganizationSamlRole
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.organizationId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteOrganizationSamlRole = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/organizations/{organizationId}/samlRoles/{id}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{organizationId}", parameters["organizationId"]);

    if (parameters["organizationId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: organizationId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the security events

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/clients/{clientId}/securityEvents'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientSecurityEvents
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.clientId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {integer} parameters.t0 - The beginning of the timespan for the data. The maximum lookback period is 791 days from today.
     * @param {integer} parameters.t1 - The end of the timespan for the data. t1 can be a maximum of 791 days after t0.
     * @param {integer} parameters.timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 791 days. The default is 31 days.
     * @param {integer} parameters.perPage - The number of entries per page returned. Acceptable range is 3 - 1000.
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkClientSecurityEvents = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{clientId}/securityEvents";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{clientId}", parameters["clientId"]);

    if (parameters["clientId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: clientId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["perPage"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: perPage"));
      return deferred.promise;
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the target groups in this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmTargetGroups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.withDetails - Boolean indicating if the the ids of the devices or users scoped by the target group should be included in the response
 */
  MerakiDashboardApi.prototype.getNetworkSmTargetGroups = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/sm/targetGroups";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["withDetails"] !== undefined) {
      queryParameters["withDetails"] = parameters["withDetails"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a target group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My target group","scope":"none","tags":"[]","type":"devices"}' 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups'
```
 * @method
 * @name MerakiDashboardApi#createNetworkSmTargetGroups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkSmTargetGroups - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkSmTargetGroups = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/sm/targetGroups";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkSmTargetGroups"] !== undefined) {
      body = parameters["createNetworkSmTargetGroups"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a target group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups/[targetGroupId]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.targetGroupId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.withDetails - Boolean indicating if the the ids of devices or users scoped by the target group should be included in the response
 */
  MerakiDashboardApi.prototype.getNetworkSmTargetGroup = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/sm/targetGroups/{targetGroupId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{targetGroupId}", parameters["targetGroupId"]);

    if (parameters["targetGroupId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: targetGroupId"));
      return deferred.promise;
    }

    if (parameters["withDetails"] !== undefined) {
      queryParameters["withDetails"] = parameters["withDetails"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a target group

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My target group","scope":"none","tags":"[]","type":"devices"}' 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups/[targetGroupId]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.targetGroupId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmTargetGroup - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmTargetGroup = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/sm/targetGroups/{targetGroupId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{targetGroupId}", parameters["targetGroupId"]);

    if (parameters["targetGroupId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: targetGroupId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmTargetGroup"] !== undefined) {
      body = parameters["updateNetworkSmTargetGroup"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a target group from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/sm/targetGroups/[targetGroupId]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkSmTargetGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.targetGroupId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkSmTargetGroup = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/sm/targetGroups/{targetGroupId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{targetGroupId}", parameters["targetGroupId"]);

    if (parameters["targetGroupId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: targetGroupId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new profile containing a Cisco Clarity payload

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
 * @method
 * @name MerakiDashboardApi#createNetworkSmProfileClarity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkSmProfileClarity - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkSmProfileClarity = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/clarity";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkSmProfileClarity"] !== undefined) {
      body = parameters["createNetworkSmProfileClarity"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update an existing profile containing a Cisco Clarity payload

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
 * @method
 * @name MerakiDashboardApi#updateNetworkSmProfileClarity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmProfileClarity - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmProfileClarity = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/clarity/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmProfileClarity"] !== undefined) {
      body = parameters["updateNetworkSmProfileClarity"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a Cisco Clarity payload to an existing profile

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F 'VendorConfig=[ {"key":"cloud_asn1_server_host", "type":"manual_string", "value":"immunet.com"}, {"key":"cloud_asn1_server_port", "type":"manual_int", "value":443} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```
 * @method
 * @name MerakiDashboardApi#addNetworkSmProfileClarity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.addNetworkSmProfileClarity - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.addNetworkSmProfileClarity = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/clarity/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    if (parameters["addNetworkSmProfileClarity"] !== undefined) {
      body = parameters["addNetworkSmProfileClarity"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get details for a Cisco Clarity payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```
 * @method
 * @name MerakiDashboardApi#getNetworkSmProfileClarity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmProfileClarity = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/clarity/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a Cisco Clarity payload. Deletes the entire profile if it's empty after removing the payload.

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X DELETE \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"

```
 * @method
 * @name MerakiDashboardApi#deleteNetworkSmProfileClarity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkSmProfileClarity = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/clarity/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new profile containing a Cisco Umbrella payload

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
 * @method
 * @name MerakiDashboardApi#createNetworkSmProfileUmbrella
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkSmProfileUmbrella - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkSmProfileUmbrella = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/umbrella";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkSmProfileUmbrella"] !== undefined) {
      body = parameters["createNetworkSmProfileUmbrella"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update an existing profile containing a Cisco Umbrella payload

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
 * @method
 * @name MerakiDashboardApi#updateNetworkSmProfileUmbrella
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmProfileUmbrella - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmProfileUmbrella = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/umbrella/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmProfileUmbrella"] !== undefined) {
      body = parameters["updateNetworkSmProfileUmbrella"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a Cisco Umbrella payload to an existing profile

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F 'ProviderConfiguration=[ {"key":"internalDomains", "type":"manual_list", "value":["meraki.com", "cisco.com"] }, {"key":"user_id", "type":"manual_string", "value":"miles"} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```
 * @method
 * @name MerakiDashboardApi#addNetworkSmProfileUmbrella
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.addNetworkSmProfileUmbrella - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.addNetworkSmProfileUmbrella = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/umbrella/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    if (parameters["addNetworkSmProfileUmbrella"] !== undefined) {
      body = parameters["addNetworkSmProfileUmbrella"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get details for a Cisco Umbrella payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```
 * @method
 * @name MerakiDashboardApi#getNetworkSmProfileUmbrella
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmProfileUmbrella = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/umbrella/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a Cisco Umbrella payload. Deletes the entire profile if it's empty after removing the payload

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"

```
 * @method
 * @name MerakiDashboardApi#deleteNetworkSmProfileUmbrella
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.profileId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkSmProfileUmbrella = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profile/umbrella/{profileId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{profileId}", parameters["profileId"]);

    if (parameters["profileId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: profileId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Create a new Polaris app

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
 * @method
 * @name MerakiDashboardApi#createNetworkSmAppPolaris
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkSmAppPolaris - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkSmAppPolaris = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/app/polaris";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkSmAppPolaris"] !== undefined) {
      body = parameters["createNetworkSmAppPolaris"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get details for a Cisco Polaris app if it exists

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/app/polaris?bundleId=com.cisco.polaris"

```
 * @method
 * @name MerakiDashboardApi#getNetworkSmAppPolaris
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.bundleId - The bundle ID of the app to be found, defaults to com.cisco.ciscosecurity.app
 */
  MerakiDashboardApi.prototype.getNetworkSmAppPolaris = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/app/polaris";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["bundleId"] !== undefined) {
      queryParameters["bundleId"] = parameters["bundleId"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update an existing Polaris app

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
 * @method
 * @name MerakiDashboardApi#updateNetworkSmAppPolari
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.appId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmAppPolari - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmAppPolari = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/app/polaris/{appId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{appId}", parameters["appId"]);

    if (parameters["appId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: appId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmAppPolari"] !== undefined) {
      body = parameters["updateNetworkSmAppPolari"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a Cisco Polaris app

## SAMPLE REQUEST

```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X DELETE \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/app/polaris/[appId]"

```
 * @method
 * @name MerakiDashboardApi#deleteNetworkSmAppPolari
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.appId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkSmAppPolari = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/app/polaris/{appId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{appId}", parameters["appId"]);

    if (parameters["appId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: appId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the devices enrolled in an SM network with various specified fields and filters

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmDevices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
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
     * @param {string} parameters.batchToken - On networks with more than 1000 devices, the device list will be limited to 1000 devices per query.
      If there are more devices to be seen, a batch token will be returned as a part of the device list. To see the remainder of
      the devices, pass in the batchToken as a parameter in the next request. Requests made with the batchToken do not require
      additional parameters as the batchToken includes the parameters passed in with the original request. Additional parameters
      passed in with the batchToken will be ignored.
 */
  MerakiDashboardApi.prototype.getNetworkSmDevices = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/devices";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["fields"] !== undefined) {
      queryParameters["fields"] = parameters["fields"];
    }

    if (parameters["wifiMacs"] !== undefined) {
      queryParameters["wifiMacs"] = parameters["wifiMacs"];
    }

    if (parameters["serials"] !== undefined) {
      queryParameters["serials"] = parameters["serials"];
    }

    if (parameters["ids"] !== undefined) {
      queryParameters["ids"] = parameters["ids"];
    }

    if (parameters["scope"] !== undefined) {
      queryParameters["scope"] = parameters["scope"];
    }

    if (parameters["batchToken"] !== undefined) {
      queryParameters["batchToken"] = parameters["batchToken"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the owners in an SM network with various specified fields and filters

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/users'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmUsers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.usernames - Filter users by username(s). Multiple usernames can be passed in as comma separated values.
     * @param {string} parameters.emails - Filter users by email(s). Multiple emails can be passed in as comma separated values.
     * @param {string} parameters.ids - Filter users by id(s). Multiple ids can be passed in as comma separated values.
     * @param {string} parameters.scope - Specify a scope (one of all, none, withAny, withAll, withoutAny, or withoutAll) and a set of tags as comma separated values.
 */
  MerakiDashboardApi.prototype.getNetworkSmUsers = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/users";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["usernames"] !== undefined) {
      queryParameters["usernames"] = parameters["usernames"];
    }

    if (parameters["emails"] !== undefined) {
      queryParameters["emails"] = parameters["emails"];
    }

    if (parameters["ids"] !== undefined) {
      queryParameters["ids"] = parameters["ids"];
    }

    if (parameters["scope"] !== undefined) {
      queryParameters["scope"] = parameters["scope"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get the profiles associated with a user

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/user/[id]/deviceProfiles'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmUserDeviceProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmUserDeviceProfiles = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/user/{id}/deviceProfiles";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get the profiles associated with a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/deviceProfiles'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmDeviceProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmDeviceProfiles = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/deviceProfiles";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get a list of softwares associated with a user

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/user/[id]/softwares'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmUserSoftwares
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmUserSoftwares = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/user/{id}/softwares";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Get a list of softwares associated with a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/softwares'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmSoftwares
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmSoftwares = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/softwares";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the network adapters of a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/networkAdapters'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmNetworkAdapters
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmNetworkAdapters = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/networkAdapters";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the saved SSID names on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/wlanLists'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmWlanLists
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmWlanLists = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/wlanLists";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the security centers on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/securityCenters'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmSecurityCenters
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmSecurityCenters = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/securityCenters";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the restrictions on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/restrictions'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmRestrictions
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmRestrictions = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/restrictions";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the certs on a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/certs'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmCerts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmCerts = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/certs";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add, delete, or update the tags of a set of devices

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"scope":"withAny, old_tag","updateAction":"add","tags":"tag1,tag2"}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/tags'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDevicesTags
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmDevicesTags - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmDevicesTags = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/devices/tags";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmDevicesTags"] !== undefined) {
      body = parameters["updateNetworkSmDevicesTags"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Modify the fields of a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1284392014819","deviceFields":{"name":"My name"}}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/device/fields'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDeviceFields
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmDeviceFields - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmDeviceFields = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/device/fields";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmDeviceFields"] !== undefined) {
      body = parameters["updateNetworkSmDeviceFields"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Lock a set of devices

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ids":"\"1284392014819\""}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/lock'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDevicesLock
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmDevicesLock - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmDevicesLock = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/devices/lock";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmDevicesLock"] !== undefined) {
      body = parameters["updateNetworkSmDevicesLock"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Wipe a device

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1284392014819"}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/device/wipe'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDeviceWipe
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmDeviceWipe - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmDeviceWipe = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/device/wipe";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmDeviceWipe"] !== undefined) {
      body = parameters["updateNetworkSmDeviceWipe"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Force check-in a set of devices

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ids":"\"1284392014819\""}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/checkin'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDevicesCheckin
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmDevicesCheckin - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmDevicesCheckin = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/devices/checkin";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmDevicesCheckin"] !== undefined) {
      body = parameters["updateNetworkSmDevicesCheckin"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Move a set of devices to a new network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ids":"\"1284392014819\"","newNetwork":"N_24329156"}' 'https://api.meraki.com/api/v0/networks/[network_id]/sm/devices/move'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSmDevicesMove
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSmDevicesMove - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSmDevicesMove = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/devices/move";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSmDevicesMove"] !== undefined) {
      body = parameters["updateNetworkSmDevicesMove"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all the profiles in the network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/profiles'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmProfiles = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/profiles";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the client's daily cellular data usage history. Usage data is in kilobytes.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/cellularUsageHistory'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmCellularUsageHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSmCellularUsageHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/cellularUsageHistory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return historical records of various Systems Manager client metrics for desktop devices.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/performanceHistory'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmPerformanceHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.perPage - The number of entries per page returned
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkSmPerformanceHistory = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/performanceHistory";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return historical records of various Systems Manager network connection details for desktop devices.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/desktopLogs'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmDesktopLogs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.perPage - The number of entries per page returned
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkSmDesktopLogs = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/desktopLogs";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 *     Return historical records of commands sent to Systems Manager devices.
    <p>Note that this will include the name of the Dashboard user who initiated the command if it was generated
    by a Dashboard admin rather than the automatic behavior of the system; you may wish to filter this out
    of any reports.</p>


## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/deviceCommandLogs'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmDeviceCommandLogs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.perPage - The number of entries per page returned
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkSmDeviceCommandLogs = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/deviceCommandLogs";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns historical connectivity data (whether a device is regularly checking in to Dashboard).

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[network_id]/sm/[id]/connectivity'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSmConnectivity
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.perPage - The number of entries per page returned
     * @param {string} parameters.startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
     * @param {string} parameters.endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, next or prev page in the HTTP Link header should define it.
 */
  MerakiDashboardApi.prototype.getNetworkSmConnectivity = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{network_id}/sm/{id}/connectivity";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{network_id}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["perPage"] !== undefined) {
      queryParameters["perPage"] = parameters["perPage"];
    }

    if (parameters["startingAfter"] !== undefined) {
      queryParameters["startingAfter"] = parameters["startingAfter"];
    }

    if (parameters["endingBefore"] !== undefined) {
      queryParameters["endingBefore"] = parameters["endingBefore"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the splash login attempts for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/splashLoginAttempts?timespan=7200'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSplashLoginAttempts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.ssidNumber - Only return the login attempts for the specified SSID
     * @param {string} parameters.loginIdentifier - The username, email, or phone number used during login
     * @param {string} parameters.timespan - The timespan, in seconds, for the login attempts. The period will be from [timespan] seconds ago until now. The maximum timespan is 3 months
 */
  MerakiDashboardApi.prototype.getNetworkSplashLoginAttempts = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{id}/splashLoginAttempts";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{id}", parameters["id"]);

    if (parameters["id"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: id"));
      return deferred.promise;
    }

    if (parameters["ssidNumber"] !== undefined) {
      queryParameters["ssidNumber"] = parameters["ssidNumber"];
    }

    if (parameters["loginIdentifier"] !== undefined) {
      queryParameters["loginIdentifier"] = parameters["loginIdentifier"];
    }

    if (parameters["timespan"] !== undefined) {
      queryParameters["timespan"] = parameters["timespan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Display the splash page settings for the given SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/splashSettings'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSsidSplashSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSsidSplashSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids/{number}/splashSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Modify the splash page settings for the given SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"splashUrl":"https://www.custom_splash_url.com","useSplashUrl":true}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/splashSettings'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSsidSplashSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSsidSplashSettings - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSsidSplashSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids/{number}/splashSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSsidSplashSettings"] !== undefined) {
      body = parameters["updateNetworkSsidSplashSettings"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the SSIDs in a network. Supports networks with access points or wireless-enabled security appliances and teleworker gateways.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSsids
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSsids = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a single SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSsid
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSsid = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids/{number}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the attributes of an SSID

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My SSID","enabled":true}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSsid
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSsid - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSsid = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/ssids/{number}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSsid"] !== undefined) {
      body = parameters["updateNetworkSsid"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns the switch network settings

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/switch/settings'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSwitchSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSwitchSettings = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/switch/settings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update switch network settings

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"useCombinedPower":true,"powerExceptions":[{"serial":"Q234-ABCD-0001","powerType":"redundant"},{"serial":"Q234-ABCD-0002","powerType":"combined"},{"serial":"Q234-ABCD-0003","powerType":"combined"},{"serial":"Q234-ABCD-0004","powerType":"useNetworkSetting"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/switch/settings'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSwitchSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSwitchSettings - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSwitchSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/switch/settings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSwitchSettings"] !== undefined) {
      body = parameters["updateNetworkSwitchSettings"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the switch ports for a switch

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts'
```
 * @method
 * @name MerakiDashboardApi#getDeviceSwitchPorts
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getDeviceSwitchPorts = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/switchPorts";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a switch port

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts/[number]'
```
 * @method
 * @name MerakiDashboardApi#getDeviceSwitchPort
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getDeviceSwitchPort = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/switchPorts/{number}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a switch port

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts/[number]'
```
 * @method
 * @name MerakiDashboardApi#updateDeviceSwitchPort
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.number - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateDeviceSwitchPort - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateDeviceSwitchPort = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/devices/{serial}/switchPorts/{number}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    path = path.replace("{number}", parameters["number"]);

    if (parameters["number"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: number"));
      return deferred.promise;
    }

    if (parameters["updateDeviceSwitchPort"] !== undefined) {
      body = parameters["updateDeviceSwitchPort"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the syslog servers for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/syslogServers'
```
 * @method
 * @name MerakiDashboardApi#getNetworkSyslogServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkSyslogServers = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/syslogServers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the syslog servers for a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"servers":[{"host":"1.2.3.4","port":443,"roles":["Wireless event log","URLs"]}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/syslogServers'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkSyslogServers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkSyslogServers - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkSyslogServers = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/syslogServers";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkSyslogServers"] !== undefined) {
      body = parameters["updateNetworkSyslogServers"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List all available content filtering categories for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/contentFiltering/categories'
```
 * @method
 * @name MerakiDashboardApi#getNetworkContentFilteringCategories
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkContentFilteringCategories = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/contentFiltering/categories";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the content filtering settings for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/contentFiltering'
```
 * @method
 * @name MerakiDashboardApi#getNetworkContentFiltering
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkContentFiltering = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/contentFiltering";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the content filtering settings for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"allowedUrlPatterns":["http://www.example.org","http://help.com.au"],"blockedUrlPatterns":["http://www.example.com","http://www.betting.com"],"blockedUrlCategories":["meraki:contentFiltering/category/1","meraki:contentFiltering/category/7"],"urlCategoryListSize":"topSites"}' 'https://api.meraki.com/api/v0/networks/[networkId]/contentFiltering'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkContentFiltering
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkContentFiltering - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkContentFiltering = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/contentFiltering";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkContentFiltering"] !== undefined) {
      body = parameters["updateNetworkContentFiltering"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the appliance services and their accessibility rules

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices'
```
 * @method
 * @name MerakiDashboardApi#getNetworkFirewalledServices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkFirewalledServices = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/firewalledServices";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the accessibility settings of the given service ('ICMP', 'web', or 'SNMP')

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices/[service]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkFirewalledService
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.service - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkFirewalledService = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/firewalledServices/{service}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{service}", parameters["service"]);

    if (parameters["service"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: service"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Updates the accessibility settings for the given service ('ICMP', 'web', or 'SNMP')

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"access":"restricted","allowedIps":["123.123.123.1"]}' 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices/[service]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkFirewalledService
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.service - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkFirewalledService - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkFirewalledService = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/firewalledServices/{service}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{service}", parameters["service"]);

    if (parameters["service"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: service"));
      return deferred.promise;
    }

    if (parameters["updateNetworkFirewalledService"] !== undefined) {
      body = parameters["updateNetworkFirewalledService"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the 1:Many NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/oneToManyNatRules'
```
 * @method
 * @name MerakiDashboardApi#getNetworkOneToManyNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkOneToManyNatRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/oneToManyNatRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Set the 1:Many NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"publicIp":"146.11.11.13","uplink":"internet1","portRules":[{"name":"Rule 1","protocol":"tcp","publicPort":"9443","localIp":"192.168.128.1","localPort":"443","allowedIps":["any"]},{"name":"Rule 2","protocol":"tcp","publicPort":"8080","localIp":"192.168.128.1","localPort":"80","allowedIps":["10.82.110.0/24","10.82.111.0/24"]}]}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/oneToManyNatRules'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkOneToManyNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkOneToManyNatRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkOneToManyNatRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/oneToManyNatRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkOneToManyNatRules"] !== undefined) {
      body = parameters["updateNetworkOneToManyNatRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the 1:1 NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/oneToOneNatRules'
```
 * @method
 * @name MerakiDashboardApi#getNetworkOneToOneNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkOneToOneNatRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/oneToOneNatRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Set the 1:1 NAT mapping rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"name":"Service behind NAT","lanIp":"192.168.128.22","publicIp":"146.12.3.33","uplink":"internet1","allowedInbound":[{"protocol":"tcp","destinationPorts":["80"],"allowedIps":["10.82.112.0/24","10.82.0.0/16"]},{"protocol":"udp","destinationPorts":["8080"],"allowedIps":["10.81.110.5","10.81.0.0/16"]}]}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/oneToOneNatRules'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkOneToOneNatRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkOneToOneNatRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkOneToOneNatRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/oneToOneNatRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkOneToOneNatRules"] !== undefined) {
      body = parameters["updateNetworkOneToOneNatRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return the port forwarding rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/portForwardingRules'
```
 * @method
 * @name MerakiDashboardApi#getNetworkPortForwardingRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkPortForwardingRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/portForwardingRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update the port forwarding rules for an MX network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"lanIp":"192.168.128.1","allowedIps":["any"],"name":"Description of Port Forwarding Rule","protocol":"tcp","publicPort":"8100-8101","localPort":"442-443","uplink":"both"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/portForwardingRules'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkPortForwardingRules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkPortForwardingRules - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkPortForwardingRules = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/portForwardingRules";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkPortForwardingRules"] !== undefined) {
      body = parameters["updateNetworkPortForwardingRules"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the static routes for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```
 * @method
 * @name MerakiDashboardApi#getNetworkStaticRoutes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkStaticRoutes = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/staticRoutes";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a static route

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My route","subnet":"192.168.1.0/24","gatewayIp":"1.2.3.5"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```
 * @method
 * @name MerakiDashboardApi#createNetworkStaticRoutes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkStaticRoutes - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkStaticRoutes = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/staticRoutes";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkStaticRoutes"] !== undefined) {
      body = parameters["createNetworkStaticRoutes"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a static route

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```
 * @method
 * @name MerakiDashboardApi#getNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.srId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkStaticRoute = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/staticRoutes/{srId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{srId}", parameters["srId"]);

    if (parameters["srId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: srId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a static route

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My route","subnet":"192.168.1.0/24","fixedIpAssignments":"{}","reservedIpRanges":"[]"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.srId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkStaticRoute - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkStaticRoute = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/staticRoutes/{srId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{srId}", parameters["srId"]);

    if (parameters["srId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: srId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkStaticRoute"] !== undefined) {
      body = parameters["updateNetworkStaticRoute"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a static route from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkStaticRoute
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.srId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkStaticRoute = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/staticRoutes/{srId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{srId}", parameters["srId"]);

    if (parameters["srId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: srId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns the uplink settings for your MX network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/uplinkSettings'
```
 * @method
 * @name MerakiDashboardApi#getNetworkUplinkSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkUplinkSettings = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/uplinkSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Updates the uplink settings for your MX network.

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"bandwidthLimits":{"wan1":{"limitUp":1000000,"limitDown":1000000},"wan2":{"limitUp":1000000,"limitDown":1000000},"cellular":{"limitUp":51200,"limitDown":51200}}}' 'https://api.meraki.com/api/v0/networks/{networkId}/uplinkSettings'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkUplinkSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkUplinkSettings - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkUplinkSettings = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/uplinkSettings";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkUplinkSettings"] !== undefined) {
      body = parameters["updateNetworkUplinkSettings"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List the VLANs for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/vlans'
```
 * @method
 * @name MerakiDashboardApi#getNetworkVlans
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkVlans = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlans";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Add a VLAN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"id":"1234","name":"My VLAN","subnet":"192.168.1.0/24","applianceIp":"1.2.3.4"}' 'https://api.meraki.com/api/v0/networks/{networkId}/vlans'
```
 * @method
 * @name MerakiDashboardApi#createNetworkVlans
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.createNetworkVlans - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.createNetworkVlans = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlans";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["createNetworkVlans"] !== undefined) {
      body = parameters["createNetworkVlans"];
    }

    if (parameters["createNetworkVlans"] === undefined) {
      deferred.reject(
        new Error("Missing required  parameter: createNetworkVlans")
      );
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "POST",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Return a VLAN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/vlans/{vlanId}'
```
 * @method
 * @name MerakiDashboardApi#getNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.vlanId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkVlan = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlans/{vlanId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{vlanId}", parameters["vlanId"]);

    if (parameters["vlanId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: vlanId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Update a VLAN

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1234","networkId":"N_24329156","name":"My VLAN","applianceIp":"1.2.3.4","subnet":"192.168.1.0/24","fixedIpAssignments":"{}","reservedIpRanges":"[]","dnsNameservers":"google_dns"}' 'https://api.meraki.com/api/v0/networks/{networkId}/vlans/{vlanId}'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.vlanId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkVlan - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkVlan = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlans/{vlanId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{vlanId}", parameters["vlanId"]);

    if (parameters["vlanId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: vlanId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkVlan"] !== undefined) {
      body = parameters["updateNetworkVlan"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Delete a VLAN from a network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/{networkId}/vlans/{vlanId}'
```
 * @method
 * @name MerakiDashboardApi#deleteNetworkVlan
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.vlanId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.deleteNetworkVlan = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlans/{vlanId}";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{vlanId}", parameters["vlanId"]);

    if (parameters["vlanId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: vlanId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "DELETE",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Returns the enabled status of VLANs for the network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/vlansEnabledState'
```
 * @method
 * @name MerakiDashboardApi#getNetworkVlansEnabledState
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.getNetworkVlansEnabledState = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlansEnabledState";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Enable/Disable VLANs for the given network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"enabled":true}' 'https://api.meraki.com/api/v0/networks/{networkId}/vlansEnabledState'
```
 * @method
 * @name MerakiDashboardApi#updateNetworkVlansEnabledState
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {} parameters.updateNetworkVlansEnabledState - This collection of API calls provides an easy way to interact with a Cisco Meraki network
 */
  MerakiDashboardApi.prototype.updateNetworkVlansEnabledState = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/vlansEnabledState";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["updateNetworkVlansEnabledState"] !== undefined) {
      body = parameters["updateNetworkVlansEnabledState"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "PUT",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated connectivity info for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/connectionStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
  MerakiDashboardApi.prototype.getNetworkConnectionStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/connectionStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated connectivity info for this network, grouped by node

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/connectionStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDevicesConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
  MerakiDashboardApi.prototype.getNetworkDevicesConnectionStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/connectionStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated connectivity info for a given AP on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/connectionStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
  MerakiDashboardApi.prototype.getNetworkDeviceConnectionStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/connectionStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated connectivity info for this network, grouped by clients

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/connectionStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientsConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
  MerakiDashboardApi.prototype.getNetworkClientsConnectionStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/connectionStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated connectivity info for a given client on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/connectionStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientConnectionStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.clientId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
 */
  MerakiDashboardApi.prototype.getNetworkClientConnectionStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{clientId}/connectionStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{clientId}", parameters["clientId"]);

    if (parameters["clientId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: clientId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated latency info for this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/latencyStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
  MerakiDashboardApi.prototype.getNetworkLatencyStats = function(parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/latencyStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    if (parameters["fields"] !== undefined) {
      queryParameters["fields"] = parameters["fields"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated latency info for this network, grouped by node

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/latencyStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDevicesLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
  MerakiDashboardApi.prototype.getNetworkDevicesLatencyStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/latencyStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    if (parameters["fields"] !== undefined) {
      queryParameters["fields"] = parameters["fields"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated latency info for a given AP on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/latencyStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkDeviceLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.serial - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
  MerakiDashboardApi.prototype.getNetworkDeviceLatencyStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/devices/{serial}/latencyStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{serial}", parameters["serial"]);

    if (parameters["serial"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: serial"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    if (parameters["fields"] !== undefined) {
      queryParameters["fields"] = parameters["fields"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated latency info for this network, grouped by clients

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/latencyStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientsLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
  MerakiDashboardApi.prototype.getNetworkClientsLatencyStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/latencyStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    if (parameters["fields"] !== undefined) {
      queryParameters["fields"] = parameters["fields"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * Aggregated latency info for a given client on this network

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/latencyStats'
```
 * @method
 * @name MerakiDashboardApi#getNetworkClientLatencyStats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.clientId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.fields - Partial selection: If present, this call will return only the selected fields of ["rawDistribution", "avg"]. All fields will be returned by default. Selected fields must be entered as a comma separated string.
 */
  MerakiDashboardApi.prototype.getNetworkClientLatencyStats = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/clients/{clientId}/latencyStats";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    path = path.replace("{clientId}", parameters["clientId"]);

    if (parameters["clientId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: clientId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    if (parameters["fields"] !== undefined) {
      queryParameters["fields"] = parameters["fields"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };
  /**
 * List of all failed client connection events on this network in a given time range

## SAMPLE REQUEST

```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/failedConnections'
```
 * @method
 * @name MerakiDashboardApi#getNetworkFailedConnections
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.networkId - This collection of API calls provides an easy way to interact with a Cisco Meraki network
     * @param {string} parameters.t0 - Start of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.t1 - End of the requested time range in seconds since epoch (Required)
     * @param {string} parameters.ssid - Filter results by SSID
     * @param {string} parameters.vlan - Filter results by VLAN
     * @param {string} parameters.apTag - Filter results by AP Tag
     * @param {string} parameters.serial - Filter by AP
     * @param {string} parameters.clientId - Filter by client
 */
  MerakiDashboardApi.prototype.getNetworkFailedConnections = function(
    parameters
  ) {
    if (parameters === undefined) {
      parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,
      path = "/networks/{networkId}/failedConnections";
    var body = {},
      queryParameters = {},
      headers = {},
      form = {};

    headers = this.setAuthHeaders(headers);
    headers["Accept"] = ["application/json"];
    headers["Content-Type"] = ["application/json"];

    path = path.replace("{networkId}", parameters["networkId"]);

    if (parameters["networkId"] === undefined) {
      deferred.reject(new Error("Missing required  parameter: networkId"));
      return deferred.promise;
    }

    if (parameters["t0"] !== undefined) {
      queryParameters["t0"] = parameters["t0"];
    }

    if (parameters["t1"] !== undefined) {
      queryParameters["t1"] = parameters["t1"];
    }

    if (parameters["ssid"] !== undefined) {
      queryParameters["ssid"] = parameters["ssid"];
    }

    if (parameters["vlan"] !== undefined) {
      queryParameters["vlan"] = parameters["vlan"];
    }

    if (parameters["apTag"] !== undefined) {
      queryParameters["apTag"] = parameters["apTag"];
    }

    if (parameters["serial"] !== undefined) {
      queryParameters["serial"] = parameters["serial"];
    }

    if (parameters["clientId"] !== undefined) {
      queryParameters["clientId"] = parameters["clientId"];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request(
      "GET",
      domain + path,
      parameters,
      body,
      headers,
      queryParameters,
      form,
      deferred
    );

    return deferred.promise;
  };

  return MerakiDashboardApi;
})();

exports.MerakiDashboardApi = MerakiDashboardApi;
