#Invocation

An IOT device must be able to emit sensor readings and and IOT application must be able to consume the same. 

A messaging protocols such as MQTT, obeying a publish subscribe pattern is capable of implementing this minimal requirement.

However there are many instances where this basic method is insufficient.

For example

* Discovery: discovery is a request against one or more devices, which can be responded to either synchronously or asynchronously.
* Administration: device configuration request are levied against a device and need to be responded to in clear fashion
* Database requests: iot-devices are not necessarily connected permanently to the internet. It is a requirement to be able to both cache data on device and respond to data queries
* Complex data requests: it is a frequent requirement to be able to request data "pushes" only when certain criteria are fulfilled. This is simply to optimse power and networking resource hogging. For example
	* emit location ping when exiting an geofence
	* throttle data updates so that only interesting data points are emitted
	* emit only deltas exceeding a predetermined amount.

For these and other reasons it is useful to have a general purpose invocation mechanism where an IOT application can make are remote API request against a device and vice versa.

This mechanism must support asynchronous responses.

We currently have two mechanisms in scope to handle this requirement. 



##JSON-RPC

JSON-RPC is a simple API remoting mechanism designed to be lightweight and simple.



### Overview
JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, or in many various message passing environments. It uses JSON (RFC 4627) as data format.

It is designed to be simple!

### Conventions
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

