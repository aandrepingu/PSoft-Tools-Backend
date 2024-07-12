import { exec } from "child_process";
import { writeFileSync } from "fs";
export async function generateImage(Code: string): Promise<string> {
  const projectRoot = "./"; // Root directory of your project
  writeFileSync(
    __dirname + "/tempfile.c",
    Code.replace(/\r\n/g, "\n")
  );
  //will use bash script in ./CFG/bashscp.sh
  //make run in ./CFG/metrinome/src
  //run python3 main.py
  //run convert ../../../tempfile.c
  //run export graph tempfile_.main.dot
  //run quit
  //run exit
  //run cd exports
  //run dot -Tpng tempfile__main_dot_export.dot > outfile.jpeg
  //run cp outfile.jpeg ../../../../
  //return outfile.jpeg somehow


  return ("./CFG/metrinome/src/exports/outfile.jpeg");
}