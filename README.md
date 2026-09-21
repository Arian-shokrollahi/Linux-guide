# راهنمای جامع لینوکس

<p align="center">
	<img src="00-0-Introduction-and-terms/00-00-images/khodam.png" alt=""  width=500>
</p>

این مخزن مجموعه‌ای از یادداشت‌ها، مثال‌ها و تمرین‌های عملی برای یادگیری لینوکس است؛ از مفاهیم پایه و نصب لینوکس تا مدیریت فایل‌ها، دسترسی‌ها، پردازش‌ها، شبکه، ذخیره‌سازی، عبارات منظم و اسکریپت‌نویسی شل.

> مطالب این مخزن در حال تکمیل و به‌روزرسانی هستند. برای یادگیری بهتر، فصل‌ها را به ترتیب پیشنهادی مطالعه کنید و دستورها را هم‌زمان در محیط لینوکس اجرا کنید.

## مسیر پیشنهادی مطالعه

مبانی و نصب ← کار با خط فرمان ← فایل‌ها و مسیرها ← دسترسی‌ها و پردازش‌ها ← بسته‌ها و دیسک ← شبکه ← پردازش متن ← اسکریپت‌نویسی

### و اگر دوست ندارید به صورت داکیومنتی بخونید به این ادرس بروید
[linux book site](https://arian-shokrollahi.github.io/Linux-guide/)


## فهرست فصل‌ها

| فصل | موضوع | شروع مطالعه | همه مطالب |
|---:|---|---|---|
| ۰۰ | مقدمه، اصطلاحات و مفاهیم پایه | [شروع فصل](00-0-Introduction-and-terms/00-01-introduction.md) | [مشاهده پوشه](00-0-Introduction-and-terms) |
| ۰۰٫۱ | نصب لینوکس | [راهنمای اولیه نصب](00-1-Installation.Linux/00-00-00-Readthisfirst.find.way.toenter.firmware.md) | [مشاهده پوشه](00-1-Installation.Linux) |
| ۰۱ | شروع کار با شل و خط فرمان | [اصطلاحات اولیه](01-start/00-terms.md) | [مشاهده پوشه](01-start) |
| ۰۲ | جابه‌جایی در فایل‌سیستم | [دستور pwd](02-navigation/01-pwd.md) | [مشاهده پوشه](02-navigation) |
| ۰۳ | بررسی فایل‌ها و سیستم | [دستور ls](03-exploring-the-system/01-ls.md) | [مشاهده پوشه](03-exploring-the-system) |
| ۰۴ | ساخت، کپی، انتقال و حذف فایل‌ها | [مقدمه مدیریت فایل](04-manipulating.file.md/00-intro.md) | [مشاهده پوشه](04-manipulating.file.md) |
| ۰۵ | شناخت و استفاده از فرمان‌ها | [مقدمه فرمان‌ها](05-0-working-with-commands/0-intro) | [مشاهده پوشه](05-0-working-with-commands) |
| ۰۵٫۱ | راهنما و مستندات فرمان‌ها | [دستور help](05-1-commands-documentation/1-help.md) | [مشاهده پوشه](05-1-commands-documentation) |
| ۰۶ | ورودی، خروجی، خطا و پایپ‌ها | [مقدمه Redirection](06-redirection/00-intro.md) | [مشاهده پوشه](06-redirection) |
| ۰۷ | بسط‌ها و قابلیت‌های شل | [مقدمه Expansion](07-shell-magic/0-intro-expansion.md) | [مشاهده پوشه](07-shell-magic) |
| ۰۸ | میان‌برها و کار حرفه‌ای با صفحه‌کلید | [مقدمه فصل](08-advance-trick-forkeyboard/0-intro) | [مشاهده پوشه](08-advance-trick-forkeyboard) |
| ۰۹ | کاربران، مالکیت و سطح دسترسی | [مقدمه Permission](09-permission/00-00-intro.md) | [مشاهده پوشه](09-permission) |
| ۱۰ | پردازش‌ها و سیگنال‌ها | [پردازش چیست؟](10-processes/0-intro-and-process-terms/0-what-is-the-process.md) | [مشاهده پوشه](10-processes) |
| ۱۱ | متغیرها و محیط شل | [متغیرهای محیطی و شل](11-environment/1-variable-envvar-shellvar.md) | [مشاهده پوشه](11-environment) |
| ۱۲ | ویرایشگرهای متن | [مقدمه ویرایشگرها](12-text-editor/00-intro-to-text-editor.md) | [مشاهده پوشه](12-text-editor) |
| ۱۳ | شخصی‌سازی اعلان شل | [مقدمه Prompt](13-CustomizingthePromPt/0-intro.md) | [مشاهده پوشه](13-CustomizingthePromPt) |
| ۱۴ | مدیریت بسته‌ها و مخازن | [مقدمه مدیریت بسته](14-package-managment/0-intro.md) | [مشاهده پوشه](14-package-managment) |
| ۱۵ | دیسک، پارتیشن، فایل‌سیستم و Mount | [رسانه ذخیره‌سازی چیست؟](15-storage-media/1-disk_basic-storage/0-what-is-the-storage-media.md) | [مشاهده پوشه](15-storage-media) |
| ۱۶ | شبکه در لینوکس | [مقدمه فرمان‌های شبکه](16-networking/00-linux+network-cmd/00-intro-to-network-command.md) | [مشاهده پوشه](16-networking) |
| ۱۷ | جست‌وجوی فایل‌ها | [مقدمه جست‌وجو](17-searching-for-files/0-intro-to-searching-for-files.md) | [مشاهده پوشه](17-searching-for-files) |
| ۱۸ | آرشیو، فشرده‌سازی و پشتیبان‌گیری | [مقدمه آرشیو و پشتیبان‌گیری](18-archiving_and_backup/00-intro_to-archiving-and-backup.md) | [مشاهده پوشه](18-archiving_and_backup) |
| ۱۹ | عبارات منظم | [مقدمه Regex](19-regular-expression_regex/00-intro-to-regular-expression.md) | [مشاهده پوشه](19-regular-expression_regex) |
| ۲۰ | پردازش متن | [مقدمه پردازش متن](20-Text-processing/20-00introduction.to.lesson20.md) | [مشاهده پوشه](20-Text-processing) |
| ۲۱ | قالب‌بندی خروجی | [دستور nl](21-Formatting-Output/21-01-nl.md) | [مشاهده پوشه](21-Formatting-Output) |
| ۲۲ | کامپایل برنامه‌ها | [مقدمه کامپایل](22-compiling-programs/22-00-intro-compiling.md) | [مشاهده پوشه](22-compiling-programs) |
| ۲۳ | اسکریپت‌نویسی شل و حلقه‌ها | [نوشتن اولین اسکریپت](23-shellscript-loop/00-intro-writefirst-shellscript.md) | [مشاهده پوشه](23-shellscript-loop) |
| ۲۴ | امنیت و بررسی اتصال‌ها | [مشاهده زنده لاگ با tail](24-security-and-connection/01-tail-f.md) | [مشاهده پوشه](24-security-and-connection) |

## راهنمای سریع موضوعات مهم

### نصب و راه‌اندازی

- برای نصب لینوکس روی ویندوز با WSL، [اینجا کلیک کنید](00-1-Installation.Linux/00-01-01-WSL-Linux.md).
- برای نصب لینوکس روی VMware Workstation، [اینجا کلیک کنید](00-1-Installation.Linux/00-01-02-VMwareworkstation-Linux.md).
- برای نصب دوگانه لینوکس در کنار ویندوز، [اینجا کلیک کنید](00-1-Installation.Linux/00-02-dualboot_linux-alongside-windows.md).
- برای استفاده از لینوکس به‌عنوان سیستم‌عامل اصلی، [اینجا کلیک کنید](00-1-Installation.Linux/00-03-linux-work-as-primary-os.md).

### فایل‌ها و خط فرمان

- برای یادگیری مسیر مطلق و نسبی، [اینجا کلیک کنید](00-0-Introduction-and-terms/05-absolute-relative-path.md).
- برای یادگیری دستورات `pwd` و `cd`، [فصل جابه‌جایی در فایل‌سیستم](02-navigation) را بخوانید.
- برای یادگیری `ls`، `file`، `less` و لینک‌ها، [فصل بررسی سیستم](03-exploring-the-system) را بخوانید.
- برای یادگیری `mkdir`، `cp`، `mv` و `rm`، [فصل مدیریت فایل‌ها](04-manipulating.file.md) را بخوانید.
- برای یادگیری `man`، `help` و `info`، [فصل مستندات فرمان‌ها](05-1-commands-documentation) را بخوانید.

### دسترسی‌ها و کاربران

- برای آشنایی با مالک، گروه و سایر کاربران، [اینجا کلیک کنید](09-permission/00-01-terms/1-owner-group-other.md).
- برای یادگیری `chmod`، [اینجا کلیک کنید](09-permission/02-chmod.md/0-intro-chmod.md).
- برای یادگیری `chown` و `chgrp`، [اینجا کلیک کنید](09-permission/03-ownership/0-intro.md).
- برای یادگیری SUID، SGID و Sticky Bit، [اینجا کلیک کنید](09-permission/04-special-permission.md/0-intro-to-special-permission.md).
- برای یادگیری ACL، [اینجا کلیک کنید](09-permission/05-ACL/0-intro-to-ACL.md).
- برای یادگیری `sudo`، [اینجا کلیک کنید](09-permission/13-sudo.md).

### پردازش‌ها

- برای درک PID، PPID و درخت پردازش‌ها، [مفاهیم پردازش](10-processes/0-intro-and-process-terms) را بخوانید.
- برای یادگیری `ps` و `pstree`، [اینجا کلیک کنید](10-processes/1-ps).
- برای یادگیری `htop`، [اینجا کلیک کنید](10-processes/2-htop/0-intro-to-htop.md).
- برای مدیریت پردازش‌ها با سیگنال‌ها، `kill` و `pkill`، [اینجا کلیک کنید](10-processes/3-process-management-signals).
- برای یادگیری `pgrep`، `pidof` و `pidstat`، [اینجا کلیک کنید](10-processes/extra-cmd-for-process-mng).

### بسته‌ها و نرم‌افزارها

- برای آشنایی با بسته و وابستگی‌ها، [اینجا کلیک کنید](14-package-managment/1-package).
- برای آشنایی با Package Manager و Repository، [اینجا کلیک کنید](14-package-managment/2-package-manager).
- برای یادگیری نصب، حذف، به‌روزرسانی و جست‌وجو با `apt`، [اینجا کلیک کنید](14-package-managment/3-apt).

### دیسک و ذخیره‌سازی

- برای یادگیری مفاهیم دیسک، SSD، HDD و Block Device، [اینجا کلیک کنید](15-storage-media/1-disk_basic-storage).
- برای یادگیری پارتیشن‌بندی، GPT و MBR، [اینجا کلیک کنید](15-storage-media/2-partitioning).
- برای یادگیری فایل‌سیستم‌های ext4 و XFS، [اینجا کلیک کنید](15-storage-media/3-filesystem).
- برای یادگیری Mount و Unmount، [اینجا کلیک کنید](15-storage-media/4-mount).
- برای تمرین عملی پارتیشن‌بندی و Mount، [آزمایشگاه ذخیره‌سازی](15-storage-media/6-LAB) را انجام دهید.

### شبکه و اتصال از راه دور

- برای یادگیری آدرس IP، Interface، Routing و دستور `ip`، [اینجا کلیک کنید](16-networking/00-linux+network-cmd/1-network_inteface-IPaddressing-routing-with-ipcmd).
- برای عیب‌یابی شبکه با `ping`، `ss`، `traceroute` و `mtr`، [اینجا کلیک کنید](16-networking/00-linux+network-cmd/2-connectiontest_troubleshooting).
- برای بررسی DNS با `dig` و `nslookup`، [اینجا کلیک کنید](16-networking/00-linux+network-cmd/3-DNS).
- برای کار با سرویس‌ها و پورت‌ها با `curl`، `nc` و `openssl`، [اینجا کلیک کنید](16-networking/00-linux+network-cmd/4-Connecting-to-services-and-ports).
- برای یادگیری SSH، SCP و SFTP، [اینجا کلیک کنید](16-networking/00-linux+network-cmd/5-SSH_Remoteaccess).
- برای یادگیری SSH Key و اتصال امن‌تر، [اینجا کلیک کنید](16-networking/00-linux+network-cmd/5-SSH_Remoteaccess/ssh-highlevel).
- برای تمرین عملی SSH و DNS، [آزمایشگاه شبکه](16-networking/00-linux+network-cmd/LAB) را انجام دهید.

### جست‌وجو، متن و اسکریپت‌نویسی

- برای جست‌وجوی فایل با `find` و `locate`، [اینجا کلیک کنید](17-searching-for-files).
- برای یادگیری Regex و تفاوت آن با Wildcard، [اینجا کلیک کنید](19-regular-expression_regex/01-difference-between-regex-wildcards.md).
- برای یادگیری `grep -E`، `awk` و `sed`، [اینجا کلیک کنید](19-regular-expression_regex/4-command).
- برای یادگیری `diff`، `patch`، `sort`، `uniq`، `cut` و `paste`، [اینجا کلیک کنید](20-Text-processing).
- برای شروع Shell Script و آشنایی با متغیرها و حلقه‌ها، [اینجا کلیک کنید](23-shellscript-loop/00-intro-writefirst-shellscript.md).

## آزمایشگاه‌ها و ابزارهای کاربردی

- [جعبه‌ابزار اسکریپت‌ها](00-0-Introduction-and-terms/script-toolbox)
- [اسکریپت‌های بررسی پورت](00-0-Introduction-and-terms/script-toolbox/network)
- [آزمایشگاه ذخیره‌سازی](15-storage-media/6-LAB)
- [آزمایشگاه شبکه](16-networking/00-linux+network-cmd/LAB)
- [آزمایشگاه پردازش متن](20-Text-processing/lab)

## روش پیشنهادی استفاده از مطالب

۱. هر مبحث را به‌ترتیب فصل‌ها مطالعه کنید.  
۲. دستورهای هر درس را هم‌زمان در ترمینال اجرا کنید.  
۳. خروجی دستورها را تحلیل کنید و فقط آن‌ها را حفظ نکنید.  
۴. تمرین‌ها و آزمایشگاه‌های هر بخش را انجام دهید.  
۵. خطاهایی را که با آن‌ها روبه‌رو می‌شوید ثبت و عیب‌یابی کنید.

## مشارکت در پروژه

اگر اشتباه تایپی یا فنی پیدا کردید، می‌توانید Issue ایجاد کنید یا Pull Request بفرستید. پیشنهادهای شما برای کامل‌تر شدن این راهنما ارزشمند است.

---

اگر این مخزن برایتان مفید بود، با دادن ⭐ از ادامه توسعه آن حمایت کنید.

---

© 2026 Arian Shokrollahi — All Rights Reserved
استفاده، کپی و بازنشر مطالب بدون اجازه کتبی ممنوع است.
