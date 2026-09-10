مدیریت Dependency در APT
Dependency چیست؟

Dependency یعنی یک Package برای اجرا یا کار کردن صحیح، به Package یا Library دیگری نیاز داشته باشد.

مثلاً فرض کن:

nginx
 ↓
نیاز دارد به
 ↓
libA
libB
libC

در اینجا:

libA
libB
libC

Dependency های nginx هستند.

APT چطور Dependency را پیدا می‌کند؟

وقتی می‌نویسی:

sudo apt install nginx

APT فقط دنبال خود nginx نمی‌گردد.

اطلاعات Package را بررسی می‌کند و می‌بیند:

nginx
 ├── Depends: libA
 ├── Depends: libB
 └── Depends: libC

سپس بررسی می‌کند که آیا این Dependency ها روی سیستم نصب هستند یا نه.

اگر Dependency نصب نباشد چه اتفاقی می‌افتد؟

فرض کنیم:

nginx → نیاز به libA

ولی:

libA ❌ نصب نیست

APT می‌تواند libA را هم از Repository پیدا و نصب کند:

sudo apt install nginx
          ↓
APT
          ↓
بررسی Dependency ها
          ↓
پیدا کردن libA
          ↓
نصب libA
          ↓
نصب nginx

یعنی معمولاً لازم نیست Dependency ها را دستی یکی‌یکی نصب کنی.

یک مثال ساده

فرض کن:

sudo apt install myapp

و myapp این Dependency ها را داشته باشد:

Depends:
    libA
    libB

اگر هیچ‌کدام نصب نباشند، APT تقریباً این کار را انجام می‌دهد:

myapp
 ↓
libA → نصب
libB → نصب
 ↓
myapp → نصب
APT از کجا می‌فهمد Dependency چیست؟

این اطلاعات داخل Metadata مربوط به Package وجود دارد.

مثلاً:

Package: myapp
Version: 2.0
Depends: libA, libB

پس ارتباطی که تا الان یاد گرفتی این است:

Repository
     ↓
Package + Metadata
     ↓
Dependency Information
     ↓
APT
     ↓
Dependency ها را پیدا و نصب می‌کند
اگر Dependency مشکل داشته باشد چه؟

گاهی Package را دانلود کرده‌ای یا نصب ناقص شده و Dependency ها کامل نیستند.

در بعضی شرایط می‌توانی از:

sudo apt --fix-broken install

استفاده کنی.

این دستور به APT می‌گوید Dependency های ناقص یا خراب را اصلاح کند.

چند نکته مهم
1. Dependency فقط برای نصب نیست

Dependency برای این است که Package بتواند به شکل درست کار کند.

2. یک Dependency ممکن است خودش Dependency داشته باشد

مثلاً:

myapp
 ↓
libA
 ↓
libB

یعنی:

myapp → libA → libB

APT این زنجیره Dependency را هم مدیریت می‌کند.

3. APT معمولاً Dependency ها را به‌صورت خودکار مدیریت می‌کند

این یکی از مهم‌ترین مزیت‌های Package Manager است.

خلاصه نهایی
Dependency
=
چیزی که یک Package برای کار کردن به آن نیاز دارد.

و:

apt install
    ↓
بررسی Package
    ↓
پیدا کردن Dependency ها
    ↓
بررسی نصب بودن آن‌ها
    ↓
نصب Dependency های لازم
    ↓
نصب Package اصلی

نکته‌ای که برای امتحان یا یادگیری باید حفظ کنی:

APT با استفاده از Dependency Information موجود در Metadata، نیازمندی‌های Package را پیدا می‌کند و در صورت نیاز آن‌ها را از Repository دریافت و نصب می‌کند.
