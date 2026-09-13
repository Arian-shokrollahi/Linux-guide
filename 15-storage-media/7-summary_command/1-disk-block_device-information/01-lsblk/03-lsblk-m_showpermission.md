### ا-`lsblk -m`

**مقدمه:**  
ا-`lsblk -m` برای نمایش **سطح دسترسی (Permissions)، مالک (Owner) و گروه (Group)** مربوط به Block Deviceها استفاده می‌شود.

### تحلیل ستون‌ها

|ستون|معنی|کاربرد|
|---|---|---|
|`NAME`|نام Device|شناسایی دیوایس|
|`SIZE`|اندازه|حجم دیوایس|
|`OWNER`|مالک|مشخص می‌کند چه Userای مالک است|
|`GROUP`|گروه|مشخص می‌کند عضو چه Groupای است|
|`MODE`|Permission|نمایش سطح دسترسی مثل `brw-rw----`|

```
lsblk -m
# > Show permissions, owner and group of block devices
```

**کاربرد اصلی:** بررسی **Permission و مالکیت Block Deviceها**.

---
## اگر نگاه کنید در قسمت permission یا دسترسی ها نشون میده که کاراکتر اولش که همون فایل مود بود b گفتیم کارکتر اول نشون دهنده نوع اونه که اینجا block device