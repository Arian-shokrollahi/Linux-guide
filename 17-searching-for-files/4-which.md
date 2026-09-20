# ا-`which`

## 1. توضیح و ساختار

ا-`which` برای پیدا کردن **مسیر executable یک command** استفاده می‌شود. این command در مسیرهای موجود در متغیر محیطی `PATH` جستجو می‌کند و مسیر برنامه‌ای را که برای اجرا پیدا می‌شود نمایش می‌دهد.

### ساختار کلی

```
which [OPTIONS] COMMAND
```

مثلاً:

```
which python
```

> ا-Find the path of `python`

ممکن است خروجی چیزی شبیه این باشد:

```
/usr/bin/python
```

ساختار:

```
which
 │
 ├── [OPTIONS]
 │      └── نحوه جستجو
 │
 └── COMMAND
        └── command موردنظر
```

---

# 2. ا-Switch / Optionهای مهم

ا-`which` نسبت به `find` و `grep` گزینه‌های زیادی ندارد و مهم‌ترین استفاده‌اش همان پیدا کردن executable است.

|Option|کاربرد|
|---|---|
|`-a`|نمایش تمام executableهایی که با این نام در `PATH` پیدا می‌شوند|
|`-s`|فقط وضعیت پیدا شدن command را بررسی می‌کند و خروجی عادی نمی‌دهد|

### مهم‌ترین option

```
which -a python
```

> ا-Show all `python` executables in `PATH`

مثلاً ممکن است ببینی:

```
/usr/bin/python
/usr/local/bin/python
```

---

# 3. مثال‌های کاربردی

### پیدا کردن مسیر یک command

```
which bash
```

> ا-Find the path of `bash`

```
which ssh
```

> ا-Find the path of `ssh`

```
which nginx
```

> ا-Find the path of `nginx`

---

### پیدا کردن چند command

```
which python git ssh
```

>ا- Find multiple executables

---

### پیدا کردن تمام نسخه‌های موجود در `PATH`

```
which -a python
```

> ا-Find all matching executables

این زمانی مفید است که چند نسخه از یک برنامه روی سیستم داشته باشی.

---

# 4. ا-`which` کجا به دردمان می‌خورد؟

ا-`which` بیشتر زمانی کاربرد دارد که بخواهی بفهمی **Shell برای اجرای یک command از کدام executable استفاده می‌کند**.

مثلاً اگر چند نسخه Python نصب کرده باشی:

```
which python
```

می‌تواند نشان دهد:

```
/usr/bin/python
```

و با:

```
which -a python
```

می‌توانی executableهای دیگری که در `PATH` هستند را هم ببینی.

### یک نکته مهم

ا-`which` را با `type` اشتباه نکن:

```
which
 ↓
مسیر executable را پیدا می‌کند


type
 ↓
می‌گوید command چیست و Shell چگونه آن را resolve می‌کند
(alias / builtin / function / executable)
```

مثلاً:

```
type cd
```

ممکن است بگوید:

```
cd is a shell builtin
```

ولی:

```
which cd
```

ممکن است هیچ خروجی‌ای ندهد، چون `cd` یک executable معمولی نیست؛ **Shell builtin** است.
