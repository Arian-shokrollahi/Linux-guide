# Expansions
---
## کلمه ی Expansion یعنی چی ؟
کلمه **Expansion** در Shell یعنی:

**گسترش دادن یا باز کردن یک چیز قبل از اجرای دستور.**

یعنی Shell وقتی دستوری می‌نویسی، قبل از اینکه آن را اجرا کند، بعضی قسمت‌های آن را پیدا می‌کند و تبدیل می‌کند به مقدار واقعی.

- من در این فصل به خوبی بهتون درمورد expansion ها و گسترش ها یاد میدم چون قدرتتون رو خیلی زیاد میکنه و در وقتتون صرفه جویی میکنه و میفهمید لینوکس و شل یعنی چی 

---

ترتیب کلی اجرای Expansion هم مهم است:

```
Brace Expansion
        ↓
Tilde Expansion
        ↓
Parameter / Variable Expansion
        ↓
Command Substitution
        ↓
Arithmetic Expansion
        ↓
Word Splitting
        ↓
Pathname Expansion
        ↓
Quote Removal
```
- یه خلاصه ای بهتون در این فایل میگم و در فایل هایه دیگه میریم به برسی دقیق گسترش هایه شل

---
## در **Shell (مثل Bash)** چند نوع **Expansion** داریم. مهم‌ترین‌ها این‌ها هستند:

1. **Brace Expansion (گسترش آکولادی)**

```
echo file{1,2,3}.txt
```

خروجی:

```
file1.txt file2.txt file3.txt
```
---
2. **Tilde Expansion (گسترش ~)**  
    برای مسیر Home کاربر:

```
cd ~
```

معادل:

```
cd /home/user
```
---
3. **Parameter Expansion (گسترش متغیرها)**  
    کار با متغیرها:

```
name="Ali"
echo $name
```

یا:

```
echo ${name}
```
---
4. **Command Substitution (جایگزینی دستور)**  
    خروجی یک دستور را جایگزین می‌کند:

```
echo "Today is $(date)"
```
---
5. **Arithmetic Expansion (گسترش محاسباتی)**  
    محاسبه داخل Shell:

```
echo $((5+3))
```

خروجی:

```
8
```
---
6. **Pathname Expansion / Globbing (گسترش مسیر یا Wildcard)**  
    برای پیدا کردن فایل‌ها:

```
ls *.txt
```
---
7. **Word Splitting (تقسیم کلمات)**  
    تقسیم خروجی متغیرها بر اساس IFS:

```
files="a b c"
for f in $files; do echo $f; done
```
---
8. **Quote Removal (حذف کوتیشن‌ها)**  
    بعد از Expansion، علامت‌های کوتیشن حذف می‌شوند:

```
echo "$name"
```

پس در Bash معمولاً **۸ مرحله/نوع Expansion** را مطرح می‌کنند.
