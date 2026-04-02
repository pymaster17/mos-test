import os
import json
from pathlib import Path


def generate_config_from_sets(sets_directory, output_file, test_type="SMOS", model_a_name=None, model_b_name=None, audio_root=""):
    """
    根据set文件夹生成BeaqleJS配置文件中的Testsets部分

    Args:
        sets_directory (str): 包含set文件夹的目录路径
        output_file (str): 输出配置文件路径
        test_type (str): 测试类型, 'SMOS', 'MOS' 或 'AB'
        model_a_name (str): AB测试时，模型A的文件夹名/后缀名
        model_b_name (str): AB测试时，模型B的文件夹名/后缀名
    """
    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    # 获取所有set文件夹
    set_folders = []
    for item in os.listdir(sets_directory):
        item_path = os.path.join(sets_directory, item)
        if os.path.isdir(item_path) and item.startswith('set'):
            set_folders.append(item)

    # 按数字排序set文件夹
    set_folders.sort(key=lambda x: int(x[3:]) if x[3:].isdigit() else x)

    testsets = []

    for i, set_folder in enumerate(set_folders, 1):
        set_path = os.path.join(sets_directory, set_folder)

        # 获取set文件夹中的所有音频文件
        audio_files = []
        for file in os.listdir(set_path):
            if file.endswith(('.wav', '.mp3', '.flac', '.aac', '.ogg', '.m4a')):
                audio_files.append(file)

        if not audio_files:
            print(f"警告: {set_folder} 中没有找到音频文件")
            continue

        if test_type == "AB":
            # AB 测试模式：每个 set 只需要两个模型的音频
            # 根据 model_a_name 和 model_b_name 查找对应文件
            file_a = None
            file_b = None
            common_prefix = None

            for file in audio_files:
                basename = os.path.splitext(file)[0]
                if basename.endswith(f"_{model_a_name}"):
                    file_a = file
                    common_prefix = basename[:-(len(model_a_name) + 1)]
                elif basename.endswith(f"_{model_b_name}"):
                    file_b = file
                    if common_prefix is None:
                        common_prefix = basename[:-(len(model_b_name) + 1)]

            if file_a is None or file_b is None:
                print(f"警告: {set_folder} 中未找到模型 '{model_a_name}' 和/或 '{model_b_name}' 的音频文件，跳过")
                continue

            if common_prefix is None:
                common_prefix = f"set{i}"

            # 获取音频所在的相对路径前缀
            audio_rel_prefix = os.path.relpath(set_path, os.path.dirname(os.path.dirname(sets_directory)))
            # 使用 audio/ 开头的相对路径
            parent_dir_name = os.path.basename(sets_directory)
            audio_path_prefix = f"audio/{parent_dir_name}/{set_folder}"

            files = {
                "A": f"{audio_path_prefix}/{file_a}",
                "B": f"{audio_path_prefix}/{file_b}"
            }

            testset = {
                "Name": f"ID-{i}:{common_prefix}",
                "TestID": f"id{i}",
                "Files": files,
                "transcribe": ""
            }

            testsets.append(testset)
            print(f"已处理 {set_folder}: A={file_a}, B={file_b}")

        else:
            # MOS / SMOS 原有逻辑
            # 提取共同的文件名前缀
            common_prefix = None
            for file in audio_files:
                if '_gt.wav' in file:
                    common_prefix = file.replace('_gt.wav', '')
                    break
                elif '_hifigan.wav' in file:
                    common_prefix = file.replace('_hifigan.wav', '')
                    break
                elif '_SpikingVocos.wav' in file:
                    common_prefix = file.replace('_SpikingVocos.wav', '')
                    break
                elif '_vocos.wav' in file:
                    common_prefix = file.replace('_vocos.wav', '')
                    break

            if common_prefix is None:
                # 如果没有找到带后缀的文件，尝试使用第一个文件并去掉扩展名
                common_prefix = os.path.splitext(audio_files[0])[0]
                # 尝试去掉可能的后缀
                for suffix in ['_gt', '_hifigan', '_SpikingVocos', '_vocos']:
                    if common_prefix.endswith(suffix):
                        common_prefix = common_prefix[:-len(suffix)]
                        break

            # 构建文件路径
            files = {}

            gt_path = f"audio/vocos_mos_set/{set_folder}/{common_prefix}_gt.wav"
            # 检查文件是否存在，如果不存在则使用找到的第一个文件
            if not os.path.exists(os.path.join(sets_directory, set_folder, f"{common_prefix}_gt.wav")):
                # 尝试找到参考文件
                ref_files = [f for f in audio_files if 'gt' in f.lower() or 'reference' in f.lower()]
                if ref_files:
                    gt_path = f"audio/vocos_mos_set/{set_folder}/{ref_files[0]}"

            if test_type == "SMOS":
                files["Reference"] = gt_path
            
            hifigan_path = f"audio/vocos_mos_set/{set_folder}/{common_prefix}_hifigan.wav"
            spiking_path = f"audio/vocos_mos_set/{set_folder}/{common_prefix}_SpikingVocos.wav"
            vocos_path = f"audio/vocos_mos_set/{set_folder}/{common_prefix}_vocos.wav"

            files["1"] = hifigan_path
            files["2"] = spiking_path
            files["3"] = vocos_path
            
            # For both MOS and SMOS, GT audio should be included in the test samples.
            files["4"] = gt_path

            # 创建testset配置
            testset = {
                "Name": f"ID-{i}:{common_prefix}",
                "TestID": f"id{i}",
                "Files": files,
                "transcribe": ""
            }

            testsets.append(testset)
            print(f"已处理 {set_folder}: {common_prefix}")

    # 读取现有配置文件或创建新配置
    if test_type == "AB":
        test_name = f"AB Preference Test ({model_a_name} vs {model_b_name})"
    elif test_type == "SMOS":
        test_name = "SMOS Test on LibriTTS test"
    else:
        test_name = "MOS Test on LibriTTS test"

    config = {
        "TestName": test_name,
        "RateScalePng": "img/scale_abs.png",
        "RateScaleBgPng": "img/scale_abs_background.png",
        "RateMinValue": 0,
        "RateMaxValue": 5,
        "RateDefaultValue": 0,
        "ShowFileIDs": False,
        "ShowResults": True,
        "LoopByDefault": False,
        "EnableABLoop": True,
        "EnableOnlineSubmission": True,
        "BeaqleServiceURL": "/web_service/beaqleJS_Service.php",
        "SupervisorContact": "365270117@qq.com",
        "RandomizeTestOrder": True,
        "MaxTestsPerRun": 20,
        "RequireMaxRating": False,
        "AudioRoot": audio_root,
        "Testsets": testsets
    }

    # AB 测试额外添加 RandomizeFileOrder 选项（随机交换 A/B 顺序，避免位置偏差）
    if test_type == "AB":
        config["RandomizeFileOrder"] = True

    # 写入配置文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("// configure the test here\n")
        f.write(f"var TestConfig = {json.dumps(config, indent=2, ensure_ascii=False)}")

    print(f"\n配置文件已生成: {output_file}")
    print(f"共处理了 {len(testsets)} 个测试集")


