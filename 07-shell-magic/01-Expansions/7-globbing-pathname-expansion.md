# 7-Pathname Expansion 
---
## ا-Pathname Expansion چیست؟

ا-**Pathname Expansion** (که به آن **Globbing** هم گفته می‌شود) قابلیتی در Bash است که الگوهای خاصی مثل `*`، `?` و `[]` را به نام فایل‌ها و دایرکتوری‌های موجود تبدیل می‌کند.

یعنی به جای اینکه اسم تک‌تک فایل‌ها را بنویسیم، یک الگو می‌نویسیم و Bash خودش فایل‌های مطابق آن را پیدا می‌کند.

مثال:

```
ls *.txt
```

ا-Bash قبل از اجرای `ls` این را تبدیل می‌کند:

```
*.txt
```

به:

```
file1.txt file2.txt notes.txt
```

---

# جایگاه Pathname Expansion در Bash

مراحل کلی Bash:

```
Command
   |
Parameter Expansion
   |
Command Substitution
   |
Word Splitting
   |
Pathname Expansion
   |
Execution
```

یعنی بعد از اینکه Bash متغیرها را باز کرد و Word Splitting انجام شد، مرحله Globbing اجرا می‌شود.

---

# کاراکترهای مهم Pathname Expansion

|Pattern|معنی|مثال|
|---|---|---|
|`*`|هر تعداد کاراکتر|`*.txt`|
|`?`|دقیقاً یک کاراکتر|`file?.txt`|
|`[]`|یک کاراکتر از مجموعه|`file[123].txt`|
|`[!]`|هر چیزی به جز موارد مشخص|`file[!0-9].txt`|

---

# مثال‌های ساده

## 1. استفاده از `*`

فرض کنیم:

```
file1.txt
file2.txt
image.png
notes.txt
```

دستور:

```
ls *.txt
```

نتیجه:

```
file1.txt
file2.txt
notes.txt
```

چون `*` یعنی هر چیزی قبل از `.txt`.

---

## 2. استفاده از `?`

فایل‌ها:

```
a.txt
ab.txt
abc.txt
```

دستور:

```
ls ?.txt
```

نتیجه:

```
a.txt
```

چون `?` فقط یک کاراکتر را جایگزین می‌کند.

---

## 3. استفاده از `[]`

فایل‌ها:

```
file1.txt
file2.txt
file3.txt
file4.txt
```

دستور:

```
ls file[123].txt
```

نتیجه:

```
file1.txt
file2.txt
file3.txt
```

---

# تفاوت Pathname Expansion و Regular Expression

این دو را نباید اشتباه گرفت.

## Globbing:

```
ls *.txt
```

برای پیدا کردن فایل‌ها در Shell است.

---

## Regex:

```
.*\.txt
```

برای پردازش متن استفاده می‌شود.

مثلاً:

- `grep`
- `sed`
- `awk`

---

# مثال‌های کاربردی

## حذف تمام فایل‌های log

```
rm *.log
```

مثلاً حذف:

```
server.log
error.log
access.log
```

---

## انتقال همه فایل‌های یک نوع

```
mv *.jpg /backup/
```

تمام فایل‌های jpg منتقل می‌شوند.

---

## پیدا کردن فایل‌های خاص

```
ls backup_2026_*.tar.gz
```

مثلاً:

```
backup_2026_01.tar.gz
backup_2026_02.tar.gz
```

---

# جلوگیری از Pathname Expansion

اگر نمی‌خواهیم Bash الگو را گسترش دهد، از Quote استفاده می‌کنیم:

```
echo "*.txt"
```

خروجی:

```
*.txt
```

اما:

```
echo *.txt
```

ممکن است خروجی:

```
file1.txt file2.txt notes.txt
```

باشد.

---

# Wildcard در مسیرها

می‌توانیم داخل مسیر هم استفاده کنیم:

```
ls /var/log/*.log
```

مثلاً:

```
/var/log/auth.log
/var/log/syslog.log
```

---

# مثال پیشرفته: Bash Loop با Globbing

```
for file in *.txt
do
    echo "Processing $file"
done
```

اگر داشته باشیم:

```
a.txt
b.txt
c.txt
```

خروجی:

```
Processing a.txt
Processing b.txt
Processing c.txt
```

---

# نکته مهم

اگر هیچ فایلی مطابق الگو پیدا نشود:

```
ls *.xyz
```

ممکن است Bash همان متن را نگه دارد:

```
*.xyz
```

و `ls` خطا بدهد:

```
ls: cannot access '*.xyz'
```

برای تغییر این رفتار می‌توان از گزینه‌های Bash مثل `nullglob` استفاده کرد:

```
shopt -s nullglob
```

بعد:

```
files=(*.txt)
```

اگر فایلی نباشد، آرایه خالی می‌شود.

---

# خلاصه

|مفهوم|توضیح|
|---|---|
|Pathname Expansion|تبدیل Pattern به نام فایل‌ها|
|نام دیگر|Globbing|
|`*`|هر تعداد کاراکتر|
|`?`|یک کاراکتر|
|`[]`|انتخاب از مجموعه|
|کاربرد اصلی|مدیریت فایل‌ها در Shell|

**قاعده ساده:**

> Word Splitting کلمات را جدا می‌کند، ولی Pathname Expansion الگوها را به فایل واقعی تبدیل می‌کند.

این مفهوم در Bash برای کارهای روزمره مثل `cp`، `mv`، `rm`، `find` و نوشتن اسکریپت‌های مدیریتی خیلی مهم است.
