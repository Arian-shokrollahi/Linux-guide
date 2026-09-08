# suffix ID
---
### 1. PID — Process ID

شناسه‌ی **خود Process** است.

```
bash
PID = 1200
```

برای شناسایی و کنترل همان Process استفاده می‌شود:

```
kill 1200
```

---

### 2. PGID — Process Group ID

چند Process می‌توانند داخل یک **Process Group** باشند.

همه‌ی اعضای یک Group، یک `PGID` مشترک دارند:

```
PGID 2000
├── bash    PID 2000
├── vim     PID 2100
└── gcc     PID 2200
```

یعنی:

```
PID → یک Process
PGID → یک گروه از Processها
```

این موضوع مخصوصاً در **Job Control و Terminal** مهم است.

---

### 3. UID — User ID

مشخص می‌کند Process متعلق به **کدام User** است.

مثلاً:

```
PID   UID   COMMAND
1200  1000  firefox
```

یعنی این Process توسط User با UID `1000` اجرا شده.

UID برای **Permission و Security** مهم است.

---

### 4. GID — Group ID

مشخص می‌کند Process تحت **کدام Group** اجرا می‌شود.

مثلاً:

```
PID   UID   GID
1200  1000  1000
```

یعنی User و Group مربوط به Process مشخص شده‌اند.

---

### خلاصه

```
PID  → این Process کدام است؟
PGID → این Process عضو کدام Process Group است؟
UID  → متعلق به کدام User است؟
GID  → متعلق به کدام Group است؟
```

برای دیدنشان می‌توانی از `ps` استفاده کنی:
این سوییچ خیلی مهمیه در دستور ps
```
ps -o pid,ppid,pgid,uid,gid,cmd
```

این command برای فهمیدن رابطه‌ی **Process، Parent، Process Group، User و Group** خیلی خوبه.
