# ا-bzip2

ا-`bzip2` یکی دیگر از ابزارهای استاندارد Linux برای **فشرده‌سازی فایل‌ها** است. از نظر فلسفه شبیه `gzip` است: اگر یک فایل داشته باشیم و فقط بخواهیم حجم آن را کم کنیم، می‌توانیم مستقیماً از `bzip2` استفاده کنیم.

تفاوت مهم این است که `bzip2` معمولاً **compression بهتری نسبت به gzip** روی بعضی داده‌ها می‌دهد، اما در مقابل می‌تواند **CPU و زمان بیشتری** مصرف کند.

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

> ا-Compress a file with bzip2

نتیجه:

```text
access.log
    ↓
  bzip2
    ↓
access.log.bz2
```

مثل `gzip`، فایل اصلی به‌صورت پیش‌فرض بعد از compression حذف می‌شود.

برای نگه داشتن فایل اصلی:

```bash
bzip2 -k access.log
```

نتیجه:

```text
access.log
access.log.bz2
```

---

## فلسفه‌ی `bzip2`

همان مفهومی که برای `gzip` گفتیم اینجا هم برقرار است:

```text
یک فایل
   ↓
bzip2
   ↓
file.bz2
```

اما اگر چند فایل یا directory داشته باشیم:

```text
project/
├── app.py
├── config.conf
├── README.md
└── logs/
```

اول با `tar` آن‌ها را تبدیل به یک archive می‌کنیم:

```text
project/
    ↓
   tar
    ↓
project.tar
```

بعد `bzip2` آن را compress می‌کند:

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

در نتیجه:

```bash
tar -cjf project.tar.bz2 project/
```

> ا-Create a bzip2-compressed archive

اینجا:

```text
-c  → Create
-j  → bzip2
-f  → Archive filename
```

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-k`|فایل اصلی را نگه می‌دارد|
|`-d`|Decompress کردن|
|`-c`|خروجی را به stdout می‌فرستد|
|`-f`|Force؛ overwrite کردن|
|`-v`|نمایش اطلاعات هنگام اجرا|
|`-1` تا `-9`|تعیین compression level|
|`-t`|تست سالم بودن فایل|
|`-z`|Compression|
|`-q`|Quiet mode|

### ا-`-k` — Keep

به‌صورت پیش‌فرض:

```bash
bzip2 file.txt
```

فایل اصلی حذف می‌شود.

برای نگه داشتن آن:

```bash
bzip2 -k file.txt
```

> ا-Compress and keep the original

---

### ا-`-d` — Decompress

```bash
bzip2 -d file.txt.bz2
```

> ا-Decompress a bzip2 file

یا command مخصوص آن:

```bash
bunzip2 file.txt.bz2
```

پس:

```text
bzip2 -d
    ≈
bunzip2
```

---

### ا-`-c` — stdout

```bash
bzip2 -c file.txt > file.txt.bz2
```

> ا-Compress to stdout

این برای pipelineها مهم است.

مثلاً:

```bash
cat access.log | bzip2 > access.log.bz2
```

> ا-Compress piped input

---

### ا-`-v` — Verbose

```bash
bzip2 -v file.txt
```

> ا-Show compression information

---

### `-1` تا `-9` — Compression Level

مثل `gzip`، `bzip2` هم level دارد:

```text
-1 → Faster / lower memory
-9 → More compression / more resources
```

سطح پیش‌فرض معمولاً `-9` است.

مثلاً:

```bash
bzip2 -9 large-file.txt
```

> ا-Maximum compression

یا:

```bash
bzip2 -1 large-file.txt
```

> ا-Faster compression

---

### ا-`-t` — Test

برای بررسی سالم بودن فایل:

```bash
bzip2 -t backup.bz2
```

> ا-Test archive integrity

این برای backupها مفید است.

---

# 3. مثال‌های کاربردی

## مثال 1 — Compress یک فایل

```bash
bzip2 access.log
```

> ا-Compress a log file

نتیجه:

```text
access.log.bz2
```

---

## مثال 2 — فایل اصلی را نگه داریم

```bash
bzip2 -k access.log
```

> ا-Compress and keep original

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

> ا-Decompress a bzip2 file

یا:

```bash
bunzip2 access.log.bz2
```

---

## مثال 4 — تست فایل

```bash
bzip2 -t backup.bz2
```

> ا-Test file integrity

---

## مثال 5 — استفاده با Pipeline

```bash
ps aux | bzip2 > processes.txt.bz2
```

> ا-Compress command output

و برای خواندن:

```bash
bzip2 -dc processes.txt.bz2
```

> ا-Decompress to stdout

---

## مثال 6 — ترکیب `tar + bzip2`

یکی از مهم‌ترین کاربردهای `bzip2`:

```bash
tar -cjf backup.tar.bz2 /data/
```

> ا-Create a bzip2-compressed archive

ساختار:

```text
/data/
   ↓
 tar
   ↓
backup.tar
   ↓
bzip2
   ↓
backup.tar.bz2
```

برای Extract:

```bash
tar -xjf backup.tar.bz2
```

> Extract a bzip2-compressed archive

اینجا:

```text
-c → Create
-x → Extract
-j → bzip2
-f → Filename
```

---

# 4. bzip2 کجا به دردمان می‌خورد؟

برای SysAdmin / DevOps، بیشتر با این حالت‌ها مواجه می‌شوی:

### 1. Compression فایل‌ها

```bash
bzip2 large-file.txt
```

وقتی یک فایل را می‌خواهی compress کنی.

---

### 2. Backup / Archive

```bash
tar -cjf backup.tar.bz2 /data/
```

وقتی چند فایل و directory داری و می‌خواهی:

```text
Archive + Compression
```

انجام بدهی.

---

### 3. Log files

مثلاً log قدیمی:

```bash
bzip2 old.log
```

به:

```text
old.log.bz2
```

تبدیل می‌شود.

---

# مقایسه‌ی `gzip` و `bzip2`

به‌صورت مفهومی:

|ویژگی|`gzip`|`bzip2`|
|---|---|---|
|Compression|خوب|معمولاً بهتر|
|سرعت|معمولاً سریع‌تر|معمولاً کندتر|
|CPU|کمتر|بیشتر|
|پسوند|`.gz`|`.bz2`|
|Decompress command|`gzip -d` / `gunzip`|`bzip2 -d` / `bunzip2`|
|با `tar`|`tar.gz`|`tar.bz2`|
|کاربرد|عمومی و بسیار رایج|وقتی compression بیشتر ارزش دارد|

البته میزان compression کاملاً به نوع داده بستگی دارد؛ بنابراین نمی‌توان گفت `bzip2` همیشه خروجی کوچک‌تری از `gzip` می‌دهد.

---

# 🧠 Mental Model

سه ابزار مهمی که تا اینجا یاد گرفتی:

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
tar + gzip
    ↓
backup.tar.gz
```

و:

```text
tar + bzip2
    ↓
backup.tar.bz2
```

### مهم‌ترین commandها

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

**یک نکته‌ی مهم برای مسیر یادگیریت:** فعلاً لازم نیست `bzip2` را مثل `tar` خیلی عمیق حفظ کنی. چیزی که باید واقعاً در ذهنت بنشیند این است که `bzip2` یک **compression tool** است و `tar -j` یعنی «archive را با bzip2 فشرده کن».
