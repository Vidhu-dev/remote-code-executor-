import fs from "fs";
import util from "util";
import { exec as execCallback } from "child_process";
import { Response } from "express";

const exec = util.promisify(execCallback);

/**
 * Executes a Java program inside a Docker container.
 * @param fileName - The name of the Java file to compile and run.
 * @param input - The input data for the Java program.
 * @param res - The HTTP response object to send the result or error back to the client.
 */
const java = (fileName: string, input: string, res: Response): void => {
  console.log("This Java file runs");

  // Write input to a text file
  fs.writeFile(`${fileName}.txt`, input, (err) => {
    if (err) {
      console.error(err);
      res.json({ err: err.message });
      return;
    }

    // Start the Docker container
    exec(`docker run -d -it backend-java:v1 sh`)
      .then((response) => {
        const containerId = response.stdout.substring(0, 12)
        console.log(containerId)

        // Copy files to the container
        exec(
          `docker cp ${fileName}.java ${containerId}:/usr/java/test.java && docker cp ${fileName}.txt ${containerId}:/usr/java`
        )
          .then(() => {
            // Compile and execute the Java file
            exec(
              `docker exec -t ${containerId} sh -c "javac test.java && java test<${fileName}.txt"`
            )
              .then((resp) => {
                console.log(resp)
                res.status(201).json(resp)

                // Clean up: Remove container and local files
                exec(
                  `docker rm -f ${containerId} && rm ${fileName}.java && rm ${fileName}.txt`
                ).then(() => {
                  console.log('Container and files removed')
                })
              })
              .catch((err) => {
                console.error(err)
                res.json({ stderr: err.stdout })

                // Clean up in case of error
                exec(
                  `docker rm -f ${containerId} && rm ${fileName}.java && rm ${fileName}.txt`
                ).then(() => {
                  console.log('Container and files removed')
                })
              })
          })
          .catch((err) => {
            console.error(err)
            res.json({ stderr: err.stderr })

            // Clean up in case of error
            exec(
              `docker rm -f ${containerId} && rm ${fileName}.java && rm ${fileName}.txt`
            ).then(() => {
              console.log('Container and files removed')
            })
          })
      })
      .catch((err) => {
        exec(`rm ${fileName}.java && rm ${fileName}.txt`).then(() => {
          console.log('Failed to start Docker container, files removed')
        })
        console.error(err)
        res.json({ err: 'Failed to start Docker container' })
      })
  });
};

export default java;
