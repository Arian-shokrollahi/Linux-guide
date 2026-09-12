### اMBR چیست؟

ا-**MBR (Master Boot Record)** یک روش قدیمی برای **Partition بندی Disk** است که اطلاعات Partitionها را در ابتدای دیسک نگه می‌دارد.

در MBR حداکثر **۴ Primary Partition** داریم.

### Primary / Extended / Logical

|نوع|توضیح|
|---|---|
|**Primary**|Partition اصلی؛ در MBR حداکثر ۴ تا می‌توان داشت.|
|**Extended**|یک Primary خاص که داخل خودش می‌تواند چند **Logical Partition** داشته باشد.|
|**Logical**|Partitionهایی هستند که داخل Extended ساخته می‌شوند و برای دور زدن محدودیت ۴ Partition در MBR استفاده می‌شوند.|

مثلاً:

```
MBR Disk
│
├── Primary
├── Primary
├── Extended
│    ├── Logical
│    ├── Logical
│    └── Logical
└── Primary
```

پس یک نکته‌ی کلیدی:

> **در MBR → حداکثر ۴ Primary داریم؛ یا به‌جای یکی از آن‌ها Extended می‌سازیم و داخل Extended چندین Logical قرار می‌دهیم.**

این محدودیت‌ها مربوط به **MBR** هستند؛ **GPT** ساختار متفاوت و بسیار انعطاف‌پذیرتری دارد.
