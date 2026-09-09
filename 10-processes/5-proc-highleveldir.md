# ا-`/proc` در Linux چیست؟

ا-`/proc` یکی از مهم‌ترین بخش‌های Linux برای **Process Management، Debugging و Security** است.

به زبان ساده:

> ا-`/proc` یک **Virtual File System** است که Kernel اطلاعات زنده‌ی سیستم و Processها را داخل آن نمایش می‌دهد.

یعنی فایل‌های داخل `/proc` واقعاً روی Disk ذخیره نشده‌اند؛ بلکه Kernel در لحظه آن‌ها را تولید می‌کند.

---

## ا-`/proc` چگونه کار می‌کند؟

وقتی یک Process اجرا می‌شود، Kernel برای آن یک Directory داخل `/proc` با نام **PID آن Process** ایجاد می‌کند.

مثلاً:

فرض کن Process زیر را داریم:

```
ps aux | grep nginx
```

خروجی:

```
root   1234  nginx
```

Kernel یک مسیر ایجاد می‌کند:

```
/proc/1234/
```

داخل این Directory اطلاعات مربوط به همان Process وجود دارد.

ساختار کلی:

```
/proc
 |
 |-- 1/
 |-- 500/
 |-- 1234/
 |     |
 |     |-- status
 |     |-- cmdline
 |     |-- exe
 |     |-- cwd
 |     |-- fd/
 |
 |-- cpuinfo
 |-- meminfo
 |-- uptime
```

---

# چرا `/proc` مهم است؟

چون ابزارهایی مثل:

- `ps`
- `top`
- `htop`
- `lsof`
- `systemctl`

بخش زیادی از اطلاعاتشان را از `/proc` می‌گیرند.

مثلاً:

وقتی می‌زنی:

```
ps aux
```

در پشت صحنه Kernel اطلاعات Processها را از `/proc` می‌خواند.

---

# `/proc/PID/status`

یکی از مهم‌ترین فایل‌ها.

اطلاعات کلی Process را نشان می‌دهد.

مثال:

```
cat /proc/1234/status
```

خروجی:

```
Name:   nginx
State:  S (sleeping)
Pid:    1234
PPid:   1
Uid:    0
Threads: 5
VmRSS:  10240 kB
```

---

## اطلاعات مهم داخل status

|فیلد|معنی|
|---|---|
|`Name`|نام Process|
|`State`|وضعیت Process|
|`Pid`|PID|
|`PPid`|Parent PID|
|`Uid`|User اجراکننده|
|`Threads`|تعداد Threadها|
|`VmSize`|Virtual Memory|
|`VmRSS`|RAM واقعی مصرف‌شده|

---

# `/proc/PID/cmdline`

نشان می‌دهد Process با چه Commandای اجرا شده.

مثال:

```
cat /proc/1234/cmdline
```

خروجی:

```
/usr/sbin/nginx-gdaemon
```

کاربرد:

برای فهمیدن اینکه دقیقاً چه چیزی اجرا شده.

مثلاً:

دو Process:

```
python
python
```

ممکن است متفاوت باشند:

```
python backup.py
```

و:

```
python webserver.py
```

---

# `/proc/PID/exe`

نشان می‌دهد فایل اجرایی واقعی Process کجاست.

مثال:

```
ls -l /proc/1234/exe
```

خروجی:

```
/proc/1234/exe -> /usr/sbin/nginx
```

یعنی:

Process از این فایل اجرا شده:

```
/usr/sbin/nginx
```

---

## کاربرد امنیتی

اگر یک Process مشکوک ببینی:

مثلاً:

```
kworker
```

ولی:

```
ls -l /proc/PID/exe
```

نشان دهد:

```
/tmp/malware
```

مشکوک است.

---

# `/proc/PID/cwd`

Current Working Directory

یعنی:

> Process در چه Directoryای در حال اجراست.

مثال:

```
ls -l /proc/1234/cwd
```

خروجی:

```
/proc/1234/cwd -> /var/www/html
```

یعنی:

Process فعلاً داخل:

```
/var/www/html
```

کار می‌کند.

---

# `/proc/PID/fd/`

یکی از مهم‌ترین بخش‌ها برای Admin و Security.

`fd` یعنی:

```
File Descriptor
```

Linux همه چیز را مثل File می‌بیند:

- File
- Socket
- Pipe
- Device

---

مثال:

```
ls -l /proc/1234/fd/
```

خروجی:

```
0 -> /dev/null
1 -> /var/log/nginx.log
2 -> /var/log/error.log
5 -> socket:[12345]
```

---

## File Descriptorهای مهم:

|FD|معنی|
|---|---|
|`0`|stdin|
|`1`|stdout|
|`2`|stderr|

---

## کاربرد Admin:

می‌خواهی بفهمی یک Process چه فایل‌هایی را باز کرده:

```
ls -l /proc/PID/fd
```

یا راحت‌تر:

```
lsof -p PID
```

---

# `/proc/PID/environ`

ا-Environment Variableهای Process را نشان می‌دهد.

مثال:

```
cat /proc/1234/environ
```

ممکن است ببینی:

```
PATH=/usr/bin
HOME=/root
USER=root
```

---

## کاربرد امنیتی:

بررسی:

- Tokenها
- Variableهای حساس
- تنظیمات برنامه

مثلاً:

```
DATABASE_PASSWORD
API_KEY
```

ممکن است اینجا باشند.

---

# `/proc/PID/maps`

ا-Memory Mapping Process را نشان می‌دهد.

مثال:

```
cat /proc/1234/maps
```

خروجی:

```
00400000-00452000 r-xp nginx
7f800000 libc.so
```

---

یعنی:

ا-Process چه قسمت‌هایی از Memory را استفاده می‌کند.

شامل:

- برنامه اصلی
- Libraryها
- Shared Objectها

---

## کاربرد:

برای:

- Debugging
- Malware Analysis
- Memory Analysis

خیلی مهم است.

---

# چند مثال عملی برای Admin

## 1. پیدا کردن Process مشکوک

```
ps aux | grep nginx
```

PID:

```
1234
```

بررسی:

```
cat /proc/1234/status
```

---

## 2. فهمیدن برنامه واقعی

```
ls -l /proc/1234/exe
```

---

## 3. دیدن فایل‌های باز

```
ls -l /proc/1234/fd
```

---

## 4. دیدن Command کامل

```
cat /proc/1234/cmdline
```

---

# چیزهایی که یک Linux Admin باید از `/proc` بلد باشد:

|موضوع|اهمیت|
|---|---|
|مفهوم Virtual Filesystem|⭐⭐⭐|
|ارتباط PID با `/proc/PID`|⭐⭐⭐|
|`/proc/PID/status`|⭐⭐⭐|
|`/proc/PID/cmdline`|⭐⭐⭐|
|`/proc/PID/exe`|⭐⭐⭐|
|`/proc/PID/fd`|⭐⭐⭐|
|`/proc/PID/cwd`|⭐⭐|
|`/proc/PID/environ`|⭐⭐|
|`/proc/PID/maps`|⭐⭐|

---

اگر بخواهیم از دید **Linux Admin + Security** نگاه کنیم، سه فایل مهم‌تر از همه هستند:

```
/proc/PID/status   → Process چه وضعیتی دارد؟
/proc/PID/exe      → واقعاً چه چیزی اجرا شده؟
/proc/PID/fd       → چه فایل‌ها و Socketهایی باز دارد؟
```
