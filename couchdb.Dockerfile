FROM couchdb:3.1.1

COPY deployments/couchdb/local.ini /opt/couchdb/etc/
