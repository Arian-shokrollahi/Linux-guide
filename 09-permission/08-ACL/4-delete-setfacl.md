# حذف setfacl که رویه فایل یا فولدر تنظیم کردی؟
---
اگه منظورت حذف **ACL تنظیم‌شده با `setfacl`** هست، چند حالت داری:

### 1. حذف ACL یک کاربر خاص

مثلاً ACL کاربر `ali` رو حذف کنی:

```
setfacl -x u:ali file.txt
```

### 2. حذف ACL یک گروه خاص

```
setfacl -x g:developers file.txt
```

### 3. حذف **تمام ACLهای اضافه‌شده** ⭐

```
setfacl -b file.txt
```

این معمولاً همون چیزیه که وقتی میگی «setfacl رو حذف کنم» منظورت هست.

بعد بررسی کن:

```
getfacl file.txt
```

یا:

```
ls -l file.txt
```

اگر `+` کنار permissionها نباشه، ACL اضافی نداره:

```
-rw-r--r-- file.txt
```

ولی اگر اینطوری باشه:

```
-rw-r--r--+ file.txt
```

یعنی ACL اضافی وجود داره.

**حفظی:**

- ا-`setfacl -x` → حذف **یک ACL**
- ا-`setfacl -b` → حذف **همه ACLهای اضافه**
