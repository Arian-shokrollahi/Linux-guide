# ا-`grep -E` — از صفر تا کاربرد عملی

## ا-1. `grep -E` اصلاً چیست؟

ا-`grep` برای **جستجو در متن** استفاده می‌شود.

وقتی می‌نویسیم:

```
grep 'error' file.txt
```

یعنی:

> داخل `file.txt` بگرد و خط‌هایی را که `error` دارند نمایش بده.

اما:

```
grep -E 'REGEX' file.txt
```

به ما اجازه می‌دهد از **ERE (Extended Regular Expressions)** استفاده کنیم.

یعنی می‌توانیم از چیزهایی مثل:

```
+
?
{n,m}
()
|
```

به شکل مستقیم استفاده کنیم.

پس `grep -E` مخصوصاً زمانی ارزشمند می‌شود که بخواهیم **الگوهای پیچیده‌تر** را جستجو کنیم.

---

# 2. یک فایل کوچک برای تمرین

فرض کن فایلی به اسم:

```
users.log
```

داریم.

محتوای فایل:

```
INFO: user=arian ip=192.168.1.10 status=200
INFO: user=ali ip=192.168.1.20 status=200
ERROR: user=reza ip=192.168.1.30 status=500
WARNING: user=sara ip=192.168.1.40 status=404
INFO: user=mina ip=10.0.0.15 status=200
ERROR: user=admin ip=10.0.0.1 status=403
INFO: user=test123 ip=172.16.0.5 status=200
DEBUG: connection from 127.0.0.1
INFO: user=devops ip=192.168.1.50 status=201
ERROR: database connection failed
```

برای دیدن محتوای فایل:

```
cat users.log
```

---

# 3. ساده‌ترین استفاده

می‌خواهیم تمام خط‌هایی که `ERROR` دارند را پیدا کنیم:

```
grep -E 'ERROR' users.log
```

خروجی:

```
ERROR: user=reza ip=192.168.1.30 status=500
ERROR: user=admin ip=10.0.0.1 status=403
ERROR: database connection failed
```

اینجا هنوز Regex خیلی خاصی استفاده نکردیم؛ فقط یک **literal string** جستجو کردیم.

---

# 4. استفاده از `|` — OR

فرض کن می‌خواهیم:

> ا-`ERROR` یا `WARNING`

را پیدا کنیم.

```
grep -E 'ERROR|WARNING' users.log
```

خروجی:

```
ERROR: user=reza ip=192.168.1.30 status=500
WARNING: user=sara ip=192.168.1.40 status=404
ERROR: user=admin ip=10.0.0.1 status=403
ERROR: database connection failed
```

ساختار:

```
ERROR|WARNING
     ↑
    OR
```

یعنی:

> ا-ERROR یا WARNING

---

# 5. استفاده از Group

می‌توانیم همین Regex را واضح‌تر بنویسیم:

```
grep -E '(ERROR|WARNING)' users.log
```

`()` باعث می‌شود این دو عبارت یک Group باشند.

این موضوع وقتی Regex پیچیده‌تر می‌شود بسیار مهم است.

مثلاً:

```
grep -E '^(ERROR|WARNING)' users.log
```

یعنی:

> خط‌هایی که **از ERROR یا WARNING شروع می‌شوند**.

---

# 6. `^` — ابتدای خط

```
grep -E '^ERROR' users.log
```

یعنی:

> خط‌هایی که با `ERROR` شروع می‌شوند.

خروجی:

```
ERROR: user=reza ip=192.168.1.30 status=500
ERROR: user=admin ip=10.0.0.1 status=403
ERROR: database connection failed
```

`^` خودش چیزی را match نمی‌کند؛ فقط می‌گوید **مکان match باید ابتدای خط باشد**.

---

# 7. `$` — انتهای خط

فرض کن می‌خواهیم خط‌هایی را پیدا کنیم که با `200` تمام می‌شوند:

```
grep -E '200$' users.log
```

خروجی:

```
INFO: user=arian ip=192.168.1.10 status=200
INFO: user=ali ip=192.168.1.20 status=200
INFO: user=mina ip=10.0.0.15 status=200
INFO: user=test123 ip=172.16.0.5 status=200
```

یعنی:

```
200$
   ↑
انتهای خط
```

---

# 8. `+` — یک یا بیشتر

فرض کن می‌خواهیم userهایی را پیدا کنیم که بعد از `user=` حداقل یک کاراکتر دارند.

