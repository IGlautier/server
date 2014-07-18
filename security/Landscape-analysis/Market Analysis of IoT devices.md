The M2M industry is comprised of different segments such as automotive, smart city, building 
automation, smart energy, manufacturing, agriculture, security and safety, health, education etc. 
Although the use cases are quite different, one thing all these areas have in common is that they require not 
only connected devices able to communicate over a variety of network connections, but these 
devices also require remote configuration and control capabilities. For example, M2M devices 
may need to be remotely ‘woken up’, they will require several firmware updates during their 
lifetime, or devices need to be configured for a certain network bearer, or data reporting periods 
and measurement thresholds need be set, or the device’s location has to be provided to a tracking 
centre. It is commonly recognized that the millions of connected devices that make up M2M 
systems and are part of the Internet of Things need to be switched on, configured, provisioned for 
services, maintained, updated with software, possibly switched off and on again, recovered from 
error conditions, monitored, queried for data, repaired, their applications managed and finally the 
devices taken off their network connections at the end of their lifetime. And ideally, all this 
happens remotely.

### 1. Nest

The Nest Learning Thermostat is an electronic, programmable, and self-learning Wi-Fi-enabled thermostat that optimizes heating and cooling of homes and businesses to conserve energy. While the Nest Thermostat doesn't require a Wi-Fi connection, additional features like remote control and automatic software updates are only available when the Nest Thermostat connects to the Internet. 

The benefits of connecting the Nest Learning Thermostat to Wi-Fi include the use of features such as:
* Remote control.
* Automatic software updates.
* Nest Energy Reports.
* Weather awareness for heat pump auxiliary heat switchover temps.

**Device Enrolment**
 
1. After your Nest Learning Thermostat is installed for the first time and the power is turned on, the Nest Thermostat will begin setup.
2. When connecting the Nest Thermostat to your home Wi-Fi network, you’ll see a list of nearby Wi-Fi networks. Turn the ring to highlight your home network.
3. Once you’ve selected your network, the password screen will appear (if your network is secured). Use the onscreen keyboard to type out your password. 
4. Turn the ring to highlight the letter, number or symbol in your password and press to select it. 
5. Create a Nest account to be able to control Nest from your mobile/tablet/laptop
6. When you create a Nest Account your Nest Learning Thermostat will usually automatically detect it if it's on the same network as the smartphone or computer you used to create the account. A message will pop up on the Nest display to ask if you'd like to pair your thermostat to this account. Just press the thermostat’s ring to confirm.

**Technical specifications**

User Interface: <br>
The Nest thermostat has an LCD color display and one needs to rotate the Nest's outer ring to make selections and press in to confirm a selection.

If you need to find any technical information regarding your Nest Learning Thermostat, such your IP address or what software version you have, you can find it in Technical Info. Press the ring to access the menu and turn the ring to SETTINGS. Within Settings, select TECHNICAL INFO.

You’ll find information regarding your Nest Thermostat's sensors, your Wi-Fi Network, the serial and model numbers associated with your device, the IP address  and MAC address for your Nest Thermostat, the Subnet mask and router and name server details.

Wireless:<br>
802.11b/g/n @ 2.4GHz <br>
802.15.4 @ 2.4GHz

**MXD Implications:** 

Connecting Nest to the home Wi-Fi network is relatively simple for a user. The Nest thermostat automatically detects available Wi-Fi networks and created network accounts on a smartphone or computer registered on the same network. Creation of a network account is a matter of downloading the nest app on a smartphone and registering with a valid email address or navigating to the nest.com website on a computer. 
Currently, the Nest Thermostat can connect to open (no-password) home networks or to networks that follow PSK (Pre-shared key mode) or personal security protocol, specially designed for the home and small business. These security systems are typically labeled WEP, WPA, and WPA2 Personal.

