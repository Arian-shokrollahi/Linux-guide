## ا-`ssh-copy-id`

ا-`ssh-copy-id` برای **کپی کردن Public Key سیستم خودت روی Server** استفاده می‌شود تا بعد از آن بتوانی با SSH Key به سرور وصل شوی.

### Syntax

```
ssh-copy-id [options] user@host
```

مثال:

```
ssh-copy-id ali@192.168.1.100
# Copy your public SSH key to the remote server
```

---

## مهم‌ترین Switchها

|Switch|کاربرد|
|---|---|
|`-i <file>`|مشخص کردن Public Key|
|`-p <port>`|مشخص کردن SSH Port|
|`-f`|فقط نصب Key، بدون بررسی/استفاده از Keyهای موجود|
|`-n`|فقط نمایش کارهایی که انجام می‌شود، بدون تغییر|
|`-v`|نمایش جزئیات اتصال|

---

## ⭐⭐⭐ ۳ کاربرد پرکاربرد

### 1. حالت معمول

```
ssh-copy-id user@server
```

به‌صورت پیش‌فرض معمولاً:

```
~/.ssh/id_ed25519.pub
```

را پیدا و روی Server اضافه می‌کند.

---

### 2. استفاده از Public Key مشخص

```
ssh-copy-id -i ~/.ssh/mykey.pub user@server
```

---

### 3. Server با Port سفارشی

```
ssh-copy-id -p 2222 user@server
```

---

## پشت صحنه چه اتفاقی می‌افتد؟

```
Your PC
│
├── ~/.ssh/id_ed25519
│       └── Private Key 🔒
│
└── ~/.ssh/id_ed25519.pub
        │
        │ ssh-copy-id
        ▼
Remote Server
└── ~/.ssh/authorized_keys
        └── Public Key
```

بعد:

```
ssh user@server
```

سرور Public Key را با درخواست احراز هویت مقایسه می‌کند و **Private Key هیچ‌وقت به Server فرستاده نمی‌شود.**

### خلاصه

```
ssh-keygen   → ساخت Key Pair
ssh-copy-id  → انتقال Public Key به Server
ssh           → اتصال با Key
```

یعنی:

**`ssh-keygen` → `ssh-copy-id` → `ssh`** 🔑
