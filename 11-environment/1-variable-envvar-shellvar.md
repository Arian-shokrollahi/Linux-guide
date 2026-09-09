# ا-Variable در Linux چیست؟

## 1- مقدمه: Variable چیست؟

در سیستم‌عامل Linux و محیط Shell، **Variable (متغیر)** محلی برای ذخیره کردن یک مقدار است که با یک نام مشخص می‌شود.

به زبان ساده، Variable یک **نام به همراه یک مقدار** است که Shell یا برنامه‌ها می‌توانند از آن استفاده کنند.

ساختار کلی Variable:

```
VARIABLE_NAME=value
```

مثال:

```
name="arian"
```

در این مثال:

- `name` → نام Variable
- `arian` → مقدار ذخیره شده

برای مشاهده مقدار Variable از علامت `$` استفاده می‌کنیم:

```
echo $name
```

خروجی:

```
arian
```

ا-Variable ها در Linux برای نگهداری اطلاعات مهمی مانند مسیر فایل‌ها، تنظیمات سیستم، اطلاعات کاربر و تنظیمات برنامه‌ها استفاده می‌شوند.

---

# 2- انواع Variable در Linux

در Linux و Shell به طور کلی دو نوع Variable داریم:

```
Variable
   |
   |---- Shell Variable
   |
   |---- Environment Variable
```

---

# 2-1) ا-Shell Variable چیست؟

ا-**Shell Variable متغیری است که فقط در همان Shell فعلی وجود دارد و فقط همان Shell می‌تواند از آن استفاده کند.**

این نوع Variable به صورت مستقیم توسط Shell ساخته می‌شود و به Process های دیگر منتقل نمی‌شود.

مثال:

```
username="ali"
```

مشاهده مقدار:

```
echo $username
```

خروجی:

```
ali
```

اما اگر یک Shell جدید باز کنیم:

```
bash
```

و دوباره اجرا کنیم:

```
echo $username
```

خروجی خالی خواهد بود.

دلیل:

چون Shell Variable به Shell جدید منتقل نشده است.

---

# 2-2) ا-Environment Variable چیست؟

ا-**Environment Variable متغیری است که در محیط سیستم قرار دارد و به Process های فرزند (Child Process) منتقل می‌شود.**

برای تبدیل یک Shell Variable به Environment Variable از دستور `export` استفاده می‌کنیم.

مثال:

```
export username="ali"
```

حالا اگر یک Shell جدید باز کنیم:

```
bash
```

و اجرا کنیم:

```
echo $username
```

خروجی:

```
ali
```

زیرا این Variable به Environment اضافه شده است.

ا-Environment Variable ها معمولاً برای تنظیم رفتار برنامه‌ها استفاده می‌شوند.

مثال‌های معروف:

```
PATH
HOME
USER
SHELL
LANG
```

---

# 3- جدول مقایسه Shell Variable و Environment Variable

|ویژگی|Shell Variable|Environment Variable|
|---|---|---|
|محل نگهداری|داخل Shell فعلی|داخل Environment سیستم|
|دسترسی|فقط همان Shell|Shell و Process های فرزند|
|انتقال به برنامه‌ها|❌ ندارد|✅ دارد|
|ایجاد با دستور|`VAR=value`|`export VAR=value`|
|مشاهده با `set`|✅|✅|
|مشاهده با `env`|❌|✅|
|کاربرد اصلی|تنظیمات داخلی Shell|تنظیمات برنامه‌ها و سیستم|

---

# 4- نکات پایانی همراه با مثال

## نکته 1: تبدیل Shell Variable به Environment Variable

ابتدا:

```
city="Baku"
```

این یک Shell Variable است.

با:

```
export city
```

تبدیل می‌شود به:

```
Environment Variable
```

---

## نکته 2: تفاوت در انتقال

ا-Shell Variable:

```
x=10
bash
echo $x
```

نتیجه:

```
خالی
```

---

ا-Environment Variable:

```
export x=10
bash
echo $x
```

نتیجه:

```
10
```

---

## نکته 3: دیدن Variable ها

دیدن همه Shell Variable ها:

```
set
```

دیدن Environment Variable ها:

```
env
```

یا:

```
printenv
```

---

## نکته 4: فایل‌های ذخیره‌سازی

ا-Environment Variable های دائمی معمولاً در فایل‌هایی مانند:

```
/etc/environment
```

یا:

```
~/.bashrc
```

ذخیره می‌شوند.

مثال:

```
export JAVA_HOME=/usr/lib/jvm/java-17
```

---

# 5- مدت اعتبار Variable ها (Lifetime)

مدت اعتبار Variable بستگی به نوع آن دارد.

## Shell Variable

عمر آن:

```
تا زمانی که همان Shell باز است
```

مثال:

```
name="ali"
```

با بستن Terminal:

```
exit
```

ا-Variable حذف می‌شود.

---

## Environment Variable موقت

اگر با `export` داخل Terminal ساخته شود:

```
export PATH=/new/path
```

عمر آن:

```
تا زمانی که همان Shell و Process های آن فعال هستند
```

با بستن Terminal حذف می‌شود.

---

## Environment Variable دائمی

اگر داخل فایل‌هایی مثل:

```
~/.bashrc
```

قرار گیرد:

مثلاً:

```
export JAVA_HOME=/usr/lib/jvm/java-17
```

بعد از باز کردن Terminal جدید دوباره ساخته می‌شود.

---

# خلاصه نهایی

```
Variable
   |
   |--- Shell Variable
   |       فقط داخل همان Shell
   |
   |--- Environment Variable
           قابل استفاده توسط Shell و برنامه‌های دیگر
```

تفاوت اصلی:

```
Shell Variable  ----export----> Environment Variable
```

و مهم‌ترین نکته:

ا-**Shell Variable عمر کوتاه دارد و فقط متعلق به یک Shell است، اما Environment Variable برای انتقال اطلاعات و تنظیمات به برنامه‌ها و Process های دیگر استفاده می‌شود.**
