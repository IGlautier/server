## Privacy Requirements in the IoT

Privacy is one of the most sensitive subjects in any discussion of IoT protection. The data availability explosion has enabled user tracking and profiling, often carried out without consent. Users have access to an unprecedented number of personalized services, and the IoT environment itself would be able to acquire information about users automatically.

The data collected from IoT devices can reveal information about
the user's habits. For instance, in the power management use case the attacker can learn from basic analysis of the movement sensor data when the user leaves the house, goes to sleep, or wakes up in the morning. In the healthcare system, the signals from the sensors used to report the patients conditios can reveal the medical function of the device, thus revealing private information about the holder.

In the health care scenario, privacy is the main concern for employees when using this technology, since they can be tracked constantly. Also, an attacker can learn about the health condition of patients by standing close and intercepting the signals from the RFID tags that are used to monitor their condition.

As European regulators grapple with the challenges and complexities of formulating a technology-neutral Data Protection Regulation, the difficulties of applying “traditional” concepts such as consent, purpose limitation, transparency, data deletion, accountability and security to the data processing activities carried out by an “Internet-ready” kitchen appliance become readily apparent. 

The creation of vast amounts of data that are a consequence of the IoT puts pressure on existing data privacy concepts. For example, data protection laws in the EU are based on the fundamental concept that users should be in control of their personal data. However, as we continue to generate more and more data in our daily lives, there is increasing recognition that not only will we never be in complete control over how our data is used but that our control is actually receding.

Privacy generally seeks to protect information that can be attributed to an individual, and to ensure that the collection, use, retention, disclosure and disposal of personal information is carried out appropriately.

**Personally identifiable data** is any data linked to a person or persistently linked to an IoT device: data that can identify a person via personal information or a device via a unique identifier.  Included are user-entered data, as well as automatically collected data.

**Sensitive information** is personally identifiable data about which users are likely to be concerned, such as precise geo-location; financial and medical information; passwords; stored information such as contacts, photos, and videos; and children’s information.  

###1. Privacy by design

**Guidelines:**

1. Privacy by design gives users the tools they need to manage their own data. Users can use consent tools that permit IoT devices to access as little or as much of that data as desired. 

Privacy by Design means putting the user first and helping them become aware of and manage the privacy implications of using devices in ways that enhance the user’s privacy experience.

**Implementation:**

The key challenge in this area is the lack of a UI on most IoT devices that makes management and communication of privacy implications to users difficult. As most IoT devices have capabilities to be managed and controlled via a management application on a smartphone, manufacturers could use this as a platform for communicating privacy notices to users and allowing them to manage their PI data.

###2. Transparency and Openness

Transparency is essential since users should know which entities are managing their data and how and when those entities are using it. 

**Guidelines:**

1. Users should be provided with clear, prominent and timely information regarding the identity and data privacy practices of various entities with access to their data. 
2. They should also be aware of the access, collection, sharing and further use of their personal information, including to whom their personal information may be disclosed, enabling them to make informed decisions about whether to use a particular IoT device. 
3. A privacy practice shoud be made available to users before the IoT device is enrolled and any data is collected. 
4. An IoT device must not secretly access and collect personal information about users.
5. Users must know who is collecting or using their personal information and how they can contact that entity for more information or to exercise their rights.
<br> This must be communicated in a notice.
6. Sharing personal information with third parties.
<br> If third parties will collect or have access to user information for their own purposes, the user must be made aware at the earliest opportunity that their data will be shared. Users must be allowed to choose whether to allow this collection, access and use by third parties.
7. If user data will be retained after its use, users must be given information about: 
<br> a. The periods for which information may be retained and why. 
<br> b. How the user can exercise specific rights over their information.
8. Where possible, users should have choices about how – and how often – they are reminded about features and functionality that use their personal information.

**Implementation:**

1. Before a user installs and enrolls a device, he or she must be presented with information about: 
<br> a. What personal information an IoT device will access, collect and use .
<br> b. What personal information will be stored. (on the device and remotely) 
<br> c. what personal information will be shared and with whom.
2. Users should have enough information to make an informed choice about whether to use a device and the consequences of doing so.
3. Help users manage their privacy: Make them aware of a device’s privacy default settings.
4. Give users easy to understand choices and mechanisms for managing their privacy.
5. If a device manufacturer wants to use personal information for a purpose that’s different from what was originally communicated in the notice, then there is a need for this to be explicitly communicated to the user.
<br> This can be communicated to the user via the IoT management application.
6. Where technically possible, provide users with opportunities to determine how they will be prompted and how often they will be prompted to make decisions over access to, and use of, their personal information.
7. Users may be given the choice to ‘remember’ their log-on credentials, billing address, email addresses, or location. It is possible to provide blanket one-time prompting for each data type or granular more context-specific prompts.

