# PSoft-Tools-Backend
Backend for PSoft Tools

Front end repo: https://github.com/aandrepingu/PSoft-Tools

# CFG

If installing on a server you need to aquire the docker for metrinome: using either "docker pull harveymudd/metrinome" OR through https://hub.docker.com/r/harveymudd/metrinome.  


Ensure you run "make build" for docker to reduce possible errors


Then you need to modify the docker to run 
```
python3 main.py
convert tempfile.c
export graph tempfile_.main.dot
quit
exit
```

At the end of the added docker file for metrinome add:

```

ENTRYPOINT ["python3", "app/code/main.py"]
ENTRYPOINT ["convert" ,"tempfile.c"]
ENTRYPOINT ["export", "graph", "tempfile_.main.dot"]
ENTRYPOINT ["quit"]
ENTRYPOINT ["exit"]

```
Currently only accepting .c files in the form of
```C++
int main(){

    /*
    code
    here
    for
    CFG
    */

}

```
The function must be called main