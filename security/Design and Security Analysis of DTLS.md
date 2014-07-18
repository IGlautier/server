TLS is the most widely deployed protocol for securing network traffic. The primary advantage of TLS is that it provides a secure, transparent channel; it is easy to provide security for an application protocol by inserting TLS between the application layer and the network layer where the session layer is in the OSI model. TLS, however, requires a reliable transport channel, typically TCP and therefore cannot be used to secure datagram traffic.

DTLS is a modified version of TLS that functions properly over datagram transport. Since DTLS is very similar to TLS, preexisting protocol infrastructure and implementations can be reused.

###Design Overview

The target applications for DTLS are primarily of the client-server variety. These are the kinds of applications for which TLS was designed and for which it works well.

The present security model of such applications is that the server is authenticated by its DNS name and IP address but the client is either anonymous or authenticates via some form of credential, typically in the form of a username and password handled by the application layer protocol.

This practice is not especially secure. However, application protocol designers, want to maintain as much of their protocol and implementation infrastructure as possible while adding security. This makes a channel security protocol such as TLS or IPsec very attractive since changes are minimized. 

From this perspective, ideally a datagram channel security protocol would substitute strong cryptographic authentication of the server for DNS and IP-based authentication but leave client authentication to the application layer protocol.

**Key Exchange over TCP?**

Key negotiation over an unreliable connection is more complicated than with a reliable connection. One alternative is to complete key negotiation on a TCP connection and use the negotiated parameters to secure a separate datagram channel. This split design is similar to that used by IPsec but has a number of problems.

The primary virtue of a split design is that it releases DTLS from having to implement a reliable handshake layer. In exchange, an application must now manage two sockets (one TCP, and one UDP). Synchronizing these sockets is a significant application programming problem.

In particular, session renegotiation is complicated by this architecture. With the TCP connection closed once key negotiation is complete, renegotiation messages must be communicated over the unreliable datagram channel, requiring the implementation of a retransmission mechanism.
If the TCP connection is left open once key negotiation is complete, unnecessary system resources are consumed.

This is a problem because operating system kernels often exhibit problems when programs have a large numbers of sockets open. In particular, select() performs poorly (if at all) with large numbers of open sockets and replacements are often not portable. In addition, some older operating systems have tight limits on the number of open files per process (in older Linux kernels this limit was 1024.)

An ordinary UDP server expects to read and write on only a single socket. Thus, the use of a TCP handshake channel could force significant rewriting of server code. Additionally, error case handling becomes complicated: say the TCP connection is reset, does that imply that the bulk transfer channel should be closed?

These considerations lead us to conclude that it is better to have the handshake and data transfer occur over the same channel from the beginning. As we shall see, DTLS's reliability requirements are quite primitive, allowing us to make do with a protocol much simpler than TCP.

###Design Requirements

Once we decided on a user-space protocol that runs over a single channel, the direct course of action was to make TLS datagram capable. Although DTLS must be somewhat different from TLS, in keeping with our basic principle we have kept TLS unchanged wherever possible.
Where we have had to make changes to TLS, we have attempted to borrow from preexisting systems such as IPsec. Similarly, DTLS is explicitly designed to be as compatible as possible with existing datagram communication systems, thus minimizing the effort required to secure one's application.

**Datagram Transport** DTLS must be able to complete key negotiation and bulk data transfer over a single datagram channel. This property allows applications to simply replace each datagram socket with a secure datagram socket managed by DTLS.

**Reliable Session Establishment** DTLS must provide a mechanism for authenticating endpoints, reliably establishing material and negotiating algorithms and parameters.
Since DTLS must run entirely over unreliable datagram transport, it must implement a retransmission mechanism for ensuring that handshake messages are reliably delivered. However, the retransmission mechanism should be simple and lightweight, ensuring that DTLS is as portable as possible. Note that the requirement to create a session means that DTLS is primarily suited for long lived connection-oriented protocols as opposed to totally connectionless ones like DNS. 
Connectionless protocols are better served by application layer object-security protocols.

**Security Services** DTLS must provide confidentiality and integrity for the data transmitted over it. It should optionally provide the ability to detect replayed packets.

**Ease of Deployment** The ability to implement TLS entirely in user space without changing the kernel has been a major contributor to TLS deployment. This feature allows developers to bundle a TLS implementation with their application without dependence on operating system vendors.
DTLS should similarly be implementable solely in user space.

**Semantics** For many TCP based applications it has been very simple to implement a security layer by using TLS.
One of the main reasons is that TLS semantics mimic those of TCP. Thus, a TLS API can mimic the well known socket interface, making network connections appear to be read-write streams. DTLS semantics should mimic UDP semantics thus allowing DTLS implementations to mimic the UDP API.

