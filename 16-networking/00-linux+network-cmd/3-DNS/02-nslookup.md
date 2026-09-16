حتماً. `nslookup` هم مثل `dig` برای **بررسی و Query گرفتن از DNS** استفاده می‌شود، ولی ساختار آن ساده‌تر و برای تست‌های سریع خیلی راحت است.

# ا-`nslookup` چیست؟

ا-`nslookup` مخفف **Name Server Lookup** است و برای پرسیدن اطلاعات DNS استفاده می‌شود.

مهم‌ترین کاربردش:

```
Domain → IP
IP → Domain
```

مثلاً:

```
nslookup google.com
```

می‌تواند IP مربوط به `google.com` را به تو نشان دهد.

---

# ساختار کلی

```
nslookup [OPTION] DOMAIN [DNS-SERVER]
```

مثلاً:

```
nslookup google.com
```

یا اگر بخواهی از DNS خاصی سؤال کنی:

```
nslookup google.com 8.8.8.8
```

یعنی:

> از DNS Server `8.8.8.8` درباره `google.com` سؤال کن.

---

# کاربردهای اصلی `nslookup`

### 1. پیدا کردن IP یک Domain

```
nslookup google.com
```

مثلاً در خروجی ممکن است ببینی:

```
Name:    google.com
Address: 142.250.x.x
```

یعنی DNS توانسته Domain را به IP تبدیل کند.

---

### 2. استفاده از DNS Server مشخص

```
nslookup google.com 8.8.8.8
```

یا:

```
nslookup google.com 1.1.1.1
```

این کار زمانی مفید است که بخواهی بفهمی **DNS فعلی سیستم مشکل دارد یا نه**.

مثلاً:

```
nslookup google.com
```

جواب نمی‌دهد، ولی:

```
nslookup google.com 8.8.8.8
```

جواب می‌دهد.

در این حالت احتمالاً باید DNS configuration سیستم را بررسی کنی.

---

# 3. گرفتن رکورد خاص DNS

می‌توانی نوع رکورد را مشخص کنی:

```
nslookup -type=A example.com
```

برای IPv6:

```
nslookup -type=AAAA example.com
```

برای Mail Server:

```
nslookup -type=MX example.com
```

برای Name Server:

```
nslookup -type=NS example.com
```

برای TXT:

```
nslookup -type=TXT example.com
```

ساختار کلی:

```
nslookup -type=RECORD DOMAIN
```

---

# 4. ا-Reverse DNS

اگر IP داشته باشی و بخواهی ببینی hostname آن چیست:

```
nslookup 8.8.8.8
```

این همان **Reverse DNS Lookup** است.

یعنی:

```
Forward DNS:

google.com
    ↓
   IP


Reverse DNS:

IP
    ↓
hostname
```

---

# 5. حالت Interactive

یکی از ویژگی‌های جالب `nslookup` این است که می‌توانی وارد حالت interactive شوی:

```
nslookup
```

بعد مثلاً:

```
> google.com
```

یا:

```
> server 8.8.8.8
```

و بعد:

```
> google.com
```

برای خروج:

```
> exit
```

---

# ا-Switchهای مهم

|گزینه|کاربرد|
|---|---|
|`-type=A`|IPv4|
|`-type=AAAA`|IPv6|
|`-type=MX`|Mail Server|
|`-type=NS`|Name Server|
|`-type=TXT`|TXT Record|
|`-type=SOA`|اطلاعات Zone|
|`-type=CNAME`|CNAME Record|

مثلاً:

```
nslookup -type=MX google.com
```

---

# ۴ کاربرد عملی روزمره

|کار|دستور|
|---|---|
|پیدا کردن IP سایت|`nslookup google.com`|
|تست DNS خاص|`nslookup google.com 8.8.8.8`|
|بررسی Mail Server|`nslookup -type=MX example.com`|
|Reverse DNS|`nslookup 8.8.8.8`|

---

# ا-`nslookup` در مقابل `dig`

چون قبلش `dig` را یاد گرفتی، این تفاوت را خوب در ذهن داشته باش:

|`nslookup`|`dig`|
|---|---|
|ساده‌تر|حرفه‌ای‌تر|
|خروجی خواناتر برای شروع|اطلاعات جزئی‌تر|
|مناسب تست سریع|مناسب Troubleshooting عمیق DNS|
|Interactive دارد|امکانات Query بیشتری دارد|

### خلاصه

```
nslookup = DNS را سریع و ساده بررسی کن
dig      = DNS را دقیق‌تر و حرفه‌ای‌تر بررسی کن
```

برای مسیر یادگیری Network، بعد از `nslookup` بهتر است **`host`** را هم یاد بگیری؛ چون `nslookup` و `host` و `dig` سه ابزار مهم برای DNS troubleshooting در لینوکس هستند.
