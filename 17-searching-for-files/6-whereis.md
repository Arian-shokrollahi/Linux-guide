
# ا-`whereis`

## 1. توضیح و ساختار

ا-`whereis` برای پیدا کردن **مکان فایل‌های مرتبط با یک command** استفاده می‌شود؛ مثل executable، source code و `man page`.

برخلاف `which` که معمولاً فقط executable داخل `PATH` را پیدا می‌کند، `whereis` می‌تواند اطلاعات بیشتری درباره‌ی یک برنامه نشان دهد.

### ساختار کلی

```
whereis [OPTIONS] COMMAND
```

مثلاً:

```
whereis ssh
```

>ا- Find files related to `ssh`

ممکن است خروجی شبیه این باشد:

```
ssh: /usr/bin/ssh /usr/share/man/man1/ssh.1.gz
```

یعنی:

```
/usr/bin/ssh
        → executable

/usr/share/man/man1/ssh.1.gz
        → man page
```

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-b`|فقط executable (binary) را جستجو می‌کند|
|`-m`|فقط `man page` را جستجو می‌کند|
|`-s`|فقط source code را جستجو می‌کند|
|`-u`|فقط موارد غیرمعمول یا ناقص را نمایش می‌دهد|
|`-B`|تعیین directoryهای جستجوی binary|
|`-M`|تعیین directoryهای جستجوی man page|
|`-S`|تعیین directoryهای جستجوی source|

### مهم‌ترین‌ها

برای شروع بیشتر این‌ها مهم هستند:

```
-b
-m
-s
```

---

# 3. مثال‌های کاربردی

### پیدا کردن تمام اطلاعات مربوط به command

```
whereis ssh
```

>ا- Find `ssh` binary and man page

---

### فقط executable

```
whereis -b ssh
```

> ا-Find only the binary

---

### فقط `man page`

```
whereis -m ssh
```

> ا-Find the man page

---

### فقط source code

```
whereis -s ssh
```

>ا- Find the source code

---

### چند command همزمان

```
whereis bash ssh python
```

> ا-Find information about multiple commands

---

# 4. ا-`whereis` کجا به دردمان می‌خورد؟

ا-`whereis` زمانی مفید است که بخواهی **سریع بفهمی یک برنامه چه فایل‌های مرتبطی روی سیستم دارد**؛ مخصوصاً executable و documentation آن.

مثلاً:

```
whereis nginx
```

می‌تواند به تو مسیر binary و `man page`های مربوط به Nginx را نشان دهد.

### تفاوت مهم با `which` و `type`

```
type
 ↓
Shell این command را چگونه resolve می‌کند؟
alias / function / builtin / file


which
 ↓
executable از کدام مسیر PATH اجرا می‌شود؟


whereis
 ↓
فایل‌های مرتبط با برنامه کجا هستند؟
binary / man page / source
```

پس برای مستنداتت این سه‌تا را کنار هم نگه دار:

**`type` → رفتار Shell**  
**`which` → مسیر executable در PATH**  
**`whereis` → مکان فایل‌های مرتبط با برنامه**
