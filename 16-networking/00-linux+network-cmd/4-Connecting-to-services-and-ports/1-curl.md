ا-`curl` یکی از **مهم‌ترین commandهای Network در لینوکس** است و اگر وقتت محدود است، ارزش دارد نسبتاً خوب یادش بگیری.

# ا-`curl` چیست؟

ا-`curl` مخفف **Client URL** است و برای برقراری ارتباط با سرویس‌های مختلف از طریق شبکه استفاده می‌شود.

مهم‌ترین استفاده‌اش:

```
Linux
  ↓
HTTP / HTTPS
  ↓
Web Server / API
```

مثلاً:

```
curl https://example.com
```

محتوای پاسخ HTTP را دریافت می‌کند و در ترمینال نمایش می‌دهد.

---

# ساختار کلی

```
curl [OPTIONS] URL
```

مثلاً:

```
curl https://example.com
```

---

# 1. ساده‌ترین استفاده — GET

```
curl https://example.com
```

این یک درخواست **GET** می‌فرستد.

یعنی:

> محتوای این URL را برای من بگیر.

این ساده‌ترین و مهم‌ترین استفاده `curl` است.

---

# 2. فقط Headerها را ببینیم

```
curl -I https://example.com
```

`-I` یعنی فقط **HTTP Headers** را بگیر.

مثلاً ممکن است ببینی:

```
HTTP/2 200
content-type: text/html
content-length: 1256
server: nginx
```

این برای Troubleshooting خیلی کاربردی است.

مثلاً می‌توانی بفهمی:

```
200 → موفق
301 → Redirect
404 → پیدا نشد
403 → دسترسی ممنوع
500 → خطای Server
```

---

# 3. نمایش جزئیات کامل Connection

یکی از مهم‌ترین گزینه‌ها:

```
curl -v https://example.com
```

`-v` یعنی **verbose**.

اطلاعات بیشتری درباره Connection می‌دهد، مثل:

```
DNS
 ↓
TCP
 ↓
TLS
 ↓
HTTP
 ↓
Response
```

مثلاً می‌توانی ببینی:

```
* Connected to example.com
* TLS handshake
> GET /
< HTTP/2 200
```

برای **Network Troubleshooting** بسیار مهم است.

---

# 4. دنبال کردن Redirect

فرض کن سایت:

```
http://example.com
```

تو را به:

```
https://example.com
```

Redirect کند.

برای دنبال کردن Redirect:

```
curl -L http://example.com
```

`-L` یعنی **Follow Redirects**.

---

# 5. دانلود فایل

می‌توانی با `curl` فایل دانلود کنی:

```
curl -O https://example.com/file.zip
```

`-O` باعث می‌شود فایل با همان نام موجود در URL ذخیره شود.

مثلاً:

```
https://example.com/test.iso
```

با:

```
curl -O https://example.com/test.iso
```

فایل:

```
test.iso
```

ساخته می‌شود.

---

# 6. مشخص کردن نام فایل

با `-o`:

```
curl -o myfile.zip https://example.com/file.zip
```

اینجا خودت اسم فایل خروجی را تعیین می‌کنی.

تفاوت:

```
-O → نام فایل را از URL بگیر
-o → خودم نام فایل را تعیین می‌کنم
```

---

# 7. ارسال POST

یکی از کاربردهای مهم `curl` کار با **API** است.

مثلاً:

```
curl -X POST https://example.com/api
```

`-X` برای تعیین HTTP Method است.

مثلاً:

```
curl -X GET URL
curl -X POST URL
curl -X PUT URL
curl -X DELETE URL
```

---

# 8. ارسال Data

مثلاً:

```
curl -X POST -d "username=ali&password=123" https://example.com/login
```

`-d` یعنی **data**.

این روش برای ارسال داده به Web Server یا API استفاده می‌شود.

---

# 9. ارسال JSON

در APIها خیلی مهم است.

مثلاً:

```
curl -X POST https://example.com/api \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","age":25}'
```

اینجا:

```
-X POST
```

نوع درخواست را مشخص می‌کند.

```
-H
```

Header اضافه می‌کند.

```
-d
```

داده ارسال می‌کند.

---

# 10. اضافه کردن Header

مثلاً:

```
curl -H "Authorization: Bearer TOKEN" https://example.com/api
```

یا:

```
curl -H "Content-Type: application/json" https://example.com/api
```

