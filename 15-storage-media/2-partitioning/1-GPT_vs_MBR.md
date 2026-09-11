# ا-GPT و MBR چیست؟

وقتی یک Disk جدید داریم، قبل از اینکه Partition بسازیم، باید مشخص کنیم **ساختار Partition Table** آن چگونه باشد.

ا-**Partition Table** یک جدول در ابتدای Disk است که به سیستم‌عامل می‌گوید:

- چند Partition وجود دارد؟
- هر Partition از کجا شروع می‌شود؟
- کجا تمام می‌شود؟
- اندازه هر Partition چقدر است؟

دو نوع اصلی Partition Table:

1. **MBR (Master Boot Record)**
2. **GPT (GUID Partition Table)**

---

# 2) ا-MBR چیست؟

ا-**MBR = Master Boot Record**

یک روش قدیمی برای مدیریت Partitionهای Disk است که از دهه 1980 وجود دارد.

ساختار MBR در ابتدای Disk قرار می‌گیرد:

```
Disk

+----------------+
| MBR            |
| Boot Code      |
| Partition Table|
+----------------+
| Partition 1    |
| Partition 2    |
| Partition 3    |
| Partition 4    |
+----------------+
```

ا-MBR اطلاعات Partitionها را در خود نگه می‌دارد.

---

## محدودیت‌های MBR

### 1) محدودیت تعداد Partition

MBR فقط:

```
4 Primary Partition
```

دارد.

مثال:

```
Disk
 |
 +-- Primary 1
 |
 +-- Primary 2
 |
 +-- Primary 3
 |
 +-- Primary 4
```

اگر بیشتر بخواهیم، باید از:

```
Extended Partition
```

استفاده کنیم.

---

### 2) محدودیت حجم Disk

ا-MBR با آدرس‌دهی 32 بیتی کار می‌کند.

حداکثر:

```
حدود 2TB
```

ا-Disk را پشتیبانی می‌کند.

مثلاً:

```
4TB HDD
```

با MBR نمی‌تواند تمام ظرفیت را استفاده کند.

---

# 3) ا-GPT چیست؟

ا-**GPT = GUID Partition Table**

یک استاندارد جدیدتر برای Partition بندی Disk است.

بخشی از استاندارد:

```
UEFI
```

است و جایگزین MBR شده است.

ساختار:

```
Disk

+----------------+
| Protective MBR |
+----------------+
| GPT Header     |
+----------------+
| Partition 1    |
| Partition 2    |
| Partition 3    |
| ...            |
+----------------+
| Backup GPT     |
+----------------+
```

ا-GPT علاوه بر ابتدای Disk، یک کپی پشتیبان در انتهای Disk هم نگه می‌دارد.

---

# 4) مزایای GPT

## 1) پشتیبانی از Diskهای بزرگ

ا-GPT می‌تواند Diskهای بسیار بزرگ‌تر از 2TB را مدیریت کند.

مثال:

```
20TB Disk
```

بدون مشکل.

---

## 2) تعداد Partition بیشتر

ا-GPT محدودیت 4 Partition ندارد.

معمولاً:

```
128 Partition
```

را بدون مشکل پشتیبانی می‌کند.

---

## 3) امنیت بیشتر

ا-GPT اطلاعات Partition Table را:

- در ابتدای Disk
- در انتهای Disk

ذخیره می‌کند.

اگر بخش اول خراب شود، Backup وجود دارد.

---

## 4) استفاده با UEFI

سیستم‌های جدید:

```
UEFI + GPT
```

هستند.

سیستم‌های قدیمی‌تر:

```
BIOS + MBR
```

بودند.

---

# 5) تفاوت GPT و MBR

|ویژگی|MBR|GPT|
|---|---|---|
|قدمت|قدیمی|جدید|
|نام کامل|Master Boot Record|GUID Partition Table|
|حداکثر Disk|حدود 2TB|بسیار بزرگ‌تر|
|تعداد Partition|4 Primary|معمولاً 128|
|Boot Mode|BIOS|UEFI|
|Backup Partition Table|ندارد|دارد|
|روش آدرس‌دهی|32-bit|64-bit|
|مناسب سرورهای جدید|کمتر|بیشتر|

---

# 6) GPT و MBR در لینوکس

برای دیدن نوع Partition Table:

```
fdisk -l
```

مثال:

```
Disklabel type: gpt
```

یا:

```
Disklabel type: dos
```

معنی:

```
gpt → GPT
dos → MBR
```

---

# 7) ساخت Partition با ابزارها

## fdisk

امروزه از GPT و MBR پشتیبانی می‌کند:

```
fdisk /dev/sdb
```

---

## gdisk

مخصوص GPT:

```
gdisk /dev/sdb
```

---

## parted

برای هر دو:

```
parted /dev/sdb
```

---

# 8) در سرور لینوکس کدام را انتخاب کنیم؟

امروزه تقریباً همیشه:

```
GPT
```

انتخاب بهتر است.

چون:

✅ ا-Diskهای بزرگ را پشتیبانی می‌کند  
✅ ا-Partition بیشتری دارد  
✅ با UEFI هماهنگ است  
✅ استاندارد جدید است

ا-MBR بیشتر برای:

- سیستم‌های قدیمی
- ا-BIOS قدیمی
- ا-Diskهای کوچک

استفاده می‌شود.

---

# 9) ارتباط GPT/MBR با Boot

وقتی سیستم روشن می‌شود:

## حالت قدیمی:

```
BIOS
 |
 v
MBR
 |
 v
Bootloader
 |
 v
Linux Kernel
```

---

## حالت جدید:

```
UEFI
 |
 v
GPT
 |
 v
EFI Partition
 |
 v
Bootloader
 |
 v
Linux Kernel
```

---

# چیزهایی که برای Linux Admin باید بلد باشی

مهم‌ترین نکات:

✅ بدان:

```
MBR = قدیمی
GPT = جدید
```

✅ محدودیت MBR:

```
2TB
4 Primary Partition
```

✅ مزایای GPT:

```
Disk بزرگ
Partition بیشتر
Backup Table
UEFI
```

✅ تشخیص:

```
fdisk -l
```

✅ ساخت:

```
gdisk
parted
fdisk
```

---

## خلاصه نهایی

```
MBR:
- قدیمی
- حداکثر 2TB
- 4 Primary Partition
- BIOS


GPT:
- جدید
- Diskهای بزرگ
- Partition بیشتر
- UEFI
- امن‌تر
```