In an Internet of Things world, where providing users with notice and choice often proves extremely difficult, surprise minimization is becoming a powerful tool businesses can use to help engender trust with consumers. This is about knowing what customers expect from your services and being accountable to them. 

Recognizing that the legally required general privacy policy is not always the most effective way to get consumers’ attention, the  ‘surprise minimization’ approach means supplementing the general privacy policy with enhanced measures to alert users and give them control over data practices that are not related to a devices’s basic functionality or that involve sensitive information.

As connected cars, appliances and wearables become more ingrained in our daily lives and consumer-facing interfaces less so, surprise minimization will play an even more powerful role. As an owner of a connected refrigerator, one might expect it to print out a grocery list, but you certainly wouldn’t expect that data to be shared with a health or life insurance firm. A solid business should notify and give people a choice when the data being shared or the person it’s being shared with is outside reasonable expectations.

A device must not access user data that isn't required for it to provide it's primary service. If, for example, a smart TV is collecting a user's channel viewing data that is secondary to the device's functionaly, you need to get a user’s active consent.

**Possible Solutons:**

1. The landing page on an IoT management application is an excellent place to publish key privacy facts, contact information and provide a hyperlink to a more detailed privacy statement. The key is presenting and communicating these details to the user in the absence of a user interface on the device.

###3. Notice / Disclosure 

**Guidelines:**

1. There must be a way for an individual to find out what information about him is in a record and how it is used. This should be specified by the device manufacturer/service provider via a notice.

2. This notice should be delivered just before collecting the data and gives users an opportunity to allow or prevent the practice.  Another way to achieve the same end is to make readily available both a short privacy statement highlighting potentially unexpected practices, and privacy controls that allow users to make, review, and change their privacy choices via the device management application.

**Implementation:**

1. Prompt the user and make this information easy to discover and understand. 
2. Keep it simple and make it easy to exercise choice. 
3. Enable the user to reject the installation or activation if they do not wish their personal information to be used as explained to them. 
4. Ensure usability and avoid excessive user prompts that will burden the user. Consider the user experience.

Probably known as the number-one responsibility for any user of personal information, telling individuals about how their data will be employed in an IoT context throws in a few twists. What kind of privacy notice can a toaster provide? How often will our car remind us that it knows where we are? How politely can a running jacket tell me that I'm just trying too hard??? Providing any kind of meaningful notice in this new environment is definitely a big challenge.

But even setting aside the question of how to provide actionable notices, consumers absolutely must be able to find this information somewhere. How can these objects provide just-in-time notice and choice if there is no user interface at all?

> When you build compliance around explicit consent notices, it’s inevitable that those notices will become longer, all-inclusive, heavily caveated and designed to guard against risk. Consent notices become seen as a legal issue, not a design issue, inhibiting the adoption of Privacy by Design development so that—rather than enhancing user transparency, they have the opposite effect. <br> source:https://www.privacyassociation.org/privacy_perspectives/post/a_brave_new_world_demands_brave_new_thinking

###4. Data Minimisation and Retention

**Guidelines:**

1. The collection of personally identifiable data should be minimised for uses not related to the device’s basic functionality, and the retention of such data should be limited to the period necessary to support the intended function or to meet legal requirements. This data should then subsequently be deleted or rendered anonymous.
2. Only the minimum personal information necessary to meet legitimate business purposes and to deliver, provision, maintain the primary function of a device should be collected and otherwise accessed and used.
3. The collection of sensitive information must be limited.
4. Data that can be used to identify a user or device should not be retained beyond the time period necessary to complete the function for which the data was collected or beyond what was disclosed to the user.
5. Procedures for deleting personally identifiable user data that you no longer need must be adopted and continually updated.
6. Set retention and deletion periods. 
<br> Personal information that is to be retained must be subject to retention and deletion periods that are justified according to clearly identified business needs or legal obligations.

**Implementation:**

