### login to console.cloud.google.com
- create a project (if needed)
- `gcloud projects list` > copy **PROJECT_ID** value

### setup on local machine
- `gcloud auth login`
- `gcloud init` to follow instructions or set separately:  
- `gcloud gcloud config set project ${PROJECT_ID}`
- `gcloud gcloud config set compute/zone asia-southeast1-a`
- `docker build -t gcr.io/${PROJECT_ID}/evisavn:v1 .` (build Docker image from Dockerfile, `${DOCKER_IMAGE}` will be `gcr.io/${PROJECT_ID}/evisavn:v1`)
- `docker run --rm -p ${PORT}:${PORT} ${DOCKER_IMAGE}` (run Docker image in local machine, `${PORT}` will be `3000`)
- open `localhost:${PORT}` on browser to test
- `gcloud docker -- push ${DOCKER_IMAGE}` (push to Google Cloud Registry)

### Continue setting up on console.cloud.google.com
- `gcloud container clusters create nextjs-cluster --num-nodes=3` (create a new cluster named `nextjs-cluster` with 3 Compute instances)
- `gcloud container clusters list` to verify
- `kubectl run evisavn --image=${DOCKER_IMAGE} --port ${PORT}` (create 1 pod using port `${PORT}` within docker, `${POD_NAME}` will be `evisavn`)
- wait a moment, then verify `kubectl get pods` if **STATUS** is **Running**
- `kubectl expose deployment ${POD_NAME} --type=LoadBalancer --port ${PORT}` (expose the app to the outside world using a Google Cloud Load balancer)
- wait a moment, then copy `kubectl get services` **EXTERNAL-IP** value with **PORT**, then open in browser with `${EXTERNAL-IP}:${PORT}`

### variables:
| variable name | value |
|---------------|-------|
| PROJECT_ID | value from `gcloud projects list` |
| DOCKER_IMAGE | `gcr.io/${PROJECT_ID}/evisavn:v1` |
| PORT | `3000` |
| POD_NAME | `evisavn` |


_(notes taken from https://medium.com/google-cloud/next-js-tutorial-deploy-to-docker-on-google-cloud-container-engine-6b0c19dd8ecb)_