ا-**APT** در Linux، مخصوصاً اگر هدفت Linux Administration است، بهتر است این مباحث را به ترتیب بلد باشی:

### ا-1. APT چیست؟

- ا-`APT` مخفف **Advanced Package Tool**
- ابزار مدیریت Package در Debian و Ubuntu
- برای نصب، حذف، Update و مدیریت Package ها استفاده می‌شود.

### 2. دستورات اصلی نصب و حذف

```
apt install
apt remove
apt purge
```

### 3. ا-Update و Upgrade

```
apt update
apt upgrade
apt full-upgrade
```

تفاوت `update` و `upgrade` خیلی مهم است.

### 4. جستجو و پیدا کردن Package

```
apt search
apt show
```

### 5. دیدن اطلاعات یک Package

```
apt show nginx
```

باید بتوانی چیزهایی مثل این‌ها را بخوانی:

```
Version
Architecture
Depends
Description
```

### 6. مدیریت Dependency

بفهمی APT چطور Dependency ها را پیدا و نصب می‌کند.

### ا-7. Repository ها

بدانی APT از کجا Package می‌گیرد و مفهوم این فایل‌ها را بفهمی:

```
/etc/apt/sources.list
/etc/apt/sources.list.d/
```

همچنین تفاوت:

```
Official Repository
Third-Party Repository
```

### ا-8. `apt` و `apt-get`

بدانی هر دو برای مدیریت Package هستند، ولی کاربردشان دقیقاً یکسان نیست.

### ا-9. Cache مربوط به APT

مفهوم Package Cache و دستورهایی مثل:

```
apt clean
apt autoclean
```

را بشناسی.

### 10. بررسی Package های نصب‌شده

مثلاً:

```
apt list --installed
```

### 11. رفع Dependency و مشکلات Package

بدانی در بعضی خطاها چه مفهومی دارد:

```
apt --fix-broken install
```

### ا-12. Permission و `sudo`

بدانی چرا معمولاً برای تغییرات سیستمی می‌نویسیم:

```
sudo apt install nginx
```

---

### مهم‌ترین دستورات برای شروع

این‌ها را اول از همه یاد بگیر:

```
sudo apt update
sudo apt upgrade
sudo apt install <package>
sudo apt remove <package>
sudo apt purge <package>
apt search <package>
apt show <package>
apt list --installed
sudo apt autoremove
```

### ترتیب پیشنهادی یادگیری

```
APT چیست
   ↓
Package
   ↓
Repository
   ↓
apt update
   ↓
apt install
   ↓
apt remove / purge
   ↓
apt upgrade
   ↓
search / show
   ↓
Dependencies
   ↓
sources.list
   ↓
Troubleshooting
```

برای یادگیری اصولی، **اول `apt update`، `apt install`، `apt remove`، `apt upgrade` و `apt search/show`** را کامل بفهم؛ بعد برو سراغ Repository و Dependency ها.
