## ا-`fdisk` چیست؟

ا-`fdisk` یکی از ابزارهای اصلی Linux برای **مدیریت Partition Table دیسک‌ها** است. با آن می‌توانی دیسک را بررسی کنی، Partition بسازی، حذف کنی، نوع Partition را تغییر بدهی و اطلاعات Partition Table را ببینی.

مثلاً اگر یک دیسک جدید مثل `/dev/sdb` داشته باشی:

```
sudo fdisk /dev/sdb
```

وارد محیط تعاملی `fdisk` می‌شوی و می‌توانی Partitionهای آن دیسک را مدیریت کنی.

### `fdisk` دقیقاً با چه چیزی کار می‌کند؟

ساختار را این‌طور در نظر بگیر:

```
Physical Disk
     │
     └── Partition Table
           ├── Partition 1
           ├── Partition 2
           └── Partition 3
```

ا-`fdisk` در درجه اول با **Partition Table و Partitionها** کار می‌کند، نه با Filesystem.

یعنی این دو مرحله جدا هستند:

```
fdisk
  ↓
Partition ایجاد می‌کند
  ↓
/dev/sdb1
  ↓
mkfs
  ↓
Filesystem مثل ext4
  ↓
mount
```

مثلاً:

```
sudo fdisk /dev/sdb
# Partitioning the disk

sudo mkfs.ext4 /dev/sdb1
# Creating an ext4 filesystem

sudo mount /dev/sdb1 /mnt
# Mounting the filesystem
```

### مهم‌ترین کاربردهای `fdisk`

- دیدن Partitionهای یک دیسک
- ساخت Partition جدید
- حذف Partition
- تغییر نوع Partition
- تغییر اندازه Partition در حد امکانات ابزار/نوع جدول پارتیشن
- نوشتن تغییرات روی Partition Table
- بررسی Partition Table

### نکته خیلی مهم

`fdisk` را باید روی **خود دیسک** اجرا کنی، مثلاً:

```
sudo fdisk /dev/sdb
```

نه معمولاً روی یک Partition مثل:

```
sudo fdisk /dev/sdb1
```

چون `/dev/sdb` خود دیسک است و `/dev/sdb1` یکی از Partitionهای آن است.

**خلاصه:**  
ا-`fdisk` = ابزار مدیریت **Partition Table و Partitionهای دیسک**؛ بعد از ساخت Partition، برای ساخت Filesystem از ابزارهایی مثل `mkfs.ext4` استفاده می‌کنی.