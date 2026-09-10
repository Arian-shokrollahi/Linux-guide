# ا-Documentation در Package چیست؟

ا-**Documentation** یعنی فایل‌های راهنما و توضیحاتی که همراه یک Package قرار می‌گیرند تا به کاربر بگویند **نرم‌افزار چیست، چطور استفاده می‌شود و چه تنظیماتی دارد**.

یعنی:

```
Program Files
→ برنامه را اجرا می‌کنند

Configuration Files
→ رفتار برنامه را تنظیم می‌کنند

Documentation
→ نحوه استفاده و اطلاعات برنامه را توضیح می‌دهد
```

### ا-Documentation چه چیزهایی می‌تواند داشته باشد؟

مثلاً:

```
Documentation
   |
   ├── README
   ├── User Guide
   ├── Examples
   ├── ChangeLog
   └── Manual Pages
```

ممکن است شامل این اطلاعات باشد:

- روش نصب و استفاده
- توضیح دستورات و Option ها
- مثال‌های استفاده
- تغییرات نسخه‌های مختلف
- توضیح Configuration ها
- راهنمای رفع بعضی مشکلات

### در Linux کجا قرار می‌گیرند؟

یکی از مسیرهای رایج:

```
/usr/share/doc/
```

مثلاً:

```
/usr/share/doc/nginx/
```

همچنین بعضی نرم‌افزارها **Manual Page** دارند که با `man` می‌توانی ببینی:

```
man nginx
```

یا:

```
man ls
```

### یک مثال ساده

فرض کن Package این ساختار را دارد:

```
myapp
 |
 ├── /usr/bin/myapp
 │      → Program
 │
 ├── /etc/myapp/config.conf
 │      → Configuration
 │
 └── /usr/share/doc/myapp/
        → Documentation
```

پس Documentation **جزء خود برنامه نیست**؛ بلکه اطلاعاتی است که کمک می‌کند برنامه را درست بشناسی و استفاده کنی.

### خلاصه

```
Documentation
=
راهنمای استفاده + توضیحات + مثال‌ها + اطلاعات Package
```

یکی از مهم‌ترین ابزارها برای خواندن Documentation در Linux هم `man` است:

```
man <command>
```

مثلاً:

```
man apt
```
