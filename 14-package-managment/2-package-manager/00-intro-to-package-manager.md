### مقدمه Package Managerها در Linux

در Linux توزیع‌های مختلف از **Package Manager**های متفاوتی برای مدیریت نرم‌افزارها استفاده می‌کنند. Package Manager ابزاری است که وظیفه‌ی **نصب، حذف، بروزرسانی، جستجو و مدیریت Packageها و Dependencyهای آن‌ها** را بر عهده دارد.

هر خانواده از Linux معمولاً Package Manager مخصوص خود را دارد. برای مثال:

|Distribution|Package Manager|Package Format|
|---|---|---|
|Debian / Ubuntu|`apt`|`.deb`|
|RHEL / Fedora|`dnf`|`.rpm`|
|Arch Linux|`pacman`|`.pkg.tar.*`|
|openSUSE|`zypper`|`.rpm`|

برای مثال در Ubuntu می‌توانیم با دستور زیر یک Package را نصب کنیم:

```
sudo apt install nginx
```

در این حالت `apt` فقط Package موردنظر را نصب نمی‌کند، بلکه **Dependencyهای آن را نیز بررسی و مدیریت می‌کند**.

در نتیجه، می‌توان گفت:

> **Package Manager واسطه‌ای بین کاربر، Packageها و Repositoryها است که مدیریت چرخه‌ی نصب و نگهداری نرم‌افزارها را در Linux ساده و خودکار می‌کند.**

---
## چون من دارم از ابونتو استفاده میکنم درمورد پکیج منیجر apt جلوتر میگم حواستون باشه که بسته به توزیع تون از پکیج منیجز مربوطه استفاده کنید.
