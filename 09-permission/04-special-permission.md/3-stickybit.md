### ا-Sticky Bit چیست؟

ا-**Sticky Bit** یک Special Permission است که بیشتر روی **دایرکتوری‌ها** استفاده می‌شود.

کار اصلی‌اش این است که در یک دایرکتوری مشترک، **هر کاربر فقط بتواند فایل خودش را حذف یا rename کند**؛ حتی اگر دایرکتوری برای همه قابل نوشتن باشد.

---

### مثال مهم ⭐

دایرکتوری معروف:

```
/tmp
```

معمولاً همه کاربران می‌توانند داخلش فایل بسازند.

اما نمی‌خواهیم `ali` بتواند فایل `reza` را حذف کند.

Sticky Bit اینجا کمک می‌کند:

```
/tmp
 ├── ali.txt    ← ali
 └── reza.txt   ← reza
```

با Sticky Bit:

```
ali → می‌تواند ali.txt را حذف کند
ali → نمی‌تواند reza.txt را حذف کند
```

---

### شکل Sticky Bit

Permission معمولی:

```
rwxrwxrwx
```

با Sticky Bit:

```
rwxrwxrwt
```

دقت کن `t` در قسمت **Others** قرار می‌گیرد:

```
rwx rwx rwt
        ↑
    Sticky Bit
```

---

### فعال کردن Sticky Bit

با روش عددی:

```
chmod 1777 directory
```

عدد **1** در ابتدای `1777` یعنی Sticky Bit.

یا Symbolic:

```
chmod +t directory
```

---

### مشاهده Sticky Bit

مثلاً:

```
ls -ld /tmp
```

ممکن است ببینی:

```
drwxrwxrwt
```

اون `t` آخر یعنی Sticky Bit فعال است.

---

### نکته خیلی مهم ⚠️

Sticky Bit نمی‌گوید:

> «فقط Owner فایل می‌تواند فایل را تغییر دهد.»

بلکه مشخصاً در دایرکتوری مشترک، محدودیت **حذف و rename** ایجاد می‌کند.

پس برای امتحان این جمله را حفظ کن:

> ا-**Sticky Bit روی دایرکتوری باعث می‌شود کاربران نتوانند فایل‌های متعلق به کاربران دیگر را حذف یا rename کنند.**

و سه Special Permission اصلی:

```
SUID       = 4
SGID       = 2
Sticky Bit = 1
```

پس مثلاً:

```
chmod 1755 folder
```

یعنی **Sticky Bit + 755**.
