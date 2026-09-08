# ps aux --sort
---
# ا-`ps aux --sort` چیست؟

اول دستور را بشکنیم:

```
ps aux --sort
```

این دستور ترکیب چند بخش است:

---

## `ps`

نمایش processهای در حال اجرا.

---

## `a`

نمایش processهای مربوط به **همه کاربران** (نه فقط کاربر فعلی).

---

## `u`

نمایش خروجی به شکل **user-oriented** و خواناتر.

مثلاً ستون‌هایی مثل:

- USER
- PID
- %CPU
- %MEM
- VSZ
- RSS
- COMMAND

را نشان می‌دهد.

---

## `x`

نمایش processهایی که **TTY ندارند**.

یعنی processهای background مثل:

- سرویس‌ها
- daemonها

هم دیده می‌شوند.

---

پس:

```
ps aux
```

یعنی:

> همه processهای همه کاربران، حتی بدون terminal، با اطلاعات کامل نمایش بده.

---

# `--sort` چیست؟

ا-`--sort` برای **مرتب کردن خروجی `ps` بر اساس یک ستون مشخص** استفاده می‌شود.

فرمت:

```
ps aux --sort COLUMN
```

مثلاً:

```
ps aux --sort %cpu
```

ا-processها را بر اساس مصرف CPU مرتب می‌کند.

---

# چیزهایی که می‌توان بعد از `--sort` گذاشت

|گزینه بعد از `--sort`|مرتب‌سازی بر اساس|کاربرد|
|---|---|---|
|`%cpu`|مصرف CPU|پیدا کردن CPU-heavy processها|
|`%mem`|مصرف RAM|پیدا کردن RAM-heavy processها|
|`pid`|شماره PID|مرتب‌سازی بر اساس PID|
|`ppid`|Parent PID|بررسی رابطه parent/child|
|`user`|نام کاربر|دیدن processهای هر user کنار هم|
|`uid`|User ID|مرتب‌سازی بر اساس UID|
|`gid`|Group ID|مرتب‌سازی بر اساس گروه|
|`rss`|RAM واقعی مصرفی|پیدا کردن بیشترین RAM مصرفی|
|`vsz`|Virtual Memory|بررسی مصرف virtual memory|
|`etime`|زمان اجرا|پیدا کردن processهای قدیمی|
|`time`|زمان مصرف CPU|پیدا کردن processهای CPU-intensive|
|`start`|زمان شروع|مرتب‌سازی بر اساس زمان اجرا|
|`command`|نام برنامه|مرتب‌سازی بر اساس اسم برنامه|
|`tty`|ترمینال|گروه‌بندی processها بر اساس terminal|

---

# مرتب‌سازی نزولی (بیشترین به کمترین)

با `-` قبل از اسم ستون:

## بیشترین CPU:

```
ps aux --sort=-%cpu
```

مثلاً:

```
USER   PID   %CPU  COMMAND
root   500    95   java
user   700    40   firefox
```

---

## بیشترین RAM:

```
ps aux --sort=-%mem
```

خیلی کاربردی برای پیدا کردن برنامه‌هایی که RAM می‌خورند.

---

## بیشترین RAM واقعی:

```
ps aux --sort=-rss
```

فرقش با `%mem`:

- `%mem` → درصد RAM
- `rss` → مقدار واقعی RAM مصرفی

---

## قدیمی‌ترین processها:

```
ps aux --sort=etime
```

---

# دستورهای خیلی رایج Adminها

## پیدا کردن بیشترین مصرف CPU:

```
ps aux --sort=-%cpu | head
```

توضیح:

- `--sort=-%cpu` → مرتب کن از بیشترین CPU
- `head` → فقط ۱۰ تای اول را نشان بده

---

## پیدا کردن بیشترین مصرف RAM:

```
ps aux --sort=-%mem | head
```

---

## دیدن سنگین‌ترین processها:

```
ps aux --sort=-rss | head
```

---

# نکته مهم برای Admin

این سه دستور را خیلی زیاد استفاده می‌کنند:

```
ps aux --sort=-%cpu | head
```

پیدا کردن CPU خورها

```
ps aux --sort=-%mem | head
```

پیدا کردن RAM خورها

```
ps aux --sort=-rss | head
```

پیدا کردن processهایی که واقعاً RAM زیادی گرفته‌اند

خلاصه:

`ps aux --sort` یعنی:

> ا-processها را نشان بده و خروجی را بر اساس چیزی که من مشخص می‌کنم مرتب کن.
