#Driver vs IOT protocol model

we need formal definitions 


#Naming Schema

This schema should define the syntax of a URI that can be used to usefully describe the address of a target IOT device.

This URI should serve as a connection string

We should also consider that this same URI structure can also be used

* as a result of a service discovery process
* as a lexical item in a policy file (ie describing rights/restrictions) with respect to named entities 

We should consider whether we have both a HTTP/S schema and another schema with different semantics
 - e.g. HTTP - returns human readable descriptors and connection string lings
 - picosec:// binds to a runtime that can make a connection


copy in key documents from webinos and modify

(IVAN currently extracting core specifications)

#Physical discovery

define the physical discovery algorithm that transcends 

 * web based discovery
 * local IP based discovery - (mdns)
 * serial port discovery 


#Physical streaming

define the abstract streaming operations and how they operate on top of reliable and unreliable connections

Define bindings for

* TCP (unsecure)
* UDP (unsecure)
* TCP/TLS
* UDP/DTLS
* Serial

# (Implementation?)reliable streaming

define basic algorithm to implement reliable stream on top of unreliable framed coms

# Security: Peer to Peer Bindings vs Trusted Hubs

Define two different models for secure connectivity

# Security: Peer to Peer trust

define the protocol and UI required to bind two devices as peers

# Security: Hub trust

define the protocol and UI required to enroll a device into a hub
refer to webinos PKI model as one variant. 


# Security: session handling

define the session model - establishment and persistence - assume enrolment has happened



# Security: permission granting

define the model for device/service discovery and invokation for both driver and full IOT model



# (Optional) JSON-RPC binding

defines the format and behaviour of JSON-RPC packets when put on top of a stream

we should consider this optional -in that MQTT or CoAP could be layerd on top of the active session


## Option for BSON binding



# (Optional) Service discovery
This uses the JSON-RPC URI method for querying and service discovery


#API Specifications

The PicoSec will take the following specifications as initial input

- GenericActuator
- GenericSensor
- Discovery
- GeoLocation
- DeviceStatus


These APIs will be JavaScript wrappers, accessible from the web programming context and will grant a developer access to key capabilities resident on a local or remote IOT device.

There should be multiple possible implementations of these APIs, one of which will be mapping to the JSON-RPC layer.

It should be possible to also map these same functional primitives to other underlying protocols such as CoAP or MQTT.



#CoAP Integration

we need to define how a CoAP session, and in particular the security aspects can interwork with CoAP  

#MQTT Integration

we need to define how a MQTT session, and in particular the security aspects can interwork with MQTT 