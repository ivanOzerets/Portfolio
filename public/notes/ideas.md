# Project Ideas

## 3D Reconstruction

A web app where users upload a single image, multiple images, or a video and receive a 3D reconstruction. The goal is to implement core algorithms from scratch rather than wrap existing models — demonstrating understanding of the underlying math and ML, not just integration skill.

### Input modes

- **Single image** — a monocular depth estimation network (encoder-decoder with ResNet backbone) trained from scratch in PyTorch predicts a depth map, which is lifted to a colored point cloud
- **Multiple images** — classical Structure from Motion (SfM) pipeline: feature detection → matching → 8-point algorithm + RANSAC → triangulation → bundle adjustment → sparse point cloud
- **Video** — extract frames, run through the SfM pipeline

### Built from scratch

- Monocular depth network: architecture, loss functions (scale-invariant / Eigen loss, SSIM, gradient loss), full training pipeline
- SfM pipeline: 8-point algorithm, RANSAC, essential matrix decomposition, camera pose recovery, triangulation, bundle adjustment (scipy or manual gradient descent)
- Depth map → colored point cloud lifting

### Training data (external datasets, not collected)

- NYU Depth v2 — ~50k indoor RGB-D frames from a Kinect
- KITTI — outdoor/driving scenes with LiDAR ground truth depth

### Stack

- Backend: Python + FastAPI, PyTorch
- Frontend: Next.js (existing portfolio)
- Output: interactive 3D point cloud viewer in browser

### Notes

Not competing with SOTA (Depth Anything, COLMAP, 3DGS). The value is in implementing the core algorithms — epipolar geometry, RANSAC, the volume rendering equation, the loss functions — and showing the contrast between classical geometry and learned representations, both built from scratch.
