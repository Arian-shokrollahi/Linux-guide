این اولویت را پیشنهاد می‌کنم:

|اولویت|Command|اهمیت|چرا؟|
|---|---|---|---|
|🥇 1|`curl`|⭐⭐⭐⭐⭐|تست HTTP/HTTPS، API، Header، Status Code و ارتباط با Web|
|🥈 2|`nc` / `netcat`|⭐⭐⭐⭐⭐|تست Port، TCP/UDP، اتصال و Troubleshooting شبکه|
|🥉 3|`openssl s_client`|⭐⭐⭐⭐|بررسی TLS/SSL و Certificate|
|4|`wget`|⭐⭐⭐|دانلود فایل و تست HTTP|
|5|`telnet`|⭐⭐|تست ساده اتصال TCP؛ امروزه کاربردش محدودتر است|

### اگر وقت خیلی کمی داری

این ترتیب را برو:

```
nc
 ↓
curl
 ↓
openssl s_client
 ↓
wget
 ↓
telnet
```

البته **`curl` و `nc` تقریباً هم‌سطح و هر دو خیلی مهم‌اند**؛ فقط کاربردشان متفاوت است:

```
nc      → آیا می‌توانم به این Port وصل شوم؟
curl    → آیا این سرویس HTTP/HTTPS درست کار می‌کند؟
openssl → آیا TLS/Certificate درست است؟
wget    → دانلود از Web
telnet  → تست ساده TCP
```

### ۴ دستور که واقعاً ارزش حفظ کردن دارند

**تست Port:**

```
nc -zv 192.168.1.10 22
```

**تست HTTP:**

```
curl -I https://example.com
```

**بررسی TLS:**

```
openssl s_client -connect example.com:443
```

**دانلود فایل:**

```
wget https://example.com/file.zip
```


