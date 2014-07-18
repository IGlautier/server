
**Goal: Steal device data over the internet**

IoT device data can be intercepted and stolen over the internet by passive information gathering and analysis of captured metadata or by an active connection to the target device. Upon obtaining the IP address of the target device, an attacker can then sniff the network data or perform a spoofing attack to obtain updates from the target device itself.  
 
1.	Passive information gathering
	<br>1.1	Service Enumeration
		<br>1.1.1	Obtain IP address of target device
		<br>1.1.2	 Analyse metadata
2.	Active information gathering
	<br>2.1	Sniff network data
		<br>2.1.1	Vulnerability Identification
			<br>2.1.1.1	Disable IPS/IDS
					<br>2.1.1.1.1	Use a cracking tool to obtain decryption key
					<br>2.1.1.1.2	Use a packet analyser
						<br>2.1.1.1.2.1	Obtain device password by using a brute force password cracker
						<br>2.1.1.1.2.2	Obtain device password using a dictionary based attack
3.	Launch a source IP spoofing attack (spoof update centre’s IP address) to obtain automatic updates from the target device.
4.	Launch an ARP spoofing attack to masquerade as a legitimate device on the network and receive data from other devices.
	<br>4.1	Perform session hijacking attack to capture device data in transit
