import { email, projects, skillGroups, type AppId } from "./portfolio";
import { experience } from "./hardware";

export const commands = [
  "help",
  "whoami",
  "about",
  "projects",
  "skills",
  "pinout",
  "dmesg",
  "post",
  "contact",
  "ls",
  "pwd",
  "cat",
  "clear",
  "neofetch",
  "date",
  "uname",
  "echo",
  "reboot",
];
export type CommandResult = {
  output?: string;
  app?: AppId;
  clear?: boolean;
  reboot?: boolean;
};
export function runCommand(input: string): CommandResult {
  const [command, ...args] = input.trim().split(/\s+/);
  const name = command.toLowerCase();
  switch (name) {
    case "":
      return {};
    case "help":
      return {
        output:
          "PORTFOLIO SHELL — available commands\n\n  help         Show this command guide\n  whoami       A quick introduction\n  about        Open the about app\n  projects     Explore the four builds\n  skills       Open my engineering toolkit\n  pinout       Open the interactive GPIO skills map\n  dmesg        Read the experience kernel log\n  post         Show portfolio recognition\n  contact      Open the contact app\n  ls           List portfolio files\n  cat <file>   Read welcome.md, skills.txt, or projects.txt\n  neofetch     Show workspace information\n  pwd          Print current directory\n  date         Show the current date\n  uname        Show the simulated system name\n  echo <text>  Print some text\n  clear        Clear this terminal\n  reboot       Replay the workspace boot\n\nTip: Tab completes commands. ↑ / ↓ navigate history.\nThis is a browser simulation, not a real Raspberry Pi shell.",
      };
    case "whoami":
      return {
        output:
          "Ishaan Aras\nMechatronics Engineering · University of Waterloo\nCo-op stream 4 · 1A term\nEmbedded Systems Intern @ Fostride\nUW Formula Electric · Tractive & Electrical\nEmbedded systems, robotics, and edge AI.\nI take hardware from schematic to deployment.",
      };
    case "about":
      return { output: "Opening about_ishaan…", app: "about" };
    case "projects":
      return {
        output:
          "Opening project_explorer…\n" +
          projects.map((p, i) => `  0${i + 1}  ${p.name}`).join("\n"),
        app: "projects",
      };
    case "pinout":
      return {
        output:
          "Opening J8 GPIO skills map…\n40 physical pins · 24 portfolio skills · 2 open GPIO signals",
        app: "skills",
      };
    case "dmesg":
      return {
        output:
          "PORTFOLIO KERNEL LOG — timestamps are a visual metaphor\n\n" +
          experience
            .map(
              item =>
                `[${item.time}] ${item.driver}: ${item.title}\n  ${item.subtitle}\n${item.details.map(d => "  / " + d).join("\n")}`
            )
            .join("\n\n") +
          "\n\n[4.009933] sched: co-op slot open for W2027, accepting interrupts",
      };
    case "post":
      return {
        output:
          "PORTFOLIO SELF-TEST — recognition from the original portfolio\n\n[PASS] Open hardware certification: 3× OSHWA certified\n[PASS] Smart India Hackathon: national finalist\n[PASS] Embedded AI research: published\n[PASS] Edge inference latency: <100 ms\n\nThese are portfolio claims, not live hardware tests.",
      };
    case "skills":
      return { output: "Opening hardware_and_software…", app: "skills" };
    case "contact":
      return { output: `Opening compose_message…\n${email}`, app: "contact" };
    case "ls":
      return {
        output:
          "about/       projects/     projects.txt\nwelcome.md   skills.txt    contact.txt\ndesktop.conf",
      };
    case "pwd":
      return { output: "/home/ishaan" };
    case "cat": {
      const file = (args[0] || "").replace(/^\.\//, "");
      if (file === "welcome.md") return runCommand("whoami");
      if (file === "skills.txt")
        return {
          output: skillGroups
            .map(g => `${g.name}: ${g.items.join(" · ")}`)
            .join("\n"),
        };
      if (file === "projects.txt")
        return {
          output: projects
            .map(
              p =>
                `${p.name}\n  ${p.description}\n  Stack: ${p.tags.join(", ")}`
            )
            .join("\n\n"),
        };
      if (file === "contact.txt")
        return {
          output: `Email: ${email}\nLinkedIn: https://www.linkedin.com/in/ishaan-aras\nOpen to W2027 co-op opportunities.`,
        };
      if (file === "desktop.conf")
        return {
          output:
            "workspace=pi-workspace\nmode=browser-simulation\npersistence=local-desktop-preferences\nreal_hardware_connected=false",
        };
      return {
        output: file
          ? `cat: ${file}: No such file. Try ls.`
          : "Usage: cat <file>. Try cat welcome.md.",
      };
    }
    case "clear":
      return { clear: true };
    case "neofetch":
      return {
        output:
          '      .~~.   .~~.        ishaan@raspberrypi\n     . \"   \"   \" .      ------------------\n    .              .    OS: Pi Workspace / Web Edition\n    .              .    Shell: Portfolio Shell 1.0\n     .            .     Focus: Embedded · Robotics · Edge AI\n      .          .      Projects: 4 builds shipped\n        .      .        Education: University of Waterloo\n          ....          Status: Open to W2027 co-op\n\n  Simulated desktop. No hardware telemetry is collected.',
      };
    case "date":
      return { output: new Date().toString() };
    case "uname":
      return { output: "Pi Workspace 1.0 / Browser Simulation" };
    case "echo":
      return { output: args.join(" ") };
    case "reboot":
      return { output: "Restarting the workspace presentation…", reboot: true };
    case "sudo":
      return {
        output:
          "Nice try. You already have full curiosity privileges.\nThis shell is a safe browser simulation.",
      };
    default:
      return {
        output: `${command}: command not found. Type help to see available commands.`,
      };
  }
}
