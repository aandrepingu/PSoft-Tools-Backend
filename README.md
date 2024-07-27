# PSoft-Tools-Backend
Backend for PSoft Tools

Front end repo: https://github.com/aandrepingu/PSoft-Tools

# CFG

If installing on a server you need to aquire the docker for metrinome: using either "docker pull harveymudd/metrinome" OR through https://hub.docker.com/r/harveymudd/metrinome.  


Ensure you run "make build" for docker to reduce possible errors


Then you need to modify the docker to run properly.

At the end of the added docker file in metrinome/src/docker add:

```

RUN /bin/bash ./script.sh

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