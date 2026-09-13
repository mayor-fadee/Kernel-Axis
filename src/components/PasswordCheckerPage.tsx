import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Zap, 
  Key, 
  ShieldAlert, 
  Lightbulb, 
  Copy, 
  Check, 
  RefreshCw,
  Layers
} from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

// Common weak passwords & dictionary terms list
const COMMON_WEAK_PASSWORDS = new Set([
  '123456', 'password', '123456789', '12345678', '12345', '1234567', 'qwerty',
  '1234', '111111', '1234567890', '123456789012', 'admin', 'welcome', 'letmein',
  'iloveyou', 'sunshine', 'princess', 'monkey', 'dragon', 'master', 'football',
  'shadow', 'superman', 'password1', '123321', '654321', '000000', 'p@ssword',
  'p@ssw0rd', 'admin123', 'pass1234', 'qwerty123', 'admin123!', 'password123',
  'fadi123', 'fadi_123', 'hello1234', 'user123!', 'welcome123'
]);

// Common names list (lowercased - common first names and usernames only)
const COMMON_NAMES = new Set([
  'fadi', 'john', 'alex', 'mary', 'sarah', 'michael', 'david', 'james', 'robert',
  'william', 'joseph', 'charles', 'thomas', 'daniel', 'matthew', 'anthony', 'mark',
  'donald', 'steven', 'paul', 'andrew', 'joshua', 'kenneth', 'kevin', 'brian',
  'george', 'edward', 'ronald', 'timothy', 'jason', 'jeffrey', 'ryan', 'jacob',
  'gary', 'nicholas', 'eric', 'jonathan', 'stephen', 'larry', 'justin', 'adam',
  'brandon', 'harry', 'samuel', 'benjamin', 'sam', 'jack', 'luke', 'emma', 'olivia',
  'ava', 'isabella', 'sophia', 'charlotte', 'mia', 'amelia', 'harper', 'evelyn',
  'abigail', 'emily', 'elizabeth', 'mila', 'ella', 'avery', 'sofia', 'camila'
]);

// Common dictionary words & terms (lowercased)
const COMMON_WORDS = new Set([
  'password', 'admin', 'user', 'hello', 'welcome', 'secret', 'dragon', 'monkey',
  'superman', 'master', 'football', 'princess', 'sunshine', 'shadow', 'letmein',
  'iloveyou', 'qwerty', 'system', 'kernel', 'security', 'access', 'login', 'test',
  'demo', 'guest', 'root', 'company', 'office', 'service', 'online', 'account',
  'pass', 'code', 'cyber', 'vector', 'matrix', 'shield', 'freedom', 'starwars'
]);

// Pre-converted arrays for fast suffix/prefix checking
const COMMON_NAMES_ARRAY = Array.from(COMMON_NAMES);
const COMMON_WORDS_ARRAY = Array.from(COMMON_WORDS);

