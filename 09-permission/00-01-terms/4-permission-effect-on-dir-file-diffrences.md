# تاثیر و فرق  دسترسی ها رویه فولدر و فایل
---
## این بخش از **Linux Permissions** خیلی مهمه، چون Permission روی **File** و **Directory** یک معنی کاملاً یکسان نداره.
---
## 1. ا-Permission روی File

سه Permission اصلی داریم:

|Permission|نماد|روی File یعنی|
|---|---|---|
|Read|`r`|امکان خواندن محتویات فایل|
|Write|`w`|امکان تغییر محتویات فایل|
|Execute|`x`|امکان اجرا کردن فایل|

---
# 2. ا-Permission روی Directory

اینجا قضیه کمی متفاوت می‌شود.

|Permission|روی Directory یعنی|
|---|---|
|`r`|دیدن لیست نام فایل‌ها|
|`w`|ایجاد، حذف و تغییر نام Entryها|
|`x`|وارد شدن/دسترسی به داخل Directory|

---
## خلاصه‌ای 
### File

```
r → Read content
w → Modify content
x → Execute
```

### Directory

```
r → List contents
w → Create/Delete/Rename entries
x → Enter/Traverse/Access entries
```

و مهم‌ترین تفاوت:

> ا**`x` روی File = اجرا کردن فایل**  
> ا**`x` روی Directory = عبور کردن و دسترسی پیدا کردن به داخل Directory**


---

```
FILE
└── test.txt
    r → خواندن محتوا
    w → تغییر محتوا
    x → اجرای فایل


FOLDER
└── testdir
    r → دیدن فایل‌های داخل
    w → ساختن / حذف کردن فایل
    x → 
```
