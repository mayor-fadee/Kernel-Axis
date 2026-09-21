import { ArticleData } from './cybersecurityBasicsArticles';

export const networkSecurityArticles: ArticleData[] = [
  {
    id: 39,
    title: "Zero Trust Network Architecture (ZTNA): Deconstructing BeyondCorp, Microsegmentation, and Identity-Aware Proxies",
    category: "Network Security",
    difficulty: "Advanced",
    date: "September 11, 2026",
    readTime: "25 min read",
    excerpt: "A practical guide to Zero Trust networking, application-specific access, device checks, microsegmentation, and reducing lateral movement.",
    content: `## Start Here: Network Location Is Not Identity

Traditional networks trusted devices because they were inside the office or connected through a VPN. Zero Trust removes that assumption. Every request is checked using the user, device, application, action, and current risk.

The goal is not to make work difficult. The goal is to give a person access to the exact application they need instead of a broad route to an entire internal network.

## 1. The Flat-Network Problem

If a stolen laptop can reach file servers, databases, administrator panels, and other workstations, one compromised device can become a large incident. A VPN password may be valid while the laptop itself is unmanaged or infected.

### Real-World Scenario

A contractor's password is stolen through phishing. In a flat network, the contractor can scan internal systems after connecting to the VPN. In a Zero Trust design, the contractor can reach one approved project portal, from an approved device, for a limited time. The stolen password has much less value.

## 2. What an Access Decision Checks

A policy engine may evaluate:

* User identity and group membership.
* Phishing-resistant MFA result.
* Device encryption, patch level, and endpoint protection.
* Location, network reputation, and time of request.
* Application sensitivity and requested action.
* Unusual behavior compared with the user's normal pattern.

The result can be allow, deny, or step-up authentication. Reading a dashboard may be allowed while exporting its data requires a fresh MFA check and approval.

## 3. Application Access Instead of Broad VPN Access

An identity-aware proxy hides the internal network and publishes a specific application. The user connects to the application, not directly to a private subnet. This reduces discovery and lateral movement.

A full VPN may still be necessary for legacy systems, but keep it narrow:

* Restrict routes to the required service.
* Require managed devices and strong MFA.
* Log administrative sessions.
* Use expiry times for contractors.
* Replace broad access with application proxies over time.

## 4. Microsegmentation in Practice

Divide user devices, public services, internal applications, databases, management systems, and backups into separate policy zones. Permit only required connections.

For example:

1. A public web service can reach the application service.
2. The application service can reach one database port.
3. Only administrators from a management network can reach server consoles.
4. Production systems cannot delete backup snapshots.
5. Guest devices cannot reach internal services.

Test these rules from real devices. A network diagram is not evidence that segmentation works.

## 5. Continuous Session Evaluation

A session should be re-evaluated when a device becomes non-compliant, a token appears on a new device, a user changes location unusually quickly, or a sensitive action is attempted. Revoke the session, require stronger authentication, or isolate the device when risk increases.

## 6. A Staged Rollout

1. Inventory users, devices, applications, service accounts, and data flows.
2. Protect identity with MFA, separate admin accounts, and stale-account cleanup.
3. Put one high-value application behind an identity-aware proxy.
4. Require device encryption, updates, and endpoint protection.
5. Reduce subnet access and add microsegmentation rules.
6. Centralize allow, deny, privilege, and export logs.
7. Test revocation, recovery, and emergency access.

## Conclusion: Make Access Specific

Zero Trust is a practical shift from broad network trust to explicit decisions. Verify the identity, check the device, limit the resource, reduce privilege, monitor the session, and revoke access quickly when conditions change.`
  },
  {
    id: 40,
    title: "BGP Hijacking and DNS Spoofing: Exploiting the Vulnerable Core Routing Protocols of the Internet",
    category: "Network Security",
    difficulty: "Advanced",
    date: "September 12, 2026",
    readTime: "26 min read",
    excerpt: "An easy-to-follow guide to BGP route leaks, DNS manipulation, RPKI, DNSSEC, and the practical signs of traffic redirection.",
    content: `## Start Here: The Internet Needs Directions

BGP helps networks decide where IP address ranges should be reached. DNS turns names such as a bank's domain into IP addresses. If either system gives the wrong answer, traffic can be delayed, dropped, or redirected.

HTTPS can protect the contents of a connection, but it cannot guarantee that every routing or DNS decision before the connection was correct. Certificate validation is an important final check.

## 1. BGP Hijacking and Route Leaks

A network announces which IP prefixes it can reach. Other networks use those announcements to build routes. In a hijack, an organization or attacker announces a route that it should not own. In a route leak, a valid route is accidentally or incorrectly shared with networks that should not receive it.

### Real-World Scenario

A small provider accidentally announces a more-specific route for a cloud service. Some internet providers choose the more-specific path, sending users toward the wrong network. The result may be an outage or an interception opportunity.

## 2. DNS Spoofing and Cache Poisoning

DNS resolvers cache answers to speed up browsing. If an attacker can insert a false answer, users may be sent to a clone site. Modern resolver protections, encrypted DNS, and DNSSEC reduce different parts of this risk, but users should still inspect certificate warnings and domains.

A bank page that shows a certificate warning is not safe to use. Close it and open the bank through a known bookmark or official app.

## 3. Defensive Controls

* Use RPKI Route Origin Validation to reject invalid BGP origins.
* Monitor announcements for unexpected prefixes or sudden path changes.
* Use DNSSEC validation for signed domains and resolvers.
* Protect registrar and DNS-provider accounts with strong MFA.
* Keep domain and certificate inventory current.
* Use encrypted DNS where appropriate, understanding its privacy trade-offs.
* Never bypass browser certificate or hostname warnings.

## 4. What Network Teams Should Monitor

Look for unexpected route announcements, sudden changes in latency or path, DNS answers that differ across trusted resolvers, certificate changes, and traffic leaving through an unusual provider. Compare public monitoring data with internal resolver and border-router logs.

## 5. Response to Suspected Redirection

1. Confirm the correct prefix, authoritative DNS answer, and certificate.
2. Contact the upstream provider or registrar through an approved channel.
3. Withdraw or correct the route and apply routing filters.
4. Flush poisoned resolver caches where necessary.
5. Rotate DNS credentials and review recent changes.
6. Investigate whether credentials or traffic were exposed during the event.

## Conclusion: Validate the Path and the Destination

BGP and DNS are shared infrastructure, so local teams cannot control every hop. They can use route validation, DNSSEC, protected registrar accounts, monitoring, and strict browser warnings to make redirection harder to hide and faster to correct.`
  },
  {
    id: 41,
    title: "The Mechanics of Modern Man-in-the-Middle (MitM) Attacks: ARP Poisoning, SSL Stripping, and Encrypted Traffic Analysis",
    category: "Network Security",
    difficulty: "Intermediate",
    date: "September 13, 2026",
    readTime: "24 min read",
    excerpt: "A practical guide to on-path attacks, rogue gateways, HTTPS downgrade attempts, TLS inspection, and safer network configuration.",
    content: `## Start Here: An On-Path Attacker Controls the Route

A Man-in-the-Middle attack happens when an attacker gets between two communicating systems. They may observe traffic, change messages, redirect requests, or simply block communication.

Modern HTTPS makes reading valid encrypted sessions difficult, but weak local network settings, fake Wi-Fi, bad certificates, old protocols, and unsafe TLS inspection can still create opportunities.

## 1. Local Network Attacks

On a shared network, attackers may abuse ARP or DHCP behavior to make a device believe the attacker's machine is the gateway. They may also create a fake Wi-Fi network or scan for exposed file-sharing services.

### Practical Scenario

A laptop connects to a cafe hotspot. The user has file sharing enabled and ignores a certificate warning. The attacker cannot automatically read every HTTPS page, but they can discover the laptop, observe DNS requests, redirect unsafe HTTP traffic, and try to trick the user into a fake login page.

## 2. Why HTTPS Warnings Matter

TLS protects confidentiality and integrity only when the browser validates the certificate and hostname. A certificate warning means the browser cannot establish that the server is the intended site. Never click through that warning for banking, email, administration, or payments.

HTTPS-Only Mode, HSTS, secure cookies, and modern TLS reduce downgrade and session theft risks. They do not make a fake domain legitimate.

## 3. Enterprise TLS Inspection

Organizations sometimes decrypt and inspect outbound TLS traffic through a managed security gateway. This can help detect malware, but it creates a sensitive trust boundary. The inspection certificate must be installed only on managed devices, private keys must be protected, access must be logged, and sensitive services may need an approved bypass.

Do not install a certificate from an unexpected portal or caller. It can allow someone to inspect traffic that should remain private.

## 4. Practical Network Defenses

* Use WPA2 or WPA3 networks and disable auto-join for public hotspots.
* Set untrusted networks to Public and disable local sharing.
* Enable DHCP Snooping and Dynamic ARP Inspection on managed switches.
* Separate guests, IoT devices, workstations, and servers.
* Enforce HTTPS and HSTS on web applications.
* Use mutual TLS for sensitive service-to-service communication.
* Monitor unusual gateway changes and certificate errors.

## 5. What To Do If You Suspect an On-Path Attack

1. Disconnect from the network and use cellular data or a trusted network.
2. Do not continue through certificate warnings.
3. Change credentials entered during the suspicious session.
4. Revoke sessions and inspect account activity.
5. Report the network, device, or certificate to the responsible administrator.
6. Preserve timestamps, screenshots, SSID names, and warnings for investigation.

## Conclusion: Trust the Encryption Check

A secure connection depends on both encryption and correct identity validation. Treat unexpected networks, gateway changes, and certificate warnings as stop signals. Strong HTTPS, segmentation, managed devices, and careful reporting make on-path attacks much harder to complete.`
  },
  {
    id: 42,
    title: "Next-Generation Intrusion Detection and Prevention Systems (IDS/IPS): Deep Packet Inspection, Snort Rules, and Behavioral Anomaly Engines",
    category: "Network Security",
    difficulty: "Intermediate",
    date: "September 14, 2026",
    readTime: "25 min read",
    excerpt: "A practical introduction to IDS and IPS, packet visibility, signatures, anomaly detection, tuning, and the response workflow behind useful alerts.",
    content: `## Start Here: Firewalls Permit Traffic, IDS and IPS Investigate It

A firewall may allow web traffic because a service needs TCP 443. An IDS or IPS looks deeper at sessions, protocols, requests, and behavior to identify attacks moving through an allowed channel.

An IDS raises an alert. An IPS can block or reset traffic. Both need accurate visibility, good rules, and human context.

## 1. What These Systems Can See

Depending on placement and encryption, a network sensor may inspect:

* Source and destination, ports, and connection state.
* DNS requests and response patterns.
* HTTP methods, headers, URLs, and protocol errors.
* Repeated login failures or scanning behavior.
* Known exploit patterns and malware signatures.
* Traffic volume, timing, and unusual destinations.

Encrypted traffic limits payload visibility, so endpoint, DNS, identity, and flow data must complement network inspection.

## 2. Signature and Behavioral Detection

A signature can identify a known exploit or command pattern. It is fast and explainable, but it may miss new variants. Behavioral detection looks for unusual rates, destinations, protocol use, or sequences of events.

### Example Alert

A workstation normally accesses a few business services. It suddenly queries hundreds of random domains, attempts connections to many internal hosts, and sends repeated authentication requests. None of those events alone proves compromise, but together they justify isolation and investigation.

## 3. IDS Versus IPS Deployment

Place sensors where they can see the traffic that matters: internet edges, data-center boundaries, remote-access paths, and sensitive segments. An IPS should begin in carefully monitored detection mode for critical services, because a false block can interrupt business operations.

Use staged enforcement:

1. Baseline normal traffic.
2. Tune noisy rules and document exceptions.
3. Test blocking with safe simulations.
4. Enable prevention for high-confidence threats.
5. Review blocked traffic and rollback safely if needed.

## 4. Making Alerts Useful

Every alert should help answer who, what, when, where, and impact. Add asset ownership, user identity, vulnerability status, endpoint process, DNS history, and recent changes. A generic "malware detected" alert is less useful than one showing a vulnerable server, the exact request, and the process that created it.

Avoid disabling a rule because it is noisy. First narrow it by asset, protocol, direction, or approved business behavior.

## 5. Incident Response Workflow

1. Validate whether the traffic is real and whether the asset is expected.
2. Check endpoint and identity telemetry for related activity.
3. Contain the host or destination if confidence is high.
4. Preserve packets, logs, timestamps, and the detection rule.
5. Search for the same indicator across the environment.
6. Patch or remove the exploited service.
7. Record the outcome and tune the detection.

## Conclusion: Sensors Need Context

IDS and IPS are not magic network firewalls. They are detection and enforcement sensors that become valuable when placed correctly, tuned against real traffic, connected to endpoint and identity context, and supported by a clear response process.`
  }
];
