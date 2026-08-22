# 03-global and local variables
# 03-بریم سراغ متغیر هایه گلوبال و محلی 
---
# متغیر global و local چیست و درکجا استفاده میشود؟
ا-<mark>**Local variable**</mark> یعنی یک متغیر که فقط در یک بخش محدود از برنامه قابل استفاده است؛ نه همه‌جای اسکریپت.در Bash معمولاً منظور از «بخش محدود» یک **تابع (function)** است.

ا-<mark> **Global variable** </mark>یا **متغیر سراسری**، متغیری است که در بخش‌های مختلف اسکریپت قابل دسترسی است.
یعنی اگر بیرون یک function بسازی، معمولاً هم **بیرون تابع** و هم **داخل تابع‌ها** می‌توانی از آن استفاده کنی.
```bash
name="Ali"   # متغیر سراسری (global)

say_hello() {
    local age=20   # متغیر محلی (local)
    
    echo "Name: $name"
    echo "Age: $age"
}

say_hello

echo "Age outside function: $age"
----
output -->
Name: Ali
Age: 20
Age outside function:
```
---
# پس متغیر محلی و سراسری چی شد:
- متغیر محلی (local variable):متغیری که فقط درون همون تابع قابل استفاده است
- متغیر سراسری(global variable): متغیری که در همه جایه قابل استفاده است
---
# چجوری میشه متغیر محلی و سراسری درست کرد و محل قرارگیری هر کدوم کجاست:
- ا-<mark>global variable</mark> جایه متغیر سراسری میتونه هر جایی درون اسکریپت باشد ولی معمولا اون رو در اول اسکریپت تعریف میکنند 
- ا-<mark>local variable</mark> متغیر محلی درون تابع تعریف میشود و فقط برایه همون تابع قابل استفاده است.
```bash
#!/usr/bin/env bash

site_name="My Website"   # global variable

show_info() {
    local user_name="Tafavote"  # local variable

    echo "Site: $site_name"
    echo "User: $user_name"
}

show_info

```
