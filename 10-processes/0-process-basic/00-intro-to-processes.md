# intro to process
---
# مقدمه‌ای بر Process در لینوکس

قبل از اینکه وارد مباحثی مثل مدیریت Processها، مشاهده وضعیت آن‌ها، ارسال Signal، Scheduling یا مباحث پیشرفته‌تر شویم، باید اول بفهمیم که **Process دقیقاً چیست و لینوکس چگونه آن را مدیریت می‌کند.**

Process یکی از بنیادی‌ترین مفاهیم در Linux است. تقریباً هر چیزی که در سیستم در حال اجراست، از یک دستور ساده در Terminal گرفته تا یک System Service، در نهایت به شکل یک Process اجرا می‌شود.

---

## 1. Process چیست؟

**Process یا فرایند، یک نمونه در حال اجرای یک Program است.**

برای درک بهتر، ابتدا باید تفاوت Program و Process را بدانیم.

وقتی یک برنامه روی دیسک وجود دارد، مثلاً:

```bash
/usr/bin/python3
```

این فایل به خودی خود یک **Program** است.

اما وقتی دستور زیر را اجرا می‌کنیم:

```bash
python3 script.py
```

سیستم‌عامل آن Program را وارد حافظه می‌کند و شروع به اجرای آن می‌کند. در این لحظه یک **Process** ایجاد شده است.

به زبان ساده:

> **Program = دستورالعمل‌هایی که روی دیسک ذخیره شده‌اند**  
> **Process = همان دستورالعمل‌ها در حال اجرا**

یک Process فقط شامل کد برنامه نیست، بلکه اطلاعات مختلفی را نیز در خود دارد، از جمله:

- یک **PID** برای شناسایی
    
- یک **PPID** برای مشخص کردن Parent
    
- فضای حافظه
    
- وضعیت اجرای CPU
    
- File Descriptorها
    
- Environment Variableها
    
- User و Group مربوط به Process
    
- اطلاعات مربوط به Process Group
    
- وضعیت و منابع مورد استفاده
    

پس Process را بهتر است به عنوان یک **موجودیت قابل مدیریت توسط Kernel** در نظر بگیریم، نه صرفاً «یک برنامه در حال اجرا».

---

# 2. تفاوت Program و Process

یکی از مهم‌ترین مفاهیمی که باید از همین ابتدا یاد بگیریم، تفاوت بین **Program** و **Process** است.

می‌توانیم Program را مثل یک **دستور پخت غذا** و Process را مثل **کسی که در حال پختن آن غذاست** در نظر بگیریم.

دستور پخت می‌تواند روی کاغذ وجود داشته باشد، بدون اینکه کسی در حال استفاده از آن باشد.

Program هم می‌تواند روی Disk وجود داشته باشد، بدون اینکه در حال اجرا باشد.

مثلاً:

```bash
/usr/bin/sleep
```

یک Program است.

اما وقتی می‌نویسیم:

```bash
sleep 100
```

Linux یک Process ایجاد می‌کند تا این Program را اجرا کند.

حتی می‌توانیم یک Program را چندین بار اجرا کنیم:

```bash
sleep 100 &
sleep 100 &
sleep 100 &
```

در این حالت یک Program داریم، اما چند Process مختلف ایجاد شده است:

```text
Program
  │
  ├── Process → PID 1200
  ├── Process → PID 1201
  └── Process → PID 1202
```

هر Process دارای PID مخصوص خودش است.

بنابراین:

> **یک Program می‌تواند چندین Process ایجاد کند.**

---

# 3. PID چیست؟

هر Process در Linux یک شناسه دارد که به آن:

**PID = Process ID**

گفته می‌شود.

PID یک عدد است که Kernel از آن برای شناسایی یک Process استفاده می‌کند.

مثلاً:

```text
PID
---
1
245
871
1200
5321
```

می‌توانیم Processها و PID آن‌ها را با دستورهایی مثل زیر مشاهده کنیم:

