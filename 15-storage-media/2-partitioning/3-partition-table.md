## ا-Partition Table چیست؟

ا-**Partition Table** یک جدول روی Disk است که اطلاعات مربوط به **Partitionهای دیسک** را نگه می‌دارد.

یعنی به سیستم‌عامل می‌گوید:

- چه Partitionهایی وجود دارند
- هر Partition از کجا شروع می‌شود
- کجا تمام می‌شود
- نوع Partition چیست
- اندازه و موقعیت آن چیست

مثلاً:

```
Disk
│
├── Partition 1 → 100 GB
├── Partition 2 → 200 GB
└── Partition 3 → 700 GB
```

اطلاعات این Partitionها در **Partition Table** ثبت می‌شود.

### انواع اصلی Partition Table

|نوع|توضیح|
|---|---|
|**MBR**|قدیمی؛ محدودیت‌هایی مثل حداکثر ۴ Primary Partition دارد|
|**GPT**|جدیدتر؛ مناسب Diskهای بزرگ و تعداد Partition بیشتر|

### ۳ نکته مهم

1. ا-**Partition Table با Filesystem فرق دارد**؛ Partition Table فقط ساختار Partitionها را مشخص می‌کند، نه فایل‌های داخل آنها.
2. ا-**MBR و GPT دو نوع Partition Table هستند.**
3. ابزارهای مهم برای بررسی آن:
    
    ```
    lsblk
    fdisk -l
    parted -l
    ```
    

### خلاصه

```
Disk
 ↓
Partition Table
 ↓
Partitionها
 ↓
Filesystem
 ↓
Files
```

**یعنی Partition Table نقشه‌ی Partitionهای Disk است.**
