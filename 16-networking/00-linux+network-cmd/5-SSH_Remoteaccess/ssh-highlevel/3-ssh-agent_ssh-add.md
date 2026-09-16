## ا-`ssh-agent` + `ssh-add`

این دو تا معمولاً **با هم** استفاده می‌شوند. `ssh-agent` یک برنامه‌ی موقت در حافظه است که Private Key را نگه می‌دارد، و `ssh-add` کلید را داخل آن Agent قرار می‌دهد.

### ساختار

```
ssh-keygen
    ↓
Private Key + Public Key
    ↓
ssh-copy-id
    ↓
Public Key → Server
```

حالا روی سیستم خودت:

```
ssh-agent
    │
    └── Private Key 🔐
          ↑
       ssh-add
```

و بعد:

```
ssh user@server
```

ا-SSH از Key موجود در `ssh-agent` استفاده می‌کند.

---

# 🎯 سناریوی واقعی

فرض کن یک **DevOps Engineer** هستی و ۳ تا Server داری:

```
server1
server2
server3
```

و Private Key تو:

```
~/.ssh/id_ed25519
```

است و برایش Passphrase گذاشتی.

بدون Agent، ممکن است در طول کار چندین بار نیاز به استفاده از همان Key داشته باشی.

اول Agent را اجرا می‌کنی:

```
eval "$(ssh-agent -s)"
```

بعد Key را فقط **یک بار** اضافه می‌کنی:

```
ssh-add ~/.ssh/id_ed25519
```

Passphrase را وارد می‌کنی.

حالا:

```
ssh user@server1
ssh user@server2
ssh user@server3
```

در طول این session، Agent کلید را در حافظه نگه می‌دارد و SSH می‌تواند از آن استفاده کند.

---

## 🔍 جریان کامل

```
                 Your Computer
                      │
              ┌───────▼────────┐
              │   ssh-agent    │
              │                │
              │ Private Key 🔐 │
              └───────┬────────┘
                      │
             ┌────────┼────────┐
             ▼        ▼        ▼
         Server 1  Server 2  Server 3
```

پس:

```
ssh-agent → «کلیدها را موقتاً نگه می‌دارم»
ssh-add   → «این کلید را داخل Agent قرار بده»
ssh       → «از کلید Agent برای Login استفاده کن»
```

### ⭐ چیزی که باید حفظ کنی


```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh user@server
```

این سناریو مخصوصاً وقتی مفید است که **Private Key دارای Passphrase باشد و در یک session چندین اتصال SSH داشته باشی**.
