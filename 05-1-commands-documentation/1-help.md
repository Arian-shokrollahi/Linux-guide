# help command
---
## دستور help چیست؟
دستور **`help`** در لینوکس (محیط Bash) یک دستور داخلی (**Shell Built-in**) است که به صورت سریع و فشرده راهنمای کار با سایر دستورات داخلی خودِ شل را نمایش می‌دهد.


---
## سوییچ ها و روش های اجرایه دستور help

| دستور / سوییچ | کاربرد | مثال |
|---|---|---|
| help | نمایش لیست تمام دستورات داخلی Bash | help |
| help <command> | نمایش راهنمای کامل یک دستور داخلی | help cd |
| help -d <command> | نمایش فقط یک خط توضیح خلاصه (Short description) | help -d export |
| help -s <command> | نمایش فقط ساختار نحوی و الگو (Syntax summary) | help -s alias |
| help -m <command> | نمایش راهنما در فرمت شبیه به صفحات man | help -m read |
- اگر یک خطی خواستید --->help -d
- اگر ساختارش رو خواستید--->help -s

---
### مثال‌های عملی

**۱. بررسی نوع دستور قبل از استفاده از help:**

با دستور `type` می‌توانی بررسی کنی که آیا یک دستور Built-in است یا خیر:
```bash
type cd      # خروجی: cd is a shell builtin -> باید از help استفاده کنی
type grep    # خروجی: grep is /usr/bin/grep -> باید از man یا --help استفاده کنی
```
**۲. دیدن سینتکس فشرده برای دستور `cd`:**
```bash
help -s cd
# خروجی: cd: cd [-L|[-P [-e]] [-@]] [dir]
```
۳. توضیح تک‌خطی برای دستور `export`:
```bash
help -d export
# خروجی: export - Set export attribute for shell variables.
```
