# process tree with 
---
## ما برایه دیدن درختی پردازش ها چیکار میکنیم
# Process Tree

یکی از حالت‌های خیلی مهم:

```
ps aux --forest
```

مثلاً:

```bash
root
 ├─ systemd
 │   ├─ sshd
 │   │   └─ bash
 │   │       └─ python
 │   └─ cron
 └─ ...
```

این برای فهمیدن parent/child relationship فوق‌العاده است.

---
## و مدل دیگه با دستور pstree

```bash
─$ pstree
systemd─┬─agetty
        ├─cron
        ├─dbus-daemon
        ├─init-systemd(ka─┬─SessionLeader───Relay(177)───bash───pstree
        │                 ├─init───{init}
        │                 ├─login───bash
        │                 └─{init-systemd(ka}
        ├─systemd───(sd-pam)
        ├─systemd-journal
        ├─systemd-logind
        └─systemd-udevd
```