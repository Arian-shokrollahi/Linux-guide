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
---
# یه مثال اخری هم بزنیمو بریم باهم تحلیلش کنیم که هر قسمت چیست:
```bash
 1  #!/bin/bash
     2
     3  # local-vars: script to demonstrate local variables
     4
     5  foo=0  # global variable foo
     6
     7  funct_1() {
     8      local foo  # variable foo local to funct_1
     9      foo=1
    10      echo "funct_1: foo = $foo"
    11  }
    12
    13  funct_2() {
    14      local foo  # variable foo local to funct_2
    15      foo=2
    16      echo "funct_2: foo = $foo"
    17  }
    18
    19  echo "global:  foo = $foo"
    20  funct_1
    21  echo "global:  foo = $foo"
    22  funct_2
    23  echo "global:  foo = $foo"
    ---
    global:  foo = 0
funct_1: foo = 1
global:  foo = 0
funct_2: foo = 2
global:  foo = 0

```
- -در خط اول shebang تعریف شده که میگوید این برنامه توسط bash تفسیر میشود
- -در خط 5 یه global variable یا متغیر سراسری تعریف شده
- خط 7 و 13 دو تابع تعریف کردیم
-  و در هر کدون یه متغیر محلی local variable به اسمهfoo که فقط درون همون تابع معتبره و قابل دسترس 
-  همونطور که در خروجی مشاهده میکنید با اینکه هم اسم بودند اون متغیر هایه درون تابع ها با هم و با متغیر سراسری ولی تداخلی ایجاد نکردند چون گلوبال از هر جا قابل دسترسی است و محلی هم فقط برایه همون تابعی که درونه ان تعریف شده
