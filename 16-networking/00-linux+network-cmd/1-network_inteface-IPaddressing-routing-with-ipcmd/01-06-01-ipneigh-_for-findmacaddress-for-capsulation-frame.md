# ip neigh command(neighbor tab)
---
# مقدمه `ip neigh`

وقتی Linux می‌خواهد با یک دستگاه در **شبکه محلی (LAN)** ارتباط برقرار کند، معمولاً IP مقصد را دارد، اما برای ارسال Frame روی Ethernet به **MAC Address** آن دستگاه نیاز دارد.

مثلاً:

```
IP مقصد
192.168.1.20
     ↓
Linux می‌پرسد:
MAC این IP چیست؟
     ↓
ARP
     ↓
AA:BB:CC:DD:EE:FF
```

ا-Linux این اطلاعات را در یک جدول به نام **Neighbor Table** نگه می‌دارد.

برای دیدن این جدول:

```
ip neigh
```

پس خیلی ساده:

> ا-**`ip neigh` برای مشاهده و مدیریت اطلاعات Neighborها، مثل ارتباط IP و MAC در شبکه Local، استفاده می‌شود.**

---

# 🔹 ساختار `ip neigh`

ساختار کلی:

```
ip neigh [COMMAND] [OPTIONS]
```

دستورهای اصلی:

```
ip neigh show
ip neigh add
ip neigh del
ip neigh replace
ip neigh flush
```

---

# 🔹 ا-Switch / Optionهای مهم

|Option|کاربرد|
|---|---|
|`show`|→ نمایش Neighbor Table|
|`add`|→ اضافه کردن یک Neighbor به‌صورت دستی|
|`del`|→ حذف یک Neighbor|
|`replace`|→ اضافه یا جایگزین کردن Neighbor|
|`flush`|→ پاک کردن Neighborها|
|`dev`|→ مشخص کردن Interface|
|`nud`|→ فیلتر کردن بر اساس وضعیت Neighbor|

مثلاً:

```
ip neigh show dev eth0
```

→ فقط Neighborهای مربوط به `eth0` را نشان می‌دهد.

---

# ⭐ دو مورد کاربردی

## 1️⃣ ا-`dev`

```
ip neigh show dev eth0
```

یعنی:

> ا-Neighborهای مربوط به Interface `eth0` را نشان بده.

وقتی Server چند کارت شبکه داشته باشد، این خیلی کاربردی است.

---

## ا-2️⃣ `nud`

ا-`nud` یعنی **Neighbor Unreachability Detection** و برای مشخص کردن وضعیت Neighbor استفاده می‌شود.

مثلاً:

```
ip neigh show nud reachable
```

→ فقط Neighborهایی را نشان بده که وضعیتشان `REACHABLE` است.

و مثلاً:

```
ip neigh show nud failed
```

→ ا-Neighborهایی که ارتباط با آنها Failed شده‌اند.

---

# 🧪 حالا یک خروجی واقعی را تحلیل کنیم

فرض کن این را اجرا کردی:

```
ip neigh
```

و خروجی:

```
192.168.1.1 dev eth0 lladdr 00:11:22:33:44:55 REACHABLE
192.168.1.20 dev eth0 lladdr AA:BB:CC:DD:EE:FF STALE
192.168.1.30 dev eth0 FAILED
```

حالا خط‌به‌خط:

---

### 🟢 خط اول

```
192.168.1.1 dev eth0 lladdr 00:11:22:33:44:55 REACHABLE
```

یعنی:

```
IP:
192.168.1.1

Interface:
eth0

MAC:
00:11:22:33:44:55

State:
REACHABLE
```

ا-Linux می‌داند:

> `192.168.1.1` روی `eth0` دارای MAC `00:11:22:33:44:55` است و اخیراً قابل دسترس بوده.

احتمالاً این IP **Gateway** شبکه است.

---

### 🟡 خط دوم

```
192.168.1.20 dev eth0 lladdr AA:BB:CC:DD:EE:FF STALE
```

یعنی:

> ا-Linux قبلاً MAC این دستگاه را یاد گرفته، اما اطلاعاتش اخیراً استفاده/تأیید نشده و وضعیت آن `STALE` شده.

⚠️ ا-`STALE` به معنی خراب بودن دستگاه نیست.

ممکن است با اولین ارتباط دوباره وضعیت آن به حالت مناسب برگردد.

---

### 🔴 خط سوم

```
192.168.1.30 dev eth0 FAILED
```

اینجا مهم‌تر است.

یعنی:

> ا-Linux تلاش کرده Neighbor مربوط به `192.168.1.30` را پیدا/تأیید کند، ولی موفق نشده.

پس ممکن است مشکل‌هایی مثل این وجود داشته باشد:

```
دستگاه خاموش است
       یا
IP اشتباه است
       یا
مشکل شبکه Local وجود دارد
       یا
ARP جواب نمی‌دهد
       یا
VLAN / Switch مشکل دارد
```

---

# 🧠 ا-Stateهای مهم

چند State مهم که باید بشناسی:

|State|معنی ساده|
|---|---|
|`REACHABLE`|→ اخیراً Neighbor قابل دسترس بوده|
|`STALE`|→ اطلاعات قدیمی است ولی الزاماً مشکل نیست|
|`DELAY`|→ Linux منتظر تأیید وضعیت است|
|`PROBE`|→ Linux در حال بررسی Neighbor است|
|`FAILED`|→ تلاش برای رسیدن/Resolve کردن Neighbor شکست خورده|
|`INCOMPLETE`|→ هنوز MAC کامل Resolve نشده|

---

# 🔥 ا-`ip neigh` چه زمانی برای Troubleshooting استفاده می‌شود؟

وقتی مشکل در **شبکه Local / ARP / IP-to-MAC** داری.

مثلاً:

> «من IP دستگاه را دارم ولی نمی‌توانم با آن ارتباط بگیرم.»

اول می‌توانی بررسی کنی:

```
ip neigh
```

اگر دیدی:

```
192.168.1.20 FAILED
```

می‌فهمی که مشکل می‌تواند در **ARP یا ارتباط Layer 2** باشد.

در چنین شرایطی معمولاً این‌ها را کنار هم بررسی می‌کنی:

```
ip addr
ip link
ip neigh
ping
arping
```

### ⭐ خلاصه برای جزوه:

> ا-**`ip neigh` → مشاهده و مدیریت Neighbor Table و بررسی ارتباط IP ↔ MAC در شبکه Local؛ در Troubleshooting مشکلات ARP، Layer 2 و عدم دسترسی به دستگاه‌های داخل LAN بسیار کاربردی است.**