> Assuming you do get the Nest to connect to your Wi-Fi network, you're in for more fun. If you use any sort of security on your wireless network, along with a strong passphrase, you'll soon find that the Nest only offers one input method. You rotate the dial to each digit or letter of your wireless security key. If you need to change from letters to numbers, or to choose uppercase letters or symbols, you have to move the dial to that point, make the switch, enter what you need and then switch back. This is mind numbingly tedious and extremely error prone. I tried it four or five times before finally giving up on it. It was my dad and brother who persevered and made it work. In the age of easy, well established methods of Wi-Fi network setup and security configuration, this is inexcusable. What year is it at Nest Labs?

There's no web server built into the Nest, no WPS support, or even a way to feed the Nest a configuration file to make this process any easier.

**Source**: https://nest.com/thermostat/life-with-nest-thermostat/

### 2. Hive

Hive Active Heating lets you control your heating and hot water remotely from your smartphone, tablet and laptop. Hive includes a wireless receiver, thermostat and a hub.

_Thermostat_ <br>
The wireless thermostat enables you to turn the temperature up or down and set schedules when you're at home. 

_Hub_<br>The hub plugs into your broadband router so that your thermostat can connect to the internet and be controlled remotely. 

_Receiver_ <br>The receiver enables your thermostat and boiler to communicate with each other.

**Device Enrolment**

1. Install the hub
<br> To install the hub there has to be a broadband connection with a spare network port and a power supply nearby. Connect the hub to the household’s broadband router using the network cable provided. Fit the power cable into the hub and plug it into a power socket. Wait for an amber flashing light. 
Multi-coloured lights and a red light will flash, followed by the amber light. This usually takes less than 30 seconds but can take up to 5 minutes if updates need to be downloaded.

2. Install the receiver<br>
You should fit the receiver in a convenient location close to the boiler or central heating system.

3. Add the thermostat<br>
Mount the thermostat in a suitable location. The hub is ready to connect if it is flashing amber. After inserting batteries into the thermostat, the display will show ‘FIND’ – meaning it’s searching for the hub and receiver. The thermostat will then display room temperature – meaning it’s connected successfully to the 
hub and receiver.

4. Online account setup<br>
Hive Active Heating is now installed and ready to be registered. There are two ways to complete online setup:
<br> a. Set up using a web browser<br> b.Set up using the smartphone app. 

**Technical specifications**

User Interface: <br>
The hive has a screen and four buttons that allow you to increase or decrease the temperature and go forward and back through menus.

Geolocation is another clever feature from Hive. It alerts you when you've gone out and left your heating on, or when you're returning home and the temperature's set lower than you'd like. It's optional to use and works with your mobile's location services and wi-fi connection. Geolocation is now available on the Hive iOS and Android app.

**MXD Implications:**

British gas specifies that Hive installation should only ever be carried out by a qualified engineer. This involves setting up the receiver and Hive thermostat as well as the hub. The hub needs to be physically connected to your router using a network cable (like the one provided with your hub).
The final step in the device enrolment process involves the online account setup wich can be done using a web browser or a smartphone app. This is done by logging in using the account details supplied in the order confirmation email and entering the hub ID( XXX-123 formatted) number on the underside of the hub. 


**Source**: http://www.britishgas.co.uk/products-and-services/hive-active-heating/how-it-works.html

### 3. Fitbit Flex/Zip/One

Fitbit activity trackers are wireless-enabled wearable devices that measure data such as the number of steps walked, quality of sleep, and other personal metrics. 

**Device Enrolment**

