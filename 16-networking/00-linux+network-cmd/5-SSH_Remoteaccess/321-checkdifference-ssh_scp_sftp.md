## مقایسه `ssh` ،`scp` و `sftp`

|ویژگی|`ssh`|`scp`|`sftp`|
|---|---|---|---|
|کاربرد اصلی|اتصال به Remote|انتقال فایل|انتقال و مدیریت فایل|
|Remote Shell|✅|❌|❌|
|انتقال فایل|❌*|✅|✅|
|Interactive Session|✅|❌|✅|
|اجرای Command روی Server|✅|❌|محدود|
|انتقال Directory|—|✅ با `-r`|✅|
|مدیریت فایل Remote|—|محدود|✅|
|رمزنگاری|SSH|SSH|SSH|
|Authentication|Password / Key|Password / Key|Password / Key|
|Port پیش‌فرض|`22`|`22`|`22`|

* با `ssh` می‌توان فایل را با روش‌های دیگری مثل redirect/piping منتقل کرد، ولی کاربرد اصلی `ssh` انتقال فایل نیست.

---

## 1️⃣ `ssh` → ورود به Server

```
ssh user@server
```

بعد وارد Shell سرور می‌شوی:

```
Local PC
   │
   │ SSH
   ▼
Remote Server
   │
   └── Shell
```

مثلاً:

```
ssh root@192.168.1.10
```

**کار اصلی:** مدیریت Remote Server.

---

## 2️⃣ `scp` → کپی فایل

```
scp file.txt user@server:/tmp/
```

```
Local PC
   │
   │ file.txt
   ▼
Remote Server
```

برای Directory:

```
scp -r project/ user@server:/opt/
```

**کار اصلی:** انتقال سریع و ساده فایل.

---

## 3️⃣ `sftp` → مدیریت فایل به‌صورت Interactive

```
sftp user@server
```

بعد:

```
sftp>
```

مثلاً:

```
sftp> ls
sftp> cd /var/log
sftp> get app.log
sftp> put backup.tar.gz
sftp> mkdir backup
sftp> rm old.log
```

**کار اصلی:** یک Session مخصوص انتقال و مدیریت فایل.

---

# 🧠 تفاوت اصلی

به این شکل حفظش کن:

```
             SSH
              │
      ┌───────┼────────┐
      │       │        │
     ssh     scp      sftp
      │       │        │
    Shell    Copy    File Session
      │       │        │
   Command   File    Upload
   Execute   Transfer Download
                    Manage
```

### اگر بخواهم خیلی خلاصه بگویم:

```
ssh  → «برو داخل سرور»
scp  → «این فایل را بفرست/بگیر»
sftp → «بیا با فایل‌های سرور کار کنیم»
```
