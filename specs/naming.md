

#Naming Schema

This schema should define the syntax of a URI that can be used to usefully describe the address of a target IOT device.

This URI should serve as a connection string

We should also consider that this same URI structure can also be used

* as a result of a service discovery process
* as a lexical item in a policy file (ie describing rights/restrictions) with respect to named entities 

We should consider whether we have both a HTTP/S schema and another schema with different semantics
 - e.g. HTTP - returns human readable descriptors and connection string lings
 - picosec:// binds to a runtime that can make a connection



## Addressing/Naming requirements

REQ Each IOT device needs globally unique name (when fully qualified)

- This name should interoperated with existing internet technologies
	-	Make URI a logical choice

- Using this name it should be possible to deterministically resolve to a physical address for that same device

- This name should be able to resolve in the following example scenarios

- Cloud roaming scenarios
 -	A GPS sensor on phone should be resolvable on a mobile network
 -	This same URI should still work when the phone roams from GSM network A to WIFI network at home
 -	This same URI should still resolve to the same sensor when roans on to WIFI network at work

## NonIP resolving scenarios (same as paddys BUS attached)
-	Should resolve to IOT device on Bluetooth serial
-	Should resolve on subIP Zigbee profile 802.14.5
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

##Privacy Disclosure Implication

As discussed extensively at the W3C Web of Things workshop http://www.w3.org/2014/02/wot/ URI representation of IOT devices is essential for web level interoperability, irrespective of the actually connection technology used.

If an IOT Object name is public, we must consider what if any private information is inadvertently disclosed to a recipient of the address.

A landline telephone number for example, as a portable address, discloses both country and region to the holder of that address.

We must consider carefully whether the hierarchical structure discloses similar types of information, and factor that into the design.

Illustratively we have two primary variants

* Structured hieriachy
	* http://hostdomain.com/OwnerID/HubID/DeviceID/ServiceID
	* this is a useful structure, identifying deterministically locale of the referenced device and service
	* howwever in the process id discloses the names of devices and servers in the hierarchy  
* Anonymised token:
	* http://hostdomain.com/sdf78sdasdf876sdf87s6d8a7f68as6d8f6as8d6fa8sd6f8a7sd6f8as
	* a long unique key which dereferences to the item in question.

Which technique is preferred is determined to a large extent by how freely device identifiers will be shared

1. Will they be shared between trusted individuals?
2. OR will they be published on open directory services?

## Sharing sphere

When we move to consider the nature of an IOT connection, and the security qualities we expect from it, pragmatically it is important to consider how accessible, discoverable an object address is.

For example WPS security is based on a very simple challenge-response security mechanism. Essentially two buttons being pressed within a very short space of time with one another.

This is secure, because the physical characteristics of WIFI mean the universe of device which can attach (issue WPS challenge or response) is restricted to only those devices within a physically <100m.

Essentially there are two subsequent hurdles that need to be overcome to compromise an IOT device

1. Discovery physical address of device
1. Compromise connection security of device 

If we increase 1 we can decrease 2, and vice versa


The point of this section is to underline the fact that the discoverability of device name is an integral part of the IOT device security consideration


# Proposed Naming Specification