1. Install the software and run the installation file. <br>Fitbit's Uploader software uploads your Tracker's stats from your base station to your personalized dashboard on Fitbit.com, so you can track your activity, log food, and much more.
2. Set up an account. <br>During the software installation, you'll be guided through a process to set up your Tracker device and register an account on Fitbit.com. If you already have an account, you will be able to sign in. Note that only one Fitbit tracker can be paired to an account. If you currently have a Fitbit tracker paired to your account, when prompted you can choose to replace your existing tracker and continue setting up the new tracker. Your synced data will remain intact. 
<br> After filling out your personal information, you'll be asked which device you're setting up. Select the appropriate tracker to continue.
3. Plug the wireless USB sync dongle into your computer (this is the smaller USB device--not the charging cable), and bring your tracker near to it to begin pairing.<br>
**Tracker Pairing:**
<br> The tracker will display a number which ensures that the tracker is the device that the software is communicating with.
<br>Force, One, or Zip: You will see a pairing number that appears on your tracker's display once your device has been located; enter this number on your computer.
Flex: Follow the onscreen instructions and rapidly tap the device when instructed, then confirm its vibration.
<br>The base station wirelessly syncs data from your Tracker to your computer, whenever you are within about 15 feet. You'll also use it to charge the Tracker's battery every 5-7 days.
4. After clicking Next, your tracker will connect to your Fitbit.com account. This can take up to a minute.
Once your tracker has connected to Fitbit.com, you may be prompted to enter a greeting (depending on which tracker you have). This can be your name or any 8-character combination of letters or numbers. <br>
When your tracker is linked with your Fitbit account, Fitbit Connect will notify you and present some basic instructions on using your device.<br>
You can now log into your account dashboard to view your synced data. <br>
You will not need to repeat these steps once they have completed--you can simply login to http://fitbit.com to access your dashboard.

**Technical specifications**

Fitbit’s trackers offer Bluetooth Low Energy connectivity. Syncing occurs automatically any time the Fitbit tracker is within about 20 feet of the wireless sync dongle and is relatively motionless. The dongle plugs into your Mac or PC's USB port. Syncing and uploading require use of the Fitbit uploader application.
The tracker features a display that shows the pairing number when the tracker has been located (paired up with wireless USB dongle). 

The Fitbit One and the Fitbit Zip were the first wireless activity trackers to sync using Bluetooth 4.0 or Bluetooth SMART technology. 

**MXD Implications:**

Enrolling a Fitbit tracker involves a number of steps. After setting up an account on fitbit.com, the tracker is synced to the installed software by pairing the tracker with a wireless USB dongle that plugs into the computer running the software.

**Source**: http://www.fitbit.com/uk/manual#section-start

### 4. iKettle

With the iKettle you can start boiling your kettle from anywhere in the house. The iKettle tells you when your hot water is ready to pour, reminds you to refill and tells you when the kettle is empty.

**Device Enrolment**

1. After installing the iKettle app on your smartphone, to set up the iKettle, ensure that you are within range of your home network. Also ensure that your iKettle is plugged in and filled with water. Then press next on the app.
2. The app will automatically connect to the iKettle network on an Android device. To connect to the iKettle network on an iOS device, select the network manually by navigating to the network settings. 
<br> This process allows your iKettle to have a more stable connection and ensures that you can use the internet at home as well as your iKettle.  You won’t need to switch between the two as you would on some wireless printers for example.  The iKettle is allocated a spot on your router where it will stay connected. By entering your home network name and password you are giving permission for your router to allow the iKettle to connect.
3. Enter your Wi-Fi password(if password protected) and press next.
<br>The iKettle will now connect to your home network.

**Technical specifications**

The iKettle comes with a built in smart chip, which contains a state of the art wifi module. This allows you to connect your smartphone via your home network so you can access all the features remotely.


Connectivity:<br>
Wireless 802.11b/gx<br>
WPA/WPA2<br>
Requires a 2.4Ghz router

**MXD Implications:**

When you first turn on the kettle it acts as a wifi hotspot and the iKettle app for Android and iPhone reconfigures the kettle to then connect to your local wifi hotspot instead. The app then communicates with the kettle on your local network enabling you to turn it on, set some temperature options, and get notification when it has boiled.

**Source**: http://wifikettle.com/support/

### 5. Lockitron 

Lockitron is a device which can lock and unlock deadbolt locks via remote control, typically a smartphone. The device fits over the lock control mechanism on the inside of a door, and the door can then be unlocked via an app on the phone, or via web page control.

**Device Enrolment**

1. To get Lockitron set up on your WiFi network, you will need to use the Lockitron Android or iOS app. With the Lockitron app installed, head to "Setup New Lockitron". 
2.  Lockitron is added to your WiFi network using a process called "BlinkUp". <br> This is done by holding your phone close to Lockitron's top right corner during BlinkUp.
3. When you type send BlinkUp, the app will "Blink" the credentials over to the device using your screen. With BlinkUp, you will be prompted to select the correct WiFi network and type in the WiFi password.

