# 21-single qoute
---

## ا-Single Quote چیست؟

ا-**Single Quote** یا علامت `' '` در Bash برای این استفاده می‌شود که به Shell بگوییم:

> تمام چیزی که داخل Single Quote است را دقیقاً همان‌طور که نوشته شده استفاده کن و هیچ تغییری روی آن انجام نده.

یعنی داخل Single Quote:

- ا-❌ متغیرها Expand نمی‌شوند
- ا-❌ Command Substitution اجرا نمی‌شود
- ا-❌ Arithmetic Expansion انجام نمی‌شود
- ا-❌ Pathname Expansion انجام نمی‌شود
- ا-❌ کاراکترهای خاص معنی خودشان را از دست می‌دهند

---

# Syntax

ساختار:

```
'text'
```

مثال:

```
echo 'Hello Linux'
```

خروجی:

```
Hello Linux
```

---

# جلوگیری از Variable Expansion

بدون Single Quote:

```
name="Arian"

echo $name
```

خروجی:

```
Arian
```

چون Bash مقدار متغیر را جایگزین می‌کند.

---

با Single Quote:

```
echo '$name'
```

خروجی:

```
$name
```

Bash دیگر متغیر را نمی‌شناسد و فقط متن را چاپ می‌کند.

---

# مقایسه Single Quote و Double Quote

|ویژگی|Single Quote `' '`|Double Quote `" "`|
|---|---|---|
|Variable Expansion|❌ ندارد|✅ دارد|
|Command Substitution|❌ ندارد|✅ دارد|
|Arithmetic Expansion|❌ ندارد|✅ دارد|
|Word Splitting|❌ ندارد|❌ ندارد|
|Pathname Expansion|❌ ندارد|❌ ندارد|

---

# ا-Command Substitution داخل Single Quote

مثال:

```
echo 'Today is $(date)'
```

خروجی:

```
Today is $(date)
```

دستور `date` اجرا نمی‌شود.

اما:

```
echo "Today is $(date)"
```

خروجی:

```
Today is Sat Sep 6
```

---

# ا-Arithmetic Expansion داخل Single Quote

مثال:

```
echo '$((5+5))'
```

خروجی:

```
$((5+5))
```

اما:

```
echo $((5+5))
```

خروجی:

```
10
```

---

# جلوگیری از Pathname Expansion

فرض کنیم فایل‌ها:

```
file1.txt
file2.txt
```

بدون Quote:

```
echo *.txt
```

Bash تبدیل می‌کند:

```
file1.txt file2.txt
```

---

با Single Quote:

```
echo '*.txt'
```

خروجی:

```
*.txt
```

چون Bash اجازه Globbing نمی‌دهد.

---

# کاربرد مهم در Shell Script

## نگه داشتن متن خام

مثلاً:

```
message='Hello $USER'
```

اگر چاپ کنیم:

```
echo "$message"
```

خروجی:

```
Hello $USER
```

نه:

```
Hello arian
```

چون هنگام ساخت متغیر، Single Quote جلوی Expansion را گرفته است.

---

# مشکل Single Quote

داخل Single Quote نمی‌توانیم دوباره Single Quote استفاده کنیم.

این اشتباه است:

```
echo 'I'm Linux user'
```

Bash فکر می‌کند:

```
'I'
m Linux user'
```

---

راه حل:

استفاده از Double Quote:

```
echo "I'm Linux user"
```

یا Escape کردن:

```
echo 'I'\''m Linux user'
```

خروجی:

```
I'm Linux user
```

---

# مثال واقعی در Bash

فرض کنیم می‌خواهیم یک متن با `$PATH` ذخیره کنیم:

```
text='$PATH contains system paths'

echo "$text"
```

خروجی:

```
$PATH contains system paths
```

اگر بخواهیم مقدار واقعی PATH ذخیره شود:

```
text="$PATH contains system paths"
```

---

# خلاصه

|مورد|Single Quote|
|---|---|
|علامت|`' '`|
|هدف|نگه داشتن متن به صورت Literal|
|Variable Expansion|خاموش|
|Command Substitution|خاموش|
|Wildcard|خاموش|
|بهترین کاربرد|متن‌های ثابت و جلوگیری از تغییر ناخواسته|

**قاعده ساده:**

> اگر می‌خواهی Bash هیچ کاری با متن انجام ندهد، از Single Quote استفاده کن.

مثال:

```
echo '$HOME'
```

یعنی:

"همین `$HOME` را چاپ کن، مقدارش را نخواه."
