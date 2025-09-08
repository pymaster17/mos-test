import os
import shutil
from pathlib import Path


def organize_audio_files(base_dir, output_dir):
    """
    组织音频文件：重命名并分组到set文件夹中

    Args:
        base_dir (str): 包含四个音频文件夹的基目录
        output_dir (str): 输出目录，用于存放set文件夹
    """
    # 定义四个文件夹名称
    folders = ['gt', 'hifigan', 'SpikingVocos', 'vocos']

    # 确保输出目录存在
    os.makedirs(output_dir, exist_ok=True)

    # 获取所有音频文件的基本名（不含扩展名）
    audio_files = {}

    # 首先收集所有文件夹中的音频文件
    for folder in folders:
        folder_path = os.path.join(base_dir, folder)
        if not os.path.exists(folder_path):
            print(f"警告: 文件夹不存在: {folder_path}")
            continue

        # 遍历文件夹中的文件
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path) and is_audio_file(filename):
                # 获取文件名（不含扩展名）
                name_without_ext = os.path.splitext(filename)[0]

                # 添加到字典中
                if name_without_ext not in audio_files:
                    audio_files[name_without_ext] = {}

                audio_files[name_without_ext][folder] = file_path

    # 创建set文件夹并复制/重命名文件
    set_counter = 1
    for base_name, files in audio_files.items():
        # 创建set文件夹
        set_folder = os.path.join(output_dir, f"set{set_counter}")
        os.makedirs(set_folder, exist_ok=True)

        # 复制并重命名每个文件
        for folder, src_path in files.items():
            # 获取文件扩展名
            ext = os.path.splitext(src_path)[1]

            # 创建新文件名
            new_filename = f"{base_name}_{folder}{ext}"
            dst_path = os.path.join(set_folder, new_filename)

            # 复制文件
            shutil.copy2(src_path, dst_path)
            print(f"已复制: {os.path.basename(src_path)} -> {os.path.join(f'set{set_counter}', new_filename)}")

        set_counter += 1

        # 如果已经创建了50个set文件夹，就停止
        if set_counter > 50:
            break

    print(f"\n完成! 已创建 {min(set_counter - 1, 50)} 个set文件夹在 {output_dir}")


def is_audio_file(filename):
    """检查文件是否为音频文件"""
    audio_extensions = ['.wav', '.mp3', '.flac', '.aac', '.ogg', '.m4a', '.wave']
    return any(filename.lower().endswith(ext) for ext in audio_extensions)


def main():
    # 设置基础目录和输出目录
    base_dir = input("请输入包含四个音频文件夹的基目录路径: ").strip()
    output_dir = input("请输入输出目录路径 (将在此创建set文件夹): ").strip()

    # 如果用户没有输入，使用默认值
    if not base_dir:
        base_dir = "D:/我的文档/Desktop/mos/audio/vocos_mos_test"
    if not output_dir:
        output_dir = "D:/我的文档/Desktop/mos/audio/vocos_mos_set"

    # 执行组织操作
    organize_audio_files(base_dir, output_dir)


if __name__ == "__main__":
    main()