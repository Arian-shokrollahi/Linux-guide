# ا-Linux Storage Media — از شناسایی تا Mount و Unmount

## 🧠 نقشه‌ی کلی

```bash
Disk
 ↓
شناسایی → lsblk
 ↓
Partition Table → fdisk
 ↓
GPT → g
 ↓
Partition → n
 ↓
ذخیره تغییرات → w
 ↓
Filesystem → mkfs
 ↓
Mount Point → mkdir
 ↓
Mount → mount
 ↓
استفاده از Storage
 ↓
Unmount → umount
```

---

# 1️⃣ شناسایی Storage

اول باید ببینیم لینوکس چه دیسک‌ها و پارتیشن‌هایی دارد.

### دستور اصلی:

```
lsblk
```

مثلاً:

```
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda      8:0    0   50G  0 disk
├─sda1   8:1    0    1G  0 part /boot
└─sda2   8:2    0   49G  0 part /
sdb      8:16   0   20G  0 disk
```

اینجا:

```
sda  → Disk
sda1 → Partition
sda2 → Partition
sdb  → Disk
```

### ابزارهای مهم شناسایی:

```
lsblk
lsblk -f
blkid
fdisk -l
```

به‌خصوص:

```
lsblk -f
```

خیلی مفید است چون Filesystem و UUID و Mount Point را هم نشان می‌دهد.

---

# 2️⃣ انتخاب Disk

فرض کنیم دیسک جدید ما:

```
/dev/sdb
```

است.

⚠️ این مرحله خیلی مهم است؛ قبل از هر عملیات مطمئن شو روی دیسک درست کار می‌کنی.

مثلاً:

```
lsblk
```

بررسی می‌کنیم که `/dev/sdb` همان دیسکی است که می‌خواهیم روی آن کار کنیم.

---

# 3️⃣ ساخت Partition Table

حالا باید روی Disk یک Partition Table بسازیم.

ابزار:

```
fdisk /dev/sdb
```

داخل `fdisk`:

```
g
```

یعنی:

```
Create a new GPT partition table
```

پس:

```
/dev/sdb
   ↓
fdisk
   ↓
g
   ↓
GPT Partition Table
```

### دو نوع معروف Partition Table:

```
MBR
GPT
```

امروزه **GPT** انتخاب معمول و مدرن است.

---

# 4️⃣ ساخت Partition

بعد از ساخت GPT، باید Partition بسازیم.

داخل `fdisk`:

```
n
```

یعنی:

```
new partition
```

بعد معمولاً ازت می‌پرسد:

```
Partition number
First sector
Last sector
```

مثلاً:

```
n
1
Enter
+5G
```

یعنی یک پارتیشن 5GB بساز.

در نتیجه:

```
/dev/sdb
   ↓
/dev/sdb1
```

---

# 5️⃣ بررسی Partition

قبل از خروج می‌توانی داخل `fdisk` بزنید:

```
p
```

برای:

```
print partition table
```

بعد برای ذخیره تغییرات:

```
w
```

یعنی:

```
write
```

پس روند `fdisk`:

```
fdisk /dev/sdb
      ↓
g → GPT
      ↓
n → New Partition
      ↓
p → بررسی
      ↓
w → ذخیره
```

---

# 6️⃣ بررسی نتیجه

بعد از خروج از `fdisk`:

```
lsblk
```

باید چیزی شبیه این ببینی:

```
sdb
└─sdb1    5G
```

حالا:

```
Disk
 ↓
Partition Table
 ↓
Partition
```

داریم.

اما هنوز نمی‌توانیم مثل یک Filesystem معمولی از آن استفاده کنیم.

---

# 7️⃣ ساخت Filesystem

Partition داریم:

```
/dev/sdb1
```

حالا باید روی آن Filesystem بسازیم.

مثلاً:

```
mkfs.ext4 /dev/sdb1
```

یعنی:

```
/dev/sdb1
      ↓
ext4 Filesystem
```

### چند Filesystem معروف:

```
ext4
xfs
btrfs
vfat
exfat
ntfs
```

مثلاً:

```
mkfs.ext4 /dev/sdb1
```

یا:

```
mkfs.xfs /dev/sdb1
```

⚠️ اجرای `mkfs` روی پارتیشن دارای اطلاعات می‌تواند اطلاعات آن را از بین ببرد.

