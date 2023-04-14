from selenium import webdriver
import time

from bs4 import BeautifulSoup



driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://www.youtube.com/watch?v=8pSC6QgxFzI&t=593s")

driver.execute_script("window.scrollTo(0, 800)")
time.sleep(3)

last_height = driver.execute_script("return document.documentElement.scrollHeight")

#스크롤을 2번 내리는 구문
#while True: # 끝까지 내릴때
for i in range(0,2): # 2번만 내리겠다.
    #스크롤을 내리고
    driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
    #댓글이 다 뜰때까지 기다리기 위해서 1.5초 기다림
    time.sleep(1.5)
    #내린 상태의 높이를 반환 new_height
    new_height = driver.execute_script("return document.documentElement.scrollHeight")
    #다 내렸을때 더이상 스크롤이 안내려 가니까 before 과 높이가 같으므로 스크롤을 다 내렸다고 판단 할 수 있다. 
    #그 때 break 문으로 더의상 loop 를 돌지않는다.
    if new_height == last_height: 
        break

    #내린 상태의 높이 값이 new_height 한테 있으니까 이걸 마지막 높이로 재정의
    last_height = new_height

time.sleep(10)

html_source = driver.page_source
soup = BeautifulSoup(html_source, 'html.parser')

                        #div중에 id가 header-author인걸 찾고 id가 autor-text인걸 찾고, span부분
id_list = soup.select("#author-text > span")
content_list = soup.select("#content-text")

import pandas as pd

id_list_zip =[]
content_list_zip =[]

for i in range(0, len(id_list)):
    id_list_zip.append(str(id_list[i].text).strip())
    content_list_zip.append(content_list[i].text)
    print("===================")

sdict={'작성자':id_list_zip,
       '댓글':content_list_zip}

you_tube = pd.DataFrame(sdict)

you_tube.to_csv("youtube_result.csv")

#for i in content_list:
#    print(i.text)
#    print("==============================")

#for i in id_list:
#    print(type(i))
#    print(str(i.text)i.strip())    # i 는 bs4의 객체이기 때문에 text 내장 변수가 있다.
                        #yt-formatted-string 요소 중에 id가 content-text인것들 찾기
#comment_list = soup.select("yt-formatted-string#content-text")

#print(comment_list)