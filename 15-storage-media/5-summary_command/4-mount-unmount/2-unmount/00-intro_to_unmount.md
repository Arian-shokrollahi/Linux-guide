## ا-`umount`

ا-`umount` برای **جدا کردن یک Filesystem از Mount Point** استفاده می‌شود.  
یعنی برعکس `mount` است؛ بدون اینکه Filesystem را حذف کند.

```
/dev/sdb1
   ↓
/mnt/data
   ↓
umount
   ↓
جدا می‌شود
```

### ساختار کلی

```
umount <device>
umount <mount-point>
```

مثلاً:

```
sudo umount /dev/sdb1
```

یا:

```
sudo umount /mnt/data
```

هر دو می‌توانند همان Filesystem را Unmount کنند.

### ا-Switchهای مهم

|Switch|کاربرد|
|---|---|
|`-a`|Unmount کردن همه Filesystemهای موجود در `/etc/mtab`|
|`-t <type>`|فقط Filesystem با نوع مشخص|
|`-v`|نمایش جزئیات عملیات|
|`-f`|Force unmount؛ بیشتر برای موارد خاص مثل NFS|
|`-l`|Lazy unmount|

### ۳ مورد پرکاربرد

```
sudo umount /mnt/data
# > Unmount the filesystem
```

```
sudo umount -v /mnt/data
# > Unmount with verbose output
```

```
sudo umount -l /mnt/data
# > Perform a lazy unmount
```

### اگر `target is busy` گرفتی

یعنی یک Process هنوز از آن Mount Point استفاده می‌کند.

برای پیدا کردنش:

```
sudo lsof /mnt/data
```

یا:

```
sudo fuser -m /mnt/data
```

بعد Process را بررسی کن و دوباره:

```
sudo umount /mnt/data
```

### نکته‌های مهم

- ا-`umount` **Filesystem را حذف نمی‌کند**؛ فقط اتصال آن به Mount Point را قطع می‌کند.
- قبل از جدا کردن Disk، بهتر است ابتدا `umount` کنی تا داده‌های در حال نوشتن از بین نروند.

```
mount   → اتصال
umount  → جدا کردن
```