## ا-`gdisk`

ا-`gdisk` یک ابزار مدیریت **GPT Partition Table** در Linux است و از نظر کارکرد شبیه `fdisk` است، اما تمرکز اصلی آن روی **GPT** است.

```
sudo gdisk /dev/sdb
```

با `gdisk` می‌توانی Partitionها را **مشاهده، ایجاد، حذف و نوعشان را تغییر** بدهی.

### ا-Optionهای مهم

|Option|کاربرد|
|---|---|
|`-l`|نمایش Partition Table|
|`-v`|بررسی و اعتبارسنجی Partition Table|
|`-h`|نمایش Help|
|`-V`|نمایش Version|
|`-L`|نمایش Partition Typeها|

مثلاً:

```
sudo gdisk -l /dev/sdb
# > List the GPT partition table
```

### دستورهای داخل `gdisk`

بعد از:

```
sudo gdisk /dev/sdb
```

|Command|کاربرد|
|---|---|
|`p`|نمایش Partition Table|
|`n`|ساخت Partition جدید|
|`d`|حذف Partition|
|`t`|تغییر Partition Type|
|`l`|نمایش Partition Typeها|
|`i`|نمایش اطلاعات Partition|
|`v`|بررسی Partition Table|
|`w`|ذخیره تغییرات و خروج|
|`q`|خروج بدون ذخیره|
|`m`|نمایش Help|
|`o`|ساخت GPT جدید|
|`x`|Expert Menu|

### مهم‌ترین‌ها

```
p → Print
n → New
d → Delete
t → Type
v → Verify
w → Write
q → Quit
```

### تفاوت اصلی با `fdisk`

|`fdisk`|`gdisk`|
|---|---|
|ابزار عمومی Partitioning|مخصوص GPT|
|با MBR و GPT کار می‌کند|تمرکز روی GPT|
|برای کارهای عمومی بسیار رایج|برای مدیریت GPT تخصصی‌تر|

**نکته:** در سیستم‌های جدید، **GPT** استاندارد رایج‌تری نسبت به MBR است، مخصوصاً روی دیسک‌های بزرگ و سیستم‌های UEFI.

**نکته مهم:** <mark>`gdisk` مستقیماً Filesystem نمی‌سازد؛ اول Partition را می‌سازی، سپس با `mkfs` روی آن Filesystem ایجاد می‌کنی.</mark> 