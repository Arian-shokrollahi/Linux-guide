# 6-word splitting
---
# ا-Word Splitting در Bash Linux

## ا-Word Splitting چیست؟

ا-**Word Splitting** مرحله‌ای در Bash است که بعد از **Parameter Expansion** و **Command Substitution** انجام می‌شود.  
در این مرحله، Bash مقدارهای بدون Quote را بر اساس مقدار `IFS` به چند بخش تقسیم می‌کند.  
این قابلیت در کار با متغیرها مهم است، چون ممکن است باعث خراب شدن مسیر فایل‌ها یا داده‌ها شود.

---

# ساختار کلی پردازش Bash

```
Command
   |
Expansion
   |
Word Splitting
   |
Execution
```

مثال:

```
name="Linux Server"

echo $name
```

Bash مقدار را تبدیل می‌کند:

```
Linux Server
```

به دو Word:

```
Linux
Server
```

چون بین آن‌ها فاصله وجود دارد.

---

# IFS چیست؟

`IFS` مخفف:

```
Internal Field Separator
```

است و مشخص می‌کند Bash بر اساس چه چیزی Word را جدا کند.

مقدار پیش‌فرض:

```
Space
Tab
Newline
```

---

# جلوگیری از Word Splitting

برای جلوگیری از تقسیم شدن متغیر باید از Double Quote استفاده کنیم.

اشتباه:

```
file=my document.txt

echo $file
```

Bash می‌بیند:

```
my
document.txt
```

درست:

```
echo "$file"
```

حالا کل مقدار یک Word است:

```
my document.txt
```

---

# مقایسه Quote ها
ا-<mark>نکته ی مهم</mark>

|حالت|Word Splitting|مثال|
|---|---|---|
|بدون Quote|انجام می‌شود|`$var`|
|Double Quote|جلوگیری می‌کند|`"$var"`|
|Single Quote|همه چیز را Literal می‌کند|`'$var'`|

---

# ا-Word Splitting در Loop ها

متغیر:

```
files="one two three"
```

بدون Quote:

```
for file in $files
do
    echo "$file"
done
```

نتیجه:

```
one
two
three
```

چون Bash بر اساس فاصله جدا کرد.

---

با Quote:

```
for file in "$files"
do
    echo "$file"
done
```

نتیجه:

```
one two three
```

---

# Word Splitting و فایل‌ها

مشکل رایج:

```
file="my backup.txt"

cat $file
```

Bash فکر می‌کند دو فایل داریم:

```
my
backup.txt
```

روش صحیح:

```
cat "$file"
```

حالا فایل کامل خوانده می‌شود:

```
my backup.txt
```

---

# تغییر IFS

مثلاً داده داریم:

```
data="linux,network,security"
```

می‌خواهیم با `,` جدا کنیم:

```
IFS=","

for item in $data
do
    echo "$item"
done
```

خروجی:

```
linux
network
security
```

---

# نکته مهم در Bash Script

تقریباً همیشه هنگام استفاده از متغیرها:

❌ اشتباه:

```
rm $filename
```

✅ درست:

```
rm "$filename"
```

چون اگر نام فایل فاصله داشته باشد، Word Splitting باعث خطا می‌شود.

---

# خلاصه

|مورد|توضیح|
|---|---|
|Word Splitting|تقسیم مقدارها به چند Word|
|انجام می‌شود روی|متغیرهای بدون Quote|
|کنترل توسط|IFS|
|جلوگیری|استفاده از `" "`|
|مشکل رایج|فایل‌ها و مسیرهای دارای فاصله|

**قاعده طلایی Bash:**

> اگر مطمئن نیستی، متغیرها را داخل Double Quote قرار بده.  
> ا-`"$variable"` امن‌تر از `$variable` است.
