 نقشه کامل Commandهای شبکه در Linux

---

## 1. 🔹 Network Interface و وضعیت شبکه

|Command|کاربرد|
|---|---|
|`ip`|→ ابزار اصلی مدیریت و مشاهده شبکه در Linux|
|`ifconfig`|→ مشاهده/تنظیم Interfaceها — **قدیمی**|
|`ip link`|→ مشاهده و مدیریت وضعیت Interface و MAC|
|`ip addr`|→ مشاهده و تنظیم IP Address|
|`ip -s link`|→ مشاهده آمار Interface مثل RX/TX و خطاها|
|`ethtool`|→ بررسی و تنظیم جزئیات کارت شبکه مثل Speed/Duplex/Link|

---

## 2. 🔹 IP Address و Routing

| Command        | کاربرد                                                                |
| -------------- | --------------------------------------------------------------------- |
| `ip addr`      | → مشاهده و مدیریت IP Address                                          |
| `ip route`     | → مشاهده و مدیریت جدول Routing                                        |
| `ip rule`      | → مدیریت Policy Routing                                               |
| `route`        | → مشاهده/تنظیم Routing — **قدیمی**                                    |
| `arp`          | → مشاهده/مدیریت ARP — **قدیمی**                                       |
| `ip neigh`     | → مشاهده جدول Neighbor/ARP                                            |
| `ip route get` | → فهمیدن اینکه یک Packet به مقصد مشخص از چه مسیر و Interfaceای می‌رود |

---

## 3. 🔹 تست اتصال و Troubleshooting

|Command|کاربرد|
|---|---|
|`ping`|→ بررسی Reachability و اندازه‌گیری Latency|
|`ping6`|→ تست اتصال با IPv6|
|`traceroute`|→ پیدا کردن مسیر Packet تا مقصد|
|`tracepath`|→ مشاهده مسیر و بررسی بعضی مشکلات Path/MTU|
|`mtr`|→ ترکیب Ping + Traceroute برای Troubleshooting|
|`ss`|→ مشاهده Connectionها، Socketها و Portهای Listening|
|`netstat`|→ مشاهده Connection/Port/Route — **قدیمی**|

---

## 4. 🔹 DNS

|Command|کاربرد|
|---|---|
|`dig`|→ Query دقیق DNS و بررسی Recordها|
|`nslookup`|→ انجام DNS Query — ابزار قدیمی‌تر|
|`host`|→ تبدیل Domain ↔ IP و Query ساده DNS|
|`resolvectl`|→ بررسی و مدیریت DNS Resolution در سیستم‌های systemd|
|`getent hosts`|→ بررسی اینکه سیستم خودش یک Hostname را چگونه Resolve می‌کند|

---

## 5. 🔹 اتصال به سرویس‌ها و Portها

|Command|کاربرد|
|---|---|
|`nc` / `netcat`|→ تست Port و ساخت Connection ساده TCP/UDP|
|`telnet`|→ تست Connection به یک Port — امروزه بیشتر برای Troubleshooting|
|`curl`|→ ارتباط با HTTP/HTTPS و تست Web/API|
|`wget`|→ دانلود فایل و ارتباط با HTTP/HTTPS|
|`openssl s_client`|→ بررسی TLS/SSL و اتصال HTTPS|

---

## 6. 🔹 SSH و Remote Access

| Command       | کاربرد                                                 |
| ------------- | ------------------------------------------------------ |
| `ssh`         | → اتصال امن به Remote Server                           |
| `scp`         | → انتقال فایل از طریق SSH                              |
| `sftp`        | → انتقال و مدیریت فایل از طریق SSH                     |
| `ssh-keygen`  | → ساخت SSH Key                                         |
| `ssh-copy-id` | → انتقال Public Key به Server برای Login بدون Password |
| `ssh-agent`   | → نگهداری موقت SSH Keyها در حافظه                      |
| `ssh-add`     | → اضافه کردن Key به `ssh-agent`                        |
|               |                                                        |

---

## 7. 🔹 انتقال فایل روی شبکه

|Command|کاربرد|
|---|---|
|`scp`|→ کپی فایل بین سیستم‌ها از طریق SSH|
|`sftp`|→ انتقال/مدیریت فایل به‌صورت Interactive|
|`rsync`|→ Sync و انتقال بهینه فایل‌ها|
|`curl`|→ Upload/Download از طریق Protocolهای مختلف|
|`wget`|→ دانلود فایل از شبکه|

---

## 8. 🔹 NetworkManager

|Command|کاربرد|
|---|---|
|`nmcli`|→ مدیریت Network از طریق Command Line|
|`nmtui`|→ مدیریت Network با رابط متنی|
|`nmcli device`|→ مشاهده و مدیریت Network Deviceها|
|`nmcli connection`|→ مشاهده و مدیریت Connection Profileها|
|`nmcli general`|→ مشاهده وضعیت کلی NetworkManager|

---

## 9. 🔹 DHCP

|Command|کاربرد|
|---|---|
|`dhclient`|→ درخواست/دریافت IP از DHCP — در بعضی سیستم‌ها/محیط‌ها|
|`nmcli`|→ تنظیم Connection برای استفاده از DHCP|
|`networkctl`|→ مشاهده/مدیریت Network Interface در systemd-networkd|
|`resolvectl`|→ بررسی DNS و اطلاعات دریافت‌شده از Network Configuration|

---

