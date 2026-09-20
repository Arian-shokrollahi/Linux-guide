# ا-bzip2

`ا-bzip2` یک ابزار برای **Compression** در Linux است. فلسفه‌اش تقریباً مثل `gzip` است: وقتی یک فایل داریم و می‌خواهیم حجم آن را کاهش دهیم، می‌توانیم آن را با `bzip2` فشرده کنیم.

تفاوت اصلی با `tar` این است که `bzip2` وظیفه‌ی **بسته‌بندی چند فایل در یک مجموعه** را ندارد؛ فقط compression انجام می‌دهد.

```text
gzip   → Compression
bzip2  → Compression
tar    → Archiving
```

---

# 1. توضیح و ساختار

ساختار کلی:

```bash
bzip2 [OPTIONS] FILE
```

مثلاً:

```bash
bzip2 access.log
```

> Compress `access.log`

قبل:

```text
access.log
```

بعد:

```text
access.log.bz2
```

یعنی:

```text
access.log
     ↓
   bzip2
     ↓
access.log.bz2
```

به‌صورت پیش‌فرض، `bzip2` بعد از compression فایل اصلی را حذف می‌کند.

اگر بخواهی فایل اصلی باقی بماند:

```bash
bzip2 -k access.log
```

> ا-Compress and keep the original

نتیجه:

```text
access.log
access.log.bz2
```

---

## فلسفه‌ی bzip2 در کنار tar

فرض کن یک فایل داریم:

```text
database.sql
```

فقط می‌خواهیم حجمش را کم کنیم:

```bash
bzip2 database.sql
```

نتیجه:

```text
database.sql.bz2
```

اما اگر یک directory داشته باشیم:

```text
project/
├── app.py
├── config.conf
├── README.md
└── logs/
    ├── access.log
    └── error.log
```

اینجا اول باید چند فایل را در یک archive قرار دهیم:

```text
project/
    ↓
   tar
    ↓
project.tar
```

بعد archive را با `bzip2` فشرده کنیم:

```text
project/
    ↓
   tar
    ↓
project.tar
    ↓
  bzip2
    ↓
project.tar.bz2
```

یا مستقیماً:

```bash
tar -cjf project.tar.bz2 project/
```

> ا-Archive and compress with bzip2

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-d`|Decompress|
|`-k`|Keep فایل اصلی|
|`-c`|خروجی به stdout|
|`-f`|Force|
|`-v`|Verbose|
|`-t`|Test integrity|
|`-1` تا `-9`|Compression level|
|`-q`|Quiet mode|

---

## ا-`-d` — Decompress

برای خارج کردن compression:

```bash
bzip2 -d file.txt.bz2
```

> ا-Decompress a bzip2 file

یا command مخصوص:

```bash
bunzip2 file.txt.bz2
```

> ا-Decompress a bzip2 file

پس:

```text
bzip2 -d
    ≈
