# ا-Disk و Partition چیست؟

برای فهم Partition اول باید فرق **Disk** و **Partition** را بدانیم.

---

# ا-Disk چیست؟

ا-**Disk** همان وسیله فیزیکی ذخیره‌سازی است که داده‌ها روی آن قرار می‌گیرند.

مثال:

- HDD
- SSD
- NVMe SSD
- USB Drive

در لینوکس یک Disk معمولاً به شکل یک **Block Device** دیده می‌شود.

مثال:

```
/dev/sda
```

یا:

```
/dev/nvme0n1
```

یعنی:

```
Physical Disk
      |
      v
/dev/sda
```

---

# ا-Partition چیست؟

ا-**Partition** یعنی تقسیم کردن یک Disk به چند بخش منطقی.

یعنی یک Disk بزرگ را به چند قسمت تقسیم می‌کنیم تا هر قسمت بتواند جداگانه مدیریت شود.

مثلاً یک SSD یک ترابایتی داریم:

```
Disk = 1TB
```

آن را تقسیم می‌کنیم:

```
/dev/sda
 |
 |-- /dev/sda1  100GB  → Linux OS
 |
 |-- /dev/sda2  800GB  → Data
 |
 |-- /dev/sda3  100GB  → Backup
```

هر Partition می‌تواند:

- ا-Filesystem جدا داشته باشد.
- ا-Mount Point جدا داشته باشد.
- کاربرد جدا داشته باشد.

---

# 2) رابطه Disk و Partition

ساختار کلی:

```
Storage Device
       |
       v
      Disk
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
     Data
```

مثال واقعی:

```
SSD
 |
 +-- /dev/sda1
 |       |
 |       +-- ext4
 |              |
 |              +-- /
 |
 +-- /dev/sda2
         |
         +-- xfs
                |
                +-- /data
```

---

# 3) چرا Partition می‌کنیم؟

دلایل اصلی:

|دلیل|توضیح|
|---|---|
|جداسازی اطلاعات|سیستم‌عامل و دیتا جدا باشند|
|امنیت بیشتر|خرابی یک بخش روی بقیه اثر نگذارد|
|مدیریت بهتر|هر بخش جداگانه کنترل شود|
|نصب چند سیستم‌عامل|مثل Linux و Windows کنار هم|
|استفاده از Filesystemهای مختلف|هر Partition می‌تواند متفاوت باشد|

---

# 4) انواع Partition Table

ا-Partition Table مشخص می‌کند Disk چگونه تقسیم‌بندی شود.

دو نوع مهم:

|نوع|توضیح|
|---|---|
|MBR|قدیمی‌تر، محدودیت بیشتر|
|GPT|جدیدتر، مناسب Diskهای بزرگ|

---

## MBR (Master Boot Record)

ویژگی‌ها:

- قدیمی
- حداکثر حدود 2TB Disk
- حداکثر 4 Primary Partition

ساختار:

```
Disk
 |
 +-- Primary Partition
 +-- Primary Partition
 +-- Primary Partition
 +-- Extended Partition
```

---

## GPT (GUID Partition Table)

ویژگی‌ها:

- جدیدتر
- مناسب Diskهای بزرگ
- تعداد Partition بیشتر
- استفاده همراه با UEFI

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

امروزه بیشتر سیستم‌ها از GPT استفاده می‌کنند.

---

# 5) Partition در لینوکس

دیدن Diskها:

```
lsblk
```

مثال خروجی:

```
NAME        SIZE
sda         500G
├─sda1      100G
├─sda2      300G
└─sda3      100G
```

اینجا:

```
sda = Disk

sda1
sda2
sda3 = Partition
```

---

# 6) ابزارهای مدیریت Partition

ابزارهای مهم:

|ابزار|کاربرد|
|---|---|
|fdisk|مدیریت Partitionهای MBR/GPT|
|gdisk|مخصوص GPT|
|parted|مدیریت پیشرفته Partition|
|lsblk|نمایش ساختار Disk|

مثال:

```
fdisk -l
```

نمایش تمام Disk و Partitionها.

---
## خلاصه نهایی

ا-**Disk:**

> خود وسیله فیزیکی ذخیره‌سازی است.

ا-**Partition:**

> تقسیم منطقی یک Disk به چند بخش است.

مثال:

```
1TB SSD (Disk)

        |
        |
        v

Partition 1 → 200GB → /
Partition 2 → 700GB → /data
Partition 3 → 100GB → swap
```
