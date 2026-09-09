در Linux وقتی با دستورهایی مثل `ps` کار می‌کنی، ستون `STAT` فقط یک حرف نیست. ممکن است چند حرف کنار هم ببینی:

مثلاً:

```
ps aux
```

خروجی:

```
USER   PID  STAT  COMMAND
root   1    Ss    systemd
root   500  Sl    nginx
user   900  R+    vim
```

در اینجا:

- **حرف اول** = وضعیت اصلی Process (**Main State**)
- **حروف بعدی** = Modifier یا Flagهای اضافی

---

# بخش اول: Statهای ترکیبی (Combined States)

## 1) `Ss`

### معنی:

```
S = Sleeping
s = Session Leader
```

یعنی:

> ا-Process خوابیده است و Leader یک Session است.

---

### ا-Session Leader چیست؟

در Linux Processها می‌توانند عضو یک Session باشند.

مثلاً وقتی Login می‌کنی:

```
Terminal
   |
 bash
   |
 commands
```

معمولاً اولین Process یک Session Leader می‌شود.

---

### مثال:

```
ps -eo pid,stat,cmd
```

ممکن است ببینی:

```
1 Ss /sbin/init
```

یعنی:

- systemd در حالت Sleep است
- Session Leader است

---

# 2) `Sl`

### معنی:

```
S = Sleeping
l = Multi-threaded
```

یعنی:

> Process خوابیده است و چند Thread دارد.

---

مثال:

برنامه‌هایی مثل:

- Java Application
- Chrome
- Database

چند Thread دارند.

مثلاً:

```
1234 Sl java
```

یعنی:

```
Sleeping
+
Multi-thread
```

---

# 3) `R+`

### معنی:

```
R = Running
+ = Foreground Process Group
```

یعنی:

> Process در حال اجراست و به Terminal فعلی وصل است.

---

مثال:

وقتی اجرا می‌کنی:

```
vim file.txt
```

ممکن است:

```
R+ vim
```

ببینی.

---

علامت `+` یعنی:

این Process متعلق به Foreground Terminal Group است.

---

# 4) `Ss+`

ترکیبی از سه چیز:

```
S = Sleeping
s = Session Leader
+ = Foreground
```

یعنی:

- خوابیده
- Session Leader است
- در Foreground Terminal قرار دارد

---

مثلاً:

```
bash
```

ممکن است چنین حالتی داشته باشد.

---

# 5) `Ssl`

یعنی:

```
S = Sleeping
s = Session Leader
l = Multi-threaded
```

یعنی:

Process:

- خوابیده
- Session Leader
- دارای چند Thread

---

# 6) `Z`

Zombie معمولاً modifier ندارد.

مثلاً:

```
Z
```

یا:

```
Z+
```

یعنی:

Process تمام شده ولی Parent هنوز آن را جمع نکرده.

---

# بخش دوم: Modifier های مهم در STAT

حالا خود Modifierها:

---

# `<` → High Priority

مثال:

```
R<
```

معنی:

Process در حال اجراست و Priority بالایی دارد.

معمولاً Processهایی که:

- Real-time هستند
- Priority بالا دارند

این را می‌گیرند.

---

# `N` → Low Priority

مثال:

```
SN
```

یعنی:

Process:

- Sleeping است
- Nice Value مثبت دارد

مثلاً:

```
nice -n 10 command
```

---

# `L` → Locked Memory

مثال:

```
SL
```

یعنی:

Process حافظه‌ای دارد که Lock شده.

یعنی Kernel اجازه نمی‌دهد آن بخش Memory به Swap برود.

کاربرد در:

- Database
- Real-time applications

---

# `s` → Session Leader

مثال:

```
Ss
```

یعنی:

Process Leader یک Session است.

---

# `l` → Multi-threaded

مثال:

```
Sl
```

یعنی:

Process چند Thread دارد.

بررسی:

```
ps -eLf
```

---

# `+` → Foreground Process Group

مثال:

```
R+
```

یعنی:

Process به Terminal فعلی متصل است.

مثلاً:

```
Terminal
   |
   vim
```

---

# `STAT` Modifier Summary

|Modifier|معنی|مثال|
|---|---|---|
|`<`|Priority بالا|`R<`|
|`N`|Nice شده / Priority پایین|`SN`|
|`L`|Locked Memory|`SL`|
|`s`|Session Leader|`Ss`|
|`l`|Multi-threaded|`Sl`|
|`+`|Foreground Process|`R+`|

---

# چند نمونه واقعی

## مثال 1:

```
1234 Ss systemd
```

تحلیل:

```
S → Sleeping
s → Session Leader
```

---

## مثال 2:

```
2000 Sl java
```

تحلیل:

```
S → Sleeping
l → Multi-thread
```

---

## مثال 3:

```
5000 R+ vim
```

تحلیل:

```
R → Running
+ → Foreground
```

---

## مثال 4:

```
7000 SN backup
```

تحلیل:

```
S → Sleeping
N → Low Priority
```

---

# چیزی که برای Linux Admin باید بلد باشی:

وقتی در `ps` یا `htop` چیزی مثل:

```
Ssl+
```

دیدی، از چپ به راست بخوان:

```
S = State اصلی
s = Session Leader
l = Multi-thread
+ = Foreground
```
