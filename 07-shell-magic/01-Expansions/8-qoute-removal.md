# 8-qoute removal
---

## ا-Quote Removal چیست؟

ا-**Quote Removal** یکی از آخرین مراحلی است که Bash هنگام اجرای یک دستور انجام می‌دهد.  
در این مرحله، Bash علامت‌های Quote مثل:

- ا-`' '` (Single Quote)
- ا-`" "` (Double Quote)
- ا-`\` (Backslash)

را حذف می‌کند، اما تاثیری که این Quote ها روی رفتار متن گذاشته‌اند را حفظ می‌کند.

به زبان ساده:

> ا-Bash برای کنترل رفتار متن از Quote استفاده می‌کند، سپس قبل از اجرای دستور خود Quote ها را حذف می‌کند.

---

# جایگاه Quote Removal در مراحل Bash

مراحل کلی پردازش Bash:

```
Command
   |
Brace Expansion
   |
Parameter Expansion
   |
Command Substitution
   |
Arithmetic Expansion
   |
Word Splitting
   |
Pathname Expansion
   |
Quote Removal
   |
Execution
```

ا-Quote Removal تقریباً آخرین مرحله قبل از اجرای دستور است.

---

# مثال ساده

```
echo "Hello World"
```

ا-Bash ابتدا Quote را برای محافظت از فاصله‌ها استفاده می‌کند:

```
"Hello World"
```

بعد در مرحله Quote Removal تبدیل می‌شود به:

```
Hello World
```

و `echo` آن را دریافت می‌کند.

---

# ا-Single Quote (`' '`)

ا-Single Quote باعث می‌شود Bash هیچ Expansion انجام ندهد.

مثال:

```
echo '$HOME'
```

خروجی:

```
$HOME
```

ا-Bash مقدار متغیر را تغییر نمی‌دهد.

در مرحله Quote Removal:

```
'$HOME'
```

تبدیل می‌شود به:

```
$HOME
```

اما مقدار آن دیگر Expansion نمی‌شود.

---

# ا-Double Quote (`" "`)

ا-Double Quote اجازه بعضی Expansion ها را می‌دهد ولی Word Splitting و Pathname Expansion را غیرفعال می‌کند.

مثال:

```
name="Arian"

echo "$name"
```

مراحل:

قبل از Quote Removal:

```
"$name"
```

Parameter Expansion:

```
"Arian"
```

Quote Removal:

```
Arian
```

خروجی:

```
Arian
```

---

# ا-Backslash (`\`)

ا-Backslash باعث می‌شود کاراکتر بعدی معنی خاص خود را از دست بدهد.

مثال:

```
echo \$HOME
```

خروجی:

```
$HOME
```

بدون Backslash:

```
echo $HOME
```

مثلاً:

```
/home/arian
```

---

# تفاوت قبل و بعد از Quote Removal

|قبل از Quote Removal|بعد از Quote Removal|نتیجه|
|---|---|---|
|`"Linux"`|`Linux`|Quote حذف می‌شود|
|`'$HOME'`|`$HOME`|Expansion انجام نشده|
|`"$USER"`|`arian`|مقدار متغیر جایگزین شده|
|`\*`|`*`|Wildcard غیرفعال می‌شود|

---

# مثال مهم با Pathname Expansion

فرض کنیم فایل‌ها:

```
file1.txt
file2.txt
```

بدون Quote:

```
echo *.txt
```

Bash:

```
*.txt
```

را تبدیل می‌کند به:

```
file1.txt file2.txt
```

---

با Quote:

```
echo "*.txt"
```

ا-Bash اجازه Pathname Expansion نمی‌دهد.

بعد از Quote Removal:

```
*.txt
```

خروجی:

```
*.txt
```

---

# مثال مهم با Word Splitting

متغیر:

```
file="my document.txt"
```

بدون Quote:

```
echo $file
```

ا-Word Splitting:

```
my
document.txt
```

---

با Quote:

```
echo "$file"
```

ا-Bash آن را یک واحد نگه می‌دارد:

```
my document.txt
```

بعد Quote Removal انجام می‌شود.

---

# چرا Quote Removal مهم است؟

چون توضیح می‌دهد چرا Bash می‌تواند:

- فاصله‌ها را حفظ کند
- متغیرها را کنترل کند
- ا-Wildcard ها را غیرفعال کند
- کاراکترهای خاص را Escape کند

مثال واقعی:

❌ خطرناک:

```
rm $filename
```

اگر:

```
filename="old backup.txt"
```

باشد، Bash می‌بیند:

```
old
backup.txt
```

---

✅ درست:

```
rm "$filename"
```

مراحل:

```
"$filename"
      |
      v
"old backup.txt"
      |
      v
old backup.txt
```

فایل درست حذف می‌شود.

---

# خلاصه

|مفهوم|توضیح|
|---|---|
|Quote Removal|حذف علامت‌های Quote قبل از اجرای دستور|
|Quote ها|`' " \`|
|هدف Quote|کنترل رفتار Bash|
|آخرین مرحله|قبل از Execution|
|کاربرد اصلی|جلوگیری از Word Splitting و Expansion ناخواسته|

**قاعده مهم Bash:**

> ا-Quote ها برای Bash هستند، نه برای برنامه‌ای که اجرا می‌شود. Bash آن‌ها را استفاده می‌کند و قبل از اجرای دستور حذفشان می‌کند.
