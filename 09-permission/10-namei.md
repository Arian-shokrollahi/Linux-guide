# namei command
---
## دستور namei برایه چی استفاده میشه
دستور `namei` برای بررسی **تک‌تک اجزای یک Path** استفاده می‌شود؛ مخصوصاً وقتی می‌خواهیم بفهمیم مشکل Permission در کدام قسمت مسیر است.

ساختار کلی:

```
namei [OPTIONS] PATH
```

مثلاً:

```
namei -l /home/ali/test/file.txt
```
---

### Switchهای مهم

|Switch|کاربرد|
|---|---|
|`-l`|نمایش Permission، Owner و Group هر قسمت مسیر|
|`-m`|نمایش Permissionها به شکل mode|
|`-x`|عبور از mount pointها را دنبال می‌کند|
|`-o`|نمایش Owner و Group|
|`-n`|نمایش عددی UID و GID|

---

### یک مثال و تست Switchها

فرض کن داریم:

```
/home/ali/test/file.txt
```

```
# بررسی معمولی Path
namei /home/ali/test/file.txt

# -l → نمایش Permission و Owner/Group
namei -l /home/ali/test/file.txt

# -m → نمایش modeهای Permission
namei -m /home/ali/test/file.txt

# -x → دنبال کردن mount pointها
namei -x /home/ali/test/file.txt

# -o → نمایش Owner و Group
namei -o /home/ali/test/file.txt

# -n → نمایش UID و GID به صورت عددی
namei -n /home/ali/test/file.txt
```

**مهم‌ترین چیزی که برای درس Permission فعلاً حفظ کن:**

```
namei -l /path/to/file
```

چون با آن می‌توانی ببینی:

```
/          → Permission
home       → Permission
ali        → Permission
test       → Permission
file.txt   → Permission
```

و سریع متوجه شوی **کدام قسمت Path باعث `Permission denied` شده است.**
