/* =====================================================================
   Site content: CV link and projects
   ---------------------------------------------------------------------
   This is the only file you need to edit to add or change a project.

   To add a project, copy the template below, paste it at the place in
   the list where it should appear (the list is shown top to bottom),
   and fill it in. Projects tagged "personal" automatically make the
   "Personal" filter appear.

   {
     id: "short-unique-id",            // used in links: /#project-short-unique-id
     title: "Project title",
     context: "Personal project",      // course, lab, team...
     date: "2027",
     categories: ["personal", "robotics"],  // robotics, control, ml, mechanics, personal
     summary: "One sentence shown in the list.",
     details: [
       "What you built or did.",
       "What came out of it.",
     ],
     result: "Key number or outcome",  // optional
     tools: ["Python", "ROS 2"],
     image: "img/projects/my-image.jpg",   // optional
     imageAlt: "What the image shows",     // needed if there is an image
     links: [                               // optional
       { label: "Code", href: "https://github.com/maxencelatrouite/..." },
       { label: "Report (PDF)", href: "pdf/my-report.pdf" },
     ],
   },
   ===================================================================== */

const SITE = {
  // Put your current CV in the pdf/ folder and write its path here,
  // e.g. "pdf/Maxence_Latrouite_CV.pdf". Leave empty to hide the CV links.
  cv: "",
};

const CATEGORIES = {
  robotics: "Robotics",
  control: "Control",
  ml: "ML",
  mechanics: "Mechanics",
  personal: "Personal",
};

