# MQTT discussion, continued …
http://vasters.com/clemensv/2014/06/16/MQTT+Discussion+Continued.aspx


Last week, [IBM's Peter Niblett posted a response](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=https%3a%2f%2fwww.ibm.com%2fdeveloperworks%2fcommunity%2fblogs%2fc565c720-fe84-4f63-873f-607d87787327%2fentry%2fmqtt_a_discussion_on_clemens_vasters_post%3flang%3den) to my [MQTT analysis](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=http%3a%2f%2fvasters.com%2fclemensv%2f2014%2f06%2f02%2fMQTT%2bAn%2bImplementers%2bPerspective.aspx) and says that he is keen on a positive discussion on my observations as a contribution to the future development of MQTT by the OASIS Technical Committee that is working on MQTT. Thank you, Mr. Niblett. 

That said, a friend who works as a messaging product architect at another major platform vendor chatted me on Facebook after reading the IBM post and wrote "Good response, but nothing in that post convinces me that anything you wrote was wrong". I agree in that I don't see a need to make updates to the original post. 

What's worth restating in this discussion is that I took the OASIS 3.1.1 version as published an implemented it from scratch. There ought to be no need for being "in the know" or be member of a particular discussion circle to do so. _The protocol is exactly and only what the specification document says it is_. Peter is providing several clarifications on technical aspects or on spec intent in his post, which I appreciate, but one of the key points of my critique is that this ought not to be required. What I say about the protocol are statements about the specification. 

I'm going to use Peter's post structure: 

### i) Scope and intended use of MQTT 

Peter starts out with providing some insight into the history of MQTT stating that it has been used for over 15 years and that it were a better starting point than some "radically new, untried protocol" and it were better to "standardise what already works". 

I think that's a reasonable way to start, if the protocol had proven, for that much time, that it does indeed provide secure and reliable message transfer, at very significant scale, in the sort of dynamic networking and operational environments that we're debating in "Internet of Things". 

I am not at all arguing that it's impossible to get messages from A to B with MQTT. I am arguing that the protocol is becoming increasingly more unsuitable as the communication path quality between A and B deteriorates, the parties can be less trusted, and as the count of the A's go into the 100,000s and the B's become large always-on clusters with failover, in-place upgrades, and a ton of required moving pieces of which many can and do fail every once in a while. 

If the protocol is 15 years old and originates from factory floor environments, it's obvious that it wasn't designed for this new world; even the mighty HTTP 1.1 is getting a massive overhaul now after 15 years, since the web community sees that new usage patterns and requirements call for the dramatic changes that are embodied in the current HTTPbis drafts. So, yes, I do indeed call into question whether MQTT "already works" for the future challenges that lie ahead. 

### ii) Error Handling 

In my post I mentioned that I've been involved in shipping Azure Service Bus for the last 7 years. What I didn't mention there is that "shipping" also means "operating". Not only do we ship this software, we also run it ourselves. Just like any other engineer on the team, I've been on the 24/7 on-call rotation for the past 5 years that our service is in production, and we've learned taming the fire-breathing dragons that are several dozen large clusters of hundreds of nodes each that are distributed across datacenter fault domains and get updated and serviced under full load – they're tamed, but they're still fire-breathing dragons. Part of the art of taming these dragons is as much transparency on what goes wrong and where and why as can be feasibly provided. There is no winning argument that can be made against making appropriate diagnostics information available to all communicating parties. 

In his reply, Peter argues against putting error information on the wire, because that would serve no purpose: 

_If the protocol were to send detailed error information to the clients, it's unlikely that they would be able to do much with it other than send it back in to a central Problem Determination system. It's more practical for error logging and diagnosis to be done centrally by the server, so in many cases there's no real need to pass the information to the clients. _

That's an interesting stance, because of the inherent notion that server and client are part of a system that can be supervised and analyzed centrally. That may be true for a traditional enterprise or factory floor messaging system. It's not true for any contemporary solution I get to help with. 

All communicating parties need to be able to understand what went wrong and why, during development time and at runtime, especially with globally distributed parties, distributed ownership of digital assets, and when communication spans trust boundaries. 

Imagine HTTP were doing this and client induced errors got no feedback. Would there be some server where you'd have to look up your 404s? 

Also, and that's a nit on the above point, the publishing gestures of MQTT are symmetric and if a device rejects a message sent by a server for any reason, even such a problem determination system would be in the dark, because how would it ever get at that information if the client hoards it? 

The stance reveals a lot about why this debate is happening: MQTT carries the DNA of an architecture model where all parts of the system are built, owned, and operated by one party, and where that one party has or can easily gain access to full access to such diagnostics information at all times. 

In the same section, Peter defends the absence of an error feedback path for PUBLISH: 

_The server is permitted to accept an unauthorised PUBLISH message and not drop the network connection, provided that it doesn't forward the unauthorised message on to any subscribers._ 

While that seems like a reasonable workaround, that is not what the specification says. The spec says _"If a Server implementation does not authorize a PUBLISH to be performed by a Client; it has no way of informing that Client. It MUST either make a positive acknowledgement, according to the normal QoS rules, or close the Network Connection"_. 

The specification doesn't state Peter's authorization caveat, at all. In fact, there are actually rules in the QoS section of the specification that stand against this approach; for instance _"A Server MUST store the message in accordance to its QoS properties and ensure onward delivery to applicable subscribers" [MQTT 4.3.2-2]._ 

In MQTT an authorization failure during publishing will either cause the connection to drop or the server will – if following Peter's strategy – intentionally lie to the client. 

Imagine the astonishment of a client who is sending gigabytes of gold-plated mobile M2M bytes into a misconfigured server for several days where authorization rules are wedged, and the server is happily reporting the messages accepted, and actually tosses them out as they get there. That recommendation is _worse_ than disconnecting. 

### iii) Session State Durability 

In this section, Peter provides some further explanation of the session state model, in clearer terms than the specification I am discussing, and says 

_[…] a server is indeed entitled to kill a Non-Durable Session if it wishes, though presumably customers would think twice about using a server that does this a lot.&nbsp; _

My point is that the specification is wishy-washy about it and that it ought not to be. 

The point is also that in a world where software systems aren't running within the four walls of one company, there's no necessarily a choice about whether or customers will or will not use a particular server. That server sits over there, is run by someone else, and you have to use it. For that, the specification ought to provide predictability and clear guidance, including – potentially – reliability profiles. A purely ephemeral in-memory server shouldn't even have to pretend to support QoS 2 or "Retain". 

### 1) Suitability of MQTT for IoT use-cases 

In this section, Peter defends MQTT's suitability for IoT use-cases by commenting on some of the points I made in my original article. Of the ones I didn't already address above only the TLS session resumption argument stands out for me: 

On my paraphrased point "Transient errors force a disconnect, which results in a renegotiation of a TLS connection and this is costly", Peter responds _"I would hope that, although they will occur, transient errors are likely to be rare - probably rarer than network failures. In any case TLS has a special path that allows a Session to be resumed quickly without going through the full TLS handshake." _

TLS has, in the form of RFC5077, a stateless session recovery model, which is available via explicit opt-in gestures on server and client in most SSL/TLS libraries. The MQTT 3.1.1 specification mentions this RFC. 

Peter is correct that RFC5077 support will limit the impact of disconnects, I'd be interested in how many libraries implementing TLS/SSL for MQTT are also leveraging this feature of their respective underlying SSL/TLS library so that this can be consistently relied on. 

In my original post I criticize the name-dropping in the security section, which looks like a scratchpad of notes rather than firm guidance. The mention of RFC5077 looks like this: 

_Constrained devices and Clients on constrained networks can make use of TLS session resumption [RFC5077], in order to reduce the costs of reconnecting TLS [RFC5246] sessions. _

If it were sticking to its "in doubt: disconnect" attitude around errors, which I don't hope, it would do the protocol good if it were taking more assertive ownership of its security model and prescribed how TLS ought to be used in precise terms, including prescribing RFC5077 support. 

### 2) Difficulties of Implementing an Internet Scale MQTT Server 

Peter admits that it is hard to build multi-server MQTT servers, but points out that there are available implementations. I'm somewhat struggling to find MQTT servers that support the breadth of the spec (including QoS 2) in a multi-node configuration of non-trivial size (i.e. more than 4 nodes) with robust failover support including in-flight deliveries. 

I looked at a few. 

RabbitMQ [doesn't seem to support QoS 2](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=http%3a%2f%2fwww.rabbitmq.com%2fmqtt.html), ActiveMQ/Apollo's MQTT adapter [holds in-flight deliveries in non-replicated in-memory state](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=https%3a%2f%2fgithub.com%2ffusesource%2ffuse-extra%2fblob%2fmaster%2ffusemq-apollo%2ffusemq-apollo-mqtt%2fsrc%2fmain%2fscala%2forg%2fapache%2factivemq%2fapollo%2fmqtt%2fMqttProtocolHandler.scala), for Mosquitto I can't find the clustering option, even IBM's MessageSight appliance only [seems to support a hot/warm clustering model with at most two nodes](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=http%3a%2f%2fpic.dhe.ibm.com%2finfocenter%2fism%2fv1r0m0%2ftopic%2fcom.ibm.ism.doc%2fOverview%2fov40000.html%3fresultof%3d%2522%2566%2561%2569%256c%256f%2576%2565%2572%2522%2520%2522%2566%2561%2569%256c%256f%2576%2522%2520), and HiveMQ [seems to replicate messages between cluster](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=http%3a%2f%2fwww.hivemq.com%2fbuilding-a-high-availability-mqtt-cluster%2f) nodes, but doesn't appear to replicate in-flight delivery state for when a node fails and a secondary kicks in. 

Now, I only looked at a few and I'm only looking at things from the outside where I can't see code or clustering docs, so I'll be happy to hear if there's something I can look at for reference. 

### 3) Missing Features you would expect in a Messaging Protocol 

This is the section in Peter's post that I am very grateful for, because he's acknowledging that I identified a list of shortcomings that seem reasonable to consider for a future version. 

Where I disagree with Peter is that metadata extensibility shouldn't go beyond the PUBLISH package. I believe the MQTT spec would benefit from a generalized message model where variable headers and their format options are clearly defined upfront, instead of having to infer them from the individual package descriptions. Why such a generalized message model couldn't also define a model for carrying a metadata dictionary isn't clear to me. 

### In closing 

Lastly, Peter calls Microsoft to action. Whether Microsoft might or might not join the OASIS TC isn't a point I will or even can debate here, because I'm not speaking for the company here on my own personal blog (and these posts don't go to _blogs.msdn.com/clemensv _if you noticed). I'm also not working in the group at Microsoft that drives standardization, so I would likely not be directly involved in the day-to-day TC work, in any event, since my day job is implementation, not creating specifications. 

What I would consider a prerequisite for me recommending such an engagement were – if someone were to ask me — that the TC were willing to allow for significant changes for the next revision and strike the backward compatibility mandate. 

I stand by my statement that MQTT, in the current form, is not a protocol that's setting us up well for the "Internet of Things" future as I see it. The protocol needs urgent fixing in error handling, and message metadata flow, it ought to – in my view – provide a clearly delineated set of reliability and feature profiles making features like retain, Will, and QoS 1/2 optionally layered as some are very hard to implement correctly at scale or require special authorization and resource governance models, and it needs to take firm ownership of authorization and its on-wire security model, including explicitly allowing for token-based authorization of sessions. 

- 

Thank you for reading this and I hope you consider this useful in spite of the leadership of the Eclipse Foundation (and oddly really just them) calling my posts [FUD](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=https%3a%2f%2ftwitter.com%2fIanSkerrett%2fstatus%2f474268281327464448), [flame war](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=https%3a%2f%2ftwitter.com%2fmmilinkov%2fstatus%2f474205806070489088), and [not a community service](http://vasters.com/clemensv/ct.ashx?id=bbd01ea7-4f76-4347-a209-5d63d7678e09&amp;url=https%3a%2f%2ftwitter.com%2fIanSkerrett%2fstatus%2f474301985114439681). I believe this discussion is a community service. And I wrote this on Sunday. 
