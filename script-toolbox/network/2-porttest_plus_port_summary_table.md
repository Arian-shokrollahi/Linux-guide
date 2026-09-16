## اسکریپت مرور پورت + تست پورت

---
1- این رو در اون مسیری که فایل هایه اجرایی شخصیتونه بزاید درون یک فایل و بهش دسترسی chmod +x بدید 
```
```bash
#!/bin/bash

# ==========================================
#       🚀 NETWORK PORT HELPER 🚀
# ==========================================

clear

# Port database
declare -A SERVICE
declare -A DESCRIPTION
declare -A PROTOCOL

SERVICE[20]="FTP-Data"
SERVICE[21]="FTP"
SERVICE[22]="SSH"
SERVICE[23]="Telnet"
SERVICE[25]="SMTP"
SERVICE[53]="DNS"
SERVICE[67]="DHCP-Server"
SERVICE[68]="DHCP-Client"
SERVICE[80]="HTTP"
SERVICE[110]="POP3"
SERVICE[143]="IMAP"
SERVICE[443]="HTTPS"
SERVICE[465]="SMTPS"
SERVICE[587]="SMTP-Submission"
SERVICE[993]="IMAPS"
SERVICE[995]="POP3S"
SERVICE[3306]="MySQL"
SERVICE[5432]="PostgreSQL"
SERVICE[6379]="Redis"
SERVICE[8080]="HTTP-Alt"
SERVICE[8443]="HTTPS-Alt"

PROTOCOL[20]="TCP"
PROTOCOL[21]="TCP"
PROTOCOL[22]="TCP"
PROTOCOL[23]="TCP"
PROTOCOL[25]="TCP"
PROTOCOL[53]="TCP/UDP"
PROTOCOL[67]="UDP"
PROTOCOL[68]="UDP"
PROTOCOL[80]="TCP"
PROTOCOL[110]="TCP"
PROTOCOL[143]="TCP"
PROTOCOL[443]="TCP"
PROTOCOL[465]="TCP"
PROTOCOL[587]="TCP"
PROTOCOL[993]="TCP"
PROTOCOL[995]="TCP"
PROTOCOL[3306]="TCP"
PROTOCOL[5432]="TCP"
PROTOCOL[6379]="TCP"
PROTOCOL[8080]="TCP"
PROTOCOL[8443]="TCP"

DESCRIPTION[20]="FTP data transfer"
DESCRIPTION[21]="FTP control connection"
DESCRIPTION[22]="Secure remote login"
DESCRIPTION[23]="Remote terminal (unencrypted)"
DESCRIPTION[25]="Sending email"
DESCRIPTION[53]="DNS name resolution"
DESCRIPTION[67]="DHCP server"
DESCRIPTION[68]="DHCP client"
DESCRIPTION[80]="Web / HTTP"
DESCRIPTION[110]="Receiving email"
DESCRIPTION[143]="Receiving email"
DESCRIPTION[443]="Secure Web / HTTPS"
DESCRIPTION[465]="SMTP over TLS"
DESCRIPTION[587]="Email submission"
DESCRIPTION[993]="IMAP over TLS"
DESCRIPTION[995]="POP3 over TLS"
DESCRIPTION[3306]="MySQL database"
DESCRIPTION[5432]="PostgreSQL database"
DESCRIPTION[6379]="Redis database"
DESCRIPTION[8080]="Alternative HTTP"
DESCRIPTION[8443]="Alternative HTTPS"


# ==========================================
#               MAIN MENU
# ==========================================

