cd CFG/metrinome/src
make run
python3 main.py
convert tempfile.c
export graph tempfile_.main.dot
quit
exit
cd exports
dot -Tpng tempfile__main_dot_export.dot > outfile.jpeg
cp outfile.jpeg ../../../../