### ا-`findmnt`

ا-`findmnt` برای نمایش **Filesystemهای Mount شده و محل Mount آن‌ها** استفاده می‌شود؛ یعنی می‌توانی ببینی هر پارتیشن یا Filesystem کجا و با چه تنظیماتی Mount شده است.

همچنین برای بررسی **Mount Options** و پیدا کردن Mount Pointها خیلی کاربردی است.

### ا-Switchهای مهم

|Switch|کاربرد|
|---|---|
|`-a`|نمایش تمام Filesystemها، حتی pseudo filesystemها|
|`-t`|نمایش فقط نوع مشخصی از Filesystem|
|`-n`|حذف Header ستون‌ها|
|`-o`|انتخاب ستون‌های خروجی|
|`-r`|خروجی Raw|
|`-f`|نمایش اطلاعات کامل‌تر Filesystem|

### ۳ Switch پرکاربرد

```
findmnt -t ext4
# > Show only ext4 filesystems
```

```
findmnt -o SOURCE,TARGET,FSTYPE,OPTIONS
# > Show selected mount information
```

```
findmnt -f
# > Show filesystem information
```

### دو نکته مهم

- ا-`findmnt` بیشتر برای **بررسی Mountها** است؛ در حالی که `lsblk` بیشتر ساختار Block Deviceها را نشان می‌دهد.
- برای بررسی اینکه یک پارتیشن **کجا Mount شده و با چه Optionهایی**، `findmnt` بسیار کاربردی است