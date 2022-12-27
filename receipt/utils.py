import json
import requests
from datetime import datetime
from bs4 import BeautifulSoup


def extract_data_from_receipt(url: str) -> dict:
    if not url.startswith('https://suf.purs.gov.rs/'):
        print('Bad url')
        return None

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