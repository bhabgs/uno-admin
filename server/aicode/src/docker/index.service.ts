import dockerRode from 'dockerode';

// preview dockerode
const createContainerConfig = (pathUrl: string) => {
  return {
    Image: 'vite-docker-app',
    ExposedPorts: {
      '5173/tcp': {},
    },
    HostConfig: {
      PortBindings: {
        '5173/tcp': [
          {
            HostPort: '5173',
          },
        ],
      },
      Binds: [`${pathUrl}:/app`],
      Cmd: ['sh', '-c', 'npm install && npm run dev'],
    },
  };
};

export default class DockerService {
  docker = new dockerRode({
    socketPath: '/var/run/docker.sock',
  });
  previewContainer: dockerRode.Container;
  async createContainer(pathUrl: string) {
    if (!this.previewContainer) {
      this.previewContainer = await this.docker.createContainer(
        createContainerConfig(pathUrl),
      );
      this.previewContainer.start((err) => {
        if (!err) {
          console.log('容器启动成功');
        } else {
          console.log(`容器启动失败: ${err}`);
        }
      });
    }
    console.log('createContainer');

    return this.previewContainer;
  }
  getContainers() {
    return this.docker.listContainers();
  }
  getContainerById() {}
}
