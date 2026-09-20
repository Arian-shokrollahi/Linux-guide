# ا-`grep`

## 1. توضیح و ساختار

ا-`grep` برای **پیدا کردن یک متن یا الگو (pattern) داخل فایل‌ها** استفاده می‌شود. این command در بررسی configurationها، logها و خروجی commandها بسیار کاربردی است.

### ساختار کلی

```
grep [OPTIONS] PATTERN [FILE...]
```

مثلاً:

```
grep "PermitRootLogin" /etc/ssh/sshd_config
```

> ا-Search for `PermitRootLogin`

ساختار:

```
grep
 │
 ├── [OPTIONS]
 │      └── نحوه جستجو را مشخص می‌کند
 │
 ├── PATTERN
 │      └── دنبال چه متنی بگردیم؟
 │
 └── FILE
        └── در کدام فایل جستجو کنیم؟
```

برای جستجو در چند فایل یا یک directory هم می‌توانیم از `-r` استفاده کنیم:

```
grep -r "error" /var/log/
```

> ا-Search recursively for `error`

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-i`|نادیده گرفتن حروف بزرگ و کوچک|
|`-r`|جستجوی recursive در directoryها|
|`-R`|recursive، با دنبال کردن symbolic linkها|
|`-n`|نمایش شماره خط|
|`-v`|نمایش خطوطی که با pattern match نمی‌شوند|
|`-w`|جستجوی یک کلمه کامل|
|`-x`|تطبیق کل خط|
|`-l`|فقط نام فایل‌های دارای match را نمایش می‌دهد|
|`-L`|فقط فایل‌های بدون match را نمایش می‌دهد|
|`-c`|تعداد خطوط match شده را نمایش می‌دهد|
|`-o`|فقط قسمت match شده را نمایش می‌دهد|
|`-E`|استفاده از Extended Regular Expressions|
|`-A`|نمایش چند خط بعد از match|
|`-B`|نمایش چند خط قبل از match|
|`-C`|نمایش چند خط قبل و بعد از match|

### مهم‌ترین‌ها برای شروع

اگر بخواهی اول موارد ضروری را یاد بگیری:

```
-i
-r
-n
-v
-w
-l
-c
-E
-A / -B / -C
```

---

# 3. مثال‌های کاربردی

### جستجوی یک متن داخل فایل

```
grep "PermitRootLogin" /etc/ssh/sshd_config
```

> ا-Search for text inside a file

---

### نادیده گرفتن حروف بزرگ و کوچک

```
grep -i "error" application.log
```

> ا-Search ignoring case

مثلاً `error`، `Error` و `ERROR` را پیدا می‌کند.

---

### نمایش شماره خط

```
grep -n "error" application.log
```

> ا-Show matching line numbers

---

### جستجوی recursive

```
grep -r "server_name" /etc/nginx/
```

> ا-Search recursively in a directory

این برای پیدا کردن یک configuration در بین چندین فایل خیلی کاربردی است.

---

### فقط نام فایل‌های دارای match

```
grep -rl "server_name" /etc/nginx/
```

> ا-Show only matching filenames

---

### شمردن تعداد matchها

```
grep -c "error" application.log
```

> ا-Count matching lines

---

### پیدا کردن خطوطی که شامل pattern نیستند

```
grep -v "^#" /etc/ssh/sshd_config
```

> ا-Show lines that do not start with `#`

این مثال خیلی کاربردی است چون می‌توانی خطوط comment شده را کنار بگذاری.

---

### پیدا کردن یک کلمه کامل

```
grep -w "root" /etc/passwd
```

> Match the whole word

مثلاً `root` را پیدا می‌کند ولی الزاماً `rootuser` را match نمی‌کند.

---

### نمایش context اطراف نتیجه

```
grep -C 2 "error" application.log
```

> Show 2 lines before and after the match

همچنین:

```
grep -A 3 "error" application.log
```

> Show 3 lines after the match

```
grep -B 3 "error" application.log
```

> Show 3 lines before the match

---

### استفاده از چند pattern

```
grep -E "error|warning" application.log
```

> Search for `error` or `warning`

`-E` برای **Extended Regular Expressions** است و وقتی وارد بحث regex شوی اهمیت بیشتری پیدا می‌کند.

---

# 4. `grep` کجا به دردمان می‌خورد؟

`grep` یکی از commandهای بسیار مهم برای **SysAdmin و DevOps** است، مخصوصاً برای:

- جستجو در configuration فایل‌ها
- بررسی logها
- پیدا کردن error و warning
- پیدا کردن یک setting خاص
- فیلتر کردن خروجی commandها
- بررسی فایل‌های متعدد
- ا-troubleshooting سرویس‌ها
- کار با Nginx، SSH، systemd و Docker

مثلاً وقتی Nginx داری و می‌خواهی تمام `server_name`هایی که در configurationها استفاده شده‌اند را پیدا کنی:

```
grep -r "server_name" /etc/nginx/
```

یا برای بررسی log:

```
grep -i "error" /var/log/nginx/error.log
```

### یک نکته خیلی مهم

ا-`find` و `grep` را با هم قاطی نکن:

```
find → دنبال FILE می‌گردد
grep → دنبال TEXT داخل FILE می‌گردد
```

و قدرت واقعی‌شان وقتی مشخص می‌شود که با هم استفاده شوند:

```
find /var/log -type f -name "*.log" -exec grep -i "error" {} \;
```

> ا-Find log files and search for errors inside them

این ترکیب برای کارهای واقعی SysAdmin خیلی مهم است.