```bash
ps
```

یا:

```bash
ps aux
```

برای مثال:

```text
USER       PID   COMMAND
root         1   systemd
user      1200   bash
user      1450   sleep 100
```

در این مثال:

```text
PID 1     → systemd
PID 1200  → bash
PID 1450  → sleep
```

PID بسیار مهم است، چون بسیاری از ابزارهای Linux برای کار کردن روی یک Process مشخص، از PID آن استفاده می‌کنند.

مثلاً:

```bash
kill 1450
```

یعنی:

> یک Signal را به Process دارای PID برابر `1450` ارسال کن.

---

# 4. PPID چیست؟

Processها معمولاً به صورت مستقل و بدون ارتباط با Processهای دیگر ایجاد نمی‌شوند.

اغلب یک Process توسط Process دیگری ایجاد می‌شود.

Processی که Process دیگری را ایجاد می‌کند، **Parent Process** نام دارد.

Process ایجادشده نیز **Child Process** نام دارد.

هر Process یک مقدار به نام:

**PPID = Parent Process ID**

دارد که PID مربوط به Parent آن Process است.

مثلاً:

```text
Parent Process
PID = 1000
      │
      │
      ▼
Child Process
PID  = 1200
PPID = 1000
```

یعنی Process شماره `1200` توسط Process شماره `1000` ایجاد شده است.

می‌توانیم PID و PPID را با دستور زیر ببینیم:

```bash
ps -ef
```

مثلاً:

```text
UID      PID   PPID   CMD
user    1000      1   bash
user    1200   1000   sleep 100
```

در اینجا:

```text
bash
PID  = 1000
PPID = 1

sleep
PID  = 1200
PPID = 1000
```

پس رابطه به شکل زیر است:

```text
systemd
   │
   └── bash
         │
         └── sleep
```

---

# 5. Parent و Child Process

حالا که PID و PPID را می‌شناسیم، مفهوم **Parent / Child** راحت‌تر می‌شود.

وقتی یک Process، Process دیگری را ایجاد می‌کند:

```text
Parent
   │
   └── Child
```

Process بالایی Parent و Process پایینی Child است.

مثلاً Shell خودمان را در نظر بگیریم:

```bash
bash
```

وقتی داخل Shell دستور زیر را اجرا می‌کنیم:

```bash
ls
```

Shell می‌تواند Process مربوط به `ls` را ایجاد کند.

در نتیجه به صورت مفهومی داریم:

```text
bash
 │
 └── ls
```

در اینجا:

```text
bash → Parent
ls   → Child
```

یک Parent می‌تواند چند Child داشته باشد:

```text
bash
├── ls
├── sleep
├── python
└── grep
```

حتی Childها هم می‌توانند Processهای دیگری ایجاد کنند:

```text
bash
│
├── python
│   ├── worker
│   └── worker
│
└── sleep
```

این ساختار ما را به مفهوم مهم بعدی یعنی **Process Tree** می‌رساند.

---

# 6. Process Tree چیست؟

از آنجا که Processها می‌توانند Processهای دیگری ایجاد کنند، بین آن‌ها یک ساختار سلسله‌مراتبی به وجود می‌آید.

به این ساختار:

**Process Tree**

گفته می‌شود.

برای مثال:

```text
systemd
├── sshd
│   └── bash
│       ├── vim
│       └── python
│
├── cron
│
└── nginx
    ├── nginx
    ├── nginx
    └── nginx
```

در این ساختار:

- `systemd` در بالاترین سطح قرار دارد.
    
- `sshd` یک Child از `systemd` است.
    
- `bash` یک Child از `sshd` است.
    
- `python` یک Child از `bash` است.
    

می‌توانیم این ساختار را با دستور زیر مشاهده کنیم:

```bash
pstree
```

مثلاً:

```text
systemd
 ├─sshd
 │   └─bash
 │       └─python
 ├─cron
 └─nginx
     ├─nginx
     ├─nginx
     └─nginx
```

