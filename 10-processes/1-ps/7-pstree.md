## `pstree`

`pstree` یک دستور برای نمایش **Processها به شکل درختی (Process Tree)** است.

برخلاف `ps` که معمولاً یک لیست نشان می‌دهد، `pstree` از همان اول رابطه‌ی **Parent → Child** را واضح نمایش می‌دهد.

---

### اجرای ساده:

```
pstree
```

خروجی نمونه:

```
systemd─┬─sshd───bash───vim
        ├─nginx───nginx
        ├─cron
        └─mysql
```

یعنی:

```
systemd
 ├── sshd
 │    └── bash
 │         └── vim
 │
 ├── nginx
 │    └── nginx worker
 │
 ├── cron
 │
 └── mysql
```

---

# کاربرد اصلی `pstree`

## 1) دیدن Parent و Child Processها

مثلاً می‌خواهی ببینی یک برنامه توسط چه چیزی اجرا شده:

```
pstree
```

می‌بینی:

```
systemd
 └── sshd
      └── bash
           └── python app.py
```

یعنی:

- `systemd` → parent اصلی
- `sshd` → child آن
- `bash` → child sshd
- `python` → child bash

---

# گزینه‌های مهم `pstree`

## `pstree -p`

نمایش PID هر process کنار آن:

```
pstree -p
```

خروجی:

```
systemd(1)─┬─sshd(500)───bash(700)───vim(900)
           └─nginx(1000)
```

خیلی کاربردی برای پیدا کردن PID است.

---

## `pstree -u`

نمایش User صاحب process:

```
pstree -u
```

مثال:

```
systemd
 ├─sshd(root)
 │   └─bash(arian)
 └─mysql(mysql)
```

---

## `pstree -a`

نمایش argumentهای command:

```
pstree -a
```

مثال:

```
python app.py --port 8080
```

به جای فقط:

```
python
```

---

## `pstree -p -a`

یکی از کاربردی‌ترین حالت‌ها:

```
pstree -pa
```

نمایش:

- اسم process
- PID
- argumentها

مثال:

```
systemd(1)
 └─sshd(500)
     └─bash(700)
         └─python(900) app.py --port 8080
```

---

# تفاوت `pstree` و `ps -ef --forest`

|دستور|کاربرد|
|---|---|
|`pstree`|فقط تمرکز روی ساختار درختی|
|`pstree -p`|درخت + PID|
|`ps -ef --forest`|درخت + جزئیات کامل process|
|`ps auxf`|درخت + مصرف منابع|

---

# استفاده واقعی در مدیریت سیستم

وقتی یک سرویس مشکل دارد، معمولاً:

```
pstree -p
```

می‌زنی تا ببینی:

- چه کسی آن را اجرا کرده؟
- parent آن چیست؟
- چند child ساخته؟
- PID آن چیست؟

مثلاً:

```
systemd(1)
 └─java(2000)
     ├─worker(2100)
     ├─worker(2200)
     └─worker(2300)
```

می‌فهمی برنامه‌ی Java سه worker ساخته.

---

برای یک Linux Admin این سه دستور کنار هم خیلی مهم هستند:

```
ps -ef --forest
pstree -p
pstree -pa
```

چون تقریباً تمام ساختار Process Tree سیستم را بهت نشان می‌دهند.