

from lxml import html
import requests
import re
import datetime
from collections import Counter
import json

# scrape
page = requests.get('http://www.goodreads.com/topic/show/1631814-mollie-t-s-2014-books')
tree = html.fromstring(page.text)

# we want to scrape the first div with class "comment":
comment = tree.xpath('//*[@id="comment_89570136"]/div[@class="mediumText reviewText"]/text()')
title = tree.xpath('/html/head/title/text()')
title = ''.join(title)

year = re.findall('(20[0-9]+)(?=.*)', title)
year = year[0]

print "Year: ", year

# date:
dates = []
for i in comment:
	# match everything between "finished " and "."
	# (?<=finished )([A-Za-z0-9 ]*)(?=.)
	dates += re.findall('(?<=finished )([A-Za-z0-9 ]*)(?=.)', i)

# format dates
dates = [datetime.datetime.strptime(d, "%B %d") for d in dates]
dates = [datetime.datetime.strftime(d, year + "-%m-%d") for d in dates]

# date frequencies
c_dates = Counter(dates)
print "Books read: ", len(dates)
print sorted(c_dates.items())

# month:
months = []
for i in comment:
	months += re.findall('(?<=finished )([A-Za-z]*)', i)

# add year to months (optional, but allows logical sorting and easy combination with other years)
months = [datetime.datetime.strptime(m, "%B") for m in months]
months = [datetime.datetime.strftime(m, year + "-%m") for m in months] 

c_months = Counter(months)
print sorted(c_months.items())
data = sorted(c_months.items())

def ComplexHandler(Obj):
    if hasattr(Obj, 'jsonable'):
        return Obj.jsonable()
    else:
        raise TypeError, 'Object of type %s with value of %s is not JSON serializable' % (type(Obj), repr(Obj))


# export to json:
# with open('scraped-data.json', 'w') as outfile:
#     json.dump(sorted(c_months.items()), outfile)
print json.dumps(data, default=ComplexHandler)
# return json.dumps(data, default=ComplexHandler)