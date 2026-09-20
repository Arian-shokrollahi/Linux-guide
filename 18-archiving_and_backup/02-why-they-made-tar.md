### فلسفه‌ی قضیه

فرض کن فقط **یک فایل** داری:

```
access.log
```

این فایل خودش یک واحد مستقل است. اگر فقط می‌خواهی حجمش را کم کنی، نیازی به `tar` نداری:

```
gzip access.log
```

نتیجه:

```
access.log
    ↓
  gzip
    ↓
access.log.gz
```

اینجا `gzip` مستقیماً روی همان یک فایل کار می‌کند.

---

اما حالا فرض کن چند فایل و directory داری:

```
project/
├── app.py
├── config.conf
├── README.md
└── logs/
    ├── access.log
    └── error.log
```

اگر بخواهی این مجموعه را به عنوان **یک واحد** جابه‌جا، backup یا نگهداری کنی، بهتر است اول آن‌ها را داخل یک archive قرار بدهی.

اینجاست که `tar` وارد می‌شود:

```
app.py
config.conf
README.md
logs/
   ↓
  tar
   ↓
project.tar
```

ا-`tar` در اصل می‌گوید:

> «این چند فایل و directory را بردار و همه را داخل یک archive قرار بده.»

بعد اگر بخواهی حجم آن archive را هم کم کنی:

```
project/
   ↓
 tar
   ↓
project.tar
   ↓
 gzip
   ↓
project.tar.gz
```

پس فلسفه را این‌طور حفظ کن:

```
یک فایل
   ↓
gzip
   ↓
file.gz
```

ولی:

```
چند فایل / directory
   ↓
tar
   ↓
archive.tar
   ↓
gzip
   ↓
archive.tar.gz
```

### چرا مستقیماً `gzip` نکنیم؟

چون `gzip` **archive ساز نیست**؛ وظیفه‌اش compression است.

یعنی این:

```
gzip file1 file2 file3
```

قرار نیست چیزی مثل این بسازد:

```
backup.gz
├── file1
├── file2
└── file3
```

بلکه فایل‌ها را جداگانه gzip می‌کند:

```
file1.gz
file2.gz
file3.gz
```

اما:

```
tar -czf backup.tar.gz file1 file2 file3
```

یک مجموعه‌ی واحد می‌سازد:

```
             backup.tar.gz
                    │
                 gzip
                    │
                backup.tar
                    │
          ┌─────────┼─────────┐
        file1     file2     file3
```

**پس یک جمله‌ی خیلی مهم برای `Linux-guide` تو:**

> ا-**`tar` برای بسته‌بندی (archiving) چند فایل و directory در یک مجموعه است؛ `gzip` برای فشرده‌سازی داده است. وقتی چند فایل را هم می‌خواهیم یک‌جا بسته‌بندی کنیم و هم فشرده کنیم، از `tar + gzip` یعنی `tar.gz` استفاده می‌کنیم.**
