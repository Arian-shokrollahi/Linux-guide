:

|دستور|کاربرد|مثال|
|---|---|---|
|`sudo apt update`|لیست و اطلاعات Package های موجود در Repository را به‌روز می‌کند|`sudo apt update`|
|`sudo apt upgrade`|Package های نصب‌شده را به نسخه جدیدتر ارتقا می‌دهد|`sudo apt upgrade`|
|`sudo apt full-upgrade`|علاوه بر Upgrade، در صورت نیاز Dependency ها را تغییر می‌دهد یا Package هایی را حذف می‌کند|`sudo apt full-upgrade`|

### ا-`apt update` دقیقاً چه کار می‌کند؟

```
sudo apt update
```

این دستور **خود نرم‌افزارها را Upgrade نمی‌کند**.

فقط اطلاعات Repository ها را دریافت می‌کند:

```
Repository
    ↓
New Package Information
    ↓
APT Package Lists
```

بنابراین معمولاً قبل از Upgrade این را اجرا می‌کنیم:

```
sudo apt update
```

---

### ا-`apt upgrade` چه کار می‌کند؟

بعد از Update:

```
sudo apt upgrade
```

ا-APT بررسی می‌کند کدام Package های نصب‌شده نسخه جدید دارند و آن‌ها را Upgrade می‌کند.

روند معمول:

```
sudo apt update
sudo apt upgrade
```

یعنی:

```
update
↓
دریافت اطلاعات نسخه‌های جدید

upgrade
↓
نصب نسخه‌های جدید
```

### ا-`full-upgrade` چه فرقی دارد؟

```
sudo apt full-upgrade
```

قدرت بیشتری نسبت به `upgrade` دارد و ممکن است برای کامل کردن Upgrade، **Package هایی را حذف یا Dependency هایی را تغییر دهد**.

---

### چیزی که باید حفظ کنی

```
sudo apt update
```

= **اطلاعات Package ها را Update کن**

```
sudo apt upgrade
```

 ا-**Package های نصب‌شده را Upgrade کن**

پس این دو تا را با هم اشتباه نکن:

```
Update → اطلاعات Repository
Upgrade → خود Package ها
```
