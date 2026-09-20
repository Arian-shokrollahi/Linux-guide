# archiving and this unit road map

### 1. اول مفهوم را بفهم

قبل از commandها این تفاوت را کاملاً جا بنداز:

```
Archive
→ چند فایل را در یک مجموعه قرار می‌دهد

Compression
→ حجم داده را کاهش می‌دهد

Backup
→ یک نسخه قابل بازیابی از داده ایجاد می‌کند
```

مثلاً:

```
/home/arian/project/
        │
        ├── a.txt
        ├── b.txt
        └── c.txt
             │
             ▼
          tar archive
             │
             ▼
       project.tar
             │
             ▼
       compression
             │
             ▼
      project.tar.gz
```

---

## 2. `tar` ← مهم‌ترین بخش

اینجا باید عمیق کار کنی.

یاد بگیر:

```
tar -cf
tar -xf
tar -tf
tar -czf
tar -xzf
tar -cjf
tar -xjf
tar -cJf
tar -xJf
```

و مفاهیم:

- create
- extract
- list
- append
- exclude
- verbose
- archive کردن directory
- انتخاب محل خروجی
- compression با `gzip`
- compression با `bzip2`
- compression با `xz`

---

## 3. Compression algorithms

بعد از اینکه `tar` را فهمیدی، برو سراغ:

### gzip

```
file
 ↓
gzip
 ↓
file.gz
```

### bzip2

```
file
 ↓
bzip2
 ↓
file.bz2
```

### xz

```
file
 ↓
xz
 ↓
file.xz
```

اینجا لازم نیست فعلاً وارد جزئیات ریاضی الگوریتم‌ها بشی؛ بیشتر **نحوه استفاده، تفاوت‌ها، سرعت و compression ratio** را بفهم.

---

# 4. ترکیب `tar` + compression

این قسمت خیلی مهمه چون در Linux دائماً می‌بینی:

```
.tar
.tar.gz
.tgz
.tar.bz2
.tar.xz
```

مثلاً:

```
tar -czf backup.tar.gz /home/arian
```

یعنی:

```
/home/arian
     ↓
   tar
     ↓
 backup.tar
     ↓
  gzip
     ↓
backup.tar.gz
```

این مفهوم را باید **کاملاً** بفهمی.

---

# 5. `zip` / `unzip`

بعد برو سراغ:

```
zip
unzip
```

چون در Linux/Windows و انتقال فایل بین سیستم‌ها زیاد با `.zip` مواجه می‌شوی.

ولی از نظر Linux administration، **`tar` برایت مهم‌تر است.**

---

# 6. `rsync` ← خیلی مهم

اینجا از Archiving وارد دنیای واقعی Backup می‌شوی.

مثلاً:

```
rsync -av /home/arian/ /backup/arian/
```

اینجا دیگر صرفاً archive نمی‌سازی؛ داری **داده را synchronize** می‌کنی.

بعداً:

```
rsync
 ├── local → local
 ├── local → remote
 ├── remote → local
 ├── incremental synchronization
 ├── SSH
 └── backup
```

و این برای SysAdmin/DevOps بسیار مهم است.
