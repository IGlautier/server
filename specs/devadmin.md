# Device Admin requirements

An IOT device needs updating. In the first instance we will restrict the scope of IOT administration to configuration only

See below for firmware update considerations





## iot-device administration

A iot-device is not required to support webinos synchronization. Therefore any iot-device configuration operations that are performed as standard using sync – particularly policy configuration and credentials configuration – must be accomplished by alternative means.

iot-device configuration requirements cover:
* common configuration requirements, notably access control policy;
* application-specific configuration requirements, including the configuration needs of the supported APIs and the connection technology.

A minimal RPC-based API is defined for remote administration of iot-devices. Support for this protocol is conditionally required: if a iot-device supports any remote configuration mechanism, it must at least support the iot-device Admin API. Certain iot-devices might be so limited as to be unable to support remote configuration, or their functionality might be so limited as to make it unnecessary. 

Also, more powerful iot-devices might provide a locally-hosted web app for configuration; in this case, the authentication and access control requirements for such an interface are specified.

The API for common configuration requirements is specified here, and a generic settings mechanism is defined that may be used for application-specific configuration requirements. For particular applications, iot-devices may provide additional APIs for their specific configuration requirements.

## iot-device configuration API

Whilst it would be appealing for a iot-device to expose a REST configuration API, it would not be supportable, or a justifiable use of the available resources on the smaller iot-devices. Instead, a very simple JSON-RPC-based configuration API is defined, together with a mapping to a REST API that can be implemented at a proxy if desired.

The configuration API is defined to be as simple as possible. There is a single flat space of configuration key strings. The operations supported by the API are:

* keys with primitive values:
 * support for string and number value types;
 * get and set operations;
* keys whose values are an unordered set of primitive values:
 * support for string and number member value types;
 * get and set operations on the collection as a whole;
 * add and remove operations on members of the collection.

The JSON-RPC interface is served as a webinos API in the same way as other webinos APIs. The API is not discoverable, but is accessed with well-known identifiers as follows:
* URI: @http://webinos.org/api/pzp-admin@
* Instance: @default@

The API exposes a single interface Config, with the following operations.

### Config.get

Gets the primitive value of a configuration entry.
An error is returned from this operation if one of the following conditions arises:
* the key is not known or not configurable on this iot-device;
* the caller does not have permission to read this key.

**Params**:
* key: string key of the configuration element;

**Result**:
* the JSON-encoded value of the configuration element. If the element has a primitive value, this is the JSON representation of the Number or String value. If the configuration element has a collection value, this is the JSON representation of an array containing the members of the collection; order is insignificant.

### JSON-RPC request

<pre>
JSON: Object
{ id : 1
, jsonrpc : "2.0" 
, method : "http://webinos.org/api/psp-admin@default.Config.get" 
, params :
  { key : <key>
  }
}
</pre>

### JSON-RPC response

<pre>
JSON: Object
{ id: 1
, jsonrpc: "2.0" 
, result: <value>
}
</pre>

### REST request

<pre>
GET /config/<key>
Accept: application/json
</pre>
<key>  must be URL-encoded before forming the request path.

A successful request results in a 200 response with a response body containing the JSON representation of the primitive or collection value.

Error responses are indicated by a relevant status code and optionally an informative error message in the response body.

### Config.set

Sets the primitive value of a configuration entry.

An error is returned from this operation if one of the following conditions arises:
* the key is not known or not configurable on this iot-device;
* the caller does not have permission to modify this key;
* an invalid value or an value with invalid type is specified.

**Params**:
* key: string key of the configuration element;
* value: the JSON-encoded value to set. If the configuration element has a primitive value, this is the JSON representation of the Number or String value. If the configuration element has a collection value, this is the JSON representation of an array containing the members of the collection; order is insignificant, and duplicate members are silently discarded.

**Result**:
* none.

#### JSON-RPC request

<pre>
JSON: Object
{ id : 1
, jsonrpc : "2.0" 
, method : "http://webinos.org/api/psp-admin@default.Config.set" 
, params :
  { key : <key>
  , value : <value>
  }
}
</pre>

#### REST request

<pre>
PUT /config/<key>
Content-Type: application/json
<value>
</pre>

**key**  must be URL-encoded before forming the request path.
**value** is the JSON representation of the primitive or collection value.

A successful request results in a 200 response with a response body containing the JSON representation of the set primitive or collection value.

Error responses are indicated by a relevant status code and optionally an informative error message in the response body.

### Config.add

Inserts a new primitive value into a configuration entry of collection type.

An error is returned from this operation if one of the following conditions arises:
* the key is not known or not configurable on this iot-device;
* the caller does not have permission to modify this key;
* the key is not of collection type;
* an invalid value or an value with invalid type is specified.

If the given value is already present, the operation silently does nothing.

**Params**:
* key: string key of the configuration element;
* value: the JSON-encoded value to add. This is the JSON representation of the Number or String value.

**Result**:
* none.


#### JSON-RPC request

