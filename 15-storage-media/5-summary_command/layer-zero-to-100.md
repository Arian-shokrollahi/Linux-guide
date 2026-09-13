اگر بخواهی کل مسیر **Storage از دیسک خام تا Mount** را به شکل یک نقشه یاد بگیری، این ترتیب خیلی خوبه:

```
┌──────────────────────────────┐
│ 1. Disk Detection             │
└──────────────┬───────────────┘
               ↓
          lsblk / blkid
               ↓
┌──────────────────────────────┐
│ 2. Partition Table            │
│    GPT / MBR                  │
└──────────────┬───────────────┘
               ↓
        fdisk / gdisk
               ↓
┌──────────────────────────────┐
│ 3. Partition Creation         │
│    /dev/sdb1                  │
└──────────────┬───────────────┘
               ↓
             fdisk
               ↓
┌──────────────────────────────┐
│ 4. Filesystem Creation        │
│    ext4 / xfs / btrfs ...     │
└──────────────┬───────────────┘
               ↓
             mkfs
               ↓
┌──────────────────────────────┐
│ 5. Filesystem Information     │
│    UUID / TYPE / LABEL        │
└──────────────┬───────────────┘
               ↓
        blkid / lsblk -f
               ↓
┌──────────────────────────────┐
│ 6. Mount Point Creation       │
│    /mnt/data                  │
└──────────────┬───────────────┘
               ↓
            mkdir
               ↓
┌──────────────────────────────┐
│ 7. Mount                      │
│    /dev/sdb1 → /mnt/data      │
└──────────────┬───────────────┘
               ↓
             mount
               ↓
┌──────────────────────────────┐
│ 8. Verify                     │
└──────────────┬───────────────┘
               ↓
       findmnt / lsblk -f
               ↓
          ✅ قابل استفاده
```

### سناریوی واقعی 0 → 100

فرض کن دیسک جدیدت `/dev/sdb` است.

**① پیدا کردن دیسک**

```
lsblk
```

**② ساخت Partition Table**

```
sudo fdisk /dev/sdb
```

داخل `fdisk`:

```
g    → GPT
n    → New Partition
p    → بررسی
w    → Write
```

حالا داری:

```
/dev/sdb
└── /dev/sdb1
```

**③ ساخت Filesystem**

```
sudo mkfs.ext4 /dev/sdb1
```

**④ گرفتن اطلاعات Filesystem**

```
lsblk -f
```

یا:

```
blkid /dev/sdb1
```

مثلاً:

```
/dev/sdb1
TYPE="ext4"
UUID="xxxx-xxxx"
```

**⑤ ساخت Mount Point**

```
sudo mkdir /mnt/data
```

**⑥ Mount**

```
sudo mount /dev/sdb1 /mnt/data
```

**⑦ بررسی**

```
findmnt /mnt/data
```

یا:

```
lsblk -f
```

**⑧ تست**

```
sudo touch /mnt/data/test.txt
ls -l /mnt/data
```

---

### خلاصه‌ای که باید حفظ کنی

```
Disk
 ↓
Partition Table
 ↓
Partition
 ↓
Filesystem
 ↓
Mount Point
 ↓
Mount
 ↓
Use
```

و Commandهای اصلی:

```
lsblk       → دیسک و Partitionها را ببین
fdisk       → Partition بساز
mkfs        → Filesystem بساز
blkid       → UUID / TYPE / LABEL را ببین
mkdir       → Mount Point بساز
mount       → Filesystem را Mount کن
findmnt     → Mount را بررسی کن
```

**بعد از این مرحله** تازه می‌رسی به بخش مهم بعدی یعنی:

```
Mount موقت
     ↓
/etc/fstab
     ↓
Mount دائمی بعد از Reboot
```

که برای کار واقعی Linux Server خیلی مهم است.