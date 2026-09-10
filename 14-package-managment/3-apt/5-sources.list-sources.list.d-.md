## ا-1. APT از کجا Package می‌گیرد؟

وقتی می‌نویسی:

```
sudo apt install nginx
```

خود `apt` Package را از خودش ندارد؛ باید بداند **از چه Repository ای آن را دانلود کند**.

این اطلاعات در Configuration مربوط به APT قرار دارد.

مهم‌ترین مکان‌ها:

```
/etc/apt/sources.list
/etc/apt/sources.list.d/
```

---

# ا-2. `/etc/apt/sources.list` چیست؟

این فایل یکی از فایل‌های اصلی APT برای معرفی **Repository ها** است.

مثلاً ممکن است داخل آن خطوطی مثل این ببینی:

```
deb http://archive.ubuntu.com/ubuntu noble main
```

این خط به APT می‌گوید:

```
از این Repository
برای این نسخه از Ubuntu
Package ها را دریافت کن
```

پس می‌توانی این‌طور در ذهن داشته باشی:

```
/etc/apt/sources.list
        ↓
لیست Repository های APT
        ↓
APT می‌فهمد Package ها را از کجا بگیرد
```

---

# ا-3. `/etc/apt/sources.list.d/` چیست؟

این یک **Directory** است، نه یک فایل.

داخل آن می‌توان چند فایل مربوط به Repository های مختلف قرار داد.

مثلاً:

```
/etc/apt/sources.list.d/
        |
        ├── docker.list
        ├── google-chrome.list
        └── custom-app.list
```

این روش باعث می‌شود Repository های اضافی را جدا از فایل اصلی مدیریت کنیم.

یعنی:

```
sources.list
→ Repository های اصلی

sources.list.d/
→ Repository های اضافی و جداگانه
```

---

# ا-4. APT چطور از این اطلاعات استفاده می‌کند؟

فرض کن این Repository را در سیستم داری:

```
Ubuntu Repository
       ↓
nginx
vim
curl
...
```

وقتی اجرا می‌کنی:

```
sudo apt update
```

ا-APT اطلاعات Repository هایی که در تنظیماتش معرفی شده‌اند را دریافت می‌کند.

بعد وقتی می‌زنی:

```
sudo apt install nginx
```

ا-APT می‌داند باید Package `nginx` را از کجا پیدا کند.

روند کلی:

```
sources.list
     +
sources.list.d/
     ↓
     APT
     ↓
Repository Information
     ↓
Package
```

---

# ا-5. Official Repository چیست؟

ا-**Official Repository** مخزن رسمی خود Ubuntu یا Distribution است.

مثلاً Ubuntu برای Package های خودش Repository های رسمی دارد.

مزیت اصلی:

```
Official Repository
        ↓
تست و هماهنگی بیشتر با Ubuntu
        ↓
اعتماد و سازگاری بیشتر
```

مثلاً وقتی می‌زنی:

```
sudo apt install vim
```

معمولاً ترجیح می‌دهیم Package از Repository رسمی Ubuntu دریافت شود.

---

# ا-6. Third-Party Repository چیست؟

**Third-Party Repository** مخزنی است که توسط فرد، شرکت یا پروژه‌ای خارج از تیم اصلی Ubuntu ارائه می‌شود.

مثلاً یک شرکت Repository خودش را برای نرم‌افزارش ارائه می‌کند.

دلیل استفاده معمولاً این است که:

- ا-Package در Repository رسمی وجود ندارد.
- نسخه جدیدتری لازم داریم.
- شرکت Package مخصوص خودش را ارائه کرده است.

ساختار ذهنی:

```
Ubuntu Official Repository
        ↓
توسط Ubuntu

Third-Party Repository
        ↓
توسط شرکت / Developer / پروژه دیگر
```

---

# 7. تفاوت Official و Third-Party

|ویژگی|Official Repository|Third-Party Repository|
|---|---|---|
|مالک/مدیر|تیم رسمی Distribution|شرکت، Developer یا پروژه خارجی|
|اعتماد|معمولاً بالاتر|بستگی به منبع دارد|
|سازگاری|معمولاً بیشتر|ممکن است متفاوت باشد|
|Package ها|Package های رسمی Distribution|Package های ارائه‌شده توسط شخص ثالث|
|استفاده|انتخاب پیش‌فرض|در صورت نیاز|
|ریسک|معمولاً کمتر|نیاز به بررسی بیشتر|

---

# 8. یک نکته مهم درباره Third-Party Repository

نباید هر Repository ای را که در اینترنت پیدا کردی اضافه کنی.

مثلاً این کار را بدون بررسی انجام نده:

```
Random Repository
      ↓
اضافه کردن به APT
      ↓
نصب Package
```

چون Package Manager به Repository اعتماد می‌کند و از آن Package دریافت می‌کند.

پس منبع Repository مهم است.

---

# 9. یک نکته خیلی مهم: `apt update`

وقتی Repository جدید اضافه کردی، معمولاً باید:

```
sudo apt update
```

را اجرا کنی.

چرا؟

چون APT باید **اطلاعات جدید Repository و Package ها** را دریافت کند.

یعنی:

```
Repository اضافه شد
       ↓
sudo apt update
       ↓
APT اطلاعات Repository را دریافت می‌کند
       ↓
حالا Package ها قابل شناسایی هستند
```

---

# خلاصه‌ای که باید حفظ کنی

```
/etc/apt/sources.list
→ فایل اصلی معرفی Repository ها

/etc/apt/sources.list.d/
→ Directory برای Repository های اضافی
```

و:

```
Official Repository
→ مخزن رسمی Ubuntu

Third-Party Repository
→ مخزن متعلق به شرکت/Developer/پروژه خارجی
```

و رابطه‌ی اصلی:

```
sources.list
sources.list.d/
       ↓
      APT
       ↓
   Repository
       ↓
    Package
```

**مهم‌ترین دستور مرتبط با این بخش:**

```
sudo apt update
```

یعنی: **اطلاعات Repository هایی که در تنظیمات APT معرفی شده‌اند را به‌روز کن.**
