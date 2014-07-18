
# Addressing/Naming requirements

REQ Each IOT device needs globally unique name (when fully qualified)

- This name should interoperated with existing internet technologies
	-	Make URI a logical choice

- Using this name it should be possible to deterministically resolve to a physical address for that same device

- This name should be able to resolve in the following example scenarios

- Cloud roaming scenarios
 -	A GPS sensor on phone should be resolvable on a mobile network
 -	This same URI should still work when the phone roams from GSM network A to WIFI network at home
 -	This same URI should still resolve to the same sensor when roans on to WIFI network at work

# NonIP resolving scenarios (same as paddys BUS attached)
-	Should resolve to IOT device on Bluetooth serial
-	Should resolve on subIP Zigbee profile 803.14.5
-	Should resolve on general serial port connection
-	Should resolve on subIP ne
-	Should resolve over NFC?

The same physical device should be able to roam across/between all the connection methodologies above, but name should not change.

The addressing syntax should directly support the following elements
-	Address of IOT owner
-	Address of IOT host device (in scenarios where device proxies for sensor)
-	Address of service instances
With an option also to specific type of service
e.g. phone supports two GPS instances (WIFI and GPS) – but both are of the same type


# Connection requirements

A connection should be requested to a destination URI representing and IOT device – or vice versa –the IOT device connects to and end point

The connection algorithm can resolve to the destination end point using its knowledge of the connection bearers available

It should be possible to specific optional parameters to the connection, to indicate a bearer preference.

The external application interface for sending and receiving data should be independent of bearer – work across TCP and Serial

The external application interface for sending and receiving data should be accessible from JavaScript and C interfaces

The external application interface for sending and receiving data should support frame based packets interface, in order to identify out of order and missing packet 

There should be an option to select a stream based interface to data, where ordering and resends are handled by application layer (but possibly standardised) logic – where the undelying bearer does not procide these functions

Where the underlying bearer technology supports streaming, this should be made directly available to the application layer.

# Identity/Integrity/Session requirements

When two devices connect there should be a handshake process in order that they may reliably assure each other of their identity

This handshake process should produce a session ID which can be sent with all subsequent messages

This session ID should be passed in such a way that it cannot be spoofed by sender

New session IDs (requiring re handshake) should be requestable at any time by either party

There should be default behaviours defined regarding retirement of session ID

These requirements should be embodies with the external Connection request and data transfer APIs

(??) Where the underlying bearer supports TLS – there should be an option to implement all these requirements directly on top of TLS using mutually authenticated sessions


# Encryption requirements

Default data transport is unencrypted

There should be an option to request encryption in the connection, session set up 

Where encryption is provided by the underlying bearer, this should be implemented directly

Where encryption is not supported by bearer natively there must be lightweight (but secure) algorithm that can be implemented on the destination IOT device

# Enrolment UI requirements

?? should we support two enrolment models
-	Peer to peer trust connections – where all that counts is the end device – eg. Phone trusts TV – remote control trusts light
-	Clustered connections- where a device is trusted into a cluster== Zone – ie you enrol a device into your zone

Enrolling an IOT device is problematic because of limited UI

We should consider the following scenarios – where we have a virgin IOT device and a host device

IOT device comes with one or more of
-	NFC label on device
-	QR code on device
-	Unique “key” visible on device
-	Unique key on scratchcard on co-distributed card

Where key can be long string OR user/pwd combo

We need to consider
-	Local binding: where host has physical visibility of IOT device
-	Cloud binding: where either directly or by proxy the IOT device can reach out to an initial external IP address which can act as broker for connection

We need to consider whether we can sit on top of existing bindings – eg bluetooth

In general: a virgin IOT device (factory state with unique ID) becomes bound to pair/zone in a handshaking procedure where a new cert/key is securely provisioned to the device.
This new cert/key will allow the device to make a validated peer to peer connection to the pair/zone

Physical authorisation of binding 
-	Should consider WPS model – and specifically qualify which scenarios this is deemed safe for
-	Should consider model where factory key is “input” to the IOT device via a secure channel – to authorise enrolment.

# Discovery Requirements

A simple protocol should be provided – which only runs on top of “stream” interface for discovering available services
Advertised services should be published by using a scheme similar to the URI addressing schema

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


#Misc other requirements (need review) 






# Security requirements 

## Connectivity requirements

