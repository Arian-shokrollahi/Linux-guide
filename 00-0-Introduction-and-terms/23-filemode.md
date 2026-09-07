# 23 filemode 
---
## فایل مود (file mode)چیست؟
**File Mode** در لینوکس همان رشته‌ای است که با `ls -l` در ابتدای اطلاعات فایل یا دایرکتوری می‌بینی.

مثلاً:

```
-rwxr-xr--
```

ساختار کلی آن:

```
[نوع فایل][Owner][Group][Other]
    1       3       3       3
```

### ساختار کامل File Mode

|بخش|تعداد کاراکتر|مثال|مفهوم|
|---|---|---|---|
|Character اول|1|`-`|نوع فایل|
|Owner|3|`rwx`|دسترسی صاحب فایل|
|Group|3|`r-x`|دسترسی گروه فایل|
|Other|3|`r--`|دسترسی سایر کاربران|
|**مجموع**|**10**|`-rwxr-xr--`|File Mode|

### Character اول چه چیزهایی می‌تواند باشد؟

|Character اول|نوع فایل|توضیح|
|---|---|---|
|`-`|Regular File|فایل معمولی مثل `.txt`، `.sh` و...|
|`d`|Directory|دایرکتوری / فولدر|
|`l`|Symbolic Link|لینک نمادین (Symlink)|
|`c`|Character Device|دستگاه Character مثل بعضی Deviceها|
|`b`|Block Device|دستگاه Block مثل دیسک|
|`p`|Named Pipe / FIFO|Pipe نام‌گذاری‌شده|
|`s`|Socket|Unix Socket|

پس مثلاً:

```
-rw-r--r--
```

یعنی:

```
-    rw-    r--    r--
│     │      │      │
│     │      │      └── Other
│     │      └───────── Group
│     └──────────────── Owner
└────────────────────── Regular File
```

و:

```
drwxr-xr-x
```

یعنی اولین کاراکتر `d` است، پس این مورد **Directory** است.

### سه بخش Permission

|بخش|`r`|`w`|`x`|
|---|---|---|---|
|**Owner**|خواندن|نوشتن|اجرا|
|**Group**|خواندن|نوشتن|اجرا|
|**Other**|خواندن|نوشتن|اجرا|

بنابراین در:

```
-rwxr-xr--
```

داریم:

|قسمت|مقدار|معنی|
|---|---|---|
|Type|`-`|فایل معمولی|
|Owner|`rwx`|Read + Write + Execute|
|Group|`r-x`|Read + Execute|
|Other|`r--`|فقط Read|

**نکته مهم:** Character اول خودش Permission نیست؛ **نوع فایل را مشخص می‌کند**. ۹ کاراکتر بعدی مربوط به Permissionهای `Owner / Group / Other` هستند.
