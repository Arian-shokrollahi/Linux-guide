### مقدمه: Search for Files یعنی چی؟

در لینوکس معمولاً دنبال یکی از این‌ها هستیم:

1. **پیدا کردن خود فایل یا directory بر اساس اسم/مسیر** → `find`
2. **پیدا کردن سریع فایل بر اساس database** → `locate`
3. **پیدا کردن یک متن/الگو داخل فایل‌ها** → `grep`
4. **پیدا کردن فایل‌های اجرایی در PATH** → `which` / `type`
5. **پیدا کردن command یا فایل‌های مرتبط با package** → `whereis`

برای کار روزمره، این‌ها را این‌طور در ذهنت دسته‌بندی کن:

```
          Search
             │
     ┌───────┴────────┐
     │                │
  File/Dir           Content
     │                │
   find             grep
   locate
     │
 ┌───┴────┐
 │        │
which   whereis
```

---

### . `find`

برای پیدا کردن فایل‌ها و directoryها در filesystem استفاده می‌شود و می‌توانی بر اساس اسم، نوع، حجم، زمان و... جستجو کنی.

```
find /etc -name "nginx.conf"
```

> Find a file by name

### 2. `grep`

برای پیدا کردن یک متن یا pattern داخل فایل‌ها استفاده می‌شود؛ مخصوصاً برای بررسی configuration و logها خیلی کاربردی است.

```
grep "PermitRootLogin" /etc/ssh/sshd_config
```

> Search text inside a file

### 3. `locate`

برای پیدا کردن سریع فایل بر اساس نام استفاده می‌شود و به‌جای جستجوی مستقیم filesystem از database استفاده می‌کند.

```
locate nginx.conf
```

> Quickly locate a file

### 4. `type`

مشخص می‌کند یک command دقیقاً چه نوعی است و Shell آن را از کجا/به چه شکلی اجرا می‌کند؛ مثلاً `alias`، `builtin` یا executable.

```
type cd
```

> Check the command type

### 5. `which`

مسیر executableای را که Shell برای اجرای یک command پیدا می‌کند نمایش می‌دهد.

```
which python
```

> Find the executable path

---
```
Search for Files
│
├── ⭐⭐⭐ find
│   ├── -name / -iname
│   ├── -type
│   ├── -size
│   ├── -user / -group
│   ├── -perm
│   ├── -mtime / -mmin
│   ├── -maxdepth
│   └── -exec
│
├── ⭐⭐⭐ grep
│   ├── -i
│   ├── -r
│   ├── -n
│   ├── -v
│   ├── -w
│   └── -l
│
├── ⭐⭐ locate
│   └── updatedb
│
├── ⭐⭐ which
│
├── ⭐⭐ type
│
└── ⭐ whereis
```
