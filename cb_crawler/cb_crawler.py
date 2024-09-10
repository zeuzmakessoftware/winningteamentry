# To put it simply, MultiOn is like python selenium with LLM.
import urllib.request
import gzip
import shutil
import xml.etree.ElementTree as ET
import os
import json
from multion.client import MultiOn

# They did not provide an API key. Use MulitOn online Playground instead

# client = MultiOn(
#     api_key="YOUR_API_KEY",
# )
# create_response = client.sessions.create(
#     url="https://www.crunchbase.com/www-sitemaps/sitemap-index.xml",
#     use_proxy=True
# )

# session_id = create_response.session_id
# retrieve_response = client.retrieve(
#     session_id=session_id,
#     cmd="Get all URL.",
#     fields=["URL"]
# )

# json_data = retrieve_response.data

# Sample JSON data
json_data = '''
[
  {
    "URL": "https://www.crunchbase.com/www-sitemaps/sitemap-acquisitions-0.xml.gz"
  },
  {
    "URL": "https://www.crunchbase.com/www-sitemaps/sitemap-acquisitions-1.xml.gz"
  },
  {
    "URL": "https://www.crunchbase.com/www-sitemaps/sitemap-acquisitions-2.xml.gz"
  },
  {
    "URL": "https://www.crunchbase.com/www-sitemaps/sitemap-organizations-1.xml.gz"
  }
]
'''

# Convert JSON string to Python list
data = json.loads(json_data)

# Filter URLs that contain the string 'organizations'
filtered_urls = [item["URL"] for item in data if "organizations" in item["URL"]]


# Download and extract .gz file, then parse the XML to extract more URLs
def download_and_extract_gz(url):
    # Extract file name from the URL
    local_filename = url.split("/")[-1]

    # Set up request with headers to bypass 
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    req = urllib.request.Request(url, headers=headers)

    try:
        # Download the gz file using urllib with the headers
        with urllib.request.urlopen(req) as response, open(local_filename, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)

        # Decompress the gz file
        xml_filename = local_filename.replace(".gz", "")
        with gzip.open(local_filename, 'rb') as f_in:
            with open(xml_filename, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)

        # Parse the XML and extract more URLs
        tree = ET.parse(xml_filename)
        root = tree.getroot()

        # Assuming the URLs are inside <loc> tags
        urls = []
        for loc in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
            urls.append(loc.text)

        # Remove the downloaded files
        os.remove(local_filename)
        os.remove(xml_filename)

        return urls

    except Exception as e:
        print(f"Failed: {url} ; Error: {e}")
        return []

# Download and extract URLs from the XML files
all_extracted_urls = []
for url in filtered_urls:
    extracted_urls = download_and_extract_gz(url)
    all_extracted_urls.extend(extracted_urls)


# They did not provide an API key. Use MulitOn online Playground instead
# get the info we want
# for url in all_extracted_urls:
#     create_response = client.sessions.create(
#         url=url,
#         use_proxy=True
#     )
#     session_id = create_response.session_id
#     retrieve_response = client.retrieve(
#         session_id=session_id,
#         cmd="Get all summary on crunchbase with About as a string, Headquarters Location as a string, and Number of Employees as an integer",
#         fields=["About", "Headquarters Location", "Number of Employees"]
#     )


# Save extracted URLs to a .txt file
# with open('extracted_urls.txt', 'w') as f:
#     for url in all_extracted_urls:
#         f.write(url + '\n')

# print("URLs have been saved to 'extracted_urls.txt'")