1. Think about what personal information you need and then justify it. Is it really necessary? Are you required to collect it, share it or keep it to meet a business need or legal obligation?
2. Use personal information in ways users would expect when they made a decision to install and use an IoT device.
3. Justify the collection and retention of personal information according to identified business needs or legal obligations. Set a policy and implement it at a technical and business process level. 
4. Once personal information is no longer required to meet a specific legitimate business purpose or legal requirements/obligations, it should be destroyed or anonymised. 
5. Truly anonymous data may be retained indefinitely. To anonymise data, remove any information that could be used to identify a specific individual, ensuring it is not possible to re-identify the individual, and ensure that the data cannot be related to a single, unidentified individual by unique identifiers.

Going back to the Smart TV example, having the TV log every time a user changes the channel, may be acceptable, if at all. But having the TV scan all shared files on the home network would definitely fall outside any legitimate need and is a violation of user privacy.

###5. Informed Choice / Consent

**Active consent:** This means a user is given a clear opportunity to agree a specific and notified use of their personal information. Active consent would apply to secondary non-obvious use of a user’s personal information such as a device requesting a user’s location where such data is not necessary to the functioning of the device. Active consent must be captured in a way so that consent is not the default option.

**Guidelines:**

1. There must be a way for an individual to prevent information about him that was obtained for one purpose from being used or made available for other purposes without his consent.

2. Intermediaries and platforms should only monitor their customers on affirmative opt-in basis absent a compelling operational necessity. Originally called "Secondary Usage", this principle seeks not only to give an individual a voice as to whether or not PI is shared with others by offering an "opt out," but also is intended to prevent inappropriate use of the data. 

**Implementation:**

1. Where necessary, gain the user’s active consent.
<br> This is the collection or use of personal information not necessary to the device’s primary purpose.
2. Where it is necessary to get active consent, users should be made aware of: 
<br> a. how long a consent is valid 
<br> b. how they can manage any consent given by them 
<br> c. the consequences of withholding or withdrawing their consent.
3. Users must be able to withdraw consent by simple and efficient means, without any undue delay or undue cost.

**IoT example:**

Applications that track a user's location such as a wearable fitness tracker may not collect location for other purposes — for example, targeted advertising or analytics —unless the user gives their active consent.

LG Smart TVs, for example, were found to be reporting back to LG every time the user changed the channel. The TVs were also scanning all shared files on the home network and sending a running tally of those back to LG as well. The company allegedly offered an opt-out of “Collection of watching info” in its options menu, but apparently toggling the opt-out didn’t actually do anything. 
(source: [www.doctorbeet.blogspot.co.uk/2013/11/lg-smart-tvs-logging-usb-filenames-and.html])

This, in turn, brings up the question of whether home appliances should be monitoring consumers and reporting everything back to manufacturers by default? This sort of monitoring is particularly invasive. It monitors how consumers use all the various services accessed through that intermediary (such as websites, apps or here, TV channels).

> As technology becomes ever more complicated, so it becomes ever more likely that consumers won’t really understand what it is they’re consenting to anyway, no matter how well it’s explained. It’s also a safe bet that users will simply ignore any notice that stands between them and the service they want to receive.
<br>source: https://www.privacyassociation.org/privacy_perspectives/post/a_brave_new_world_demands_brave_new_thinking

###6. Purpose and Use

**Guidelines:**

1. Inform the user that personal data will be collected and give them the choice of active consent.
2. The access, collection, sharing, disclosure and further use of users’ personal information shall be limited to meeting legitimate business purposes.

**Implementation:**

1. If an IoT management application will retain a history of a user’s personal data, such as health data gathered by a fitness tracker, the user must be told about this and also how long the data will be retained and why. Users must give their active consent to retain a history linked to them as unique individuals and must be able to review and delete the history.
2. If users will receive advertising or sponsored results based on their collected stats, they must be provided with clear notice that the device is ad-supported. If users will receive advertising or sponsored results based on the stored history of that user’s health statististics, users must provide their active consent.

> This may be a little difficult given that most IoT devices have a very small to non-existent UI. Working on this problem will be an important objective for device manufacturers and service/application providers.

3. If an IoT management application continues to collect, use or share collected data during operation of the device or after a user has stopped using the device;
<br> a. Users must provide active consent to the continued operation of the data collection and should be able to set the level of granularity of the data collected. 
<br> b. The management application must include a means that alerts the user that the data collection continues to operate.
4. The device must provide easily accessible settings that allow the user to immediately turn data collection on or off.
5. When data collection has been activated, there must be a clear and prominent indicator of this.
6. If the device shares this gathered personal data of a user with other devices or services:
<br> a.There must be a disclosure identifying and providing a link or other means to access the third party device or application.
<br> b. Users must provide active consent to this data sharing.
<br> c. Users must be able to easily manage these third party devices for example, to withdraw consent where desired.

