# Lesson 01-02ip+link.object
# در این قسمت به دستور ip + ابجکت link میپردازیم
---
# اول دستور ip link  چیست و درکدام لایه از شبکه فعالین میکند
در این قسمت ما اومدیم پرداختیم به دستور ip با ابجکت link که این دستور + ابجکت لینک رابط هایه مارو درون لایه دوم شبکه به ما نشون میده با اطلاعاتی دیگری که در اینده درموردش صحبت خواهیم کرد
- ا-<mark>نکته</mark> : این دستور بیشتر با خوده کارت شبکه کار دارد و همون طور که گفتیم  در مدل OSI اگر بخواهیم فعالیت
---
## این دستور اگر بخواهیم به لایه هایهOSIربطش بدیم در کدوم لایه کار میکند:


دستور ip link بیشتر با رابط هایه شبکه (Network interfaces) و  با ویژگی هایه لایه  2 مدل OSI مثل:
- وضعیت کارت شبکه: `UP` / `DOWN`
- آدرس MAC
- ا- MTU
- حالت promiscuous
- نام اینترفیس‌ها مثل `eth0`، `ens33`، `wlan0`  سرو کار دارد

---
- ا-<mark>نکته : </mark> این دستورات رو که وارد میکنی به صورت موقت میاد این تغییرات رو انجام میده و به صورت همیشگی نیست و اگر میخواهید به صورت همیشگی باشد و بعد هر reboot & restart شبکه پاک نشه  من در ابونتو کار میکنم و برایه ابونتو میگم بهتون و در ابونتو یکی از اینها مسول  شبکه است:
- netplan
- network manager
- systemd-network
---

## ساختار دستور ip link به چه صورت میباشد:

```bash
ip link {show | set | add | delete} ...
----
ip link show       # نمایش اینترفیس‌ها
ip link set        # تغییر تنظیمات اینترفیس
ip link add        # ساخت اینترفیس مجازی
ip link delete     # حذف اینترفیس مجازی
----
نکته: بیشتر عملیات تغییر‌دهنده نیازمند `root` یا `sudo` هستند.
```