1. Requirement 1: Connections must be possible between organisations on a peer to peer basis, without the need for an intermediate entity
2. Requirement 2: Connections between entities be capable of resisting man in the middle attacks
3. Requirement 3: Connections between organisations must be mutually attestable
4. Requirement 4: Mutually authenticated TLS sessions are the preferred mechanism of creating a mutually attestable virtual connection
5. Requirement 5: Secure connections should be possible over non-IP connections
6. Requirement 6: End points must be named using general purpose URI
7. Requirement 7: It must be possible to route to end points, even when sitting behind firewall
8. Requirement 8: Virtual connections must have a notion of session longer than physical sessions

## Policy requirements

1. Requirement 9: A policy description language must be provided with can express policy constraints flexibly 
2. Requirement 10: The policy language must be able to restrict access to APIs
3. Requirement 11: The policy language must be able to restrict access named devices
4. Requirement 12: The policy language must be able to restrict devices owned by people
5. Requirement 13: The policy language must be able to restrict access based on calling application
6. Requirement 14: The policy language must be extendable to new APIs
7. Requirement 15: The policy language must be able to restrict based on API specific credentials (e.g. folder name or time of day)
8. Requirement 16: The policy language must be efficient to parse and store
9. Requirement 17: The discoverability of an entity and services must be protectable by policy
10. Requirement 18: Policy must be syncronisable and manageable – an interoperable definition of policy must exist
11. Requirement 19: The Policy description framework must be extensible by third parties.
12. Requirement 20: Policy management must be possible through easy to user API

## User/organisation identity requirements

1. Requirement 21: The system must support external identity servers
2. Requirement 22: The system must support Open ID providers
3. Requirement 23: Each user must be given a cryptographically strong identity with public and private components
4. Requirement 24: Two users must be able to established trusted mutual identity through PKI exchange
5. Requirement 25: Either party must be able to unilaterally revoke the trusted mutual identity
6. Requirement 26: An organisations identity must be revocable in case or breach



## Device identity requirements

1. Requirement 27: Strong identity of device, users must be supported, ideally with PKI certificates
2. Requirement 28: A process of enrolment is required where a device is bound to a user
3. Requirement 29: The process of binding a device to a user must be revocable

## Application identity and integrity

1. Requirement 30: Applications should support a packaging mechanism that an detect corruption and therefore support integrity capability
2. Requirement 31: Application packaging mechanism must be space efficient
3. Requirement 32: Application packaging mechanism must be easy to parse 
4. Requirement 33: Applications must support strong identities, ideally through PKI certificates
5. Requirement 34: Applications must support certificate chaining to help establish provenance of an application
6. Requirement 35: Application must support certificate chaining to digitally model secure workflow 



# Internet of Things Requirements

1. Requirement 36: The solution must provide real time data extraction APIs through RESTful or alternative strategies, not just bulk data uploads.
2. Requirement 37: The solution must allow for "secure" and "interoperable" integration of Internet of Things like sensors to future proof for advanced SmartCity deployment scenarios.
3. Requirement 38: The solution must allow for "secure" and "interoperable" integration of Internet of Things like actuators to facilitate intelligent distributed control of IOT devices. 
4. Requirement 39: The IOT integration mechanism MUST have model that can be post installed to existing kit, i.e. provide legacy interoperability mode.
5. Requirement 40: The sensor integration model must be fit for purpose for IOT providing solution that will work even in non IP scenarios. 
6. Requirement 41: The sensor integration model must be easy to program for both remotely and locally. 

# Application execution /Process requirements

1. Requirement 42: There should be two application types – UI applications and background applications
2. Requirement 43: UI applications which render graphics to the screen on user insanitation
3. Requirement 44: Background applications should (optionally) auto start on device start up and run as background processes 
4. Requirement 45: Applications should be in protected memory space from one another to avoid cross application corruption
5. Requirement 46: Application start up time must be less than 100 msec
6. Requirement 47: Local UI must be provided for managing (terminating) errant applications
7. Requirement 48: Remote UI must be provided for trusted parties (policy permitting) to manage applications

# Data handling/ data management requirements

1. Requirement 49: The solution must support easy to use data caches for data performance reasons
2. Requirement 50: There should be an option to supported Encrypted data at rest, for prime data stores, cached data stores and application data stores
3. Requirement 51: Data should be storable in a central accessible store in a variety of different electronic formats, including (but not limited to) 

Structured data formats, such as

1. 
  1. Tabular formats (i.e. .xls, .csv, tab delimited, etc) 
  2. Spatial formats (i.e. .shp, .tab, Oracle spatial, SQL spatial, etc) 

