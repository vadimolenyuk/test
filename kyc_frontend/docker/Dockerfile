FROM nginx
COPY dist /usr/share/nginx/html
COPY docker/BBBA1CCF6C98E4ADEB5592BAF7B037D4.txt /usr/share/nginx/html/.well-known/pki-validation/
COPY docker/D6B50858DA66F593081273CBAB09121F.txt /usr/share/nginx/html/.well-known/pki-validation/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

