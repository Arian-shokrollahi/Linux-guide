تفاوت `kill` و `pkill` یکی از چیزهایی است که یک Linux Admin باید دقیق بداند.

## ا-`pkill` چیست؟

ا-`pkill` مخفف **Process Kill** است و برای ارسال Signal به Processها **بر اساس نام یا ویژگی‌هایشان** استفاده می‌شود.

یعنی به جای اینکه اول PID را پیدا کنی، می‌توانی مستقیم اسم Process را بدهی.

مثلاً:

```
pkill firefox
```

یعنی:

> هر Processای که اسمش `firefox` است را پیدا کن و Signal پیش‌فرض (`SIGTERM`) را برایش ارسال کن.

---

## تفاوت اصلی `kill` و `pkill`

|ویژگی|`kill`|`pkill`|
|---|---|---|
|روش پیدا کردن Process|با PID|با نام Process یا Pattern|
|ورودی اصلی|شماره PID|اسم Process|
|تعداد Process|معمولاً یک Process|می‌تواند چند Process باشد|
|نیاز به دانستن PID|بله|خیر|
|کنترل دقیق|بیشتر|کمتر|
|خطر اشتباه|کمتر|بیشتر|

---

## مثال با `kill`

فرض کن:

```
ps aux | grep nginx
```

خروجی:

```
root   1234  nginx
root   1235  nginx
```

حالا اگر بخواهی فقط یکی را متوقف کنی:

```
kill 1234
```

فقط همان Process با PID `1234` متوقف می‌شود.

---

## مثال با `pkill`

اگر بزنی:

```
pkill nginx
```

تمام Processهایی که اسمشان nginx است Signal می‌گیرند:

```
nginx PID 1234  ❌
nginx PID 1235  ❌
nginx PID 1236  ❌
```

---

## ارسال Signal مشخص با `pkill`

مثل `kill` می‌توانی Signal تعیین کنی:

### ارسال SIGTERM:

```
pkill -TERM nginx
```

یا:

```
pkill -15 nginx
```

### ارسال SIGKILL:

```
pkill -9 nginx
```

یعنی:

```
nginx → فوراً terminate شود
```

---

## گزینه‌های مهم `pkill`

|Command|کاربرد|
|---|---|
|`pkill firefox`|کشتن Processهای firefox|
|`pkill -9 firefox`|Kill اجباری firefox|
|`pkill -u user1`|کشتن Processهای یک User|
|`pkill -f "python script.py"`|جستجو در کل Command Line|
|`pkill -x nginx`|فقط اسم دقیق nginx|

---

## تفاوت `pkill` با `killall`

یک دستور مشابه دیگر هم داریم:

```
killall nginx
```

تفاوت کلی:

|Command|روش کار|
|---|---|
|`kill PID`|یک Process مشخص|
|`pkill name`|Process بر اساس Pattern|
|`killall name`|تمام Processهای دقیقاً با آن نام|

---

## به عنوان Admin کدام را استفاده کنیم؟

ترتیب امن‌تر:

```
1) پیدا کردن Process
        ↓
ps / pgrep / htop

2) ارسال SIGTERM
        ↓
kill PID یا pkill name

3) اگر جواب نداد
        ↓
SIGKILL
kill -9 PID
```

یک نکته‌ی مهم برای Adminها:

ا-`kill` معمولاً **امن‌تر** است چون دقیقاً می‌دانی کدام PID را هدف گرفته‌ای.  
ا-`pkill` سریع‌تر است ولی اگر اشتباه اسم بدهی ممکن است چند Process مهم را همزمان متوقف کند.
