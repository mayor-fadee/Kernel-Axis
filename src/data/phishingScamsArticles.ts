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
    content: `## Start Here: MFA Is Strong, but the Method Matters

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
    content: `## Start Here: BEC Attacks Business Processes

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
    content: `## Start Here: Phishing Has Moved Beyond Email

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

## Conclusion: A Familiar Voice Is Not Authentication

QR codes, texts, voices, and video can all be forged. Trust the process, not the appearance. Stop, open the official app yourself, call a known number, and require a second person for sensitive actions. These habits remain effective even when the scam sounds or looks convincing.`
  }
];
