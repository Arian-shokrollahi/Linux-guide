# passwd command
---
دستور **`passwd`**؛ این دستور برای **تغییر یا مدیریت Password کاربران لینوکس** استفاده می‌شود.

# ا-`passwd` چیست؟

ساختار کلی:

```
passwd [OPTIONS] [USERNAME]
```

ساده‌ترین حالت:

```
passwd
```

یعنی **رمز عبور کاربر فعلی** را تغییر بده.

مثلاً:

```
passwd
```

سیستم ازت می‌پرسد:

```
Current password:
New password:
Retype new password:
```

---

## تغییر Password یک User دیگر

اگر دسترسی `root` یا `sudo` داشته باشی:

```
sudo passwd ali
```

یعنی Password کاربر `ali` را تغییر بده.

در این حالت معمولاً لازم نیست Password قبلی `ali` را بدانی.

---

# ا-Switchهای مهم `passwd`

|Switch|کاربرد|
|---|---|
|`-d`|حذف Password کاربر|
|`-l`|Lock کردن حساب|
|`-u`|Unlock کردن حساب|
|`-S`|نمایش وضعیت Password|
|`-e`|منقضی کردن Password|
|`-n`|حداقل تعداد روز قبل از تغییر مجدد Password|
|`-x`|حداکثر تعداد روز اعتبار Password|
|`-w`|چند روز قبل از انقضا هشدار بدهد|
|`-i`|چند روز بعد از انقضای Password حساب غیرفعال شود|

---

## `-S` — دیدن وضعیت Password

خیلی کاربردی:

```
passwd -S
```

یا برای User خاص:

```
sudo passwd -S ali
```

مثلاً ممکن است ببینی:

```
ali P 09/08/2026 0 99999 7 -1
```

مهم‌ترین قسمت:

```
P
```

یعنی Password تنظیم شده است.

ممکن است وضعیت‌هایی مثل:

```
P = Password set
L = Locked
NP = No Password
```

ببینی.

---

## `-l` — Lock

```
sudo passwd -l ali
```

حساب را از نظر Password **Lock** می‌کند.

یعنی Login با Password برای آن حساب محدود می‌شود.

---

## `-u` — Unlock

```
sudo passwd -u ali
```

حساب را Unlock می‌کند.

---

## `-d` — حذف Password

```
sudo passwd -d ali
```

Password کاربر را حذف می‌کند.

⚠️ این گزینه خطرناک است و باید با احتیاط استفاده شود، چون وضعیت Authentication حساب را تغییر می‌دهد.

---

## `-e` — مجبور کردن به تغییر Password

```
sudo passwd -e ali
```

Password را منقضی می‌کند تا کاربر در Login بعدی مجبور به تغییر آن شود.

---

# مدیریت عمر Password

مثلاً:

```
sudo passwd -n 5 ali
```

یعنی کاربر حداقل **۵ روز** نمی‌تواند Password را دوباره تغییر دهد.

---

```
sudo passwd -x 90 ali
```

یعنی Password حداکثر **۹۰ روز** معتبر باشد.

---

```
sudo passwd -w 7 ali
```

یعنی **۷ روز قبل از انقضا** به کاربر هشدار داده شود.

---

```
sudo passwd -i 10 ali
```

یعنی اگر Password منقضی شد، بعد از **۱۰ روز** حساب غیرفعال شود.

---

# یک مثال کامل

فرض کن User داریم:

```
ali
```

می‌خواهیم Password آن را تنظیم کنیم:

```
sudo passwd ali
```

بعد وضعیتش را بررسی کنیم:

```
sudo passwd -S ali
```

مثلاً:

```
ali P 09/08/2026 0 90 7 -1
```

بعد حداکثر عمر Password را 90 روز کنیم:

```
sudo passwd -x 90 ali
```

و 7 روز قبل هشدار بدهیم:

```
sudo passwd -w 7 ali
```

---

## خلاصه برای جزوه

```
passwd
│
├── passwd
│   └── تغییر Password خودت
│
├── passwd USER
│   └── تغییر Password یک User
│
├── -S
│   └── نمایش وضعیت Password
│
├── -l
│   └── Lock
│
├── -u
│   └── Unlock
│
├── -d
│   └── حذف Password
│
├── -e
│   └── منقضی کردن Password
│
├── -n DAYS
│   └── حداقل عمر Password
│
├── -x DAYS
│   └── حداکثر عمر Password
│
├── -w DAYS
│   └── زمان هشدار قبل از انقضا
│
└── -i DAYS
    └── غیرفعال شدن بعد از انقضا
```

**برای سطح Linux Admin، این‌ها را حتماً بلد باش:**

```
passwd
sudo passwd USER
passwd -S
passwd -l USER
passwd -u USER
passwd -e USER
passwd -x DAYS USER
passwd -w DAYS USER
```

یک نکته مهم هم این است که `passwd` با فایل‌های `/etc/passwd` و `/etc/shadow` ارتباط دارد، ولی **Passwordهای واقعی به‌صورت متن ساده داخل `/etc/passwd` ذخیره نمی‌شوند**؛ اطلاعات مربوط به Password در `/etc/shadow` نگهداری می‌شود.
