## 1. `ps` چیست؟

`ps` مخفف **Process Status** است و برای دیدن اطلاعات Processهای در حال اجرا استفاده می‌شود.

مثلاً:

```
ps aux
```

بهت اطلاعاتی مثل **PID، User، CPU، Memory، وضعیت Process و Command** را می‌دهد.

---

## 2. ساختار `ps`

ساختار کلی:

```
ps [options]
```

مثلاً:

```
ps aux
ps -ef
ps -p 1234
```

`options` مشخص می‌کنند **چه Processهایی و با چه اطلاعاتی** نمایش داده شوند.

---

## 3. Switchهای مهم `ps`

|Switch|کاربرد|مثال|
|---|---|---|
|`a`|Processهای کاربران دیگر که به Terminal متصل هستند|`ps a`|
|`x`|Processهایی که Terminal ندارند هم نمایش بده|`ps x`|
|`u`|نمایش اطلاعات User-oriented مثل CPU و MEM|`ps u`|
|`-e`|نمایش تمام Processها|`ps -e`|
|`-f`|نمایش اطلاعات کامل‌تر|`ps -f`|
|`-p`|نمایش Process با PID مشخص|`ps -p 1234`|
|`-u`|Processهای یک User مشخص|`ps -u arian`|
|`-o`|انتخاب ستون‌های دلخواه|`ps -o pid,ppid,cmd`|
|`--forest`|نمایش Parent/Child به شکل درختی|`ps -ef --forest`|
|`-L`|نمایش Threadهای Process|`ps -L -p 1234`|

### سه ترکیب خیلی مهم:

```
ps aux
```

→ تقریباً تمام Processها با اطلاعات مصرف منابع.

```
ps -ef
```

→ تمام Processها + اطلاعاتی مثل `PID` و `PPID`.

```
ps -ef --forest
```

→ تمام Processها به شکل **Parent/Child tree**.

**برای Linux Admin همین سه مورد را باید خیلی روان بلد باشی.**
