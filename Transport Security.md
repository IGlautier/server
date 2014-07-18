# Transport security

## Overview

MXD aims to create a security architecture and protocol that is better suited to the use-cases and technology contraints of embedded IoT devices than he existing TLS/PKIX-based webinos protocols.

Embedded devices have a number of differing requirements that constraints that will drive this solution. Key issues are:

* insufficient processing, memory or connection capability to support full TLS. See the discussion in [connection types](connection_types);

* inability to hold credentials securely in the long term.

The above factors affect the protocols used to ensure required security attributes of s transport (authentication, confidentiality etc).

Other aspect is that the existing Webinos trust and access control model is identity-based: a client attempting to use a service presents and identity, and a serving device uses a locally-defined policy to determine whether or not that identity has permission to perform the attempted action. For many of the IoT use-cases this model may be inappropriate because it does not naturally fit the actual trust relationships between entities. An IoT serving device is not going to be capable of understanding the real identity of a requesting client (such clients would be too numerous) and would not, in any case, make access-control decisions that depend on any specific identity. The **Policy Decision Point**, PDP (in XACML terminology) is not at the serving device but somewhere in the infrastructure.

A model that may we be more natural for the IoT use-cases is a capability-based model. Here, a service device might advertise a number of specific resources or services that are available, and might expect to see something from a requesting client that asserts that the client has the right to access that resource. A **capability** is a token that is presented by the requesting client that asserts its right to that specific access. Elsewhere in the system a PDP might have determined that right based on the requesters identity and issued the capability; but so far as the serving device is concerned it only needs to see, and be capable of verifying, the capability.

## Bus-based vs end-to-end device authentication

In the mPZP model there is a reliance on bus-based device authentication methods for tethered devices. The standard Webinos authentication protocol is terminated at a proxy device, and the end-device is authenticated only by mechanisms that are specific to the connection technology: eg a bonding operation for Bluetooth.

For MXD we seek to widen the classes of device for which authentication can be end-to-end. Ideally this will be both for TCP/IP-capable devices and for bus-attached devices.

## Trust use cases

We need to identify the trust use-cases that we plan to address.

eg:

### Capability-based access control
- client access service from IoT device;
- device grants access based on a capability presented by the clinet;
- device does not need to verify identity of client, only that it proves possession of the capability;

### Device-specific identity and authentication
- device has an identity (what? issued/managed how?)
- in creating an association between a client and a device, the device identity is authenticated (proved to the client directly or verified by some mediating device/proxy?)

### Non-specific device identity and authentication
- device has does not have an individual identity
- device is a member of a group or category which forms the basis of a trust decision made by a relying client;
- device proves membership of the group/category (proved to the client directly or verified by some mediating device/proxy?)
- an application may use data from the device based without knowing, or needing to rely on, the identity (eg a temp sensor sends gps position and sensed temperature; identity is not relevant to the app provided that the app knows that the sender is trusted to the necessary degree).

### Sensor devices as publisher only
- device publishes sensor data routinely, not in response to request;
- device may be authenticated to infrastructure/broker
- device may perform a one-time capability check, or authentication, of broker at subscription time (if there is an explicit subscription)

### Devices mutually authenticated by "bonding" step
- a one-time procedure creates a pre-shared key between device and infrastructure
- may be key agreement protocol seeded by commonly entered PIN
- this acts as implicit device authentication and implicit capability for access to device services.
(However, this use case is no different from the way mainstream deployments currently work, so maybe we don't need to specify how it works - it already just works.)
