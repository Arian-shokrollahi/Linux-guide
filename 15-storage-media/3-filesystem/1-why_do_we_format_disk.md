# چرا Disk را Format می‌کنیم؟

ا-**Format کردن Disk یعنی آماده‌سازی فضای ذخیره‌سازی برای استفاده توسط سیستم‌عامل با ایجاد یک File System.**

یک Disk خام فقط تعدادی **Sector / Block** دارد و سیستم‌عامل نمی‌داند چگونه داخل آن فایل ایجاد و مدیریت کند.

مثلاً:

قبل از Format:

```
Disk
--------------------------------
| 00010101 | 110101 | 001010 |
| 10101010 | 111000 | 101011 |
--------------------------------

(فقط داده خام)
```

بعد از Format:

```
Disk
|
└── File System (ext4)
       |
       ├── Files
       ├── Directories
       ├── Permissions
       └── Metadata
```

---

# دلایل Format کردن Disk

## 1. ایجاد File System

مهم‌ترین دلیل Format:

ساختن یک File System روی دیسک.

مثلاً:

```
mkfs.ext4 /dev/sdb1
```

یعنی:

```
/dev/sdb1
      |
      ↓
    ext4
```

حالا سیستم‌عامل می‌تواند روی آن فایل ذخیره کند.

---

## 2. سازمان‌دهی فضای Disk

ا-Disk به بخش‌های کوچک‌تر تقسیم می‌شود:

```
Disk
 |
 ├── Block 1
 ├── Block 2
 ├── Block 3
 └── Block 4
```

ا-File System مشخص می‌کند:

- کدام Block آزاد است.
- کدام Block متعلق به یک فایل است.
- فایل‌ها کجا قرار دارند.

---

## 3. ساخت Metadata

هنگام Format اطلاعات مدیریتی ساخته می‌شوند.

مثل:

- نام فایل‌ها
- اندازه فایل‌ها
- مالک فایل
- ا-Permission
- زمان ایجاد و تغییر

مثلاً:

```
file.txt

Owner: user
Size: 2MB
Permission: rw-r--r--
Location: Block 120-150
```

---

## 4. آماده کردن Disk برای Mount شدن

سیستم‌عامل فقط File Systemهای شناخته‌شده را می‌تواند Mount کند.

مثلاً:

قبل از Format:

```
/dev/sdb1
     |
     |
  Unknown Data
```

بعد از Format:

```
/dev/sdb1
     |
    ext4
     |
 /data
```

حالا:

```
mount /dev/sdb1 /data
```

کار می‌کند.

---

## 5. حذف ساختار قبلی

وقتی Disk را Format می‌کنیم، معمولاً File System قبلی حذف می‌شود.

مثلاً:

قبل:

```
/dev/sdb1
      |
     NTFS
```

بعد:

```
mkfs.xfs /dev/sdb1
```

نتیجه:

```
/dev/sdb1
      |
     XFS
```

---

# فرق Format با Partition چیست؟

این دو مرحله جدا هستند:

## اول Partition می‌سازیم:

مثلاً:

```
Disk /dev/sdb

        |
        |
    Partition
        |
   /dev/sdb1
```

با:

```
fdisk /dev/sdb
```

---

## بعد Format می‌کنیم:

روی Partition:

```
mkfs.ext4 /dev/sdb1
```

نتیجه:

```
/dev/sdb1
       |
      ext4
```

---

# یک مثال واقعی در سرور

فرض کن یک هارد جدید اضافه کردی:

```
/dev/sdb
```

اول:

### 1. Partition

```
fdisk /dev/sdb
```

نتیجه:

```
/dev/sdb1
```

---

### 2. Format

```
mkfs.xfs /dev/sdb1
```

نتیجه:

```
/dev/sdb1
      |
      XFS
```

---

### 3. Mount

```
mount /dev/sdb1 /backup
```

حالا:

```
/backup
   |
   ├── backup1.tar
   └── database.sql
```

---

# نکته مهم

ا-Format معمولاً **اطلاعات قبلی را از بین می‌برد** چون ساختار File System جدید ایجاد می‌کند.

مثلاً:

```
Old:
NTFS
 |
files


Format


New:
ext4
 |
empty filesystem
```

---

# خلاصه نهایی

```
Disk خام
    |
    ↓
Partition بندی
    |
    ↓
Format (ساخت File System)
    |
    ↓
Mount
    |
    ↓
استفاده و ذخیره فایل
```

پس:

**ما Disk را Format می‌کنیم تا یک File System بسازیم و به سیستم‌عامل اجازه بدهیم فایل‌ها را به شکل منظم ذخیره و مدیریت کند.**
