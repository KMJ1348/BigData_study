import requests
from bs4 import BeautifulSoup

url = "https://www.naver.com"
result = requests.get(url)
html = result.text
soup = BeautifulSoup(html,"html.parser")
print(soup)
