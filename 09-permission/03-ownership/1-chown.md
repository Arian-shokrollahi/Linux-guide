# chown command 
---
### دستور `chown`

ا-`chown` مخفف **Change Owner** است و برای **تغییر مالکیت (Ownership)** فایل‌ها و Directoryها استفاده می‌شود.

با `chown` می‌توانیم **Owner** و در صورت نیاز **Group** یک فایل یا Directory را تغییر دهیم.

ساختار کلی:

```
chown [user] [file]
```

مثلاً:

```
chown ali test.txt
```

یعنی مالک `test.txt` را به کاربر `ali` تغییر بده.

همچنین می‌توانیم هم‌زمان **Owner و Group** را تغییر دهیم:

```
chown ali:developers test.txt
```

یعنی:

```
ali       → Owner
developers → Group
```

برای Directory هم دقیقاً همین مفهوم را داریم:

```
chown ali:developers testdir
```

پس خیلی ساده:

```
chmod → تغییر Permission
chown → تغییر Owner / Group
```

**نکته:** برای تغییر مالک یک فایل معمولاً به دسترسی مناسب، اغلب `root` یا `sudo`، نیاز داری.
