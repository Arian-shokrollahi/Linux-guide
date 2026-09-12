# ا-Inode چیست؟

ا-**Inode (Index Node)** یک ساختار داده داخل **File System** است که اطلاعات مربوط به یک فایل یا Directory را نگه می‌دارد.

به زبان ساده:

ا-**File System برای مدیریت فایل‌ها به دو چیز اصلی نیاز دارد:**

1. اسم فایل و مسیر آن
2. اطلاعات خود فایل

ا-Inode بخش دوم را نگه می‌دارد.

---

# ارتباط Inode با File System

وقتی یک File System مثل **ext4** یا **XFS** ساخته می‌شود، بخشی از فضای Disk برای نگهداری Inodeها اختصاص داده می‌شود.

ساختار ساده:

```
Disk
 |
 └── File System (ext4)
          |
          ├── Inode Table
          |
          ├── Data Blocks
          |
          └── Directories
```

یعنی:

- ا-**Inode → اطلاعات فایل**
- ا-**Data Block → محتوای واقعی فایل**

---

# ا-Inode چه اطلاعاتی را نگه می‌دارد؟

مثلاً فایل:

```
/home/user/test.txt
```

اا-Inode آن اطلاعاتی شبیه این دارد:

```
Inode Number: 12345

File Type: regular file

Owner: user

Group: users

Permission:
-rw-r--r--

Size:
10 MB

Created:
2026-09-12

Modified:
2026-09-12

Link Count:
1

Data Block Location:
Block 500-700
```

---

# چه چیزی داخل Inode نیست؟

یک نکته خیلی مهم:

**نام فایل داخل Inode ذخیره نمی‌شود.**

مثلاً:

```
/home/user/test.txt
```

نام:

```
test.txt
```

داخل Directory ذخیره می‌شود.

ا-Directory در واقع یک جدول است:

```
Directory

Filename        Inode Number

test.txt  ---> 12345
photo.jpg ---> 12346
```

بعد سیستم می‌رود Inode را پیدا می‌کند.

---

# مسیر پیدا کردن یک فایل

فرض:

```
cat /home/user/test.txt
```

سیستم‌عامل این مسیر را طی می‌کند:

### 1. پیدا کردن Directory

```
/
 |
 home
 |
 user
```

---

### 2. پیدا کردن Inode فایل

ا-Directory می‌گوید:

```
test.txt ---> inode 12345
```

---

### 3. خواندن Inode

ا-Inode می‌گوید:

```
File size: 5MB

Data Blocks:
500
501
502
```

---

### 4. خواندن Data Blockها

و محتوای فایل خوانده می‌شود.

ساختار:

```
Filename
    |
    ↓
 Inode
    |
    ↓
Data Blocks
    |
    ↓
 File Content
```

---

# دیدن Inode یک فایل در لینوکس

با دستور:

```
ls -i
```

مثال:

```
ls -i test.txt
```

خروجی:

```
12345 test.txt
```

عدد اول:

```
12345
```

شماره Inode است.

---

# دیدن اطلاعات کامل Inode

با:

```
stat test.txt
```

مثال:

```
File: test.txt

Inode: 12345

Size: 1024

Blocks: 8

Access: rw-r--r--
```

---

# ارتباط Inode با Hard Link

ا-Hard Link یعنی چند نام برای یک Inode.

مثال:

```
ln file1 file2
```

حالا:

```
file1
 |
 |
 inode 500
 |
 |
file2
```

هر دو فایل یک Inode دارند.

بررسی:

```
ls -li
```

خروجی:

```
500 file1
500 file2
```

---

# ا-Inode و مشکل کمبود Inode

ممکن است Disk فضای خالی داشته باشد ولی Inode تمام شده باشد.

مثلاً:

```
Disk Space:

90% Free


Inode:

100% Used
```

نتیجه:

نمی‌توان فایل جدید ساخت.

معمولاً وقتی تعداد فایل‌های کوچک خیلی زیاد باشد اتفاق می‌افتد.

مثال:

```
/tmp

file1
file2
file3
...
millions of files
```

بررسی:

```
df -i
```

خروجی:

```
Filesystem  Inodes  IUsed

/dev/sda1   1M      1M
```

---

# Inode در ext4 و XFS

## ext4

هنگام ساخت File System تعداد Inodeها مشخص می‌شود.

مثلاً:

```
mkfs.ext4 /dev/sdb1
```

ساختار Inode ایجاد می‌شود.

---

## XFS

ا-XFS مدیریت Inode متفاوتی دارد.

- ا-Inodeها Dynamic ساخته می‌شوند.
- محدودیت ثابت مثل ext4 ندارد.

---

# خلاصه نهایی

```
File System
      |
      |
      +---- Inode
      |        |
      |        ├── Owner
      |        ├── Permission
      |        ├── Size
      |        ├── Time
      |        └── Location of Data Blocks
      |
      +---- Data Blocks
               |
               └── Actual File Content
```

به زبان خیلی کوتاه:

ا-**Inode شناسنامه فایل است؛ File System با استفاده از Inode می‌فهمد فایل چیست، چه کسی مالک آن است، چه دسترسی‌هایی دارد و داده‌های آن کجا روی Disk قرار گرفته‌اند.**