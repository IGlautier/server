# Security: Peer to Peer Bindings vs Trusted Hubs

Define two different models for secure connectivity

# Security: Peer to Peer trust

define the protocol and UI required to bind two devices as peers

# Security: Hub trust

define the protocol and UI required to enroll a device into a hub
refer to webinos PKI model as one variant. 


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

# Enrolment security requirements

1. An IoT device must be securely authenticated when it connects to a network, irrespective of whether this is done locally or remotely.
2. A device with an installed IoT management application(IMA) should be authenticated each time it accesses the network.
3. A user must be able to enrol the IoT device onto the device securely and easily.
4. A user must be authenticated and authorised to enrol an IoT device on the network.
5. Encryption keys must not be transmitted in plaintext.
6. Credential data such as SSIDs and WiFi passwords must be encrypted.
7. Any other sensitive data such as tokens and session IDs must be encrypted.
8. Sensitive data used in device and user authentication must be secured from modification and mnipulation attacks.
<br> There must be a provision for data origin authentication (message authentication) of data used for enrolment of the device and user.
9. Sensitive data used in device and user authentication must be secured against replay to protect from spoofing attacks.
10. Sensitive data such as credentials, keys and tokens must be encrypted in storage on the IoT devices and the device management application.
11. The IoT device mut be bound to the user in some way.
