# Share folder between host(windows)&guest(virtual os)


### همانطور که از اسمه فایل مشخصه این قسمت میریم درمورد این صحبت کنیم که چجوری میشه از هاست (host)(windows)یا سیستم عامل اصلی نصب رویه سیستم خودمون فایلی رو رویه اون سیستم عاملی که رویه ماشین مجازی(guest) است به اشتراک بزاریم. 
## قبل شروع==>هاست یعنی میزبان واینجا ویندوز اون سیستم عامل میزبان یا هاست است گست هم میشه مهمان و اینجا اون سیستم عامل لینوکس مهمان است رویه هاست ما.

#### کارهایی که باید قبل رفتن به ترمینال بکنید:


- 1Edit Virtual Machine Settings: Open the virtual machine settings.
- 2Select Options: In the settings window, you will see two tabs at the top: Hardware and Options. Click on the Options tab.
- 3Configure Folder Sharing: Navigate to the “Shared Folders” section. You will see three modes:
Disable
Always enabled
Enable until next power off or suspend
Click on “Always enabled”.
- 4Add Folder: Click the Add button and select the folder you want to share from your host machine.

#### حالا که این 4 کاره بالا رو انجام داید میریم سراغه تنظمات ترمینال و کد هایه درون ترمینال--->
**نکته** این نکته رو مد نظر بگیرید که هر فولدری که از روی هاست بخوای بیاری رویه مهمان یا لینوکستون 2 حالت دارد-->

**حالات 1-->**اگر تنظیماتش اوکی باشه درون دو پوشه:
- /mnt/hgfs & /media/hgfs


**حالت 2-->**حالات بعدی اینه که تنظیمات تنظیم نشده و باید هم پوشه hgfs رو بسازید هم وهم اگر میخواهی به صورت همیشگی هر فولدری که ادد میکنی بیاد درون مسیر (mnt/hgfs/) باید اون رو بزاری درون مسیر(etc/fstab/)

- 5sudo apt update
- 6sudo apt install open-vm-tools

- 7sudo mkdir -p /mnt/hgfs
- 8sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other
- 9sudo nano /etc/fstab--->alt + / mizani miri akhare khat-->add this text at last /etc/fstab:---->
- add this(in fstab filesystem)-->.host:/    /mnt/hgfs    fuse.vmhgfs-fuse    defaults,allow_other    0    0

![shared folder location](option-image/Screenshot%20(308).png)

--- 
### رخ نهایی کار به این صورت میشه اون فولدری که خواستید مونت شد
![final](option-image/Screenshot%20(76).png)










