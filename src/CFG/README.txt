To set up CFG functionality you need to set up the docker to run.

You need to add a script.sh file in the metrinome/src dir that contains
```bash
python3 ./main.py
exit
```
and then modify the docker file in the same directory by adding this at the end of the file 
```
RUN /bin/bash ./script.sh
```

then run "make build"


It may take a while to build

you may need to pip install graphviz for the .jpeg renderer of a .dot file

Within the metrinome these are important commands for later building and testing
```
to build, go to main metrinome directory and run:
sudo docker build -t apcmetrinome/dockerapc -f replication/Dockerfile .

to push to dockerhub:
sudo docker login
sudo docker push apcmetrinome/dockerapc

to run:
sudo docker run -it apcmetrinome/dockerapc

to run experiments inside docker:
./Testing.sh

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

On server set up, docker daemon needs to be running. Run the following command to start the docker daemon.
```
sudo service docker restart
```
