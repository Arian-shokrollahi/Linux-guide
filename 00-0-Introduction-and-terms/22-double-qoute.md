# 22 double qoute
---

## اDouble Quote چیست؟

ا-**Double Quote** یا `" "` در Bash برای نگه داشتن چند کلامه به عنوان یک واحد استفاده می‌شود و از **Word Splitting** و **Pathname Expansion** جلوگیری می‌کند.

برخلاف Single Quote، داخل Double Quote بعضی از Expansion ها همچنان اجرا می‌شوند:

- ا-✅ Variable Expansion
- ا-✅ Command Substitution
- ا-✅ Arithmetic Expansion

اما:

- ا-❌ Word Splitting
- ا-❌ Pathname Expansion

انجام نمی‌شوند.

---

# Syntax

ساختار:

```
"text"
```

مثال:

```
echo "Hello Linux"
```

خروجی:

```
Hello Linux
```

---

# Variable Expansion داخل Double Quote

مثال:

```
name="Arian"

echo "Hello $name"
```

Bash مقدار متغیر را جایگزین می‌کند:

```
Hello Arian
```

در واقع:

قبل از Expansion:

```
"Hello $name"
```

بعد از Expansion:

```
"Hello Arian"
```

بعد Quote Removal:

```
Hello Arian
```

---

# جلوگیری از Word Splitting

یکی از مهم‌ترین کاربردهای Double Quote همین است.

متغیر:

```
file="my backup.txt"
```

بدون Quote:

```
echo $file
```

Bash آن را دو بخش می‌بیند:

```
my
backup.txt
```

اما:

```
echo "$file"
```

Bash آن را یک مقدار نگه می‌دارد:

```
my backup.txt
```

---

# جلوگیری از Pathname Expansion

فرض کنیم فایل‌ها:

```
file1.txt
file2.txt
```

داریم.

بدون Quote:

```
echo *.txt
```

Bash تبدیل می‌کند:

```
file1.txt file2.txt
```

اما:

```
echo "*.txt"
```

خروجی:

```
*.txt
```

چون Double Quote اجازه Globbing نمی‌دهد.

---

# ا-Command Substitution داخل Double Quote

ا-Command Substitution اجرا می‌شود:

```
echo "Today is $(date)"
```

مثلاً خروجی:

```
Today is Sat Sep 6 13:00:00
```

اما:

```
echo 'Today is $(date)'
```

خروجی:

```
Today is $(date)
```

---

# Arithmetic Expansion داخل Double Quote

اجرا می‌شود:

```
echo "Result is $((5+5))"
```

خروجی:

```
Result is 10
```

---

# تفاوت Double Quote و Single Quote

|ویژگی|`" "` Double Quote|`' '` Single Quote|
|---|---|---|
|Variable Expansion|✅ دارد|❌ ندارد|
|Command Substitution|✅ دارد|❌ ندارد|
|Arithmetic Expansion|✅ دارد|❌ ندارد|
|Word Splitting|❌ ندارد|❌ ندارد|
|Pathname Expansion|❌ ندارد|❌ ندارد|

---

# استفاده با Array

ا-Double Quote در Array خیلی مهم است.

مثال:

```
files=("my file.txt" "test.txt")

for file in "${files[@]}"
do
    echo "$file"
done
```

خروجی:

```
my file.txt
test.txt
```

بدون Quote:

```
for file in ${files[@]}
```

ممکن است:

```
my
file.txt
test.txt
```

شود.

---

# کاربرد در دستورات لینوکس

## اشتباه:

```
rm $file
```

اگر:

```
file="old backup.txt"
```

باشد، Bash می‌فرستد:

```
old
backup.txt
```

---

## درست:

```
rm "$file"
```

یک فایل کامل:

```
old backup.txt
```

ارسال می‌شود.

---

# Escape کردن داخل Double Quote

داخل Double Quote بعضی کاراکترها هنوز معنی خاص دارند:

```
\ 
$
`
"
```

مثال:

```
echo "The price is \$100"
```

خروجی:

```
The price is $100
```

---

# مثال واقعی در Bash Script

```
#!/bin/bash

username=$(whoami)

echo "Current user is $username"
```

اینجا:

- `$(whoami)` اجرا می‌شود.
- `$username` جایگزین می‌شود.
- کل جمله به دلیل Double Quote یک مقدار باقی می‌ماند.

---

# نکته مهم در Bash

در Bash معمولاً برای متغیرها این قانون را رعایت می‌کنیم:

❌ ناامن:

```
echo $variable
```

✅ امن:

```
echo "$variable"
```

چون ممکن است مقدار متغیر:

```
Linux Server Backup
```

باشد و بدون Quote به چند Word تقسیم شود.

---

# خلاصه

|مورد|Double Quote|
|---|---|
|علامت|`" "`|
|هدف اصلی|حفظ مقدار به عنوان یک Word|
|Variable Expansion|فعال|
|Command Substitution|فعال|
|جلوگیری از Word Splitting|فعال|
|جلوگیری از Globbing|فعال|
|کاربرد اصلی|Bash Script امن|

**قاعده ساده:**

> ا-Single Quote یعنی "هیچ تغییری نده".  
> ا-Double Quote یعنی "Expansion انجام بده، ولی مقدار را دست‌نخورده نگه دار".
