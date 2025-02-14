import { join } from "path";
import { GenerateNotesContext } from "semantic-release";
import { access, constants, readFileSync } from "fs";
import { spawn } from "node:child_process";
import { Signale } from "signale";
import split from "split2";
import PluginConfig from "./@types/pluginConfig";

function getCommand(cwd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const gradleWrapper = join(cwd, "gradlew");
    access(gradleWrapper, constants.F_OK, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          resolve("gradle");
        } else {
          reject(err);
        }
      } else {
        resolve(gradleWrapper);
      }
    });
  });
}

async function getAndroidVersion(
  cwd: string,
  androidPath: string,
  androidGradleTaskName: string,
  env: NodeJS.ProcessEnv,
  logger: Signale,
): Promise<string> {
  const androidFullPath = join(cwd, androidPath);
  const command = await getCommand(androidFullPath);

  return new Promise((resolve, reject) => {
    const child = spawn(
      command,
      [androidGradleTaskName, "-q", "--console=plain"],
      {
        cwd: androidPath,
        env,
        detached: true,
        stdio: ["inherit", "pipe", "pipe"],
      },
    );
    if (child.stdout === null) {
      reject(new Error("Unexpected error: stdout of subprocess is null"));
      return;
    }
    if (child.stderr === null) {
      reject(new Error("Unexpected error: stderr of subprocess is null"));
      return;
    }

    let androidVersion: string | null = null;
    child.stdout.pipe(split()).on("data", (line: string) => {
      androidVersion = line;
    });
    child.stderr.pipe(split()).on("data", (line: string) => {
      logger.error(line);
    });
    child.on("close", (code: number) => {
      if (code !== 0) {
        reject(
          new Error(`Unexpected error: Gradle failed with status code ${code}`),
        );
        return;
      }

      if (androidVersion === null) {
        reject(
          new Error(
            "Could not read output of `printFingerprintNativeSDKVersion` gradle task.",
          ),
        );
        return;
      }

      resolve(androidVersion);
    });
    child.on("error", (err) => {
      logger.error(err);
      reject(err);
    });
  });
}

const humanizeMavenStyleVersionRange = (versionRange: string) => {
  return versionRange
    .replace(/\[(.*?)]/g, ">=$1")
    .replace(/\((.*?)\)/g, ">$1")
    .replace(/\[(.*?),\s+(.*?)]/g, ">= $1 and <= $2")
    .replace(/\((.*?),\s+(.*?)]/g, "> $1 and <= $2")
    .replace(/\[(.*?),\s+(.*?)\)/g, ">= $1 and < $2")
    .replace(/\((.*?),\s+(.*?)]/g, ">= $1 and <= $2");
};

type PodspecJson = {
  dependencies: {
    [key: string]: [string];
  };
};

const getIOSVersion = async (cwd: string, iOSPodSpecJsonPath: string) => {
  const data = JSON.parse(
    readFileSync(join(cwd, iOSPodSpecJsonPath)).toString(),
  ) as PodspecJson;

  return data.dependencies["FingerprintPro"].join(" and ");
};

const generateNotes = async (
  { androidPath, androidGradleTaskName, iOSPodSpecJsonPath }: PluginConfig,
  { logger, cwd, env }: GenerateNotesContext,
) => {
  if (cwd === undefined) {
    throw new Error(
      `Current working directory is required to detect native SDK versions.`,
    );
  }

  if (!androidGradleTaskName) {
    throw new Error("Android gradle task name should be defined.");
  }

  const androidVersion = await getAndroidVersion(
    cwd,
    androidPath,
    androidGradleTaskName,
    env as NodeJS.ProcessEnv,
    logger,
  );
  const humanizedAndroidVersion =
    humanizeMavenStyleVersionRange(androidVersion);
  logger.log(
    `Detected Android Native SDK Version: \`${androidVersion}\` \`${humanizedAndroidVersion}\``,
  );

  if (!iOSPodSpecJsonPath) {
    throw new Error("iOS Podspec Json path should be defined.");
  }

  const iosVersion = await getIOSVersion(cwd, iOSPodSpecJsonPath);
  logger.log(`Detected iOS Native SDK Version: \`${iosVersion}\``);

  return `Fingerprint Android SDK Version Range: **\`${humanizedAndroidVersion}\`**

Fingerprint iOS SDK Version Range: **\`${iosVersion}\`**`;
};

export default generateNotes;
