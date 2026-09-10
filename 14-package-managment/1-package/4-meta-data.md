# 4. ا-Metadata در Package چیست؟

ا-**Metadata** یعنی «اطلاعات درباره‌ی خود Package».

یعنی Metadata خودش برنامه نیست و معمولاً هم فایل Configuration نیست؛ بلکه اطلاعاتی است که **Package Manager** برای شناختن و مدیریت Package از آن استفاده می‌کند.

مثلاً Package Manager باید بداند:

```
این Package چه نامی دارد؟
چه نسخه‌ای است؟
چه معماری‌ای دارد؟
توسط چه کسی ساخته شده؟
به چه Package هایی وابسته است؟
```

این اطلاعات در واقع **Metadata** هستند.

---

## ا-Metadata شامل چه چیزهایی می‌شود؟

به‌صورت مفهومی:

```
Metadata
   |
   ├── Package Name
   ├── Version
   ├── Architecture
   ├── Description
   ├── Maintainer
   ├── Dependencies
   └── Other package information
```

مثلاً یک Package فرضی:

```
Name: nginx
Version: 1.24.0
Architecture: amd64
Maintainer: Debian Developers
Depends: libc6, ...
```

اینجا این اطلاعات به Package Manager کمک می‌کنند Package را **شناسایی و مدیریت** کند.

---

## ا-Metadata چرا مهم است؟

چون Package Manager با استفاده از Metadata می‌تواند کارهایی مثل این انجام دهد:

```
Install
Update
Remove
Check Dependencies
Check Version
```

مثلاً وقتی می‌زنی:

```
apt install nginx
```

`apt` باید بداند Package موردنظر چیست، چه نسخه‌ای دارد و به چه Dependency هایی نیاز دارد.

---

## تفاوت Metadata با Documentation

این دو را قاطی نکن:

```
Metadata
→ اطلاعاتی برای شناسایی و مدیریت Package

Documentation
→ راهنمایی برای انسان و نحوه استفاده از نرم‌افزار
```

مثلاً:

```
Version: 1.24.0
Dependencies: libc6
Architecture: amd64
```

این‌ها **Metadata** هستند.

ولی:

```
How to configure nginx
How to use nginx
Examples
```

این‌ها **Documentation** هستند.

---

### خلاصه

```
Metadata
=
اطلاعاتی درباره Package که Package Manager
برای شناسایی و مدیریت آن استفاده می‌کند.
```

چهار بخش مهمی که تا اینجا از Package یاد گرفتی:

```
Package
│
├── Program Files
├── Configuration Files
├── Documentation
└── Metadata
```

و بخش بعدی که خیلی مهم است **Dependency** است، چون Metadata معمولاً اطلاعات Dependency ها را هم در خودش دارد.
