## ا-`nmcli` چیست؟

ا-`nmcli` مخفف **NetworkManager Command Line Interface** است.

یعنی رابط خط فرمان برای مدیریت **NetworkManager**.

در Ubuntu معمولاً NetworkManager وظیفه مدیریت چیزهایی مثل:

- Ethernet
- Wi-Fi
- IP Address
- DHCP
- DNS
- Gateway
- Routes
- VPN
- بعضی تنظیمات VLAN/Bridge و ...

را بر عهده دارد.

ساختار ذهنی:

```
                 nmcli
                   │
                   ▼
             NetworkManager
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
    Ethernet      Wi-Fi       VPN
       │           │
       ▼           ▼
   IP/Gateway    IP/DNS
```

---

# مهم‌ترین مفهوم: Device و Connection

اگر این دو را نفهمی، `nmcli` گیج‌کننده می‌شود.

### ا-Device

ا-Device همان Network Interface است.

مثلاً:

```
ens33
enp0s3
eth0
wlan0
wlp2s0
```

برای دیدنشان:

```
nmcli device status
```

مثلاً:

```
DEVICE   TYPE      STATE      CONNECTION
ens33    ethernet  connected  Wired connection 1
wlp2s0   wifi      connected  Home-WiFi
lo       loopback  unmanaged  --
```

---

### ا-Connection

ا-Connection یک **پروفایل تنظیمات شبکه** است.

مثلاً:

```
Home-WiFi
Wired connection 1
Office
Server-LAN
```

داخل Connection می‌تواند این اطلاعات باشد:

```
IPv4 method
IP address
Gateway
DNS
IPv6
Routes
Wi-Fi SSID
...
```

پس:

```
Device     = interface واقعی شبکه

Connection = تنظیماتی که NetworkManager روی آن interface اعمال می‌کند
```

این مهم‌ترین مفهوم `nmcli` است.

---

# 1. وضعیت کلی NetworkManager

```
nmcli general status
```

مثلاً:

```
STATE      CONNECTIVITY
connected  full
```

---

# 2. دیدن Network Interfaceها

```
nmcli device status
```

یا کوتاه:

```
nmcli dev status
```

این command را **حتماً بلد باش**.

---

# 3. دیدن جزئیات Device

مثلاً:

```
nmcli device show ens33
```

یا:

```
nmcli dev show ens33
```

اطلاعاتی مثل:

```
GENERAL
IP4
IP6
DNS
DHCP
ROUTE
```

می‌بینی.

---

# 4. دیدن Connectionها

```
nmcli connection show
```

یا:

```
nmcli con show
```

ا-Connectionهای فعال:

```
nmcli connection show --active
```

این command هم خیلی مهم است.

---

# 5. دیدن جزئیات یک Connection

مثلاً:

```
nmcli connection show "Wired connection 1"
```

اینجا می‌توانی تنظیمات Connection را ببینی.

مثلاً:

```
connection.id
connection.type
connection.interface-name

ipv4.method
ipv4.addresses
ipv4.gateway
ipv4.dns
```

---

# 6. فعال و غیرفعال کردن Connection

فعال:

```
nmcli connection up "Wired connection 1"
```

غیرفعال:

```
nmcli connection down "Wired connection 1"
```

---

# 7. Wi-Fi

دیدن وضعیت Wi-Fi:

```
nmcli radio wifi
```

روشن:

```
nmcli radio wifi on
```

خاموش:

```
nmcli radio wifi off
```

اسکن Wi-Fi:

```
nmcli device wifi list
```

یا:

```
nmcli dev wifi
```

اتصال:

```
nmcli device wifi connect "SSID" password "PASSWORD"
```

---

# 8. DHCP

اگر بخواهی IPv4 روی DHCP باشد:

```
nmcli connection modify "NAME" ipv4.method auto
```

بعد:

```
nmcli connection up "NAME"
```

یعنی:

```
DHCP
  ↓
NetworkManager
  ↓
IP + Gateway + DNS
```

---

# 9. Static IP

مثلاً می‌خواهی:

```
IP      = 192.168.1.100/24
Gateway = 192.168.1.1
DNS     = 1.1.1.1
```

اول:

```
nmcli connection modify "NAME" ipv4.method manual
```

IP:

```
nmcli connection modify "NAME" ipv4.addresses 192.168.1.100/24
```

Gateway:

