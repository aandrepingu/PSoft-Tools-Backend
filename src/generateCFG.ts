import { exec } from "child_process";
import { writeFileSync } from "fs";
export async function generateImage(Code: string): Promise<string> {
  const projectRoot = "./"; // Root directory of your project
  writeFileSync(
    __dirname + "/CFG/metrinome/src/tempfile.c",
    Code.replace(/\r\n/g, "\n")
  );
  //this writes the code into the right file.
  return new Promise<string>((resolve, reject) => {
      exec(
        'bash bashscp.sh'
      );
  
    }
  );
  //this runs the bash script

}