**Minimal Changes** DTLS must be as similar to TLS as possible. Over the years, TLS has become more robust and has been refined to withstand numerous attacks. Our goal is for DTLS to be equally robust by inheriting all the tested and popular features of TLS. By minimizing changes we reduce the likelihood of introducing any unforeseen weaknesses.

Additionally, minimizing changes has the benefit that DTLS can be easily implemented based on TLS implementations such as OpenSSL. Hardware implementations of TLS are optimized to speed up asymmetric and symmetric cryptographic operations. DTLS should not introduce new cipher suites or make changes to the key derivation algorithms. Hence DTLS implementations can leverage hardware implementations of TLS.

DTLS is not intended to provide any congestion control functionality. Congestion control needs to be addressed by a datagram transport using application regardless of whether a security layer is in place, and hence is beyond the scope of DTLS. Applications that do not implement congestion control can use the Datagram Congestion Control Protocol (DCCP) as the underlying transport protocol with DTLS providing the security layer.

###DTLS Design

DTLS reuses almost all the protocol elements of TLS, with minor but important modifications for it to work properly with datagram transport. TLS depends on a subset of TCP features: reliable, in-order packet delivery and replay detection. Unfortunately, all of these features are absent from datagram transport. 

**Record Layer**

As with TLS, all DTLS data is carried in records. In both protocols, records can only be processed when the entire record is available. In order to avoid dealing with fragmentation, we require DTLS records to fit within a datagram. There are three benefits to this requirement.

First, since the DTLS layer does not need to buffer partial records, host memory can be used more efficiently, which makes the host less susceptible to a DoS attack.

Second, it is quite possible that datagrams carrying the remaining record fragments are lost, in which case the received fragments are useless and cannot be processed.

Third, it is not clear how long received fragments should be buffered before being discarded. Buffering record fragments would unnecessarily complicate a DTLS implementation without providing any obvious benefits. Note that DTLS will still operate correctly with IP fragmentation and re-assembly, since IP re-assembly is transparently handled by the kernel.

The DTLS record format is shown below. The boxed
fields are introduced by DTLS and are absent from TLS

    struct {
    ContentType type;
    ProtocolVersion version;
    uint16 epoch;
    uint48 sequence_number;
    uint16 length;
    opaque payload[length];
    } DTLSRecord;

**Epoch**

Epoch numbers are used by endpoints to determine which cipher state has been used to protect the record payload. Epoch numbers are required to resolve ambiguity that arises when data loss occurs during a session renegotiation. To illustrate, consider a client transmitting data records 7, 8 and 9, followed by ChangeCipherSpec message in record 10. Suppose the server receives
records 7 and 9 (8 and 10 are lost). From the server's point of view, record 8 could have been the
ChangeCipherSpec message, in which case record 9 is (incorrectly) assumed to be associated with the pending cipher state. Since epoch numbers are incremented upon sending a ChangeCipherSpec message, the server can use the epoch number to resolve the ambiguity. In this case, records 7 and 9 have the same epoch, implying that record 8 must have been a data record.

An alternative to epoch numbers would be to simply use random initial sequence numbers for records. The sequence numbers are sufficiently large that the chance of collision of active sequence number ranges is vanishingly small. However, this would probably require slightly more code to implement than the epoch strategy and is less in keeping with the style of TLS, which uses zero based sequence numbers.

**Sequence Number** 

