## ا-`ps -ef --forest`

این دستور یکی از دستورهای خیلی مهم برای دیدن **ساختار درختی Processها** در لینوکس است.

ترکیب چند بخش است:

```
ps -ef --forest
```

---

## 1) `ps`

دستور نمایش processها:

```
ps
```

اطلاعات مربوط به processهای در حال اجرا را نشان می‌دهد.

---

## 2) `-e`

یعنی:

> نمایش **تمام processهای سیستم**

معادل:

```
ps -A
```

بدون `-e` معمولاً فقط processهای مربوط به ترمینال فعلی یا کاربر فعلی را می‌بینی.

مثال:

```
ps -e
```

نمایش می‌دهد:

- processهای root
- processهای userها
- سرویس‌های سیستم
- daemonها

---

## 3) `-f`

یعنی:

> نمایش Full Format

اطلاعات بیشتری درباره هر process نشان می‌دهد.

مثلاً:

```
ps -ef
```

خروجی:

```
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 10:00 ?        00:00:05 /sbin/init
root       500     1  0 10:01 ?        00:00:01 sshd
user       700   500  0 10:02 pts/0    00:00:00 bash
```

ستون‌های مهم:

|ستون|معنی|
|---|---|
|UID|کاربر صاحب process|
|PID|شناسه process|
|PPID|شناسه parent process|
|C|میزان مصرف CPU|
|STIME|زمان شروع|
|TTY|ترمینال|
|TIME|زمان مصرف CPU|
|CMD|دستور اجرا شده|

---

## 4) `--forest`

این گزینه processها را به شکل **درختی (Tree)** نمایش می‌دهد.

مثلاً:

```
root
 ├─ systemd
 │   ├─ sshd
 │   │   └─ bash
 │   │       └─ vim
 │   └─ nginx
 └─ cron
```

یعنی:

- چه processای parent است
- چه processهایی child آن هستند

---

## کاربرد واقعی برای Admin

### 1) پیدا کردن Parent و Child Processها

مثلاً:

```
ps -ef --forest
```

می‌بینی:

```
root       1     0  /sbin/init
 ├─root   500    1  sshd
 │ └─user 700  500  bash
 │    └─user 900 700 python app.py
```

اینجا مشخص است:

```
init
 └── sshd
      └── bash
           └── python
```

---

### 2) پیدا کردن اینکه یک سرویس توسط چه چیزی اجرا شده

مثلاً nginx:

```
systemd
 └── nginx
      ├── nginx worker
      └── nginx worker
```

---

### 3) عیب‌یابی Processهای خراب

مثلاً یک برنامه چندین child process ساخته:

```
java
 ├── worker1
 ├── worker2
 ├── worker3
 └── worker4
```

با `--forest` سریع متوجه می‌شوی.

---

## دستورهای مشابه مهم

نمایش همه processها به شکل tree:

```
ps axf
```

یا:

```
ps auxf
```

تفاوت:

|دستور|کاربرد|
|---|---|
|`ps -ef --forest`|سبک استاندارد Unix، با PPID واضح|
|`ps auxf`|نمایش جزئیات بیشتر با فرمت BSD|
|`pstree`|فقط نمایش درخت processها|

---

برای یک Linux Admin این دستوََر خیلی مهم َاست:

```
ps -ef --forest
```

چون بهت کمک می‌کند **رابطه‌ی Parent/Child Processها** را در سیستم ببینی
