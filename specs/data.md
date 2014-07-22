

#API Specifications

The PicoSec will take the following specifications as initial input

- GenericActuator
- GenericSensor
- Discovery
- GeoLocation
- DeviceStatus


These APIs will be JavaScript wrappers, accessible from the web programming context and will grant a developer access to key capabilities resident on a local or remote IOT device.

There should be multiple possible implementations of these APIs, one of which will be mapping to the JSON-RPC layer.

It should be possible to also map these same functional primitives to other underlying protocols such as CoAP or MQTT.