export const PasswordCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [debouncedPassword, setDebouncedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Debounce analysis calculation by 200ms to ensure 100% smooth, lag-free typing
  useEffect(() => {
    if (!password) {
      setDebouncedPassword('');
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedPassword(password);
    }, 200);

    return () => clearTimeout(timer);
  }, [password]);

  // Real-time strength calculation engine on debounced password
  const analysis = useMemo(() => {
    if (!debouncedPassword) {
      return null;
    }

    const currentPass = debouncedPassword;
    const length = currentPass.length;
    const hasLower = /[a-z]/.test(currentPass);
    const hasUpper = /[A-Z]/.test(currentPass);
    const hasNumber = /[0-9]/.test(currentPass);
    const hasSymbol = /[^a-zA-Z0-9]/.test(currentPass);

    // Calculate character pool size
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 32;

    // Entropy calculation in bits: E = L * log2(R)
    const entropyBits = poolSize > 0 ? length * Math.log2(poolSize) : 0;

    // 1. Exact match in weak list
    const isExactWeak = COMMON_WEAK_PASSWORDS.has(currentPass.toLowerCase());

    // 2. Extract embedded name / dictionary word coverage
    const lower = currentPass.toLowerCase();
    const leetDeMapped = lower
      .replace(/@/g, 'a')
      .replace(/0/g, 'o')
      .replace(/1|!/g, 'i')
      .replace(/3/g, 'e')
      .replace(/\$|5/g, 's')
      .replace(/7/g, 't');

    // Track every character index covered by any matching name or word
    const matchedIndices = new Array(length).fill(false);
    let matchedName: string | null = null;
    let matchedWord: string | null = null;

    COMMON_NAMES.forEach(name => {
      if (name.length >= 3) {
        let idx = lower.indexOf(name);
        while (idx !== -1) {
          for (let i = idx; i < idx + name.length; i++) matchedIndices[i] = true;
          if (!matchedName || name.length > matchedName.length) matchedName = name;
          idx = lower.indexOf(name, idx + 1);
        }
        let leetIdx = leetDeMapped.indexOf(name);
        while (leetIdx !== -1) {
          for (let i = leetIdx; i < leetIdx + name.length; i++) matchedIndices[i] = true;
          if (!matchedName || name.length > matchedName.length) matchedName = name;
          leetIdx = leetDeMapped.indexOf(name, leetIdx + 1);
        }
      }
    });

    COMMON_WORDS.forEach(word => {
      if (word.length >= 3) {
        let idx = lower.indexOf(word);
        while (idx !== -1) {
          for (let i = idx; i < idx + word.length; i++) matchedIndices[i] = true;
          if (!matchedWord || word.length > matchedWord.length) matchedWord = word;
          idx = lower.indexOf(word, idx + 1);
        }
        let leetIdx = leetDeMapped.indexOf(word);
        while (leetIdx !== -1) {
          for (let i = leetIdx; i < leetIdx + word.length; i++) matchedIndices[i] = true;
          if (!matchedWord || word.length > matchedWord.length) matchedWord = word;
          leetIdx = leetDeMapped.indexOf(word, leetIdx + 1);
        }
      }
    });

    const matchedCharCount = matchedIndices.filter(Boolean).length;
    const wordRatio = length > 0 ? matchedCharCount / length : 0;
    const isCommonName = !!matchedName;
    const isCommonWord = !!matchedWord;

    // 3. Pattern & Weakness detections
    const hasKeyboardPattern = /(qwerty|asdfgh|zxcvbn|1qaz|2wsx|3edc|4rfv|5tgb|6yhn|7ujm|8ik|9ol|0p|ytrewq|hgfdsa|nbvcxz)/i.test(currentPass);
    const hasSequentialNumbers = /(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321)/.test(currentPass);
    const hasSequentialLetters = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqp|qpo|pon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba)/i.test(currentPass);
    const hasRepeatingChars = /(.)\1{2,}/.test(currentPass);

    // Predictable separator pattern (e.g. word_1, word-123, name_surname1)
    const hasSeparatorNumberPattern = /[_.\-!@#$%^&*]+[0-9]{1,4}$/.test(currentPass) || /[_.\-!@#$%^&*]+[a-zA-Z0-9_.\-!@#$%^&*]*$/.test(currentPass);

    // Detect simple suffix pattern: single common word/name + trivial suffix (e.g. fadi_123, fadi_gujjar1, john123, admin!)
    let isSimpleSuffixPattern = false;
    const simpleSuffixMatch = currentPass.match(/^([a-zA-Z0-9_.\-!@#$%^&*]+)([_.\-!@#$%^&*]?[0-9]{1,4}[_.\-!@#$%^&*]?)$/i);
    if (simpleSuffixMatch) {
      const prefix = simpleSuffixMatch[1];
      const suffix = simpleSuffixMatch[2];
      const prefixLower = prefix.toLowerCase();
      const prefixHasName = COMMON_NAMES_ARRAY.some(name => name.length >= 3 && prefixLower.includes(name));
      const prefixHasWord = COMMON_WORDS_ARRAY.some(word => word.length >= 3 && prefixLower.includes(word));
      if ((prefixHasName || prefixHasWord) && suffix.length <= 4) {
        isSimpleSuffixPattern = true;
      }
    }

    // Dynamic predictable pattern detection without hardcoded word list dependencies:
    // Detects human cognitive patterns (word + numbers, word_123, word-go123, username123, example_123, Word123!, etc.)
    const wordAndNumbersPattern = /^([a-zA-Z]{2,}[_\-.\s!@#$%^&*]*)+[0-9]{1,6}[_\-.\s!@#$%^&*]*$/i.test(currentPass);
    const numberAndWordPattern = /^[_\-.\s!@#$%^&*]*[0-9]{1,6}[_\-.\s!@#$%^&*]*([a-zA-Z]{2,}[_\-.\s!@#$%^&*]*)+$/i.test(currentPass);
    const wordSeparatorPattern = /^[a-zA-Z]{3,}[_\-.!@#$%^&*]+[a-zA-Z0-9_\-.!@#$%^&*]*$/i.test(currentPass);

    const letterBlocks = currentPass.match(/[a-zA-Z]+/g) || [];
    const nonLetterBlocks = currentPass.match(/[^a-zA-Z]+/g) || [];
    const totalLetterChars = letterBlocks.reduce((acc, c) => acc + c.length, 0);
    const maxLetterChunkLen = letterBlocks.reduce((max, c) => Math.max(max, c.length), 0);
    const isCleanNonLetterStructure = nonLetterBlocks.length === 0 || nonLetterBlocks.every(block => /^[0-9_\-.\s!@#$%^&*]+$/.test(block));

    const isTokenBasedWordStructure = 
      (maxLetterChunkLen >= 3 || totalLetterChars >= length * 0.5) &&
      isCleanNonLetterStructure &&
      (nonLetterBlocks.length <= 3);

    const isSimpleStructureTemplate = 
      wordAndNumbersPattern ||
      numberAndWordPattern ||
      wordSeparatorPattern ||
      isTokenBasedWordStructure ||
      isSimpleSuffixPattern ||
      isCommonName ||
      isCommonWord;

    // 3. Realistic Cybersecurity Effective Entropy Calculation
    // Characters not covered by dictionary words or fixed patterns contribute full random pool entropy
    const patternMatchedChars = matchedIndices.filter(Boolean).length;
    const randomCharsCount = length - patternMatchedChars;
    const randomEntropy = poolSize > 0 ? randomCharsCount * Math.log2(poolSize) : 0;

    // A password is "predominantly predictable" ONLY if the predictable pattern covers the majority of the password
    // AND it lacks significant additional random characters / random entropy.
    // If the password contains 5+ random characters or >= 28 bits of pure random entropy beyond the initial readable segment,
    // it is NOT predominantly predictable.
    const isPredominantlyPredictable = 
      isSimpleStructureTemplate && 
      (patternMatchedChars / length >= 0.70 || randomCharsCount < 5) && 
      randomEntropy < 28;

    // Search space log2 size for dictionary & pattern matches
    let patternEntropy = 0;
    if (isCommonName) patternEntropy += 11; // ~2000 common names search space
    if (isCommonWord) patternEntropy += 11; // ~2000 dictionary words search space
    if (hasKeyboardPattern) patternEntropy += 5;
    if (hasSequentialNumbers) patternEntropy += 4;
    if (hasSequentialLetters) patternEntropy += 4;

    let effectiveEntropy = randomEntropy + patternEntropy;

    // Apply entropy deductions: larger penalty if predominantly predictable, minor cognitive bias adjustment if partially predictable
    if (isPredominantlyPredictable) {
      effectiveEntropy = Math.max(0, effectiveEntropy - 16);
    } else if (isSimpleStructureTemplate) {
      effectiveEntropy = Math.max(0, effectiveEntropy - 5);
    }

    if (hasRepeatingChars) {
      effectiveEntropy = Math.max(0, effectiveEntropy - 6);
    }

    effectiveEntropy = Math.min(entropyBits, effectiveEntropy);

    // 4. Score mapping (0-100) based on effective entropy & search space estimation
    let score = 0;
    if (isExactWeak) {
      score = 8;
    } else {
      // Industry-standard effective entropy mapping:
      // < 25 bits  -> 10 to 30 (Weak - crackable in seconds)
      // 25-50 bits -> 30 to 58 (Fair - crackable in hours/days)
      // 50-72 bits -> 58 to 78 (Good - resistant to standard offline attacks)
      // 72+ bits   -> 78 to 100 (Strong - highly resistant to GPU cluster attacks)
      if (effectiveEntropy <= 25) {
        score = Math.round(10 + (effectiveEntropy / 25) * 20);
      } else if (effectiveEntropy <= 50) {
        score = Math.round(30 + ((effectiveEntropy - 25) / 25) * 28);
      } else if (effectiveEntropy <= 72) {
        score = Math.round(58 + ((effectiveEntropy - 50) / 22) * 20);
      } else {
        score = Math.round(78 + Math.min(22, ((effectiveEntropy - 72) / 28) * 22));
      }

      // Hard cap score ONLY for passwords that are predominantly predictable without sufficient randomness (max 52 -> Fair)
      if (isPredominantlyPredictable) {
        score = Math.min(score, 52);
      }

      // Hard caps for short passwords where total combination space is physically limited
      if (length < 8) {
        score = Math.min(score, 25);
      } else if (length < 10 && isPredominantlyPredictable) {
        score = Math.min(score, 45);
      }
    }

    // Determine strength rating eligibility based on objective security criteria
    const isStrongEligible = 
      effectiveEntropy >= 72 && 
      length >= 12 && 
      !isExactWeak && 
      !isPredominantlyPredictable &&
      !hasKeyboardPattern &&
      !hasSequentialNumbers &&
      !hasSequentialLetters;

    let strengthLevel: 'Weak' | 'Fair' | 'Good' | 'Strong' = 'Weak';
    let themeColor = '#ef4444'; // Red
    let textColor = 'text-red-400';
    let borderColor = 'border-red-500/30';
    let bgColor = 'bg-red-500/10';

    if (score < 32 || isExactWeak || length < 8) {
      strengthLevel = 'Weak';
      themeColor = '#ef4444';
      textColor = 'text-red-400';
      borderColor = 'border-red-500/30';
      bgColor = 'bg-red-500/10';
    } else if (score < 58 || isPredominantlyPredictable || (length < 10 && (isCommonName || isCommonWord))) {
      strengthLevel = 'Fair';
      themeColor = '#f59e0b'; // Amber
      textColor = 'text-amber-400';
      borderColor = 'border-amber-500/30';
      bgColor = 'bg-amber-500/10';
    } else if (score < 78 || !isStrongEligible) {
      strengthLevel = 'Good';
      themeColor = '#06b6d4'; // Cyan
      textColor = 'text-cyan-400';
      borderColor = 'border-cyan-500/30';
      bgColor = 'bg-cyan-500/10';
    } else {
      strengthLevel = 'Strong';
      themeColor = '#00ff88'; // Neon Green
      textColor = 'text-[#00ff88]';
      borderColor = 'border-[#00ff88]/30';
      bgColor = 'bg-[#00ff88]/10';
    }

    // Time to crack estimation
    const guessesPerSec = 100_000_000_000;
    const totalCombinations = Math.pow(poolSize || 1, length);
    const secondsToCrack = totalCombinations / (guessesPerSec * 2);

    const isDictionaryDominant = (isCommonName || isCommonWord) && (wordRatio >= 0.5 || length < 12);

    let timeToCrack = 'Instant';
    if (isExactWeak) {
      timeToCrack = 'Instant (Found in breach lists)';
    } else if (isDictionaryDominant && (hasSequentialNumbers || isPredominantlyPredictable || length < 10)) {
      timeToCrack = 'Instant (Under 1 second via dictionary attacks)';
    } else if (isDictionaryDominant || (hasKeyboardPattern && length < 12)) {
      timeToCrack = 'A few seconds (Rule-based wordlist attack)';
    } else if (secondsToCrack < 1) {
      timeToCrack = 'Instant (Under 1 second)';
    } else if (secondsToCrack < 60) {
      timeToCrack = `${Math.ceil(secondsToCrack)} seconds`;
    } else if (secondsToCrack < 3600) {
      timeToCrack = `${Math.ceil(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
      timeToCrack = `${Math.ceil(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
      timeToCrack = `${Math.ceil(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 3153600000) {
      timeToCrack = `${Math.ceil(secondsToCrack / 31536000)} years`;
    } else if (secondsToCrack < 315360000000) {
      timeToCrack = `${Math.ceil(secondsToCrack / 3153600000)} centuries`;
    } else {
      timeToCrack = 'Millions of years';
    }

    // Custom findings and recommendations
    const findings: { type: 'success' | 'danger' | 'warning'; text: string }[] = [];

    // Length analysis
    if (length < 8) {
      findings.push({ type: 'danger', text: 'Password is too short (< 8 characters)' });
    } else if (length < 12) {
      findings.push({ type: 'warning', text: 'Under recommended length (12+ characters recommended)' });
    } else {
      findings.push({ type: 'success', text: 'Good password length (12+ characters)' });
    }

    // Common terms & names
    if (isExactWeak) {
      findings.push({ type: 'danger', text: 'Common password found in leak lists' });
    }
    if (isCommonName) {
      findings.push({
        type: wordRatio >= 0.4 ? 'danger' : 'warning',
        text: wordRatio >= 0.4 ? `Common name makes up significant portion ("${matchedName}")` : `Contains embedded name ("${matchedName}")`
      });
    }
    if (isCommonWord) {
      findings.push({
        type: wordRatio >= 0.4 ? 'danger' : 'warning',
        text: wordRatio >= 0.4 ? `Dictionary word makes up significant portion ("${matchedWord}")` : `Contains embedded word ("${matchedWord}")`
      });
    }

    // Patterns
    if (hasKeyboardPattern) {
      findings.push({
        type: length < 16 ? 'danger' : 'warning',
        text: 'Keyboard spatial pattern detected (e.g. Qwerty, Asdf)'
      });
    }
    if (hasSequentialNumbers) {
      findings.push({
        type: length < 16 ? 'danger' : 'warning',
        text: 'Sequential numbers detected (e.g. 123, 1234)'
      });
    }
    if (hasSequentialLetters) {
      findings.push({
        type: length < 16 ? 'danger' : 'warning',
        text: 'Sequential alphabet detected (e.g. abc, xyz)'
      });
    }
    if (isSimpleStructureTemplate && !isCommonName && !isCommonWord) {
      findings.push({
        type: isPredominantlyPredictable ? 'warning' : 'success',
        text: isPredominantlyPredictable 
          ? 'Predictable structure detected (Word + Numbers/Symbols)' 
          : 'Readable word segment combined with strong random suffix'
      });
    }
    if (hasRepeatingChars) {
      findings.push({
        type: length < 16 ? 'danger' : 'warning',
        text: 'Repeated characters detected (e.g. aaa, 111)'
      });
    }

    // Case and character mix
    if (!hasUpper) {
      findings.push({ type: 'danger', text: 'No uppercase letters detected' });
    }
    if (!hasLower) {
      findings.push({ type: 'danger', text: 'No lowercase letters detected' });
    }
    if (!hasNumber) {
      findings.push({ type: 'danger', text: 'No numbers detected' });
    }
    if (!hasSymbol) {
      findings.push({ type: 'warning', text: 'No special symbols detected' });
    }

    if (hasUpper && hasLower && hasNumber && hasSymbol) {
      findings.push({ type: 'success', text: 'Includes all 4 character types' });
    }

    // Overall quality
    if (isStrongEligible) {
      findings.push({ type: 'success', text: 'Difficult to guess' });
      findings.push({ type: 'success', text: 'High length & entropy resist dictionary/brute-force attacks' });
    }

    const warnings: string[] = [];
    if (isExactWeak) {
      warnings.push('This exact password is found in public data breach databases.');
    }
    if (isCommonName && (wordRatio >= 0.3 || length < 16)) {
      warnings.push(`Contains a common name ("${matchedName}"). In short passwords, names are targeted by automated tools.`);
    }
    if (isCommonWord && (wordRatio >= 0.3 || length < 16)) {
      warnings.push(`Contains a dictionary word ("${matchedWord}"). Wordlist attacks target dictionary terms.`);
    }
    if (hasKeyboardPattern && (length < 16)) {
      warnings.push('Contains keyboard spatial patterns (e.g. Qwerty, Asdf) which wordlist tools test first.');
    }
    if (hasSequentialNumbers && (length < 16)) {
      warnings.push('Contains sequential numbers (e.g. 123, 1234). In short passwords, these offer negligible protection.');
    }
    if (isPredominantlyPredictable) {
      warnings.push('Uses a predominantly predictable layout (Word + Number + Symbol) with minimal additional entropy.');
    } else if (isSimpleStructureTemplate) {
      warnings.push('Starts with a readable word pattern, but contains random characters that significantly improve resistance.');
    }
    if (length < 12 && !isExactWeak) {
      warnings.push('Increasing length significantly boosts resistance against brute-force attacks.');
    }

    return {
      length,
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      entropyBits: Math.round(entropyBits),
      score,
      strengthLevel,
      themeColor,
      textColor,
      borderColor,
      bgColor,
      timeToCrack,
      isCommon: isExactWeak || isCommonName || isCommonWord,
      findings,
      warnings
    };
  }, [debouncedPassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    playSynthBeep('click');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPassword('');
    setDebouncedPassword('');
    playSynthBeep('click');
  };

  const generateSamplePassphrase = () => {
    playSynthBeep('click');
    const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowers = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '!@#$%^&*_-+=';
    const all = uppers + lowers + numbers + symbols;

    let result = '';
    // Pick at least 1 from each pool
    result += uppers[Math.floor(Math.random() * uppers.length)];
    result += lowers[Math.floor(Math.random() * lowers.length)];
    result += numbers[Math.floor(Math.random() * numbers.length)];
    result += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < 16; i++) {
      result += all[Math.floor(Math.random() * all.length)];
    }

    // Shuffle result
    const arr = result.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const generated = arr.join('');
    setPassword(generated);
    setDebouncedPassword(generated);
  };

  // Listen for Escape (ESC) key to navigate back to tools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playSynthBeep('click');
        navigate('/tools');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* BREADCRUMB / BACK LINK */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => {
            playSynthBeep('click');
            navigate('/tools');
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#00ff88]/80 hover:text-[#00ff88] transition-all cursor-pointer bg-[#00ff88]/5 px-3 py-1.5 rounded-lg border border-[#00ff88]/20 hover:border-[#00ff88]/40 shadow-sm group"
          title="Back to Tools"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Tools</span>
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]/80">
          <Lock className="w-3.5 h-3.5 text-[#00ff88]" />
          Client-Side Analysis
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          Password Strength Checker
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-2xl">
          Analyze password strength locally in your browser and receive instant feedback on password security, complexity, and overall strength.
        </p>

        {/* PRIVACY BADGE */}
        <div className="p-3 bg-zinc-900/80 border border-white/[0.08] rounded-xl flex items-center gap-3 text-xs text-zinc-300 font-mono">
          <ShieldCheck className="w-4 h-4 text-[#00ff88] shrink-0" />
          <span>
            <strong className="text-white">100% Local Browser Execution:</strong> Your password is analyzed locally in your browser and is <span className="text-[#00ff88]">never saved, stored, or transmitted</span> over any network.
          </span>
        </div>
      </div>

      {/* TOOL INTERACTIVE CARD */}
      <div className="p-6 sm:p-8 bg-[#020504] border border-[#00ff88]/20 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
        
        {/* INPUT FIELD */}
        <div className="space-y-2">
          <label className="block text-xs font-display font-bold text-white uppercase tracking-wider">
            Enter Password or Passphrase
          </label>
          <div className="relative flex items-center">
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password to analyze..."
              className="w-full bg-black/60 border border-white/15 focus:border-[#00ff88] rounded-xl px-4 py-3.5 pr-28 text-white font-mono text-sm sm:text-base tracking-wider focus:outline-none focus:ring-1 focus:ring-[#00ff88]/40 transition-all placeholder:text-zinc-600 placeholder:font-sans"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              {password && (
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy password"
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  playSynthBeep('click');
                  setShowPassword(!showPassword);
                }}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 pt-1">
            <span>Character Count: <strong className="text-white">{password.length}</strong></span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={generateSamplePassphrase}
                className="text-[#00ff88] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Try Sample Passphrase</span>
              </button>
              {password && (
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="text-zinc-400 hover:text-red-400 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ANALYSIS OUTPUT */}
        {analysis ? (
          <div className="space-y-6 pt-2 border-t border-white/[0.08]">
            
            {/* STRENGTH METER BAR & BADGE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-zinc-300">
                  Password Security Assessment
                </span>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${analysis.bgColor} ${analysis.textColor} ${analysis.borderColor}`}>
                  {analysis.strengthLevel} ({analysis.score}/100)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-black/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.max(5, analysis.score)}%`,
                    backgroundColor: analysis.themeColor,
                    boxShadow: `0 0 10px ${analysis.themeColor}80`
                  }}
                />
              </div>
            </div>

            {/* ANALYSIS FINDINGS & RECOMMENDATIONS */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl space-y-3">
              <h3 className="text-xs font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                Security Findings & Analysis
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {analysis.findings.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-2 p-2 rounded-lg border ${
                      item.type === 'success' 
                        ? 'bg-[#00ff88]/5 border-[#00ff88]/20 text-[#00ff88]' 
                        : item.type === 'danger'
                        ? 'bg-red-500/5 border-red-500/20 text-red-400'
                        : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                    }`}
                  >
                    <span className="text-sm select-none">
                      {item.type === 'success' ? '✅' : '❌'}
                    </span>
                    <span className="leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CHARACTER DIVERSITY CHECKLIST */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl space-y-3">
              <h3 className="text-xs font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00ff88]" />
                Complexity & Composition Checklist
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className={`flex items-center gap-2 ${analysis.length >= 12 ? 'text-[#00ff88]' : 'text-zinc-500'}`}>
                  {analysis.length >= 12 ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00ff88]" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-zinc-600" />}
                  <span>Length (12+ chars)</span>
                </div>

                <div className={`flex items-center gap-2 ${analysis.hasLower ? 'text-[#00ff88]' : 'text-zinc-500'}`}>
                  {analysis.hasLower ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00ff88]" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-zinc-600" />}
                  <span>Lowercase (a-z)</span>
                </div>

                <div className={`flex items-center gap-2 ${analysis.hasUpper ? 'text-[#00ff88]' : 'text-zinc-500'}`}>
                  {analysis.hasUpper ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00ff88]" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-zinc-600" />}
                  <span>Uppercase (A-Z)</span>
                </div>

                <div className={`flex items-center gap-2 ${analysis.hasNumber ? 'text-[#00ff88]' : 'text-zinc-500'}`}>
                  {analysis.hasNumber ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00ff88]" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-zinc-600" />}
                  <span>Numbers (0-9)</span>
                </div>

                <div className={`flex items-center gap-2 ${analysis.hasSymbol ? 'text-[#00ff88]' : 'text-zinc-500'}`}>
                  {analysis.hasSymbol ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00ff88]" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-zinc-600" />}
                  <span>Symbols (!@#$)</span>
                </div>

                <div className={`flex items-center gap-2 ${!analysis.isCommon ? 'text-[#00ff88]' : 'text-red-400'}`}>
                  {!analysis.isCommon ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00ff88]" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />}
                  <span>Unique & Unbroken</span>
                </div>
              </div>
            </div>

            {/* SECURITY WARNINGS & RECOMMENDATIONS */}
            {analysis.warnings.length > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-display font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Security Recommendations</span>
                </div>
                <ul className="space-y-1.5 pl-6 list-disc text-xs text-amber-200/90 font-sans leading-relaxed">
                  {analysis.warnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ) : (
          <div className="p-8 text-center border border-dashed border-white/10 rounded-xl space-y-2 bg-black/40">
            <Key className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-xs font-mono text-zinc-400">
              Type or paste a password above to begin real-time strength analysis.
            </p>
          </div>
        )}

      </div>

      {/* EDUCATIONAL SECTION BELOW TOOL */}
      <div className="space-y-8 pt-6 border-t border-white/[0.08]">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide">
            Password Security Best Practices
          </h2>
          <p className="text-xs text-zinc-400 font-sans">
            Understanding the core mechanics of authentication security helps you protect your online presence effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. WHAT MAKES A PASSWORD STRONG */}
          <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-xl space-y-4 hover:border-[#00ff88]/30 transition-colors">
            <div className="p-2 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-lg text-[#00ff88] w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              What Makes a Password Strong
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Strong passwords are usually long, unique, and difficult to guess. A passphrase made from several unrelated words is often more secure and easier to remember than a short password filled with symbols and numbers. Longer passwords provide stronger protection against automated guessing attacks.
            </p>
          </div>

          {/* 2. WHY PASSWORD REUSE IS DANGEROUS */}
          <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-xl space-y-4 hover:border-red-500/30 transition-colors">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 w-fit">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              Why Password Reuse Is Dangerous
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              If one website suffers a data breach, attackers often try the same email and password combination on other popular services. Reusing passwords can allow a single breach to put multiple accounts at risk, including email, social media, and financial accounts.
            </p>
          </div>

          {/* 3. WHY PASSWORD MANAGERS ARE RECOMMENDED */}
          <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-xl space-y-4 hover:border-cyan-500/30 transition-colors">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 w-fit">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              Why Password Managers Are Recommended
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Password managers help you create and store strong, unique passwords for every account. Instead of remembering dozens of passwords, you only need to remember one master password. This reduces password reuse and significantly improves account security.
            </p>
          </div>

        </div>

        {/* NEW SECTION: PASSWORD SAFETY TIPS */}
        <div className="p-6 sm:p-8 bg-[#020504] border border-[#00ff88]/20 rounded-2xl space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-xl text-[#00ff88]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-wider">
              Password Safety Tips
            </h3>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-zinc-200 font-sans">
            <li className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <span className="text-[#00ff88] font-bold text-base select-none">✔</span>
              <span>Use a unique password for every account</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <span className="text-[#00ff88] font-bold text-base select-none">✔</span>
              <span>Enable Multi-Factor Authentication (MFA) whenever possible</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <span className="text-[#00ff88] font-bold text-base select-none">✔</span>
              <span>Avoid using names, birthdays, or personal information</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <span className="text-[#00ff88] font-bold text-base select-none">✔</span>
              <span>Consider using a trusted password manager</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl md:col-span-2">
              <span className="text-[#00ff88] font-bold text-base select-none">✔</span>
              <span>Change important passwords if you suspect a breach</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
