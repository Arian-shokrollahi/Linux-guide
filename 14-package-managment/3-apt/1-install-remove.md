در Ubuntu برای **نصب و حذف Package** مهم‌ترین دستورات `apt` این‌ها هستند:

|دستور|کاربرد|مثال|
|---|---|---|
|`sudo apt install <package>`|نصب Package|`sudo apt install nginx`|
|`sudo apt remove <package>`|حذف خود Package، ولی معمولاً Configuration را نگه می‌دارد|`sudo apt remove nginx`|
|`sudo apt purge <package>`|حذف Package به همراه Configuration آن|`sudo apt purge nginx`|
|`sudo apt autoremove`|حذف Dependency هایی که دیگر موردنیاز نیستند|`sudo apt autoremove`|
|`sudo apt reinstall <package>`|نصب دوباره Package|`sudo apt reinstall nginx`|

### تفاوت مهم `remove` و `purge`

```
remove
↓
Package حذف می‌شود
Configuration معمولاً باقی می‌ماند
```

```
purge
↓
Package حذف می‌شود
Configuration مربوط به Package هم حذف می‌شود
```

مثلاً:

```
sudo apt remove nginx
```

در مقابل:

```
sudo apt purge nginx
```

### نصب چند Package همزمان

```
sudo apt install nginx vim curl
```

### حذف چند Package همزمان

```
sudo apt remove nginx vim
```

### نکته مهم

برای نصب یا حذف Package های سیستمی معمولاً به دسترسی Administrator نیاز داری، به همین دلیل از `sudo` استفاده می‌کنیم:

```
sudo apt install <package>
```

**برای شروع این ۴ دستور را حتماً حفظ کن:**

```
sudo apt install <package>
sudo apt remove <package>
sudo apt purge <package>
sudo apt autoremove
```