Relational database formats

Unstructured data formats, such as

1. 
  1. Document formats (e.g. .doc, pdf, etc) 
  2. Media formats (such as video, sound, etc) 
  3. 

2. Requirement 52: The data framework model must support large data volumes (Big data).
3. Requirement 53: The solution must provide and manage metadata about the data, considering areas such as 

- Categorisation, theming and tagging of the data 
- Ownership of the data – the organisation/ person who provides the data, who is custodian for the data 
- The licence agreements on which the data can be viewed and used 
- The date/ temporal coverage of the data, its age and when is it due for renewal, etc 
- The locality/ geographic coverage of the data 

1. Requirement 54: It is possible some data may not be held in the data store but would be linked to from the data store. The solution must manage metadata, about data which may not be hosted in the Data Store, but is available to the users of the data store.
2. Requirement 55: The solution must manage contextual links between data, either links between related data sets, or unstructured data about other data sets (e.g. reports or blog posts about a data set, or citing certain data sets).
3. Requirement 56: The solution must manage data standards and validation of data against standards, including the maintenance against recognised national and internal data standards, such as Open OS, data.gov.uk, PSMA/Gemini2/Inspire



1. Requirement 57: The solution should consume and take advantage of Linked Open Data, in triple store format .
2. Requirement 58: The solution should manage the maintenance of data format standards.
3. Requirement 59: The solution should manage historic versions of data sets and enable comparisons against different versions of data sets (e.g. to see trends in the data over time). 
4. Requirement 60: The solution should manage retention periods of the data and scheduled archiving/deletion of data sets.
5. Requirement 61: The solution should manage Information Security with and approach that accommodates different levels Business Impact Level of Data to different users.
6. Requirement 62: The solution should manage contributors' contributions of data to ensure compliance with appropriate levels of information security for the level of data. 
7. Requirement 63: Users must be able set up a regular scheduled task to upload updates to the data set (either incremental updates and/or replacement data sets) 
8. Requirement 64: Users/Partners must be able to bulk upload multiple data sets or data packs
9. Requirement 65: Users must be able to perform multiple uploads be scheduled for regular updates
10. Requirement 66: The solution should ensure metadata is updated with bulk uploads of data and datasets, covering scheduled updates as well as one-off uploads. 
11. Requirement 67: The solution must enable incoming data uploads from Partners' system 
12. Requirement 68: The solution must manage authentication, security, validation and error handling. 
13. Requirement 69: The system should support SQL like tabular access to data
14. Requirement 70: The system should support high performance, high capacity NOSQL like access to loosely structure data 
15. Requirement 71: The system should support efficient queries to all data types. 

# Synchronisation requirements

1. Requirement 72: Synchronisation functions should be supported for at least

- NOSQL data
- Tabular data
- HTML5 Application data
- HTML5 Session store data 

1. Requirement 73: Synchronisation should be possible between single device instance of data and single server instance
2. Requirement 74: Synchronisation must be supported between multiple server instances
3. Requirement 75: Synchronisation must be supported between multiple device instances.
4. Requirement 76: Synchronisation data types should be categorised as either device global (any application can access) or application specific.
5. Requirement 77: Synchronisation should be efficient: communicate minimal delta information only
6. Requirement 78: An option should be supported for realtime synchronisation
7. Requirement 79: Synchronisation should support b-directional sync, server changes or client changes
8. Requirement 80: Synchronisation refreshes should be trigger able from client or server 



# Workflow and workflow management requirements  

1. Requirement 81: A workflow systems should be supported using either SQL or NOSQL data primitive
2. Requirement 82: Wokflow state should be syncronisable using the synchronisation infrastructure 
3. Requirement 83: Workflows constraints should be defined that distinguish between actions that can be taken offline or online.
4. Requirement 84: An option should be provided to cryptographically sign workflow state changes
5. Requirement 85: A generic API should be provided for rendering visualisation of worfkow state on end devices and servers
6. Requirement 86: Workflow state changes and constraints should be describable by the policy file

# API requirements

## General API requirements

