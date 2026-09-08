# PPID
---
### ا-PPID چیست؟

ا-**PPID = Parent Process ID**

یعنی **PIDِ Processای که Process فعلی را ایجاد کرده است.**

مثلاً:

```
bash
PID = 1000
   │
   └── python
       PID = 1200
       PPID = 1000
```

اینجا:

- `python` → **PID = 1200**
- `python` → **PPID = 1000**
- `bash` → Parent Processِ `python` است.

برای دیدنش:

```
ps -f
```

مثلاً:

```
UID    PID   PPID   CMD
arian  1000     1   bash
arian  1200  1000   python
```

پس خیلی ساده:

>ا- **PID = خود Process کیست؟**  
> ا-**PPID = چه Processای آن را ساخته؟**

----
### در اکثر دستور هایی که برایه مانیتورینگ منابع شبکه و نشون دهنده ی پردازه هاست شما PPID میبینید که میگه در اون ستون PPID که اون پردازه رو چه پردازهای ای ساخته و چه پردازه ای والد اون هست
