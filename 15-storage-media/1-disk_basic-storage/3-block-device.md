# ا-1) Block Device چیست؟

در لینوکس، **Block Device** نوعی Device است که سیستم‌عامل می‌تواند اطلاعات را به صورت **Blockهای کوچک و قابل آدرس‌دهی** روی آن بخواند و بنویسد.

به زبان ساده:

> ا-**Block Device یک رابط نرم‌افزاری است که لینوکس از طریق آن با Storageهایی مثل HDD، SSD و Partitionها کار می‌کند.**

یعنی لینوکس مستقیماً با "هارد فیزیکی" کار نمی‌کند، بلکه آن را به شکل یک Block Device می‌بیند.

---

## 2) چرا به آن Block Device می‌گوییم؟

داده‌ها روی Storage به قسمت‌های کوچکی تقسیم می‌شوند که به آن‌ها **Block** می‌گوییم.

مثلاً:

```
Disk

+---------+---------+---------+
| Block 1 | Block 2 | Block 3 |
+---------+---------+---------+
```

سیستم‌عامل می‌تواند بگوید:

- ا-Block شماره 100 را بخوان
- اطلاعات Block شماره 500 را تغییر بده

---

# 3) مثال در لینوکس

وقتی یک SSD به سیستم وصل می‌کنی:

```
Physical SSD
      |
      v
Block Device
      |
      v
/dev/sda
```

لینوکس آن را به شکل فایل داخل `/dev` نشان می‌دهد.

مثال:

```
lsblk
```

خروجی:

```
NAME        SIZE
sda         500G
├── sda1    100G
├── sda2    300G
└── sda3    100G
```

اینجا:

```
/dev/sda    → Block Device اصلی (کل Disk)

/dev/sda1   → Block Device مربوط به Partition
/dev/sda2   → Block Device مربوط به Partition
```

---

# 4) تفاوت Block Device و معمولی File

در لینوکس همه چیز File است، اما Fileها انواع مختلف دارند.

مثلاً:

### ا-Regular File

فایل معمولی:

```
/home/user/file.txt
```

داده را به شکل مستقیم ذخیره می‌کند.

### ا-Block Device File

نماینده یک Storage:

```
/dev/sda
/dev/nvme0n1
```

خودش اطلاعات را نگه نمی‌دارد، بلکه به Kernel می‌گوید:

"این مسیر به یک Storage واقعی وصل است."

---

# 5) انواع Block Device

|نوع|مثال|توضیح|
|---|---|---|
|HDD|`/dev/sda`|هارد معمولی|
|SSD|`/dev/sdb`|SSD SATA|
|NVMe|`/dev/nvme0n1`|SSD پرسرعت|
|Partition|`/dev/sda1`|بخش تقسیم‌شده از Disk|
|LVM Volume|`/dev/mapper/vg-lv`|Volume منطقی|
|RAID Device|`/dev/md0`|دیسک ترکیب‌شده|

---

# 6) ا-Block Device در مسیر Storage لینوکس

ساختار کامل:

```
Physical Storage
        |
        v
    Block Device
        |
        v
    Partition
        |
        v
    Filesystem
        |
        v
     Mount Point
        |
        v
      Files
```

مثال:

```
SSD
 |
 |
 v
/dev/sda
 |
 |
 v
/dev/sda1
 |
 |
 v
ext4 filesystem
 |
 |
 v
/
 |
 |
 v
/etc /home /var
```

---

# 7) چطور Block Deviceها را ببینیم؟

### ا-lsblk

مهم‌ترین دستور:

```
lsblk
```

مثال:

```
NAME        MAJ:MIN TYPE SIZE MOUNTPOINT
sda         8:0     disk 500G
├─sda1      8:1     part 100G /
└─sda2      8:2     part 400G /data
```

قسمت مهم:

```
TYPE

disk → Disk Block Device
part → Partition Block Device
```

---

### ا-file

برای تشخیص:

```
file /dev/sda
```

---

### ا-ls -l /dev

دیدن Deviceها:

```
ls -l /dev/sda
```

مثلاً:

```
brw-rw---- 1 root disk 8,0 sda
```

حرف اول:

```
b
```

یعنی:

```
block device
```

---

# ا-8) Block Device vs Character Device

در لینوکس دو نوع مهم Device داریم:

|نوع|روش کار|مثال|
|---|---|---|
|Block Device|داده را به صورت Block منتقل می‌کند|HDD, SSD|
|Character Device|داده را به صورت جریان (Stream) منتقل می‌کند|Keyboard, Terminal|

مثال:

```
/dev/sda
```

نوع:

```
b → block device
```
---
## خلاصه نهایی

ا-**Block Device:**

> نمایشی است که Kernel لینوکس از یک Storage مثل HDD، SSD یا Partition ارائه می‌دهد تا بتواند داده‌ها را به صورت Block بخواند و بنویسد.

مثال:

```
SSD واقعی
    |
    ↓
/dev/nvme0n1   ← Block Device
    |
    ↓
/dev/nvme0n1p1 ← Partition
    |
    ↓
ext4
    |
    ↓
/data
```

بعد از Block Device، موضوع طبیعی بعدی در Storage لینوکس **Filesystem** است، چون Block Device بدون Filesystem هنوز قابل استفاده برای ذخیره فایل‌ها نیست.
