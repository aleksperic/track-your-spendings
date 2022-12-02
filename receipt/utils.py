import json
import requests

from datetime import datetime
from bs4 import BeautifulSoup


def extract_data_from_receipt(url):
    if not url.startswith('https://suf.purs.gov.rs/'):
        print('Bad url')
        return

    page = requests.get(url=url)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id="collapse1")

    receipt = str(results.find_all('pre')).split('>')[1].split('<')[0]

    receipt_element_list = []
    receipt = receipt.split('\n')
    for line in receipt:
        receipt_element_list.append(line.split())

    data_list = []
    sub_data_list = []
    for i in range(1, len(receipt_element_list)):
        if not receipt_element_list[i][0].startswith('='):
            sub_data_list.append(receipt_element_list[i])
        else:
            data_list.append(sub_data_list)
            sub_data_list = []

    data = {}
    data['store'] = ' '.join(data_list[0][1])
    items = []
    for i in range(1, len(data_list[1])-3, 2):
        data_list[1][i].pop()
        items.append(' '.join(data_list[1][i]))

    total_price = float(data_list[1][-1][-1].replace('.', '').replace(',', '.'))
    tax_price = float(data_list[2][-1][-1].replace('.', '').replace(',', '.'))
    purchase_date = data_list[3][0][-2].replace('.', '/')[:-1]
    purchase_time = data_list[3][0][-1]
    receipt_id = data_list[3][1][-1]

    data['items'] = json.dumps(items)
    data['total_price'] = total_price
    data['tax_price'] = tax_price
    data['purchase_date'] = datetime.strptime(purchase_date, '%d/%m/%Y').date()
    data['purchase_time'] = datetime.strptime(purchase_time, '%X').time()
    data['receipt_id'] = receipt_id
    
    return data