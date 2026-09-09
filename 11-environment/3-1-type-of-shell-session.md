# دو نوع Session در Bash داریم

ا-Bash دو نوع اجرا دارد:

```
              Bash Session
                   |
        ----------------------
        |                    |
   Login Shell        Non-Login Shell
```

---

# 1) Login Shell Session چیست؟

## تعریف:

ا-Login Shell یعنی Shell ای که با **نام کاربری و رمز عبور** وارد آن می‌شویم.

مثال‌ها:

### Virtual Console:

با:

```
Ctrl + Alt + F2
```

وارد می‌شوی:

```
login:
password:
```

این یک Login Shell است.

یا:

SSH:

```
ssh user@server
```

هم Login Shell محسوب می‌شود.

---

## فایل‌هایی که Login Shell می‌خواند:

ترتیب کلی:

```
/etc/profile
        |
        |
~/.bash_profile
        |
        |
~/.bash_login
        |
        |
~/.profile
```

---

## 1) `/etc/profile`

مسیر:

```
/etc/profile
```

این فایل **Global** است.

یعنی برای همه کاربران سیستم استفاده می‌شود.

مثلاً:

```
PATH=/usr/local/bin:/usr/bin
export PATH
```

همه کاربران این تنظیم را دریافت می‌کنند.

---

## 2) فایل‌های داخل Home کاربر

مثل:

```
~/.bash_profile
```

این فایل مخصوص همان کاربر است.

مثلاً:

کاربر:

```
/home/arian/.bash_profile
```

می‌تواند تنظیم شخصی خودش را داشته باشد:

```
export EDITOR=vim
```

---

اگر:

```
~/.bash_profile
```

وجود نداشته باشد، Bash دنبال:

```
~/.bash_login
```

می‌گردد.

اگر آن هم نبود:

```
~/.profile
```

را می‌خواند.

---

# ترتیب جستجو:

Bash می‌گوید:

اول:

```
~/.bash_profile
```

اگر نبود:

```
~/.bash_login
```

اگر نبود:

```
~/.profile
```

---

در Ubuntu معمولاً:

```
~/.profile
```

استفاده می‌شود.

---

# 2) Non-Login Shell Session چیست؟

این زمانی است که یک Terminal داخل محیط گرافیکی باز می‌کنیم.

مثلاً:

Ubuntu Desktop:

```
Applications
     |
 Terminal
     |
 bash
```

اینجا دیگر username/password نمی‌پرسد.

پس:

```
Non-login shell
```

است.

---

## فایل‌هایی که Non-login Shell می‌خواند:

```
/etc/bash.bashrc
        |
        |
~/.bashrc
```

---

# 1) `/etc/bash.bashrc`

مسیر:

```
/etc/bash.bashrc
```

یک تنظیم عمومی برای همه کاربران Bash است.

مثلاً:

```
alias ls="ls --color"
```

---

# 2) `~/.bashrc`

مهم‌ترین فایل برای کاربران عادی است.

مسیر:

```
/home/user/.bashrc
```

مثلاً:

```
alias ll="ls -la"

export PATH=$PATH:$HOME/bin
```

---

# چرا `.bashrc` مهم‌ترین فایل است؟

چون تقریباً همیشه اجرا می‌شود.

چرا؟

چون:

- ا-Non-login shell آن را مستقیم می‌خواند.
- ا-Login shell ها معمولاً داخل `.bash_profile` خودشان این خط را دارند:

```
source ~/.bashrc
```

یعنی:

ا-".bashrc را هم بخوان"

---

# تفاوت Login و Non-login به صورت جدول

|ویژگی|Login Shell|Non-login Shell|
|---|---|---|
|نیاز به username/password|دارد|ندارد|
|مثال|SSH، Virtual Console|Terminal داخل GUI|
|فایل عمومی|`/etc/profile`|`/etc/bash.bashrc`|
|فایل شخصی|`~/.bash_profile`|`~/.bashrc`|
|معمولاً `.bashrc` را می‌خواند|بله (معمولاً)|بله|

---

# مثال واقعی

فرض کن:

فایل:

```
~/.bashrc
```

داری:

```
export MYNAME="arian"
```

وقتی Terminal باز می‌کنی:

```
Terminal
   |
   |
bash
   |
   |
.bashrc خوانده می‌شود
   |
   |
MYNAME ساخته می‌شود
```

حالا:

```
echo $MYNAME
```

خروجی:

```
arian
```

---

# نکات مهم این بخش

### 1) Environment یک‌دفعه ساخته نمی‌شود

بلکه مرحله‌ای ساخته می‌شود:

```
System files
      |
      |
User files
      |
      |
Final Environment
```

---

### 2) فایل‌های `/etc`

تنظیمات عمومی هستند:

```
/etc/profile
/etc/bash.bashrc
```

برای همه کاربران.

---

### 3) فایل‌های `~/`

تنظیمات شخصی هستند:

```
~/.bashrc
~/.profile
~/.bash_profile
```

فقط برای همان User.

---

### 4) `.bashrc` مهم‌ترین فایل کاربر است

چون بیشتر مواقع خوانده می‌شود و برای:

- Alias
- PATH
- Environment Variable
- Prompt

استفاده می‌شود.

---

خلاصه‌ی کل مطلب:

```
Login Shell:
 /etc/profile
        ↓
 ~/.bash_profile
        ↓
 ~/.bash_login
        ↓
 ~/.profile


Non-login Shell:
 /etc/bash.bashrc
        ↓
 ~/.bashrc
```

یعنی Bash با خواندن این فایل‌ها **Environment نهایی کاربر را می‌سازد.**
