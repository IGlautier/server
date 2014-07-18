# PicoSec Scope
Nick Allott, Ubiapps

## Reference Architecture
The  IOT deployment architectures to be considered in scope for the PicoSec project consist of the following.

*Diagrams to follow* 

* **IOT Device:** a physical device, with typically low power requirements, limited processing capacity, and comprising a number of sensors and actuators.
* **IOT Application:** and end user application, which through APIs is able to access live and historical data from the IOT device (sensor information) and optionally issue it with commands (to control the device - and actuator) 
* **IOT Connectivity**: at and abstract level covers, the bearer, the protocol and the application layer connection characteristics between IOT Device and IOT Application
* **IOT Hub (optional):** and optional entity which mediates access between the one or more devices and one or more applications


Breaking down these concepts further.

* IOT Device : is made up of the following elements
 * IOT Device Sensors: the physical electro  mechanical sensors and actuators
 * IOT Device Local Connectivity: the physical connectivity between the sensors an the IOT processing unit
 * IOT Device Local Processing: essentially a CPU or micro controller that hosts device local application logic 
 * IOT Device External Comms: connected the processing unit and handles communication external to the device  
 
* IOT Application: comes in two forms: 
 * IOT web application, where the APIs will be assumed to be JavaScript APIs
 * IOT native application: covers all other options. The API will not be JavaScript, but there should be a one to one mapping to the JavaScript API
* IOT Connectivity: we will consider at three levels
 * IOT Physical Connection: the physical connection technology (e.g. WIFI, Bluetooth, Serial)
 * IOT Transport Connection: this deals with virtual addressing, session management, framing, resends etc. (e.g. TCP, UDP, TLS, Serial etc)
 * IOT Application Connection: this defines the mapping between API calls and byte structure on the wire. 
 
 ##PicoSec objectives
 
 
 





# Original Scope
##Public Summary 
The MXD project aims to produce a secure communications platform, optimised for embedded devices that allows devices to communicate with each other over heterogeneous networks, use each others services and run interoperable service code. As such MXD is a critical enabler for Internet of Things deployments.  There exist a number of technologies and protocols in the IOT and cross device  space generally (CoAP, MQTT, webinos, AllJoyn, AllShare etc.) however none of these technologies provides a mechanism for managing security end to end. This is a major omission; many prototypical IOT application such as health or energy have extremely high security requirements, whether these are driven from privacy or anti-fraud concerns. Building on the state of the art, the MXD project will tackle the following challenges. Define hardware tamper-proof methods to give strong device identity, user identity and application identity and integrity mechanism. Produce an interoperable device scripting technology. Define a cross device users manageable policy framework. Deliver all these technologies on an IOT optimised code footprint
##Scope section (responding to challenge)

The MXD project directly addresses many of the objectives of the competition scope.

 - Identity assurance: is the primary focus of the project, defining cryptographically sound, hardware attested  mechanisms for user, device and application identity that are feasible to run in small footprints
 - Data resilience: building on the secure processing foundations, protocols will be defined/refined that allow data to be securely stored and exchanged  between devices over heterogeneous networks
 - Interoperability: our project will build upon and refine the state of the art protocols for cross device data exchanged. Any modification required to achieve our security objectives will be published as open spec
 - Joined up, co-operating devices: the driving vision of the project is to define a framework where an outdoor thermometer can work with indoor thermostat, where car data can be shared with a TV. But for this vision to become real 
    - there must be trust in the communication and data sharing frameworks 
    - the permissions between multiple application and multiple services must be manageable by the typical user through intuitive user interfaces

Consequently the project is directly addressing the challenge of both "improving the user experience of immanent pervasive computing" and going "beyond screen" as our research has shown that the fundamental challenges in delivering joined up, pervasive computing use cases, are defining the user interfaces to manage cross device services and most especially mange the privacy and data exposure consequences of cross device services. In the model we propose there is inevitably a shift in the prevailing software paradigm; cross device services are typically highly distributed. Software components run on and collaborate across many devices rather than run a single installation.  

NquiringMinds, Copper Horse and Oxford have been working collaboratively for over three years on cross device communication frameworks, and have substantially moved forward the state of the art, in this space.  Solutions to date however are a) very heavy, a typical software footprint of 30mb per device and b) are challenging for the user to manage effectively.  A project to define and embedded stack optimised for low footprint, with very strong security cryptographic credentials, with hardware attested tamperproof features and  with focussed attention on user interface and user manageability we believe is absolutely critical to realising many of the objectives outlined in the ICT technology inspired innovation project scope


## Project name

The original proposal was called MXD, and acronym for Micro Cross Device Communications.
The title does not directly mention security, which could be a good thing, could be a bad thing.

A proposal to consider PicoSec - simply small security.
.org domain is free

There are research projects (at least a couple) with the same name. But I don think that needs to bother us.







> Written with [StackEdit](https://stackedit.io/).