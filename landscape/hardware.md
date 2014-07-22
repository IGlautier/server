#IOT Hardware


## Micro controllers


The following list of devices are typical of the type of microcontroller to be found in an IOT device

Power is the principle limiting constraint on such systems


### TI 8051
http://www.ti.com/mcu/docs/mcugeneralcontent.tsp?sectionId=98&tabId=1515



Microcontrollers
Parametric	MSC	USB
MHz	33	Up to 60
MIPS	8	Up to 30
Architecture	8-bit	8-bit
Code Space	Up to 32 kB Flash	Up to 32 kB RAM
RAM	Up to 1.2 kB	Up to 40 kB
ADC Channels	Up to 8	-
ADC Resolution	24-bits	-
DAC Channels	Up to 4	-
DAC Resolution	16-bits	-
Vref	Yes	-
Serial Interfaces	SPI, I2C, USART	USB, I2C, RS232, IrDA
Pricing (1KU)	$4.60 - $20.95	$1.15 - $5.10


### Arm Cortex ME

http://en.wikipedia.org/wiki/ARM_Cortex-M3#Cortex-M3

Key features of the Cortex-M3 core are:<ref name="M3-TRM">[http://infocenter.arm.com/help/topic/com.arm.doc.ddi0337i/DDI0337I_cortexm3_r2p1_trm.pdf Cortex-M3 r2p1 Technical Reference Manual; ARM Holdings.]</ref><ref>{{cite web | last=Sadasivan | first=Shyam | title=An Introduction to the ARM Cortex-M3 Processor | url=http://www.arm.com/files/pdf/IntroToCortex-M3.pdf | publisher=[[ARM Holdings]]}}</ref> 
* ARMv7-M architecture<ref name="ARMv7-M-Manual"/>
* Instruction sets
** Thumb (entire)
** Thumb-2 (entire)
** 1-cycle 32-bit hardware multiply, 2-12 cycle 32-bit hardware divide, saturated math support
* 3-stage [[pipeline (computing)|pipeline]] with [[branch predictor|branch speculation]]
* 1 to 240 physical [[interrupt]]s, plus [[non-maskable interrupt|NMI]]
* 12 cycle interrupt latency
* Integrated sleep modes
* 8 region [[memory protection]] unit (MPU) (silicon option)
* 1.25 DMIPS/MHz
* [[90 nanometer|90 nm]] implementation<ref>{{cite web | title=ARM Cortex-M3 Specifications | url=http://arm.com/products/processors/cortex-m/cortex-m3.php | publisher=[[ARM Holdings]]}}</ref>
** 32&nbsp;µW/MHz
** 0.12&nbsp;mm<sup>2</sup>


####Chips
The following microcontrollers are based on the Cortex-M3 core:
* [[Actel]] [[Actel SmartFusion|SmartFusion, SmartFusion 2]]
* [[Analog Devices]] ADuCM360
* [[Atmel]] [[AT91SAM#AT91SAM3|SAM3A, SAM3N, SAM3S, SAM3U, SAM3X]]
* [[Cypress Semiconductor]] [[PSoC]] 5
* [[Energy Micro]] [[EFM32|EFM32 Tiny, Gecko, Leopard, Giant]]
* [[Fujitsu]] FM3
* [[Holtek]] HT32F125x
* [[Luminary Micro]] LM3S1968
* [[NXP Semiconductors|NXP]] [[LPC1300]], [[LPC1700]], [[LPC1800]]
* [[ON Semiconductor]] Q32M210
* [[Silicon Laboratories|Silicon Labs]] Precision32
* [[STMicroelectronics]] [[STM32|STM32 F1, F2, L1, W]]
* [[Toshiba]] TX03

The following chips have a Cortex-M3 as a secondary core:
* [[CSR plc|CSR]] Quatro 5300 series (Cortex-M3 as co-processor)
* [[Texas Instruments]] F28, LM3, TMS470, [[OMAP#OMAP 4|OMAP 4470]] (one [[ARM Cortex-A9 MPCore|Cortex-A9]] + two Cortex-M3)


The ARM Cortex M0+ is lower down the hierachy

Nordic supplies a chipset


http://www.nordicsemi.com/eng/Products/Bluetooth-R-low-energy/nRF51822

which is built into the more developer friendly

http://www.rfduino.com/



###ATMega 328P

http://www.atmel.com/devices/atmega328.aspx

The high-performance Atmel 8-bit AVR RISC-based microcontroller combines 32KB ISP flash memory with read-while-write capabilities, 1KB EEPROM, 2KB SRAM, 23 general purpose I/O lines, 32 general purpose working registers, three flexible timer/counters with compare modes, internal and external interrupts,serial programmable USART, a byte-oriented 2-wire serial interface, SPI serial port, 6-channel 10-bit A/D converter (8-channels in TQFP and QFN/MLF packages), programmable watchdog timer with internal oscillator, and five software selectable power saving modes. The device operates between 1.8-5.5 volts.
By executing powerful instructions in a single clock cycle, the device achieves throughputs approaching 1 MIPS per MHz, balancing power consumption and processing speed.

ParameterValue
Flash (Kbytes):
32 Kbytes
Pin Count:
32
Max. Operating Freq. (MHz):
20 MHz
CPU:
8-bit AVR



###ATmega256RFR2


An IEEE 802.15.4 compliant single chip combines an industry-leading AVR microcontroller and best-in-class 2.4GHz RF transceiver. It offers the industry's highest RF performance for single chip devices, with a link budget of 103.5dBm while consuming 50% less current than the existing offerings. The device features hardware assisted multiple PAN address filtering (MAF), improved channel masks on CH25 and CH26 allowing the device to run full power (1W) on these channels using external power amplifiers, wake-on radio, improved link efficiency and reliability using RX override, 32-bit MAC symbol counter, temperature sensor, automatic transmission modes, 128-bit AES crypto engine, true random number generator, high data rate modes, and antenna diversity support.


Parameter	Value
Flash (Kbytes):	256 Kbytes
Max. Operating Freq. (MHz):	16 MHz
Pin Count:	48
Max I/O Pins:	38
Pin Count:	64
SPI:	1
TWI (I2C):	1
CPU:	8-bit AVR
UART:	1
ADC channels:	8

Price: $5 at 1000 units



##Integrated solutions

These solutions include both radio and MCU



### SQI50
http://www.sequoia.co.uk/product.php?id=1852#Specification

Price $5 at 100 units



For more details of the specification and MCU hardware details please download the datasheet.

Ultra Low Power: 0.9 to 3.6 V Operation

-Typical sleep mode current < 0.1 μA; retains state and RAM contents over full supply range; fast wakeup of < 2 μs
-Less than 600 nA with RTC running
-Less than 1 μA with RTC running and radio state retained
-On-chip dc-dc converter allows operation down to 0.9 V.
-Two built-in brown-out detectors cover sleep and active modes
10-Bit Analog to Digital Converter

-Up to 300 ksps
-Up to 18 external inputs
-External pin or internal VREF (no external capacitor required)
-Built-in temperature sensor
-External conversion start input option
-Autonomous burst mode with 16-bit automatic averaging accumulator
Dual Comparators

-Programmable hysteresis and response time
-Configurable as interrupt or reset source
-Low current (< 0.5 μA)
On-Chip Debug
-On-chip debug circuitry facilitates full-speed, non-intrusive in-system debug (No emulator required)
-Provides breakpoints, single stepping
-Inspect/modify memory and registers
-Complete development kit
High-Speed 8051 μC Core

-Pipelined instruction architecture; executes 70% of instructions in 1 or 2 system clocks
-Up to 25 MIPS throughput with 25 MHz clock
-Expanded interrupt handler
Memory

-4352 bytes internal data RAM (256 + 4096)
-64 kB Flash; In-system programmable in 1024-byte sectors—1024 bytes are reserved in the 64 kB devices

Transceiver

-Frequency range = 433,470,868,915 MHz ISM Band
-Sensitivity = –121 dBm
-FSK, GFSK, and OOK modulation
-Max output power = +20 dBm
-RF power consumption
-18.5mA receive
-18 mA @+1 dBm transmit
-40mA @+13 dBm transmit
-100mA @+20 dBm transmit
-Data rate = 0.123 to 256 kbps
-Auto-frequency calibration (AFC)
-Transmit/receive switch control
-Programmable packet handler
-TX and RX 64 byte FIFOs
-Frequency hopping capability
-On-chip crystal tuning
Digital Peripherals

-19 or 16 port I/O plus 3 GPIO pins; Hardware enhanced UART, SPI, and I2C serial ports available concurrently
-Low power 32-bit SmaRTClock
-Four general purpose 16-bit counter/timers; six channel programmable counter array (PCA)
Clock Sources

-Precision internal oscillators: 24.5 MHz with ±2% accuracy supports UART operation; spread-spectrum mode for reduced EMI; Low power 20 MHz internal oscillator
-External oscillator: Crystal, RC, C, CMOS clock
-SmaRTClock oscillator: 32.768 kHz crystal or self-oscillate
-Can switch between clock sources on-the-fly; useful in power saving modes and in implementing various power saving modes
I/O Port

-19 or 20 port I/O (5 V tolerant except for GPIO_2)
Package

-30 pin SMD (11x25X2.0 mm)



###Microchip MCU +RF

http://www.microchip.com/wwwproducts/Devices.aspx?product=PIC12F529T48A

MHzPIC12LF1840T48A7.1K418


PIC12LF1840T48A7.1K418–868 MHz

with 256 bytes of ram


###Atmel ATSAM3S4A
http://www.atmel.com/devices/sam3s4a.aspx


A member of the Atmel® SAM3S series microcontrollers based on the high-performance 32-bit ARM® Cortex™-M3 RISC processor. It operates at a maximum speed of 64MHz and features 256KB of flash and 48KB of SRAM. The extensive peripheral set includes a FS USB device port with embedded transceiver, USART, two UARTs, two TWIs, two SPIs, I2S, PWM timer, three 16-bit timers, RTC, eight 12-bit ADCs and an analog comparator. The QTouch® library offers an easy way to implement buttons, wheels and sliders. The parallel data capture mode on the PIOs collects data from external devices not compliant with standard memory read protocols, such as low-cost image sensors. The data is then transferred to memory by DMA offloading the CPU. The device operates from 1.62V to 3.6V, is available in 48-pin QFP and QFN packages, and is pin-to-pin compatible with the SAM3N4A.

Price $6 
	



###Atmel Atmega328P at 8MHz



#GBoard built in arduino and GSM

http://imall.iteadstudio.com/im120411004.html



#enocean 868 moduel
http://uk.farnell.com/enocean/enocean-pi-868/rf-module-transceiver-ask-868mhz/dp/2322460




#TI - Contiki supported

CC2538 - model
802.14.5 + ZIgbee + 6lowpan

Microcontroller
Powerful ARM Cortex M3 With Code Prefetch
Up to 32 MHz Clock Speed
512-kB, 256-kB or 128-kB In-System-Programmable Flash
Supports On-Chip Over-the-Air Upgrade (OTA)
Supports Dual ZigBee Application Profiles
Up to 32-kB RAM (16-kB With Retention in All Power Modes)
cJTAG and JTAG Debugging

volume price £3.50


http://uk.farnell.com/texas-instruments/cc2538sf53rtqt/rf-zigbee-transceiver-qfn-56/dp/2422917

Developer kit £220

http://uk.farnell.com/texas-instruments/cc2538dk/cc2538-zigbee-802-15-4-dev-kit/dp/2356505

#ATMel ATMega
volume prince 10us

can work out if it has integrated RF- contiki says yes but cannot find

#MC13224V: 2.4 GHz 802.15.4 RF and 32-bit ARM7™ MCU with 128KB Flash, 96KB RAM

?? too high spec - must be pricey and power hungry
farnell stated discontinued


# http://www.ti.com/tool/msp-exp430f5438
needs investigation


##Develop grade boards

We distinguish these from the commercial systems largely based on price, you can typically pay 10x price for developer friendly boards over and above the base components

These include the Arduino based solutions


###JeeNode

http://moderndevice.com/products/jeenode-kit


JeeNodes are a collaboration between Modern Device and a talented and energetic engineer, Jean-Claude Wippler. See his impressive blog and webshop. We do much of the manufacturing for JeeLabs and are the US representative for JeeLabs products.

The flagship Jee Product is called the JeeNode. Jean-Claude was inspired partly by the RBBB, but he added two big ideas of his own. The first idea was to couple a low-cost radio to the RBBB, enabling wireless communication. For many people who wish to just send a few bytes from a sensor to a receiver, the available wireless options, such as XBee, are expensive overkill. So we think this little board fills an useful niche at an affordable price.

Radios are available in 433 MHz & 915 MHz in the US and 433 & 868 MHz in Europe, all unlicensed ISM (Industrial, Scientific, Medical) bands. We only ship 915 MHz radios to countries that use the 915 MHz band. This includes countries in North and South America, Greenland, Israel, and Australia for a brief list. Please fill us in if your country uses the 915 Mhz ISM band.

Price $20 per node


###PanStamp


Price 13.50 euro per node

	

### General list from Postscapes

http://postscapes.com/arduino-wifi#rf



### 868 extension for PI
http://busware.de/tiki-index.php?page=COC

Price $50+

#anarduino - build in 868
http://www.anarduino.com/miniwireless/

Better from price point that above system. Also considerably smaller.



##Development Systems