می‌توانیم بنویسیم:

```
grep -E 'user=[a-z]+' users.log
```

اینجا:

```
[a-z]
```

یعنی یک حرف کوچک.

و:

```
+
```

یعنی یک یا بیشتر.

پس:

```
[a-z]+
```

یعنی:

> یک یا چند حرف کوچک پشت سر هم.

---

# 9. `[0-9]+` — یک یا چند رقم

حالا IP یا status code داریم.

مثلاً:

```
grep -E '[0-9]+' users.log
```

این دستور هر خطی که حداقل یک رقم داشته باشد را پیدا می‌کند.

تقریباً تمام خط‌های فایل ما match می‌شوند، چون بیشترشان IP یا status code دارند.

این مثال نشان می‌دهد که گاهی باید Regex را **دقیق‌تر** کنیم.

---

# 10. پیدا کردن Status Code

می‌خواهیم فقط خط‌هایی را پیدا کنیم که status آن‌ها با:

```
4
```

شروع می‌شود.

مثلاً `404`.

```
grep -E 'status=4[0-9]{2}' users.log
```

ساختار:

```
status=
4
[0-9]{2}
```

یعنی:

> ا-`status=` سپس عدد 4 و بعد دقیقاً دو رقم دیگر.

خروجی:

```
WARNING: user=sara ip=192.168.1.40 status=404
```

---

# 11. پیدا کردن Statusهای 4xx یا 5xx

می‌توانیم از Group + Alternation استفاده کنیم:

```
grep -E 'status=(4|5)[0-9]{2}' users.log
```

یعنی:

```
status=
   ↓
4 یا 5
   ↓
دو رقم دیگر
```

خروجی:

```
ERROR: user=reza ip=192.168.1.30 status=500
WARNING: user=sara ip=192.168.1.40 status=404
ERROR: user=admin ip=10.0.0.1 status=403
```

---

# 12. پیدا کردن IP Address

حالا یک Regex کاربردی‌تر:

```
grep -E '[0-9]{1,3}(\.[0-9]{1,3}){3}' users.log
```

اینجا چند مفهوم با هم ترکیب شده‌اند.

```
[0-9]{1,3}
```

یعنی:

> یک تا سه رقم

و:

```
\.
```

یعنی:

> یک نقطه واقعی

و:

```
(\.[0-9]{1,3}){3}
```

یعنی:

> این قسمت سه بار تکرار شود.

بنابراین الگوی کلی:

```
192.168.1.10
   │
   ├── 192
   ├── 168
   ├── 1
   └── 10
```

**نکته:** این Regex یک اعتبارسنجی کامل IP نیست؛ مثلاً می‌تواند بعضی مقادیر نامعتبر مثل `999.999.999.999` را هم match کند. برای جستجوی تقریبی IP مناسب است.

---

# 13. پیدا کردن Username

می‌خواهیم userهایی که فقط شامل حروف هستند را پیدا کنیم:

```
grep -E 'user=[a-z]+' users.log
```

اما `test123` هم user است و رقم دارد.

اگر بخواهیم حروف و اعداد هر دو مجاز باشند:

```
grep -E 'user=[a-zA-Z0-9]+' users.log
```

یعنی:

> بعد از `user=` یک یا چند حرف یا رقم وجود داشته باشد.

---

# 14. `?` — صفر یا یک بار

فرض کن در فایل‌ها ممکن است بنویسیم:

```
color
colour
```

می‌توانیم:

```
grep -E 'colou?r' file.txt
```

بنویسیم.

ا-`u?` یعنی:

> ا-`u` صفر یا یک بار وجود داشته باشد.

پس هر دو را match می‌کند:

```
color
colour
```

---

# ا-15. `{n}` — تعداد دقیق

مثلاً می‌خواهیم status code دقیقاً سه رقم باشد:

```
grep -E 'status=[0-9]{3}' users.log
```

یعنی:

```
[0-9]{3}
```

سه رقم دقیق.

---

# ا-16. `{n,m}` — محدوده

فرض کن username باید حداقل 3 و حداکثر 8 کاراکتر داشته باشد:

```
grep -E 'user=[a-zA-Z0-9]{3,8}' users.log
```

یعنی:

```
{3,8}
```

حداقل ۳ و حداکثر ۸ کاراکتر.

---

# 17. `.` — هر یک کاراکتر

فرض کن:

```
grep -E 'u.er' users.log
```

`.` یعنی:

