جمع‌بندی خیلی خلاصه:

Special Permission	توضیح یک‌خطی	روش تنظیم
SUID	فایل اجرایی با Permissionهای Owner فایل اجرا می‌شود.	chmod 4xxx file یا chmod u+s file
SGID	فایل اجرایی با Group فایل اجرا می‌شود؛ روی Directory، Group فایل‌های جدید را به ارث می‌دهد.	chmod 2xxx file یا chmod g+s file
Sticky Bit	در Directory مشترک، کاربر فقط می‌تواند فایل خودش را حذف یا rename کند.	chmod 1xxx directory یا chmod +t directory
حفظی‌ترین حالت:
SUID       → Owner  → 4
SGID       → Group  → 2
Sticky Bit → Delete/Rename → 1

مثلاً:

chmod 4755 file       # SUID
chmod 2755 file       # SGID
chmod 1777 directory  # Sticky Bit

و به شکل حروفی:

chmod u+s file
chmod g+s file
chmod +t directory

شکل Permission هم یادت باشه:

SUID       → rwsr-xr-x
SGID       → rwxr-sr-x
Sticky Bit → rwxrwxrwt
