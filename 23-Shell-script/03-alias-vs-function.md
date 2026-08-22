# Interesting point alias vs shell function
---
# ا-<mark>alias vs shell script function</mark>
همان‌طور که قبلاً گفتیم، **alias** یک میانبر (shortcut) است که می‌توانیم برای دستورها یا برنامه‌ها بسازیم.
برای دائمی‌شدن، آن را در فایل `~/.bashrc` قرار میدادیم به این صورت
```
texteditor(vim,nano) ~/.bashrc
go to last line--->> alias shortcut='old-command'
save + exit
--
. .bashrc or source ~/.bashrc
```
خب این قابلیت عالی بود که دستور alias به ما میداد ولی برایه حرفه ای بودن ، یک دستور رو به روش دلخواه بتونیم در بیاریم کافی نیست و باید بتونیم چند دستور، شرط، حلقه، متغیر و آرگومان رو با ترتیبی که دوست داریم و کارهایی که میخوایم بتونیم درست کنیم و کنار هم قرار دهیم  که در این فصل فهمیدم که توسط اسکریپت و تابع هایه درون اون فهمیدیم که چقد میتونیم کارهایه زیادی کنیم و چقدر لینوکس سیستم عامل انعطاف پذیریه.

---
ا-**Alias = میانبرِ یک دستور**

ا-**Shell Function = یک دستور شخصی که می‌تواند شامل منطق و چندین دستور باشد.**

---
# مثال میخوایم برنامه ای درست کنیم به اسم d که فضایه دیسک رو به صورت قابل خواندن برایه انسان در خروجی چاپ کند
```bash
cd bin
---
~/$bin
---
cat > d
#!/bin/bash 

d () {
	echo "disk space utilizaion for $HOSTNAME"
}
---
~$d
output--->
Disk space utilization for DESKTOP-1FVO61D
Filesystem      Size  Used Avail Use% Mounted on
rootfs          119G   81G   39G  68% /
none            119G   81G   39G  68% /dev
none            119G   81G   39G  68% /run
none            119G   81G   39G  68% /run/lock
none            119G   81G   39G  68% /run/shm
none            119G   81G   39G  68% /run/user
tmpfs           119G   81G   39G  68% /sys/fs/cgroup
C:\             119G   81G   39G  68% /mnt/c
D:\             120G  2.7G  117G   3% /mnt/d
```
