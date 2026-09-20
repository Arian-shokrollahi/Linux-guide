# ا-AWK

## ا-Introduction

ا-`awk` یکی از ابزارهای قدرتمند Unix/Linux برای **پردازش و تحلیل متن** است.

اگر `grep` را بیشتر به‌عنوان ابزاری برای:

> «پیدا کردن خط‌هایی که با یک الگو match می‌شوند»

در نظر بگیریم، `awk` بیشتر برای:

> «خواندن متن، جدا کردن ستون‌ها، بررسی شرط‌ها، محاسبه و ساختن خروجی جدید»

استفاده می‌شود.

یکی از مهم‌ترین ویژگی‌های `awk` این است که فایل را به **record** و **field** تقسیم می‌کند.

مثلاً این فایل را در نظر بگیر:

```text
NAME AGE CITY
Arian 20 Baku
Ali 25 Tehran
Sara 22 Tabriz
Reza 30 Shiraz
```

ا-`awk` می‌تواند این داده را به شکل ستون‌هایی مثل `$1`، `$2` و `$3` ببیند.

```text
$1        $2       $3
 ↓         ↓        ↓
Arian      20      Baku
Ali        25      Tehran
Sara       22      Tabriz
Reza       30      Shiraz
```

---

# ساختار کلی AWK

ساختار پایه‌ی `awk` معمولاً به این شکل است:

```bash
awk 'pattern { action }' file
```

یعنی:

```text
pattern
   ↓
چه خط‌هایی؟

action
   ↓
با آن خط‌ها چه کاری انجام بده؟
```

مثلاً:

```bash
awk '{print $1}' users.txt
```

اینجا pattern نداریم؛ بنابراین action روی تمام خط‌ها اجرا می‌شود.

---

# یک فایل کوچک برای تمرین

فرض کن فایلی به نام `users.txt` داریم:

```text
Name Age City Score
Arian 20 Baku 95
Ali 25 Tehran 82
Sara 22 Tabriz 91
Reza 30 Shiraz 70
Mina 19 Baku 88
```

محتوای فایل را می‌توانیم ببینیم:

```bash
cat users.txt
```

---

# `$1`، `$2`، `$3` و `$NF`

مهم‌ترین مفهوم اولیه‌ی `awk`، **Field**ها هستند.

در `awk`:

```text
$1 → ستون اول
$2 → ستون دوم
$3 → ستون سوم
...
$NF → آخرین ستون
```

برای مثال:

```bash
awk '{print $1}' users.txt
```

خروجی:

```text
Name
Arian
Ali
Sara
Reza
Mina
```

برای ستون دوم:

```bash
awk '{print $2}' users.txt
```

خروجی:

```text
Age
20
25
22
30
19
```

و برای آخرین ستون:

```bash
awk '{print $NF}' users.txt
```

خروجی:

```text
Score
95
82
91
70
88
```

---

# ا-`print`

ا-`print` برای چاپ کردن داده استفاده می‌شود.

مثلاً:

```bash
awk '{print $1, $3}' users.txt
```

یعنی:

> ستون اول و سوم را چاپ کن.

خروجی:

```text
Name City
Arian Baku
Ali Tehran
Sara Tabriz
Reza Shiraz
Mina Baku
```

می‌توانی متن ثابت هم چاپ کنی:

```bash
awk '{print "User:", $1}' users.txt
```

خروجی:

```text
User: Name
User: Arian
User: Ali
User: Sara
User: Reza
User: Mina
```

---

# ا-`NR` — شماره خط

ا-`NR` شماره‌ی record فعلی است.

در یک فایل ساده، معمولاً همان شماره خط را نشان می‌دهد.

```bash
awk '{print NR, $1}' users.txt
```

خروجی:

```text
1 Name
2 Arian
3 Ali
4 Sara
5 Reza
6 Mina
```

این برای شماره‌گذاری خروجی بسیار کاربردی است.

---

# ا-`NF` — تعداد ستون‌ها

ا-`NF` تعداد fieldهای موجود در خط فعلی است.

مثلاً:

```bash
awk '{print NF}' users.txt
```

خروجی:

```text
4
4
4
4
4
4
```

چون هر خط چهار ستون دارد.

تفاوت مهم:

```text
$NF
 ↓
محتوای آخرین ستون

NF
 ↓
تعداد ستون‌ها
```

---

# شرط با `awk`

یکی از قسمت‌های مهم `awk` استفاده از شرط است.

مثلاً می‌خواهیم فقط userهایی را نمایش دهیم که سنشان بیشتر از 20 است:

```bash
awk '$2 > 20 {print $1, $2}' users.txt
```

خروجی:

```text
Ali 25
Sara 22
Reza 30
```

ساختار:

```text
$2 > 20
   ↓
شرط

{print $1, $2}
   ↓
کاری که باید انجام شود
```

