# PSoft-Tools-Backend
Backend for PSoft Tools

Front end repo: https://github.com/aandrepingu/PSoft-Tools

# CFG

If installing on a server you need to aquire the docker for metrinome: using either "docker pull harveymudd/metrinome" OR through https://hub.docker.com/r/harveymudd/metrinome.  


Ensure you run "make build" for docker to reduce possible errors


Then you need to modify the docker to run properly.

At the end of the docker file in metrinome/src/docker add:

```

RUN /bin/bash ./script.sh

```
This is so that it will run the ./script.sh on start up and run commands we want then close.

And in that same direrctory add a script.sh file with the following commands
```bash
python3 ./main.py
exit
```

you will also need to modify main.py in ./metrinome/src

```Python3
270 #prompt.cmdloop(f"{Colors.TITLE.value}" + r"""
271#
272#             _        _
273 #  /\/\   ___| |_ _ __(_)_ __   ___  _ __ ___   ___
274 # /    \ / _ \ __| '__| | '_ \ / _ \| '_ ` _ \ / _ \
275 #/ /\/\ \  __/ |_| |  | | | | | (_) | | | | | |  __/
276 #\/    \/\___|\__|_|  |_|_| |_|\___/|_| |_| |_|\___|
277 #
278 #""" + f"{Colors.ENDC.value}\nStarting the REPL...")
279     prompt.onecmd("convert tempfile.c")
280     prompt.onecmd("export graph tempfile_.main.dot")
281
```

modify the file so that the end of the main() function looks like this


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


Current Issues: the generateCFG call in index.ts creates the image but doesn't return a useable image

https://stackoverflow.com/questions/57829529/how-to-fetch-and-display-an-image-from-an-express-backend-server-to-a-react-js-f

This will provide a look into making a proper index.ts fetch where the backend will host the image correctly. The frontend will also need to change to correctly call the right source for displaying the image.
