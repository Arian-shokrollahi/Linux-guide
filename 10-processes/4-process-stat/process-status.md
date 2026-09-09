# اProcess States در Linux چیست؟

در Linux هر **Process** در طول زندگی خود در وضعیت‌های مختلفی قرار می‌گیرد. این وضعیت‌ها به Kernel نشان می‌دهند که Process در چه مرحله‌ای قرار دارد؛ آیا در حال اجراست، منتظر چیزی است، متوقف شده یا تمام شده است.

وقتی با ابزارهایی مثل:

```
ps aux
```

یا:

```
htop
```

کار می‌کنیم، یک ستون به نام:

```
STAT
```

وجود دارد که وضعیت Process را نشان می‌دهد.

مثلاً:

```
PID   STAT   COMMAND
1234   S     nginx
5678   R     python
9000   Z     myprogram
```

در Linux یک Process فقط یک حالت ساده ندارد؛ ممکن است چند **State Flag** داشته باشد.

مثلاً:

```
Ss
Sl
R+
Z
```

حرف اول State اصلی است و حروف بعدی اطلاعات اضافی هستند.

---

# بخش اول: جدول کلی Process Stateها

|State|نام کامل|مفهوم کلی|
|---|---|---|
|`R`|Running / Runnable|Process در حال اجرا یا آماده اجرا روی CPU|
|`S`|Sleeping|Process منتظر یک Event است|
|`D`|Uninterruptible Sleep|Process در انتظار Kernel یا I/O است|
|`T`|Stopped / Traced|Process متوقف شده|
|`Z`|Zombie|Process تمام شده ولی Entry آن باقی مانده|
|`I`|Idle Kernel Thread|Threadهای بیکار Kernel|

---

# بخش دوم: توضیح کامل هر State

---

# 1) `R` → Running / Runnable

## مفهوم:

`R` یعنی Process:

- الان روی CPU اجرا می‌شود
- یا آماده اجراست ولی منتظر CPU است

مثال:

```
yes > /dev/null
```

این Process دائماً CPU مصرف می‌کند.

در `htop`:

```
R  yes
```

می‌بینی.

---

## چه زمانی می‌بینیم؟

معمولاً برای:

- برنامه‌های محاسباتی
- Compilerها
- Encryption
- پردازش سنگین

مثلاً:

```
python script.py
```

که CPU زیادی مصرف می‌کند.

---

## نکته Admin:

اگر تعداد زیادی Process در حالت `R` باشند:

```
R R R R R
```

یعنی:

- CPU تحت فشار است
- Load Average بالا می‌رود

بررسی:

```
uptime
```

یا:

```
top
```

---

# 2) `S` → Sleeping

## مفهوم:

ا-Process فعلاً کاری برای انجام دادن ندارد و منتظر یک اتفاق است.

مثلاً:

- دریافت Network
- خواندن فایل
- ورود کاربر

---

مثال:

یک SSH Server:

```
sshd
```

وقتی کسی وصل نشده:

```
S sshd
```

است.

---

## چرخه معمول Process:

بیشتر Processها دائماً بین این حالت‌ها حرکت می‌کنند:

```
Sleeping
    |
    | Event happens
    ↓
Running
    |
    | کار تمام شد
    ↓
Sleeping
```

---

## نکته Admin:

دیدن تعداد زیاد `S` معمولاً مشکل نیست.

اکثر سرویس‌ها باید Sleeping باشند.

---

# 3) `D` → Uninterruptible Sleep ⭐

## مفهوم:

ا-Process در حال انتظار برای یک عملیات Kernel است.

معمولاً:

- Disk I/O
- Storage
- Network filesystem

---

مثال:

فرض کن:

```
Application
     |
     |
 Read File
     |
     ↓
 Hard Disk
```

تا Disk جواب ندهد:

```
D
```

می‌شود.

---

## چرا مهم است؟

چون Process در حالت `D`:

- حتی SIGTERM را هم معمولاً دریافت نمی‌کند
- نمی‌توانی راحت kill کنی

