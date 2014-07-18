**Goal: Steal device data over a wireless network**

An attacker who aims to steal device data wirelessly would need to first discover the SSID of the victim’s network to gain access to it and then sniff the device data on the network. If this network data is encrypted, the attacker would need to use a cracking tool to obtain the decryption key and then analyse the network traffic using a packet analyser. A packet analyser alone would suffice if the network data is in an unencrypted state.
 
1.	Discover victim’s network
	<br>1.1	War driving
		<br>1.1.1	Obtain SSID and gain entry to network
			<br>1.1.1.1	Use a cracking tool
			<br>1.1.1.2	Use a packet analyser
		<br>1.1.2	Bribe target user to gain entry
		<br>1.1.3	Social engineer user into revealing SSID
		<br>1.1.4	Blackmail target user to gain entry
2.	Sniff network data
<br>Network data can be sniffed at a distance using additional equipment such as a cantenna. This could also be achieved by flying a Wi-Fi Pineapple equipped drone over the target network.
	<br>2.1	Use a packet analyser
		<br>2.1.1	Use a cracking tool to brute force device password 
		<br>2.1.2	Obtain password by dictionary based attack
	<br>2.2	Use a cracking tool
		<br>2.2.1	Obtain decryption key
3.	Pose as legitimate firmware update centre by poisoning cache/ spoofing source address of attack
4.	Gain access to target house
	<br>4.1	Disable IPS/IDS
		<br>4.1.1	Install a rogue access point
			<br>4.1.1.1	Launch a Man-in-the-middle attack
