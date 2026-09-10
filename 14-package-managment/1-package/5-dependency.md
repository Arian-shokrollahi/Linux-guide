# 5. ا-Dependency Information چیست؟

ا-**Dependency** یعنی یک نرم‌افزار یا Package برای اجرا یا عملکرد درست، به **Package یا Library دیگری نیاز داشته باشد**.

پس **Dependency Information** یعنی اطلاعاتی که مشخص می‌کند:

> «این Package برای کار کردن به چه چیزهای دیگری نیاز دارد؟»

### یک مثال ساده

فرض کن Package زیر را داریم:

```
myapp
```

و برای اجرا به این‌ها نیاز دارد:

```
myapp
 ├── libA
 ├── libB
 └── libC
```

اینجا:

```
libA
libB
libC
```

همگی **Dependency** های `myapp` هستند.

---

## چرا Dependency مهم است؟

چون ممکن است برنامه بدون Dependency خودش **کار نکند**.

مثلاً:

```
Install myapp
       ↓
myapp نیاز به libA دارد
       ↓
libA نصب نیست
       ↓
myapp ممکن است اجرا نشود
```

ا-Package Manager این مشکل را مدیریت می‌کند.

مثلاً وقتی می‌زنی:

```
sudo apt install myapp
```

ا-`apt` بررسی می‌کند که `myapp` به چه Package هایی نیاز دارد و در صورت نیاز آن‌ها را هم نصب می‌کند.

---

## ا-Dependency Information داخل Package

ا-Package معمولاً اطلاعاتی درباره Dependency های خودش دارد، مثلاً به شکل مفهومی:

```
Name: myapp
Version: 1.0
Depends:
    libA
    libB
    libC
```

این قسمت **Dependency Information** است.

---

## ا-Dependency فقط Package نیست

ا-Dependency می‌تواند شامل چیزهایی مثل:

```
Package
Library
Runtime
Other software
```

باشد.

مثلاً یک برنامه Python ممکن است به یک Library خاص نیاز داشته باشد.

---

## یک مثال واقعی‌تر

فرض کن:

```
nginx
 ↓
 نیاز به Library ها و Package های دیگر
 ↓
Package Manager آن‌ها را بررسی می‌کند
 ↓
در صورت نیاز نصب می‌کند
```

بنابراین لازم نیست Administrator تک‌تک Dependency ها را دستی پیدا و نصب کند.

---

# تفاوت Dependency و Dependency Information

این دو را جدا کن:

```
Dependency
→ چیزی که برنامه به آن نیاز دارد

Dependency Information
→ اطلاعاتی که می‌گوید برنامه به چه چیزهایی نیاز دارد
```
