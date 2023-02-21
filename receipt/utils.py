import json
import requests
from datetime import datetime
from bs4 import BeautifulSoup


def extract_data_from_receipt(url: str) -> dict | None:
    if not url.startswith('https://suf.purs.gov.rs/'):
        return None

    page = requests.get(url=url)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id="collapse1")

    receipt_org_extract = list(results.find('pre').children)
    receipt: str = str(results.find_all('pre')).split('>')[1].split('<')[0]

    receipt_org: dict = {
        'receipt_start': receipt_org_extract[0], 
        'receipt_qr': receipt_org_extract[2].get('src'),
        'receipt_end': receipt_org_extract[3]
        }

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
    data['receipt_org'] = json.dumps(receipt_org)
    
    return data

# if __name__ == '__main__':

#     url = 'https://suf.purs.gov.rs/v/?vl=A1FGU0JUSEpGUUZTQlRISkbYQQEADj8BAITsyQEAAAAAAAABhca%2bQ2AAAAC368V0AwhDC8rN8PnANuXSsUv92GRAXwGrtdHnX9XfeFRYf7zuM2HFSstfOvfSYdpYURGxnnEr%2b7ikzZSi51g7gT0ZBl2J6zj6h2%2fCni4aTn9tTZEO2zIIpXs%2fVycwM1V2VYfzMjMmgCmIcM9xZ5T30eYDZasYC7FfalimGb7xSAaxpgX%2beZAXt8QcO8BopRMuA%2fnCWhKOdvjfEoNaeWv4p64bMjjwsz4B73Cwboa3KoclGARtCxj1ug3w6R72WQ5TTzRNDjE5DhMEHtGJoPbkkCb%2fdO3SY2hzHj9vw0gOK8FjWob2S7JuplF6njQ8qc%2bvVS%2fl85naXTRI7I5iRVJGZwSVpLMHvtDsQ8pYfBoA2lo8o7Tu7ucRAKPhp00IhpYKlX9CHjAhwvSsvPFajKJc0jFgB0QpbFmWDO9f1k2YhVJApKHYD7FUwbyZTi6X72yV9UnWv4CR9xTLQ0ZU0TSpi7D%2fDiA0wuADKZgejUdSw%2fXJDYL5Zrj%2bZ0bwORXdDA%2f7NWL5p6BdcLGsONCitNnzcJlE3vkLQED4t07eIG6ZT%2fFZcn7sG%2b%2bKw%2brx4IEf2dn4%2fs3i0zY7RxaA7pOLg0VK1NIiBF2jw3pToS5pO330LHl0PA%2f2DW%2bL5w%2fINF2ifhy4Q8w54dwkk4SSpzLfI55C5luxv4V8u8KWoH%2bnCuIBDLjJJC40Rsq%2f4GAE4nO6AbA%3d'
#     data = extract_data_from_receipt(url)

#     print(data)