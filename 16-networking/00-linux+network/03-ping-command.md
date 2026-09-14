# 03-ping-command
# 03-در این قسمت میریم سراغه دستورping
---
## دستور ping چیکار میکند ؟ 
- دستور `ping` برای بررسی **دسترسی شبکه** بین سیستم شما و یک مقصد استفاده می‌شود.
- این مقصد می‌تواند یک **IP Address** یا یک **دامنه** مثل `google.com` باشد.
- ا- `ping` با ارسال بسته‌های **ICMP Echo Request** بررسی می‌کند که مقصد در دسترس است یا نه و مدت‌زمان رفت‌وبرگشت بسته‌ها را نشان می‌دهد.و مقصد هم یک ICMP Echo Replay میفرسته.
- ساختار دستور ping
```bash
ping [options] destination
```
- نمونه ای از دستور ping:
``` bash
ping google.com or ping 1.1.1.1
```
- ا-<mark>نکته : </MARK> این رو در نظر بگیرید که باید از گزینه c- استفاده کنید چون درحالت عادی همینطوری ICMP میفرسته و لی با گزینه c- میتونیم مشخص کنیم که چندتا ICMP بفریسته
```bash
ping -c 4 google.com
PING google.com (142.250.185.46) 56(84) bytes of data.
64 bytes from 142.250.185.46: icmp_seq=1 ttl=117 time=45.2 ms
64 bytes from 142.250.185.46: icmp_seq=2 ttl=117 time=42.8 ms
64 bytes from 142.250.185.46: icmp_seq=3 ttl=117 time=44.1 ms
64 bytes from 142.250.185.46: icmp_seq=4 ttl=117 time=43.7 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3003ms
rtt min/avg/max/mdev = 42.800/43.950/45.200/0.874 ms

```
کلی گزینه دیگه هم داره برید ببنید

---
## در پاور شل چجوری میشه از این دستور استفاده کرد
```powershell
Test-Connection domain/ip -Count number
PS C:\Windows\system32> Test-Connection google.com -Count 12

Source        Destination     IPV4Address      IPV6Address                              Bytes    Time(ms)
------        -----------     -----------      -----------                              -----    --------
DESKTOP-1F... google.com      216.239.38.120                                            32       82
DESKTOP-1F... google.com      216.239.38.120                                            32       63
DESKTOP-1F... google.com      216.239.38.120                                            32       55
DESKTOP-1F... google.com      216.239.38.120                                            32       54
DESKTOP-1F... google.com      216.239.38.120                                            32       62
```
