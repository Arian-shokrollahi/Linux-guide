# pidstat
---
# `pidstat` چیست؟

ا-`pidstat` یکی از ابزارهای پکیج **sysstat** در لینوکس است و برای **مانیتور کردن مصرف منابع توسط Processها** استفاده می‌شود.

به زبان ساده:

> ا-`ps` به تو یک عکس لحظه‌ای از processها می‌دهد، ولی `pidstat` رفتار processها را در طول زمان بررسی می‌کند.

یعنی می‌توانی ببینی یک process:

- چقدر CPU مصرف می‌کند
- چقدر RAM استفاده می‌کند
- چقدر I/O انجام می‌دهد
- چقدر context switch دارد
- چه زمانی block شده است

---

## ساختار کلی:

```
pidstat [options] [interval] [count]
```

مثال:

```
pidstat 2 5
```

یعنی:

- هر ۲ ثانیه اطلاعات بگیر
- ۵ بار نمایش بده

---

# خروجی ساده `pidstat`

دستور:

```
pidstat
```

خروجی:

```
Linux 6.x

UID       PID   %usr  %system  %CPU   CPU  Command
1000     2500   5.2     1.0     6.2    2   firefox
0        1200   0.5     0.2     0.7    1   sshd
```

ستون‌ها:

|ستون|معنی|
|---|---|
|UID|کاربر صاحب process|
|PID|شناسه process|
|%usr|مصرف CPU در فضای user|
|%system|مصرف CPU در kernel|
|%CPU|مجموع مصرف CPU|
|CPU|شماره هسته CPU|
|Command|نام برنامه|

---

# Switchهای مهم `pidstat`

## `pidstat -p`

بررسی یک PID خاص

مثال:

```
pidstat -p 2500
```

یعنی فقط process با PID 2500 را بررسی کن.

کاربرد واقعی:

وقتی یک برنامه مشکل دارد:

```
ps -ef | grep java
```

PID را پیدا می‌کنی:

```
2500
```

بعد:

```
pidstat -p 2500
```

رفتارش را بررسی می‌کنی.

---

# `pidstat -u`

نمایش مصرف CPU

```
pidstat -u
```

این حالت پیش‌فرض هم هست.

نشان می‌دهد:

- user CPU
- system CPU
- total CPU

کاربرد:  
پیدا کردن processهایی که CPU زیادی مصرف می‌کنند.

---

# `pidstat -r`

بررسی Memory

```
pidstat -r
```

اطلاعاتی مثل:

- page fault
- memory usage

را نشان می‌دهد.

کاربرد:

وقتی برنامه RAM مشکل دارد یا زیاد page fault می‌زند.

---

# `pidstat -d`

بررسی Disk I/O

```
pidstat -d
```

نشان می‌دهد:

- مقدار خواندن از disk
- مقدار نوشتن روی disk

مثال:

```
PID   kB_rd/s   kB_wr/s
2000   5000      200
```

کاربرد:

وقتی سیستم کند شده و شک داری مشکل از disk است.

---

# `pidstat -w`

بررسی Context Switch

```
pidstat -w
```

نشان می‌دهد:

- voluntary context switch
- involuntary context switch

کاربرد:

برای پیدا کردن processهایی که زیاد CPU را رها می‌کنند یا زیاد interrupt می‌شوند.

---

# `pidstat -t`

نمایش Threadها

```
pidstat -t
```

کاربرد:

برای برنامه‌هایی که thread زیاد دارند:

- Java
- Database
- Web Server

---

# ترکیب‌های خیلی کاربردی برای Admin

## بررسی CPU یک برنامه:

```
pidstat -p 1234 -u 2
```

یعنی:

PID 1234 را هر ۲ ثانیه بررسی کن.

---

## بررسی کامل یک process:

```
pidstat -p 1234 -r -d -u 2
```

بررسی:

- CPU
- RAM
- Disk I/O

---

## مانیتور کردن همه processها:

```
pidstat -u 5
```

هر ۵ ثانیه وضعیت CPU را نشان می‌دهد.

---

# تفاوت `ps` و `pidstat`

|دستور|کاربرد|
|---|---|
|`ps`|وضعیت فعلی process|
|`top`|مانیتور زنده همه processها|
|`pidstat`|تحلیل مصرف منابع یک process در طول زمان|

---

برای یک Linux Admin، `pidstat` بیشتر زمانی استفاده می‌شود که:

- یک سرویس کند شده
- CPU بالا رفته
- یک process مشکوک داری
- می‌خواهی بفهمی مشکل از CPU است یا Memory یا Disk

سه دستور خیلی کاربردی کنار هم:

```
ps -ef
top
pidstat -p PID -u -r -d 2
```

این‌ها ابزارهای اصلی برای عیب‌یابی Process هستند.
