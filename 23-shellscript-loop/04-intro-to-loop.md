# 04-intro to loop
# 04بریم یه مقدمه ای از حلقه ها درون شل لینوکس/بش ببینیم
---
# حلقه چیست؟
حلقه loop یعنی یک دستور را چند بار تکرار کنیم مثل:
- رویه چند فایل کارکنیم
- یک دستور رو برایه چند مقدار اجرا کنیم
- تا وقتی یک شرط برقرار است کاری کنیم
---
# چه چیزایی رو باید بدونی از قبل:
- ا-<mark>1</mark> اول باید دستور ها و نحوه ی اجرایه اون رو بدونید مثلا:
```bash
echo "Hello"
pwd
ls
```
  --- 
  - ا-<mark>2</mark>متغیر هارو  باید بدونی که چطوری تعریف میشوند و مفهوم متغیر هایه سراسری و محلی که چیست
  - متغیر محلی : متغیری است که در تابع تعریف میشود
  - متغیر سراسری : متغیری است که بیرون است تابع تعریف شده و از همه جا در دسترس است
  - و تعریف کردن متغیر ها:
  - برایه تعریف کردن متغیر و ریختنی مقداری در متغیری قبل و بعد مساوی فاصله نزارید
  ```bash
  # درست
name="Ali"

# غلط
name = "Ali"

  ```
  ---
  - ا-<mark>3</mark>عملیات هایه عددی  برایه شمارنده ی حلقه نیاز دارید.
  
  ```bash
count=1
count=$((count + 1))

echo "$count"

  ```
  ---
  - ا-<mark>4</mark> شرط ها باید بتونی برسی کنی که چیزی درست است یا خیر. مثلا:
  ```bash
if [ "$count" -lt 5 ]; then
 echo "کمتر از 5 است"
fi
  ```
  این مقایسه هایه مهم رو بلد باش خیلی مهمه:
  ```bash
-eq   برابر--->equal
-ne   نابرابر--->not equal
-lt   کوچک‌تر--->less than
-le   کوچک‌تر یا مساوی--->less equal
-gt   بزرگ‌تر--->great 
-ge   بزرگ‌تر یا مساوی--->great equal

  ```
  ---
  - ا-<mark>5</mark>لیست و ارایه ها
  - حلقه ی for  معمولا رویه یک لیست اجرا میشود
  ```bash
for name in Ali Sara Reza; do
  echo "$name"
done
  ```
  ارایه
  ```bash
names=("Ali" "Sara" "Reza")

for name in "${names[@]}"; do
  echo "$name"
done

  ```
  ---
  - ا-<mark>6</mark>ساختار حلقه ی for--->حالا باید حلقه ی for  رو یاد بگیری
```bash
for item in one two three; do
  echo "$item"
done
```
ساختار کلی به این صورت است:
```bash
for variable in list; do
  commands
done
```
---
- ا-<mark>7</mark> ساختار while & until
- ا-while-->تا وقتی شرط درسته
```bash
count=1

while [ "$count" -le 5 ]; do
  echo "$count"
  count=$((count + 1))
done

```
- ا-until-->تا وقتی شرط درست شود
```bash
count=1

until [ "$count" -gt 5 ]; do
  echo "$count"
  count=$((count + 1))
done

```
---
- ا-<mark>8</mark>کنترل حلقه با break & continue
- ا-break--->خروج کامل از حلقه
```bash
for i in 1 2 3 4 5; do
  if [ "$i" -eq 3 ]; then
    break
  fi

  echo "$i"
done
```
- ا-continue-->رد کردن دور فعلی
```bash
for i in 1 2 3 4 5; do
  if [ "$i" -eq ## ۹. کار با فایل‌ها fi

  echo "$i"
done
```
---
ا-<mark>9</mark> کار با فایل ها و ورودی
باید بتوانی رویه فایل ها حلقه بزنی
```bash
for file in *.txt; do 
 echo "$file"
done
```
و فایل هارو خط به خط بخوانی
```bash
while IFS= read -r line; do
  echo "$line"
done < names.txt
```
این روش برایه خواندن فایل ها بهتر از روش هایه عادی و ناامن است

---
ا-<mark>10</mark>چندتا نکته مهم پایانی
کوتیشن و متغیر ها
```bash
echo "$filename" # این بهتره 
echo $filename # تا این
```
---
### نگران نباشید اگر خیلی متوجه نمیشوید چون این قسمتی که توضیح دادم شروعی برایه این قسمت جذاب بود و در جلو تر ریزتر میشویم
---
