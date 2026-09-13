دستورها رو بر اساس **Storage / Disk / Partition / Filesystem / Mount / Swap / Monitoring / RAID** دسته‌بندی کردم و جلوی هرکدوم خیلی کوتاه انگلیسی نوشتم.

```bash
# ================================
# 1. DISK / BLOCK DEVICE INFORMATION
# ================================

lsblk
# > List block devices and their partitions

lsblk -f
# > List block devices with filesystem information

lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
# > Show selected block-device information

blkid
# > Show block device UUIDs and filesystem types

blkid /dev/sda1
# > Show identification information for a specific device

fdisk -l
# > List disks and partition tables

findmnt
# > Show mounted filesystems and their mount points

findmnt /dev/sda1
# > Show where a specific filesystem is mounted


# ================================
# 2. PARTITIONING
# ================================

fdisk /dev/sdb
# > Create and manage MBR/GPT partitions

gdisk /dev/sdb
# > Create and manage GPT partitions

parted /dev/sdb
# > Create and manage disk partitions

parted -l
# > List partition tables


# ================================
# 3. FILESYSTEM
# ================================

mkfs
# > Create a filesystem on a device

mkfs.ext4 /dev/sdb1
# > Create an ext4 filesystem

mkfs.xfs /dev/sdb1
# > Create an XFS filesystem

mke2fs
# > Create an ext2/ext3/ext4 filesystem

tune2fs
# > Tune ext2/ext3/ext4 filesystem parameters

dumpe2fs
# > Display ext2/ext3/ext4 filesystem information

e2fsck
# > Check and repair ext2/ext3/ext4 filesystems


# ================================
# 4. MOUNT / UNMOUNT
# ================================

mount
# > Show currently mounted filesystems

mount /dev/sdb1 /mnt
# > Mount a filesystem

mount -a
# > Mount all filesystems defined in /etc/fstab

umount /mnt
# > Unmount a filesystem

umount /dev/sdb1
# > Unmount a specific device


# ================================
# 5. DISK SPACE USAGE
# ================================

df
# > Show filesystem disk space usage

df -h
# > Show filesystem usage in human-readable format

df -T
# > Show filesystem type and disk usage

du
# > Estimate file and directory space usage

du -sh /var
# > Show total size of a directory

du -sh *
# > Show size of items in the current directory


# ================================
# 6. SWAP
# ================================

free -h
# > Show memory and swap usage

swapon --show
# > Show active swap areas

swapon /swapfile
# > Enable a swap file or device

swapoff /swapfile
# > Disable a swap file or device

mkswap /swapfile
# > Create a swap area


# ================================
# 7. DISK / I/O MONITORING
# ================================

iostat
# > Monitor CPU and disk I/O statistics

iostat -xz
# > Show extended disk I/O statistics

iotop
# > Monitor disk I/O by processes

vmstat
# > Report system and I/O statistics


# ================================
# 8. DEVICE INFORMATION
# ================================

udevadm info /dev/sda
# > Show udev device information

udevadm monitor
# > Monitor kernel/udev device events

ls -l /dev/sda
# > Show information about a device file

file /dev/sda
# > Identify the type of a device file

lshw -class disk
# > Show hardware information about disks


# ================================
# 9. RAID
# ================================

mdadm --detail --scan
# > Scan for software RAID arrays

mdadm --detail /dev/md0
# > Show detailed RAID array information

cat /proc/mdstat
# > Show Linux software RAID status


# ================================
# 10. LVM — BASIC
# ================================

pvs
# > Show physical volumes

vgs
# > Show volume groups

lvs
# > Show logical volumes

pvcreate /dev/sdb1
# > Create an LVM physical volume

vgcreate vgname /dev/sdb1
# > Create an LVM volume group

lvcreate -L 5G -n lvname vgname
# > Create an LVM logical volume
```

### چند فایل و مفهوم مهم کنار این Commandها

```bash
/dev
> Device files

/etc/fstab
> Persistent filesystem mount configuration

/proc/mdstat
> Linux software RAID status

/sys
> Kernel and device information

/proc
> Kernel and system information
```

و برای جزوه‌ات، این **زنجیره‌ی اصلی Storage** رو حتماً داشته باش:

```bash
Disk
  ↓
Partition
  ↓
Filesystem
  ↓
Mount Point
  ↓
Directory
```

مثلاً:

```bash
/dev/sdb
   ↓
/dev/sdb1
   ↓
ext4
   ↓
/mnt/data
   ↓
/mnt/data/
```