---

# شرط روی یک ستون مشخص

مثلاً فقط کسانی که در Baku هستند:

```bash
awk '$3 == "Baku" {print $1, $2}' users.txt
```

خروجی:

```text
Arian 20
Mina 19
```

در `awk`:

```text
==  → مساوی
!=  → نامساوی
>   → بزرگ‌تر
<   → کوچک‌تر
>=  → بزرگ‌تر یا مساوی
<=  → کوچک‌تر یا مساوی
```

---

# استفاده از `&&` و `||`

می‌توانیم چند شرط را ترکیب کنیم.

مثلاً:

> سن بیشتر از 20 باشد و شهر Baku باشد.

```bash
awk '$2 > 20 && $3 == "Baku" {print $1}' users.txt
```

یا:

> شهر Baku یا Tehran باشد.

```bash
awk '$3 == "Baku" || $3 == "Tehran" {print $1}' users.txt
```

---

# ا-`BEGIN`

ا-`BEGIN` قبل از خواندن اولین خط فایل اجرا می‌شود.

مثلاً:

```bash
awk 'BEGIN {print "Users:"} {print $1}' users.txt
```

خروجی:

```text
Users:
Name
Arian
Ali
Sara
Reza
Mina
```

یعنی:

```text
BEGIN
  ↓
قبل از فایل

{...}
  ↓
برای هر خط
```

---

# ا-`END`

ا-`END` بعد از تمام شدن فایل اجرا می‌شود.

مثلاً:

```bash
awk '{print $1} END {print "Done"}' users.txt
```

خروجی:

```text
Name
Arian
Ali
Sara
Reza
Mina
Done
```

پس ساختار معروف:

```bash
awk 'BEGIN { ... } { ... } END { ... }' file
```

به شکل زیر است:

```text
BEGIN
  ↓
شروع

{
  ↓
هر خط

}

END
  ↓
پایان
```

---

# محاسبات با AWK

 ا-`awk` فقط برای چاپ نیست؛ می‌تواند محاسبه هم انجام دهد.

مثلاً مجموع Scoreها:

```
awk 'NR > 1 {sum += $4} END {print sum}' users.txt
```

خروجی:

```
426
```

اینجا:

```
sum += $4
```

یعنی:

> مقدار ستون چهارم را به `sum` اضافه کن.

---

# میانگین

می‌توانیم میانگین Scoreها را هم حساب کنیم:

```
awk 'NR > 1 {sum += $4} END {print sum/(NR-1)}' users.txt
```

خروجی تقریباً:

```
85.2
```

اینجا:

```
NR - 1
```

تعداد userهاست، چون خط اول header است.

---

# `NR > 1`

این الگو خیلی کاربردی است.

چون فایل ما header دارد:

```
Name Age City Score
```

نمی‌خواهیم header وارد محاسبات شود.

پس:

```
awk 'NR > 1 {print $1}' users.txt
```

یعنی:

> فقط خط‌های بعد از خط اول را پردازش کن.

خروجی:

```
Arian
Ali
Sara
Reza
Mina
```

---

# تغییر Separator با `-F`

تا اینجا فایل ما با Space جدا شده بود.

اما در Linux خیلی وقت‌ها داده‌ها با `:`، `,` یا `|` جدا می‌شوند.

مثلاً:

```
Arian:20:Baku:95
Ali:25:Tehran:82
Sara:22:Tabriz:91
```

اگر فایل `users.csv` با `:` جدا شده باشد:

```
awk -F ':' '{print $1, $3}' users.csv
```

یعنی:

```
-F ':'
   ↓
Field Separator = :
```

خروجی:

```
Arian Baku
Ali Tehran
Sara Tabriz
```

---

# مثال واقعی Linux

یکی از مثال‌های بسیار خوب برای `awk` فایل `/etc/passwd` است.

بخشی از آن ممکن است شبیه این باشد:

```
root:x:0:0:root:/root:/bin/bash
arian:x:1000:1000:Arian:/home/arian:/bin/bash
```

فیلدها با `:` جدا شده‌اند.

برای نمایش usernameها:

```
awk -F ':' '{print $1}' /etc/passwd
```

برای نمایش username و shell:

```
awk -F ':' '{print $1, $7}' /etc/passwd
```

این یکی از کاربردهای واقعی و مهم `awk` در Linux است.

---

# ترکیب AWK با Regex

ا-`awk` می‌تواند با Regex هم کار کند.

مثلاً:

```
awk '/ERROR/ {print}' users.log
```

یعنی:

> خط‌هایی که `ERROR` دارند را چاپ کن.

حتی می‌توانیم شرط Regex را روی یک field قرار دهیم:

```
awk '$3 ~ /^B/' users.txt
```

یعنی:

> اگر ستون سوم با `B` شروع می‌شود، آن خط را انتخاب کن.

