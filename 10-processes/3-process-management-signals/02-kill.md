# kill
---

## دستور kill چیست؟

دستور `kill` یکی از ابزارهای اصلی برای **مدیریت Processها در Linux** است. برخلاف اسمش، کار اصلی `kill` فقط کشتن Process نیست؛ بلکه برای **ارسال Signal به یک Process** استفاده می‌شود.

هر Process در Linux می‌تواند Signal دریافت کند و بر اساس آن واکنش نشان دهد؛ مثلاً:

- به‌صورت صحیح بسته شود
- متوقف شود
- ادامه پیدا کند
- مجبور به پایان شود

ا-Adminها معمولاً از `kill` زمانی استفاده می‌کنند که:

- یک Process هنگ کرده است
- یک سرویس درست Stop نمی‌شود
- یک Process منابع زیادی مصرف می‌کند
- نیاز است یک Process را Restart یا Terminate کنند
- می‌خواهند رفتار یک Process را کنترل کنند

فرمت کلی:

```
kill [signal] PID
```

مثلاً:

```
kill 1234
```

یعنی Signal پیش‌فرض (`SIGTERM`) را به Process با PID `1234` ارسال کن.

---

# Switchها و Optionهای مهم `kill`

|Command|کاربرد|
|---|---|
|`kill PID`|ارسال Signal پیش‌فرض به یک Process|
|`kill -SIGNAL PID`|ارسال یک Signal مشخص|
|`kill -15 PID`|ارسال `SIGTERM` برای پایان دادن معمولی Process|
|`kill -9 PID`|ارسال `SIGKILL` برای پایان اجباری Process|
|`kill -1 PID`|ارسال `SIGHUP` برای Reload یا Restart بعضی سرویس‌ها|
|`kill -STOP PID`|متوقف کردن موقت Process|
|`kill -CONT PID`|ادامه دادن Process متوقف‌شده|
|`kill -l`|نمایش لیست Signalهای موجود|
|`kill -s SIGNAL PID`|ارسال Signal با نام آن|

---

# Signalهای مهم که Admin باید بلد باشد

## 1. `SIGTERM` (Signal 15)

```
kill -15 PID
```

یا:

```
kill PID
```

این Signal پیش‌فرض است.

یعنی:

> «لطفاً خودت را به شکل درست ببند.»

Process فرصت دارد:

- فایل‌ها را ببندد
- اطلاعات را ذخیره کند
- Cleanup انجام دهد

مثلاً:

```
kill 5000
```

بهتر است همیشه اول از این استفاده شود.

---

## 2. `SIGKILL` (Signal 9)

```
kill -9 PID
```

یعنی:

> «فوراً متوقف شو.»

Process نمی‌تواند این Signal را Ignore کند.

زمان استفاده:

- Process هنگ کرده
- `SIGTERM` جواب نداده
- برنامه در وضعیت خراب مانده

مثلاً:

```
kill -9 5000
```

اما نباید همیشه اولین انتخاب باشد، چون Process فرصت Cleanup ندارد.

---

## 3. `SIGHUP` (Signal 1)

```
kill -1 PID
```

معمولاً برای:

- Reload کردن تنظیمات
- Restart نرم سرویس‌ها

استفاده می‌شود.

مثلاً بعضی سرویس‌ها:

```
kill -HUP nginx_PID
```

بدون اینکه کامل Stop شوند، Configuration جدید را Load می‌کنند.

---

## 4. `SIGSTOP`

```
kill -STOP PID
```

Process را متوقف می‌کند.

تفاوت با Kill:

Process حذف نمی‌شود، فقط Pause می‌شود.

---

## 5. `SIGCONT`

```
kill -CONT PID
```

Process متوقف‌شده را دوباره ادامه می‌دهد.

---

# نکات مهم برای Adminها

## 1. همیشه PID را قبل از Kill بررسی کن

اشتباه:

```
kill -9 1234
```

بدون اینکه بدانی چیست.

بهتر:

```
ps -fp 1234
```

یا:

```
htop
```

بعد Kill.

---

## 2. اول SIGTERM، بعد SIGKILL

روش استاندارد:

مرحله اول:

```
kill PID
```

چند ثانیه صبر کن.

اگر بسته نشد:

```
kill -9 PID
```

---

## 3. پیدا کردن PID قبل از Kill

روش‌های رایج:

با `ps`:

```
ps aux | grep nginx
```

با `pgrep`:

```
pgrep nginx
```

مثلاً:

```
kill $(pgrep nginx)
```

---

## 4. Kill کردن چند Process

چند PID:

```
kill 1000 2000 3000
```

---

## 5. Kill کردن بر اساس نام Process

برای این کار معمولاً از:

```
pkill
```

استفاده می‌شود.

مثلاً:

```
pkill nginx
```

یا:

```
pkill -9 python
```

---

## 6. کاربر باید Permission داشته باشد

اگر Process متعلق به User دیگری باشد:

```
kill PID
```

ممکن است خطا بدهد.

مثلاً:

```
Operation not permitted
```

در این حالت:

```
sudo kill PID
```

---

# Workflow واقعی یک Admin هنگام مشکل Process

فرض کن یک برنامه هنگ کرده:

### 1. پیدا کردن Process

```
ps aux | grep app
```

یا:

```
pgrep app
```

---

### 2. بررسی Process

```
ps -fp PID
```

---

### 3. تلاش برای Stop صحیح

```
kill PID
```

---

### 4. اگر جواب نداد

```
kill -9 PID
```

---

### 5. بررسی دوباره

```
ps aux | grep app
```
