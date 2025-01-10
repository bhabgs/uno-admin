import dockerRode from 'dockerode';

export default class DockerService {
  docker = new dockerRode({
    socketPath: '/var/run/docker.sock',
  });
  createContainer() {
    console.log('createContainer');
  }
  getContainers() {
    return this.docker.listContainers();
  }
  getContainerById() {}
}
