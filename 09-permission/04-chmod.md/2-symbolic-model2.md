## روش دوم دادن دسترسی روش نمادی
---
### روش Symbolic در `chmod`

در روش **Symbolic** به‌جای عدد، از **حروف و علامت‌ها** استفاده می‌کنیم.

سه گروه اصلی:

```
u → User / Owner
g → Group
o → Others
a → All
```

و سه عمل اصلی:

```
+ → اضافه کردن Permission
- → حذف کردن Permission
= → تعیین کردن Permission
```

خود Permissionها هم:

```
r → Read
w → Write
x → Execute
```

مثلاً:

```
chmod u+x test.sh
```

یعنی **برای Owner، اجازه Execute را اضافه کن.**

یا:

```
chmod g-w test.txt
```

یعنی **اجازه Write را از Group حذف کن.**

یا:

```
chmod o+r test.txt
```

یعنی **به Others اجازه Read بده.**

پس ساختار کلی روش Symbolic:

```
chmod [چه کسی] [چه کاری] [چه Permissionای] file
```

مثلاً:

```
chmod u+x file
      │ │
      │ └── x → Execute
      └──── + → اضافه کردن
      u → Owner
```

این روش بیشتر زمانی مفیده که بخوای **فقط یک Permission خاص رو تغییر بدی**، بدون اینکه بقیه Permissionها رو دست بزنی.