**Technical specifications**

Connectivity: <br>
Lockitron connects to your local-area-network (LAN) using WiFi (802.11b/g/n @ 2.4 GHz) and has a range around 300 ft from your router.

Phones with Bluetooth Low Energy (4.0) can also automatically unlock a door when an authenticated is nearby.  A supplied NFC tag can be read to trigger a command to toggle the state of the lock.

**MXD Implications:**

Inside of every Lockitron is an Electric Imp WiFi module. Electric Imp contains a WiFi chip that dramatically simplifies getting Lockitron onto your network. Just enter your WiFi network information into the iPhone or Android Lockitron app and hold your phone’s screen up to the Lockitron to transfer your WiFi password and network information from your phone’s screen onto your Lockitron. 

**Sources**: <br>
1. https://lockitron.com/pdf/installation_manual_lockitron.pdf<br>
2. http://help.lockitron.com/article/59-connecting-lockitron-to-your-wifi-network

### 6. Wireless Sensor Tags

Wireless Sensor Tags allow monitoring temperature/RH and open/closed status of gate/doors in your home or office, from anywhere with Internet access. Attach them to easy to lose items and locate them through beeping sounds. Data logging, out-of-range and back-in-range notification features come standard on all types of sensor tags.

**Device Enrolment**

1. Install the iPhone/iPad app. Use the 12 digit serial numbers on your Ethernet Tag Manager to create a login. 
2. Associate Wireless tags
<br>For water/mositure sensors,f activate by shorting the tip using a metal object (scraping the tip using a coin, for example) or dipping the tip into water. A red light should start flashing on the sensor every few seconds for about 2 minutes, before the sensor goes into sleep again. Search & associate like other tags while the light is flashing.
<br> An unassociated tag periodically broadcasts information about itself when powered on. Click the "Scan" button to receive this information. 
3. Assign tag names 

**Tag Manager Ethernet port specifications**

10Base-T
Requires DHCP server (Most routers/modems typically support DHCP)
Firewall must allow outgoing HTTP (port 80) and port 6667 connection

**Tag Specifications**

Line of sight, we measured 700ft+ range vs. ~150ft range (in default setting) of 1st gen sensor tag. This means the long range sensor tags will work extremely well anywhere in your house, no matter if it is inside a metal fridge, behind a metal door, or inside mail box in your front yard. We did this by a combination of increasing transmit power to FCC limit, using optimal frequency modulation index, 5x more accurate frequency reference (10ppm) and new frequency control techniques to allow 7x narrower receiver bandwidth of 20kHz to filter more noise. 20kHz is 1000 times narrower than the bandwidth of WiFi 802.11a/b/g. with advanced DSP-based filtering, 1000 times less noise at receiver output directly leads to higher sensitivity and longer range, even at lower transmit power than that of WiFi to achieve longer battery life / smaller battery size.

_Automatic Radio Transmit Power Control:_

Long range radio comes at a price: when transmitting at max power, it drains the battery 3x faster than the old version tags.

However, most of the cases the tag does not need to transmit at max power. When tag manager receives a transmission from the tag, and if the signal strength is higher than -70dBm (4 bars) it automatically calculates how much the tag needs to reduce its power and sends this information back to the tag.

On the other hand, when the tag cannot get acknowlegement from the tag manager, it slightly increases its configured transmit power and tries again.

The tag is powered by a single CR2032 button cell Lithium battery. The onboard processor is a Microchip PIC16LF720 micro-controller that draws about a fifth of the current than the Amtel ATmega micro-controllers used in the Arduino boards. Wireless operations for the tags is provided by the Microchip MRF 49XA radio, which operates in the sub-GHz MHz ISM bands. While this can be changed, the tags ship and by default operate at 436 MHz. 

> The choice of the sub-GHz ISM band is an interesting one, most competing products on the market use the 13MHz RFID bands, or more commonly the 2.4GZ band used by both Wi-Fi, Zigbee and Bluetooth LE devices. I'm guessing that they went with the sub-GHz bands to keep power usage to a minimum and extend the battery life of the tags themselves and provide a good range.


