# این script برایه تست کردن اینه که اون هاست که میخوایم بهش وصل شیم رویه اون پورتی که مدنظرمونه شنود میکنه یا نه
---
### خوده اسکریپت اینه
```bash
#!/usr/bin/env bash

read -rp "Host: " host
read -rp "Port: " port

if [ -z "$host" ] || [ -z "$port" ]; then
    echo "Host and port are required."
    exit 1
fi

if nc -zvw 3 "$host" "$port"; then
    echo "Port is open."
else
    echo "Port is closed or unreachable."
fi
```
### طرز کارش چطوره 
```bash
Host:
Port:
```
 - 1- ای پی یا دامنه مقصد رو میدید 
 - 2-اون پورتی که میخواید ببنید ایا روش شنود میکند یا نه هم میدید مثلا 80
 - 3- بعد میگه ایا open است اون پورت یا نه
 ---

### نمونه ای از مثالش
```shell
type that name you choose for script
1-enter first Host: google.com
2-enter second Port: 80
DNS fwd/rev mismatch: google.com != lclgaa-at-in-f14.1e100.net
google.com [142.251.41.174] 80 (http) open
Port is open.
```
- و در خروجی میگه که  اون هاستی که وارد کردی به اون ip رویه اون پورتی که وارد کردی بازه
