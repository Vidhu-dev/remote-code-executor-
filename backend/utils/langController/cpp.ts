import fs from "fs";
import util from "util";
import { exec as execCallback } from "child_process";
import { Response } from "express";

const exec = util.promisify(execCallback);

/**
 * Executes a C++ program inside a Docker container.
 * @param fileName - The name of the C++ file to compile and run.
 * @param input - The input data for the C++ program.
 * @param res - The HTTP response object to send the result or error back to the client.
 */
const cpp = (fileName: string, input: string, res: Response): void => {
  console.log("This C++ file runs");

  // Write input to a text file
  fs.writeFile(`${fileName}.txt`, input, (err) => {
    if (err) {
      console.error(err);
      res.json({ err });
      return;
    }

    // Start the Docker container
    exec(`docker run -d -it lostvidhu/coexe-cpp:v1 sh`)
      .then((response) => {
        const containerId = response.stdout.substring(0, 12)
        console.log(containerId)

        // Copy files to the container
        exec(
          `docker cp ${fileName}.cpp ${containerId}:/usr/cpp && docker cp ${fileName}.txt ${containerId}:/usr/cpp`
        )
          .then(() => {
            // Compile and execute the C++ file
            exec(
              `docker exec -t ${containerId} sh -c "g++ ${fileName}.cpp -o ./a && ./a<${fileName}.txt"`
            )
              .then((resp) => {
                console.log(resp)
                res.status(201).json(resp)

                // Clean up: Remove container and local files
                exec(
                  `docker rm -f ${containerId} && rm ${fileName}.cpp && rm ${fileName}.txt`
                ).then(() => {
                  console.log('Container and files removed')
                })
              })
              .catch((err) => {
                console.error(err)
                res.json({ stderr: err.stderr })

                // Clean up in case of error
                exec(
                  `docker rm -f ${containerId} && rm ${fileName}.cpp && rm ${fileName}.txt`
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
              `docker rm -f ${containerId} && rm ${fileName}.cpp && rm ${fileName}.txt`
            ).then(() => {
              console.log('Container and files removed')
            })
          })
      })
      .catch((err) => {
        console.error(err)
        exec(`rm ${fileName}.cpp && rm ${fileName}.txt`).then(() => {
          console.log('Failed to start Docker container, files removed')
        })
        res.json({ err: 'Failed to start Docker container' })
      })
  });
};

export default cpp;
