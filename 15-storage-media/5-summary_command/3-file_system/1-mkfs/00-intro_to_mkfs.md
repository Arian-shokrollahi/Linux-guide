## ا-`mkfs`

ا-`mkfs` مخفف **Make Filesystem** است و برای **ساختن یک Filesystem روی یک Partition یا Block Device** استفاده می‌شود.

یعنی بعد از اینکه با `fdisk` یک Partition ساختی:

```
/dev/sdb
   ↓
fdisk
   ↓
/dev/sdb1
   ↓
mkfs
   ↓
ext4 Filesystem
   ↓
mount
```

### ساختار کلی

```
mkfs [options] <device>
```

مثلاً:

```
sudo mkfs.ext4 /dev/sdb1
# > Create an ext4 filesystem on /dev/sdb1
```

---

## ا-`mkfs` دقیقاً چه کاری می‌کند؟

فرض کن `/dev/sdb1` فقط یک Partition خام است:

```
/dev/sdb1
┌─────────────────────┐
│     Raw Partition   │
└─────────────────────┘
```

وقتی می‌زنی:

```
sudo mkfs.ext4 /dev/sdb1
```

ساختار Filesystem `ext4` روی آن ایجاد می‌شود:

```
/dev/sdb1
┌─────────────────────┐
│    ext4 filesystem  │
│ superblock          │
│ metadata            │
│ inode structures    │
│ data blocks         │
└─────────────────────┘
```

بعد از آن می‌توانی آن را `mount` کنی.

---

## چرا `mkfs` چند شکل دارد؟

ا-`mkfs` یک دستور عمومی است و برای Filesystemهای مختلف ابزارهای مخصوص وجود دارد:

```
mkfs.ext4
mkfs.xfs
mkfs.btrfs
mkfs.vfat
```

مثلاً:

```
sudo mkfs.ext4 /dev/sdb1
```

یا:

```
sudo mkfs.xfs /dev/sdb1
```

یعنی **نوع Filesystem را مشخص می‌کنی**.

---

## ا-Optionهای مهم

|Option|کاربرد|
|---|---|
|`-t <type>`|مشخص کردن نوع Filesystem|
|`-V`|نمایش اطلاعات/نسخه|
|`-h`|نمایش Help|
|`-v`|نمایش جزئیات بیشتر|

مثلاً:

```
sudo mkfs -t ext4 /dev/sdb1
```

معادل تقریباً:

```
sudo mkfs.ext4 /dev/sdb1
```

---

## یک نکته خیلی مهم ⚠️

`mkfs` **اطلاعات موجود روی Device را از بین می‌برد**، چون Filesystem جدید ایجاد می‌کند.

مثلاً:

```
sudo mkfs.ext4 /dev/sdb1
```

را روی Partition دارای اطلاعات مهم اجرا نکنی.

---

### در مسیر Storage که داری یاد می‌گیری:

```
Disk
 ↓
Partition Table
 ↓
Partition          ← fdisk
 ↓
Filesystem         ← mkfs
 ↓
Mount              ← mount
 ↓
Use
```

پس تعریف یک‌خطی:
> ا-**`mkfs` = ساخت Filesystem روی یک Block Device یا Partition.**
