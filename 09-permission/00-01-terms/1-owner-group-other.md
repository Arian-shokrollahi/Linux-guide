# user,owner, group, other
---
#### قبل از اینکه وارد Permissionها بشیم، باید بدونیم لینوکس وقتی با یک فایل یا Directory کار می‌کنه، باید بدونه **چه کسی در حال انجام عملیات است** و **چه رابطه‌ای با آن فایل دارد**.

در لینوکس چند مفهوم مهم برای مشخص کردن هویت و دسترسی افراد وجود دارد:

- ا-**User** → یک حساب کاربری در سیستم
- ا-**Owner** → کاربری که مالک یک فایل یا Directory است
- ا-**Group** → مجموعه‌ای از Userها
- ا-**Others** → کاربرانی که نه Owner هستند و نه در Group مربوط به فایل قرار دارند

این مفاهیم با هم ارتباط دارند و Permissionهای لینوکس بر اساس همین ارتباط تصمیم می‌گیرند که یک User چه دسترسی‌ای داشته باشد.

برای مثال فرض کنیم:
```
User:
    ali

File:
    file.txt

Owner:
    ali

Group:
    developers

Group Members:
    sara
    reza
```
در این حالت اگر Userهای سیستم این‌ها باشند:

```
ali
sara
reza
mohammad
```

لینوکس افراد را نسبت به `file.txt` این‌گونه دسته‌بندی می‌کند:

```
             file.txt
                 │
       ┌─────────┼─────────┐
       │         │         │
     Owner     Group     Others
       │         │         │
      ali    sara, reza  mohammad
```
---
## حالا که اینارو فهمیدید بریم سراغه توضیح اصطلاحات user, owner, group , other

# 1. User

### تعریف

**User** یک حساب کاربری در سیستم لینوکس است.

مثلاً:

```
ali
sara
reza
root
```

هر User هویت خودش را دارد و سیستم می‌تواند بر اساس آن هویت، دسترسی‌های مختلفی به او بدهد.

برای دیدن User فعلی:

```
whoami
```

مثلاً:

```
ali
```
---
# 2. Owner

### تعریف

هر فایل و Directory در لینوکس یک **Owner** دارد.

مثلاً:

```
file.txt
Owner: ali
```

یعنی User `ali` مالک این فایل است.

می‌توانیم با `ls -l` مالک فایل را ببینیم:

```
ls -l file.txt
```

مثلاً:

```
-rw-r--r-- 1 ali developers 1200 file.txt
```

اینجا:

```
             Owner
                ↓
-rw-r--r-- 1  ali  developers
```

پس:

> ا-**Owner یک User است که مالک آن فایل یا Directory است.**

---
# 3. Group

### تعریف

ا-**Group** مجموعه‌ای از Userهاست که می‌توانند Permission مشترکی روی فایل‌ها داشته باشند.

مثلاً:

```
developers
├── ali
├── sara
└── reza
```

حالا:

```
file.txt
Owner = ali
Group = developers
```

پس `ali` مالک فایل است و `sara` و `reza` به واسطه عضویت در Group، می‌توانند Permission مربوط به Group را دریافت کنند.

این موضوع برای سیستم‌هایی که چند User دارند بسیار مهم است.

---

# 4. Others

### تعریف

ا-`Others` به Userهایی گفته می‌شود که:

#### دو شرط مهم برایه other بودن
- ا-Owner فایل نیستند
- عضو Group مربوط به فایل هم نیستند

مثلاً:

```
Users:
ali
sara
reza
mohammad
```

و:

```
Owner = ali
Group = developers

developers:
sara
reza
```

پس:

```
ali       → Owner
sara      → Group
reza      → Group
mohammad  → Other
```

---
# ارتباط این چهار مفهوم

حالا همه را کنار هم قرار بده:

```                 User
                     │
              یک حساب کاربری
                     │
        ┌────────────┴────────────┐
        │                         │
     Owner                     Group
        │                         │
  مالک یک فایل              مجموعه Userها
        │                         │
        └────────────┬────────────┘
                     │
                  Others
                     │
        Userهایی خارج از این دو دسته
```

اما در Permissionها، معمولاً این سه دسته را بررسی می‌کنیم:

```
User/Owner | Group | Others
```

مثلاً:

```
-rwxr-xr--
```

به این شکل تقسیم می‌شود:

```
 rwx | r-x | r--
  ↓     ↓     ↓
Owner  Group Others
```
