#Miscellaneous requirements

These requirements don't naturally fall in any of the existing sections, but are worth recording regardless.


## Device identity requirements

Requirement:  Strong identity of device, users must be supported, ideally with PKI certificates

Requirement:  A process of enrolment is required where a device is bound to a user

Requirement:  The process of binding a device to a user must be revocable

## Application identity and integrity

Requirement:  Applications should support a packaging mechanism that an detect corruption and therefore support integrity capability

Requirement:  Application packaging mechanism must be space efficient

Requirement:  Application packaging mechanism must be easy to parse

Requirement:  Applications must support strong identities, ideally through PKI certificates

Requirement:  Applications must support certificate chaining to help establish provenance of an application

Requirement:  Application must support certificate chaining to digitally model secure workflow 



##Internet of Things Requirements

Requirement:  The solution must provide real time data extraction APIs through RESTful or alternative strategies, not just bulk data uploads.

Requirement:  The solution must allow for "secure" and "interoperable" integration of Internet of Things like sensors to future proof for advanced SmartCity deployment scenarios.

Requirement:  The solution must allow for "secure" and "interoperable" integration of Internet of Things like actuators to facilitate intelligent distributed control of IOT devices.

Requirement:  The IOT integration mechanism MUST have model that can be post installed to existing kit, i.e. provide legacy interoperability mode.

Requirement:  The sensor integration model must be fit for purpose for IOT providing solution that will work even in non IP scenarios. 

Requirement:  The sensor integration model must be easy to program for both remotely and locally. 

## Application execution /Process requirements

Requirement:  There should be two application types – UI applications and background applications

Requirement:  UI applications which render graphics to the screen on user insanitation

Requirement:  Background applications should (optionally) auto start on device start up and run as background processes

Requirement:  Applications should be in protected memory space from one another to avoid cross application corruption

Requirement:  Application start up time must be less than 100 msec

Requirement:  Local UI must be provided for managing (terminating) errant applications

Requirement:  Remote UI must be provided for trusted parties (policy permitting) to manage applications

## Data handling/ data management requirements

Requirement:  The solution must support easy to use data caches for data performance reasons

Requirement:  There should be an option to supported Encrypted data at rest, for prime data stores, cached data stores and application data stores

Requirement:  Data should be storable in a central accessible store in a variety of different electronic formats, including (but not limited to) 

## Synchronisation requirements

Requirement:  Synchronisation functions should be supported for at least

- NOSQL data
- Tabular data
- HTML5 Application data
- HTML5 Session store data 

Requirement:  Synchronisation should be possible between single device instance of data and single server instance

Requirement:  Synchronisation must be supported between multiple server instances

Requirement:  Synchronisation must be supported between multiple device instances.

Requirement:  Synchronisation data types should be categorised as either device global (any application can access) or application specific.

Requirement:  Synchronisation should be efficient: communicate minimal delta information only

Requirement:  An option should be supported for realtime synchronisation

Requirement:  Synchronisation should support b-directional sync, server changes or client changes

Requirement:  Synchronisation refreshes should be trigger able from client or server 

## Specific API requirements

Requirement:  An interoperable secure JavaScript API is required to grant full file read access

Requirement:  An interoperable secure JavaScript API is required to grant full file write access

Requirement:  An interoperable secure JavaScript API is required to manage file bindings

Requirement:  An interoperable secure JavaScript API is required to grant full NFC read access

Requirement:  An interoperable secure JavaScript API is required to grant full NFC write access

Requirement:  An interoperable secure JavaScript API is required to access geo location information

Requirement:  An interoperable secure JavaScript API is required to access device orientation information

Requirement:  An interoperable secure JavaScript API is required to create binding to arbitrary sensors 

Requirement:  An interoperable secure JavaScript API is required to create binding to arbitrary actuators 

## Management requirements

Requirement:  Administration of users, including how different roles are set up and their permissions configured to perform functions in the solution and the workflow 

Requirement:  It must be possible to both locally and remotely Configure APIs and API instances

Requirement:  Multi factor authentication should be provided to secure end points 

Requirement:  Lock and wipe of end user device functions should be supported where they may cache sensitive data 

Requirement:  The systems must support administration delegation functions

Requirement:  The systems must support facilities for users to sign up to use the functions of the data store (either as a member of a partner organisation or as an individual), to manage their own profile and preferences in the solution, including saving customised visualisations and functions 

Requirement:  The systems must support managing the terms and conditions of use of the data store/web wrapper and the ability to moderate users' behaviour. 

Requirement:  A user verification process must be in place as part of the registration

Requirement:  The system must provide an ability to manage the functions and preferences of the solution, such as uploading data, data visualisations 

Requirement:  The system must provide an ability to handle configuration and management of metadata 

Requirement:  The system must provide an ability to te ability to remove/suspend data 

Requirement:  The system must provide an ability to manage of historic versions of data sets 

Requirement:  The system must provide an ability to manage data retention periods 

Requirement:  The system must provide an ability to manage data suppression limits 

Requirement:  The system must provide an ability to the administration and management of the workflow to upload data 

Requirement:  The system must provide an ability to monitor the use/load of the interfaces/APIs 

Requirement:  The system must provide an ability to the ability to suspend or stop interfaces/APIs, to individual systems/users, individual APIs or individual users. 

Requirement:  The system must produce user activity reports and tools to analyse use of the system 

Requirement:  The system must provide an ability to manage the space used by the system and the facilities to grow the space of the solution. 

## Networking requirements

Networking requirements define the nature of the physical and logical connection between application and service end points.

Requirement:  Connections from a device to a remote resource, should, as far as possible share physical resources (ie multiplex through the same IP connection)

Requirement:  Connections originating from applications must declare the unique identity of the application making the connection

Requirement:  Network transported application identities, should be, Non-repudiable, as far as possible 

Requirement:  Connections between core runtine and browser UI components should be secure (attestation of end points) 

Requirement:  End points should support RESTful server interfaces where possible for backward compatibility

Requirement:  Network connections should be "lightweight" ie the proportion between payload and messaging metadata should be less that 5%

Requirement:  Network connections should be efficeient: ie multiplexing and security infrastructure should not add more than 20ms to round trip messaging




