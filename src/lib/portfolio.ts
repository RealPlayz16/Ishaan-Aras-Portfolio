import {
  UserRound,
  FolderOpen,
  SquareTerminal,
  Mail,
  Settings2,
  Cpu,
  FileText,
} from "lucide-react";

export type AppId =
  | "welcome"
  | "about"
  | "projects"
  | "skills"
  | "terminal"
  | "contact"
  | "settings";

export const apps = [
  {
    id: "welcome" as AppId,
    title: "Welcome",
    file: "welcome.md",
    icon: FileText,
    color: "mint",
    subtitle: "Start here",
  },
  {
    id: "about" as AppId,
    title: "About me",
    file: "about_ishaan",
    icon: UserRound,
    color: "blue",
    subtitle: "The person behind the projects",
  },
  {
    id: "projects" as AppId,
    title: "Projects",
    file: "project_explorer",
    icon: FolderOpen,
    color: "yellow",
    subtitle: "Four builds. Real-world impact.",
  },
  {
    id: "skills" as AppId,
    title: "Skills",
    file: "hardware_and_software",
    icon: Cpu,
    color: "purple",
    subtitle: "My engineering toolkit",
  },
  {
    id: "terminal" as AppId,
    title: "Terminal",
    file: "ishaan@raspberrypi: ~",
    icon: SquareTerminal,
    color: "dark",
    subtitle: "Take the command line route",
  },
  {
    id: "contact" as AppId,
    title: "Contact",
    file: "compose_message",
    icon: Mail,
    color: "pink",
    subtitle: "Let’s build something",
  },
  {
    id: "settings" as AppId,
    title: "Settings",
    file: "desktop_preferences",
    icon: Settings2,
    color: "gray",
    subtitle: "Make yourself at home",
  },
];

export const projects = [
  {
    id: "krushi",
    name: "Krushi Yantra",
    category: "Robotics",
    short: "A smarter way to grow.",
    description:
      "Autonomous agri-robot for small-plot Indian farms. Real-time weed detection, GPS waypoint navigation, solar-powered.",
    tags: ["Raspberry Pi CM4", "YOLOv8", "KiCad", "ROS 2", "Python"],
    highlights: [
      "Custom PCB with Raspberry Pi CM4 and dual motor drivers",
      "YOLOv8 weed detection at 22 FPS on edge hardware",
      "RTK-GPS waypoint navigation with 2cm accuracy",
      "Solar charging system with 8hr runtime per cycle",
    ],
    metric: "22 FPS",
    metricLabel: "on-device detection",
    color: "green",
    symbol: "robot",
  },
  {
    id: "focus",
    name: "FocusGuard",
    category: "Edge AI",
    short: "Keeping eyes on the road.",
    description:
      "Driver drowsiness detection system using real-time facial landmark analysis and alerting.",
    tags: ["MediaPipe", "OpenCV", "Raspberry Pi 4", "Python"],
    highlights: [
      "MediaPipe face mesh with 468-point landmark tracking",
      "Eye aspect ratio algorithm for blink and drowsiness detection",
      "Sub-100ms inference pipeline on Raspberry Pi 4",
      "Audio and visual alert system with configurable thresholds",
    ],
    metric: "<100ms",
    metricLabel: "inference latency",
    color: "blue",
    symbol: "eye",
  },
  {
    id: "hand",
    name: "HandSteer",
    category: "Robotics",
    short: "A more human interface.",
    description:
      "Gesture-controlled vehicle interface. Hand tracking replaces physical steering for accessibility research.",
    tags: ["MediaPipe", "TensorFlow Lite", "Arduino", "C++"],
    highlights: [
      "21-point hand landmark detection via MediaPipe",
      "Custom gesture classifier trained on 2000+ samples",
      "PWM motor control mapped to hand angle and finger state",
      "Latency under 80ms from gesture to actuator response",
    ],
    metric: "<80ms",
    metricLabel: "gesture to actuator",
    color: "orange",
    symbol: "hand",
  },
  {
    id: "waste",
    name: "Edge AI Waste Sorting",
    category: "Edge AI",
    short: "Less landfill. More possibility.",
    description:
      "Real-time waste classification on embedded hardware. Sorts recyclables from landfill at conveyor speed.",
    tags: ["TensorFlow Lite", "Jetson Nano", "SolidWorks", "Python"],
    highlights: [
      "MobileNetV2 classifier with 94% accuracy across 6 categories",
      "TensorFlow Lite quantized model for Jetson Nano deployment",
      "Servo-actuated sorting mechanism triggered by classification",
      "OSHWA-certified open hardware design",
    ],
    metric: "94%",
    metricLabel: "classification accuracy",
    color: "purple",
    symbol: "recycle",
  },
];

export const skillGroups = [
  {
    name: "Languages",
    label: "Talking to machines",
    items: ["Python", "C/C++", "MATLAB", "JavaScript"],
    description:
      "From low-level firmware to vision pipelines and interactive applications.",
  },
  {
    name: "Hardware",
    label: "Small boards, big ideas",
    items: ["Raspberry Pi", "Arduino", "NVIDIA Jetson", "ESP32"],
    description:
      "Embedded platforms that turn software into things you can touch.",
  },
  {
    name: "Vision & AI",
    label: "Giving machines perception",
    items: ["OpenCV", "TensorFlow Lite", "YOLOv8", "MediaPipe"],
    description:
      "Real-time computer vision and efficient inference, right at the edge.",
  },
  {
    name: "CAD & Fabrication",
    label: "Designed to be built",
    items: ["SolidWorks", "KiCad", "Fusion 360", "3D Printing"],
    description:
      "Mechanical design, board layout, and rapid physical prototyping.",
  },
  {
    name: "Electronics",
    label: "Connecting the dots",
    items: ["PCB Design", "Soldering", "Oscilloscope", "Signal Processing"],
    description:
      "From schematic to assembled boards, measured and debugged on the bench.",
  },
  {
    name: "Frameworks",
    label: "The systems underneath",
    items: ["ROS 2", "Linux", "Git", "Docker"],
    description:
      "Reliable development tools and robotics software that bring everything together.",
  },
];

export const pipeline = [
  {
    title: "Design",
    description:
      "Schematics, PCB layout, and mechanical CAD. From napkin sketch to manufacturing files.",
  },
  {
    title: "Embed",
    description:
      "Firmware and embedded software. Bare-metal C to Linux application stacks on ARM.",
  },
  {
    title: "Perceive",
    description:
      "Computer vision and sensor fusion. Real-time inference on edge hardware.",
  },
  {
    title: "Actuate",
    description:
      "Motor control, robotics, and closed-loop systems. Software meets the physical world.",
  },
];

export const email = "i2aras@uwaterloo.ca";
export const linkedIn = "https://www.linkedin.com/in/ishaan-aras";
