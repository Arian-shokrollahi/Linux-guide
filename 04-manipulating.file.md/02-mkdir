# 02mkdir command 
---
# دستور mkdir مخفف چیست و کجا به کار میرود
- دستور **`mkdir`** مخفف **Make Directory** است و برای ایجاد یک یا چند دایرکتوری (پوشه) در لینوکس به کار می‌رود.
--- 

# جدول آپشن‌های اصلی `mkdir`

| آپشن (Flag) | فرم طولانی | کاربرد و توضیح | مثال |
| :--- | :--- | :--- | :--- |
| `-p` | `--parents` | ساخت پوشه‌های تو در تو و جلوگیری از ارور در صورت وجود پوشه | `mkdir -p project/src/components` |
| `-v` | `--verbose` | نمایش پیام تایید برای هر پوشه ساخته‌شده | `mkdir -v my_folder` |
| `-m` | `--mode` | تعیین مستقیم سطح دسترسی (Permissions) در زمان ساخت | `mkdir -m 755 public_html` |
| `-Z` | `--context` | تنظیم زمینه امنیتی SELinux برای پوشه | `mkdir -Z httpd_sys_content_t web` |
| `--help` | — | نمایش راهنمای دستور | `mkdir --help` |
| `--version` | — | نمایش نسخه برنامه | `mkdir --version` |

---
# سناریوها و الگوهای پرکاربرد
- ۱. ساخت یک یا چند پوشه ساده
```bash
# ساخت یک پوشه
mkdir my_project

# ساخت چند پوشه هم‌زمان
mkdir folder1 folder2 folder3
```

---
- ۲. ساخت پوشه‌های تو در تو (Nested) با `-p`
- اگر پوشه والد (`parent`) وجود نداشته باشد، بدون `-p` با ارور مواجه می‌شوید:(parent to parenti)
```bash
# ساخت ساختار درختی بدون ارور
mkdir -p app/backend/api/v1
```
### برایه devops ها
**نکته:** مزیت دیگر `-p` این است که اگر پوشه از قبل وجود داشته باشد، هیچ اروری (مثل `File exists`) نمی‌دهد؛ به همین دلیل در اسکریپت‌های Bash و خط‌های پایپ‌لاین CI/CD همیشه از `-p` استفاده می‌شود.

---
- ۳. ترکیب با Brace Expansion (ساخت سریع ساختار پروژه)
```bash
# ساخت چندین زیرپوشه درون یک پوشه به صورت یکجا
mkdir -p my_app/{src,bin,config,tests,docs}

# ساخت ساختار ماتریسی/ترکیبی
mkdir -p project/{frontend,backend}/{src,public}

```
---
- #### ۴. ساخت پوشه با سطح دسترسی خاص (`-m`)
- به جای اینکه بعد از ساخت پوشه دستور `chmod` بزنید، مستقیم سطح دسترسی را تنظیم می‌کنید
```bash
# فقط خواندن و نوشتن برای مالک (Owner) - دسترسی 700
mkdir -m 700 private_keys

# دسترسی استاندارد وب‌سرور (755)
mkdir -m 755 public_assets

```
---
- #### ۵. مشاهده گزارش عملیات (`-v`)

- برای مطمئن شدن از اینکه چه پوشه‌هایی ساخته شده‌اند (مخصوصاً در کارهای اتوماتیک):
```bash
mkdir -pv app/{backend,frontend}
# خروجی:
# mkdir: created directory 'app'
# mkdir: created directory 'app/backend'
# mkdir: created directory 'app/frontend'
```

---
### خطاهای رایج (Common Errors)

1. **`mkdir: cannot create directory '...': File exists`**
    - **دلیل:** پوشه‌ای با همین نام از قبل وجود دارد.
    - **راه‌حل:** استفاده از فلگ `-p`.
2. **`mkdir: cannot create directory '...': Permission denied`**
    - **دلیل:** کاربر دسترسی نوشتن (Write) در مسیر مقصد را ندارد.
    - **راه‌حل:** اجرا با دسترسی روت (`sudo mkdir ...`) یا تغییر دسترسی والد.
3. **`mkdir: cannot create directory 'a/b/c': No such file or directory`**
    - **دلیل:** پوشه `a` یا `b` وجود ندارد و می‌خواهید مستقیماً `c` را بسازید.
    - **راه‌حل:** استفاده از `-p`.
