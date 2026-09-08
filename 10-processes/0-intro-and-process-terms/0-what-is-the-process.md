### ا-Process چیست؟

در Linux، **Process یعنی یک برنامه‌ای که در حال اجراست.**

مثلاً وقتی اجرا می‌کنی:

```
firefox
```

فایل برنامه روی Disk است، اما وقتی اجرا می‌شود، سیستم‌عامل برای آن یک **Process** ایجاد می‌کند.

هر Process معمولاً دارد:

- **PID** → شناسه Process
- **Memory** → حافظه‌ای که استفاده می‌کند
- **CPU time** → زمانی که از CPU استفاده کرده
- **State** → وضعیت مثل Running یا Sleeping
- **User** → کاربری که Process را اجرا کرده
- **Parent Process** → Processای که آن را ایجاد کرده

مثلاً:

```
bash (PID 1000)
   └── python (PID 1200)
```

اینجا `python` یک Process است و `bash`، **Parent Process** آن است.

**خلاصه:**  
ا-`Program` = فایل/کد برنامه  
ا-`Process` = همان برنامه وقتی در حال اجراست.