TLS employs implicit record sequence numbers (RSN) for replay protection. RSNs play a similar role in DTLS, but must be explicitly specified since records can get lost or be delivered out of order. As with TLS, RSNs are incremented by 1 for each record and are reset to zero whenever the cipher state is rolled over due to a session renegotiation. Note that DTLS sequence numbers are 48 bits (TLS's are 64 bits) and therefore the total space occupied by epoch and sequence number is the same as the sequence number in TLS.

Replay detection is performed using the replay window mechanism of RFC 2401. If datagrams always arrived in order, it would be sufficient for a DTLS end point to keep track of the most recent record seen in order to detect replays. But since datagrams may also arrive out of order, a replay window mechanism is required. This is most easily implemented as a bitmap where the set bits represent the most recently received records. RSNs that are too old to be checked against the bitmap are discarded. Note, however, that replay detection can be undesirable in some applications since packet duplication may be an unintentional network effect. If replay detection is turned off, then sequence numbers are not of any significance in MAC computation, but can be useful for counter mode ciphers.

**Payload Length**

DTLS requires that a record fit entirely within a single datagram. This means that DTLS records will often be smaller than TLS records. The largest packet that can be transmitted between two hosts, the Path Maximum Transmission Unit (PMTU).is typically less than the maximum size of a TLS record.

**Handshake Protocol**

The DTLS handshake is nearly identical to that of TLS. There are two major changes:

1. Stateless cookie exchange to prevent denial of service.
2. Message fragmentation and re-assembly

**Handshake Exchange** 

Because the DTLS handshake takes place over datagram transport, it is vulnerable to two denial of service attacks that TLS is not. The first attack is the standard resource consumption attack. The second attack is an amplification attack where the attacker sends a ClientHello message apparently sourced by the victim.

The server then sends a Certificate message which is much larger to the victim.
To mitigate these attacks, DTLS uses the cookie exchange technique.
Before the handshake begins, the client must replay a cookie provided by the server in order to demonstrate that it is capable of receiving packets at its claimed IP address.
 
The DTLS ClientHello message contains a cookie field. The initial ClientHello contains an empty (zero-length) cookie or potentially one cached from a prior exchange.

A server that is unable to verify the incoming cookie and wishes to establish the liveness of the DTLS client sends a HelloVerifyRequest message. Servers that are more sensitive to overall handshake latency can skip the HelloVerifyRequest message and instead respond with ServerHello messages, in which case the protocol fiow is the same as in TLS. Note that servers which choose to make this optimization can still be used as denial of service amplifiers and should therefore only do so in environments where amplification attack is known not to be a problem.
The HelloVerifyRequest message contains a cookie.

This cookie should be generated in such a way that it does not require keeping state on the server, thus avoiding memory consumption denial of service attacks. For example, the cookie can be generated from a keyed hash of the client IP address, using a global key. Servers that are willing to resume sessions can skip the cookie exchange phase if a valid session ID is presented by the client, since the identity of the client must have been previously established. One possible optimization for servers that do not support session resumption is to maintain a cache of recent (client, cookie) pairs, so that cookie exchange can be skipped if a match is made on the first ClientHello .

The formats of the ClientHello and HelloVerifyRequest messages are provided below.

    opaque Cookie<0..32>;
    struct {
    ProtocolVersion client_version;
    Random random;
    SessionID session_id;
    Cookie cookie;
    CipherSuite cipher_suites<2..2^16-1>;
    CompressionMethod comp_meth<1..2^8-1>;
    } ClientHello;
    struct {
    ProtocolVersion server_version;
    Cookie cookie;
    } HelloVerifyRequest;
    

Unlike application data, handshake messages (including the ChangeCipherSpec message) must be reliably delivered since all handshake messages are necessary for successful session negotiation. This creates three problems.

First, messages may be lost on the network. Second, they may be reordered, confusing the receiving peer. Third, some handshake messages are too large to fit in a single DTLS record and therefore must be fragmented across multiple records. The DTLS handshake layer is responsible for reassembling these records into a coherent stream of complete handshake messages. This necessitates the addition of retransmission as well as a more complicated message format.

**Timeout and Retransmission**

Because DTLS handshake messages may be lost, DTLS needs a mechanism for retransmission. DTLS implements retransmission using a single timer at each endpoint.

Each end-point keeps retransmitting its last message until a reply is received. The state machine that implements the timer and resulting retransmissions is shown in Figure 5. In the balance of this section, we describe the operation of the timer state machine and explain how timer expiry values are picked.

**State Machine** Once in the Read Message Fragment state, transitions are triggered by the arrival of data fragments
or the expiry of the retransmission timer. If a data fragment is the expected next handshake message then the fragment is returned to the higher layers and the timer is cancelled. Otherwise, the fragment is buffered or discarded as appropriate and the timer is allowed to continue ticking. When the retransmit timer expires, the implementation retransmits the last flight of messages that it transmitted.

**Timer Values** Picking appropriate timer values is a difficult problem due to the heterogeneous nature of the Internet and the wide variance in round trip times (RTT).

While estimating RTT would allow for estimating a timer value, requiring that DTLS estimate RTT is an unnecessary burden, given the simplicity of the handshake protocol.

Deciding on the exact timer value is especially tricky because the peer is often doing some kind of cryptographic computation, which can take a substantial fraction of the RTT. Thus, one wishes to set one's timer values conservatively to avoid unnecessary retransmissions.

We recommend that DTLS implementations use timer values between 500 to1000ms. In general, well-behaving implementations should back off their retransmission timers.

**Are ACKs necessary?**  When a retransmission event happens, the entire flight of un-answered messages is retransmitted.
If that flight is large, like a Certificate message, a nontrivial amount of network bandwidth (though probably less than 5k) is wasted. In addition, the desire to avoid unnecessary retransmission motivates large timer values which result in high latency. An alternative strategy would be to allow receivers to transmit an ACK value that indicated that they have received the message and were processing it. This would allow timers to be set lower as well as reducing the number of packets that have to be retransmitted (since the sender would know that some had already been received.) In the interest of simplicity, we decided not to add an ACK feature to DTLS, but future measurement may indicate that ACKs provide a large enough improvement to be worthwhile adding.


**Handshake Message Ordering and Fragmentation**

Because handshake messages may be too large to fit into a single DTLS record, we need to modify the handshake messages to be able to span records. The new format is shown below.
    
    struct {
    HandshakeType msgfitype;
    uint24 length;
    uint16 messagefiseq;
    uint24 fragfioffset;
    uint24 fragfilength;
    HandshakeMessage msgfifrag[fragfilength];
    } Handshake;
    
**Message Length** The handshake message header contains the overall message length. This makes it easy to allocate buffer space for the message regardless of which fragment is received first.

**Message Sequence Number** Handshake (and Change Cipher Spec) messages include their own message sequence numbers (MSN), independent of record sequence numbers (RSN). Since the record layer assigns unique sequence numbers to each record, it is possible that a DTLS end-point receives a handshake message and its retransmitted version under different RSNs. In the absence of the MSN, it is not possible for the handshake layer to detect duplicates. All fragments of a handshake message carry the same MSN.

It is worthwhile considering whether retransmits can reuse the original RSN, and hence make do without the MSN. As it turns out, there are two problems with reusing RSNs. First, it is a layering violation: the handshake layer is a client of the record layer, just like the application layer, and should not receive different treatment. Second, the original handshake message may have been dropped due to the packet size exceeding PMTU. In this case the handshake message needs to be fragmented, which implies that it spans multiple records, each with their own unique RSN.

**Fragment Offset and Length** As previously mentioned, handshake messages may be fragmented when they are larger than PMTU. In fact such fragmentation is fairly likely since certificates can easily be a couple of kilobytes in size. We chose to use fragment offset and length rather than fragment sequence numbers to aid in handling messages which are fragmented twice in two different ways. With this scheme, it is easy to reassemble the original message provided at least one copy of each byte is received.

**Finished Message** The purpose of Finished messages is to verify that parties have correctly negotiated keys and algorithms. In TLS, the Finished message contains MD5 and SHA1 hashes of all the handshake messages, sequentially appended to each other (including their message headers). The DTLS algorithm for computing finished hashes has to be slightly different due to the presence of message fragmentation headers. Since the message might have been fragmented multiple times with different fragment sizes, this creates a potential inconsistency. In order to remove this inconsistency, the handshake hashes are computed as if handshake messages had been received as a single fragment.

**Alert Messages** DTLS reuses all of the TLS alerts. Most TLS alerts signal the end of the connection either graceful or abortive and therefore no data should come after them. Under no circumstances should a record be accepted with a sequence number postdating that of an alert which closed the connection.
There is, however, a complication introduced by a sender transmitting data followed by an alert but have them arrive in the reverse order. We have not analysed this situation, but believe that it is safer for implementations to reject such data records.

### Security Analysis

Considering the complexity of modern security protocols and the current state of proof techniques, it is rarely possible to completely prove the security of a protocol without making at least some unrealistic assumptions about the attack model.

All the features introduced into DTLS are for the sole purpose of dealing with unreliable datagram transport. We argue that DTLS does not reveal any additional information beyond TLS during the handshake or bulk transfer phase, all the additional information in a DTLS stream can be derived by passively monitoring a TLS stream. 

**Record Layer**

The DTLS record layer reveals the current epoch and sequence number. This is public information to an adversary monitoring a TLS session: the sequence numbers are implicit in TLS, but nonetheless may be inferred, and epoch numbers may also be derived from the stream since session renegotiations may be detected (by observing Handshake records being exchanged during an established session.)

**Handshake Layer**

Handshake messages reveal message number, fragment length and fragment offset. Once again, this information is easily derived by an eavesdropper monitoring a TLS session. Message number is obtained by counting exchanged messages, fragment length is obtained from record length and fragment offset is derived from the length of preceding message fragments.
Only the Finished message is encrypted during the initial handshake phase, and since it is of a fixed format, its fragment length and offset are obvious.
Handshake messages exchanged due to session renegotiation are completely encrypted in both DTLS and TLS.


**Timing information**

Recently, timing information has been used as the basis for attacks on TLS. Therefore it is critical to consider what information is revealed by timing.

DTLS receive record processing is essentially the same as that of TLS. On reception, records and handshake messages are not processed until available in entirety, and therefore the processing of DTLS records and messages is identical to the processing procedure of TLS.

DTLS transmit processing leaks a small amount of timing information when compared to TLS. In general, when applications issue TLS or DTLS writes, this causes a single DTLS/TLS record to be generated. The time when the packet is delivered to the network potentially reveals information about the plaintext. With TLS, TCP congestion and flow control hides this information to some extent. With DTLS, however, records are likely to be transmitted as soon as they are generated. Users who wish to prevent this kind of traffic analysis should buffer writes.

 
