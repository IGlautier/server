## Use cases 

**1. Home energy**<br>
**2. Telematics**<br>
**3. Health care**

### 1. Availability
	
**Attack Goal:**
Denial of service attack on IOT device

There are a wide number of DoS attacks that can be launched against the IoT. Beyond traditional Internet DoS attacks that exhaust service provider resources and network bandwidth, the actual wireless communication infrastructure of most data acquisition networks can also be targeted (e.g. jamming the channels). Malicious internal attackers that take control of part of the infrastructure can create even more mayhem.

A DoS attack can be carried out in 3 ways:
 
1.	By attacking the network and taking a device off the grid. An example of this would be cutting a connecting power cable. 
2.	By disrupting the communication channel and interrupting communication between devices. This could be achieved by a signal jamming attack or an IP flooding attack.
3.	By physically removing a device from the network or destroying it. This would include theft of the device.
<br>In this attacker model, active attackers usually lack technical knowledge, and can only hinder the provisioning of IoT services by destroying the actual ‘things’. This is a realistic attack in the IoT context, because things might be easily accessible to anyone (e.g. a street light). 

**Impact:**

**a. Home:** In the case of a power management system, an attack on the availability of the system can cause significant errors in billing depending on the downtime. 

If one considers the case of a home energy control system, an attack on a water control system could have potentially serious implications such as flooding of the targeted home.


**b. Telematics:** TBD

**c. Health Care:** TBD
	
### 2. Integrity

**Attack Goal:**
Modification of data 

Device data can be modified either in transit between two devices or a device and a centralised update system, or it could be modified whilst in storage.

**Impact:** 

**a. Home:**  Modification of device data impacts, for example, the billing for the energy used by the device. Data, such as updates that are being sent from a centralised control system to a home IoT device could also be modified with consequences, such as improper functioning of the system.

**b. Telematics:** TBD

**c. Health Care:** TBD

### 3. Confidentiality

**Attack Goal:** 
Theft/Disclosure of data

Passive attackers can target various communication channels (e.g. wireless networks, local wired networks, Internet) in order to extract data from the information flow. An attacker that gains access to a particular infrastructure will be able to extract the information that circulates within that infrastructure. 

Instead of things, active attackers can also target other infrastructures that store information, such as data processing or data storage entities. Most adversaries will aim to target systems that provide the biggest payoff, and central entities fall under this category – they store, manage, and process a huge amount of information. 

**Impact:**

**a. Home:** If the device data is breached either in storage or in transit, it could constitute a breach of privacy and disclosure of sensitive data.  This data could be analysed on the fly or it could be stored and used later for further attack. (Such as for a replay attack). 

Data that has been intercepted can be studied for patterns or to gain further information about the functioning of the system. This information could be used for further attack, either a physical attack conducted locally or a remote attack.

Device data gathered from an organisation could also be disclosed for financial gain.

**b. Telematics:** TBD

**c.  Care:** TBD

### 4. Authenticity	

**Attack Goal:** Spoofing of authorised user privileges

**Impact:**

**a. Home:** If a malicious user gains access to an IoT device, he could possibly manipulate device data or spoof a false alert back to the user.

A malicious user, either an authorised user with limited access or an unauthorised user, could manipulate device data by spoofing user privileges to gain access to the system and then perform a host of attacks.

**b. Telematics:** TBD

**c. Health Care:** TBD

### 5.Non-Repudiation

**TBD**
			
