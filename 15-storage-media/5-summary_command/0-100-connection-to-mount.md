آره؛ فرض کن یک **دیسک خام `/dev/sdb`** داری و می‌خواهی از صفر تا جایی که قابل استفاده شود، همه کارها را با `fdisk` انجام بدهی.

> ⚠️ مثال را روی `/dev/sdb` می‌زنیم. مطمئن شو دیسک درست را انتخاب کرده‌ای؛ اشتباه در `fdisk` می‌تواند اطلاعات دیسک را حذف کند.

### 0. اول دیسک را پیدا کن

```
lsblk
```

فرض کنیم خروجی نشان می‌دهد:

```
sdb    20G   disk
```

---

### 1. ورود به `fdisk`

```
sudo fdisk /dev/sdb
```

حالا داخل محیط `fdisk` هستی.

---

### 2. ساخت Partition Table از نوع GPT

```
g
```

یعنی:

```
g → Create a new GPT partition table
```

---

### 3. ساخت Partition

```
n
```

`fdisk` چند سؤال می‌پرسد:

```
Partition number: 1
First sector: Enter
Last sector: Enter
```

اگر Enter بزنی، کل فضای آزاد را به `/dev/sdb1` می‌دهی.

---

### 4. بررسی نتیجه

```
p
```

مثلاً:

```
Device      Size
/dev/sdb1   20G
```

---

### 5. ذخیره تغییرات

```
w
```

حالا Partition واقعاً روی دیسک نوشته می‌شود.

---

### 6. بررسی از بیرون

```
lsblk
```

باید چیزی شبیه این ببینی:

```
sdb
└─sdb1    20G
```

تا اینجا:

```
/dev/sdb
   ↓
GPT
   ↓
/dev/sdb1
```

---

### 7. ساخت Filesystem

حالا روی Partition، `ext4` می‌سازیم:

```
sudo mkfs.ext4 /dev/sdb1
```

الان:

```
/dev/sdb1
   ↓
ext4 Filesystem
```

---

### 8. ساخت Mount Point

```
sudo mkdir /mnt/data
```

---

### 9. Mount کردن

```
sudo mount /dev/sdb1 /mnt/data
```

بررسی:

```
findmnt /mnt/data
```

یا:

```
lsblk -f
```

---

### 10. تست اینکه قابل استفاده است

```
sudo touch /mnt/data/test.txt
ls -l /mnt/data
```

اگر `test.txt` ساخته شد، دیسک آماده استفاده است.

---

## کل مسیر از صفر تا صد

```
/dev/sdb
   │
   ▼
fdisk
   │
   ├── g → GPT Partition Table
   │
   └── n → Create Partition
          │
          ▼
       /dev/sdb1
          │
          ▼
       mkfs.ext4
          │
          ▼
      ext4 Filesystem
          │
          ▼
     mount /dev/sdb1 /mnt/data
          │
          ▼
       قابل استفاده
```

**نکته مهم:** `fdisk` فقط تا مرحله **Partition** کار اصلی را انجام می‌دهد؛ `mkfs` مسئول ساخت Filesystem و `mount` مسئول متصل کردن آن به درخت `/` است.