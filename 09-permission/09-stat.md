# stat command
---
# ا-`stat` چیست؟

دستور:

```
stat
```

برای نمایش **اطلاعات کامل و جزئیات یک فایل یا Directory** استفاده می‌شود.

مثلاً:

```
stat file.txt
```

خروجی معمولاً چیزی شبیه این است:

```
  File: file.txt
  Size: 120        Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d Inode: 123456      Links: 1
Access: (0644/-rw-r--r--)  Uid: (1000/    ali)   Gid: (1000/    ali)
Access: 2026-09-07 19:10:20
Modify: 2026-09-07 19:05:10
Change: 2026-09-07 19:05:10
 Birth: 2026-09-07 19:05:00
```

حالا قسمت‌به‌قسمت بررسی کنیم.

---

# 1. `File`

```
File: file.txt
```

اسم فایل را نشان می‌دهد.

---

# 2. `Size`

```
Size: 120
```

اندازه فایل بر حسب **Byte**.

مثلاً:

```
Size: 120
```

یعنی فایل 120 بایت است.

---

# 3. `Blocks`

```
Blocks: 8
```

تعداد Blockهایی که فایل روی Filesystem اشغال کرده است.

این مقدار لزوماً برابر با Size فایل نیست.

---

# 4. `IO Block`

```
IO Block: 4096
```

اندازه Block مورد استفاده برای I/O در Filesystem را نشان می‌دهد.

---

# 5. File Type

مثلاً:

```
regular file
```

یعنی فایل معمولی است.

ممکن است ببینی:

```
regular file
directory
symbolic link
```

و غیره.

---

# 6. `Device`

مثلاً:

```
Device: 801h/2049d
```

شناسه Deviceای که فایل روی آن قرار دارد.

برای استفاده روزمره معمولاً خیلی مهم نیست، ولی در مباحث Filesystem کاربرد دارد.

---

# 7. `Inode`

این قسمت خیلی مهم است:

```
Inode: 123456
```

هر فایل در Filesystem یک **inode** دارد.

ا-یinode اطلاعاتی درباره فایل نگه می‌دارد، مثل:

```
Owner
Group
Permissions
Size
Timestamps
Location of data
```

البته خود **نام فایل** در inode ذخیره نمی‌شود؛ نام فایل در Directory entry قرار دارد که به inode اشاره می‌کند.

می‌توانی با این هم inode را ببینی:

```
ls -i file.txt
```

---

# 8. `Links`

مثلاً:

```
Links: 1
```

تعداد **Hard Link**هایی که به inode اشاره می‌کنند.

مثلاً:

```
ln file.txt hardlink.txt
```

حالا:

```
stat file.txt
```

ممکن است نشان دهد:

```
Links: 2
```

چون دو نام به یک inode اشاره می‌کنند.

---

# 9. مهم‌ترین قسمت برای Permission

این قسمت:

```
Access: (0644/-rw-r--r--)
```

خیلی مهم است.

اینجا هم **Numeric Permission** را می‌بینی:

```
0644
```

و هم **Symbolic Permission**:

```
-rw-r--r--
```

یعنی:

```
Owner  → rw-
Group  → r--
Others → r--
```

پس `stat` می‌تواند برای بررسی Permission خیلی مفید باشد.

---

# 10. `Uid`

مثلاً:

```
Uid: (1000/ali)
```

یعنی Owner فایل:

```
User = ali
UID  = 1000
```

---

# 11. `Gid`

مثلاً:

```
Gid: (1000/ali)
```

یعنی Group مالک فایل:

```
Group = ali
GID   = 1000
```

---

# 12. `Access`

مثلاً:

```
Access: 2026-09-07 19:10:20
```

این زمان **آخرین Access/Read** فایل را نشان می‌دهد.

به آن معمولاً:

```
atime
```

می‌گوییم.

---

# 13. `Modify`

مثلاً:

```
Modify: 2026-09-07 19:05:10
```

زمان آخرین تغییر **محتوای فایل**.

به آن:

```
mtime
```

می‌گوییم.

مثلاً:

```
echo "hello" >> file.txt
```

محتوای فایل تغییر می‌کند، بنابراین `mtime` تغییر می‌کند.

---

# 14. `Change`

مثلاً:

```
Change: 2026-09-07 19:05:10
```

زمان آخرین تغییر **Metadata** فایل.

به آن:

```
ctime
```

می‌گوییم.

مثلاً اگر Permission را تغییر بدهی:

```
chmod 755 file.txt
```

محتوای فایل تغییر نکرده، ولی Metadata تغییر کرده، بنابراین `ctime` تغییر می‌کند.

---

# 15. `Birth`

مثلاً:

```
Birth: 2026-09-07 19:05:00
```

زمان ایجاد فایل را نشان می‌دهد، **اگر Filesystem و سیستم‌عامل بتوانند Birth time را ارائه کنند**.

---

# چند استفاده خیلی مهم `stat`

### اطلاعات یک فایل

```
stat file.txt
```

### اطلاعات Directory

```
stat /home/ali
```

### اطلاعات چند فایل

```
stat file1 file2 file3
```

---

# نمایش فقط Permission

یکی از کاربردهای خیلی خوب `stat`:

```
stat -c "%A" file.txt
```

خروجی:

```
-rw-r--r--
```

یا:

```
stat -c "%a" file.txt
```

خروجی:

```
644
```

---

# نمایش Owner

```
stat -c "%U" file.txt
```

مثلاً:

```
ali
```

---

# نمایش Group

```
stat -c "%G" file.txt
```

مثلاً:

```
developers
```

---

# نمایش UID و GID

```
stat -c "%u %g" file.txt
```

مثلاً:

```
1000 1000
```

---

# یک دستور خیلی کاربردی برای درس Permission

اگر بخواهی یکجا Permission، Owner و Group را ببینی:

```
stat -c "%A %a %U %G %n" file.txt
```

مثلاً:

```
-rw-r--r-- 644 ali developers file.txt
```

یعنی:

```
Permission → -rw-r--r--
Numeric    → 644
Owner      → ali
Group      → developers
Name       → file.txt
```

---

## خلاصه‌
```
stat
│
├── File       → نام فایل
├── Size       → اندازه
├── Blocks     → Blockهای مصرف‌شده
├── Device     → Device
├── Inode      → شماره inode
├── Links      → تعداد Hard Link
├── Access     → Permission + atime
├── Uid        → Owner
├── Gid        → Group
├── Modify     → mtime
├── Change     → ctime
└── Birth      → زمان ایجاد، در صورت پشتیبانی
```
