### ا-ACL چیست؟

ا-**ACL = Access Control List**

ا-ACL در لینوکس برای اینه که بتوانیم **Permissionهای دقیق‌تر و جداگانه برای Userها و Groupهای خاص** تعیین کنیم؛ چیزی فراتر از `rwx` معمولی.

مثلاً با Permission معمولی می‌توانیم بگوییم:

```
Owner  → rwx
Group  → r-x
Others → r--
```

ولی با ACL می‌توانیم بگوییم:

```
Owner       → rwx
Group       → r-x
Ali         → rw-
Reza        → r--
Others      → ---
```

یعنی می‌توانیم برای **کاربر یا گروه مشخص** Permission جدا تعیین کنیم.

دستورهای مهم ACL:

```
getfacl file        # مشاهده ACL
setfacl -m u:ali:rw file    # دادن Permission به یک User
setfacl -m g:dev:rwx file   # دادن Permission به یک Group
setfacl -x u:ali file       # حذف ACL یک User
```

### خلاصه حفظی:

> ا-**ACL یعنی تعیین Permissionهای دقیق و اختصاصی برای Userها و Groupهای خاص، علاوه بر Permissionهای معمولی.**
# intro to getfacl and setfacl
---
### مقدمه `getfacl` و `setfacl`

در لینوکس، **ACL** به ما اجازه می‌دهد برای Userها و Groupهای مشخص، Permissionهای جداگانه تعریف کنیم.

برای کار با ACL دو دستور اصلی داریم:

```
getfacl → مشاهده ACL
setfacl → ایجاد یا تغییر ACL
```

یعنی خیلی ساده:

```
getfacl
   ↓
ACL فایل چی هست؟
   ↓
نمایش می‌دهد


setfacl
   ↓
ACL فایل رو تغییر بده
   ↓
Permission جدید تنظیم می‌کند
```

### تفاوت اصلی

|دستور|کاربرد|
|---|---|
|`getfacl`|**مشاهده** ACL|
|`setfacl`|**تنظیم / تغییر** ACL|

مثلاً:

```
getfacl file.txt
```

یعنی ACL فایل را ببین.

ولی:

```
setfacl -m u:ali:rw file.txt
```

یعنی برای User `ali`، دسترسی `read + write` تنظیم کن.

### حفظی‌ترین حالت:

> ا-**GET = گرفتن و دیدن ACL**  
> ا-ش**SET = تنظیم و تغییر ACL**y
