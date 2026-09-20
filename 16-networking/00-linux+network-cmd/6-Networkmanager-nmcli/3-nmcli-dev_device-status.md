# nmcli dev(device) status

---
ا-`nmcli device show` یکی از دستورهای مهم `nmcli` است، مخصوصاً برای **عیب‌یابی شبکه**.

## ا-`nmcli device show`

این دستور اطلاعات **جزئی و کامل Network Deviceها / Interfaceهای شبکه** را نمایش می‌دهد.

به زبان ساده:

> ا-`nmcli device show` بهت می‌گوید هر Network Interface در سیستم دقیقاً چه تنظیمات و مشخصاتی دارد.

### Syntax

```
nmcli device show
```

برای یک interface خاص هم می‌توانی اسم آن را بدهی:

```
nmcli device show wlp2s0
```

یا:

```
nmcli device show enp3s0
```

---

### Example

```
> Show detailed information about network devices

$ nmcli device show wlp2s0

GENERAL.DEVICE:                         wlp2s0
GENERAL.TYPE:                           wifi
GENERAL.HWADDR:                         AA:BB:CC:DD:EE:FF
GENERAL.STATE:                          100 (connected)
GENERAL.CONNECTION:                     Home-WiFi

IP4.ADDRESS[1]:                         192.168.1.25/24
IP4.GATEWAY:                            192.168.1.1
IP4.DNS[1]:                             192.168.1.1

IP6.ADDRESS[1]:                         fe80::1234/64
IP6.GATEWAY:                            --
```

### این خروجی چه چیزهایی بهت می‌دهد؟

اطلاعات مهمی مثل:

|بخش|اطلاعات|
|---|---|
|`GENERAL.DEVICE`|نام interface، مثلاً `wlp2s0`|
|`GENERAL.TYPE`|نوع device، مثلاً `wifi` یا `ethernet`|
|`GENERAL.HWADDR`|MAC Address|
|`GENERAL.STATE`|وضعیت اتصال device|
|`GENERAL.CONNECTION`|Connection مورد استفاده|
|`IP4.ADDRESS`|IPv4 Address و Prefix|
|`IP4.GATEWAY`|Default Gateway|
|`IP4.DNS`|DNS Server|
|`IP6.ADDRESS`|IPv6 Address|
|`IP6.GATEWAY`|IPv6 Gateway|

### تفاوت خیلی مهم

این سه دستور را کنار هم قرار بده:

```
nmcli general status
```

→ **وضعیت کلی NetworkManager**

```
nmcli device status
```

→ **وضعیت کلی هر Network Device**

```
nmcli device show
```

→ **جزئیات کامل هر Network Device**

مثلاً اگر بخواهی فقط سریع بفهمی Wi-Fi وصل است یا نه:

```
nmcli device status
```

اما اگر بخواهی بفهمی:

> ا-IP من چیست؟ Gateway چیست؟ DNS چیست؟ MAC Address چیست؟ این interface از چه connectionای استفاده می‌کند؟

آن‌وقت:

```
nmcli device show wlp2s0
```

استفاده می‌کنی.

**نکته SysAdmin:** `nmcli device show` بیشتر برای **inspection و troubleshooting** خیلی کاربردی است؛ یعنی وقتی شبکه مشکل دارد، این دستور اطلاعات زیادی برای پیدا کردن مشکل بهت می‌دهد.ا-
