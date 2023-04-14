import requests
from bs4 import BeautifulSoup
url = 'https://kin.naver.com/search/list.nhn?query=파이썬'
response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    # ul 태그중 basic1 클래스를 가진 녀석을 뽑아오는 선택자
    ul = soup.select_one('ul.basic1')

    titles = ul.select('li > dl > dt >a')
    print(titles)
    for title in titles:
        print(title.get_text())

else :
    print(response.status_code)