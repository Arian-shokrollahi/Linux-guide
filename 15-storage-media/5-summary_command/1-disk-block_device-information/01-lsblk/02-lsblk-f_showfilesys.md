### ا-`lsblk -f`

**مقدمه:**  
ا-`lsblk -f` برای نمایش **اطلاعات Filesystem دیسک‌ها و پارتیشن‌ها** استفاده می‌شود؛ مخصوصاً برای فهمیدن نوع فایل‌سیستم، UUID و محل Mount.

### تحلیل ستون‌ها

|ستون|معنی|کاربرد|
|---|---|---|
|`NAME`|نام Device|شناسایی دیسک/پارتیشن|
|`FSTYPE`|نوع Filesystem|مثل `ext4`، `xfs`، `swap`|
|`FSVER`|نسخه Filesystem|تشخیص نسخه فایل‌سیستم|
|`LABEL`|برچسب|نامی که برای Filesystem تعیین شده|
|`UUID`|شناسه یکتا|شناسایی مطمئن پارتیشن|
|`FSAVAIL`|فضای آزاد|مقدار فضای قابل استفاده|
|`FSUSE%`|درصد استفاده|میزان پر بودن Filesystem|
|`MOUNTPOINTS`|محل Mount|مسیر اتصال Filesystem|

```
lsblk -f
# > Show filesystem information for block devices
```

**کاربرد مهم:** مخصوصاً هنگام کار با **Mount و `/etc/fstab`** خیلی کاربردی است، چون `UUID` و `FSTYPE` را سریع نشان می‌دهد.