### تفاوت `chmod`، `chown` و `chgrp`

- ا-**`chmod`** → دسترسی‌ها (Permission) را تغییر می‌دهد.  
    یعنی مشخص می‌کند Owner، Group و Others چه کارهایی می‌توانند انجام دهند: `r / w / x`
- ا-**`chown`** → مالک (Owner) فایل یا پوشه را تغییر می‌دهد.  
    همچنین می‌تواند Group را هم تغییر دهد.
- ا-**`chgrp`** → فقط Group فایل یا پوشه را تغییر می‌دهد.

خلاصه:

|دستور|کاری که تغییر می‌دهد|
|---|---|
|`chmod`|🔐 Permission|
|`chown`|👤 Owner + Group|
|`chgrp`|👥 فقط Group|

مثلاً اگر داشته باشیم:

`-rw-r--r-- ali developers test.txt`

- `chmod` → `rw-r--r--` را تغییر می‌دهد.
- `chown` → `ali` یا `developers` را تغییر می‌دهد.
- `chgrp` → فقط `developers` را تغییر می‌دهد.
