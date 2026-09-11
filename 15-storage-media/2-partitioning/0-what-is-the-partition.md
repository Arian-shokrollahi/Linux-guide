# 1) ا-Partition چیست؟

ا-**Partition** یعنی **تقسیم منطقی یک Disk به چند قسمت جداگانه**.

به زبان ساده:

> یک Disk فیزیکی را به چند بخش تقسیم می‌کنیم تا هر بخش بتواند جداگانه مدیریت شود.

مثلاً یک SSD یک ترابایتی داریم:

```
Disk = 1TB
```

می‌توانیم آن را تقسیم کنیم:

```
/dev/sda  (کل Disk)
|
+-- /dev/sda1  → 200GB  → سیستم‌عامل
|
+-- /dev/sda2  → 700GB  → اطلاعات
|
+-- /dev/sda3  → 100GB  → Backup
```

اینجا:

```
/dev/sda
```

خود Disk است.

ولی:

```
/dev/sda1
/dev/sda2
/dev/sda3
```

ا-Partition هستند.

---

# 2) چرا Partition ایجاد می‌کنیم؟

یک Disk بدون Partition هم می‌تواند استفاده شود، اما Partition کردن مزایای زیادی دارد.

|دلیل|توضیح|
|---|---|
|جداسازی اطلاعات|سیستم‌عامل و دیتا جدا می‌شوند|
|مدیریت بهتر|هر بخش جداگانه کنترل می‌شود|
|استفاده از چند Filesystem|هر Partition می‌تواند Filesystem متفاوت داشته باشد|
|نصب چند سیستم‌عامل|مثل Linux و Windows|
|محدود کردن فضا|یک بخش نمی‌تواند کل Disk را پر کند|

---

# 3) رابطه Disk و Partition

ساختار کلی Storage:

```
Physical Disk
      |
      v
Partition
      |
      v
Filesystem
      |
      v
Mount Point
      |
      v
Files
```

مثال واقعی:

```
SSD
 |
 |
 v
/dev/sda
 |
 |
 +----------------+
 |                |
 v                v
/dev/sda1      /dev/sda2
 |                |
 v                v
ext4             xfs
 |                |
 v                v
/                /data
```

---

# 4) ا-Partition چگونه ساخته می‌شود؟

وقتی یک Disk جدید داریم:

مثلاً:

```
/dev/sdb
```

اول آن را Partition می‌کنیم:

```
fdisk /dev/sdb
```

نتیجه:

```
/dev/sdb1
/dev/sdb2
```

بعد روی Partition یک Filesystem می‌سازیم:

```
mkfs.ext4 /dev/sdb1
```

بعد Mount می‌کنیم:

```
mount /dev/sdb1 /data
```

---

# 5) انواع Partition

## در MBR

ا-MBR محدودیت دارد:

- حداکثر 4 Primary Partition

ساختار:

```
Disk
 |
 +-- Primary Partition
 |
 +-- Primary Partition
 |
 +-- Primary Partition
 |
 +-- Extended Partition
       |
       +-- Logical Partition
```

---

## در GPT

امروزی‌تر است:

- تعداد Partition بیشتر
- مناسب Diskهای بزرگ
- استفاده همراه UEFI

ساختار:

```
Disk
 |
 +-- Partition 1
 |
 +-- Partition 2
 |
 +-- Partition 3
 |
 +-- Partition 4
```

---

# 6) نام Partition در لینوکس

برای Diskهای معمولی:

```
/dev/sda
```

ا-Partitionها:

```
/dev/sda1
/dev/sda2
/dev/sda3
```

یعنی:

```
sda = Disk
1   = Partition Number
```

---

برای NVMe:

ا-Disk:

```
/dev/nvme0n1
```

ا-Partition:

```
/dev/nvme0n1p1
/dev/nvme0n1p2
```

وجود `p` به خاطر خوانایی است:

```
nvme0n1 + p + 1
```

---

# 7) دیدن Partitionها در لینوکس

## دستور اصلی:

```
lsblk
```

مثال:

```
NAME        TYPE
sda         disk
├─sda1      part
├─sda2      part
└─sda3      part
```

اینجا:

```
disk → کل Disk
part → Partition
```

---

## اطلاعات بیشتر:

```
fdisk -l
```

یا:

```
parted -l
```

---

# 8) ا-Partition چه چیزی نیست؟

نکته مهم:

ا-Partition خودش فایل ذخیره نمی‌کند.

یعنی:

```
Partition
     |
     v
Filesystem
     |
     v
Files
```

مثلاً:

این اشتباه است:

```
Disk → File
```

درست:

```
Disk
 ↓
Partition
 ↓
Filesystem
 ↓
File
```

---

# 9) چیزهایی که برای Linux Admin باید بلد باشی

مهم‌ترین‌ها:

✅ فرق:

```
Disk ≠ Partition
```

مثال:

```
/dev/sda    → کل Disk

/dev/sda1   → یک بخش از Disk
```

---

✅ ابزارها:

```
lsblk
fdisk
gdisk
parted
```

---

✅ مفاهیم مرتبط:

- MBR
- GPT
- Primary Partition
- Logical Partition
- Filesystem
- Mount
- LVM

---

## خلاصه نهایی

ا-**Disk:**

> کل فضای فیزیکی ذخیره‌سازی مثل HDD یا SSD.

ا-**Partition:**

> یک بخش منطقی ساخته‌شده از داخل Disk.

مثال:

```
1TB SSD
     |
     v
/dev/sda
     |
     +---- /dev/sda1  → Linux
     |
     +---- /dev/sda2  → Data
     |
     +---- /dev/sda3  → Swap
```

یعنی Partition مثل **تقسیم کردن یک اتاق بزرگ به چند اتاق کوچک‌تر** است؛ خود ساختمان همان Disk است، ولی اتاق‌ها Partition هستند
