# ا-Partition Number چیست؟

ا-**Partition Number شماره‌ای است که برای شناسایی هر Partition روی یک Disk استفاده می‌شود.**

فرض کن یک Disk داریم:

```
/dev/sda
```

اگر روی آن 3 Partition داشته باشیم:

```
/dev/sda1
/dev/sda2
/dev/sda3
```

اعداد `1`، `2` و `3` همان **Partition Number** هستند.

```
/dev/sda1
       ↑
       Partition Number = 1
```

---

## ا-1. Partition Number چه کاری انجام می‌دهد؟

سیستم‌عامل باید بتواند Partitionهای مختلف یک Disk را از هم تشخیص دهد.

مثلاً:

```
/dev/sda
│
├── /dev/sda1
├── /dev/sda2
└── /dev/sda3
```

اینجا:

```
sda1 → Partition 1
sda2 → Partition 2
sda3 → Partition 3
```

بنابراین وقتی می‌گویی:

```
/dev/sda2
```

یعنی:

> ا-Partition شماره 2 روی Disk `sda`

---

# 2. در NVMe چه شکلی است؟

در NVMe نام‌گذاری کمی متفاوت است.

مثلاً:

```
/dev/nvme0n1
```

این **خود Disk** است.

اگر Partition بسازیم:

```
/dev/nvme0n1p1
/dev/nvme0n1p2
/dev/nvme0n1p3
```

اینجا:

```
/dev/nvme0n1p1
             ↑
       Partition Number = 1
```

حرف `p` برای جدا کردن شماره Partition از شماره‌ی خود Disk استفاده می‌شود.

---

# 3. ا-Partition Number با Disk Number فرق دارد

این دو را نباید قاطی کنی.

مثلاً:

```
/dev/sda2
```

یعنی:

```
sda → Disk
2   → Partition
```

ولی:

```
/dev/sdb1
```

یعنی:

```
sdb → Disk دیگری
1   → Partition شماره 1
```

پس:

```
/dev/sda2
```

و:

```
/dev/sdb2
```

هر دو **Partition Number = 2** دارند، اما روی دو Disk متفاوت هستند.

---

# 4. آیا Partition Number نوع Partition را مشخص می‌کند؟

**خیر.**

مثلاً در MBR ممکن است داشته باشیم:

```
/dev/sda1
/dev/sda2
/dev/sda3
/dev/sda4
```

شماره فقط می‌گوید Partition شماره چند است.

اینکه Partition:

```
Primary
Extended
Logical
```

باشد، موضوع جداگانه‌ای است.

در MBR حتی شماره‌گذاری Logical Partitionها می‌تواند به شکل خاصی ادامه پیدا کند؛ مثلاً:

```
/dev/sda5
/dev/sda6
/dev/sda7
```

این‌ها معمولاً Logical Partition هستند که داخل Extended Partition قرار دارند.

---

# ا-5. Partition Number با Partition Table ارتباط دارد

ا-Partition Table اطلاعات Partitionها را نگه می‌دارد.

مثلاً:

```
Partition Table

Number    Start       End        Type
   1      ...         ...        Linux
   2      ...         ...        Linux
   3      ...         ...        Linux
```

اینجا ستون:

```
Number
```

همان **Partition Number** است.

مثلاً با:

```
sudo fdisk -l
```

ممکن است چیزی شبیه این ببینی:

```
Device       Start       End     Sectors   Type
/dev/sda1     2048    1000000     ...     Linux
/dev/sda2  1000001    2000000     ...     Linux
```

در اینجا:

```
sda1 → Number 1
sda2 → Number 2
```

---

# 6. ا-Partition Number با Start/End فرق دارد

ا-Partition Number فقط **شناسه/شماره Partition** است.

اما Partition دارای اطلاعات دیگری هم هست:

```
Partition
│
├── Number
├── Start
├── End
├── Size
├── Type
└── Filesystem
```

مثلاً:

```
/dev/sda2
```

فقط از روی `2` می‌فهمیم که شماره Partition برابر 2 است.

برای فهمیدن اینکه:

- کجا شروع می‌شود
- چقدر فضا دارد
- چه Typeای دارد
- چه Filesystemای دارد

باید اطلاعات Partition Table و Filesystem را بررسی کنیم.

---

# 7. ا-Partition Number را کجا می‌بینیم؟

چند ابزار مهم:

```
lsblk
```

```
sudo fdisk -l
```

```
sudo parted -l
```

مثلاً:

```
lsblk
```

ممکن است:

```
NAME
sda
├─sda1
├─sda2
└─sda3
```

ببینی.

در اینجا:

```
sda1 → 1
sda2 → 2
sda3 → 3
```

---

# 8. یک نکته خیلی مهم درباره MBR و GPT

ا-**Partition Number یک مفهوم محدود به MBR نیست.**

هم در:

```
MBR
```

و هم در:

```
GPT
```

ا-Partitionها شماره دارند.

مثلاً GPT:

```
/dev/sda1
/dev/sda2
/dev/sda3
```

همچنان:

```
1
2
3
```

شماره Partition هستند.

تفاوت اصلی MBR و GPT در **ساختار Partition Table و محدودیت‌های آن‌ها** است، نه اینکه یکی Partition Number داشته باشد و دیگری نداشته باشد.

---

# 9. یک مثال کامل

فرض کن این Disk را داریم:

```
/dev/sda
```

و سه Partition:

```
/dev/sda1
/dev/sda2
/dev/sda3
```

می‌توانیم این‌طور تصور کنیم:

```
/dev/sda
│
├── Partition Number 1
│       └── /dev/sda1
│
├── Partition Number 2
│       └── /dev/sda2
│
└── Partition Number 3
        └── /dev/sda3
```

مثلاً:

```
sda1 → 100 GB → ext4
sda2 → 200 GB → ext4
sda3 → 700 GB → XFS
```

ا-**Number فقط شماره است؛ Size و Filesystem و Type اطلاعات دیگری هستند.**

---

## 3 نکته خیلی مهم

1. ا-**Partition Number = شماره شناسایی Partition روی یک Disk.**
2. در `/dev/sda2`، `sda` نام Disk و `2` شماره Partition است؛ در NVMe مثل `/dev/nvme0n1p2`، شماره `2` بعد از `p` می‌آید.
3. ا-**Partition Number نوع Partition یا Filesystem را مشخص نمی‌کند**؛ فقط شماره آن را مشخص می‌کند.

### خلاصه نهایی

```
Disk
  │
  ├── Partition 1 → /dev/sda1
  ├── Partition 2 → /dev/sda2
  └── Partition 3 → /dev/sda3
```

> ا-**Partition Number یعنی شماره‌ای که Partition با آن در Partition Table و نام Device شناخته می‌شود.**
