### ا-`lsblk -o`

**مقدمه:**  
ا-`lsblk -o` برای **انتخاب ستون‌هایی که می‌خواهیم در خروجی نمایش داده شوند** استفاده می‌شود.

### ساختار

```
lsblk -o COLUMN1,COLUMN2,COLUMN3
# > Choose which columns to display
```

مثلاً:

```
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
```

### ستون‌های قابل انتخاب

|ستون|معنی|کاربرد|
|---|---|---|
|`NAME`|نام Device|شناسایی دیوایس|
|`SIZE`|حجم|مشاهده اندازه|
|`TYPE`|نوع|`disk`، `part`، `lvm` و...|
|`FSTYPE`|نوع Filesystem|`ext4`، `xfs` و...|
|`UUID`|شناسه یکتا|شناسایی پارتیشن|
|`LABEL`|برچسب|نام Filesystem|
|`MOUNTPOINTS`|محل Mount|مسیر اتصال|
|`OWNER`|مالک|User مالک|
|`GROUP`|گروه|Group مالک|
|`MODE`|Permission|سطح دسترسی|

**کاربرد اصلی:** وقتی خروجی پیش‌فرض `lsblk` اطلاعات زیادی دارد و فقط **ستون‌های موردنیاز خودت** را می‌خواهی.
