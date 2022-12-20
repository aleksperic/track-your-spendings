import json
import requests
from datetime import datetime
from bs4 import BeautifulSoup


def extract_data_from_receipt(url: str) -> dict:
    if not url.startswith('https://suf.purs.gov.rs/'):
        print('Bad url')
        return

    page = requests.get(url=url)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id="collapse1")

    receipt_org: str = str(results.find_all('pre'))[1:-1]
    receipt: str = str(results.find_all('pre')).split('>')[1].split('<')[0]

    receipt_element_list: list = []
    receipt = receipt.split('\n')
    for line in receipt:
        receipt_element_list.append(line.split())

    data_list: list = []
    sub_data_list: list = []
    for i in range(1, len(receipt_element_list)):
        if not receipt_element_list[i][0].startswith('='):
            sub_data_list.append(receipt_element_list[i])
        else:
            data_list.append(sub_data_list)
            sub_data_list = []

    data: dict = {}
    data['store'] = ' '.join(data_list[0][1])
    items: dict = {}
    item_number: int = 1
    for i in range(1, len(data_list[1])-3, 2):
        data_list[1][i].pop()
        data_list[1][i][-1] = data_list[1][i][-1].split('/')[0]
        items[item_number] = ' '.join(data_list[1][i])
        item_number += 1

    total_price: float = float(data_list[1][-1][-1].replace('.', '').replace(',', '.'))
    tax_price: float = float(data_list[2][-1][-1].replace('.', '').replace(',', '.'))
    purchase_date: str = data_list[3][0][-2].replace('.', '/')[:-1]
    purchase_time: str = data_list[3][0][-1]
    receipt_id: str = data_list[3][1][-1]

    data['items'] = json.dumps(items)
    data['total_price'] = total_price
    data['tax_price'] = tax_price
    data['purchase_date'] = datetime.strptime(purchase_date, '%d/%m/%Y').date()
    data['purchase_time'] = datetime.strptime(purchase_time, '%X').time()
    data['receipt_id'] = receipt_id
    data['receipt_org'] = receipt_org
    
    return data

if __name__ == "__main__":

    # from serializers import ReceiptSerializer
    URL4 = 'https://suf.purs.gov.rs/v/?vl=A1NYQUw0M0gyU1hBTDQzSDIITAEAeksBAIyF8gAAAAAAAAABhM8QGrIAAAAt95lHkGrxjvkz7F66Kmj6iuQ4OHm58KH3q%2FKY%2FLAtEPcsWTEc7zro0K2fVyRxuyaFBBdPNjA21FV6UQkcQsJ7P28ksbrmydpP50obk6zs%2BU63tKKQX78oG0zDEbh2tPX4I4oSEar314UomgiGiwN91Slzc7nV4uLG7tOS%2F%2BIhtm6iTBp3pzuZ7iJtcdUMH6ehwpCgktWQmKr2gNVZKgt3xJ8gRbgh%2FbiEDlaoa%2FtEGppgmxryFoRc0kU6TfVPDhU%2FAGZ0RIo29ZvzYeAI%2BeE3jNg8PsOQp3QgcmGESzqX1UpiNvLa98EjhzfNyrBbsRsYoM3%2FHWyQ%2FoAEqWqrvTv7W6%2BD4NFngG0GkhaMK9u%2FeLjoQ8SDb7sWGFD0RjQ7aYeVaY0fydFKcVW2TMvcr%2BQV1zrM%2BGtpL2Ahwnu2u5pUddh%2FfW50N9MHL2r%2BQmxWIb8rvCOg3a%2Bogs1ZPfQXsbzwCuLWrwLS6BShEQUn9OmZCn9Fj0V9925QNrZJR5M2Pw8ezCAD1ApluKfGX3eqGbgUUXcB5Kbumxd4rpi1cVZQ4IT0adUGQUpNYlqveSbBFRRlyhzuN7OGYC%2BEBLqqTVUFe9KorjjOfuK%2BgOAC4gePjvvimwoii4L%2BnjHOEU5STzDmIU7c%2BYT1sMeoXV4V0ujcc5VUDJHoZI02O5%2BNjUNyZdr63z3ac9Tn0GHGivjo0uI%3D'

    data = extract_data_from_receipt(URL4)

    # serializer = ReceiptSerializer(data=data)
    print(data['items'])