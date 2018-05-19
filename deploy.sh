#!/bin/bash
echo "Borrando el tar anterior"
rm build.tar.gz
echo "Generando el tar nuevo"
tar -czvf build.tar.gz ./build
echo "Copiando el tar al servidor por scp"
scp build.tar.gz grigo:/home/agustin/Development/resume
echo "Descomprimiendo el sitio y borrando el tar por ssh"
ssh grigo 'cd ~/Development/resume ; tar -xvf build.tar.gz -C build ; rm build.tar.gz'