> هر کاراکتر دلخواه

مثلاً می‌تواند با:

```
user
uXer
u1er
```

match شود.

اگر واقعاً خود نقطه را بخواهیم، باید escape کنیم:

```
\.
```

مثلاً:

```
grep -E '192\.168' users.log
```

---

# 18. پیدا کردن خط‌هایی که با INFO شروع می‌شوند

```
grep -E '^INFO' users.log
```

---

# 19. پیدا کردن خط‌هایی که با ERROR تمام می‌شوند

```
grep -E 'ERROR$' users.log
```

در فایل فعلی احتمالاً نتیجه‌ای نمی‌دهد، چون `ERROR` ابتدای خط است.

---

# 20. ترکیب چند مفهوم

اینجا جایی است که `grep -E` واقعاً کاربردی می‌شود.

مثلاً:

> خط‌هایی که با ERROR یا WARNING شروع شوند و یک status code سه‌رقمی داشته باشند.

```
grep -E '^(ERROR|WARNING).*status=[0-9]{3}' users.log
```

ساختار:

```
^
↓
شروع خط

(ERROR|WARNING)
↓
یکی از این دو

.*
↓
هر تعداد کاراکتر

status=
↓
عبارت ثابت

[0-9]{3}
↓
سه رقم
```

خروجی:

```
ERROR: user=reza ip=192.168.1.30 status=500
WARNING: user=sara ip=192.168.1.40 status=404
ERROR: user=admin ip=10.0.0.1 status=403
```

---

# 21. چند الگوی کاربردی که ارزش حفظ کردن دارند

|هدف|Command|
|---|---|
|پیدا کردن ERROR|`grep -E 'ERROR' users.log`|
|ERROR یا WARNING|`grep -E 'ERROR\|WARNING' users.log`|
|شروع با ERROR|`grep -E '^ERROR' users.log`|
|پایان با 200|`grep -E '200$' users.log`|
|یک یا چند رقم|`grep -E '[0-9]+' users.log`|
|دقیقاً 3 رقم|`grep -E '[0-9]{3}' users.log`|
|statusهای 4xx|`grep -E 'status=4[0-9]{2}' users.log`|
|statusهای 4xx یا 5xx|`grep -E 'status=(4\|5)[0-9]{2}' users.log`|
|username حروفی|`grep -E 'user=[a-z]+' users.log`|
|username حروف/عدد|`grep -E 'user=[a-zA-Z0-9]+' users.log`|
|IP تقریبی|`grep -E '[0-9]{1,3}(\.[0-9]{1,3}){3}' users.log`|

**یک نکته:** در جدول Markdown، برای اینکه `|` به‌عنوان جداکننده جدول تفسیر نشود، آن را به شکل `\|` نشان دادم؛ اما داخل خود command در shell باید همان `|` را بنویسی.

---

# 22. مدل ذهنی خیلی مهم برای `grep -E`

وقتی یک Regex می‌بینی، آن را از چپ به راست تجزیه کن.

مثلاً:

```
grep -E '^(ERROR|WARNING).*status=[0-9]{3}$' users.log
```

به این شکل بخوان:

```
^
شروع خط

(ERROR|WARNING)
ERROR یا WARNING

.*
هر چیزی در وسط

status=
این متن ثابت

[0-9]{3}
دقیقاً سه رقم

$
پایان خط
```

یعنی Regex را نباید یک چیز ترسناک و یک‌تکه ببینی؛ **از چند قطعه‌ی کوچک ساخته شده است.**

---

# جمع‌بندی

ا-`grep -E` وقتی به درد می‌خورد که جستجوی ساده‌ی متنی کافی نباشد و بخواهی بر اساس **ساختار متن** جستجو کنی.

مهم‌ترین چیزهایی که تا اینجا یاد گرفتی:

```
^           شروع خط
$           پایان خط
.           هر کاراکتر
[]          Character Class
*           صفر یا بیشتر
+           یک یا بیشتر
?           صفر یا یک
{n}         دقیقاً n بار
{n,m}       بین n و m بار
()          Group
|           OR
\           Escape
```

و وقتی این‌ها را با هم ترکیب کنی، `grep -E` تبدیل می‌شود به یک ابزار بسیار قدرتمند برای کارهای **Linux / SysAdmin / DevOps**؛ مخصوصاً برای بررسی **logها، configها، خروجی commandها، IPها، status codeها و الگوهای مختلف متن**.