def main():
    # 设置输入和输出路径
    sets_directory = input("请输入包含set文件夹的目录路径: ").strip()
    output_file = input("请输入输出配置文件路径: ").strip()
    test_type = ""
    while test_type.upper() not in ["MOS", "SMOS", "AB"]:
        test_type = input("请输入测试类型 (MOS / SMOS / AB): ").strip()
        if not test_type:
            test_type = "SMOS" # 默认值

    model_a_name = None
    model_b_name = None
    if test_type.upper() == "AB":
        model_a_name = input("请输入模型A的名称（即文件名中的后缀，例如 'hifigan'）: ").strip()
        model_b_name = input("请输入模型B的名称（即文件名中的后缀，例如 'vocos'）: ").strip()
        if not model_a_name or not model_b_name:
            print("错误: AB测试模式需要指定两个模型名称！")
            return

    # 音频根路径（用于 GitHub Pages 等远程部署场景）
    audio_root = input("请输入音频根路径 AudioRoot（本地部署留空，远程部署输入URL如 'https://your-server.com/'）: ").strip()

    # 如果用户没有输入，使用默认值
    if not sets_directory:
        sets_directory = "D:/我的文档/Desktop/mos/audio/vocos_mos_set"
    if not output_file:
        output_file = "D:/我的文档/Desktop/mos/audio/config/aishell3_new_config_mushra.js"

    # 执行生成操作
    generate_config_from_sets(sets_directory, output_file, test_type.upper(), model_a_name, model_b_name, audio_root)


if __name__ == "__main__":
    main()