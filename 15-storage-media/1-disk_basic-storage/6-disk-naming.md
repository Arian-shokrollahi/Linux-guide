# 1) نام‌گذاری Diskها در لینوکس چیست؟

در لینوکس، Diskها داخل مسیر:

```
/dev
```

قرار می‌گیرند و Kernel برای هر Storage یک **نام Device** اختصاص می‌دهد.

مثال:

```
/dev/sda
/dev/sdb
/dev/sdc
```

یا:

```
/dev/nvme0n1
```

این نام‌ها تصادفی نیستند و یک الگو دارند.

---

# 2) نام‌گذاری دیسک‌های SATA / SCSI (`sd`)

دیسک‌هایی که با نام:

```
/dev/sda
```

شروع می‌شوند، معمولاً از خانواده‌ی **SCSI Disk** هستند.

ساختار:

```
/dev/sda
```

تقسیم کنیم:

```
sd + a
```

|بخش|معنی|
|---|---|
|`sd`|نوع Device (SCSI Disk)|
|`a`|شماره دیسک|

---

## مثال:

### اولین Disk:

```
/dev/sda
```

یعنی:

```
sd = SCSI Disk
a  = Disk شماره 1
```

---

### دومین Disk:

```
/dev/sdb
```

یعنی:

```
sd = SCSI Disk
b  = Disk شماره 2
```

---

### سومین Disk:

```
/dev/sdc
```

یعنی:

```
sd = SCSI Disk
c  = Disk شماره 3
```

---

ترتیب:

```
/dev/sda   → Disk اول
/dev/sdb   → Disk دوم
/dev/sdc   → Disk سوم
/dev/sdd   → Disk چهارم
```

---

# 3) نام‌گذاری Partitionها

وقتی یک Disk را Partition می‌کنیم، یک عدد به آخر آن اضافه می‌شود.

مثال:

```
/dev/sda
```

داریم:

```
/dev/sda1
/dev/sda2
/dev/sda3
```

ساختار:

```
/dev/sda1

sda + 1
 |     |
 |     +---- شماره Partition
 |
 +---------- نام Disk
```

مثال:

```
/dev/sda
 |
 +-- /dev/sda1
 |
 +-- /dev/sda2
 |
 +-- /dev/sda3
```

---

# 4) نام‌گذاری NVMe Diskها

ا-NVMe چون ساختار متفاوتی دارد، نام‌گذاری متفاوت است.

مثال:

```
/dev/nvme0n1
```

تقسیم:

```
nvme0n1
```

|بخش|معنی|
|---|---|
|nvme|نوع Storage|
|0|شماره Controller|
|n1|شماره Namespace|

---

## مثال:

اولین NVMe:

```
/dev/nvme0n1
```

دومین NVMe:

```
/dev/nvme1n1
```

---

# 5) ا-Partition در NVMe

در SATA:

```
/dev/sda1
```

اما در NVMe:

```
/dev/nvme0n1p1
```

چرا `p` دارد؟

چون اسم Disk خودش عدد دارد:

```
nvme0n1
```

اگر بنویسیم:

```
nvme0n11
```

مشخص نیست:

- اسم Disk چیست؟
- شماره Partition چیست؟

پس از `p` استفاده می‌شود:

```
/dev/nvme0n1p1

nvme0n1 + p + 1
          |
          Partition number
```

---

# 6) مقایسه نام‌گذاری‌ها

|نوع Disk|مثال Disk|مثال Partition|
|---|---|---|
|SATA/SCSI|`/dev/sda`|`/dev/sda1`|
|SATA دوم|`/dev/sdb`|`/dev/sdb1`|
|NVMe|`/dev/nvme0n1`|`/dev/nvme0n1p1`|
|USB Disk|`/dev/sdb`|`/dev/sdb1`|

---

# 7) آیا همیشه اولین Disk می‌شود `/dev/sda`؟

نه، این نکته مهم است.

نام‌ها توسط Kernel بر اساس ترتیب شناسایی Deviceها ساخته می‌شوند.

مثلاً ممکن است:

```
USB وصل شود
      |
      v
/dev/sda
```

و بعد هارد اصلی:

```
/dev/sdb
```

شود.

به همین دلیل در سرورها معمولاً برای شناسایی ثابت از:

```
/dev/disk/
```

استفاده می‌کنند.

مثلاً:

```
/dev/disk/by-uuid/
/dev/disk/by-id/
```

---

# 8) دیدن نام Diskها

## دستور اصلی:

```
lsblk
```

مثال:

```
NAME        TYPE
sda         disk
├─sda1      part
└─sda2      part

nvme0n1     disk
├─nvme0n1p1 part
└─nvme0n1p2 part
```

---

# 9) چیزهایی که برای Linux Admin باید بلد باشی

باید بتوانی این‌ها را تشخیص بدهی:

```
/dev/sda
```

یعنی:

> کل Disk اول

---

```
/dev/sda1
```

یعنی:

> Partition شماره 1 از Disk اول

---

```
/dev/nvme0n1
```

یعنی:

> اولین NVMe Disk

---

```
/dev/nvme0n1p1
```

یعنی:

> ا-Partition شماره 1 روی اولین NVMe Disk

---

## خلاصه نهایی

```
SATA/SCSI:

/dev/sda
       |
       +-- /dev/sda1
       +-- /dev/sda2


NVMe:

/dev/nvme0n1
          |
          +-- /dev/nvme0n1p1
          +-- /dev/nvme0n1p2
```

قاعده حفظی:

```
sd + حرف = Disk

عدد بعد از آن = Partition


nvme + controller + namespace + p + number
```
