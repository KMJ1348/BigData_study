from selenium import webdriver
import time
driver = webdriver.Chrome("chromedriver.exe")

url = "https://www.naver.com"
driver.get(url)

time.sleep(3)

url = "https://www.daum.net"
driver.get(url)

driver.quit()
