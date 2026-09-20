# ا-`sed` چیست؟

ا-`sed` مخفف **Stream Editor** است.

یعنی ابزاری که متن را **خط‌به‌خط می‌خواند، روی آن یک دستور اجرا می‌کند و نتیجه را خروجی می‌دهد**.

مدل ذهنی ساده:

```
File
 │
 ▼
sed
 │
 ├── هر خط را می‌خواند
 ├── Pattern را بررسی می‌کند
 ├── Command را اجرا می‌کند
 │
 ▼
Output
```

مثلاً:

```
sed 's/foo/bar/' file.txt
```

یعنی:

> در هر خط، `foo` را پیدا کن و با `bar` جایگزین کن.

---

# 1. ساختار اصلی `sed`

مهم‌ترین Syntax:

```
sed 'command' file
```

مثلاً:

```
sed 'p' file.txt
```

یا:

```
sed 's/old/new/' file.txt
```

ساختار معروف‌تر:

```
sed 'address command' file
```

مثلاً:

```
sed '3d' file.txt
```

یعنی:

> خط شماره 3 را حذف کن.

---

# 2. یک فایل تمرینی

فرض کن این فایل را داریم:

```
Arian 20 Baku
Ali 25 Tehran
Sara 22 Tabriz
Reza 30 Shiraz
Mina 19 Baku
```

اسم فایل:

```
users.txt
```

---

# 3. مهم‌ترین Commandهای `sed`

|Command|معنی|
|---|---|
|`p`|print|
|`d`|delete|
|`s`|substitute|
|`a`|append|
|`i`|insert|
|`c`|change|
|`q`|quit|

اما در عمل، برای شروع این سه تا خیلی مهم‌اند:

```
s → جایگزینی
d → حذف
p → چاپ
```

---

# 4. ا-`sed` و `s` — مهم‌ترین بخش

این:

```
s/old/new/
```

یعنی:

```
s
│
├── old   → چیزی که می‌گردیم
│
└── new   → چیزی که جایگزین می‌کنیم
```

مثلاً:

```
sed 's/Baku/London/' users.txt
```

خروجی:

```
Arian 20 London
Ali 25 Tehran
Sara 22 Tabriz
Reza 30 Shiraz
Mina 19 London
```

**نکته مهم:** فایل اصلی تغییر نکرده.

ا-`sed` به صورت پیش‌فرض نتیجه را روی `stdout` می‌دهد.

---

# 5. چرا فقط اولین occurrence؟

فرض کن:

```
Arian Baku Baku
```

بزنیم:

```
sed 's/Baku/London/' file.txt
```

می‌شود:

```
Arian London Baku
```

چون `sed` به صورت پیش‌فرض فقط **اولین match در هر line** را عوض می‌کند.

برای همه occurrenceهای همان خط:

```
sed 's/Baku/London/g' file.txt
```

ا-`g` یعنی:

> ا-global

نتیجه:

```
Arian London London
```

---

# 6. فقط یک خط خاص

مثلاً فقط خط سوم:

```
sed '3s/Tabriz/Paris/' users.txt
```

یعنی:

```
3
│
└── فقط line 3

s/Tabriz/Paris/
│
└── replace
```

---

# 7. بازه‌ای از خطوط

مثلاً خطوط 2 تا 4:

```
sed '2,4d' users.txt
```

یعنی:

```
line 2 ─┐
line 3  │ delete
line 4 ─┘
```

خروجی:

```
Arian 20 Baku
Mina 19 Baku
```

---

# 8. حذف خط

ا-`d` یعنی delete.

مثلاً خط 3:

```
sed '3d' users.txt
```

حذف خطوط 2 تا 4:

```
sed '2,4d' users.txt
```

حذف آخرین خط:

```
sed '$d' users.txt
```

اینجا `$` یعنی:

```
آخرین خط
```

---

# 9. چاپ خط خاص

مثلاً خط سوم:

```
sed -n '3p' users.txt
```

خروجی:

```
Sara 22 Tabriz
```

اینجا `-n` خیلی مهم است.

بدون `-n`:

```
sed '3p' users.txt
```

ممکن است کل فایل را چاپ کند و خط سوم را دوباره هم چاپ کند.

پس:

```
-n
```

یعنی:

> ا-automatic printing را خاموش کن.

بعد:

```
3p
```

می‌گوید:

> فقط line 3 را print کن.

---

# 10. ا-Pattern در `sed`

ا-`sed` فقط با شماره خط کار نمی‌کند.

می‌توانیم Pattern هم بدهیم.

مثلاً:

```
sed '/Baku/d' users.txt
```

یعنی:

> هر خطی که `Baku` دارد حذف کن.

نتیجه:

```
Ali 25 Tehran
Sara 22 Tabriz
Reza 30 Shiraz
```

این قسمت خیلی مهم است:

```
/Baku/
```

یعنی:

> این regex/pattern را روی line بررسی کن.

پس `sed` با **Regex** ارتباط بسیار نزدیکی دارد.

---

