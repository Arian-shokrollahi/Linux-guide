# ا-Repository در Linux چیست؟

ا-**Repository (مخزن نرم‌افزار)** یک محل مرکزی است که Package های یک توزیع Linux در آن نگهداری و منتشر می‌شوند.

یعنی به جای اینکه خودمان Package ها را از سایت‌های مختلف دانلود کنیم، Package Manager از Repository ها استفاده می‌کند تا:

- Package پیدا کند
- Package دانلود کند
- Package نصب کند
- Package را Update کند

---

## یک مثال ساده

فرض کن می‌خواهی `nginx` را نصب کنی:

```
sudo apt install nginx
```

اتفاقی که پشت صحنه می‌افتد:

```
apt
 |
 |
Repository
 |
 |
nginx package
 |
 |
Install on system
```

یعنی `apt` می‌رود داخل Repository می‌گردد و Package مربوط به nginx را پیدا می‌کند.

---

# ا-Repository شامل چه چیزهایی است؟

یک Repository معمولاً شامل:

```
Repository
    |
    ├── Packages
    ├── Package versions
    ├── Metadata
    ├── Dependency information
    └── Security information
```

یعنی فقط خود Package ها نیستند؛ اطلاعات لازم برای مدیریت آن‌ها هم وجود دارد.

---

# رابطه Repository، Package Manager و Package

این سه تا را قاطی نکن:

```
User
 |
 |  apt install nginx
 |
Package Manager
 |
 |  Search
 |
Repository
 |
 |  Download
 |
Package
 |
 |  Install
 |
System
```

---

# مثال در Ubuntu

در Ubuntu ابزار:

```
apt
```

از Repository ها استفاده می‌کند.

لیست Repository ها در این فایل قرار دارد:

```
/etc/apt/sources.list
```

و گاهی:

```
/etc/apt/sources.list.d/
```

مثلاً یک خط Repository:

```
deb http://archive.ubuntu.com/ubuntu jammy main
```

یعنی:

- از این Repository استفاده کن
- Package های Ubuntu نسخه jammy را دریافت کن

---

# انواع Repository

معمولاً چند نوع Repository داریم:

## 1) ا-Official Repository

ا-Repository رسمی خود توزیع Linux است.

مثلاً:

ا-Ubuntu:

```
Ubuntu Official Repository
```

مزایا:

- امن‌تر
- تست شده
- سازگار با سیستم

---

## 2) ا-Third-party Repository

ا-Repository شرکت یا شخص دیگر.

مثلاً:

یک شرکت Repository خودش را برای نرم‌افزار خاصی ایجاد می‌کند.

مزایا:

- نسخه جدیدتر نرم‌افزارها

معایب:

- نیاز به اعتماد بیشتر دارد

---

# چرا Repository مهم است؟

چون اگر Repository وجود نداشت، باید:

1. سایت برنامه را پیدا کنیم
2. فایل Package را دانلود کنیم
3. ا-Dependency ها را دستی نصب کنیم
4. ا-Update ها را خودمان دنبال کنیم

اما Repository این کارها را ساده می‌کند.

---

# تفاوت Repository و Package

این تفاوت مهم است:

|مورد|معنی|
|---|---|
|Package|یک بسته نرم‌افزاری قابل نصب|
|Repository|محلی که تعداد زیادی Package در آن نگهداری می‌شود|

مثال:

```
Repository
    |
    ├── nginx package
    ├── apache package
    ├── vim package
    └── nano package
```

---

# خلاصه نهایی

```
Repository
=
مخزن مرکزی Package ها در Linux
که Package Manager از آن برای
دانلود، نصب و Update نرم‌افزارها استفاده می‌کند.
```

رابطه کلی:

```
Repository
      ↓
Package Manager (apt/dnf)
      ↓
Package
      ↓
Application / Library
```
