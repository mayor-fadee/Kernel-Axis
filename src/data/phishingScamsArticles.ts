import { ArticleData } from './cybersecurityBasicsArticles';

export const phishingScamsArticles: ArticleData[] = [
  {
    id: 32,
    title: "Adversary-in-the-Middle (AiTM) Phishing: How Reverse Proxies Bypass MFA and Hijack Session Cookies",
    category: "Phishing & Scams",
    difficulty: "Intermediate",
    date: "September 4, 2026",
    readTime: "24 min read",
    excerpt: "A practical explanation of modern phishing proxies, session-cookie theft, why copy-and-paste MFA can be phished, and how passkeys reduce the risk.",
    content: `## What Is AiTM Phishing?

AiTM phishing is a more convincing kind of fake login scam. Instead of simply collecting a password, the attacker places a fake website between you and the real service, then relays the sign-in in real time. That can let them capture an already authenticated session even when you enter an MFA code or approve a prompt. The good news is that a few habits—especially passkeys, careful sign-in routes, and fast reporting—make this attack much harder to succeed.

## Start Here: MFA Is Strong, but the Method Matters

Multi-factor authentication is still one of the best protections for an account. The problem is that some MFA methods use a code or approval that a person can be tricked into entering on a fake site.

In an Adversary-in-the-Middle attack, the fake site sits between the victim and the real login service. It shows a convincing login page, forwards the victim's information to the real service, and relays the real MFA prompt. The victim may successfully sign in while the attacker captures the authenticated browser session.

## 1. How the Attack Looks to a Victim

1. The victim receives a fake document, voicemail, or account-warning message.
2. The link opens a lookalike sign-in page.
3. The victim enters the real username and password.
4. The real provider asks for a code or push approval.
5. The victim completes MFA on the fake page.
6. The attacker reuses the captured session while it is still valid.

The victim may be sent to the real inbox afterward, so there may be no obvious sign that anything happened.

### Real-World Scenario

An employee receives a message saying a shared document will expire today. The link uses a domain that contains the company name but does not end with the company's real domain. The login page looks perfect, and the MFA prompt appears genuine. After sign-in, the attacker creates an email-forwarding rule and searches for invoices.

## 2. Why Codes and Push Approvals Can Be Relayed

SMS codes, email codes, TOTP codes, and push approvals are separate factors, but many are still readable or confirmable by a human. A live proxy can ask the victim for the code and submit it to the real service before it expires.

Push fatigue creates another risk. If a user receives repeated prompts, they may approve one simply to stop the notifications. Never approve a login you did not start. Report repeated prompts as a possible attack.

## 3. Stronger Protection: Passkeys and Security Keys

Passkeys and FIDO2 security keys bind authentication to the real website origin. A key registered for a legitimate service will not create a valid login response for a lookalike phishing domain.

For important accounts:

* Prefer passkeys or hardware security keys.
* Keep two registered keys, stored separately.
* Use device-compliance policies for work accounts.
* Keep sessions short enough to limit stolen-cookie value.
* Require fresh authentication for exports, payment changes, and administration.

A passkey does not replace safe browsing, but it removes a major class of copy-and-paste phishing attacks.

## 4. What Defenders Should Monitor

Security teams should look for:

* New sign-ins from unusual locations or devices.
* A successful login followed by rapid mailbox-rule creation.
* New forwarding addresses, OAuth grants, or app passwords.
* Session use from a device that does not meet company policy.
* MFA prompts that the user denies or reports as unexpected.

If compromise is suspected, revoke sessions and tokens, reset the password from a trusted device, remove forwarding rules, review mailbox access, and search for suspicious activity.

## 5. A Safer Sign-In Routine

Before entering credentials:

1. Check the full domain in the address bar.
2. Avoid sign-in links from unexpected messages.
3. Open the service using a bookmark or typed address.
4. Never approve an unsolicited MFA prompt.
5. Use a password manager: it usually refuses to fill on the wrong domain.
6. Report suspicious messages instead of simply deleting them.

## 6. Signs That an Account May Already Be Misused

Many people expect a compromised account to show a dramatic warning. In reality, the first clue may be small: a colleague receives an odd message from you, a password-reset email arrives after you did nothing, or a rule appears in your mailbox. Check account activity from the official security page if anything feels unusual.

Look for new forwarding addresses, deleted security emails, unfamiliar recovery methods, connected apps, unknown devices, or sent messages you did not write. In a work account, also check shared-file activity, new permissions, and changes to payment or vendor conversations. Do not simply change the password and assume the problem is over; active sessions and app permissions may remain valid until they are revoked.

### A Safe Response Sequence

1. Use a known clean device and open the real service yourself.
2. Change the password if you entered it on a suspicious page.
3. Revoke all active sessions, refresh tokens, and unknown app connections.
4. Remove forwarding rules and unfamiliar MFA or recovery settings.
5. Tell your employer or security contact if a work account is involved.
6. Warn close contacts only after securing the account, so they do not trust a message sent by an attacker.

## 7. Why Passkeys Make a Real Difference

Passkeys use public-key cryptography and are tied to the real website address. A fake site can copy a logo, a form, and even the timing of an MFA prompt, but it cannot make your passkey sign in to the wrong domain. This is why CISA recommends phishing-resistant authentication such as FIDO/WebAuthn, especially for email, remote access, administrator accounts, and people who handle sensitive data.

If a service offers passkeys, try them first on an important personal account. Keep a recovery method and, for high-value accounts, a second security key in a separate safe place. If passkeys are not available, MFA is still much better than a password alone. Use number matching for push prompts when available, and never approve a prompt that you did not initiate.

## 8. A Short Workplace Drill

Teams can practise this safely without sending real credentials anywhere. Share a harmless example of a fake document request and ask staff to identify the independent action they would take: open the real work portal from a bookmark, report the message, and check the full domain. Then make sure the reporting route is easy and that the first response is supportive. Training only works when people feel safe reporting a near miss.

## 9. The Principle to Remember

An MFA prompt proves only that somebody is trying to use an account. It does not prove that the person approving it started the login on the right website. Treat every unexpected prompt as a warning. Open services yourself, use a password manager to recognize the correct domain, and choose phishing-resistant MFA where you can.

## 10. Reduce the Value of a Stolen Session

No control is perfect, so important accounts should limit what a newly signed-in session can do. A bank may ask for fresh authentication before adding a payee; a workplace can require it before exporting data, changing a password, or registering a new MFA device. These extra checks can stop a stolen session from immediately becoming a full account takeover.

For personal accounts, review recovery email addresses, phone numbers, and connected apps a few times a year. For work accounts, use separate administrator accounts for administration and avoid checking sensitive email or dashboards from an everyday browsing session. These habits limit the damage if a session is ever captured.

### Questions Worth Asking After a Suspicious Sign-In

* Was a new device or location added to the account?
* Did the account create forwarding rules, app passwords, or OAuth access?
* Were passwords, recovery details, or MFA methods changed?
* Did the account access documents or conversations outside normal work?
* Have all active sessions been revoked, not just the password changed?

Writing down the answers makes it easier to see whether the event was a failed phishing attempt or a real compromise that needs further support.

### Keep the Browser on Your Side

Use a password manager that matches credentials to the exact website address, keep browser security updates automatic, and do not disable warnings just to reach a page. If a work service supports single sign-on, use the normal company portal instead of signing in through a document link. These choices reduce the number of places where a fake login page can appear.

When in doubt, take a screenshot of the warning and ask a trusted support person before continuing. A few minutes of verification is cheaper than explaining an account takeover later.

Also remember that a real service will not punish you for opening its app yourself. If an email says you must use its button immediately, that urgency belongs to the sender—not to you. Close the message, find the official route, and continue only after the account page confirms that action is needed.

## Conclusion: Upgrade the Authentication Path

MFA remains valuable, but phishing-resistant MFA is the better target for important accounts. Combine passkeys, domain awareness, password-manager protection, session monitoring, and fast token revocation. The goal is to make a stolen password and a fake login page insufficient for account takeover.`
  },
  {
    id: 33,
    title: "Business Email Compromise (BEC): Anatomy of Multi-Million Dollar Executive Impersonation and Wire Fraud",
    category: "Phishing & Scams",
    difficulty: "Beginner",
    date: "September 5, 2026",
    readTime: "23 min read",
    excerpt: "A practical guide to executive impersonation, vendor invoice fraud, mailbox rules, and payment verification controls that stop expensive mistakes.",
    content: `## What Is Business Email Compromise?

Business Email Compromise, often called BEC, is a payment scam that abuses trust in ordinary business communication. The criminal may impersonate an executive, supplier, lawyer, or employee, or take over a real email inbox and wait for the right moment. Their aim is usually to redirect a payment, change salary details, or obtain valuable information. It is prevented less by clever email reading and more by a reliable verification process that nobody is allowed to bypass.

## Start Here: BEC Attacks Business Processes

Business Email Compromise does not need malware. The attacker may impersonate an executive, compromise a vendor mailbox, or quietly join an existing invoice conversation. The goal is to make a normal payment process send money to the wrong account.

The most important rule is simple: **never change payment details based only on an email.**

## 1. Common BEC Scenarios

### Executive Impersonation
A message appears to come from a director and asks an employee to buy gift cards, send a wire, or keep the request confidential.

### Vendor Bank-Detail Change
A real supplier's mailbox is compromised. The attacker waits for an expected invoice and sends updated bank details in the same email thread.

### Payroll Redirection
Someone impersonates an employee and asks payroll to change the destination account for their salary.

### Lawyer or Executive Urgency
The attacker claims the payment supports a confidential acquisition, legal settlement, or emergency supplier issue. Confidentiality is used to bypass normal approval.

## 2. Why These Messages Look Genuine

A compromised mailbox can pass SPF, DKIM, and DMARC because the message came from the real provider. The email may contain real project names, invoice numbers, signatures, and previous conversation history.

Email security filters are useful, but they cannot decide whether a legitimate person really requested a bank change. Human verification and dual approval are required for that decision.

## 3. The Payment Verification Rule

Whenever a request changes a bank account, payee, amount, or payment timing:

1. Stop the transaction.
2. Open the vendor record in the internal system.
3. Call a known contact using the number already on file.
4. Never use the phone number in the new email or invoice.
5. Confirm the old and new details verbally.
6. Require a second authorized person to approve the change.
7. Record the verification and keep the original request.

For a high-value payment, use a second independent channel and a waiting period. Speed is not a valid reason to skip financial controls.

## 4. Mailbox Warning Signs

A compromised mailbox may contain:

* New forwarding rules to an external address.
* Filters that hide messages containing invoice, payment, or wire.
* Unexpected sent messages or deleted replies.
* New login locations, devices, app passwords, or OAuth connections.
* Conversations that suddenly request secrecy or unusual payment methods.

Organizations should alert administrators when external forwarding rules, new MFA methods, or high-risk inbox changes are created.

## 5. If Money Was Sent

Contact the sending bank's fraud department immediately and ask for a wire recall or payment freeze. Notify the receiving bank through official fraud channels, preserve emails and payment records, secure the compromised account, and report the incident to the appropriate law-enforcement or cybercrime service.

Do not wait for a monthly statement. Minutes and hours matter because criminals may move funds through several accounts quickly.

## 6. A Small-Team BEC Policy

Even a small company can use clear controls:

* No email-only bank-detail changes.
* Two people approve every unusual or high-value payment.
* Vendor phone numbers come from a maintained master record.
* Finance staff can challenge an executive request without penalty.
* External forwarding is blocked unless formally approved.
* Staff practise one harmless invoice-verification exercise each year.

## 7. A Payment Process That Is Hard to Trick

The safest payment process separates a request from approval. An email can tell finance that a supplier wants a change, but it must not be the evidence used to approve the change. Keep verified supplier contact details in a controlled internal record. When details change, a finance worker calls a known contact from that record, documents the answer, and a second authorized person reviews the change before the next payment.

This may feel slow for a small company, but it is usually quicker than recovering a fraudulent transfer. The process should apply to every vendor, even long-standing ones. A real supplier's inbox can be compromised, which means a familiar email thread is not proof that new bank details are genuine.

### Practical Example

An accounts-payable employee receives an invoice from a regular supplier. The thread looks genuine and the attachment contains the expected project number, but the payment account has changed. The employee does not reply to the email. They open the supplier record, call the saved number, and ask for the finance contact by name. The supplier confirms that no change was requested. The employee alerts the team, and the fraudulent payment never starts.

## 8. Protect More Than Wire Transfers

BEC can also target payroll, gift cards, invoices, customer data, shipping addresses, and purchase orders. A request to change an employee's salary account should be verified through the employee portal or a known HR process. A request for gift cards, cryptocurrency, or secrecy should be treated as suspicious even if it appears to come from the chief executive. The same principle applies: use an independent channel and a second person for anything that moves money or sensitive data.

## 9. What to Do in the First Hour

If a payment was sent, call the sending bank's official fraud number immediately. Ask whether the transfer can be recalled, frozen, or traced, and follow the bank's instructions. Preserve the original messages, payment records, recipient details, and timestamps. Secure any email account involved by changing its password from a trusted device, revoking sessions, removing mailbox rules, and reviewing delegated access.

Notify internal leaders early. Do not worry about embarrassment or blame in the first hour; quick, accurate information gives the organization its best chance to limit loss. In the United States, the FBI's IC3 specifically advises organizations to contact the originating financial institution as soon as fraud is recognized. Similar urgent-reporting channels exist in many countries.

## 10. Make Verification Normal

The best BEC control is cultural. Finance staff must be allowed to challenge an executive, pause an urgent request, and follow the same process every time. Leaders should actively say that a delayed payment is acceptable when verification is needed. A scammer relies on authority and secrecy; a calm, documented callback removes both advantages.

## 11. Keep Supplier Records Clean

Many payment scams become easier because supplier information is scattered across old emails, spreadsheets, and personal contacts. Keep one maintained source of verified vendor names, addresses, bank details, and callback numbers. Limit who can edit it, record when a change was verified, and make sure the person approving a payment can see that history.

When a legitimate supplier updates details, use the same careful process every time. Confirm the request with a contact you already know, then have another authorized person review the update. Never copy a phone number from an invoice or email into the verification process. This sounds basic, but independent contact details are what break the scammer's control of the conversation.

### A Good Question for Every Unusual Request

Ask: “What evidence would I need if this request had arrived from a stranger?” Then apply that same standard even when it appears to come from a senior executive or trusted supplier. A real colleague may be busy, but they will understand why financial controls exist. A criminal will often become more urgent, secretive, or hostile when asked to wait.

## 12. Practise Before a Real Payment Is at Risk

Once or twice a year, run a short tabletop exercise. Give the team a harmless sample invoice that contains changed bank details, then walk through the callback and approval steps. Note where people are unsure, where contact records are missing, and how long it takes to reach the bank if a payment is suspected to be fraudulent. Practising the process makes it much easier to use calmly under pressure.

### Do Not Let a Scam Become a Second Scam

After a BEC incident, someone may contact the organization claiming they can recover the money for an upfront fee. Treat unexpected recovery offers with the same caution as the original request. Use the bank, police, insurer, legal counsel, or an established incident-response provider found through a trusted source. Preserve evidence before deleting accounts or messages, and keep a clear timeline of what was requested, approved, and paid.

Keep the incident facts private while the response is underway, but do not keep the incident secret from the people responsible for banking, security, and legal reporting. Clear internal communication prevents duplicate payments and helps everyone challenge related requests.

Keep a written record of the callback name, time, number used, approver, and final decision. That record improves follow-up and makes the next verification faster without weakening the control.

## Conclusion: Verify the Money Path

BEC succeeds when a believable message is treated as authorization. Email can start a payment conversation, but it should never be the only proof. Independent callbacks, dual approval, mailbox monitoring, and fast bank contact turn a convincing scam into a blocked request.`
  },
  {
    id: 34,
    title: "Quishing, Smishing, and Deepfake Vishing: The New Frontiers of Multi-Vector Social Engineering",
    category: "Phishing & Scams",
    difficulty: "Intermediate",
    date: "September 6, 2026",
    readTime: "25 min read",
    excerpt: "An easy, practical guide to QR scams, fake text messages, AI voice impersonation, and verification habits for phones, families, and workplaces.",
    content: `## What Are Quishing, Smishing, and Vishing?

Quishing, smishing, and vishing are phishing scams delivered through QR codes, text messages, and phone or video calls. They work because phones feel personal and quick: people scan a code, tap a message, or trust a familiar voice before they have time to inspect it. The scammer still wants the same things—a password, a code, a payment, or remote access. This guide gives you simple checks that work even when the message, QR code, voice, or video looks convincing.

## Start Here: Phishing Has Moved Beyond Email

Scammers now use QR codes, text messages, phone calls, and fake video meetings because people trust familiar mobile channels. The channel is different, but the goal is the same: make you click, pay, reveal a code, or install something before you verify.

## 1. Quishing: QR-Code Phishing

A QR code hides the destination until your phone scans it. That makes it harder to inspect than an ordinary text link.

### Common Examples

* A sticker placed over a genuine parking-meter QR code.
* An email asking staff to scan a code to re-register MFA.
* A restaurant or delivery code that opens a fake payment page.
* A poster promising a prize or urgent account verification.

After scanning, read the full domain before opening it. Do not sign in through a QR code from an unexpected email. Open the official app or type the service address yourself.

## 2. Smishing: Fake Text Messages

Smishing uses SMS or messaging apps to exploit speed and attention. Common messages claim that a parcel is waiting, a toll is unpaid, a bank card is blocked, or an account needs verification.

### The Safe Response

1. Do not click the link or reply.
2. Open the official app or website independently.
3. Check the account there.
4. Report the message as spam and block it.
5. Forward suspicious SMS messages to your carrier's spam-reporting service where available.

A message appearing in the same conversation as a real bank alert is not proof that it came from the bank. Sender IDs and message threads can be spoofed or manipulated.

## 3. Deepfake Vishing: Fake Voices and Video

AI can imitate a voice using public recordings. A caller may sound like a manager, child, parent, or bank employee and create an emergency that demands immediate payment.

### Family Scenario

A caller says your child was in an accident and needs money for a lawyer. The voice sounds correct, but the request is urgent and the phone number is unfamiliar. End the call and contact your child using a saved number. Ask another family member to verify the situation.

### Workplace Scenario

A finance employee joins a video call where the CFO and colleagues appear to request a confidential transfer. Live video is not proof of identity. Use an approved callback, a second approval, and a payment process outside the meeting.

## 4. Verification Rules That Survive AI

* Create a private family phrase, but never send it through the same suspicious channel.
* Use known phone numbers, not numbers supplied by the caller.
* Require two people to approve money movement.
* Do not share MFA codes, remote access, or identity documents on an unexpected call.
* Treat secrecy and urgency as reasons to slow down.
* If the person objects to verification, end the interaction.

## 5. What To Do After You Click or Pay

Close the page, disconnect remote access, and contact the bank or affected service through its official channel. Change exposed passwords, revoke sessions, check transactions, and preserve the message, QR image, phone number, URL, and receipt.

If a work account is involved, tell the security team immediately. Early reporting can protect colleagues who received the same message.

## 6. A Simple Mobile Safety Checklist

* Phone software and apps are updated.
* Screen lock and device-finding features are enabled.
* Banking alerts and MFA are active.
* QR destinations are inspected before opening.
* Unexpected texts and calls are verified independently.
* Family and workplace payment rules are written down.

## 7. QR Codes: Useful, but Not Self-Authenticating

A QR code is only a shortcut to a destination. It does not prove that the destination is safe. A scammer can place a sticker over a genuine parking-meter code, send a QR code in a fake account-warning email, or print a code on a poster that promises a prize. Before opening a scanned link, read the address your phone shows. Look for misspellings, unexpected extra words, and domains that do not belong to the organization.

If you need to pay for parking, manage a delivery, or sign in to an account, prefer the official app or a web address you type yourself. The U.S. Federal Trade Commission gives the same practical advice: do not scan unexpected QR codes that create urgency, and inspect the destination before opening it. A QR code is never a reason to enter a password quickly.

## 8. Text Messages Need Independent Verification

Text messages are effective because they interrupt people while they are busy. A message might say that a package is delayed, a toll is unpaid, a bank card is blocked, or an account will close today. The safest response is not to reply or tap the link. Open the delivery, bank, or government service through its official app or a trusted bookmark and check there.

Do not assume a familiar message thread is authentic. Sender names and threads can be manipulated, and a scammer may copy the style of a real alert. If a text asks for a code, card number, identity document, payment, or remote-access app, treat it as a stop sign.

## 9. Deepfakes Change the Evidence, Not the Rule

AI voice and video tools can make impersonation more believable, but they do not defeat a good process. A voice that sounds like a family member is not proof of identity. A video call that looks like an executive is not approval for a payment. Hang up or leave the call, use a saved number or established workplace channel, and verify the request with another trusted person.

Families can agree that urgent money requests always require a second call. Workplaces can require two people to approve payments and use a known callback for vendor changes. A family phrase may be a useful extra check, but it should not replace a separate verification channel.

## 10. If You Shared Information or Installed an App

Act quickly but calmly. If you entered a password, change it through the official service and revoke active sessions. If you gave a bank card detail or made a payment, call the provider using the number on the card or official app. If you installed remote-access software, disconnect the device from the internet and contact trusted support; do not let the original caller "fix" the problem.

Save the message, screenshot, QR code, URL, phone number, and payment receipt. These details help a bank, platform, employer, or fraud-reporting service understand what happened. Reporting early can also protect people who receive the same campaign.

## 11. One Habit for Every Channel

When a message, code, call, or video demands urgency, pause. Leave the channel that brought the request, open the official service yourself, and verify through a contact detail you already trust. This habit is more reliable than trying to recognize every new scam.

## 12. Make Mobile Checks Part of Daily Life

Mobile scams work when a small screen and a busy moment hide the warning signs. Turn on automatic updates, use a screen lock, and keep account alerts enabled. When a link arrives in a text, read it slowly rather than tapping from the notification. When a QR code appears in public, check whether it looks like a sticker placed over another code and read the destination before opening it.

You can also reduce risk by limiting what a phone displays when locked. Hide message previews and one-time codes on the lock screen, especially if other people can see the device. Do not use an unexpected QR code to install an app, configuration profile, certificate, or browser extension. Official services can be reached through their normal app stores and websites.

### A Safe Family Conversation

Talk through one simple rule with family members: no urgent money, code, or remote-access request is handled during the first call or message. Everyone gets permission to hang up and call back. This is especially useful for children, older relatives, and anyone who might feel pressured by an apparent emergency. The rule is not distrust; it is a way of protecting each other.

## 13. Report, Block, and Move On

After verifying that a message is fraudulent, report it in the messaging or email app, block the sender, and delete it. If it involved a workplace, send the report to the security contact rather than forwarding the active link to colleagues. If it involved money or identity details, contact the relevant provider first and then use your local fraud-reporting channel. Reporting can help providers recognize a campaign and warn other people.

## Conclusion: A Familiar Voice Is Not Authentication

QR codes, texts, voices, and video can all be forged. Trust the process, not the appearance. Stop, open the official app yourself, call a known number, and require a second person for sensitive actions. These habits remain effective even when the scam sounds or looks convincing.`
  }
];
