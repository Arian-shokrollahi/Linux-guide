# `pgrep` چیست؟

ا-`pgrep` مخفف:

```
process grep
```

است و برای **پیدا کردن Processها بر اساس اسم یا ویژگی‌هایشان** استفاده می‌شود.

به زبان ساده:

> به جای اینکه با `ps` همه processها را ببینی و با چشم دنبال یک برنامه بگردی، با `pgrep` مستقیم PID آن process را پیدا می‌کنی.

---

## شکل کلی دستور:

```
pgrep [options] pattern
```

مثلاً:

```
pgrep nginx
```

خروجی:

```
1234
1235
1236
```

یعنی processهایی با نام nginx پیدا شده‌اند و PID آن‌ها این‌هاست.

---

# کاربرد واقعی برای Linux Admin

ادمین‌ها معمولاً از `pgrep` برای این کارها استفاده می‌کنند:

### 1) پیدا کردن PID یک سرویس

مثلاً:

```
pgrep sshd
```

خروجی:

```
800
```

بعد می‌توانی:
این مهمه
```
kill 800
```

یا:

```
ps -fp 800
```

بزنی و اطلاعات کاملش را ببینی.

---

### 2) چک کردن اینکه یک سرویس اجرا است یا نه

مثلاً در script:

```
pgrep nginx > /dev/null
```

اگر خروجی داشته باشد یعنی nginx در حال اجراست.

---

### 3) پیدا کردن processهای یک User خاص

---

# ا-Switchهای مهم `pgrep`

## `-a`

نمایش PID + command کامل

مثال:

```
pgrep -a python
```

خروجی:

```
2500 python app.py --port 8080
```

بدون `-a` فقط PID می‌بینی:

```
2500
```

---

## `-u`

پیدا کردن processهای یک user مشخص

مثال:

```
pgrep -u root sshd
```

یعنی:

> ا-processهای sshd که توسط root اجرا شده‌اند.

---

## `-f`

جستجو در کل command line

مثال:

```
pgrep -f "python app.py"
```

فرق:

بدون `-f`:

```
pgrep python
```

فقط اسم process را نگاه می‌کند.

با `-f`:

```
python app.py --port 8080
```

کل command را بررسی می‌کند.

---

## `-l`

نمایش PID و اسم process

مثال:

```
pgrep -l nginx
```

خروجی:

```
1234 nginx
```

---

## `-x`

جستجوی دقیق اسم

مثال:

```
pgrep -x sshd
```

فقط processهایی که دقیقاً اسمشان `sshd` است.

---

## `-P`

پیدا کردن child processهای یک Parent

مثال:

```
pgrep -P 1000
```

یعنی:

> ا-processهایی که parent آن‌ها PID 1000 است.

---

## `-c`

فقط تعداد processها را نشان می‌دهد.

مثال:

```
pgrep -c nginx
```

خروجی:

```
5
```

یعنی 5 تا nginx process داریم.

---

# دستورهای خیلی کاربردی برای Admin

### پیدا کردن PID یک سرویس:

```
pgrep nginx
```

---

### دیدن کامل process:

```
pgrep -a nginx
```

---

### پیدا کردن processهای یک کاربر:

```
pgrep -u mysql
```

---

### پیدا کردن برنامه‌ای که با argument خاص اجرا شده:

```
pgrep -f "java -jar app.jar"
```

---

### شمارش تعداد workerها:

```
pgrep -c nginx
```

---

# تفاوت `pgrep` و `ps`

|دستور|کاربرد|
|---|---|
|`ps`|نمایش لیست processها|
|`pgrep`|پیدا کردن سریع process خاص|
|`pstree`|دیدن رابطه parent/child|

در کار روزمره ادمین:

مثلاً می‌خواهی nginx را پیدا کنی:

با `ps`:

```
ps aux | grep nginx
```

با `pgrep`:

```
pgrep nginx
```

ا-`pgrep` سریع‌تر و تمیزتر است.