**Possible Solutions:**

1. A symbol could be used to indicate that an IoT device is actively accessing a user’s data to enhance the user’s awareness and provide the opportunity to actively manage their privacy. 
<br> This would be subject to the device having some sort of UI.
2. Alternatively, users could be sent periodic messages via the IoT management application or alerted via other means(mail sent to the user account for eg) that their personal data is being tracked and collected.

**IoT Example:**

If a Smart TV is collecting user data such as the channels that have been accessed, there is probably no need to provide the user with additional privacy information or to obtain their active consent. However, if the device retains applications used and other contextual information about a user’s requests in order to build a profile and target the user with advertising at a later stage, then the device would need to tell the user about this and get their active consent before the user’s information is collected and used for these purposes.

###7. Respect for User Rights

**Guidelines:**

1. Users should be provided with information about, and an easy means to exercise, their rights over the use of their personal information.
2. Users should have control over data practices that are not related to an IoT device’s basic functionality or that involve sensitive information.  


###8. Accountability and Enforcement

**Guidelines:** 

1. Assign responsibility for ensuring end-user privacy is considered and delivered throughout the product lifecycle and through applicable business processes.
2. Provide users with a solution to enable them to report problems/bugs found with a device that may breach the privacy of their personal information.

**Implementation:** 

1. Each entity that collects personal information about users must ensure a company representative is assigned the responsibility for ensuring end-user privacy is built into IoT devices.
2. Any IoT device manufacturer or service provider is accountable for complying with applicable laws and with their general privacy policy and any privacy notices that they provide. 
3. There is also a pressing need for someone in the organization to be responsible for reviewing the general privacy policy whenever the device is updated or when business practices change. This person should also maintain an archive of previous versions of the policy, maintain rules for limiting internal access to personally identifiable user data, act as the point of contact for privacy questions and comments, and stay informed of new privacy laws and regulations. 
4. Users must be able to report problems with devices or the device platforms themselves. Users must be provided with information explaining how they can report any issue that they face or bug they suspect, or which are found to breach the privacy and security of their personal information. Procedures should be established and maintained to deal with such reports and address any specific threats and risks.

**Possible solutions:**

* Provide a short statement and link on the IoT management application landing page, and or your corporate website. Clearly signpost this. If you collect email contact addresses (with permission) you could also email that information to users.

###9. Access

**Guidelines:**

1. There must be a way for an individual to correct or amend a record of identifiable information about himself.
2. Individuals must be able to find out what personal information a company has on file about them, and how they can gain access to it so that data in error can be corrected or removed. 

**Implementation:** Users should have access to the personally identifiable data that the app collects and retains about them.
<br> This can be made available via the IoT management application.

> There's a general notion in privacy that individuals should have a right to access their information—indeed, this right is hard-coded into EU law. But when so much information is collected—and across so many devices—how can we provide individuals with meaningful access to information in a way that is not totally overwhelming?
<br> source: https://www.privacyassociation.org/privacy_perspectives/post/information_pollution_and_the_internet_of_things

###10. Security 

**Guidelines:**

1. Personal information must be protected, using reasonable safeguards appropriate to the sensitivity of the information. Any organization creating, maintaining, using, or disseminating records of identifiable personal data must assure the reliability of the data for their intended use and must take precautions to prevent misuse of the data. 
2. Authenticate users where possible using risk-appropriate authentication methods.

**Implementation:**

1. Generally, PI is categorized, and thus secured, at the highest level, requiring strong authentication, encryption, and stringent controls over physical documents.
2. This is done by using security safeguards to protect personally identifiable data from unauthorized access, use, disclosure, modification, or destruction.
<br> These safeguards should include, but not be limited to, the following:
<br> a. Access control of personally identifiable user data on a need-to-know basis.
<br> b. Use of encryption in the transit and storage of personally identifiable data.
3. Adopt technical measures and business processes to prevent the misuse or corruption of personal information.
4. Where a device creates or collects personal information considered sensitive, such as log-on details, SSIDs, financial details, such information must be stored and transmitted in a secure manner.

**References:**

1. http://www.gsma.com/publicpolicy/privacy-design-guidelines-for-mobile-application-development
2. https://privacyassociation.org/news/privacy-perspectives/
