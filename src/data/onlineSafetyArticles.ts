import { ArticleData } from './cybersecurityBasicsArticles';

export const onlineSafetyArticles: ArticleData[] = [
  {
    id: 26,
    title: "Public Wi-Fi Security: Deconstructing Evil Twins, Packet Sniffing, and Real-World Travel Defense",
    category: "Online Safety",
    difficulty: "Beginner",
    date: "August 28, 2026",
    readTime: "22 min read",
    excerpt: "A practical travel guide to public Wi-Fi, fake hotspots, unsafe sharing, VPN limits, and safer ways to work from airports, hotels, and cafes.",
    content: `## Start Here: Treat Public Wi-Fi as Shared Space

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

## Conclusion: Convenience With Boundaries

Public Wi-Fi is not automatically dangerous, but it is not a trusted home network. Use a public profile, disable sharing, keep software updated, prefer cellular data for high-value tasks, and treat every unexpected sign-in or download prompt as suspicious. These small habits make travel safer without requiring technical expertise.`
  },
  {
    id: 27,
    title: "The Mechanics of Social Engineering: Psychological Exploitation, Pretexting, and Human Defense",
    category: "Online Safety",
    difficulty: "Beginner",
    date: "August 29, 2026",
    readTime: "24 min read",
    excerpt: "A clear guide to authority, urgency, impersonation, fake support calls, and simple verification habits that stop social engineering attacks.",
    content: `## Start Here: Social Engineering Attacks Decisions

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

## Conclusion: Verification Is Professional, Not Rude

Social engineering works by making unsafe actions feel socially necessary. Slow the interaction down, verify through an independent channel, and never let authority or urgency replace proof. A calm verification habit is one of the strongest security controls available to any person.`
  },
  {
    id: 28,
    title: "Safe Online Shopping, Banking, and Financial Defense: Countering Card Skimmers, Clone Portals, and Payment Scams",
    category: "Online Safety",
    difficulty: "Beginner",
    date: "August 30, 2026",
    readTime: "21 min read",
    excerpt: "A practical guide to safer online shopping and banking, covering fake stores, card theft, payment scams, alerts, and what to do after fraud.",
    content: `## Start Here: Protect the Payment Process

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

## Conclusion: Make Fraud Expensive and Detectable

Safe online banking is not about recognizing every scam perfectly. It is about using account alerts, strong authentication, protected payment methods, independent verification, and fast response. These controls ensure that one fake store or stolen card does not become a long-term financial disaster.`
  }
];
