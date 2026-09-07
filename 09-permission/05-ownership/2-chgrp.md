دستور chgrp

chgrp مخفف Change Group است و برای تغییر Group یک File یا Directory استفاده می‌شود.

ساختار کلی:

chgrp [group] [file]

مثلاً:

chgrp developers test.txt

یعنی:

test.txt
    │
    └── Group → developers

برای Directory هم می‌توانیم استفاده کنیم:

chgrp developers testdir

یعنی Group مربوط به testdir به developers تغییر می‌کند.

تفاوت chown و chgrp
chown → تغییر Owner و Group
chgrp → فقط تغییر Group

مثلاً:

chown ali:developers test.txt

هم Owner و هم Group را تغییر می‌دهد.

اما:

chgrp developers test.txt

فقط Group را تغییر می‌دهد.
