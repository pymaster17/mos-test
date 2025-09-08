// configure the test here
var TestConfig = {
  "TestName": "MOS Test on LibriTTS test",
  "RateScalePng": "img/scale_abs.png",
  "RateScaleBgPng": "img/scale_abs_background.png",
  "RateMinValue": 0,
  "RateMaxValue": 5,
  "RateDefaultValue": 0,
  "ShowFileIDs": false,
  "ShowResults": true,
  "LoopByDefault": false,
  "EnableABLoop": true,
  "EnableOnlineSubmission": false,
  "BeaqleServiceURL": "/web_service/beaqleJS_Service.php",
  "SupervisorContact": "liandong@mail.ioa.ac.cn",
  "RandomizeTestOrder": true,
  "MaxTestsPerRun": -1,
  "RequireMaxRating": false,
  "AudioRoot": "",
  "Testsets": [
    {
      "Name": "ID-1:1462_170138_000001_000001",
      "TestID": "id1",
      "Files": {
        "1": "audio/vocos_mos_set/set1/1462_170138_000001_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set1/1462_170138_000001_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set1/1462_170138_000001_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set1/1462_170138_000001_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-2:1462_170138_000003_000001",
      "TestID": "id2",
      "Files": {
        "1": "audio/vocos_mos_set/set2/1462_170138_000003_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set2/1462_170138_000003_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set2/1462_170138_000003_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set2/1462_170138_000003_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-3:1462_170138_000005_000000",
      "TestID": "id3",
      "Files": {
        "1": "audio/vocos_mos_set/set3/1462_170138_000005_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set3/1462_170138_000005_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set3/1462_170138_000005_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set3/1462_170138_000005_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-4:1462_170138_000007_000005",
      "TestID": "id4",
      "Files": {
        "1": "audio/vocos_mos_set/set4/1462_170138_000007_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set4/1462_170138_000007_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set4/1462_170138_000007_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set4/1462_170138_000007_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-5:1462_170138_000008_000003",
      "TestID": "id5",
      "Files": {
        "1": "audio/vocos_mos_set/set5/1462_170138_000008_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set5/1462_170138_000008_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set5/1462_170138_000008_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set5/1462_170138_000008_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-6:1462_170138_000017_000000",
      "TestID": "id6",
      "Files": {
        "1": "audio/vocos_mos_set/set6/1462_170138_000017_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set6/1462_170138_000017_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set6/1462_170138_000017_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set6/1462_170138_000017_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-7:1462_170138_000023_000001",
      "TestID": "id7",
      "Files": {
        "1": "audio/vocos_mos_set/set7/1462_170138_000023_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set7/1462_170138_000023_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set7/1462_170138_000023_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set7/1462_170138_000023_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-8:1462_170138_000023_000004",
      "TestID": "id8",
      "Files": {
        "1": "audio/vocos_mos_set/set8/1462_170138_000023_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set8/1462_170138_000023_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set8/1462_170138_000023_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set8/1462_170138_000023_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-9:1919_142785_000001_000000",
      "TestID": "id9",
      "Files": {
        "1": "audio/vocos_mos_set/set9/1919_142785_000001_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set9/1919_142785_000001_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set9/1919_142785_000001_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set9/1919_142785_000001_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-10:1919_142785_000003_000001",
      "TestID": "id10",
      "Files": {
        "1": "audio/vocos_mos_set/set10/1919_142785_000003_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set10/1919_142785_000003_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set10/1919_142785_000003_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set10/1919_142785_000003_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-11:1919_142785_000003_000002",
      "TestID": "id11",
      "Files": {
        "1": "audio/vocos_mos_set/set11/1919_142785_000003_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set11/1919_142785_000003_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set11/1919_142785_000003_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set11/1919_142785_000003_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-12:1919_142785_000003_000003",
      "TestID": "id12",
      "Files": {
        "1": "audio/vocos_mos_set/set12/1919_142785_000003_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set12/1919_142785_000003_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set12/1919_142785_000003_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set12/1919_142785_000003_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-13:1919_142785_000004_000000",
      "TestID": "id13",
      "Files": {
        "1": "audio/vocos_mos_set/set13/1919_142785_000004_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set13/1919_142785_000004_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set13/1919_142785_000004_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set13/1919_142785_000004_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-14:1919_142785_000005_000002",
      "TestID": "id14",
      "Files": {
        "1": "audio/vocos_mos_set/set14/1919_142785_000005_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set14/1919_142785_000005_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set14/1919_142785_000005_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set14/1919_142785_000005_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-15:1919_142785_000005_000003",
      "TestID": "id15",
      "Files": {
        "1": "audio/vocos_mos_set/set15/1919_142785_000005_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set15/1919_142785_000005_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set15/1919_142785_000005_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set15/1919_142785_000005_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-16:1919_142785_000005_000004",
      "TestID": "id16",
      "Files": {
        "1": "audio/vocos_mos_set/set16/1919_142785_000005_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set16/1919_142785_000005_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set16/1919_142785_000005_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set16/1919_142785_000005_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-17:1919_142785_000006_000000",
      "TestID": "id17",
      "Files": {
        "1": "audio/vocos_mos_set/set17/1919_142785_000006_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set17/1919_142785_000006_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set17/1919_142785_000006_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set17/1919_142785_000006_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-18:1919_142785_000007_000000",
      "TestID": "id18",
      "Files": {
        "1": "audio/vocos_mos_set/set18/1919_142785_000007_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set18/1919_142785_000007_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set18/1919_142785_000007_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set18/1919_142785_000007_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-19:1919_142785_000012_000001",
      "TestID": "id19",
      "Files": {
        "1": "audio/vocos_mos_set/set19/1919_142785_000012_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set19/1919_142785_000012_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set19/1919_142785_000012_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set19/1919_142785_000012_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-20:1919_142785_000014_000001",
      "TestID": "id20",
      "Files": {
        "1": "audio/vocos_mos_set/set20/1919_142785_000014_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set20/1919_142785_000014_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set20/1919_142785_000014_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set20/1919_142785_000014_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-21:1919_142785_000015_000001",
      "TestID": "id21",
      "Files": {
        "1": "audio/vocos_mos_set/set21/1919_142785_000015_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set21/1919_142785_000015_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set21/1919_142785_000015_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set21/1919_142785_000015_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-22:1919_142785_000016_000000",
      "TestID": "id22",
      "Files": {
        "1": "audio/vocos_mos_set/set22/1919_142785_000016_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set22/1919_142785_000016_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set22/1919_142785_000016_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set22/1919_142785_000016_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-23:1919_142785_000020_000001",
      "TestID": "id23",
      "Files": {
        "1": "audio/vocos_mos_set/set23/1919_142785_000020_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set23/1919_142785_000020_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set23/1919_142785_000020_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set23/1919_142785_000020_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-24:1919_142785_000020_000002",
      "TestID": "id24",
      "Files": {
        "1": "audio/vocos_mos_set/set24/1919_142785_000020_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set24/1919_142785_000020_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set24/1919_142785_000020_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set24/1919_142785_000020_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-25:1919_142785_000020_000003",
      "TestID": "id25",
      "Files": {
        "1": "audio/vocos_mos_set/set25/1919_142785_000020_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set25/1919_142785_000020_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set25/1919_142785_000020_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set25/1919_142785_000020_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-26:1919_142785_000020_000005",
      "TestID": "id26",
      "Files": {
        "1": "audio/vocos_mos_set/set26/1919_142785_000020_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set26/1919_142785_000020_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set26/1919_142785_000020_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set26/1919_142785_000020_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-27:1919_142785_000020_000006",
      "TestID": "id27",
      "Files": {
        "1": "audio/vocos_mos_set/set27/1919_142785_000020_000006_hifigan.wav",
        "2": "audio/vocos_mos_set/set27/1919_142785_000020_000006_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set27/1919_142785_000020_000006_vocos.wav",
        "4": "audio/vocos_mos_set/set27/1919_142785_000020_000006_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-28:1919_142785_000023_000000",
      "TestID": "id28",
      "Files": {
        "1": "audio/vocos_mos_set/set28/1919_142785_000023_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set28/1919_142785_000023_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set28/1919_142785_000023_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set28/1919_142785_000023_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-29:1919_142785_000023_000003",
      "TestID": "id29",
      "Files": {
        "1": "audio/vocos_mos_set/set29/1919_142785_000023_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set29/1919_142785_000023_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set29/1919_142785_000023_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set29/1919_142785_000023_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-30:1919_142785_000026_000001",
      "TestID": "id30",
      "Files": {
        "1": "audio/vocos_mos_set/set30/1919_142785_000026_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set30/1919_142785_000026_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set30/1919_142785_000026_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set30/1919_142785_000026_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-31:1919_142785_000026_000002",
      "TestID": "id31",
      "Files": {
        "1": "audio/vocos_mos_set/set31/1919_142785_000026_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set31/1919_142785_000026_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set31/1919_142785_000026_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set31/1919_142785_000026_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-32:1919_142785_000029_000000",
      "TestID": "id32",
      "Files": {
        "1": "audio/vocos_mos_set/set32/1919_142785_000029_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set32/1919_142785_000029_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set32/1919_142785_000029_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set32/1919_142785_000029_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-33:1919_142785_000031_000001",
      "TestID": "id33",
      "Files": {
        "1": "audio/vocos_mos_set/set33/1919_142785_000031_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set33/1919_142785_000031_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set33/1919_142785_000031_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set33/1919_142785_000031_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-34:1919_142785_000031_000003",
      "TestID": "id34",
      "Files": {
        "1": "audio/vocos_mos_set/set34/1919_142785_000031_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set34/1919_142785_000031_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set34/1919_142785_000031_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set34/1919_142785_000031_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-35:1919_142785_000033_000000",
      "TestID": "id35",
      "Files": {
        "1": "audio/vocos_mos_set/set35/1919_142785_000033_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set35/1919_142785_000033_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set35/1919_142785_000033_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set35/1919_142785_000033_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-36:1919_142785_000033_000001",
      "TestID": "id36",
      "Files": {
        "1": "audio/vocos_mos_set/set36/1919_142785_000033_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set36/1919_142785_000033_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set36/1919_142785_000033_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set36/1919_142785_000033_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-37:1919_142785_000035_000001",
      "TestID": "id37",
      "Files": {
        "1": "audio/vocos_mos_set/set37/1919_142785_000035_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set37/1919_142785_000035_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set37/1919_142785_000035_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set37/1919_142785_000035_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-38:1919_142785_000035_000002",
      "TestID": "id38",
      "Files": {
        "1": "audio/vocos_mos_set/set38/1919_142785_000035_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set38/1919_142785_000035_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set38/1919_142785_000035_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set38/1919_142785_000035_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-39:1919_142785_000035_000003",
      "TestID": "id39",
      "Files": {
        "1": "audio/vocos_mos_set/set39/1919_142785_000035_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set39/1919_142785_000035_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set39/1919_142785_000035_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set39/1919_142785_000035_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-40:1919_142785_000035_000004",
      "TestID": "id40",
      "Files": {
        "1": "audio/vocos_mos_set/set40/1919_142785_000035_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set40/1919_142785_000035_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set40/1919_142785_000035_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set40/1919_142785_000035_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-41:1919_142785_000036_000000",
      "TestID": "id41",
      "Files": {
        "1": "audio/vocos_mos_set/set41/1919_142785_000036_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set41/1919_142785_000036_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set41/1919_142785_000036_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set41/1919_142785_000036_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-42:1919_142785_000038_000001",
      "TestID": "id42",
      "Files": {
        "1": "audio/vocos_mos_set/set42/1919_142785_000038_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set42/1919_142785_000038_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set42/1919_142785_000038_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set42/1919_142785_000038_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-43:1919_142785_000047_000001",
      "TestID": "id43",
      "Files": {
        "1": "audio/vocos_mos_set/set43/1919_142785_000047_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set43/1919_142785_000047_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set43/1919_142785_000047_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set43/1919_142785_000047_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-44:1919_142785_000047_000002",
      "TestID": "id44",
      "Files": {
        "1": "audio/vocos_mos_set/set44/1919_142785_000047_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set44/1919_142785_000047_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set44/1919_142785_000047_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set44/1919_142785_000047_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-45:1919_142785_000047_000003",
      "TestID": "id45",
      "Files": {
        "1": "audio/vocos_mos_set/set45/1919_142785_000047_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set45/1919_142785_000047_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set45/1919_142785_000047_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set45/1919_142785_000047_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-46:1919_142785_000048_000000",
      "TestID": "id46",
      "Files": {
        "1": "audio/vocos_mos_set/set46/1919_142785_000048_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set46/1919_142785_000048_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set46/1919_142785_000048_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set46/1919_142785_000048_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-47:1919_142785_000050_000001",
      "TestID": "id47",
      "Files": {
        "1": "audio/vocos_mos_set/set47/1919_142785_000050_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set47/1919_142785_000050_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set47/1919_142785_000050_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set47/1919_142785_000050_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-48:1919_142785_000050_000002",
      "TestID": "id48",
      "Files": {
        "1": "audio/vocos_mos_set/set48/1919_142785_000050_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set48/1919_142785_000050_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set48/1919_142785_000050_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set48/1919_142785_000050_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-49:1919_142785_000053_000000",
      "TestID": "id49",
      "Files": {
        "1": "audio/vocos_mos_set/set49/1919_142785_000053_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set49/1919_142785_000053_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set49/1919_142785_000053_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set49/1919_142785_000053_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-50:1919_142785_000055_000001",
      "TestID": "id50",
      "Files": {
        "1": "audio/vocos_mos_set/set50/1919_142785_000055_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set50/1919_142785_000055_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set50/1919_142785_000055_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set50/1919_142785_000055_000001_gt.wav"
      },
      "transcribe": ""
    }
  ]
}