درک Process Tree در Troubleshooting بسیار مهم است.

مثلاً اگر یک Process را مشاهده کنیم که رفتار عجیبی دارد، دانستن اینکه:

> **چه Processی آن را ایجاد کرده؟**

می‌تواند اطلاعات بسیار مهمی درباره نحوه اجرای آن Process در اختیارمان قرار دهد.

---

# 7. Init و systemd

حالا یک سؤال مهم داریم:

اگر Processها توسط Processهای دیگر ایجاد می‌شوند، **اولین Process چه کسی را دارد؟**

در Linux، اولین Process مربوط به User Space معمولاً:

```text
PID = 1
```

دارد.

در سیستم‌های Linux مدرن، این Process معمولاً:

```text
systemd
```

است.

می‌توانیم آن را بررسی کنیم:

```bash
ps -p 1 -f
```

در بسیاری از سیستم‌های مدرن نتیجه چیزی شبیه این خواهد بود:

```text
systemd
```

بنابراین می‌توانیم Process Tree را به شکل ساده زیر تصور کنیم:

```text
systemd
PID = 1
│
├── Service
├── Service
├── Service
└── User Process
```

قبل از `systemd`، سیستم‌های Linux و Unix مختلف معمولاً از چیزی به نام **init** به عنوان Process شماره 1 استفاده می‌کردند.

به همین دلیل است که گاهی در منابع Linux عبارت‌های:

```text
init
PID 1
systemd
```

را در ارتباط با یکدیگر می‌بینیم.

نکته مهم این است که:

> **PID 1 ریشه Processهای User Space است و نقش بسیار مهمی در Startup و مدیریت سیستم دارد.**

`systemd` مسئولیت‌هایی مانند موارد زیر را بر عهده دارد:

- راه‌اندازی Serviceها
    
- مدیریت Serviceها
    
- مدیریت فرآیند Boot
    
- مدیریت برخی Processهای سیستم
    
- کمک به Shutdown سیستم
    
- Adopt کردن برخی Orphan Processها
    

پس وقتی در Linux می‌بینیم:

```text
PID 1
```

باید سریع به یاد بیاوریم:

> **Root of the User-Space Process Hierarchy**

---

# 8. PID و PGID

هر Process فقط یک PID ندارد.

Linux Processها را در **Process Group** نیز سازمان‌دهی می‌کند.

هر Process Group دارای یک شناسه به نام:

**PGID = Process Group ID**

است.

تفاوت اصلی:

```text
PID
→ شناسه یک Process

PGID
→ شناسه یک Process Group
```

این مفهوم مخصوصاً در موارد زیر اهمیت زیادی دارد:

- Shell
    
- Pipeline
    
- Job Control
    
- Foreground / Background Process
    
- Signalها
    

مثلاً دستور زیر را در نظر بگیرید:

```bash
cat file.txt | grep hello | sort
```

در اینجا چند Process درگیر هستند:

```text
cat
 │
 ▼
grep
 │
 ▼
sort
```

Shell می‌تواند این Processهای مرتبط را در یک Process Group قرار دهد.

برای مشاهده PID، PPID و PGID می‌توانیم بنویسیم:

```bash
ps -o pid,ppid,pgid,cmd
```

مثلاً:

```text
 PID   PPID   PGID   CMD
1200  1000   1200   cat file.txt
1201  1000   1200   grep hello
1202  1000   1200   sort
```

در این مثال سه Process مختلف داریم:

```text
PID 1200
PID 1201
PID 1202
```

اما هر سه عضو یک Process Group هستند:

```text
             PGID 1200
            /    |    \
           /     |     \
      PID 1200 PID 1201 PID 1202
```

این موضوع در ادامه، هنگام یادگیری **Signals و Job Control** اهمیت زیادی پیدا می‌کند.

---

# 9. User ID و Group ID یک Process

Linux باید بداند که:

> **این Process متعلق به چه User و چه Groupی است؟**

