# Karan Ashok Jalwani — Robotics Research Portfolio

A responsive, static personal portfolio website for robotics research, mechatronics, autonomous systems, control, ROS 2/Gazebo simulation, and industrial robot digital twins.

## Preview locally

No build tools or package installation are required.

```bash
# From this directory
python -m http.server 8000
```

Open http://localhost:8000 in a browser.

## Publish with GitHub Pages

1. Create a new public repository on GitHub, for example `karan-robotics-portfolio`.
2. Upload the contents of this folder to the repository root (not the parent folder).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. GitHub Pages will provide the public website URL after deployment.

The site uses relative asset paths and is designed for GitHub Pages. It has no server-side components.

## Included project code

`projects/contact-rich-robot-digital-twin/` contains a small Python portfolio project featuring:

- planar 3R forward kinematics and a geometric Jacobian;
- quintic joint-space trajectory generation;
- a simple joint-tracking example;
- geometric contact labels and a clearly identified analytic force proxy;
- reproducible synthetic JSONL dataset generation and unit tests.

The example model is illustrative. It is not a calibrated model of a named physical robot, and its proxy values are not measured tactile or force-sensor data.

## Personal details to verify before publishing

- Confirm whether IIT Delhi and IIT Guwahati roles should both be displayed as ongoing appointments.
- Confirm the patent filing date and the exact title/status against the official patent record.
- Add the final citation/DOI and journal publication date for the accepted Edge-Cloud paper when available.
- Add a GitHub username/profile link after the account repository has been created.

## Contact

Karan Ashok Jalwani  
karan.ashok.jalwani@gmail.com  
[LinkedIn](https://www.linkedin.com/in/karan-jalwani)
