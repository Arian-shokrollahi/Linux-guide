# 02-file command
# درس 02 دستور file
---
## چرا به دستور file  نیاز داریم؟
### چرا به دستور `file` نیاز داریم؟
- در سیستم‌عامل‌های یونیکسی (مثل لینوکس)، پسوند فایل‌ها (مثل `.txt`, `.png`, `.exe`) صرفاً برای راهنمایی انسان یا برخی برنامه‌هاست و سیستم‌عامل نوع فایل را بر اساس پسوند آن قضاوت نمی‌کند. شما می‌توانید یک عکس PNG را تغییر نام دهید و به `file.txt` تبدیل کنید؛ در این حالت سیستم‌عامل سردرگم نمی‌شود، چون دستور `file` با بررسی محتوا، متوجه می‌شود که این فایل در واقع عکس است.
- پس نامه فایلی که پسوند png دارد رو میتونید اون پسوندشو اصلا نزارید شما میفهمید ولی اون کسی که میاد میبینه و نمیدونه شما این تغییر رو انجام دادید فک میکنه این یک فایل ساده است.
- راه حل با دستور --->
```bash
file [options] filename
```
- شما میتونید ببنید که نوع اون فایل چیست با دستور file
---
## دستور `file` این کار را از ۳ طریق انجام می‌دهد:

1. **بررسی فراخوانی‌های سیستمی (Filesystem tests):** فایل خالی است یا دایرکتوری، پایپ یا لینک سمبلیک است.
2. **بررسی اعداد جادویی (Magic Numbers):** خواندن چند بایت اول فایل (Header) که نشان‌دهنده هویت فرمت است.
3. **بررسی زبانی/کدگذاری (Language/Encoding tests):** تشخیص UTF-8، اسکریپت شل، متن ساده و…

---
- مثال فایلی که symbolic link خورده یا فایلی که فایل png است ولی اسمو کردیم ali.txt
- 1- فایل ali.png رو کردیم ali.txt فایل عکسی رو اسمشو کردیم فایل متنی گفتیم سیستم عامل اصلا با اسم و اینا کاری نداره و کارش با محتوا و ساختار اون فایل اسم برایه ماست که بدونیم چیه اون فایل.
- یا برسی فولدری که symbolic link است به مسیر/mnt/c/Users/arianshokrollahi/Pictures/Screenshots/

```shell
arianshokrollahi@THUNDER:~$ mv ali.png ali.txt
arianshokrollahi@THUNDER:~$ file ali.txt
ali.txt: PNG image data, 1920 x 1080, 8-bit/color RGBA, non-interlaced
arianshokrollahi@THUNDER:~$ file screen
screen: symbolic link to /mnt/c/Users/arianshokrollahi/Pictures/Screenshots
arianshokrollahi@THUNDER:~$
```