<pre>
JSON: Object
{ id : 1
, jsonrpc : "2.0" 
, method : "http://webinos.org/api/psp-admin@default.Config.add" 
, params :
  { key : <key>
  , value : <value>
  }
}
</pre>

####	REST request

<pre>
POST /config/<key>
Content-Type: application/json
<value>
</pre>


**key**  must be URL-encoded before forming the request path.
**value** is the JSON representation of the primitive value.

A successful request results in a 201 response with a response body containing the JSON representation of the added primitive value.

Error responses are indicated by a relevant status code and optionally an informative error message in the response body.

### Config.remove

Removes a primitive value from a configuration entry of collection type.

An error is returned from this operation if one of the following conditions arises:
* the key is not known or not configurable on this iot-device;
* the caller does not have permission to modify this key;
* the key is not of collection type;
* an invalid value or an value with invalid type is specified.

If the given value is not a member of the collection, the operation silently does nothing.

**Params**:
* key: string key of the configuration element;
* value: the JSON-encoded value to remove. This is the JSON representation of the Number or String value.

**Result**:
* none.


#### JSON-RPC request

<pre>
JSON: Object
{ id : 1
, jsonrpc : "2.0" 
, method : "http://webinos.org/api/psp-admin@default.Config.add" 
, params :
  { key : <key>
  , value : <value>
  }
}
</pre>

#### REST request

<pre>
DELETE /config/<key>/<value>
Content-Type: application/json
</pre>

<**key**> and <**value**>  must each be URL-encoded before forming the request path.

A successful request results in a 200 response with a response body containing the JSON representation of the removed primitive value.

Error responses are indicated by a relevant status code and optionally an informative error message in the response body.

## TLS-capable iot-device

TLS-capable iot-device must expose the JSON-RPC admin API if it offers any remote configuration capability; any remotely configurable items must be configurable through that API.

A TLS-capable iot-device may also serve the REST API from a local HTTP server.

More capable iot-devices will typically serve an administration web app in addition to the API, allowing users for example to upload certificates directly from the admin web page.

## Tethered iot-device

A tethered iot-device must expose the JSON-RPC admin API if it offers any remote configuration capability; any remotely configurable items must be configurable through that API.

A proxy to a tethered iot-device may also expose the REST API, proxying requests to the JSON-RPC API.

## Admin API access control

The Admin API for a iot-device is clearly sensitive and must only be exposed to suitably authenticated clients. Once a device is enrolled, access to the admin API must be permitted only to clients in the same Personal Zone.

Prior to enrolment, however, a iot-device will typically initially be in a bootstrap mode and will have an unprotected admin interface, with that interface being used to set up and enrol the device, thereby establishing admin API access control, as part of commissioning the unit.  A hardware reset would be required to regain access, also clearing all sensitive data, if relevant credentials were lost or compromised.

Devices that are not remotely configurable must have some means of locally connecting and configuring the device (eg a physical serial port dedicated to that purpose). No APIs are served in bootstrap mode. Local methods for enrolment depend on the nature of the device and its deployment, and are outside the scope of this specification.

In bootstrap mode, for devices supporting the JSON-RPC admin API, no APIs are available through the RPC port other than the admin API. The requirements for admin API access control, both in bootstrap and active mode, are different according to the class of iot-device.

### TLS-capable iot-device

In bootstrap mode, as well as in active mode, connections to the JSON_RPC port are made over TLS. In bootstrap mode, the iot-device exposes a bootstrap server certificate issued by the manufacturer. The iot-device may require clients to authenticate using a client certificate when in bootstrap mode; if so, that client certificate and key must also be issued by the manufacturer. (This is analogous to devices being shipped with a temporary manufacturer-set admin password.)

Once the enrolment process has been completed using the admin API, the device transitions to active mode, and the bootstrap credentials, if any, are no longer granted access to the admin API.

For the REST admin API, and any HTML admin web app, bootstrap authentication may be performed either via client certificates, or using another HTTP authentication mechanism (eg basic auth with a manufacturer-supplied bootstrap password).

### Tethered iot-device

A tethered iot-device uses bus-specific access control mechanisms for access to the JSON-RPC interface. For example, in a Bluetooth-attached iot-device, a proxy would first have to pair with the device before having access to the JSON-RPC port.

For a tethered iot-device, the bootstrap process involves configuration of the device by the proxy via the JSON-RPC admin API. At all times the proxy only permits access to the admin API (whether by JSON-RPC or the REST API) to peers belonging to the same Personal Zone. During bootstrap, a proxy does not forward any non-admin API requests from external peers.

##Firmware update requirements

We do not propose to directly address firmware update requirements within the picosec project.

There are three common mechanism

* Proprietary HTTP post: such as typcially supported by routers and other consumer hardware
* OMA firmware management object http://technical.openmobilealliance.org/Technical/technical-information/release-program/current-releases/fumo-archive
* Broadband forum RT-069  http://en.wikipedia.org/wiki/TR-069
	* http://www.broadband-forum.org/technical/download/TR-069.pdf


