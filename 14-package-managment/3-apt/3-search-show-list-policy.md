:

دستور	کاربرد	مثال
apt search <package>	جستجو بین Package ها	apt search nginx
apt show <package>	نمایش اطلاعات کامل یک Package	apt show nginx
apt list	نمایش Package ها	apt list
apt list --installed	نمایش Package های نصب‌شده	apt list --installed
apt list --upgradable	نمایش Package هایی که قابل Upgrade هستند	apt list --upgradable
apt policy <package>	نمایش نسخه نصب‌شده، نسخه کاندید و Repository	apt policy nginx
1. جستجو با apt search
apt search nginx

برای پیدا کردن Package هایی که نام یا توضیحشان شامل nginx است.

مثلاً:

nginx
nginx-common
nginx-core
2. دیدن اطلاعات با apt show
apt show nginx

اطلاعاتی مثل:

Package
Version
Architecture
Depends
Description

را نشان می‌دهد.

3. دیدن Package های نصب‌شده
apt list --installed

مثلاً اگر بخواهی ببینی nginx نصب شده یا نه:

apt list --installed | grep nginx
4. دیدن Package های قابل Upgrade
apt list --upgradable

این دستور به تو می‌گوید کدام Package های نصب‌شده نسخه جدید دارند.

5. دستور مهم apt policy
apt policy nginx

اطلاعاتی مثل این می‌دهد:

Installed: 1.24.0
Candidate: 1.26.0

یعنی:

Installed
↓
نسخه فعلی نصب‌شده

Candidate
↓
نسخه‌ای که APT در حال حاضر برای Upgrade پیشنهاد می‌کند
خلاصه‌ای که باید حفظ کنی
apt search <package>

= جستجوی Package

apt show <package>

= دیدن اطلاعات Package

apt list --installed

= دیدن Package های نصب‌شده

apt list --upgradable

= دیدن Package های قابل Upgrade

apt policy <package>

= دیدن وضعیت و نسخه‌های Package
