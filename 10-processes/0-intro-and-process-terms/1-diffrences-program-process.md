## تفاوته پردازه(process)و برنامه(program) چیست؟

### ا-Program

یک **فایل/کد قابل اجرا** روی Disk است.

مثلاً:

```
/usr/bin/firefox
```

این خودش هنوز در حال اجرا نیست.

---

### ا-Process

وقتی یک Program را اجرا می‌کنی، سیستم‌عامل برای آن یک **Process** ایجاد می‌کند.

مثلاً:

```
firefox
```

حالا:

```
Program → روی Disk
Process → در حال اجرا در سیستم
```

هر Process معمولاً یک **PID** دارد:

```
firefox Program
      ↓ اجرا
Process
PID = 1234
```

پس جمله‌ای که باید حفظ کنی:

>ا- **Program یک فایل/کد است؛ Process نمونه‌ای از آن Program است که در حال اجراست.**
