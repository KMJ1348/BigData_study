from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome("chromedriver.exe")

driver.get("https://www.google.com")

time.sleep(3)

elem = driver.find_element(By.CSS_SELECTOR,'#APjFqb')
elem.send_keys("코로나")
elem.send_keys(Keys.RETURN)

time.sleep(200)