---
## حالا بریم سراغه تمام حالت هایه کدی که میتوان با دستور ip link درست کرد🧐
---
### مدل <mark>1)</mark> نمایش تمام رابط ها---> ip link show
- برایه نمایش تمام کارت ها و لینک ها از دستور---><mark>ip link show</mark>  استفاده میکنیم
- نمونه خروج:
```bash
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    link/ether 08:00:27:12:34:56 brd ff:ff:ff:ff:ff:ff
```
- ا-`enp0s3`: نام اینترفیس
- ا-`UP`: اینترفیس از نظر نرم‌افزاری فعال است.
- ا-`LOWER_UP`: اتصال فیزیکی/لایه‌ی پایین نیز برقرار است؛ مثلاً کابل وصل است.
- ا-`mtu 1500`: بیشترین اندازه‌ی فریم/بسته پیش از fragmentation
- ا-`link/ether`: نوع لینک Ethernet
- `08:00:27:...`: آدرس MAC
- مدل کد دیگه:
```bash
1-ip link show dev eth0
2-ip link show eth0
3-ip -br link
```
- 1-نمایش یک رابط مشخص 2-مدل کوتا تر
- 3- نمایش خلاصه رابط ها به صورت مرتبط
```bash
output ex 3:ip -br link
lo               UNKNOWN        00:00:00:00:00:00
eth0             UP             52:54:00:12:34:56
```
---
### مدل <mark>2)</mark> فعال کردن و غیر فعال کردن اینترفیس ها
- این دستور آدرس IP را لزوماً پاک نمی‌کند، اما ارتباط شبکه از روی آن اینترفیس قطع می‌شود.
- 1- فعال کردن
- 2- غیر فعال کردن
- 3-مثال برای غیرفعال کردن رابط lo (loopback)
```bash
1-Activate->sudo ip link set dev interfacename up
2-Deactivate->sudo ip link set dev interfacename down
3-ex-->sudo ip link set dev lo down
```
---
### مدل <mark>3)</mark> تغییر MTU 
- ا-MTU مشخص میکند هر فریم یا بسته  در لایه شبکه تا چه اندازه میتواند بزرگ باشد
- نکته:اگر MTU یک سمت شبکه با سمت دیگر ناسازگار باشد، ممکن است اتصال ناقص، کند یا دچار مشکل شود.
- 1-تغییر MTU 
- 2-برگرداندن به مقدار رایج Ethernet (1500)
- 3- برایه jumbo frame اگر کارت شبکه پشتبانی بکند
```bash
1-sudo ip link set dev eth0 mtu number
2-sudo ip link set dev eth0 mtu 1500
3-sudo ip link set dev eth0 mtu 9000
```
---
### مدل <mark>4)</mark> تغییر ادرس مک
- ابتدا بهتر است قبل تغییر ادرس مک اون رابط رو down کنید
- > این تغییر معمولاً بعد از reboot یا راه‌اندازی مجدد سرویس شبکه از بین می‌رود، مگر اینکه در تنظیمات دائمی سیستم ثبت شود.
- ا-MAC باید قالب معتبر داشته باشد:--->XX:XX:XX:XX:XX:XX
- برای MAC محلی (locally administered)، معمولاً شروع با `02` انتخاب مناسبی است:02:aa:bb:cc:dd:ee
- خب بریم سراغ تغییر موقت MAC address
```bash
1-sudo ip link set dev eth0 down
2-sudo ip link set dev eth0 address 02:xx:xx:xx:xx:xx
3-sudo ip link set dev eth0 up
---
valid format--->xx:xx:xx:xx:xx:xx--->each sec has 2nibble=2hex=8bits=1bytes 
total48bits
---
```
---
### مدل <mark>5)</mark> تغییر نام رابط(change interface name)
- برایه این کار هم دوباره اون رابط رو down تغییر و دوباره up
- در سیستم‌هایی که NetworkManager، systemd-networkd یا udev فعال دارند، ممکن است نام‌گذاری دوباره پس از reboot نیازمند تنظیمات دائمی باشد.
- حالا بریم سراغه زدن کد هاش و عوض کردن نام رابط به arian
```bash
1- sudo ip link set dev down
2- sudo ip link set dev eth0 name arian
3- sudo ip link set dev arian up
change to normal model
1- sudo ip link set arian down 
2- sudo ip link set dev arian name eth0
3- sudo ip link set dev eth0 up
```
---
### مدل <mark>6)</mark> تنظیم صف ارسال (TX queue length)
- مقدار `txqueuelen` تعداد packetهایی است که می‌توانند پیش از ارسال در صف قرار بگیرند.
- اما افزایش بی‌دلیل آن می‌تواند latency را بدتر کند؛ پس باید با توجه به نوع ترافیک و اندازه‌گیری انجام شود.
``` bash
sudo ip link set dev eth0 txqueuelen 1000
sudo ip link set dev eth0 txqueuelen 10000
```
---
### مدل <MARK>7) </MARK> تغییر وضعیت Promiscuous Mode
- در حالت promiscuous، کارت شبکه می‌تواند فریم‌هایی غیر از MAC خودش را هم دریافت کند. این حالت در ابزارهای تحلیل شبکه مانند `tcpdump` یا سناریوهای Bridge کاربرد دارد.
- و بعد فعال کردن promicuous اگر ip link بزنید در فلگ هایه اون رابط اضافه میشه <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> 
- بریم یه فعال سازی غیرفعال و دیدن فلگ قبل و بعدش رو هم ببنیم
```bash
befor with ip link :
 eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 00:15:5d:bb:8b:71 brd ff:ff:ff:ff:ff:ff
-----------
1-sudo ip link set dev eth0 promisc on
-------
after set promisc
eth0: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 00:15:5d:bb:8b:71 brd ff:ff:ff:ff:ff:ff
------------
2-sudo ip link set dev eth0 promisc off
```
---
### مدل <mark>8)</mark> دریافت تمام ترافیک مالی کست  All-Multicast Mode
- در این حالت، اینترفیس تمام ترافیک multicast را دریافت می‌کند:
- حالا بریم سراغه فعال سازی و غیر فعال کردن
```bash
1-sudo ip link set dev eth0 allmulticast on
2-sudo ip link set dev eth0 allmulticast off
```
---
### مدل <mark>9)</mark>  ARP را روشن یا خاموش کردن
- برای اینترفیس‌های IPv4 می‌توان پاسخ‌گویی ARP را کنترل کرد: در برخی طراحی‌های خاص، HA، محیط‌های آزمایشگاهی یا جلوگیری از پاسخ ARP می‌تواند مفید باشد؛ ولی در استفاده‌ی عادی خاموش‌کردن ARP غالباً باعث اختلال ارتباط IPv4 می‌شود.
- دلیل نداره اینکاره بکنید :
```bash
1-sudo ip link set dev eth0 arp off
2-sudo ip link set dev eth0 arp on
```
---
### مدل <mark>10)</mark> خاموش و روشن کردن multicast
- برای بسیاری از قابلیت‌ها مثل IPv6، discovery و برخی پروتکل‌های شبکه، multicast مهم است؛ بنابراین معمولاً نباید بدون دلیل خاموش شود.
```bash
sudo ip link set dev eth0 multicast on
sudo ip link set dev eth0 multicast off
```
---  
### و کلی کاره دیگر  که درصورت نیاز سرچ کنید بریم یه جمع بندی از ip link تعریفش و کدهاش بگیم
- ا-`ip link` برای دیدن، فعال/غیرفعال‌کردن و تغییر خصوصیات کارت شبکه، و همچنین ساخت یا حذف انواع رابط‌های شبکه‌ی مجازی در لینوکس استفاده می‌شود.
--- 
## ۱. تغییر تنظیمات اینترفیس (`ip link set`)
```bash
ip link set dev eth0 up                    # روشن و فعال کردن کارت شبکه
ip link set dev eth0 down                  # خاموش و غیرفعال کردن کارت شبکه
ip link set dev eth0 mtu 1500              # تنظیم حداکثر اندازه هر بسته ارسالی (MTU) روی ۱۵۰۰ بایت
ip link set dev eth0 address 02:11:22:33:44:55 # تغییر موقت آدرس فیزیکی (MAC Address) کارت شبکه
ip link set dev eth0 name wan0             # تغییر نام کارت شبکه از eth0 به wan0 (باید ابتدا down باشد)
ip link set dev eth0 txqueuelen 1000       # تنظیم طول صف ارسال بسته‌ها (Transmit Queue Length) روی ۱۰۰۰
ip link set dev eth0 promisc on            # فعال کردن حالت شنود (Promiscuous) برای دریافت تمام فریم‌های شبکه
ip link set dev eth0 promisc off           # غیرفعال کردن حالت شنود و بازگشت به حالت عادی
ip link set dev eth0 allmulticast on       # فعال کردن دریافت تمام ترافیک‌های مالتی‌کست (Multicast)
ip link set dev eth0 multicast on          # فعال کردن قابلیت پشتیبانی از ترافیک مالتی‌کست
ip link set dev eth0 arp off               # غیرفعال کردن ارسال و پاسخ به درخواست‌های پروتکل ARP
ip link set dev eth0 master br0            # متصل و عضو کردن اینترفیس eth0 به بریج br0 (به عنوان Slave)
ip link set dev eth0 nomaster              # جدا کردن اینترفیس از بریج، باند یا VRF (خروج از حالت Slave)
ip link set dev eth0 netns ns1             # انتقال اینترفیس به یک فضای نام شبکه مستقل به نام ns1
ip link set dev eth0 xdp off               # غیرفعال و حذف کردن برنامه پردازش سریع بسته (XDP/eBPF) از روی کارت
```
## ۲. ساخت اینترفیس‌های مجازی (`ip link add`)
```bash
ip link add name dummy0 type dummy                               # ساخت یک کارت شبکه مجازی تستی/ساختگی (Dummy)
ip link add veth0 type veth peer name veth1                     # ساخت یک جفت اینترفیس مجازی متصل به هم (Virtual Ethernet Pair)
ip link add link eth0 name eth0.100 type vlan id 100             # ساخت یک اینترفیس مجازی VLAN با شناسه ۱۰۰ روی کارت eth0
ip link add name br0 type bridge                                 # ساخت یک سوئیچ مجازی نرم‌افزاری (Bridge) به نام br0
ip link add bond0 type bond mode active-backup                   # ساخت یک اینترفیس تجمیع کارت‌ها (Bonding) با حالت پشتیبان فعال
ip link add link eth0 name macvlan0 type macvlan mode bridge     # ساخت کارت شبکه مجازی با مک‌آدرس مجزا روی eth0 در حالت bridge
ip link add link eth0 name ipvlan0 type ipvlan mode l2           # ساخت کارت شبکه مجازی با مک مشترک اما IP جدا در لایه ۲
ip link add vrf-blue type vrf table 100                          # ساخت جدول و دامنه مسیریابی مجازی و ایزوله (VRF) به نام vrf-blue
```
## ۳. حذف اینترفیس‌های مجازی (`ip link delete`)
```bash
ip link delete dummy0       # حذف اینترفیس ساختگی dummy0
ip link delete veth0        # حذف اینترفیس مجازی veth0 (همزمان جفت آن یعنی veth1 نیز حذف می‌شود)
ip link delete eth0.100     # حذف اینترفیس مجازی VLAN با شناسه ۱۰۰
ip link delete br0          # حذف سوئیچ مجازی (Bridge)
ip link delete bond0        # حذف اینترفیس تجمیع کارت‌ها (Bond)
ip link delete macvlan0     # حذف اینترفیس مجازی macvlan0
ip link delete ipvlan0      # حذف اینترفیس مجازی ipvlan0
ip link delete vrf-blue     # حذف دامنه مسیریابی مجازی vrf-blue

```
