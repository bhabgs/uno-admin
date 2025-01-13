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
      Binds: [
        `${pathUrl}/src/:/app/src`,
        `${pathUrl}/index.html:/app/index.html`,
        `${pathUrl}/vite.config.ts:/app/vite.config.ts`,
      ],
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
      this.previewContainer.start();
    }
    console.log('createContainer');

    return this.previewContainer;
  }
  getContainers() {
    return this.docker.listContainers();
  }
  getContainerById() {}
}
