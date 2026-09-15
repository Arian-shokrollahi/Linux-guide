# 03-check version before install
----
# این فایل چه چیزی رو یاد میده ؟
بعضی اوقات در نصب اون بسته ای که دارد ورژنش برایه شما اهمیت پیدا میکند و شما باید ورژنی که درون رپو لینوکستون اون تیم توزیع شما تهیه کردند رو چک کنید تا ورژن مناسب رو دانلود کنید
در اینجا ما از دستور apt به علاوه چیزایه دیگش استفاده میکنیم

---
#### برای دیدن نسخه پکیج (مثل Nginx) در مخازن اوبونتو قبل از این‌که آن را دانلود یا نصب کنید، چند روش سریع و کاربردی با ابزارهای مدیریت پکیج (`apt` و `apt-cache`) وجود دارد:
- ا-<mark>قبلش یه sudo apt update بزنید تا اخرین نسخه ای که در مخزت هست رو بیاره</mark> 
 
- ### ۱. دستور `apt-cache policy` (بهترین و دقیق‌ترین روش)

این دستور به شما نسخه موجود در مخازن (Candidate) و نسخه‌ای که احیاناً الان روی سیستم نصب دارید (Installed) را نشان می‌دهد:
```bash
1-structure-->apt-cache policy <namepackage>

======ex
apt-cache policy nginx
=======out like this 
nginx:
  Installed: (none)
  Candidate: 1.18.0-6ubuntu14.4
  Version table:
     1.18.0-6ubuntu14.4 500
        500 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages

```
در اینجا `Candidate` نسخه‌ای است که با دستور `apt install` نصب خواهد شد

---
### ۲. دستور `apt-cache madison` (نمایش خلاصه و تمیز)

اگر فقط می‌خواهید سریع ببینید چه نسخه‌هایی از چه مخازنی در دسترس هستند:

```bash
2-apt-cache madison <packagename>


=======ex
apt-cache madison nginx
=======output
     nginx | 1.18.0-6ubuntu14.4 | http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages
     nginx | 1.18.0-6ubuntu14   | http://archive.ubuntu.com/ubuntu jammy/main amd64 Packages

```

----
### ۳. دستور `apt show` یا `apt-cache show` (اطلاعات کامل پکیج)

این دستور علاوه بر نسخه، توضیحاتی مثل حجم دانلود، وابستگی‌ا (Dependencies) و توسعه‌دهنده را هم می‌دهد: این دیگه خیلی مفصله

```bash
apt show <packagename>

---->better for version
apt show nginx | grep Version

```

----

| دستور | کاربرد اصلی | خروجی |
|---|---|---|
| `apt-cache policy nginx` | بررسی نسخه قابل نصب و وضعیت فعلی | ایده‌آل و با جزئیات وضعیت مخزن |
| `apt-cache madison nginx` | جدول فشرده تمام نسخه‌های موجود | فوق‌العاده خوانا و سریع |
| `apt show nginx` | مشخصات کامل بسته (حجم، نسخه، توضیحات) | کامل‌ترین اطلاعات |

