#Statement of problem

* IOT objects to be able to symmetrically communicate real-time whit connected services
* This requires and always on connection
* TLS over TCP is problematic for IOT devices for two reasons
 * 100,000 IOT nodes maintaining a TLS connection with the server is very difficult to handle server side
 * The default suite of algorithms required for key exchange and encryption has a very large footprint not suitable for IOT devices
 * There is a third potential issue: there maybe instances where IOT hubs are hosted behind a router. If an cloud based application wishes to connect, this would require tunnelling a TLS connection through a router. Although possible this configuration is beyond a typical users comfort zone.
 * 

#DTLS relevance
DTLS offers the possiblity to address some of these issues

1. because it is UDP based, it should scale better for the 100,000 node problem
2. UDP can tunnel through firewalls more easily.


# Background discussion

## Microsoft Azure

A number of conversations have been held with Microsoft Archirect Clemens Vasters on this issue



A public blog entry on this subject

http://vasters.com/clemensv/2014/02/06/In+Search+Of+Lightweight+Secure+Tunnel+Protocol+For+Use+Between+Wellknown+Peers.aspx


> We’re landing on TLS v1.2 with TLS/PSK RFC4279 http://tools.ietf.org/html/rfc4279 and RFC5077
 
>I’m aiming for the 
>1.       TLS_DHE_PSK_WITH_AES_256_CBC_SHA  or
>2.       TLS_PSK_WITH_AES_256_CBC_SHA 
 
>profiles, in order of preference, meaning that I think the best option (1) is to use pre-shared keys with a Diffie-Hellman negotiation of session keys to be safe against replay attacks and provide perfect-forward secrecy and the (2) second best option is to use a lighter-weight and yet somewhat reasonably secure model where PSK doubles as the session key.
 
>We believe the resulting implementation can be very lightweight since it sheds all the certificate goop and massively constrains the algo suite.


Based on an expression of requirements

*       Replaying your requirement – ideal protocol needs
 *       Mutual authentication handshake
 *      Generation of key
 *       Tie key to session ID
 *      Payload en/decrypted with key, transferred over UDP, de-framed/de-ordered and managed through sessionID
 *      An option to re-bump key, either algorithmically or on request?
 *         How long lasting do you want sessions?
*      For client requirement – the following algorithms need to be lightweight as possible
 *      Mutual authentication handshake
 *      Key generation
 *       Encryption
*       For server requirement  - a UDP bearer 


Requirements


> * does NOT rely on or tie into PKI and especially
> * doesn’t require the exchange of X.509 certificates for an initial handshake,
> * supports session resumption, and
> * can be used with a minimal algorithm suite that is microcontroller friendly (AES-256, SHA-256, ECDH)


Becuase

> * For “service assisted connectivity” where a device relies on a gateway to help with any defensive measures from the network layer on up, the device ought to be paired with exactly one (cluster of) gateway(s). Also, an unobserved device should not pose any threat to a network that it is deployed into (see the fridges abused as spam bots or local spies) and therefore outbound communication should be funneled through the gateway as well. TLS/PKI specifically enables promiscuous clients that happily establish sessions with any “trustworthy” (per CA) server, often under direction of an interactive user. Here, I want to pair a device with a gateway, meaning that the peers are known a priori and thus
> * the certificate exchange is 3-6kb of extra baggage that’s pure overhead if the parties have an existing and well-known peer relationship.
> * Session resumption is required because devices will get disconnected while roaming and on radio or will temporarily opt to turn off the radio, which might tear sockets. It’s also required because the initial key exchange is computationally very expensive and imposes significant latency overhead due to the extra roundtrips.
> * Microcontroller based devices are often very constrained with regards to program storage and can’t lug a whole litany of crypto algorithms around. So the protocol must allow for a compliant implementation to only support a small set of algos that can be implemented on MCUs in firmware or in silicone.


## Google SPDY work

http://blog.chromium.org/2013/06/experimenting-with-quic.html
<

At Google, we're always working to make the web faster. The [SPDY protocol](http://www.chromium.org/spdy/spdy-whitepaper), which is now the foundation of the upcoming HTTP 2.0 protocol, is a significant step forward. However, despite increasing bandwidth, round trip time (RTT)--which is ultimately bounded by the speed of light--is not decreasing, and will remain high on mobile networks for the foreseeable future. To continue improving network performance we need to decrease the number of round trips, something that is difficult with protocols that currently rely on the Transmission Control Protocol (TCP).

