# تفاوت Package، Application و Library

## 1. Application چیست؟

**Application** همان نرم‌افزار یا برنامه‌ای است که برای انجام یک کار مشخص استفاده می‌کنیم.

مثلاً:

```
Firefox     → مرورگر
VLC         → پخش‌کننده ویدئو
LibreOffice → مجموعه نرم‌افزاری
nginx       → Web Server
```

یعنی Application چیزی است که **کار مشخصی برای کاربر انجام می‌دهد**.

مثلاً:

```
firefox
```

یک Application است.

---

# 2. Library چیست؟

ا-**Library** مجموعه‌ای از کدها و توابع آماده است که برنامه‌های دیگر از آن‌ها استفاده می‌کنند.

یعنی Library معمولاً برای این ساخته نشده که کاربر مستقیماً آن را اجرا کند؛ بلکه **Application از آن استفاده می‌کند**.

مثلاً فرض کن Application ما این کار را می‌خواهد انجام دهد:

```
Application
    ↓
می‌خواهد یک فایل PDF باز کند
    ↓
از یک Library مربوط به PDF استفاده می‌کند
```

یا:

```
Application
    ↓
نیاز به رمزنگاری دارد
    ↓
از یک Cryptography Library استفاده می‌کند
```

پس:

```
Application → از Library استفاده می‌کند
```

---

# 3. Package چیست؟

ا-**Package** در واقع یک **بسته‌ی قابل نصب و مدیریت** است که فایل‌های لازم برای نصب یک نرم‌افزار یا یک جزء نرم‌افزاری را در خودش دارد.

یک Package می‌تواند شامل این‌ها باشد:

```
Package
   ├── Program Files
   ├── Configuration Files
   ├── Documentation
   ├── Metadata
   └── Dependency Information
```

بنابراین Package لزوماً خودش «Application» نیست.

ممکن است یک Package شامل:

```
Application
```

باشد، یا شامل:

```
Library
```

باشد.

---

# یک مثال خیلی ساده

فرض کن یک برنامه به نام:

```
MyApp
```

داریم.

این برنامه برای انجام بعضی کارها به:

```
libA
libB
```

نیاز دارد.

پس:

```
MyApp
  ↓
Application

libA
libB
  ↓
Libraries
```

حالا سیستم Package Management ممکن است این‌ها را به شکل Package ارائه کند:

```
myapp-package
libA-package
libB-package
```

یعنی:

```
Application ≠ Package
Library ≠ Package
```

بلکه:

```
Application / Library
        ↓
می‌توانند داخل Package توزیع شوند
```

---

# یک جدول خیلی مهم

|مفهوم|چیست؟|معمولاً چه کاری انجام می‌دهد؟|مثال|
|---|---|---|---|
|**Application**|یک نرم‌افزار برای انجام یک کار مشخص|مستقیماً برای انجام کار استفاده می‌شود|Firefox, VLC|
|**Library**|کد و توابع آماده برای استفاده‌ی برنامه‌های دیگر|به Application ها قابلیت می‌دهد|OpenSSL, libc|
|**Package**|بسته‌ی قابل نصب و مدیریت|نرم‌افزار یا اجزای آن را نصب و مدیریت می‌کند|`.deb`, `.rpm`|

---

# رابطه این سه تا با هم

بهترین شکل برای درک رابطه:

```
             Package
                |
       -------------------
       |                 |
   Application         Library
       |                 |
       ------- uses ------
```

مثلاً:

```
Firefox
   ↓
از چندین Library استفاده می‌کند
   ↓
Library ها در Package های مختلف قرار دارند
```

---

# یک نکته خیلی مهم

ا-**Package یک روش توزیع و مدیریت نرم‌افزار است، نه خود نرم‌افزار.**

مثلاً در Ubuntu:

```
sudo apt install nginx
```

اینجا:

```
nginx
→ Application / Software

nginx package
→ بسته‌ای که برای نصب و مدیریت nginx استفاده می‌شود

apt
→ Package Manager
```

---

## خلاصه‌ای که پیشنهاد می‌کنم حفظ کنی

```
Application
→ برنامه‌ای که یک کار مشخص انجام می‌دهد.

Library
→ کدهای آماده‌ای که برنامه‌های دیگر از آن‌ها استفاده می‌کنند.

Package
→ بسته‌ای که فایل‌ها و اطلاعات لازم برای نصب و مدیریت
   نرم‌افزار یا Library را در خودش دارد.
```

و مهم‌ترین رابطه:

```
Application uses Library

Package contains/distributes Application or Library
```

این تفکیک برای فهمیدن **Dependency** هم خیلی مهم است؛ چون وقتی یک Application به یک Library نیاز دارد، آن Library تبدیل به یکی از Dependency های برنامه می‌شود.
