# 4-command substitution
----
## Command Substitution در لینوکس


ا-**Command Substitution** یعنی خروجی یک دستور را بگیریم و به‌جای خود دستور در یک دستور دیگر استفاده کنیم.  
در Bash با دو روش انجام می‌شود: `$(command)` (روش جدید و پیشنهادی) و `` `command` `` (روش قدیمی).  
Shell اول دستور داخل پرانتز را اجرا می‌کند، خروجی آن را جایگزین می‌کند، سپس دستور اصلی را اجرا می‌کند.

---
## ساختار command substitution

روش پیشنهادی:

```
$(command)
```

مثال کلی:

```
echo "Today is $(date)"
```

Shell اول:

```
date
```

را اجرا می‌کند، خروجی را می‌گیرد و بعد تبدیل می‌کند به چیزی مثل:

```
echo "Today is Sat Sep 6 12:00:00"
```

---

روش قدیمی:

```
`command`
```

مثال:

```
echo "User: `whoami`"
```

ولی امروزه بهتر است همیشه از:

```
$(command)
```

استفاده کنیم چون خواناتر و قابل ترکیب‌تر است.

---

# مثال‌های ساده

### مثال 1: نمایش تاریخ

```
echo "Today is $(date)"
```

خروجی:

```
Today is Sat Sep 6 12:30:20 +0330 2026
```

---

### مثال 2: گرفتن نام کاربر

```
echo "My username is $(whoami)"
```

خروجی:

```
My username is arian
```

---

### مثال 3: ذخیره خروجی دستور داخل متغیر

```
current_dir=$(pwd)

echo $current_dir
```

خروجی:

```
/home/arian
```

---

# مثال‌های پیشرفته‌تر

## مثال 1: شمارش تعداد فایل‌ها

```
files=$(ls | wc -l)

echo "Number of files: $files"
```

اینجا:

1. `ls` لیست فایل‌ها را می‌دهد.
2. `wc -l` تعداد خطوط را می‌شمارد.
3. نتیجه داخل متغیر `files` ذخیره می‌شود.

---

## مثال 2: استفاده تو در تو (Nested Command Substitution)

می‌توانیم چند دستور را داخل هم استفاده کنیم:

```
echo "Kernel version: $(uname -r)"
```

یا:

```
echo "My shell is $(basename $(echo $SHELL))"
```

اجرا:

```
bash
```

اینجا:

اول:

```
echo $SHELL
```

مثلاً:

```
/bin/bash
```

بعد:

```
basename /bin/bash
```

نتیجه:

```
bash
```

---

## مثال 3: ساخت فایل با تاریخ داخل اسم آن

```
touch backup_$(date +%F).txt
```

مثلاً فایل ساخته می‌شود:

```
backup_2026-09-06.txt
```

خیلی در اسکریپت‌نویسی استفاده می‌شود.

---

## مثال 4: گرفتن IP سیستم

```
ip=$(hostname -I)

echo "My IP is $ip"
```

خروجی:

```
My IP is 192.168.1.20
```

---

## مثال 5: استفاده در شرط‌ها

مثلاً بررسی کنیم سرویس nginx فعال است یا نه:

```
status=$(systemctl is-active nginx)

if [ "$status" = "active" ]; then
    echo "Nginx is running"
else
    echo "Nginx is down"
fi
```

---

## نکته مهم برای حرفه‌ای‌ها

Command substitution **newlineهای آخر خروجی را حذف می‌کند**.

مثلاً:

```
result=$(ls)
```

خروجی `ls` داخل متغیر ذخیره می‌شود ولی newlineهای انتهایی حذف می‌شوند.

---

در کارهای DevOps و Linux Admin زیاد می‌بینی:

- ساخت backup با تاریخ
- گرفتن خروجی سرویس‌ها
- اسکریپت‌های Bash
- Automation
- گرفتن اطلاعات سیستم

مثلاً:

```
tar -czf backup_$(hostname)_$(date +%F).tar.gz /etc
```

این یک نمونه واقعی از استفاده Command Substitution در مدیریت سرور است.