QUIC (Quick UDP Internet Connections) is an early-stage network protocol we are experimenting with that runs a stream multiplexing protocol over a new flavor of Transport Layer Security (TLS) on top of UDP instead of TCP. QUIC combines a [carefully selected](https://docs.google.com/a/chromium.org/document/d/1RNHkx_VvKWyWg6Lr8SZ-saqsQx7rFV-ev2jRFUoVD34/edit#) collection of techniques to reduce the number of round trips we need as we surf the Internet. You can learn more in the [design document](https://docs.google.com/a/chromium.org/document/d/1RNHkx_VvKWyWg6Lr8SZ-saqsQx7rFV-ev2jRFUoVD34), but here are some of the highlights:

*   [High security](https://docs.google.com/a/google.com/document/d/1g5nIXAIkN_Y-7XJW5K45IblHd_L2f5LTaDUDwvZ5L6g/edit) similar to [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)
*   Fast (often 0-RTT) connectivity similar to [TLS Snapstart](http://tools.ietf.org/html/draft-agl-tls-snapstart-00) combined with [TCP Fast Open](http://en.wikipedia.org/wiki/TCP_Fast_Open)
*   Packet pacing to reduce packet loss
*   Packet error correction to reduce retransmission latency
*   UDP transport to avoid TCP head-of-line blocking
*   A connection identifier to reduce reconnections for mobile clients
*   A pluggable congestion control mechanism
We've been working on both a QUIC [client implementation](https://code.google.com/p/chromium/codesearch#chromium/src/net/quic/&amp;ct=rc&amp;cd=1&amp;q=quic&amp;sq=package:chromium) and [prototype server implementation](https://code.google.com/p/chromium/codesearch#chromium/src/net/tools/quic/&amp;ct=rc&amp;cd=2&amp;q=quic&amp;sq=package:chromium) in the open source Chromium repository for the past few months. Early tests of UDP connectivity have been promising, but we have learned from past experience that real-world network conditions often differ considerably. Our next step is to test the pros and cons of the QUIC design in the real world by experimenting with using QUIC for a small percentage of Chrome dev and canary channel traffic to some Google servers, just as we did with SPDY. Users shouldn't notice any difference--except hopefully a faster load time. If we're able to identify clear performance wins, our hope is to collaborate with the rest of the community to develop the features and techniques of QUIC into network standards.&nbsp;

You can learn more about QUIC in our [FAQ](https://docs.google.com/a/chromium.org/document/d/1lmL9EF6qKrk7gbazY8bIdvq3Pno2Xj_l_YShP40GLQE/edit#heading=h.h3jsxme7rovm). Our hope is that what we learn from QUIC will ultimately help us to deliver a much faster... er... QUICker Internet!

Posted by Jim Roskind, RTT Reduction Ranger, Google

## IETF work

A profile is currently being worked on that explictly profiles (subsets) DTLS for IOT devices

https://datatracker.ietf.org/wg/dice/documents/


The following analysis effectively summrises some of he contraints and therefore issues for DTLS on IOT 

https://datatracker.ietf.org/doc/draft-hartke-dice-practical-issues/?include_text=1


ICE Working Group                                             K. Hartke
Internet-Draft                                   Universitaet Bremen TZI
Intended status: Informational                             April 8, 2014
Expires: October 10, 2014

                         Practical Issues with
     Datagram Transport Layer Security in Constrained Environments
                 draft-hartke-dice-practical-issues-01

Abstract

   This document investigates practical issues around the implementation
   of Datagram Transport Layer Security (DTLS) 1.2 in constrained
   environments, and explores some ideas for an optimized version of
   DTLS 1.2 that is more friendly to constrained nodes and networks.

Status of this Memo

   This Internet-Draft is submitted in full conformance with the
   provisions of BCP 78 and BCP 79.

   Internet-Drafts are working documents of the Internet Engineering
   Task Force (IETF).  Note that other groups may also distribute
   working documents as Internet-Drafts.  The list of current Internet-
   Drafts is at http://datatracker.ietf.org/drafts/current/.

   Internet-Drafts are draft documents valid for a maximum of six months
   and may be updated, replaced, or obsoleted by other documents at any
   time.  It is inappropriate to use Internet-Drafts as reference
   material or to cite them other than as "work in progress."

   This Internet-Draft will expire on October 10, 2014.

Copyright Notice

   Copyright (c) 2014 IETF Trust and the persons identified as the
   document authors.  All rights reserved.

   This document is subject to BCP 78 and the IETF Trust's Legal
   Provisions Relating to IETF Documents
   (http://trustee.ietf.org/license-info) in effect on the date of
   publication of this document.  Please review these documents
   carefully, as they describe your rights and restrictions with respect
   to this document.  Code Components extracted from this document must
   include Simplified BSD License text as described in Section 4.e of
   the Trust Legal Provisions and are provided without warranty as
   described in the Simplified BSD License.

Hartke                  Expires October 10, 2014                [Page 1]
Internet-Draft              Constrained DTLS                  April 2014

Table of Contents

   1.  Introduction . . . . . . . . . . . . . . . . . . . . . . . . .  3
     1.1.  Background . . . . . . . . . . . . . . . . . . . . . . . .  3
     1.2.  Overview . . . . . . . . . . . . . . . . . . . . . . . . .  3
     1.3.  Terminology  . . . . . . . . . . . . . . . . . . . . . . .  4
   2.  Potential Problems and Possible Solutions  . . . . . . . . . .  4
     2.1.  Handshake Reliability and Fragmentation  . . . . . . . . .  4
     2.2.  Timer Values . . . . . . . . . . . . . . . . . . . . . . .  7
     2.3.  Connection Initiation  . . . . . . . . . . . . . . . . . .  8
     2.4.  Connection Closure . . . . . . . . . . . . . . . . . . . .  9
     2.5.  Data Size  . . . . . . . . . . . . . . . . . . . . . . . . 10
     2.6.  Code Size  . . . . . . . . . . . . . . . . . . . . . . . . 10
     2.7.  Application Data Fragmentation . . . . . . . . . . . . . . 11
     2.8.  Application Layer Protocol . . . . . . . . . . . . . . . . 12
   3.  A Comparison of Strategies for Handshake Reliability . . . . . 13
   4.  A Strawman for Stateless Header Compression  . . . . . . . . . 16
     4.1.  Records  . . . . . . . . . . . . . . . . . . . . . . . . . 16
     4.2.  Handshake Messages . . . . . . . . . . . . . . . . . . . . 17
   5.  Security Considerations  . . . . . . . . . . . . . . . . . . . 19
   6.  IANA Considerations  . . . . . . . . . . . . . . . . . . . . . 19
   7.  Acknowledgements . . . . . . . . . . . . . . . . . . . . . . . 19
   8.  References . . . . . . . . . . . . . . . . . . . . . . . . . . 19
     8.1.  Normative References . . . . . . . . . . . . . . . . . . . 19
     8.2.  Informative References . . . . . . . . . . . . . . . . . . 19
   Appendix A.  Templates . . . . . . . . . . . . . . . . . . . . . . 22
   Author's Address . . . . . . . . . . . . . . . . . . . . . . . . . 23

Hartke                  Expires October 10, 2014                [Page 2]
Internet-Draft              Constrained DTLS                  April 2014

1.  Introduction

1.1.  Background

   Nodes taking part in the "Internet of Things" often have strict
   limitations regarding their computational power, memory size (both
   RAM and ROM) and power management [I-D.ietf-lwig-terminology].
   Network communication, in particular if wireless, also imposes
   constraints that need to be considered during protocol design, such
   as low bitrates, variable delays and and possibly high packet loss.

   Moreover, frames at the link layer might be much smaller than the
   IPv6 minimum MTU of 1280 bytes and therefore require additional
   adaptation mechanisms such as 6LoWPAN [RFC4944] for IEEE 802.15.4
   wireless networks [IEEE.802-15-4], which in turn may exacerbate the
   limitations of the network: for instance, as high loss rates are
   anticipated by design, application protocols usually try to avoid
   fragmentation at the network layer.

   However, application protocols often delegate security mechanisms to
   transport layer security protocols.  More often than not, the
   protocol overhead from securing the communication is highly relevant
   to the overall performance of the systems.

   One protocol that has received significant attention recently for
   constrained node/network applications is Datagram Transport Layer
   Security (DTLS) [RFC6347].  DTLS is derived from and inherits some
   characteristics from TLS [RFC5246].  Although it has clearly not been
   designed with constrained devices and lossy networks in mind, it is
   thought to be usable in these environments [RFC6574].  There are
   still a few challenges when it comes to actually implement DTLS.

1.2.  Overview

   The present document investigates practical issues around the
   implementation of DTLS 1.2 in constrained environments, and explores
   a few ideas that could lead to an optimized version of DTLS that is
   more friendly to constrained nodes and networks.

   The ideas generally fall into one of the following categories:

   Implementation guidance:  Implementation techniques for achieving
      light-weight implementations of DTLS, without affecting
      conformance to the relevant specifications or interoperability
      with other implementations.  This includes techniques for reducing
      complexity, memory footprint, or power usage.  The result may
      eventually be incorporated into [I-D.ietf-lwig-guidance].

Hartke                  Expires October 10, 2014                [Page 3]
Internet-Draft              Constrained DTLS                  April 2014

   Protocol profile:  Use of DTLS in a particular way, for example, by
      changing certain "MAY"s into "MUST"s or "MUST NOT"s, or by
      prescribing or precluding certain extensions and cipher suites.
      DTLS implementations ought to be usable without change if they can
      be configured accordingly.  See also [I-D.ietf-dice-profile].

   Stateless header compression:  Compression of DTLS records without
      explicitly building any compression context state.  This is done
      by using shorter forms to represent the same bits of information
      or relying on information that is already shared by the client and
      server.  Existing DTLS implementations can continue to be used if
      a thin layer is added that handles compression and decompression.

   Breaking changes:  New implementations are required that do not
      interoperate with implementations of DTLS, though there is no
      intention in this document to change the overall operation of TLS.

1.3.  Terminology

   The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
   "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
   document are to be interpreted as described in RFC 2119 [RFC2119].
   Note that this document itself is informational, but it is discussing
   normative statements.

2.  Potential Problems and Possible Solutions

2.1.  Handshake Reliability and Fragmentation

   DTLS records can be large in size for a single 6LoWPAN [RFC4944]
   payload: IEEE 802.15.4 [IEEE.802-15-4] specifies a physical layer MTU
   of only 127 bytes, which yields about 60-80 bytes of payload after
   adding MAC layer and adaptation layer headers.  Although 6LoWPAN
   supports the fragmentation of IPv6 packets into small link-layer
   frames, this is generally tried to be avoided in low-power, lossy
   networks.

   DTLS offers fragmentation at the handshake layer and hence can help
   to prevent IP fragmentation.  However, this can add a significant
   overhead on the number of datagrams and bytes transferred (see
   Table 1 below).  Packet loss is also still a big problem for the
   constrained nodes: since fragments may arrive in any order, buffers
   must be large enough to hold all messages after reassembly, and
   losing a single fragment will cause all fragments of a message flight
   to be retransmitted.  This is very likely especially during key and
   certificate exchanges as these will not fit within a packet without
   fragmentation in most 6LoWPANs.

Hartke                  Expires October 10, 2014                [Page 4]
Internet-Draft              Constrained DTLS                  April 2014

   +--------------+-----------------+------------------+---------------+
   |     UDP data |       Number of |  Total number of | Proportion of |
   |   size limit |       datagrams |            bytes |   header data |
   |      (bytes) |     transferred |      transferred |               |
   +--------------+-----------------+------------------+---------------+
   |           50 |              27 |            1,182 |          55 % |
   |           55 |              21 |            1,037 |          49 % |
   |           60 |              20 |            1,081 |          51 % |
   |           65 |              18 |            1,003 |          47 % |
   |           70 |              15 |              912 |          42 % |
   |           75 |              14 |              875 |          39 % |
   |           80 |              13 |              874 |          39 % |
   |           85 |              12 |              849 |          37 % |
   |           90 |              12 |              849 |          37 % |
   |        1,152 |               6 |              802 |          34 % |
   +--------------+-----------------+------------------+---------------+

    Table 1: Number of datagrams and bytes transferred using different
        limits for DTLS fragmentation in an example DTLS handshake
   (TLS_ECDHE_ECDSA_WITH_AES_128_CCM_8 with Raw Public Key Certificate)

   Possible Solutions include:

   o  Perform the handshake using alternative mechanisms for reliability
      and fragmentation over UDP:

      *  Use IP fragmentation.  If no X.509 certificates are involved,
         the handshake messages of one flight typically require less
         than 400 bytes combined.  Since all messages of a flight in
         DTLS are retransmitted anyway when a single fragment is lost,
         the difference between performing the fragmentation at the DTLS
         layer and at the IP layer is probably not huge.

      *  Use DTLS fragmentation.  When compared to, for example, the
         reliability mechanism of CoAP over UDP [I-D.ietf-core-coap]
         (where the receipt of each data fragment is confirmed by one
         acknowledgement message, and an acknowledgement message may
         opportunistically piggyback data in the opposite direction),
         DTLS actually performs better for a typical DTLS handshake in
         both lossy and non-lossy network environments (cf. Section 3).

      *  Extend DTLS with acknowledgment messages that confirm the
         receipt of fragments and allow an implementation to retransmit
         only the fragments that are missing.  Section 3 explores a
         number of strategies for the reliable transmission of DTLS
         handshake messages with acknowledgements, including CoAP-style
         acknowledgements and cumulative acknowledgements.

Hartke                  Expires October 10, 2014                [Page 5]
Internet-Draft              Constrained DTLS                  April 2014

   +--------------+-----------------+------------------+---------------+
   |     UDP data |       Number of |  Total number of | Proportion of |
   |   size limit |       datagrams |            bytes |   header data |
   |      (bytes) |     transferred |      transferred |               |
   +--------------+-----------------+------------------+---------------+
   |           50 |       15 (56 %) |       592 (50 %) |          10 % |
   |           55 |       13 (62 %) |       585 (56 %) |           9 % |
   |           60 |       13 (65 %) |       621 (57 %) |          14 % |
   |           65 |       11 (61 %) |       588 (59 %) |          10 % |
   |           70 |       11 (73 %) |       573 (63 %) |           7 % |
   |           75 |       11 (79 %) |       573 (65 %) |           7 % |
   |           80 |       10 (77 %) |       567 (65 %) |           6 % |
   |           85 |       10 (83 %) |       567 (67 %) |           6 % |
   |           90 |       10 (83 %) |       567 (67 %) |           6 % |
   |        1,152 |       6 (100 %) |       617 (77 %) |          14 % |
   +--------------+-----------------+------------------+---------------+

      Table 2: Number of datagrams and bytes transferred in the same
      example DTLS handshake as in Table 1 but using the strawman for
            Stateless Header Compression described in Section 4

   o  Reduce the number of bytes to be transferred, so fewer packets
      need to be transmitted that could potentially be lost:

      *  Exchange large blobs using an out-of-band mechanism.  The TLS
         Cached Information Extension [I-D.ietf-tls-cached-info], for
         example, allows to omit the exchange of fairly static data such
         as the server certificate, if this data is already available.

      *  Perform a DTLS-specific kind of Stateless Header Compression,
         as explored in Section 4.  This can significantly reduce the
         number of datagrams and bytes transferred, and in particular
         also the proportion of header data within the number of bytes
         transferred (see Table 2 above).

      *  Compress DTLS headers with 6LoWPAN General Header Compression
         [I-D.bormann-6lo-ghc], or a specific DTLS format for 6LoWPAN
         Next Header Compression [I-D.raza-dice-compressed-dtls].

      *  Recover the Raw Public Key Certificate
         [I-D.ietf-tls-oob-pubkey] from the ECDSA signature in a
         ECDHE_ECDSA handshake, instead of transmitting both the public
         key and the signature.  This is decribed in Section 4.1.6 of
         [SEC1]:

            "This is also useful in bandwidth constrained environments,
            when transmission of public keys cannot be afforded.  Entity
            U could send a signature to entity V, who recovers QU.

Hartke                  Expires October 10, 2014                [Page 6]
Internet-Draft              Constrained DTLS                  April 2014

            Entity V can look up the public key in some certificate or
            directory, and if it matches then the signature can be
            accepted."

      *  Mandate the use compressed point formats for elliptic curves.

      *  Transmit only the low-order N bits of the 48 bit sequence
         numbers and reconstruct the (48-N) high-order bits, as is
         similarly done for extended sequence numbers in IPsec (see
         Appendix B of RFC 4302 [RFC4302]).

      *  Use self-delimiting numeric values [RFC6256] instead of fixed-
         sized fields.

      *  Use a single bit field instead of multiple type fields to
         indicate which handshake messages are present in a record.

2.2.  Timer Values

   RFC 6347 [RFC6347] leaves the choice of timer values to the
   implementation, but makes the following recommendation:

      "Implementations SHOULD use an initial timer value of 1 second
      (the minimum defined in RFC 6298 [RFC6298]) and double the value
      at each retransmission, up to no less than the RFC 6298 maximum of
      60 seconds."  [RFC6347]

   Given the time required by some algorithms when executed on a
   constrained devices (see Table 3), an initial timer value of 1 second
   can easily lead to spurious retransmissions.

   +-------------+--------------+-----------+------------+-------------+
   | Algorithm   | Library      |    Memory |  Execution |  Comparable |
   |             |              | footprint |       time |     RSA key |
   |             |              |   (bytes) |  (seconds) |      length |
   +-------------+--------------+-----------+------------+-------------+
   | RSA 1024    | AvrCryptolib |       640 |      199.7 |             |
   | RSA 2048    | AvrCryptolib |     1,280 |    1,587.6 |             |
   | ECDSA 160r1 | TinyECC      |       892 |        2.3 |        1024 |
   | ECDSA 192r1 | TinyECC      |     1,008 |        3.6 |        1536 |
   | ECDSA 160r1 | Wiselib      |       842 |       20.2 |        1024 |
   | ECDSA 192r1 | Wiselib      |       952 |       34.6 |        1536 |
   | ECDSA 163k1 | Relic        |     2,804 |        0.3 |        1024 |
   | ECDSA 233k1 | Relic        |     3,675 |        1.8 |        2048 |
   +-------------+--------------+-----------+------------+-------------+

    Table 3: RSA private key operation and ECDSA signature performance
                      (from [I-D.aks-crypto-sensors])

Hartke                  Expires October 10, 2014                [Page 7]
Internet-Draft              Constrained DTLS                  April 2014

   Possible Solutions include:

   o  Adjust the timer value to meet the conditions of constrained nodes
      and low-power, lossy networks.

   o  Add acknowledgment messages to DTLS that allow an implementation
      to confirm the receipt of a message before starting to prepare its
      response message flight; see Section 3.

2.3.  Connection Initiation

   Nodes with very constrained main memory also suffer from the
   complexity of the DTLS handshake protocol.  We envision that the
   acceptance of DTLS as security protocol for embedded devices would
   significantly increase if a less complex connection initiation
   procedure with a smaller number of handshake messages was defined.

   Compared to TLS, DTLS exacerbates the connection initiation: A DTLS
   handshake has an additional roundtrip that results from the addition
   of a stateless cookie exchange.  This exchange is designed to prevent
   certain denial-of-service attacks: consumption of excessive server
   resources caused by the transmission of a series of handshake
   initiation requests, and use of the server as an amplifier by sending
   connection initiation messages with a forged source of the victim.

   Possible Solutions include:

   o  Create the DTLS connection before it is needed, so it doesn't take
      a long time to set it up when it's actually needed.  This works if
      a server has do deal with a relatively small overall number of
      clients that wish to interact with the server.  Care must be taken
      such that not all clients perform their handshake at the same
      time, as a handshake requires considerably more memory than
      keeping a connection open.  (See also Section 2.4 below.)

   o  Shorten the handshake to four flights.  This may be possible
      without losing the denial-of-service roundtrip if the cipher suite
      permits that the server remains stateless after sending the
      ServerHello and if the flight fits in one datagram (see Figure 1).

   o  As an alternative, client puzzles could be used as a mechanism for
      mitigating denial-of-service attacks, resulting in a four-flight
      exchange similar to the one in HIP DEX [I-D.moskowitz-hip-rg-dex].
      The application of client puzzles to TLS has been shown
      [USENIX01].  However, a puzzle would be needed that ideally takes
      less effort for a constrained device and more effort for an
      unconstrained device.

Hartke                  Expires October 10, 2014                [Page 8]
Internet-Draft              Constrained DTLS                  April 2014

    Client                                          Server
    ------                                          ------

    ClientHello             -------->                           Flight 1

                                        HelloVerifyRequest    \
                                               ServerHello      Flight 2
                            <--------      ServerHelloDone    /
                                        (remain stateless)

    ClientHello                                               \
    "ServerHello"                                              \
    ClientKeyExchange                                           Flight 3
    [ChangeCipherSpec]                                         /
    Finished                -------->                         /

                                        [ChangeCipherSpec]    \ Flight 4
                            <--------             Finished    /

   Figure 1: Artist's impression of a four-flight DTLS handshake with a
                              Pre-Shared Key

2.4.  Connection Closure

   Although a connection needs considerably less memory after a
   handshake has finished, it still requires, for example, around 80
   bytes with AES-128-CCM [RFC6655] for the keys, sequence numbers and
   anti-replay window.  More memory is needed if session resumption is
   supported, to remember the 48-byte master secret and negotiated
   connection parameters.  This limits how many connections a
   constrained device can maintain at a given time.  Often, constrained
   devices will have a fixed number of "slots" for connections rather
   than allocating memory dynamically for each connection.

   DTLS provides a facility for secure connection closure.  When a valid
   closure alert is received, an implementation can be assured that no
   further data will be received on that connection.  It is noteworthy,
   though, that the closure alert is not a handshake message and thus is
   not retransmitted when packet loss occurs.

   Possible Solutions include:

   o  Maintain the session for as long as possible.  When the server
      runs out of resources, it can close connections, e.g., using a
      Least Frequently Used (LFU) eviction policy.  The client simply
      assumes that the connection is active until the server rejects its
      application data, in which case the client initiates a new
      connection.

Hartke                  Expires October 10, 2014                [Page 9]
Internet-Draft              Constrained DTLS                  April 2014

   o  Use the DTLS Heartbeat Extension [RFC6520] to figure out from time
      to time if the connection is still active.

2.5.  Data Size

   As fragmented handshake messages can arrive at a constrained node in
   any order, the receiver must provide a message buffer that is large
   enough to hold multiple fragments.  When several handshake messages
   forming a single flight are sent out in parallel, it is likely that
   the receiver's resources are too limited to order fragments from
   distinct handshake messages.  Avoiding this might require additional
   resources on the server side to ensure serialization of a flight's
   messages.

   Furthermore, since handshake messages can be fragmented arbitrarily
   and with overlaps, the receiver must, in addition to the message
   buffer, keep track of the fragments received so far.  This also makes
   the computation of the Finished MAC difficult, which is computed as
   if each handshake message had been sent as a single fragment.

   Application-level retransmissions require even more buffer space as
   replay-protection requires encryption of every single packet that is
   to be transmitted.  In particular, this renders destructive in-place
   encryption impossible as the source data must be preserved.

   Possible Solutions include:

   o  Use the same sequence number when retransmitting application data,
      so the plaintext can be encrypted in-place without the need for a
      second buffer.  Note: The security implications of this change
      need to be carefully analyzed.

   o  Extend the exchange of handshake messages with acknowledgments
      that allow a receiver to confirm the receipt of fragments, and let
      the sender wait for the acknowledgment before it sends the next
      part of the flight; see also Section 3.

   o  Mandate non-overlapping handshake message fragments.

   o  Favour cryptographic algorithms that use less memory, possibly
      resulting in a slower performance.

2.6.  Code Size

   Although probably not as severe as data size limits, the code size of
   a DTLS implementation also can play a role, in particular for
   constrained devices at the lower bound of Class 1 devices.

Hartke                  Expires October 10, 2014               [Page 10]
Internet-Draft              Constrained DTLS                  April 2014

   Possible Solutions include:

   o  Use pre-composed messages instead of writing code for encoding or
      decoding ASN.1 structures, as shown for example in Appendix A.

   o  Avoid static tables for cryptographic functions where possible, as
      typical embedded platforms are more restricted in RAM than in non-
      volatile memory such as flash ROM.  Instead, their procedural
      equivalent is to be used, although less efficient during run-time.

2.7.  Application Data Fragmentation

   Messages larger than an IP fragment result in undesired packet
   fragmentation.  DTLS does not support fragmentation of application
   data.  If an implementation of an application layer protocol such as
   CoAP [I-D.ietf-core-coap] wants to avoid IP fragmentation, it must
   fit the application data (e.g., a CoAP message) and all headers in a
   single IP packet.

   DTLS has a per-record overhead of 13 bytes for the record header.
   AEAD ciphers such as AES-CCM [RFC6655] eat up additional space to
   carry the explicit nonce and the authentication tag.  Thus, cipher
   suites like TLS_PSK_WITH_AES_128_CCM_8 or
   TLS_ECDHE_ECDSA_AES_128_CCM_8 requires 16 additional bytes, leading
   to an overall overhead of 29 bytes for the header of each encrypted
   DTLS packet.  With packet sizes of 60-80 bytes, this takes a
   considerable portion of the available packet size away (see Table 4
   below).

   +------------------+------------------------+-----------------------+
   |    UDP data size |   Number of bytes left |    ... with Stateless |
   |    limit (bytes) |   for application data |    Header Compression |
   +------------------+------------------------+-----------------------+
   |               50 |              21 (42 %) |             39 (78 %) |
   |               55 |              26 (47 %) |             44 (80 %) |
   |               60 |              31 (52 %) |             49 (82 %) |
   |               65 |              36 (55 %) |             54 (83 %) |
   |               70 |              41 (59 %) |             59 (84 %) |
   |               75 |              46 (61 %) |             64 (85 %) |
   |               80 |              51 (64 %) |             69 (86 %) |
   |               85 |              56 (66 %) |             74 (87 %) |
   |               90 |              61 (68 %) |             79 (88 %) |
   |            1,152 |           1,123 (97 %) |          1,141 (99 %) |
   +------------------+------------------------+-----------------------+

    Table 4: Number of bytes left for data in an ApplicationData record
     using DTLS and DTLS with Stateless Header Compression (Section 4)

Hartke                  Expires October 10, 2014               [Page 11]
Internet-Draft              Constrained DTLS                  April 2014

   Possible Solutions include:

   o  Elide the GenericAEADCipher.nonce_explicit field when AES-CCM is
      used.  The GenericAEADCipher.nonce_explicit field is set to the
      16-bit epoch concatenated with the 48-bit sequence number, which
      means that the epoch and sequence number are unnecessarily
      included twice in each record.

   o  Elide the DTLS version field where it is implicitly clear.  Since
      the DTLS version is negotiated in the handshake, there should not
      be a need to specify the DTLS version in each and every record.

   o  Elide the length field of the last record in a datagram.  DTLS
      records specify their length, so multiple records can be
      transmitted in a single datagram.  When DTLS is used with UDP
      (which preserves the boundaries of all message sent), the length
      field of the last record in a datagram can be calculated from the
      UDP payload length.

   For example, when using the Stateless Header Compression presented in
   Section 4 and eliminating the redundant epoch and sequence number
   information, the number of bytes left in an ApplicationData record
   for application data can be significantly increased (see Table 4).

2.8.  Application Layer Protocol

   When DTLS is used to secure a non-trivial application layer protocol,
   there is potential for synergies that can arise from optimizing the
   stack of both protocols.

   For example, an implementation of CoAP [I-D.ietf-core-coap] with DTLS
   security will need to implement both the reliability mechanism for
   the DTLS handshake and the reliability mechanism of CoAP.  This not
   only increases code size, but also prevents efficient retransmissions
   as each CoAP retransmission of the same data is a new transmission in
   DTLS.

   Possible Solutions include:

   o  Make DTLS reliability and fragmentation available to applications.

   Accordingly, the application should take advantage of DTLS record
   information where possible.  For example, since DTLS sequence numbers
   uniquely identify a message in a connection, the 6-byte sequence
   number could be used in CoAP to correlate CoAP acknowledgements with
   CoAP messages (Message ID, 2 bytes), to correlate CoAP responses with
   CoAP requests (Token, 0-8 bytes), to provide an order among CoAP
   notifications (3 bytes), and to enable message deduplication.

Hartke                  Expires October 10, 2014               [Page 12]
Internet-Draft              Constrained DTLS                  April 2014

3.  A Comparison of Strategies for Handshake Reliability

   A DTLS handshake consists of multiple messages that are fragmented
   and grouped in so-called "flights".  As the previous sections have
   shown, the strategy employed by DTLS to transmit these flights can
   lead to circumstances that are acceptable for existing uses of DTLS
   but pose a challenge in constrained environments:

   o  The loss of a single packet causes the whole flight of fragments
      to be retransmitted, and not just the fragments that were lost.

   o  Long processing times can lead to spurious retransmissions.

   o  The possibility of arbitrarily reordered fragments requires the
      recipient to maintain potentially large buffers.

   This section compares the following strategies for reliability:

   Bulk without acknowledgements (illustrated in Figure 2 below):
      All fragments are retransmitted in exponentially increasing
      intervals until the first fragment of the next flight from the
      other side is received.  This is the reliability mechanism used in
      DTLS 1.2 [RFC6347].

   Stop-and-wait with one acknowledgement per fragment (Figure 3):
      Each fragment is retransmitted individually until a matching
      acknowledgement for the fragment is received.  Only one fragment
      is transmitted at a time, and each acknowledgement messages
      confirms the receipt of one fragment.  This is the reliability
      mechanism used in CoAP [I-D.ietf-core-coap].

   Bulk with one cumulative acknowledgement per flight (Figure 4):
      Unacknowledged fragments of the flight are transmitted using a
      sliding window until all fragments have been acknowledged.
      Acknowledgements specify all fragments that have been received so
      far (highest sequence number seen + a bit field).

   Table 5 shows the average number of transmissions needed for these
   three strategies to successfully complete an example DTLS handshake.
   (Every DTLS handshake is eventually successful if no side gives up
   after a number of retransmission attempts.)

   The results were obtained using a very simple network simulator that
   randomly drops packets according to the given loss rate, but provides
   ideal conditions otherwise.  To avoid spurious retransmissions, timer
   values were selected larger than the processing times for flights;
   this may be impractical if sensible retransmission intervals and
   processing times differ in orders of magnitudes.

Hartke                  Expires October 10, 2014               [Page 13]
Internet-Draft              Constrained DTLS                  April 2014

              +-----------+----------+----------+----------+
              | Loss rate | Figure 2 | Figure 3 | Figure 4 |
              +-----------+----------+----------+----------+
              |       0 % |     18.0 |     36.0 |     19.0 |
              |       5 % |     22.2 |     39.7 |     20.5 |
              |      10 % |     25.9 |     41.8 |     23.8 |
              |      15 % |     27.6 |     44.7 |     25.1 |
              |      20 % |     33.3 |     51.6 |     27.1 |
              |      25 % |     40.0 |     57.2 |     33.3 |
              |      30 % |     39.2 |     64.0 |     37.4 |
              |      35 % |     45.6 |     66.4 |     44.0 |
              |      40 % |     55.4 |     74.7 |     46.2 |
              |      45 % |     54.4 |     90.0 |     47.9 |
              |      50 % |     67.2 |    102.2 |     57.2 |
              |      55 % |     76.8 |    124.3 |     62.3 |
              |      60 % |     96.9 |    151.3 |     74.4 |
              |      65 % |    109.4 |    170.5 |     86.4 |
              |      70 % |    115.8 |    248.2 |    106.8 |
              |      75 % |    159.1 |    348.5 |    141.5 |
              |      80 % |    199.6 |    528.6 |    169.9 |
              |      85 % |    343.4 |    804.4 |    278.0 |
              +-----------+----------+----------+----------+

   Table 5: Average number of transmissions for different strategies in
     an example ECDHE_ECDSA handshake with Raw Public Key Certificate

                               Sender   Recipient
                                 |          |
                     Fragment 0  +--------->|
                     Fragment 1  +-----X    |
                     Fragment 2  +-----X    |
                     Fragment 3  +--------->|
                                 |          |
                     Fragment 0  +-----X    |
                     Fragment 1  +--------->|
                     Fragment 2  +--------->|
                     Fragment 3  +--------->|
                                 |    X-----+  Fragment 0
                                 |          |
                     Fragment 0  +--------->|
                     Fragment 1  +-----X    |
                     Fragment 2  +--------->|
                     Fragment 3  +-----X    |
                                 |<---------+  Fragment 0
                                 |          |

        Figure 2: Bulk transmission without acknowledgements (DTLS)

Hartke                  Expires October 10, 2014               [Page 14]
Internet-Draft              Constrained DTLS                  April 2014

                               Sender   Recipient
                                 |          |
                     Fragment 0  +--------->|
                                 |<---------+  Acknowledge 0
                                 |          |
                     Fragment 1  +-----X    |
                                 |          |
                     Fragment 1  +-----X    |
                                 |          |
                     Fragment 1  +--------->|
                                 |<---------+  Acknowledge 1
                                 |          |
                     Fragment 2  +--------->|
                                 |<---------+  Acknowledge 2
                                 |          |
                     Fragment 3  +--------->|
                                 |    X-----+  Acknowledge 3
                                 |          |
                     Fragment 3  +--------->|
                                 |<---------+  Acknowledge 3
                                 |          |

     Figure 3: Stop-and-wait transmission with one acknowledgement per
                                 fragment

                               Sender   Recipient
                                 |          |
                     Fragment 0  +--------->|
                     Fragment 1  +-----X    |
                     Fragment 2  +-----X    |
                     Fragment 3  +--------->|
                                 |<---------+  Acknowledge 0, 3
                                 |          |
                     Fragment 1  +-----X    |
                     Fragment 2  +--------->|
                                 |    X-----+  Acknowledge 0, 2, 3
                                 |          |
                     Fragment 1  +--------->|
                     Fragment 2  +--------->|
                                 |    X-----+  Acknowledge 0, 1, 2, 3
                                 |          |
                     Fragment 1  +--------->|
                     Fragment 2  +-----X    |
                                 |<---------+  Acknowledge 0, 1, 2, 3
                                 |          |

      Figure 4: Bulk transmission with one acknowledgement per flight

Hartke                  Expires October 10, 2014               [Page 15]
Internet-Draft              Constrained DTLS                  April 2014

4.  A Strawman for Stateless Header Compression

   Stateless Header Compression compresses the headers of DTLS 1.2
   records and handshake messages.  The compression is lossless, does
   not increase the record length and is done without explicitly
   building any compression context state.

   The Finished MAC is computed as if each handshake message was sent
   uncompressed.

4.1.  Records

   Records are compressed by specifying the type, version, epoch,
   sequence_number and length fields using a variable number of bytes.
   A prefix is added in front of the structure to indicate the length of
   each field or to specify the value of the field directly.  If the
   value is specified directly, the field itself is elided.  The format
   of the prefix is as follows:

                       0                   1
                      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
                     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                     |0| T | V |  E  |1 1 0|  S  | L |
                     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

   The fields in the prefix are defined as follows:

   T: Describes the type field.

      0 - Content Type 20 (ChangeCipherSpec)
      1 - 8-bit type field
      2 - Content Type 22 (Handshake)
      3 - Content Type 23 (Application Data)

   V: Describes the version field.

      0 - Version 254.255 (DTLS 1.0)
      1 - 16-bit version field
      2 - Version 254.253 (DTLS 1.2)
      3 - Reserved for future use

   E: Describes the epoch field.

      0 - Epoch 0
      1 - Epoch 1
      2 - Epoch 2
      3 - Epoch 3
      4 - Epoch 4

Hartke                  Expires October 10, 2014               [Page 16]
Internet-Draft              Constrained DTLS                  April 2014

      5 - 8-bit epoch field
      6 - 16-bit epoch field
      7 - Implicit -- same as previous record in the datagram

   S: Describes the sequence_number field.

      0 - Sequence number 0
      1 - 8-bit sequence_number field
      2 - 16-bit sequence_number field
      3 - 24-bit sequence_number field
      4 - 32-bit sequence_number field
      5 - 40-bit sequence_number field
      6 - 48-bit sequence_number field
      7 - Implicit -- number of previous record in the datagram + 1

   L: Describes the length field.

      0 - Length 0
      1 - 8-bit length field
      2 - 16-bit length field
      3 - Implicit -- last record in the datagram

4.2.  Handshake Messages

   Handshake messages are compressed in a similar way.  A prefix is
   added in front of the structure to indicate the length of each field
   or to specify the value of the field directly.  If the value is
   specified directly, the field itself is elided.  The format of the
   prefix is as follows:

                       0                   1
                      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
                     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                     |0 0|   T   | L |   S   | O | C |
                     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

   The fields in the prefix are defined as follows:

   T: Describes the msg_type field.

      0 - 8-bit msg_type field
      1 - Handshake Type 1 (Client Hello)
      2 - Handshake Type 2 (Server Hello)
      3 - Handshake Type 3 (Hello Verify Request)
      4 - Reserved for future use
      5 - Reserved for future use
      6 - Reserved for future use
      7 - Handshake Type 11 (Certificate)

Hartke                  Expires October 10, 2014               [Page 17]
Internet-Draft              Constrained DTLS                  April 2014

      8 - Handshake Type 12 (Server Key Exchange)
      9 - Handshake Type 13 (Certificate Request)
      10 - Handshake Type 14 (Server Hello Done)
      11 - Handshake Type 15 (Certificate Verify)
      12 - Handshake Type 16 (Client Key Exchange)
      13 - Reserved for future use
      14 - Reserved for future use
      15 - Handshake Type 20 (Finished)

   L: Describes the length field.

      0 - Implicit -- last message in the record
      1 - 8-bit length field
      2 - 16-bit length field
      3 - 24-bit length field

   S: Describes the message_seq field.

      0 - Message sequence number 0
      1 - Message sequence number 1
      2 - Message sequence number 2
      3 - Message sequence number 3
      4 - Message sequence number 4
      5 - Message sequence number 5
      6 - Message sequence number 6
      7 - Message sequence number 7
      8 - Message sequence number 8
      9 - Message sequence number 9
      10 - Message sequence number 10
      11 - Message sequence number 11
      12 - Message sequence number 12
      13 - 8-bit message_seq field
      14 - 16-bit message_seq field
      15 - Implicit -- number of previous message in the record + 1

   O: Describes the fragment_offset field.

      0 - Offset 0
      1 - 8-bit fragment_offset field
      2 - 16-bit fragment_offset field
      3 - 24-bit fragment_offset field

   C: Describes the fragment_length field.

      0 - Implicit -- message length minus fragment_offset
      1 - 8-bit fragment_length field
      2 - 16-bit fragment_length field
      3 - 24-bit fragment_length field

Hartke                  Expires October 10, 2014               [Page 18]
Internet-Draft              Constrained DTLS                  April 2014

5.  Security Considerations

   Beyond implementation techniques and stateless header compression,
   any changes to the TLS/DTLS protocol need to be performed extremely
   carefully.  No analysis has been done in the present version of this
   draft.

6.  IANA Considerations

   This draft includes no request to IANA.

7.  Acknowledgements

   Olaf Bergmann was an original author of this draft and is
   acknowledged for significant contribution to this document.

   Thanks to Angelo P. Castellani, Stefan Jucker, Shahid Raza, and Silke
   Schaefer for helpful comments and discussions that have shaped the
   document.

8.  References

8.1.  Normative References

   [RFC2119]  Bradner, S., "Key words for use in RFCs to Indicate
              Requirement Levels", BCP 14, RFC 2119, March 1997.

   [RFC5246]  Dierks, T. and E. Rescorla, "The Transport Layer Security
              (TLS) Protocol Version 1.2", RFC 5246, August 2008.

   [RFC6347]  Rescorla, E. and N. Modadugu, "Datagram Transport Layer
              Security Version 1.2", RFC 6347, January 2012.

8.2.  Informative References

   [I-D.aks-crypto-sensors]
              Sethi, M., Arkko, J., Keranen, A., and H. Rissanen,
              "Practical Considerations and Implementation Experiences
              in Securing Smart Object Networks",
              draft-aks-crypto-sensors-02 (work in progress),
              March 2012.

   [I-D.bormann-6lo-ghc]
              Bormann, C., "6LoWPAN Generic Compression of Headers and
              Header-like Payloads", draft-bormann-6lo-ghc-00 (work in

Hartke                  Expires October 10, 2014               [Page 19]
Internet-Draft              Constrained DTLS                  April 2014

              progress), October 2013.

   [I-D.ietf-core-coap]
              Shelby, Z., Hartke, K., and C. Bormann, "Constrained
              Application Protocol (CoAP)", draft-ietf-core-coap-18
              (work in progress), June 2013.

   [I-D.ietf-dice-profile]
              Hartke, K. and H. Tschofenig, "A DTLS 1.2 Profile for the
              Internet of Things", draft-ietf-dice-profile-00 (work in
              progress), March 2014.

   [I-D.ietf-lwig-guidance]
              Bormann, C., "Guidance for Light-Weight Implementations of
              the Internet Protocol Suite", draft-ietf-lwig-guidance-03
              (work in progress), February 2013.

   [I-D.ietf-lwig-terminology]
              Bormann, C., Ersue, M., and A. Keranen, "Terminology for
              Constrained Node Networks", draft-ietf-lwig-terminology-07
              (work in progress), February 2014.

   [I-D.ietf-tls-cached-info]
              Santesson, S. and H. Tschofenig, "Transport Layer Security
              (TLS) Cached Information Extension",
              draft-ietf-tls-cached-info-16 (work in progress),
              February 2014.

   [I-D.ietf-tls-oob-pubkey]
              Wouters, P., Tschofenig, H., Gilmore, J., Weiler, S., and
              T. Kivinen, "Using Raw Public Keys in Transport Layer
              Security (TLS) and Datagram Transport Layer Security
              (DTLS)", draft-ietf-tls-oob-pubkey-11 (work in progress),
              January 2014.

   [I-D.mcgrew-tls-aes-ccm-ecc]
              McGrew, D., Bailey, D., Campagna, M., and R. Dugal, "AES-
              CCM ECC Cipher Suites for TLS",
              draft-mcgrew-tls-aes-ccm-ecc-08 (work in progress),
              February 2014.

   [I-D.moskowitz-hip-rg-dex]
              Moskowitz, R., "HIP Diet EXchange (DEX)",
              draft-moskowitz-hip-rg-dex-06 (work in progress),
              May 2012.

   [I-D.raza-dice-compressed-dtls]
              Raza, S., Shafagh, H., and O. Dupont, "Compression of

Hartke                  Expires October 10, 2014               [Page 20]
Internet-Draft              Constrained DTLS                  April 2014

              Record and Handshake Headers for Constrained
              Environments", draft-raza-dice-compressed-dtls-00 (work in
              progress), March 2014.

   [IEEE.802-15-4]
              "Information technology - Telecommunications and
              information exchange between systems - Local and
              metropolitan area networks - Specific requirements - Part
              15.4: Wireless Medium Access Control (MAC) and Physical
              Layer (PHY) Specifications for Low-Rate Wireless Personal
              Area Networks (WPANs)", IEEE Standard 802.15.4,
              September 2006, <http://standards.ieee.org/getieee802/
              download/802.15.4-2006.pdf>.

   [RFC4302]  Kent, S., "IP Authentication Header", RFC 4302,
              December 2005.

   [RFC4944]  Montenegro, G., Kushalnagar, N., Hui, J., and D. Culler,
              "Transmission of IPv6 Packets over IEEE 802.15.4
              Networks", RFC 4944, September 2007.

   [RFC6256]  Eddy, W. and E. Davies, "Using Self-Delimiting Numeric
              Values in Protocols", RFC 6256, May 2011.

   [RFC6298]  Paxson, V., Allman, M., Chu, J., and M. Sargent,
              "Computing TCP's Retransmission Timer", RFC 6298,
              June 2011.

   [RFC6520]  Seggelmann, R., Tuexen, M., and M. Williams, "Transport
              Layer Security (TLS) and Datagram Transport Layer Security
              (DTLS) Heartbeat Extension", RFC 6520, February 2012.

   [RFC6574]  Tschofenig, H. and J. Arkko, "Report from the Smart Object
              Workshop", RFC 6574, April 2012.

   [RFC6655]  McGrew, D. and D. Bailey, "AES-CCM Cipher Suites for
              Transport Layer Security (TLS)", RFC 6655, July 2012.

   [SEC1]     Brown, D., "Standards for Efficient Cryptography 1 (SEC
              1): Elliptic Curve Cryptography", Version 2.0, May 2009.

   [USENIX01]
              Dean, D. and A. Stubblefield, "Using Client Puzzles to
              Protect TLS", 10th USENIX Security Symposium, August 2001,
              <http://static.usenix.org/events/sec01/full_papers/dean/
              dean.pdf>.

Hartke                  Expires October 10, 2014               [Page 21]
Internet-Draft              Constrained DTLS                  April 2014

Appendix A.  Templates

   When elliptic curve cryptography is used, building and parsing the
   bodies of Certificate, ServerKeyExchange and ClientKeyExchange
   messages mainly involves the encoding and decoding of elliptic curve
   points.  The points are encapsulated in a mix of DTLS structures and
   ASN.1 sequences.  For a given elliptic curve, some parts of a message
   body are static, which allows using pre-composed messages instead of
   writing lots of memory consuming code pertaining to DTLS and ASN.1.

   This appendix provides templates for the SubjectPublicKeyInfo
   structures for the named curves secp256r1, secp384r1 and secp521r1,
   also known as NIST P-256, P-384 and P-521, respectively.  These
   curves are the ones required in [I-D.mcgrew-tls-aes-ccm-ecc].  The
   points are represented in uncompressed point format.

      Note: Previous versions of the document provided templates for
      ServerKeyExchange and ClientKeyExchange messages.  These templates
      were not correct, as the messages are actually variable in length
      depending on the sign of the encoded points.

   SubjectPublicKeyInfo: secp256r1

              30 59 30 13 06 07 2a 86  48 ce 3d 02 01 06 08 2a
              86 48 ce 3d 03 01 07 03  42 00 04 __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __

   SubjectPublicKeyInfo: secp384r1

              30 76 30 10 06 07 2a 86  48 ce 3d 02 01 06 05 2b
              81 04 00 22 03 62 00 04  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __

Hartke                  Expires October 10, 2014               [Page 22]
Internet-Draft              Constrained DTLS                  April 2014

   SubjectPublicKeyInfo: secp521r1

              30 81 9b 30 10 06 07 2a  86 48 ce 3d 02 01 06 05
              2b 81 04 00 23 03 81 86  00 04 __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __ __ __
              __ __ __ __ __ __ __ __  __ __ __ __ __ __
