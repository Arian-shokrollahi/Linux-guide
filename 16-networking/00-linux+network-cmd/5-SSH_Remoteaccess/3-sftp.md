## ا-`sftp`

ا-`SFTP` مخفف **SSH File Transfer Protocol** است و برای **انتقال و مدیریت فایل روی سیستم Remote از طریق SSH** استفاده می‌شود.

تفاوت مهمش با `scp` این است که `sftp` یک **session تعاملی** ایجاد می‌کند و داخل آن می‌توانی چندین دستور برای مدیریت فایل اجرا کنی.

### Syntax

```
sftp [options] [user@]host
```

مثال:

```
sftp ali@192.168.1.100
# Connect to the remote server
```

---

## مهم‌ترین Switchها

|Switch|کاربرد|
|---|---|
|`-P <port>`|مشخص کردن SSH Port|
|`-i <key>`|استفاده از Private Key|
|`-o <option>`|تنظیم SSH option|
|`-v`|Debug|
|`-q`|Quiet mode|
|`-b <file>`|اجرای دستورات SFTP از یک Batch File|

---

## دستورات مهم داخل SFTP

بعد از اتصال:

```
sftp> 
```

|Command|کاربرد|
|---|---|
|`ls`|نمایش فایل‌های Remote|
|`pwd`|مسیر فعلی Remote|
|`cd`|تغییر مسیر Remote|
|`lls`|نمایش فایل‌های Local|
|`lpwd`|مسیر فعلی Local|
|`lcd`|تغییر مسیر Local|
|`get`|دانلود فایل|
|`put`|آپلود فایل|
|`mget`|دانلود چند فایل|
|`mput`|آپلود چند فایل|
|`mkdir`|ساخت Directory روی Remote|
|`rm`|حذف فایل Remote|
|`rmdir`|حذف Directory خالی|
|`rename`|تغییر نام فایل|
|`chmod`|تغییر Permission|
|`exit` / `bye`|خروج|
|`help`|نمایش Help|

---

## ⭐⭐⭐ ۳ کاربرد پرکاربرد

### 1. دانلود فایل

```
sftp> get /var/log/app.log
# Download remote file
```

### 2. آپلود فایل

```
sftp> put backup.tar.gz /tmp/
# Upload local file
```

### 3. انتقال چند فایل

```
sftp> mget *.log
# Download multiple files
```

---

## 🔑 اتصال با Key و Port

```
sftp -i ~/.ssh/id_ed25519 -P 2222 ali@server
```

---

### `scp` vs `sftp` vs `ssh`

|Command|کاربرد|
|---|---|
|`ssh`|ورود به Remote و اجرای Command|
|`scp`|Copy سریع فایل/Directory|
|`sftp`|Session تعاملی برای مدیریت و انتقال فایل|

### خلاصه

```
SSH
 │
 ├── ssh  → Remote Shell
 ├── scp  → Copy Files
 └── sftp → Interactive File Transfer
```

**نکته:** `sftp` از SSH استفاده می‌کند، بنابراین همان مکانیزم‌های SSH مثل **Authentication، SSH Key و Port** را دارد.
