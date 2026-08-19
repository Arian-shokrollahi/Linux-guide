
## ا<mark>Here Document</mark> چیست؟

ا**Here Document** یک روش در Bash برای دادن **متن چندخطی به ورودی استاندارد یک دستور** است.

یعنی به‌جای اینکه متن را خط‌به‌خط با چند دستور `echo` بنویسیم، آن را مستقیم داخل اسکریپت قرار می‌دهیم و به یک command می‌دهیم.

## ساختار Here document به چه صورته؟
ا<mark>ما به جایه اون token میتونیم هر چیزی که دلمون میخواد بزاریم  ولی چون اکثرا EOF میزارن که مخفف end of line است ما هم از EOF  استفاده کردیم</mark>

<p align="center">
	<img src="23-images/EOFwithqoute.png" alt="heredoc.token" width=500>
</p>

```
here document structure:


command << TOKEN
متن چندخطی
TOKEN
====
example:
cat << EOF
Line 1
Line 2
Line 3
EOF
===
output--->
Line 1
Line 2
Line 3
```
اینطوری خیلی بهتره تا برایه هر خط از echo یا printf اینا استفاده کنیم اونها هم بد نیست ولی ما دنبال 🏃سرعت باالا هستیم و این نشون دهنده حرفه ای بودن و تسلط ما است

---
# یه مقایسه ای بکنیم از نوشتن shell script  با  heredocument & printf & echo
# سه روش برای نوشتن متن چندخطی

فرض کن می‌خواهیم یک فایل HTML بسازیم.
1-with echo
```
echo "<html>" > page.html
echo "  <head>" >> page.html
echo "    <title>My Page</title>" >> page.html
echo "  </head>" >> page.html
echo "  <body>" >> page.html
echo "    <h1>Hello</h1>" >> page.html
echo "  </body>" >> page.html
echo "</html>" >> page.html

```
2-withprintf
```
printf '%s\n' \
  '<html>' \
  '  <head>' \
  '    <title>My Page</title>' \
  '  </head>' \
  '  <body>' \
  '    <h1>Hello</h1>' \
  '  </body>' \
  '</html>' > page.html

```
3-with heredocument
```
cat > page.html << EOF
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
EOF

```
دیگه قضاوتش با خودتون🤣 با هرکدوم راحتید: من که Here document  انتخابمه.
اینم درمورد heredocument و token نوشتم برید نگاه کنید باحاله:
[heredoc.and.toke](../extra_technic/02-EOF-for-document.md)
