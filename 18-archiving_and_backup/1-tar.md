# ا-`tar`

## 1. توضیح و ساختار

ا-`tar` یکی از مهم‌ترین ابزارهای Linux برای **Archiving** است. با `tar` می‌توانیم چند فایل و directory را در یک archive قرار دهیم، archive را مشاهده کنیم و فایل‌های آن را استخراج کنیم.

نکته مهم: خود `tar` در اصل برای **Archiving** است؛ compression را می‌تواند با ابزارهایی مثل `gzip`، `bzip2` و `xz` ترکیب کند.

### ساختار کلی

```
tar [OPTIONS] [ARCHIVE] [FILES...]
```

سه عملیات اصلی که باید اول یاد بگیری:

```
-c  → Create
-x  → Extract
-t  → List
```

مثلاً:

```
tar -cf backup.tar /home/arian/Documents/
```

> ا-Create an archive

اینجا:

```
-c → ساخت archive
-f → نام archive را مشخص می‌کند
backup.tar → نام archive
/home/arian/Documents/ → داده‌هایی که داخل archive قرار می‌گیرند
```

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-c`|ایجاد archive|
|`-x`|استخراج archive|
|`-t`|نمایش محتویات archive|
|`-f`|مشخص کردن نام archive|
|`-v`|نمایش جزئیات عملیات|
|`-C`|تعیین directory مقصد|
|`-z`|استفاده از gzip|
|`-j`|استفاده از bzip2|
|`-J`|استفاده از xz|
|`--exclude`|خارج کردن فایل/مسیر خاص از archive|
|`-r`|اضافه کردن فایل به archive موجود|
|`-u`|اضافه کردن فایل‌هایی که جدیدتر هستند|
|`-p`|حفظ permissionها|
|`--delete`|حذف فایل از archive|

### چهار موردی که اول باید کاملاً بلد باشی

```
-c → Create
-x → Extract
-t → List
-f → File
```

یک نکته مهم درباره `-f`:

```
tar -cf backup.tar files/
```

اینجا `backup.tar` اسم archive است.

---

# 3. مثال‌های کاربردی

### ساخت archive

```
tar -cf backup.tar /home/arian/Documents/
```

> ا-Create an archive

---

### نمایش محتویات archive

```
tar -tf backup.tar
```

>ا- List archive contents

---

### استخراج archive

```
tar -xf backup.tar
```

> ا-Extract an archive

---

### استخراج در یک directory مشخص

```
tar -xf backup.tar -C /tmp/restore/
```

> ا-Extract to a specific directory

---

### نمایش جزئیات هنگام عملیات

```
tar -cvf backup.tar /home/arian/Documents/
```

> ا-Create an archive verbosely

ا-`-v` باعث می‌شود فایل‌هایی که در حال archive شدن هستند نمایش داده شوند.

---

## `tar` + `gzip`

```
tar -czf backup.tar.gz /home/arian/Documents/
```

> ا-Create a gzip-compressed archive

استخراج:

```
tar -xzf backup.tar.gz
```

> ا-Extract a gzip-compressed archive

اینجا:

```
-c → create
-z → gzip
-f → archive file
```

---

## `tar` + `bzip2`

```
tar -cjf backup.tar.bz2 /home/arian/Documents/
```

> ا-Create a bzip2-compressed archive

استخراج:

```
tar -xjf backup.tar.bz2
```

> ا-Extract a bzip2-compressed archive

---

## `tar` + `xz`

```
tar -cJf backup.tar.xz /home/arian/Documents/
```

> ا-Create an xz-compressed archive

استخراج:

```
tar -xJf backup.tar.xz
```

> ا-Extract an xz-compressed archive

---

## خارج کردن یک فایل از archive

```
tar -czf backup.tar.gz /home/arian/Documents/ --exclude="*.log"
```

> ا-Archive files while excluding log files

این برای Backup خیلی کاربردی است؛ مثلاً نمی‌خواهی فایل‌های موقت یا logهای خاص وارد archive شوند.

---

# 4. ا-`tar` کجا به دردمان می‌خورد؟

ا-`tar` در Linux برای کارهای **SysAdmin، Backup، انتقال فایل و نگهداری داده‌ها** بسیار مهم است.

موارد مهم استفاده:

```
Directory
   ↓
tar
   ↓
Archive
   ↓
.tar

یا

Directory
   ↓
tar + gzip
   ↓
.tar.gz
```

مثلاً برای backup گرفتن از یک directory:

```
tar -czf home-backup.tar.gz /home/arian/
```

و بعداً برای restore:

```
tar -xzf home-backup.tar.gz
```

### فرمول ذهنی `tar`

```
-c → Create
-x → Extract
-t → List
-f → File
-z → gzip
-j → bzip2
-J → xz
```

اگر همین‌ها را خوب یاد بگیری، بخش اصلی `tar` را گرفته‌ای. بعد از آن، **`gzip`، `bzip2`، `xz` و در نهایت `rsync`** را یاد بگیر تا مسیر Archiving → Compression → Backup برایت کامل شود.