---

# 8️⃣ بررسی Filesystem

حالا:

```
lsblk -f
```

مثلاً:

```
NAME   FSTYPE FSVER LABEL UUID                                 MOUNTPOINTS
sdb
└─sdb1 ext4         data  1234-5678
```

حالا می‌دانیم:

```
/dev/sdb1
Filesystem → ext4
```

---

# 9️⃣ ساخت Mount Point

ا-Linux برای اینکه Filesystem را در درخت فایل قرار دهد، به یک **Mount Point** نیاز دارد.

مثلاً:

```
mkdir /mnt/data
```

حالا داریم:

```
/dev/sdb1
      ↓
ext4
      ↓
/mnt/data
```

---

# 🔟 Mount کردن

حالا:

```
mount /dev/sdb1 /mnt/data
```

یعنی:

> ا-Filesystem موجود روی `/dev/sdb1` را در `/mnt/data` متصل کن.

ساختار ذهنی:

```
/dev/sdb1
   ↓
ext4
   ↓
mount
   ↓
/mnt/data
   ↓
Linux Filesystem Tree
```

حالا اگر:

```
cd /mnt/data
```

بزنی، داری داخل Filesystem جدید کار می‌کنی.

---

# 1️⃣1️⃣ بررسی Mount

دوباره:

```
lsblk -f
```

مثلاً:

```
sdb
└─sdb1 ext4  data  1234-5678  /mnt/data
```

یعنی Mount موفق بوده.

دستورهای دیگر:

```
mount
```

یا:

```
findmnt
```

برای دیدن Mountها بسیار مفید هستند.

---

# 1️⃣2️⃣ استفاده از Storage

حالا می‌توانی داخل آن فایل بسازی:

```
cd /mnt/data
touch file.txt
mkdir test
```

مثلاً:

```
/mnt/data
├── file.txt
└── test/
```

---

# 1️⃣3️⃣ Unmount

وقتی کارت تمام شد، باید Filesystem را از درخت فایل جدا کنی.

```
umount /mnt/data
```

یا:

```
umount /dev/sdb1
```

پس:

```
Mounted
   ↓
استفاده
   ↓
umount
   ↓
Unmounted
```

---

# 1️⃣4️⃣ اگر `umount` خطا داد

ممکن است بگوید:

```
target is busy
```

یعنی هنوز یک Process از آن Filesystem استفاده می‌کند.

مثلاً اگر داخل آن باشی:

```
cd /mnt/data
```

و همان‌جا:

```
umount /mnt/data
```

ممکن است مشکل ایجاد شود.

برو بیرون:

```
cd /
```

بعد:

```
umount /mnt/data
```

برای پیدا کردن استفاده‌کننده‌ها هم می‌توانی از ابزارهایی مثل:

```
lsof
fuser
```

استفاده کنی.

---

# 🔄 کل مسیر از 0 تا 100

اگر بخواهی همه چیز را در یک زنجیره حفظ کنی:

```
1. Disk
   ↓
2. lsblk
   ↓
3. انتخاب Disk
   ↓
4. fdisk /dev/sdb
   ↓
5. GPT → g
   ↓
6. Partition → n
   ↓
7. بررسی → p
   ↓
8. ذخیره → w
   ↓
9. /dev/sdb1
   ↓
10. mkfs.ext4 /dev/sdb1
   ↓
11. mkdir /mnt/data
   ↓
12. mount /dev/sdb1 /mnt/data
   ↓
13. استفاده از Storage
   ↓
14. umount /mnt/data
```

---

# 🧠 تفاوت چیزهای مهم

این قسمت را **حتماً** خوب در ذهنت نگه دار:

### Disk

کل دستگاه ذخیره‌سازی:

```
/dev/sdb
```

### Partition

بخشی از Disk:

```
/dev/sdb1
```

### Filesystem

ساختاری که روی Partition ساخته می‌شود:

```
ext4
xfs
btrfs
...
```

### Mount Point

محلی در درخت فایل لینوکس که Filesystem به آن وصل می‌شود:

```
/mnt/data
```

### Mount

عمل اتصال:

```
mount /dev/sdb1 /mnt/data
```

### Unmount

عمل جدا کردن:

