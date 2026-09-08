# htop command
---
### اول: `htop` چیه؟

ا-`htop` یک ابزار **interactive process viewer** در لینوکسه که به Administrator اجازه می‌ده وضعیت Processها و مصرف منابع سیستم رو به‌صورت لحظه‌ای ببینه و در صورت نیاز روی Processها عملیاتی مثل `kill`، `renice` و ... انجام بده.

---
### دستور htop یه دستور همه کاره است که همه کار براتون میکند
---
#### چیزایه مهمی که از دستور htop باید بدونید
- 1-ستون هایی که دارد
- 2-وضعیت هایه مهم دستور htop که در ستون هایه htop با S مشخص شده.
- 3-بخش بالایه دستور htop
- 4-کلید هایه مهم دستور htop -->f1 ..f10

---
### ستون‌های Process در `htop`

|ستون|نام کامل|چی رو نشون می‌ده؟|کاربرد برای Admin|
|---|---|---|---|
|`PID`|Process ID|شناسه یکتای Process|شناسایی و مدیریت Process|
|`USER`|User|کاربری که Process را اجرا کرده|فهمیدن مالک Process|
|`PRI`|Priority|اولویت اجرای Process|بررسی اولویت CPU|
|`NI`|Nice Value|میزان تغییر Priority|تنظیم سهم CPU یک Process|
|`VIRT`|Virtual Memory|کل حافظه مجازی Process|بررسی مصرف Virtual Memory|
|`RES`|Resident Memory|مقدار RAM واقعی درگیر|پیدا کردن Processهای پرمصرف RAM|
|`SHR`|Shared Memory|حافظه‌ای که با Processهای دیگر share شده|تحلیل دقیق‌تر مصرف RAM|
|`S`|State|وضعیت فعلی Process|فهمیدن Running/Sleeping و...|
|`%CPU`|CPU Usage|درصد استفاده از CPU|پیدا کردن Processهای CPU-intensive|
|`%MEM`|Memory Usage|درصد RAM مصرف‌شده|پیدا کردن Processهای RAM-intensive|
|`TIME+`|CPU Time|مجموع زمان استفاده از CPU|بررسی مصرف CPU در طول زمان|
|`Command`|Command|دستور یا برنامه‌ای که Process را اجرا کرده|فهمیدن Process مربوط به چه برنامه‌ای است|

### وضعیت‌های مهم `S`

|مقدار|معنی|توضیح|
|---|---|---|
|`R`|Running|Process در حال اجراست یا آماده‌ی اجراست|
|`S`|Sleeping|Process منتظر یک event است|
|`D`|Uninterruptible Sleep|معمولاً منتظر I/O است|
|`T`|Stopped|Process متوقف شده|
|`Z`|Zombie|Process تمام شده ولی هنوز entry آن باقی مانده|
|`I`|Idle|معمولاً برای kernel threadهای idle دیده می‌شود|

### بخش بالای صفحه‌ی `htop`

|بخش|مفهوم|
|---|---|
|`CPU`|میزان استفاده از CPU|
|`Mem`|میزان RAM استفاده‌شده|
|`Swp`|میزان Swap استفاده‌شده|
|`Tasks`|تعداد Task/Processها|
|`Load average`|میانگین Load سیستم|
|`Uptime`|مدت زمانی که سیستم روشن بوده|

### کلیدهای مهم داخل `htop`

|کلید|عملکرد|
|---|---|
|`F1`|Help|
|`F2`|Setup / تنظیمات|
|`F3`|Search|
|`F4`|Filter|
|`F5`|نمایش Process Tree|
|`F6`|Sort بر اساس یک ستون|
|`F7`|کاهش Nice / افزایش Priority|
|`F8`|افزایش Nice / کاهش Priority|
|`F9`|Kill کردن Process|
|`F10`|خروج|
|`Space`|انتخاب Process|
|`Enter`|نمایش اطلاعات/تعامل با Process|
|`u`|نمایش Processهای یک User|
|`t`|نمایش Tree|
|`k`|Kill کردن Process|

**اگر هدفت یادگیری `htop` برای Linux Administration هست، مهم‌ترین ستون‌هایی که باید واقعاً بلد باشی این‌ها هستند:**

ا`PID → USER → PRI/NI → RES → S → %CPU → %MEM → TIME+ → Command`

خصوصاً **`PID`، `USER`، `S`، `%CPU`، `%MEM` و `Command`** پایه‌ی کار با Processها هستند.
