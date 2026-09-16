## `ssh`

ا-`ssh` مخفف **Secure Shell** است و برای اتصال امن به یک سیستم دیگر از طریق ششبکه استفاده می‌شود. مهم‌ترین کاربردش مدیریت Remote Server است؛ ارتباط و احراز هویت به‌صورت رمزنگاری‌شده انجام می‌شود.

### Syntax

```
ssh [options] [user@]host
```

مثلاً:

```
ssh ali@192.168.1.100
# Connect to 192.168.1.100 as user ali
```

---

## مهم‌ترین Switchها

|Switch|کاربرد|
|---|---|
|`-p <port>`|مشخص کردن SSH Port|
|`-i <file>`|استفاده از Private Key مشخص|
|`-v`|نمایش جزئیات اتصال برای Debug|
|`-vv`|Debug بیشتر|
|`-vvv`|بیشترین سطح Debug|
|`-L`|Local Port Forwarding|
|`-R`|Remote Port Forwarding|
|`-D`|ایجاد SOCKS Proxy|
|`-N`|فقط Port Forwarding، بدون اجرای Shell|
|`-T`|بدون TTY|
|`-t`|درخواست TTY|
|`-X`|X11 Forwarding|
|`-A`|SSH Agent Forwarding|
|`-4`|فقط IPv4|
|`-6`|فقط IPv6|
|`-F <file>`|استفاده از SSH config مشخص|
|`-o <option>`|تنظیم یک SSH option مستقیماً|
|`-C`|فشرده‌سازی داده|
|`-q`|حالت Quiet|
|`-f`|اجرای SSH در Background|

---

## ⭐⭐⭐ ۳ کاربرد خیلی مهم

### 1. اتصال معمولی

```
ssh user@server
```

یا با IP:

```
ssh root@192.168.1.10
```

---

### 2. اتصال با Port متفاوت

SSH به‌صورت پیش‌فرض روی **22** است:

```
ssh -p 2222 user@server
# Connect using port 2222
```

---

### 3. اتصال با SSH Key

```
ssh -i ~/.ssh/id_ed25519 user@server
# Use the specified private key
```

---

## 🔐 احراز هویت با SSH

دو روش اصلی:

```
Password Authentication
        ↓
username + password

Key-Based Authentication
        ↓
Private Key  →  Public Key
```

کلیدها معمولاً در این مسیر هستند:

```
~/.ssh/
```

مثلاً:

```
~/.ssh/id_ed25519        # Private key
~/.ssh/id_ed25519.pub    # Public key
```

**Private Key را نباید در اختیار دیگران قرار بدهی.**

---

## 📌 Port Forwarding

یکی از قابلیت‌های مهم SSH همین است.

### Local Forward

```
ssh -L 8080:localhost:80 user@server
```

یعنی:

```
Your PC:8080
     ↓ SSH Tunnel
Server:80
```

### Remote Forward

```
ssh -R 8080:localhost:80 user@server
```

### SOCKS Proxy

```
ssh -D 1080 user@server
```

SSH روی سیستم تو یک SOCKS Proxy ایجاد می‌کند.

---

## 🛠 Debug کردن SSH

اگر اتصال مشکل داشت:

```
ssh -v user@server
```

جزئیات بیشتر:

```
ssh -vvv user@server
```

این برای فهمیدن مشکلاتی مثل **authentication، key، port و connection** خیلی کاربردی است.

---

## ⚙️ فایل مهم SSH

کلاینت SSH تنظیماتش را از این فایل می‌خواند:

```
~/.ssh/config
```

مثلاً:

```
Host myserver
    HostName 192.168.1.100
    User ali
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
```

بعد فقط:

```
ssh myserver
```

---

### جمع‌بندی خیلی کوتاه

```
ssh
│
├── Remote Login       → ssh user@host
├── Custom Port        → ssh -p 2222 user@host
├── SSH Key            → ssh -i key user@host
├── Debug              → ssh -vvv user@host
├── Local Forward      → ssh -L ...
├── Remote Forward     → ssh -R ...
├── SOCKS Proxy        → ssh -D ...
└── Config             → ~/.ssh/config
```

اگر SSH را برای **Network/DevOps** می‌خوانی، بعد از خود `ssh` مهم‌ترین مباحثش **`ssh-keygen`، `ssh-copy-id`، `~/.ssh/config`، `scp`، `sftp` و Port Forwarding** هستند
