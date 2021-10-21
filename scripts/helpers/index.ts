import { spawnSync } from "child_process"

export const exec = (command) => {
  const task = spawnSync(command, { shell: true })
  if (task.status !== 0) {
    throw new Error(task.stderr.toString())
  }
  return task.stdout.toString()
}
