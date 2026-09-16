# ا-`dig` چیست؟

ا-`dig` مخفف **Domain Information Groper** است و برای پرس‌وجو از **DNS Server** استفاده می‌شود.

یعنی با `dig` می‌توانیم بفهمیم یک Domain چه رکوردهای DNSای دارد و DNS چه پاسخی برای آن برمی‌گرداند.

مثلاً:

```
dig google.com
```

یا:

```
dig google.com A
```

---

# ساختار کلی `dig`

```
dig [@DNS-SERVER] DOMAIN [RECORD-TYPE] [OPTIONS]
```

مثلاً:

```
dig @8.8.8.8 google.com A
```

یعنی:

> از DNS Server `8.8.8.8` درباره رکورد `A` دامنه `google.com` سؤال کن.

---

# رکوردهای مهم DNS

|Record|کاربرد|
|---|---|
|`A`|تبدیل Domain → IPv4|
|`AAAA`|تبدیل Domain → IPv6|
|`MX`|Mail Server دامنه|
|`NS`|Name Serverهای دامنه|
|`CNAME`|نام مستعار برای یک Domain|
|`TXT`|متن‌های DNS، مثل SPF و Verification|
|`SOA`|اطلاعات اصلی Zone|
|`PTR`|تبدیل IP → Domain|
|`ANY`|درخواست اطلاعات عمومی؛ معمولاً محدود/غیردقیق|

مثال:

```
dig google.com A
```

```
dig google.com AAAA
```

```
dig google.com MX
```

```
dig google.com NS
```

---

# مهم‌ترین Switchهای `dig`

|Switch|کاربرد|
|---|---|
|`+short`|فقط جواب کوتاه و تمیز|
|`+noall +answer`|فقط بخش Answer|
|`+trace`|دنبال کردن مسیر DNS از Root تا Domain|
|`+stats`|نمایش زمان و اطلاعات Query|
|`+tcp`|استفاده از TCP به جای UDP|
|`+dnssec`|درخواست اطلاعات DNSSEC|
|`-x`|Reverse DNS Lookup|
|`@server`|مشخص کردن DNS Server|
|`-t`|مشخص کردن نوع رکورد|

---

# 1. ا-`+short` — خیلی پرکاربرد

مثلاً:

```
dig google.com +short
```

خروجی تقریباً فقط IPهاست:

```
142.250.x.x
```

در مقایسه با:

```
dig google.com
```

که اطلاعات کامل Query را نشان می‌دهد.

---

# 2. مشخص کردن DNS Server

ساختار:

```
dig @DNS-SERVER DOMAIN
```

مثلاً:

```
dig @8.8.8.8 google.com
```

یا:

```
dig @1.1.1.1 google.com
```

اینجا می‌توانی **پاسخ DNS Serverهای مختلف** را مقایسه کنی.

---

# 3. گرفتن رکورد خاص

```
dig google.com A
```

برای IPv4.

```
dig google.com AAAA
```

برای IPv6.

```
dig google.com MX
```

برای Mail Server.

```
dig google.com NS
```

برای Name Server.

---

# 4. ا-Reverse DNS با `-x`

اگر IP داشته باشی و بخواهی ببینی DNS برای آن چه hostnameای دارد:

```
dig -x 8.8.8.8
```

این کار را **Reverse DNS Lookup** می‌گویند.

مسیر کلی:

```
Domain → IP
    A

IP → Domain
    PTR
```

---

# 5. ا-`+noall +answer`

یکی از ترکیب‌های خیلی مفید:

```
dig google.com +noall +answer
```

به جای نمایش تمام اطلاعات، فقط **Answer Section** را نشان می‌دهد.

مثلاً:

```
google.com.    300    IN    A    142.250.x.x
```

---

# 6. ا-`+trace`

یکی از مهم‌ترین قابلیت‌های `dig`:

```
dig google.com +trace
```

به صورت مفهومی مسیر DNS را دنبال می‌کند:

```
Root DNS
   ↓
.com DNS
   ↓
google.com DNS
   ↓
Answer
```

برای **یادگیری عمیق DNS** بسیار مهم است.

---

# 7. بررسی MX

برای فهمیدن Mail Server یک Domain:

```
dig google.com MX
```

مثلاً ممکن است چیزی شبیه این ببینی:

```
google.com.   MX   10   smtp.example.com.
```

عدد `10` همان **Priority** است.

---

# 8. بررسی NS

```
dig google.com NS
```

برای فهمیدن اینکه چه Name Serverهایی مسئول Zone هستند.

---

# 9. بررسی TXT

```
dig google.com TXT
```

برای دیدن رکوردهای متنی DNS.

این رکوردها می‌توانند برای مواردی مثل:

- ا-SPF
- ا-Domain Verification
- ا-DKIM-related data
- سایر اطلاعات متنی DNS

استفاده شوند.

---

# 10. استفاده از `@` + `+short`

یک ترکیب بسیار کاربردی:

```
dig @1.1.1.1 google.com A +short
```

یعنی:

```
DNS Server = 1.1.1.1
Domain     = google.com
Record     = A
Output     = کوتاه
```

---

# یک مثال کاربردی مهم

فرض کن می‌خواهی DNS یک Domain را بررسی کنی:

```
dig example.com A +short
dig example.com AAAA +short
dig example.com MX +short
dig example.com NS +short
dig example.com TXT +short
```

این چند دستور تقریباً یک **بررسی اولیه DNS** به تو می‌دهند.

---

# خروجی `dig` را چطور بخوانیم؟

اگر بزنیم:

```
dig example.com A
```

بخش مهم خروجی:

```
;; QUESTION SECTION:
;example.com.    IN    A

;; ANSWER SECTION:
example.com.    300    IN    A    93.184.216.34
```

ساختار Answer:

```
NAME     TTL     CLASS     TYPE     VALUE
```

مثلاً:

```
example.com.   300   IN   A   93.184.216.34
```

یعنی:

|قسمت|معنی|
|---|---|
|`example.com.`|نام|
|`300`|TTL|
|`IN`|Internet|
|`A`|نوع رکورد|
|`93.184.216.34`|مقدار رکورد|

---

# مهم‌ترین دستورهایی که پیشنهاد می‌کنم حفظ کنی

```
dig example.com
```

```
dig example.com A
```

```
dig example.com AAAA
```

```
dig example.com MX
```

```
dig example.com NS
```

```
dig example.com TXT
```

```
dig -x 8.8.8.8
```

```
dig @8.8.8.8 example.com
```

```
dig example.com +short
```

```
dig example.com +noall +answer
```

```
dig example.com +trace
```

---

## جمع‌بندی خیلی کوتاه

ا-**`dig` = ابزار خط فرمان برای Query گرفتن از DNS**

چهار چیز اصلی که باید اول یاد بگیری:

```
dig domain
```

→ بررسی DNS

```
dig domain A
```

→ گرفتن IPv4

```
dig domain MX
```

→ بررسی Mail Server

```
dig @8.8.8.8 domain
```

→ پرسیدن از DNS Server مشخص

و این سه تا را حتماً بلد باش:

```
+short
+noall +answer
```
