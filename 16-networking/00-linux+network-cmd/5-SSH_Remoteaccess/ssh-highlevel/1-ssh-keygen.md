## ا-`ssh-keygen`

ا-`ssh-keygen` برای **ساخت و مدیریت SSH Key Pair** استفاده می‌شود. این Keyها برای احراز هویت امن در SSH استفاده می‌شوند و معمولاً باعث می‌شوند بدون وارد کردن Password به Server وصل شوی.

### ساختار SSH Key


### Syntax

```
ssh-keygen [options]
```

---

## مهم‌ترین Switchها

|Switch|کاربرد|
|---|---|
|`-t <type>`|تعیین نوع Key|
|`-b <bits>`|تعیین اندازه Key|
|`-f <file>`|تعیین مسیر/نام فایل Key|
|`-C <comment>`|اضافه کردن Comment|
|`-N <passphrase>`|تعیین Passphrase|
|`-p`|تغییر Passphrase موجود|
|`-l`|نمایش Fingerprint|
|`-y`|استخراج Public Key از Private Key|
|`-q`|Quiet mode|

---

## ⭐⭐⭐ ساخت Key معمولی

امروزه معمولاً از **Ed25519** استفاده می‌شود:

```
ssh-keygen -t ed25519
# Generate an Ed25519 SSH key pair
```

خروجی معمولاً:

```
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

در زمان ساخت از تو می‌پرسد:

```
Enter file in which to save the key:
Enter passphrase:
```

بهتر است برای Private Key یک **Passphrase** تعیین کنی.

---

## ⭐⭐⭐ ساخت Key با نام مشخص

```
ssh-keygen -t ed25519 -f ~/.ssh/server_key
```

نتیجه:

```
~/.ssh/server_key
~/.ssh/server_key.pub
```

---

## ⭐⭐⭐ اضافه کردن Comment

```
ssh-keygen -t ed25519 -C "my-server-key"
```

Comment فقط برای شناسایی Key است و روی امنیت رمزنگاری تأثیری ندارد.

---

## 🔑 ارسال Public Key به Server
مهم
بعد از ساخت Key:

```
ssh-copy-id user@server
```

این کار **Public Key** را روی Server قرار می‌دهد.

بعد:

```
ssh user@server
```

و SSH می‌تواند با Key احراز هویت کند.

---

## ⚠️ نکته بسیار مهم

هیچ‌وقت Private Key را ارسال نکن:

```
❌ id_ed25519       → محرمانه
✅ id_ed25519.pub   → قابل ارسال
```

### جمع‌بندی

```
ssh-keygen
    ↓
Generate Key Pair
    ↓
Private Key + Public Key
    ↓
ssh-copy-id
    ↓
Public Key → Server
    ↓
ssh user@server
    ↓
Key-based Authentication
```

**برای یادگیری SSH، ترتیب خوب این است:**

```
ssh-keygen
   ↓
ssh-copy-id
   ↓
~/.ssh/authorized_keys
   ↓
~/.ssh/config
   ↓
ssh user@server
```
