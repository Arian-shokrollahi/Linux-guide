### ا-Partition Number چیست؟

ا-**Partition Number شماره‌ای است که به هر Partition روی یک Disk داده می‌شود تا بتوان آن Partition را شناسایی کرد.**

مثلاً:

```
/dev/sda1 → Partition Number = 1
/dev/sda2 → Partition Number = 2
/dev/sda3 → Partition Number = 3
```

در واقع:

```
/dev/sda1
   │  │
   │  └── Partition Number
   └───── Disk
```

در NVMe هم:

```
/dev/nvme0n1p1
             │
             └── Partition Number = 1
```

**نکته:** Partition Number به‌خودی‌خود نشان نمی‌دهد Partition از چه نوعی است؛ مثلاً `1` می‌تواند Primary یا در شرایط مناسب Logical باشد.

**خلاصه:**

> ا-**Partition Number = شماره‌ی شناسایی یک Partition روی Disk.**
