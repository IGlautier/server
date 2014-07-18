# Connection types

## Overview

Need to cater for a wide range of connection types. Connection capabilities of any given attached device are determined by a combination of:

* available bearers: capacity, availability, multihoming, addressability, discoverability;

* device software: processing power, available code space and available runtime memory.

Whilst trying to cater to the very widest possible range of devices, we still wish to create generic solutions; so solutions that are designed specifically for a single network type, or a very specific device constraint, or only a single use-case, are out of scope.

## Broad classification of device and connection capabilities

### Full TLS-capable devices

These devices are capable of operating as a TLS server or client, and running the TLS-based Webinos protocol with device authentication by locally-stored certificate. This entails that the devices also have the capability to store local certificates securely. These devices might not be full PZPs because of some other constraint (eg minimally interactive) but at a protocol level these would use the standard Webinos protocol.

These devices are not really in scope.

### TCP-capable devices

These are lower-end devices that are capable of communication as a TCP/IP client. These do not fall into the category of "Full TLS-capable devices", probably as a result of one or more of the following restrictions:

* insufficient processing power, code space or runtime memory space to run PKIX aspects of TLS;

* unable to store certificates, or any long-lived credentials, securely.

For devices that are TCP/IP-capable, an alternative protocol is required to ensure the necessary transport security attributes (authentication, confidentiality, integrity, as appropriate to the use case) in lieu of the Webinos TLS/PKIX-based protocol.

TCP/IP-connected devices, and their associated connection technology, will still exhibit important differences in the connection characteristics. These differences include:

* incidence of dropped connections;

* keepalive frequency and time-to-detection of dropped connections;

* single-homing or multi-homing to networks and/or gateways;

* stability of addressing;

* discoverability.

### Bus-attached devices

These are devices that are attached to a non-IP bus or sensor network (eg Zigbee). They are connected without running TCP/IP. They might be capable of UDP connection but, more likely, they will connect and use only a transport that is specific to the networking technology they use and offers an unreliable transport akin to a serial port connection.

The connection technology may use mesh networking or otherwise be subject to frequent reconfiguration. Associations between end-devices and the infrastructure should remain in place and continue to work in the presence of these sub-network reconfigurations.

There must exist one or more points of interconnection between the sensor network and the general TCP/IP network. A mediating entity at that point of interconnection - either a transparent gateway (essentially simply "port-forwarding" for a single device) or an aggregating gateway (mediating connections for many devices).

An objective of the architecture is to make such gateways as simple as possible.

Multihoming from end devices to gateways is a requirement.
Some webinos services may be proxied, or handled fully, at the gateway.

Compare the gateway architecture with [mqtt-sn](http://mqtt.org/new/wp-content/uploads/2009/06/MQTT-SN_spec_v1.2.pdf).