## ا-`du`

ا-`du` مخفف **Disk Usage** است و برای نمایش مقدار فضایی که **فایل‌ها و دایرکتوری‌ها روی Disk مصرف کرده‌اند** استفاده می‌شود.

```
du [options] [file/directory]
```

مثلاً:

```
du /var/log
# > Show disk usage of /var/log
```

### ا-Switchهای مهم

|Switch|کاربرد|
|---|---|
|`-h`|نمایش حجم به صورت خوانا مثل `K`, `M`, `G`|
|`-s`|فقط نمایش مجموع حجم|
|`-a`|نمایش فایل‌ها هم، نه فقط Directoryها|
|`-d <N>`|مشخص کردن عمق نمایش Directoryها|
|`-c`|نمایش Total در انتهای خروجی|
|`-x`|فقط همان Filesystem را بررسی می‌کند|
|`--max-depth=<N>`|تعیین حداکثر عمق Directory|

### ۳ حالت پرکاربرد

```
du -h /var
# > Show disk usage in human-readable format
```

```
du -sh /var
# > Show total size of /var
```

```
du -ah /var/log
# > Show sizes of all files and directories
```

### مثال کاربردی

اگر بخواهی بفهمی کدام Directoryها بیشتر فضا گرفته‌اند:

```
du -h --max-depth=1 /var
```

مثلاً:

```
500M    /var/log
2.1G    /var/lib
300M    /var/cache
3.0G    /var
```

### نکته مهم

`du` با `df` فرق دارد:

```
du → فایل‌ها و Directoryها چقدر فضا مصرف کرده‌اند؟
df → Filesystem چقدر فضای آزاد/مصرف‌شده دارد؟
```

پس برای پیدا کردن **چه چیزی Disk را پر کرده** → `du`  
برای دیدن **وضعیت کلی Filesystem** → `df`
