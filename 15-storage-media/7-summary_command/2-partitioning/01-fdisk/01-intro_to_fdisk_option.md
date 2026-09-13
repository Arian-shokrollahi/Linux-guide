برای `fdisk` بهتره دو بخش را جدا کنیم: **Optionهای خود command** و **دستورهای داخل محیط تعاملی `fdisk`**.

## ا-1. Optionهای اصلی `fdisk`

```
fdisk [options] <device>
```

|Option|کاربرد|
|---|---|
|`-l`|نمایش Partitionهای تمام دیسک‌ها|
|`-l <device>`|نمایش Partitionهای یک دیسک مشخص|
|`-s`|نمایش اندازه Partition به Block|
|`-u`|نمایش واحد اندازه‌گیری به Sector|
|`-b <size>`|تعیین اندازه Sector|
|`-C <cylinders>`|تعیین تعداد Cylinderها|
|`-H <heads>`|تعیین تعداد Headها|
|`-S <sectors>`|تعیین تعداد Sectorها در هر Track|
|`-w <mode>`|مشخص کردن زمان نوشتن تغییرات|
|`-t <type>`|مشخص کردن نوع Partition Table|
|`-c`|فعال/غیرفعال کردن DOS compatibility mode|
|`-v`|نمایش نسخه `fdisk`|
|`-h`|نمایش Help|

### مهم‌ترین Option

```
sudo fdisk -l
# > List partition tables
```

برای بررسی یک دیسک:

```
sudo fdisk -l /dev/sdb
# > List partitions of /dev/sdb
```

---

# 2. دستورهای داخل `fdisk`

وقتی اجرا می‌کنی:

```
sudo fdisk /dev/sdb
```

وارد محیط interactive می‌شوی:

```
Command (m for help):
```

اینجا این حروف را وارد می‌کنی:

|Command|کاربرد|
|---|---|
|`m`|نمایش Help|
|`p`|نمایش Partition Table|
|`n`|ساخت Partition جدید|
|`d`|حذف Partition|
|`t`|تغییر Partition Type|
|`l`|نمایش تمام Partition Typeها|
|`w`|ذخیره تغییرات و خروج|
|`q`|خروج بدون ذخیره تغییرات|
|`a`|تغییر Bootable Flag|
|`g`|ساخت GPT Partition Table جدید|
|`o`|ساخت MBR/DOS Partition Table جدید|
|`F`|نمایش فضای Unpartitioned|
|`i`|نمایش اطلاعات یک Partition|
|`x`|ورود به Expert Mode|
|`v`|بررسی صحت Partition Table|

---

## مهم‌ترین‌ها برای کار عملی

### `p` → مشاهده

```
Command: p
```

Partition Table را نمایش می‌دهد.

### `n` → ساخت Partition

```
Command: n
```

برای ایجاد Partition جدید.

### `d` → حذف

```
Command: d
```

یک Partition را حذف می‌کند.

### `t` → تغییر Type

```
Command: t
```

نوع Partition را تغییر می‌دهد؛ مثلاً Linux filesystem، Swap و غیره.

### `w` → ذخیره

```
Command: w
```

تغییرات را روی دیسک **می‌نویسد** و خارج می‌شود.

⚠️ این مهم است: تا قبل از `w`، تغییرات معمولاً روی Partition Table ذخیره نشده‌اند.

### `q` → خروج بدون ذخیره

```
Command: q
```

از `fdisk` خارج می‌شود و تغییرات را ذخیره نمی‌کند.

---

## یک سناریوی واقعی

فرض کن `/dev/sdb` یک دیسک جدید است:

```
sudo fdisk /dev/sdb
```

بعد:

```
p    → بررسی دیسک
n    → ساخت Partition
p    → بررسی دوباره
w    → ذخیره تغییرات
```

بعد از ساخت مثلاً `/dev/sdb1`:

```
lsblk
```

و اگر خواستی Filesystem بسازی:

```
sudo mkfs.ext4 /dev/sdb1
```

بعد:

```
sudo mount /dev/sdb1 /mnt
```

پس زنجیره اصلی کار این است:

```
fdisk
  ↓
Partition
  ↓
mkfs
  ↓
Filesystem
  ↓
mount
  ↓
استفاده از Storage
```

**۳ دستور `fdisk` که برای شروع باید کاملاً بلد باشی:**

```
fdisk -l       # List partitions
fdisk /dev/sdb # Manage partitions
```

و داخل آن:

```
p → print
n → new
d → delete
w → write
q → quit
```

این‌ها هسته اصلی کار عملی با `fdisk` هستند؛ گزینه‌هایی مثل `-C`، `-H` و `-S` بیشتر جنبه‌های قدیمی/تخصصی دارند و در کار معمول با دیسک‌های مدرن کمتر استفاده می‌شوند.