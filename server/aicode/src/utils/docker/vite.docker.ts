import dockerRode from 'dockerode';

// preview dockerode
const createContainerConfig = (pathUrl: string) => {
  return {
    Image: 'vite-docker-app',
    ExposedPorts: {
      '5173/tcp': {},
    },
    NetworkingConfig: {
      EndpointsConfig: {
        'uno.app': {
          Aliases: [''], // 网络别名
        },
      },
    },
    HostConfig: {
      Binds: [`${pathUrl}:/app`],
    },
  };
};

export class viteDockerService {
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
          this.previewContainer.exec(
            {
              Cmd: ['sh', '-c', 'npm install && npm run dev'],
            },
            (err, exec) => {
              if (!err) {
                exec.start({ hijack: true, stdin: true }, (err, stream) => {
                  if (!err) {
                    stream.on('data', (data) => {
                      process.stdout.write(data.toString()); // 输出到控制台
                    });

                    stream.on('end', () => {
                      console.log('\nExecution completed.');
                    });

                    stream.on('error', (error) => {
                      console.error('Error with stream:', error);
                    });
                  }
                });
              }
            },
          );
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