```
umount /mnt/data
```

---

# 🔥 یک مثال کامل

فرض کن یک Disk جدید داری:

```
/dev/sdb
```

### مرحله 1 — شناسایی

```
lsblk
```

### مرحله 2 — Partition Table

```
fdisk /dev/sdb
```

داخل:

```
g
```

### مرحله 3 — Partition

```
n
```

مثلاً کل فضا را انتخاب می‌کنی.

### مرحله 4 — ذخیره

```
w
```

حالا:

```
/dev/sdb1
```

### مرحله 5 — Filesystem

```
mkfs.ext4 /dev/sdb1
```

### مرحله 6 — Mount Point

```
mkdir /mnt/data
```

### مرحله 7 — Mount

```
mount /dev/sdb1 /mnt/data
```

### مرحله 8 — بررسی

```
lsblk -f
```

### مرحله 9 — استفاده

```
cd /mnt/data
```

### مرحله 10 — Unmount

```
cd /
umount /mnt/data
```

---

# ⚠️ نکات پایانی که باید بلد باشی

### 1. `lsblk` دوست همیشگی Storage است

```
lsblk
lsblk -f
```

قبل و بعد از عملیات Storage زیاد استفاده می‌شود.

---

### 2. `fdisk` با Filesystem فرق دارد

`fdisk` برای مدیریت **Partition Table و Partition** است.

```
fdisk → Partition
mkfs   → Filesystem
```

---

### 3. Partition ≠ Filesystem

این دو یکی نیستند:

```
/dev/sdb1        → Partition
ext4             → Filesystem
```

---

### 4. Mount یعنی اتصال به درخت فایل

Linux برخلاف بعضی سیستم‌ها، برای دسترسی به Filesystem معمولاً آن را در یک نقطه از **Filesystem Tree** قرار می‌دهد.

مثلاً:

```
/
├── home
├── var
├── etc
├── mnt
│   └── data   ← Filesystem اینجا Mount شده
└── ...
```

---

### 5. `mount` و `umount` را اشتباه نکن

```
mount
```

اتصال

```
umount
```

جدا کردن

---

### 6. `umount` به معنی پاک کردن نیست

این خیلی مهم است:

```
umount /mnt/data
```

**Filesystem را حذف نمی‌کند.**

فقط آن را از درخت فایل جدا می‌کند.

---

### 7. `mkfs` را با احتیاط استفاده کن

```
mkfs.ext4 /dev/sdb1
```

یعنی روی آن Partition یک Filesystem جدید بساز.

اگر Partition اطلاعات مهم داشته باشد، می‌تواند باعث از دست رفتن اطلاعات شود.

---

### 8. Mount موقت است

اگر این کار را بزنی:

```
mount /dev/sdb1 /mnt/data
```

معمولاً این Mount برای وضعیت فعلی سیستم است.

برای اینکه بعد از Reboot هم خودکار Mount شود، باید وارد بحث:

```
/etc/fstab
UUID
mount options
```

بشوی.

این در واقع **مرحله بعدی Storage** است.

---

# 🎯 خلاصه نهایی برای حفظ کردن

```shell
Disk
 ↓
شناسایی → lsblk
 ↓
Partition Table → fdisk
 ↓
GPT → g
 ↓
Partition → n
 ↓
بررسی → p
 ↓
ذخیره → w
 ↓
Filesystem → mkfs.ext4
 ↓
بررسی → lsblk -f
 ↓
Mount Point → mkdir /mnt/data
 ↓
Mount → mount /dev/sdb1 /mnt/data
 ↓
بررسی Mount → lsblk -f / findmnt
 ↓
استفاده → cd /mnt/data
 ↓
Unmount → umount /mnt/data
```

### اگر بخواهم کل درس را در یک جمله خلاصه کنم:

> **اول Storage را با `lsblk` شناسایی می‌کنیم، با `fdisk` برایش Partition Table و Partition می‌سازیم، با `mkfs` روی Partition یک Filesystem ایجاد می‌کنیم، با `mount` آن را به یک Mount Point در درخت فایل لینوکس وصل می‌کنیم و در پایان با `umount` جدا می‌کنیم.**

این دقیقاً همان **مدل ذهنی 0 تا 100 Storage Media** است که باید در ذهنت بماند.
