import os
import shutil
import wave
import random
from pathlib import Path


def get_wav_duration(file_path):
    """获取wav文件的时长（秒）"""
    try:
        with wave.open(file_path, 'rb') as wf:
            frames = wf.getnframes()
            rate = wf.getframerate()
            duration = frames / float(rate)
            return duration
    except Exception as e:
        print(f"无法读取文件时长: {file_path}, 错误: {e}")
        return 0

def organize_audio_files(base_dir, output_dir, target_count, min_duration=2, max_duration=5):
    """
    组织音频文件：筛选时长，随机选择，并分组到set文件夹中

    Args:
        base_dir (str): 包含多个音频子文件夹的基目录
        output_dir (str): 输出目录，用于存放set文件夹
        target_count (int): 希望最终生成的set文件夹数量
        min_duration (float): 音频最小有效时长
        max_duration (float): 音频最大有效时长
    """
    # 确保输出目录存在，如果存在则清空
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir, exist_ok=True)

    # 1. 收集所有模型文件夹中的音频文件
    model_folders = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]
    audio_files_by_basename = {}

    print("开始收集和筛选音频文件...")
    for folder in model_folders:
        folder_path = os.path.join(base_dir, folder)
        for filename in os.listdir(folder_path):
            if filename.lower().endswith('.wav'):
                file_path = os.path.join(folder_path, filename)
                duration = get_wav_duration(file_path)

                # 2. 筛选时长在2-5秒之间的文件
                if min_duration <= duration <= max_duration:
                    base_name = os.path.splitext(filename)[0]
                    if base_name not in audio_files_by_basename:
                        audio_files_by_basename[base_name] = {}
                    audio_files_by_basename[base_name][folder] = file_path
    
    print(f"找到 {len(audio_files_by_basename)} 组符合时长条件的音频。")

    # 过滤掉不完整的组（即并非在所有模型文件夹中都存在的文件）
    complete_sets = {name: files for name, files in audio_files_by_basename.items() if len(files) == len(model_folders)}
    
    print(f"其中有 {len(complete_sets)} 组是完整的（在所有模型中都存在）。")

    # 3. 随机选择目标数量的文件
    if len(complete_sets) < target_count:
        print(f"警告: 完整的音频组数量 ({len(complete_sets)}) 少于目标数量 ({target_count})。将使用所有可用的完整组。")
        target_count = len(complete_sets)

    selected_basenames = random.sample(list(complete_sets.keys()), target_count)
    print(f"已随机选择 {len(selected_basenames)} 组音频进行处理。")

    # 4. 创建set文件夹并复制/重命名文件
    for i, base_name in enumerate(selected_basenames, 1):
        set_folder = os.path.join(output_dir, f"set{i}")
        os.makedirs(set_folder, exist_ok=True)
        
        files_to_copy = complete_sets[base_name]
        for folder, src_path in files_to_copy.items():
            # 为了与之前的配置文件格式保持兼容，我们重命名文件
            # 如果是 'gt' 文件夹，则命名为 ..._gt.wav
            # 其他文件夹，则命名为 ..._模型名.wav
            suffix = folder if folder != 'gt' else 'gt'
            new_filename = f"{base_name}_{suffix}.wav"
            dst_path = os.path.join(set_folder, new_filename)
            
            shutil.copy2(src_path, dst_path)
            # print(f"已复制: {os.path.basename(src_path)} -> {os.path.join(f'set{i}', new_filename)}")

    print(f"\n完成! 已创建 {target_count} 个set文件夹在 {output_dir}")


def main():
    # 设置基础目录和输出目录
    base_dir = input("请输入包含多个模型音频文件夹的基目录路径: ").strip()
    output_dir = input("请输入输出目录路径 (将在此创建set文件夹): ").strip()
    try:
        target_count = int(input("请输入希望随机选择的音频文件数量: ").strip())
    except ValueError:
        print("无效的数字，将使用默认值 50。")
        target_count = 50

    # 如果用户没有输入，使用默认值
    if not base_dir:
        base_dir = "D:/Dataset/MOS-test"# 示例路径
    if not output_dir:
        output_dir = "D:/Projects/mos/audio/vocos_mos_set" # 示例路径

    # 执行组织操作
    organize_audio_files(base_dir, output_dir, target_count)


if __name__ == "__main__":
    main()