# ا-Unmount چیست؟

ا-**Unmount یعنی جدا کردن یک File System از ساختار فایل لینوکس.**

یعنی به سیستم می‌گوییم:

"دیگر این Disk را از این مسیر استفاده نکن."

قبل از Unmount:

```
/data

        |
        |
     /dev/sdb1
        |
       ext4
```

بعد از Unmount:

```
/data

(فقط یک Directory معمولی)
```###  ا-Unmount یعنی حذف اطلاعات نیست

خیلی مهم:

ا-Unmount ≠ Delete

ا-Unmount فقط اتصال را قطع می‌کند.

اطلاعات همچنان روی Disk باقی می‌مانند.