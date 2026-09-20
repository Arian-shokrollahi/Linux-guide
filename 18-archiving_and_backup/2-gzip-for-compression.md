# ا-gzip

`ا-gzip` یکی از ابزارهای استاندارد Linux برای **فشرده‌سازی فایل‌ها** است.  
برخلاف `tar`، خود `gzip` برای **archive کردن چند فایل و directory** نیست؛ معمولاً یک فایل را فشرده می‌کند و خروجی آن با پسوند `.gz` ساخته می‌شود.

> **نکته مهم:**  
> `ا-tar` → چند فایل/directory را در یک archive جمع می‌کند.  
> ا-`gzip` → داده را compress می‌کند.

---

## 1. توضیح و ساختار

### ساختار کلی

```bash
gzip [OPTIONS] FILE
```

مثلاً:

```bash
gzip access.log
```

> ا-Compress `access.log`

بعد از اجرا:

```text
access.log
    ↓
gzip
    ↓
access.log.gz
```

به‌صورت پیش‌فرض فایل اصلی `access.log` حذف می‌شود و نسخه‌ی فشرده‌شده باقی می‌ماند.

---

### یک نکته خیلی مهم

`ا-gzip` به‌تنهایی برای directory مناسب نیست:

```bash
gzip my-folder/
```

معمولاً چنین چیزی چیزی نیست که برای archive کردن یک directory استفاده کنیم.

برای directory معمولاً:

```bash
tar -czf backup.tar.gz my-folder/
```

اینجا دو مرحله داریم:

```text
my-folder/
    ↓
tar
    ↓
backup.tar
    ↓
gzip
    ↓
backup.tar.gz
```

پس:

```text
tar      → Archive
gzip     → Compression
```

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-k`|فایل اصلی را نگه می‌دارد|
|`-d`|Decompress کردن|
|`-c`|خروجی را به stdout می‌فرستد|
|`-f`|Force؛ overwrite کردن فایل موجود|
|`-v`|نمایش اطلاعات هنگام اجرا|
|`-1`|سریع‌ترین compression با compression کمتر|
|`-6`|سطح پیش‌فرض compression|
|`-9`|بیشترین compression، معمولاً کندتر|
|`-r`|به‌صورت recursive روی directoryها|
|`-t`|تست سالم بودن فایل `.gz`|
|`-l`|نمایش اطلاعات compression|

---

## ا-`-k` — Keep

به‌صورت پیش‌فرض:

```bash
gzip file.txt
```

فایل اصلی حذف می‌شود.

اگر بخواهیم فایل اصلی باقی بماند:

```bash
gzip -k file.txt
```

> ا-Compress and keep the original

نتیجه:

```text
file.txt
file.txt.gz
```

---

## ا-`-d` — Decompress

برای خارج کردن compression:

```bash
gzip -d file.txt.gz
```

> Decompress a gzip file

نتیجه:

```text
file.txt
```

معادل رایج آن:

```bash
gunzip file.txt.gz
```

یعنی:

```text
gzip -d
    ≈
gunzip
```

---

## ا-`-c` — stdout

این option خیلی مهم است، مخصوصاً در **Linux pipelines**.

```bash
gzip -c file.txt > file.txt.gz
```

> ا-Compress to stdout

اینجا `gzip` مستقیماً فایل جدید را overwrite نمی‌کند؛ خروجی compressed را به stdout می‌دهد و ما آن را با `>` داخل فایل می‌ریزیم.

---

## ا-`-v` — Verbose

```bash
gzip -v file.txt
```

> ا-Show compression information

اطلاعاتی درباره compression نمایش می‌دهد.

---

## ا-`-f` — Force

اگر فایل مقصد از قبل وجود داشته باشد:

```bash
gzip -f file.txt
```

> ا-Force compression

برای زمانی مفید است که می‌خواهیم بدون توقف به دلیل وجود فایل مقصد، عملیات انجام شود.

---

## `-1` تا `-9` — Compression Level

ا-`gzip` سطح compression را از `1` تا `9` پشتیبانی می‌کند:

```text
-1  → Fast
-2
-3
...
-6  → Default
...
-9  → Maximum compression
```

مثلاً:

```bash
gzip -1 file.txt
```

> ا-Compress faster

و:

```bash
gzip -9 file.txt
```

>ا- Compress with maximum compression

نکته:

```text
Compression level ↑
        ↓
Compression ratio معمولاً ↑
        ↓
