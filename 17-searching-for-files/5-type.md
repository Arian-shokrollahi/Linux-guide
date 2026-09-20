# ا-`type`

## 1. توضیح و ساختار

ا-`type` برای فهمیدن این است که **Shell یک command را چگونه تشخیص و اجرا می‌کند**. به ما می‌گوید command یک `alias`، `function`، `builtin` یا یک executable در `PATH` است.

### ساختار کلی

```
type [OPTIONS] COMMAND
```

مثلاً:

```
type cd
```

> ا-Check how `cd` is interpreted

خروجی:

```
cd is a shell builtin
```

یا:

```
type ls
```

ممکن است بگوید:

```
ls is aliased to `ls --color=auto'
```

ساختار:

```
type
 │
 ├── [OPTIONS]
 │      └── نحوه بررسی
 │
 └── COMMAND
        └── command موردنظر
```

### انواع مختلف Command در Shell

|Type|توضیح|مثال|
|---|---|---|
|`alias`|یک نام مستعار است که به یک command یا مجموعه‌ای از commandها اشاره می‌کند|`ls`|
|`builtin`|commandای است که مستقیماً داخل خود Shell وجود دارد و executable جداگانه ندارد|`cd`|
|`function`|مجموعه‌ای از commandها که به‌صورت یک function در Shell تعریف شده‌اند|`mybackup`|
|`file`|یک executable واقعی است که Shell آن را از مسیرهای `PATH` پیدا می‌کند|`python`|
|`keyword`|کلمه‌ی رزروشده‌ی خود Shell است که بخشی از syntax زبان Shell محسوب می‌شود|`if`, `for`, `while`|


---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-a`|تمام محل‌ها/تعریف‌های موجود برای command را نمایش می‌دهد|
|`-t`|فقط نوع command را نمایش می‌دهد|
|`-P`|command را به‌صورت executable در `PATH` جستجو می‌کند|
|`-p`|مسیر executable را نمایش می‌دهد، در صورت وجود|

### مهم‌ترین‌ها

```
type -t cd
```

> ا-Show the type of `cd`

خروجی:

```
builtin
```

و:

```
type -t ls
```

ممکن است:

```
alias
```

باشد.

---

# 3. مثال‌های کاربردی

### بررسی نوع یک command

```
type cd
```

> ا-Check the type of `cd`

```
type ls
```

> ا-Check how `ls` is resolved

```
type python
```

> ا-Check how `python` is resolved

---

### نمایش فقط نوع command

```
type -t cd
```

> ا-Show only the command type

انواع مهمی که ممکن است ببینی:

```
alias
function
builtin
file
```

---

### پیدا کردن تمام تعریف‌های command

```
type -a python
```

> ا-Show all definitions of `python`

این می‌تواند نشان دهد که command از alias، function یا executableهای مختلف resolve می‌شود.

---

### پیدا کردن executable در PATH

```
type -P python
```

> ا-Find the executable for `python`

---

# 4. ا-`type` کجا به دردمان می‌خورد؟

ا-`type` در **troubleshooting و فهم رفتار Shell** خیلی مهم است.

مثلاً فکر می‌کنی:

```
python
```

یک executable خاص را اجرا می‌کند، اما:

```
type python
```

به تو نشان می‌دهد Shell دقیقاً چگونه آن را resolve می‌کند.

یا ممکن است فکر کنی `ls` مستقیماً `/usr/bin/ls` را اجرا می‌کند، ولی:

```
type ls
```

نشان دهد که `ls` یک **alias** است.

### تفاوت مهم با `which`

```
which
 ↓
معمولاً دنبال executable در PATH می‌گردد


type
 ↓
اول به تو می‌گوید Shell command را چگونه resolve می‌کند
 ↓
alias / function / builtin / executable
```

برای همین در Bash، **`type` برای فهمیدن رفتار واقعی command از `which` اطلاعات بیشتری می‌دهد.**