1. Requirement 87: Definition: an API is a collection of methods, events and data definitions that addresses a functional area
2. Requirement 88: Each API must be mapped to an interoperable JavaScript interface formally specified
3. Requirement 89: Each API must be identified by a unique type that can issued on a distributed basis – there is no central authority for API names
4. Requirement 90: Each API type should be instantiable multiple times on a particular host device
5. Requirement 91: Each API instance should be given a unique name to identify it
6. Requirement 92: All APIs should share common conventions for return codes, errors and parameter passing
7. Requirement 93: APIs should distinguish between errors of function and errors of connectivity
8. Requirement 94: The external interface to the solution must be via open, non-proprietary interfaces. 

## Remotable API requirements

1. Requirement 95: The existence of an instance of an API should be discoverable by a remote device
2. Requirement 96: An API should be invokable by a remote device.
3. Requirement 97: A discovery protocols must exist to allow entity to discover data and services resident on each other's organisations. 
4. Requirement 98: The solution must be able to remotely list the List APIs or services hosted on a server 

## Specific API requirements

1. Requirement 99: An interoperable secure JavaScript API is required to grant full file read access
2. Requirement 100: An interoperable secure JavaScript API is required to grant full file write access
3. Requirement 101: An interoperable secure JavaScript API is required to manage file bindings
4. Requirement 102: An interoperable secure JavaScript API is required to grant full NFC read access
5. Requirement 103: An interoperable secure JavaScript API is required to grant full NFC write access
6. Requirement 104: An interoperable secure JavaScript API is required to access geo location information
7. Requirement 105: An interoperable secure JavaScript API is required to access device orientation information
8. Requirement 106: An interoperable secure JavaScript API is required to create binding to arbitrary sensors 
9. Requirement 107: An interoperable secure JavaScript API is required to create binding to arbitrary actuators 





# Management requirements

1. Requirement 108: Administration of users, including how different roles are set up and their permissions configured to perform functions in the solution and the workflow 
2. Requirement 109: It must be possible to both locally and remotely Configure APIs and API instances
3. Requirement 110: Multi factor authentication should be provided to secure end points 
4. Requirement 111: Lock and wipe of end user device functions should be supported where they may cache sensitive data 
5. Requirement 112: The systems must support administration delegation functions
6. Requirement 113: The systems must support facilities for users to sign up to use the functions of the data store (either as a member of a partner organisation or as an individual), to manage their own profile and preferences in the solution, including saving customised visualisations and functions 
7. Requirement 114: The systems must support managing the terms and conditions of use of the data store/web wrapper and the ability to moderate users' behaviour. 
8. Requirement 115: A user verification process must be in place as part of the registration
9. Requirement 116: The system must provide an ability to manage the functions and preferences of the solution, such as uploading data, data visualisations 
10. Requirement 117: The system must provide an ability to handle configuration and management of metadata 
11. Requirement 118: The system must provide an ability to te ability to remove/suspend data 
12. Requirement 119: The system must provide an ability to manage of historic versions of data sets 
13. Requirement 120: The system must provide an ability to manage data retention periods 
14. Requirement 121: The system must provide an ability to manage data suppression limits 
15. Requirement 122: The system must provide an ability to the administration and management of the workflow to upload data 
16. Requirement 123: The system must provide an ability to monitor the use/load of the interfaces/APIs 
17. Requirement 124: The system must provide an ability to the ability to suspend or stop interfaces/APIs, to individual systems/users, individual APIs or individual users. 
18. Requirement 125: The system must produce user activity reports and tools to analyse use of the system 
19. Requirement 126: The system must provide an ability to manage the space used by the system and the facilities to grow the space of the solution. 

# Hosting 

1. Requirement 127: The solution must be possible to be provided as an externally hosted service. Your description should address the following points: 
2. Requirement 128: The solution must provide an option for a customer to self host on their own server
3. Requirement 129: Self hosted and cloud hosted solution must provide remote administration functions. 

# Networking requirements

Networking requirements define the nature of the physical and logical connection between application and service end points.

1. Requirement 130: Connections from a device to a remote resource, should, as far as possible share physical resources (ie multiplex through the same IP connection)
2. Requirement 131: Connections originating from applications must declare the unique identity of the application making the connection
3. Requirement 132: Network transported application identities, should be, Non-repudiable, as far as possible 
4. Requirement 133: Connections between core runtine and browser UI components should be secure (attestation of end points) 
5. Requirement 134: End points should support RESTful server interfaces where possible for backward compatibility
6. Requirement 135: Network connections should be "lightweight" ie the proportion between payload and messaging metadata should be less that 5%
7. Requirement 136: Network connections should be efficeient: ie multiplexing and security infrastructure should not add more than 20ms to round trip messaging