bunzip2
```

---

## ا-`-k` — Keep

به‌صورت پیش‌فرض:

```bash
bzip2 file.txt
```

فایل اصلی حذف می‌شود.

اگر بخواهی آن را نگه داری:

```bash
bzip2 -k file.txt
```

> ا-Compress and keep original

نتیجه:

```text
file.txt
file.txt.bz2
```

---

## ا-`-c` — stdout

این option برای pipelineها خیلی مهم است:

```bash
bzip2 -c file.txt > file.txt.bz2
```

> ا-Compress to stdout

اینجا `bzip2` خروجی را به stdout می‌فرستد و `>` آن را داخل فایل قرار می‌دهد.

مثلاً:

```bash
ps aux | bzip2 > processes.txt.bz2
```

> ا-Compress command output

---

## ا-`-f` — Force

اگر فایل مقصد از قبل وجود داشته باشد:

```bash
bzip2 -f file.txt
```

> ا-Force compression

برای زمانی که می‌خواهی بدون توقف به دلیل وجود فایل مقصد، عملیات انجام شود.

---

## ا-`-v` — Verbose

```bash
bzip2 -v file.txt
```

> ا-Show compression information

اطلاعات مربوط به compression را نمایش می‌دهد.

---

## `-1` تا `-9` — Compression Level

ا-`bzip2` چند سطح compression دارد:

```text
-1 → Faster / less memory
-2
-3
...
-9 → More compression / more memory
```

مثلاً:

```bash
bzip2 -1 large-file.txt
```

> ا-Compress faster

یا:

```bash
bzip2 -9 large-file.txt
```

> ا-Use maximum compression level

در عمل، level بالاتر لزوماً به معنی کاهش بسیار زیاد حجم نیست؛ بسته به نوع داده، تفاوت می‌تواند کم باشد.

---

## ا-`-t` — Test

برای بررسی سالم بودن فایل:

```bash
bzip2 -t backup.bz2
```

> ا-Test bzip2 file integrity

اگر سالم باشد معمولاً خروجی خاصی نمی‌بینی و exit status موفق خواهد بود.

---

# 3. مثال‌های کاربردی

## مثال 1 — Compress یک فایل

```bash
bzip2 access.log
```

> Compress a log file

نتیجه:

```text
access.log.bz2
```

---

## مثال 2 — نگه داشتن فایل اصلی

```bash
bzip2 -k access.log
```

> Compress and keep original

نتیجه:

```text
access.log
access.log.bz2
```

---

## مثال 3 — Decompress

```bash
bzip2 -d access.log.bz2
```

> Decompress a log file

یا:

```bash
bunzip2 access.log.bz2
```

> Decompress a bzip2 file

---

## مثال 4 — تست سالم بودن

```bash
bzip2 -t backup.bz2
```

> Test backup integrity

برای دیدن exit status:

```bash
echo $?
```

اگر:

```text
0
```

باشد، عملیات موفق بوده است.

---

## مثال 5 — استفاده با Pipeline

```bash
ps aux | bzip2 > processes.txt.bz2
```

> Compress command output

برای خواندن بدون ساختن فایل decompressed:

```bash
bzip2 -dc processes.txt.bz2
```

> Decompress to stdout

---

## مثال 6 — `tar + bzip2`

این یکی از مهم‌ترین کاربردهای `bzip2` است:

```bash
tar -cjf backup.tar.bz2 /data/
```

> Create a bzip2-compressed archive

اینجا:

```text
-c → Create
-j → bzip2
-f → Archive filename
```

برای Extract:

```bash
tar -xjf backup.tar.bz2
```

> Extract a bzip2-compressed archive

اینجا:

```text
-x → Extract
-j → bzip2
-f → Archive filename
```

---

# 4. bzip2 کجا به دردمان می‌خورد؟

### 1. فشرده کردن فایل‌های بزرگ

مثلاً:

```bash
bzip2 database.sql
```

برای کم کردن حجم فایل.

---

### 2. Backup

وقتی چند فایل و directory داریم:

```bash
tar -cjf backup.tar.bz2 /data/
```

یعنی:

```text
/data/
   ↓
 tar
   ↓
Archive
   ↓
bzip2
   ↓
Compression
   ↓
backup.tar.bz2
```

---

### 3. Log management

برای logهای قدیمی:

```bash
bzip2 old.log
```

و نتیجه:

```text
old.log.bz2
```

---

# gzip در مقابل bzip2

|ویژگی|gzip|bzip2|
|---|---|---|
|نوع|Compression|Compression|
|پسوند|`.gz`|`.bz2`|
|سرعت|معمولاً سریع‌تر|معمولاً کندتر|
|Compression|خوب|اغلب برای داده‌های مناسب، فشرده‌تر|
|مصرف منابع|معمولاً کمتر|معمولاً بیشتر|
|Decompress|`gzip -d`|`bzip2 -d`|
|tar option|`-z`|`-j`|

یک نکته مهم: **bzip2 همیشه از gzip بهتر compress نمی‌کند.** نتیجه به نوع داده بستگی دارد.

---

# 🧠 Mental Model

این قسمت را خوب در ذهنت نگه دار:

```text
tar
 ↓
Archive
چند فایل → یک مجموعه
```

```text
gzip
 ↓
Compression
file → file.gz
```

```text
bzip2
 ↓
Compression
file → file.bz2
```

پس:

```text
چند فایل
   ↓
  tar
   ↓
archive.tar
   ↓
bzip2
   ↓
archive.tar.bz2
```

و به همین دلیل:

```bash
tar -cjf backup.tar.bz2 project/
```

یعنی:

```text
-c  → Create archive
-j  → Use bzip2
-f  → Specify filename
```

### Commandهای اصلی که باید بلد باشی

```bash
bzip2 file
bzip2 -k file
bzip2 -d file.bz2
bunzip2 file.bz2
bzip2 -t file.bz2
bzip2 -c file > file.bz2

tar -cjf backup.tar.bz2 directory/
tar -xjf backup.tar.bz2
```

**خلاصه‌ی یک‌خطی:**

> ا-`bzip2` مثل `gzip` یک ابزار **Compression** است؛ `tar` مسئول **Archive کردن** است؛ و `tar.bz2` حاصل ترکیب این دو است.