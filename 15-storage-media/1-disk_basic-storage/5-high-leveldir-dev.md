# 1) ا-Directory `/dev` چیست؟

در لینوکس، دایرکتوری:

```
/dev
```

مخفف:

```
device
```

است و شامل **Device File**ها می‌شود.

به زبان ساده:

> ا-`/dev` جایی است که لینوکس دستگاه‌های سخت‌افزاری و مجازی را به شکل فایل در اختیار Kernel و User Space قرار می‌دهد.

در لینوکس یک مفهوم مهم وجود دارد:

> ا-**Everything is a file**

یعنی بسیاری از چیزها مثل:

- Disk
- Keyboard
- Terminal
- USB
- RAM Device

به شکل فایل داخل `/dev` دیده می‌شوند.

---

# 2) چرا Deviceها داخل `/dev` هستند؟

Kernel مستقیماً به کاربر اجازه نمی‌دهد با Hardware صحبت کند.

مسیر ارتباط:

```
Application
      |
      v
/dev/device file
      |
      v
Kernel
      |
      v
Hardware
```

مثلاً وقتی روی یک Disk اطلاعات می‌نویسی:

```
echo "hello" > /dev/sdb
```

در واقع:

```
/dev/sdb
        |
        v
Kernel
        |
        v
SSD/HDD
```

---

# 3) ساختار کلی `/dev`

یک سیستم لینوکس معمولاً:

```
ls /dev
```

چیزهایی مثل این دارد:

```
/dev
 |
 +-- sda
 +-- sda1
 +-- nvme0n1
 +-- tty
 +-- null
 +-- zero
 +-- random
 +-- usb
```

---

# 4) انواع مهم Device در `/dev`

## 1. Block Device

مربوط به Storageها:

مثال:

```
/dev/sda
/dev/sda1
/dev/nvme0n1
```

ویژگی:

- داده را به صورت Block منتقل می‌کند.
- قابلیت filesystem دارد.

ساختار:

```
SSD
 |
 v
/dev/nvme0n1
 |
 v
/dev/nvme0n1p1
 |
 v
ext4
```

---

## 2. Character Device

داده را به صورت Stream منتقل می‌کند.

مثال:

```
/dev/tty
/dev/console
```

کاربرد:

- Terminal
- Keyboard
- Serial Device

---

## 3. Pseudo Device

Device واقعی نیست، توسط Kernel ساخته می‌شود.

مثال:

### `/dev/null`

هر چیزی به آن بدهی حذف می‌شود:

```
echo hello > /dev/null
```

نتیجه:

```
hello disappears
```

---

### `/dev/zero`

بی‌نهایت صفر تولید می‌کند:

```
cat /dev/zero
```

خروجی:

```
000000000000000
```

کاربرد:

ساخت فایل تست:

```
dd if=/dev/zero of=test.img bs=1M count=100
```

---

### `/dev/random`

اعداد تصادفی تولید می‌کند.

کاربرد:

- Encryption
- Security

---

# 5) Device Naming در `/dev`

## دیسک‌های SATA/SCSI

مثال:

```
/dev/sda
```

معنی:

```
sd = SCSI Disk
a  = اولین Disk
```

دومین Disk:

```
/dev/sdb
```

سوم:

```
/dev/sdc
```

---

## Partition

مثال:

```
/dev/sda1
```

یعنی:

```
Disk:
sda

Partition:
1
```

مثال:

```
/dev/sda
 |
 +-- /dev/sda1
 +-- /dev/sda2
```

---

## NVMe

مثال:

```
/dev/nvme0n1
```

ساختار:

```
nvme0
 |
 n1
```

Partition:

```
/dev/nvme0n1p1
```

توجه:

در NVMe قبل از شماره Partition حرف `p` می‌آید.

---

# 6) دیدن اطلاعات Deviceها

## lsblk

مهم‌ترین دستور:

```
lsblk
```

مثال:

```
NAME        TYPE
sda         disk
├─sda1      part
└─sda2      part
```

---

## file

نوع Device:

```
file /dev/sda
```

---

## ls -l

دیدن نوع Device:

```
ls -l /dev/sda
```

مثال:

```
brw-rw---- 1 root disk
```

حرف اول:

```
b
```

یعنی:

```
block device
```

اگر:

```
c
```

باشد:

```
character device
```

---

# 7) مهم‌ترین Deviceهای `/dev`

|مسیر|کاربرد|
|---|---|
|`/dev/sda`|اولین Disk|
|`/dev/sda1`|اولین Partition|
|`/dev/nvme0n1`|NVMe Disk|
|`/dev/mapper`|LVM Deviceها|
|`/dev/md0`|RAID Device|
|`/dev/null`|حذف خروجی|
|`/dev/zero`|تولید صفر|
|`/dev/random`|تولید Random Data|
|`/dev/tty`|Terminal Device|

---

# 8) ارتباط `/dev` با Storage

در مسیر Storage که داریم یاد می‌گیریم:

```
Physical Disk
      |
      v
/dev/sda          ← Block Device
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

---

# 9) چیزهایی که برای Linux Admin باید بلد باشی

برای کار حرفه‌ای این‌ها مهم هستند:

✅ مفهوم:

```
Device File
```

✅ تفاوت:

```
Block Device
vs
Character Device
```

✅ شناخت:

```
/dev/sda
/dev/sda1
/dev/nvme0n1
```

✅ مدیریت Deviceها با:

```
lsblk
blkid
fdisk -l
```

✅ شناخت Deviceهای مجازی:

```
/dev/null
/dev/zero
/dev/random
```

---

## خلاصه نهایی

ا-`/dev`:

> دایرکتوری‌ای است که لینوکس Deviceهای سیستم را به شکل فایل در آن نمایش می‌دهد.

مهم‌ترین‌ها:

```
/dev/sda       → Disk
/dev/sda1      → Partition
/dev/nvme0n1   → NVMe Disk
/dev/null      → حذف داده
/dev/zero      → تولید صفر
```

در مسیر Storage، بعد از `/dev` موضوع بعدی منطقی **Filesystem** است؛ چون بعد از اینکه یک Block Device داریم، باید آن را با یک Filesystem قابل استفاده کنیم
