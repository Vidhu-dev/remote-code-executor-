import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cpp from "../utils/langController/cpp";
import python from "../utils/langController/python";
import java from "../utils/langController/java";
import {
  validateCpp,
  validatePython,
  validateJava,
  validate,
} from "../utils/langController/validate";
import { Request, Response } from "express";

/**
 * Handles the incoming code execution requests based on the programming language.
 * @param req - The HTTP request object containing code, lang, and input.
 * @param res - The HTTP response object for sending results back to the client.
 */
export const code = (req: Request, res: Response): void => {
  console.log("There was a request made at /code route");

  const { code, lang, input } = req.body as {
    code: string;
    lang: string;
    input: string;
  };

  let fileName: string;

  switch (lang) {
    case "cpp":
      console.log("There was a C++ request");
      fileName = uuidv4();
      if (validate(code, validateCpp)) {
        fs.writeFile(`${fileName}.cpp`, code, (err) => {
          if (err) {
            console.error(err);
            res.json({ err });
          } else {
            cpp(fileName, input, res);
          }
        });
      } else {
        res.json({ err: "This file contains malicious code" });
      }
      break;

    case "python":
      console.log("There was a Python request");
      fileName = uuidv4();
      if (validate(code, validatePython)) {
        fs.writeFile(`${fileName}.py`, code, (err) => {
          if (err) {
            console.error(err);
            res.json({ err });
          } else {
            python(fileName, input, res);
          }
        });
      } else {
        res.json({ err: "This file contains malicious code" });
      }
      break;

    case "java":
      console.log("There was a Java request");
      fileName = uuidv4();
      if (validate(code, validateJava)) {
        fs.writeFile(`${fileName}.java`, code, (err) => {
          if (err) {
            console.error(err);
            res.json({ err: err.message });
          } else {
            java(fileName, input, res);
          }
        });
      } else {
        res.json({ err: "This file contains malicious code" });
      }
      break;

    default:
      res.json({ err: "Unsupported language" });
      break;
  }
};
