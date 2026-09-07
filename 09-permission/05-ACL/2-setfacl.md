# intro to setfacl
---
# ا-`setfacl`

### 1. تعریف `setfacl`

ا-`setfacl` مخفف **Set File Access Control Lists** است.

از آن برای **ایجاد، تغییر و حذف ACL** روی فایل‌ها و دایرکتوری‌ها استفاده می‌کنیم.

یعنی:

```
setfacl → تنظیم / تغییر ACL
getfacl → مشاهده ACL
```

---

# 2. ساختار کلی `setfacl`

ساختار اصلی:

```
setfacl [options] ACL file
```

مثلاً:

```
setfacl -m u:ali:rwx file.txt
```

اجزای آن:

```
setfacl
   ↓
-m
   ↓
u:ali:rwx
   ↓
file.txt
```

یعنی ACL مربوط به `ali` را روی `file.txt` تنظیم کن.

---

# 3. ا-`-m` چیست؟

ا-`-m` یعنی:

```
modify
```

یعنی **اضافه کردن یا تغییر ACL**.

مثلاً:

```
setfacl -m u:ali:rw file.txt
```

یعنی User `ali` دسترسی:

```
r = read
w = write
```

داشته باشد.

---

# 4. ساختار ACL

قسمت مهم:

```
u:ali:rw
```

ساختارش:

```
u : ali : rw
↑    ↑     ↑
│    │     └── Permission
│    └──────── Username
└───────────── نوع ACL
```

نوع‌ها:

```
u → User
g → Group
m → Mask
o → Other
```

---

# 5. دادن Permission به User

```
setfacl -m u:ali:rwx file.txt
```

یعنی:

```
User = ali
Permission = rwx
```

پس `ali` می‌تواند:

```
r → بخواند
w → تغییر دهد
x → اجرا کند
```

---

# 6. دادن Permission به Group

برای Group:

```
setfacl -m g:developers:rwx file.txt
```

یعنی Group به نام `developers` دسترسی `rwx` داشته باشد.

ساختار:

```
g:developers:rwx
```

---

# 7. تغییر Mask

ا-`mask` حداکثر Permission مؤثر برای **Group class** است؛ یعنی روی دسترسی‌های ACL مربوط به Group و Userهای نام‌گذاری‌شده اثر می‌گذارد.

مثلاً:

```
setfacl -m m:r-x file.txt
```

یعنی Mask را روی:

```
r-x
```

قرار بده.

---

# 8. تنظیم Other

می‌توانی ACL مربوط به Others را هم تنظیم کنی:

```
setfacl -m o:r file.txt
```

یعنی Others فقط `read` داشته باشند.

البته برای Permissionهای معمولی فایل، `chmod` هم برای این کار استفاده می‌شود.

---

# 9. حذف ACL با `-x`

`-x` یعنی **حذف ACL**.

مثلاً:

```
setfacl -x u:ali file.txt
```

یعنی ACL اختصاصی `ali` را حذف کن.

نکته:

```
-m → اضافه / تغییر
-x → حذف
```

---

# 10. حذف تمام ACLهای اضافی

برای حذف ACLهای Extended و برگشت به حالت معمولی:

```
setfacl -b file.txt
```

ا-`-b` یعنی **remove all extended ACL entries**.

---

# 11. ا-Default ACL ⭐

یکی از مهم‌ترین قسمت‌های `setfacl`، **Default ACL** است.

روی Directory استفاده می‌شود.

مثلاً:

```
setfacl -d -m g:developers:rwx project
```

یعنی برای دایرکتوری `project` یک Default ACL تنظیم کن.

فایل‌ها و دایرکتوری‌های جدیدی که داخل آن ساخته می‌شوند، ACL پیش‌فرض را به ارث می‌برند.

ساختار:

```
-d → Default ACL
-m → Modify
g:developers:rwx → Group developers با rwx
```

---

# 12. ا-Recursive با `-R`

ا-`-R` یعنی **Recursive**.

یعنی تغییر ACL برای دایرکتوری و محتویات داخل آن.

مثلاً:

```
setfacl -R -m u:ali:rw project
```

یعنی `ali` روی `project` و محتویات آن `rw` داشته باشد.

---

# 13. حذف Recursive

مثلاً:

```
setfacl -R -x u:ali project
```

ا-ACL مربوط به `ali` را به‌صورت Recursive حذف می‌کند.

---

# ا-14. Permissionهای ACL

همان Permissionهای معمولی را داریم:

```
r → read
w → write
x → execute
```

مثلاً:

```
u:ali:r--
```

یعنی `ali` فقط Read دارد.

```
u:ali:rw-
```

یعنی Read + Write.

```
u:ali:rwx
```

یعنی Read + Write + Execute.

---

# 15. یک مثال کامل

فرض کن:

```
file.txt
```

داریم و می‌خواهیم `ali` بتواند آن را بخواند و تغییر دهد.

می‌زنیم:

```
setfacl -m u:ali:rw file.txt
```

بعد برای بررسی:

```
getfacl file.txt
```

ممکن است ببینیم:

```
user::rw-
user:ali:rw-
group::r--
mask::rw-
other::r--
```

یعنی ACL اختصاصی برای `ali` ساخته شده است.

---

# 16. چند دستور مهم که باید بلد باشی

```
setfacl -m u:ali:rwx file
```

دادن ACL به User.

```
setfacl -m g:developers:rwx file
```

دادن ACL به Group.

```
setfacl -x u:ali file
```

حذف ACL یک User.

```
setfacl -b file
```

حذف ACLهای اضافی.

```
setfacl -d -m g:developers:rwx directory
```

ساخت Default ACL.

```
setfacl -R -m u:ali:rwx directory
```

اعمال Recursive.

---

# 17. خلاصه گزینه‌های مهم

|گزینه|معنی|
|---|---|
|`-m`|Modify؛ اضافه/تغییر ACL|
|`-x`|حذف یک ACL|
|`-b`|حذف Extended ACLها|
|`-d`|Default ACL|
|`-R`|Recursive|
|`-n`|Mask را به‌صورت خودکار تغییر نده|
|`-n`|در موارد خاص برای جلوگیری از محاسبه مجدد Mask استفاده می‌شود|

---

# 18. فرمولی که باید حفظ کنی

```
setfacl -m u:USER:PERMISSION FILE
```

مثلاً:

```
setfacl -m u:ali:rwx file.txt
```

و برای Group:

```
setfacl -m g:GROUP:PERMISSION FILE
```

مثلاً:

```
setfacl -m g:developers:rw file.txt
```

---

## جمع‌بندی نهایی ⭐

```
setfacl
   ↓
تنظیم و تغییر ACL
```

مهم‌ترین ساختار:

```
setfacl -m u:ali:rw file
```

یعنی:

```
-m     → تغییر
u      → User
ali    → نام User
rw     → Permission
file   → فایل هدف
```

و این‌ها را حتماً حفظ کن:

```
-m → Modify
-x → حذف ACL
-b → حذف Extended ACL
-d → Default ACL
-R → Recursive
```

**تفاوت اصلی هم:**

```
getfacl → ACL رو ببین
setfacl → ACL رو تغییر بده
```
