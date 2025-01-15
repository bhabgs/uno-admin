import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

// 文件夹
interface FolderItem {
  [key: string]: string | FolderItem;
}

export class ProjectManage {
  constructor({ workDir = '/var/aicode' }: { workDir?: string }) {
    this.workDir = workDir;
  }
  workDir: string;
  /**
   * @description: 创建项目
   */
  createProject() {}
  /**
   * @description: 删除项目
   */
  deleteProject() {}
  /**
   * @description: 生成项目文件
   */
  generateProjectFile({
    name,
    filesObj,
  }: {
    name: string;
    filesObj: FolderItem;
  }) {
    this.createFileOrFolder(this.workDir + '/' + name, filesObj);
  }

  // 创建文件或文件夹
  createFileOrFolder(url: string, filesObj: FolderItem) {
    for (const [fileName, content] of Object.entries(filesObj)) {
      const currentPath = path.join(url, fileName);
      if (typeof content === 'object') {
        // 如果内容是对象，则递归创建文件夹
        mkdirSync(currentPath, { recursive: true });
        this.createFileOrFolder(currentPath, content);
      } else {
        // 写入文件内容
        writeFileSync(currentPath, content as string);
      }
    }
  }
}