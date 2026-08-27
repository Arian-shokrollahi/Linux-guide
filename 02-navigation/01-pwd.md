# 01-pwd command
# 01-دستور pwd
---
## دستور pwd چیست؟
- ا-دستورpwd مخفف(print working directory) این دستور مسیر دایرکتوری فعلی شما رو نشون میده
- ا-`pwd` مسیر **مطلق** (_absolute path_) دایرکتوری فعلی را نشان می‌دهد؛ یعنی مسیر کامل از ریشهٔ لینوکس، تا اینجایی که هستی.
- مثال:1- من در مسیر: خانگی Arian-Shokrollahi و در فایل bin هستم
```bash
Arian-Shokrollahi@DESKTOP-1FVO61D:~/bin$
```
- ترمینال مسیر خانگی رو به صورت علامت ~نشون میده این یعنی
/home/bin
- نکته : کلا قسمت راست colon absolute path شما رو نشون میده میگه شما کجا هستید
- حالا دستور pwd رو میزنیم
```bash
Arian-Shokrollahi@DESKTOP-1FVO61D:~/bin$
--->output
pwd
--->output
/home/Arian-Shokrollahi/bin
```
---
## تفاوت pwd -L & pwd -P در چیست ؟
- ما با دستور pwd میتونیم دو مسیر رو نشون بدیم مسیر منطقی(logical)و مسیر فیزیکی(physical):
- -مسیر منطقی(pwd or pwd -L)مسیر منطقی و نرم افزاری رو نشون بدید
- -مسیر فیزیکی(pwd -P)این همان مسیر واقعی و فیزیکی رویه دیسک است
- مثال : ما اومدیم درون WSL(windows subsystem linux) برایه مسیر mnt/c/Users/Test/Pictures/Screenshots/ یه لینک نمادین یا symlink زدیم به مسیر خانگیمون  در فولدر scrshot حالا اگر شما برید درون scr shot بریم برسی کنیم مسیر منطقی و فیزیکی چیه
```bash
1-Arian-Shokrollahi@DESKTOP-1FVO61D:/mnt/c/Users/Test/Pictures/Screenshots$
2-ln -s /mnt/c/Users/Test/Pictures/Screenshots ~/scrshoot
3-cd ~/
4-Arian-shokrollahi@DESKTOP-1FV061D:~$ls -l
5-lrwxrwxrwx 1 Arian-Shokrollahi Arian-Shokrollahi    38 Aug  9 18:31 scrshoot -> /mnt/c/Users/Test/Pictures/Screenshots/
------
6-Arian-shokrollahi@DESKTOP-1FV061D:~/srcshoot$
Arian-Shokrollahi@DESKTOP-1FVO61D:~/scrshoot$ pwd
/home/Arian-Shokrollahi/scrshoot
Arian-Shokrollahi@DESKTOP-1FVO61D:~/scrshoot$ pwd -L
/home/Arian-Shokrollahi/scrshoot
Arian-Shokrollahi@DESKTOP-1FVO61D:~/scrshoot$ pwd -P
/mnt/c/Users/Test/Pictures/Screenshots
Arian-Shokrollahi@DESKTOP-1FVO61D:~/scrshoot$
```
- حالا نگاه بکنید pwd -L & pwd رو حتما pwd & pwd -L مسیر منطقی و نرم افزاری رو نشون میده از فولدر ریشه شما و حالا جوری که برایه نرم افزاری تنظیم شده نه مسیر دقیق دقیق رو نشون میده
- حالا pwd -P به شما مسیر فیزیکی رویه دیسک رو نشون میده
---
### در همین حد کافیه ولی اگر بیشتر خواستید بدونید درمورد دستور pwd به اسناد رسمی دستور pwd با دستور man pwd برید و ببنید که چیا نوشته ولی همین دوتاست کلا چیزایه مهم برایه دستور pwd
----
## پس دوره این دستور:
- دستور pwd -L-->دستوری است که مسیر منطقی و نرم افزاری رو نشون میده
- دستور pwd -p-->دستوری است که مسیر فیزیکی کامل رو نشون شما میده
- ا-<MARK>نکته:</MARK> پس چه فرقی است میان دستور pwd و دستور pwd -L  در اکثر توزیع ها pwd همون pwd -L است ولی این pwd -L رو برایه این درست کردن که اگر پیش فرقی رویه pwd -P بود شما با این دستور بتونید بریم رویه مسیر نرم افزاریه
