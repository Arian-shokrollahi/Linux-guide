# intro to getfacl
---
###  ا-`getfacl` چیست؟

ا-`getfacl` برای **مشاهده ACL** یک فایل یا دایرکتوری استفاده می‌شود.

دستور اصلی:

```
getfacl file.txt
```

مثلاً خروجی:

```
# file: file.txt
# owner: ali
# group: developers
user::rw-
user:reza:r--
group::r--
mask::r--
other::---
```

معنی مهم‌ترین قسمت‌ها:

```
user::rw-        → Owner
user:reza:r--    → User اختصاصی reza
group::r--       → Group اصلی
mask::r--        → حداکثر دسترسی مؤثر ACL
other::---       → سایر کاربران
```

### گزینه مهم

برای دیدن ACL یک دایرکتوری به همراه محتویاتش:

```
getfacl -R directory
```

ا-`-R` یعنی **Recursive**؛ یعنی ACL خود دایرکتوری و داخل آن را نمایش می‌دهد.

### خلاصه برای حفظ کردن

```
getfacl file
     ↓
ACL فایل را نمایش می‌دهد
```

>ا- **getfacl = مشاهده ACL، نه تغییر دادن آن.**