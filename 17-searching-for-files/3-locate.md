# ا-`locate`

## 1. توضیح و ساختار

ا-`locate` برای **پیدا کردن سریع فایل‌ها و directoryها بر اساس نام** استفاده می‌شود. برخلاف `find`، معمولاً filesystem را مستقیماً جستجو نمی‌کند؛ بلکه از یک **database از مسیر فایل‌ها** استفاده می‌کند، بنابراین بسیار سریع است.

### ساختار کلی

```
locate [OPTIONS] PATTERN
```

مثلاً:

```
locate nginx.conf
```

> ا-Quickly find `nginx.conf`

ساختار:

```
locate
  │
  ├── [OPTIONS]
  │      └── نحوه جستجو
  │
  └── PATTERN
         └── چیزی که دنبالش هستیم
```

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-i`|نادیده گرفتن حروف بزرگ و کوچک|
|`-n`|محدود کردن تعداد نتایج|
|`-r`|استفاده از Regular Expression|
|`-b`|جستجو فقط در نام فایل، نه کل مسیر|
|`-c`|نمایش تعداد نتایج به‌جای خود نتایج|
|`-e`|فقط فایل‌هایی را نمایش می‌دهد که در حال حاضر وجود دارند|
|`-S`|نمایش اطلاعات database|

### مهم‌ترین‌ها

برای شروع این‌ها را خوب یاد بگیر:

```
-i
-n
-r
-b
-c
-e
```

---

# 3. مثال‌های کاربردی

### پیدا کردن یک فایل

```
locate nginx.conf
```

> ا-Find `nginx.conf`

---

### جستجو بدون حساسیت به حروف

```
locate -i "readme"
```

> ا-Find `README` ignoring case

---

### محدود کردن تعداد نتایج

```
locate -n 10 nginx
```

> ا-Show only 10 results

---

### جستجو فقط بر اساس نام فایل

```
locate -b '\nginx.conf'
```

> ا-Match only the filename

---

### شمردن نتایج

```
locate -c "*.conf"
```

> ا-Count matching files

---

### نمایش فقط فایل‌هایی که واقعاً وجود دارند

```
locate -e nginx.conf
```

> ا-Show only existing files

این گزینه مهم است چون database مربوط به `locate` ممکن است از filesystem عقب‌تر باشد.

---

# ا-Database مربوط به `locate`

نکته مهم `locate` این است که نتایجش از database می‌آیند. اگر database قدیمی باشد، ممکن است فایل جدیدی که همین الان ساخته‌ای در نتیجه نباشد.

برای به‌روزرسانی:

```
sudo updatedb
```

> ا-Update the locate database

بعد:

```
locate myfile.txt
```

> ا-Search the updated database

---

# 4. ا-`locate` کجا به دردمان می‌خورد؟

ا-`locate` زمانی خیلی مفید است که **فقط اسم فایل را می‌دانی و می‌خواهی خیلی سریع پیدایش کنی**.

مثلاً:

```
locate ssh_config
```

یا:

```
locate nginx.conf
```

### تفاوت مهم با `find`

```
find
 ↓
Filesystem را مستقیماً search می‌کند
 ↓
قابل‌کنترل‌تر و دقیق‌تر
 ↓
می‌تواند بر اساس size/time/permission/... جستجو کند


locate
 ↓
Database را search می‌کند
 ↓
خیلی سریع
 ↓
عمدتاً برای پیدا کردن بر اساس نام
```

**پس در ذهنت:**

> ا=`find` = جستجوی واقعی و قدرتمند در filesystem  
> ا-`locate` = جستجوی خیلی سریع در database مسیرها