به همین دلیل Processها دارای اطلاعات هویتی هستند.

دو مورد مهم عبارت‌اند از:

```text
UID → User ID
GID → Group ID
```

مثلاً:

```text
Process
├── PID = 1500
├── UID = 1000
└── GID = 1000
```

این اطلاعات مشخص می‌کنند Process با چه User و Groupی در ارتباط است.

می‌توانیم اطلاعات مربوط به User و Group یک Process را مشاهده کنیم:

```bash
ps -o pid,user,uid,group,gid,cmd
```

مثلاً:

```text
PID   USER    UID   GROUP   GID   CMD
1500  ali     1000  ali     1000  bash
```

این موضوع اهمیت زیادی در **Linux Security و Permissions** دارد.

چون Kernel بر اساس Credentials یک Process تصمیم می‌گیرد که آیا آن Process اجازه انجام یک عملیات خاص را دارد یا خیر.

برای مثال:

- آیا می‌تواند یک File را بخواند؟
    
- آیا می‌تواند در یک File بنویسد؟
    
- آیا اجازه اجرای یک عملیات خاص را دارد؟
    
- آیا می‌تواند Signal خاصی را به Process دیگری ارسال کند؟
    
- آیا دسترسی‌های Privileged دارد؟
    

بنابراین UID و GID فقط اطلاعات ساده نیستند؛ آن‌ها بخش مهمی از **Security Model لینوکس** هستند.

---

# 10. همه مفاهیم در کنار هم

حالا تمام مفاهیمی که یاد گرفتیم را کنار هم قرار دهیم.

فرض کنید Process Tree ما به شکل زیر باشد:

```text
systemd
PID = 1
UID = root
│
└── bash
    PID = 1000
    PPID = 1
    UID = 1000
    │
    ├── python
    │   PID = 1200
    │   PPID = 1000
    │
    └── sleep
        PID = 1300
        PPID = 1000
```

حالا اگر به Process مربوط به `python` نگاه کنیم:

```text
PID  = 1200
PPID = 1000
UID  = 1000
GID  = 1000
```

می‌توانیم بفهمیم:

```text
PID
→ خود Process چه شناسه‌ای دارد؟

PPID
→ Parent آن چه Processی است؟

UID
→ Process با چه Userی اجرا شده؟

GID
→ Process با چه Groupی اجرا شده؟

Process Tree
→ این Process چه جایگاهی در سلسله‌مراتب Processها دارد؟
```

این دقیقاً همان Mental Modelای است که برای ادامه مبحث Process به آن نیاز داریم.

---

# 11. یک Mental Model ساده

هر Process را می‌توانیم مثل یک موجودیت با چند ویژگی مهم تصور کنیم:

```text
┌──────────────────────────────┐
│           PROCESS            │
├──────────────────────────────┤
│ PID   → من چه کسی هستم؟      │
│ PPID  → Parent من کیست؟      │
│ PGID  → عضو چه گروهی هستم؟   │
│ UID   → متعلق به چه Userی؟   │
│ GID   → متعلق به چه Groupی؟  │
└──────────────────────────────┘
```

اگر این تصویر ذهنی را خوب درک کنیم، دستورهای زیر خیلی قابل فهم‌تر می‌شوند:

```bash
ps
top
htop
pstree
pgrep
pkill
kill
```

چون حالا می‌دانیم هر Process یک **Identity** دارد و در یک **Hierarchy** و احتمالاً یک **Process Group** قرار گرفته است.

---

# 12. خلاصه

|مفهوم|معنی|
|---|---|
|**Program**|دستورالعمل‌ها و کدی که روی Disk ذخیره شده|
|**Process**|یک نمونه در حال اجرای یک Program|
|**PID**|شناسه یک Process|
|**PPID**|شناسه Parent Process|
|**Parent Process**|Processی که Process دیگری را ایجاد کرده|
|**Child Process**|Processی که توسط Process دیگری ایجاد شده|
|**Process Tree**|ساختار سلسله‌مراتبی Processها|
|**init / systemd**|سیستم Init که معمولاً PID 1 است|
|**PGID**|شناسه یک Process Group|
|**UID**|شناسه User مربوط به Process|
|**GID**|شناسه Group مربوط به Process|

