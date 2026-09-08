# init and systemd
---
### ا-`init` و `systemd` چی هستند؟

هر دو **سیستم init** هستند؛ یعنی Process اصلی‌ای که هنگام Boot شدن Linux اجرا می‌شود و **Processها و Serviceهای سیستم را مدیریت می‌کند**.

در سیستم‌های قدیمی:

```
Kernel
  ↓
init (PID 1)
```

در اکثر Linuxهای امروزی:

```
Kernel
  ↓
systemd (PID 1)
  ├── sshd
  ├── nginx
  ├── cron
  └── ...
```

یعنی **`systemd` جایگزین مدرن `init` شده است**.

پس:

> ا-`init` = مفهوم/سیستم قدیمی مدیریت startup و Processها  
> ا-`systemd` = سیستم مدرن که معمولاً نقش `init` را انجام می‌دهد و PID 1 است.

برای دیدنش:

```
ps -p 1 -f
```

معمولاً می‌بینی:

```
PID  CMD
1    /sbin/init
```

ممکنه `/sbin/init` ببینی ولی در واقع به `systemd` اشاره کند.
