# app/elasticsearch_client.py
from elasticsearch import AsyncElasticsearch

# Single ES client — correct for Elasticsearch 8.x
es = AsyncElasticsearch(
    hosts=["http://localhost:9200"]
)
