#Architectural foundations

In this section we shall outline certain architectural foundations, background assumptions and technical terminology that underpins all other areas.



##IOT device
The IOT device is a typically small device, directly or indirectly connected to the internet that contains one or more sensors or actuators. The typical characteristics of an IOT device are
* has one or more attached sensors or actuators
* has an (intermittent) realtime connection, this connection may (but is not necessarily) and internet (IP) connection
* has low power consumption requirements
* has a small micro-controller capable of minor local processing

##IOT application
The IOT application is connected via internet protocols, either directly or indirectly, to the IOT device and operators on either the sensor streams, or controls the actuators.


##Driver vs Protocol Direct model

In typical IOT deployments there are two principle flavours of deployment architecture

* Driver model or Hub model assumes there is some intermediate entity between the IOT Device and the IOT application. This Hub device implements a driver, which converts between internet friendly IOT protocols to different (often) proprietary protocols and different bearers
* Protocol direct model: this supports the same protocol all the way from the IOT application to at least the micro-controller on the IOT device.

	
#IOT Protocol

We consider three application level protocols in scope for picosec.
* webinos
* CoAP
* MQTT

We will attempt to demonstrate both interoperability and security features across all three protocols

## webinos model
Webinos technology is based on JSON-RPC and feature URI feature discovery.


#CoAP Integration

we need to define how a CoAP session, and in particular the security aspects can interwork with CoAP  

#MQTT Integration

we need to define how a MQTT session, and in particular the security aspects can interwork with MQTT 