**MXD Implications:**

The system is based around an Ethernet Tag Manager, a small box that connects directly to your home router and manages  all the associated tags. Basically it acts as a bridge between the wireless tags themselves and the Cloud backend which manages the tags.

Setting up the system is a fairly simple procedure. Plug the tag manager into your router and let it grab a DHCP address and announce itself to the mytaglist.com server. Theoretically the tags included in the tag manager in your shipment should come pre-associated, but at least for me this didn't seem to be the case, but that said associating them is no big deal. Pull the battery tab, and if you have a flashing LED that means the tag is unassociated, go to the web app and click on the button to add a new tag. The tag then shows up in the list on the web backend and you can go ahead and configure the triggers for that tag.


**Sources**: <br>
1. http://wirelesstag.net/ <br>
2. https://www.mytaglist.com/index.html

### 7. GreenWave Reality LED bulb

The GreenWave Reality Connected Lighting Solution consists of high-quality, connected LED bulbs, a hand-held remote controller, and an optional Gateway that allows for complete remote lighting control.
Each light bulb contains a wireless antenna that allows for high quality reliable communication between the bulbs using the wireless network. The network connects all lamps together, allowing flexible wireless control of all devices in a house. Each end node has an IPv6 address and can be controlled either individually or as part of a group.

**Device Enrolment**

TBD

**Technical specifications**

The GreenWave Reality connected lighting solution is based on JenNet-IP, an ultra-low power 6LoWPAN mesh-under tree network with low memory footprint, specifically targeting low-power IEEE 802.15.4-based networking for residential and commercial applications.
 
An IEEE 802.15.4 standard-compatible integrated RF transceiver and wireless microcontroller with a Tx/Rx current below 17mA.

Low-power, IP-based wireless connectivity enabled by JenNET-IP network layer software.

**MXD Implications:**

_Lighting Gateway and Remote_

The lighting Gateway is the hub that connects the smart bulbs to your home network. It passes control between your Smart Phone/Tablet and your lamps. The Gateway can do this locally on your Home Network or through our cloud server when you’re not at home.

The Lighting Remote control can control four groups of bulbs and can turn the lights on and off, or dim them. The Lighting Remote can be used with or without the gateway.


**Sources**: <br> http://www.greenwavereality.com/solutions/connected-lighting-solution/

### 8. Loc8ter Pet GPS

Loc8tor Pet GPS technology uses global satellites to track your pet and it uses a SIM card to report your dogs location. Loc8tor Pet GPS's detailed tracking panel on your computer, tablet or mobile phone lets you see exactly where your dog is on the map. Using the online tracking panel you can not only track your dog but see exactly where they've been. You can also set up safety zones and as soon as your dog steps outside it, you'll receive a text message or email telling you where they are. 

**Device Enrolment**

1. Plug in the tracker to give it a power top up and it is ready to work straight out of the box.
2. To use your mobile phone to follow the tracker, go to mytrackingpanel.com/#map from any internet enabled mobile device including a tablet and enter in your IMEI. 

**MXD Implications:**

All Loc8tor Pet GPS trackers come supplied with a SIM card which is locked to that device.

**Sources**: <br> http://www.loc8tor.com/uk/pets/dogs/loc8tor-pet-gps.html/

### 9. Savannah Tracking GPS-GSM Wildlife collar

The GPS-GSM collar obtains positions via GPS at user defined intervals. In addition to GPS positioning the unit can be set to record accelerometer based activity recording either continuously or at defined sample intervals. 

**Setup of the Savannah Tracking data manager**

1. Download the Savannah Tracking Data Manager setup file “sdm.exe” from drop box on 
http://dl.dropbox.com/u/49101503/sdm.exe 
 
2. Run the sdm.exe which will take you though the following steps:
Use the suggested installation locations and setting or specify alternatives. 

3. Once the program starts you will receive a downloading error as you have not yet entered your credentials. 
 
4. Go to “Settings” in the tool bar and select and enter the username and password provided to 
you at time of collar delivery. 