```
nmcli connection modify "NAME" ipv4.gateway 192.168.1.1
```

DNS:

```
nmcli connection modify "NAME" ipv4.dns "1.1.1.1 8.8.8.8"
```

بعد:

```
nmcli connection up "NAME"
```

---

# 10. تغییر Connection

قلب `nmcli` برای تغییر تنظیمات این command است:

```
nmcli connection modify
```

ساختار:

```
nmcli connection modify CONNECTION PROPERTY VALUE
```

مثلاً:

```
nmcli con mod "Home-WiFi" ipv4.dns "1.1.1.1"
```

یعنی:

```
Connection
    ↓
Home-WiFi

Property
    ↓
ipv4.dns

Value
    ↓
1.1.1.1
```

---

# 11. Device connect/disconnect

مثلاً:

```
nmcli device disconnect ens33
```

و:

```
nmcli device connect ens33
```

اینجا تفاوت Device و Connection را دوباره می‌بینی.

---

# 12. ساخت Connection

مثلاً Ethernet:

```
nmcli connection add type ethernet ifname ens33 con-name Server-LAN
```

بعد می‌توانی تنظیمش کنی:

```
nmcli connection modify "Server-LAN" ipv4.method manual
```

---

# 13. حذف Connection

```
nmcli connection delete "Server-LAN"
```

دقت کن این **Connection profile** را حذف می‌کند، نه اینکه Network Card فیزیکی را حذف کند.

---

# 14. `nmcli` در Troubleshooting

این قسمت برای تو که داری Networking یاد می‌گیری خیلی مهم است.

فرض کن:

> اینترنت Ubuntu قطع شده.

به ترتیب بررسی کن:

### مرحله 1

```
nmcli general status
```

### مرحله 2

```
nmcli device status
```

### مرحله 3

```
nmcli connection show --active
```

### مرحله 4

```
nmcli device show
```

بعد برو سراغ ابزارهای پایین‌تر:

```
ip addr
ip route
```

بعد:

```
ping <gateway>
```

بعد:

```
ping 8.8.8.8
```

بعد:

```
ping google.com
```

اینجا داری یک مسیر واقعی Troubleshooting می‌سازی:

```
NetworkManager
      ↓
Device
      ↓
Connection
      ↓
IP
      ↓
Route
      ↓
Gateway
      ↓
Internet
      ↓
DNS
      ↓
Domain
```

---

# Commandهایی که واقعاً باید بلد باشی

اگر بخواهم برای Linux/SysAdmin/DevOps یک لیست Core بهت بدهم:

|Command|کاربرد|
|---|---|
|`nmcli general status`|وضعیت کلی NetworkManager|
|`nmcli device status`|وضعیت Interfaceها|
|`nmcli device show`|جزئیات Interface|
|`nmcli connection show`|لیست Connectionها|
|`nmcli connection show --active`|Connectionهای فعال|
|`nmcli connection show NAME`|جزئیات یک Connection|
|`nmcli connection up NAME`|فعال کردن Connection|
|`nmcli connection down NAME`|غیرفعال کردن Connection|
|`nmcli connection modify`|تغییر تنظیمات|
|`nmcli connection add`|ساخت Connection|
|`nmcli connection delete`|حذف Connection|
|`nmcli device connect DEVICE`|اتصال Device|
|`nmcli device disconnect DEVICE`|قطع Device|
|`nmcli device wifi list`|Scan کردن Wi-Fi|
|`nmcli device wifi connect`|اتصال به Wi-Fi|
|`nmcli radio wifi on/off`|روشن/خاموش کردن Wi-Fi|

### ولی این نکته را جدی بگیر:

لازم نیست همه این‌ها را **حفظ** کنی.

باید بتوانی یک سناریو را انجام بدهی:

```
دیدن interface
      ↓
دیدن connection
      ↓
بررسی IP
      ↓
DHCP / Static IP
      ↓
Gateway
      ↓
DNS
      ↓
Route
      ↓
تست ارتباط
      ↓
Troubleshooting
```

اگر این مسیر را با `nmcli` و در کنارش `ip`, `ss`, `ping`, `dig` و `ip route` عملی کار کنی، `nmcli` واقعاً برایت جا می‌افتد.

برای سیستم Ubuntu فعلی خودت هم می‌توانی همین الان این سه دستور را اجرا کنی:

```
nmcli general status
nmcli device status
nmcli connection show
```

