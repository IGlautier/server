#Physical connections

In scope we should consider the following physical bearers

* 802.11 - normal WIFI http://en.wikipedia.org/wiki/IEEE_802.11
* Bluetooth - http://en.wikipedia.org/wiki/Bluetooth with the following profiles
	* Serial http://en.wikipedia.org/wiki/Bluetooth_profile#Serial_Port_Profile_.28SPP.29
	* PAN http://en.wikipedia.org/wiki/Bluetooth_profile#Personal_Area_Networking_Profile_.28PAN.29
	* LE (Smart) http://en.wikipedia.org/wiki/Bluetooth_low_energy
* 802.15.4 - http://en.wikipedia.org/wiki/IEEE_802
	* ZigbeIP http://www.zigbee.org/Specifications/ZigBeeIP/Overview.aspx
	* 6lowpan http://en.wikipedia.org/wiki/6LoWPAN
* NFC
* SubGhz industrial, scientific and medical (ISM) radio bands http://en.wikipedia.org/wiki/ISM_band
	* (including 868 band)
* LAN bands
	* GSM http://en.wikipedia.org/wiki/GSM
	* 3G http://en.wikipedia.org/wiki/3G
	* HSPDA http://en.wikipedia.org/wiki/High-Speed_Downlink_Packet_Access
	* LTE http://en.wikipedia.org/wiki/LTE_(telecommunication)

* IOT optimised networks
	* Wightless http://www.weightless.org/
	* Sigfox http://sigfox.com/en/	
* Satellite backhaul

## Logical connections

All of the above physical networks can be encapsulated by one or more of the following transport protcols

* TCP: http://en.wikipedia.org/wiki/Transmission_Control_Protocol
* UDP: http://en.wikipedia.org/wiki/User_Datagram_Protocol
* Serial: which is a lower layer simple read write protocol




##Session handling

Session handling will be dealt with in the security section


## Connection requirements

Requirement: A connection should be requested to a destination URI representing and IOT device – or vice versa –the IOT device connects to and end point

Requirement: The connection algorithm can resolve to the destination end point using its knowledge of the connection bearers available

Requirement: It should be possible to specific optional parameters to the connection, to indicate a bearer preference.

Requirement: The external application interface for sending and receiving data should be independent of bearer – work across TCP and Serial

Requirement: The external application interface for sending and receiving data should be accessible from JavaScript and C interfaces

Requirement: The external application interface for sending and receiving data should support frame based packets interface, in order to identify out of order and missing packet 

Requirement: There should be an option to select a stream based interface to data, where ordering and resends are handled by application layer (but possibly standardised) logic – where the undelying bearer does not procide these functions

Requirement: Where the underlying bearer technology supports streaming, this should be made directly available to the application layer.




## Connectivity requirements

Requirement:Connections must be possible between organisations on a peer to peer basis, without the need for an intermediate entity

Requirement: Connections between entities be capable of resisting man in the middle attacks

Requirement: Connections between organisations must be mutually attestable

Requirement: Mutually authenticated TLS sessions are the preferred mechanism of creating a mutually attestable virtual connection

Requirement: Secure connections should be possible over non-IP connections

Requirement: End points must be named using general purpose URI

Requirement: It must be possible to route to end points, even when sitting behind firewall

Requirement: Virtual connections must have a notion of session longer than physical sessions


## Identity/Integrity/Session requirements

Requirement: When two devices connect there should be a handshake process in order that they may reliably assure each other of their identity

Requirement: This handshake process should produce a session ID which can be sent with all subsequent messages

Requirement: This session ID should be passed in such a way that it cannot be spoofed by sender

Requirement: New session IDs (requiring re handshake) should be requestable at any time by either party

There should be default behaviours defined regarding retirement of session ID

Requirement: These requirements should be embodies with the external Connection request and data transfer APIs

Requirement:  Where the underlying bearer supports TLS – there should be an option to implement all these requirements directly on top of TLS using mutually authenticated sessions


##Reliability requirement

The fundamental difference between TCP and UDP/Serial based communication is the reliability of the data packets sent. In TCP we have

1. Guaranteed delivery: packets are explicitly acknowledged so we know data gets there
2. Ordered delivery: packets come in the correct order

UDP and Serial communication do not have these assurances.

Some IOT applications do not need this requirement.

The streaming API to be developed needs to have an option for unreliable delivery.
