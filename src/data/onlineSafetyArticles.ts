import { ArticleData } from './cybersecurityBasicsArticles';

export const onlineSafetyArticles: ArticleData[] = [
  {
    id: 26,
    title: "Public Wi-Fi Security: Deconstructing Evil Twins, Packet Sniffing, and Real-World Travel Defense",
    category: "Online Safety",
    difficulty: "Beginner",
    date: "August 28, 2026",
    readTime: "25 min read",
    excerpt: "A practical travel guide to public Wi-Fi, fake hotspots, unsafe sharing, VPN limits, and safer ways to work from airports, hotels, and cafes.",
    content: `## What Is Public Wi-Fi Safety?

Public Wi-Fi safety means using shared internet networks in a way that protects your accounts, device, and private information. The risk is not that every coffee-shop network is controlled by a criminal; the problem is that you cannot fully verify the network or everyone else using it. Good habits reduce what a stranger on the same network can learn or interfere with. This guide gives you a simple routine that works in airports, hotels, cafés, libraries, and other shared places.

## Start Here: Treat Public Wi-Fi as Shared Space

Public Wi-Fi is useful, but you should treat it like a crowded room. You do not know who else is connected, whether the network name is genuine, or how the hotspot is configured. Modern HTTPS protects much of your web traffic, but it does not make an unknown network trustworthy.

The safest mindset is simple: connect only when needed, share as little as possible, and use cellular data for highly sensitive work when practical.

## 1. What Can Go Wrong on a Public Network?

A public hotspot can expose your device to fake access points, local device scanning, malicious captive portals, and attempts to observe unencrypted traffic. A stranger may not need to break your bank's encryption to learn that your laptop is visible, running file sharing, or contacting a suspicious service.

### Everyday Travel Scenario

You arrive at an airport and see two networks: \`Airport_Free_WiFi\` and \`Airport_Free_WiFi_5G\`. Both have strong signals. One may be a legitimate network and the other may be a nearby rogue access point. If your device auto-joins saved networks, it may connect before you have checked anything.

Do not choose a network only because its name looks official. Ask staff for the exact name, and be suspicious of networks that request your email password, install a certificate, or download an update before allowing access.

## 2. Evil Twins and Fake Captive Portals

An evil twin is a rogue hotspot that copies the name of a real network. The attacker hopes users connect automatically or choose the stronger signal. Once connected, the attacker can control the local route and present a fake sign-in page.

A legitimate captive portal may ask you to accept terms or enter a room number. It should not ask for your Gmail, Microsoft 365, banking, or password-manager password. It should never require an executable file, browser extension, or security certificate to provide ordinary internet access.

### If a Portal Looks Suspicious

1. Close the page instead of signing in.
2. Disconnect from the network.
3. Use cellular data or ask staff for help.
4. If you entered a password, change it from the official service and revoke active sessions.
5. Report the fake network to the venue.

## 3. Local Device Exposure

Your laptop or phone may advertise its name, file-sharing services, Bluetooth presence, or available connection methods on the local network. This does not automatically mean you are hacked, but it gives nearby attackers more information and more possible targets.

Before joining a public network:

* Set the network profile to Public on Windows.
* Disable file, printer, screen, and remote-login sharing when not needed.
* Turn off AirDrop or set it to Contacts Only.
* Keep the firewall enabled.
* Do not accept unexpected connection requests.
* Install operating-system updates before travelling.

## 4. What a VPN Does and Does Not Do

A reputable VPN encrypts traffic between your device and the VPN server. This can reduce the risk of local observers reading DNS requests or unencrypted application traffic. A kill switch can stop traffic if the VPN tunnel drops.

A VPN does not make phishing websites safe, protect an infected laptop, or prove that a captive portal is legitimate. The VPN company can also see some connection metadata, so choose a provider carefully and understand its privacy policy.

For banking, administrator work, or a large financial transfer, cellular tethering is often the simpler choice. It removes the local public hotspot from the path entirely.

## 5. Safer Public Wi-Fi Routine

Use this routine every time:

1. Confirm the official network name with staff or a trusted notice.
2. Connect manually and disable auto-join for public networks.
3. Complete only the legitimate access step; never enter an unrelated account password.
4. Start your VPN before opening sensitive services.
5. Keep the browser in HTTPS-only mode and never bypass certificate warnings.
6. Disconnect and forget the network when finished.
7. Review important account alerts if the session involved work or finance.

## 6. Red Flags That Mean Stop

Stop using the network if:

* The name contains unusual spelling or extra words.
* The page asks for a personal or work password to unlock Wi-Fi.
* A pop-up asks you to install software or a certificate.
* Your browser shows a certificate or hostname warning.
* The connection repeatedly drops and reconnects to a different access point.
* A device-sharing prompt appears unexpectedly.

## 7. Keep the Device and Browser Ready Before You Travel

The best public Wi-Fi protection is prepared before the journey, not while you are tired at a gate or rushing into a meeting. Update the operating system, browser, password manager, and communication apps on a trusted network. Updates fix known weaknesses and reduce the chance that a nearby attacker can exploit an old bug.

### A Practical Travel Setup

Before leaving home, take ten minutes to do the following:

* Set a strong screen lock and make sure the device locks automatically after a short period.
* Save recovery codes for important accounts in a secure place that is not only on the device.
* Remove public Wi-Fi networks you no longer use and turn off automatic joining where your device allows it.
* Enable device tracking, remote lock, and remote wipe features if they are available.
* Keep a power bank or charging cable with you; do not depend on an unknown public USB charging port for sensitive work.

Also keep your browser habits simple. Type the address of your bank, email provider, or work portal yourself, or open it from a trusted bookmark. Do not start a financial session from a pop-up, advertisement, or link in an unexpected message. HTTPS and a padlock are important because they protect the connection to a site, but they do not prove that a lookalike site is honest.

## 8. Phones, Tablets, and Work Devices Need the Same Care

Phones are not automatically safe just because they use an app instead of a browser. A phone can still join a fake hotspot, accept a malicious profile, or reveal more information than you intend. Turn Bluetooth and personal hotspot sharing off when you do not need them, and review which apps have permission to use local-network access.

If you use a work laptop or phone, follow your organization's travel rules. A company may require its own VPN, device-management software, or a separate guest network. Those controls are there to protect both you and the organization. Never work around them by installing a random "Wi-Fi helper," browser certificate, or remote-access program suggested by a portal.

### When Cellular Data Is the Better Choice

Use your mobile data or a personal hotspot for work administration, banking, password-manager recovery, large financial transfers, and anything involving identity documents. Cellular data is not magic security, but it avoids the shared local Wi-Fi environment and is often easier to trust. Watch your data plan and roaming costs, then return to Wi-Fi only for lower-risk browsing or streaming when it makes sense.

## 9. If You Think You Used a Bad Network

Do not panic. Connecting to a suspicious network does not automatically mean an account was stolen. Start with calm, practical checks:

1. Disconnect and forget the network.
2. Run normal operating-system and security updates on a trusted connection.
3. Review recent sign-ins for email, work, and financial accounts; remove unfamiliar sessions.
4. Change a password only if you entered it into a suspicious page or see signs of misuse. Change it through the official site or app, not through a link in a warning email.
5. Tell your workplace if a company account or device may be affected, especially if you approved a new certificate or installed software.

The U.S. Cybersecurity and Infrastructure Security Agency also advises people to verify a public hotspot's name and login process with venue staff and to be careful about sensitive activity on public wireless networks. Its guidance is useful even if you are outside the United States because the underlying risks are the same. [CISA public Wi-Fi guidance](https://www.cisa.gov/sites/default/files/publications/Best%20Practices%20for%20Using%20Public%20WiFi.pdf) is a helpful reference.

## 10. The Simple Rule to Remember

Public Wi-Fi is fine for many ordinary tasks when you keep your device updated, use HTTPS, and avoid unnecessary sharing. The moment a network asks for a password unrelated to Wi-Fi access, requests software or a certificate, or gives you a browser security warning, stop. Convenience is never worth bypassing a warning you do not understand.

## Conclusion: Convenience With Boundaries

Public Wi-Fi is not automatically dangerous, but it is not a trusted home network. Use a public profile, disable sharing, keep software updated, prefer cellular data for high-value tasks, and treat every unexpected sign-in or download prompt as suspicious. These small habits make travel safer without requiring technical expertise.`
  },
  {
    id: 27,
    title: "The Mechanics of Social Engineering: Psychological Exploitation, Pretexting, and Human Defense",
    category: "Online Safety",
    difficulty: "Beginner",
    date: "August 29, 2026",
    readTime: "27 min read",
    excerpt: "A clear guide to authority, urgency, impersonation, fake support calls, and simple verification habits that stop social engineering attacks.",
    content: `## What Is Social Engineering?

Social engineering is a type of scam in which someone manipulates a person instead of breaking technical security directly. The attacker may pretend to be a bank employee, manager, delivery company, government official, family member, or technical-support agent. Their goal is usually to make you share information, approve a login, send money, or install something unsafe. This guide explains the pressure tactics in plain language and gives you a repeatable way to verify unexpected requests.

## Start Here: Social Engineering Attacks Decisions

Social engineering is the use of trust, pressure, fear, or helpfulness to make someone take an unsafe action. The attacker may want a password, MFA code, payment, remote-access session, document, or introduction to another person.

The victim is not foolish. The attack is designed to create a small window in which normal verification feels rude, slow, or unnecessary.

## 1. The Four Most Common Pressure Signals

### Authority
The message claims to come from a manager, bank, police officer, doctor, or technical support team. A real job title is not proof of identity.

### Urgency
The sender says you have minutes to act, your account will close, or a payment is already being processed. Urgency is used to stop you from checking.

### Fear or Reward
The attacker threatens arrest or account loss, or promises a prize, refund, investment return, or job opportunity.

### Familiarity
The attacker uses your name, workplace, family details, or recent activity gathered from social media. Personal details make a fake story feel real, but they do not authenticate the sender.

## 2. Real-World Scenarios

### Fake Bank Fraud Call
Someone calls and says, "Your account is under attack. Move your money to this safe account." Banks do not ask customers to protect money by sending it to another account. Hang up and call the number printed on your card or shown in the official app.

### Fake IT Helpdesk
A caller says your computer is infected and asks you to install AnyDesk or share a one-time code. Never allow remote access because of an unexpected call. Contact your real IT team through the normal directory.

### Executive Payment Request
An email appears to come from a manager and asks for gift cards or an urgent wire transfer. Verify the request using a known phone number or an in-person conversation. Do not reply to the same email thread.

### Family Emergency Message
A message from an unknown number says a relative lost their phone and needs money immediately. Call the relative using a saved number or contact another family member. Do not treat a familiar writing style as proof.

## 3. How Pretexting Works

A pretext is the story that makes a request seem normal. The attacker may research job titles, suppliers, travel plans, public posts, and software names before contacting the target.

That research does not prove the caller is genuine. It only proves that the attacker prepared. Keep sensitive workplace details, recovery information, travel plans, and identity documents out of public posts whenever possible.

## 4. The Pause-and-Verify Method

When a request involves money, passwords, MFA codes, remote access, or confidential information:

1. **Pause:** Do not act while feeling rushed or frightened.
2. **Separate:** Stop using the contact method that brought the request.
3. **Verify:** Use a saved phone number, official app, known colleague, or physical conversation.
4. **Limit:** Share the minimum information required, even after verification.
5. **Record:** Keep the message and report it if it may affect others.

A legitimate person may appreciate the verification. A scammer will usually try to stop it.

## 5. Helpdesk and Family Safety Rules

Organizations should require stronger checks before resetting passwords or registering a new MFA device. Security questions based on birthdays, pets, or schools are easy to research. Use an approved identity process, manager confirmation, and an auditable ticket.

Families can use a shared rule: nobody sends money, login codes, or identity documents during an unexpected call without a second-channel check. Create a private family phrase only for emergencies, but never rely on the phrase alone for financial decisions.

## 6. What to Do After a Mistake

If you clicked a link, shared a code, or sent money, act quickly:

* Contact the bank or payment provider using its official number.
* Change the exposed password from a clean device.
* Revoke active sessions, app permissions, and unknown MFA methods.
* Tell your workplace or close contacts if the account may be impersonated.
* Preserve messages, phone numbers, receipts, and URLs.
* Report the incident to the platform and the relevant fraud authority.

Reporting early is more useful than hiding the mistake. Attackers depend on victims staying silent.

## 7. A Name, Logo, or Voice Is Not Authentication

One of the most useful online-safety lessons is the difference between **recognition** and **verification**. Recognition means something looks familiar: a known name appears in an email, a caller knows your job title, or a voice sounds like a relative. Verification means you use a separate trusted route to prove who is making the request.

For example, an attacker may copy a manager's profile photo and email signature, or use a voice clip from social media to imitate a family member. Those details can make a story convincing, but they are not proof. If the request involves money, account access, private data, a login code, or remote control of a device, use a contact method you found independently. Open the organization's official app, call a saved number, or speak to the person through an established channel.

### Safe Questions to Ask

You do not need to accuse anyone. A calm response works well:

* “I will call the number in our directory and confirm this.”
* “Please create a ticket through the normal support portal.”
* “Our payment process requires a second approver.”
* “I cannot share a verification code. I will sign in through the official app.”

A legitimate organization should be able to handle this. Pressure, secrecy, and anger are signals to slow down, not reasons to comply.

## 8. Protect the Recovery Paths That Attackers Want

Attackers often do not need your main password if they can take over the email account or phone number used to reset it. Treat recovery methods as highly sensitive.

* Use a unique password and strong MFA on your primary email account.
* Keep recovery email addresses and phone numbers current, but do not publish them unnecessarily.
* Save recovery codes in a password manager or another secure offline location.
* Review account settings for unfamiliar forwarding rules, recovery contacts, connected apps, and MFA devices.
* Never read a one-time code to a caller or send it in a chat. It is intended for the sign-in you started yourself.

For workplaces, helpdesk staff should not reset passwords or add a new authentication device merely because a caller knows personal details. Use a documented identity-check process, record the request, and require extra approval for privileged accounts.

## 9. Build a Safer Workplace and Family Culture

Social engineering succeeds more often when people feel they will be punished for asking questions or reporting a mistake. A healthy security culture does the opposite: it makes verification normal and reporting quick.

### For Teams

Set written rules for payment changes, payroll requests, password resets, and urgent executive messages. A supplier changing bank details should be verified using a previously saved contact, not the email that announced the change. Large payments should need more than one approver. Staff should know exactly where to forward a suspicious email or report an unexpected MFA prompt.

### For Families

Agree in advance that nobody sends money or shares codes after an unexpected call or message without checking another way. A family phrase can be one extra signal during an emergency, but it is not strong enough on its own for a financial decision because it can be overheard or exposed. The safest move is still to call a saved number or another trusted family member.

## 10. Practice the Pause Instead of Memorizing Every Scam

Scams change their stories constantly: a fake delivery problem, an AI voice emergency, a job offer, a crypto investment, or an account-warning text. You cannot memorize them all. You can, however, practice the same response every time: pause, leave the original conversation, verify independently, and report it.

The U.S. Federal Trade Commission highlights that scammers often create urgency and demand hard-to-reverse payments such as wire transfers, gift cards, cryptocurrency, or certain payment-app transfers. Its advice is simple and widely useful: slow down and check a claim through a trusted route. [FTC scam guidance](https://consumer.ftc.gov/scams) offers current examples and reporting information.

## 11. A Five-Minute Reality Check

Before acting on an unexpected request, ask yourself:

1. Did this person contact me unexpectedly?
2. Are they asking for money, credentials, a code, private data, or remote access?
3. Are they creating urgency, secrecy, fear, or a reward?
4. Can I confirm the request using a contact detail I already trust?
5. Would I still do this if I waited ten minutes and asked someone else?

If any answer worries you, stop. A small delay is usually harmless; a rushed response can be expensive.

## Conclusion: Verification Is Professional, Not Rude

Social engineering works by making unsafe actions feel socially necessary. Slow the interaction down, verify through an independent channel, and never let authority or urgency replace proof. A calm verification habit is one of the strongest security controls available to any person.`
  },
  {
    id: 28,
    title: "Safe Online Shopping, Banking, and Financial Defense: Countering Card Skimmers, Clone Portals, and Payment Scams",
    category: "Online Safety",
    difficulty: "Beginner",
    date: "August 30, 2026",
    readTime: "25 min read",
    excerpt: "A practical guide to safer online shopping and banking, covering fake stores, card theft, payment scams, alerts, and what to do after fraud.",
    content: `## What Is Online Financial Safety?

Online financial safety means protecting the accounts, cards, payment methods, and personal information you use to shop, bank, send money, and manage bills. It is not about being afraid of every website; it is about making fraud harder and spotting it early when something goes wrong. Small habits—such as using a unique password, checking a seller independently, and enabling alerts—can prevent a minor mistake from becoming a serious loss. This guide focuses on practical actions that ordinary people can use every day.

## Start Here: Protect the Payment Process

Financial scams do not always look like technical attacks. A fake store, a stolen card number, a fake bank call, and a manipulated payment request can all produce the same result: money leaves your control.

Use several small protections instead of trusting a single warning. Separate shopping from banking, use strong account authentication, keep transaction alerts on, and make payments through methods that offer dispute protection.

## 1. Spotting a Fake Store

Before buying from an unfamiliar site, check:

* The exact domain spelling, not only the logo and page design.
* Whether the contact address and phone number can be independently verified.
* Whether the prices are realistic for the product.
* Whether the refund, shipping, and privacy pages look specific and consistent.
* Whether payment requires gift cards, cryptocurrency, wire transfer, or an unknown payment link.

HTTPS only encrypts the connection. It does not prove that the store is honest. A scam store can have a valid certificate.

### Scenario: The Sponsored Clearance Ad

You see a social-media ad for a new laptop at 80 percent off. The store has copied product photos and uses a domain created recently. Instead of clicking the ad, search for the official retailer manually, compare the price, and check whether the seller is listed as an authorized partner.

## 2. Safer Payment Choices

Use a credit card or a tokenized wallet for unfamiliar online purchases when possible. These options can reduce the effect of a merchant breach and usually offer stronger dispute processes than direct bank transfers.

Digital wallets replace your real card number with a token or virtual number. A virtual card with a spending limit can also reduce damage if a merchant account is compromised.

Never treat a payment request as safe merely because the sender knows your name or order number. Stolen order data can be used to make a scam sound convincing.

## 3. Protecting the Bank Account

Your email account is often the recovery key for your bank, so protect it first. Then:

1. Enable MFA on the bank and email account.
2. Prefer an authenticator app or security key when supported.
3. Turn on alerts for every card charge, transfer, login, and profile change.
4. Use a unique password stored in a password manager.
5. Keep banking on a personal, updated device.
6. Review linked devices, payees, and connected applications regularly.

Do not share an MFA code with a caller. A code is proof of your control and should be entered only into the official app or website you opened yourself.

## 4. Recognizing Payment Scams

### The Safe Account Scam
A caller claims to be from fraud support and tells you to move money to protect it. There is no safe account controlled by a bank for this purpose. End the call and contact the bank yourself.

### The Marketplace Buyer Scam
A buyer sends a fake payment confirmation and asks you to ship an item or refund an overpayment. Check the payment inside your own banking app. Screenshots and emails are not proof.

### The Refund Scam
A fake support agent says they accidentally refunded too much and asks you to send the difference. Do not allow remote access or send money. Contact the company through its official site.

## 5. If Your Card or Account Is Compromised

Act in this order:

1. Freeze the card or account in the official app if available.
2. Call the bank using the number on the card or official website.
3. Ask whether replacement card numbers, payees, tokens, or transfers must be cancelled.
4. Change the password and revoke unknown sessions.
5. Check recent transactions and save evidence.
6. Report identity theft if personal information was exposed.

Do not wait for the monthly statement. Real-time alerts make early action possible.

## 6. A Five-Minute Purchase Check

Before pressing Pay, ask:

* Did I type the website myself or follow an unexpected link?
* Is the seller independently verifiable?
* Am I using a payment method with dispute protection?
* Is the price realistic?
* Is anyone pressuring me to pay immediately or privately?

If one answer feels wrong, stop and investigate. Missing a discount is cheaper than recovering from fraud.

## 7. Separate Shopping, Banking, and Account Recovery

Your primary email account is often the key to password resets, order confirmations, and bank alerts. Protect it as carefully as the bank account itself. Use a unique password, enable MFA, review recovery options, and remove unfamiliar devices or app permissions. If someone controls your email, they may be able to reset other accounts without touching your card directly.

It also helps to separate high-risk activity from everyday browsing. Use a personal, updated device for banking. Avoid signing in to financial accounts from a link in an email or text, especially when the message claims there is a problem. Instead, open the official bank app or type a saved address yourself. Keep shopping accounts secure too: a retailer account with saved cards, addresses, and order history can be valuable to a criminal.

### Review These Settings Every Few Months

* Saved cards, delivery addresses, and payment methods on shopping sites.
* Connected devices and active sessions on email and banking accounts.
* Automatic transfers, new payees, and recurring subscriptions.
* Recovery email addresses, phone numbers, and MFA methods.
* Transaction alerts for card purchases, transfers, withdrawals, and profile changes.

This review is not about distrust. It is ordinary account maintenance, like checking a statement or changing a smoke-detector battery.

## 8. Understand How Payment Method Changes Your Risk

Different payment methods have different recovery options, and rules vary by country and provider. Before paying an unfamiliar seller, consider how easy it would be to dispute the payment if the product never arrives.

Credit cards and well-known payment services commonly provide a dispute process, while bank transfers, cash-like payment apps, gift cards, and cryptocurrency can be much harder to reverse once sent. That does not mean every transfer is fraudulent; it means you should reserve irreversible payments for people and businesses you have independently verified.

### A Realistic Purchase Example

You find a camera on an unfamiliar website at a very low price. The site only accepts a bank transfer or cryptocurrency and says the offer expires in fifteen minutes. Several warning signs appear together: an unrealistic price, urgency, and a payment method with little practical recovery. The safe choice is to stop, search for independent reviews and complaints, and buy from a known retailer or use a payment method that offers a clear dispute route.

## 9. Respond Fast to an Unrecognized Transaction

Do not wait until a monthly statement arrives. If an alert shows a charge, withdrawal, or transfer you did not authorize, open the official bank or card app and check the details. Freeze the card if the app offers that option, then contact the provider using the number on the card or the official website. Ask what must be replaced or secured: the card number, online-banking password, active sessions, payees, digital-wallet token, or account number.

Write down the date, amount, merchant or recipient, and the case number given by the provider. Keep screenshots and emails, but do not send sensitive account details to a stranger who claims to be helping. The Consumer Financial Protection Bureau advises notifying a financial institution promptly about unauthorized activity; early reporting gives the provider the best chance to investigate and limit further loss. [CFPB guidance on unauthorized transactions](https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-my-money-back-after-i-discover-an-unauthorized-transaction-or-money-missing-from-my-bank-account-en-1017/) explains the process for U.S. consumers.

## 10. Make a Personal Fraud-Response Plan Before You Need It

Save official support numbers in your phone and keep a short list of the accounts that would need immediate attention: primary email, bank, card issuer, mobile carrier, password manager, and workplace account if relevant. Tell a trusted person where this list is stored in case a phone is lost.

When something feels wrong, follow this order: stop the payment if possible, secure the account through the official channel, preserve evidence, notify the provider, and then report the scam to the relevant platform or local authority. Avoid trying to negotiate with a scammer or recover money through an unknown "recovery service." People who promise to retrieve funds for an upfront fee may be running another scam.

## 11. A Calm Habit That Prevents Expensive Mistakes

Most financial scams need you to act before you think. Make it a personal rule that unexpected payment instructions always get a second look. Take a break, open the official app yourself, ask a trusted person, and verify the recipient using a known contact. Good online financial safety is not about never making mistakes; it is about limiting the damage and responding quickly when a mistake happens.

## Conclusion: Make Fraud Expensive and Detectable

Safe online banking is not about recognizing every scam perfectly. It is about using account alerts, strong authentication, protected payment methods, independent verification, and fast response. These controls ensure that one fake store or stolen card does not become a long-term financial disaster.`
  }
];
