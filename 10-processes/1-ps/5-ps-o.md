## ا-`ps -o` چیست؟

ا-`ps -o` برای **انتخاب ستون‌های خروجی به صورت دستی** استفاده می‌شود.

فرمت کلی:

```
ps -o field1,field2,field3
```

مثلاً:

```
ps -o pid,user,%cpu,%mem,cmd
```

یعنی فقط این اطلاعات را نشان بده:

- PID
- User
- CPU
- Memory
- Command

---

## فیلدهایی که می‌توان بعد از `ps -o` استفاده کرد

|Field|چیزی که نشان می‌دهد|کاربرد|
|---|---|---|
|`pid`|Process ID|شناسه هر process|
|`ppid`|Parent Process ID|شناسه parent process|
|`pgid`|Process Group ID|گروه process|
|`sid`|Session ID|session مربوط به process|
|`user`|نام کاربر صاحب process|اینکه process متعلق به چه کسی است|
|`uid`|User ID|شناسه عددی کاربر|
|`group`|گروه کاربر|گروهی که process با آن اجرا شده|
|`gid`|Group ID|شناسه عددی گروه|
|`comm`|نام کوتاه برنامه|اسم خود executable|
|`args`|دستور کامل اجرا شده|command به همراه argumentها|
|`cmd`|command کامل|معمولاً مشابه args|
|`%cpu`|درصد مصرف CPU|میزان استفاده از پردازنده|
|`%mem`|درصد مصرف RAM|میزان استفاده از حافظه|
|`vsz`|Virtual Memory Size|کل حافظه مجازی process|
|`rss`|Resident Set Size|مقدار واقعی RAM مصرفی|
|`tty`|Terminal متصل|ترمینالی که process دارد|
|`stat`|وضعیت process|Running, Sleeping و ...|
|`etime`|زمان سپری شده از شروع|عمر process|
|`etimes`|عمر process به ثانیه|مقدار عددی عمر process|
|`start`|زمان شروع process|چه زمانی اجرا شده|
|`time`|زمان CPU مصرف شده|زمان واقعی استفاده CPU|
|`priority`|Priority process|اولویت اجرای process|
|`ni`|Nice value|میزان اولویت‌بندی process|
|`lstart`|زمان کامل شروع|تاریخ و ساعت دقیق شروع|
|`wchan`|محل انتظار kernel|اینکه process منتظر چه چیزی است|
|`state`|وضعیت process|حالت پردازشی|

---

## مواردی که در کار ادمین خیلی استفاده می‌شوند

### 1) دیدن process و parent آن

```
ps -eo pid,ppid,cmd
```

خروجی:

```
PID    PPID    CMD
1000   1       sshd
1200   1000    bash
1300   1200    vim
```

برای فهمیدن **Process Tree** خیلی کاربردی است.

---

### 2) بررسی مصرف منابع

```
ps -eo pid,user,%cpu,%mem,cmd
```

نشان می‌دهد:

- چه کسی process را اجرا کرده
- چقدر CPU مصرف می‌کند
- چقدر RAM مصرف می‌کند

---

### 3) دیدن وضعیت processها

```
ps -eo pid,stat,cmd
```

مثلاً:

```
PID    STAT   CMD
1000   Ss     sshd
1200   S      bash
1300   R      python
```

---

### 4) دیدن session و group

```
ps -eo pid,pgid,sid,cmd
```

برای بررسی process group و sessionها استفاده می‌شود.

---

### پرکاربردترین ترکیب‌هایی که یک Linux Admin باید بلد باشد:

```
ps -eo pid,ppid,user,cmd
```

برای ساختار processها

```
ps -eo pid,%cpu,%mem,cmd --sort=-%cpu
```

برای پیدا کردن پردازنده‌خورترین processها

```
ps -eo pid,%mem,cmd --sort=-%mem
```

برای پیدا کردن RAM‌خورترین processها

```
ps -eo lstart,pid,cmd
```

برای دیدن زمان شروع processها

---

خلاصه‌ی مهم:

ا-`ps -o` یعنی:

> ا-«ps، فقط این اطلاعاتی که من می‌خواهم را نشان بده، نه همه چیز را.»

و برای یک ادمین، مهم‌ترین fieldها معمولاً این‌ها هستند:

```
pid
ppid
user
cmd
%cpu
%mem
stat
tty
etime
pgid
sid
```
