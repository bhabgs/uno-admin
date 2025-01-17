import dockerRode from 'dockerode';

export class DockerService {
  constructor() {}
  workDir = '/var/aicode';
  docker = new dockerRode({
    socketPath: '/var/run/docker.sock',
  });
  containersMap = new Map<
    'vite' | 'vscode',
    Record<string, dockerRode.Container>
  >();
  createContainerConfig() {}
  // 创建vscode容器
  async createVscodeContainer() {}
  // 创建vite容器
  async createViteContainer() {}

  //创建
  async create({
    path,
    onVscodeOver,
    callBack,
  }: {
    path: string;
    onVscodeOver: () => Promise<void>;
    callBack?: () => void;
  }) {
    this.createVscodeContainer();
    await onVscodeOver();
    this.createViteContainer();
    if (callBack) {
      callBack();
    }
  }
}
