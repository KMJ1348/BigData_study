import requests
from bs4 import BeautifulSoup

from openpyxl import workbook

url = "https://finance.naver.com/"

response = requests.get(url)
html = response.text

soup = BeautifulSoup(html, 'html.parser')

tbody = soup.select_one('#container > div.aside > div > div.aside_area.aside_popular > table > tbody')
#print(tbody.select("a").text)

print(tbody)

price_list = tbody.select("td")
slist = tbody.select("a")

count=0
for i in range(0, len(price_list),2):
    temp=slist[count]
    print("종목이름:", temp.text, "종목코드:",  str(temp)[str(temp).find("code=")+5 : (str(temp).find("code=")+5 ) +6],\
        "현재가:",price_list[i].text, "전일대비:",price_list[i+1].text)

    count += 1
    #print(    str(i)[str(i).find("code=")+5: (str(i).find("code=")+5 ) +6 ]    )
    #print(i.text)