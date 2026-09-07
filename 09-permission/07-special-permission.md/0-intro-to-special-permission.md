# 0-intro to special permission
---
### مقدمه Special Permissions

در لینوکس Permissionهای معمولی شامل این‌ها هستند:

```
r = read
w = write
x = execute
```

و برای سه دسته اعمال می‌شوند:

```
User (Owner)
Group
Others
```

اما لینوکس یک سری **Permission خاص (Special Permission)** هم دارد که رفتار فایل یا دایرکتوری را تغییر می‌دهند.

سه Special Permission اصلی عبارت‌اند از:

```
SUID
SGID
Sticky Bit
```

این Permissionها بیشتر برای **کنترل دسترسی و نحوه اجرای فایل‌ها و کار با دایرکتوری‌ها** استفاده می‌شوند.

مثلاً:

- ا-**SUID** → برنامه با Permission مربوط به Owner اجرا می‌شود.
- ا-**SGID** → برنامه با Permission مربوط به Group اجرا می‌شود؛ روی دایرکتوری هم باعث می‌شود فایل‌های جدید Group دایرکتوری را به ارث ببرند.
- ا-**Sticky Bit** → در یک دایرکتوری مشترک، معمولاً فقط Owner فایل (یا Owner دایرکتوری/root) می‌تواند فایل را حذف یا rename کند.

پس به‌صورت خلاصه:

```
Special Permissions
       │
       ├── SUID
       ├── SGID
       └── Sticky Bit
```

**نکته:** این سه تا را باید جدا از `rwx`های معمولی یاد بگیری، چون کاربرد و رفتار خاص خودشان را دارند.
