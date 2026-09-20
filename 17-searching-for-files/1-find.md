# ا-`find`

## 1. توضیح و ساختار

ا-`find` یکی از مهم‌ترین commandهای Linux برای **پیدا کردن فایل‌ها و directoryها در filesystem** است. می‌توانیم جستجو را بر اساس نام، نوع، حجم، زمان تغییر، مالک، permission و معیارهای دیگر انجام دهیم.

### ساختار کلی

```
find [PATH] [CONDITION] [ACTION]
```

مثلاً:

```
find /var/log -type f -name "*.log"
```

> ا-Find regular log files

ساختار این command:

```
find
 │
 ├── /var/log
 │      └── PATH → از کجا جستجو کنیم؟
 │
 ├── -type f
 │      └── CONDITION → چه نوع چیزی می‌خواهیم؟
 │
 └── -name "*.log"
        └── CONDITION → چه اسمی داشته باشد؟
```

اگر بخواهیم روی نتیجه کاری انجام دهیم:

```
find /var/log -type f -name "*.log" -exec ls -lh {} \;
```

> ا-Find log files and show their details

در اینجا `-exec` نقش **ACTION** را دارد.

---

# 2. ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`-name`|جستجو بر اساس نام|
|`-iname`|جستجوی نام بدون حساسیت به حروف بزرگ/کوچک|
|`-type`|مشخص کردن نوع مورد جستجو|
|`-size`|جستجو بر اساس حجم|
|`-user`|جستجو بر اساس owner|
|`-group`|جستجو بر اساس group|
|`-perm`|جستجو بر اساس permission|
|`-mtime`|جستجو بر اساس زمان تغییر محتوا|
|`-mmin`|جستجو بر اساس دقیقه|
|`-atime`|جستجو بر اساس آخرین access|
|`-maxdepth`|محدود کردن عمق جستجو|
|`-mindepth`|تعیین حداقل عمق جستجو|
|`-empty`|پیدا کردن فایل‌ها و directoryهای خالی|
|`-links`|جستجو بر اساس تعداد hard link|
|`-exec`|اجرای یک command روی نتایج|
|`-delete`|حذف نتایج پیدا شده|
|`-print`|نمایش نتایج|

### ا-`-type`

یکی از مهم‌ترین گزینه‌ها:

```
find /home -type f
```

> ا-Find regular files

مقادیر مهم:

```
f → regular file
d → directory
l → symbolic link
```

---

# 3. مثال‌های کاربردی

### پیدا کردن فایل بر اساس نام

```
find /etc -name "nginx.conf"
```

>ا- Find `nginx.conf`

### جستجوی بدون حساسیت به حروف

```
find /home -iname "readme.md"
```

> ا-Find a file ignoring case

### پیدا کردن همه فایل‌های `.log`

```
find /var/log -type f -name "*.log"
```

> ا-Find log files

### پیدا کردن directory

```
find /home -type d -name "Downloads"
```

> ا-Find a directory

### پیدا کردن فایل‌های بزرگ‌تر از 100MB

```
find /var -type f -size +100M
```

> ا-Find files larger than 100 MB

### پیدا کردن فایل‌های تغییر داده‌شده در 7 روز گذشته

```
find /home -type f -mtime -7
```

> ا-Find files modified within 7 days

### محدود کردن عمق جستجو

```
find /home -maxdepth 2 -type f
```

> ا-Find files up to two levels deep

### پیدا کردن فایل‌های متعلق به یک user

```
find /home -type f -user arian
```

> ا-Find files owned by a user

### اجرای command روی نتایج

```
find /var/log -type f -name "*.log" -exec ls -lh {} \;
```

> ا-Run `ls -lh` on each result

اینجا:

```
{}   → نتیجه‌ای که find پیدا کرده
\;   → پایان command مربوط به -exec
```

---

# 4. ا-`find` کجا به دردمان می‌خورد؟

ا-`find` در کارهای **SysAdmin و DevOps** خیلی استفاده می‌شود، مخصوصاً برای:

- پیدا کردن فایل‌های configuration
- پیدا کردن logها
- پیدا کردن فایل‌های بزرگ و مصرف‌کننده‌ی فضای دیسک
- پیدا کردن فایل‌های قدیمی
- پیدا کردن فایل‌های متعلق به یک user
- بررسی permission فایل‌ها
- پیدا کردن فایل‌های خاص در یک directory
- انجام عملیات روی تعداد زیادی فایل با `-exec`
- ا-troubleshooting در Linux

مثلاً فرض کن دیسک سرور پر شده و می‌خواهی فایل‌های بزرگ را پیدا کنی:

```
find /var -type f -size +500M
```

یا می‌خواهی logهای قدیمی را بررسی کنی:

```
find /var/log -type f -name "*.log" -mtime +30
```

**چیزی که برای یادگیری `find` واقعاً مهم است:** اول `PATH`، بعد `-type` و `-name`، سپس `-size` و گزینه‌های زمانی مثل `-mtime`، و در مرحله بعد `-exec` را خوب یاد بگیر. این‌ها هسته‌ی اصلی استفاده‌ی روزمره از `find` هستند.
