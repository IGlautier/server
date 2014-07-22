
# Security: permission granting

define the model for device/service discovery and invocation for both driver and full IOT model



## Policy requirements

Requirement: A policy description language must be provided with can express policy constraints flexibly 

Requirement: The policy language must be able to restrict access to APIs

Requirement: The policy language must be able to restrict access named devices

Requirement: The policy language must be able to restrict devices owned by people

Requirement: The policy language must be able to restrict access based on calling application

Requirement: The policy language must be extendable to new APIs

Requirement: The policy language must be able to restrict based on API specific credentials (e.g. folder name or time of day)

Requirement: The policy language must be efficient to parse and store

Requirement: The discoverability of an entity and services must be protectable by policy

Requirement: Policy must be syncronisable and manageable – an interoperable definition of policy must exist

Requirement: The Policy description framework must be extensible by third parties.

Requirement: Policy management must be possible through easy to use API

##Policy scenarios


We should consider two policy control scenarios that relate to the Hub model and peer to peer model respectively. The difference between the two is as follows

### Peer to Peer based policy: 
This model is close to the bluetooth model for security. Each device creates one or more relationships with other IOT-applications (or possibly devices). This peer to peer relationship is represents both:
 * trust in identity: the device-app know and trust each other (in all probability by a trusted key exchange)
 * permission to use services. presentation of the key therefore is granting an application permission to use the service, where of course trust in the presented applications identity is presumed

Importantly, for the peer to peer model, the device and only the device is responsible for policy enforcement.

No policy synchronisation is required and the permissions granted to a particular key are interpreted by (and can be changed dynamically) by the iot-device

###Hub based security
In a hub based security model an intermediate hub takes responsibility for policy control and enforcement. When a device joins a hub two things happen

1. An identity is issued by the hub to the iot-device. This is a strong trusted identity which is capable of being used to initiate peer to peer trust relationships
2. The hub is granted the ability to overwrite policy rules. This is essential if we which to manage many IOT devices as one. For example grouping lightbulbs together into a single unit and writing the permissions to that devices


A third facet of hub model, not directly related to policy, is that the hub can act as a messaging proxy for the device. 


### Strengths and weakness of Hub vs Peer based policy model

* Peer to peer
	* (plus) no infrastructure/intermediary needed
	* (plus) simple 
	* (minus) does not scale well to many devices
* Hub based
	* (plus) scales well to many devices
	* (plus) usable for end users
	* (minus) infrastructure deployment needed
	* (minus) more complex IOT stack 


#Policy Specifications

##Hub based policy specifications

We have very well formed specification for handling hub based policy.

It remains an engineering challenge to see how small we can implement this stack


* Policy Description
	* [BONDI_Architecture_and_Security](BONDI_Architecture_and_Security)
	* [BONDI_Architecture_and_Security_Appendices](BONDI_Architecture_and_Security_Appendices)
	* [webinos policy](webinos policy)

* Certificate enrolment
	* [webinos enrollment](webinos enrollment)


## Peer 2 peer based policy 

The peer to peer model will require extensive experimentation and refinement.

It will consist principally of a key exchange protocol such as http://en.wikipedia.org/wiki/SPEKE_(cryptography) which is intern based on Diffie Helman key exchange http://en.wikipedia.org/wiki/Diffie-Hellman_key_exchange.

All subsequent requests and responses are then hashed with the key in order to assure both identity and trust.

Optimisations may be possible using an intermediate session key.








