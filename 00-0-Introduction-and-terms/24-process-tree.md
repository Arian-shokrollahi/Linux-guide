# process tree with 
---
## ما برایه دیدن درختی پردازش ها چیکار میکنیم
# Process Tree

یکی از حالت‌های خیلی مهم:

```
ps aux --forest
```

مثلاً:

```
root
 ├─ systemd
 │   ├─ sshd
 │   │   └─ bash
 │   │       └─ python
 │   └─ cron
 └─ ...
```

این برای فهمیدن parent/child relationship فوق‌العاده است.
