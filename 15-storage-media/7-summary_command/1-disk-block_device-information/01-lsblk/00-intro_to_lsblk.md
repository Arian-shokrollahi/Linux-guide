
### ا-`lsblk`

ا-`lsblk` مخفف **List Block Devices** است و برای نمایش دیسک‌ها، پارتیشن‌ها و اطلاعات مربوط به Block Deviceها در Linux استفاده می‌شود.

- ا-<mark>**Block Device** یعنی دستگاهی که داده‌ها را به صورت **Blockهای قابل آدرس‌دهی** می‌خواند و می‌نویسد؛ مثل **HDD، SSD و USB**.</mark>

|Switch|توضیح کوتاه|
|---|---|
|`lsblk -a`|نمایش تمام Block Deviceها، حتی مواردی که معمولاً پنهان هستند|
|`lsblk -f`|نمایش اطلاعات Filesystem مثل `FSTYPE`, `UUID`, `LABEL` و Mount Point|
|`lsblk -m`|نمایش Permission، Owner و Group مربوط به Deviceها|
|`lsblk -p`|نمایش مسیر کامل Device مثل `/dev/sda1`|
|`lsblk -l`|نمایش Deviceها به صورت List به جای ساختار درختی|
|`lsblk -o NAME,SIZE,TYPE`|انتخاب ستون‌هایی که می‌خواهی نمایش داده شوند|
|`lsblk -n`|حذف Header ستون‌ها|
|`lsblk -r`|نمایش خروجی به صورت ساده و غیر درختی|
|`lsblk -t`|نمایش اطلاعات مربوط به Device Topology|
|`lsblk -S`|نمایش اطلاعات SCSI Deviceها|

### دو Switch پرکاربرد

```
lsblk -f
```

> **Show filesystem information for block devices**

```
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
```

> **Show selected block-device information**

---

### خلاصه ستون‌های مهم `lsblk`

| Column        | معنی                                 |
| ------------- | ------------------------------------ |
| `NAME`        | نام Block Device                     |
| `MAJ:MIN`     | Major و Minor Device Number          |
| `RM`          | قابل Removable بودن Device           |
| `SIZE`        | اندازه Device                        |
| `RO`          | Read-Only بودن Device                |
| `TYPE`        | نوع Device مثل `disk`, `part`, `lvm` |
| `FSTYPE`      | نوع Filesystem مثل `ext4`, `xfs`     |
| `LABEL`       | Label مربوط به Filesystem            |
| `UUID`        | شناسه یکتای Filesystem               |
| `MOUNTPOINTS` | محل Mount شدن Filesystem             |

---
# سوییچ هایه زیادی دارد من درمورد فقط اون هایی که پرکاربرده بهتون توضیح میدم