# 20-IFS
---
# ا-IFS در Bash چیست؟

ا-**IFS** مخفف:

```
Internal Field Separator
```

است.

ا-IFS یک **متغیر داخلی Bash** است که مشخص می‌کند Shell هنگام **Word Splitting** بر اساس چه کاراکترهایی متن را به چند قسمت تقسیم کند.

به زبان ساده:

> ا-IFS به Bash می‌گوید "کجاها باید یک مقدار را جدا کنم؟"

---

## مقدار پیش‌فرض IFS

در Bash به صورت پیش‌فرض:

```
Space
Tab
Newline
```

هستند.

یعنی Bash این موارد را جداکننده می‌داند.

مثال:

```
data="Linux Server Bash"

for word in $data
do
    echo "$word"
done
```

خروجی:

```
Linux
Server
Bash
```

چون فاصله‌ها طبق IFS باعث جدا شدن شدند.

---

# مشاهده مقدار IFS

```
echo "$IFS"
```

چون IFS شامل Tab و Newline است، خروجی واضح دیده نمی‌شود.

برای دیدن بهتر:

```
printf '%q\n' "$IFS"
```

خروجی:

```
$' \t\n'
```

یعنی:

- فاصله ( )
- ا-Tab (`\t`)
- ا-Newline (`\n`)
---
# رابطه IFS با Word Splitting

مثال:

```
text="one:two:three"

IFS=":"

echo $text
```

Bash می‌بیند:

```
one
two
three
```

چون `:` الان جداکننده شده است.

---

## خلاصه

|مورد|توضیح|
|---|---|
|نام کامل|Internal Field Separator|
|وظیفه|تعیین محل جدا شدن کلمات|
|استفاده اصلی|Word Splitting|
|مقدار پیش‌فرض|Space, Tab, Newline|
|تغییر مقدار|`IFS=":"`|
|کاربرد مهم|خواندن CSV و پردازش متن|

در Bash Script، **IFS یکی از مهم‌ترین مفاهیم برای کار با فایل‌ها و داده‌های متنی است**، مخصوصاً وقتی با `while read` و پردازش خروجی دستورها کار می‌کنیم.
