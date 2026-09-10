Customizing the Prompt یعنی چی؟

Prompt همان قسمتی از Terminal است که قبل از وارد کردن دستور می‌بینی. مثلاً:

user@ubuntu:~$

یا:

[user@ubuntu ~]$

Customizing the Prompt یعنی این قسمت را شخصی‌سازی کنیم تا اطلاعاتی که برایمان مهم است را نمایش دهد.

کار اصلی ما با متغیر:

PS1

است.

یعنی:

PS1 → مشخص می‌کند Prompt اصلی Terminal چه شکلی باشد و چه اطلاعاتی داخل آن نمایش داده شود.

برای ساختن Prompt، داخل PS1 از Escape Sequenceها استفاده می‌کنیم؛ مثلاً هرکدام یک اطلاعات خاص را نمایش می‌دهند:

\u → username
\h → hostname
\w → مسیر فعلی
\t → ساعت

پس ساختار کلی ذهنی این است:

PS1
 │
 ├── username
 ├── hostname
 ├── current directory
 ├── time
 ├── Git information
 └── ...

و نکته مهم این است که Prompt فقط ظاهر نیست؛ می‌توانیم اطلاعات مفیدی مثل وضعیت آخرین دستور، شاخه Git و موارد دیگر را هم در آن قرار دهیم.

مباحثی که بعداً باید یاد بگیری

در بخش‌های بعدی می‌توانی این‌ها را به‌ترتیب یاد بگیری:

PS1
Escape Sequences
رنگ‌ها در Prompt
~/.bashrc
اعمال دائمی تغییرات
نمایش Exit Status
نمایش Git Branch
ساخت Prompt با Function
Promptهای چندخطی
ابزارهای آماده مثل Starship
معروف‌ترین سبک‌های Customizing Prompt

در لینوکس معمولاً این سبک‌ها را زیاد می‌بینی:

Minimal Prompt — ساده و خلوت
Username + Hostname + Directory
Colored Prompt
Two-line Prompt
Git Prompt — نمایش Git branch و status
Powerline-style Prompt
Bash حرفه‌ای با اطلاعات سیستم
Starship Prompt — مدرن و قابل شخصی‌سازی
Oh My Bash Prompt — مجموعه‌ای از themeهای آماده
Kali-style Prompt
Ubuntu-style Prompt
Zsh/Oh My Zsh-style Prompt

برای یادگیری لینوکس، پیشنهاد می‌کنم اول PS1 + Escape Sequences + .bashrc را خوب یاد بگیری؛ بعد برو سراغ Git و در نهایت Starship یا themeهای آما.
