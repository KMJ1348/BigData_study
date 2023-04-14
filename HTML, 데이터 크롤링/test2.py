from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome("chromedriver.exe")

driver.get("https://www.naver.com")

driver.find_element(By.CSS_SELECTOR,"#NM_FAVORITE > div.group_nav > ul.list_nav.NM_FAVORITE_LIST > li:nth-child(8) > a").click()

driver.find_element(By.CSS_SELECTOR,"#menu > li:nth-child(3) > a").click()

time.sleep(200)