# 11. Replace با Regex

مثلاً:

```
sed 's/[0-9][0-9]/XX/' users.txt
```

هر دو رقم پشت‌سرهم را پیدا می‌کند.

ولی اگر از Extended Regex استفاده کنیم:

```
sed -E 's/[0-9]+/NUMBER/' users.txt
```

مثلاً:

```
Arian NUMBER Baku
Ali NUMBER Tehran
```

---

# 12. ا-`sed -E`

مثل `grep`، `sed` هم Regex دارد.

```
sed -E 's/regex/replacement/'
```

ا-`-E` یعنی استفاده از **ERE**.

مثلاً:

```
sed -E 's/[0-9]+/NUMBER/g' users.txt
```

---

# 13. تغییر کل فایل با `-i`

تا الان:

```
sed 's/Baku/London/g' users.txt
```

فقط output را تغییر می‌داد.

اگر بخواهیم **خود فایل** تغییر کند:

```
sed -i 's/Baku/London/g' users.txt
```

`-i`:

```
in-place
```

یعنی:

> تغییر مستقیماً روی فایل اعمال شود.

⚠️ این گزینه را باید با دقت استفاده کنی، چون دیگر فقط output موقت نیست؛ فایل واقعاً تغییر می‌کند.

---

# 14. Backup هنگام `-i`

می‌توانی backup بگیری:

```
sed -i.bak 's/Baku/London/g' users.txt
```

حالا:

```
users.txt
users.txt.bak
```

فایل `.bak` نسخه قبلی است.

این برای کارهای SysAdmin خیلی کاربردی است.

---

# 15. `a` — اضافه کردن بعد از خط

مثلاً بعد از line 2:

```
sed '2a New User 21 Baku' users.txt
```

یعنی:

```
line 2
   ↓
New User...
```

---

# 16. `i` — اضافه کردن قبل از خط

```
sed '2i New User 21 Baku' users.txt
```

یعنی قبل از line 2 قرار می‌گیرد.

تفاوت:

```
i → insert before
a → append after
```

---

# 17. `c` — تغییر کامل یک خط

مثلاً:

```
sed '3c Sara 23 Baku' users.txt
```

کل line 3 را با متن جدید جایگزین می‌کند.

---

# 18. چند Command با هم

می‌توانی چند دستور به `sed` بدهی:

```
sed -e 's/Baku/London/g' -e 's/Tehran/Berlin/g' users.txt
```

یا:

```
sed 's/Baku/London/g; s/Tehran/Berlin/g' users.txt
```

یعنی:

```
Baku   → London
Tehran → Berlin
```

---

# 19. `sed` + `grep` + `awk`

اینجا جایگاه `sed` خیلی واضح می‌شود:

```
grep
 │
 └── پیدا کردن / فیلتر کردن lineها

sed
 │
 └── تغییر / حذف / اضافه کردن متن

awk
 │
 └── پردازش fieldها + شرط + محاسبه
```

مثلاً:

### grep

```
grep 'Baku' users.txt
```

یعنی:

> خط‌هایی که Baku دارند را پیدا کن.

### sed

```
sed 's/Baku/London/g' users.txt
```

یعنی:

> Baku را تغییر بده.

### awk

```
awk '$3 == "Baku" {print $1}' users.txt
```

یعنی:

> اگر field سوم Baku بود، field اول را چاپ کن.

---

# 20. یک مثال واقعی‌تر SysAdmin

فرض کن فایل configuration داری:

```
server_name example.com;
port 80;
environment development;
debug true;
```

می‌خواهی `development` را به `production` تبدیل کنی:

```
sed 's/development/production/' config.txt
```

یا مستقیماً فایل را تغییر بدهی:

```
sed -i 's/development/production/' config.txt
```

یا:

```
sed -i 's/debug true/debug false/' config.txt
```

این نوع کارها در **configuration management، scripting و DevOps** خیلی رایج‌اند.

---

# مهم‌ترین چیزهایی که از `sed` فعلاً باید بلد باشی

اگر بخواهم هسته‌ی `sed` را برایت خلاصه کنم:

```
sed
│
├── s   → substitute
├── d   → delete
├── p   → print
├── a   → append
├── i   → insert
├── c   → change
│
├── -n  → no automatic printing
├── -i  → edit file in-place
└── -E  → Extended Regex
```

و این Syntax را **خیلی خوب** یاد بگیر:

```
sed 'address command' file
```

مثلاً:

```
sed '3d' file
```

```
sed '2,5d' file
```

```
sed '/ERROR/d' file
```

```
sed 's/old/new/' file
```

```
sed 's/old/new/g' file
```

```
sed -n '3p' file
```

```
sed -i 's/old/new/g' file
```

اگر `awk` را کنار `grep` و Regex که الان داری یاد می‌گیری بگذاری، **`sed` عملاً ابزار سوم زنجیره‌ی text processing لینوکس** است: `grep` برای پیدا کردن، `sed` برای تغییر، و `awk` برای پردازش ساختاریافته‌ی داده.