Since JSON-RPC utilizes JSON, it has the same type system (see http://www.json.org or RFC 4627). JSON can represent four primitive types (Strings, Numbers, Booleans, and Null) and two structured types (Objects and Arrays). The term "Primitive" in this specification references any of those four primitive JSON types. The term "Structured" references either of the structured JSON types. Whenever this document refers to any JSON type, the first letter is always capitalized: Object, Array, String, Number, Boolean, Null. True and False are also capitalized.

All member names exchanged between the Client and the Server that are considered for matching of any kind should be considered to be case-sensitive. The terms function, method, and procedure can be assumed to be interchangeable.

The Client is defined as the origin of Request objects and the handler of Response objects. 
The Server is defined as the origin of Response objects and the handler of Request objects. 

One implementation of this specification could easily fill both of those roles, even at the same time, to other different clients or the same client. This specification does not address that layer of complexity.

### Compatibility
JSON-RPC 2.0 Request objects and Response objects may not work with existing JSON-RPC 1.0 clients or servers. However, it is easy to distinguish between the two versions as 2.0 always has a member named "jsonrpc" with a String value of "2.0" whereas 1.0 does not. Most 2.0 implementations should consider trying to handle 1.0 objects, even if not the peer-to-peer and class hinting aspects of 1.0.

### Request object
A rpc call is represented by sending a Request object to a Server. The Request object has the following members:

**jsonrpc**
A String specifying the version of the JSON-RPC protocol. MUST be exactly "2.0".
**method**
A String containing the name of the method to be invoked. Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.
**params**
A Structured value that holds the parameter values to be used during the invocation of the method. This member MAY be omitted.
**id**
An identifier established by the Client that MUST contain a String, Number, or NULL value if included. If it is not included it is assumed to be a notification. The value SHOULD normally not be Null [1] and Numbers SHOULD NOT contain fractional parts [2]
The Server MUST reply with the same value in the Response object if included. This member is used to correlate the context between the two objects.

[1] The use of Null as a value for the id member in a Request object is discouraged, because this specification uses a value of Null for Responses with an unknown id. Also, because JSON-RPC 1.0 uses an id value of Null for Notifications this could cause confusion in handling.

[2] Fractional parts may be problematic, since many decimal fractions cannot be represented exactly as binary fractions.

#### Notification
A Notification is a Request object without an "id" member. A Request object that is a Notification signifies the Client's lack of interest in the corresponding Response object, and as such no Response object needs to be returned to the client. The Server MUST NOT reply to a Notification, including those that are within a batch request.

Notifications are not confirmable by definition, since they do not have a Response object to be returned. As such, the Client would not be aware of any errors (like e.g. "Invalid params","Internal error").

#### Parameter Structures
If present, parameters for the rpc call MUST be provided as a Structured value. Either by-position through an Array or by-name through an Object.

* by-position: params MUST be an Array, containing the values in the Server expected order.
* by-name: params MUST be an Object, with member names that match the Server expected parameter names. The absence of expected names MAY result in an error being generated. The names MUST match exactly, including case, to the method's expected parameters.

### Response object
When a rpc call is made, the Server MUST reply with a Response, except for in the case of Notifications. The Response is expressed as a single JSON Object, with the following members:

**jsonrpc**
A String specifying the version of the JSON-RPC protocol. MUST be exactly "2.0".
**result**
This member is REQUIRED on success.
This member MUST NOT exist if there was an error invoking the method.
The value of this member is determined by the method invoked on the Server.
**error**
This member is REQUIRED on error.
This member MUST NOT exist if there was no error triggered during invocation.
The value for this member MUST be an Object as defined in section 5.1.
**id**
This member is REQUIRED.
It MUST be the same as the value of the id member in the Request Object.
If there was an error in detecting the id in the Request object (e.g. Parse error/Invalid Request), it MUST be Null.

Either the result member or error member MUST be included, but both members MUST NOT be included.

#### Error object
When a rpc call encounters an error, the Response Object MUST contain the error member with a value that is a Object with the following members:

**code**
A Number that indicates the error type that occurred.
This MUST be an integer.
**message**
A String providing a short description of the error.
The message SHOULD be limited to a concise single sentence.
**data**
A Primitive or Structured value that contains additional information about the error.
This may be omitted.

The value of this member is defined by the Server (e.g. detailed error information, nested errors etc.).


The error codes from and including -32768 to -32000 are reserved for pre-defined errors. Any code within this range, but not defined explicitly below is reserved for future use. The error codes are nearly the same as those suggested for XML-RPC at the following url: http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php

code	message	meaning
-32700	Parse error	Invalid JSON was received by the server.
An error occurred on the server while parsing the JSON text.
-32600	Invalid Request	The JSON sent is not a valid Request object.
-32601	Method not found	The method does not exist / is not available.
-32602	Invalid params	Invalid method parameter(s).
-32603	Internal error	Internal JSON-RPC error.
-32000 to -32099	Server error	Reserved for implementation-defined server-errors.
The remainder of the space is available for application defined errors.

### Batch
To send several Request objects at the same time, the Client MAY send an Array filled with Request objects.

The Server should respond with an Array containing the corresponding Response objects, after all of the batch Request objects have been processed. A Response object SHOULD exist for each Request object, except that there SHOULD NOT be any Response objects for notifications. The Server MAY process a batch rpc call as a set of concurrent tasks, processing them in any order and with any width of parallelism.

The Response objects being returned from a batch call MAY be returned in any order within the Array. The Client SHOULD match contexts between the set of Request objects and the resulting set of Response objects based on the id member within each Object.

If the batch rpc call itself fails to be recognized as an valid JSON or as an Array with at least one value, the response from the Server MUST be a single Response object. If there are no Response objects contained within the Response array as it is to be sent to the client, the server MUST NOT return an empty Array and should return nothing at all.

### Examples
Syntax:

```
--> data sent to Server
<-- data sent to Client
```

rpc call with positional parameters:
```
--> {"jsonrpc": "2.0", "method": "subtract", "params": [42, 23], "id": 1}
<-- {"jsonrpc": "2.0", "result": 19, "id": 1}

--> {"jsonrpc": "2.0", "method": "subtract", "params": [23, 42], "id": 2}
<-- {"jsonrpc": "2.0", "result": -19, "id": 2}
```

rpc call with named parameters:
```
--> {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
<-- {"jsonrpc": "2.0", "result": 19, "id": 3}

--> {"jsonrpc": "2.0", "method": "subtract", "params": {"minuend": 42, "subtrahend": 23}, "id": 4}
<-- {"jsonrpc": "2.0", "result": 19, "id": 4}
a Notification:

--> {"jsonrpc": "2.0", "method": "update", "params": [1,2,3,4,5]}
--> {"jsonrpc": "2.0", "method": "foobar"}
```

rpc call of non-existent method:
```
--> {"jsonrpc": "2.0", "method": "foobar", "id": "1"}
<-- {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "1"}
```

rpc call with invalid JSON:
```
--> {"jsonrpc": "2.0", "method": "foobar, "params": "bar", "baz]
<-- {"jsonrpc": "2.0", "error": {"code": -32700, "message": "Parse error"}, "id": null}
```

rpc call with invalid Request object:
```
--> {"jsonrpc": "2.0", "method": 1, "params": "bar"}
<-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
```
rpc call Batch, invalid JSON:
```
--> [
  {"jsonrpc": "2.0", "method": "sum", "params": [1,2,4], "id": "1"},
  {"jsonrpc": "2.0", "method"
]
<-- {"jsonrpc": "2.0", "error": {"code": -32700, "message": "Parse error"}, "id": null}
```
rpc call with an empty Array:
```
--> []
<-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
rpc call with an invalid Batch (but not empty):
--> [1]
<-- [
  {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
]
```
rpc call with invalid Batch:
```
--> [1,2,3]
<-- [
  {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null},
  {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null},
  {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
]
```

rpc call Batch:
```
--> [
        {"jsonrpc": "2.0", "method": "sum", "params": [1,2,4], "id": "1"},
        {"jsonrpc": "2.0", "method": "notify_hello", "params": [7]},
        {"jsonrpc": "2.0", "method": "subtract", "params": [42,23], "id": "2"},
        {"foo": "boo"},
        {"jsonrpc": "2.0", "method": "foo.get", "params": {"name": "myself"}, "id": "5"},
        {"jsonrpc": "2.0", "method": "get_data", "id": "9"} 
    ]
<-- [
        {"jsonrpc": "2.0", "result": 7, "id": "1"},
        {"jsonrpc": "2.0", "result": 19, "id": "2"},
        {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null},
        {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "5"},
        {"jsonrpc": "2.0", "result": ["hello", 5], "id": "9"}
    ]
```

rpc call Batch (all notifications):
```
--> [
        {"jsonrpc": "2.0", "method": "notify_sum", "params": [1,2,4]},
        {"jsonrpc": "2.0", "method": "notify_hello", "params": [7]}
    ]
<-- //Nothing is returned for all notification batches
```

### Extensions
Method names that begin with rpc. are reserved for system extensions, and MUST NOT be used for anything else. Each system extension is defined in a related specification. All system extensions are OPTIONAL.

###JSON-RPC bindings


#### Routing Algorithm 

##### Message validation

The message metadata shall be checked at both sender/publisher and receiver/subscriber sides to ensure validity, well-formedness and consistency. 

Message validation failure MAY result in automatic generation and sending of delivery notification messages by the checking party if it's not the message source and the message requires delivery notification. This kind of behaviour, however, is implementation-defined. Failure to validate a message SHALL prevent the message from being further processed. 

Errors during the validation phase when the message source is local SHALL, instead, result in appropriate exceptions being thrown at the application-level.

##### Route Determination

The route determination decides how each recipient is to be reached. In the route determination phase the routing manager SHALL check the recipient and determine whether it is local or remote. In the former case, it SHALL ensure that the recipient actually exists and is reachable upon policy restrictions and, if this condition does not hold true, it SHOULD automatically generate and send a delivery notification message to inform the message source. In the latter case it SHALL determine whether the recipient is reachable within the local networks the device is connected to or not, and also which network interface is going to be used to reach the recipient, so that this information is available in the policy enforcement phase.

Route determination for messages SHALL be performed once per recipient, so that individual failures SHALL only affect one message/recipient combination. Failures during the route determination phase SHALL prevent the message from being further processed for that message/recipient combination.

##### Application-level routing

The message handling functionality exposed to the application, at the lowest level, consists of a restricted set of conceptually simple operations: generating and sending messages, or forwarding them, and registering listeners for incoming messages.

This implies that the message routing manager SHALL be able to somehow create the JavaScript representations of incoming message objects and to properly trigger the execution of the relevant listener callbacks.

Each application SHALL be allowed to handle messages from/to addressable entities that it "owns" (e.g., the application itself, the services it exposes), obviously according to the constraints imposed by local policy rules and authorizations, hence it SHALL be able to both receive messages directed to any addressable entity that it owns and to send/forward message on the behalf of any addressable entity it owns.

Other than that, at this level, the behaviour of the system is highly dependent on the actual webinos inter-application messaging API specification, hence that document is to be considered the reference for determining whether a given implementation is in conformance or not.

##### Network-level routing 

The network-level routing algorithm SHALL be based on the defined addressing scheme. 

Each routing entity SHALL register itself with its parent node and child node if the other parties have not registered themselves with this routing entity. A successful registration process SHALL result in an entry or record in local routing table for both parties that registering and being registered with. 

On receiving a message, the receiver checks if itself is the message destination. If so, based on the message type, correspondent handler functions/callbacks MAY be called. For example,  if a JSON RPC type of message is received, the following procedure May happen:
* Message destination calls rpchandler to handle the message. 
* RPC result is packed within a new message object. Return route back to message origin follows the same routing rule as any message experienced.
* When RPC result is received by the message origin, if a callback was defined during creating message, this callback will be executed.  

In the case that the message receiver is not the final destination, the receiver SHALL forward the message. When there is no routing information about the final destination available at this message receiver, it SHALL look up the routing table for the next available hop to the destination. 

####Message Object

##### Generic Message Object 

Each message results in the creation of a message object. A generic message object is defined here. Any user or system specified message object will be a subclass of the generic message object. The generic message object includes the following attributes:




| *Attribute*      | *Description* | *Mandatory* | *Data type* |
|-----------------------------------------------------------
| type            | Identifies the message type and determines payload semantics | Yes | String that matches the following regular expression: [_a-zA-Z][_a-zA-Z0-9]* |
| from            | Represents the entity that originally sent the message | Yes | Addressable entity object reference |
| to              | destination entity| Yes | addressable entity object reference |
| id              | Message identifier | Yes | String identifying the message|
| timestamp       | Moment in time in which the message is generated by the original message source | No | A suitable date/time representation with millisecond precision or better |
| expires         | Moment in time past which the message is no more valid or meaningful | No | A suitable date/time representation with millisecond precision or better |
| deliveryReceipt | Indicates whether the sending entity wants to be notified by the receiving entities about the result of the message delivery | No | Boolean value |
| payload         | Message type-specific data | No | String |

This specification does not demand the usage of a specific serialization for transmitting messages, yet it presupposes that:

* the actual serialization has a one-to-one mapping with Unicode code points for addresses and payload data;
* a one-to-one mapping between addressable entities and address strings is defined.

The 'id' attribute is used by the sender to track if a response or error message that it might receive is in relation to that message.

It is up to the sender of the message whether the value of the 'id' attribute is unique only within the current session or is globally unique.

#### Delivery Notification Message object

The delivery notification protocol is part of the core webinos message handling protocol and it provides a handful of ICMP-like functionality to the system.

A delivery notification message SHOULD be generated when an entity receives or is about to receive an message having the "deliveryReceipt" attribute specified as true. The notification message MAY be generated at the destination of message delivery or at the router on the path when there is issue to pass the message on, e.g. message validation fails or the router couldn't find next hop to deliver the message. 

The Delivery notification message object is a subclass of generic message object. In order for a delivery notification message to be considered valid, the following attributes MUST be set as hereby described:

| *Attribute* | *Valid values* |
|--------------------------------
| type | "deliveryNotification" |
| to | The "to" MUST be the entity that this notification was generated or, if none, the entity is specified by the Source attribute |
| id | Reference to the message because of which this notification was generated |
| deliveryReceipt | false |
| payload | String |

The Payload attribute MUST be specified as one of the following values:

| *Value* | *Meaning* |
|---------|---------|
| "ok" | Message successfully delivered |
| "duplicate" | A message with the same ID was already delivered to the recipient |
| "invalid" | The recipient got an invalid message (e.g., transmission error) |
| "badDestination" | The intended recipient is unknown or unreachable |
| "expired" | The message expired before the actual delivery, according to its "Expiry timestamp" attribute |
| "refused" | The message could not be received because of lack of authorization and/or policy settings |
| "noReference" | The recipient does not hold a local reference to the message specified by the "In response to" attribute |

#### RPC Message Object

The RPC Message  Object message object is also a subclass of generic message object. It basically wraps
[[Messaging_and_Routing#51-JSONRPC2.0|JSONRPC2.0]] objects and batches into webinos messages, hence concepts, terminology, payload syntax and semantics, and behaviour are meant to be aligned with that specification.

A JSON-RPC 2.0 request object or request batch is wrapped into a webinos RPC request message that, in order to be considered valid, MUST have the following attributes set as hereby described:

| *Attribute* | *Valid values* |
|--
| type | "JSONRPC20Request" |
| id | Identity of the RPC request message |
| payload | JSON-RPC 2.0 request object or request batch |

When an entity offering RPC interfaces receives an RPC request message that does not contain a notification or a notification-only batch and said entity is a primary recipient of that message, it SHOULD generate and send an RPC response message, possibly according to specific policy rules.

Similarly to webinos RPC request messages, a JSON-RPC 2.0 response object or response batch is wrapped into a webinos RPC response message that, in order to be considered valid, MUST have the following attributes set as hereby described:

| *Attribute* | *Valid values* |
|--------------------------------
| type 	| "JSONRPC20Response" |
| to 	| The "to" set MUST contain only a reference to the entity specified by the "to" attribute in the RPC request message because of which this RPC response message was generated |
| id 	|Reference to the RPC request message because of which this RPC response message was generated 											|
| payload | JSON-RPC 2.0 response object or response batch 		|

*Note*: the JSON-RPC 2.0 specification states that notifications MUST NOT be replied to, and the same holds true for this specification; nevertheless it is still possible to use the "deliveryReceipt" attribute to be informed about the delivery of an RPC request message, even if it contains a notification or a notification-only batch.

This protocol is meant to be automatically handled by the WRT without requiring any extra effort on the developer side: the message  Handling API and the routing manager SHALL prevent applications from creating and receiving messages whose type is "JSONRPC20Request" or "JSONRPC20Response", while it SHALL be possible to expose RPC interfaces by describing them in the config.xml file, as specified in the Foundations section of this specification, and the WRT SHALL automatically create functions with corresponding names into the local JavaScript object that represents a discovered service, mapping calls to those functions to asynchronous RPC requests and responses operated via this protocol.

#### PROP Message Object

PROP message type is created by webinos for TLS session set-up and communications between webinos core components. It MUST have the following attributes set as hereby described:

| *Attribute* | *Valid values* |
|--
| type | "Prop" |
| to |destination entity|
| id |Reference to the Prop message|
| payload | Prop message body |



http://www.jsonrpc.org/specification



##Optional BSON binding

http://bsonspec.org/

BSON [bee · sahn], short for Bin­ary JSON, is a bin­ary-en­coded seri­al­iz­a­tion of JSON-like doc­u­ments. Like JSON, BSON sup­ports the em­bed­ding of doc­u­ments and ar­rays with­in oth­er doc­u­ments and ar­rays. BSON also con­tains ex­ten­sions that al­low rep­res­ent­a­tion of data types that are not part of the JSON spec. For ex­ample, BSON has a Date type and a BinData type.

BSON can be com­pared to bin­ary inter­change for­mats, like Proto­col Buf­fers. BSON is more "schema-less" than Proto­col Buf­fers, which can give it an ad­vant­age in flex­ib­il­ity but also a slight dis­ad­vant­age in space ef­fi­ciency (BSON has over­head for field names with­in the seri­al­ized data).

BSON may be required in IOT devices for efficiency purposes

The full specification

http://bsonspec.org/spec.html

####Specification Version 1.0

BSON is a binary format in which zero or more key/value pairs are stored as a single entity. We call this entity a document.

The following grammar specifies version 1.0 of the BSON standard. We've written the grammar using a pseudo-BNF syntax. Valid BSON data is represented by the document non-terminal.

####Basic Types

The following basic types are used as terminals in the rest of the grammar. Each type must be serialized in little-endian format.

byte	|1 byte (8-bits)
--|
int32	|4 bytes (32-bit signed integer, two's complement)
int64	|8 bytes (64-bit signed integer, two's complement)
double	|8 bytes (64-bit IEEE 754 floating point)

####Non-terminals

The following specifies the rest of the BSON grammar. Note that quoted strings represent terminals, and should be interpreted with C semantics (e.g. `\x01` represents the byte `0000 0001`). Also note that we use the * operator as shorthand for repetition (e.g. (`\x01`*2) is `\x01\x01`). When used as a unary operator, * means that the repetition can occur 0 or more times.

```
document	::=	int32 e_list "\x00"	BSON Document. int32 is the total number of bytes comprising the document.
e_list	::=	element e_list	
|	""	
element	::=	"\x01" e_name double	Floating point
|	"\x02" e_name string	UTF-8 string
|	"\x03" e_name document	Embedded document
|	"\x04" e_name document	Array
|	"\x05" e_name binary	Binary data
|	"\x06" e_name	Undefined — Deprecated
|	"\x07" e_name (byte*12)	ObjectId
|	"\x08" e_name "\x00"	Boolean "false"
|	"\x08" e_name "\x01"	Boolean "true"
|	"\x09" e_name int64	UTC datetime
|	"\x0A" e_name	Null value
|	"\x0B" e_name cstring cstring	Regular expression - The first cstring is the regex pattern, the second is the regex options string. Options are identified by characters, which must be stored in alphabetical order. Valid options are 'i' for case insensitive matching, 'm' for multiline matching, 'x' for verbose mode, 'l' to make \w, \W, etc. locale dependent, 's' for dotall mode ('.' matches everything), and 'u' to make \w, \W, etc. match unicode.
|	"\x0C" e_name string (byte*12)	DBPointer — Deprecated
|	"\x0D" e_name string	JavaScript code
|	"\x0E" e_name string	Deprecated
|	"\x0F" e_name code_w_s	JavaScript code w/ scope
|	"\x10" e_name int32	32-bit Integer
|	"\x11" e_name int64	Timestamp
|	"\x12" e_name int64	64-bit integer
|	"\xFF" e_name	Min key
|	"\x7F" e_name	Max key
e_name	::=	cstring	Key name
string	::=	int32 (byte*) "\x00"	String - The int32 is the number bytes in the (byte*) + 1 (for the trailing '\x00'). The (byte*) is zero or more UTF-8 encoded characters.
cstring	::=	(byte*) "\x00"	Zero or more modified UTF-8 encoded characters followed by '\x00'. The (byte*) MUST NOT contain '\x00', hence it is not full UTF-8.
binary	::=	int32 subtype (byte*)	Binary - The int32 is the number of bytes in the (byte*).
subtype	::=	"\x00"	Generic binary subtype
|	"\x01"	Function
|	"\x02"	Binary (Old)
|	"\x03"	UUID (Old)
|	"\x04"	UUID
|	"\x05"	MD5
|	"\x80"	User defined
code_w_s	::=	int32 string document	Code w/ scope
```
Notes

* Array - The document for an array is a normal BSON document with integer values for the keys, starting with 0 and continuing sequentially. For example, the array ['red', 'blue'] would be encoded as the document {'0': 'red', '1': 'blue'}. The keys must be in ascending numerical order.
* UTC datetime - The int64 is UTC milliseconds since the Unix epoch.
Timestamp - Special internal type used by MongoDB replication and sharding. First 4 bytes are an increment, second 4 are a timestamp.
* Min key - Special type which compares lower than all other possible BSON element values.
* Max key - Special type which compares higher than all other possible BSON element values.
* Generic binary subtype - This is the most commonly used binary subtype and should be the 'default' for drivers and tools.
* The BSON "binary" or "BinData" datatype is used to represent arrays of bytes. It is somewhat analogous to the Java notion of a ByteArray. BSON binary values have a subtype. This is used to indicate what kind of data is in the byte array. Subtypes from zero to 127 are predefined or reserved. Subtypes from 128-255 are user-defined.
* \x02 Binary (Old) - This used to be the default subtype, but was deprecated in favor of \x00. Drivers and tools should be sure to handle \x02 appropriately. The structure of the binary data (the byte* array in the binary non-terminal) must be an int32 followed by a (byte*). The int32 is the number of bytes in the repetition.
* \x03 UUID (Old) - This used to be the UUID subtype, but was deprecated in favor of \x04. Drivers and tools for languages with a native UUID type should handle \x03 appropriately.
* \x80-0xff "User defined" subtypes. The binary data can be anything.
* Code w/ scope - The int32 is the length in bytes of the entire code_w_s value. The string is JavaScript code. The document is a mapping from identifiers to values, representing the scope in which the string should be evaluated.



##CoAP

The CoAP full specification is found on the IETF website https://tools.ietf.org/html/rfc7252

CoAP is based on HTTP, and inherits the RESTful model http://en.wikipedia.org/wiki/Representational_state_transfer for remote API invocation, but without many of the overheads implied by HTTP due to its efficient implementation on top of UDP

The aspects of the CoAP specification are repeated belwo


###Request/Response Semantics

   CoAP operates under a similar request/response model as HTTP: a CoAP
   endpoint in the role of a "client" sends one or more CoAP requests to
   a "server", which services the requests by sending CoAP responses.
   Unlike HTTP, requests and responses are not sent over a previously
   established connection but are exchanged asynchronously over CoAP
   messages.

###  Requests

   A CoAP request consists of the method to be applied to the resource,
   the identifier of the resource, a payload and Internet media type (if
   any), and optional metadata about the request.

   CoAP supports the basic methods of GET, POST, PUT, and DELETE, which
   are easily mapped to HTTP.  They have the same properties of safe
   (only retrieval) and idempotent (you can invoke it multiple times
   with the same effects) as HTTP (see Section 9.1 of [RFC2616]).  The
   GET method is safe; therefore, it MUST NOT take any other action on a
   resource other than retrieval.  The GET, PUT, and DELETE methods MUST
   be performed in such a way that they are idempotent.  POST is not
   idempotent, because its effect is determined by the origin server and
   dependent on the target resource; it usually results in a new
   resource being created or the target resource being updated.

   A request is initiated by setting the Code field in the CoAP header
   of a Confirmable or a Non-confirmable message to a Method Code and
   including request information.

   The methods used in requests are described in detail in Section 5.8.

###  Responses

   After receiving and interpreting a request, a server responds with a
   CoAP response that is matched to the request by means of a client-
   generated token (Section 5.3); note that this is different from the
   Message ID that matches a Confirmable message to its Acknowledgement.

   A response is identified by the Code field in the CoAP header being
   set to a Response Code.  Similar to the HTTP Status Code, the CoAP
   Response Code indicates the result of the attempt to understand and
   satisfy the request.  These codes are fully defined in Section 5.9.
   The Response Code numbers to be set in the Code field of the CoAP
   header are maintained in the CoAP Response Code Registry
   (Section 12.1.2).

### API bindings

A number of initiatives have already started looking at how CoAP binds generally to RESTful services 

https://datatracker.ietf.org/doc/rfc6690/?include_text=1

https://datatracker.ietf.org/wg/core/documents/

##Work to do 

CoAP webinos alignment

