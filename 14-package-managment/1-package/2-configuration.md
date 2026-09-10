# 2. ا-Configuration Files در Package چیست؟

ا-**Configuration File** یا **فایل تنظیمات** فایلی است که رفتار و نحوه‌ی کار یک برنامه را مشخص می‌کند.

یعنی خود برنامه را اجرا نمی‌کند؛ بلکه به برنامه می‌گوید:

> «با چه تنظیماتی اجرا شو و چطور رفتار کن.»

مثلاً یک برنامه ممکن است تنظیماتی مثل این داشته باشد:

```
Port = 8080
LogLevel = info
MaxConnections = 100
```

برنامه این مقادیر را از Configuration File می‌خواند و بر اساس آن‌ها عمل می‌کند.

---

## ا-Configuration File کجا قرار می‌گیرد؟

در Linux معمولاً فایل‌های تنظیمات در این مسیرها دیده می‌شوند:

```
/etc
/etc/<program>
```

مثلاً برای `ssh`:

```
/etc/ssh/sshd_config
```

برای یک برنامه‌ی فرضی:

```
/etc/myapp/myapp.conf
```

همچنین بعضی برنامه‌ها Configuration مربوط به **خود User** را در Home Directory نگه می‌دارند، مثلاً:

```
~/.config/
```
---
## یک مثال واقعی با SSH

فرض کن `OpenSSH` نصب شده است.

فایل اجرایی:

```
/usr/sbin/sshd
```

فایل تنظیمات:

```
/etc/ssh/sshd_config
```

پس:

```
sshd
 ↓
Program

sshd_config
 ↓
Configuration
```

مثلاً در Configuration File می‌توانیم تنظیم کنیم SSH روی چه Portی کار کند یا چه روش‌های احراز هویتی مجاز باشند.
