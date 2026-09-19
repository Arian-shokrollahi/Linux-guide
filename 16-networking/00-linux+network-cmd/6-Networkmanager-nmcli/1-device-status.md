# نمونه ای از خروجی دستور nmcli dev(device) status 
---
#### دستور nmcli dev(device) status برایه چی استفاده میشه
دستور:

```
> nmcli dev status
```

برای **دیدن وضعیت کلی Network Deviceهای سیستم** استفاده می‌شود.

یعنی با یک دستور سریع می‌توانی بفهمی:

- چه Network Interfaceهایی داری.
- هرکدام چه نوعی هستند (`ethernet`, `wifi`, `loopback`, ...).
- هرکدام وصل هستند یا نه.
- هر Device به کدام NetworkManager connection متصل است.

---
#### برسی یک خروجی از دستور nmcli dev status
:

```
> nmcli device status
```

نمونه خروجی:

```
DEVICE    TYPE      STATE                   CONNECTION
lo        loopback  connected (externally)  lo
enp0s3    ethernet  connected               Wired connection 1
wlp2s0    wifi      connected               Home-WiFi
docker0   bridge    connected (externally)  docker0
```

### بررسی خروجی

دستور `nmcli device status` وضعیت کلی **network device/interface**های سیستم را نشان می‌دهد؛ یعنی می‌توانی ببینی چه interfaceهایی وجود دارند، نوعشان چیست، وضعیتشان چیست و به چه connectionای متصل هستند.

|Column|معنی|
|---|---|
|`DEVICE`|نام Network Interface یا Device|
|`TYPE`|نوع interface مثل `ethernet`, `wifi`, `loopback`, `bridge`|
|`STATE`|وضعیت فعلی device|
|`CONNECTION`|نام NetworkManager connection که روی device فعال است|

### 1. `DEVICE`

مثلاً:

```
enp0s3
wlp2s0
lo
docker0
```

این‌ها اسم interfaceهای سیستم هستند.

مثلاً:

```
enp0s3
```

معمولاً یک interface شبکه‌ی Ethernet است.

```
wlp2s0
```

معمولاً interface مربوط به Wi-Fi است.

```
lo
```

همان **loopback interface** است.

---

### 2. `TYPE`

نوع device را مشخص می‌کند:

```
ethernet
wifi
loopback
bridge
```

مثلاً:

```
enp0s3    ethernet
wlp2s0    wifi
lo        loopback
```

یعنی `enp0s3` یک Ethernet device و `wlp2s0` یک Wi-Fi device است.

---

### 3. `STATE`

این ستون برای Sysadmin خیلی مهم است.

مثلاً:

```
connected
disconnected
unavailable
unmanaged
```

در مثال ما:

```
enp0s3    ethernet    connected
wlp2s0    wifi        connected
```

یعنی هر دو interface در حال حاضر متصل هستند.

اما مثلاً:

```
wlp2s0    wifi    disconnected
```

یعنی Wi-Fi interface وجود دارد ولی در حال حاضر به connectionای متصل نیست.

---

### 4. `CONNECTION`

این ستون اسم **NetworkManager connection profile** را نشان می‌دهد.

مثلاً:

```
enp0s3    ethernet    connected    Wired connection 1
wlp2s0    wifi        connected    Home-WiFi
```

نکته‌ی مهم این است که:

**DEVICE و CONNECTION یکی نیستند.**

مثلاً:

```
DEVICE     CONNECTION
wlp2s0     Home-WiFi
```

ا-`wlp2s0` خود interface است، ولی `Home-WiFi` یک connection profile در NetworkManager است.

---

### تصویر ذهنی

```
Physical / Virtual Network Device
              │
              ▼
          wlp2s0
              │
              │ NetworkManager
              ▼
        Home-WiFi
              │
              ▼
          connected
```

پس وقتی می‌زنی:

```
nmcli device status
```

در واقع داری یک **نمای سریع از وضعیت NetworkManager deviceها** می‌گیری.

اگر بخواهی دقیق‌تر بررسی کنی که مثلاً `wlp2s0` چه IP، Gateway، DNS و Routeهایی دارد، آن‌وقت باید بروی سراغ:

```
nmcli device show wlp2s0
```

این دو تا را خوب کنار هم یاد بگیر:

```
nmcli device status
```

**→ وضعیت کلی deviceها**

```
nmcli device show wlp2s0
```

**→ جزئیات کامل یک device**