ساختار:

```
curl -H "HEADER: VALUE" URL
```

---

# 11. دیدن Header + Body

اگر بخواهی هم Header و هم Body را ببینی:

```
curl -i https://example.com
```

تفاوت مهم:

```
-I → فقط Header
-i → Header + Body
-v → جزئیات Connection + Header + Body
```

---

# 12. تعیین Timeout

برای اینکه درخواست برای مدت زیادی معطل نشود:

```
curl --connect-timeout 5 https://example.com
```

یعنی برای برقراری Connection بیشتر از ۵ ثانیه منتظر نمان.

این در Script و Troubleshooting خیلی کاربردی است.

---

# 13. تست یک Port مشخص

مثلاً:

```
curl http://192.168.1.10:8080
```

یعنی به:

```
192.168.1.10
Port 8080
```

از طریق HTTP وصل شو.

این برای بررسی سرویس‌های Web روی Portهای غیرمعمول کاربرد دارد.

---

# 14. مشخص کردن Interface

در سیستم‌هایی که چند Network Interface دارند:

```
curl --interface eth0 https://example.com
```

یعنی Connection را از `eth0` ایجاد کن.

این بیشتر در **Network Troubleshooting** استفاده می‌شود.

---

# 15. بررسی وضعیت HTTP

برای اینکه Status Code را ببینی:

```
curl -o /dev/null -s -w "%{http_code}\n" https://example.com
```

مثلاً:

```
200
```

این برای Scriptها خیلی کاربردی است.

مثلاً:

```
if curl -fs https://example.com > /dev/null; then
    echo "UP"
else
    echo "DOWN"
fi
```

---

# مهم‌ترین Optionهای `curl`

|Option|کاربرد|
|---|---|
|`-I`|فقط Header|
|`-i`|Header + Body|
|`-v`|جزئیات Connection|
|`-L`|دنبال کردن Redirect|
|`-O`|ذخیره با نام اصلی|
|`-o`|ذخیره با نام دلخواه|
|`-X`|تعیین HTTP Method|
|`-H`|اضافه کردن Header|
|`-d`|ارسال Data|
|`-s`|Silent|
|`-f`|Fail در HTTP error|
|`-k`|نادیده گرفتن Certificate verification|
|`--connect-timeout`|Timeout برای Connection|

---

# ۵ کاربرد واقعی و روزمره

### 1. چک کردن سایت

```
curl -I https://example.com
```

مثلاً می‌خواهی سریع بفهمی Server جواب می‌دهد یا نه.

---

### 2. Troubleshooting

```
curl -v https://example.com
```

برای دیدن مسیر:

```
DNS
 ↓
TCP
 ↓
TLS
 ↓
HTTP
```

---

### 3. تست API

```
curl https://api.example.com/users
```

یا:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali"}' \
  https://api.example.com/users
```

---

### 4. دانلود فایل

```
curl -O https://example.com/file.zip
```

---

### 5. بررسی Status Code

```
curl -o /dev/null -s -w "%{http_code}\n" https://example.com
```

مثلاً:

```
200
```

---

# ا-`curl` در Network دقیقاً کجای کار است؟

این قسمت را خوب به خاطر بسپار:

```
             curl
               │
               ▼
             DNS
               │
               ▼
             TCP
               │
               ▼
          TLS / HTTPS
               │
               ▼
             HTTP
               │
               ▼
          Web Server
```

`curl` می‌تواند به تو کمک کند بفهمی **کدام قسمت ارتباط مشکل دارد**.

---

# اگر وقتت کم است، این‌ها را یاد بگیر

به‌جای حفظ کردن ده‌ها Option، فعلاً این ۸ مورد کافی است:

```
curl https://example.com
```

```
curl -I https://example.com
```

```
curl -v https://example.com
```

```
curl -L http://example.com
```

```
curl -O https://example.com/file.zip
```

```
curl -X POST URL
```

```
curl -H "Header: Value" URL
```

```
curl -d "data=value" URL
```

### جمع‌بندی یک‌خطی

> ا-**`curl` = ابزار همه‌کاره برای برقراری ارتباط و تست سرویس‌های شبکه، مخصوصاً HTTP/HTTPS و APIها.**

اگر بخواهی در بخش Network فقط چند command را **عمیق** یاد بگیری، `curl` قطعاً یکی از آن‌هاست.