مثلاً:

```
kill PID
```

ممکن است جواب ندهد.

---

## دلایل رایج:

- خراب بودن Disk
- مشکل NFS
- Storage کند
- I/O زیاد

بررسی:

```
iostat
```

یا:

```
top
```

---

# 4) `T` → Stopped / Traced

## مفهوم:

Process متوقف شده ولی هنوز وجود دارد.

دو حالت دارد:

### حالت اول: توسط کاربر

مثلاً:

```
Ctrl + Z
```

می‌زنی:

```
T
```

می‌شود.

---

### حالت دوم: Debugging

ابزارهایی مثل:

```
gdb
strace
```

می‌توانند Process را متوقف کنند.

---

## ادامه دادن Process:

با:

```
kill -CONT PID
```

مثلاً:

قبل:

```
T python
```

بعد:

```
S python
```

---

# 5) `Z` → Zombie Process ⭐⭐⭐

یکی از مهم‌ترین‌ها برای Admin.

## مفهوم:

Zombie یعنی:

> ا-Process تمام شده ولی اطلاعات خروج آن هنوز توسط Parent خوانده نشده است.

---

ساختار:

```
Parent Process
       |
       |
       Child Process
              |
              |
           exit()
              |
              ↓
          Zombie
```

---

## چرا ایجاد می‌شود؟

Child باید:

```
wait()
```

را از Parent دریافت کند.

اگر Parent این کار را نکند:

Child Zombie می‌شود.

---

## ویژگی Zombie:

Zombie:

- CPU مصرف نمی‌کند
- اجرا نمی‌شود
- RAM زیادی مصرف نمی‌کند

اما:

- یک PID اشغال می‌کند

---

## پیدا کردن Zombie:

```
ps aux | grep Z
```

یا:

```
ps -eo pid,stat,cmd | grep Z
```

---

# 6) `I` → Idle

## مفهوم:

معمولاً مربوط به:

```
Kernel Threads
```

است.

مثلاً:

```
kworker
```

---

این Threadها زمانی که کاری ندارند Idle هستند.

---

# State های ترکیبی در STAT

در `ps` فقط یک حرف نمی‌بینی.

مثلاً:

```
Ss
```

یا:

```
Sl
```

حرف اول:

State اصلی

حروف بعدی:

Modifier

---

## Modifier های مهم

|حرف|معنی|
|---|---|
|`<`|Priority بالا|
|`N`|Priority پایین|
|`s`|Session Leader|
|`l`|Multi-threaded|
|`+`|داخل Foreground Process Group|
|`L`|Locked Memory|

---

## مثال:

### `Ss`

یعنی:

```
S = Sleeping
s = Session Leader
```

مثلاً:

```
sshd
```

---

### `Sl`

یعنی:

```
S = Sleeping
l = Multi-threaded
```

مثلاً:

```
java
```

---

### `R+`

یعنی:

```
R = Running
+ = Foreground
```

مثلاً برنامه‌ای که در Terminal اجرا شده.

---

# چیزی که یک Linux Admin باید حفظ باشد:

|State|معنی|مشکل است؟|
|---|---|---|
|`R`|Running|اگر زیاد باشد CPU مشکل دارد|
|`S`|Sleeping|طبیعی است|
|`D`|Waiting for I/O|اگر زیاد بماند مشکل Storage|
|`T`|Stopped|معمولاً توسط User/Debugger|
|`Z`|Zombie|مشکل Parent Process|
|`I`|Idle Kernel Thread|طبیعی|

---

برای Administration بیشتر از همه باید روی این‌ها تمرکز کنی:

1. **R → چرا CPU بالاست؟**
2. **D → چرا Process گیر کرده؟**
3. **Z → کدام Parent Zombie ساخته؟**
4. **S → آیا طبیعی است یا سرویس گیر کرده؟**

این چهار مورد در Troubleshooting روزمره Linux بیشترین کاربرد را دارن
