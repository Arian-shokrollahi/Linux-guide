## ا-Archiving & Backup در Linux

در لینوکس **Archiving** و **Backup** دو مفهوم نزدیک ولی متفاوت هستند و برای مدیریت فایل‌ها، انتقال داده و محافظت از اطلاعات بسیار مهم‌اند.

### ا-Archiving چیست؟

ا-**Archiving** یعنی چند فایل و directory را در یک فایل واحد جمع کنیم، معمولاً برای اینکه مدیریت، انتقال یا نگهداری آن‌ها راحت‌تر شود.

مثلاً `tar` می‌تواند چندین فایل را داخل یک archive قرار دهد:

```
tar -cf backup.tar /home/user/Documents
```

> ا-Create an archive

نکته مهم: **Archive لزوماً Backup نیست.** یک archive می‌تواند فقط برای بسته‌بندی و انتقال فایل‌ها ساخته شده باشد.

### ا-Backup چیست؟

ا-**Backup** یعنی ایجاد یک **نسخه‌ی قابل بازیابی از داده‌های مهم** تا اگر فایل اصلی حذف شد، خراب شد یا سیستم دچار مشکل شد، بتوانیم آن را restore کنیم.

مثلاً:

```
Original Data
     │
     └──> Backup
             │
             └──> Restore when needed
```

### رابطه‌ی این دو

در لینوکس معمولاً از ابزارهای **Archiving + Compression** در کنار روش‌های Backup استفاده می‌کنیم:

```
Files / Directories
        ↓
   Archiving
        ↓
      tar
        ↓
  Compression
        ↓
 gzip / bzip2 / xz
        ↓
   Archive file
        ↓
 Backup Storage
```

ابزارهای مهمی که در این بخش باید بشناسی:

```
tar       → Archiving
gzip      → Compression
bzip2     → Compression
xz        → Compression
zip/unzip → Archive + Compression
rsync     → Synchronization / Backup
```

**برای SysAdmin و DevOps، `tar` و `rsync` اهمیت ویژه‌ای دارند**؛ `tar` را برای ساختن و استخراج archiveها و `rsync` را برای کپی و sync کردن داده‌ها بین مسیرها یا سیستم‌ها زیاد استفاده می‌کنند.