CPU / time معمولاً ↑
```

`-9` همیشه به معنی «خیلی خیلی کوچک‌تر» نیست؛ معمولاً اختلاف اندازه با `-6` ممکن است کم باشد ولی زمان/CPU بیشتری مصرف شود.

---

## ا-`-r` — Recursive

برای پردازش recursive:

```bash
gzip -r logs/
```

> ا-Compress files recursively

⚠️ نکته مهم: این کار **یک archive واحد از `logs/` نمی‌سازد**؛ فایل‌های داخل directory را جداگانه gzip می‌کند.

اگر هدف یک archive واحد باشد، بهتر است:

```bash
tar -czf logs.tar.gz logs/
```

---

## `-t` — Test

برای بررسی سالم بودن فایل gzip:

```bash
gzip -t backup.gz
```

> ا-Test gzip integrity

اگر فایل سالم باشد معمولاً خروجی خاصی نمی‌دهد و exit status موفق خواهد بود.

برای SysAdmin این خیلی کاربردی است، مخصوصاً وقتی backup یا archive داریم.

---

## ا-`-l` — List information

```bash
gzip -l backup.gz
```

> ا-Show compression information

اطلاعاتی مثل:

```text
compressed size
uncompressed size
compression ratio
filename
```

را نمایش می‌دهد.

---

# 3. مثال‌های کاربردی

## مثال 1 — Compress یک فایل

```bash
gzip access.log
```

> ا-Compress a log file

قبل:

```text
access.log
```

بعد:

```text
access.log.gz
```

---

## مثال 2 — فایل اصلی را نگه داریم

```bash
gzip -k access.log
```

> ا-Compress and keep original

نتیجه:

```text
access.log
access.log.gz
```

---

## مثال 3 — Decompress

```bash
gzip -d access.log.gz
```

> ا-Decompress a log file

یا:

```bash
gunzip access.log.gz
```

---

## مثال 4 — Compression با بیشترین سطح

```bash
gzip -9 large-file.txt
```

> ا-Maximum compression

---

## مثال 5 — Compression سریع

```bash
gzip -1 large-file.txt
```

> ا-Fast compression

---

## مثال 6 — تست سالم بودن archive

```bash
gzip -t backup.gz
```

> ا-Test archive integrity

برای بررسی exit status:

```bash
echo $?
```

اگر:

```text
0
```

باشد، عملیات موفق بوده است.

---

## مثال 7 — استفاده با Pipeline

فرض کن می‌خواهیم خروجی یک command را مستقیماً compress کنیم:

```bash
ps aux | gzip > processes.txt.gz
```

> Compress command output

ساختار:

```text
ps aux
   ↓
stdout
   ↓
gzip
   ↓
processes.txt.gz
```

برای برگرداندن:

```bash
gzip -dc processes.txt.gz
```

> Decompress to stdout

---

## مثال 8 — ترکیب با tar

این یکی از مهم‌ترین کاربردهای `gzip` است:

```bash
tar -czf backup.tar.gz Documents/
```

> Create a gzip-compressed archive

اینجا:

```text
tar
 ↓
Archive
 ↓
backup.tar
 ↓
gzip
 ↓
backup.tar.gz
```

برای extract:

```bash
tar -xzf backup.tar.gz
```

> Extract a gzip-compressed archive

---

## مثال 9 — Backup یک directory

```bash
tar -czf home-backup.tar.gz /home/arian/
```

یا بهتر، برای جلوگیری از دردسر مسیر absolute:

```bash
tar -C /home -czf home-backup.tar.gz arian/
```

> Create a compressed home backup

---

# 4. gzip کجا به دردمان می‌خورد؟

برای **SysAdmin / DevOps** چند جای مهم دارد:

### 1. Log files

مثلاً:

```text
access.log
access.log.1
access.log.2
```

وقتی log قدیمی شد:

```bash
gzip access.log.2
```

تبدیل می‌شود به:

```text
access.log.2.gz
```

این باعث صرفه‌جویی در فضای disk می‌شود.

---

### 2. Backup

معمولاً:

```text
tar + gzip
```

با هم استفاده می‌شوند:

```bash
tar -czf backup.tar.gz /data/
```

---

### 3. انتقال فایل

فایل بزرگ را می‌توان قبل از انتقال compress کرد:

```text
large-file
    ↓
gzip
    ↓
large-file.gz
    ↓
scp / rsync
```

---

### 4. Pipeline

`gzip` با pipe خیلی خوب کار می‌کند:

```bash
command | gzip > output.gz
```

و برای خواندن:

```bash
gzip -dc output.gz
```

این مدل استفاده در Linux و کارهای SysAdmin خیلی مهم است.

---

# تفاوت مهم `tar` و `gzip`

|ابزار|وظیفه|
|---|---|
|`tar`|Archive کردن چند فایل/directory|
|`gzip`|Compress کردن داده|
|`tar.gz`|Archive + Compression|

مثلاً:

```bash
tar -cf backup.tar Documents/
```

فقط archive:

```text
Documents/
    ↓
backup.tar
```

اما:

```bash
tar -czf backup.tar.gz Documents/
```

Archive + Compression:

```text
Documents/
    ↓
tar
    ↓
backup.tar
    ↓
gzip
    ↓
backup.tar.gz
```

---

# 🧠 Mental Model

این چهار تا را خیلی خوب در ذهنت نگه دار:

```text
tar
 ↓
جمع کردن فایل‌ها در یک Archive
```

```text
gzip
 ↓
کوچک کردن داده
```

```text
tar.gz
 ↓
Archive + Compression
```

و:

```text
gzip -d
 ↓
Decompress
```

### مهم‌ترین commandها برای حفظ کردن:

```bash
gzip file
gzip -k file
gzip -d file.gz
gunzip file.gz
gzip -t file.gz
gzip -l file.gz
gzip -1 file
gzip -9 file
tar -czf backup.tar.gz directory/
tar -xzf backup.tar.gz
```
