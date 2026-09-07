## مثال برایه دو مدل عددی و نمادین
---
```shell
# ==========================================
# تمرین chmod — Numeric و Symbolic
# ==========================================

# 1- ساخت یک File به اسم test.txt
touch test.txt

# 2- نمایش Permission اولیه فایل
ls -l test.txt

# خروجی نمونه:
# -rw-r--r-- 1 user user 0 Sep 7 16:00 test.txt


# ==========================================
# روش اول: Numeric
# ==========================================

# 3- دادن Permission 640 به فایل
# 6 = rw- → Owner
# 4 = r-- → Group
# 0 = --- → Others
chmod 640 test.txt

# 4- نمایش Permission بعد از chmod
ls -l test.txt

# خروجی:
# -rw-r----- 1 user user 0 Sep 7 16:00 test.txt


# ==========================================
# روش دوم: Symbolic
# ==========================================

# 5- اضافه کردن Execute به Owner
chmod u+x test.txt

# 6- اضافه کردن Write به Group
chmod g+w test.txt

# 7- اضافه کردن Read به Others
chmod o+r test.txt

# 8- نمایش Permission نهایی
ls -l test.txt

# خروجی:
# -rwxrw-r-- 1 user user 0 Sep 7 16:00 test.txt
```
