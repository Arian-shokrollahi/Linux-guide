ا-`jq` یک ابزار Command Line برای **خواندن، فیلتر کردن، مرتب‌سازی و استخراج اطلاعات از JSON** است.

اگر با Docker، Kubernetes، APIها یا ابزارهای Cloud کار کنی، خیلی به کارت می‌آید چون خروجی خیلی از این ابزارها JSON است.

## ساختار کلی

```
COMMAND_THAT_RETURNS_JSON | jq 'FILTER'
```

| Filter / Syntax | چه کاری می‌کند؟                   | مثال                                       |
| --------------- | --------------------------------- | ------------------------------------------ |
| `.`             | کل JSON را برمی‌گرداند            | `jq '.'`                                   |
| `.Name`         | مقدار یک Field را می‌گیرد         | `jq '.Name'`                               |
| `.State.Status` | وارد Fieldهای تو‌در‌تو می‌شود     | `jq '.State.Status'`                       |
| `.[0]`          | اولین عضو Array                   | `jq '.[0]'`                                |
| `.[1]`          | دومین عضو Array                   | `jq '.[1]'`                                |
| `.[0].Name`     | Field از عضو اول Array            | `jq '.[0].Name'`                           |
| `.[]`           | همه اعضای Array/Object            | `jq '.[]'`                                 |
| `.Containers[]` | پیمایش همه Containerها            | `jq '.[0].Containers[]'`                   |
| `\|`            | خروجی یک Filter را به بعدی می‌دهد | `jq '.[] \| .Name'`                        |
| `select(...)`   | فقط موارد مطابق شرط               | `jq '.[] \| select(.State=="running")'`    |
| `keys`          | نمایش Keyهای Object               | `jq '.[0] \| keys'`                        |
| `length`        | تعداد اعضا                        | `jq '.[0].Mounts \| length'`               |
| `map(...)`      | اجرای Filter روی همه اعضا         | `jq 'map(.Name)'`                          |
| `has("key")`    | بررسی وجود یک Key                 | `jq 'has("Name")'`                         |
| `-r`            | حذف `"` از خروجی String           | `jq -r '.[0].Name'`                        |
| `{...}`         | ساخت خروجی سفارشی                 | `jq '.[0] \| {name:.Name,driver:.Driver}'` |

---

## مثال عملی فکر کن من میخوام کانتینر هایه درون شبکه که در داکر ساختم رو ببنیم چون با json است ببنید

```docker network inspect networkname
"Containers": {
            "203bb1e5db64432325a8188087fef861f0c3b7db83baba77d8905e712626d390": {
                "Name": "db",
                "EndpointID": "18df228b783684bd2edddad2791e4dce39fcfaf3ffa316c09329a73df4a84fb8",
                "MacAddress": "96:79:50:fc:a9:57",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "53d6005abb8a758b85a7cc4e5239de7645d83ba91cded9d0af0babe05071fa19": {
                "Name": "web",
                "EndpointID": "2d110c5bcbd2535562d0fff9fdc9b6faddea96883b79505432ae6da0f516f6a6",
                "MacAddress": "c2:b8:23:97:a4:3b",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
         ........

```
- اگر docker network inspect networkname  رو بزنم اگر کانتینری در زمان run با فلگ network-- بهش وصل شده باشد رو در قسمت Containers میگه ها اگر از  

```bash
docker network inspect -f '{{json .Containers}}' app-net | jq

---
output
---
root@alfamachine:~# docker network inspect -f '{{json .Containers}}' app-net
{"203bb1e5db64432325a8188087fef861f0c3b7db83baba77d8905e712626d390":{"Name":"db","EndpointID":"18df228b783684bd2edddad2791e4dce39fcfaf3ffa316c09329a73df4a84fb8","MacAddress":"96:79:50:fc:a9:57","IPv4Address":"172.18.0.2/16","IPv6Address":""},"53d6005abb8a758b85a7cc4e5239de7645d83ba91cded9d0af0babe05071fa19":{"Name":"web","EndpointID":"2d110c5bcbd2535562d0fff9fdc9b6faddea96883b79505432ae6da0f516f6a6","MacAddress":"c2:b8:23:97:a4:3b","IPv4Address":"172.18.0.3/16","IPv6Address":""}}

```
- همچی تو دله همدیگست
- باید چیکار کنم از دستور --->jq استفاده کنم

```bash
root@alfamachine:~# docker network inspect -f '{{json .Containers}}' app-net | jq
----
output

----
{
  "203bb1e5db64432325a8188087fef861f0c3b7db83baba77d8905e712626d390": {
    "Name": "db",
    "EndpointID": "18df228b783684bd2edddad2791e4dce39fcfaf3ffa316c09329a73df4a84fb8",
    "MacAddress": "96:79:50:fc:a9:57",
    "IPv4Address": "172.18.0.2/16",
    "IPv6Address": ""
  },
  "53d6005abb8a758b85a7cc4e5239de7645d83ba91cded9d0af0babe05071fa19": {
    "Name": "web",
    "EndpointID": "2d110c5bcbd2535562d0fff9fdc9b6faddea96883b79505432ae6da0f516f6a6",
    "MacAddress": "c2:b8:23:97:a4:3b",
    "IPv4Address": "172.18.0.3/16",
    "IPv6Address": ""
  }
}

```

- حالا مرتب شد