**Technical specifications**

Position acquisition: GPS <br>
Data Transmission: GPRS via GSM network. Data downloaded via free data manager software. <br>
Activity recording: 3D Accelerometer based activity recordings which are linked to a mortality alarm system providing you with an alert SMS in case of mortality or unusual activity. <br>
Communications: Two way communication enabling you to reschedule data collecting interval, activity recordings and mortality alarm settings (assuming animal with GSM coverage) <br>

**MXD Implications:**

The GPS-GSM collar obtains positions via GPS at user defined intervals. In addition to GPS positioning the unit can be set to record accelerometer based activity recording either continuously or at defined sample intervals. Communication is two way and allows the user to change the data recording schedule after deployment. Data is send from the unit via GPRS to a server and can be downloaded by the user using the free accompanying software. If the unit is outside GSM coverage the data will be sent as soon as the unit returns to coverage.

All data is stored as a backup on board in non volatile memory and can be downloaded once the unit has been recovered.

The unit can be set not to transmit data via GPRS and hence only act as data-logger. This could be an advantage if you are tracking animals where recapture is easy and with no need for real time data. You hereby avoid the power drain linked to data transmission and obtain a longer lifespan of the collar. Even in Data-logger mode the unit can be reconfigurations and can thus remotely be switched from data-logger to GSM (assuming inside GSM coverage).

**Sources**: <br> http://www.savannahtracking.com/index.php?id=5

### 10. ioBridge

ioBridge makes it easy to monitor and control nearly anything via your smart phone or web app using our general purpose web gateways. 

_Web Gateways_

ioBridge offers a range of web gateways or modules that connect products and devices to the Internet. Ethernet or Wi-Fi options are available, allowing for plug-and-play configuration and operation. Easily attach sensors or actuators to the Internet in seconds.

_Sensors and Actuators_

These sensors and actuators are typically small circuits that plug directly into one of the web gateway channels. ioBridge classifies its sensors and actuators into two types: Function Boards that use the analog input or digital inputs and outputs, and Smart Boards that extend the functionality of the web gateway.

**Device Enrolment**

1. Connect one of the sensors or actuators to one of a range of available web gateways.
2. Connect the gateway to Ethernet and Power.<br>
The web gateway connects to the internet automatically.
3. Open up your computer's web browser  or smartphone to link to the dashboard and create widgets to  monitor and control your device from anywhere.

**Technical specifications**

ioBridge standard web gateways require an Ethernet connection and custom Wi-Fi. Zigbee and other wireless options are also available.

_Network_

Gateways requires a 10/100/1000Base-T auto-negotiated Ethernet connection. Because of the way gateways communicates with the server, no additional ports need to be opened on the firewall or router.

_MAC Filtering_

If the network uses MAC address filtering, the module’s MAC address will need to be added to the router’s “allow” table. The MAC address of the module is configurable via the ioBridge.com Interface.

_IP Addressing_

If the network uses DHCP, the module will request an IP address and obtain an IP automatically by default. If DHCP fails, the module sets itself to an IP address of “169.254.19.77”. By using the telnet menu, the IP Address, Subnet Mask, Gateway, and DNS Addresses are configurable.

**MXD Implications:**

Connecting sensors/actuators to the internet is a matter of plugging in the sensors to the web gateway that is in turn connected to the router and internet at large via Ethernet/Wi-Fi.  

ioBridge Web Gateways are input-output (I/O) routers that act as the interface between local devices or things and ioBridge’s servers on the internet (ioBridge cloud servers). The ioBridge web-gateway has an Ethernet connection like a home computer that plugs into a local network and creates a connection to ioBridge’s cloud servers.  The ioBridge Web Gateways have I/O channels that enable the control and monitoring of digital inputs, analog inputs, serial data, servos, relays, and digital outputs using web-interfaces provided by ioBridge.

**Sources**: <br> http://connect.iobridge.com/docs/#IO-201_Wi-Fi_Web_Gateway_for_Internet_of_Things_Applications

http://connect.iobridge.com/gateway-configuration
