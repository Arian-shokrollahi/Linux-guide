## ا-`mount`

ا-`mount` برای **متصل کردن یک Filesystem به یک مسیر درخت Linux** استفاده می‌شود.  
یعنی بعد از ساخت Filesystem با `mkfs`، با `mount` مشخص می‌کنی این Filesystem از کدام مسیر قابل دسترسی باشد.

```
/dev/sdb1
   ↓
ext4
   ↓
mount
   ↓
/mnt/data
```

### ساختار کلی

```
mount [options] <source> <target>
```

مثال:

```
sudo mount /dev/sdb1 /mnt/data
# > Mount /dev/sdb1 on /mnt/data
```

از این به بعد محتویات `/dev/sdb1` از طریق `/mnt/data` قابل دسترسی است.

---

### ا-Switchهای مهم

|Switch|کاربرد|
|---|---|
|`-a`|Mount کردن Filesystemهای تعریف‌شده در `/etc/fstab`|
|`-t <type>`|مشخص کردن نوع Filesystem|
|`-o <options>`|تعیین Mount Options|
|`-r`|Read-only Mount|
|`-w`|Read-write Mount|
|`-v`|نمایش جزئیات عملیات|
|`-B`|Bind Mount|

### ۳ مورد پرکاربرد

```
sudo mount /dev/sdb1 /mnt/data
# > Mount a filesystem
```

```
sudo mount -o ro /dev/sdb1 /mnt/data
# > Mount as read-only
```

```
sudo mount -a
# > Mount all filesystems from /etc/fstab
```

### بررسی Mount

بعد از Mount:

```
findmnt /mnt/data
```

یا:

```
lsblk -f
```

### نکته‌های مهم

- ا-`mount` **Filesystem نمی‌سازد**؛ فقط Filesystem موجود را به یک مسیر متصل می‌کند.
- ا-Mount کردن معمولاً تا **Reboot** موقتی است؛ برای Mount دائمی باید `/etc/fstab` را تنظیم کنی.

```
mkfs → ساخت Filesystem
mount → اتصال Filesystem به مسیر
fstab → Mount خودکار و دائمی
```