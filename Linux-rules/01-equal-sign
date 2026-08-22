# equal sign rule-01
# قانون علامت = درون لینوکس
---
# کجاها میتونیم فاصله بزاریم قبل و بعد مساوی و کجاها نمیتوانیم بزاریم:
- ا-<mark>🆗</mark>در shell/bash موقع مقداردهی متغیر نباید قبل و بعد علامت مساوی
```bash
name="Tafavote"       # درست
age=20                # درست
local city="Tehran"   # درست
readonly x=10         # درست
export PATH="/my/bin:$PATH"  # درست
---
name = "Tafavote"     # غلط
age = 20              # غلط
local city = "Tehran" # غلط

```

- در **شرط‌ها و مقایسه‌ها** معمولاً باید فاصله وجود داشته باشد:
```bash
if [ "$age" = 20 ]; then
    echo "age is 20"
fi
---
if [[ "$age" == 20 ]]; then
    echo "age is 20"
fi

```
---
پس در قسمت هایی که مقدار دهمی است نباید فاصله و در شرط ها معمولا باید فاصله .
