# ا-Basic Regular Expressions (BRE)

## ا-Introduction

ا-**BRE (Basic Regular Expressions)** یکی از syntaxهای قدیمی و پایه‌ای برای نوشتن Regular Expression در سیستم‌های Unix/Linux است.

در بسیاری از ابزارهای سنتی لینوکس، Regex به‌صورت پیش‌فرض با **BRE** تفسیر می‌شود. برای مثال، `grep` در حالت عادی از BRE استفاده می‌کند.

نکته‌ی مهم این است که **مفهوم Regex در BRE با ERE فرق اساسی ندارد**؛ تفاوت اصلی در syntax بعضی از metacharacterهاست.

برای مثال، مفهوم:

> یک یا چند بار تکرار شدن

در BRE و ERE یکسان است، اما syntax آن متفاوت است:

* BRE → `\+`
* ERE → `+`

همین موضوع برای Group، Alternation و بعضی Quantifierها نیز وجود دارد.

---

## BRE و ERE

| مفهوم                | BRE       | ERE     |   |
| -------------------- | --------- | ------- | - |
| Zero or more         | `*`       | `*`     |   |
| One or more          | `\+`      | `+`     |   |
| Zero or one          | `\?`      | `?`     |   |
| Exactly `n`          | `\{n\}`   | `{n}`   |   |
| Between `n` and `m`  | `\{n,m\}` | `{n,m}` |   |
| Group                | `\(...\)` | `(...)` |   |
| Alternation          | `\|`      | `       | ` |
| Character Class      | `[...]`   | `[...]` |   |
| Start of line        | `^`       | `^`     |   |
| End of line          | `$`       | `$`     |   |
| Any single character | `.`       | `.`     |   |

---

## BRE در grep

وقتی از `grep` بدون option مربوط به Regex استفاده می‌کنیم، به‌صورت پیش‌فرض از BRE استفاده می‌شود.

برای مثال، اگر بخواهیم تمام خط‌هایی را پیدا کنیم که شامل یک یا چند رقم هستند:

```bash
grep '[0-9]\+' file.txt
```

در اینجا:

```text
[0-9] → یک رقم
\+    → یک یا چند بار
```

بنابراین Regex به‌صورت مفهومی یعنی:

```text
یک یا چند رقم پشت سر هم
```

---

## Quantifierها در BRE

در BRE، بعضی Quantifierها برای داشتن معنی ویژه باید با `\` نوشته شوند.

برای مثال، اگر بخواهیم دقیقاً سه رقم پشت سر هم داشته باشیم:

```bash
grep '[0-9]\{3\}' file.txt
```

در اینجا:

```text
[0-9]     → یک رقم
\{3\}     → دقیقاً 3 بار
```

در نتیجه مواردی مانند:

```text
123
456
987
```

می‌توانند match شوند.

---

## Group در BRE

برای ساختن Group در BRE از `\(` و `\)` استفاده می‌کنیم.

برای مثال:

```bash
grep '\(cat\|dog\)' file.txt
```

ساختار Regex:

```text
\(       → شروع Group
cat      → گزینه اول
\|       → OR
dog      → گزینه دوم
\)       → پایان Group
```

بنابراین Regex به دنبال `cat` یا `dog` می‌گردد.

---

## Alternation در BRE

علامت `|` در BRE برای Alternation باید escape شود:

```bash
grep 'cat\|dog' file.txt
```

یعنی:

```text
cat OR dog
```

در واقع `\|` به Regex می‌گوید:

> یا عبارت سمت چپ را match کن، یا عبارت سمت راست را.

---

## ا-BRE در مقابل grep -E

اگر بخواهیم به‌جای BRE از **ERE (Extended Regular Expressions)** استفاده کنیم، در `grep` از option `-E` استفاده می‌کنیم.

مثلاً این دو دستور از نظر مفهوم مشابه هستند:

```bash
grep '[0-9]\+' file.txt
```

و:

```bash
grep -E '[0-9]+' file.txt
```

هر دو به دنبال یک یا چند رقم هستند.

همین تفاوت را برای Group و Alternation هم داریم:

```bash
grep '\(cat\|dog\)' file.txt
```

در ERE می‌شود:

```bash
grep -E '(cat|dog)' file.txt
```

---

## نکته مهم

لازم نیست BRE را به‌عنوان یک Regex کاملاً متفاوت از ERE تصور کنی.

بهتر است این‌طور به آن نگاه کنی:

```text
Regular Expression
        │
        ├── BRE
        │    └── syntax قدیمی‌تر و پایه‌ای‌تر
        │
        └── ERE
             └── syntax گسترده‌تر و راحت‌تر
```

مفهوم‌هایی مثل:

```text
Character Class
Quantifier
Group
Alternation
Anchor
```

در هر دو وجود دارند؛ چیزی که بیشتر تغییر می‌کند **نحوه نوشتن syntax** آن‌هاست.

---

## نکته برای کار با Linux

برای یادگیری و کار روزمره با Regex در Linux، بهتر است تفاوت این دو دستور را همیشه در ذهن داشته باشی:

```bash
grep 'REGEX' file.txt
```

یعنی:

```text
BRE
```

و:

```bash
grep -E 'REGEX' file.txt
```

یعنی:

```text
ERE
```

به همین دلیل اگر در یک مثال لینوکسی دیدی:

```bash
grep '[0-9]\+' file.txt
```

بدان که `\+` به خاطر **BRE** نوشته شده است.

ولی اگر دیدی:

```bash
grep -E '[0-9]+' file.txt
```

همان مفهوم با **ERE** نوشته شده است.

### خلاصه

ا-**BRE = Basic Regular Expressions**

و مهم‌ترین چیزی که باید از آن به خاطر داشته باشی این است:

> ا-BRE یک flavor از Regular Expression است که در ابزارهای سنتی Unix/Linux استفاده می‌شود و در آن بعضی از metacharacterهای Regex برای داشتن معنای ویژه به `\` نیاز دارند.

برای همین:

```text
BRE:
\+
\?
\{3\}
\(...\)
\|

ERE:
+
?
{3}
(...)
|
```

در حالی که مفاهیمی مثل `*`، `[]`، `^`، `$` و `.` در هر دو syntax معمولاً به شکل یکسان نوشته می‌شوند.
