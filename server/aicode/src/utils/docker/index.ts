import dockerRode from 'dockerode';

export class DockerService {
  constructor() {}
  docker = new dockerRode({
    socketPath: '/var/run/docker.sock',
  });
  containersMap = new Map<
    string,
    Record<'vite' | 'vscode', dockerRode.Container> | null
  >();
  createContainerConfig() {}
  getContainers() {
    return this.docker.listContainers();
  }
  // 创建vscode容器
  async createVscodeContainer() {}
  // 创建vite容器
  async createViteContainer() {}
  // 格式化路径到路径名称
  formatPath(path: string) {
    // 把path内的/变成-

    return path;
  }

  //创建
  async create({
    path,
    onVscodeOver,
    callBack,
  }: {
    path: string;
    onVscodeOver: () => Promise<void>;
    callBack?: (
      err: string,
      containers: Record<'vite' | 'vscode', dockerRode.Container> | null,
    ) => void;
  }) {
    // 先检查是否有容器
    if (this.containersMap.get(path)) {
      return callBack('容器已经存在', this.containersMap.get(path));
    }
    this.createVscodeContainer();
    await onVscodeOver();
    this.createViteContainer();
    if (callBack) {
      const containers = {
        vite: this.containersMap.get(path)?.vite as dockerRode.Container,
        vscode: this.containersMap.get(path)?.vscode as dockerRode.Container,
      };
      this.containersMap.set(path, containers);
      callBack(null, containers);
    }
  }
}