## 10. 🔹 Firewall 🔥

|Command|کاربرد|
|---|---|
|`nft`|→ مدیریت Firewall مدرن Linux با nftables|
|`iptables`|→ مدیریت Firewall قدیمی‌تر مبتنی بر netfilter|
|`ip6tables`|→ Firewall برای IPv6 — قدیمی‌تر|
|`firewall-cmd`|→ مدیریت Firewall از طریق firewalld|
|`ufw`|→ مدیریت ساده Firewall، مخصوصاً در Ubuntu|

> ⭐ **مهم:** `nft` را عمیق یاد بگیر؛ `iptables` را هم برای سیستم‌های قدیمی و Troubleshooting بشناس.

---

## 11. 🔹 Socket و Connection

|Command|کاربرد|
|---|---|
|`ss`|→ مشاهده TCP/UDP Connection و Portهای Listening|
|`lsof`|→ پیدا کردن Processی که یک File/Socket/Port را استفاده می‌کند|
|`fuser`|→ پیدا کردن Processهای استفاده‌کننده از یک Port/File|

مثلاً:

→ **پیدا کردن اینکه چه Portهایی Listening هستند و کدام Process آنها را باز کرده است.**

---

## 12. 🔹 Packet Capture و تحلیل Traffic 🔥

|Command|کاربرد|
|---|---|
|`tcpdump`|→ Capture و بررسی Packetهای شبکه از Terminal|
|`tshark`|→ نسخه Command-Line مربوط به Wireshark|
|`wireshark`|→ تحلیل گرافیکی و عمیق Packetها|

مثلاً:

→ **دیدن DNS Traffic روی Interface مشخص.**

---

## 13. 🔹 Network Namespace و Virtual Networking

|Command|کاربرد|
|---|---|
|`ip netns`|→ ساخت و مدیریت Network Namespace|
|`ip link`|→ ساخت/مدیریت Virtual Interface|
|`bridge`|→ مدیریت Linux Bridge|
|`veth`|→ Virtual Ethernet برای اتصال Namespaceها/Virtual Networkها|
|`tc`|→ کنترل و شکل‌دهی Traffic|

> 🔥 این قسمت بیشتر برای **Docker، Kubernetes، Virtualization و Advanced Networking** اهمیت پیدا می‌کند.

---

## 14. 🔹 Traffic Control / QoS

|Command|کاربرد|
|---|---|
|`tc`|→ کنترل Traffic، محدود کردن Bandwidth، Delay، Packet Loss و QoS|

مثلاً می‌توانی عمداً شرایطی مثل:

ایجاد کنی تا Network را تست کنی.

---

## 15. 🔹 ARP / Neighbor

|Command|کاربرد|
|---|---|
|`ip neigh`|→ مشاهده IP ↔ MAC و Neighbor Table|
|`arp`|→ مدیریت ARP — **قدیمی**|
|`arping`|→ تست ARP و بررسی اینکه یک IP در شبکه محلی چه MACای دارد|

مثلاً:

→ **دیدن Neighborهای شناخته‌شده در شبکه.**

---

## 16. 🔹 MAC Address

|Command|کاربرد|
|---|---|
|`ip link`|→ مشاهده و تغییر MAC Address|
|`ethtool`|→ بررسی اطلاعات سخت‌افزاری و Link کارت شبکه|
|`arping`|→ بررسی ارتباط IP و MAC در شبکه Local|

---

## 17. 🔹 Interface Diagnostics

|Command|کاربرد|
|---|---|
|`ethtool`|→ بررسی Speed، Duplex، Link و Driver|
|`ip -s link`|→ بررسی Packet و Error و Drop|
|`dmesg`|→ بررسی پیام‌های Kernel، مخصوصاً مشکلات Hardware/Driver|
|`journalctl`|→ بررسی Logهای سیستم و سرویس‌های شبکه|

---

## 18. 🔹 Routing Diagnostics

|Command|کاربرد|
|---|---|
|`ip route`|→ مشاهده Routing Table|
|`ip rule`|→ بررسی Policy Routing|
|`ip route get`|→ فهمیدن مسیر واقعی تا یک مقصد|
|`traceroute`|→ مشاهده Hopهای مسیر|
|`tracepath`|→ بررسی Path و MTU|
|`mtr`|→ بررسی مداوم مسیر، Latency و Packet Loss|

مثلاً:

→ **می‌فهمی Linux برای رسیدن به 8.8.8.8 از کدام Gateway و Interface استفاده می‌کند.**

---

## 19. 🔹 HTTP / HTTPS

|Command|کاربرد|
|---|---|
|`curl`|→ تست HTTP/HTTPS، API، Header و Response|
|`wget`|→ دانلود منابع از HTTP/HTTPS|
|`openssl s_client`|→ بررسی TLS Certificate و Handshake|

مثلاً:

→ **فقط Headerهای HTTP را برای بررسی Web Server می‌بینی.**

---

## 20. 🔹 Network Services / Servers

|Command|کاربرد|
|---|---|
|`systemctl`|→ Start/Stop/Restart/Status سرویس‌های شبکه|
|`journalctl`|→ مشاهده Log سرویس‌های شبکه|
|`ss`|→ بررسی Port و Socket سرویس|
|`lsof`|→ پیدا کردن Process مربوط به Port|
|`curl`|→ تست اینکه سرویس HTTP واقعاً پاسخ می‌دهد یا نه|=

