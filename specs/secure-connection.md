#Session Handling





# Security: session handling

define the session model - establishment and persistence - assume enrolment has happened




# Encryption requirements

Default data transport is unencrypted

There should be an option to request encryption in the connection, session set up 

Where encryption is provided by the underlying bearer, this should be implemented directly

Where encryption is not supported by bearer natively there must be lightweight (but secure) algorithm that can be implemented on the destination IOT device




# Authorisation requirements

We should consider two scenarios for authorisation

Paired authorisation
Zone authorisation

Paired authorisation is where a single device grants “capability” access to one or more endpoints
e.g. GPS in car – grants access to 2 phones and a PC

Zoned authorisation is where a collection of devices grants access to one or more end points
e.g. GPS and phone in a single zone, collectively grant access to Fred to access location

The difference being – for paired authorisation the IOT device can issue arbitrary tokens that represent “permission” and the target IOT device is entirely automous in terms of making the required grant permission
If a client device wished to gather metadata regarding the capability requested, it should harvest this data in the discovery phase
It is assume tokens must be stored securely on the device

For zoned authorisation, it is implied that the “permissions” need to be synchronised to multiple possible enforcement points
The permissions need to be declarative therefore and interoperable. XACML or its derivatives are known to work here. 