در اینجا:

```
~
 ↓
Regex match
```

و:

```
/^B/
 ↓
با B شروع شود
```

---

# `~` و `!~`

دو operator مهم Regex در `awk`:

```
~   → match کردن با Regex
!~  → match نشدن با Regex
```

مثلاً:

```
awk '$3 ~ /Baku/ {print $1}' users.txt
```

و:

```
awk '$3 !~ /Baku/ {print $1}' users.txt
```

دومی یعنی:

> ا-userهایی که شهرشان Baku نیست.

---

# تفاوت ذهنی grep و awk

این دو ابزار را این‌طور از هم جدا کن:

```
grep
 ↓
پیدا کردن متن / خط‌های موردنظر
```

اما:

```
awk
 ↓
خواندن ساختاریافته‌ی داده
 ↓
ستون‌ها
 ↓
شرط
 ↓
محاسبه
 ↓
تغییر خروجی
```

مثلاً:

```
grep 'ERROR' users.log
```

برای پیدا کردن خط‌های ERROR عالی است.

ولی اگر بخواهی:

> از خط‌های ERROR فقط username و status code را استخراج کن

ا-`awk` بسیار مناسب‌تر می‌شود.

---

# چند مدل کاربردی AWK

### 1. چاپ یک ستون

```
awk '{print $1}' file.txt
```

### 2. چاپ چند ستون

```
awk '{print $1, $3}' file.txt
```

### 3. چاپ آخرین ستون

```
awk '{print $NF}' file.txt
```

### 4. شماره‌گذاری خطوط

```
awk '{print NR, $0}' file.txt
```

### 5. شرط عددی

```
awk '$2 > 20 {print $1}' file.txt
```

### 6. شرط متنی

```
awk '$3 == "Baku" {print $1}' file.txt
```

### 7. استفاده از Regex

```
awk '$1 ~ /^A/ {print}' file.txt
```

### 8. تغییر Separator

```
awk -F ':' '{print $1}' /etc/passwd
```

### 9. محاسبه

```
awk '{sum += $4} END {print sum}' file.txt
```

### 10. BEGIN و END

```
awk 'BEGIN {print "Start"} {print $1} END {print "Done"}' file.txt
```

---

# مهم‌ترین متغیرهای AWK

|متغیر|معنی|
|---|---|
|`$0`|کل خط فعلی|
|`$1`|ستون اول|
|`$2`|ستون دوم|
|`$3`|ستون سوم|
|`$NF`|آخرین ستون|
|`NF`|تعداد ستون‌های خط فعلی|
|`NR`|شماره رکورد/خط فعلی|
|`FS`|Field Separator|
|`OFS`|Output Field Separator|
|`RS`|Record Separator|
|`ORS`|Output Record Separator|

دو موردی که فعلاً بیشتر از همه استفاده می‌کنی:

```
$1 $2 $3 ...
 ↓
محتوای ستون‌ها

NF
 ↓
تعداد ستون‌ها

NR
 ↓
شماره خط
```

---

# یک مدل ذهنی ساده برای AWK

هر بار که `awk` می‌بینی، این چهار سؤال را از خودت بپرس:

```
1. داده من چطور تقسیم شده؟
        ↓
      Fields

2. کدام خط‌ها را می‌خواهم؟
        ↓
      Pattern

3. چه کاری روی آن‌ها انجام دهم؟
        ↓
      Action

4. آیا باید چیزی محاسبه یا در پایان چاپ شود؟
        ↓
      BEGIN / END
```

مثلاً:

```
awk -F ':' '$3 >= 1000 {print $1, $7}' /etc/passwd
```

این را از چپ به راست بخوان:

```
-F ':'
↓
ستون‌ها با : جدا شده‌اند

$3 >= 1000
↓
شرط

{print $1, $7}
↓
username و shell را چاپ کن
```

این دقیقاً طرز فکر اصلی `awk` است.

## خلاصه

اگر بخواهم `awk` را در یک جمله تعریف کنم:

> ا-**AWK ابزاری برای پردازش خط‌به‌خط متن است که می‌تواند داده را به ستون‌ها تقسیم کند، روی آن‌ها شرط بگذارد، Regex استفاده کند، محاسبه انجام دهد و خروجی جدید بسازد.**

برای مسیر Linux / SysAdmin / DevOps تو، این قسمت‌ها را از `awk` باید خیلی خوب بلد باشی:

```
$0
$1 $2 $3 ...
$NF
NF
NR
-F
print
pattern { action }
BEGIN
END
if / conditions
&& / ||
~
!~
```

بعد از این‌ها، مرحله‌ی بعدی `awk` می‌شود **variables، if/else، loops، arrays و functions**؛ آنجاست که `awk` از یک ابزار ساده‌ی استخراج ستون به یک زبان کوچک برای پردازش داده تبدیل می‌شود.