while true; do

    clear

    echo "╔══════════════════════════════════════════╗"
    echo "║       🚀 NETWORK PORT HELPER 🚀         ║"
    echo "╠══════════════════════════════════════════╣"
    echo "║                                          ║"
    echo "║  1) 📋 Show Common Ports                 ║"
    echo "║  2) 🔎 Search Port                       ║"
    echo "║  3) 🌐 Test Port with nc                 ║"
    echo "║  4) 💡 Quick Examples                    ║"
    echo "║  5) ❌ Exit                              ║"
    echo "║                                          ║"
    echo "╚══════════════════════════════════════════╝"

    echo
    read -p "👉 انتخاب کن: " choice


    # ======================================
    # 1. SHOW PORTS
    # ======================================

    if [ "$choice" = "1" ]; then

        clear

        echo "╔══════════════════════════════════════════════════════╗"
        echo "║                📋 COMMON PORTS                      ║"
        echo "╠════════╦════════════════╦═══════════════════════════╣"
        printf "║ %-6s ║ %-14s ║ %-25s ║\n" "PORT" "SERVICE" "DESCRIPTION"
        echo "╠════════╬════════════════╬═══════════════════════════╣"

        for port in 20 21 22 23 25 53 67 68 80 110 143 443 465 587 993 995 3306 5432 6379 8080 8443
        do
            printf "║ %-6s ║ %-14s ║ %-25s ║\n" \
                "$port" \
                "${SERVICE[$port]}" \
                "${DESCRIPTION[$port]}"
        done

        echo "╚════════╩════════════════╩═══════════════════════════╝"

        echo
        read -p "Enter برای برگشت..."
    fi


    # ======================================
    # 2. SEARCH PORT
    # ======================================

    if [ "$choice" = "2" ]; then

        clear

        read -p "🔎 شماره Port را وارد کن: " port

        if [[ -n "${SERVICE[$port]}" ]]; then

            echo
            echo "╔══════════════════════════════════════╗"
            echo "║           🔍 PORT INFORMATION        ║"
            echo "╠══════════════════════════════════════╣"
            echo "║ Port       : $port"
            echo "║ Service    : ${SERVICE[$port]}"
            echo "║ Protocol   : ${PROTOCOL[$port]}"
            echo "║ Description: ${DESCRIPTION[$port]}"
            echo "╚══════════════════════════════════════╝"

        else

            echo
            echo "❌ این Port در لیست ما نیست."

        fi

        echo
        read -p "Enter برای برگشت..."
    fi


    # ======================================
    # 3. TEST PORT
    # ======================================

    if [ "$choice" = "3" ]; then

        clear

        read -p "🌐 Host / IP: " host
        read -p "🔌 Port: " port

        echo
        echo "🔄 در حال تست $host:$port ..."
        echo

        nc -zv -w 3 "$host" "$port"

        echo
        read -p "Enter برای برگشت..."
    fi


    # ======================================
    # 4. QUICK EXAMPLES
    # ======================================

    if [ "$choice" = "4" ]; then

        clear

        echo "╔══════════════════════════════════════════╗"
        echo "║             💡 QUICK EXAMPLES            ║"
        echo "╚══════════════════════════════════════════╝"

        echo
        echo "🔐 SSH"
        echo "   nc -zv example.com 22"

        echo
        echo "🌐 HTTP"
        echo "   nc -zv example.com 80"

        echo
        echo "🔒 HTTPS"
        echo "   nc -zv example.com 443"

        echo
        echo "📡 DNS"
        echo "   nc -zv example.com 53"

        echo
        echo "🗄️ MySQL"
        echo "   nc -zv example.com 3306"

        echo
        echo "🐘 PostgreSQL"
        echo "   nc -zv example.com 5432"

        echo
        echo "=========================================="

        read -p "Enter برای برگشت..."
    fi


    # ======================================
    # 5. EXIT
    # ======================================

    if [ "$choice" = "5" ]; then

        clear

        echo
        echo "👋 Bye!"
        echo

        exit 0

    fi

done
```
- حواستون باشد که اوله و اخرش triple qoute نخوره و shebang هم بزارید

---
### چیزهایی که این اسکریپت بهتون میده
```
🚀 NETWORK PORT HELPER
│
├── 1 📋 Show Common Ports
│      └── نمایش Portهای معروف
│
├── 2 🔎 Search Port
│      └── مثلاً 22 → SSH
│
├── 3 🌐 Test Port
│      └── مثلاً example.com + 443
│
├── 4 💡 Quick Examples
│      └── مثال‌های آماده nc
│
└── 5 ❌ Exit
```
1. لیست تمام پورت ها برایه دوره سریع
2. سرچ اون پورت مدنظرتون
3. تست با دادن اول dest وسپس port که ایا open هست یا خیر
4. مثال هایی برایه دوره 
5. خروج چون interactive است
