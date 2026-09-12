# ا-ext4 چیست؟

ا-**ext4 (Fourth Extended File System)** یک **File System در لینوکس** است که برای ذخیره و مدیریت فایل‌ها روی Disk استفاده می‌شود.

یعنی وقتی یک Partition داریم، با Format کردن آن به ext4، لینوکس می‌تواند داخل آن فایل و پوشه ایجاد کند.

ساختار:

```
Disk
 |
 └── Partition
        |
        └── ext4
              |
              ├── Files
              └── Directories
```

مثال:

```
/dev/sdb1
    |
   ext4
    |
  /data
    |
  backup.tar
```

---

# تاریخچه ext4

نسل‌های File System لینوکس:

```
ext
 |
ext2
 |
ext3
 |
ext4
```

- **ext2** → بدون Journal
- **ext3** → اضافه شدن Journal
- **ext4** → نسخه بهبود یافته با سرعت و امکانات بیشتر

---

# ویژگی‌های مهم ext4

## ا-1. Journal

مهم‌ترین ویژگی ext4 است.

قبل از تغییرات اصلی، عملیات در یک بخش به نام Journal ثبت می‌شود.

مثال:

بدون Journal:

```
نوشتن اطلاعات
      |
قطع برق
      |
احتمال خرابی File System
```

با Journal:

```
درخواست تغییر
      |
 Journal
      |
 Disk
```

باعث Recovery بهتر بعد از Crash می‌شود.

---

## 2. ا-Extents

ا-ext4 برای ذخیره فایل‌ها از Extent استفاده می‌کند.

در سیستم‌های قدیمی:

```
File
 |
Block 10
Block 25
Block 40
```

در ext4:

```
File
 |
Block 10 تا 40
```

مزایا:

- سرعت بیشتر
- ا-Fragmentation کمتر
- مدیریت بهتر فایل‌های بزرگ

---

## 3. پشتیبانی از فایل‌های بزرگ

ا-ext4 می‌تواند:

- فایل‌های حجیم
- ا-Partitionهای بزرگ

را مدیریت کند.

تقریباً:

```
Maximum File Size ≈ 16TB
Maximum Filesystem Size ≈ 1EB
```

---

## 4. ا-Permission و مالکیت فایل‌ها

ا-ext4 اطلاعات زیر را ذخیره می‌کند:

- Owner
- Group
- Permission
- زمان ایجاد و تغییر فایل

مثال:

```
ls -l file.txt
```

خروجی:

```
-rw-r--r-- user user file.txt
```

---

## 5. پایداری بالا

به همین دلیل در بسیاری از سیستم‌های لینوکسی استفاده می‌شود:

- Ubuntu
- Debian
- Linux Server

---

# ساختن ext4 روی Partition

فرض:

```
/dev/sdb1
```

ایجاد File System:

```
mkfs.ext4 /dev/sdb1
```

بعد:

```
mount /dev/sdb1 /data
```

حالا:

```
/data
 |
 ├── file1
 └── file2
```

---

# مشاهده نوع File System

با:

```
lsblk -f
```

مثال:

```
NAME      FSTYPE
sda1      ext4
sdb1      xfs
```

یا:

```
df -T
```

---

# تعمیر ext4

ابزار:

```
fsck.ext4
```

مثال:

```
fsck.ext4 /dev/sdb1
```

برای بررسی و تعمیر خطاهای File System استفاده می‌شود.

---

# مزایا و معایب ext4

|مزایا|معایب|
|---|---|
|پایدار|امکانات پیشرفته کمتر از Btrfs|
|سرعت خوب|مناسب نبودن برای Storageهای خیلی بزرگ|
|Journal دارد|Snapshot داخلی ندارد|
|پشتیبانی گسترده|Compression داخلی ندارد|

---

# خلاصه نهایی

```
ext4
 |
 ├── File System اصلی لینوکس
 ├── ساخته شده برای جایگزینی ext3
 ├── دارای Journal
 ├── سریع و پایدار
 ├── مناسب Desktop و Server
 └── یکی از بهترین انتخاب‌های عمومی لینوکس
```