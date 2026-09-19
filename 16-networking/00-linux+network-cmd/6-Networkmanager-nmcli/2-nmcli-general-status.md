به‌صورت خیلی ساده:

```
nmcli general status
```

برای **بررسی وضعیت کلی شبکه و NetworkManager** استفاده می‌شود.

یعنی با این دستور یک نگاه سریع می‌کنی که:

- سیستم به شبکه وصل هست یا نه
- ا-connectivity چطور است
- ا-Wi-Fi فعال هست یا نه
- سخت‌افزار Wi-Fi در دسترس هست یا نه
- ا-WWAN فعال هست یا نه

مثلاً:


### نمونه خروجی

```
$ nmcli general status
STATE      CONNECTIVITY  WIFI-HW  WIFI     WWAN-HW  WWAN
connected  full          enabled  enabled  enabled  enabled
```

حالا ستون‌به‌ستون بررسی کنیم:

|ستون|معنی|
|---|---|
|`STATE`|وضعیت کلی اتصال شبکه|
|`CONNECTIVITY`|میزان دسترسی سیستم به شبکه/اینترنت|
|`WIFI-HW`|وضعیت سخت‌افزار Wi-Fi|
|`WIFI`|وضعیت فعال/غیرفعال بودن Wi-Fi در NetworkManager|
|`WWAN-HW`|وضعیت سخت‌افزار Mobile Broadband|
|`WWAN`|وضعیت فعال/غیرفعال بودن WWAN|

### 1. `STATE`

مثلاً:

```
connected
```

یعنی سیستم به یک شبکه متصل است.

مقادیر مهم:

```
connected
disconnected
connecting
```

مثلاً:

```
$ nmcli general status
STATE         CONNECTIVITY  WIFI-HW  WIFI     WWAN-HW  WWAN
disconnected  none          enabled  enabled  enabled  enabled
```

اینجا Wi-Fi خودش **فعال است** (`WIFI = enabled`) ولی سیستم به شبکه‌ای وصل نیست (`STATE = disconnected`).

---

### 2. `CONNECTIVITY`

این ستون وضعیت connectivity را نشان می‌دهد؛ یعنی NetworkManager از دید خودش چقدر به شبکه دسترسی دارد.

مثلاً:

```
full
```

یعنی اتصال کامل تشخیص داده شده است.

مقادیر مهم:

```
full
limited
none
unknown
```

مثلاً:

```
STATE      CONNECTIVITY
connected  full
```

یعنی سیستم به شبکه وصل است و دسترسی کامل تشخیص داده شده.

---

### 3. `WIFI-HW`

این ستون مربوط به **خود سخت‌افزار Wi-Fi** است.

```
enabled
```

یعنی Wi-Fi hardware در دسترس و فعال است.

مثلاً اگر:

```
WIFI-HW  disabled
```

باشد، مشکل می‌تواند در سطح سخت‌افزار/radio باشد، نه اینکه صرفاً یک Wi-Fi را خاموش کرده باشی.

---

### 4. `WIFI`

این یکی با `WIFI-HW` فرق دارد.

```
WIFI-HW  enabled
WIFI      enabled
```

یعنی:

> سخت‌افزار Wi-Fi فعال است و NetworkManager هم Wi-Fi را فعال کرده است.

اگر:

```
WIFI-HW  enabled
WIFI      disabled
```

باشد، سخت‌افزار موجود است ولی Wi-Fi توسط NetworkManager خاموش شده.

می‌توانی با این دستور وضعیت Wi-Fi را تغییر بدهی:

```
nmcli radio wifi on
nmcli radio wifi off
```

---

### 5. `WWAN-HW` و `WWAN`

`WWAN` مربوط به **Wireless Wide Area Network** است؛ مثلاً مودم‌های cellular/4G/5G.

```
WWAN-HW  enabled
WWAN      enabled
```

یعنی سخت‌افزار WWAN موجود/فعال است و WWAN نیز توسط NetworkManager فعال است.

روی بسیاری از لپ‌تاپ‌ها ممکن است اصلاً از WWAN استفاده نکنی.

---

## یک نکته خیلی مهم برای یادگیری `nmcli`

`nmcli general status` بیشتر برای یک **نگاه سریع به وضعیت کلی NetworkManager** است.

برای اینکه بفهمی **خود interfaceهای شبکه چه وضعیتی دارند**، دستور مهم‌تر این است:

```
nmcli device status
```

مثلاً:

```
DEVICE   TYPE      STATE      CONNECTION
wlp2s0   wifi      connected  Home-WiFi
lo       loopback  connected  lo
enp3s0   ethernet  disconnected  --
```

پس برای ذهنیت SysAdmin این دو را کنار هم نگه دار:

```
nmcli general status
        ↓
وضعیت کلی NetworkManager / connectivity

nmcli device status
        ↓
وضعیت تک‌تک network deviceها
```

و برای کنترل روشن/خاموش بودن radioها:

```
nmcli radio
```

این سه دستور واقعاً پایه‌ای و مهم‌اند و بعداً وقتی بروی سراغ `nmcli connection`، ارتباطشان خیلی واضح‌تر می‌شود.