---

## نکته‌ای که باید از این بخش در ذهن بماند

مهم‌ترین چیزی که باید از این مقدمه یاد بگیری این است:

> **Process فقط یک Program در حال اجرا نیست.**
> 
> Process یک موجودیت قابل مدیریت توسط Linux Kernel است که **هویت (PID)، والد (PPID)، گروه (PGID)، User و Group (UID/GID)، حافظه، منابع و وضعیت اجرای خودش** را دارد و در یک ساختار سلسله‌مراتبی به نام **Process Tree** قرار می‌گیرد.

وقتی این مفاهیم را به خوبی درک کردی، آماده‌ایم برویم سراغ مباحث مهم‌تر مثل:

```text
Process Creation
       ↓
fork()
       ↓
exec()
       ↓
Process States
       ↓
Signals
       ↓
Zombie / Orphan Processes
       ↓
Foreground / Background Jobs
       ↓
Process Scheduling
       ↓
Process Management
```

این‌ها بخش‌هایی هستند که درک درست همین مفاهیم پایه، یادگیری‌شان را بسیار ساده‌تر می‌کند.
## اگر دستور htop رو بلد باشیم همه پردازه هارو بلدیم
**اگر `htop` رو خیلی خوب بلد باشی، به این معنی نیست که کل مبحث Processها رو بلدی**؛ ولی بخش بزرگی از **کار عملی و روزمره** رو پوشش می‌ده.

بهتره این‌طوری نگاه کنی:

```
                 Linux Processes
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     مشاهده          کنترل          درک داخلی
        │              │              │
       htop         kill/signals     /proc
       ps           jobs/bg/fg       states
       top          nice/renice      scheduling
       pstree                       threads
```

### اگر `htop` رو حرفه‌ای بلد باشی، این‌ها رو خوب انجام می‌دی:

- پیدا کردن Processها
- دیدن PID و User
- فهم CPU و Memory usage
- Sort کردن Processها
- Search و Filter
- دیدن Parent/Child با Tree
- تشخیص `R`, `S`, `D`, `T`, `Z`
- Kill کردن Process با Signal
- فهم اولیه Priority و Nice
- مانیتورینگ Real-time
- پیدا کردن Process مشکل‌دار

اما هنوز باید این‌ها رو **جداگانه** یاد بگیری:

```
ps                  ← بررسی و scripting
kill / signals      ← SIGTERM, SIGKILL, SIGHUP, ...
jobs/bg/fg          ← Job Control
nice/renice         ← CPU scheduling priority
pstree              ← Process hierarchy
/proc               ← اطلاعات عمیق Kernel درباره Process
systemd             ← مدیریت Serviceها
threads             ← Thread vs Process
scheduling          ← نحوه زمان‌بندی CPU
process states      ← درک عمیق‌تر stateها
zombie/orphan       ← lifecycle
```

### پس یک معیار خوب:

اگر منظورت **کار عملی Linux Admin** باشه:

> `ا-htop` رو حرفه‌ای بلد باشی = حدوداً **بخش مهمی از کار روزمره با Processها** رو بلدی.

ولی اگر هدفت اینه که بگی:

> «من مبحث Process در Linux رو کامل بلدم»

اون‌وقت `htop` **فقط یکی از ابزارهاست**.

اتفاقاً پیشنهاد من اینه که همین مسیری که داری می‌ری رو ادامه بدی:

**اول `ps` → بعد `htop` → بعد `kill/signals` → بعد `jobs` → بعد `/proc`**

چون این ترتیب باعث می‌شه فقط حفظ نکنی، بلکه واقعاً بفهمی Process در Linux چطور کار می‌کنه.