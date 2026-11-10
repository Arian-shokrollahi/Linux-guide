## "To see only the IPv4 addresses, we use `dig +short domain`."

---
## برایه دیدن IPV4  از طریق domain ما از دستور dig + short استفاده میکنیم

وقتی می‌نویسی:

```
dig +short example.com
```

به‌صورت پیش‌فرض Query Type برابر `A` است؛ بنابراین آدرس‌های IPv4 دامنه را درخواست می‌کند.

اما برای شفافیت بیشتر، بهتر است صراحتاً بنویسی:

```
dig +short A example.com
```

و برای IPv6:

```
dig +short AAAA example.com
```

نکته: اگر دامنه چند رکورد A داشته باشد، ممکن است چند IPv4 نمایش داده شود.

---
## به طور مثال دیدن IPV4 دیجیکالا

```
arian@alfamachine:~$ dig +short digikala.ir
185.188.104.12
185.188.105.12
185.188.106.12
185.188.107.12
arian@alfamachine:~/Nginx/official-nginx-documentation/1-terms-and-architecture/include-virtual-host-in-nginx.conf$
```
