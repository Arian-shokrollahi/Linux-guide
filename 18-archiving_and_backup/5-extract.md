# ا-Extract

ا-**Extract** یعنی محتویات یک archive یا فایل فشرده را از داخل آن بیرون بیاوریم و دوباره به شکل فایل‌ها و directoryهای قابل استفاده داشته باشیم.

مثلاً:

```text
backup.tar.gz
      ↓
   Extract
      ↓
files + directories
```

---

# 1. مفهوم Extract

فرض کن این را داریم:

```text
project/
├── app.py
├── config.conf
└── README.md
```

آن را archive و compress کرده‌ایم:

```text
project/
    ↓
   tar
    ↓
project.tar
    ↓
  gzip
    ↓
project.tar.gz
```

حالا می‌خواهیم دوباره فایل‌ها را بیرون بیاوریم:

```text
project.tar.gz
      ↓
    Extract
      ↓
project/
├── app.py
├── config.conf
└── README.md
```

---

# 2. ا-Extract کردن فرمت‌های مختلف

## ZIP

```bash
unzip backup.zip
```

> Extract ZIP archive

---

## TAR

```bash
tar -xf backup.tar
```

> Extract TAR archive

---

## TAR + GZIP

```bash
tar -xzf backup.tar.gz
```

> Extract TAR.GZ archive

---

## TAR + BZIP2

```bash
tar -xjf backup.tar.bz2
```

> Extract TAR.BZ2 archive

---

## TAR + XZ

```bash
tar -xJf backup.tar.xz
```

> Extract TAR.XZ archive

---

# 3. ساختار `tar -x...`

این قسمت خیلی مهم است:

```bash
tar -xzf backup.tar.gz
```

یعنی:

```text
-x → Extract
-z → gzip
-f → File
```

برای BZIP2:

```bash
tar -xjf backup.tar.bz2
```

یعنی:

```text
-x → Extract
-j → bzip2
-f → File
```

برای XZ:

```bash
tar -xJf backup.tar.xz
```

یعنی:

```text
-x → Extract
-J → xz
-f → File
```

پس:

```text
-z → gzip
-j → bzip2
-J → xz
```

---

# 4. قبل از Extract محتویات را ببین

خیلی وقت‌ها بهتر است قبل از extract کردن، ببینیم داخل archive چه چیزی وجود دارد.

برای TAR:

```bash
tar -tf backup.tar
```

> List archive contents

برای `tar.gz` هم:

```bash
tar -tzf backup.tar.gz
```

> List gzip archive contents

برای `tar.bz2`:

```bash
tar -tjf backup.tar.bz2
```

> List bzip2 archive contents

برای `tar.xz`:

```bash
tar -tJf backup.tar.xz
```

> List xz archive contents

اینجا:

```text
-t → List
```

---

# 5. ا-Extract در یک directory مشخص

فرض کن:

```text
backup.tar.gz
```

و می‌خواهی محتویات داخل `restore/` قرار بگیرد:

```bash
mkdir restore
```

بعد:

```bash
tar -xzf backup.tar.gz -C restore/
```

> Extract into a specific directory

ساختار:

```text
backup.tar.gz
       ↓
     Extract
       ↓
   restore/
       ├── file1
       ├── file2
       └── directory/
```

---

# 6. Extract فقط یک فایل خاص

فرض کن داخل archive این‌ها هستند:

```text
backup.tar.gz
├── etc/
├── etc/nginx/
├── etc/nginx/nginx.conf
└── var/
```

فقط می‌خواهی `nginx.conf` را extract کنی:

```bash
tar -xzf backup.tar.gz etc/nginx/nginx.conf
```

> Extract a specific file

---

# 7. Extract با `unzip`

برای ZIP:

```bash
unzip backup.zip
```

اگر بخواهی داخل directory خاصی extract کنی:

```bash
unzip backup.zip -d restore/
```

> Extract ZIP into a directory

---

# 8. Extract با Compression تنها

اگر فایل فقط compressed باشد و TAR نباشد:

### GZIP

```bash
gzip -d file.gz
```

یا:

```bash
gunzip file.gz
```

---

### BZIP2

```bash
bzip2 -d file.bz2
```

یا:

```bash
bunzip2 file.bz2
```

---

### XZ

```bash
xz -d file.xz
```

یا:

```bash
unxz file.xz
```

در این حالت یک **فایل compressed** داریم، نه یک archive چندفایلی.

---

# 9. Cheat Sheet

|Format|Extract|
|---|---|
|`.zip`|`unzip file.zip`|
|`.tar`|`tar -xf file.tar`|
|`.gz`|`gzip -d file.gz`|
|`.bz2`|`bzip2 -d file.bz2`|
|`.xz`|`xz -d file.xz`|
|`.tar.gz`|`tar -xzf file.tar.gz`|
|`.tar.bz2`|`tar -xjf file.tar.bz2`|
|`.tar.xz`|`tar -xJf file.tar.xz`|

---

# 🧠 Mental Model

فقط پسوند فایل را ببین:

```text
.zip
 ↓
unzip
```

```text
.tar
 ↓
tar -xf
```

```text
.gz
 ↓
gzip -d
```

```text
.bz2
 ↓
bzip2 -d
```

```text
.xz
 ↓
xz -d
```

و برای ترکیب TAR + Compression:

```text
.tar.gz
   ↓
tar -xzf
```

```text
.tar.bz2
   ↓
tar -xjf
```

```text
.tar.xz
   ↓
tar -xJf
```

### مهم‌ترین نکته

```text
Extract
   =
بیرون آوردن محتویات
```

و در `tar`:

```text
-c → Create
-x → Extract
-t → List
-f → File
```

پس اگر دیدی:

```bash
tar -xzf backup.tar.gz
```

ذهنت باید سریع بخواند:

> **Extract → gzip → file**
