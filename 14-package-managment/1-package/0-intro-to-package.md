1. Package چیست؟

Package (پکیج) یک مجموعه‌ی آماده از فایل‌هاست که برای نصب یک نرم‌افزار یا یک قابلیت در Linux بسته‌بندی شده است.

یعنی به‌جای اینکه فایل‌های یک برنامه را دانه‌دانه دانلود و در جای مناسب قرار بدهیم، همه‌ی فایل‌های لازم در قالب یک Package قرار می‌گیرند و Package Manager آن را نصب می‌کند.

مثلاً در Ubuntu یک Package می‌تواند به شکل:

nginx_1.24.0_amd64.deb

باشد.

با نصب این Package، فایل‌های مربوط به nginx در محل‌های مناسب سیستم قرار می‌گیرند.

یک Package ممکن است شامل چه چیزهایی باشد؟

مثلاً:

Package
   |
   ├── Program files
   ├── Configuration files
   ├── Documentation
   ├── Metadata
   └── Dependency information

بنابراین Package فقط خود برنامه نیست؛ اطلاعات و فایل‌های موردنیاز برای نصب و مدیریت آن برنامه را هم در بر می‌گیرد.

Package Manager چیست؟

برای نصب و مدیریت Package ها از Package Manager استفاده می‌کنیم.

در Ubuntu/Debian معمولاً:

apt

و Package با فرمت:

.deb

است.

مثلاً:

sudo apt install nginx

اینجا:

apt       → Package Manager
nginx     → Package
.deb      → فرمت Package در Debian/Ubuntu

در سیستم‌های Red Hat/Fedora هم سیستم Package متفاوت است، مثلاً:

.rpm

و ابزارهایی مثل:

dnf

استفاده می‌شوند.
