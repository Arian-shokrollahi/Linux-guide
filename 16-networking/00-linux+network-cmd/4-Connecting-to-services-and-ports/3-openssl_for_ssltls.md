# ا-`openssl s_client`

## مقدمه

ا-`openssl s_client` یک ابزار خط فرمان برای **برقراری و بررسی ارتباط‌های TLS/SSL** است.

مهم‌ترین کاربردهای آن در Network:

- بررسی TLS Handshake
- بررسی Certificate
- مشاهده TLS Version و Cipher
- تست SNI
- عیب‌یابی HTTPS

به زبان ساده:

```
nc
 ↓
TCP Connection
 ↓
openssl s_client
 ↓
TLS Handshake
 ↓
Certificate + Encryption
```

---

# ساختار کلی

```
openssl s_client [OPTIONS]
```

مهم‌ترین ساختار:

```
openssl s_client -connect HOST:PORT
```

مثلاً:

```
openssl s_client -connect example.com:443
```

یعنی:

> به `example.com` روی Port `443` وصل شو و TLS Connection را بررسی کن.

---

# Switchهای مهم

|Switch|کاربرد|
|---|---|
|`-connect`|مشخص کردن Host و Port مقصد|
|`-servername`|مشخص کردن SNI / نام Domain|
|`-tls1_2`|استفاده از TLS 1.2|
|`-tls1_3`|استفاده از TLS 1.3|
|`-showcerts`|نمایش Certificateهای Chain|
|`-verify_return_error`|نمایش خطای Verification|
|`-brief`|نمایش خلاصه‌تر اطلاعات، در نسخه‌های پشتیبانی‌شده|

---

## 1. `-connect`

مهم‌ترین Switch:

```
openssl s_client -connect example.com:443
```

ساختار:

```
openssl s_client -connect HOST:PORT
```

مثلاً:

```
openssl s_client -connect google.com:443
```

→ برقراری TLS روی Port `443`.

---

## 2. `-servername`

برای مشخص کردن **SNI** استفاده می‌شود:

```
openssl s_client \
  -connect example.com:443 \
  -servername example.com
```

SNI به Server می‌گوید:

> من برای کدام Domain درخواست TLS داده‌ام.

این مخصوصاً وقتی چند Domain روی یک IP قرار دارند مهم است.

---

## 3. `-tls1_2`

برای تست TLS 1.2:

```
openssl s_client \
  -connect example.com:443 \
  -tls1_2
```

یعنی:

> فقط با TLS 1.2 تلاش کن.

برای TLS 1.3:

```
openssl s_client \
  -connect example.com:443 \
  -tls1_3
```

---

## 4. `-showcerts`

برای نمایش Certificateهای ارائه‌شده توسط Server:

```
openssl s_client \
  -connect example.com:443 \
  -servername example.com \
  -showcerts
```

این گزینه برای بررسی **Certificate Chain** مفید است.

---

# بررسی Certificate با `openssl x509`

یک ترکیب خیلی کاربردی:

```
openssl s_client \
  -connect example.com:443 \
  -servername example.com \
  </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates
```

خروجی اطلاعاتی مثل:

```
subject=...
issuer=...
notBefore=...
notAfter=...
```

می‌دهد.

یعنی می‌توانی ببینی:

```
Subject → Certificate برای چه کسی است؟
Issuer  → چه CAای آن را صادر کرده؟
Dates   → از چه زمانی تا چه زمانی معتبر است؟
```

---

# اگر وقتت کم است ⭐

برای Network همین ۴ مورد را یاد بگیر:

### ⭐⭐⭐⭐⭐ بررسی TLS

```
openssl s_client -connect example.com:443
```

### ⭐⭐⭐⭐⭐ بررسی TLS + SNI

```
openssl s_client \
  -connect example.com:443 \
  -servername example.com
```

### ⭐⭐⭐⭐ بررسی Certificate

```
openssl s_client \
  -connect example.com:443 \
  -servername example.com \
  </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates
```

### ⭐⭐⭐⭐ تست TLS 1.2

```
openssl s_client \
  -connect example.com:443 \
  -tls1_2
```

---

# جمع‌بندی `nc` → `curl` → `openssl`

این سه command را کنار هم این‌طور به خاطر بسپار:

```
nc
 │
 └── آیا TCP Port قابل دسترسی است؟
             ↓
curl
 │
 └── آیا HTTP/HTTPS درست کار می‌کند؟
             ↓
openssl s_client
 │
 └── آیا TLS / Certificate / Handshake درست است؟
```

مثلاً برای Troubleshooting یک HTTPS Server:

```
# 1. TCP
nc -zv example.com 443

# 2. TLS
openssl s_client -connect example.com:443 -servername example.com

# 3. HTTP/HTTPS
curl -v https://example.com
```

این ترتیب یک مدل ذهنی خیلی خوب برای **Network Troubleshooting** است:

```
Port
 ↓
TCP
 ↓
TLS
 ↓
HTTP
```

یعنی هر ابزار یک لایه متفاوت از ارتباط را برایت بررسی می‌کند.
