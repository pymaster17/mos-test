import os
import soundfile as sf
from glob import glob
from tqdm import tqdm
import whisper

orig_path = "D:\PROJECTS\\beaqlejs\\audio\ears_test_mushra"

file_path_list = glob(f"{orig_path}\*\*.wav")

model = whisper.load_model("large")

for cur_file in tqdm(file_path_list):
   cur_filename = os.path.split(cur_file)[-1]
   if cur_filename.startswith('gt'):
      result = model.transcribe(cur_file)
      print(f"file: {cur_filename}, transcript: {result['text']}")
