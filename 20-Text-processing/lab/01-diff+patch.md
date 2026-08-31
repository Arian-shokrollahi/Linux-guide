# 01-->diff+patch 
---
- 1- دستور diff + -y خطوط رو کنار هم نشون میده
- 2- دستور diff + -u خیلی خواناتره
- 3-تغییرات-->diff -u or -y old.txt new.txt
- 4-ساخت فایل تغییرات (patch file)-->diff -u old new > x.patch
- 5-اعمال تغییرات فایل تغییرات روی فایل قدیمی-->patch old new 
- 6-اعمال امن---> patch -b old new
- 7- برگردوندن فایل قبلی که اعمال امن روش شده-->patch -R old new
---
#### مراحل گرفتن تغییرات دو فایل و ریختن درون فایل patch و تغییر فایل patch رو فایل قدیمی که روش تغییر دادیم و الان میخوایم اون تغییر رو اعمال کنیم
```bash
### مرحله ۱: مشاهده تفاوت‌ها (اختیاری)

برای دیدن تفاوت‌ها کنار هم یا به شکل خطی:
1-
# نمایش ساده تفاوت‌ها
diff -u file_old.txt file_new.txt

# یا نمایش دو ستونه کنار هم (Side-by-side)
diff -y file_old.txt file_new.txt
=======================
### مرحله ۲: ساخت فایل تغییرات (Patch File)

`diff -u file_old.txt file_new.txt > changes.patch`
=======================
### مرحله ۳: اعمال تغییرات روی فایل اصلی

`patch file_old.txt changes.patch`

> after up command --> file_old.txt==patch file mishe
```

## نکته سوپر مهم:
1- شما وقتی دستور-->patch file_old.txt changes.patch فایل قدیمی برابر اون فایلی میشه که با دستور --->diff -u file_old.txt file_new.txt > changes.patch اون فایل جدیده حالا شما همیشه حواستون باشد که در هنگام patch گرفتن یه بک اپ بگیرید از فایل قدیمی که قراره patch شه
```bash
1-   patch -b file_old.txt changes.patch
--->for undo
2-   patch -R file_old.txt changes.patch
```

1- شما وقتی از گزینه -b در patch استفاده فایل میسازه با پسوند orig.--->file_old.txt.orig که بک اپی مییگره از فایل قدیمی که قرار patch روش اعمال شه اینطوری با خیال راحت patch رو اعمال میکنید




---
## مثال فکر کنید یه فایل بیسی دارید که حجمش زیاده حالا فکر کنید که شما تغییراتی دادید و نمیخواید فایل رو کامل پاک کنید و اونو کپی کنید و میخواهید فقط تغییراتش رو اعمال کنید delta اون رو اعمال کنید :
- -->برایه گرفتن دلتا (تغییرات نسخه جدید به قدیم)--->command diff
- -->برایه اعمال اون فایل تغییرات(patch file)به قدیم--->command patch
- 