const PROJECTS = [
  {
    id: "aris-nautilus",
    title: "ARIS NAUTILUS autonomous underwater glider",
    context: "ETH student team",
    date: "Sep 2026 – now",
    categories: ["robotics", "control"],
    summary: "State estimation and attitude control, and the glider's rear section in hardware.",
    details: [
      "Implementing the glider's state estimation and its Attitude Control Unit (pitch, roll and yaw), alongside the existing Buoyancy Control Unit for depth, in a six-person team.",
      "Dive tests showed that a single IMU was not accurate enough, so we are integrating additional sensors.",
      "Responsible for the rear section: designing the rudder and stern parts in Onshape, 3D printing them and integrating the drive motor into the hull, with regular component tests at Innovation Park Zurich in Dübendorf.",
      "ARIS NAUTILUS is a 30-member student team building a glider for polar research.",
    ],
    result: "Hardware and software",
    tools: ["ROS 2 (Jazzy)", "Onshape", "3D printing"],
  },
  {
    id: "soft-finger-sensing",
    title: "Deformation sensing for soft robotic fingers",
    context: "Semester thesis, Autonomous Systems Lab, ETH Zürich",
    date: "Feb – Jun 2026",
    categories: ["robotics", "ml"],
    summary: "Estimating the pose of a soft finger's tip from its embedded liquid-metal strain sensors.",
    details: [
      "Built a stereo-vision pipeline that reconstructs the finger's 3D backbone (9 markers, millimetre-accurate ground truth), synchronized with four embedded liquid-metal strain sensors.",
      "Ran a repeatable test protocol on 3 fingers, 5 repetitions each, across a 2D pneumatic actuation space.",
      "Characterized what each sensor encodes: the longitudinal sensors are linear in bending angle within one chamber configuration (R² 0.95–0.99) but ambiguous across configurations, and the twist sensor is more ambiguous (30 mm tip displacement at identical readings).",
      "Developed polynomial, chamber-conditioned linear and MLP estimators predicting fingertip pose (x, y, z and orientation) from raw signals.",
    ],
    result: "R² = 0.95 · grade 5.5/6",
    tools: ["Python", "PyTorch", "ROS", "OpenCV"],
  },
  {
    id: "real-to-sim",
    title: "Real-to-Sim transfer for robotic manipulation",
    context: "3D Vision course project, ETH Zürich",
    date: "Feb – Jun 2026",
    categories: ["robotics", "ml"],
    summary: "Franka pick-and-place demonstrations rebuilt in Isaac Sim, then trained with behavior cloning and PPO.",
    details: [
      "Built a pipeline that switches between behavior cloning for free-space reaching and PPO for contact-rich grasping, on a Franka pick-and-place task.",
      "Fixed an out-of-distribution failure by retraining the grasp policy on handoff states recorded from the deployed chain, which raised grasp success from about 22% to 82%.",
      "Reconstructed and replayed the real demonstrations in simulation to train the behavior-cloning policy: 100% success under reference jitter and 36.1% mean success across a 49-cell spatial grid.",
      "My part: segmentation (SAM), state detection, recovering the object's initial 6D pose with metric depth from Video-Depth-Anything, and reconstructing the trajectories in Isaac Sim.",
    ],
    result: "Grasp success 22% → 82% · grade 5.75/6",
    tools: ["Python", "PyTorch", "Isaac Sim", "skrl (PPO)", "FoundationPose", "SAM", "OpenCV"],
  },
  {
    id: "rocket-landing-mpc",
    title: "MPC for a Falcon 9 barge landing",
    context: "Computational Control course project, ETH Zürich",
    date: "Jun 2026",
    categories: ["control"],
    summary: "Constrained MPC with an LQR terminal cost, compared with a PID baseline under malfunctions.",
    details: [
      "Implemented an MPC controller for a Falcon 9 barge landing, solving a finite-horizon constrained QP over linearized discrete dynamics with thrust and nozzle-angle limits and an LQR terminal cost.",
      "Benchmarked it against a PID baseline under nominal conditions and three malfunction scenarios, using parameter sweeps to find where each controller fails.",
    ],
    result: "MPC vs PID",
    tools: ["Python", "MPC", "Convex optimization (QP)"],
  },
  {
    id: "safe-bayesian-optimization",
    title: "Safe Bayesian optimization with Gaussian processes",
    context: "Probabilistic Artificial Intelligence course, ETH Zürich",
    date: "Fall 2025",
    categories: ["ml"],
    summary: "Optimizing a black-box function without violating an unknown safety constraint.",
    details: [
      "A safety-aware Bayesian optimizer for constrained black-box functions, with Gaussian processes modelling both the objective and the safety constraint.",
    ],
    tools: ["Python", "PyTorch", "Gaussian processes"],
  },
  {
    id: "swa-gaussian",
    title: "Approximate Bayesian inference with SWA-Gaussian",
    context: "Probabilistic Artificial Intelligence course, ETH Zürich",
    date: "Nov 2025",
    categories: ["ml"],
    summary: "Uncertainty estimates for a CNN that classifies satellite images.",
    details: [
      "Bayesian uncertainty estimation for CNN-based satellite image classification, using full SWAG and sampling from the approximate posterior, with baselines and calibration metrics.",
    ],
    tools: ["Python", "PyTorch"],
  },
  {
    id: "gp-air-pollution",
    title: "Gaussian process regression for air pollution",
    context: "Probabilistic Artificial Intelligence course, ETH Zürich",
    date: "Fall 2025",
    categories: ["ml"],
    summary: "Spatio-temporal prediction of air pollution with calibrated uncertainty.",
    details: [
      "Spatio-temporal Gaussian process model of air pollution, focused on uncertainty quantification and on combining data from several sensors.",
    ],
    tools: ["Python", "Gaussian processes"],
  },
  {
    id: "line-following-robot",
    title: "Embedded line-following robot",
    context: "Programming on Microcontrollers course, EPFL",
    date: "Jun 2025",
    categories: ["robotics", "control"],
    summary: "Low-level C on a TI-RSLK robot: sensor calibration, motor speed control and line following.",
    details: [
      "Implemented sensor calibration, closed-loop speed control of the drive motors and line-following behaviour in low-level C on the MSP432 microcontroller of a TI-RSLK robot.",
      "ADC-based line sensing and PWM motor control, robust to noise and hardware limits.",
    ],
    result: "Grade 6/6",
    tools: ["C", "MSP432", "PID control", "PWM", "ADC"],
  },
  {
    id: "falling-disks",
    title: "Falling perforated disks in a fluid",
    context: "Bachelor project, Laboratory of Fluid Mechanics and Instabilities, EPFL",
    date: "Feb – Jun 2025",
    categories: ["mechanics"],
    summary: "How hole geometry changes the fall speed, stability and rotation of a disk falling in water.",
    details: [
      "Experimental study, in a team of six supervised by Prof. F. Gallaire, of how the shape and layout of holes affect the fall speed, stability, rotation and oscillations of laser-cut perforated disks.",
      "Wrote a Python tool that generates DXF hole patterns with controlled porosity and permeability; 3 to 5 repeated drops per geometry in a 60 × 50 × 50 cm tank.",
      "Measurement chain: markers filmed at 50 fps, tracked in Python and processed in MATLAB (Hungarian algorithm, ellipse fitting) to reconstruct the disk's 3D pose from a single top-view camera, validated on synthetic data (errors below 5% at 5% noise).",
    ],
    result: "Grade 5.75/6",
    tools: ["Python", "MATLAB", "Image processing", "Laser cutting"],
    image: "img/projects/falling-disks.jpg",
    imageAlt: "Four perforated disk designs with triangular, teardrop, oval and round holes",
    links: [{ label: "Report (PDF, French)", href: "pdf/falling-disks-report.pdf" }],
  },
  {
    id: "sailboat-mast",
    title: "Sailboat roll and mast deflection measurement",
    context: "Measurement Techniques course (ME-301), EPFL",
    date: "Spring 2025",
    categories: ["mechanics"],
    summary: "A scale sailboat in a wind tank, instrumented to measure roll, wind load and mast bending.",
    details: [
      "Built the electronics and data acquisition of a scale sailboat rig in a wind tank: an MMA8451 accelerometer over I2C and a 5 kg load cell with a 24-bit amplifier, both read by an Arduino at 80 Hz, plus a camera tracking markers on the mast.",
      "Measured the roll response after a wind cut-off over ten runs (load-cell variation below 1.6%), and extracted the 0.97 Hz roll mode and an 8.95% damping ratio with Butterworth filtering and FFT.",
    ],
    result: "Grade 5.5/6",
    tools: ["Arduino", "I2C", "Load cell", "MATLAB", "Signal processing"],
    image: "img/projects/mast-setup.jpg",
    imageAlt: "Exploded view of the test rig: aquarium tank, model hull with mast and sail, fan and mounts",
    links: [{ label: "Report (PDF)", href: "pdf/sailboat-mast-report.pdf" }],
  },
  {
    id: "shaft-balancing",
    title: "High-speed shaft balancing",
    context: "Dynamics of Mechanical Systems course, EPFL",
    date: "Mar – Apr 2025",
    categories: ["mechanics"],
    summary: "Modelling and balancing a shaft that runs above its critical speed.",
    details: [
      "Modelled, sized and analyzed a shaft balancing machine from vibration measurements, using a Lagrangian model.",
      "Computed the eigenmodes and critical speeds, then balanced the shaft in the supercritical regime by adjusting masses.",
    ],
    result: "Grade 5.3/6",
    tools: ["Lagrangian modelling", "Frequency analysis", "MATLAB"],
    image: "img/projects/shaft-balancing.jpg",
    imageAlt: "Plot of the admissible balancing mass as a function of rotor speed, from 2500 to 12000 rpm",
    links: [{ label: "Report (PDF, French)", href: "pdf/shaft-balancing-report.pdf" }],
  },
  {
    id: "raspberry-gripper",
    title: "Sensorized raspberry-picking gripper",
    context: "Product Development and Engineering Design course (ME-320), EPFL",
    date: "Sep – Dec 2024",
    categories: ["robotics", "mechanics"],
    summary: "An iris-mechanism gripper that picks raspberries and checks their ripeness by conductivity.",
    details: [
      "Mounted on a robot arm, the gripper closes three sliders around the berry. A pressure pad prevents crushing it, and conductive tape on the sliders measures the berry's resistance to tell ripe from unripe fruit.",
      "Closed-loop DC motor control on Arduino, with limit switches on the sliders and on the basket door. Parts 3D printed in PETG and laser cut in MDF.",
      "I wired, soldered and integrated the sensors on veroboard, through several iterations of sensors and boards before the gripper worked on real raspberries.",
      "In the final test, the gripper harvested 7 ripe raspberries and correctly classified 14 berries as ripe or unripe.",
    ],
    result: "Grade 5.25/6",
    tools: ["Arduino", "C/C++", "Analog sensors", "Fusion 360", "3D printing", "Laser cutting"],
    image: "img/projects/raspberry-gripper.jpg",
    imageAlt: "3D render of the raspberry gripper with its slider mechanism and collection basket",
    links: [{ label: "Report (PDF)", href: "pdf/raspberry-gripper-report.pdf" }],
  },
  {
    id: "carrot-peeler",
    title: "Lever-operated carrot peeler",
    context: "Mechanical Design II course, EPFL",
    date: "2021 – 2022",
    categories: ["mechanics"],
    summary: "Concept, sizing and full CAD of a carrot-peeling machine, in a team of four.",
    details: [
      "Designed a lever-operated carrot peeler in a team of four: concept, force and mechanism calculations, material selection, and a full CAD assembly with exploded views.",
    ],
    tools: ["CAD", "Mechanical design", "Material selection"],
    image: "img/projects/peeler.jpg",
    imageAlt: "Render of the carrot peeler standing on a kitchen counter",
    links: [{ label: "Report (PDF, French)", href: "pdf/peeler-report.pdf" }],
  },
];
