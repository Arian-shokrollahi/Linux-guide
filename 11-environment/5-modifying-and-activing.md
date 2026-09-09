گر **Admin نیستی**، معمولاً باید تغییرات شخصی خودت را در:

```
~/.bashrc
```

انجام بدهی، نه در:

```
/etc/bash.bashrc
```

چون `.bashrc` فقط برای User خودت است.

مثلاً:

```
nano ~/.bashrc
```

اضافه می‌کنی:

```
alias ll='ls -la'
export MYVAR="hello"
```

بعد برای اینکه تغییرات بدون بستن Terminal فعال شوند:

```
source ~/.bashrc
```

یا کوتاه‌تر:

```
. ~/.bashrc
```

دقت کن دستور درست این است:

```
source ~/.bashrc
```

نه:

```
source ./~bashrc
```

چون:

- `~` یعنی Home Directory کاربر
- `./` یعنی همین مسیر فعلی

پس:

```
~/.bashrc
```

یعنی:

```
/home/username/.bashrc
```

---

مثال کامل:

1. ویرایش:

```
nano ~/.bashrc
```

اضافه کن:

```
# My custom alias
alias ll='ls -lah'
```

2. ذخیره کن.
3. فعال کن:

```
source ~/.bashrc
```

4. تست:

```
ll
```

حالا Alias فعال است.

---

یک نکته مهم:

`source` فقط فایل را دوباره در **همان Shell فعلی** اجرا می‌کند.  
اگر Terminal جدید باز کنی، Bash خودش `.bashrc` را دوباره می‌خواند.

پس روند معمول:

```
Modify ~/.bashrc
        ↓
source ~/.bashrc
        ↓
Changes active
```

این روش استاندارد برای کاربران عادی Linux است.
