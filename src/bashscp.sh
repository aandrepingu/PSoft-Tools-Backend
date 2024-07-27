
if ! test -f "/usr/bin/graphviz"; then
    echo graphviz not installed, installing now...
    sudo apt-get install graphviz
fi

cd CFG/metrinome/src
make run
#THINGS IN COMMENTS WILL BE RUN IN DOCKER ON RUN. MAKE SURE IF YOU ARE SETTING THIS UP ON A SERVER TO ADD THE DOCKER AND SET THIS UP!
#python3 ./main.py
#quit
#exit
cd exports
dot -Tpng tempfile__main_dot_export.dot > CFG.jpeg
rm tempfile__main_dot_export.dot
cp CFG.jpeg ../../../