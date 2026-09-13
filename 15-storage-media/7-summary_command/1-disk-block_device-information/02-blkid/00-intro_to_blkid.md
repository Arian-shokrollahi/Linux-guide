blkid

blkid برای نمایش اطلاعات شناسایی Block Deviceها و Filesystem استفاده می‌شود؛ مثل UUID، LABEL و TYPE.

به‌خصوص برای پیدا کردن UUID پارتیشن‌ها و استفاده در /etc/fstab کاربرد دارد.

Switchهای مهم
Switch	کاربرد
-o	مشخص کردن نوع خروجی
-s	نمایش فقط یک مشخصه خاص
-L	پیدا کردن Device بر اساس LABEL
-U	پیدا کردن Device بر اساس UUID
-w	تعیین فایل cache برای blkid
۳ Switch پرکاربرد
blkid -o value /dev/sda1
# > Show only values without attribute names
blkid -s UUID /dev/sda1
# > Show only the UUID
blkid -L DATA
# > Find the device with the specified LABEL
دو نکته مهم
blkid بیشتر برای شناسایی Filesystem و UUID استفاده می‌شود، نه نمایش ساختار درختی دیسک‌ها.
برای کار با /etc/fstab، دانستن UUID با blkid خیلی مهم است