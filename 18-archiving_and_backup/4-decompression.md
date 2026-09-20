# Unzip / Decompression

وقتی یک فایل را compress یا archive می‌کنیم، در مرحله‌ی بعد باید بتوانیم آن را **extract / decompress** کنیم.

اما command مورد استفاده به **فرمت فایل** بستگی دارد:

```text
.zip       → unzip
.bz2       → bunzip2 / bzip2 -d
.tar       → tar -xf
.tar.bz2   → tar -xjf
```

---

# 1. ZIP

اگر فایل این باشد:

```text
backup.zip
```

برای باز کردن آن:

```bash
unzip backup.zip
```

> Extract a ZIP archive

نتیجه:

```text
backup.zip
    ↓
  unzip
    ↓
files / directories
```

### ا-Extract در یک directory مشخص

```bash
unzip backup.zip -d restore/
```

> Extract into a directory

---

# 2. BZIP2

اگر یک فایل ساده داشته باشیم:

```text
database.sql.bz2
```

برای decompress:

```bash
bzip2 -d database.sql.bz2
```

یا:

```bash
bunzip2 database.sql.bz2
```

نتیجه:

```text
database.sql.bz2
       ↓
     bzip2
       ↓
database.sql
```

> Decompress a BZIP2 file

### نکته مهم

اینجا **`unzip` استفاده نمی‌کنیم**:

```bash
unzip database.sql.bz2
```

❌ اشتباه

چون `unzip` مخصوص **ZIP format** است، نه BZIP2.

---

# 3. TAR.BZ2

حالا حالت مهم‌تر:

فرض کن:

```text
backup.tar.bz2
```

این فقط یک فایل compress‌شده‌ی ساده نیست.

دو مرحله دارد:

```text
tar
 ↓
Archive
 ↓
bzip2
 ↓
Compression
```

یعنی:

```text
backup.tar.bz2
      ↓
   bzip2
      ↓
 backup.tar
      ↓
    tar
      ↓
files / directories
```

برای باز کردن کل آن:

```bash
tar -xjf backup.tar.bz2
```

> Extract a BZIP2-compressed TAR archive

اینجا:

```text
-x → Extract
-j → bzip2
-f → Filename
```

---

# 4. تفاوت خیلی مهم

سه فایل زیر را ببین:

```text
file.zip
file.bz2
file.tar.bz2
```

### `file.zip`

```bash
unzip file.zip
```

---

### `file.bz2`

```bash
bzip2 -d file.bz2
```

یا:

```bash
bunzip2 file.bz2
```

---

### `file.tar.bz2`

```bash
tar -xjf file.tar.bz2
```

---

# 🧠 Mental Model

فرمت فایل را نگاه کن و command مناسب را انتخاب کن:

```text
             FILE
               │
      ┌────────┼──────────┐
      │        │          │
     .zip     .bz2     .tar.bz2
      │        │          │
      ▼        ▼          ▼
    unzip   bunzip2    tar -xjf
```

و برای ZIP:

```text
.zip
 ↓
unzip
 ↓
files/directories
```

برای BZIP2:

```text
.bz2
 ↓
bzip2 -d
 ↓
original file
```

برای TAR + BZIP2:

```text
.tar.bz2
    ↓
tar -xjf
    ↓
files/directories
```

---

# ⚡ Cheat Sheet

|Format|Extract Command|
|---|---|
|`.zip`|`unzip file.zip`|
|`.bz2`|`bzip2 -d file.bz2`|
|`.bz2`|`bunzip2 file.bz2`|
|`.tar`|`tar -xf file.tar`|
|`.tar.bz2`|`tar -xjf file.tar.bz2`|

### قانون ساده:

```text
ZIP
 ↓
unzip
```

```text
BZIP2
 ↓
bunzip2
```

```text
TAR + BZIP2
 ↓
tar -xjf
```

**پس `unzip` اسم عمومی برای همه‌ی extractها نیست؛ اسم یک command مشخص برای فرمت ZIP است.**
