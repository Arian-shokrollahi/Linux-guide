# starship
---
## ا-starship چیست؟
ا-**Starship** یک ابزار برای **شخصی‌سازی Prompt ترمینال** است.

یعنی به‌جای اینکه خودت `PS1` را با کلی تنظیمات و کدهای مختلف بسازی، Starship این کار را برایت ساده‌تر می‌کند.

مثلاً Prompt معمولی:

```
user@ubuntu:~/project$
```

با Starship می‌تواند اطلاعات بیشتری نشان دهد:

```
~/project on main
❯
```

و حتی می‌تواند مواردی مثل این‌ها را نمایش دهد:

- 📁 مسیر فعلی
- ا-🌿 Git branch و وضعیت Git
- 🐍 نسخه Python
- 🦀 نسخه Rust
- ⬢ نسخه Node.js
- ⏱️ زمان اجرای دستور
- وضعیت موفق یا ناموفق بودن دستور قبلی
- ا-Username و Hostname
- زمان و اطلاعات مختلف دیگر

---
## اموزش ریختن starship:
#### نصب starship
- روش رسمی
```bash
curl -sS https://starship.rs/install.sh | sh
---
for check
--->
starship --version
```
#### فعال کردن برایه bash
- 1-گفتیم برایه تغییر دادن محیط اگر از bash استفاده میکنید bashrc رو باید تغییر دهید
- 2-برایه فعال سازی -->source ~/.bashrc رو بزنید
```bash
eval "$(starship init bash)"
---
source ~/.bashrc
```

---
### شخصی‌سازی Starship

فایل اصلی تنظیمات Starship این است:

```
~/.config/starship.toml
```

اگر وجود ندارد:

```
mkdir -p ~/.config
touch ~/.config/starship.toml
```

تمام شخصی‌سازی‌های اصلی را در همین فایل انجام می‌دهی.

مثلاً بعداً می‌توانی مشخص کنی:

```
چه چیزی نمایش داده شود
چه رنگی باشد
Git branch نمایش داده شود یا نه
Prompt چند خطی باشد یا نه
سمبل Prompt چه باشد
اطلاعات زبان برنامه‌نویسی نمایش داده شود یا نه
```
