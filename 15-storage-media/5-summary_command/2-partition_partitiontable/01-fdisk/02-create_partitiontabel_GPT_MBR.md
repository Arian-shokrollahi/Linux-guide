`fdisk` هم می‌تواند **Partition Table** ایجاد کند.

مثلاً داخل:

```
sudo fdisk /dev/sdb
```

اگر بخواهی **GPT** بسازی:

```
g → create a new empty GPT partition table
```

اگر بخواهی **MBR/DOS** بسازی:

```
o → create a new empty DOS partition table
```

پس:

```
fdisk
 ├── g → GPT
 └── o → MBR/DOS
```

بنابراین `gdisk` تنها راه ساخت GPT نیست؛ `fdisk` در نسخه‌های جدید Linux از **GPT و MBR** پشتیبانی می‌کند