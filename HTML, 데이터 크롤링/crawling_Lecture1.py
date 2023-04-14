import requests
from bs4 import BeautifulSoup
url = 'https://kin.naver.com/search/list.nhn?query=파이썬'
response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    print(soup)

    title = soup.select_one('#s_content > div.section > ul > li:nth-child(1) > dl > dt > a')
    #텍스트만 뽑아오고 싶다면 get_text() 함수를 이용.
    print(title)

    #print(title.get_text())
else :
    print(response.status_code)