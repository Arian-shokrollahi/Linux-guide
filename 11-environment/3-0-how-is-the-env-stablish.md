# ا-How Is the Environment Established?

## محیط Linux چگونه ساخته می‌شود؟

وقتی وارد Linux می‌شویم (Login می‌کنیم)، برنامه‌ی **bash** اجرا می‌شود.

ا-Bash برای ساختن محیط کاری ما چند فایل تنظیمات (**Startup Files**) را می‌خواند.

این فایل‌ها شامل چیزهایی مثل:

- ساختن Environment Variable ها
- تنظیم کردن `PATH`
- تعیین Prompt
- ا-Alias ها
- تنظیمات شخصی کاربر

هستند.

مثلاً داخل یک فایل می‌تواند باشد:

```
export PATH=$PATH:/usr/local/bin
```

یا:

```
alias ll="ls -la"
```
